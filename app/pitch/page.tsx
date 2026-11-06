import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/data";

const deckPath = "/papagedon-pitch-deck.pdf";
const demoUrl = "https://www.youtube.com/watch?v=sAAppjRfNwg";

export const metadata: Metadata = {
  title: "PAPAGEDON Pitch Deck: Live Media Engine & AI VJ",
  description:
    "PAPAGEDON is an AI VJ that turns your event flyer and live music into reactive visuals for churches, clubs, weddings, raves and concerts. NGN 3.6M earned and booked across five named clients and events.",
  alternates: { canonical: "/pitch" },
  openGraph: {
    title: "PAPAGEDON Pitch Deck: Media That Moves People",
    description:
      "One media engine for every live moment. NGN 3.6M earned and booked. Built in Nigeria, made to travel.",
    url: "/pitch",
    images: [{ url: "/papagedon-pitch-cover.png", width: 1287, height: 910 }],
  },
};

const steps = [
  ["01", "Identity", "A clear look people remember"],
  ["02", "Campaign", "Content that builds attention"],
  ["03", "Live media", "Screens, worship, stage, livestream"],
  ["04", "Proof", "Sponsor ready content after the moment"],
];

const tech = [
  ["Flyer to theme", "Drop in your event flyer and the engine builds the visual theme for the night from it."],
  ["Music reactive", "Live music drives the visuals in real time, so the screens move with the room."],
  ["Live in the browser", "The PAPAGEDON engine runs on the web today at papagedon.com/app."],
  ["Meta AI build", "An AI-directed build of the engine with Meta AI, live at meta.papagedon.com/meta."],
];

const deals: { client: string; tag?: string; event: string; venue?: string; date: string; amount: string }[] = [
  { client: "Amapiano District", event: "3rd Anniversary Party", venue: "Maradiva Twin Waters, Lekki, Lagos", date: "Fri 14 Nov 2025", amount: "NGN 1.3M" },
  { client: "DJ Badman", event: "Badman Experience 4.0", date: "", amount: "NGN 1M" },
  { client: "DJ Badman", event: "Trance by DJ Badman", date: "", amount: "NGN 300K" },
  { client: "DJ Badman x Gold Rhino Hotel", tag: "Upcoming / booked", event: "Scheduled event", date: "Dec 2026", amount: "NGN 500K" },
  { client: "Southeast Blockchain Games Week", event: "Event media", date: "Sep 2026", amount: "NGN 500K" },
];

const gold = "text-[#f2d98b]";
const kicker = "font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b45a]";
const h2 = "text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold uppercase leading-[0.88] tracking-[-0.055em]";
const body = "text-base leading-7 text-[#aebbb3] md:text-lg";
const primaryBtn =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#d8b45a] px-7 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#03120e] transition-transform hover:-translate-y-0.5 hover:bg-[#f2d98b] focus:outline-none focus:ring-2 focus:ring-[#f2d98b] focus:ring-offset-2 focus:ring-offset-[#03120e]";
const ghostBtn =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8b45a]/70 px-7 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f2d98b] transition-colors hover:bg-[#d8b45a]/10 focus:outline-none focus:ring-2 focus:ring-[#f2d98b] focus:ring-offset-2 focus:ring-offset-[#03120e]";
const section = "relative z-10 mx-auto w-full max-w-[1180px] px-6 md:px-8";
const card = "rounded-2xl border border-[#d8b45a]/25 bg-[#08271e]/70 p-6 backdrop-blur-sm";

export default function PitchPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03120e] text-[#f4f1e8]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_4%,rgba(216,180,90,0.16),transparent_24%),linear-gradient(170deg,#03120e_0%,#08271e_45%,#03120e_75%,#123c2d_100%)]" />
      <div className="pointer-events-none absolute -right-32 -top-48 h-[42rem] w-[42rem] rounded-full border border-[#d8b45a]/50 bg-[#d8b45a]/10" />

      <nav className="relative z-10 mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-6 md:px-8">
        <Link href="/" className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#f2d98b] transition-colors hover:text-white">
          PAPAGEDON
        </Link>
        <span className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#aebbb3]">
          <Link href="/app" className="transition-colors hover:text-[#f2d98b]">App ↗</Link>
          <span className="hidden sm:inline">Pitch Deck 2026</span>
        </span>
      </nav>

      {/* 1. Hero */}
      <section className={`${section} grid gap-12 pb-20 pt-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20 lg:pb-28 lg:pt-14`}>
        <div>
          <p className="mb-6 inline-flex rounded-full bg-[#d8b45a] px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#03120e]">
            Nigeria launch&nbsp;&nbsp; Global vision
          </p>
          <h1 className="max-w-3xl text-[clamp(3.6rem,8vw,7.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.065em]">
            Media that
            <br />
            moves people.
          </h1>
          <div className="my-8 h-1 w-24 bg-[#d8b45a]" />
          <p className="max-w-xl text-lg leading-8 text-[#f4f1e8] md:text-xl">
            PAPAGEDON is an AI VJ that turns your event flyer and live music into reactive visuals for churches, clubs, weddings, raves and concerts.
          </p>
          <p className="mt-4 max-w-xl text-sm uppercase tracking-[0.18em] text-[#aebbb3]">Events. Brands. Artists. Churches.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={deckPath} download="PAPAGEDON-Pitch-Deck.pdf" className={primaryBtn}>Download pitch deck</a>
            <Link href="/app" className={ghostBtn}>Try the app</Link>
            <a href={demoUrl} target="_blank" rel="noreferrer" className={ghostBtn}>Watch demo ↗</a>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 border-t border-[#d8b45a]/20 pt-7">
            <div>
              <strong className={`block text-3xl font-bold ${gold}`}>NGN 3.6M</strong>
              <span className="mt-1 block text-sm text-[#aebbb3]">Earned &amp; booked</span>
            </div>
            <div>
              <strong className={`block text-3xl font-bold ${gold}`}>5 events</strong>
              <span className="mt-1 block text-sm text-[#aebbb3]">Named clients. Four paid, one booked.</span>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="absolute -inset-5 rounded-[2rem] bg-[#d8b45a]/10 blur-2xl" />
          <a href={deckPath} target="_blank" rel="noreferrer" className="relative block overflow-hidden rounded-2xl border border-[#d8b45a]/45 bg-[#08271e] p-2 shadow-[0_32px_90px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-1">
            <Image src="/papagedon-pitch-cover.png" alt="Cover of the PAPAGEDON pitch deck: Media That Moves People" width={1287} height={910} priority className="h-auto w-full rounded-xl" />
          </a>
          <a href={deckPath} target="_blank" rel="noreferrer" className="mt-4 block text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#aebbb3] hover:text-[#f2d98b]">View deck online ↗</a>
        </div>
      </section>

      {/* 2. Proposition + opportunity */}
      <section className={`${section} grid gap-6 border-t border-[#d8b45a]/15 py-20 lg:grid-cols-2 lg:py-28`}>
        <div className="lg:pr-10">
          <p className={kicker}>The proposition</p>
          <h2 className={`${h2} mt-5`}>One media engine.<br /><span className={gold}>Every live moment.</span></h2>
          <p className={`${body} mt-7 max-w-xl`}>PAPAGEDON makes events, brands, artists, and churches look credible before the crowd arrives.</p>
          <p className={`${body} mt-4 max-w-xl`}>We shape the identity, campaign, screens, livestream, content, and sponsor presentation as one clear system.</p>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2d98b]">Built in Nigeria · Made to travel</p>
        </div>
        <div className={`${card} self-start p-8 md:p-10`}>
          <p className={kicker}>The opportunity</p>
          <h3 className="mt-5 text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">Good experiences lose value when the media feels small.</h3>
          <p className={`${body} mt-6`}>Weak presentation reduces trust, ticket sales, sponsor interest, online reach, and the perceived quality of the experience.</p>
          <p className="mt-4 text-base leading-7 text-[#f4f1e8]">PAPAGEDON closes that gap with one sharp visual standard.</p>
        </div>
      </section>

      {/* How it works */}
      <section className={`${section} py-16 lg:py-24`}>
        <p className={kicker}>How it works</p>
        <h2 className={`${h2} mt-5`}>Plug in.<br /><span className={gold}>Look world class.</span></h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, title, text]) => (
            <div key={n} className={card}>
              <span className="font-mono text-sm font-bold text-[#d8b45a]">{n}</span>
              <h3 className="mt-6 text-xl font-bold uppercase tracking-[-0.03em]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#aebbb3]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Church media */}
      <section className={`${section} py-16 lg:py-24`}>
        <div className="grid gap-10 rounded-3xl border border-[#d8b45a]/30 bg-[linear-gradient(120deg,rgba(216,180,90,0.12),rgba(8,39,30,0.6)_60%)] p-8 md:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className={kicker}>Church media</p>
            <h2 className={`${h2} mt-5`}>Praise and worship.<br /><span className={gold}>Now visually aligned.</span></h2>
          </div>
          <div>
            <p className={body}>PAPAGEDON plugs into the existing church media team. No complicated rebuild. No heavy learning curve.</p>
            <p className={`${body} mt-4`}>Clean worship screens. Service visuals. Livestream graphics. Event campaigns. Fast content for every important moment.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Easy to plug in", "Simple to run", "Built for worship"].map((t) => (
                <span key={t} className="rounded-full border border-[#d8b45a]/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#f2d98b]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI VJ tech */}
      <section className={`${section} py-16 lg:py-24`}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={kicker}>The tech · AI VJ</p>
            <h2 className={`${h2} mt-5`}>Your flyer.<br />Your music.<br /><span className={gold}>Live visuals.</span></h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/app" className={primaryBtn}>Try papagedon.com/app</Link>
              <a href="https://meta.papagedon.com/meta" target="_blank" rel="noreferrer" className={ghostBtn}>Meta AI build ↗</a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {tech.map(([title, text]) => (
              <div key={title} className={card}>
                <span className="block h-1 w-10 bg-[#d8b45a]" />
                <h3 className="mt-5 text-lg font-bold uppercase tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#aebbb3]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Traction */}
      <section className={`${section} py-16 lg:py-24`}>
        <p className={kicker}>Paid proof · Commercial proof</p>
        <h2 className={`${h2} mt-5`}>NGN 3.6M<br /><span className={gold}>earned &amp; booked.</span></h2>
        <p className={`${body} mt-6 max-w-2xl`}>Real work. Real clients. Live culture packaged to sell attention, tickets, tables, and sponsor confidence. Five named clients and events. Four paid, one booked.</p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#d8b45a]/30 bg-[#08271e]/70">
          <div className="hidden grid-cols-[1.2fr_1.4fr_0.8fr_0.7fr] gap-4 border-b border-[#d8b45a]/25 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d8b45a] md:grid">
            <span>Client</span><span>Event</span><span>Date</span><span className="text-right">Amount</span>
          </div>
          {deals.map((d) => (
            <div key={d.client + d.event} className="grid gap-1 border-b border-[#d8b45a]/10 px-6 py-5 md:grid-cols-[1.2fr_1.4fr_0.8fr_0.7fr] md:items-center md:gap-4">
              <div>
                <strong className="text-base font-bold">{d.client}</strong>
                {d.tag && <span className="mt-1 block w-fit rounded-full bg-[#d8b45a] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#03120e]">{d.tag}</span>}
              </div>
              <div className="text-sm text-[#f4f1e8]">
                {d.event}
                {d.venue && <span className="block text-xs text-[#aebbb3]">{d.venue}</span>}
              </div>
              <div className="font-mono text-xs text-[#aebbb3]">{d.date}</div>
              <div className={`text-lg font-bold md:text-right ${gold}`}>{d.amount}</div>
            </div>
          ))}
          <div className="flex flex-col gap-2 bg-[#d8b45a]/10 px-6 py-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d8b45a]">Total</span>
              <p className="mt-1 text-sm text-[#aebbb3]">NGN 3.1M paid · NGN 500K booked</p>
            </div>
            <strong className={`text-4xl font-bold tracking-[-0.04em] ${gold}`}>NGN 3.6M</strong>
          </div>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2d98b]">Nigeria first. Africa next. Global by design.</p>
      </section>

      {/* 5. The ask */}
      <section className={`${section} pb-24 pt-16 lg:pb-32 lg:pt-24`}>
        <div className="relative overflow-hidden rounded-3xl border border-[#d8b45a]/50 bg-[#08271e] p-8 shadow-[0_32px_90px_rgba(0,0,0,0.55)] md:p-14">
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full border border-[#d8b45a]/40 bg-[#d8b45a]/10" />
          <p className={`${kicker} relative`}>The next move</p>
          <h2 className={`${h2} relative mt-5 max-w-3xl`}>Build the media<br /><span className={gold}>engine with us.</span></h2>
          <p className={`${body} relative mt-7 max-w-xl`}>More clients. Bigger campaigns. Stronger systems. One Nigerian launch with global potential.</p>
          <div className="relative mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={deckPath} download="PAPAGEDON-Pitch-Deck.pdf" className={primaryBtn}>Download pitch deck</a>
            <Link href="/app" className={ghostBtn}>Try the app</Link>
            <a href={demoUrl} target="_blank" rel="noreferrer" className={ghostBtn}>Watch demo ↗</a>
            <a href={`mailto:${contact.email}`} className={ghostBtn}>Contact us</a>
          </div>
          <p className="relative mt-6 font-mono text-xs text-[#aebbb3]">{contact.email}</p>
        </div>
      </section>
    </main>
  );
}
