/** Runs the classic engine's PAPAGEDON-CORE shader packs inside Vision mode. */
import { PapagedonRenderer } from "@/lib/papagedon/renderer";
import { ExperienceGraph } from "@/lib/papagedon/experienceGraph";
import { ASSET_BASE, catalog } from "@/lib/papagedon/catalog";
import type { ExperienceSignals } from "@/lib/papagedon/analyzer";

const CYCLE_S = 20;

export function createPackVisualizer(canvas: HTMLCanvasElement) {
  const r = PapagedonRenderer.create(canvas);
  if (!r) throw new Error("WebGL2 unavailable");
  const graph = new ExperienceGraph();
  const cache = new Map<string, string>();
  let packId: string | null = null;
  let shaderIdx = 0;
  let shownAt = 0;
  let loading = 0;
  let last = performance.now();
  let shaderName = "";

  async function load() {
    const pack = catalog.packs.find((p) => p.id === packId);
    if (!pack) return;
    const token = ++loading;
    const sh = pack.shaders[shaderIdx % pack.shaders.length];
    let src = cache.get(sh.file);
    if (!src) {
      src = await (await fetch(ASSET_BASE + sh.file)).text();
      cache.set(sh.file, src);
    }
    if (token !== loading) return;
    if (r!.useFragment(src).ok) shaderName = sh.name;
    shownAt = performance.now();
  }

  /** Selects a pack (optionally a specific shader); `advance` steps to the next shader of the active pack. */
  function setPack(id: string, opts: { advance?: boolean; index?: number } = {}) {
    const pack = catalog.packs.find((p) => p.id === id);
    if (!pack) return;
    if (id === packId) {
      if (opts.index != null) shaderIdx = opts.index;
      else if (opts.advance) shaderIdx++;
      else return;
    } else {
      packId = id;
      shaderIdx = opts.index ?? 0;
      r!.tranceMode = id === "TranceExperiencePack";
      const theme = catalog.themes.find((t) => t.id === pack.recommendedTheme) ?? catalog.themes.find((t) => t.id === "neon-rave") ?? catalog.themes[0];
      r!.setTheme(theme, true);
    }
    void load();
  }

  function render(s: ExperienceSignals) {
    const now = performance.now();
    const dt = (now - last) / 1000;
    last = now;
    if (packId && shownAt && now - shownAt > CYCLE_S * 1000) { shownAt = now; shaderIdx++; void load(); }
    r!.render(s, graph.update(s), dt);
  }

  return { setPack, render, currentShader: () => shaderName, dispose: () => r.dispose() };
}
