/**
 * Server-side AEI settings. Reports present, missing, or invalid.
 * Never log a value and never put one in a response.
 */
import type { KeyReport, KeyState } from "./statusTypes";

const DEFAULT_MODELS = {
  theme: "muse-spark-1.3",
  segmentation: "sam-3.1",
  image: "muse-image-1.0",
} as const;

export type AeiEnv = NodeJS.ProcessEnv | Record<string, string | undefined>;

const MODEL_ID = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}$/;
const TOKEN = /^[\x21-\x7e]{12,256}$/;
const PLACEHOLDER = /^(todo|changeme|your-key-here|xxx+)$/i;

type KeySpec = {
  name: string;
  required: boolean;
  check: (value: string) => boolean;
};

const KEYS: KeySpec[] = [
  { name: "MODEL_API_KEY", required: false, check: (value) => TOKEN.test(value) && !PLACEHOLDER.test(value) },
  { name: "MODEL_API_BASE_URL", required: false, check: isHttpUrl },
  { name: "MODEL_ID_MUSE_SPARK", required: false, check: (value) => MODEL_ID.test(value) },
  { name: "MODEL_ID_SAM", required: false, check: (value) => MODEL_ID.test(value) },
  { name: "MODEL_ID_MUSE_IMAGE", required: false, check: (value) => MODEL_ID.test(value) },
  { name: "AEI_STORAGE_TOKEN", required: false, check: (value) => TOKEN.test(value) && !PLACEHOLDER.test(value) },
  { name: "AEI_DEPLOY_TOKEN", required: false, check: (value) => TOKEN.test(value) && !PLACEHOLDER.test(value) },
];

function readRaw(env: AeiEnv, name: string): string | undefined {
  const value = env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function keyState(env: AeiEnv, name: string): KeyState {
  const spec = KEYS.find((entry) => entry.name === name);
  const value = readRaw(env, name);
  if (!value) return "missing";
  if (!spec?.check(value)) return "invalid";
  return "present";
}

/** Safe to send to the browser: names and states only. */
export function configReport(env: AeiEnv = process.env): KeyReport[] {
  return KEYS.map((spec) => ({
    name: spec.name,
    state: keyState(env, spec.name),
    required: spec.required,
  }));
}

export function keyIsUsable(env: AeiEnv = process.env): boolean {
  return keyState(env, "MODEL_API_KEY") === "present";
}

export function usableModelKey(env: AeiEnv = process.env): string | undefined {
  if (!keyIsUsable(env)) return undefined;
  return readRaw(env, "MODEL_API_KEY");
}

export function resolveBaseUrl(env: AeiEnv = process.env): string | null {
  if (keyState(env, "MODEL_API_BASE_URL") !== "present") return null;
  return readRaw(env, "MODEL_API_BASE_URL") ?? null;
}

export function resolveModelId(kind: keyof typeof DEFAULT_MODELS, env: AeiEnv = process.env): string {
  const name = kind === "theme" ? "MODEL_ID_MUSE_SPARK" : kind === "segmentation" ? "MODEL_ID_SAM" : "MODEL_ID_MUSE_IMAGE";
  if (keyState(env, name) === "present") return readRaw(env, name) ?? DEFAULT_MODELS[kind];
  return DEFAULT_MODELS[kind];
}
