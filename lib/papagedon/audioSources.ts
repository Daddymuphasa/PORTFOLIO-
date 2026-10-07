/**
 * Browser equivalents of the three PAPAGEDON-CORE- audio sources
 * (DemoConfig::audioSource in engine/runtime/include/papagedon/runtime/DemoConfig.h):
 *
 *   "file"     -> AudioInput::Load + AudioPlayer (CLI path, config audioFile or
 *                 drag-and-drop onto the window: Runtime.cpp ConsumeDroppedFile)
 *                 Browser: file picker / drag-and-drop, decoded with Web Audio.
 *   "input"    -> AudioCapture::Initialize(device, loopback=false): a capture
 *                 device such as the mic, a DJ mixer or an audio interface.
 *                 Browser: getUserMedia with a chosen input device.
 *   "loopback" -> AudioCapture::Initialize(device, loopback=true): whatever the
 *                 computer is playing. Browser: getDisplayMedia with audio
 *                 (share a tab or the whole screen with "share audio" ticked).
 *
 * Every source feeds one AnalyserNode. Each animation frame reads the latest
 * 1024 samples (AudioCapture::ReadLatest / the playback window) and hands them
 * to AudioAnalyzer with the AudioContext clock as the timestamp, as the engine
 * does with its audio clock.
 */
import { AudioAnalyzer, type AudioFrame } from "./analyzer";
import { downmixToMono as mix } from "../aei/wav";

export type AudioSourceKind = "file" | "input" | "loopback";

export type InputDevice = { deviceId: string; label: string };

export class AudioEngine {
  readonly ctx: AudioContext;
  readonly analyser: AnalyserNode;
  private readonly window = new Float32Array(AudioAnalyzer.fftSize);
  private node: AudioNode | null = null;
  private stream: MediaStream | null = null;
  private fileBuffer: AudioBuffer | null = null;
  private fileNode: AudioBufferSourceNode | null = null;
  private fileOffset = 0;
  private fileStartedAt = 0;
  kind: AudioSourceKind | null = null;
  label = "";
  file: File | null = null;
  playing = false;

  constructor() {
    this.ctx = new AudioContext({ latencyHint: "interactive" });
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = AudioAnalyzer.fftSize;
    this.analyser.smoothingTimeConstant = 0;
  }

  /** Latest analysis window on the audio clock, or null when nothing is live. */
  readFrame(): AudioFrame | null {
    if (!this.kind || (this.kind === "file" && !this.playing)) return null;
    this.analyser.getFloatTimeDomainData(this.window);
    return {
      samples: this.window,
      sampleRate: this.ctx.sampleRate,
      channelCount: 1, // the AnalyserNode down-mixes to mono, as Analyze() does
      timestampSeconds: this.ctx.currentTime,
    };
  }

  private stopCurrent() {
    this.fileNode?.stop();
    this.fileNode?.disconnect();
    this.fileNode = null;
    this.node?.disconnect();
    this.node = null;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.playing = false;
  }

  // ── "file" ──────────────────────────────────────────────────────────────────
  async loadFile(file: File): Promise<void> {
    await this.ctx.resume();
    const buffer = await this.ctx.decodeAudioData(await file.arrayBuffer());
    this.stopCurrent();
    this.fileBuffer = buffer;
    this.file = file;
    this.fileOffset = 0;
    this.kind = "file";
    this.label = file.name;
    this.play();
  }

  play() {
    if (this.kind !== "file" || !this.fileBuffer || this.playing) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.fileBuffer;
    src.loop = true;
    src.connect(this.analyser);
    src.connect(this.ctx.destination); // file mode is monitored, like AudioPlayer
    src.start(0, this.fileOffset % this.fileBuffer.duration);
    this.fileStartedAt = this.ctx.currentTime - this.fileOffset;
    this.fileNode = src;
    this.playing = true;
  }

  pause() {
    if (this.kind !== "file" || !this.playing || !this.fileNode) return;
    this.fileOffset = this.ctx.currentTime - this.fileStartedAt;
    this.fileNode.stop();
    this.fileNode.disconnect();
    this.fileNode = null;
    this.playing = false;
  }

  togglePlayPause() {
    if (this.playing) this.pause();
    else this.play();
  }

  // ── "input" ─────────────────────────────────────────────────────────────────
  static async listInputs(): Promise<InputDevice[]> {
    if (!navigator.mediaDevices?.enumerateDevices) return [];
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices
      .filter((d) => d.kind === "audioinput")
      .map((d, i) => ({ deviceId: d.deviceId, label: d.label || `Input ${i + 1}` }));
  }

  async useInput(deviceId?: string): Promise<void> {
    await this.ctx.resume();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: deviceId ? { exact: deviceId } : undefined,
        // Music, not speech: keep the signal as the booth sends it.
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    this.attachStream(stream, "input");
  }

  // ── "loopback" ──────────────────────────────────────────────────────────────
  async useLoopback(): Promise<void> {
    await this.ctx.resume();
    if (!navigator.mediaDevices?.getDisplayMedia) throw new Error("System audio capture is not supported in this browser.");
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    stream.getVideoTracks().forEach((t) => t.stop());
    if (stream.getAudioTracks().length === 0) {
      throw new Error('No audio was shared. Pick a tab or screen and tick "Share audio".');
    }
    this.attachStream(stream, "loopback");
  }

  private attachStream(stream: MediaStream, kind: "input" | "loopback") {
    this.stopCurrent();
    const src = this.ctx.createMediaStreamSource(stream);
    src.connect(this.analyser); // not monitored, so live input never feeds back
    this.node = src;
    this.stream = stream;
    this.kind = kind;
    this.file = null;
    this.playing = true;
    const track = stream.getAudioTracks()[0];
    this.label = `LIVE - ${track?.label || (kind === "input" ? "input" : "system audio")}`;
    track?.addEventListener("ended", () => {
      if (this.stream === stream) {
        this.stopCurrent();
        this.kind = null;
        this.label = "";
      }
    });
  }

  /** Play position of the loaded file in seconds (0 when no file). */
  filePosition(): number {
    const d = this.fileBuffer?.duration ?? 0;
    if (!d) return 0;
    const p = this.playing ? this.ctx.currentTime - this.fileStartedAt : this.fileOffset;
    return ((p % d) + d) % d;
  }

  /**
   * A mono PCM clip of what PAPAGEDON is hearing, for the paid AEI gateway.
   * File mode: `fileSeconds` of the decoded track from the play position (or
   * the last `fileSeconds` when near the end). Live modes: `liveSeconds`
   * recorded from the source, then decoded. The caller encodes it as WAV, the
   * gateway's input format, so the server analyses exactly these samples.
   */
  async captureClip(fileSeconds: number, liveSeconds: number): Promise<{ samples: Float32Array; sampleRate: number; startSeconds: number }> {
    if (this.kind === "file" && this.fileBuffer) {
      const b = this.fileBuffer;
      const len = Math.min(b.length, Math.round(fileSeconds * b.sampleRate));
      const start = Math.min(Math.round(this.filePosition() * b.sampleRate), b.length - len);
      const channels = Array.from({ length: b.numberOfChannels }, (_, c) => b.getChannelData(c).subarray(start, start + len));
      return { samples: mix(channels), sampleRate: b.sampleRate, startSeconds: start / b.sampleRate };
    }
    const blob = await this.recordClip(liveSeconds);
    const b = await this.ctx.decodeAudioData(await blob.arrayBuffer());
    const channels = Array.from({ length: b.numberOfChannels }, (_, c) => b.getChannelData(c));
    return { samples: mix(channels), sampleRate: b.sampleRate, startSeconds: 0 };
  }

  /**
   * Records `seconds` of the live source (MediaRecorder, so webm/opus or mp4);
   * captureClip() decodes it to PCM before it is sent.
   */
  async recordClip(seconds: number): Promise<Blob> {
    if (!this.stream) throw new Error("No live source to record.");
    const rec = new MediaRecorder(new MediaStream(this.stream.getAudioTracks()));
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const done = new Promise<Blob>((resolve) => {
      rec.onstop = () => resolve(new Blob(chunks, { type: rec.mimeType || "audio/webm" }));
    });
    rec.start();
    setTimeout(() => rec.state !== "inactive" && rec.stop(), seconds * 1000);
    return done;
  }

  async close() {
    this.stopCurrent();
    await this.ctx.close();
  }
}
