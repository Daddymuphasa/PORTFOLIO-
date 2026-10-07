import type { Metadata } from "next";
import PapagedonApp from "@/components/papagedon/PapagedonApp";
import { readIdentity } from "@/lib/aei/identity";

export const metadata: Metadata = {
  title: "APP",
  description:
    "PAPAGEDON in the browser: play a track, use the mic or share system audio, and watch the engine's visuals react. Connect a Celo wallet for paid AEI calls.",
};

// Re-check the on-chain identity owners at most every 5 minutes.
export const revalidate = 300;

export default async function AppPage() {
  const identity = await readIdentity();
  return <PapagedonApp identity={identity} />;
}
