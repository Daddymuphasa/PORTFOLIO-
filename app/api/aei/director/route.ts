/**
 * One director ask. The stage does not wait on this route.
 * A slow, failed, or invalid reply tells the stage to keep the rules.
 */
import { API_CONFIG, attemptLiveCall, liveRequestUrl } from "@/lib/aei/apiConfig";
import { resolveModelId, usableModelKey } from "@/lib/aei/config";
import { appendCost } from "@/lib/aei/costLog";
import { clampDirectorCue, mockDirectorCue, readDirectorInput, takeDirectorCue } from "@/lib/aei/loop";

export const dynamic = "force-dynamic";

const TIMEOUT_MS = 1500;

function unwrapCue(raw: unknown): unknown {
  if (typeof raw === "string") {
    try {
      return unwrapCue(JSON.parse(raw) as unknown);
    } catch {
      return null;
    }
  }
  if (raw && typeof raw === "object" && "cue" in raw) return (raw as { cue: unknown }).cue;
  return raw;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 12_000) return Response.json({ error: "Body too large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Expected JSON" }, { status: 400 });
  }
  const input = readDirectorInput(body);
  if (!input) return Response.json({ error: "Invalid director input" }, { status: 400 });

  const env = process.env;
  const key = usableModelKey(env);
  const liveReady = Boolean(key && API_CONFIG.confirmed && liveRequestUrl("theme", env));
  if (!liveReady) {
    const started = Date.now();
    const draft = clampDirectorCue(mockDirectorCue(input), input.theme.palette);
    const latencyMs = Date.now() - started;
    await appendCost({ model: resolveModelId("theme", env), mode: "mock", latencyMs });
    if (!draft) return Response.json({ ok: false, source: "rules", latencyMs });
    return Response.json({ ok: true, source: "mock", latencyMs, cue: draft });
  }

  const taken = await takeDirectorCue(async () => {
    const raw = await attemptLiveCall("theme", key as string, env, input);
    const draft = clampDirectorCue(unwrapCue(raw), input.theme.palette);
    if (!draft) throw new Error("invalid cue");
    return draft;
  }, TIMEOUT_MS);
  await appendCost({ model: resolveModelId("theme", env), mode: "live", latencyMs: taken.latencyMs });
  if (!taken.ok) return Response.json({ ok: false, source: "rules", latencyMs: taken.latencyMs });
  return Response.json({ ok: true, source: "live", latencyMs: taken.latencyMs, cue: taken.value });
}
