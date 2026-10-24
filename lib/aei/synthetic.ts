/**
 * Geometric stand-ins for the spike scripts. No photographs.
 * The crowd frame is ellipses on a dark field, not people.
 */
import { decodePng, encodePng, fill, fillEllipse, type Rgba } from "./png";
import type { ThemeDraft } from "./statusTypes";

export const CROWD_FRAME = {
  width: 320,
  height: 180,
  background: [16, 20, 24, 255] as Rgba,
  blobs: [
    { x: 48, y: 110, rx: 14, ry: 28, color: [232, 214, 170, 255] as Rgba },
    { x: 86, y: 102, rx: 12, ry: 26, color: [126, 200, 195, 255] as Rgba },
    { x: 122, y: 118, rx: 15, ry: 30, color: [232, 214, 170, 255] as Rgba },
    { x: 160, y: 96, rx: 13, ry: 27, color: [196, 168, 214, 255] as Rgba },
    { x: 198, y: 114, rx: 14, ry: 29, color: [126, 200, 195, 255] as Rgba },
    { x: 232, y: 100, rx: 12, ry: 25, color: [232, 214, 170, 255] as Rgba },
    { x: 268, y: 120, rx: 15, ry: 28, color: [242, 166, 90, 255] as Rgba },
    { x: 300, y: 108, rx: 11, ry: 24, color: [126, 200, 195, 255] as Rgba },
  ],
};

/** Fixed meter for mock mode. Not derived from a live call. */
export const MOCK_CROWD = {
  label: "mock" as const,
  prompt: "person",
  personCount: 8,
  coveragePercent: 17.4,
  densityScore: 38,
};

const GLYPHS: Record<string, string[]> = {
  M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
};

export function drawCrowdFrame(): Buffer {
  const { width, height, background, blobs } = CROWD_FRAME;
  const rgba = new Uint8Array(width * height * 4);
  fill(rgba, background);
  for (const blob of blobs) fillEllipse(rgba, width, height, blob.x, blob.y, blob.rx, blob.ry, blob.color);
  return encodePng(width, height, rgba);
}

export function drawCrowdOverlay(basePng: Buffer): Buffer {
  const image = decodePng(basePng);
  for (const blob of CROWD_FRAME.blobs) {
    fillEllipse(image.rgba, image.width, image.height, blob.x, blob.y, blob.rx + 3, blob.ry + 3, [232, 93, 117, 90]);
  }
  return encodePng(image.width, image.height, image.rgba);
}

export function drawFlyer(): Buffer {
  const width = 480;
  const height = 640;
  const rgba = new Uint8Array(width * height * 4);
  fill(rgba, [27, 20, 48, 255]);
  fillEllipse(rgba, width, height, 240, 230, 120, 120, [242, 166, 90, 255]);
  fillEllipse(rgba, width, height, 300, 280, 70, 70, [232, 93, 117, 255]);
  for (let y = 500; y < 518; y++) {
    for (let x = 60; x < 420; x++) {
      const i = (y * width + x) * 4;
      rgba.set([126, 200, 195, 255], i);
    }
  }
  return encodePng(width, height, rgba);
}

export function drawTexture(theme: Pick<ThemeDraft, "palette">, stampMock: boolean): Buffer {
  const width = 256;
  const height = 256;
  const rgba = new Uint8Array(width * height * 4);
  const colors = theme.palette.map(hexToRgba);
  for (let y = 0; y < height; y++) {
    const u = y / (height - 1);
    const span = Math.max(1, colors.length - 1);
    const scaled = u * span;
    const index = Math.min(colors.length - 2, Math.floor(scaled));
    const t = scaled - index;
    const left = colors[index] ?? colors[0];
    const right = colors[index + 1] ?? left;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      rgba[i] = Math.round(left[0] + (right[0] - left[0]) * t);
      rgba[i + 1] = Math.round(left[1] + (right[1] - left[1]) * t);
      rgba[i + 2] = Math.round(left[2] + (right[2] - left[2]) * t);
      rgba[i + 3] = 255;
    }
  }
  if (stampMock) stampWord(rgba, width, "MOCK", 16, 16);
  return encodePng(width, height, rgba);
}

function stampWord(rgba: Uint8Array, width: number, word: string, originX: number, originY: number): void {
  let cursor = originX;
  for (const letter of word) {
    const rows = GLYPHS[letter];
    if (!rows) continue;
    rows.forEach((row, y) => {
      for (const [x, bit] of [...row].entries()) {
        if (bit !== "1") continue;
        for (let dy = 0; dy < 3; dy++) {
          for (let dx = 0; dx < 3; dx++) {
            const px = cursor + x * 3 + dx;
            const py = originY + y * 3 + dy;
            const i = (py * width + px) * 4;
            rgba.set([255, 255, 255, 255], i);
          }
        }
      }
    });
    cursor += 6 * 3;
  }
}

function hexToRgba(hex: string): Rgba {
  const value = hex.replace("#", "");
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16), 255];
}
