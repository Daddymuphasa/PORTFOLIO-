import Link from "next/link";

const platforms = [
  ["Pre-save", "ditto.fm/chaos-and-order-daddy-muphasa", "https://ditto.fm/chaos-and-order-daddy-muphasa", "presave"],
  ["Spotify", "Listen to Daddy MUPHASA", "https://open.spotify.com/artist/1qEJkmdYVtBNlYOcUZJP7u", "spotify"],
  ["Apple Music", "Listen to Daddy MUPHASA", "https://music.apple.com/ng/artist/daddy-muphasa/1479087324", "apple"],
  ["Audiomack", "Stream the catalogue", "https://audiomack.com/daddy-muphasa", "audiomack"],
];
const socials = [["TikTok", "https://www.tiktok.com/@daddy_muphasa"], ["Instagram", "https://www.instagram.com/daddy_muphasa?utm_medium=copy_link"], ["X / Twitter", "https://x.com/daddy_muphasa"]];

export default function MusicPage() {
  return <main className="music-page">
    <header className="music-nav"><Link href="/" className="music-mark"><span>DM</span> PAPAGEDON</Link><Link href="/portfolio">PORTFOLIO ↗</Link></header>
    <div className="music-grid" aria-hidden />
    <section className="music-release">
      <div className="release-cover"><img src="/chaos-and-order.webp" alt="Chaos & Order cover art" /></div>
      <div className="release-info"><p className="release-kicker">DADDY MUPHASA PRESENTS</p><h1>CHAOS<br /><em>&amp;</em> ORDER</h1><p className="release-description">A transmission from the space between disorder and design. The new release is arriving now.</p>
        <div className="platforms">{platforms.map(([name, caption, href, kind]) => <a key={name} className={`platform ${kind}`} href={href} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{caption}</span><b>↗</b></a>)}</div>
        <div className="music-socials">{socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} ↗</a>)}</div>
      </div>
    </section>
  </main>;
}
