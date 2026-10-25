/**
 * Director loop. The picture keeps using the rule director every frame.
 * This module only decides when to ask for another cue, checks the reply,
 * and holds a scene so the look does not flicker.
 */
import { withTimeout } from "./policy";
import { AEI_SCENE_IDS } from "./scenes";
import type { BeatLook, BeatRenderMode, Cue, DistortionStyle, SpinMode, ThemePack, WaveKind } from "./types";
import { DEFAULT_STYLE } from "./flyer";

export type SectionGuess = "intro" | "build" | "drop" | "breakdown";
export type CueTransition = "cut" | "beat" | "bar";
export type AskReason = "interval" | "drop" | "spike" | "crowd";
export type LoopGate = "auto" | "approve";
export type LoopSource = "live" | "mock" | "rules";

export type MusicSample = { t: number; energy: number; bpm: number; onset: boolean };

export type MusicWindow = {
  energy: number;
  bpm: number;
  onsetDensity: number;
  slope: number;
  section: SectionGuess;
};

export type CrowdPoint = { t: number; score: number };

export type CrowdTrend = { score: number; trend: number };

export type CueMemory = {
  id: string;
  at: number;
  scene: string;
  source: LoopSource;
  reason: string;
  crowdBefore: number;
  crowdAfter: number | null;
};

export type DirectorInput = {
  theme: { id: string; name: string; mood: string; palette: string[]; style: DistortionStyle };
  music: MusicWindow;
  crowd: CrowdTrend;
  current: { scene: string; intensity: number; paletteShift: number; strobe: number };
  history: CueMemory[];
  now: number;
};

export type DirectorCueDraft = {
  scene: string;
  paletteShift: number;
  intensity: number;
  strobe: number;
  asset: string | null;
  transition: CueTransition;
  duration: number;
  reason: string;
  beat: BeatLook;
};

export type LoopLogEntry = {
  id: string;
  at: number;
  scene: string;
  source: LoopSource;
  reason: string;
  latencyMs: number;
  crowdBefore: number;
  crowdAfter: number | null;
};

const SPIN_MODES = new Set<SpinMode>(["continuous", "kick", "bar"]);
const RENDER_MODES = new Set<BeatRenderMode>(["mesh", "points"]);
const WAVES = new Set<WaveKind>(["sine", "ripple", "liquid", "glitch"]);
const TRANSITIONS = new Set<CueTransition>(["cut", "beat", "bar"]);

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function clampRange(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

/** A smooth stand-in score for the sample clip. No live crowd is required. */
export function syntheticCrowdScore(progress: number): number {
  const p = clamp01(progress);
  return clamp01(0.18 + 0.5 * p + 0.22 * Math.sin(p * Math.PI));
}

export function guessSection(input: { energy: number; onsetDensity: number; slope: number; progress: number }): SectionGuess {
  const energy = clamp01(input.energy);
  const slope = Number.isFinite(input.slope) ? input.slope : 0;
  const density = Number.isFinite(input.onsetDensity) ? Math.max(0, input.onsetDensity) : 0;
  const progress = clamp01(input.progress);
  if (energy >= 0.68 && (slope >= 0.08 || density >= 1.6)) return "drop";
  if (slope <= -0.1 && energy <= 0.62) return "breakdown";
  if (progress < 0.18 && energy < 0.38 && slope < 0.12) return "intro";
  if (slope >= 0.06) return "build";
  if (energy < 0.32) return "intro";
  return "build";
}

export function summarizeMusic(samples: readonly MusicSample[], now: number, progress: number): MusicWindow {
  const windowed = samples.filter((sample) => now - sample.t <= 8 && sample.t <= now);
  if (!windowed.length) {
    return { energy: 0, bpm: 0, onsetDensity: 0, slope: 0, section: guessSection({ energy: 0, onsetDensity: 0, slope: 0, progress }) };
  }
  const energy = windowed.reduce((sum, sample) => sum + clamp01(sample.energy), 0) / windowed.length;
  const tempos = windowed.map((sample) => sample.bpm).filter((bpm) => bpm > 1);
  const bpm = tempos.length ? tempos[tempos.length - 1] : 0;
  const span = Math.max(0.5, now - windowed[0].t);
  const onsets = windowed.filter((sample) => sample.onset).length;
  const onsetDensity = onsets / span;
  const head = windowed.slice(0, Math.max(1, Math.floor(windowed.length / 4)));
  const tail = windowed.slice(-Math.max(1, Math.floor(windowed.length / 4)));
  const headMean = head.reduce((sum, sample) => sum + clamp01(sample.energy), 0) / head.length;
  const tailMean = tail.reduce((sum, sample) => sum + clamp01(sample.energy), 0) / tail.length;
  const slope = (tailMean - headMean) / span;
  return { energy, bpm, onsetDensity, slope, section: guessSection({ energy, onsetDensity, slope, progress }) };
}

export function energySpike(samples: readonly MusicSample[], now: number): boolean {
  const recent = samples.filter((sample) => now - sample.t <= 0.6 && sample.t <= now);
  const prior = samples.filter((sample) => now - sample.t > 0.6 && now - sample.t <= 2.2);
  if (recent.length < 2 || prior.length < 2) return false;
  const recentMean = recent.reduce((sum, sample) => sum + sample.energy, 0) / recent.length;
  const priorMean = prior.reduce((sum, sample) => sum + sample.energy, 0) / prior.length;
  return recentMean - priorMean >= 0.28;
}

export function summarizeCrowd(samples: readonly CrowdPoint[], now: number): CrowdTrend {
  const windowed = samples.filter((sample) => now - sample.t <= 8 && sample.t <= now);
  if (!windowed.length) return { score: 0, trend: 0 };
  const score = clamp01(windowed[windowed.length - 1].score);
  const older = [...windowed].reverse().find((sample) => now - sample.t >= 2) ?? windowed[0];
  return { score, trend: Math.min(1, Math.max(-1, score - clamp01(older.score))) };
}

export function askReason(input: {
  sinceSec: number;
  intervalSec: number;
  minGapSec: number;
  warmed: boolean;
  busy: boolean;
  section: SectionGuess;
  previousSection: SectionGuess | null;
  spike: boolean;
  crowdDelta: number;
}): AskReason | null {
  if (!input.warmed || input.busy) return null;
  if (!(input.sinceSec >= input.minGapSec)) return null;
  if (input.previousSection && input.section === "drop" && input.previousSection !== "drop") return "drop";
  if (input.spike) return "spike";
  if (Math.abs(input.crowdDelta) >= 0.18) return "crowd";
  if (input.sinceSec >= input.intervalSec) return "interval";
  return null;
}

export function buildDirectorInput(args: {
  theme: ThemePack;
  style: DistortionStyle;
  music: MusicWindow;
  crowd: CrowdTrend;
  current: DirectorInput["current"];
  history: readonly CueMemory[];
  now: number;
}): DirectorInput {
  return {
    theme: {
      id: args.theme.id,
      name: args.theme.name,
      mood: args.theme.mood,
      palette: [...args.theme.palette],
      style: args.style,
    },
    music: args.music,
    crowd: args.crowd,
    current: args.current,
    history: args.history.slice(-6),
    now: args.now,
  };
}

function spinStyleFor(mode: SpinMode): DistortionStyle["spinStyle"] {
  if (mode === "kick") return "pulse";
  if (mode === "bar") return "snap";
  return "glide";
}

function sceneFor(section: SectionGuess, current: string): string {
  const peak = AEI_SCENE_IDS.includes("electric-nexus") ? "electric-nexus" : AEI_SCENE_IDS[AEI_SCENE_IDS.length - 1];
  const calm = AEI_SCENE_IDS[0] ?? "liquid-mirror";
  const mid = AEI_SCENE_IDS[Math.min(AEI_SCENE_IDS.length - 1, Math.floor(AEI_SCENE_IDS.length * 0.45))] ?? calm;
  if (section === "drop") return current === "beat-image" ? current : peak;
  if (section === "intro") return calm;
  if (section === "breakdown") return calm;
  return mid;
}

/** Deterministic cue used when no live call is confirmed. */
export function mockDirectorCue(input: DirectorInput): DirectorCueDraft {
  const energy = clamp01(input.music.energy);
  const section = input.music.section;
  const scene = sceneFor(section, input.current.scene);
  const style = input.theme.style;
  const spinMode: SpinMode = section === "drop" ? "kick" : section === "intro" || section === "breakdown" ? "continuous" : style.spinStyle === "glide" ? "continuous" : "bar";
  const wave: WaveKind = section === "breakdown" || section === "intro" ? "sine" : style.wave;
  const amplitude = clamp01(style.amplitude * (0.55 + energy * 0.6));
  const frequency = clamp01(style.frequency * (section === "drop" ? 1.25 : 0.85));
  const speed = clamp01(style.speed * (0.7 + energy * 0.5));
  const glitch = section === "drop" ? clamp01(0.25 + energy * 0.45) : clamp01(style.wave === "glitch" ? 0.4 : 0.12);
  const relief = clamp01(0.35 + energy * 0.5);
  const trend = input.crowd.trend > 0.04 ? "rising" : input.crowd.trend < -0.04 ? "easing" : "steady";
  const beat: BeatLook = {
    relief,
    spin: clamp01(section === "drop" ? 0.72 : 0.34 + energy * 0.3),
    spinMode,
    distortion: amplitude,
    glitch,
    points: clamp01(0.4 + energy * 0.45),
    mode: energy > 0.75 ? "points" : "mesh",
    swap: 0,
    style: {
      ...style,
      palette: input.theme.palette.length ? [...input.theme.palette] : [...style.palette],
      wave,
      amplitude,
      frequency,
      speed,
      spinStyle: spinStyleFor(spinMode),
    },
  };
  return {
    scene,
    paletteShift: clamp01(energy * 0.35 + (section === "drop" ? 0.2 : 0)),
    intensity: clamp01(section === "drop" ? 0.62 + energy * 0.38 : section === "intro" ? 0.24 + energy * 0.2 : 0.3 + energy * 0.45),
    strobe: section === "drop" ? clamp01(0.2 + energy * 0.3) : 0,
    asset: null,
    transition: section === "drop" ? "beat" : "bar",
    duration: section === "drop" ? 10 : 12,
    reason: `${section} · energy ${energy.toFixed(2)} · crowd ${trend}`,
    beat,
  };
}

export function clampDirectorCue(raw: unknown, palette: readonly string[] = DEFAULT_STYLE.palette): DirectorCueDraft | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  if (typeof row.scene !== "string" || !AEI_SCENE_IDS.includes(row.scene)) return null;
  const beatRow = row.beat;
  if (!beatRow || typeof beatRow !== "object") return null;
  const beat = beatRow as Record<string, unknown>;
  if (typeof beat.spinMode !== "string" || !SPIN_MODES.has(beat.spinMode as SpinMode)) return null;
  if (typeof beat.mode !== "string" || !RENDER_MODES.has(beat.mode as BeatRenderMode)) return null;
  const wave = typeof beat.wave === "string" ? beat.wave : (beat.style as { wave?: string } | undefined)?.wave;
  if (typeof wave !== "string" || !WAVES.has(wave as WaveKind)) return null;
  const num = (source: Record<string, unknown>, key: string, fallback: number) => {
    const value = source[key];
    return typeof value === "number" ? value : fallback;
  };
  const transition = typeof row.transition === "string" && TRANSITIONS.has(row.transition as CueTransition) ? (row.transition as CueTransition) : "bar";
  const spinMode = beat.spinMode as SpinMode;
  const colors = palette.length ? [...palette] : [...DEFAULT_STYLE.palette];
  const look: BeatLook = {
    relief: clamp01(num(beat, "relief", 0.5)),
    spin: clamp01(num(beat, "spin", 0.4)),
    spinMode,
    distortion: clamp01(num(beat, "distortion", num(beat, "amplitude", 0.4))),
    glitch: clamp01(num(beat, "glitch", 0.2)),
    points: clamp01(num(beat, "points", 0.5)),
    mode: beat.mode as BeatRenderMode,
    swap: Math.max(0, Math.min(99, Math.floor(Number.isFinite(num(beat, "swap", 0)) ? num(beat, "swap", 0) : 0))),
    style: {
      ...DEFAULT_STYLE,
      palette: colors,
      wave: wave as WaveKind,
      amplitude: clamp01(num(beat, "amplitude", 0.4)),
      frequency: clamp01(num(beat, "frequency", 0.3)),
      speed: clamp01(num(beat, "speed", 0.3)),
      spinStyle: spinStyleFor(spinMode),
    },
  };
  const asset = row.asset == null ? null : typeof row.asset === "string" ? row.asset.slice(0, 80) : null;
  if (row.asset != null && typeof row.asset !== "string") return null;
  const reason = typeof row.reason === "string" && row.reason.trim() ? row.reason.trim().slice(0, 180) : "director cue";
  return {
    scene: row.scene,
    paletteShift: clamp01(num(row, "paletteShift", 0)),
    intensity: clamp01(num(row, "intensity", 0.4)),
    strobe: clamp01(num(row, "strobe", 0)),
    asset: asset && asset.length ? asset : null,
    transition,
    duration: clampRange(num(row, "duration", 12), 6, 20, 12),
    reason,
    beat: look,
  };
}

export function cueFromDraft(draft: DirectorCueDraft, now: number, source: "live" | "mock"): Cue {
  return {
    id: `d${now.toFixed(3)}`,
    at: now,
    scene: draft.scene,
    paletteShift: draft.paletteShift,
    intensity: draft.intensity,
    strobe: draft.strobe,
    asset: draft.asset,
    source,
    reason: draft.reason,
    beat: draft.beat,
  };
}

export function mergeLoopCue(rules: Cue, next: Cue): Cue {
  return {
    ...rules,
    scene: next.scene,
    paletteShift: next.paletteShift,
    intensity: next.intensity,
    asset: next.asset,
    beat: next.beat,
    source: next.source,
    reason: next.reason,
  };
}

export async function takeDirectorCue<T>(work: () => Promise<T>, timeoutMs: number): Promise<{ ok: true; value: T; latencyMs: number } | { ok: false; latencyMs: number }> {
  const started = Date.now();
  try {
    const value = await withTimeout(work(), timeoutMs);
    return { ok: true, value, latencyMs: Date.now() - started };
  } catch {
    return { ok: false, latencyMs: Date.now() - started };
  }
}

const HEX = /^#[0-9a-fA-F]{6}$/;

export function readDirectorInput(raw: unknown): DirectorInput | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const theme = row.theme;
  if (!theme || typeof theme !== "object") return null;
  const themeRow = theme as Record<string, unknown>;
  if (typeof themeRow.id !== "string" || typeof themeRow.name !== "string" || typeof themeRow.mood !== "string") return null;
  if (!Array.isArray(themeRow.palette) || themeRow.palette.some((color) => typeof color !== "string" || !HEX.test(color))) return null;
  const style = themeRow.style;
  if (!style || typeof style !== "object") return null;
  const styleRow = style as Record<string, unknown>;
  if (typeof styleRow.wave !== "string" || !WAVES.has(styleRow.wave as WaveKind)) return null;
  const music = row.music;
  const crowd = row.crowd;
  const current = row.current;
  if (!music || typeof music !== "object" || !crowd || typeof crowd !== "object" || !current || typeof current !== "object") return null;
  const musicRow = music as Record<string, unknown>;
  const crowdRow = crowd as Record<string, unknown>;
  const currentRow = current as Record<string, unknown>;
  const num = (source: Record<string, unknown>, key: string) => {
    const value = source[key];
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  };
  const energy = num(musicRow, "energy");
  const bpm = num(musicRow, "bpm");
  const onsetDensity = num(musicRow, "onsetDensity");
  const slope = num(musicRow, "slope");
  const score = num(crowdRow, "score");
  const trend = num(crowdRow, "trend");
  const intensity = num(currentRow, "intensity");
  const paletteShift = num(currentRow, "paletteShift");
  const strobe = num(currentRow, "strobe");
  const now = num(row, "now");
  if (energy == null || bpm == null || onsetDensity == null || slope == null || score == null || trend == null || intensity == null || paletteShift == null || strobe == null || now == null) {
    return null;
  }
  if (typeof musicRow.section !== "string" || !["intro", "build", "drop", "breakdown"].includes(musicRow.section)) return null;
  if (typeof currentRow.scene !== "string") return null;
  const history = Array.isArray(row.history) ? row.history.slice(-6) : [];
  const memories: CueMemory[] = [];
  for (const item of history) {
    if (!item || typeof item !== "object") return null;
    const memory = item as Record<string, unknown>;
    if (typeof memory.id !== "string" || typeof memory.scene !== "string" || typeof memory.reason !== "string") return null;
    if (memory.source !== "live" && memory.source !== "mock" && memory.source !== "rules") return null;
    const at = num(memory, "at");
    const before = num(memory, "crowdBefore");
    if (at == null || before == null) return null;
    const after = memory.crowdAfter == null ? null : num(memory, "crowdAfter");
    if (memory.crowdAfter != null && after == null) return null;
    memories.push({
      id: memory.id,
      at,
      scene: memory.scene,
      source: memory.source,
      reason: memory.reason.slice(0, 180),
      crowdBefore: before,
      crowdAfter: after,
    });
  }
  const spin = styleRow.spinStyle === "pulse" || styleRow.spinStyle === "snap" || styleRow.spinStyle === "glide" ? styleRow.spinStyle : "glide";
  const blend = styleRow.blend === "add" || styleRow.blend === "screen" || styleRow.blend === "soft" ? styleRow.blend : "soft";
  return {
    theme: {
      id: themeRow.id,
      name: themeRow.name,
      mood: themeRow.mood,
      palette: themeRow.palette as string[],
      style: {
        palette: [...(themeRow.palette as string[])],
        wave: styleRow.wave as WaveKind,
        frequency: clamp01(num(styleRow, "frequency") ?? 0.3),
        amplitude: clamp01(num(styleRow, "amplitude") ?? 0.3),
        speed: clamp01(num(styleRow, "speed") ?? 0.3),
        spinStyle: spin,
        intensityMin: clamp01(num(styleRow, "intensityMin") ?? 0.2),
        intensityMax: clamp01(num(styleRow, "intensityMax") ?? 0.7),
        blend,
      },
    },
    music: {
      energy: clamp01(energy),
      bpm,
      onsetDensity: Math.max(0, onsetDensity),
      slope,
      section: musicRow.section as SectionGuess,
    },
    crowd: { score: clamp01(score), trend: Math.min(1, Math.max(-1, trend)) },
    current: {
      scene: currentRow.scene,
      intensity: clamp01(intensity),
      paletteShift: clamp01(paletteShift),
      strobe: clamp01(strobe),
    },
    history: memories,
    now,
  };
}

type Queued = {
  id: string;
  cue: Cue;
  draft: DirectorCueDraft;
  source: "live" | "mock";
  latencyMs: number;
  offeredAt: number;
  crowdBefore: number;
  approved: boolean;
};

export type FrameResult = {
  cue: Cue;
  ask: { token: number; input: DirectorInput; because: AskReason } | null;
  committed: LoopLogEntry | null;
  response: { at: number; scene: string; crowdAfter: number } | null;
};

export class DirectorLoop {
  intervalSec: number;
  minGapSec: number;
  holdSec: number;
  responseWindowSec: number;
  alignGraceSec: number;
  enabled = false;
  gate: LoopGate = "auto";
  killed = false;

  private samples: MusicSample[] = [];
  private crowdSamples: CrowdPoint[] = [];
  private lastAsk = -1;
  private lastSection: SectionGuess | null = null;
  private spiked = false;
  private crowdLatch = 0;
  private inFlight: number | null = null;
  private token = 0;
  private queued: Queued | null = null;
  private pending: Queued | null = null;
  private active: Queued | null = null;
  private frozen: Cue | null = null;
  private lastSwitch = -Infinity;
  private beats = 0;
  private history: CueMemory[] = [];
  private awaiting: { id: string; at: number; scene: string } | null = null;
  private warmed = 0;

  constructor(options: { intervalSec?: number; minGapSec?: number; holdSec?: number; responseWindowSec?: number; alignGraceSec?: number } = {}) {
    this.intervalSec = options.intervalSec ?? 12;
    this.minGapSec = options.minGapSec ?? 2.5;
    this.holdSec = options.holdSec ?? 8;
    this.responseWindowSec = options.responseWindowSec ?? 6;
    this.alignGraceSec = options.alignGraceSec ?? 4;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.inFlight = null;
      this.queued = null;
      this.pending = null;
      this.active = null;
    }
  }

  setInterval(seconds: number): void {
    this.intervalSec = clampRange(seconds, 10, 15, 12);
  }

  setGate(gate: LoopGate): void {
    this.gate = gate;
  }

  kill(current: Cue): void {
    this.killed = true;
    this.frozen = { ...current, source: "operator", reason: "hold look" };
    this.queued = null;
    this.pending = null;
  }

  release(): void {
    this.killed = false;
    this.frozen = null;
  }

  pendingCue(): Queued | null {
    return this.pending;
  }

  approve(now: number): boolean {
    if (!this.pending) return false;
    this.pending.approved = true;
    this.pending.offeredAt = now;
    this.queued = this.pending;
    this.pending = null;
    return true;
  }

  skip(): boolean {
    if (!this.pending) return false;
    this.pending = null;
    return true;
  }

  frame(rules: Cue, ctx: { now: number; onset: boolean; energy: number; bpm: number; progress: number; crowd: number; theme: ThemePack; style: DistortionStyle }): FrameResult {
    const now = Number.isFinite(ctx.now) ? ctx.now : 0;
    if (ctx.onset) this.beats += 1;
    const downbeat = ctx.onset && this.beats % 4 === 1;
    if (this.killed) {
      if (!this.frozen) this.frozen = { ...rules, source: "operator", reason: "hold look" };
      return { cue: { ...this.frozen, at: now }, ask: null, committed: null, response: null };
    }
    if (this.enabled) {
      this.samples.push({ t: now, energy: clamp01(ctx.energy), bpm: ctx.bpm, onset: ctx.onset });
      this.samples = this.samples.filter((sample) => now - sample.t <= 8);
      this.crowdSamples.push({ t: now, score: clamp01(ctx.crowd) });
      this.crowdSamples = this.crowdSamples.filter((sample) => now - sample.t <= 8);
      this.warmed += 1;
    }
    let response: FrameResult["response"] = null;
    if (this.awaiting && now - this.awaiting.at >= this.responseWindowSec) {
      const crowdAfter = clamp01(ctx.crowd);
      response = { at: this.awaiting.at, scene: this.awaiting.scene, crowdAfter };
      const memory = this.history.find((item) => item.id === this.awaiting?.id);
      if (memory) memory.crowdAfter = crowdAfter;
      this.awaiting = null;
    }
    const committed = this.enabled ? this.tryCommit(now, ctx.onset, downbeat, ctx.crowd) : null;
    let ask: FrameResult["ask"] = null;
    if (this.enabled) {
      const music = summarizeMusic(this.samples, now, ctx.progress);
      const crowd = summarizeCrowd(this.crowdSamples, now);
      const since = this.lastAsk < 0 ? Number.POSITIVE_INFINITY : now - this.lastAsk;
      const reason = askReason({
        sinceSec: since,
        intervalSec: this.intervalSec,
        minGapSec: this.minGapSec,
        warmed: this.warmed >= 4,
        busy: this.inFlight != null,
        section: music.section,
        previousSection: this.lastSection,
        spike: energySpike(this.samples, now) && !this.spiked,
        crowdDelta: this.lastAsk < 0 ? 0 : crowd.score - this.crowdLatch,
      });
      this.lastSection = music.section;
      this.spiked = energySpike(this.samples, now);
      if (reason) {
        this.token += 1;
        this.inFlight = this.token;
        this.lastAsk = now;
        this.crowdLatch = crowd.score;
        ask = {
          token: this.token,
          because: reason,
          input: buildDirectorInput({
            theme: ctx.theme,
            style: ctx.style,
            music,
            crowd,
            current: { scene: (this.active?.cue.scene ?? rules.scene), intensity: rules.intensity, paletteShift: rules.paletteShift, strobe: rules.strobe },
            history: this.history,
            now,
          }),
        };
      }
    }
    const cue = this.active ? mergeLoopCue(rules, { ...this.active.cue, at: now }) : rules;
    return { cue, ask, committed, response };
  }

  complete(token: number, result: { ok: true; source: "live" | "mock"; latencyMs: number; draft: DirectorCueDraft; now: number; crowdBefore: number } | { ok: false; latencyMs: number; now: number; scene: string }): LoopLogEntry | "pending" | null {
    if (this.inFlight !== token) return null;
    this.inFlight = null;
    if (this.killed) return null;
    if (!result.ok) {
      return {
        id: `f${token}`,
        at: result.now,
        scene: result.scene,
        source: "rules",
        reason: "rules held the picture",
        latencyMs: Math.max(0, result.latencyMs),
        crowdBefore: this.crowdLatch,
        crowdAfter: null,
      };
    }
    const cue = cueFromDraft(result.draft, result.now, result.source);
    const queued: Queued = {
      id: `d${token}`,
      cue,
      draft: result.draft,
      source: result.source,
      latencyMs: Math.max(0, result.latencyMs),
      offeredAt: result.now,
      crowdBefore: result.crowdBefore,
      approved: this.gate === "auto",
    };
    if (this.gate === "approve") {
      this.pending = queued;
      return "pending";
    }
    this.queued = queued;
    return null;
  }

  private tryCommit(now: number, onset: boolean, downbeat: boolean, crowd: number): LoopLogEntry | null {
    const item = this.queued;
    if (!item) return null;
    const same = this.active?.cue.scene === item.cue.scene;
    const needed = Math.max(this.holdSec, this.active?.draft.duration ?? 0);
    if (!same && now - this.lastSwitch < needed) return null;
    const aligned = item.draft.transition === "cut" || (item.draft.transition === "beat" && onset) || (item.draft.transition === "bar" && downbeat);
    if (!aligned && now - item.offeredAt < this.alignGraceSec) return null;
    this.active = item;
    this.queued = null;
    this.lastSwitch = now;
    const entry: LoopLogEntry = {
      id: item.id,
      at: now,
      scene: item.cue.scene,
      source: item.source,
      reason: item.draft.reason,
      latencyMs: item.latencyMs,
      crowdBefore: item.crowdBefore,
      crowdAfter: null,
    };
    this.history.push({
      id: item.id,
      at: now,
      scene: item.cue.scene,
      source: item.source,
      reason: item.draft.reason,
      crowdBefore: item.crowdBefore,
      crowdAfter: null,
    });
    this.history = this.history.slice(-6);
    this.awaiting = { id: item.id, at: now, scene: item.cue.scene };
    void crowd;
    return entry;
  }
}
