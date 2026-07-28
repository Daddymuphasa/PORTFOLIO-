import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { art } from "@/lib/data";

/**
 * Art — spotlights the award-winning Afrofuturist piece, "Two Days Before
 * Yesterday", shown in full inside a glass frame with a legibility scrim.
 */
export default function Art() {
  return (
    <section id="art" className="scroll-mt-28 py-20 md:py-28">
      <SectionHeading index="04" eyebrow="Digital Art" title="Where yesterday meets tomorrow." />

      <Reveal>
        <figure className="relative overflow-hidden rounded-2xl border border-foreground/12 shadow-card ring-1 ring-inset ring-foreground/[0.06]">
          {/* The award-winning artwork itself, shown in full. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/two-days-before-yesterday.webp"
            alt={`${art.title} — ${art.theme}, an award-winning Afrofuturist artwork by Daddy MUPHASA`}
            className="block w-full select-none"
            draggable={false}
          />

          {/* Legibility scrim so the title reads over the art. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/40 to-transparent"
          />

          <figcaption className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-background/70 px-3 py-1.5 text-xs font-medium text-accent backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Award Winner
          </figcaption>

          <div className="absolute inset-x-0 bottom-0 z-10 p-5">
            <p className="font-heading text-lg font-semibold text-foreground">{art.title}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-soft">
              {art.theme}
            </p>
          </div>
        </figure>
      </Reveal>

      <div className="mt-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-4 py-2 text-sm text-accent">
            {art.award}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mt-6 font-heading text-2xl font-semibold leading-tight text-foreground md:text-3xl">
            {art.title}
          </h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{art.description}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <a
            href="https://www.behance.net/adamstestimony"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            View more art on Behance
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
