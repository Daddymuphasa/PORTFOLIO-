import Link from "next/link";
import AstronomySlideshow from "@/components/music/AstronomySlideshow";
import BrandLogo from "@/components/BrandLogo";

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
const astronomyPlatforms = [
  ["Spotify", "Stream ASTRONOMY", "https://open.spotify.com/album/61o20uj4hDloJTZGRFUvcg?1011ljwEH", "spotify"],
  ["Apple Music", "Stream ASTRONOMY", "https://geo.music.apple.com/ng/album/astronomy-ep/1512705600?app=music&ls=1&ct=FFM_ff31c482646e618104722214be57e0e9&at=1001loWk", "apple"],
  ["YouTube", "Stream ASTRONOMY", "https://www.youtube.com/playlist?list=OLAK5uy_kZrEhxaNg6PDjCGn8r3ZGxnIratc6fh80&src=FFM&lid=00000000-6aa4-ef20-3000-000d0099b4cd&cid=eef267f6-3f51-5d46-a717-711ac12bcf76", "youtube"],
  ["YouTube Music", "Stream ASTRONOMY", "https://music.youtube.com/playlist?list=OLAK5uy_kZrEhxaNg6PDjCGn8r3ZGxnIratc6fh80&src=FFM&lid=00000000-6aa4-ef20-3000-000d0099b4cd&cid=eef267f6-3f51-5d46-a717-711ac12bcf76", "youtube"],
  ["iTunes", "Download ASTRONOMY", "https://geo.itunes.apple.com/ng/album/astronomy-ep/1512705600?app=itunes&ls=1&ct=FFM_4976f3c811be619ca8cb15daf301c502&at=1001loWk", "apple"],
  ["Deezer", "Stream ASTRONOMY", "https://www.deezer.com/album/1076960472", "deezer"],
  ["TIDAL", "Stream ASTRONOMY", "https://www.tidal.com/album/560625566", "tidal"],
  ["SoundCloud", "Stream ASTRONOMY", "https://soundcloud.com/daddymuphasa-music/sets/astronomy-135858572", "soundcloud"],
  ["Amazon Music", "Stream ASTRONOMY", "https://music.amazon.com/albums/B0HJLKVJW6", "amazon"],
  ["KKBOX", "Stream ASTRONOMY", "https://www.kkbox.com/tw/tc/album/GtPr-0j-Pnece9TZff", "kkbox"],
  ["iHeartRadio", "Play ASTRONOMY", "https://www.iheart.com/artist/34081444/albums/107209217/", "iheartradio"],
];
const socials = [["TikTok profile", "https://www.tiktok.com/@daddy_muphasa?is_from_webapp=1&sender_device=pc"], ["Use the sound on TikTok", "https://vt.tiktok.com/ZS9Bn6rx4UhS8-egAIy/"], ["Instagram", "https://www.instagram.com/daddy_muphasa?utm_medium=copy_link"], ["X / Twitter", "https://x.com/daddy_muphasa"]];

export default function MusicPage() {
  return <main className="music-page">
    <header className="music-nav"><Link href="/" className="music-mark"><BrandLogo compact /></Link><span style={{ display:"flex", gap:"1.4rem" }}><Link href="/app">APP ↗</Link><Link href="/portfolio">PORTFOLIO ↗</Link></span></header>
    <div className="music-grid" aria-hidden />
    <section className="music-release">
      <div className="release-cover matrix-panel">
        <div className="matrix-rain" aria-hidden>{Array.from({ length: 18 }, (_, index) => <span key={index}>01 ᛉ 10 ∴ 11 ◇ 00 ᚠ 01 10</span>)}</div>
        <div className="matrix-seal" aria-hidden>✦</div>
        <img src="/chaos-and-order.webp" alt="Chaos & Order cover art" />
      </div>
      <div className="release-info"><p className="release-kicker">DADDY MUPHASA · OUT NOW</p><h1>CHAOS<br /><em>&amp;</em> ORDER</h1><p className="release-description">peace be still <strong>(Mark 4:39)</strong></p>
        <p className="platforms-label">STREAM THE NEW SINGLE</p>
        <div className="platforms">{platforms.map(([name, caption, href, kind]) => <a key={name} className={`platform ${kind}`} href={href} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{caption}</span><b>↗</b></a>)}</div>
        <div className="music-socials">{socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} ↗</a>)}</div>
      </div>
    </section>
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
    <section className="astronomy-feature" aria-labelledby="astronomy-title">
      <div className="astronomy-stars" aria-hidden />
      <AstronomySlideshow />
      <div className="astronomy-copy">
        <p className="astronomy-kicker"><span className="astronomy-dot" aria-hidden /> OUT NOW · ALL PLATFORMS</p>
        <h2 id="astronomy-title">ASTRONOMY</h2>
        <p className="astronomy-description">The re-release is coming back into orbit. A project for late nights, long distances, and anyone still searching for a signal.</p>
        <div className="astronomy-date"><span>DROPPING</span><strong>16.09.26</strong><small>ALL PLATFORMS</small></div>
        <p className="platforms-label astronomy-platform-label">STREAM ASTRONOMY</p>
        <div className="platforms astronomy-platforms">{astronomyPlatforms.map(([name, caption, href, kind]) => <a key={name} className={`platform ${kind}`} href={href} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{caption}</span><b>↗</b></a>)}</div>
      </div>
    </section>
  </main>;
}

