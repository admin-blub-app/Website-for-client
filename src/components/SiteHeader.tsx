"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const nav = [
  { href: "/services", label: "Explore services" },
  { href: "/about", label: "About" },
  { href: "/demo", label: "Live demo" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.9375rem] font-medium transition-colors ${
                pathname.startsWith(item.href)
                  ? "text-ink"
                  : "text-stone-warm hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/auth/login"
            className="text-[0.9375rem] font-medium text-stone-warm transition-colors hover:text-ink"
          >
            Log in
          </Link>
          <Link href="/auth/signup" className="btn btn-primary !py-3">
            Join as a creative
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[0.95rem] font-medium text-ink hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3 px-3 pb-2">
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="btn btn-ghost flex-1"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setOpen(false)}
                className="btn btn-primary flex-1"
              >
                Join as a creative
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
