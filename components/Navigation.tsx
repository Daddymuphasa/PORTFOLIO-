"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/data";

/**
 * Floating navigation.
 * - Transparent over the hero, condenses into a glass bar on scroll.
 * - Desktop: inline links + a green "Let's talk" CTA.
 * - Mobile: a minimal hamburger that expands to a full-screen menu.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-line py-3"
            : "border-b border-transparent py-5"
        }`}
      >
        <nav className="container-x flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Daddy MUPHASA — home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md border border-accent/30 font-heading text-sm font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-background">
              DM
            </span>
            <span className="hidden font-heading text-sm font-medium tracking-tight text-foreground sm:block">
              Daddy MUPHASA
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden rounded-full border border-accent/40 px-5 py-2 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-background lg:block"
          >
            Let&rsquo;s talk
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-foreground"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-foreground"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background/80 px-8 backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                  className="font-heading text-4xl font-medium text-foreground transition-colors hover:text-accent"
                >
                  <span className="mr-4 font-mono text-sm text-steel/70">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </div>
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 w-fit rounded-full bg-accent px-7 py-3 font-medium text-background"
            >
              Let&rsquo;s talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
