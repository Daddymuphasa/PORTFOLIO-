"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Shares the currently-active section index between the scrolling content
 * (which reports what's in view) and the sticky Oracle scene (which reacts
 * by turning the nun and lighting the matching panel).
 * 0 = neutral intro state; 1..9 = the nine ring panels.
 */
type OracleCtx = {
  active: number;
  setActive: (i: number) => void;
};

const Ctx = createContext<OracleCtx>({ active: 0, setActive: () => {} });

export function OracleProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  return <Ctx.Provider value={{ active, setActive }}>{children}</Ctx.Provider>;
}

export const useOracle = () => useContext(Ctx);
