# Daddy MUPHASA — Portfolio

A dark, editorial founder portfolio for **Daddy MUPHASA** (Adams-Okorie Testimony Oguchukwuluru) — Creative Technologist and Founder of **PAPAGEDON Labs**.

Built to impress investors, entertainment companies and strategic partners. Founder first, products second.

## The concept — "The Digital Oracle"

The hero is a fixed portrait of the founder as a digital oracle, seated amid a ring of holographic panels. She stays pinned as a permanent background (left band on desktop, full backdrop on mobile) while the story scrolls beside her. As each section enters view, its panel in the ring lights up, a connection line links her to it, and she turns toward it — a scroll-driven narrative rather than a static page.

## Stack

- **Next.js 15** (App Router, React 19)
- **React 18** + **TypeScript**
- **Tailwind CSS** — centralised design system
- **Framer Motion** — section reveals, the scroll-synced Oracle, spring-based turning
- Deployable on **Vercel** with zero config

## Design system

A restrained palette — no neon, no gold. Colour is used sparingly and with intent.

| Token             | Value        | Role                          |
| ----------------- | ------------ | ----------------------------- |
| Background        | `#0B110E`    | deep green-charcoal ground    |
| Foreground        | `#E8E6DD`    | warm ivory type               |
| Accent (green)    | `#5AA98A`    | primary — interactive / focus |
| Steel (blue-grey) | `#7FA1B2`    | balancing secondary / labels  |
| Muted             | `#8A928A`    | secondary text                |
| Subtle            | `#5C665F`    | captions / tertiary           |

Type: **Space Grotesk** (headings), **Inter** (body), **JetBrains Mono** (labels) — self-hosted at build time via `next/font` (no external requests, zero layout shift).

## PAPAGEDON Vision (OpenCV AI Competition 2026, powered by AWS)

`/app` now opens PAPAGEDON Vision: the camera reads the crowd (OpenCV 5 on AWS, or in
the browser as a fallback), the engine hears the music, and the two are fused into one
room energy that picks among the nine original PAPAGEDON visualizers. Code:
`components/vision/`, `lib/vision/`, `vision-service/`. Architecture diagram, setup,
one-command AWS deploy, evaluation, limitations and responsible use:
[`docs/VISION.md`](docs/VISION.md).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Framework preset **Next.js** is detected automatically — no environment variables required.
4. Deploy.

## Project structure

```
app/
  layout.tsx          # fonts, metadata, <html>/<body>
  page.tsx            # composition: nav · Oracle · footer
  globals.css         # base styles, tokens, utilities
components/
  Navigation.tsx      # floating glass nav + mobile menu
  Footer.tsx
  oracle/
    OracleLayout.tsx  # fixed nun scene + scrolling content column
    OracleScene.tsx   # nun image, ring of panels, filaments, turning
    OracleContext.tsx # shares the active section
    SectionTracker.tsx# reports the centred section to the scene
    Intro.tsx         # opening statement (neutral state)
  sections/
    About · Skills · Projects · Art · Experience · Vision · Contact
  ui/
    Reveal.tsx        # fade-in-on-scroll wrapper
    SectionHeading.tsx# shared eyebrow + heading rhythm
lib/
  data.ts             # all content + Oracle section map (single source of truth)
public/
  oracle.webp         # the hero portrait (optimised)
```

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts) — profile, skills, projects, experience, contact, and the `oracleSections` map that positions each panel and sets how the nun turns toward it. No component edits required.

## Accessibility & performance

- Respects `prefers-reduced-motion` (motion disables gracefully).
- The hero image is decorative and hidden from the a11y tree.
- Exactly one section is "active" at a time via an IntersectionObserver centre-line.
- Semantic landmarks, focusable links, self-hosted fonts, and an optimised WebP hero for fast, stable loads.

---

© Daddy MUPHASA — PAPAGEDON Labs.
