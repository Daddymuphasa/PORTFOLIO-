import { profile, nav } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-line py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-accent/30 font-heading text-sm font-bold text-accent">
                DM
              </span>
              <span className="font-heading text-sm font-medium text-foreground">
                Daddy MUPHASA
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.vision}
            </p>
          </div>

          {/* Quick nav */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-muted">
            © {year} Daddy MUPHASA — PAPAGEDON Labs. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            {profile.location} · {profile.title}
          </p>
        </div>
      </div>
    </footer>
  );
}
