/**
 * In-browser fallback crowd analysis (used when NEXT_PUBLIC_VISION_SERVICE_URL is unset
 * or the service is unreachable). Same three signals as the OpenCV 5 service, computed
 * with cheap pixel maths on a downscaled grayscale frame:
 *   motion  - frame differencing (stand-in for dense optical flow)
 *   density - difference from a slowly learned background (stand-in for MOG2)
 *   energy  - burstiness of motion over a rolling window (stand-in for pose activity)
 * Only aggregate numbers leave this module; frames are never stored or sent.
 */
export class BrowserCrowdAnalyzer {
  private prev: Float32Array | null = null;
  private bg: Float32Array | null = null;
  private history: number[] = [];
  private s = { motion: 0, density: 0, energy: 0 };

  constructor(private readonly window = 30, private readonly smoothing = 0.25) {}

  reset() {
    this.prev = this.bg = null;
    this.history = [];
    this.s = { motion: 0, density: 0, energy: 0 };
  }

  /** gray: luminance 0..255, length w*h. */
  update(gray: Float32Array) {
    const n = gray.length;
    if (!this.prev || this.prev.length !== n) {
      this.prev = gray.slice();
      this.bg = gray.slice();
      return { ...this.s };
    }
    const bg = this.bg!;
    let moving = 0;
    let foreground = 0;
    for (let i = 0; i < n; i++) {
      const g = gray[i];
      if (Math.abs(g - this.prev[i]) > 18) moving++;
      if (Math.abs(g - bg[i]) > 28) foreground++;
      bg[i] += (g - bg[i]) * 0.005;
    }
    this.prev = gray.slice();
    const motion = Math.min(1, (moving / n) * 4);
    const density = Math.min(1, (foreground / n) * 1.5);
    this.history.push(motion);
    if (this.history.length > this.window) this.history.shift();
    const mean = this.history.reduce((a, b) => a + b, 0) / this.history.length;
    const variance = this.history.reduce((a, b) => a + (b - mean) ** 2, 0) / this.history.length;
    const energy = Math.min(1, Math.sqrt(variance) * 4 + mean * 0.5);
    const k = this.smoothing;
    this.s = {
      motion: this.s.motion + (motion - this.s.motion) * k,
      density: this.s.density + (density - this.s.density) * k,
      energy: this.s.energy + (energy - this.s.energy) * k,
    };
    return { ...this.s };
  }
}

export function toGray(data: Uint8ClampedArray): Float32Array {
  const out = new Float32Array(data.length / 4);
  for (let i = 0, j = 0; j < out.length; i += 4, j++) out[j] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  return out;
}
