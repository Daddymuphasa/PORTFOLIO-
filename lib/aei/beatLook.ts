/**
 * Beat Image motion, as plain numbers. The scene applies these each frame.
 * Spin speed follows BPM. A kick adds a decaying impulse. A downbeat snaps
 * a quarter or half turn. Distortion follows bass, and a high-band onset
 * pushes warp and colour split.
 */
import { DEFAULT_STYLE, readDistortionStyle, styleFromSignals } from "./flyer";
import type { BeatLook, BeatRenderMode, DirectorSignals, SpinMode } from "./types";

export const DEFAULT_BEAT_LOOK: BeatLook = {
  relief: 0.62,
  spin: 0.55,
  spinMode: "continuous",
  distortion: 0.7,
  glitch: 0.35,
  points: 0.5,
  mode: "mesh",
  swap: 0,
  style: DEFAULT_STYLE,
};

const SPIN_MODES = new Set<SpinMode>(["continuous", "kick", "bar"]);
const RENDER_MODES = new Set<BeatRenderMode>(["mesh", "points"]);

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/** Radians per second for one full turn per bar (four beats). */
export function turnPerBar(bpm: number, spin: number): number {
  const tempo = Number.isFinite(bpm) && bpm > 0 ? bpm : 0;
  return clamp01(spin) * tempo * Math.PI / 120;
}

export type SpinState = { angle: number; impulse: number };

export function stepSpin(
  state: SpinState,
  input: { dt: number; bpm: number; onset: boolean; downbeat: boolean; spin: number; spinMode: SpinMode; tap: boolean },
): SpinState {
  const dt = Math.min(0.1, Math.max(0, input.dt));
  const spin = clamp01(input.spin);
  const kick = input.onset || input.tap;
  let impulse = state.impulse * Math.exp(-dt * 4.5);
  if (kick) impulse += spin * 6.5;
  const cruise = turnPerBar(input.bpm, spin);
  const gate = input.spinMode === "continuous" ? 1 : input.spinMode === "kick" ? 0.15 : 0.05;
  let angle = state.angle + (cruise * gate + impulse) * dt;
  if (input.downbeat) angle += (spin >= 0.5 ? Math.PI : Math.PI / 2);
  const turn = Math.PI * 2;
  angle -= Math.floor(angle / turn) * turn;
  return { angle, impulse };
}

export type DistortState = { punch: number; wave: number; glitch: number };

export type DistortFrame = {
  state: DistortState;
  relief: number;
  breath: number;
  punch: number;
  wave: number;
  warp: number;
  glitch: number;
};

export function stepDistort(
  state: DistortState,
  input: {
    dt: number;
    time: number;
    bass: number;
    mid: number;
    treble: number;
    onset: boolean;
    highOnset: boolean;
    relief: number;
    distortion: number;
    glitch: number;
  },
): DistortFrame {
  const dt = Math.min(0.1, Math.max(0, input.dt));
  const bass = clamp01(input.bass);
  const distortion = clamp01(input.distortion);
  const glitchKnob = clamp01(input.glitch);
  let punch = state.punch * Math.exp(-dt * 8);
  let wave = state.wave * Math.exp(-dt * 3.2);
  if (input.onset) {
    punch = Math.max(punch, distortion * (0.45 + 0.55 * bass));
    wave = Math.max(wave, distortion);
  }
  const breath = distortion * (0.08 + 0.22 * bass) * (0.5 + 0.5 * Math.sin(input.time * (1.2 + bass * 2)));
  const relief = clamp01(input.relief) * (0.35 + 0.65 * bass) + breath;
  const color = clamp01(input.mid) * 0.35 + clamp01(input.treble) * 0.65;
  let split = state.glitch * Math.exp(-dt * 6);
  if (input.highOnset) split = Math.max(split, glitchKnob);
  const warp = Math.min(1, color * glitchKnob * 0.65 + split);
  return {
    state: { punch, wave, glitch: split },
    relief: Math.min(1.6, relief),
    breath,
    punch,
    wave,
    warp,
    glitch: Math.min(1, split),
  };
}

export type ClockState = { beats: number; sinceBeat: number };

export function stepClock(
  clock: ClockState,
  input: { dt: number; onset: boolean; tap: boolean; bpm: number },
): { clock: ClockState; downbeat: boolean; phase: number } {
  const hit = input.onset || input.tap;
  let beats = clock.beats;
  let since = clock.sinceBeat + Math.max(0, Math.min(0.1, input.dt));
  let downbeat = false;
  if (hit) {
    beats += 1;
    since = 0;
    downbeat = beats % 4 === 1;
  }
  const beatLen = input.bpm > 1 ? 60 / input.bpm : 0.5;
  const into = Math.min(0.999, since / beatLen);
  const phase = ((beats % 4) + into) / 4;
  return { clock: { beats, sinceBeat: since }, downbeat, phase };
}

export type HighOnsetState = { level: number };

/** A rise in the mid and high bands, separate from the kick onset. */
export function stepHighOnset(state: HighOnsetState, mid: number, treble: number): { state: HighOnsetState; onset: boolean } {
  const level = clamp01(mid) * 0.45 + clamp01(treble) * 0.55;
  const onset = level > 0.28 && level - state.level > 0.12;
  return { state: { level }, onset };
}

export function tempoFromTaps(times: readonly number[]): number | null {
  if (times.length < 2) return null;
  const recent = times.slice(-5);
  let sum = 0;
  let n = 0;
  for (let i = 1; i < recent.length; i++) {
    const dt = recent[i] - recent[i - 1];
    if (dt < 0.2 || dt > 2) continue;
    sum += dt;
    n += 1;
  }
  if (!n) return null;
  return Math.min(200, Math.max(50, 60 / (sum / n)));
}

export function beatLookFromSignals(signals: DirectorSignals): BeatLook {
  const energy = clamp01(signals.energy);
  const bass = clamp01(signals.bass);
  const mid = clamp01(signals.mid);
  const treble = clamp01(signals.treble);
  const spinMode: SpinMode = energy > 0.75 ? "kick" : energy > 0.45 ? "bar" : "continuous";
  const mode: BeatRenderMode = energy > 0.66 ? "points" : "mesh";
  return {
    relief: clamp01(0.28 + bass * 0.72),
    spin: clamp01(0.2 + energy * 0.8),
    spinMode,
    distortion: clamp01(bass * 0.75 + energy * 0.25),
    glitch: clamp01(treble * 0.65 + mid * 0.35),
    points: clamp01(0.35 + energy * 0.65),
    mode,
    swap: 0,
    style: styleFromSignals(signals),
  };
}

export function readBeatLook(raw: unknown): BeatLook | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const spinMode = row.spinMode;
  const mode = row.mode;
  if (typeof spinMode !== "string" || !SPIN_MODES.has(spinMode as SpinMode)) return null;
  if (typeof mode !== "string" || !RENDER_MODES.has(mode as BeatRenderMode)) return null;
  const num = (key: keyof BeatLook, fallback: number) => {
    const value = row[key];
    return typeof value === "number" && Number.isFinite(value) ? clamp01(value) : fallback;
  };
  const swap = typeof row.swap === "number" && Number.isFinite(row.swap) ? Math.max(0, Math.floor(row.swap)) : 0;
  let style = DEFAULT_STYLE;
  if (row.style != null) {
    const parsed = readDistortionStyle(row.style);
    if (!parsed) return null;
    style = parsed;
  }
  return {
    relief: num("relief", DEFAULT_BEAT_LOOK.relief),
    spin: num("spin", DEFAULT_BEAT_LOOK.spin),
    spinMode: spinMode as SpinMode,
    distortion: num("distortion", DEFAULT_BEAT_LOOK.distortion),
    glitch: num("glitch", DEFAULT_BEAT_LOOK.glitch),
    points: num("points", DEFAULT_BEAT_LOOK.points),
    mode: mode as BeatRenderMode,
    swap,
    style,
  };
}

/** Desktop keeps the full cloud. A narrow or small device stays under 64k. */
export function pointBudget(unit: number, lowEnd: boolean): number {
  const t = clamp01(unit);
  const min = lowEnd ? 32768 : 131072;
  const max = lowEnd ? 65536 : 262144;
  const count = min + (max - min) * t;
  return Math.round(count / 1024) * 1024;
}

export function rasterSize(lowEnd: boolean): number {
  return lowEnd ? 512 : 1024;
}

export function meshSegments(lowEnd: boolean): number {
  return lowEnd ? 96 : 256;
}

export function shouldAdvanceImage(input: { bar: number; lastBar: number; every: number; swapToken: number; lastToken: number }): boolean {
  if (input.swapToken !== input.lastToken) return true;
  const every = Math.max(1, Math.floor(input.every));
  return input.bar > input.lastBar && input.bar - input.lastBar >= every;
}
