"use client";

import { motion } from "framer-motion";
import { oracleSections } from "@/lib/data";
import { useOracle } from "./OracleContext";

const spring = { type: "spring" as const, stiffness: 90, damping: 20, mass: 0.9 };

/* ------------------------------------------------------------------ */
/*  A single panel in the ring — a clean, minimal label card.         */
/* ------------------------------------------------------------------ */
function Panel({
  panel,
  active,
  neutral,
}: {
  panel: (typeof oracleSections)[number];
  active: boolean;
  neutral: boolean;
}) {
  return (
    <motion.a
      href={`#${panel.id}`}
      className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${panel.x}%`, top: `${panel.y}%` }}
      initial={false}
      animate={{
        scale: active ? 1.06 : neutral ? 0.96 : 0.88,
        opacity: active ? 1 : neutral ? 0.66 : 0.34,
      }}
      transition={spring}
    >
      <div
        className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 shadow-[inset_0_1px_0_rgba(232,230,221,0.1)] backdrop-blur-md backdrop-saturate-150 transition-colors duration-500 ${
          active
            ? "border-accent/60 bg-panel/60"
            : "border-foreground/10 bg-panel/25"
        }`}
      >
        {/* active indicator rail */}
        <span
          className={`h-7 w-[2px] rounded-full transition-colors duration-500 ${
            active ? "bg-accent" : "bg-line"
          }`}
        />
        <div>
          <p
            className={`font-mono text-[8.5px] uppercase tracking-[0.18em] transition-colors duration-500 ${
              active ? "text-steel-soft" : "text-subtle"
            }`}
          >
            {panel.caption}
          </p>
          <p
            className={`font-heading text-[13px] font-medium leading-tight transition-colors duration-500 ${
              active ? "text-foreground" : "text-foreground/60"
            }`}
          >
            {panel.label}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  The Oracle stage.                                                 */
/* ------------------------------------------------------------------ */
export default function OracleScene() {
  const { active } = useOracle();
  const activePanel = oracleSections.find((p) => p.index === active);
  const look = activePanel?.look ?? 0;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ---- Nun image (turns toward the active panel) -------------- */}
      <div className="absolute inset-0" style={{ perspective: 1600 }} aria-hidden>
        <motion.div
          className="h-full w-full"
          style={{ transformOrigin: "50% 32%" }}
          initial={false}
          animate={{
            rotateY: -look * 5,
            x: look * 12,
            scale: active === 0 ? 1 : 1.015,
          }}
          transition={spring}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/oracle.webp"
            alt="Daddy MUPHASA envisioned as a digital oracle — seated with a laptop, surrounded by a ring of screens"
            className="h-full w-full select-none object-cover object-center"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* ---- Spotlight so the ring reads cleanly over the image ----- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 44% 48% at 50% 44%, transparent 0%, transparent 46%, rgba(11,17,14,0.55) 80%, rgba(11,17,14,0.85) 100%)",
        }}
      />

      {/* ---- Subtle orbital filaments (single tone, thin) ---------- */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 400 400"
        fill="none"
      >
        <g className="origin-center animate-ring-spin" style={{ transformOrigin: "200px 200px" }}>
          <ellipse cx="200" cy="204" rx="152" ry="74" stroke="#5AA98A" strokeOpacity="0.14" strokeWidth="0.6" />
          <ellipse cx="200" cy="204" rx="120" ry="56" stroke="#5AA98A" strokeOpacity="0.09" strokeWidth="0.6" strokeDasharray="1 7" />
        </g>
        <g className="origin-center animate-ring-spin-rev" style={{ transformOrigin: "200px 200px" }}>
          <ellipse cx="200" cy="200" rx="180" ry="90" stroke="#7FA1B2" strokeOpacity="0.08" strokeWidth="0.6" strokeDasharray="1 9" />
        </g>
      </svg>

      {/* ---- Connection line from laptop to the active panel -------- */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {activePanel && (
          <motion.line
            key={activePanel.id}
            x1="50"
            y1="60"
            x2={activePanel.x}
            y2={activePanel.y}
            stroke="#5AA98A"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="2 5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </svg>

      {/* ---- The ring of panels ------------------------------------ */}
      {oracleSections.map((panel) => (
        <Panel
          key={panel.id}
          panel={panel}
          active={active === panel.index}
          neutral={active === 0}
        />
      ))}

      {/* ---- Edge feathering so the scene melts into the page ------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,17,14,0.5) 0%, transparent 14%, transparent 80%, rgba(11,17,14,0.85) 100%), linear-gradient(0deg, #0b110e 0%, transparent 16%, transparent 88%, rgba(11,17,14,0.7) 100%)",
        }}
      />
    </div>
  );
}
