import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { skills } from "@/lib/data";

/**
 * Skills — grouped into disciplines. Clean bordered panels, restrained hover.
 */
export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-28 py-20 md:py-28">
      <SectionHeading
        index="02"
        eyebrow="Capabilities"
        title="A full stack of creative and technical craft."
        lede="Five disciplines that rarely live in one person — combined to build things that feel new."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={0.05 * i}>
            <div className="glass-card group h-full rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-heading text-base font-medium text-foreground">
                  {group.label}
                </h3>
                <span className="font-mono text-xs text-subtle">{group.tag}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line px-2.5 py-1 text-xs text-muted transition-colors group-hover:text-foreground/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
