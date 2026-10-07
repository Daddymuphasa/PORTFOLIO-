#!/usr/bin/env node
// Copies PAPAGEDON-CORE- visual assets (GLSL shaders, pack metadata, themes)
// verbatim into public/papagedon-core/ and regenerates lib/papagedon/catalog.json.
//
// The browser app never edits these files: it only swaps the `#version` line
// for WebGL2 at load time (see lib/papagedon/shaders.ts). Re-run after the
// engine's shaders or themes change:
//
//   node scripts/sync-papagedon-core.mjs ../PAPAGEDON-CORE-
//
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const coreRoot = path.resolve(process.argv[2] ?? "../PAPAGEDON-CORE-");
const siteRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const shaderSrc = path.join(coreRoot, "engine/rendering/shaders");
const themeSrc = path.join(coreRoot, "themes");
const outRoot = path.join(siteRoot, "public/papagedon-core");

if (!fs.existsSync(shaderSrc) || !fs.existsSync(themeSrc)) {
  console.error(`Not a PAPAGEDON-CORE- checkout: ${coreRoot}`);
  process.exit(1);
}

let commit = "unknown";
try {
  commit = execSync("git rev-parse HEAD", { cwd: coreRoot }).toString().trim();
} catch {}

fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });

const titleCase = (s) =>
  s.replace(/^\d+_/, "").replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const copy = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};

// ── Themes ────────────────────────────────────────────────────────────────────
const themes = [];
for (const f of fs.readdirSync(themeSrc).filter((f) => f.endsWith(".json")).sort()) {
  copy(path.join(themeSrc, f), path.join(outRoot, "themes", f));
  const t = readJson(path.join(themeSrc, f));
  themes.push({ ...t, file: `themes/${f}` });
}

// ── Shader packs ──────────────────────────────────────────────────────────────
const packs = [];
for (const dir of fs.readdirSync(shaderSrc).sort()) {
  const packDir = path.join(shaderSrc, dir);
  if (!fs.statSync(packDir).isDirectory()) continue;
  const manifestPath = path.join(packDir, "manifest.json");
  const manifest = fs.existsSync(manifestPath) ? readJson(manifestPath) : null;
  const shaderDir = fs.existsSync(path.join(packDir, "shaders")) ? path.join(packDir, "shaders") : packDir;

  // Pack theme files (e.g. trance-theme.json) are themes too.
  if (manifest?.theme && fs.existsSync(path.join(packDir, manifest.theme))) {
    const rel = `shaders/${dir}/${manifest.theme}`;
    copy(path.join(packDir, manifest.theme), path.join(outRoot, rel));
    const t = readJson(path.join(packDir, manifest.theme));
    if (!themes.some((x) => x.id === t.id)) themes.push({ ...t, file: rel });
  }
  if (manifestPath && manifest) copy(manifestPath, path.join(outRoot, "shaders", dir, "manifest.json"));

  const shaders = [];
  for (const f of fs.readdirSync(shaderDir).filter((f) => f.endsWith(".frag")).sort()) {
    const relDir = shaderDir === packDir ? `shaders/${dir}` : `shaders/${dir}/shaders`;
    copy(path.join(shaderDir, f), path.join(outRoot, relDir, f));
    const metaPath = path.join(packDir, "metadata", f.replace(/\.frag$/, ".json"));
    const meta = fs.existsSync(metaPath) ? readJson(metaPath) : null;
    if (meta) copy(metaPath, path.join(outRoot, "shaders", dir, "metadata", path.basename(metaPath)));
    shaders.push({
      id: `${dir}/${f.replace(/\.frag$/, "")}`,
      name: meta?.name ?? titleCase(f.replace(/\.frag$/, "")),
      file: `${relDir}/${f}`,
      source: `engine/rendering/shaders/${path.relative(shaderSrc, path.join(shaderDir, f))}`,
      energyLevel: meta?.energyLevel ?? null,
    });
  }
  packs.push({
    id: dir,
    name: manifest?.pack ?? titleCase(dir.replace(/Pack$/, " Pack")),
    recommendedTheme: manifest?.recommendedTheme ?? null,
    shaders,
  });
}

const catalog = {
  generatedBy: "scripts/sync-papagedon-core.mjs",
  coreRepo: "https://github.com/Daddymuphasa/PAPAGEDON-CORE-",
  coreCommit: commit,
  themes,
  packs,
};
fs.mkdirSync(path.join(siteRoot, "lib/papagedon"), { recursive: true });
fs.writeFileSync(path.join(siteRoot, "lib/papagedon/catalog.json"), JSON.stringify(catalog, null, 2) + "\n");
fs.writeFileSync(
  path.join(outRoot, "SOURCE.md"),
  `# Vendored from PAPAGEDON-CORE-\n\nCopied verbatim by \`scripts/sync-papagedon-core.mjs\`.\n\n- Repo: https://github.com/Daddymuphasa/PAPAGEDON-CORE-\n- Commit: \`${commit}\`\n- Shaders: \`engine/rendering/shaders/\`\n- Themes: \`themes/\`\n\nDo not edit these files here. Change them in PAPAGEDON-CORE- and re-run the sync script.\n`,
);
console.log(`Synced ${packs.reduce((n, p) => n + p.shaders.length, 0)} shaders in ${packs.length} packs and ${themes.length} themes from ${commit}.`);
