import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "PAPAGEDON AEI Registration",
  description: "PAPAGEDON Audio Experience Intelligence agent registration.",
};

const registration = {
  type: "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
  name: "PAPAGEDON AEI",
  description: "Audio Experience Intelligence as a service by CREA8 STUDIOS (Nigeria). Agents and builders send audio and receive deterministic audio features (tempo, beats, energy, silence, spectral) and AEI Experience Signals. Pay per call in USDC or USDT on Celo via x402.",
  image: "https://www.papagedon.com/papagedon-logo.png",
  services: [
    { name: "agent", endpoint: "https://www.papagedon.com/app" },
    { name: "web", endpoint: "https://www.papagedon.com/app" },
    { name: "A2A", endpoint: "https://www.papagedon.com/app/.well-known/agent-card.json", version: "0.3.0" },
  ],
  x402Support: true,
  active: true,
  supportedTrust: ["reputation"],
};

export default function Erc4008Page() {
  const formattedRegistration = JSON.stringify(registration, null, 2);

  return <main className="min-h-screen bg-[#06130e] px-6 py-8 text-[#eaf8df] sm:px-10 lg:px-16">
    <script type="application/json" dangerouslySetInnerHTML={{ __html: formattedRegistration }} />
    <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-emerald-200/15 pb-5">
      <Link href="/" aria-label="PAPAGEDON home"><BrandLogo compact /></Link>
      <Link href="/app" className="font-mono text-[10px] tracking-[.16em] text-emerald-200 transition hover:text-white">OPEN AEI APP ↗</Link>
    </header>
    <section className="mx-auto grid max-w-6xl gap-10 py-16 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
      <div>
        <p className="font-mono text-[10px] tracking-[.24em] text-emerald-300">AGENT REGISTRATION · EIP-8004</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-.07em] sm:text-7xl">PAPAGEDON<br />AEI</h1>
        <p className="mt-7 max-w-xl text-base leading-8 text-emerald-50/70">Audio Experience Intelligence for agents and builders. Send audio, receive deterministic audio features and AEI Experience Signals.</p>
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] tracking-[.12em]">
          <span className="border border-emerald-300/35 px-3 py-2 text-emerald-200">ACTIVE</span>
          <span className="border border-emerald-300/35 px-3 py-2 text-emerald-200">x402 · CELO</span>
          <span className="border border-emerald-300/35 px-3 py-2 text-emerald-200">USDC / USDT</span>
        </div>
      </div>
      <pre className="overflow-x-auto border border-emerald-200/20 bg-black/35 p-5 font-mono text-xs leading-6 text-emerald-100/85 shadow-[0_0_80px_rgba(45,255,139,.08)] sm:p-7"><code>{formattedRegistration}</code></pre>
    </section>
  </main>;
}
