import type { Metadata } from "next";
import AeiStage from "@/components/aei/AeiStage";

export const metadata: Metadata = {
  title: "AEI",
  description:
    "Audio Experience Intelligence. A director generates immersive visuals for live music from a theme pack and the music being played.",
};

export default function AeiPage() {
  return <AeiStage />;
}
