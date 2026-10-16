"use client";

/**
 * papagedon.com/app, Vision mode: PAPAGEDON sees the crowd and hears the music.
 *
 *   camera -> OpenCV 5 on AWS Lambda (NEXT_PUBLIC_VISION_SERVICE_URL)  -> CrowdMetrics
 *          \-> in-browser fallback (lib/vision/browserCrowd.ts)        /
 *   audio  -> AudioAnalyzer (port of the engine)                      -> A_t
 *   fuse() -> room energy E_t -> SceneDirector -> originals + immersive 3D scenes (Auto pool);
 *   shader packs from the classic engine and every scene can be locked by key.
 *
 * Camera loss or no camera => audio-only. Operator can lock a scene at any time.
 * Privacy: frames stay in memory; only aggregate numbers are kept. The service
 * receives a small JPEG per tick and does not store it.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { CollapsibleSection } from "@/components/papagedon/ui/Collapsible";
import { AudioAnalyzer, emptySignals } from "@/lib/papagedon/analyzer";
import { AudioEngine, type AudioSourceKind } from "@/lib/papagedon/audioSources";
import { createNanoHexVisualizer } from "@/lib/vision/visualizers/nano-hex.js";
import { createPackVisualizer } from "@/lib/vision/visualizers/corePacks";
import { createImmersiveVisualizer, type ImmersiveId } from "@/lib/vision/visualizers/immersive3d";
import { SCENE_SECTIONS, ALL_SCENES, AUTO_POOL, AUTO_START, sceneIndexById } from "@/lib/vision/scenes";
import { fuse, intensityGain, SceneDirector, type CrowdMetrics, type FusionOutput } from "@/lib/vision/fusion";
import { BrowserCrowdAnalyzer, toGray } from "@/lib/vision/browserCrowd";
import { analyzeOnService, VISION_SERVICE_URL } from "@/lib/vision/serviceClient";

const ANALYSIS_W = 160;
const ANALYSIS_H = 120;
const TICK_MS = 100; // 10 analyses/s
const STALE_MS = 1500; // no crowd data for this long => audio-only

type Hud = {
  crowd: CrowdMetrics | null;
  fusion: FusionOutput;
  bpm: number;
  sceneId: string;
  fps: number;
  backend: "opencv-service" | "browser" | "off";
};

function Meter({ label, value }: { label: string; value: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="grid grid-cols-[64px_1fr_28px] items-center gap-2">
      <span className="pg-label !tracking-[0.12em]">{label}</span>
      <div className="pgx-meter"><span style={{ width: `${pct}%` }} /></div>
      <span className="text-right font-mono text-[10px] text-muted">{pct}</span>
    </div>
  );
}

export default function VisionStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const grabRef = useRef<HTMLCanvasElement | null>(null);
  const vizRef = useRef<ReturnType<typeof createNanoHexVisualizer> | null>(null);
  const audioRef = useRef<AudioEngine | null>(null);
  const analyzerRef = useRef(new AudioAnalyzer());
  const crowdRef = useRef<{ m: CrowdMetrics; at: number } | null>(null);
  const browserCrowd = useRef(new BrowserCrowdAnalyzer());
  const director = useRef(new SceneDirector(8, AUTO_POOL.map((id) => ALL_SCENES[sceneIndexById(id)]), AUTO_START));
  const packCanvasRef = useRef<HTMLCanvasElement>(null);
  const immCanvasRef = useRef<HTMLCanvasElement>(null);
  const packCmd = useRef<{ seq: number; index: number | null }>({ seq: 0, index: null });
  const ctl = useRef({ auto: true, manualId: "nano-hex", alpha: 0.4, useService: Boolean(VISION_SERVICE_URL) });

  const [glError, setGlError] = useState<string | null>(null);
  const [camOn, setCamOn] = useState(false);
  const [camError, setCamError] = useState<string | null>(null);
  const [preview, setPreview] = useState(true);
  const [auto, setAuto] = useState(true);
  const [manualId, setManualId] = useState("nano-hex");
  const [alpha, setAlpha] = useState(0.4);
  const [hideUi, setHideUi] = useState(false);
  const [source, setSource] = useState<AudioSourceKind | null>(null);
  const [sourceLabel, setSourceLabel] = useState("No audio yet");
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [serviceDown, setServiceDown] = useState(false);
  const [hud, setHud] = useState<Hud>({
    crowd: null, fusion: fuse({ crowd: null, audioEnergy: 0, alpha: 0.4 }), bpm: 0, sceneId: "nano-hex", fps: 0, backend: "off",
  });

  useEffect(() => {
    ctl.current = { ...ctl.current, auto, manualId, alpha };
  }, [auto, manualId, alpha]);

  // ── Visualizer + render loop ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let viz: ReturnType<typeof createNanoHexVisualizer>;
    try {
      viz = createNanoHexVisualizer(canvas);
    } catch (e) {
      setGlError(e instanceof Error ? e.message : "WebGL failed to start");
      return;
    }
    vizRef.current = viz;
    let current = ctl.current.manualId;
    viz.setVariant(current);
    // Pack and 3D renderers are created lazily, the first time one is shown.
    let packViz: ReturnType<typeof createPackVisualizer> | null = null;
    let immViz: ReturnType<typeof createImmersiveVisualizer> | null = null;
    let kind = "original";
    let seenCmd = packCmd.current.seq;
    const show = (k: string) => {
      kind = k;
      canvas.style.visibility = k === "original" ? "visible" : "hidden";
      if (packCanvasRef.current) packCanvasRef.current.style.visibility = k === "pack" ? "visible" : "hidden";
      if (immCanvasRef.current) immCanvasRef.current.style.visibility = k === "immersive" ? "visible" : "hidden";
    };
    const apply = (id: string) => {
      const sc = ALL_SCENES[sceneIndexById(id)];
      if (!sc) return;
      try {
        if (sc.kind === "original") viz.setVariant(id);
        else if (sc.kind === "pack") (packViz ??= createPackVisualizer(packCanvasRef.current!)).setPack(sc.packId!);
        else (immViz ??= createImmersiveVisualizer(immCanvasRef.current!)).setScene(id as ImmersiveId);
        show(sc.kind);
      } catch (e) {
        setGlError(e instanceof Error ? e.message : "Scene failed to start");
      }
    };
    apply(current);
    let raf = 0;
    let lastHud = 0;
    let frames = 0;
    let fpsAt = performance.now();
    let fps = 0;
    let beatHold = 0;
    const loop = (now: number) => {
      const frame = audioRef.current?.readFrame() ?? null;
      const s = frame ? analyzerRef.current.update(frame) : emptySignals();
      const fresh = crowdRef.current && now - crowdRef.current.at < STALE_MS ? crowdRef.current.m : null;
      const f = fuse({ crowd: fresh, audioEnergy: s.energy, alpha: ctl.current.alpha });
      const d = director.current.update(f.room, now / 1000);
      const id = ctl.current.auto ? AUTO_POOL[d.index] : ctl.current.manualId;
      if (id !== current) {
        current = id;
        apply(id);
      }
      if (packCmd.current.seq !== seenCmd) {
        seenCmd = packCmd.current.seq;
        const sc = ALL_SCENES[sceneIndexById(current)];
        const ix = packCmd.current.index;
        if (sc?.kind === "pack") packViz?.setPack(sc.packId!, ix == null ? { advance: true } : { index: ix });
      }
      const gain = intensityGain(f.room);
      beatHold = s.beat ? 1 : Math.max(0, beatHold - 0.1);
      if (kind === "pack") packViz?.render({ ...s, energy: Math.min(1, s.energy * gain), intensity: Math.min(1, s.intensity * gain) });
      else if (kind === "immersive") immViz?.render({
        energy: Math.min(1, s.energy * gain), bass: Math.min(1, s.bass * gain), mid: Math.min(1, s.mid * gain),
        treble: Math.min(1, s.treble * gain), beat: beatHold, room: f.room, crowd: fresh?.energy ?? 0,
      });
      else viz.render({
        energy: Math.min(1, s.energy * gain),
        intensity: Math.min(1, s.intensity * gain),
        bass: Math.min(1, s.bass * gain),
        mid: Math.min(1, s.mid * gain),
        treble: Math.min(1, s.treble * gain),
        pulse: s.beat ? Math.min(1, s.bass * gain) : 0,
        beat: beatHold,
      });
      frames++;
      if (now - fpsAt > 1000) {
        fps = (frames * 1000) / (now - fpsAt);
        frames = 0;
        fpsAt = now;
      }
      if (now - lastHud > 150) {
        lastHud = now;
        setHud({ crowd: fresh, fusion: f, bpm: s.bpm, sceneId: id, fps, backend: fresh ? fresh.source : "off" });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      viz.dispose();
      packViz?.dispose();
      immViz?.dispose();
      vizRef.current = null;
    };
  }, []);

  // ── Camera analysis loop ───────────────────────────────────────────────────
  useEffect(() => {
    if (!camOn) return;
    const video = videoRef.current!;
    let stream: MediaStream | null = null;
    let timer = 0;
    let inFlight = false;
    let failures = 0;
    let retryAt = 0;
    let first = true;
    let prevBlob: Blob | null = null;
    let stopped = false;
    const session = Math.random().toString(36).slice(2, 10);
    const grab = (grabRef.current ??= document.createElement("canvas"));
    grab.width = ANALYSIS_W;
    grab.height = ANALYSIS_H;
    const g = grab.getContext("2d", { willReadFrequently: true })!;
    browserCrowd.current.reset();

    const tick = async () => {
      if (stopped || video.readyState < 2) return;
      const t0 = performance.now();
      g.drawImage(video, 0, 0, ANALYSIS_W, ANALYSIS_H);
      if (failures >= 3 && performance.now() > retryAt) failures = 0; // try the service again every 30 s
      if (ctl.current.useService && failures < 3) {
        if (inFlight) return;
        inFlight = true;
        try {
          const blob = await new Promise<Blob | null>((r) => grab.toBlob(r, "image/jpeg", 0.7));
          if (blob) {
            // First call may hit a Lambda cold start: allow longer.
            const m = await analyzeOnService(blob, prevBlob, session, AbortSignal.timeout(first ? 15000 : 2500));
            prevBlob = blob;
            first = false;
            crowdRef.current = { m, at: performance.now() };
            failures = 0;
            setServiceDown(false);
          }
        } catch {
          failures++;
          if (failures >= 3) {
            retryAt = performance.now() + 30000;
            setServiceDown(true);
          }
        } finally {
          inFlight = false;
        }
        if (failures < 3) return;
      }
      const m = browserCrowd.current.update(toGray(g.getImageData(0, 0, ANALYSIS_W, ANALYSIS_H).data));
      crowdRef.current = { m: { ...m, source: "browser", latencyMs: performance.now() - t0 }, at: performance.now() };
    };

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false });
        if (stopped) return stream.getTracks().forEach((t) => t.stop());
        video.srcObject = stream;
        await video.play();
        setCamError(null);
        timer = window.setInterval(() => void tick(), TICK_MS);
        // If the camera disappears, the stale-data check drops us to audio-only.
        stream.getVideoTracks()[0]?.addEventListener("ended", () => setCamOn(false));
      } catch (e) {
        setCamError(e instanceof Error && e.name === "NotAllowedError" ? "Camera permission was blocked. Running audio-only." : "No camera available. Running audio-only.");
        setCamOn(false);
      }
    })();
    return () => {
      stopped = true;
      clearInterval(timer);
      stream?.getTracks().forEach((t) => t.stop());
      video.srcObject = null;
      crowdRef.current = null;
    };
  }, [camOn]);

  // A manual pick switches to Manual and applies on the very next frame
  // (the ref is updated here, not one render later in an effect).
  // Picking the pack that is already showing advances to its next shader;
  // `variant` jumps to one shader of a pack (Batman / Trance lists).
  const [variant, setVariant] = useState<number | null>(null);
  const pickScene = (id: string, v: number | null = null) => {
    if (v != null) packCmd.current = { seq: packCmd.current.seq + 1, index: v };
    else if (!ctl.current.auto && ctl.current.manualId === id) packCmd.current = { seq: packCmd.current.seq + 1, index: null };
    setVariant(v);
    ctl.current.auto = false;
    ctl.current.manualId = id;
    setAuto(false);
    setManualId(id);
  };
  const pickRef = useRef(pickScene);
  pickRef.current = pickScene;

  // ── Audio ──────────────────────────────────────────────────────────────────
  const engine = () => (audioRef.current ??= new AudioEngine());
  const after = () => {
    const a = audioRef.current!;
    analyzerRef.current.reset();
    setSource(a.kind);
    setSourceLabel(a.label);
    setSourceError(null);
  };
  const loadFile = async (file: File) => {
    try {
      await engine().loadFile(file);
      after();
    } catch {
      setSourceError(`Could not decode ${file.name}.`);
    }
  };
  const startMic = async () => {
    try {
      await engine().useInput();
      after();
    } catch {
      setSourceError("Microphone permission was blocked.");
    }
  };
  useEffect(() => () => void audioRef.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input,select,textarea")) return;
      if (e.key === "h" || e.key === "H") setHideUi((v) => !v);
      else if (e.key === "c" || e.key === "C") setCamOn((v) => !v);
      else if (e.key === "a" || e.key === "A") setAuto((v) => !v);
      else if (e.code === "Space" && audioRef.current?.kind === "file") {
        e.preventDefault();
        audioRef.current.togglePlayPause();
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
        const sc = ALL_SCENES.find((x) => x.key === e.key.toUpperCase());
        if (sc) pickRef.current(sc.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { crowd, fusion, fps, backend } = hud;
  const scene = ALL_SCENES[sceneIndexById(hud.sceneId)] ?? ALL_SCENES[3];

  return (
    <div className="pgx-root">
      <canvas ref={canvasRef} className="pgx-stage" />
      <canvas ref={packCanvasRef} className="pgx-stage" style={{ visibility: "hidden" }} />
      <canvas ref={immCanvasRef} className="pgx-stage" style={{ visibility: "hidden" }} />
      <video
        ref={videoRef}
        muted
        playsInline
        className="pointer-events-none fixed right-4 top-20 z-20 w-48 rounded-xl border border-white/10 object-cover opacity-90"
        style={{ display: camOn && preview && !hideUi ? "block" : "none", transform: "scaleX(-1)", aspectRatio: "4 / 3" }}
      />

      <div className={`pgx-ui ${hideUi ? "is-hidden" : ""}`}>
        <nav className="pgx-nav">
          <Link href="/" className="flex items-center gap-3" aria-label="PAPAGEDON home"><BrandLogo compact /></Link>
          <Link href="/app?engine=classic" className="pgx-chip-btn">Classic engine</Link>
        </nav>
        {glError && <div className="pgx-alert mx-4 md:mx-6">{glError}</div>}

        <div className="pgx-dock">
          <div className="pgx-col pgx-col-left">
            <CollapsibleSection title="Inputs" summary={<span>{camOn ? "Camera on" : "Camera off"} · {source ? sourceLabel : "no audio"}</span>}>
              <label className="pgx-field-label">Camera (crowd)</label>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" className={`pgx-chip-btn ${camOn ? "is-on" : ""}`} onClick={() => setCamOn((v) => !v)} aria-pressed={camOn}>
                  {camOn ? "Camera on" : "Turn camera on"}
                </button>
                <button type="button" className={`pgx-chip-btn ${preview ? "is-on" : ""}`} onClick={() => setPreview((v) => !v)} aria-pressed={preview}>Preview</button>
              </div>
              {camError && <p className="pgx-hint text-amber-200">{camError}</p>}
              <label className="pgx-field-label mt-2">Audio (music)</label>
              <div className="flex flex-wrap gap-1.5">
                <label className="pgx-chip-btn cursor-pointer">
                  Load track
                  <input type="file" accept="audio/*" className="hidden" onChange={(e) => e.target.files?.[0] && void loadFile(e.target.files[0])} />
                </label>
                <button type="button" className={`pgx-chip-btn ${source === "input" ? "is-on" : ""}`} onClick={() => void startMic()}>Microphone</button>
              </div>
              {sourceError && <p className="pgx-hint text-red-300">{sourceError}</p>}
            </CollapsibleSection>

            <CollapsibleSection title="Director" summary={<span>{auto ? "Auto" : "Manual"} · {scene.name}</span>}>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" className={`pgx-chip-btn ${auto ? "is-on" : ""}`} onClick={() => setAuto(true)} aria-pressed={auto}>Auto (room-aware)</button>
                <button type="button" className={`pgx-chip-btn ${!auto ? "is-on" : ""}`} onClick={() => { setManualId(hud.sceneId); ctl.current.manualId = hud.sceneId; setAuto(false); }} aria-pressed={!auto}>Manual override</button>
              </div>
              <label className="pgx-field-label mt-2">Crowd weight α = {alpha.toFixed(2)}</label>
              <input type="range" min={0} max={1} step={0.05} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full" />
              <p className="pgx-keys"><kbd>C</kbd> camera · <kbd>A</kbd> auto · <kbd>1</kbd>–<kbd>9</kbd>/letters lock scene · <kbd>H</kbd> hide UI</p>
            </CollapsibleSection>
          </div>

          <div className="pgx-col pgx-col-right">
            <CollapsibleSection title="Shaders" defaultPinned pinOnInteract summary={<span>{auto ? "Auto" : "Manual"} · {scene.name}</span>}>
              <div className="pgx-scenes max-h-[46vh] overflow-y-auto pr-1" role="toolbar" aria-label="Shaders">
                <button type="button" className={`pgx-chip-btn ${auto ? "is-on" : ""}`} onClick={() => setAuto(true)} aria-pressed={auto} title="Room-aware auto director (A)">Auto (room-aware)</button>
                {SCENE_SECTIONS.map((sec) => (
                  <div key={sec.title}>
                    <label className="pgx-field-label mt-2">{sec.title}</label>
                    <div className="flex flex-wrap gap-1.5">
                      {sec.scenes.map((sc) => (
                        <button key={sc.id} type="button" data-scene={sc.id}
                          className={`pgx-chip-btn ${hud.sceneId === sc.id && (sec.variants ? variant === null : true) ? "is-on" : ""}`}
                          onClick={() => pickScene(sc.id)} aria-pressed={!auto && manualId === sc.id}
                          title={`${sc.name} (${sc.key})${sc.kind === "pack" ? " · press again for the next shader" : ""}`}>
                          {sc.key} · {sc.name}{sec.variants ? " (cycle)" : ""}
                        </button>
                      ))}
                      {sec.variants?.map((v, i) => (
                        <button key={v} type="button" data-variant={`${sec.variantScene}#${i}`}
                          className={`pgx-chip-btn ${hud.sceneId === sec.variantScene && variant === i ? "is-on" : ""}`}
                          onClick={() => pickScene(sec.variantScene!, i)}>{v}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="pgx-keys mt-2"><kbd>1</kbd>–<kbd>9</kbd> originals · <kbd>T</kbd> Trance · <kbd>B</kbd> Batman · <kbd>S</kbd> <kbd>F</kbd> <kbd>P</kbd> <kbd>Y</kbd> packs (again = next) · <kbd>N</kbd> <kbd>G</kbd> <kbd>R</kbd> <kbd>L</kbd> 3D · <kbd>A</kbd> auto · <kbd>C</kbd> camera · <kbd>H</kbd> hide UI</p>
            </CollapsibleSection>
            <CollapsibleSection title="Room read" summary={<span className="font-mono text-[11px]">E {Math.round(fusion.room * 100)} · {fusion.mode === "fused" ? "sight + sound" : "audio-only"}</span>}>
              <div className="grid gap-2">
                <Meter label="Motion" value={crowd?.motion ?? 0} />
                <Meter label="Density" value={crowd?.density ?? 0} />
                <Meter label="Crowd" value={crowd?.energy ?? 0} />
                <Meter label="Vision V" value={fusion.vision} />
                <Meter label="Audio A" value={fusion.audio} />
                <Meter label="Room E" value={fusion.room} />
              </div>
              <p className="pgx-hint font-mono">
                {fps.toFixed(0)} fps render · analysis {crowd ? `${crowd.latencyMs.toFixed(0)} ms` : "—"} · {backend === "opencv-service" ? "OpenCV 5 on AWS Lambda" : backend === "browser" ? "in-browser fallback" : "no camera"}
                {crowd?.people != null ? ` · ${crowd.people} people` : ""}
                {hud.bpm ? ` · ${Math.round(hud.bpm)} BPM` : ""}
                {fusion.eased ? " · easing (crowd and music disagree)" : ""}
              </p>
              {serviceDown && <p className="pgx-hint text-amber-200">Vision service unreachable, using in-browser analysis.</p>}
              <p className="pgx-hint">Only crowd-level numbers are used. No faces are recognised and no frames are stored.</p>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </div>
  );
}
