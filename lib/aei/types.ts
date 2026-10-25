/**
 * Shared AEI types. A theme pack is written before the event. A cue is one
 * decision from the director. Render params are the only knobs the stage reads.
 */

export type EnergyPoint = {
  /** 0..1 progress through the event. */
  at: number;
  /** Planned energy, 0..1. */
  energy: number;
};

export type WaveKind = "sine" | "ripple" | "liquid" | "glitch";
export type SpinStyle = "glide" | "pulse" | "snap";
export type StyleBlend = "soft" | "add" | "screen";

/**
 * How Beat Image bends a picture. Written with a theme pack, and carried on
 * each cue so the director can retune the wave.
 */
export type DistortionStyle = {
  /** Hex colours for tint, glow, and the chromatic edge. */
  palette: string[];
  wave: WaveKind;
  /** 0..1. Low is a wide wave, high is a tight one. */
  frequency: number;
  /** 0..1. Bass scales this on the stage. */
  amplitude: number;
  /** 0..1. How fast the phase moves with the tempo. */
  speed: number;
  spinStyle: SpinStyle;
  intensityMin: number;
  intensityMax: number;
  blend: StyleBlend;
};

export type ThemePack = {
  id: string;
  name: string;
  /** Hex colours (#RRGGBB), at least one. */
  palette: string[];
  motifs: string[];
  mood: string;
  energyArc: EnergyPoint[];
  /** Wave the pack asks Beat Image to use. */
  style: DistortionStyle;
};

export type CueSource = "rules" | "meta" | "operator";

export type SpinMode = "continuous" | "kick" | "bar";
export type BeatRenderMode = "mesh" | "points";

/**
 * Knobs for the Beat Image scene. Amounts are 0..1 so a cue can carry them.
 * `swap` advances when it changes, which asks the scene for the next picture.
 */
export type BeatLook = {
  relief: number;
  spin: number;
  spinMode: SpinMode;
  distortion: number;
  glitch: number;
  /** 0..1 across the device's point budget. */
  points: number;
  mode: BeatRenderMode;
  swap: number;
  /** Flyer or director wave. The stage reads this every frame. */
  style: DistortionStyle;
};

/** One director decision. `paletteShift` rotates through the active theme. */
export type Cue = {
  id: string;
  /** Seconds on the director clock. */
  at: number;
  scene: string;
  paletteShift: number;
  intensity: number;
  strobe: number;
  /** Motif id from the theme, or a later generated texture id. */
  asset: string | null;
  source: CueSource;
  reason: string;
  /** Present on every cue. The Beat Image scene is the only reader. */
  beat: BeatLook;
};

/** The small set the renderer is driven by. */
export type RenderParams = {
  palette: [string, string, string];
  intensity: number;
  sceneId: string;
  strobe: number;
};

/** One analysis frame, already summarised for a director. */
export type DirectorSignals = {
  energy: number;
  bass: number;
  mid: number;
  treble: number;
  bpm: number;
  /** True on the frame an onset (beat) is detected. */
  onset: boolean;
  tension: number;
  /** 0..1 through the loaded file, or 0 when the length is unknown. */
  progress: number;
  now: number;
};

export type ManualOverride = {
  enabled: boolean;
  scene: string;
  intensity: number;
  strobe: number;
  paletteShift: number;
};
