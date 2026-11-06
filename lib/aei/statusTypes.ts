/** JSON shapes returned by AEI routes. No secret values belong in these types. */

export type KeyState = "present" | "missing" | "invalid";
export type ProviderMode = "live" | "mock" | "fallback";
export type ProviderId = "theme" | "segmentation" | "image";

export type KeyReport = {
  name: string;
  state: KeyState;
  required: boolean;
};

export type ProviderStatus = {
  id: ProviderId;
  mode: ProviderMode;
  keyPresent: boolean;
  lastLatencyMs: number | null;
  lastError: string | null;
};

export type UsageTotal = {
  sessionId: string;
  calls: number;
  tokens: number;
  images: number;
};

export type AeiStatusBody = {
  metaConfigured: boolean;
  keys: KeyReport[];
  providers: ProviderStatus[];
  usage: UsageTotal;
};

export type CrowdMeter = {
  label: "mock" | "live" | "fallback";
  prompt: string;
  personCount: number;
  coveragePercent: number;
  densityScore: number;
};

export type ThemeDraft = {
  label: "mock" | "live" | "fallback";
  name: string;
  palette: string[];
  mood: string;
  intensityCurve: { at: number; intensity: number }[];
  sceneIds: string[];
  motifKeywords: string[];
};

export type StoredCue = {
  at: number;
  scene: string;
  source: "rules" | "meta" | "operator" | "live" | "mock";
  intensity: number;
  strobe: number;
  asset: string | null;
  reason: string;
  latencyMs?: number;
  crowdBefore?: number;
  crowdAfter?: number | null;
};
