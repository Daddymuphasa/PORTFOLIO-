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

export type ThemePack = {
  id: string;
  name: string;
  /** Hex colours (#RRGGBB), at least one. */
  palette: string[];
  motifs: string[];
  mood: string;
  energyArc: EnergyPoint[];
};

export type CueSource = "rules" | "meta" | "operator";

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
