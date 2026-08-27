"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const code = ["01001", "{ }", "PAPAGEDON", "1110", "//", "<>", "SYSTEM", "01"];

export default function PortalHome() {
  const [side, setSide] = useState<"music" | "portfolio" | null>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const router = useRouter();

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (!swipeStart.current) return;
    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - swipeStart.current.x;
    const distanceY = touch.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(distanceX) < 70 || Math.abs(distanceX) < Math.abs(distanceY)) return;
    router.push(distanceX > 0 ? "/music" : "/portfolio");
  };

  return (
    <main className="portal" onMouseLeave={() => setSide(null)} onTouchStart={(event) => {
      const touch = event.touches[0];
      swipeStart.current = { x: touch.clientX, y: touch.clientY };
    }} onTouchEnd={handleTouchEnd}>
      <div className="portal-noise" aria-hidden />
      <div className="portal-rain" aria-hidden>
        {Array.from({ length: 25 }, (_, index) => (
          <span key={index} style={{ left: `${(index * 17 + 3) % 100}%`, animationDelay: `${-(index % 9) * 1.15}s`, animationDuration: `${7 + (index % 5)}s` }}>
            {code[index % code.length]}<br />{code[(index + 3) % code.length]}<br />{code[(index + 5) % code.length]}
          </span>
        ))}
      </div>
      <div className="portal-wordmark"><span>DM</span> PAPAGEDON</div>
      <Link href="/music" className={`portal-side portal-music ${side === "music" ? "is-active" : ""}`} onMouseEnter={() => setSide("music")}>
        <div className="portal-art" style={{ backgroundImage: "url('/music-portal.webp')" }} />
        <div className="portal-shade" />
        <div className="portal-copy"><p>01 / EGWU 🎵</p><h1>MUSIC</h1><span>Enter the soundscape <b>→</b></span></div>
      </Link>

      <Link href="/portfolio" className={`portal-side portal-work ${side === "portfolio" ? "is-active" : ""}`} onMouseEnter={() => setSide("portfolio")}>
        <div className="portal-art" style={{ backgroundImage: "url('/music-portal.png')" }} />
        <div className="portal-shade" />
        <div className="portal-copy"><p>02 / UBURU 🧠</p><h1>PORTFOLIO</h1><span>View selected work <b>→</b></span></div>
      </Link>

      <div className="portal-divider" aria-hidden><i /></div>
      <p className="portal-footer">© 2026 DADDY MUPHASA <span>•</span> EDEN 2077</p>
    </main>
  );
}
