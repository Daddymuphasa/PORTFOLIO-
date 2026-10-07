/**
 * POST /v1/aei/signals: the paid PAPAGEDON AEI call (x402 v2, USDC on Celo).
 * See lib/aei/gateway.ts for the payment flow and docs/AEI_GATEWAY.md for usage.
 */
import { aeiGateway } from "@/lib/aei/gateway";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export function POST(req: Request) {
  return aeiGateway().handleSignals(req);
}

export function OPTIONS() {
  return aeiGateway().options();
}

/** Free: how to call and pay, without running anything. */
export function GET() {
  return aeiGateway().health();
}
