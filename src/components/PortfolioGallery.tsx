"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import type { PortfolioItem } from "@/lib/data";

export default function PortfolioGallery({
  images,
  name,
  featured = false,
}: {
  images: PortfolioItem[];
  name: string;
  /** When true, the first image spans a 2x2 cell like an editorial spread. */
  featured?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
        {images.map((item, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`View work ${i + 1} by ${name}`}
            className={`group relative cursor-zoom-in overflow-hidden rounded-[3px] bg-cream ${
              featured && i === 0
                ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                : "aspect-square"
            }`}
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25">
              <span className="grid size-10 scale-75 place-items-center rounded-full bg-white/90 opacity-0 backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="size-4.5 text-ink" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.2-3.2M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* lightbox */}
      {index !== null && (
        <div
          className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Work by ${name}`}
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <span className="text-[0.68rem] font-medium tracking-[0.2em] uppercase">
              {name} · {index + 1} / {images.length}
            </span>
            <button
              onClick={close}
              aria-label="Close"
              className="grid size-10 place-items-center rounded-[2px] border border-white/20 transition-colors hover:border-white"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* image */}
          <div
            className="relative mx-4 mb-4 flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].src}
              alt={images[index].caption}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />

            {/* arrows */}
            <button
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-1 grid size-11 -translate-y-1/2 place-items-center rounded-[2px] bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-ink sm:left-3"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded-[2px] bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-ink sm:right-3"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* caption */}
          <p
            className="px-6 pb-4 text-center text-sm text-white/80"
            onClick={(e) => e.stopPropagation()}
          >
            {images[index].caption}
          </p>

          {/* thumbnails */}
          <div
            className="flex justify-center gap-2 px-4 pb-5"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((item, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`relative size-12 shrink-0 overflow-hidden rounded-[2px] transition-opacity sm:size-14 ${
                  i === index
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
