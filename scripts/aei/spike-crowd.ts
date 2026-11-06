/**
 * One synthetic frame -> person count, coverage, and a 0-100 density score.
 * Prompt sent to the segmentation adapter: "person".
 */
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { outDir } from "../../lib/aei/costLog";
import { providers } from "../../lib/aei/providers";
import { saveCrowd } from "../../lib/aei/store";

async function main(): Promise<void> {
  const imagePath = arg("--image", path.join("scripts/aei/fixtures/crowd-frame.png"));
  const image = await readFile(imagePath);
  const result = await providers.segmentation.segment({ image, prompt: "person" });
  await mkdir(outDir(), { recursive: true });
  const jsonPath = path.join(outDir(), "crowd.json");
  const overlayPath = path.join(outDir(), "crowd-overlay.png");
  await writeFile(jsonPath, `${JSON.stringify({ ...result.value, mode: result.mode, latencyMs: result.latencyMs }, null, 2)}\n`);
  if (result.overlayPng) await writeFile(overlayPath, result.overlayPng);
  await saveCrowd(result.value);
  console.log(
    `${result.mode} crowd count=${result.value.personCount} coverage=${result.value.coveragePercent} density=${result.value.densityScore} -> ${jsonPath}`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

function arg(flag: string, fallback: string): string {
  const index = process.argv.indexOf(flag);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}
