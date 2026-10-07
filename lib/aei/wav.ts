/**
 * Minimal RIFF/WAVE codec shared by the browser (to package a clip) and the
 * paid AEI gateway (to read it). WAV is the gateway's input format because it
 * decodes byte-for-byte the same everywhere: no codec, no resampling, so the
 * same file always produces the same AEI result.
 *
 * Reads PCM 8/16/24/32-bit integer and 32-bit float, mono or multichannel,
 * including WAVE_FORMAT_EXTENSIBLE. Writes 16-bit PCM.
 */

export type DecodedWav = {
  sampleRate: number;
  channelCount: number;
  /** Interleaved samples in -1..1. */
  samples: Float32Array;
  frames: number;
  durationSeconds: number;
  bitsPerSample: number;
  format: "pcm" | "float";
};

export class WavError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WavError";
  }
}

const FORMAT_PCM = 1;
const FORMAT_FLOAT = 3;
const FORMAT_EXTENSIBLE = 0xfffe;

const tag = (v: DataView, o: number) =>
  String.fromCharCode(v.getUint8(o), v.getUint8(o + 1), v.getUint8(o + 2), v.getUint8(o + 3));

/** True when the bytes start like a RIFF/WAVE file. */
export function looksLikeWav(bytes: Uint8Array): boolean {
  if (bytes.byteLength < 12) return false;
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return tag(v, 0) === "RIFF" && tag(v, 8) === "WAVE";
}

export function decodeWav(bytes: Uint8Array): DecodedWav {
  if (!looksLikeWav(bytes)) throw new WavError("Not a WAV file (expected a RIFF/WAVE header)");
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let fmt: { format: number; channels: number; sampleRate: number; bits: number; blockAlign: number } | null = null;
  let dataOffset = -1;
  let dataLength = 0;

  let o = 12;
  while (o + 8 <= v.byteLength) {
    const id = tag(v, o);
    const size = v.getUint32(o + 4, true);
    const body = o + 8;
    if (id === "fmt ") {
      if (size < 16 || body + 16 > v.byteLength) throw new WavError("Truncated fmt chunk");
      let format = v.getUint16(body, true);
      const channels = v.getUint16(body + 2, true);
      const sampleRate = v.getUint32(body + 4, true);
      const blockAlign = v.getUint16(body + 12, true);
      const bits = v.getUint16(body + 14, true);
      if (format === FORMAT_EXTENSIBLE) {
        if (size < 40 || body + 26 > v.byteLength) throw new WavError("Truncated WAVE_FORMAT_EXTENSIBLE header");
        format = v.getUint16(body + 24, true); // first two bytes of the SubFormat GUID
      }
      fmt = { format, channels, sampleRate, bits, blockAlign };
    } else if (id === "data") {
      dataOffset = body;
      // Streamed WAVs sometimes leave the size at 0 or 0xFFFFFFFF; clamp to what we have.
      dataLength = Math.min(size === 0 ? Infinity : size, v.byteLength - body);
      break;
    }
    o = body + size + (size & 1); // chunks are word aligned
  }

  if (!fmt) throw new WavError("Missing fmt chunk");
  if (dataOffset < 0) throw new WavError("Missing data chunk");
  const { format, channels, sampleRate, bits, blockAlign } = fmt;
  if (format !== FORMAT_PCM && format !== FORMAT_FLOAT) {
    throw new WavError(`Unsupported WAV encoding ${format} (send PCM integer or 32-bit float)`);
  }
  if (channels < 1 || channels > 8) throw new WavError(`Unsupported channel count ${channels}`);
  if (sampleRate < 8000 || sampleRate > 192000) throw new WavError(`Unsupported sample rate ${sampleRate} Hz`);
  const bytesPerSample = bits / 8;
  const validBits = format === FORMAT_FLOAT ? bits === 32 : [8, 16, 24, 32].includes(bits);
  if (!validBits) throw new WavError(`Unsupported bit depth ${bits}`);
  if (blockAlign !== bytesPerSample * channels) throw new WavError("Inconsistent WAV block alignment");

  const frames = Math.floor(dataLength / blockAlign);
  const n = frames * channels;
  const samples = new Float32Array(n);
  let p = dataOffset;
  for (let i = 0; i < n; i++, p += bytesPerSample) {
    let s: number;
    if (format === FORMAT_FLOAT) s = v.getFloat32(p, true);
    else if (bits === 8) s = (v.getUint8(p) - 128) / 128;
    else if (bits === 16) s = v.getInt16(p, true) / 32768;
    else if (bits === 24) {
      const x = v.getUint8(p) | (v.getUint8(p + 1) << 8) | (v.getInt8(p + 2) << 16);
      s = x / 8388608;
    } else s = v.getInt32(p, true) / 2147483648;
    samples[i] = Number.isFinite(s) ? Math.max(-1, Math.min(1, s)) : 0;
  }

  return {
    sampleRate,
    channelCount: channels,
    samples,
    frames,
    durationSeconds: frames / sampleRate,
    bitsPerSample: bits,
    format: format === FORMAT_FLOAT ? "float" : "pcm",
  };
}

/** Encodes mono samples (-1..1) as a 16-bit PCM WAV. */
export function encodeWavMono16(samples: Float32Array, sampleRate: number): Uint8Array<ArrayBuffer> {
  const dataBytes = samples.length * 2;
  const out = new Uint8Array(44 + dataBytes);
  const v = new DataView(out.buffer);
  const put = (o: number, s: string) => {
    for (let i = 0; i < 4; i++) v.setUint8(o + i, s.charCodeAt(i));
  };
  put(0, "RIFF");
  v.setUint32(4, 36 + dataBytes, true);
  put(8, "WAVE");
  put(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, FORMAT_PCM, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  put(36, "data");
  v.setUint32(40, dataBytes, true);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    v.setInt16(44 + i * 2, Math.round(s < 0 ? s * 32768 : s * 32767), true);
  }
  return out;
}

/** Averages interleaved channels into one, as AudioAnalyzer's downmix does. */
export function downmixToMono(channels: Float32Array[]): Float32Array {
  if (channels.length === 1) return channels[0].slice();
  const n = channels[0]?.length ?? 0;
  const out = new Float32Array(n);
  for (const ch of channels) for (let i = 0; i < n; i++) out[i] += ch[i];
  for (let i = 0; i < n; i++) out[i] /= channels.length;
  return out;
}
