/**
 * Flyer study. The browser sends measured stats, not the picture.
 * The theme provider supplies the palette (live when a key is confirmed,
 * otherwise the mock pack or the rule fallback). The wave comes from the stats.
 */
import { readFlyerReport, styleFromRead } from "@/lib/aei/flyer";
import { providers } from "@/lib/aei/providers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 8_000) return Response.json({ error: "Body too large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Expected JSON" }, { status: 400 });
  }
  const row = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const read = readFlyerReport(row?.read);
  if (!read) return Response.json({ error: "Flyer read is invalid" }, { status: 400 });
  const brief = typeof row?.brief === "string" && row.brief.trim() ? row.brief.trim().slice(0, 180) : "event flyer";
  try {
    const theme = await providers.theme.generate({ brief });
    const style = styleFromRead(read, theme.value.palette);
    return Response.json({
      name: theme.value.name,
      mood: theme.value.mood,
      palette: theme.value.palette,
      style,
      mode: theme.mode,
      read,
    });
  } catch {
    return Response.json({ error: "Flyer study failed" }, { status: 500 });
  }
}
