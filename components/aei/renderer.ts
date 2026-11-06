/**
 * AEI stage renderer. Scene id selects an existing Vision visualizer
 * (nano-hex pack for the originals, immersive Three.js scenes for the rest).
 * Intensity scales the audio the visualizer already understands. Strobe
 * lengthens the beat pulse and is also painted as a palette flash by the page.
 * Palette itself is a wash over the imported materials — those materials stay
 * owned by the Vision packs.
 */
import { createImmersiveVisualizer, type ImmersiveId } from "@/lib/vision/visualizers/immersive3d";
import { createNanoHexVisualizer } from "@/lib/vision/visualizers/nano-hex.js";
import type { ExperienceSignals } from "@/lib/papagedon/analyzer";
import { aeiSceneById } from "@/lib/aei/scenes";
import type { RenderParams } from "@/lib/aei/types";
import { createBeatScene, type BeatFrame, type BeatPicture, type BeatScene } from "./beatScene";

type NanoViz = ReturnType<typeof createNanoHexVisualizer>;
type ImmersiveViz = ReturnType<typeof createImmersiveVisualizer>;

export type AeiRenderer = {
  render: (params: RenderParams, signals: ExperienceSignals, onset: boolean) => void;
  setBeat: (pictures: readonly BeatPicture[], frame: BeatFrame) => void;
  dispose: () => void;
};

export function createAeiRenderer(original: HTMLCanvasElement, immersive: HTMLCanvasElement, beatCanvas: HTMLCanvasElement): AeiRenderer {
  let nano: NanoViz | null = null;
  let imm: ImmersiveViz | null = null;
  let beatScene: BeatScene | null = null;
  let beatPictures: readonly BeatPicture[] = [];
  let beatFrame: BeatFrame | null = null;
  let currentId = "";
  let beatHold = 0;
  let lastStrobe = 0;

  const show = (kind: "original" | "immersive" | "beat") => {
    original.style.visibility = kind === "original" ? "visible" : "hidden";
    immersive.style.visibility = kind === "immersive" ? "visible" : "hidden";
    beatCanvas.style.visibility = kind === "beat" ? "visible" : "hidden";
  };

  const render = (params: RenderParams, signals: ExperienceSignals, onset: boolean) => {
    const scene = aeiSceneById(params.sceneId) ?? aeiSceneById("nano-hex");
    if (!scene) return;
    const gain = 0.35 + Math.min(1, Math.max(0, params.intensity)) * 1.05;
    const scale = (value: number) => Math.min(1, Math.max(0, value) * gain);
    if (onset) beatHold = 1;
    else beatHold = Math.max(0, beatHold - 0.08);
    const beat = Math.min(1, Math.max(beatHold, params.strobe));
    const shaped: ExperienceSignals = {
      ...signals,
      energy: scale(signals.energy),
      intensity: scale(Math.max(signals.intensity, params.intensity)),
      bass: scale(signals.bass),
      mid: scale(signals.mid),
      treble: scale(signals.treble),
      beat: beat > 0.2,
    };

    if (scene.kind === "beat") {
      beatScene ??= createBeatScene(beatCanvas);
      beatScene.setPictures(beatPictures);
      show("beat");
      if (beatFrame) beatScene.frame(beatFrame);
    } else if (scene.kind === "immersive") {
      imm ??= createImmersiveVisualizer(immersive);
      if (currentId !== scene.id) imm.setScene(scene.id as ImmersiveId);
      show("immersive");
      imm.render({
        energy: shaped.energy,
        bass: shaped.bass,
        mid: shaped.mid,
        treble: shaped.treble,
        beat,
        room: shaped.energy,
        crowd: 0,
      });
    } else {
      nano ??= createNanoHexVisualizer(original);
      if (currentId !== scene.id) nano.setVariant(scene.id);
      show("original");
      if (onset || (params.strobe > 0.55 && lastStrobe <= 0.55)) {
        nano.triggerImpact(0, 0, Math.max(0.35, params.strobe, shaped.energy));
      }
      nano.render({
        energy: shaped.energy,
        intensity: shaped.intensity,
        bass: shaped.bass,
        mid: shaped.mid,
        treble: shaped.treble,
        pulse: onset ? shaped.bass : 0,
        beat,
      });
    }
    currentId = scene.id;
    lastStrobe = params.strobe;
  };

  return {
    render,
    setBeat(pictures, frame) {
      beatPictures = pictures;
      beatFrame = frame;
    },
    dispose() {
      nano?.dispose();
      imm?.dispose();
      beatScene?.dispose();
      nano = null;
      imm = null;
      beatScene = null;
    },
  };
}
