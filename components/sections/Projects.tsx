import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/lib/data";

/* Restrained status label, colour-keyed to lifecycle stage. */
function Status({ status }: { status: string }) {
  const inDev = status === "In Development";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium ${
        inDev ? "text-accent" : "text-steel-soft"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${inDev ? "bg-accent" : "bg-steel"}`} />
      {status}
    </span>
  );
}

export default function Projects() {
  const flagship = projects.find((p) => p.flagship)!;
  const rest = projects.filter((p) => !p.flagship);

  return (
    <section id="projects" className="scroll-mt-28 py-20 md:py-28">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title="Products building the future of entertainment."
        lede="From a flagship platform in the making to shipped games and AI systems in the wild."
      />

      {/* Flagship — PAPAGEDON */}
      <Reveal>
        <article className="glass-card mb-5 rounded-2xl border-accent/25 p-7 md:p-9">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="eyebrow text-muted">{flagship.tag}</span>
            <Status status={flagship.status} />
          </div>
          <h3 className="font-heading text-4xl font-semibold tracking-tightest text-foreground md:text-5xl">
            {flagship.name}
          </h3>
          <p className="mt-4 text-lg text-foreground/85">{flagship.summary}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{flagship.detail}</p>
          <ul className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
            {flagship.tech.map((t) => (
              <li key={t} className="rounded-md border border-line px-2.5 py-1 text-[11px] text-muted">
                {t}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>

      {/* Supporting projects */}
      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((p, i) => (
          <Reveal key={p.name} delay={0.06 * i}>
            <article className="glass-card group flex h-full flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow text-muted">{p.tag}</span>
                <Status status={p.status} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                {p.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-foreground/75">{p.summary}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.detail}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-md border border-line px-2 py-0.5 text-[11px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
