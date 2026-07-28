import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Fonts are self-hosted at build time via next/font — zero layout shift,
 * no external requests, and exposed as CSS variables consumed by Tailwind.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://papagedon.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="grain bg-background text-foreground">{children}</body>
    </html>
  );
}
