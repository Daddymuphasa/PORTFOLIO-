"use client";

/**
 * /aei operator surface. The picture is the Vision visualizers. Rules run
 * every frame. The director loop can replace a look when a reply arrives in
 * time. This file does not import the provider, so MODEL_API_KEY stays on the server.
 */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AudioAnalyzer, emptySignals, type ExperienceSignals } from "@/lib/papagedon/analyzer";
import { AudioEngine } from "@/lib/papagedon/audioSources";
import { DEFAULT_BEAT_LOOK } from "@/lib/aei/beatLook";
import { analyzeFlyer, composeBeatLook, spinModeFromStyle, styleFromRead, type FlyerRead } from "@/lib/aei/flyer";
import { aeiSceneById, AEI_SCENES } from "@/lib/aei/scenes";
import { applyOverride, cueToRenderParams, RuleDirector } from "@/lib/aei/director";
import { clampDirectorCue, DirectorLoop, syntheticCrowdScore, type DirectorInput, type LoopLogEntry } from "@/lib/aei/loop";
import { sampleEnergyArc, THEMES } from "@/lib/aei/themes";
import type { AeiStatusBody, CrowdMeter } from "@/lib/aei/statusTypes";
import type { BeatLook, Cue, DirectorSignals, DistortionStyle, ManualOverride } from "@/lib/aei/types";
import { BeatPanel, type FlyerReadout } from "./BeatPanel";
import DirectorPanel, { type LoopGate } from "./DirectorPanel";
import { depthToPicture, cachedModelDepth } from "./depthClient";
import { deviceIsLowEnd, pictureFromFile, withModelDepth } from "./gallery";
import { rasterizeImage } from "./raster";
import type { BeatPicture } from "./beatScene";
import { createAeiRenderer } from "./renderer";

type Hud = {
  energy: number;
  bass: number;
  bpm: number;
  onset: boolean;
  progress: number;
  arc: number;
  clock: number;
  scene: string;
  sceneName: string;
  intensity: number;
  strobe: number;
  paletteShift: number;
  palette: [string, string, string];
  asset: string | null;
  reason: string;
  source: Cue["source"];
};

const SILENT: DirectorSignals = {
  energy: 0,
  bass: 0,
  mid: 0,
  treble: 0,
  bpm: 0,
  onset: false,
  tension: 0,
  progress: 0,
  now: 0,
};

function formatClock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function cueSignature(cue: Cue): string {
  return `${cue.scene}|${cue.source}|${cue.asset ?? ""}|${cue.strobe >= 0.45 ? "hit" : "steady"}`;
}

async function measureDuration(file: File): Promise<number> {
  const ctx = new AudioContext();
  try {
    const decoded = await ctx.decodeAudioData(await file.arrayBuffer());
    return decoded.duration;
  } catch {
    return 0;
  } finally {
    await ctx.close();
  }
}

export default function AeiStage() {
  const originalRef = useRef<HTMLCanvasElement>(null);
  const immersiveRef = useRef<HTMLCanvasElement>(null);
  const beatRef = useRef<HTMLCanvasElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioEngine | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const themeIdRef = useRef(THEMES[0].id);
  const overrideRef = useRef<ManualOverride>({
    enabled: false,
    scene: AEI_SCENES[0].id,
    intensity: 0.4,
    strobe: 0,
    paletteShift: 0,
  });
  const durationRef = useRef(0);
  const startedRef = useRef(0);
  const snapshotRef = useRef<{ themeId: string; signals: DirectorSignals }>({ themeId: THEMES[0].id, signals: SILENT });
  const latestCueRef = useRef<Cue | null>(null);

  const [themeId, setThemeId] = useState(THEMES[0].id);
  const [override, setOverride] = useState<ManualOverride>(overrideRef.current);
  const [playing, setPlaying] = useState(false);
  const [sourceLabel, setSourceLabel] = useState("No audio yet");
  const [sourceKind, setSourceKind] = useState<string | null>(null);
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [glError, setGlError] = useState<string | null>(null);
  const [log, setLog] = useState<Cue[]>([]);
  const [status, setStatus] = useState<AeiStatusBody | null>(null);
  const [crowd, setCrowd] = useState<CrowdMeter | null>(null);
  const [beatLook, setBeatLook] = useState<BeatLook>(DEFAULT_BEAT_LOOK);
  const [beatFollow, setBeatFollow] = useState(false);
  const [pictureNames, setPictureNames] = useState<string[]>([]);
  const [depthLabel, setDepthLabel] = useState("none");
  const [lowEnd, setLowEnd] = useState(false);
  const [flyerHud, setFlyerHud] = useState<FlyerReadout | null>(null);
  const [flyerLocked, setFlyerLocked] = useState(false);
  const picturesRef = useRef<BeatPicture[]>([]);
  const beatLookRef = useRef(beatLook);
  const beatFollowRef = useRef(beatFollow);
  const flyerStyleRef = useRef<DistortionStyle | null>(null);
  const flyerLockRef = useRef(false);
  const beatTapRef = useRef(false);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const lowEndRef = useRef(false);
  const pictureSeq = useRef(0);
  const [metaMessage, setMetaMessage] = useState<string | null>(null);
  const [metaBusy, setMetaBusy] = useState(false);
  const [loopOn, setLoopOn] = useState(false);
  const [loopGate, setLoopGate] = useState<LoopGate>("auto");
  const [loopHeld, setLoopHeld] = useState(false);
  const [loopInterval, setLoopInterval] = useState(12);
  const [loopPending, setLoopPending] = useState<string | null>(null);
  const [loopLog, setLoopLog] = useState<LoopLogEntry[]>([]);
  const [demoCrowd, setDemoCrowd] = useState(false);
  const loopRef = useRef<DirectorLoop | null>(null);
  const loopOnRef = useRef(false);
  const loopGateRef = useRef<LoopGate>("auto");
  const loopHeldRef = useRef(false);
  const loopIntervalRef = useRef(12);
  const demoCrowdRef = useRef(false);
  const crowdScoreRef = useRef(0);
  const loopClockRef = useRef(0);
  const [hud, setHud] = useState<Hud>({
    energy: 0,
    bass: 0,
    bpm: 0,
    onset: false,
    progress: 0,
    arc: sampleEnergyArc(THEMES[0].energyArc, 0),
    clock: 0,
    scene: AEI_SCENES[0].id,
    sceneName: AEI_SCENES[0].name,
    intensity: 0.22,
    strobe: 0,
    paletteShift: 0,
    palette: ["#1B1430", "#F2A65A", "#E85D75"],
    asset: THEMES[0].motifs[0] ?? null,
    reason: "waiting for audio",
    source: "rules",
  });

  themeIdRef.current = themeId;
  overrideRef.current = override;
  beatLookRef.current = beatLook;
  beatFollowRef.current = beatFollow;
  flyerLockRef.current = flyerLocked;
  loopOnRef.current = loopOn;
  loopGateRef.current = loopGate;
  loopHeldRef.current = loopHeld;
  loopIntervalRef.current = loopInterval;
  demoCrowdRef.current = demoCrowd;
  crowdScoreRef.current = crowd ? Math.min(1, Math.max(0, crowd.densityScore / 100)) : 0;

  useEffect(() => {
    let cancelled = false;
    const pull = () => {
      fetch("/api/aei/status")
        .then((response) => (response.ok ? response.json() : null))
        .then((data: AeiStatusBody | null) => {
          if (!cancelled) setStatus(data);
        })
        .catch(() => {
          if (!cancelled) setStatus(null);
        });
    };
    pull();
    const timer = setInterval(pull, 5000);
    fetch("/api/aei/crowd")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: CrowdMeter | null) => {
        if (!cancelled && data) setCrowd(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!loopOn || demoCrowd) return;
    let cancelled = false;
    const pull = () => {
      fetch("/api/aei/crowd")
        .then((response) => (response.ok ? response.json() : null))
        .then((data: CrowdMeter | null) => {
          if (!cancelled && data) setCrowd(data);
        })
        .catch(() => undefined);
    };
    const timer = setInterval(pull, 8000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [loopOn, demoCrowd]);

  useEffect(() => {
    const original = originalRef.current;
    const immersive = immersiveRef.current;
    const beat = beatRef.current;
    if (!original || !immersive || !beat) return;
    const lowEndDevice = deviceIsLowEnd();
    lowEndRef.current = lowEndDevice;
    setLowEnd(lowEndDevice);
    const audio = new AudioEngine();
    const analyzer = new AudioAnalyzer();
    const director = new RuleDirector();
    const loop = new DirectorLoop({ intervalSec: loopIntervalRef.current });
    loop.setEnabled(loopOnRef.current);
    loop.setGate(loopGateRef.current);
    loop.setInterval(loopIntervalRef.current);
    if (loopHeldRef.current && latestCueRef.current) loop.kill(latestCueRef.current);
    loopRef.current = loop;
    audioRef.current = audio;
    let renderer: ReturnType<typeof createAeiRenderer> | null = null;
    let glFailed = false;
    try {
      renderer = createAeiRenderer(original, immersive, beat);
    } catch (error) {
      setGlError(error instanceof Error ? error.message : "WebGL failed to start");
      glFailed = true;
    }
    let raf = 0;
    let alive = true;
    let lastHud = 0;
    let lastLog = 0;
    let lastSig = "";
    let lastAudio = audio.ctx.currentTime;
    let lastStamp = performance.now();
    const postSession = (body: Record<string, unknown>) => {
      void fetch("/api/aei/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      }).catch(() => undefined);
    };
    const requestCue = (ask: { token: number; input: DirectorInput }) => {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 1600);
      const started = performance.now();
      let settled = false;
      const finish = (
        result:
          | { ok: true; source: "live" | "mock"; latencyMs: number; draft: NonNullable<ReturnType<typeof clampDirectorCue>> }
          | { ok: false; latencyMs: number },
      ) => {
        if (settled || !alive) return;
        settled = true;
        window.clearTimeout(timer);
        const engine = loopRef.current;
        if (!engine) return;
        const now = loopClockRef.current;
        const outcome = engine.complete(
          ask.token,
          result.ok
            ? {
                ok: true,
                source: result.source,
                latencyMs: result.latencyMs,
                draft: result.draft,
                now,
                crowdBefore: ask.input.crowd.score,
              }
            : { ok: false, latencyMs: result.latencyMs, now, scene: ask.input.current.scene },
        );
        if (outcome === "pending") {
          setLoopPending(result.ok ? result.draft.reason : null);
          return;
        }
        setLoopPending(null);
        if (!outcome) return;
        setLoopLog((prev) => [outcome, ...prev].slice(0, 24));
        postSession({
          at: outcome.at,
          scene: outcome.scene,
          source: outcome.source,
          intensity: ask.input.current.intensity,
          strobe: ask.input.current.strobe,
          asset: null,
          reason: outcome.reason,
          latencyMs: outcome.latencyMs,
          crowdBefore: outcome.crowdBefore,
        });
      };
      void fetch("/api/aei/director", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(ask.input),
        signal: controller.signal,
      })
        .then(async (response) => {
          const elapsed = performance.now() - started;
          const data = (await response.json().catch(() => null)) as { ok?: boolean; source?: string; latencyMs?: number; cue?: unknown } | null;
          const latencyMs = typeof data?.latencyMs === "number" ? data.latencyMs : elapsed;
          if (!response.ok || !data?.ok || (data.source !== "live" && data.source !== "mock")) {
            finish({ ok: false, latencyMs });
            return;
          }
          const draft = clampDirectorCue(data.cue, ask.input.theme.palette);
          if (!draft) {
            finish({ ok: false, latencyMs });
            return;
          }
          finish({ ok: true, source: data.source, latencyMs, draft });
        })
        .catch(() => finish({ ok: false, latencyMs: performance.now() - started }));
    };
    const tick = (nowMs: number) => {
      const step = Math.min(0.1, Math.max(0, (nowMs - lastStamp) / 1000));
      lastStamp = nowMs;
      loopClockRef.current += step;
      const frame = audio.readFrame();
      const analysis: ExperienceSignals = frame ? analyzer.update(frame) : emptySignals();
      const theme = THEMES.find((entry) => entry.id === themeIdRef.current) ?? THEMES[0];
      const duration = durationRef.current;
      const fileClock = audio.kind === "file" ? audio.filePosition() : 0;
      const liveClock = audio.kind && audio.kind !== "file" ? Math.max(0, audio.ctx.currentTime - startedRef.current) : 0;
      const clock = audio.kind === "file" ? fileClock : liveClock;
      const progress = duration > 0 ? (fileClock % duration) / duration : 0;
      const signals: DirectorSignals = {
        energy: analysis.energy,
        bass: analysis.bass,
        mid: analysis.mid,
        treble: analysis.treble,
        bpm: analysis.bpm,
        onset: analysis.beat,
        tension: analysis.tension,
        progress,
        now: audio.ctx.currentTime,
      };
      snapshotRef.current = { themeId: theme.id, signals };
      const directed = director.update(signals, theme);
      const style = flyerStyleRef.current ?? theme.style;
      const crowdScore = demoCrowdRef.current ? syntheticCrowdScore(progress) : crowdScoreRef.current;
      const directedFrame = loop.frame(directed, {
        now: loopClockRef.current,
        onset: signals.onset,
        energy: signals.energy,
        bpm: signals.bpm,
        progress,
        crowd: crowdScore,
        theme,
        style,
      });
      if (directedFrame.ask) requestCue(directedFrame.ask);
      if (directedFrame.committed) {
        const entry = directedFrame.committed;
        setLoopLog((prev) => [entry, ...prev].slice(0, 24));
        postSession({
          at: entry.at,
          scene: entry.scene,
          source: entry.source,
          intensity: directedFrame.cue.intensity,
          strobe: directedFrame.cue.strobe,
          asset: directedFrame.cue.asset,
          reason: entry.reason,
          latencyMs: entry.latencyMs,
          crowdBefore: entry.crowdBefore,
        });
      }
      if (directedFrame.response) {
        const note = directedFrame.response;
        setLoopLog((prev) =>
          prev.map((row) =>
            row.crowdAfter == null && row.scene === note.scene && Math.abs(row.at - note.at) < 0.05 ? { ...row, crowdAfter: note.crowdAfter } : row,
          ),
        );
        postSession({ update: true, at: note.at, scene: note.scene, crowdAfter: note.crowdAfter });
      }
      const cue = applyOverride(directedFrame.cue, overrideRef.current);
      latestCueRef.current = cue;
      const params = cueToRenderParams(cue, theme);
      const wash = washRef.current;
      if (wash) {
        const [a, b, c] = params.palette;
        wash.style.background = `linear-gradient(125deg, ${a} 0%, ${b} 52%, ${c} 100%)`;
        const veil = cue.scene === "beat-image" ? 0.22 : 1;
        wash.style.opacity = String((0.16 + params.intensity * 0.32) * veil);
      }
      const flash = flashRef.current;
      if (flash) {
        flash.style.background = params.palette[1];
        flash.style.opacity = String(Math.min(0.4, params.strobe * 0.42));
      }
      if (renderer && !glFailed) {
        try {
          const audioNow = audio.ctx.currentTime;
          const dt = Math.min(0.05, Math.max(0, audioNow - lastAudio));
          lastAudio = audioNow;
          const look = composeBeatLook(
            beatFollowRef.current ? cue.beat : beatLookRef.current,
            flyerStyleRef.current,
            flyerLockRef.current,
            beatFollowRef.current,
            signals,
          );
          renderer.setBeat(picturesRef.current, {
            dt,
            time: audioNow,
            bpm: analysis.bpm,
            bass: analysis.bass,
            mid: analysis.mid,
            treble: analysis.treble,
            onset: analysis.beat,
            tap: beatTapRef.current,
            look,
            lowEnd: lowEndRef.current,
            pointer: pointerRef.current,
          });
          beatTapRef.current = false;
          renderer.render(params, analysis, analysis.beat);
        } catch (error) {
          glFailed = true;
          setGlError(error instanceof Error ? error.message : "Scene failed to start");
        }
      }
      const sig = `${cueSignature(cue)}|e${Math.round(analysis.energy * 5)}`;
      if (cue.source !== "live" && cue.source !== "mock" && sig !== lastSig && (lastSig === "" || nowMs - lastLog > 600)) {
        lastSig = sig;
        lastLog = nowMs;
        setLog((prev) => [cue, ...prev].slice(0, 24));
        postSession({
          at: cue.at,
          scene: cue.scene,
          source: cue.source,
          intensity: cue.intensity,
          strobe: cue.strobe,
          asset: cue.asset,
          reason: cue.reason,
        });
      }
      if (nowMs - lastHud > 120) {
        lastHud = nowMs;
        const scene = aeiSceneById(cue.scene);
        if (beatFollowRef.current) {
          setBeatLook(composeBeatLook(cue.beat, flyerStyleRef.current, flyerLockRef.current, true, signals));
        }
        setHud({
          energy: analysis.energy,
          bass: analysis.bass,
          bpm: analysis.bpm,
          onset: analysis.beat,
          progress,
          arc: sampleEnergyArc(theme.energyArc, progress),
          clock,
          scene: cue.scene,
          sceneName: scene?.name ?? cue.scene,
          intensity: cue.intensity,
          strobe: cue.strobe,
          paletteShift: cue.paletteShift,
          palette: params.palette,
          asset: cue.asset,
          reason: cue.reason,
          source: cue.source,
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      renderer?.dispose();
      audioRef.current = null;
      if (loopRef.current === loop) loopRef.current = null;
      void audio.close();
    };
  }, []);

  async function loadFile(file: File) {
    const audio = audioRef.current;
    if (!audio) return;
    setSourceError(null);
    try {
      await audio.ctx.resume();
      durationRef.current = await measureDuration(file);
      await audio.loadFile(file);
      startedRef.current = audio.ctx.currentTime;
      setSourceLabel(file.name);
      setSourceKind("file");
      setPlaying(true);
    } catch (error) {
      setSourceError(error instanceof Error ? error.message : "Could not read that audio");
    }
  }

  async function loadSample() {
    const audio = audioRef.current;
    if (!audio) return;
    setSourceError(null);
    try {
      await audio.ctx.resume();
      const response = await fetch("/aei/sample-kick.wav");
      if (!response.ok) throw new Error("Sample file is missing");
      const blob = await response.blob();
      await loadFile(new File([blob], "sample-kick.wav", { type: "audio/wav" }));
    } catch (error) {
      setSourceError(error instanceof Error ? error.message : "Could not load the sample");
    }
  }

  async function listenToMic() {
    const audio = audioRef.current;
    if (!audio) return;
    setSourceError(null);
    try {
      await audio.useInput();
      durationRef.current = 0;
      startedRef.current = audio.ctx.currentTime;
      setSourceLabel(audio.label || "Microphone");
      setSourceKind("input");
      setPlaying(true);
    } catch (error) {
      setSourceError(error instanceof Error ? error.message : "Microphone was blocked");
    }
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || audio.kind !== "file") return;
    audio.togglePlayPause();
    setPlaying(audio.playing);
  }

  function rememberPictures(next: BeatPicture[]) {
    picturesRef.current = next.slice(-6);
    setPictureNames(picturesRef.current.map((picture) => picture.name));
    const model = picturesRef.current.some((picture) => picture.kind === "model");
    setDepthLabel(model ? "model" : picturesRef.current.length ? "brightness" : "none");
  }

  async function addPictures(files: File[]) {
    const lowEnd = deviceIsLowEnd();
    lowEndRef.current = lowEnd;
    const added: BeatPicture[] = [];
    for (const file of files.slice(0, 6)) {
      pictureSeq.current += 1;
      try {
        added.push(await pictureFromFile(file, file.name || "picture", `pic-${pictureSeq.current}`, lowEnd));
      } catch {
        setSourceError("Could not read that picture");
      }
    }
    if (!added.length) return;
    rememberPictures([...picturesRef.current, ...added]);
    setDepthLabel("loading");
    for (const picture of added) {
      void cachedModelDepth(picture.id, picture.rgba, picture.size, picture.size)
        .then((model) => {
          const fitted = depthToPicture(model, picture.size, picture.size);
          rememberPictures(picturesRef.current.map((row) => (row.id === picture.id ? withModelDepth(row, fitted) : row)));
        })
        .catch(() => {
          if (!picturesRef.current.some((row) => row.kind === "model")) {
            setDepthLabel(picturesRef.current.length ? "brightness" : "none");
          }
        });
    }
  }

  function applyFlyerStyle(style: DistortionStyle, read: FlyerRead, name = "") {
    flyerStyleRef.current = style;
    setFlyerHud({ warmth: read.warmth, busyness: read.busyness, name });
    setBeatFollow(false);
    setBeatLook((current) => ({
      ...current,
      style,
      spinMode: spinModeFromStyle(style.spinStyle),
      distortion: Math.min(1, Math.max(current.distortion * 0.35, style.amplitude)),
      glitch: style.wave === "glitch" ? Math.max(current.glitch, 0.62) : Math.min(current.glitch, style.amplitude),
    }));
  }

  function setStyleLock(locked: boolean) {
    if (locked && flyerStyleRef.current) flyerStyleRef.current = beatLookRef.current.style;
    flyerLockRef.current = locked;
    setFlyerLocked(locked);
  }

  async function studyFlyer(file: File) {
    openBeat(false);
    let read: FlyerRead;
    try {
      const rgba = await rasterizeImage(file, 160);
      read = analyzeFlyer(rgba, 160, 160);
    } catch {
      setSourceError("Could not read that flyer");
      return;
    }
    if (!flyerLockRef.current || !flyerStyleRef.current) applyFlyerStyle(styleFromRead(read), read);
    await addPictures([file]);
    try {
      const response = await fetch("/api/aei/flyer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brief: file.name.replace(/\.[^.]+$/, "") || "event flyer", read }),
      });
      if (!response.ok || flyerLockRef.current) return;
      const data = (await response.json()) as { style?: DistortionStyle; name?: string; read?: FlyerRead };
      if (!data.style) return;
      applyFlyerStyle(data.style, data.read ?? read, data.name ?? "");
    } catch {
      // The local reading already set the wave.
    }
  }

  async function loadSampleFlyer() {
    try {
      const response = await fetch("/aei/sample-flyer.png");
      if (!response.ok) throw new Error("Sample flyer is missing");
      const blob = await response.blob();
      await studyFlyer(new File([blob], "sample-flyer.png", { type: "image/png" }));
    } catch {
      setSourceError("Could not load the sample flyer");
    }
  }

  async function loadSamplePicture() {
    try {
      const response = await fetch("/aei/beat-sample.png");
      if (!response.ok) throw new Error("Sample picture is missing");
      const blob = await response.blob();
      await addPictures([new File([blob], "sample.png", { type: "image/png" })]);
    } catch {
      setSourceError("Could not load the sample picture");
    }
  }

  function openBeat(sample = true) {
    const cue = latestCueRef.current;
    setOverride({
      enabled: true,
      scene: "beat-image",
      intensity: cue?.intensity ?? override.intensity,
      strobe: cue?.strobe ?? 0,
      paletteShift: cue?.paletteShift ?? 0,
    });
    if (sample && picturesRef.current.length === 0) void loadSamplePicture();
  }

  function setManual(next: Partial<ManualOverride>) {
    setOverride((current) => ({ ...current, ...next }));
  }

  function loopEngine(): DirectorLoop {
    if (!loopRef.current) loopRef.current = new DirectorLoop({ intervalSec: loopIntervalRef.current });
    return loopRef.current;
  }

  function setLoopEnabled(on: boolean) {
    const engine = loopEngine();
    engine.setEnabled(on);
    if (on) engine.setInterval(loopIntervalRef.current);
    setLoopOn(on);
  }

  function setGate(gate: LoopGate) {
    loopEngine().setGate(gate);
    setLoopGate(gate);
  }

  function setAskInterval(seconds: number) {
    loopEngine().setInterval(seconds);
    setLoopInterval(Math.min(15, Math.max(10, Math.round(seconds))));
  }

  function setHeld(held: boolean) {
    const engine = loopEngine();
    if (held) {
      const current = latestCueRef.current;
      if (current) engine.kill(current);
      else engine.killed = true;
    } else {
      engine.release();
    }
    setLoopHeld(held);
  }

  function approveCue() {
    if (loopEngine().approve(loopClockRef.current)) setLoopPending(null);
  }

  function skipCue() {
    if (loopEngine().skip()) setLoopPending(null);
  }

  async function startLoopDemo() {
    const engine = loopEngine();
    engine.release();
    engine.setGate("auto");
    engine.setInterval(loopIntervalRef.current);
    engine.setEnabled(true);
    setLoopHeld(false);
    setLoopGate("auto");
    setLoopOn(true);
    setDemoCrowd(true);
    setLoopPending(null);
    await loadSample();
  }

  function enableOverride() {
    const cue = latestCueRef.current;
    setOverride({
      enabled: true,
      scene: cue?.scene ?? AEI_SCENES[0].id,
      intensity: cue?.intensity ?? 0.4,
      strobe: cue?.strobe ?? 0,
      paletteShift: cue?.paletteShift ?? 0,
    });
  }

  async function askMeta() {
    setMetaBusy(true);
    setMetaMessage(null);
    try {
      const response = await fetch("/api/aei/cue", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(snapshotRef.current),
      });
      const data = (await response.json()) as { error?: string; cue?: Cue };
      if (!response.ok || !data.cue) {
        setMetaMessage(data.error || "Meta request failed");
        return;
      }
      setLog((prev) => [data.cue as Cue, ...prev].slice(0, 24));
      setMetaMessage(`Logged a Meta cue for ${data.cue.scene}. Rules still drive the picture.`);
    } catch {
      setMetaMessage("Meta request failed");
    } finally {
      setMetaBusy(false);
    }
  }

  const theme = THEMES.find((entry) => entry.id === themeId) ?? THEMES[0];
  const shownScene = override.enabled ? override.scene : hud.scene;
  const shownIntensity = override.enabled ? override.intensity : hud.intensity;
  const shownStrobe = override.enabled ? override.strobe : hud.strobe;
  const shownShift = override.enabled ? override.paletteShift : hud.paletteShift;

  return (
    <main
      className="fixed inset-0 bg-black text-foreground"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const files = [...event.dataTransfer.files].filter((file) => file.type.startsWith("image/"));
        if (!files.length) return;
        openBeat(false);
        void addPictures(files);
      }}
      onPointerMove={(event) => {
        const canvas = beatRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        pointerRef.current = {
          x: Math.min(1, Math.max(0, (event.clientX - rect.left) / Math.max(1, rect.width))),
          y: Math.min(1, Math.max(0, (event.clientY - rect.top) / Math.max(1, rect.height))),
        };
      }}
    >
      <canvas ref={originalRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <canvas ref={immersiveRef} className="absolute inset-0 h-full w-full" style={{ visibility: "hidden" }} aria-hidden />
      <canvas ref={beatRef} className="absolute inset-0 h-full w-full" style={{ visibility: "hidden" }} aria-hidden />
      <div ref={washRef} className="pointer-events-none absolute inset-0 mix-blend-soft-light" aria-hidden />
      <div ref={flashRef} className="pointer-events-none absolute inset-0 mix-blend-screen" aria-hidden />

      <aside className="absolute inset-x-0 bottom-0 z-10 max-h-[46vh] overflow-y-auto border-t border-white/10 bg-[#0b110e]/88 p-4 backdrop-blur-md md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[22rem] md:border-l md:border-t-0">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="pg-label">PAPAGEDON · AEI</p>
            <h1 className="mt-1 font-heading text-lg leading-tight">Audio Experience Intelligence</h1>
          </div>
          <Link href="/" className="pg-label shrink-0 pt-1 underline decoration-white/20 underline-offset-4">
            Portfolio
          </Link>
        </div>

        <section className="space-y-2" aria-label="Audio">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="pg-btn pg-btn-primary" onClick={() => void loadSample()}>
              Play sample
            </button>
            <button type="button" className="pg-btn" onClick={() => fileRef.current?.click()}>
              Load audio
            </button>
            <button type="button" className="pg-btn" onClick={() => void listenToMic()}>
              Mic
            </button>
            <button type="button" className="pg-btn" onClick={togglePlay} disabled={sourceKind !== "file"}>
              {playing && sourceKind === "file" ? "Pause" : "Play"}
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="audio/*"
            aria-label="Audio file"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) void loadFile(file);
            }}
          />
          <p className="text-xs text-muted">
            {sourceLabel}
            {sourceKind === "file" ? ` · ${formatClock(hud.clock)}` : ""}
          </p>
          {sourceError ? <p className="text-xs text-[#e7b8b0]">{sourceError}</p> : null}
          {glError ? <p className="text-xs text-[#e7b8b0]">{glError}</p> : null}
        </section>

        <section className="mt-4" aria-label="Theme">
          <label className="block">
            <span className="pg-label">Theme</span>
            <select
              className="pg-select mt-1"
              value={themeId}
              onChange={(event) => setThemeId(event.target.value)}
            >
              {THEMES.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.name}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-1 text-xs leading-relaxed text-muted">{theme.mood}</p>
          <button type="button" className="pg-btn mt-2" onClick={() => openBeat()}>
            Beat Image
          </button>
        </section>
        {shownScene === "beat-image" ? (
          <BeatPanel
            look={beatFollow ? (latestCueRef.current?.beat ?? beatLook) : beatLook}
            follow={beatFollow}
            depth={depthLabel}
            names={pictureNames}
            lowEnd={lowEnd}
            onLook={setBeatLook}
            onFollow={setBeatFollow}
            onFiles={(files) => void addPictures(files)}
            onSample={() => void loadSamplePicture()}
            onClear={() => rememberPictures([])}
            onTap={() => {
              beatTapRef.current = true;
            }}
            flyer={flyerHud}
            locked={flyerLocked}
            onFlyer={(files) => {
              const file = files[0];
              if (file) void studyFlyer(file);
            }}
            onSampleFlyer={() => void loadSampleFlyer()}
            onLock={setStyleLock}
          />
        ) : null}

        <section className="mt-4 space-y-2" aria-label="Live readout">
          <div className="flex items-center justify-between gap-3">
            <p className="font-heading text-sm">{hud.sceneName}</p>
            <span className={`pgx-live-dot ${hud.onset ? "is-on" : ""}`} title={hud.onset ? "Onset" : "Between onsets"} />
          </div>
          <Meter label="Energy" value={hud.energy} />
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <span>BPM {hud.bpm ? Math.round(hud.bpm) : "—"}</span>
            <span>Arc {hud.arc.toFixed(2)}</span>
            <span>{hud.source}</span>
          </div>
          <div className="flex gap-1.5" aria-label="Palette">
            {hud.palette.map((color) => (
              <span key={color} className="h-3 flex-1 rounded-sm border border-white/15" style={{ background: color }} />
            ))}
          </div>
          <p className="text-xs leading-relaxed text-muted">
            {hud.reason}
            {hud.asset ? ` · ${hud.asset}` : ""}
          </p>
        </section>

        <section className="mt-4 space-y-2" aria-label="Manual override">
          <div className="flex items-center justify-between">
            <span className="pg-label">Manual override</span>
            <button
              type="button"
              className={`pg-btn ${override.enabled ? "pg-btn-on" : ""}`}
              aria-pressed={override.enabled}
              onClick={() => (override.enabled ? setManual({ enabled: false }) : enableOverride())}
            >
              {override.enabled ? "On" : "Off"}
            </button>
          </div>
          <label className="block">
            <span className="pg-label">Scene</span>
            <select
              className="pg-select mt-1"
              value={shownScene}
              disabled={!override.enabled}
              onChange={(event) => setManual({ scene: event.target.value })}
            >
              {AEI_SCENES.map((scene) => (
                <option key={scene.id} value={scene.id}>
                  {scene.name}
                </option>
              ))}
            </select>
          </label>
          <Slider label="Intensity" value={shownIntensity} disabled={!override.enabled} onChange={(intensity) => setManual({ intensity })} />
          <Slider label="Strobe" value={shownStrobe} disabled={!override.enabled} onChange={(strobe) => setManual({ strobe })} />
          <Slider label="Palette shift" value={shownShift} disabled={!override.enabled} onChange={(paletteShift) => setManual({ paletteShift })} />
        </section>

        <section className="mt-4" aria-label="Director">
          <p className="pg-label">Director</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Rules drive every frame.
            {status == null ? " Checking providers…" : status.metaConfigured ? " Model key is present." : " Model key is not set, so providers stay on mock data."}
            {" "}
            The loop can change the picture when a reply arrives in time. The one-shot request stays in the log.
          </p>
          <ul className="mt-2 space-y-1 font-mono text-[10px] leading-relaxed text-[#d5ddd6]">
            {(status?.providers ?? []).map((provider) => (
              <li key={provider.id}>
                {provider.id} · {provider.mode} · key {provider.keyPresent ? "present" : "missing"}
                {provider.lastLatencyMs == null ? "" : ` · ${provider.lastLatencyMs}ms`}
                {provider.lastError ? ` · ${provider.lastError}` : ""}
              </li>
            ))}
          </ul>
          <p className="mt-1 font-mono text-[10px] text-muted">
            Session {status?.usage.calls ?? 0} calls · {status?.usage.images ?? 0} images · {status?.usage.tokens ?? 0} tokens
          </p>
          {crowd ? (
            <p className="mt-1 font-mono text-[10px] text-muted">
              Crowd meter {crowd.label} · {crowd.personCount} · {crowd.coveragePercent}% · density {crowd.densityScore}
            </p>
          ) : null}
          <button type="button" className="pg-btn mt-2" onClick={() => void askMeta()} disabled={metaBusy}>
            {metaBusy ? "Asking…" : "Request Meta cue"}
          </button>
          {metaMessage ? <p className="mt-2 text-xs text-muted">{metaMessage}</p> : null}
          <DirectorPanel
            enabled={loopOn}
            gate={loopGate}
            held={loopHeld}
            interval={loopInterval}
            pending={loopPending}
            loopLog={loopLog}
            ruleLog={log}
            onEnabled={setLoopEnabled}
            onGate={setGate}
            onInterval={setAskInterval}
            onApprove={approveCue}
            onSkip={skipCue}
            onHold={setHeld}
            onDemo={() => void startLoopDemo()}
          />
        </section>
      </aside>
    </main>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="grid grid-cols-[64px_1fr_28px] items-center gap-2">
      <span className="pg-label !tracking-[0.12em]">{label}</span>
      <div className="pgx-meter">
        <span style={{ width: `${pct}%` }} />
      </div>
      <span className="text-right font-mono text-[10px] text-muted">{pct}</span>
    </div>
  );
}

function Slider({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between">
        <span className="pg-label">{label}</span>
        <span className="font-mono text-[10px] text-muted">{value.toFixed(2)}</span>
      </span>
      <input
        className="mt-1 w-full accent-[#5aa98a]"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
