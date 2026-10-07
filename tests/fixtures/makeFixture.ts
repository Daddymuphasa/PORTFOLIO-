/**
 * Deterministic test clip: 7 s of a 60 Hz kick every 0.5 s (120 BPM) over quiet
 * hi-hat noise, then 1.5 s of digital silence. 22.05 kHz mono 16-bit WAV.
 *   npx tsx tests/fixtures/makeFixture.ts   (rewrites kick-120bpm.wav)
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { encodeWavMono16 } from "../../lib/aei/wav";

export const FIXTURE_RATE = 22050;

export function renderKickClip(seconds = 7, silenceTail = 1.5, sr = FIXTURE_RATE): Float32Array {
  const out = new Float32Array(Math.floor((seconds + silenceTail) * sr));
  let seed = 1;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
  for (let i = 0; i < Math.floor(seconds * sr); i++) {
    const t = i / sr;
    const sinceKick = t % 0.5;
    const kick = sinceKick < 0.12 ? Math.sin(2 * Math.PI * 60 * sinceKick) * Math.exp(-sinceKick * 25) : 0;
    out[i] = 0.9 * kick + 0.02 * rnd();
  }
  return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const path = fileURLToPath(new URL("./kick-120bpm.wav", import.meta.url));
  writeFileSync(path, encodeWavMono16(renderKickClip(), FIXTURE_RATE));
  console.log("wrote", path);
}
