# papagedon.com/app — PAPAGEDON in the browser

The `/app` route opens **PAPAGEDON Vision** (camera + audio, the nine original
visualizers; see [`VISION.md`](./VISION.md)). `/app?engine=classic` runs the
PAPAGEDON-CORE- shader pipeline described below.

## What comes from PAPAGEDON-CORE-

Source: https://github.com/Daddymuphasa/PAPAGEDON-CORE- (branch `feat/theme-system`,
commit `4551dc4`). Nothing in that repo is modified.

| Engine (C++) | Browser (this repo) | How |
| --- | --- | --- |
| `engine/audio/SimpleFFT.h`, `engine/audio/AudioAnalyzer.cpp`, `ExperienceSignals.h` | `lib/papagedon/analyzer.ts` | Line-by-line port, same constants |
| `engine/experience/ExperienceGraph.cpp` | `lib/papagedon/experienceGraph.ts` | Port (event / state / mood) |
| `engine/rendering/shaders/**/*.frag` (74 shaders, 6 packs) | `public/papagedon-core/shaders/` | Copied verbatim; only the `#version` line is swapped for WebGL2 at load time (`lib/papagedon/shaders.ts`) |
| `themes/*.json`, pack themes | `public/papagedon-core/themes/` | Copied verbatim |
| `OpenGLRenderer.cpp` uniform smoothing (Follow, beat decay, theme lerp, PGX phase) | `lib/papagedon/renderer.ts` | Port |
| `DemoConfig::audioSource` = `file` / `input` / `loopback` | `lib/papagedon/audioSources.ts` | Web Audio equivalents (below) |
| `PAPAGEDON_DEMO_CYCLE` preset auto-cycle | "Auto" button | 20 s cycle |

Re-sync shaders and themes after engine changes:

```bash
npm run sync:core            # expects ../PAPAGEDON-CORE- next to this repo
node scripts/sync-papagedon-core.mjs /path/to/PAPAGEDON-CORE-
```

Not ported yet (native player only): the 10 randomised FBO transition effects,
the PGX feedback and waveform overlay passes, the Auto-VJ director
(`AutoDirector.cpp`) and the T/B section show modes. Shader switches are instant.

## Audio inputs (same three as the native player)

| Native `audioSource` | Native code | Browser |
| --- | --- | --- |
| `file` | `AudioInput::Load` + `AudioPlayer`; CLI path, `config/demo.json` `audioFile`, or drag-and-drop on the window (`Runtime.cpp` `ConsumeDroppedFile`) | **File** button or drop a track anywhere |
| `input` | `AudioCapture::Initialize(device, false)` (mic, DJ mixer, audio interface) | **Mic / input** with a device picker (`getUserMedia`, echo cancellation, noise suppression and AGC off) |
| `loopback` | `AudioCapture::Initialize(device, true)` (what the computer is playing) | **System**: share a tab or screen with "Share audio" ticked (`getDisplayMedia`, Chrome/Edge) |

Keys: Space play/pause · `[` `]` previous/next shader · `1`–`9` theme · `A` auto-cycle · `H` hide UI.

## Env vars

Browser (public, read at build time): `NEXT_PUBLIC_VISION_SERVICE_URL`
(optional; the AWS OpenCV 5 service. Unset = in-browser analysis).

## Checks

```bash
npm test        # analyzer port, AEI on a sample WAV, vision fusion + browser crowd analysis
npm run build   # type-check + production build
```

All 74 engine shaders were compile- and link-tested in headless Chrome WebGL2.
