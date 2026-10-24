import { metaConfigured } from "@/lib/aei/meta";

export const dynamic = "force-dynamic";

/** Whether the server can see MODEL_API_KEY. The key itself is never returned. */
export function GET() {
  return Response.json({ metaConfigured: metaConfigured() });
}
