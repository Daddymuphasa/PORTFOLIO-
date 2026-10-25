/**
 * Beat Image. A subdivided plane and a point cloud, both displaced by depth
 * and by a smooth wave. The wave numbers come from the flyer style on the cue.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DataTexture,
  Group,
  LinearFilter,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  RGBAFormat,
  RedFormat,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  UnsignedByteType,
  WebGLRenderer,
} from "three";
import {
  meshSegments,
  pointBudget,
  shouldAdvanceImage,
  stepClock,
  stepDistort,
  stepHighOnset,
  stepSpin,
  type ClockState,
  type DistortState,
  type HighOnsetState,
  type SpinState,
} from "@/lib/aei/beatLook";
import { luminanceOf, samplePoints } from "@/lib/aei/depth";
import { BLEND_KIND, DEFAULT_STYLE, stepSuaveWave, WAVE_KIND, type WaveMotion } from "@/lib/aei/flyer";
import type { BeatLook } from "@/lib/aei/types";

export type BeatPicture = {
  id: string;
  name: string;
  size: number;
  rgba: Uint8Array;
  depth: Float32Array;
  kind: "brightness" | "model";
};

export type BeatFrame = {
  dt: number;
  time: number;
  bpm: number;
  bass: number;
  mid: number;
  treble: number;
  onset: boolean;
  tap: boolean;
  look: BeatLook;
  lowEnd: boolean;
  pointer: { x: number; y: number };
};

const BARS_BETWEEN_PICTURES = 8;

const WAVE_GLSL = `
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
vec2 waveOffset(vec2 uv, float phase, float freq, float kind) {
  float f = mix(1.15, 6.2, clamp(freq, 0.0, 1.0));
  float s = sin((uv.y * f + phase) * 6.2831853);
  float s2 = sin((uv.x * f * 0.58 - phase * 0.62) * 6.2831853);
  vec2 sineOff = vec2(s2, s);
  vec2 from = uv - 0.5;
  float rip = sin(length(from) * f * 3.05 - phase * 3.2);
  vec2 ripOff = from * (rip / max(0.12, length(from)));
  float flowA = noise(uv * f * 0.52 + vec2(phase * 0.11, phase * 0.04)) - 0.5;
  float flowB = noise(uv.yx * f * 0.46 + vec2(-phase * 0.06, phase * 0.09)) - 0.5;
  vec2 liquidOff = vec2(flowA, flowB) * 1.25 + vec2(s, s2) * 0.28;
  float g1 = sin((uv.y * f * 1.7 + phase * 1.05) * 6.2831853);
  float g2 = sin((uv.x * f * 1.15 - phase * 0.84) * 6.2831853);
  vec2 glitchOff = vec2(g1, g2);
  float k = clamp(kind, 0.0, 3.0);
  vec2 off = sineOff;
  if (k >= 2.5) off = glitchOff;
  else if (k >= 1.5) off = liquidOff;
  else if (k >= 0.5) off = ripOff;
  return off;
}
`;

const MESH_VERT = `
uniform sampler2D uDepth;
uniform float uRelief;
uniform float uBreath;
uniform float uPunch;
uniform float uWave;
uniform float uWarp;
uniform float uExplode;
uniform float uAmp;
uniform float uFreq;
uniform float uPhase;
uniform float uFront;
uniform float uWaveKind;
uniform vec2 uPointer;
varying vec2 vUv;
${WAVE_GLSL}
void main() {
  vUv = uv;
  vec2 suv = vec2(uv.x, 1.0 - uv.y);
  float d = texture2D(uDepth, suv).r;
  vec2 off = waveOffset(suv, uPhase, uFreq, uWaveKind);
  float drift = noise(suv * 2.2 + uPhase * 0.04) - 0.5;
  vec2 fromPointer = suv - uPointer;
  float bulge = exp(-dot(fromPointer, fromPointer) * 14.0);
  float ridge = exp(-pow((suv.x - uFront) * 4.4, 2.0));
  vec3 pos = position;
  pos.xy += off * uAmp;
  pos.xy += drift * uWarp * 0.035;
  pos.z += d * uRelief * (1.0 + uBreath);
  pos.z += off.y * uAmp * 0.85;
  pos.z += bulge * 0.16 * uRelief;
  pos.z += ridge * uAmp * (2.6 + uWave);
  pos.z += uPunch * d * 0.28;
  vec3 scatter = vec3(drift, hash(suv + 3.0) - 0.5, d - 0.5);
  pos += scatter * uExplode * 1.6;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const MESH_FRAG = `
uniform sampler2D uPhoto;
uniform float uGlitch;
uniform float uAmp;
uniform float uFreq;
uniform float uPhase;
uniform float uWaveKind;
uniform float uBlend;
uniform vec3 uTintA;
uniform vec3 uTintB;
varying vec2 vUv;
${WAVE_GLSL}
void main() {
  vec2 suv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 off = waveOffset(suv, uPhase, uFreq, uWaveKind) * uAmp * 0.62;
  float split = 0.0035 + uGlitch * 0.016 + step(2.5, uWaveKind) * 0.007;
  vec2 warped = suv + off;
  vec3 photo = vec3(
    texture2D(uPhoto, warped + vec2(split, 0.0)).r,
    texture2D(uPhoto, warped).g,
    texture2D(uPhoto, warped - vec2(split, split * 0.35)).b
  );
  float edge = clamp(length(off) * 18.0, 0.0, 1.0);
  vec3 tinted = mix(photo, photo * mix(vec3(1.0), uTintA, 0.72) + uTintB * edge * 0.55, 0.28 + edge * 0.45);
  vec3 soft = tinted;
  vec3 added = tinted + uTintB * (0.08 + edge * 0.16);
  vec3 screened = 1.0 - (1.0 - tinted) * (1.0 - uTintA * 0.26);
  vec3 color = soft;
  if (uBlend >= 1.5) color = screened;
  else if (uBlend >= 0.5) color = added;
  gl_FragColor = vec4(color, 1.0);
}
`;

const POINT_VERT = `
attribute float aSeed;
attribute vec3 color;
uniform float uRelief;
uniform float uBreath;
uniform float uPunch;
uniform float uWave;
uniform float uWarp;
uniform float uExplode;
uniform float uAmp;
uniform float uFreq;
uniform float uPhase;
uniform float uFront;
uniform float uWaveKind;
uniform float uSize;
uniform vec2 uPointer;
uniform vec3 uTintA;
uniform vec3 uTintB;
varying vec3 vColor;
${WAVE_GLSL}
void main() {
  vec3 pos = position;
  float d = clamp(pos.z + 0.5, 0.0, 1.0);
  vec2 suv = vec2(pos.x + 0.5, 0.5 - pos.y);
  vec2 off = waveOffset(suv, uPhase, uFreq, uWaveKind);
  float drift = noise(suv * 2.2 + uPhase * 0.04) - 0.5;
  vec2 fromPointer = suv - uPointer;
  float bulge = exp(-dot(fromPointer, fromPointer) * 14.0);
  float ridge = exp(-pow((suv.x - uFront) * 4.4, 2.0));
  pos.xy += off * uAmp;
  pos.xy += drift * uWarp * 0.03;
  pos.z = (d - 0.5) * uRelief * (1.0 + uBreath);
  pos.z += off.y * uAmp * 0.7;
  pos.z += bulge * 0.16 * uRelief;
  pos.z += ridge * uAmp * (2.2 + uWave);
  pos.z += uPunch * d * 0.24;
  vec3 dir = vec3(fract(aSeed * 12.9) - 0.5, fract(aSeed * 4.7) - 0.5, fract(aSeed * 9.1) - 0.5);
  pos += dir * uExplode * (0.7 + fract(aSeed * 3.1));
  float edge = clamp(length(off) * 1.4, 0.0, 1.0);
  vColor = mix(color, color * mix(vec3(1.0), uTintA, 0.65) + uTintB * 0.12, 0.3 + edge * 0.25);
  vec4 view = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * view;
  gl_PointSize = uSize * (1.15 + d) * (170.0 / max(1.0, -view.z));
}
`;

const POINT_FRAG = `
varying vec3 vColor;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float disk = dot(p, p);
  if (disk > 1.0) discard;
  gl_FragColor = vec4(vColor * exp(-disk * 2.1), 1.0);
}
`;

type Uniforms = {
  uDepth: { value: DataTexture | null };
  uPhoto: { value: DataTexture | null };
  uRelief: { value: number };
  uBreath: { value: number };
  uPunch: { value: number };
  uWave: { value: number };
  uWarp: { value: number };
  uGlitch: { value: number };
  uExplode: { value: number };
  uTime: { value: number };
  uSize: { value: number };
  uPointer: { value: { x: number; y: number } };
  uAmp: { value: number };
  uFreq: { value: number };
  uPhase: { value: number };
  uFront: { value: number };
  uWaveKind: { value: number };
  uBlend: { value: number };
  uTintA: { value: { x: number; y: number; z: number } };
  uTintB: { value: { x: number; y: number; z: number } };
};

function tintOf(hex: string | undefined, fallback: { x: number; y: number; z: number }) {
  if (!hex || !/^#[0-9a-fA-F]{6}$/.test(hex)) return fallback;
  const value = Number.parseInt(hex.slice(1), 16);
  return { x: ((value >> 16) & 255) / 255, y: ((value >> 8) & 255) / 255, z: (value & 255) / 255 };
}

type Built = {
  key: string;
  color: DataTexture;
  depth: DataTexture;
  geometry: BufferGeometry | null;
};

function colorTexture(rgba: Uint8Array, size: number): DataTexture {
  const tex = new DataTexture(rgba, size, size, RGBAFormat, UnsignedByteType);
  tex.colorSpace = SRGBColorSpace;
  tex.magFilter = LinearFilter;
  tex.minFilter = LinearFilter;
  tex.flipY = false;
  tex.needsUpdate = true;
  return tex;
}

function depthTexture(depth: Float32Array, size: number): DataTexture {
  const bytes = new Uint8Array(depth.length);
  for (let i = 0; i < depth.length; i++) {
    const value = depth[i] ?? 0;
    bytes[i] = Math.round(Math.min(1, Math.max(0, value)) * 255);
  }
  const tex = new DataTexture(bytes, size, size, RedFormat, UnsignedByteType);
  tex.magFilter = LinearFilter;
  tex.minFilter = LinearFilter;
  tex.flipY = false;
  tex.needsUpdate = true;
  return tex;
}

export type BeatScene = {
  setPictures: (pictures: readonly BeatPicture[]) => void;
  frame: (frame: BeatFrame) => void;
  dispose: () => void;
};

export function createBeatScene(canvas: HTMLCanvasElement): BeatScene {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
  renderer.setClearColor(0x05070a, 1);
  renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 20);
  camera.position.z = 2.9;
  const group = new Group();
  group.rotation.x = -0.2;
  scene.add(group);

  const uniforms: Uniforms = {
    uDepth: { value: null },
    uPhoto: { value: null },
    uRelief: { value: 0.4 },
    uBreath: { value: 0 },
    uPunch: { value: 0 },
    uWave: { value: 0 },
    uWarp: { value: 0 },
    uGlitch: { value: 0 },
    uExplode: { value: 0 },
    uTime: { value: 0 },
    uSize: { value: 2.2 },
    uPointer: { value: { x: 0.5, y: 0.5 } },
    uAmp: { value: 0.04 },
    uFreq: { value: 0.28 },
    uPhase: { value: 0 },
    uFront: { value: 1.35 },
    uWaveKind: { value: 0 },
    uBlend: { value: 0 },
    uTintA: { value: { x: 0.95, y: 0.65, z: 0.35 } },
    uTintB: { value: { x: 0.91, y: 0.36, z: 0.46 } },
  };

  let mesh: Mesh | null = null;
  let points: Points | null = null;
  let meshSeg = 0;
  const built = new Map<string, Built>();
  let pictures: readonly BeatPicture[] = [];
  let index = 0;
  let countUsed = 0;
  let spin: SpinState = { angle: 0, impulse: 0 };
  let distort: DistortState = { punch: 0, wave: 0, glitch: 0 };
  let clock: ClockState = { beats: 0, sinceBeat: 0 };
  let highs: HighOnsetState = { level: 0 };
  let wave: WaveMotion = { phase: 0, front: 1.35 };
  let lastBar = 0;
  let bar = 0;
  let lastToken = 0;
  let explode = 0;
  let phase: "idle" | "out" | "in" = "idle";
  let dragYaw = 0;
  let dragging = false;
  let lastX = 0;
  const onDown = (event: PointerEvent) => {
    dragging = true;
    lastX = event.clientX;
  };
  const onMove = (event: PointerEvent) => {
    if (!dragging) return;
    dragYaw += (event.clientX - lastX) * 0.005;
    lastX = event.clientX;
  };
  const onUp = () => {
    dragging = false;
  };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);

  const meshMat = new ShaderMaterial({
    uniforms,
    vertexShader: MESH_VERT,
    fragmentShader: MESH_FRAG,
  });
  const pointMat = new ShaderMaterial({
    uniforms,
    vertexShader: POINT_VERT,
    fragmentShader: POINT_FRAG,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    toneMapped: false,
  });
  meshMat.uniforms = uniforms;
  pointMat.uniforms = uniforms;

  const ensureMesh = (segments: number) => {
    if (mesh && meshSeg === segments) return;
    if (mesh) {
      group.remove(mesh);
      mesh.geometry.dispose();
    }
    meshSeg = segments;
    mesh = new Mesh(new PlaneGeometry(1.7, 1.7, segments, segments), meshMat);
    group.add(mesh);
  };

  const cloudKey = (picture: BeatPicture, count: number) => `${picture.id}:${picture.kind}:${count}`;

  const ensureBuilt = (picture: BeatPicture, count: number): Built => {
    const key = cloudKey(picture, count);
    const existing = built.get(key);
    if (existing) return existing;
    const color = colorTexture(picture.rgba, picture.size);
    const depth = depthTexture(picture.depth, picture.size);
    const luma = luminanceOf(picture.rgba, picture.size, picture.size);
    const cloud = samplePoints({
      rgba: picture.rgba,
      luma,
      depth: picture.depth,
      width: picture.size,
      height: picture.size,
      count,
      seed: picture.id.length * 17 + count,
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(cloud.positions, 3));
    geometry.setAttribute("color", new BufferAttribute(cloud.colors, 3));
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const raw = Math.sin((i + 1) * 12.9898) * 43758.5453;
      seeds[i] = raw - Math.floor(raw);
    }
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    const row: Built = { key, color, depth, geometry };
    built.set(key, row);
    return row;
  };

  const bind = (picture: BeatPicture, count: number) => {
    const row = ensureBuilt(picture, count);
    uniforms.uPhoto.value = row.color;
    uniforms.uDepth.value = row.depth;
    if (!points) {
      points = new Points(row.geometry ?? undefined, pointMat);
      group.add(points);
    } else if (row.geometry) {
      points.geometry = row.geometry;
    }
    countUsed = count;
  };

  const forgetMissing = (live: readonly BeatPicture[], count: number) => {
    const keep = new Set(live.map((picture) => cloudKey(picture, count)));
    for (const [key, row] of built) {
      if (keep.has(key)) continue;
      row.color.dispose();
      row.depth.dispose();
      row.geometry?.dispose();
      built.delete(key);
    }
  };

  return {
    setPictures(next) {
      pictures = next;
      if (index >= pictures.length) index = 0;
    },
    frame(frame) {
      const width = canvas.clientWidth || 1;
      const height = canvas.clientHeight || 1;
      const ratio = Math.min(frame.lowEnd ? 1 : 1.5, window.devicePixelRatio || 1);
      if (renderer.getPixelRatio() !== ratio || canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        renderer.setPixelRatio(ratio);
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(1, height);
        camera.updateProjectionMatrix();
      }
      const segments = meshSegments(frame.lowEnd);
      ensureMesh(segments);
      const count = pointBudget(frame.look.points, frame.lowEnd);
      const picture = pictures[index];
      if (picture) bind(picture, count);
      forgetMissing(pictures, count);

      const bpm = frame.bpm > 1 ? frame.bpm : 0;
      const high = stepHighOnset(highs, frame.mid, frame.treble);
      highs = high.state;
      const stepped = stepClock(clock, { dt: frame.dt, onset: frame.onset, tap: frame.tap, bpm: bpm || 120 });
      clock = stepped.clock;
      if (stepped.downbeat) bar += 1;
      const token = frame.look.swap;
      const advance = pictures.length > 1 && phase === "idle" && shouldAdvanceImage({
        bar,
        lastBar,
        every: BARS_BETWEEN_PICTURES,
        swapToken: token,
        lastToken,
      });
      if (token !== lastToken) lastToken = token;
      if (advance) phase = "out";
      if (phase === "out") {
        explode = Math.min(1, explode + frame.dt * 1.7);
        if (explode >= 1 && pictures.length > 0) {
          index = (index + 1) % pictures.length;
          lastBar = bar;
          const next = pictures[index];
          if (next) bind(next, count);
          phase = "in";
        }
      } else if (phase === "in") {
        explode = Math.max(0, explode - frame.dt * 1.5);
        if (explode <= 0) phase = "idle";
      }

      spin = stepSpin(spin, {
        dt: frame.dt,
        bpm,
        onset: frame.onset,
        downbeat: stepped.downbeat,
        spin: frame.look.spin,
        spinMode: frame.look.spinMode,
        tap: frame.tap,
      });
      const shaped = stepDistort(distort, {
        dt: frame.dt,
        time: frame.time,
        bass: frame.bass,
        mid: frame.mid,
        treble: frame.treble,
        onset: frame.onset || frame.tap,
        highOnset: high.onset,
        relief: frame.look.relief,
        distortion: frame.look.distortion,
        glitch: frame.look.glitch,
      });
      distort = shaped.state;
      const style = frame.look.style ?? DEFAULT_STYLE;
      const bass = Math.min(1, Math.max(0, frame.bass));
      const band = style.intensityMin + (style.intensityMax - style.intensityMin) * bass;
      const moved = stepSuaveWave(wave, {
        dt: frame.dt,
        bpm,
        onset: frame.onset || frame.tap,
        speed: style.speed,
        amplitude: style.amplitude,
        bass,
      });
      wave = moved.state;
      uniforms.uRelief.value = Math.min(1.6, frame.look.relief * band * (1 + shaped.breath) + shaped.punch * 0.12);
      uniforms.uBreath.value = shaped.breath;
      uniforms.uPunch.value = shaped.punch;
      uniforms.uWave.value = shaped.wave;
      uniforms.uWarp.value = shaped.warp;
      uniforms.uGlitch.value = shaped.glitch;
      uniforms.uAmp.value = moved.amp;
      uniforms.uFreq.value = style.frequency;
      uniforms.uPhase.value = moved.phase;
      uniforms.uFront.value = moved.front;
      uniforms.uWaveKind.value = WAVE_KIND[style.wave] ?? 0;
      uniforms.uBlend.value = BLEND_KIND[style.blend] ?? 0;
      uniforms.uTintA.value = tintOf(style.palette[1] ?? style.palette[0], uniforms.uTintA.value);
      uniforms.uTintB.value = tintOf(style.palette[2] ?? style.palette[0], uniforms.uTintB.value);
      uniforms.uExplode.value = frame.look.mode === "points" ? explode : explode * 0.35;
      uniforms.uTime.value = frame.time;
      uniforms.uSize.value = frame.lowEnd ? 2.4 : 1.8 + (1 - frame.look.points) * 1.4;
      uniforms.uPointer.value = frame.pointer;
      group.rotation.y = spin.angle + dragYaw;
      if (mesh) mesh.visible = frame.look.mode === "mesh" && Boolean(picture);
      if (points) points.visible = frame.look.mode === "points" && Boolean(picture);
      renderer.render(scene, camera);
    },
    dispose() {
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      mesh?.geometry.dispose();
      for (const row of built.values()) {
        row.color.dispose();
        row.depth.dispose();
        row.geometry?.dispose();
      }
      built.clear();
      meshMat.dispose();
      pointMat.dispose();
      renderer.dispose();
    },
  };
}
