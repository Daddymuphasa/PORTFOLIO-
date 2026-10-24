/** Regenerates the geometric fixture images. Not used at runtime. */
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { drawCrowdFrame, drawFlyer } from "../../lib/aei/synthetic";

async function main(): Promise<void> {
  const dir = path.join(process.cwd(), "scripts/aei/fixtures");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "flyer.png"), drawFlyer());
  await writeFile(path.join(dir, "crowd-frame.png"), drawCrowdFrame());
  console.log("wrote scripts/aei/fixtures");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
