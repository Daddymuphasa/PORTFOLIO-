/**
 * One worker for every picture. Results are cached by picture id.
 * If the worker or the model fails, the caller keeps the brightness depth.
 */
import { resample } from "@/lib/aei/depth";

export type ModelDepth = { depth: Float32Array; width: number; height: number };

type Pending = {
  resolve: (value: ModelDepth) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

let worker: Worker | null = null;
let seq = 0;
const pending = new Map<number, Pending>();
const cache = new Map<string, Promise<ModelDepth>>();

function thread(): Worker {
  if (worker) return worker;
  worker = new Worker(new URL("./depth.worker.ts", import.meta.url));
  worker.onmessage = (event: MessageEvent<{ id: number; width: number; height: number; depth?: Float32Array; error?: string }>) => {
    const row = pending.get(event.data.id);
    if (!row) return;
    pending.delete(event.data.id);
    clearTimeout(row.timer);
    if (!event.data.depth) {
      row.reject(new Error(event.data.error || "depth failed"));
      return;
    }
    row.resolve({ depth: event.data.depth, width: event.data.width, height: event.data.height });
  };
  worker.onerror = () => {
    for (const row of pending.values()) {
      clearTimeout(row.timer);
      row.reject(new Error("depth worker stopped"));
    }
    pending.clear();
    worker = null;
  };
  return worker;
}

export function cachedModelDepth(id: string, rgba: Uint8Array, width: number, height: number): Promise<ModelDepth> {
  const hit = cache.get(id);
  if (hit) return hit;
  const task = requestModelDepth(rgba, width, height).catch((error: unknown) => {
    cache.delete(id);
    throw error;
  });
  cache.set(id, task);
  return task;
}

function requestModelDepth(rgba: Uint8Array, width: number, height: number): Promise<ModelDepth> {
  const id = ++seq;
  const copy = new Uint8Array(rgba);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error("depth timed out"));
    }, 45000);
    pending.set(id, { resolve, reject, timer });
    thread().postMessage({ id, rgba: copy, width, height }, [copy.buffer]);
  });
}

export function depthToPicture(model: ModelDepth, width: number, height: number): Float32Array {
  return resample(model.depth, model.width, model.height, width, height);
}
