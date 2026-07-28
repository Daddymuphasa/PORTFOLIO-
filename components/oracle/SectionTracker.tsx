"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useOracle } from "./OracleContext";

/**
 * Wraps a content section and reports it as "active" to the Oracle when its
 * middle crosses the viewport centre. The tight top/bottom rootMargin means
 * only one section is active at a time, giving a crisp hand-off as you scroll.
 */
export default function SectionTracker({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { setActive } = useOracle();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // A near-zero-height band pinned to the viewport centre: a section is
    // "active" while it straddles the centre line, so exactly one wins even
    // during fast scrolling.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(index);
      },
      { rootMargin: "-50% 0px -49% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, setActive]);

  return <div ref={ref}>{children}</div>;
}
