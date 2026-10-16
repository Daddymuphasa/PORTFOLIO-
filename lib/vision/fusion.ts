/**
 * PAPAGEDON Vision fusion: crowd (V_t) + music (A_t) -> room energy E_t,
 * then scene / intensity / pacing among the nine original visualizers.
 *
 *   V_t = 0.45 motion + 0.25 density + 0.30 crowdEnergy
 *   E_t = alpha * V_t + (1 - alpha) * A_t
 * When crowd and music disagree by more than DISAGREE, E_t is eased toward
 * the lower of the two instead of forcing a peak.
 */
import { ORIGINAL_SCENES } from "./scenes";

export type CrowdMetrics = {
  motion: number; // 0..1, share of the frame that is moving
  density: number; // 0..1, share of the frame that differs from the empty-room background
  energy: number; // 0..1, crowd energy (pose/limb activity on the service, motion burstiness in the browser)
  people?: number; // service only, count of detected people (aggregate)
  source: "opencv-service" | "browser";
  latencyMs: number;
};

export type FusionInput = { crowd: CrowdMetrics | null; audioEnergy: number; alpha: number };
export type FusionOutput = { vision: number; audio: number; room: number; disagreement: number; eased: boolean; mode: "fused" | "audio-only" };

export const DISAGREE = 0.35;
const clamp01 = (v: number) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0);

export function visionScore(c: CrowdMetrics): number {
  return clamp01(0.45 * c.motion + 0.25 * c.density + 0.3 * c.energy);
}

export function fuse({ crowd, audioEnergy, alpha }: FusionInput): FusionOutput {
  const audio = clamp01(audioEnergy);
  if (!crowd) return { vision: 0, audio, room: audio, disagreement: 0, eased: false, mode: "audio-only" };
  const a = clamp01(alpha);
  const vision = visionScore(crowd);
  let room = a * vision + (1 - a) * audio;
  const disagreement = Math.abs(vision - audio);
  const eased = disagreement > DISAGREE;
  if (eased) {
    // Pull toward the quieter signal: loud music over a still crowd should build, not peak.
    const low = Math.min(vision, audio);
    const k = Math.min(1, (disagreement - DISAGREE) / (1 - DISAGREE));
    room = room + (low - room) * 0.5 * k;
  }
  return { vision, audio, room: clamp01(room), disagreement, eased, mode: "fused" };
}

/** Picks a scene from room energy with hysteresis and a minimum hold time. */
export class SceneDirector {
  index: number;
  private smoothed: number;
  private lastSwitch = -Infinity;
  /** Starts on Nano Hex Genesis (index 3), the signature look, until the room says otherwise. */
  constructor(public holdSeconds = 8, private scenes = ORIGINAL_SCENES, start = 3) {
    this.index = start;
    this.smoothed = (start + 0.5) / scenes.length;
  }

  update(room: number, nowSeconds: number): { index: number; smoothed: number; switched: boolean } {
    this.smoothed += (room - this.smoothed) * 0.08;
    const n = this.scenes.length;
    const target = Math.min(n - 1, Math.floor(this.smoothed * n));
    const bucketCenter = (this.index + 0.5) / n;
    const far = Math.abs(this.smoothed - bucketCenter) > 0.5 / n + 0.04; // hysteresis
    let switched = false;
    if (target !== this.index && far && nowSeconds - this.lastSwitch >= this.holdSeconds) {
      this.index = target;
      this.lastSwitch = nowSeconds;
      switched = true;
    }
    return { index: this.index, smoothed: this.smoothed, switched };
  }
}

/** Visual intensity gain from room energy: 0.55x when the room is still, up to 1.35x at peak. */
export const intensityGain = (room: number) => 0.55 + 0.8 * clamp01(room);
