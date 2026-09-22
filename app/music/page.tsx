import Link from "next/link";
import ReleaseComments from "@/components/music/ReleaseComments";
import AstronomySlideshow from "@/components/music/AstronomySlideshow";

const platforms = [
  ["Spotify", "Listen to Chaos & Order", "https://open.spotify.com/album/6TtVMpCAZbdrjrKe5hhyxI?si=8VEhOoJ4TiWmt1bU5-DzrA", "spotify"],
  ["YouTube Music", "Listen to Chaos & Order", "https://music.youtube.com/watch?v=Hr0AoDjma5E&si=2IZEILtYLBU5KFTS", "youtube"],
  ["Audiomack", "Listen to Chaos & Order", "https://audiomack.com/daddy-muphasa/song/chaosandor", "audiomack"],
  ["Boomplay", "Listen to Chaos & Order", "https://www.boomplay.com/songs/EQtA6zEPu6jy75V_n3Io9fZk?srModel=COPYLINK&srList=WEB&share_content=music&share_channel=copylink&share_platform=web", "boomplay"],
];
const holyCloutPlatforms = [
  ["Spotify", "Stream HOLY CLOUT", "https://open.spotify.com/track/4VblJpJMOhZoa0QorwWWkU?si=f4585149f84946f7", "spotify"],
  ["Apple Music", "Stream HOLY CLOUT", "https://music.apple.com/ng/album/holy-clout-single/6805835723", "apple"],
  ["Audiomack", "Stream HOLY CLOUT", "https://audiomack.com/daddy-muphasa/song/holyclout-mix", "audiomack"],
  ["YouTube Music", "Stream HOLY CLOUT", "https://music.youtube.com/watch?v=I7DjX3A-YFw&si=lRMw-ZcVXcb-qVYf", "youtube"],
];
const socials = [["TikTok profile", "https://www.tiktok.com/@daddy_muphasa?is_from_webapp=1&sender_device=pc"], ["Use the sound on TikTok", "https://vt.tiktok.com/ZS9Bn6rx4UhS8-egAIy/"], ["Instagram", "https://www.instagram.com/daddy_muphasa?utm_medium=copy_link"], ["X / Twitter", "https://x.com/daddy_muphasa"]];

export default function MusicPage() {
  return <main className="music-page">
    <header className="music-nav"><Link href="/" className="music-mark"><span>DM</span> PAPAGEDON</Link><span style={{ display:"flex", gap:"1.4rem" }}><Link href="/app">APP ↗</Link><Link href="/portfolio">PORTFOLIO ↗</Link></span></header>
    <div className="music-grid" aria-hidden />
    <section className="astronomy-feature" aria-labelledby="astronomy-title">
      <div className="astronomy-stars" aria-hidden />
      <AstronomySlideshow />
      <div className="astronomy-copy">
        <p className="astronomy-kicker"><span className="astronomy-dot" aria-hidden /> OUT NOW · ALL PLATFORMS</p>
        <h2 id="astronomy-title">ASTRONOMY</h2>
        <p className="astronomy-description">The re-release is coming back into orbit. A project for late nights, long distances, and anyone still searching for a signal.</p>
        <div className="astronomy-date"><span>DROPPING</span><strong>16.09.26</strong><small>ALL PLATFORMS</small></div>
        <p className="platforms-label astronomy-platform-label">STREAM ASTRONOMY</p>
        <div className="platforms astronomy-platforms"><a className="platform presave" href="https://ditto.fm/astronomy-daddy-muphasa" target="_blank" rel="noreferrer"><strong>All platforms</strong><span>Listen via Ditto Music</span><b>↗</b></a></div>
        <a href="#astronomy-comments" className="astronomy-cta">LEAVE A MESSAGE FOR THE DROP ↓</a>
      </div>
    </section>
    <ReleaseComments releaseId="astronomy" releaseTitle="Astronomy" />
    <section className="music-release">
      <div className="release-cover"><img src="/chaos-and-order.webp" alt="Chaos & Order cover art" /></div>
      <div className="release-info"><p className="release-kicker">DADDY MUPHASA · OUT NOW</p><h1>CHAOS<br /><em>&amp;</em> ORDER</h1><p className="release-description">peace be still <strong>(Mark 4:39)</strong></p>
        <p className="platforms-label">STREAM THE NEW SINGLE</p>
        <div className="platforms">{platforms.map(([name, caption, href, kind]) => <a key={name} className={`platform ${kind}`} href={href} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{caption}</span><b>↗</b></a>)}</div>
        <div className="music-socials">{socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} ↗</a>)}</div>
      </div>
    </section>
    <ReleaseComments releaseId="chaos-order" releaseTitle="Chaos & Order" />
    <section className="holy-feature" aria-labelledby="holy-feature-title">
      <div className="holy-feature-glow" aria-hidden />
      <div className="holy-feature-art group relative">
        <div aria-hidden className="absolute -inset-5 rounded-full bg-amber-300/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
        <img src="/holy-clout.jpg" alt="HOLY CLOUT cover art" className="relative aspect-square w-full border border-amber-200/40 object-cover shadow-[0_0_65px_rgba(245,181,46,.22)] transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="holy-feature-copy">
        <p className="holy-feature-kicker"><span className="holy-live-dot" aria-hidden /> DADDY MUPHASA · OUT NOW</p>
        <h2 id="holy-feature-title">HOLY<br /><em>CLOUT</em></h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300">in the beginning</p>
        <p className="mt-7 font-mono text-[9px] tracking-[.22em] text-stone-400">STREAM HOLY CLOUT</p>
        <div className="mt-2 grid max-w-xl gap-2 sm:grid-cols-2">
          {holyCloutPlatforms.map(([name, caption, href, kind]) => <a key={name} className={`platform ${kind}`} href={href} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{caption}</span><b>↗</b></a>)}
        </div>
        <a href="https://open.spotify.com/artist/1qEJkmdYVtBNlYOcUZJP7u" target="_blank" rel="noreferrer" className="mt-6 inline-flex border border-amber-200/45 px-4 py-2 font-mono text-[10px] tracking-[.16em] text-amber-100 transition hover:bg-amber-200 hover:text-stone-950">FOLLOW DADDY MUPHASA ↗</a>
      </div>
    </section>
    <ReleaseComments releaseId="holy-clout" releaseTitle="Holy Clout" />
  </main>;
}

