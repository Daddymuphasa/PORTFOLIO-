/** GET /v1/aei/health: free status, pricing and input limits for the paid AEI call. */
import { aeiGateway } from "@/lib/aei/gateway";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return aeiGateway().health();
}

export function OPTIONS() {
  return aeiGateway().options();
}
