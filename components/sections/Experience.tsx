import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { experience, education } from "@/lib/data";

/**
 * Experience — a restrained timeline. A single connecting hairline and
 * accent nodes keep it elegant; the education card anchors the section.
 */
export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 py-20 md:py-28">
      <SectionHeading index="05" eyebrow="Trajectory" title="A path across AI, games, art and product." />

      <ol className="relative">
        <span aria-hidden className="absolute left-[5px] top-1 h-[calc(100%-1.75rem)] w-px bg-line" />
        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.org}-${i}`} delay={0.05 * i}>
            <div className="group relative flex flex-col gap-1.5 pb-10 pl-9 last:pb-0">
              <span className="absolute left-0 top-[7px] h-2.5 w-2.5 rounded-full border border-accent bg-background transition-colors duration-300 group-hover:bg-accent" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-subtle">
                {job.period}
              </span>
              <h3 className="font-heading text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
                {job.role}
              </h3>
              <p className="text-sm font-medium text-accent">{job.org}</p>
              {job.note && (
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{job.note}</p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <div className="glass-card mt-8 rounded-2xl p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-soft">
            Education
          </p>
          <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-foreground">
            {education.school}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {education.degree} · {education.period}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
