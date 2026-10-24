import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import { configReport, keyIsUsable, resolveModelId } from "../lib/aei/config";
import { appendCost, costLogPath } from "../lib/aei/costLog";
import { decodePng } from "../lib/aei/png";
import { RateLimiter } from "../lib/aei/policy";
import { createProviders, type ProviderRuntime } from "../lib/aei/providers";
import { validateThemeDraft } from "../lib/aei/schema";
import { drawTexture } from "../lib/aei/synthetic";
import { buildStatus } from "../lib/aei/statusReport";

const KEY = "abcd-efgh-ijkl-1234";

function runtime(): ProviderRuntime {
  return { stats: new Map(), limiter: new RateLimiter(20, 60_000) };
}

test("config report names states and never the value", () => {
  const report = configReport({
    MODEL_API_KEY: "short",
    MODEL_API_BASE_URL: "notaurl",
    MODEL_ID_MUSE_SPARK: "muse-spark-1.3",
    MODEL_ID_SAM: "bad id",
  });
  assert.equal(report.find((row) => row.name === "MODEL_API_KEY")?.state, "invalid");
  assert.equal(report.find((row) => row.name === "MODEL_API_BASE_URL")?.state, "invalid");
  assert.equal(report.find((row) => row.name === "MODEL_ID_MUSE_SPARK")?.state, "present");
  assert.equal(report.find((row) => row.name === "MODEL_ID_SAM")?.state, "invalid");
  assert.equal(report.find((row) => row.name === "AEI_STORAGE_TOKEN")?.state, "missing");
  assert.equal(report.find((row) => row.name === "AEI_DEPLOY_TOKEN")?.state, "missing");
  const secret = "super-secret-key-99";
  const body = JSON.stringify(configReport({ MODEL_API_KEY: secret }));
  assert.equal(body.includes(secret), false);
  assert.equal(keyIsUsable({ MODEL_API_KEY: secret }), true);
  assert.equal(keyIsUsable({}), false);
  assert.equal(resolveModelId("image", {}), "muse-image-1.0");
  assert.equal(resolveModelId("segmentation", { MODEL_ID_SAM: "sam-custom-1" }), "sam-custom-1");
});

test("mock theme is fixed, and a failed live call falls back without fetch", async () => {
  const previous = process.env.AEI_OUT_DIR;
  const dir = await mkdtemp(path.join(tmpdir(), "aei-mock-"));
  process.env.AEI_OUT_DIR = dir;
  const originalFetch = globalThis.fetch;
  let fetched = false;
  globalThis.fetch = (async () => {
    fetched = true;
    throw new Error("network");
  }) as typeof fetch;
  try {
    const mock = createProviders({ state: runtime(), retries: 0 });
    const theme = await mock.theme.generate({ brief: "warm" });
    assert.equal(theme.mode, "mock");
    assert.equal(theme.value.label, "mock");
    assert.equal(theme.value.name, "Afterglow Terrace");
    assert.equal(theme.value.sceneIds.includes("neon-tunnel"), true);
    validateThemeDraft(theme.value);

    const live = createProviders({
      env: { MODEL_API_KEY: KEY },
      state: runtime(),
      retries: 0,
      timeoutMs: 200,
    });
    const fallen = await live.theme.generate({ brief: "harbor glass" });
    assert.equal(fetched, false);
    assert.equal(fallen.mode, "fallback");
    assert.equal(fallen.value.label, "fallback");
    assert.equal(fallen.value.name, "Harbor Glass");
    assert.match(fallen.error ?? "", /TODO/);
    assert.equal((fallen.error ?? "").includes(KEY), false);
  } finally {
    globalThis.fetch = originalFetch;
    if (previous === undefined) delete process.env.AEI_OUT_DIR;
    else process.env.AEI_OUT_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

test("a live theme call retries once, then accepts a valid draft", async () => {
  const previous = process.env.AEI_OUT_DIR;
  const dir = await mkdtemp(path.join(tmpdir(), "aei-retry-"));
  process.env.AEI_OUT_DIR = dir;
  let attempts = 0;
  try {
    const live = createProviders({
      env: { MODEL_API_KEY: KEY },
      state: runtime(),
      retries: 2,
      backoffMs: 1,
      timeoutMs: 500,
      live: async (capability) => {
        assert.equal(capability, "theme");
        attempts += 1;
        if (attempts < 2) throw new Error("temporarily down");
        return {
          label: "live",
          name: "Live Terrace",
          palette: ["#112233"],
          mood: "test mood",
          intensityCurve: [
            { at: 0, intensity: 0.2 },
            { at: 1, intensity: 0.8 },
          ],
          sceneIds: ["liquid-mirror"],
          motifKeywords: ["test-motif"],
        };
      },
    });
    const result = await live.theme.generate({});
    assert.equal(attempts, 2);
    assert.equal(result.mode, "live");
    assert.equal(result.value.name, "Live Terrace");
  } finally {
    if (previous === undefined) delete process.env.AEI_OUT_DIR;
    else process.env.AEI_OUT_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

test("cost log records mock calls and status hides the key", async () => {
  const previous = process.env.AEI_OUT_DIR;
  const dir = await mkdtemp(path.join(tmpdir(), "aei-cost-"));
  process.env.AEI_OUT_DIR = dir;
  try {
    await appendCost({ model: "muse-spark-1.3", mode: "mock", latencyMs: 4, sessionId: "local" });
    const line = JSON.parse((await readFile(costLogPath(), "utf8")).trim()) as { mode: string; model: string; latencyMs: number };
    assert.equal(line.mode, "mock");
    assert.equal(line.model, "muse-spark-1.3");
    assert.equal(line.latencyMs, 4);
    const status = await buildStatus({});
    assert.equal(status.metaConfigured, false);
    assert.equal(JSON.stringify(status).includes(KEY), false);
    assert.equal(status.providers.length, 3);
  } finally {
    if (previous === undefined) delete process.env.AEI_OUT_DIR;
    else process.env.AEI_OUT_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

test("synthetic textures stamp the mock and round-trip as PNG", () => {
  const theme = {
    label: "mock" as const,
    name: "Afterglow Terrace",
    palette: ["#1B1430", "#F2A65A"],
    mood: "warm",
    intensityCurve: [
      { at: 0, intensity: 0.2 },
      { at: 1, intensity: 0.4 },
    ],
    sceneIds: ["liquid-mirror"],
    motifKeywords: ["lantern"],
  };
  const stamped = decodePng(drawTexture(theme, true));
  const plain = decodePng(drawTexture(theme, false));
  const pixel = (image: { rgba: Uint8Array; width: number }, x: number, y: number) => {
    const i = (y * image.width + x) * 4;
    return [image.rgba[i], image.rgba[i + 1], image.rgba[i + 2]];
  };
  assert.deepEqual(pixel(stamped, 16, 16), [255, 255, 255]);
  assert.notDeepEqual(pixel(plain, 16, 16), [255, 255, 255]);
});
