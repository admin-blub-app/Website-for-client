"use client";

import { useEffect, useState } from "react";
import { ChainLink } from "./Logo";

/**
 * Brand splash shown on every hard page load: the wordmark settles in
 * while the chain link spins, then the whole layer fades out (pure CSS
 * timing, ~1.35s total). Client-side navigations never show it.
 */
export default function SplashScreen() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="splash pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-white"
    >
      <span className="wordmark splash-letters flex items-center text-3xl text-ink sm:text-5xl">
        <span>Snatch</span>
        <span className="w-3.5" />
        <ChainLink className="chain-spin size-[1.5em] shrink-0 -translate-y-px" />
        <span className="ml-[0.08em]">N</span>
      </span>
    </div>
  );
}
