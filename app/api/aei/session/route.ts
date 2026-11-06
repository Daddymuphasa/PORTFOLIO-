import { appendCue, loadSession, noteCrowdResponse, readStoredCue } from "@/lib/aei/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await loadSession());
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 4000) return Response.json({ error: "Body too large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Expected JSON" }, { status: 400 });
  }
  if (body && typeof body === "object" && (body as { update?: unknown }).update === true) {
    const row = body as Record<string, unknown>;
    if (typeof row.at !== "number" || !Number.isFinite(row.at)) return Response.json({ error: "Invalid cue" }, { status: 400 });
    if (typeof row.scene !== "string" || !row.scene.trim()) return Response.json({ error: "Invalid cue" }, { status: 400 });
    if (typeof row.crowdAfter !== "number" || !Number.isFinite(row.crowdAfter)) return Response.json({ error: "Invalid cue" }, { status: 400 });
    const session = await noteCrowdResponse({
      at: row.at,
      scene: row.scene.trim().slice(0, 80),
      crowdAfter: Math.min(1, Math.max(0, row.crowdAfter)),
    });
    return Response.json({ id: session.id, updated: true });
  }
  const cue = readStoredCue(body);
  if (!cue) return Response.json({ error: "Invalid cue" }, { status: 400 });
  const session = await appendCue(cue);
  return Response.json({ id: session.id, cues: session.cues.length });
}
