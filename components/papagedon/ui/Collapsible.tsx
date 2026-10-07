"use client";

/**
 * Collapsible bars for the /app overlay.
 *
 * - Desktop (a real hover pointer): opens on hover after a short delay and
 *   closes shortly after the pointer leaves, so passing over a bar doesn't
 *   flicker it open.
 * - Everywhere: click / tap / Enter on the bar pins it open; again unpins.
 * - Keyboard focus inside (and an open native <select>) keeps it open.
 * - `forceOpen` holds it open no matter what (the paid call uses this while a
 *   payment is running and while its receipt is on screen).
 */
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

const OPEN_DELAY = 140;
const CLOSE_DELAY = 260;

function useHoverCapable() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

export function Chevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`pgx-chevron ${open ? "is-open" : ""} ${className}`}>
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CollapsibleSection({
  title,
  icon,
  summary,
  aside,
  forceOpen = false,
  defaultPinned = false,
  className = "",
  tone = "default",
  children,
}: {
  title: string;
  icon?: ReactNode;
  /** One-line state shown on the bar, open or closed. */
  summary?: ReactNode;
  /** Controls on the bar itself (outside the toggle), e.g. play/pause. */
  aside?: ReactNode;
  forceOpen?: boolean;
  defaultPinned?: boolean;
  className?: string;
  tone?: "default" | "gold";
  children: ReactNode;
}) {
  const id = useId();
  const hoverCapable = useHoverCapable();
  const [pinned, setPinned] = useState(defaultPinned);
  const [hovered, setHovered] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = forceOpen || pinned || hovered || focusOpen;

  const schedule = useCallback((next: boolean, delay: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHovered(next), delay);
  }, []);
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  return (
    <section
      className={`pgx-section ${open ? "is-open" : ""} ${pinned || forceOpen ? "is-pinned" : ""} pgx-tone-${tone} ${className}`}
      onMouseEnter={hoverCapable ? () => schedule(true, OPEN_DELAY) : undefined}
      onMouseLeave={hoverCapable ? () => schedule(false, CLOSE_DELAY) : undefined}
      onFocus={(e) => {
        const t = e.target as HTMLElement;
        if (t.tagName === "SELECT" || t.matches(":focus-visible")) setFocusOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusOpen(false);
      }}
    >
      <div className="pgx-section-bar">
        <button
          type="button"
          className="pgx-section-toggle"
          aria-expanded={open}
          aria-controls={id}
          data-pg-section-toggle
          onClick={() => {
            if (forceOpen) return;
            // On a hover device the first click on a hover-opened bar pins it.
            if (hovered && !pinned) setPinned(true);
            else setPinned((p) => !p);
            setHovered(false);
          }}
          title={forceOpen ? `${title} stays open while a call is in progress` : pinned ? `Unpin ${title}` : `Pin ${title} open`}
        >
          {icon && <span className="pgx-section-icon">{icon}</span>}
          <span className="pgx-section-title">{title}</span>
          {summary !== undefined && <span className="pgx-section-summary">{summary}</span>}
          {(pinned || forceOpen) && <span className="pgx-pin" aria-label="pinned open" />}
          <Chevron open={open} />
        </button>
        {aside && <div className="pgx-section-aside">{aside}</div>}
      </div>
      <div id={id} className="pgx-collapse" data-open={open} inert={!open}>
        <div className="pgx-collapse-inner">
          <div className="pgx-section-body">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** A click-only disclosure inside a section (result JSON, identity). */
export function Disclosure({ label, meta, defaultOpen = false, children }: { label: string; meta?: ReactNode; defaultOpen?: boolean; children: ReactNode }) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`pgx-disclosure ${open ? "is-open" : ""}`}>
      <button type="button" className="pgx-disclosure-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span className="pg-label">{label}</span>
        {meta && <span className="pgx-disclosure-meta">{meta}</span>}
        <Chevron open={open} />
      </button>
      <div id={id} className="pgx-collapse" data-open={open} inert={!open}>
        <div className="pgx-collapse-inner">{children}</div>
      </div>
    </div>
  );
}
