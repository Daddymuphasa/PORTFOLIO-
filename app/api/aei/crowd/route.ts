import { readFile } from "fs/promises";
import path from "path";
import { providers } from "@/lib/aei/providers";
import { saveCrowd } from "@/lib/aei/store";

export const dynamic = "force-dynamic";

/** Crowd meter for the bundled synthetic frame. No photograph is read. */
export async function GET() {
  const image = await readFile(path.join(process.cwd(), "scripts/aei/fixtures/crowd-frame.png"));
  const result = await providers.segmentation.segment({ image, prompt: "person" });
  const meter = result.value;
  await saveCrowd(meter);
  return Response.json({ ...meter, mode: result.mode, latencyMs: result.latencyMs });
}
