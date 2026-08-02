import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { music } from "@/lib/data";

/**
 * Music — the newest release, opening the story. The album cover sits in a
 * glass frame with a live "Out Now" state; the details and the streaming
 * link ride alongside it.
 */
export default function Music() {
  return (
    <section id="music" className="scroll-mt-28 py-24 md:py-36">
      <SectionHeading
        index="01"
        eyebrow="New Release"
        title="New music, out now."
      />

      <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-10">
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
            <figcaption className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-background/70 px-3 py-1.5 text-xs font-medium text-accent backdrop-blur">
              <span aria-hidden className="flex items-end gap-[2px]">
                <span className="h-2 w-[2px] animate-pulse rounded-full bg-accent [animation-delay:-0.2s]" />
                <span className="h-3 w-[2px] animate-pulse rounded-full bg-accent" />
                <span className="h-1.5 w-[2px] animate-pulse rounded-full bg-accent [animation-delay:-0.4s]" />
              </span>
              {music.tag}
            </figcaption>
          </figure>
        </Reveal>

        {/* ---- Details -------------------------------------------- */}
        <div>
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
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-soft"
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
