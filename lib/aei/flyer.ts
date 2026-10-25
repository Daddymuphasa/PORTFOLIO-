/**
 * Local flyer reading and the wave it asks for.
 * Pixel stats stay on the machine that has the picture. A theme palette, when
 * one is passed in, replaces the measured colours. The wave shape still comes
 * from those stats: a calm flyer stays slow and wide, a loud one gets tighter.
 */
import { edgeStrength, luminanceOf } from "./depth";
import type { BeatLook, DirectorSignals, DistortionStyle, SpinMode, SpinStyle, StyleBlend, WaveKind } from "./types";

export type FlyerRead = {
  palette: string[];
  contrast: number;
  brightness: number;
  edgeDensity: number;
  busyness: number;
  /** 0 is cool, 1 is warm. */
  warmth: number;
};

const HEX = /^#[0-9a-fA-F]{6}$/;
const WAVES = new Set<WaveKind>(["sine", "ripple", "liquid", "glitch"]);
const SPINS = new Set<SpinStyle>(["glide", "pulse", "snap"]);
const BLENDS = new Set<StyleBlend>(["soft", "add", "screen"]);

export const WAVE_KIND: Record<WaveKind, number> = { sine: 0, ripple: 1, liquid: 2, glitch: 3 };
export const BLEND_KIND: Record<StyleBlend, number> = { soft: 0, add: 1, screen: 2 };

export const DEFAULT_STYLE: DistortionStyle = {
  palette: ["#1B1430", "#F2A65A", "#E85D75", "#7EC8C3"],
  wave: "sine",
  frequency: 0.28,
  amplitude: 0.34,
  speed: 0.32,
  spinStyle: "glide",
  intensityMin: 0.22,
  intensityMax: 0.62,
  blend: "soft",
};

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function hexByte(value: number): string {
  return Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
}

export function rgbHex(r: number, g: number, b: number): string {
  return `#${hexByte(r)}${hexByte(g)}${hexByte(b)}`.toUpperCase();
}

type RGB = [number, number, number];

function dist2(a: RGB, b: RGB): number {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

/** Four colours, most common first. A handful of passes is enough for a poster. */
export function dominantPalette(rgba: Uint8Array, width: number, height: number, k = 4): string[] {
  const pixels: RGB[] = [];
  const target = 900;
  const stride = Math.max(1, Math.floor(Math.sqrt((width * height) / target)));
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      const i = (y * width + x) * 4;
      if ((rgba[i + 3] ?? 255) < 16) continue;
      pixels.push([rgba[i] ?? 0, rgba[i + 1] ?? 0, rgba[i + 2] ?? 0]);
    }
  }
  if (!pixels.length) return [...DEFAULT_STYLE.palette];
  const groups = Math.max(1, Math.min(k, pixels.length));
  const centers: RGB[] = [];
  for (let i = 0; i < groups; i++) {
    const at = Math.min(pixels.length - 1, Math.floor((i * pixels.length) / groups));
    centers.push([pixels[at][0], pixels[at][1], pixels[at][2]]);
  }
  const counts = new Array<number>(groups).fill(0);
  for (let iter = 0; iter < 8; iter++) {
    const sum = centers.map(() => [0, 0, 0] as RGB);
    counts.fill(0);
    for (const px of pixels) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < centers.length; c++) {
        const d = dist2(px, centers[c]);
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      sum[best][0] += px[0];
      sum[best][1] += px[1];
      sum[best][2] += px[2];
      counts[best] += 1;
    }
    for (let c = 0; c < centers.length; c++) {
      if (!counts[c]) continue;
      centers[c] = [sum[c][0] / counts[c], sum[c][1] / counts[c], sum[c][2] / counts[c]];
    }
  }
  return centers
    .map((color, index) => ({ color, count: counts[index] ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .map((row) => rgbHex(row.color[0], row.color[1], row.color[2]));
}

export function analyzeFlyer(rgba: Uint8Array, width: number, height: number): FlyerRead {
  if (width < 1 || height < 1 || rgba.length < 4) {
    return {
      palette: [...DEFAULT_STYLE.palette],
      contrast: 0,
      brightness: 0,
      edgeDensity: 0,
      busyness: 0,
      warmth: 0.5,
    };
  }
  const luma = luminanceOf(rgba, width, height);
  let sum = 0;
  let sq = 0;
  let warm = 0;
  for (let i = 0; i < luma.length; i++) {
    const value = luma[i] ?? 0;
    sum += value;
    sq += value * value;
    const offset = i * 4;
    warm += ((rgba[offset] ?? 0) - (rgba[offset + 2] ?? 0)) / 255;
  }
  const mean = sum / luma.length;
  const contrast = clamp01(Math.sqrt(Math.max(0, sq / luma.length - mean * mean)) / 0.5);
  const edges = edgeStrength(luma, width, height);
  let hot = 0;
  for (let i = 0; i < edges.length; i++) if ((edges[i] ?? 0) > 0.12) hot += 1;
  const edgeDensity = hot / edges.length;
  const busyness = clamp01(edgeDensity * 0.62 + contrast * 0.38);
  return {
    palette: dominantPalette(rgba, width, height),
    contrast,
    brightness: clamp01(mean),
    edgeDensity: clamp01(edgeDensity),
    busyness,
    warmth: clamp01(0.5 + warm / luma.length / 2),
  };
}

function usablePalette(colors: readonly string[] | undefined): string[] | null {
  if (!colors?.length) return null;
  if (colors.some((color) => !HEX.test(color))) return null;
  return [...colors];
}

/**
 * Calm posters get a slow sine. Loud posters get a tighter wave, and the
 * busiest of those tip into glitch. A theme palette wins over the measured one.
 */
export function styleFromRead(read: FlyerRead, themePalette?: readonly string[]): DistortionStyle {
  const palette = usablePalette(themePalette) ?? read.palette;
  const calm = read.busyness < 0.35 && read.contrast < 0.28;
  const loud = read.busyness > 0.55 || read.contrast > 0.45;
  if (calm) {
    return {
      palette,
      wave: "sine",
      frequency: clamp01(0.12 + read.busyness * 0.35),
      amplitude: clamp01(0.18 + read.contrast * 0.4),
      speed: clamp01(0.1 + read.busyness * 0.28),
      spinStyle: "glide",
      intensityMin: 0.12,
      intensityMax: 0.42,
      blend: "soft",
    };
  }
  if (loud) {
    const glitch = read.busyness > 0.72;
    return {
      palette,
      wave: glitch ? "glitch" : "liquid",
      frequency: clamp01(0.58 + read.busyness * 0.4),
      amplitude: clamp01(0.55 + read.contrast * 0.4),
      speed: clamp01(0.62 + read.busyness * 0.35),
      spinStyle: glitch ? "snap" : "pulse",
      intensityMin: 0.45,
      intensityMax: 0.95,
      blend: "add",
    };
  }
  const warm = read.warmth > 0.55;
  return {
    palette,
    wave: warm ? "liquid" : "ripple",
    frequency: clamp01(0.32 + read.busyness * 0.35),
    amplitude: clamp01(0.3 + read.contrast * 0.4),
    speed: clamp01(0.28 + read.busyness * 0.4),
    spinStyle: warm ? "pulse" : "glide",
    intensityMin: 0.22,
    intensityMax: 0.7,
    blend: "screen",
  };
}

/** A pack saved from a theme draft still needs a wave. The palette tints it. */
export function styleFromPalette(palette: readonly string[]): DistortionStyle {
  const colors = usablePalette(palette) ?? DEFAULT_STYLE.palette;
  let warm = 0;
  for (const color of colors) {
    const value = Number.parseInt(color.slice(1), 16);
    const r = (value >> 16) & 255;
    const b = value & 255;
    warm += (r - b) / 255;
  }
  return styleFromRead(
    {
      palette: [...colors],
      contrast: 0.3,
      brightness: 0.4,
      edgeDensity: 0.25,
      busyness: 0.4,
      warmth: clamp01(0.5 + warm / colors.length / 2),
    },
    colors,
  );
}

/** Used when no flyer has been read. Hotter audio asks for a faster wave. */
export function styleFromSignals(signals: Pick<DirectorSignals, "energy" | "bass" | "treble">): DistortionStyle {
  const energy = clamp01(signals.energy);
  const loud = energy > 0.72;
  const calm = energy < 0.35;
  return {
    palette: [...DEFAULT_STYLE.palette],
    wave: loud ? (energy > 0.88 ? "glitch" : "liquid") : calm ? "sine" : "ripple",
    frequency: clamp01(0.16 + energy * 0.74),
    amplitude: clamp01(0.2 + clamp01(signals.bass) * 0.35 + energy * 0.35),
    speed: clamp01(0.14 + energy * 0.76),
    spinStyle: loud ? "snap" : calm ? "glide" : "pulse",
    intensityMin: clamp01(0.12 + energy * 0.3),
    intensityMax: clamp01(0.4 + energy * 0.55),
    blend: loud ? "add" : calm ? "soft" : "screen",
  };
}

/**
 * Nudge amplitude and speed with the music. The wave type stays put unless
 * the flyer was already liquid or glitch and the high band is hot.
 */
export function steerStyle(base: DistortionStyle, signals: Pick<DirectorSignals, "energy" | "bass" | "treble">): DistortionStyle {
  const energy = clamp01(signals.energy);
  const treble = clamp01(signals.treble);
  const wave = treble > 0.72 && energy > 0.6 && (base.wave === "liquid" || base.wave === "glitch") ? "glitch" : base.wave;
  return {
    ...base,
    wave,
    amplitude: clamp01(base.amplitude * 0.72 + clamp01(signals.bass) * 0.28),
    speed: clamp01(base.speed * 0.8 + energy * 0.2),
  };
}

export function spinModeFromStyle(style: SpinStyle): SpinMode {
  if (style === "pulse") return "kick";
  if (style === "snap") return "bar";
  return "continuous";
}

/** Flyer style wins over the director wave. A lock keeps the studied style. */
export function composeBeatLook(
  look: BeatLook,
  flyer: DistortionStyle | null,
  locked: boolean,
  follow: boolean,
  signals: Pick<DirectorSignals, "energy" | "bass" | "treble">,
): BeatLook {
  if (!flyer) return look;
  const style = locked ? flyer : follow ? steerStyle(flyer, signals) : flyer;
  if (locked || !follow) return { ...look, style };
  return { ...look, style, spinMode: spinModeFromStyle(style.spinStyle) };
}

export function readFlyerReport(raw: unknown): FlyerRead | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  if (!Array.isArray(row.palette) || row.palette.length < 1 || row.palette.length > 8) return null;
  if (row.palette.some((color) => typeof color !== "string" || !HEX.test(color))) return null;
  const num = (key: string) => {
    const value = row[key];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) return null;
    return value;
  };
  const contrast = num("contrast");
  const brightness = num("brightness");
  const edgeDensity = num("edgeDensity");
  const busyness = num("busyness");
  const warmth = num("warmth");
  if (contrast == null || brightness == null || edgeDensity == null || busyness == null || warmth == null) return null;
  return {
    palette: row.palette.map((color) => color as string),
    contrast,
    brightness,
    edgeDensity,
    busyness,
    warmth,
  };
}

export function readDistortionStyle(raw: unknown): DistortionStyle | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  if (typeof row.wave !== "string" || !WAVES.has(row.wave as WaveKind)) return null;
  if (typeof row.spinStyle !== "string" || !SPINS.has(row.spinStyle as SpinStyle)) return null;
  if (typeof row.blend !== "string" || !BLENDS.has(row.blend as StyleBlend)) return null;
  let palette = [...DEFAULT_STYLE.palette];
  if (row.palette != null) {
    if (!Array.isArray(row.palette) || row.palette.length < 1 || row.palette.some((color) => typeof color !== "string" || !HEX.test(color))) {
      return null;
    }
    palette = row.palette.slice(0, 8) as string[];
  }
  const num = (key: string, fallback: number) => {
    const value = row[key];
    return typeof value === "number" && Number.isFinite(value) ? clamp01(value) : fallback;
  };
  let intensityMin = num("intensityMin", DEFAULT_STYLE.intensityMin);
  let intensityMax = num("intensityMax", DEFAULT_STYLE.intensityMax);
  if (intensityMin > intensityMax) {
    const swap = intensityMin;
    intensityMin = intensityMax;
    intensityMax = swap;
  }
  return {
    palette,
    wave: row.wave as WaveKind,
    frequency: num("frequency", DEFAULT_STYLE.frequency),
    amplitude: num("amplitude", DEFAULT_STYLE.amplitude),
    speed: num("speed", DEFAULT_STYLE.speed),
    spinStyle: row.spinStyle as SpinStyle,
    intensityMin,
    intensityMax,
    blend: row.blend as StyleBlend,
  };
}

export type WaveMotion = { phase: number; front: number };

/**
 * Phase rides the tempo. A kick plants a front at the left edge and it
 * travels across. Bass sets how far the wave displaces.
 */
export function stepSuaveWave(
  state: WaveMotion,
  input: { dt: number; bpm: number; onset: boolean; speed: number; amplitude: number; bass: number },
): { state: WaveMotion; phase: number; front: number; amp: number } {
  const dt = Math.min(0.1, Math.max(0, input.dt));
  const tempo = input.bpm > 1 ? input.bpm : 96;
  const speed = clamp01(input.speed);
  let phase = state.phase + dt * (tempo / 60) * (0.35 + speed * 1.6);
  if (phase > 1000) phase -= 1000;
  let front = input.onset ? -0.2 : state.front + dt * (0.55 + speed * 1.1);
  if (front > 1.35) front = 1.35;
  const amp = clamp01(input.amplitude) * (0.5 + 0.5 * clamp01(input.bass)) * 0.12;
  return { state: { phase, front }, phase, front, amp };
}
