import type { Metadata } from "next";
import PapagedonWorld from "@/components/app/PapagedonWorld";

export const metadata: Metadata = {
  title: "APP",
  description:
    "PAPAGEDON turns music into a world you can walk into. Play a song in the browser.",
};

export default function AppPage() {
  return <PapagedonWorld />;
}
