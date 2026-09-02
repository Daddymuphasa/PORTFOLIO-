import Link from "next/link";

const platforms = [
  ["Spotify", "Listen to Chaos & Order", "https://open.spotify.com/album/6TtVMpCAZbdrjrKe5hhyxI?si=8VEhOoJ4TiWmt1bU5-DzrA", "spotify"],
  ["YouTube Music", "Listen to Chaos & Order", "https://music.youtube.com/watch?v=Hr0AoDjma5E&si=2IZEILtYLBU5KFTS", "youtube"],
  ["Audiomack", "Listen to Chaos & Order", "https://audiomack.com/daddy-muphasa/song/chaosandor", "audiomack"],
  ["Boomplay", "Listen to Chaos & Order", "https://www.boomplay.com/songs/EQtA6zEPu6jy75V_n3Io9fZk?srModel=COPYLINK&srList=WEB&share_content=music&share_channel=copylink&share_platform=web", "boomplay"],
];
const socials = [["TikTok profile", "https://www.tiktok.com/@daddy_muphasa?is_from_webapp=1&sender_device=pc"], ["Use the sound on TikTok", "https://vt.tiktok.com/ZS9Bn6rx4UhS8-egAIy/"], ["Instagram", "https://www.instagram.com/daddy_muphasa?utm_medium=copy_link"], ["X / Twitter", "https://x.com/daddy_muphasa"]];

export default function MusicPage() {
  return <main className="music-page">
    <header className="music-nav"><Link href="/" className="music-mark"><span>DM</span> PAPAGEDON</Link><Link href="/portfolio">PORTFOLIO ↗</Link></header>
    <div className="music-grid" aria-hidden />
    <section className="music-release">
      <div className="release-cover"><img src="/chaos-and-order.webp" alt="Chaos & Order cover art" /></div>
      <div className="release-info"><p className="release-kicker">DADDY MUPHASA · OUT NOW</p><h1>CHAOS<br /><em>&amp;</em> ORDER</h1><p className="release-description">peace be still <strong>(Mark 4:39)</strong></p>
        <p className="platforms-label">STREAM THE NEW SINGLE</p>
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
