import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TeamGrid from "./TeamGrid";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Snatch On exists so creative work gets found, booked and paid fairly. Meet the team and the story behind the marketplace.",
};

const values = [
  {
    title: "Craft first",
    body: "We built Snatch On around portfolios, not popularity contests. The work speaks, the platform just makes it easy to say yes.",
  },
  {
    title: "No guesswork",
    body: "Real prices, real availability, real reviews. Booking a creative should feel as clear as booking a table.",
  },
  {
    title: "Fair and fast pay",
    body: "Creatives set their own rates and get paid out automatically. No chasing invoices, no 60-day terms.",
  },
  {
    title: "Human support",
    body: "Every booking is backed by a team that answers. If something goes sideways, a person helps, not a form.",
  },
];

const milestones = [
  ["2024", "Snatch On starts as a spreadsheet matching photographers with founders in Atlanta."],
  ["2025", "The first marketplace launches. 500 creatives join in the first three months."],
  ["2026", "Bookings, payments and creator dashboards come together in one platform."],
  ["Next", "New categories, new cities, and instant payouts for every creative."],
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream pt-[4.5rem]">
        <div className="container-x grid items-center gap-14 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">About us</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display mt-4 text-4xl sm:text-6xl">
                Creative work should be easy to book.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-warm">
                Snatch On started with a simple frustration: hiring a great
                photographer took eleven DMs, two ghostings and a prayer.
                Meanwhile, brilliant creatives were losing hours to admin
                instead of making things. We built the marketplace that fixes
                both sides.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop"
                alt="The Snatch On team at work"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">What we believe</span>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              Four things we refuse to compromise on
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 90}>
                <div className="card h-full p-8">
                  <h3 className="font-display text-2xl font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-stone-warm">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-shell py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">The story so far</span>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              From spreadsheet to marketplace
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {milestones.map(([year, body], i) => (
              <Reveal key={year} delay={i * 80}>
                <div className="card h-full bg-white p-7">
                  <div className="font-display text-2xl font-semibold text-ember">
                    {year}
                  </div>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-stone-warm">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">The team</span>
              <h2 className="display mt-3 text-3xl sm:text-5xl">
                Small team, big standards
              </h2>
            </div>
            <Link href="/contact" className="btn btn-ghost">
              Work with us
            </Link>
          </Reveal>
          <TeamGrid />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="display mx-auto max-w-2xl text-3xl sm:text-5xl">
              Come make something with us
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup" className="btn btn-ember">
                Join as a creative
              </Link>
              <Link href="/services" className="btn btn-ghost bg-white">
                Find a creative
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
