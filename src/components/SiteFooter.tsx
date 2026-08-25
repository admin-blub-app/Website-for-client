import Link from "next/link";
import Logo from "./Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/services", label: "All services" },
      { href: "/services/category-1", label: "Photography & Video" },
      { href: "/services/category-2", label: "Design & Branding" },
      { href: "/demo", label: "Live demo" },
    ],
  },
  {
    title: "For creatives",
    links: [
      { href: "/auth/signup", label: "Create your page" },
      { href: "/auth/login", label: "Creator login" },
      { href: "/demo", label: "See a creator dashboard" },
      { href: "/contact", label: "Talk to us" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              The marketplace where creatives get discovered, booked and paid.
              Find your creative, book in minutes, pay securely.
            </p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "X", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-[2px] border border-white/15 px-4 py-2.5 text-[0.65rem] font-medium tracking-[0.18em] text-white/70 uppercase transition-colors hover:border-white/40 hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[0.9rem] text-white/70 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[0.8rem] text-white/40 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Snatch On, Inc. All rights reserved.
          </span>
          <span className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white/70">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/70">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
