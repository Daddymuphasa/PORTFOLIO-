import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeWav, encodeWavMono16, looksLikeWav, WavError } from "../lib/aei/wav";
import { analyzeClip, ClipError } from "../lib/aei/signals";
import { FIXTURE_RATE, renderKickClip } from "./fixtures/makeFixture";

const FIXTURE = new Uint8Array(readFileSync(new URL("./fixtures/kick-120bpm.wav", import.meta.url)));

test("the committed sample WAV is exactly what the fixture generator makes", () => {
  assert.deepEqual(FIXTURE, encodeWavMono16(renderKickClip(), FIXTURE_RATE));
});

test("WAV 16-bit round trip", () => {
  const x = new Float32Array([0, 0.5, -0.5, 1, -1, 0.25]);
  const w = decodeWav(encodeWavMono16(x, 44100));
  assert.equal(w.sampleRate, 44100);
  assert.equal(w.channelCount, 1);
  assert.equal(w.frames, 6);
  x.forEach((v, i) => assert.ok(Math.abs(w.samples[i] - v) < 1 / 32000, `sample ${i}`));
});

function wavHeader(format: number, channels: number, rate: number, bits: number, dataBytes: number) {
  const b = new Uint8Array(44 + dataBytes);
  const v = new DataView(b.buffer);
  const put = (o: number, s: string) => s.split("").forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  put(0, "RIFF");
  v.setUint32(4, 36 + dataBytes, true);
  put(8, "WAVE");
  put(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, format, true);
  v.setUint16(22, channels, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, (rate * channels * bits) / 8, true);
  v.setUint16(32, (channels * bits) / 8, true);
  v.setUint16(34, bits, true);
  put(36, "data");
  v.setUint32(40, dataBytes, true);
  return { b, v };
}

test("reads stereo 24-bit PCM and 32-bit float", () => {
  const { b, v } = wavHeader(1, 2, 48000, 24, 6);
  // L = +0.5, R = -0.5
  v.setUint8(44, 0x00); v.setUint8(45, 0x00); v.setUint8(46, 0x40);
  v.setUint8(47, 0x00); v.setUint8(48, 0x00); v.setUint8(49, 0xc0);
  const s = decodeWav(b);
  assert.equal(s.channelCount, 2);
  assert.deepEqual(Array.from(s.samples), [0.5, -0.5]);

  const f = wavHeader(3, 1, 22050, 32, 8);
  f.v.setFloat32(44, 0.25, true);
  f.v.setFloat32(48, -2, true); // clipped
  assert.deepEqual(Array.from(decodeWav(f.b).samples), [0.25, -1]);
});

test("rejects non-WAV and unsupported WAVs", () => {
  assert.equal(looksLikeWav(new Uint8Array([0x49, 0x44, 0x33])), false);
  assert.throws(() => decodeWav(new Uint8Array(64)), WavError);
  assert.throws(() => decodeWav(wavHeader(2, 1, 44100, 4, 8).b), WavError); // ADPCM
});

test("AEI on the sample clip: ~120 BPM, beats every 0.5 s, trailing silence", () => {
  const r = analyzeClip(decodeWav(FIXTURE));
  assert.equal(r.schema, "aei.signals.v1");
  assert.equal(r.audio.durationSeconds, 8.5);
  assert.ok(Math.abs(r.tempo.bpm - 120) < 3, `bpm=${r.tempo.bpm}`);
  assert.ok(r.tempo.beatCount >= 12 && r.tempo.beatCount <= 16, `beats=${r.tempo.beatCount}`);
  for (let i = 1; i < r.tempo.beats.length; i++) {
    const gap = r.tempo.beats[i] - r.tempo.beats[i - 1];
    assert.ok(Math.abs(gap - 0.5) < 0.05, `beat gap ${gap}`);
  }
  assert.equal(r.silence.segments.length, 1);
  assert.ok(Math.abs(r.silence.segments[0].start - 7) < 0.05);
  assert.ok(r.silence.ratio > 0.15 && r.silence.ratio < 0.2);
  assert.equal(r.spectral.bands.length, 64);
  assert.equal(r.energy.perSecond.length, 9);
  assert.deepEqual(r.signals.timeline.map((s) => s.state), ["Calm", "Silence"]);
  for (const v of [r.energy.mean, r.spectral.bass, r.spectral.mid, r.spectral.treble, r.signals.mood]) assert.ok(v >= 0 && v <= 1);
});

test("AEI is deterministic", () => {
  const a = JSON.stringify(analyzeClip(decodeWav(FIXTURE)));
  const b = JSON.stringify(analyzeClip(decodeWav(FIXTURE)));
  assert.equal(a, b);
});

test("clips shorter than one analysis window are refused", () => {
  assert.throws(() => analyzeClip({ samples: new Float32Array(500), sampleRate: 44100, channelCount: 1 }), ClipError);
});
