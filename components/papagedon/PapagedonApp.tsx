"use client";

/**
 * papagedon.com/app: PAPAGEDON's engine in the browser.
 *
 * Pipeline (same order as Runtime::Update in PAPAGEDON-CORE-):
 *   audio source (file / input / loopback)  -> lib/papagedon/audioSources.ts
 *   AudioAnalyzer -> ExperienceSignals       -> lib/papagedon/analyzer.ts
 *   ExperienceGraph -> event/state/mood      -> lib/papagedon/experienceGraph.ts
 *   Renderer with the engine's GLSL packs    -> lib/papagedon/renderer.ts
 * plus Connect Wallet on Celo and the paid AEI call panel.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { AudioAnalyzer, emptySignals, type ExperienceSignals } from "@/lib/papagedon/analyzer";
import { ExperienceGraph, type ExperienceGraphOutput } from "@/lib/papagedon/experienceGraph";
import { AudioEngine, type AudioSourceKind, type InputDevice } from "@/lib/papagedon/audioSources";
import { PapagedonRenderer } from "@/lib/papagedon/renderer";
import { ASSET_BASE, catalog, type PackDef, type ThemeDef } from "@/lib/papagedon/catalog";
import { Web3Provider } from "./Web3Provider";
import WalletButton from "./WalletButton";
import PaidCallPanel, { type IdentityStatus } from "./PaidCallPanel";
import { CollapsibleSection } from "./ui/Collapsible";
import { encodeWavMono16 } from "@/lib/aei/wav";

const DEMO_CYCLE_SECONDS = 20; // PAPAGEDON_DEMO_CYCLE in Runtime.cpp
const LIVE_CLIP_SECONDS = 8;
const FILE_CLIP_SECONDS = 20; // ~1.9 MB at 48 kHz: well under the gateway's 4 MB limit

const themeById = (id: string | null | undefined): ThemeDef | undefined => catalog.themes.find((t) => t.id === id);
const defaultPack = catalog.packs.find((p) => p.id === "SignaturePack") ?? catalog.packs[0];

type Hud = { s: ExperienceSignals; g: ExperienceGraphOutput };

function Meter({ label, value }: { label: string; value: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="grid grid-cols-[52px_1fr_28px] items-center gap-2">
      <span className="pg-label !tracking-[0.12em]">{label}</span>
      <div className="pgx-meter">
        <span style={{ width: `${pct}%` }} />
      </div>
      <span className="text-right font-mono text-[10px] text-muted">{pct}</span>
    </div>
  );
}

const IconWave = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M1 8h2l1.5-4 2 8 2-10 2 9 1.5-3H15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 1.5l1.6 4.9L14.5 8l-4.9 1.6L8 14.5l-1.6-4.9L1.5 8l4.9-1.6z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
);
const IconPulse = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="2" y="7" width="2" height="6" rx=".8" fill="currentColor" /><rect x="5.5" y="4" width="2" height="9" rx=".8" fill="currentColor" /><rect x="9" y="2" width="2" height="11" rx=".8" fill="currentColor" /><rect x="12.5" y="6" width="2" height="7" rx=".8" fill="currentColor" /></svg>
);

export default function PapagedonApp({ identity }: { identity: IdentityStatus }) {
  return (
    <Web3Provider>
      <PapagedonStage identity={identity} />
    </Web3Provider>
  );
}

function PapagedonStage({ identity }: { identity: IdentityStatus }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<PapagedonRenderer | null>(null);
  const audioRef = useRef<AudioEngine | null>(null);
  const analyzerRef = useRef(new AudioAnalyzer());
  const graphRef = useRef(new ExperienceGraph());
  const shaderCache = useRef(new Map<string, string>());

  const [glError, setGlError] = useState<string | null>(null);
  const [pack, setPack] = useState<PackDef>(defaultPack);
  const [shaderIndex, setShaderIndex] = useState(0);
  const [themeId, setThemeId] = useState<string>(defaultPack.recommendedTheme ?? "aurora");
  const [shaderError, setShaderError] = useState<string | null>(null);
  const [autoCycle, setAutoCycle] = useState(false);
  const [hideUi, setHideUi] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [source, setSource] = useState<AudioSourceKind | null>(null);
  const [sourceLabel, setSourceLabel] = useState("No audio yet");
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [devices, setDevices] = useState<InputDevice[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [hud, setHud] = useState<Hud>({ s: emptySignals(), g: { event: "Silence", state: "Silence", mood: 0 } });
  const [beatFlash, setBeatFlash] = useState(0);

  const shader = pack.shaders[Math.min(shaderIndex, pack.shaders.length - 1)];
  const theme = useMemo(() => themeById(themeId) ?? catalog.themes[0], [themeId]);

  // ── WebGL2 + render loop ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: PapagedonRenderer | null = null;
    try {
      renderer = PapagedonRenderer.create(canvas);
    } catch (e) {
      setGlError(e instanceof Error ? e.message : "WebGL2 failed to start");
    }
    if (!renderer) {
      setGlError((m) => m ?? "This browser does not support WebGL2, which PAPAGEDON needs.");
      return;
    }
    rendererRef.current = renderer;
    let raf = 0;
    let last = performance.now();
    let lastHud = 0;
    let beats = 0;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const frame = audioRef.current?.readFrame() ?? null;
      const signals = frame ? analyzerRef.current.update(frame) : emptySignals();
      const graph = graphRef.current.update(signals);
      if (signals.beat) beats++;
      renderer!.render(signals, graph, dt);
      if (now - lastHud > 100) {
        lastHud = now;
        setHud({ s: signals, g: graph });
        if (beats) setBeatFlash((b) => b + beats);
        beats = 0;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      renderer?.dispose();
      rendererRef.current = null;
    };
  }, []);

  // ── Shader + theme ──────────────────────────────────────────────────────────
  useEffect(() => {
    const r = rendererRef.current;
    if (!r || !shader) return;
    let cancelled = false;
    (async () => {
      let src = shaderCache.current.get(shader.file);
      if (!src) {
        const res = await fetch(ASSET_BASE + shader.file);
        src = await res.text();
        shaderCache.current.set(shader.file, src);
      }
      if (cancelled) return;
      const out = r.useFragment(src);
      setShaderError(out.ok ? null : `${shader.name}: ${out.error.split("\n")[0]}`);
    })().catch((e) => setShaderError(String(e)));
    return () => {
      cancelled = true;
    };
  }, [shader, glError]);

  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    r.tranceMode = pack.id === "TranceExperiencePack";
  }, [pack]);

  const firstTheme = useRef(true);
  useEffect(() => {
    const r = rendererRef.current;
    if (r && theme) {
      r.setTheme(theme, firstTheme.current);
      firstTheme.current = false;
    }
  }, [theme, glError]);

  const choosePack = (id: string) => {
    const p = catalog.packs.find((x) => x.id === id);
    if (!p) return;
    setPack(p);
    setShaderIndex(0);
    if (p.recommendedTheme && themeById(p.recommendedTheme)) setThemeId(p.recommendedTheme);
  };
  const step = useCallback(
    (d: number) => setShaderIndex((i) => (i + d + pack.shaders.length) % pack.shaders.length),
    [pack],
  );

  useEffect(() => {
    if (!autoCycle) return;
    const t = setInterval(() => step(1), DEMO_CYCLE_SECONDS * 1000);
    return () => clearInterval(t);
  }, [autoCycle, step]);

  // ── Audio sources ───────────────────────────────────────────────────────────
  const engine = () => (audioRef.current ??= new AudioEngine());
  const afterSwitch = () => {
    const a = audioRef.current!;
    analyzerRef.current.reset();
    setSource(a.kind);
    setSourceLabel(a.label);
    setPlaying(a.playing);
    setSourceError(null);
  };
  const loadFile = async (file: File) => {
    try {
      await engine().loadFile(file);
      afterSwitch();
    } catch {
      setSourceError(`Could not decode ${file.name}. Try an MP3, WAV, M4A or OGG.`);
    }
  };
  const startInput = async (id?: string) => {
    try {
      await engine().useInput(id || undefined);
      afterSwitch();
      const list = await AudioEngine.listInputs();
      setDevices(list);
      if (!id && list[0]) setDeviceId(list[0].deviceId);
    } catch (e) {
      setSourceError(e instanceof Error && e.name === "NotAllowedError" ? "Microphone permission was blocked." : `Could not open the input: ${String(e)}`);
    }
  };
  const startLoopback = async () => {
    try {
      await engine().useLoopback();
      afterSwitch();
    } catch (e) {
      setSourceError(e instanceof Error ? e.message : String(e));
    }
  };
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || a.kind !== "file") return;
    a.togglePlayPause();
    setPlaying(a.playing);
  };

  // The paid AEI call sends a WAV clip of what is playing: the gateway reads
  // WAV only, so every source (any file format, mic, system audio) is decoded
  // here and the server analyses exactly these samples.
  const getClip = useCallback(async () => {
    const a = audioRef.current;
    if (!a?.kind) return null;
    const { samples, sampleRate, startSeconds } = await a.captureClip(FILE_CLIP_SECONDS, LIVE_CLIP_SECONDS);
    const wav = encodeWavMono16(samples, sampleRate);
    const seconds = samples.length / sampleRate;
    const at = `${Math.floor(startSeconds / 60)}:${String(Math.floor(startSeconds % 60)).padStart(2, "0")}`;
    const label =
      a.kind === "file"
        ? `${seconds.toFixed(1)} s of ${a.label} from ${at}`
        : `${seconds.toFixed(1)} s recorded live`;
    return { blob: new Blob([wav], { type: "audio/wav" }), name: `papagedon-${a.kind}-clip.wav`, label: `${label} · ${(wav.byteLength / 1e6).toFixed(1)} MB WAV` };
  }, []);

  useEffect(() => () => void audioRef.current?.close(), []);

  // ── Keyboard (mirrors the native player where browsers allow) ──────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input,select,textarea")) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "[") step(-1);
      else if (e.key === "]") step(1);
      else if (e.key === "h" || e.key === "H") setHideUi((h) => !h);
      else if (e.key === "a" || e.key === "A") setAutoCycle((v) => !v);
      else if (/^[1-9]$/.test(e.key)) {
        const t = catalog.themes[Number(e.key) - 1];
        if (t) setThemeId(t.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const { s, g } = hud;

  return (
    <div
      className="pgx-root"
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) void loadFile(f);
      }}
    >
      <canvas ref={canvasRef} className="pgx-stage" />
      {dragging && <div className="pgx-drop">Drop a track to play it through PAPAGEDON</div>}

      <div className={`pgx-ui ${hideUi ? "is-hidden" : ""}`}>
        <nav className="pgx-nav">
          <Link href="/" className="flex items-center gap-3" aria-label="PAPAGEDON home">
            <BrandLogo compact />
          </Link>
          <div className="flex items-center gap-2">
            <WalletButton />
          </div>
        </nav>

        {glError && <div className="pgx-alert mx-4 md:mx-6">{glError}</div>}

        <div className="pgx-dock">
          <div className="pgx-col pgx-col-left">
            <CollapsibleSection
              title="Audio input"
              icon={<IconWave />}
              summary={
                <span className="flex min-w-0 items-center gap-1.5">
                  {source && <span className={`pgx-live-dot ${playing ? "is-on" : ""}`} />}
                  <span className="truncate" title={sourceLabel}>{source ? sourceLabel : "Choose a source"}</span>
                </span>
              }
              aside={
                source === "file" ? (
                  <button type="button" className="pgx-icon-btn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} title={playing ? "Pause (Space)" : "Play (Space)"}>
                    {playing ? (
                      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1" fill="currentColor" /><rect x="9" y="3" width="3" height="10" rx="1" fill="currentColor" /></svg>
                    ) : (
                      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M5 3l8 5-8 5z" fill="currentColor" /></svg>
                    )}
                  </button>
                ) : undefined
              }
            >
              <div className="pgx-seg">
                <label className={`pgx-seg-btn ${source === "file" ? "is-on" : ""}`}>
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M6 12.5V4l7-1.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" /><circle cx="4.5" cy="12.5" r="1.6" fill="currentColor" /><circle cx="11.5" cy="11" r="1.6" fill="currentColor" /></svg>
                  File
                  <input type="file" accept="audio/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
                </label>
                <button type="button" className={`pgx-seg-btn ${source === "input" ? "is-on" : ""}`} onClick={() => startInput(deviceId)}>
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="6" y="2" width="4" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 8a4.5 4.5 0 0 0 9 0M8 12.5V14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  Mic / input
                </button>
                <button type="button" className={`pgx-seg-btn ${source === "loopback" ? "is-on" : ""}`} onClick={startLoopback}>
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="2" y="3" width="12" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M6 13.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  System
                </button>
              </div>
              {source === "input" && devices.length > 1 && (
                <select className="pg-select mt-2" value={deviceId} onChange={(e) => { setDeviceId(e.target.value); void startInput(e.target.value); }}>
                  {devices.map((d) => (
                    <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
                  ))}
                </select>
              )}
              {!source && <p className="pgx-hint">Pick a file (or drop one anywhere), use the mic or an audio interface, or share a tab / system audio.</p>}
              {sourceError && <p className="pgx-hint text-red-300">{sourceError}</p>}
            </CollapsibleSection>

            <CollapsibleSection
              title="Visuals"
              icon={<IconSpark />}
              summary={
                <span className="truncate">
                  {String(Math.min(shaderIndex, pack.shaders.length - 1) + 1).padStart(2, "0")} · {shader?.name ?? "—"} · {theme?.name}
                  {autoCycle ? " · Auto" : ""}
                </span>
              }
            >
              <label className="pgx-field-label">Shader pack</label>
              <select className="pg-select" value={pack.id} onChange={(e) => choosePack(e.target.value)}>
                {catalog.packs.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.shaders.length})</option>
                ))}
              </select>
              <label className="pgx-field-label mt-2">Shader</label>
              <div className="flex items-center gap-1.5">
                <button type="button" className="pgx-icon-btn" onClick={() => step(-1)} aria-label="Previous shader" title="Previous shader ([)">
                  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <select className="pg-select" value={shaderIndex} onChange={(e) => setShaderIndex(Number(e.target.value))}>
                  {pack.shaders.map((sh, i) => (
                    <option key={sh.id} value={i}>{String(i + 1).padStart(2, "0")} · {sh.name}</option>
                  ))}
                </select>
                <button type="button" className="pgx-icon-btn" onClick={() => step(1)} aria-label="Next shader" title="Next shader (])">
                  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              <label className="pgx-field-label mt-2">Theme</label>
              <div className="flex items-center gap-1.5">
                <select className="pg-select" value={themeId} onChange={(e) => setThemeId(e.target.value)}>
                  {catalog.themes.map((t, i) => (
                    <option key={t.id} value={t.id}>{i + 1} · {t.name}</option>
                  ))}
                </select>
                <button type="button" className={`pgx-chip-btn ${autoCycle ? "is-on" : ""}`} onClick={() => setAutoCycle((v) => !v)} title={`Next shader every ${DEMO_CYCLE_SECONDS}s (A)`} aria-pressed={autoCycle}>
                  Auto
                </button>
              </div>
              {shaderError && <p className="pgx-hint text-red-300">{shaderError}</p>}
            </CollapsibleSection>

            <CollapsibleSection
              title="Live signals"
              icon={<IconPulse />}
              summary={
                <span className="flex items-center gap-2 font-mono text-[11px]">
                  <span key={beatFlash} className="pgx-beat" />
                  {s.bpm ? `${Math.round(s.bpm)} BPM` : "— BPM"} · {g.state}
                  <span className="pgx-mini-meter"><span style={{ width: `${Math.round(Math.min(1, Math.max(0, s.energy)) * 100)}%` }} /></span>
                </span>
              }
            >
              <div className="grid gap-2">
                <Meter label="Energy" value={s.energy} />
                <Meter label="Bass" value={s.bass} />
                <Meter label="Mid" value={s.mid} />
                <Meter label="Treble" value={s.treble} />
              </div>
              <p className="pgx-hint">
                Analysis runs in your browser, a direct port of the engine&apos;s AudioAnalyzer.
              </p>
              <p className="pgx-keys">
                <kbd>Space</kbd> play · <kbd>[</kbd><kbd>]</kbd> shader · <kbd>1</kbd>–<kbd>9</kbd> theme · <kbd>A</kbd> auto · <kbd>H</kbd> hide UI
              </p>
            </CollapsibleSection>
          </div>

          <div className="pgx-col pgx-col-right">
            <PaidCallPanel identity={identity} getClip={getClip} />
          </div>
        </div>
      </div>
    </div>
  );
}
