import Reveal from "./Reveal";

/**
 * Consistent section header: a steel monospace eyebrow (with index)
 * over a Space Grotesk title, optionally followed by a lede.
 * Sized for the editorial content column.
 */
type Props = {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
};

export default function SectionHeading({ index, eyebrow, title, lede }: Props) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <div className="mb-5 flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.24em] text-subtle">{index}</span>
          <span className="h-px w-8 bg-steel/40" />
          <span className="eyebrow text-muted">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-balance text-3xl font-semibold leading-[1.06] text-foreground md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
