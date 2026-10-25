/** Assembles the public status payload. Key values stay in the server process. */
import { usageTotal } from "./costLog";
import { configReport, keyIsUsable, type AeiEnv } from "./config";
import { providerSnapshot } from "./providers";
import type { AeiStatusBody } from "./statusTypes";

export async function buildStatus(env: AeiEnv = process.env): Promise<AeiStatusBody> {
  return {
    metaConfigured: keyIsUsable(env),
    keys: configReport(env),
    providers: providerSnapshot(undefined, env),
    usage: await usageTotal(),
  };
}
