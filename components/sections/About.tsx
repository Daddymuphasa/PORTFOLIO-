import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { about, profile } from "@/lib/data";

/**
 * About — founder first. A confident narrative paragraph carries the story;
 * the four pillars ground it in what he actually does.
 */
export default function About() {
  return (
    <section id="about" className="scroll-mt-28 py-20 md:py-28">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="A creative technologist obsessed with what comes next."
      />

      <Reveal>
        <p className="text-xl font-light leading-relaxed text-foreground/90 md:text-2xl md:leading-[1.5]">
          {about.summary}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Full name
            </p>
            <p className="mt-1 font-heading text-sm text-foreground">
              {profile.fullName}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Based in
            </p>
            <p className="mt-1 font-heading text-sm text-foreground">
              {profile.location}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-10">
        {about.pillars.map((p, i) => (
          <Reveal key={p.k} delay={0.05 * i}>
            <div className="group border-t border-line py-5 last:border-b">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                  {p.k}
                </h3>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.v}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
