/** Turn an uploaded file into a square picture with brightness depth. */
import { fakeDepth, luminanceOf, refineDepth } from "@/lib/aei/depth";
import { rasterSize } from "@/lib/aei/beatLook";
import type { BeatPicture } from "./beatScene";
import { rasterizeImage } from "./raster";

export function deviceIsLowEnd(): boolean {
  if (typeof window === "undefined") return false;
  const narrow = window.matchMedia("(max-width: 800px)").matches;
  const cores = navigator.hardwareConcurrency || 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return narrow || cores <= 4 || memory <= 4;
}

export async function pictureFromFile(file: Blob, name: string, id: string, lowEnd = deviceIsLowEnd()): Promise<BeatPicture> {
  const size = rasterSize(lowEnd);
  const rgba = await rasterizeImage(file, size);
  return {
    id,
    name,
    size,
    rgba,
    depth: fakeDepth(rgba, size, size),
    kind: "brightness",
  };
}

export function withModelDepth(picture: BeatPicture, depth: Float32Array): BeatPicture {
  const luma = luminanceOf(picture.rgba, picture.size, picture.size);
  return {
    ...picture,
    depth: refineDepth(luma, depth, picture.size, picture.size),
    kind: "model",
  };
}
