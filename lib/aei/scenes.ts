/**
 * Scenes AEI may cue, in calm → peak order. The ids are the Vision visualizers
 * (originals and the immersive Three.js scenes). This module only reads that
 * catalog; it does not change Vision mode.
 */
import { ALL_SCENES, AUTO_POOL } from "@/lib/vision/scenes";

export type AeiSceneKind = "original" | "immersive" | "beat";

export type AeiScene = {
  id: string;
  name: string;
  kind: AeiSceneKind;
};

export const BEAT_IMAGE_SCENE: AeiScene = { id: "beat-image", name: "Beat Image", kind: "beat" };

export const AEI_SCENES: AeiScene[] = [
  ...AUTO_POOL.map((id) => {
    const scene = ALL_SCENES.find((entry) => entry.id === id);
    if (!scene) throw new Error(`AEI scene missing from the Vision catalog: ${id}`);
    const kind: AeiSceneKind = scene.kind === "immersive" ? "immersive" : "original";
    return { id: scene.id, name: scene.name, kind };
  }),
  BEAT_IMAGE_SCENE,
];

export const AEI_SCENE_IDS: readonly string[] = AEI_SCENES.map((scene) => scene.id);

export function aeiSceneById(id: string): AeiScene | undefined {
  return AEI_SCENES.find((scene) => scene.id === id);
}
