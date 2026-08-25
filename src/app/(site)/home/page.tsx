import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SearchBar from "@/components/SearchBar";
import CreativeCard from "@/components/CreativeCard";
import { categories, comingSoon, creatives, testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Snatch On | Book brilliant creatives",
  description:
    "Find photographers, designers and creatives near you. Compare portfolios and prices, book a real slot and pay securely. Snatch On is where creative work gets booked.",
};

const marquee = [
  "Portrait photography",
  "Brand identity",
  "Wedding films",
  "Product shoots",
  "Illustration",
  "Social kits",
  "Murals",
  "Event coverage",
  "Packaging",
  "Drone & aerial",
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream pt-[4.5rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-ember/10 blur-3xl"
        />
        <div className="container-x grid items-center gap-14 pt-14 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <span className="eyebrow">The creative marketplace</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display mt-4 text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
                Book brilliant creatives.
                <br />
                <span className="text-ember">In minutes.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-warm">
                Photographers, designers, filmmakers and more. Compare real
                portfolios and transparent prices, book an actual slot, and pay
                securely. No DMs, no ghosting, no guesswork.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-9 max-w-2xl">
              <SearchBar />
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[0.8rem]">
                <span className="text-fog">Popular:</span>
                {["Photographer", "Logo designer", "Videographer", "Illustrator"].map(
                  (p) => (
                    <Link
                      key={p}
                      href={`/services?q=${encodeURIComponent(p)}`}
                      className="rounded-full border border-line bg-white px-3.5 py-1.5 font-medium text-soot transition-colors hover:border-ink"
                    >
                      {p}
                    </Link>
                  ),
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop"
                alt="A photographer at work"
                fill
                priority
                sizes="(max-width: 1024px) 0px, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-10 w-64 rounded-2xl border border-line bg-white p-4 shadow-[0_24px_60px_-20px_rgb(23_20_14/0.25)]">
              <div className="flex items-center gap-3">
                <Image
                  src="https://i.pravatar.cc/96?img=47"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="text-sm font-semibold">Amara Osei</div>
                  <div className="text-xs text-stone-warm">
                    Portrait session, 1 hr
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-moss-soft px-3 py-2">
                <span className="text-xs font-semibold text-moss">
                  Booking confirmed
                </span>
                <span className="text-xs text-moss/70">Fri, 10:00 AM</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* marquee */}
        <div className="marquee-mask hairline overflow-hidden bg-white py-4">
          <div className="flex w-max animate-[marquee_36s_linear_infinite] gap-10 whitespace-nowrap">
            {[...marquee, ...marquee].map((m, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 text-sm font-medium text-fog"
              >
                <span className="size-1.5 rounded-full bg-ember/50" />
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Browse by craft</span>
              <h2 className="display mt-3 text-3xl sm:text-5xl">
                Whatever you are making,
                <br />
                someone here makes it better.
              </h2>
            </div>
            <Link href="/services" className="btn btn-ghost">
              Explore all services
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 100}>
                <Link
                  href={`/services/${cat.slug}`}
                  className="group relative block aspect-[16/11] overflow-hidden rounded-[1.75rem]"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="text-xs font-semibold tracking-[0.14em] text-white/70 uppercase">
                      {cat.tagline}
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                        {cat.name}
                      </h3>
                      <span className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:bg-ember">
                        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
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
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {comingSoon.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
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

      {/* ============ FEATURED CREATIVES ============ */}
      <section className="bg-shell py-20 md:py-28">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Featured this week</span>
              <h2 className="display mt-3 text-3xl sm:text-5xl">
                Creatives clients keep rebooking
              </h2>
            </div>
            <Link href="/services" className="btn btn-ghost">
              See everyone
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creatives.slice(0, 6).map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 90}>
                <CreativeCard creative={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              From idea to booked in three steps
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Discover",
                body: "Search by craft, style, budget or city. Every profile shows real work, real reviews and real prices upfront.",
              },
              {
                n: "02",
                title: "Book a slot",
                body: "Pick a service, choose a time that actually exists in their calendar, and add your brief in one place.",
              },
              {
                n: "03",
                title: "Pay securely",
                body: "Pay through Snatch On with buyer protection. Creatives get paid out automatically when the work is done.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="card h-full p-8">
                  <div className="font-display text-4xl font-semibold text-ember">
                    {s.n}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-stone-warm">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOR CREATIVES ============ */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">For creatives</span>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              Your craft deserves better than a DM inbox.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
              Set up your creative page once. Add your services, set your
              payout, and let clients book real slots. Snatch On handles
              scheduling, payments and reminders so you can stay in the work.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "A portfolio page that sells while you sleep",
                "Set your own prices and payout schedule",
                "Bookings, briefs and payments in one dashboard",
                "Get paid out automatically after every job",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ember">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {li}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/auth/signup" className="btn btn-ember">
                Create your free page
              </Link>
              <Link href="/demo" className="btn btn-light">
                See the demo dashboard
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
                alt="A creative working with a client"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-4 rounded-2xl bg-white p-4 text-ink shadow-2xl sm:-right-8">
              <div className="text-xs font-medium text-stone-warm">
                This month
              </div>
              <div className="font-display mt-1 text-3xl font-semibold">
                $4,820
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-moss">
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                  <path
                    d="M6 15l6-6 6 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                +32% vs last month
              </div>
            </div>
          </Reveal>
        </div>

        {/* stats band */}
        <div className="container-x mt-20">
          <Reveal className="grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-4">
            {[
              ["2,400+", "Creatives onboarded"],
              ["18,000+", "Bookings completed"],
              ["4.9 / 5", "Average rating"],
              ["<24 hrs", "Median payout time"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="font-display text-3xl font-semibold sm:text-4xl">
                  {stat}
                </div>
                <div className="mt-2 text-sm text-white/50">{label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Word of mouth</span>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              People keep telling people
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="card flex h-full flex-col justify-between bg-white p-8">
                  <blockquote className="text-[1.02rem] leading-relaxed text-soot">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt=""
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-stone-warm">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-16 text-center text-white md:py-24">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-ember/20 blur-3xl"
              />
              <h2 className="display relative text-3xl sm:text-5xl">
                Ready when you are.
              </h2>
              <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/60">
                Find a creative for your next project, or put your own craft on
                the map. Either way, it takes minutes.
              </p>
              <div className="relative mt-9 flex flex-wrap justify-center gap-4">
                <Link href="/services" className="btn btn-ember">
                  Find a creative
                </Link>
                <Link href="/auth/signup" className="btn btn-light">
                  Join as a creative
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
