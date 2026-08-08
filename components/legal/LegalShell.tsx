import Footer from "@/components/Footer";
import { legal } from "@/lib/data";

/**
 * Shared chrome for the legal pages. Deliberately plainer than the marketing
 * sections — a single readable column, no Oracle, no reveal animations, so the
 * text is easy to scan and easy to quote.
 */
export default function LegalShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[4%] h-[38rem] w-[38rem] rounded-full bg-accent/[0.06] blur-[130px]" />
      </div>

      <header className="relative z-10 border-b border-line">
        <div className="container-x flex items-center justify-between py-5">
          <a href="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-accent/30 font-heading text-sm font-bold text-accent">
              DM
            </span>
            <span className="font-heading text-sm font-medium text-foreground">
              Daddy MUPHASA
            </span>
          </a>
          <a
            href="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-subtle transition-colors hover:text-accent"
          >
            ← Back to site
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <article className="container-x max-w-3xl py-16 md:py-24">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tightest text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground/80">{intro}</p>
          <p className="mt-6 border-t border-line pt-6 font-mono text-xs text-subtle">
            Last updated {legal.updated}
          </p>

          <div className="legal-prose mt-12">{children}</div>

          <div className="glass-card mt-16 rounded-2xl p-7">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Questions about this policy
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Write to{" "}
              <a
                href={`mailto:${legal.email}`}
                className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                {legal.email}
              </a>{" "}
              and we will respond as soon as we reasonably can.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
