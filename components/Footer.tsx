import Link from "next/link";
import { getAllCategories, categorySlug } from "@/lib/data";

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: "M13.5 9H16l.4-3h-2.9V4.5c0-.87.24-1.46 1.49-1.46H16.5V.3C16.13.25 14.9.15 13.46.15 10.45.15 8.4 1.98 8.4 5.34V6H5.9v3h2.5v9h3.1V9z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    path: "M9 0C6.55 0 6.24.01 5.27.06 4.3.1 3.63.26 3.05.49c-.6.24-1.1.55-1.61 1.06-.5.5-.82 1.01-1.06 1.61C.15 3.74 0 4.41-.04 5.38 0 6.35 0 6.66 0 9.11s.01 2.76.06 3.73c.04.97.2 1.64.43 2.22.24.6.55 1.1 1.06 1.61.5.5 1.01.82 1.61 1.06.58.23 1.25.39 2.22.43.97.04 1.28.05 3.73.05s2.76-.01 3.73-.06c.97-.04 1.64-.2 2.22-.43.6-.24 1.1-.55 1.61-1.06.5-.5.82-1.01 1.06-1.61.23-.58.39-1.25.43-2.22.04-.97.05-1.28.05-3.73s-.01-2.76-.06-3.73c-.04-.97-.2-1.64-.43-2.22a4.34 4.34 0 0 0-1.06-1.61A4.34 4.34 0 0 0 14.95.49c-.58-.23-1.25-.39-2.22-.43C11.76.02 11.45.01 9 .01zM9 4.38A4.62 4.62 0 1 1 9 13.6 4.62 4.62 0 0 1 9 4.38zm0 7.62a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5.88-7.8a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z",
  },
  {
    name: "X",
    href: "https://x.com",
    path: "M10.72 8.15 17.43.15h-1.6l-5.82 6.95L5.36.15H0l7.04 10.02L0 18.6h1.6l6.15-7.35 4.9 7.35h5.36zM8.54 10.28l-.71-1.02L2.16 1.34h2.45l4.58 6.56.71 1.02 5.95 8.52h-2.45z",
  },
];

export default function Footer() {
  const categories = getAllCategories();
  return (
    <footer className="relative mt-16 overflow-hidden bg-neutral-950 text-neutral-300 lg:px-8">
      {/* top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand via-brand/60 to-transparent" />

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-14">
        {/* masthead + tagline */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="font-serif text-[26px] font-black tracking-tight text-white">
              THE <span className="text-brand">BRIEFING</span>
            </Link>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/40">
              Independent reporting on business, finance, law, travel and the
              stories shaping the world.
            </p>
          </div>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-brand/60 hover:text-brand"
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 text-[13px] sm:grid-cols-4">
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              Sections
            </h4>
            <ul className="space-y-2.5">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/${categorySlug(c)}`}
                    className="text-white/60 transition-colors hover:text-brand"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-brand">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-brand">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-brand">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-brand">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-brand">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-brand">
                  Editorial Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 transition-colors hover:text-brand"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-white/10 py-6 text-[12px] text-white/35 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} The Briefing. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}