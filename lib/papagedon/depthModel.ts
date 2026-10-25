/**
 * Model boundary for PAPAGEDON image-depth effects.
 *
 * A provider receives a browser-local image and returns a normalized depth map
 * (white = near, black = far). The WebGL stage owns real-time parallax and
 * audio response; inference providers only produce/update the depth texture.
 */
export type DepthMap = {
  data: Uint8Array;
  width: number;
  height: number;
  nearIsWhite: true;
};

export type DepthModelProvider = {
  id: string;
  label: string;
  estimate(image: ImageBitmap, signal?: AbortSignal): Promise<DepthMap>;
};

/** Stable contract for future FastDepth ONNX/TVM service or in-browser adapter. */
export const FAST_DEPTH_MODEL = {
  name: "FastDepth",
  repository: "https://github.com/dwofk/fast-depth",
  license: "MIT",
  input: { layout: "NCHW", channels: 3, width: 224, height: 224, color: "RGB float32" },
  output: { layout: "NCHW", channels: 1, width: 224, height: 224, meaning: "relative monocular depth" },
  architecture: "MobileNet encoder + pruned depthwise-separable NNConv decoder + additive skip connections",
} as const;

/** Convert a grayscale depth image into the texture format used by WebGL. */
export function normalizeDepthMap(data: Uint8Array, width: number, height: number, nearIsWhite = true): DepthMap {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || data.length !== width * height) {
    throw new Error("Depth maps must have one grayscale value per pixel.");
  }
  const output = new Uint8Array(data);
  if (!nearIsWhite) for (let i = 0; i < output.length; i++) output[i] = 255 - output[i];
  return { data: output, width, height, nearIsWhite: true };
}
