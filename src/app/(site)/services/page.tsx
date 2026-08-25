import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { categories, comingSoon } from "@/lib/data";
import ServicesBrowser from "./ServicesBrowser";

export const metadata: Metadata = {
  title: "Explore services",
  description:
    "Browse every craft on Snatch On. Photography, video, design, branding and more, with transparent prices and real availability.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-cream pt-[4.5rem]">
        <div className="container-x py-14 md:py-20">
          <Reveal>
            <span className="eyebrow">Explore services</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">
              Every craft. One place to book it.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-lg text-stone-warm">
              Browse categories or search across every creative on the
              platform. Prices and availability are always upfront.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 90}>
                <Link
                  href={`/services/${cat.slug}`}
                  className="card card-hover group flex h-full flex-col overflow-hidden sm:flex-row"
                >
                  <div className="relative aspect-[16/9] sm:aspect-auto sm:w-2/5">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h2 className="font-display text-2xl font-semibold">
                        {cat.name}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-[0.9rem] leading-relaxed text-stone-warm">
                        {cat.description}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ember">
                      Browse {cat.name.toLowerCase()}
                      <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-1" fill="none" aria-hidden>
                        <path
                          d="M5 12h14m-6-6 6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {comingSoon.map((c, i) => (
              <Reveal key={c.name} delay={i * 50}>
                <div className="card flex items-center justify-between p-5">
                  <div>
                    <div className="text-[0.95rem] font-semibold">{c.name}</div>
                    <div className="mt-0.5 text-[0.78rem] text-stone-warm">
                      {c.note}
                    </div>
                  </div>
                  <span className="rounded-full bg-cream px-3 py-1 text-[0.68rem] font-semibold tracking-wide text-stone-warm uppercase">
                    Soon
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-shell py-16 md:py-24" id="browse">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">All creatives</span>
              <h2 className="display mt-3 text-3xl sm:text-4xl">
                Find your match
              </h2>
            </div>
          </Reveal>
          <div className="mt-8">
            <ServicesBrowser />
          </div>
        </div>
      </section>
    </>
  );
}
