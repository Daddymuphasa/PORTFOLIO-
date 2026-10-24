/**
 * Rule director. No network: live energy, onsets, and the theme's energy arc
 * produce a cue. Scene changes are smoothed and held so the picture does not
 * flicker. Intensity and strobe follow the current frame so hits read immediately.
 */
import { AEI_SCENE_IDS } from "./scenes";
import { paletteWindow, sampleEnergyArc } from "./themes";
import type { Cue, DirectorSignals, ManualOverride, RenderParams, ThemePack } from "./types";

const LIVE_WEIGHT = 0.65;
const ARC_WEIGHT = 0.35;
/** Onset strobes only once the blended energy is at least this. */
const STROBE_AT = 0.58;
const SMOOTH_RATE = 3.2;
const DEFAULT_HOLD_SECONDS = 6;

export type RuleDirectorOptions = {
  holdSeconds?: number;
  scenes?: readonly string[];
};

const clamp01 = (v: number) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0);
const fract = (v: number) => {
  const x = v - Math.floor(v);
  return Object.is(x, -0) ? 0 : x;
};

export function blendEnergy(live: number, arc: number): number {
  return clamp01(LIVE_WEIGHT * clamp01(live) + ARC_WEIGHT * clamp01(arc));
}

export class RuleDirector {
  private readonly holdSeconds: number;
  private readonly scenes: readonly string[];
  private index = 0;
  private smoothed = 0;
  private strobe = 0;
  private lastNow: number | null = null;
  private lastSwitch = -Infinity;
  private seq = 0;

  constructor(options: RuleDirectorOptions = {}) {
    this.holdSeconds = options.holdSeconds ?? DEFAULT_HOLD_SECONDS;
    const scenes = options.scenes?.length ? options.scenes : AEI_SCENE_IDS;
    this.scenes = scenes;
  }

  update(signals: DirectorSignals, theme: ThemePack): Cue {
    const now = Number.isFinite(signals.now) ? signals.now : 0;
    // The opening look is held from the first tick, not from -Infinity,
    // so a loud first frame cannot cut before `holdSeconds`.
    let dt = 0;
    if (this.lastNow == null) this.lastSwitch = now;
    else dt = Math.min(0.1, Math.max(0, now - this.lastNow));
    this.lastNow = now;

    const arc = sampleEnergyArc(theme.energyArc, signals.progress);
    const target = blendEnergy(signals.energy, arc);
    const follow = 1 - Math.exp(-dt * SMOOTH_RATE);
    this.smoothed += (target - this.smoothed) * follow;

    const n = this.scenes.length;
    const targetIndex = Math.min(n - 1, Math.max(0, Math.floor(this.smoothed * n)));
    const center = (this.index + 0.5) / n;
    const far = Math.abs(this.smoothed - center) > 0.5 / n + 0.03;
    if (targetIndex !== this.index && far && now - this.lastSwitch >= this.holdSeconds) {
      this.index = targetIndex;
      this.lastSwitch = now;
    }

    const decay = Math.exp(-dt * 3.4);
    this.strobe *= decay;
    if (signals.onset && target >= STROBE_AT) {
      this.strobe = Math.max(this.strobe, clamp01(0.55 + (target - STROBE_AT) * 1.6));
    }

    const scene = this.scenes[this.index] ?? this.scenes[0];
    const motifs = theme.motifs.filter((motif) => motif.length > 0);
    const asset = motifs.length ? motifs[this.index % motifs.length] : null;
    const paletteShift = fract(clamp01(signals.progress) * 0.4 + this.smoothed * 0.45 + clamp01(signals.bass) * 0.08);
    const intensity = clamp01(0.22 + target * 0.78);

    this.seq += 1;
    return {
      id: `r${this.seq}`,
      at: now,
      scene,
      paletteShift,
      intensity,
      strobe: clamp01(this.strobe),
      asset,
      source: "rules",
      reason: `live ${clamp01(signals.energy).toFixed(2)} + arc ${arc.toFixed(2)} → ${scene}`,
    };
  }
}

/** Operator lock. Disabled override returns the director cue unchanged. */
export function applyOverride(cue: Cue, override: ManualOverride): Cue {
  if (!override.enabled) return cue;
  const scene = AEI_SCENE_IDS.includes(override.scene) ? override.scene : cue.scene;
  return {
    ...cue,
    scene,
    paletteShift: clamp01(override.paletteShift),
    intensity: clamp01(override.intensity),
    strobe: clamp01(override.strobe),
    source: "operator",
    reason: "operator override",
  };
}

export function cueToRenderParams(cue: Cue, theme: ThemePack): RenderParams {
  return {
    palette: paletteWindow(theme.palette, cue.paletteShift),
    intensity: clamp01(cue.intensity),
    sceneId: cue.scene,
    strobe: clamp01(cue.strobe),
  };
}
