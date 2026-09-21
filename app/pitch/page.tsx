import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const deckPath = "/papagedon-pitch-deck.pdf";

export const metadata: Metadata = {
  title: "Papagedon Pitch Deck",
  description:
    "Discover Papagedon, the Nigerian media engine built for events, brands, artists, and churches.",
  alternates: { canonical: "/pitch" },
  openGraph: {
    title: "Papagedon Pitch Deck",
    description:
      "Media that moves people. Built in Nigeria and designed for global scale.",
    url: "/pitch",
    images: [{ url: "/papagedon-pitch-cover.png", width: 1287, height: 910 }],
  },
};

export default function PitchPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03120e] text-[#f4f1e8]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(216,180,90,0.16),transparent_28%),linear-gradient(145deg,#03120e_0%,#08271e_58%,#123c2d_100%)]" />
      <div className="pointer-events-none absolute -right-32 -top-48 h-[42rem] w-[42rem] rounded-full border border-[#d8b45a]/50 bg-[#d8b45a]/10" />
      <div className="pointer-events-none absolute -bottom-72 right-[-10rem] h-[42rem] w-[42rem] rounded-full border border-[#d8b45a]/30 bg-[#d8b45a]/10" />

      <nav className="relative z-10 mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-6 md:px-8">
        <Link
          href="/"
          className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#f2d98b] transition-colors hover:text-white"
        >
          Papagedon
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#aebbb3]">
          Pitch Deck 2026
        </span>
      </nav>

      <section className="relative z-10 mx-auto grid w-full max-w-[1180px] gap-12 px-6 pb-16 pt-8 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20 lg:pb-24 lg:pt-14">
        <div>
          <p className="mb-6 inline-flex rounded-full bg-[#d8b45a] px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#03120e]">
            Nigeria launch&nbsp;&nbsp; Global vision
          </p>

          <h1 className="max-w-3xl text-[clamp(3.8rem,8vw,7.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.065em]">
            Media that
            <br />
            moves people.
          </h1>

          <div className="my-8 h-1 w-24 bg-[#d8b45a]" />

          <p className="max-w-xl text-base leading-7 text-[#aebbb3] md:text-lg">
            Papagedon is a media and experience engine for events, brands,
            artists, and churches. Built in Nigeria. Designed to travel.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={deckPath}
              download="Papagedon-Pitch-Deck.pdf"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d8b45a] px-7 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#03120e] transition-transform hover:-translate-y-0.5 hover:bg-[#f2d98b] focus:outline-none focus:ring-2 focus:ring-[#f2d98b] focus:ring-offset-2 focus:ring-offset-[#03120e]"
            >
              Download pitch deck
            </a>
            <a
              href={deckPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8b45a]/70 px-7 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f2d98b] transition-colors hover:bg-[#d8b45a]/10 focus:outline-none focus:ring-2 focus:ring-[#f2d98b] focus:ring-offset-2 focus:ring-offset-[#03120e]"
            >
              View online
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 border-t border-[#d8b45a]/20 pt-7">
            <div>
              <strong className="block text-3xl font-bold text-[#f2d98b]">
                NGN 2.3M
              </strong>
              <span className="mt-1 block text-sm text-[#aebbb3]">
                Client revenue earned
              </span>
            </div>
            <div>
              <strong className="block text-3xl font-bold text-[#f2d98b]">
                2 clients
              </strong>
              <span className="mt-1 block text-sm text-[#aebbb3]">
                Paid engagements in Nigeria
              </span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="absolute -inset-5 rounded-[2rem] bg-[#d8b45a]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-[#d8b45a]/45 bg-[#08271e] p-2 shadow-[0_32px_90px_rgba(0,0,0,0.55)]">
            <Image
              src="/papagedon-pitch-cover.png"
              alt="Cover of the Papagedon media and experience pitch deck"
              width={1287}
              height={910}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
