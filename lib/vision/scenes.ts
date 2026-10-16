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
