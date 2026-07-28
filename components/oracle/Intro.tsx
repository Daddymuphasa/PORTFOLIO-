"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Opening statement — the neutral state of the Oracle. Founder first.
 */
export default function Intro() {
  return (
    <section id="top" className="flex min-h-[100svh] flex-col justify-center py-28">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="eyebrow text-accent">{profile.title}</span>
          <span className="h-3 w-px bg-line" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-subtle">
            {profile.location}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-heading text-[15vw] font-semibold leading-[0.92] tracking-tightest text-foreground sm:text-6xl xl:text-7xl"
        >
          Daddy
          <br />
          <span className="text-accent">MUPHASA</span>
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {profile.tagline}
        </motion.p>

        <motion.p variants={item} className="mt-4 text-sm font-medium tracking-wide text-foreground/70">
          {profile.secondary}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-soft"
          >
            View work
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#contact"
            className="glass inline-flex items-center rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/30"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
