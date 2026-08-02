import Reveal from "@/components/ui/Reveal";

/**
 * Vision — the manifesto beat. Restrained: one idea, generous space,
 * a single green emphasis.
 */
export default function Vision() {
  return (
    <section id="vision" className="scroll-mt-28 py-28 md:py-44">
      <Reveal>
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.24em] text-subtle">06</span>
          <span className="h-px w-8 bg-steel/40" />
          <span className="eyebrow text-muted">Vision</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="text-balance font-heading text-3xl font-semibold leading-[1.14] tracking-tightest text-foreground md:text-[2.75rem]">
          Building the future of{" "}
          <span className="text-accent">immersive entertainment</span> through AI,
          games, music and digital art.
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          PAPAGEDON Labs exists to dissolve the line between technology and
          experience — where every product is a new world to step into.
        </p>
      </Reveal>
    </section>
  );
}
