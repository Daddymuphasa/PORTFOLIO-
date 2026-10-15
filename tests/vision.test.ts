import { test } from "node:test";
import assert from "node:assert/strict";
import { fuse, SceneDirector, visionScore, intensityGain, type CrowdMetrics } from "../lib/vision/fusion";
import { BrowserCrowdAnalyzer } from "../lib/vision/browserCrowd";
import { ORIGINAL_SCENES } from "../lib/vision/scenes";

const crowd = (motion: number, density: number, energy: number): CrowdMetrics => ({ motion, density, energy, source: "browser", latencyMs: 1 });

test("only the nine original visualizers are used", () => {
  assert.equal(ORIGINAL_SCENES.length, 9);
  assert.deepEqual(new Set(ORIGINAL_SCENES.map((s) => s.name)), new Set(["Nano Hex Genesis", "Armor Scales", "Obsidian Bloom", "Circuit Matrix", "Electric Nexus", "Gilded Reactor", "Prism Shards", "Liquid Mirror", "Wave Tunnel"]));
});

test("no camera falls back to audio-only", () => {
  const f = fuse({ crowd: null, audioEnergy: 0.7, alpha: 0.4 });
  assert.equal(f.mode, "audio-only");
  assert.equal(f.room, 0.7);
});

test("agreeing signals follow E = aV + (1-a)A", () => {
  const c = crowd(0.6, 0.6, 0.6);
  const f = fuse({ crowd: c, audioEnergy: 0.5, alpha: 0.4 });
  assert.equal(f.eased, false);
  assert.ok(Math.abs(f.room - (0.4 * visionScore(c) + 0.6 * 0.5)) < 1e-9);
});

test("loud music over a still crowd is eased below the plain blend", () => {
  const f = fuse({ crowd: crowd(0, 0, 0), audioEnergy: 1, alpha: 0.4 });
  assert.equal(f.eased, true);
  assert.ok(f.room < 0.6);
});

test("director holds a scene, then climbs with room energy", () => {
  const d = new SceneDirector(8);
  let t = 0;
  for (; t < 5; t += 0.1) d.update(1, t);
  const early = d.index;
  for (; t < 60; t += 0.1) d.update(1, t);
  assert.ok(d.index > early || early === 8);
  assert.equal(d.index, 8);
  assert.ok(intensityGain(0) < intensityGain(1));
});

test("browser analyzer sees motion on changing frames, none on static", () => {
  const a = new BrowserCrowdAnalyzer();
  const still = new Float32Array(100).fill(50);
  a.update(still);
  for (let i = 0; i < 10; i++) a.update(still);
  assert.ok(a.update(still).motion < 0.01);
  let m = 0;
  for (let i = 0; i < 10; i++) m = a.update(new Float32Array(100).map(() => (i % 2 ? 200 : 20))).motion;
  assert.ok(m > 0.5);
});
