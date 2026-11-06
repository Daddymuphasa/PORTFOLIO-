/**
 * Hits theme, segmentation, and image once and prints a pass/fail table.
 * With no usable key, every row should be mock and pass.
 */
import { readFile } from "fs/promises";
import path from "path";
import { buildStatus } from "../../lib/aei/statusReport";
import { providers } from "../../lib/aei/providers";
import { validateCrowdMeter, validatePng, validateThemeDraft } from "../../lib/aei/schema";

type Row = { name: string; mode: string; result: "pass" | "fail"; detail: string };

async function main(): Promise<void> {
  const rows: Row[] = [];

  const theme = await providers.theme.generate({ brief: "warm abstract terrace" });
  rows.push(check("theme", theme.mode, () => validateThemeDraft(theme.value)));

  const frame = await readFile(path.join("scripts/aei/fixtures/crowd-frame.png"));
  const crowd = await providers.segmentation.segment({ image: frame, prompt: "person" });
  rows.push(check("segmentation", crowd.mode, () => {
    validateCrowdMeter(crowd.value);
    validatePng(crowd.overlayPng);
  }));

  const texture = await providers.image.generateTexture(theme.value);
  rows.push(check("image", texture.mode, () => validatePng(texture.value)));

  const status = await buildStatus();
  const secret = process.env.MODEL_API_KEY?.trim();
  const leaked = secret ? JSON.stringify(status).includes(secret) : false;
  rows.push({
    name: "status",
    mode: status.metaConfigured ? "live" : "mock",
    result: status.providers.length === 3 && !leaked ? "pass" : "fail",
    detail: `${status.providers.length} providers`,
  });

  const width = 16;
  console.log(`${"provider".padEnd(width)}${"mode".padEnd(12)}${"result".padEnd(8)}detail`);
  for (const row of rows) {
    console.log(`${row.name.padEnd(width)}${row.mode.padEnd(12)}${row.result.padEnd(8)}${row.detail}`);
  }
  const failed = rows.filter((row) => row.result === "fail").length;
  console.log(`${rows.length - failed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

function check(name: string, mode: string, validate: () => void): Row {
  try {
    validate();
    const keyMissing = !process.env.MODEL_API_KEY?.trim();
    if (keyMissing && mode !== "mock") return { name, mode, result: "fail", detail: "expected mock" };
    return { name, mode, result: "pass", detail: "ok" };
  } catch (error) {
    return { name, mode, result: "fail", detail: error instanceof Error ? error.message : "failed" };
  }
}
