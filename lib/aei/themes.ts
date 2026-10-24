/**
 * Hand-written theme packs. A pack is the pre-event brief: palette, motifs,
 * mood, and the energy shape of the night. Flyer and banner reading comes later;
 * these two packs are enough to run the director with no model.
 */
import type { EnergyPoint, ThemePack } from "./types";

export const SAMPLE_THEME: ThemePack = {
  id: "afterglow-terrace",
  name: "Afterglow Terrace",
  palette: ["#1B1430", "#F2A65A", "#E85D75", "#7EC8C3"],
  motifs: ["lantern-haze", "horizon-ring", "petal-drift", "ember-rain"],
  mood: "warm late-night climb, soft gold into rose",
  energyArc: [
    { at: 0, energy: 0.15 },
    { at: 0.25, energy: 0.35 },
    { at: 0.55, energy: 0.62 },
    { at: 0.8, energy: 0.9 },
    { at: 1, energy: 0.4 },
  ],
};

export const HARBOR_THEME: ThemePack = {
  id: "harbor-glass",
  name: "Harbor Glass",
  palette: ["#06141B", "#1B6CA8", "#C6E4F2", "#E7D7A1"],
  motifs: ["tide-line", "glass-pier", "fog-lamp", "cold-spark"],
  mood: "cool and spacious, a slow tide into a bright last hour",
  energyArc: [
    { at: 0, energy: 0.12 },
    { at: 0.4, energy: 0.28 },
    { at: 0.7, energy: 0.55 },
    { at: 0.9, energy: 0.78 },
    { at: 1, energy: 0.33 },
  ],
};

export const THEMES: ThemePack[] = [SAMPLE_THEME, HARBOR_THEME];

export function themeById(id: string): ThemePack | undefined {
  return THEMES.find((theme) => theme.id === id);
}

/** Linear sample of a theme's energy arc. Points may arrive unsorted. */
export function sampleEnergyArc(arc: readonly EnergyPoint[], progress: number): number {
  if (arc.length === 0) return 0;
  const p = clamp01(progress);
  const points = [...arc].sort((a, b) => a.at - b.at);
  if (p <= points[0].at) return clamp01(points[0].energy);
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (p <= b.at) {
      const span = b.at - a.at;
      const u = span === 0 ? 0 : (p - a.at) / span;
      return clamp01(a.energy + (b.energy - a.energy) * u);
    }
  }
  return clamp01(points[points.length - 1].energy);
}

const HEX = /^#(?:[0-9a-fA-F]{6})$/;

export function safeHex(color: string, fallback = "#1B1430"): string {
  return HEX.test(color) ? color : fallback;
}

/** Three colours from the theme palette, rotated by `shift` in 0..1. */
export function paletteWindow(colors: readonly string[], shift: number): [string, string, string] {
  const list = (colors.length ? colors : ["#1B1430", "#F2A65A", "#E85D75"]).map((c) => safeHex(c));
  const n = list.length;
  const start = Math.floor(clamp01(shift) * n) % n;
  return [list[start % n], list[(start + 1) % n], list[(start + 2) % n]];
}

function clamp01(v: number): number {
  if (!Number.isFinite(v)) return 0;
  return Math.min(1, Math.max(0, v));
}
