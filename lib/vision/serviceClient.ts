/**
 * Client for the OpenCV 5 vision service on AWS Lambda (vision-service/).
 * Lambda is stateless across instances, so each request carries the current
 * frame plus the previous one: a cold or new instance can still compute
 * optical flow on the first request (the response says `warm: false`).
 */
import type { CrowdMetrics } from "./fusion";

export const VISION_SERVICE_URL = (process.env.NEXT_PUBLIC_VISION_SERVICE_URL || "").replace(/\/$/, "");

export type ServiceMetrics = CrowdMetrics & { warm?: boolean };

export async function analyzeOnService(frame: Blob, prev: Blob | null, sessionId: string, signal?: AbortSignal): Promise<ServiceMetrics> {
  const t0 = performance.now();
  const body = new FormData();
  body.append("frame", frame, "frame.jpg");
  if (prev) body.append("prev", prev, "prev.jpg");
  const res = await fetch(`${VISION_SERVICE_URL}/v1/analyze`, { method: "POST", headers: { "X-Session-Id": sessionId }, body, signal });
  if (!res.ok) throw new Error(`vision service ${res.status}`);
  const j = (await res.json()) as { motion: number; density: number; energy: number; people?: number; warm?: boolean };
  return { motion: j.motion, density: j.density, energy: j.energy, people: j.people, warm: j.warm, source: "opencv-service", latencyMs: performance.now() - t0 };
}
