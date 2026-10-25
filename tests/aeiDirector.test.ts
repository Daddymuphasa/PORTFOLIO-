import { test } from "node:test";
import assert from "node:assert/strict";
import { AEI_SCENE_IDS } from "../lib/aei/scenes";
import { applyOverride, blendEnergy, cueToRenderParams, RuleDirector } from "../lib/aei/director";
import { MetaDirector, MetaDirectorError, parseMetaCue, readMetaCueRequest } from "../lib/aei/meta";
import { paletteWindow, sampleEnergyArc, SAMPLE_THEME } from "../lib/aei/themes";
import type { DirectorSignals, ThemePack } from "../lib/aei/types";

const theme = SAMPLE_THEME;

function signals(partial: Partial<DirectorSignals> & Pick<DirectorSignals, "now">): DirectorSignals {
  return {
    energy: 0,
    bass: 0,
    mid: 0,
    treble: 0,
    bpm: 0,
    onset: false,
    tension: 0,
    progress: 0,
    ...partial,
  };
}

function settle(director: RuleDirector, partial: Partial<DirectorSignals>, seconds: number, step = 0.1) {
  let cue = director.update(signals({ ...partial, now: 0 }), theme);
  for (let t = step; t <= seconds + 1e-9; t += step) {
    cue = director.update(signals({ ...partial, now: Number(t.toFixed(3)) }), theme);
  }
  return cue;
}

test("a quiet room stays on the opening scene", () => {
  const cue = settle(new RuleDirector(), { energy: 0, progress: 0 }, 8);
  assert.equal(cue.scene, AEI_SCENE_IDS[0]);
  assert.equal(cue.source, "rules");
  assert.equal(cue.asset, theme.motifs[0]);
  assert.ok(cue.strobe < 0.05);
  assert.ok(cue.intensity >= 0 && cue.intensity <= 1);
  assert.ok(cue.paletteShift >= 0 && cue.paletteShift <= 1);
  assert.match(cue.reason, new RegExp(AEI_SCENE_IDS[0]));
});

test("the hold blocks a scene change, then a peak lands on the last scene", () => {
  const held = settle(new RuleDirector({ holdSeconds: 8 }), { energy: 1, bass: 1, progress: 0.8 }, 3);
  assert.equal(held.scene, AEI_SCENE_IDS[0]);

  const peaked = settle(new RuleDirector({ holdSeconds: 1 }), { energy: 1, bass: 1, progress: 0.8 }, 6);
  assert.equal(peaked.scene, AEI_SCENE_IDS[AEI_SCENE_IDS.length - 1]);
  const quiet = settle(new RuleDirector(), { energy: 0, progress: 0 }, 2);
  assert.ok(peaked.intensity > quiet.intensity);
});

test("the theme arc pulls a silent room forward along the night", () => {
  const opening = settle(new RuleDirector({ holdSeconds: 1 }), { energy: 0, progress: 0 }, 5);
  const late = settle(new RuleDirector({ holdSeconds: 1 }), { energy: 0, progress: 0.8 }, 5);
  assert.ok(AEI_SCENE_IDS.indexOf(late.scene) > AEI_SCENE_IDS.indexOf(opening.scene));
});

test("onsets strobe only once the blend is hot, and the same inputs repeat", () => {
  const quiet = new RuleDirector().update(signals({ energy: 0.15, bass: 0.2, onset: true, now: 1 }), theme);
  assert.ok(quiet.strobe < 0.05, `quiet strobe ${quiet.strobe}`);

  const hit = new RuleDirector().update(
    signals({ energy: 1, bass: 1, onset: true, progress: 0.8, now: 1 }),
    theme,
  );
  assert.ok(hit.strobe > 0.5, `hit strobe ${hit.strobe}`);

  const replay = (director: RuleDirector) => {
    const frames = [0, 0.5, 1, 1.5].map((now, i) =>
      director.update(signals({ energy: 0.4 + i * 0.1, bass: 0.3, onset: i === 2, progress: 0.2, now }), theme),
    );
    return JSON.stringify(frames);
  };
  assert.equal(replay(new RuleDirector()), replay(new RuleDirector()));
});

test("manual override replaces the cue and a disabled lock does not", () => {
  const cue = new RuleDirector().update(signals({ energy: 0.4, now: 2 }), theme);
  const locked = applyOverride(cue, {
    enabled: true,
    scene: "neon-tunnel",
    intensity: 0.2,
    strobe: 0.9,
    paletteShift: 0.5,
  });
  assert.equal(locked.source, "operator");
  assert.equal(locked.scene, "neon-tunnel");
  assert.equal(locked.intensity, 0.2);
  assert.equal(locked.strobe, 0.9);
  assert.equal(locked.reason, "operator override");
  assert.equal(applyOverride(cue, { enabled: false, scene: "neon-tunnel", intensity: 1, strobe: 1, paletteShift: 1 }), cue);
});

test("render params take a 3-colour window from the theme", () => {
  assert.deepEqual(paletteWindow(["#112233", "#445566", "#778899", "#aabbcc"], 0), ["#112233", "#445566", "#778899"]);
  assert.deepEqual(paletteWindow(["#112233", "#445566", "#778899", "#aabbcc"], 0.99), ["#aabbcc", "#112233", "#445566"]);
  assert.equal(paletteWindow(["not-a-color"], 0)[0], "#1B1430");
  const cue = new RuleDirector().update(signals({ now: 0 }), theme);
  const params = cueToRenderParams(cue, theme);
  assert.equal(params.sceneId, cue.scene);
  assert.equal(params.palette.length, 3);
  for (const color of params.palette) assert.match(color, /^#[0-9a-fA-F]{6}$/);
  assert.ok(sampleEnergyArc(theme.energyArc, 0.8) > sampleEnergyArc(theme.energyArc, 0));
  assert.ok(blendEnergy(1, 1) === 1);
  assert.ok(blendEnergy(-1, 2) === 0.35);
});

test("meta provider stays closed without a key and parses a draft when transported", async () => {
  let called = false;
  const closed = new MetaDirector({ MODEL_API_KEY: "  " }, async () => {
    called = true;
    return {};
  });
  const request = { theme, signals: signals({ energy: 0.5, now: 3 }) };
  await assert.rejects(() => closed.decide(request), MetaDirectorError);
  assert.equal(called, false);

  await assert.rejects(() => new MetaDirector({ MODEL_API_KEY: "test-key" }).decide(request), /not wired/);

  const open = new MetaDirector({ MODEL_API_KEY: "test-key" }, async (input, apiKey) => {
    assert.equal(apiKey, "test-key");
    assert.equal(input.theme.id, theme.id);
    assert.ok(input.scenes.includes("neon-tunnel"));
    return { scene: "neon-tunnel", paletteShift: 1.4, intensity: 0.4, strobe: 0, asset: "fog-lamp", reason: "bridge" };
  });
  const cue = await open.decide(request);
  assert.equal(cue.source, "meta");
  assert.equal(cue.scene, "neon-tunnel");
  assert.equal(cue.paletteShift, 1);
  assert.equal(cue.asset, "fog-lamp");
  assert.equal(cue.reason, "bridge");

  assert.throws(() => parseMetaCue({ scene: "not-a-scene", paletteShift: 0, intensity: 0, strobe: 0 }, 0), MetaDirectorError);
  assert.equal(readMetaCueRequest({ themeId: theme.id, signals: signals({ now: 1 }) })?.themeId, theme.id);
  assert.equal(readMetaCueRequest({ themeId: "", signals: signals({ now: 1 }) }), null);
});

test("an empty motif list yields a null asset", () => {
  const bare: ThemePack = { ...theme, motifs: [] };
  const cue = new RuleDirector().update(signals({ now: 0 }), bare);
  assert.equal(cue.asset, null);
});
