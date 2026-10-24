/**
 * Theme pack JSON -> one texture PNG for the renderer.
 */
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { outDir } from "../../lib/aei/costLog";
import { providers } from "../../lib/aei/providers";
import { validateThemeDraft } from "../../lib/aei/schema";

async function main(): Promise<void> {
  const themePath = arg("--theme", path.join(outDir(), "theme-pack.json"));
  let raw: unknown;
  try {
    raw = JSON.parse(await readFile(themePath, "utf8"));
  } catch {
    raw = null;
  }
  const theme = raw ? validateThemeDraft(raw) : (await providers.theme.generate({})).value;
  const result = await providers.image.generateTexture(theme);
  const file = path.join(outDir(), "texture.png");
  await mkdir(outDir(), { recursive: true });
  await writeFile(file, result.value);
  console.log(`${result.mode} texture ${result.value.length} bytes -> ${file} (${result.latencyMs}ms)`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

function arg(flag: string, fallback: string): string {
  const index = process.argv.indexOf(flag);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}
