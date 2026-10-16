import type { Metadata } from "next";
import PapagedonApp from "@/components/papagedon/PapagedonApp";
import VisionStage from "@/components/vision/VisionStage";

export const metadata: Metadata = {
  title: "APP",
  description:
    "PAPAGEDON Vision: the camera reads the crowd with OpenCV 5, the engine hears the music, and the original PAPAGEDON visualizers react to the whole room.",
};

export default async function AppPage({ searchParams }: { searchParams: Promise<{ engine?: string }> }) {
  const { engine } = await searchParams;
  return engine === "classic" ? <PapagedonApp /> : <VisionStage />;
}
