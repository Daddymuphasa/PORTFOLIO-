/**
 * Flyer image plus an optional brief -> theme pack JSON.
 * Mock when MODEL_API_KEY is missing. Live uses the TODO seam in lib/aei/apiConfig.ts.
 */
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { outDir } from "../../lib/aei/costLog";
import { providers } from "../../lib/aei/providers";
import { saveTheme, themeDraftToPack } from "../../lib/aei/store";

async function main(): Promise<void> {
  const imagePath = arg("--image", path.join("scripts/aei/fixtures/flyer.png"));
  const briefPath = arg("--brief", path.join("scripts/aei/brief.txt"));
  const image = await readFile(imagePath);
  const brief = await readFile(briefPath, "utf8");
  const result = await providers.theme.generate({ brief, image });
  const file = path.join(outDir(), "theme-pack.json");
  await mkdir(outDir(), { recursive: true });
  await writeFile(file, `${JSON.stringify(result.value, null, 2)}\n`, "utf8");
  await saveTheme(result.value);
  console.log(`${result.mode} theme "${result.value.name}" -> ${file} (${result.latencyMs}ms)`);
  console.log(`stored ${themeDraftToPack(result.value).id}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

function arg(flag: string, fallback: string): string {
  const index = process.argv.indexOf(flag);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}
