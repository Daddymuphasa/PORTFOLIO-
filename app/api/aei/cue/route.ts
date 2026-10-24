import { MetaDirector, MetaDirectorError, readMetaCueRequest } from "@/lib/aei/meta";
import { themeById } from "@/lib/aei/themes";

export const dynamic = "force-dynamic";

/**
 * One-shot Meta cue. The rule director on /aei does not call this.
 * Until MODEL_API_KEY is set and the transport is filled in, this responds
 * with the stub error and the show keeps the rules.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 8000) return Response.json({ error: "Body too large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Expected JSON" }, { status: 400 });
  }

  const parsed = readMetaCueRequest(body);
  if (!parsed) return Response.json({ error: "Invalid cue request" }, { status: 400 });
  const theme = themeById(parsed.themeId);
  if (!theme) return Response.json({ error: "Unknown theme" }, { status: 400 });

  try {
    const cue = await new MetaDirector().decide({ theme, signals: parsed.signals });
    return Response.json({ cue });
  } catch (error) {
    const message = error instanceof MetaDirectorError ? error.message : "Meta director failed";
    const status = message.includes("not set") ? 503 : 501;
    return Response.json({ error: message }, { status });
  }
}
