import { appendCue, loadSession, readStoredCue } from "@/lib/aei/store";

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
  const cue = readStoredCue(body);
  if (!cue) return Response.json({ error: "Invalid cue" }, { status: 400 });
  const session = await appendCue(cue);
  return Response.json({ id: session.id, cues: session.cues.length });
}
