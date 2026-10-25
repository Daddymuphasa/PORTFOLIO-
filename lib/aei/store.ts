/**
 * Local event memory: theme packs and a session cue log as JSON files.
 * Swap the interface later if storage moves off disk.
 */
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { outDir, sessionId } from "./costLog";
import { styleFromPalette } from "./flyer";
import { validateThemeDraft } from "./schema";
import type { CrowdMeter, StoredCue, ThemeDraft } from "./statusTypes";
import type { ThemePack } from "./types";

export type SessionRecord = {
  id: string;
  cues: StoredCue[];
  crowd: CrowdMeter | null;
  updatedAt: string;
};

const SEED: StoredCue = {
  at: 0,
  scene: "liquid-mirror",
  source: "rules",
  intensity: 0.22,
  strobe: 0,
  asset: "lantern-haze",
  reason: "seeded event memory",
};

function storeRoot(): string {
  return path.join(outDir(), "store");
}

function sessionPath(): string {
  return path.join(storeRoot(), "session.json");
}

function themePath(id: string): string {
  return path.join(storeRoot(), "themes", `${safeId(id)}.json`);
}

export function safeId(value: string): string {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!slug) throw new Error("id is empty");
  return slug.slice(0, 64);
}

export function themeDraftToPack(draft: ThemeDraft): ThemePack {
  return {
    id: safeId(draft.name),
    name: draft.name,
    palette: draft.palette,
    motifs: draft.motifKeywords,
    mood: draft.mood,
    energyArc: draft.intensityCurve.map((point) => ({ at: point.at, energy: point.intensity })),
    style: styleFromPalette(draft.palette),
  };
}

export async function saveTheme(draft: ThemeDraft): Promise<ThemePack> {
  const pack = themeDraftToPack(validateThemeDraft(draft));
  const file = themePath(pack.id);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(pack, null, 2)}\n`, "utf8");
  return pack;
}

export async function listThemes(): Promise<ThemePack[]> {
  const dir = path.join(storeRoot(), "themes");
  let names: string[] = [];
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }
  const packs: ThemePack[] = [];
  for (const name of names) {
    if (!name.endsWith(".json")) continue;
    const raw = JSON.parse(await readFile(path.join(dir, name), "utf8")) as ThemePack;
    packs.push(raw);
  }
  return packs;
}

export async function loadSession(): Promise<SessionRecord> {
  try {
    const parsed = JSON.parse(await readFile(sessionPath(), "utf8")) as SessionRecord;
    if (parsed && Array.isArray(parsed.cues)) return parsed;
  } catch {
    // First read creates the seeded session below.
  }
  const created: SessionRecord = { id: sessionId(), cues: [SEED], crowd: null, updatedAt: new Date().toISOString() };
  await saveSession(created);
  return created;
}

export async function saveSession(session: SessionRecord): Promise<void> {
  const file = sessionPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(session, null, 2)}\n`, "utf8");
}

export async function appendCue(cue: StoredCue): Promise<SessionRecord> {
  const session = await loadSession();
  session.cues.push(cue);
  session.cues = session.cues.slice(-200);
  session.updatedAt = new Date().toISOString();
  await saveSession(session);
  return session;
}

export async function saveCrowd(crowd: CrowdMeter): Promise<SessionRecord> {
  const session = await loadSession();
  session.crowd = crowd;
  session.updatedAt = new Date().toISOString();
  await saveSession(session);
  return session;
}

export function readStoredCue(raw: unknown): StoredCue | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const source = row.source;
  if (source !== "rules" && source !== "meta" && source !== "operator" && source !== "live" && source !== "mock") return null;
  if (typeof row.scene !== "string" || !row.scene.trim()) return null;
  if (typeof row.reason !== "string") return null;
  for (const key of ["at", "intensity", "strobe"] as const) {
    if (typeof row[key] !== "number" || !Number.isFinite(row[key])) return null;
  }
  const asset = row.asset == null ? null : typeof row.asset === "string" ? row.asset.slice(0, 80) : null;
  if (row.asset != null && typeof row.asset !== "string") return null;
  const optional = (key: string) => {
    const value = row[key];
    return typeof value === "number" && Number.isFinite(value) ? value : undefined;
  };
  const latencyMs = optional("latencyMs");
  const crowdBefore = optional("crowdBefore");
  const crowdAfter = optional("crowdAfter");
  return {
    at: row.at as number,
    scene: row.scene.trim().slice(0, 80),
    source,
    intensity: Math.min(1, Math.max(0, row.intensity as number)),
    strobe: Math.min(1, Math.max(0, row.strobe as number)),
    asset,
    reason: row.reason.trim().slice(0, 180),
    ...(latencyMs == null ? {} : { latencyMs: Math.max(0, latencyMs) }),
    ...(crowdBefore == null ? {} : { crowdBefore }),
    ...(crowdAfter == null ? {} : { crowdAfter }),
  };
}

/** Fill the crowd score that followed a cue. Day 7 can read it from the same row. */
export async function noteCrowdResponse(match: { at: number; scene: string; crowdAfter: number }): Promise<SessionRecord> {
  const session = await loadSession();
  for (let i = session.cues.length - 1; i >= 0; i--) {
    const cue = session.cues[i];
    if (cue.scene === match.scene && Math.abs(cue.at - match.at) < 0.05) {
      cue.crowdAfter = match.crowdAfter;
      break;
    }
  }
  session.updatedAt = new Date().toISOString();
  await saveSession(session);
  return session;
}
