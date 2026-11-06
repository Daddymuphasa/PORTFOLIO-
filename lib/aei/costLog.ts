/**
 * Append-only usage log shared by the spike scripts and the AEI routes.
 * One JSON object per line. Values of keys are never written.
 */
import { appendFile, mkdir, readFile } from "fs/promises";
import path from "path";
import type { UsageTotal } from "./statusTypes";

export type CostMode = "mock" | "live";

export type CostEntry = {
  timestamp: string;
  model: string;
  mode: CostMode;
  latencyMs: number;
  sessionId: string;
  tokens?: number;
  images?: number;
};

let queue: Promise<void> = Promise.resolve();

export function outDir(): string {
  const custom = process.env.AEI_OUT_DIR?.trim();
  return custom || path.join(process.cwd(), "out");
}

export function costLogPath(): string {
  return path.join(outDir(), "cost-log.jsonl");
}

export function sessionId(): string {
  const raw = process.env.AEI_SESSION_ID?.trim();
  if (raw && /^[a-zA-Z0-9_-]{1,64}$/.test(raw)) return raw;
  return "local";
}

export function appendCost(entry: Omit<CostEntry, "timestamp" | "sessionId"> & { sessionId?: string }): Promise<void> {
  const line: CostEntry = {
    timestamp: new Date().toISOString(),
    model: entry.model,
    mode: entry.mode,
    latencyMs: Math.max(0, Math.round(entry.latencyMs)),
    sessionId: entry.sessionId ?? sessionId(),
  };
  if (typeof entry.tokens === "number" && Number.isFinite(entry.tokens)) line.tokens = entry.tokens;
  if (typeof entry.images === "number" && Number.isFinite(entry.images)) line.images = entry.images;
  const file = costLogPath();
  queue = queue.then(async () => {
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(file, `${JSON.stringify(line)}\n`, "utf8");
  });
  return queue;
}

export async function usageTotal(id = sessionId()): Promise<UsageTotal> {
  let text = "";
  try {
    text = await readFile(costLogPath(), "utf8");
  } catch {
    return { sessionId: id, calls: 0, tokens: 0, images: 0 };
  }
  const total: UsageTotal = { sessionId: id, calls: 0, tokens: 0, images: 0 };
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    try {
      const row = JSON.parse(line) as Partial<CostEntry>;
      if (row.sessionId !== id) continue;
      total.calls += 1;
      if (typeof row.tokens === "number") total.tokens += row.tokens;
      if (typeof row.images === "number") total.images += row.images;
    } catch {
      // Skip a torn line. The next append is a full object.
    }
  }
  return total;
}
