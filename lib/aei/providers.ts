/**
 * One adapter set per capability: live (docs still TODO), mock, and the
 * rule fallback used when a live call fails, times out, or is rate limited.
 * The key selects live vs mock. Fallback is the safety net, not a third key.
 */
import { attemptLiveCall, EndpointNotConfirmedError, type LiveCapability } from "./apiConfig";
import { appendCost, sessionId } from "./costLog";
import { resolveModelId, usableModelKey, type AeiEnv } from "./config";
import { runModelCall } from "./meta";
import { RateLimiter, RateLimitError, withRetry, withTimeout } from "./policy";
import { validateCrowdMeter, validatePng, validateThemeDraft } from "./schema";
import { AEI_SCENE_IDS } from "./scenes";
import { coveragePercent, decodePng } from "./png";
import { drawCrowdOverlay, drawTexture, MOCK_CROWD } from "./synthetic";
import { HARBOR_THEME, SAMPLE_THEME } from "./themes";
import type { CrowdMeter, ProviderId, ProviderMode, ProviderStatus, ThemeDraft } from "./statusTypes";
import type { ThemePack } from "./types";

type Stats = { mode: ProviderMode; latencyMs: number | null; error: string | null };

export type ProviderRuntime = {
  stats: Map<ProviderId, Stats>;
  limiter: RateLimiter;
};

export type ProviderDeps = {
  env?: AeiEnv;
  timeoutMs?: number;
  retries?: number;
  backoffMs?: number;
  live?: (capability: LiveCapability, apiKey: string) => Promise<unknown>;
  state?: ProviderRuntime;
};

const singleton: ProviderRuntime = {
  stats: new Map(),
  limiter: new RateLimiter(60, 60_000),
};

export function providerSnapshot(state: ProviderRuntime = singleton, env: AeiEnv = process.env): ProviderStatus[] {
  const keyPresent = Boolean(usableModelKey(env));
  return (["theme", "segmentation", "image"] as const).map((id) => {
    const row = state.stats.get(id);
    return {
      id,
      mode: row?.mode ?? (keyPresent ? "live" : "mock"),
      keyPresent,
      lastLatencyMs: row?.latencyMs ?? null,
      lastError: row?.error ?? null,
    };
  });
}

export function createProviders(deps: ProviderDeps = {}) {
  const env = deps.env ?? process.env;
  const state = deps.state ?? singleton;
  const timeoutMs = deps.timeoutMs ?? 8000;
  const retries = deps.retries ?? 2;
  const backoffMs = deps.backoffMs ?? 200;
  const live = deps.live ?? ((capability: LiveCapability, apiKey: string) => attemptLiveCall(capability, apiKey, env));

  async function run<T>(id: ProviderId, capability: LiveCapability, mock: () => T | Promise<T>, validate: (raw: unknown) => T, fallback: () => T | Promise<T>, usage?: { tokens?: number; images?: number }): Promise<{ value: T; mode: ProviderMode; latencyMs: number; error?: string }> {
    const started = Date.now();
    try {
      state.limiter.take();
      const call = await withRetry(
        () => withTimeout(runModelCall({ env, mock, live: (apiKey) => live(capability, apiKey), validate }), timeoutMs),
        { retries: usableModelKey(env) ? retries : 0, backoffMs, retryOn: isRetryable },
      );
      state.stats.set(id, { mode: call.mode, latencyMs: call.latencyMs, error: null });
      await appendCost({ model: resolveModelId(capability, env), mode: call.mode, latencyMs: call.latencyMs, sessionId: sessionId(), ...usageFor(call.mode, usage) });
      return call;
    } catch (error) {
      const latencyMs = Date.now() - started;
      const message = safeError(error, usableModelKey(env));
      state.stats.set(id, { mode: "fallback", latencyMs, error: message });
      if (usableModelKey(env)) {
        await appendCost({ model: resolveModelId(capability, env), mode: "live", latencyMs, sessionId: sessionId() });
      }
      return { mode: "fallback", value: await fallback(), latencyMs, error: message };
    }
  }

  return {
    theme: {
      id: "theme" as const,
      generate(input: { brief?: string; image?: Buffer } = {}) {
        if (input.image && input.image.byteLength === 0) throw new Error("flyer image is empty");
        return run("theme", "theme", () => MOCK_THEME, validateThemeDraft, () => ruleTheme(input.brief));
      },
    },
    segmentation: {
      id: "segmentation" as const,
      async segment(input: { image: Buffer; prompt?: string }) {
        if (!input.image?.byteLength) throw new Error("crowd frame is empty");
        const prompt = input.prompt?.trim() || "person";
        const result = await run(
          "segmentation",
          "segmentation",
          () => ({ ...MOCK_CROWD, prompt }),
          validateCrowdMeter,
          () => ruleCrowd(input.image, prompt),
          { images: 1 },
        );
        return { ...result, overlayPng: drawCrowdOverlay(input.image) };
      },
    },
    image: {
      id: "image" as const,
      async generateTexture(theme: ThemeDraft) {
        const draft = validateThemeDraft(theme);
        const result = await run(
          "image",
          "image",
          () => drawTexture(draft, true),
          validatePng,
          () => drawTexture(draft, false),
          { images: 1 },
        );
        return { ...result, label: result.mode };
      },
    },
  };
}

export const providers = createProviders();

const MOCK_THEME: ThemeDraft = {
  label: "mock",
  name: "Afterglow Terrace",
  palette: ["#1B1430", "#F2A65A", "#E85D75", "#7EC8C3"],
  mood: "warm late-night climb, soft gold into rose",
  intensityCurve: [
    { at: 0, intensity: 0.18 },
    { at: 0.35, intensity: 0.42 },
    { at: 0.7, intensity: 0.74 },
    { at: 1, intensity: 0.36 },
  ],
  sceneIds: ["liquid-mirror", "obsidian-bloom", "neon-tunnel", "electric-nexus"],
  motifKeywords: ["lantern-haze", "horizon-ring", "ember-rain"],
};

function ruleTheme(brief?: string): ThemeDraft {
  const pack = /harbor|cool|glass|tide/i.test(brief ?? "") ? HARBOR_THEME : SAMPLE_THEME;
  return draftFromPack(pack);
}

function draftFromPack(pack: ThemePack): ThemeDraft {
  const sceneIds = AEI_SCENE_IDS.filter((_, index) => index % 3 === 0).slice(0, 4);
  return {
    label: "fallback",
    name: pack.name,
    palette: [...pack.palette],
    mood: pack.mood,
    intensityCurve: pack.energyArc.map((point) => ({ at: point.at, intensity: point.energy })),
    sceneIds: sceneIds.length ? [...sceneIds] : ["liquid-mirror"],
    motifKeywords: [...pack.motifs],
  };
}

function ruleCrowd(image: Buffer, prompt: string): CrowdMeter {
  const decoded = decodePng(image);
  const coverage = Math.round(coveragePercent(decoded.rgba) * 10) / 10;
  const personCount = Math.max(0, Math.round(coverage / 2.2));
  const densityScore = Math.max(0, Math.min(100, Math.round(coverage * 2)));
  return { label: "fallback", prompt, personCount, coveragePercent: coverage, densityScore };
}

function usageFor(mode: "mock" | "live", usage?: { tokens?: number; images?: number }) {
  if (mode !== "mock" && mode !== "live") return {};
  return usage ?? {};
}

function isRetryable(error: unknown): boolean {
  if (error instanceof EndpointNotConfirmedError) return false;
  if (error instanceof RateLimitError) return false;
  return true;
}

function safeError(error: unknown, secret?: string): string {
  const message = error instanceof Error ? error.message : "call failed";
  const redacted = secret ? message.split(secret).join("[redacted]") : message;
  return redacted.slice(0, 180);
}
