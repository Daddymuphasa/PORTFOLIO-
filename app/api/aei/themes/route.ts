import { listThemes, saveTheme } from "@/lib/aei/store";
import { SchemaError, validateThemeDraft } from "@/lib/aei/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  const themes = await listThemes();
  return Response.json({ themes });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 20_000) return Response.json({ error: "Body too large" }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Expected JSON" }, { status: 400 });
  }
  try {
    const pack = await saveTheme(validateThemeDraft(body));
    return Response.json({ theme: pack });
  } catch (error) {
    const message = error instanceof SchemaError ? error.message : "Theme was rejected";
    return Response.json({ error: message }, { status: 400 });
  }
}
