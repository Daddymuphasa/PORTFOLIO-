import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { POST } from "../app/api/aei/flyer/route";
import { parseMetaCue } from "../lib/aei/meta";
import { HARBOR_THEME, SAMPLE_THEME } from "../lib/aei/themes";
import {
  analyzeFlyer,
  composeBeatLook,
  dominantPalette,
  readFlyerReport,
  steerStyle,
  stepSuaveWave,
  styleFromRead,
  styleFromSignals,
  type FlyerRead,
} from "../lib/aei/flyer";
import { DEFAULT_BEAT_LOOK } from "../lib/aei/beatLook";
import { decodePng } from "../lib/aei/png";
import { drawFlyer } from "../lib/aei/synthetic";

function fill(width: number, height: number, paint: (x: number, y: number) => [number, number, number]): Uint8Array {
  const rgba = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b] = paint(x, y);
      const i = (y * width + x) * 4;
      rgba[i] = r;
      rgba[i + 1] = g;
      rgba[i + 2] = b;
      rgba[i + 3] = 255;
    }
  }
  return rgba;
}

const calmRead: FlyerRead = {
  palette: ["#102030"],
  contrast: 0.04,
  brightness: 0.12,
  edgeDensity: 0.02,
  busyness: 0.05,
  warmth: 0.2,
};

test("a calm flyer maps to a slow sine and a loud one maps tighter", () => {
  const flat = fill(24, 24, () => [8, 18, 64]);
  const read = analyzeFlyer(flat, 24, 24);
  const calm = styleFromRead(read);
  assert.equal(calm.wave, "sine");
  assert.equal(calm.spinStyle, "glide");
  assert.equal(calm.blend, "soft");
  assert.ok(calm.frequency < 0.3, `freq ${calm.frequency}`);
  assert.ok(calm.speed < 0.25, `speed ${calm.speed}`);
  assert.ok(calm.intensityMax - calm.intensityMin < 0.4);

  const loud = styleFromRead({ ...calmRead, contrast: 0.8, busyness: 0.8, edgeDensity: 0.9, warmth: 0.4 });
  assert.equal(loud.wave, "glitch");
  assert.equal(loud.spinStyle, "snap");
  assert.equal(loud.blend, "add");
  assert.ok(loud.frequency > calm.frequency);
  assert.ok(loud.speed > calm.speed);
  assert.ok(loud.intensityMin >= 0.45);

  const busy = styleFromRead({ ...calmRead, contrast: 0.5, busyness: 0.6, warmth: 0.3 });
  assert.equal(busy.wave, "liquid");
  assert.ok(busy.frequency > calm.frequency);
  assert.ok(busy.speed > calm.speed);
});

test("warmth, palette, and a theme colour override", () => {
  const warm = analyzeFlyer(fill(16, 16, () => [220, 40, 24]), 16, 16);
  const cool = analyzeFlyer(fill(16, 16, () => [16, 40, 210]), 16, 16);
  assert.ok(warm.warmth > cool.warmth, `warm ${warm.warmth} cool ${cool.warmth}`);
  assert.ok(warm.warmth > 0.7);
  assert.ok(cool.warmth < 0.3);

  const split = fill(16, 16, (x) => (x < 8 ? [240, 20, 20] : [20, 40, 230]));
  const palette = dominantPalette(split, 16, 16);
  const red = palette.some((color) => {
    const value = Number.parseInt(color.slice(1), 16);
    return ((value >> 16) & 255) > 180 && (value & 255) < 80;
  });
  const blue = palette.some((color) => {
    const value = Number.parseInt(color.slice(1), 16);
    return (value & 255) > 180 && ((value >> 16) & 255) < 80;
  });
  assert.equal(red, true);
  assert.equal(blue, true);

  const styled = styleFromRead(warm, ["#ABCDEF", "#112233"]);
  assert.deepEqual(styled.palette, ["#ABCDEF", "#112233"]);
  assert.equal(readFlyerReport({ ...warm, busyness: 1.4 }), null);
  assert.equal(readFlyerReport(warm)?.warmth, warm.warmth);
});

test("steering keeps a calm wave and only glitches a liquid one when the highs are hot", () => {
  const calm = styleFromRead(calmRead);
  const held = steerStyle(calm, { energy: 0.1, bass: 0.1, treble: 0.95 });
  assert.equal(held.wave, "sine");

  const liquid = styleFromRead({ ...calmRead, contrast: 0.5, busyness: 0.6, warmth: 0.2 });
  assert.equal(liquid.wave, "liquid");
  const sparked = steerStyle(liquid, { energy: 0.85, bass: 0.4, treble: 0.9 });
  assert.equal(sparked.wave, "glitch");
  const quiet = steerStyle(liquid, { energy: 0.2, bass: 0.2, treble: 0.2 });
  assert.equal(quiet.wave, "liquid");

  const soft = styleFromSignals({ energy: 0.1, bass: 0.1, treble: 0.1 });
  const hot = styleFromSignals({ energy: 1, bass: 1, treble: 1 });
  assert.equal(soft.wave, "sine");
  assert.equal(hot.wave, "glitch");
  assert.ok(hot.speed > soft.speed);
  assert.ok(hot.frequency > soft.frequency);
});

test("a kick plants a wave front and bass lifts the amplitude", () => {
  const planted = stepSuaveWave(
    { phase: 0, front: 1.35 },
    { dt: 0.1, bpm: 120, onset: true, speed: 0.3, amplitude: 0.6, bass: 0 },
  );
  assert.equal(planted.front, -0.2);
  const later = stepSuaveWave(planted.state, { dt: 0.1, bpm: 120, onset: false, speed: 0.3, amplitude: 0.6, bass: 0 });
  assert.ok(later.front > planted.front);
  assert.ok(later.phase > planted.phase);
  const quiet = stepSuaveWave(planted.state, { dt: 0.1, bpm: 60, onset: false, speed: 0.2, amplitude: 0.5, bass: 0 });
  const heavy = stepSuaveWave(planted.state, { dt: 0.1, bpm: 60, onset: false, speed: 0.2, amplitude: 0.5, bass: 1 });
  assert.ok(heavy.amp > quiet.amp);

  const locked = composeBeatLook(DEFAULT_BEAT_LOOK, liquidStyle(), true, true, { energy: 1, bass: 1, treble: 1 });
  assert.equal(locked.style.wave, "liquid");
  const open = composeBeatLook(DEFAULT_BEAT_LOOK, liquidStyle(), false, true, { energy: 0.9, bass: 0.4, treble: 0.95 });
  assert.equal(open.style.wave, "glitch");
  assert.equal(open.spinMode, "kick");
});

test("theme packs carry a style and a meta cue can set the wave", () => {
  assert.equal(HARBOR_THEME.style.wave, "sine");
  assert.equal(HARBOR_THEME.style.blend, "soft");
  assert.equal(SAMPLE_THEME.style.wave, "liquid");
  assert.equal(SAMPLE_THEME.style.palette[1], "#F2A65A");

  const parsed = parseMetaCue(
    {
      scene: "beat-image",
      paletteShift: 0,
      intensity: 0.2,
      strobe: 0,
      beat: {
        relief: 0.4,
        spin: 0.4,
        spinMode: "continuous",
        distortion: 0.2,
        glitch: 0.1,
        points: 0.4,
        mode: "mesh",
        style: { wave: "ripple", spinStyle: "glide", blend: "screen", frequency: 0.33, palette: ["#445566"] },
      },
    },
    2,
  );
  assert.equal(parsed.beat.style.wave, "ripple");
  assert.equal(parsed.beat.style.palette[0], "#445566");
  assert.equal(parsed.beat.style.blend, "screen");
  assert.throws(
    () =>
      parseMetaCue(
        {
          scene: "beat-image",
          paletteShift: 0,
          intensity: 0,
          strobe: 0,
          beat: { spinMode: "continuous", mode: "mesh", style: { wave: "sideways", spinStyle: "glide", blend: "soft" } },
        },
        0,
      ),
    /beat look is invalid/,
  );
});

test("the sample poster is a real style and the flyer route keeps the picture off the server", async () => {
  const poster = decodePng(drawFlyer());
  const read = analyzeFlyer(poster.rgba, poster.width, poster.height);
  const local = styleFromRead(read);
  assert.ok(local.palette.length >= 1);
  assert.ok(local.speed >= 0 && local.speed <= 1);
  assert.match(local.wave, /sine|ripple|liquid|glitch/);

  const previous = process.env.AEI_OUT_DIR;
  const dir = await mkdtemp(path.join(tmpdir(), "aei-flyer-"));
  process.env.AEI_OUT_DIR = dir;
  try {
    const response = await POST(
      new Request("http://local/api/aei/flyer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brief: "harbor glass tide", read }),
      }),
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as { name: string; style: { wave: string; palette: string[] }; palette: string[]; mode: string };
    assert.equal(body.style.wave, styleFromRead(read, body.palette).wave);
    assert.deepEqual(body.style.palette, body.palette);
    assert.ok(body.name.length > 0);
    assert.equal(JSON.stringify(body).includes("rgba"), false);

    const rejected = await POST(
      new Request("http://local/api/aei/flyer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ read: { ...read, contrast: 4 } }),
      }),
    );
    assert.equal(rejected.status, 400);
    const huge = await POST(new Request("http://local/api/aei/flyer", { method: "POST", body: "x".repeat(9000) }));
    assert.equal(huge.status, 413);
  } finally {
    if (previous === undefined) delete process.env.AEI_OUT_DIR;
    else process.env.AEI_OUT_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

function liquidStyle() {
  return styleFromRead({ ...calmRead, contrast: 0.5, busyness: 0.6, warmth: 0.2 });
}
