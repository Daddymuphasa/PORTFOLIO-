import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { obased } from "@/lib/data";

/**
 * OBASED — the game, given its own beat. The key art runs full-bleed inside a
 * glass frame with a scrim so the title and tagline read over it; the build
 * notes and engine stack sit underneath.
 */
export default function Obased() {
  return (
    <section id="obased" className="scroll-mt-28 py-24 md:py-36">
      <SectionHeading index="04" eyebrow="The Game" title="Reality: hard mode." />

      <Reveal>
        <figure className="group relative overflow-hidden rounded-2xl border border-foreground/12 shadow-card ring-1 ring-inset ring-foreground/[0.06]">
          {/* Key art, shown in full. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={obased.poster}
            alt={`${obased.title} key art — a VR player outrunning a bear, from the game by Daddy MUPHASA`}
            className="block w-full select-none transition-transform duration-700 group-hover:scale-[1.02]"
            draggable={false}
          />

          {/* Legibility scrim so the title reads over the art. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/40 to-transparent"
          />

          <figcaption className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-background/70 px-3 py-1.5 text-xs font-medium text-accent backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {obased.tag}
          </figcaption>

          <div className="absolute inset-x-0 bottom-0 z-10 p-5">
            <p className="font-heading text-lg font-semibold text-foreground">{obased.title}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-soft">
              {obased.tagline}
            </p>
          </div>
        </figure>
      </Reveal>

      <div className="mt-10">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-4 py-2 text-sm text-accent">
            {obased.status}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mt-6 font-heading text-2xl font-semibold leading-tight text-foreground md:text-3xl">
            {obased.title}
          </h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            {obased.description}
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <ul className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
            {obased.tech.map((t) => (
              <li key={t} className="rounded-md border border-line px-2.5 py-1 text-[11px] text-muted">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
