import { buildStatus } from "@/lib/aei/statusReport";

export const dynamic = "force-dynamic";

/** Provider modes and key states. Values of keys are not included. */
export async function GET() {
  return Response.json(await buildStatus());
}
