/**
 * The nine original PAPAGEDON visualizers, ordered calm -> peak.
 * Vision mode only ever picks from this list.
 */
export type SceneDef = { id: string; name: string };

export const ORIGINAL_SCENES: SceneDef[] = [
  { id: "liquid-mirror", name: "Liquid Mirror" },
  { id: "wave-tunnel", name: "Wave Tunnel" },
  { id: "obsidian-bloom", name: "Obsidian Bloom" },
  { id: "nano-hex", name: "Nano Hex Genesis" },
  { id: "armor-scales", name: "Armor Scales" },
  { id: "prism-shards", name: "Prism Shards" },
  { id: "circuit-matrix", name: "Circuit Matrix" },
  { id: "gilded-reactor", name: "Gilded Reactor" },
  { id: "electric-nexus", name: "Electric Nexus" },
];

/**
 * Every scene Vision mode can show: the 9 originals (keys 1-9), the classic
 * engine's PAPAGEDON-CORE shader packs, and the immersive Three.js scenes.
 * Reserved keys: A auto, C camera, H hide UI, Space play/pause.
 */
export type SceneKind = "original" | "pack" | "immersive";
export type VisionScene = { id: string; name: string; kind: SceneKind; key: string; packId?: string };

export const PACK_SCENES: VisionScene[] = [
  { id: "pack-trance", name: "Trance", kind: "pack", key: "T", packId: "TranceExperiencePack" },
  { id: "pack-badman", name: "Batman", kind: "pack", key: "B", packId: "BadmanExperiencePack" },
  { id: "pack-signature", name: "Signature", kind: "pack", key: "S", packId: "SignaturePack" },
  { id: "pack-festival", name: "Festival", kind: "pack", key: "F", packId: "FestivalPack" },
  { id: "pack-pulse", name: "Pulse", kind: "pack", key: "P", packId: "PulsePack" },
  { id: "pack-hypnotic", name: "Hypnotic", kind: "pack", key: "Y", packId: "HypnoticPack" },
];

export const IMMERSIVE_SCENES: VisionScene[] = [
  { id: "neon-tunnel", name: "Neon Tunnel 3D", kind: "immersive", key: "N" },
  { id: "particle-galaxy", name: "Particle Galaxy 3D", kind: "immersive", key: "G" },
  { id: "audio-terrain", name: "Audio Terrain 3D", kind: "immersive", key: "R" },
  { id: "light-cathedral", name: "Light Cathedral 3D", kind: "immersive", key: "L" },
];

export const ALL_SCENES: VisionScene[] = [
  ...ORIGINAL_SCENES.map((s, i) => ({ ...s, kind: "original" as const, key: String(i + 1) })),
  ...PACK_SCENES,
  ...IMMERSIVE_SCENES,
];

/** Auto director pool, ordered calm -> peak (originals + the 3D scenes). */
export const AUTO_POOL: string[] = [
  "liquid-mirror", "light-cathedral", "wave-tunnel", "obsidian-bloom", "particle-galaxy", "nano-hex",
  "armor-scales", "audio-terrain", "prism-shards", "circuit-matrix", "neon-tunnel", "gilded-reactor", "electric-nexus",
];
export const AUTO_START = AUTO_POOL.indexOf("nano-hex");
export const sceneIndexById = (id: string) => ALL_SCENES.findIndex((s) => s.id === id);

import { catalog } from "@/lib/papagedon/catalog";
const byId = (id: string) => ALL_SCENES.find((s) => s.id === id)!;
const shaderNames = (packId: string) => catalog.packs.find((p) => p.id === packId)?.shaders.map((s) => s.name) ?? [];

/** Sidebar layout: 2D (originals + classic packs), 3D, Batman, Trance. */
export const SCENE_SECTIONS: { title: string; scenes: VisionScene[]; variants?: string[]; variantScene?: string }[] = [
  { title: "2D", scenes: [...ALL_SCENES.filter((s) => s.kind === "original"), ...["pack-signature", "pack-festival", "pack-pulse", "pack-hypnotic"].map(byId)] },
  { title: "3D", scenes: IMMERSIVE_SCENES },
  { title: "Batman", scenes: [byId("pack-badman")], variants: shaderNames("BadmanExperiencePack"), variantScene: "pack-badman" },
  { title: "Trance", scenes: [byId("pack-trance")], variants: shaderNames("TranceExperiencePack"), variantScene: "pack-trance" },
];
