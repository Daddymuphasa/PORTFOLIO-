import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { POST as directorPost } from "../app/api/aei/director/route";
import { POST as sessionPost } from "../app/api/aei/session/route";
import { DEFAULT_BEAT_LOOK } from "../lib/aei/beatLook";
import { loadSession } from "../lib/aei/store";
import { AEI_SCENE_IDS } from "../lib/aei/scenes";
import { SAMPLE_THEME } from "../lib/aei/themes";
import type { Cue } from "../lib/aei/types";
import {
  askReason,
  buildDirectorInput,
  clampDirectorCue,
  DirectorLoop,
  energySpike,
  guessSection,
  mockDirectorCue,
  readDirectorInput,
  summarizeCrowd,
  summarizeMusic,
  syntheticCrowdScore,
  takeDirectorCue,
  type CueMemory,
  type MusicSample,
} from "../lib/aei/loop";

function rulesCue(scene = "liquid-mirror"): Cue {
  return {
    id: "rules",
    at: 0,
    scene,
    paletteShift: 0,
    intensity: 0.22,
    strobe: 0,
    asset: null,
    source: "rules",
    reason: "rules",
    beat: DEFAULT_BEAT_LOOK,
  };
}

function ctx(now: number, extra: Partial<{ onset: boolean; energy: number; bpm: number; progress: number; crowd: number }> = {}) {
  return {
    now,
    onset: extra.onset ?? false,
    energy: extra.energy ?? 0.2,
    bpm: extra.bpm ?? 120,
    progress: extra.progress ?? 0.4,
    crowd: extra.crowd ?? 0.3,
    theme: SAMPLE_THEME,
    style: SAMPLE_THEME.style,
  };
}

function warm(loop: DirectorLoop, rules: Cue) {
  let found: { ask: NonNullable<ReturnType<DirectorLoop["frame"]>["ask"]>; at: number } | null = null;
  for (let i = 0; i < 8 && !found; i++) {
    const at = i * 0.05;
    const frame = loop.frame(rules, ctx(at));
    if (frame.ask) found = { ask: frame.ask, at };
  }
  return found;
}

test("director input carries the theme, the music window, the crowd, and recent cues", () => {
  const now = 10;
  const hot: MusicSample[] = Array.from({ length: 16 }, (_, i) => ({
    t: now - 1.5 + i * 0.1,
    energy: i < 4 ? 0.4 : 0.92,
    bpm: 128,
    onset: true,
  }));
  const music = summarizeMusic(hot, now, 0.5);
  assert.equal(music.section, "drop");
  assert.equal(music.bpm, 128);
  assert.ok(music.onsetDensity > 1);
  assert.ok(music.energy > 0.6);
  assert.equal(guessSection({ energy: 0.8, onsetDensity: 0.2, slope: 0.2, progress: 0.5 }), "drop");
  assert.equal(guessSection({ energy: 0.4, onsetDensity: 0.2, slope: -0.2, progress: 0.5 }), "breakdown");
  assert.equal(guessSection({ energy: 0.1, onsetDensity: 0, slope: 0, progress: 0.05 }), "intro");
  assert.equal(energySpike(
    [
      { t: 3, energy: 0.2, bpm: 120, onset: false },
      { t: 3.5, energy: 0.2, bpm: 120, onset: false },
      { t: 4.6, energy: 0.7, bpm: 120, onset: true },
      { t: 4.9, energy: 0.8, bpm: 120, onset: true },
    ],
    5,
  ), true);

  const crowd = summarizeCrowd([{ t: now - 3, score: 0.2 }, { t: now, score: 0.5 }], now);
  assert.equal(crowd.score, 0.5);
  assert.ok(crowd.trend > 0.2);
  const history: CueMemory[] = Array.from({ length: 8 }, (_, i) => ({
    id: `h${i}`,
    at: i,
    scene: "liquid-mirror",
    source: "rules",
    reason: "r",
    crowdBefore: 0.1,
    crowdAfter: null,
  }));
  const input = buildDirectorInput({
    theme: SAMPLE_THEME,
    style: SAMPLE_THEME.style,
    music,
    crowd,
    current: { scene: "liquid-mirror", intensity: 0.4, paletteShift: 0.1, strobe: 0 },
    history,
    now,
  });
  assert.equal(input.history.length, 6);
  assert.equal(input.history[0].id, "h2");
  assert.equal(input.theme.name, SAMPLE_THEME.name);
  assert.equal(input.theme.style.wave, SAMPLE_THEME.style.wave);
  const round = readDirectorInput(JSON.parse(JSON.stringify(input)));
  assert.ok(round);
  assert.equal(round?.music.section, "drop");
  assert.equal(round?.history.length, 6);
  assert.equal(readDirectorInput({ ...input, theme: { ...input.theme, palette: ["red"] } }), null);

  const early = syntheticCrowdScore(0.05);
  assert.equal(early, syntheticCrowdScore(0.05));
  assert.ok(syntheticCrowdScore(0.85) > early);
  assert.ok(syntheticCrowdScore(0) >= 0 && syntheticCrowdScore(2) <= 1);

  assert.equal(askReason({
    sinceSec: 1,
    intervalSec: 12,
    minGapSec: 2.5,
    warmed: true,
    busy: false,
    section: "build",
    previousSection: "build",
    spike: false,
    crowdDelta: 0,
  }), null);
  assert.equal(askReason({
    sinceSec: 3,
    intervalSec: 12,
    minGapSec: 2.5,
    warmed: true,
    busy: false,
    section: "drop",
    previousSection: "build",
    spike: false,
    crowdDelta: 0,
  }), "drop");
  assert.equal(askReason({
    sinceSec: 3,
    intervalSec: 12,
    minGapSec: 2.5,
    warmed: true,
    busy: true,
    section: "drop",
    previousSection: "build",
    spike: true,
    crowdDelta: 0.4,
  }), null);
});

test("cues clamp into safe ranges and reject an unknown scene or wave", () => {
  const scene = AEI_SCENE_IDS[0];
  const cue = clampDirectorCue({
    scene,
    intensity: 2,
    paletteShift: -0.4,
    strobe: 3,
    transition: "sideways",
    duration: 100,
    reason: "  lift  ",
    beat: {
      spinMode: "kick",
      mode: "points",
      wave: "liquid",
      spin: 4,
      relief: -2,
      glitch: 1.4,
      amplitude: 0.8,
      frequency: -1,
      speed: 0.3,
      swap: 150.7,
    },
  }, SAMPLE_THEME.palette);
  assert.ok(cue);
  assert.equal(cue?.intensity, 1);
  assert.equal(cue?.paletteShift, 0);
  assert.equal(cue?.strobe, 1);
  assert.equal(cue?.transition, "bar");
  assert.equal(cue?.duration, 20);
  assert.equal(cue?.reason, "lift");
  assert.equal(cue?.beat.spin, 1);
  assert.equal(cue?.beat.relief, 0);
  assert.equal(cue?.beat.glitch, 1);
  assert.equal(cue?.beat.style.frequency, 0);
  assert.equal(cue?.beat.swap, 99);
  assert.equal(cue?.beat.spinMode, "kick");
  assert.equal(cue?.beat.mode, "points");
  assert.equal(cue?.beat.style.wave, "liquid");

  assert.equal(clampDirectorCue({ scene: "not-a-scene", beat: { spinMode: "kick", mode: "mesh", wave: "sine" } }), null);
  assert.equal(clampDirectorCue({ scene, beat: { spinMode: "kick", mode: "mesh", wave: "jagged" } }), null);
  assert.equal(clampDirectorCue({ scene, beat: { spinMode: "spin", mode: "mesh", wave: "sine" } }), null);
  assert.equal(clampDirectorCue(null), null);

  const drop = mockDirectorCue(buildDirectorInput({
    theme: SAMPLE_THEME,
    style: SAMPLE_THEME.style,
    music: { energy: 0.86, bpm: 130, onsetDensity: 2, slope: 0.2, section: "drop" },
    crowd: { score: 0.7, trend: 0.2 },
    current: { scene: "liquid-mirror", intensity: 0.4, paletteShift: 0, strobe: 0 },
    history: [],
    now: 4,
  }));
  assert.equal(drop.scene, "electric-nexus");
  assert.equal(drop.beat.spinMode, "kick");
  assert.equal(drop.transition, "beat");
  assert.equal(drop.beat.style.wave, SAMPLE_THEME.style.wave);
  assert.match(drop.reason, /drop/);
  const checked = clampDirectorCue(drop, SAMPLE_THEME.palette);
  assert.equal(checked?.scene, "electric-nexus");
  assert.ok(checked && checked.intensity <= 1 && checked.beat.glitch <= 1);
});

test("a provider that exceeds the timeout falls back", async () => {
  const slow = await takeDirectorCue(() => new Promise((resolve) => setTimeout(() => resolve("late"), 250)), 40);
  assert.equal(slow.ok, false);
  assert.ok(slow.latencyMs >= 40);
  assert.ok(slow.latencyMs < 200);
  const fast = await takeDirectorCue(async () => 7, 500);
  assert.equal(fast.ok, true);
  if (fast.ok) assert.equal(fast.value, 7);

  const loop = new DirectorLoop({ intervalSec: 10, minGapSec: 1 });
  loop.setEnabled(true);
  const rules = rulesCue();
  const first = warm(loop, rules);
  assert.ok(first);
  const fallback = loop.complete(first.ask.token, { ok: false, latencyMs: 1500, now: first.at, scene: rules.scene });
  if (!fallback || fallback === "pending") throw new Error("expected a rules fallback");
  assert.equal(fallback.source, "rules");
  assert.equal(fallback.reason, "rules held the picture");
  assert.equal(fallback.latencyMs, 1500);
  const frame = loop.frame(rules, ctx(first.at + 0.1));
  assert.equal(frame.cue.source, "rules");
  assert.equal(frame.cue.scene, rules.scene);
});

test("cues debounce, hold a scene, and can wait for a beat", () => {
  const loop = new DirectorLoop({ intervalSec: 10, minGapSec: 2.5, holdSec: 8, alignGraceSec: 30 });
  loop.setEnabled(true);
  const rules = rulesCue("liquid-mirror");
  const first = warm(loop, rules);
  assert.ok(first);
  assert.equal(first.ask.because, "interval");
  const draft = clampDirectorCue(mockDirectorCue(first.ask.input), SAMPLE_THEME.palette);
  assert.ok(draft);
  draft.scene = "electric-nexus";
  draft.transition = "cut";
  draft.duration = 12;
  assert.equal(loop.complete(first.ask.token, {
    ok: true,
    source: "mock",
    latencyMs: 11,
    draft,
    now: first.at,
    crowdBefore: 0.3,
  }), null);
  const committed = loop.frame(rules, ctx(first.at + 0.05));
  assert.equal(committed.committed?.scene, "electric-nexus");
  assert.equal(committed.cue.scene, "electric-nexus");
  assert.equal(committed.cue.source, "mock");

  const early = loop.frame(rules, ctx(first.at + 2));
  assert.equal(early.ask, null);
  const second = loop.frame(rules, ctx(first.at + 10));
  assert.ok(second.ask);
  const next = clampDirectorCue(mockDirectorCue(second.ask.input), SAMPLE_THEME.palette);
  assert.ok(next);
  next.scene = "liquid-mirror";
  next.transition = "beat";
  next.duration = 8;
  loop.complete(second.ask.token, {
    ok: true,
    source: "mock",
    latencyMs: 9,
    draft: next,
    now: first.at + 10,
    crowdBefore: 0.3,
  });
  const blocked = loop.frame(rules, ctx(first.at + 10.2, { onset: true }));
  assert.equal(blocked.committed, null);
  assert.equal(blocked.cue.scene, "electric-nexus");
  const released = loop.frame(rules, ctx((committed.committed?.at ?? 0) + 12, { onset: true }));
  assert.equal(released.committed?.scene, "liquid-mirror");

  const grace = new DirectorLoop({ intervalSec: 10, minGapSec: 1, holdSec: 1, alignGraceSec: 0.3 });
  grace.setEnabled(true);
  const quiet = rulesCue("beat-image");
  const asked = warm(grace, quiet);
  assert.ok(asked);
  const bar = clampDirectorCue(mockDirectorCue(asked.ask.input), SAMPLE_THEME.palette);
  assert.ok(bar);
  bar.scene = "electric-nexus";
  bar.transition = "bar";
  bar.duration = 6;
  grace.complete(asked.ask.token, { ok: true, source: "live", latencyMs: 6, draft: bar, now: 5, crowdBefore: 0.2 });
  assert.equal(grace.frame(quiet, ctx(5.1)).committed, null);
  const forced = grace.frame(quiet, ctx(5.45));
  assert.equal(forced.committed?.scene, "electric-nexus");
  assert.equal(forced.committed?.source, "live");
});

test("hold look ignores the next cue, and approve waits until the operator acts", () => {
  const loop = new DirectorLoop({ intervalSec: 10, minGapSec: 1, holdSec: 1, alignGraceSec: 0.05 });
  loop.setEnabled(true);
  loop.setGate("approve");
  const rules = rulesCue("beat-image");
  const first = warm(loop, rules);
  assert.ok(first);
  const draft = clampDirectorCue(mockDirectorCue(first.ask.input), SAMPLE_THEME.palette);
  assert.ok(draft);
  draft.transition = "cut";
  draft.scene = "liquid-mirror";
  draft.duration = 6;
  assert.equal(loop.complete(first.ask.token, {
    ok: true,
    source: "mock",
    latencyMs: 4,
    draft,
    now: first.at,
    crowdBefore: 0.2,
  }), "pending");
  assert.equal(loop.frame(rules, ctx(first.at + 0.2)).cue.scene, "beat-image");
  assert.equal(loop.skip(), true);
  assert.equal(loop.pendingCue(), null);
  assert.equal(loop.frame(rules, ctx(first.at + 0.3)).committed, null);

  const again = loop.frame(rules, ctx(first.at + 10));
  assert.ok(again.ask);
  const draft2 = clampDirectorCue(mockDirectorCue(again.ask.input), SAMPLE_THEME.palette);
  assert.ok(draft2);
  draft2.transition = "cut";
  draft2.scene = "electric-nexus";
  draft2.duration = 6;
  assert.equal(loop.complete(again.ask.token, {
    ok: true,
    source: "mock",
    latencyMs: 5,
    draft: draft2,
    now: first.at + 10,
    crowdBefore: 0.2,
  }), "pending");
  assert.equal(loop.approve(first.at + 10.1), true);
  assert.equal(loop.pendingCue(), null);
  const go = loop.frame(rules, ctx(first.at + 10.2));
  assert.equal(go.committed?.scene, "electric-nexus");

  loop.kill(go.cue);
  const held = loop.frame(rules, ctx(first.at + 20, { energy: 0.95 }));
  assert.equal(held.cue.reason, "hold look");
  assert.equal(held.cue.source, "operator");
  assert.equal(held.ask, null);
  assert.equal(held.committed, null);
});

test("a mock loop records the cue and the crowd that follows it", () => {
  const loop = new DirectorLoop({ intervalSec: 10, minGapSec: 1, holdSec: 1, responseWindowSec: 2, alignGraceSec: 0.2 });
  loop.setEnabled(true);
  const rules = rulesCue("beat-image");
  let ask: NonNullable<ReturnType<DirectorLoop["frame"]>["ask"]> | null = null;
  let t = 0;
  for (let i = 0; i < 6 && !ask; i++) {
    const frame = loop.frame(rules, ctx(t, { energy: 0.12, progress: 0.05, crowd: syntheticCrowdScore(0.05) }));
    if (frame.ask) ask = frame.ask;
    t += 0.05;
  }
  assert.ok(ask);
  assert.equal(ask.input.music.section, "intro");
  assert.equal(ask.input.theme.style.wave, SAMPLE_THEME.style.wave);
  assert.equal(ask.input.history.length, 0);
  const draft = clampDirectorCue(mockDirectorCue(ask.input), ask.input.theme.palette);
  assert.ok(draft);
  assert.equal(draft.beat.style.wave, "sine");
  assert.equal(draft.beat.spinMode, "continuous");
  assert.equal(loop.complete(ask.token, {
    ok: true,
    source: "mock",
    latencyMs: 20,
    draft,
    now: t,
    crowdBefore: ask.input.crowd.score,
  }), null);

  let committed: ReturnType<DirectorLoop["frame"]> | null = null;
  for (let i = 0; i < 20 && !committed?.committed; i++) {
    t += 0.05;
    const frame = loop.frame(rules, ctx(t, { onset: true, energy: 0.2, progress: 0.08, crowd: syntheticCrowdScore(0.2) }));
    if (frame.committed) committed = frame;
  }
  assert.ok(committed?.committed);
  assert.equal(committed?.committed?.source, "mock");
  assert.match(committed?.committed?.reason ?? "", /intro/);
  assert.equal(committed?.cue.scene, committed?.committed?.scene);
  const at = committed?.committed?.at ?? 0;
  const later = loop.frame(rules, ctx(at + 2.05, { crowd: 0.62, energy: 0.2, progress: 0.3 }));
  assert.equal(later.response?.scene, committed?.committed?.scene);
  assert.equal(later.response?.crowdAfter, 0.62);
});

test("the director route returns a mock cue and the session keeps the crowd that followed", async () => {
  const previous = process.env.AEI_OUT_DIR;
  const dir = await mkdtemp(path.join(tmpdir(), "aei-loop-"));
  process.env.AEI_OUT_DIR = dir;
  try {
    const input = buildDirectorInput({
      theme: SAMPLE_THEME,
      style: SAMPLE_THEME.style,
      music: { energy: 0.4, bpm: 120, onsetDensity: 0.5, slope: 0.02, section: "build" },
      crowd: { score: 0.33, trend: 0.05 },
      current: { scene: "liquid-mirror", intensity: 0.3, paletteShift: 0, strobe: 0 },
      history: [],
      now: 2,
    });
    const response = await directorPost(new Request("http://local/api/aei/director", {
      method: "POST",
      body: JSON.stringify(input),
    }));
    assert.equal(response.status, 200);
    const data = (await response.json()) as { ok: boolean; source: string; latencyMs: number; cue: { scene: string; intensity: number; reason: string; beat: { spinMode: string } } };
    assert.equal(data.ok, true);
    assert.equal(data.source, "mock");
    assert.equal(typeof data.latencyMs, "number");
    assert.ok(AEI_SCENE_IDS.includes(data.cue.scene));
    assert.ok(data.cue.intensity >= 0 && data.cue.intensity <= 1);
    assert.ok(data.cue.reason.length > 0);
    assert.ok(["continuous", "kick", "bar"].includes(data.cue.beat.spinMode));
    assert.equal(JSON.stringify(data).includes("MODEL_API_KEY"), false);

    const bad = await directorPost(new Request("http://local/api/aei/director", { method: "POST", body: "{" }));
    assert.equal(bad.status, 400);
    const empty = await directorPost(new Request("http://local/api/aei/director", { method: "POST", body: "{}" }));
    assert.equal(empty.status, 400);

    const saved = await sessionPost(new Request("http://local/api/aei/session", {
      method: "POST",
      body: JSON.stringify({
        at: 1.25,
        scene: "liquid-mirror",
        source: "mock",
        intensity: 0.4,
        strobe: 0,
        asset: null,
        reason: data.cue.reason,
        latencyMs: data.latencyMs,
        crowdBefore: 0.2,
      }),
    }));
    assert.equal(saved.status, 200);
    const updated = await sessionPost(new Request("http://local/api/aei/session", {
      method: "POST",
      body: JSON.stringify({ update: true, at: 1.25, scene: "liquid-mirror", crowdAfter: 0.44 }),
    }));
    assert.equal(updated.status, 200);
    const session = await loadSession();
    const row = session.cues.find((cue) => Math.abs(cue.at - 1.25) < 0.001);
    assert.equal(row?.source, "mock");
    assert.equal(row?.crowdBefore, 0.2);
    assert.equal(row?.crowdAfter, 0.44);
    assert.equal(row?.latencyMs, data.latencyMs);
  } finally {
    if (previous === undefined) delete process.env.AEI_OUT_DIR;
    else process.env.AEI_OUT_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});
