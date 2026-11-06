/**
 * Output checks for theme packs, the crowd meter, and texture bytes.
 * This is our result shape, not a model response format.
 */
import { AEI_SCENE_IDS } from "./scenes";
import type { CrowdMeter, ThemeDraft } from "./statusTypes";

export class SchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SchemaError";
  }
}

const HEX = /^#[0-9a-fA-F]{6}$/;
const LABELS = new Set(["mock", "live", "fallback"]);

export function validateThemeDraft(raw: unknown): ThemeDraft {
  const row = record(raw, "theme");
  const label = text(row, "label");
  if (!LABELS.has(label)) throw new SchemaError("theme label must be mock, live, or fallback");
  const name = text(row, "name");
  const mood = text(row, "mood");
  const palette = stringList(row, "palette");
  if (palette.length < 1 || palette.some((color) => !HEX.test(color))) throw new SchemaError("theme palette needs #RRGGBB colours");
  const motifKeywords = stringList(row, "motifKeywords");
  if (motifKeywords.length < 1) throw new SchemaError("theme needs motif keywords");
  const sceneIds = stringList(row, "sceneIds");
  if (sceneIds.length < 1 || sceneIds.some((id) => !AEI_SCENE_IDS.includes(id))) {
    throw new SchemaError("theme scene ids must come from the AEI scene pool");
  }
  const curveRaw = row.intensityCurve;
  if (!Array.isArray(curveRaw) || curveRaw.length < 2) throw new SchemaError("theme intensity curve needs at least two points");
  const intensityCurve = curveRaw.map((point) => {
    const entry = record(point, "intensity point");
    const at = unit(entry, "at");
    const intensity = unit(entry, "intensity");
    return { at, intensity };
  });
  for (let i = 1; i < intensityCurve.length; i++) {
    if (intensityCurve[i].at < intensityCurve[i - 1].at) throw new SchemaError("intensity curve must be sorted");
  }
  return { label: label as ThemeDraft["label"], name, palette, mood, intensityCurve, sceneIds, motifKeywords };
}

export function validateCrowdMeter(raw: unknown): CrowdMeter {
  const row = record(raw, "crowd meter");
  const label = text(row, "label");
  if (!LABELS.has(label)) throw new SchemaError("crowd label must be mock, live, or fallback");
  const prompt = text(row, "prompt");
  const personCount = nonNegativeInt(row, "personCount");
  const coveragePercent = unit100(row, "coveragePercent");
  const densityScore = unit100(row, "densityScore");
  return { label: label as CrowdMeter["label"], prompt, personCount, coveragePercent, densityScore };
}

export function validatePng(raw: unknown): Buffer {
  const png = Buffer.isBuffer(raw) ? raw : null;
  if (!png || png.length < 8 || png[0] !== 137 || png.toString("ascii", 1, 4) !== "PNG") {
    throw new SchemaError("texture must be a PNG");
  }
  return png;
}

function record(raw: unknown, name: string): Record<string, unknown> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new SchemaError(`${name} must be an object`);
  return raw as Record<string, unknown>;
}

function text(row: Record<string, unknown>, key: string): string {
  const value = row[key];
  if (typeof value !== "string" || !value.trim()) throw new SchemaError(`${key} must be text`);
  return value.trim();
}

function stringList(row: Record<string, unknown>, key: string): string[] {
  const value = row[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !item.trim())) {
    throw new SchemaError(`${key} must be a list of strings`);
  }
  return value.map((item) => item.trim());
}

function unit(row: Record<string, unknown>, key: string): number {
  const value = row[key];
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) {
    throw new SchemaError(`${key} must be between 0 and 1`);
  }
  return value;
}

function unit100(row: Record<string, unknown>, key: string): number {
  const value = row[key];
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) {
    throw new SchemaError(`${key} must be between 0 and 100`);
  }
  return value;
}

function nonNegativeInt(row: Record<string, unknown>, key: string): number {
  const value = row[key];
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) throw new SchemaError(`${key} must be a non-negative integer`);
  return value;
}
