/** Client for the AWS-hosted OpenCV 5 vision service (vision-service/). */
import type { CrowdMetrics } from "./fusion";

export const VISION_SERVICE_URL = (process.env.NEXT_PUBLIC_VISION_SERVICE_URL || "").replace(/\/$/, "");

export async function analyzeOnService(jpeg: Blob, sessionId: string, signal?: AbortSignal): Promise<CrowdMetrics> {
  const t0 = performance.now();
  const res = await fetch(`${VISION_SERVICE_URL}/v1/analyze`, {
    method: "POST",
    headers: { "Content-Type": "image/jpeg", "X-Session-Id": sessionId },
    body: jpeg,
    signal,
  });
  if (!res.ok) throw new Error(`vision service ${res.status}`);
  const j = (await res.json()) as { motion: number; density: number; energy: number; people?: number };
  return { motion: j.motion, density: j.density, energy: j.energy, people: j.people, source: "opencv-service", latencyMs: performance.now() - t0 };
}
