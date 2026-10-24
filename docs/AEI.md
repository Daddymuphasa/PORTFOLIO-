# AEI — Audio Experience Intelligence

AEI is the live director for immersive visuals at a music event. Before the
event it takes a theme pack (palette, motifs, mood, energy arc). During the
event it listens to the music and emits cues. `/aei` is that surface.

`/app` is PAPAGEDON Vision and is a separate route. AEI imports Vision's
visualizers and the existing audio analyzer. It does not modify them.

## Architecture

```mermaid
flowchart LR
  File[Audio file or mic] --> Engine[AudioEngine]
  Engine --> Analyzer[AudioAnalyzer]
  Analyzer --> Signals["energy, BPM, onsets"]
  Theme[Theme pack] --> Director
  Signals --> Director{Director}
  Director --> Rules[Rule director]
  Director --> Meta[Meta provider stub]
  Rules --> Cue["Cue: scene, palette shift, intensity, strobe, asset"]
  Meta --> Cue
  Operator[Operator override] --> Cue
  Cue --> Params["Render params"]
  Params --> Stage[Vision visualizers + palette wash]
```

* **Theme pack** (`lib/aei/themes.ts`): palette, motifs, mood, and an energy arc
  from 0 to 1 across the event. Two packs are written by hand (`Afterglow Terrace`,
  `Harbor Glass`). Reading a flyer or a banner into a pack is later work.
* **Signals**: `AudioEngine` and `AudioAnalyzer` from `lib/papagedon/` (the same
  analysis Vision uses). Each frame exposes energy, bass / mid / treble, a BPM
  estimate, and an onset.
* **Cue** (`lib/aei/types.ts`): `scene`, `paletteShift`, `intensity`, `strobe`,
  `asset`, plus who decided it (`rules`, `meta`, or `operator`) and a short reason.
* **Rule director** (`lib/aei/director.ts`): works with no API key. Blended energy
  is `0.65 · live + 0.35 · theme arc`. Scene choice is smoothed and held (6 s)
  so the look does not flicker. Intensity and strobe follow the current frame.
  An onset strobes only when that blend is hot. `asset` is the theme motif for
  the current scene.
* **Operator**: the panel can lock scene, intensity, strobe, and palette shift.
  A lock is a cue with source `operator`.
* **Render params**: palette (three colours from the theme), intensity, scene id,
  strobe. Scene id selects a Vision visualizer — the original packs through
  `createNanoHexVisualizer`, the immersive scenes through `createImmersiveVisualizer`.
  Intensity scales the audio those visualizers already take. Strobe lengthens
  the beat pulse and paints a short flash. The palette is a wash over the
  imported materials; those materials stay owned by the Vision packs.
* **Meta provider** (`lib/aei/meta.ts`, called from `POST /api/aei/cue`): reads
  `MODEL_API_KEY` on the server. The key is not a `NEXT_PUBLIC_` variable and is
  not sent to the browser. `GET /api/aei/status` reports only whether the key is
  present. The request transport is unwired, so a key alone still returns
  "not wired" and the picture keeps using the rules. A Meta reply on `/aei` is
  written to the cue log; it does not replace the rule director.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000/aei and choose **Play sample**. The sample is an
8.5 s, 120 BPM kick (`public/aei/sample-kick.wav`). **Load audio** takes a local
file. **Mic** listens to an input. The energy meter, BPM, onset dot, and cue
log should move with the music, and the picture should pulse on the kicks.

```bash
npm test
npm run build
```

## Spike scripts

Fixtures are geometric images in `scripts/aei/fixtures/` (a poster and an ellipse
frame). Nothing in that folder is a photograph. With `MODEL_API_KEY` unset, each
script stays in mock mode and writes under `out/` (gitignored), including one
line per call in `out/cost-log.jsonl`.

```bash
npm run aei:spike:theme      # flyer + brief -> out/theme-pack.json
npm run aei:spike:crowd      # synthetic frame -> out/crowd.json and out/crowd-overlay.png
npm run aei:spike:texture    # theme JSON -> out/texture.png
npm run aei:smoke            # pass/fail table for theme, segmentation, image, status
```

Live calls share `runModelCall` in `lib/aei/meta.ts`. The URL and body stay in
`lib/aei/apiConfig.ts` marked TODO until they are copied from the official docs.
A present key selects the live adapter; until that file is confirmed, the call
stops and the rule fallback answers. Mock mode is what you get when the key is
missing or invalid.

## Going live

1. Copy `.env.example` to `.env.local` and paste `MODEL_API_KEY`. Set the same
   names in the Vercel project environment. Do not prefix them with `NEXT_PUBLIC_`.
   Leave the optional base URL, model id overrides, storage token, and deploy
   token blank unless you need them.
2. Open `/api/aei/status` or the provider lines on `/aei`. Each key reads
   present, missing, or invalid. The response never includes a value.
3. Run the three spikes above, then `npm run aei:smoke`.
4. Done. Cue replies stay log-only until you point the stage at them.
   `parseMetaCue` still rejects a scene outside the pool or a number outside 0..1.

Theme packs and the session cue log are JSON files under `out/store/`.
`GET /api/aei/crowd` is the crowd meter. `GET /api/aei/session` is the cue memory.
