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

const DEMO_CYCLE_SECONDS = 20; // PAPAGEDON_DEMO_CYCLE in Runtime.cpp
const LIVE_CLIP_SECONDS = 8;

const themeById = (id: string | null | undefined): ThemeDef | undefined => catalog.themes.find((t) => t.id === id);
const defaultPack = catalog.packs.find((p) => p.id === "SignaturePack") ?? catalog.packs[0];

type Hud = { s: ExperienceSignals; g: ExperienceGraphOutput };

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[52px_1fr] items-center gap-2">
      <span className="pg-label !tracking-[0.12em]">{label}</span>
      <div className="pg-meter">
        <span style={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }} />
      </div>
    </div>
  );
}

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

  const getClip = useCallback(async () => {
    const a = audioRef.current;
    if (!a?.kind) return null;
    if (a.kind === "file" && a.file) return { blob: a.file as Blob, name: a.file.name };
    const blob = await a.recordClip(LIVE_CLIP_SECONDS);
    return { blob, name: `papagedon-live-${Date.now()}.webm` };
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

      <div className="pgx-ui" style={{ opacity: hideUi ? 0 : 1, transition: "opacity .25s" }}>
        <nav className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="PAPAGEDON home">
            <BrandLogo compact />
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:inline">Celo mainnet</span>
            <WalletButton />
          </div>
        </nav>

        {glError && (
          <div className="mx-4 rounded-lg border border-red-400/40 bg-red-950/60 p-3 text-sm md:mx-6">{glError}</div>
        )}

        <div className="flex min-h-0 flex-1 flex-col justify-between gap-3 overflow-y-auto px-4 pb-4 md:flex-row md:items-end md:px-6">
          <div className="flex w-full flex-col gap-3 md:w-[300px]">
            <section className="pg-panel">
              <div className="pg-label mb-2">Audio input</div>
              <div className="grid grid-cols-3 gap-1.5">
                <label className={`pg-btn justify-center ${source === "file" ? "pg-btn-on" : ""}`}>
                  File
                  <input type="file" accept="audio/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
                </label>
                <button className={`pg-btn justify-center ${source === "input" ? "pg-btn-on" : ""}`} onClick={() => startInput(deviceId)}>
                  Mic / input
                </button>
                <button className={`pg-btn justify-center ${source === "loopback" ? "pg-btn-on" : ""}`} onClick={startLoopback}>
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
              <div className="mt-2 flex items-center justify-between gap-2 text-[12px]">
                <span className="truncate text-muted" title={sourceLabel}>{sourceLabel}</span>
                {source === "file" && (
                  <button className="pg-btn !px-2 !py-1" onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>
                )}
              </div>
              {!source && <p className="mt-1 text-[11px] text-subtle">Pick a file (or drop one anywhere), use the mic or an audio interface, or share a tab / system audio.</p>}
              {sourceError && <p className="mt-1 text-[11px] text-red-300">{sourceError}</p>}
            </section>

            <section className="pg-panel">
              <div className="pg-label mb-2">Visuals · engine shader packs</div>
              <select className="pg-select" value={pack.id} onChange={(e) => choosePack(e.target.value)}>
                {catalog.packs.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.shaders.length})</option>
                ))}
              </select>
              <div className="mt-2 flex items-center gap-1.5">
                <button className="pg-btn !px-2" onClick={() => step(-1)} aria-label="Previous shader">[</button>
                <select className="pg-select" value={shaderIndex} onChange={(e) => setShaderIndex(Number(e.target.value))}>
                  {pack.shaders.map((sh, i) => (
                    <option key={sh.id} value={i}>{String(i + 1).padStart(2, "0")} · {sh.name}</option>
                  ))}
                </select>
                <button className="pg-btn !px-2" onClick={() => step(1)} aria-label="Next shader">]</button>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <select className="pg-select" value={themeId} onChange={(e) => setThemeId(e.target.value)}>
                  {catalog.themes.map((t, i) => (
                    <option key={t.id} value={t.id}>{i + 1} · {t.name}</option>
                  ))}
                </select>
                <button className={`pg-btn ${autoCycle ? "pg-btn-on" : ""}`} onClick={() => setAutoCycle((v) => !v)} title={`Next shader every ${DEMO_CYCLE_SECONDS}s`}>
                  Auto
                </button>
              </div>
              {shaderError && <p className="mt-1 text-[11px] text-red-300">{shaderError}</p>}
            </section>

            <section className="pg-panel">
              <div className="mb-2 flex items-center justify-between">
                <span className="pg-label">Live signals</span>
                <span className="font-mono text-[11px] text-muted">
                  <span key={beatFlash} className="mr-1.5 inline-block h-2 w-2 rounded-full bg-accent" style={{ animation: "pgxBeat .25s ease-out forwards" }} />
                  {s.bpm ? `${Math.round(s.bpm)} BPM` : "— BPM"} · {g.state}
                </span>
              </div>
              <div className="grid gap-1.5">
                <Meter label="Energy" value={s.energy} />
                <Meter label="Bass" value={s.bass} />
                <Meter label="Mid" value={s.mid} />
                <Meter label="Treble" value={s.treble} />
              </div>
              <p className="mt-2 text-[10px] leading-snug text-subtle">
                Analysis runs in your browser: a direct port of the engine&apos;s AudioAnalyzer. Keys: Space play/pause · [ ] shader · 1–9 theme · A auto · H hide.
              </p>
            </section>
          </div>

          <div className="w-full md:w-[360px]">
            <PaidCallPanel identity={identity} getClip={getClip} />
          </div>
        </div>
      </div>
      <style>{`@keyframes pgxBeat { from { opacity: 1; transform: scale(1.6); } to { opacity: .25; transform: scale(1); } }`}</style>
    </div>
  );
}
