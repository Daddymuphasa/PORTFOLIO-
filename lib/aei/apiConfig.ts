/**
 * Live call seam. Endpoints and the request body are intentionally unconfirmed.
 * TODO: set `confirmed` only after checking the official docs for the base URL,
 * path, auth header, and body. Do not guess those here.
 */
import { resolveBaseUrl, type AeiEnv } from "./config";

export class EndpointNotConfirmedError extends Error {
  constructor(capability: string) {
    super(`${capability} endpoint is TODO. Confirm lib/aei/apiConfig.ts against the official docs before live calls.`);
    this.name = "EndpointNotConfirmedError";
  }
}

export const API_CONFIG = {
  /** Flip to true only after the fields below match the official docs. */
  confirmed: false,
  models: {
    theme: "muse-spark-1.3",
    segmentation: "sam-3.1",
    image: "muse-image-1.0",
  },
  /** Path under the base URL. Replace TODO with the documented path. */
  endpoints: {
    theme: "TODO",
    segmentation: "TODO",
    image: "TODO",
  } as Record<"theme" | "segmentation" | "image", string>,
};

export type LiveCapability = keyof typeof API_CONFIG.endpoints;

export function liveRequestUrl(capability: LiveCapability, env?: AeiEnv): string | null {
  if (!API_CONFIG.confirmed) return null;
  const path = API_CONFIG.endpoints[capability];
  if (!path || path === "TODO") return null;
  const base = resolveBaseUrl(env);
  if (!base) return null;
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}

/**
 * Builds the live HTTP request. Throws while the docs are unconfirmed, so no
 * guessed body is sent. Auth header included only on that same confirmed path.
 */
export async function attemptLiveCall(
  capability: LiveCapability,
  apiKey: string,
  env?: AeiEnv,
): Promise<unknown> {
  const url = liveRequestUrl(capability, env);
  if (!url) throw new EndpointNotConfirmedError(capability);
  // TODO: confirm header and body. This block does not run while confirmed is false.
  const response = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ model: API_CONFIG.models[capability] }),
  });
  if (!response.ok) throw new Error(`live ${capability} responded ${response.status}`);
  return response.json() as Promise<unknown>;
}
