/**
 * Depth Anything V2 small, off the UI thread.
 * WebGPU first, then WASM. A failure is reported and the picture keeps its
 * brightness depth. The model id is the public ONNX build of that network.
 */
import { env, pipeline, RawImage, type DepthEstimationPipeline } from "@huggingface/transformers";

const MODEL = "onnx-community/depth-anything-v2-small";

type InMsg = { id: number; rgba: Uint8Array; width: number; height: number };
type OutMsg = { id: number; width: number; height: number; depth?: Float32Array; error?: string };

let session: Promise<DepthEstimationPipeline> | null = null;

function hasWebGpu(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

async function load(): Promise<DepthEstimationPipeline> {
  env.allowLocalModels = false;
  env.useBrowserCache = true;
  const devices = hasWebGpu() ? (["webgpu", "wasm"] as const) : (["wasm"] as const);
  let last: unknown;
  for (const device of devices) {
    try {
      return await pipeline("depth-estimation", MODEL, { device });
    } catch (error) {
      last = error;
    }
  }
  throw last instanceof Error ? last : new Error("depth model failed to load");
}

function model(): Promise<DepthEstimationPipeline> {
  if (!session) {
    session = load().catch((error: unknown) => {
      session = null;
      throw error;
    });
  }
  return session;
}

type WorkerScope = {
  onmessage: ((event: MessageEvent<InMsg>) => void) | null;
  postMessage: (message: OutMsg, transfer?: Transferable[]) => void;
};

const scope = self as unknown as WorkerScope;

scope.onmessage = (event: MessageEvent<InMsg>) => {
  const message = event.data;
  void run(message.id, message.rgba, message.width, message.height);
};

async function run(id: number, rgba: Uint8Array, width: number, height: number): Promise<void> {
  try {
    const estimator = await model();
    const image = new RawImage(rgba, width, height, 4);
    const output = await estimator(image);
    const map = Array.isArray(output) ? output[0]?.depth : output.depth;
    if (!map) throw new Error("depth output was empty");
    const depth = new Float32Array(map.width * map.height);
    const channels = map.channels || 1;
    let max = 0;
    for (let i = 0; i < depth.length; i++) {
      const value = Number(map.data[i * channels] ?? 0);
      depth[i] = value;
      if (value > max) max = value;
    }
    if (max > 1.5) {
      for (let i = 0; i < depth.length; i++) depth[i] /= max;
    }
    const reply: OutMsg = { id, width: map.width, height: map.height, depth };
    scope.postMessage(reply, [depth.buffer]);
  } catch (error) {
    const reply: OutMsg = { id, width, height, error: error instanceof Error ? error.message : "depth failed" };
    scope.postMessage(reply);
  }
}
