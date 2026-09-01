import Link from "next/link";

const platforms = [
  ["Audiomack", "Chaos and Order — out now", "https://audiomack.com/daddy-muphasa/song/chaosandor", "audiomack"],
  ["Spotify", "Daddy MUPHASA profile", "https://open.spotify.com/artist/1qEJkmdYVtBNlYOcUZJP7u", "spotify"],
  ["Apple Music", "Daddy MUPHASA profile", "https://music.apple.com/ng/artist/daddy-muphasa/1479087324", "apple"],
  ["YouTube", "Daddy MUPHASA channel", "https://www.youtube.com/channel/UClKzTUNoiGXumhjuwRWW6EQ", "youtube"],
];
const socials = [["TikTok", "https://www.tiktok.com/@daddy_muphasa"], ["Instagram", "https://www.instagram.com/daddy_muphasa?utm_medium=copy_link"], ["X / Twitter", "https://x.com/daddy_muphasa"]];

export default function MusicPage() {
  return <main className="music-page">
    <header className="music-nav"><Link href="/" className="music-mark"><span>DM</span> PAPAGEDON</Link><Link href="/portfolio">PORTFOLIO ↗</Link></header>
    <div className="music-grid" aria-hidden />
    <section className="music-release">
      <div className="release-cover"><img src="/chaos-and-order.webp" alt="Chaos & Order cover art" /></div>
      <div className="release-info"><p className="release-kicker">DADDY MUPHASA</p><h1>CHAOS<br /><em>&amp;</em> ORDER</h1><p className="release-description">OUT NOW! A transmission from the space between disorder and design.</p>
        <div className="platforms">{platforms.map(([name, caption, href, kind]) => <a key={name} className={`platform ${kind}`} href={href} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{caption}</span><b>↗</b></a>)}</div>
        <div className="music-socials">{socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} ↗</a>)}</div>
      </div>
    </section>
    <section className="relative z-10 mx-auto grid max-w-5xl items-center gap-8 border-t border-amber-200/25 py-16 md:grid-cols-[220px_1fr]">
      <img src="/holy-clout.jpg" alt="HOLY CLOUT cover art" className="aspect-square w-full max-w-[220px] border border-amber-200/40 object-cover shadow-[0_0_65px_rgba(245,181,46,.22)]" />
      <div>
        <p className="font-mono text-[10px] tracking-[.24em] text-amber-200">DADDY MUPHASA · UPCOMING RELEASE</p>
        <h2 className="mt-3 font-heading text-5xl leading-none tracking-[-.06em] text-amber-200">HOLY CLOUT</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300">Drops September 4 on all major music stores. A sacred signal from Daddy MUPHASA.</p>
        <a href="https://open.spotify.com/artist/1qEJkmdYVtBNlYOcUZJP7u" target="_blank" rel="noreferrer" className="mt-6 inline-flex border border-amber-200/45 px-4 py-2 font-mono text-[10px] tracking-[.16em] text-amber-100 transition hover:bg-amber-200 hover:text-stone-950">FOLLOW DADDY MUPHASA ↗</a>
      </div>
    </section>
  </main>;
}
