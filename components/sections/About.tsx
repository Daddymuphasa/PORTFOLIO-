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
        <p className="max-w-2xl text-xl font-light leading-relaxed text-foreground/90 md:text-2xl md:leading-[1.5]">
          {about.summary}
        </p>
      </Reveal>

      {/* At a glance — the essential facts, cleanly labelled */}
      <Reveal delay={0.1}>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
          {[
            { k: "Full name", v: profile.fullName },
            { k: "Role", v: profile.title },
            { k: "Based in", v: profile.location },
            { k: "Company", v: "PAPAGEDON Labs" },
          ].map((f) => (
            <div key={f.k}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                {f.k}
              </dt>
              <dd className="mt-2 font-heading text-sm leading-snug text-foreground">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* What I do — the four pillars in an organised grid */}
      <div className="mt-14">
        <Reveal>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-steel-soft">
            What I do
          </p>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {about.pillars.map((p, i) => (
            <Reveal key={p.k} delay={0.05 * i}>
              <div className="group flex h-full flex-col bg-panel/20 p-5 transition-colors duration-300 hover:bg-panel/45">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-base font-medium text-foreground transition-colors group-hover:text-accent">
                    {p.k}
                  </h3>
                  <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
