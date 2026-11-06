/**
 * Picture depth used by Beat Image.
 * Brightness depth is immediate. A guided filter then snaps a softer depth
 * map onto the picture's own edges. Point weights prefer bright, edgy pixels.
 */

export function luminanceOf(rgba: Uint8Array, width: number, height: number): Float32Array {
  const out = new Float32Array(width * height);
  const count = Math.min(out.length, Math.floor(rgba.length / 4));
  for (let i = 0; i < count; i++) {
    const offset = i * 4;
    out[i] = (0.2126 * rgba[offset] + 0.7152 * rgba[offset + 1] + 0.0722 * rgba[offset + 2]) / 255;
  }
  return out;
}

export function normalize01(src: Float32Array): Float32Array {
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i < src.length; i++) {
    const value = src[i];
    if (value < lo) lo = value;
    if (value > hi) hi = value;
  }
  const span = hi - lo || 1;
  const out = new Float32Array(src.length);
  for (let i = 0; i < src.length; i++) out[i] = (src[i] - lo) / span;
  return out;
}

/** Mean of a square window. Edges clamp. */
export function boxMean(src: Float32Array, width: number, height: number, radius: number): Float32Array {
  const r = Math.max(0, radius | 0);
  const stride = width + 1;
  const integral = new Float32Array(stride * (height + 1));
  for (let y = 1; y <= height; y++) {
    let row = 0;
    for (let x = 1; x <= width; x++) {
      row += src[(y - 1) * width + (x - 1)] ?? 0;
      integral[y * stride + x] = integral[(y - 1) * stride + x] + row;
    }
  }
  const out = new Float32Array(src.length);
  for (let y = 0; y < height; y++) {
    const y0 = Math.max(0, y - r);
    const y1 = Math.min(height - 1, y + r);
    for (let x = 0; x < width; x++) {
      const x0 = Math.max(0, x - r);
      const x1 = Math.min(width - 1, x + r);
      const sum = integral[(y1 + 1) * stride + (x1 + 1)] - integral[y0 * stride + (x1 + 1)] - integral[(y1 + 1) * stride + x0] + integral[y0 * stride + x0];
      out[y * width + x] = sum / ((x1 - x0 + 1) * (y1 - y0 + 1));
    }
  }
  return out;
}

/** Blurred luminance, normalised. Shown until a model depth arrives. */
export function fakeDepth(rgba: Uint8Array, width: number, height: number): Float32Array {
  const luma = luminanceOf(rgba, width, height);
  const radius = Math.max(1, Math.round(Math.min(width, height) / 32));
  return normalize01(boxMean(luma, width, height, radius));
}

/**
 * Guided filter: depth ≈ a · guide + b inside each window.
 * The guide is luminance, so the result breaks on the picture's edges.
 */
export function guidedFilter(guide: Float32Array, src: Float32Array, width: number, height: number, radius: number, eps = 0.0015): Float32Array {
  const meanI = boxMean(guide, width, height, radius);
  const meanP = boxMean(src, width, height, radius);
  const ii = new Float32Array(src.length);
  const ip = new Float32Array(src.length);
  for (let i = 0; i < src.length; i++) {
    ii[i] = guide[i] * guide[i];
    ip[i] = guide[i] * src[i];
  }
  const meanII = boxMean(ii, width, height, radius);
  const meanIP = boxMean(ip, width, height, radius);
  const a = new Float32Array(src.length);
  const b = new Float32Array(src.length);
  for (let i = 0; i < src.length; i++) {
    const variance = meanII[i] - meanI[i] * meanI[i];
    const covariance = meanIP[i] - meanI[i] * meanP[i];
    a[i] = covariance / (variance + eps);
    b[i] = meanP[i] - a[i] * meanI[i];
  }
  const meanA = boxMean(a, width, height, radius);
  const meanB = boxMean(b, width, height, radius);
  const out = new Float32Array(src.length);
  for (let i = 0; i < src.length; i++) out[i] = meanA[i] * guide[i] + meanB[i];
  return out;
}

export function resample(src: Float32Array, sw: number, sh: number, width: number, height: number): Float32Array {
  if (sw === width && sh === height) return src;
  const out = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    const gy = sh <= 1 ? 0 : (y / (height - 1)) * (sh - 1);
    const y0 = Math.floor(gy);
    const y1 = Math.min(sh - 1, y0 + 1);
    const ty = gy - y0;
    for (let x = 0; x < width; x++) {
      const gx = sw <= 1 ? 0 : (x / (width - 1)) * (sw - 1);
      const x0 = Math.floor(gx);
      const x1 = Math.min(sw - 1, x0 + 1);
      const tx = gx - x0;
      const a = src[y0 * sw + x0] ?? 0;
      const b = src[y0 * sw + x1] ?? 0;
      const c = src[y1 * sw + x0] ?? 0;
      const d = src[y1 * sw + x1] ?? 0;
      out[y * width + x] = (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
    }
  }
  return out;
}

/** Run the guided filter on a smaller grid, then scale it back. */
export function refineDepth(luma: Float32Array, depth: Float32Array, width: number, height: number): Float32Array {
  const sw = Math.max(2, Math.floor(width / 4));
  const sh = Math.max(2, Math.floor(height / 4));
  const guide = resample(luma, width, height, sw, sh);
  const small = resample(depth, width, height, sw, sh);
  const filtered = guidedFilter(guide, small, sw, sh, 2, 0.0015);
  return normalize01(resample(filtered, sw, sh, width, height));
}

export function edgeStrength(luma: Float32Array, width: number, height: number): Float32Array {
  const out = new Float32Array(luma.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const left = luma[y * width + Math.max(0, x - 1)] ?? 0;
      const right = luma[y * width + Math.min(width - 1, x + 1)] ?? 0;
      const up = luma[Math.max(0, y - 1) * width + x] ?? 0;
      const down = luma[Math.min(height - 1, y + 1) * width + x] ?? 0;
      out[y * width + x] = Math.min(1, Math.abs(right - left) + Math.abs(down - up));
    }
  }
  return out;
}

function hash01(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export type PointCloud = { positions: Float32Array; colors: Float32Array };

/**
 * Systematic sample. Weights are luminance, edge strength, and depth,
 * so points gather on the parts of the picture that read in 3D.
 */
export function samplePoints(args: {
  rgba: Uint8Array;
  luma: Float32Array;
  depth: Float32Array;
  width: number;
  height: number;
  count: number;
  seed: number;
}): PointCloud {
  const { rgba, luma, depth, width, height, seed } = args;
  const count = Math.max(1, Math.floor(args.count));
  const weights = new Float32Array(luma.length);
  const edges = edgeStrength(luma, width, height);
  let total = 0;
  for (let i = 0; i < luma.length; i++) {
    const weight = Math.pow(Math.max(0, luma[i]), 1.2) + edges[i] * (0.4 + 0.6 * clampDepth(depth[i]));
    weights[i] = weight;
    total += weight;
  }
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  if (total <= 1e-6) {
    fillGrid(positions, colors, rgba, depth, width, height, count, seed);
    return { positions, colors };
  }
  const step = total / count;
  let cursor = hash01(seed + 1) * step;
  let index = 0;
  let acc = 0;
  for (let i = 0; i < weights.length && index < count; i++) {
    acc += weights[i];
    while (acc >= cursor && index < count) {
      writePoint(positions, colors, rgba, depth, width, height, i, seed, index);
      index += 1;
      cursor += step;
    }
  }
  while (index < count) {
    writePoint(positions, colors, rgba, depth, width, height, index % luma.length, seed, index);
    index += 1;
  }
  return { positions, colors };
}

function clampDepth(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function writePoint(
  positions: Float32Array,
  colors: Float32Array,
  rgba: Uint8Array,
  depth: Float32Array,
  width: number,
  height: number,
  pixel: number,
  seed: number,
  index: number,
): void {
  const x = pixel % width;
  const y = Math.floor(pixel / width);
  const jx = hash01(seed * 13.1 + index * 0.17) - 0.5;
  const jy = hash01(seed * 17.3 + index * 0.31) - 0.5;
  const px = Math.min(width - 1, Math.max(0, x + jx));
  const py = Math.min(height - 1, Math.max(0, y + jy));
  const offset = index * 3;
  positions[offset] = px / Math.max(1, width - 1) - 0.5;
  positions[offset + 1] = 0.5 - py / Math.max(1, height - 1);
  positions[offset + 2] = clampDepth(depth[y * width + x] ?? 0) - 0.5;
  const colorAt = (Math.min(height - 1, y) * width + Math.min(width - 1, x)) * 4;
  colors[offset] = (rgba[colorAt] ?? 0) / 255;
  colors[offset + 1] = (rgba[colorAt + 1] ?? 0) / 255;
  colors[offset + 2] = (rgba[colorAt + 2] ?? 0) / 255;
}

function fillGrid(
  positions: Float32Array,
  colors: Float32Array,
  rgba: Uint8Array,
  depth: Float32Array,
  width: number,
  height: number,
  count: number,
  seed: number,
): void {
  for (let index = 0; index < count; index++) {
    const pixel = Math.min(width * height - 1, Math.floor(hash01(seed + index * 1.7) * width * height));
    writePoint(positions, colors, rgba, depth, width, height, pixel, seed, index);
  }
}
