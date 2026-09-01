"use client";

import { useState, type CSSProperties } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { musicReleases } from "@/lib/data";

/**
 * Music — the newest release, opening the story. The album cover sits in a
 * glass frame with a live "Out Now" state; the details and the streaming
 * link ride alongside it.
 */
export default function Music() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const music = musicReleases[selectedIndex];
  const releaseTheme = {
    "--release-accent": music.accent,
    "--release-accent-soft": music.accentSoft,
    "--release-glow": `${music.accent}4d`,
  } as CSSProperties;

  return (
    <section
      id="music"
      className="scroll-mt-28 py-24 transition-colors duration-700 md:py-36"
      style={releaseTheme}
    >
      <SectionHeading
        index="01"
        eyebrow="New Release"
        title="New music, out now."
      />

      <div className="relative grid items-center gap-8 overflow-hidden rounded-3xl p-1 md:grid-cols-[1fr_1fr] md:gap-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_42%,var(--release-glow),transparent_42%)] transition-all duration-700"
        />
        {/* ---- Album cover ---------------------------------------- */}
        <Reveal>
          <figure className="group relative aspect-square overflow-hidden rounded-2xl border border-foreground/12 shadow-card ring-1 ring-inset ring-foreground/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={music.cover}
              alt={`${music.title} — album cover by Daddy MUPHASA`}
              className="block h-full w-full select-none object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              draggable={false}
            />

            {/* Out Now badge with a live equaliser */}
            <figcaption className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-[var(--release-accent)]/40 bg-background/70 px-3 py-1.5 text-xs font-medium text-[var(--release-accent)] backdrop-blur transition-colors duration-700">
              <span aria-hidden className="flex items-end gap-[2px]">
                <span className="h-2 w-[2px] animate-pulse rounded-full bg-[var(--release-accent)] [animation-delay:-0.2s]" />
                <span className="h-3 w-[2px] animate-pulse rounded-full bg-[var(--release-accent)]" />
                <span className="h-1.5 w-[2px] animate-pulse rounded-full bg-[var(--release-accent)] [animation-delay:-0.4s]" />
              </span>
              {music.tag}
            </figcaption>
          </figure>
        </Reveal>

        {/* ---- Details -------------------------------------------- */}
        <div className="px-1 pb-1 md:px-0">
          <div className="mb-7 flex flex-wrap gap-2" role="tablist" aria-label="Select a release">
            {musicReleases.map((release, index) => (
              <button
                key={release.title}
                type="button"
                role="tab"
                aria-selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
                className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300"
                style={selectedIndex === index ? { borderColor: music.accent, color: music.accent, backgroundColor: `${music.accent}1a` } : undefined}
              >
                {release.title}
              </button>
            ))}
          </div>
          <Reveal delay={0.08}>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel">
              {music.status}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <h3 className="mt-3 font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              {music.title}
            </h3>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {music.description}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={music.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--release-accent)] px-6 py-3 text-sm font-medium text-background transition-colors duration-700 hover:bg-[var(--release-accent-soft)]"
              >
                {/* play glyph */}
                <span
                  aria-hidden
                  className="grid h-5 w-5 place-items-center rounded-full bg-background/20"
                >
                  <span className="ml-[1px] h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-background" />
                </span>
                Listen on {music.platform}
              </a>
              <span className="text-sm text-subtle">{music.note}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
