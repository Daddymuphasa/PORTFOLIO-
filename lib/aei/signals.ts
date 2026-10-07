/**
 * Offline AEI analysis of a whole clip, used by the paid gateway.
 *
 * It drives the exact AudioAnalyzer and ExperienceGraph that the web app runs
 * every frame (lib/papagedon/*, ports of PAPAGEDON-CORE- commit 4551dc4), with
 * no changes: 1024-sample windows stepped at 60 per second of audio, the same
 * cadence as the app's render loop, timestamps on the audio clock. The
 * per-window signals are then summarised. Everything is plain arithmetic on
 * the decoded samples, so the same WAV always gives the same JSON.
 */
import { AudioAnalyzer, kSpectrumBandCount } from "../papagedon/analyzer";
import { ExperienceGraph, type ExperienceEvent, type ExperienceState } from "../papagedon/experienceGraph";

export const AEI_SCHEMA = "aei.signals.v1";
export const AEI_ENGINE = {
  name: "PAPAGEDON AEI",
  schema: AEI_SCHEMA,
  core: "PAPAGEDON-CORE- 4551dc4 (AudioAnalyzer, ExperienceGraph)",
  analysisRate: 60,
  windowSize: AudioAnalyzer.fftSize,
} as const;

/** RMS below this (dBFS) counts as silence. */
export const SILENCE_DBFS = -50;
/** Silent stretches shorter than this are not reported as segments. */
const MIN_SILENCE_SECONDS = 0.25;
/** State changes shorter than this are folded into the surrounding state. */
const MIN_STATE_SECONDS = 0.25;
const MAX_BEATS_LISTED = 1024;

export type ClipInput = {
  /** Interleaved samples in -1..1. */
  samples: Float32Array;
  sampleRate: number;
  channelCount: number;
};

export type Segment = { start: number; end: number };
export type StateSegment = Segment & { state: ExperienceState };

export type AeiResult = {
  schema: typeof AEI_SCHEMA;
  engine: typeof AEI_ENGINE;
  audio: { durationSeconds: number; sampleRate: number; channels: number; windows: number };
  tempo: { bpm: number; beatCount: number; beats: number[]; beatsTruncated: boolean };
  energy: { mean: number; peak: number; loudnessDbfs: number; peakDbfs: number; perSecond: number[] };
  silence: { ratio: number; thresholdDbfs: number; segments: Segment[] };
  spectral: {
    bass: number;
    mid: number;
    treble: number;
    intensity: number;
    centroidHz: number;
    bands: number[];
  };
  signals: {
    dominantState: ExperienceState;
    mood: number;
    tension: number;
    eventCounts: Record<ExperienceEvent, number>;
    drops: number[];
    buildUps: number[];
    timeline: StateSegment[];
  };
};

export class ClipError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClipError";
  }
}

const round = (v: number, dp = 4) => {
  const f = 10 ** dp;
  const r = Math.round(v * f) / f;
  return Object.is(r, -0) ? 0 : r;
};
const dbfs = (rms: number) => (rms > 1e-10 ? 20 * Math.log10(rms) : -200);

export function analyzeClip(clip: ClipInput): AeiResult {
  const { samples, sampleRate, channelCount } = clip;
  const window = AudioAnalyzer.fftSize;
  const frames = Math.floor(samples.length / channelCount);
  if (frames < window) throw new ClipError(`Clip too short: need at least ${window} samples per channel`);

  const analyzer = new AudioAnalyzer();
  const graph = new ExperienceGraph();
  const hop = Math.max(1, Math.round(sampleRate / AEI_ENGINE.analysisRate));

  const beats: number[] = [];
  const drops: number[] = [];
  const buildUps: number[] = [];
  const eventCounts: Record<ExperienceEvent, number> = { Beat: 0, BuildUp: 0, Drop: 0, Calm: 0, Silence: 0 };
  const stateTime: Record<ExperienceState, number> = { Calm: 0, BuildUp: 0, Drop: 0, Silence: 0, Ambient: 0 };
  const bands = new Float64Array(kSpectrumBandCount);
  const perSecondSum: number[] = [];
  const perSecondN: number[] = [];
  let sum = { energy: 0, bass: 0, mid: 0, treble: 0, intensity: 0, mood: 0, tension: 0, sq: 0 };
  let peakEnergy = 0;
  let peakAbs = 0;
  let windows = 0;
  let silentWindows = 0;
  let prevEvent: ExperienceEvent | null = null;
  let lastBpm = 0;

  const rawStates: StateSegment[] = [];
  const silence: Segment[] = [];
  let silenceStart = -1;
  const hopSeconds = hop / sampleRate;

  for (let end = window; end <= frames; end += hop) {
    const start = end - window;
    const t = end / sampleRate;
    const view = samples.subarray(start * channelCount, end * channelCount);
    const s = analyzer.update({ samples: view, sampleRate, channelCount, timestampSeconds: t });
    const g = graph.update(s);
    windows++;

    // Absolute level of the newest hop (the part this step adds to the clip).
    let sq = 0;
    const from = Math.max(start, end - hop);
    for (let f = from; f < end; f++) {
      let m = 0;
      for (let c = 0; c < channelCount; c++) m += samples[f * channelCount + c];
      m /= channelCount;
      sq += m * m;
      peakAbs = Math.max(peakAbs, Math.abs(m));
    }
    const rms = Math.sqrt(sq / (end - from));
    sum.sq += sq / (end - from);
    const silent = dbfs(rms) < SILENCE_DBFS;
    if (silent) {
      silentWindows++;
      if (silenceStart < 0) silenceStart = t - hopSeconds;
    } else if (silenceStart >= 0) {
      if (t - hopSeconds - silenceStart >= MIN_SILENCE_SECONDS) silence.push({ start: silenceStart, end: t - hopSeconds });
      silenceStart = -1;
    }

    if (s.beat) {
      eventCounts.Beat++;
      if (beats.length < MAX_BEATS_LISTED) beats.push(t);
    }
    if (g.event !== "Beat") eventCounts[g.event]++;
    if (g.event === "Drop" && prevEvent !== "Drop") drops.push(t);
    if (g.event === "BuildUp" && prevEvent !== "BuildUp") buildUps.push(t);
    prevEvent = g.event;
    stateTime[g.state] += hopSeconds;
    const last = rawStates[rawStates.length - 1];
    if (last && last.state === g.state) last.end = t;
    else rawStates.push({ state: g.state, start: last ? last.end : 0, end: t });

    sum.energy += s.energy;
    sum.bass += s.bass;
    sum.mid += s.mid;
    sum.treble += s.treble;
    sum.intensity += s.intensity;
    sum.mood += g.mood;
    sum.tension += s.tension;
    peakEnergy = Math.max(peakEnergy, s.energy);
    for (let i = 0; i < kSpectrumBandCount; i++) bands[i] += s.spectrum[i];
    const sec = Math.floor(t - 1e-9);
    perSecondSum[sec] = (perSecondSum[sec] ?? 0) + s.energy;
    perSecondN[sec] = (perSecondN[sec] ?? 0) + 1;
    lastBpm = s.bpm;
  }
  const duration = frames / sampleRate;
  if (silenceStart >= 0 && duration - silenceStart >= MIN_SILENCE_SECONDS) silence.push({ start: silenceStart, end: duration });

  const mean = (v: number) => v / windows;
  const meanBands = Array.from(bands, (b) => b / windows);
  const bandTotal = meanBands.reduce((a, b) => a + b, 0);
  const nyquist = sampleRate / 2;
  const centroid =
    bandTotal > 0 ? meanBands.reduce((acc, b, i) => acc + b * ((i + 0.5) / kSpectrumBandCount) * nyquist, 0) / bandTotal : 0;

  const dominantState = (Object.keys(stateTime) as ExperienceState[]).reduce((a, b) => (stateTime[b] > stateTime[a] ? b : a), "Calm");

  return {
    schema: AEI_SCHEMA,
    engine: AEI_ENGINE,
    audio: { durationSeconds: round(duration, 3), sampleRate, channels: channelCount, windows },
    tempo: {
      bpm: round(lastBpm, 1),
      beatCount: eventCounts.Beat,
      beats: beats.map((b) => round(b, 3)),
      beatsTruncated: eventCounts.Beat > beats.length,
    },
    energy: {
      mean: round(mean(sum.energy)),
      peak: round(peakEnergy),
      loudnessDbfs: round(dbfs(Math.sqrt(sum.sq / windows)), 2),
      peakDbfs: round(dbfs(peakAbs), 2),
      perSecond: Array.from(perSecondSum, (v, i) => round((v ?? 0) / (perSecondN[i] || 1), 3)),
    },
    silence: {
      ratio: round(silentWindows / windows),
      thresholdDbfs: SILENCE_DBFS,
      segments: silence.map((s) => ({ start: round(s.start, 3), end: round(s.end, 3) })),
    },
    spectral: {
      bass: round(mean(sum.bass)),
      mid: round(mean(sum.mid)),
      treble: round(mean(sum.treble)),
      intensity: round(mean(sum.intensity)),
      centroidHz: round(centroid, 1),
      bands: meanBands.map((b) => round(b, 3)),
    },
    signals: {
      dominantState,
      mood: round(mean(sum.mood)),
      tension: round(mean(sum.tension)),
      eventCounts,
      drops: drops.map((d) => round(d, 3)),
      buildUps: buildUps.map((b) => round(b, 3)),
      timeline: smoothStates(rawStates).map((s) => ({ state: s.state, start: round(s.start, 3), end: round(s.end, 3) })),
    },
  };
}

/** Folds state blips shorter than MIN_STATE_SECONDS into the previous state, then merges neighbours. */
function smoothStates(segments: StateSegment[]): StateSegment[] {
  const out: StateSegment[] = [];
  for (const seg of segments) {
    const prev = out[out.length - 1];
    if (prev && (seg.end - seg.start < MIN_STATE_SECONDS || prev.state === seg.state)) {
      prev.end = seg.end;
    } else {
      out.push({ ...seg });
    }
  }
  // A short opening blip has no previous state: fold it into the next one.
  if (out.length > 1 && out[0].end - out[0].start < MIN_STATE_SECONDS) {
    out[1].start = out[0].start;
    out.shift();
  }
  return out;
}
