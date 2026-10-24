/**
 * Meta director stub. Server-only: it reads MODEL_API_KEY and never ships the
 * key to the browser. The transport is unwired on purpose. When the key
 * arrives, replace `unwiredTransport` with one request that returns a
 * MetaCueDraft. parseMetaCue already checks the draft.
 *
 * Intended calls, all behind this provider (not on the frame loop):
 *   - Muse Spark: one structured cue (scene, palette shift, intensity, strobe, asset)
 *   - SAM 3.1: segmentation, once a frame source exists
 *   - Muse Image: motif textures addressed by `asset`
 */
import { AEI_SCENE_IDS } from "./scenes";
import type { Cue, DirectorSignals, ThemePack } from "./types";

export class MetaDirectorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MetaDirectorError";
  }
}

export type MetaCueRequest = {
  theme: ThemePack;
  signals: DirectorSignals;
};

export type MetaTransportInput = {
  theme: Pick<ThemePack, "id" | "name" | "palette" | "motifs" | "mood" | "energyArc">;
  signals: DirectorSignals;
  scenes: readonly string[];
  now: number;
};

/** Draft the model must return. `parseMetaCue` is the contract. */
export type MetaCueDraft = {
  scene: string;
  paletteShift: number;
  intensity: number;
  strobe: number;
  asset?: string | null;
  reason?: string;
};

export type MetaTransport = (input: MetaTransportInput, apiKey: string) => Promise<unknown>;

export type ModelKeyEnv = NodeJS.ProcessEnv | { MODEL_API_KEY?: string };

export function readModelApiKey(env: ModelKeyEnv = process.env): string | undefined {
  const key = env.MODEL_API_KEY?.trim();
  return key ? key : undefined;
}

export function metaConfigured(env: ModelKeyEnv = process.env): boolean {
  return Boolean(readModelApiKey(env));
}

export function unwiredTransport(): Promise<never> {
  return Promise.reject(new MetaDirectorError("Meta cue transport is not wired yet"));
}

const SIGNAL_NUMBERS = ["energy", "bass", "mid", "treble", "bpm", "tension", "progress", "now"] as const;

export function readMetaCueRequest(body: unknown): { themeId: string; signals: DirectorSignals } | null {
  if (!body || typeof body !== "object") return null;
  const root = body as Record<string, unknown>;
  if (typeof root.themeId !== "string" || !root.themeId) return null;
  if (!root.signals || typeof root.signals !== "object") return null;
  const signals = root.signals as Record<string, unknown>;
  if (typeof signals.onset !== "boolean") return null;
  const out = { onset: signals.onset } as DirectorSignals;
  for (const key of SIGNAL_NUMBERS) {
    const value = signals[key];
    if (typeof value !== "number" || !Number.isFinite(value)) return null;
    out[key] = value;
  }
  return { themeId: root.themeId, signals: out };
}

export function parseMetaCue(raw: unknown, now: number): Cue {
  if (!raw || typeof raw !== "object") throw new MetaDirectorError("Meta cue was not an object");
  const draft = raw as Record<string, unknown>;
  const scene = typeof draft.scene === "string" ? draft.scene : "";
  if (!AEI_SCENE_IDS.includes(scene)) throw new MetaDirectorError(`Meta cue scene is not in the pool: ${scene}`);
  const num = (key: string) => {
    const value = draft[key];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new MetaDirectorError(`Meta cue ${key} must be a number`);
    }
    return Math.min(1, Math.max(0, value));
  };
  if (draft.asset != null && typeof draft.asset !== "string") {
    throw new MetaDirectorError("Meta cue asset must be a string or null");
  }
  const reason = typeof draft.reason === "string" ? draft.reason.trim().slice(0, 180) : "";
  return {
    id: `m${now.toFixed(3)}`,
    at: now,
    scene,
    paletteShift: num("paletteShift"),
    intensity: num("intensity"),
    strobe: num("strobe"),
    asset: typeof draft.asset === "string" && draft.asset ? draft.asset : null,
    source: "meta",
    reason: reason || "meta cue",
  };
}

export class MetaDirector {
  readonly id = "meta" as const;

  constructor(
    private readonly env: ModelKeyEnv = process.env,
    private readonly transport: MetaTransport = unwiredTransport,
  ) {}

  configured(): boolean {
    return metaConfigured(this.env);
  }

  async decide(request: MetaCueRequest): Promise<Cue> {
    const apiKey = readModelApiKey(this.env);
    if (!apiKey) throw new MetaDirectorError("MODEL_API_KEY is not set");
    const now = Number.isFinite(request.signals.now) ? request.signals.now : 0;
    const raw = await this.transport(
      {
        theme: {
          id: request.theme.id,
          name: request.theme.name,
          palette: request.theme.palette,
          motifs: request.theme.motifs,
          mood: request.theme.mood,
          energyArc: request.theme.energyArc,
        },
        signals: request.signals,
        scenes: AEI_SCENE_IDS,
        now,
      },
      apiKey,
    );
    return parseMetaCue(raw, now);
  }
}
