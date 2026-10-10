import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://papagedon.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/papagedon-mark.png", apple: "/papagedon-mark.png" },
  title: {
    default: "Daddy MUPHASA — Creative Technologist",
    template: "%s · Daddy MUPHASA",
  },
  description:
    "Daddy MUPHASA is a Creative Technologist and Founder of PAPAGEDON Labs, building the future of immersive entertainment through AI, games, music and digital art.",
  keywords: [
    "Daddy MUPHASA",
    "Creative Technologist",
    "PAPAGEDON Labs",
    "AI",
    "Game Development",
    "Immersive Entertainment",
    "Digital Art",
  ],
  authors: [{ name: "Daddy MUPHASA" }],
  creator: "Daddy MUPHASA",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Daddy MUPHASA — Creative Technologist",
    description:
      "Building the future of immersive entertainment through AI, games, music and digital art. Founder of PAPAGEDON Labs.",
    siteName: "Daddy MUPHASA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daddy MUPHASA — Creative Technologist",
    description:
      "Building the future of immersive entertainment. Founder of PAPAGEDON Labs.",
    creator: "@daddy_muphasa",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain bg-background text-foreground">{children}</body>
    </html>
  );
}
