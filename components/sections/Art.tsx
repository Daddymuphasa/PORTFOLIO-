import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { art } from "@/lib/data";

/**
 * Art — spotlights the award-winning Afrofuturist piece with a crafted
 * abstract composition (a rising portal) in place of a bundled image.
 */
export default function Art() {
  return (
    <section id="art" className="scroll-mt-28 py-20 md:py-28">
      <SectionHeading index="04" eyebrow="Digital Art" title="Where yesterday meets tomorrow." />

      <Reveal>
        <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/12 shadow-card ring-1 ring-inset ring-foreground/[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_118%,#183226_0%,#0b110e_60%)]" />
          <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <radialGradient id="portal" cx="50%" cy="72%" r="52%">
                <stop offset="0%" stopColor="#E8E6DD" />
                <stop offset="42%" stopColor="#87C4A6" />
                <stop offset="100%" stopColor="#2E6B50" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b110e" stopOpacity="0" />
                <stop offset="100%" stopColor="#0b110e" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <g
              stroke="#5AA98A"
              strokeOpacity="0.14"
              className="origin-center animate-ring-spin"
              style={{ transformOrigin: "200px 178px" }}
            >
              {Array.from({ length: 20 }).map((_, i) => {
                const a = (i / 20) * Math.PI * 2;
                // Round to a fixed precision so the server and client render
                // byte-identical coordinates (raw trig floats differ in their
                // last digits across V8 builds and trip React hydration).
                const x2 = Math.round((200 + Math.cos(a) * 250) * 100) / 100;
                const y2 = Math.round((178 + Math.sin(a) * 250) * 100) / 100;
                return <line key={i} x1={200} y1={178} x2={x2} y2={y2} strokeWidth={1} />;
              })}
            </g>
            <circle cx="200" cy="178" r="74" fill="url(#portal)" />
            <circle cx="200" cy="178" r="74" fill="none" stroke="#87C4A6" strokeOpacity="0.4" />
            {[210, 224, 234].map((y, i) => (
              <rect key={y} x="0" y={y} width="400" height={2 + i} fill="#7FA1B2" opacity={0.35 - i * 0.1} />
            ))}
            {[
              [58, 42],
              [332, 36],
              [110, 70],
              [300, 92],
              [40, 112],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1.4 : 1} fill="#E8E6DD" opacity="0.6" />
            ))}
            <rect width="400" height="250" fill="url(#fade)" />
          </svg>

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
