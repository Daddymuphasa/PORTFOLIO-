"use client";

import { OracleProvider } from "./OracleContext";
import OracleScene from "./OracleScene";
import SectionTracker from "./SectionTracker";
import Intro from "./Intro";
import Music from "@/components/sections/Music";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Obased from "@/components/sections/Obased";
import Art from "@/components/sections/Art";
import Experience from "@/components/sections/Experience";
import Vision from "@/components/sections/Vision";
import Contact from "@/components/sections/Contact";

/**
 * The Oracle experience.
 * The nun scene is a PERMANENT fixed background — it never scrolls, in either
 * direction, at any size. On desktop she occupies the left band and the story
 * flows to her right; on mobile she is the full-screen backdrop and the story
 * scrolls over her behind a legibility scrim. Either way she stays put while
 * each section reports itself so she turns to the matching panel.
 */
export default function OracleLayout() {
  return (
    <OracleProvider>
      {/* Fixed background — the Oracle herself */}
      <div className="fixed left-0 top-0 z-0 h-[100svh] w-full lg:w-[47vw] xl:w-[43vw]">
        <OracleScene />
      </div>

      {/* Legibility scrim — full veil on mobile (content rides over her),
          none on desktop where the content sits to her right. */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-background/75 via-background/60 to-background/80 lg:hidden" />

      {/* The story */}
      <div className="relative z-10 lg:ml-[47vw] xl:ml-[43vw]">
        <div className="container-col">
          <SectionTracker index={0}>
            <Intro />
          </SectionTracker>
          <SectionTracker index={1}>
            <Music />
          </SectionTracker>
          <SectionTracker index={2}>
            <About />
          </SectionTracker>
          <SectionTracker index={3}>
            <Skills />
          </SectionTracker>
          <SectionTracker index={4}>
            <Projects />
          </SectionTracker>
          <SectionTracker index={5}>
            <Obased />
          </SectionTracker>
          <SectionTracker index={6}>
            <Art />
          </SectionTracker>
          <SectionTracker index={7}>
            <Experience />
          </SectionTracker>
          <SectionTracker index={8}>
            <Vision />
          </SectionTracker>
          <SectionTracker index={9}>
            <Contact />
          </SectionTracker>
        </div>
      </div>
    </OracleProvider>
  );
}
