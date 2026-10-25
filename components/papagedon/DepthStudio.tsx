"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onClose: () => void;
  audio: { bass: number; energy: number };
};

const VERTEX = `#version 300 es
out vec2 vUv;
void main(){
  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));
  vUv=p*.5;
  gl_Position=vec4(p-1.0,0.0,1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uImage;
uniform sampler2D uDepthMap;
uniform vec2 uResolution;
uniform vec2 uImageSize;
uniform vec2 uPointer;
uniform float uTime;
uniform float uDepth;
uniform float uBass;
uniform float uEnergy;
uniform float uView;
void main(){
  float screenAspect=uResolution.x/uResolution.y;
  float imageAspect=uImageSize.x/uImageSize.y;
  vec2 fit=screenAspect>imageAspect?vec2(imageAspect/screenAspect,1.0):vec2(1.0,screenAspect/imageAspect);
  vec2 uv=(vUv-.5)/fit+.5;
  if(any(lessThan(uv,vec2(0.0)))||any(greaterThan(uv,vec2(1.0)))){outColor=vec4(2.0/255.0,4.0/255.0,3.0/255.0,1.0);return;}
  vec2 px=1.0/uImageSize;
  vec3 base=texture(uImage,uv).rgb;
  float lum=dot(base,vec3(.2126,.7152,.0722));
  float depth=texture(uDepthMap,uv).r;
  vec2 pointer=(uPointer-.5)*vec2(1.0,-1.0);
  float pulse=1.0+uBass*.18+uEnergy*.08;
  vec2 parallax=pointer*(depth-.38)*uDepth*.115*pulse;
  float wave=sin(uv.y*15.0-uTime*1.3)*.0012*uEnergy;
  vec2 sampleUv=uv+parallax+vec2(wave,0.0);
  vec3 color=texture(uImage,sampleUv).rgb;
  vec3 left=texture(uImage,sampleUv-vec2(px.x*2.0,0.0)).rgb;
  vec3 right=texture(uImage,sampleUv+vec2(px.x*2.0,0.0)).rgb;
  float chroma=clamp((uView-.5)*.012,0.0,.006);
  color.r=texture(uImage,sampleUv+parallax*chroma).r;
  color.b=texture(uImage,sampleUv-parallax*chroma).b;
  float rim=smoothstep(.12,.0,abs(lum-.53))*uEnergy*.22;
  color+=vec3(.18,.75,.43)*rim;
  float vig=1.0-.27*dot((uv-.5)*vec2(imageAspect,1.0),(uv-.5)*vec2(imageAspect,1.0));
  color*=vig;
  outColor=vec4(color,1.0);
}`;

function shader(gl: WebGL2RenderingContext, type: number, source: string) {
  const item = gl.createShader(type);
  if (!item) throw new Error("Could not create the depth shader.");
  gl.shaderSource(item, source);
  gl.compileShader(item);
  if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) {
    const detail = gl.getShaderInfoLog(item) || "Shader compilation failed.";
    gl.deleteShader(item);
    throw new Error(detail);
  }
  return item;
}

/**
 * PAPAGEDON's image-depth stage. FastDepth adapters should return a normalized
 * depth texture/map for this stage; the current browser preview uses image
 * luminance and local gradients as a clearly labeled, model-free depth proxy.
 */
export default function DepthStudio({ onClose, audio }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const depthTextureRef = useRef<WebGLTexture | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<[number, number]>([1, 1]);
  const [depth, setDepth] = useState(58);
  const [view, setView] = useState(50);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const frameConfig = useRef({ imageSize, depth, view, audio });
  frameConfig.current = { imageSize, depth, view, audio };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, powerPreference: "high-performance" });
    if (!gl) { setError("This display does not support WebGL2."); return; }
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let raf = 0;
    try {
      const vs = shader(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = shader(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      program = gl.createProgram();
      if (!program) throw new Error("Could not start the image renderer.");
      gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
      gl.deleteShader(vs); gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Could not link the image renderer.");
      texture = gl.createTexture();
      if (!texture) throw new Error("Could not allocate the image texture.");
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([4, 8, 6, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const depthTexture = gl.createTexture();
      if (!depthTexture) throw new Error("Could not allocate the depth texture.");
      depthTextureRef.current = depthTexture;
      gl.bindTexture(gl.TEXTURE_2D, depthTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 1, 1, 0, gl.RED, gl.UNSIGNED_BYTE, new Uint8Array([128]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      programRef.current = program; textureRef.current = texture;
      const loc = Object.fromEntries(["uImage", "uDepthMap", "uResolution", "uImageSize", "uPointer", "uTime", "uDepth", "uBass", "uEnergy", "uView"].map((key) => [key, gl.getUniformLocation(program!, key)]));
      const start = performance.now();
      const draw = (now: number) => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
        gl.viewport(0, 0, w, h); gl.useProgram(program!);
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture!);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, depthTextureRef.current);
        const config = frameConfig.current;
        gl.uniform1i(loc.uImage, 0); gl.uniform1i(loc.uDepthMap, 1); gl.uniform2f(loc.uResolution, w, h); gl.uniform2f(loc.uImageSize, config.imageSize[0], config.imageSize[1]);
        const pointer = canvas.dataset.pointer?.split(",").map(Number) ?? [.5, .5];
        gl.uniform2f(loc.uPointer, pointer[0], pointer[1]); gl.uniform1f(loc.uTime, (now - start) / 1000);
        gl.uniform1f(loc.uDepth, config.depth / 100); gl.uniform1f(loc.uBass, config.audio.bass); gl.uniform1f(loc.uEnergy, config.audio.energy); gl.uniform1f(loc.uView, config.view / 100);
        gl.drawArrays(gl.TRIANGLES, 0, 3); raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
    } catch (e) { setError(e instanceof Error ? e.message : "The depth stage could not start."); }
    return () => { cancelAnimationFrame(raf); if (program) gl.deleteProgram(program); if (texture) gl.deleteTexture(texture); if (depthTextureRef.current) gl.deleteTexture(depthTextureRef.current); programRef.current = null; textureRef.current = null; depthTextureRef.current = null; };
  }, []);

  useEffect(() => {
    if (!image || !textureRef.current || !canvasRef.current) return;
    const gl = canvasRef.current.getContext("webgl2");
    if (!gl) return;
    const picture = new Image();
    picture.onload = () => {
      setImageSize([picture.naturalWidth, picture.naturalHeight]);
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, picture);
      // Model-free depth preview: luminance relief is explicitly a fallback,
      // not a semantic monocular-depth model. A DepthModelProvider can replace
      // this upload with the inferred grayscale map without changing the shader.
      const scale = 224 / Math.max(picture.naturalWidth, picture.naturalHeight);
      const depthCanvas = document.createElement("canvas");
      depthCanvas.width = Math.max(1, Math.round(picture.naturalWidth * scale));
      depthCanvas.height = Math.max(1, Math.round(picture.naturalHeight * scale));
      const depthCtx = depthCanvas.getContext("2d", { willReadFrequently: true });
      if (depthCtx && depthTextureRef.current) {
        depthCtx.drawImage(picture, 0, 0, depthCanvas.width, depthCanvas.height);
        const pixels = depthCtx.getImageData(0, 0, depthCanvas.width, depthCanvas.height).data;
        const relief = new Uint8Array(depthCanvas.width * depthCanvas.height);
        for (let y = 0; y < depthCanvas.height; y++) for (let x = 0; x < depthCanvas.width; x++) {
          const source = (y * depthCanvas.width + x) * 4;
          const flipped = (depthCanvas.height - 1 - y) * depthCanvas.width + x;
          relief[flipped] = Math.round(pixels[source] * .2126 + pixels[source + 1] * .7152 + pixels[source + 2] * .0722);
        }
        gl.bindTexture(gl.TEXTURE_2D, depthTextureRef.current);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, depthCanvas.width, depthCanvas.height, 0, gl.RED, gl.UNSIGNED_BYTE, relief);
      }
    };
    picture.onerror = () => setError("That image could not be decoded. Try a PNG, JPEG, or WebP.");
    picture.src = image;
  }, [image]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => () => { if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current); }, []);

  const loadFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Choose an image file to build a depth scene."); return; }
    if (file.size > 18 * 1024 * 1024) { setError("Keep images under 18 MB for smooth rendering."); return; }
    setError("");
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = URL.createObjectURL(file);
    setImage(objectUrlRef.current);
  };

  return (
    <div className="pg-depth" role="dialog" aria-modal="true" aria-labelledby="pg-depth-title" onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); loadFile(e.dataTransfer.files[0]); }}>
      <canvas ref={canvasRef} className="pg-depth-canvas" aria-label="Interactive depth scene" onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.dataset.pointer = `${(e.clientX-r.left)/r.width},${1-(e.clientY-r.top)/r.height}`; }} onPointerLeave={(e) => { e.currentTarget.dataset.pointer = ".5,.5"; }} />
      <div className="pg-depth-grain" />
      {drag && <div className="pg-depth-drop">DROP IMAGE · ENTER THE FRAME</div>}
      <header className="pg-depth-top"><a href="/" className="pg-depth-mark"><span>✳</span> PAPAGEDON <i>VISUAL INTELLIGENCE</i></a><button className="pg-depth-close" onClick={onClose} aria-label="Close depth studio">ESC <b>×</b></button></header>
      <main className="pg-depth-main">
        <section className="pg-depth-copy"><div className="pg-depth-kicker"><span /> LIVE DEPTH STAGE · AUDIO LINKED</div><h1 id="pg-depth-title">Give your<br /><em>image a pulse.</em></h1><p>Turn a still into a living PAPAGEDON scene. Move across the frame; let the bass bend the light.</p>
          <div className="pg-depth-actions"><button className="pg-depth-primary" onClick={() => fileRef.current?.click()}>{image ? "CHANGE IMAGE" : "CHOOSE AN IMAGE"}<span>↗</span></button><input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/avif" hidden onChange={(e) => loadFile(e.target.files?.[0])} /><span className="pg-depth-hint">OR DROP IT ANYWHERE · PNG / JPG / WEBP</span></div>
          {error && <p className="pg-depth-error" role="status">{error}</p>}
        </section>
        <aside className="pg-depth-controls"><div className="pg-depth-control-head"><div><span className="pg-depth-kicker">01 / SHAPE THE SPACE</span><h2>Depth controls</h2></div><span className="pg-depth-live"><i /> LIVE</span></div>
          <label className="pg-depth-range"><span><b>PARALLAX</b><output>{depth}%</output></span><input type="range" min="0" max="100" value={depth} onChange={(e) => setDepth(Number(e.target.value))} /></label>
          <label className="pg-depth-range"><span><b>LIGHT SCULPT</b><output>{view}%</output></span><input type="range" min="0" max="100" value={view} onChange={(e) => setView(Number(e.target.value))} /></label>
          <div className="pg-depth-signal"><span className="pg-depth-signal-icon">◉</span><div><b>Engine sync</b><small>{audio.energy > .08 ? "Bass and energy are driving the image" : "Ready for audio · add a track or use mic"}</small></div><span className="pg-depth-wave"><i /><i /><i /><i /><i /></span></div>
          <div className="pg-depth-model"><span>DEPTH SOURCE</span><b>LOCAL RELIEF <i>PREVIEW</i></b><small>FastDepth adapter slot ready · model weights not loaded</small></div>
          <div className="pg-depth-foot"><span>FRAME FIT</span><span>ADAPTIVE · {imageSize[0]} × {imageSize[1]}</span></div>
        </aside>
      </main>
      <footer className="pg-depth-bottom"><span>01 <i /> DEPTH RELIEF</span><span>POINTER TRACKING <b>ON</b></span><span>WEBGL2 · {Math.round(audio.bass * 100)}% BASS</span></footer>
    </div>
  );
}
