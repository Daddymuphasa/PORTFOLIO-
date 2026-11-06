import { test } from "node:test";
import assert from "node:assert/strict";
import {
  beatLookFromSignals,
  pointBudget,
  shouldAdvanceImage,
  stepClock,
  stepDistort,
  stepHighOnset,
  stepSpin,
  tempoFromTaps,
  turnPerBar,
} from "../lib/aei/beatLook";
import { fakeDepth, guidedFilter, samplePoints } from "../lib/aei/depth";
import { parseMetaCue } from "../lib/aei/meta";
import { RuleDirector } from "../lib/aei/director";
import { SAMPLE_THEME } from "../lib/aei/themes";
import type { DirectorSignals } from "../lib/aei/types";

function signals(partial: Partial<DirectorSignals> & Pick<DirectorSignals, "now">): DirectorSignals {
  return { energy: 0, bass: 0, mid: 0, treble: 0, bpm: 0, onset: false, tension: 0, progress: 0, ...partial };
}

test("continuous spin at 120 BPM completes half a turn in one second", () => {
  assert.ok(Math.abs(turnPerBar(120, 1) - Math.PI) < 1e-9);
  let state = { angle: 0, impulse: 0 };
  for (let i = 0; i < 10; i++) {
    state = stepSpin(state, { dt: 0.1, bpm: 120, onset: false, downbeat: false, spin: 1, spinMode: "continuous", tap: false });
  }
  assert.ok(Math.abs(state.angle - Math.PI) < 0.02, `angle ${state.angle}`);
  let barred = { angle: 0, impulse: 0 };
  for (let i = 0; i < 10; i++) {
    barred = stepSpin(barred, { dt: 0.1, bpm: 120, onset: false, downbeat: false, spin: 1, spinMode: "bar", tap: false });
  }
  assert.ok(barred.angle < state.angle / 4, `bar angle ${barred.angle}`);
});

test("a kick adds an impulse that decays, and a downbeat snaps", () => {
  const kicked = stepSpin({ angle: 0, impulse: 0 }, { dt: 0, bpm: 120, onset: true, downbeat: false, spin: 1, spinMode: "kick", tap: false });
  assert.ok(kicked.impulse > 6);
  let faded = kicked;
  for (let i = 0; i < 5; i++) {
    faded = stepSpin(faded, { dt: 0.1, bpm: 0, onset: false, downbeat: false, spin: 1, spinMode: "kick", tap: false });
  }
  assert.ok(faded.impulse < kicked.impulse / 2);

  const half = stepSpin({ angle: 0, impulse: 0 }, { dt: 0, bpm: 0, onset: false, downbeat: true, spin: 0.8, spinMode: "continuous", tap: false });
  assert.ok(Math.abs(half.angle - Math.PI) < 1e-9);
  const quarter = stepSpin({ angle: 0, impulse: 0 }, { dt: 0, bpm: 0, onset: false, downbeat: true, spin: 0.2, spinMode: "bar", tap: false });
  assert.ok(Math.abs(quarter.angle - Math.PI / 2) < 1e-9);
});

test("the clock marks every fourth hit as a downbeat", () => {
  let clock = { beats: 0, sinceBeat: 0 };
  const hits: boolean[] = [];
  for (let i = 0; i < 8; i++) {
    const step = stepClock(clock, { dt: 0.5, onset: true, tap: false, bpm: 120 });
    clock = step.clock;
    hits.push(step.downbeat);
  }
  assert.deepEqual(hits, [true, false, false, false, true, false, false, false]);
  assert.equal(tempoFromTaps([0, 0.5, 1, 1.5]), 120);
  assert.equal(tempoFromTaps([0]), null);
});

test("bass lifts relief and a kick punches, a high onset splits colour", () => {
  const quiet = stepDistort(
    { punch: 0, wave: 0, glitch: 0 },
    { dt: 0.016, time: 0, bass: 0, mid: 0, treble: 0, onset: false, highOnset: false, relief: 1, distortion: 1, glitch: 1 },
  );
  const loud = stepDistort(
    { punch: 0, wave: 0, glitch: 0 },
    { dt: 0.016, time: 0, bass: 1, mid: 0, treble: 0, onset: true, highOnset: false, relief: 1, distortion: 1, glitch: 1 },
  );
  assert.ok(loud.relief > quiet.relief);
  assert.ok(loud.punch > 0.8);
  assert.ok(loud.wave > 0.8);
  const later = stepDistort(loud.state, { dt: 0.2, time: 0.2, bass: 1, mid: 0, treble: 0, onset: false, highOnset: false, relief: 1, distortion: 1, glitch: 1 });
  assert.ok(later.punch < loud.punch);

  const split = stepDistort(
    { punch: 0, wave: 0, glitch: 0 },
    { dt: 0.016, time: 0, bass: 0, mid: 0.2, treble: 0.8, onset: false, highOnset: true, relief: 0.5, distortion: 0.2, glitch: 0.9 },
  );
  assert.ok(split.glitch > 0.8);
  assert.ok(split.warp > quiet.warp);
});

test("high-band onset is a rise, not the level itself", () => {
  const first = stepHighOnset({ level: 0.1 }, 0.2, 0.2);
  assert.equal(first.onset, false);
  const jump = stepHighOnset(first.state, 0.1, 0.9);
  assert.equal(jump.onset, true);
});

test("brightness depth is higher on a bright pixel, and the guided filter snaps to an edge", () => {
  const width = 16;
  const height = 8;
  const rgba = new Uint8Array(width * height * 4);
  const center = (4 * width + 8) * 4;
  rgba[center] = 255;
  rgba[center + 1] = 255;
  rgba[center + 2] = 255;
  rgba[center + 3] = 255;
  const depth = fakeDepth(rgba, width, height);
  assert.ok(depth[4 * width + 8] > depth[0]);

  const guide = new Float32Array(width * height);
  const soft = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      guide[y * width + x] = x < 8 ? 0 : 1;
      soft[y * width + x] = x / (width - 1);
    }
  }
  const sharp = guidedFilter(guide, soft, width, height, 2, 0.001);
  const edge = Math.abs(sharp[8] - sharp[7]);
  const ramp = Math.abs(soft[8] - soft[7]);
  assert.ok(edge > ramp * 2, `edge ${edge} ramp ${ramp}`);
});

test("points gather on the bright side of a picture", () => {
  const width = 8;
  const height = 8;
  const rgba = new Uint8Array(width * height * 4);
  const luma = new Float32Array(width * height);
  const depth = new Float32Array(width * height);
  for (let i = 0; i < luma.length; i++) {
    const x = i % width;
    const bright = x >= 6 ? 1 : 0;
    luma[i] = bright;
    depth[i] = bright ? 1 : 0.1;
    rgba[i * 4] = bright ? 255 : 0;
    rgba[i * 4 + 3] = 255;
  }
  const cloud = samplePoints({ rgba, luma, depth, width, height, count: 48, seed: 3 });
  let right = 0;
  for (let i = 0; i < 48; i++) if (cloud.positions[i * 3] > 0.2) right += 1;
  assert.ok(right > 30, `right ${right}`);
});

test("point budget shrinks on a small device", () => {
  assert.equal(pointBudget(0, false), 131072);
  assert.equal(pointBudget(1, false), 262144);
  assert.ok(pointBudget(1, true) <= 65536);
  assert.equal(shouldAdvanceImage({ bar: 8, lastBar: 0, every: 8, swapToken: 0, lastToken: 0 }), true);
  assert.equal(shouldAdvanceImage({ bar: 3, lastBar: 0, every: 8, swapToken: 1, lastToken: 0 }), true);
  assert.equal(shouldAdvanceImage({ bar: 3, lastBar: 0, every: 8, swapToken: 0, lastToken: 0 }), false);
});

test("the director and a meta cue can both carry a beat look", () => {
  const cue = new RuleDirector().update(signals({ energy: 0.1, bass: 0.1, now: 0 }), SAMPLE_THEME);
  assert.equal(cue.beat.spinMode, "continuous");
  assert.equal(cue.beat.mode, "mesh");
  const hot = beatLookFromSignals(signals({ energy: 1, bass: 1, mid: 1, treble: 1, now: 1 }));
  assert.equal(hot.mode, "points");
  assert.equal(hot.spinMode, "kick");
  assert.ok(hot.relief > cue.beat.relief);

  const parsed = parseMetaCue(
    {
      scene: "beat-image",
      paletteShift: 0,
      intensity: 0.4,
      strobe: 0,
      beat: { relief: 0.2, spin: 0.9, spinMode: "bar", distortion: 0.3, glitch: 0.4, points: 1, mode: "points", swap: 2 },
    },
    1,
  );
  assert.equal(parsed.scene, "beat-image");
  assert.equal(parsed.beat.spinMode, "bar");
  assert.equal(parsed.beat.mode, "points");
  assert.equal(parsed.beat.swap, 2);
  assert.equal(parsed.beat.spin, 0.9);
  assert.throws(() => parseMetaCue({ scene: "beat-image", paletteShift: 0, intensity: 0, strobe: 0, beat: { spinMode: "sideways" } }, 0));
});
