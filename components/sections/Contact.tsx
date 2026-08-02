import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { contact } from "@/lib/data";

/**
 * Contact — the close. A large mailto call-to-action, then the full link set.
 */
export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-24 md:py-36">
      <SectionHeading
        index="07"
        eyebrow="Contact"
        title="Let's build something the world hasn't seen."
        lede="Open to conversations with investors, entertainment companies and strategic partners shaping what comes next."
      />

      <Reveal>
        <a
          href={`mailto:${contact.email}`}
          className="group flex flex-col gap-3 border-y border-line py-10 transition-colors hover:border-accent/40"
        >
          <span className="break-all font-heading text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
            {contact.email}
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-subtle transition-colors group-hover:text-accent">
            Send a message
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </span>
        </a>
      </Reveal>

      <div className="glass-card mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-3">
        {contact.links.map((link, i) => {
          const external = link.href.startsWith("http");
          return (
            <Reveal key={link.label} delay={0.03 * i}>
              <a
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col justify-between gap-5 bg-panel/20 p-5 transition-colors hover:bg-panel/50"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                  {link.label}
                </span>
                <span className="flex items-center justify-between gap-2 font-heading text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                  <span className="truncate">{link.value}</span>
                  <span className="shrink-0 text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
                    {external ? "↗" : "→"}
                  </span>
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
