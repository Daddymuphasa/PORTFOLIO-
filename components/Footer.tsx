import { profile, nav, legal } from "@/lib/data";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-line py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <a href="/#top" className="inline-flex items-center gap-2.5">
              <BrandLogo />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.vision}
            </p>
          </div>

          {/* Quick nav — root-relative so they also work from the legal pages */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-muted">
            © {year} Daddy MUPHASA — PAPAGEDON Labs. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.pages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                {page.label}
              </a>
            ))}
            <span className="font-mono text-xs text-muted">
              {profile.location} · {profile.title}
            </span>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-subtle">
          All artwork, music, code and written content on this site are the
          intellectual property of Daddy MUPHASA / PAPAGEDON Labs and may not be
          reproduced, redistributed or used to train machine learning models without
          written permission. Projects described as in development are statements of
          intent, not offers or commitments.
        </p>
      </div>
    </footer>
  );
}
