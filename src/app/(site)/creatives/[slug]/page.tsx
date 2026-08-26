import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AvailabilityGrid from "@/components/AvailabilityGrid";
import PortfolioGallery from "@/components/PortfolioGallery";
import Stars from "@/components/Stars";
import {
  creatives,
  factsFor,
  getCreative,
  portfolioFor,
  reviewsFor,
} from "@/lib/data";

export function generateStaticParams() {
  return creatives.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCreative(slug);
  if (!c) return {};
  return {
    title: `${c.name} | ${c.craft}`,
    description: `${c.craft} in ${c.city}. ${c.bio}`,
  };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[0.72rem] font-semibold tracking-[0.24em] text-ink uppercase">
      {children}
    </h2>
  );
}

export default async function CreativeProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creative = getCreative(slug);
  if (!creative) notFound();

  const portfolio = portfolioFor(creative);
  const reviews = reviewsFor(creative);
  const facts = factsFor(creative);
  const firstName = creative.name.split(" ")[0];
  const others = creatives
    .filter((c) => c.category === creative.category && c.slug !== creative.slug)
    .slice(0, 3);

  return (
    <div className="bg-white pt-[4.5rem]">
      {/* cover */}
      <div className="relative h-64 md:h-80">
        <Image
          src={creative.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 top-4">
          <div className="container-x">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-[2px] bg-white/90 px-3.5 py-2 text-[0.65rem] font-semibold tracking-[0.14em] text-ink uppercase backdrop-blur transition-colors hover:bg-white"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All creatives
            </Link>
          </div>
        </div>
      </div>

      <div className="container-x pb-20">
        {/* identity */}
        <div className="flex flex-wrap items-center justify-between gap-5 pt-8">
          <div className="flex items-center gap-5">
            <Image
              src={creative.avatar}
              alt={creative.name}
              width={80}
              height={80}
              className="size-20 shrink-0 rounded-[4px] object-cover"
            />
            <div>
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
                {creative.name}
              </h1>
              <div className="mt-1 text-[0.95rem] text-stone-warm">
                {creative.craft} · {creative.city}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Stars rating={creative.rating} />
              <span className="text-sm text-stone-warm">
                {creative.reviews} reviews
              </span>
            </span>
            <Link href={`/book/${creative.slug}`} className="btn btn-primary">
              Book {firstName}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem]">
          {/* main column */}
          <div>
            {/* about */}
            <SectionTitle>About {firstName}</SectionTitle>
            <p className="mt-4 max-w-2xl leading-relaxed text-soot">
              {creative.bio}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {creative.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-[2px] border border-line px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.14em] text-soot uppercase"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* quick facts */}
            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              {[
                ["Responds in", facts.responseTime],
                ["On Snatch On since", facts.memberSince],
                ["Bookings completed", String(facts.completed)],
                ["Repeat clients", `${facts.repeatRate}%`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[3px] bg-cream p-4">
                  <div className="text-[0.6rem] font-medium tracking-[0.14em] text-stone-warm uppercase">
                    {label}
                  </div>
                  <div className="mt-1.5 text-lg font-medium">{value}</div>
                </div>
              ))}
            </div>

            {/* portfolio */}
            <div className="hairline mt-10 pt-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionTitle>Selected work</SectionTitle>
                <span className="text-xs text-fog">
                  Click any piece to view it full screen
                </span>
              </div>
              <div className="mt-5">
                <PortfolioGallery
                  images={portfolio}
                  name={creative.name}
                  featured
                />
              </div>
            </div>

            {/* reviews */}
            <div className="hairline mt-10 pt-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionTitle>What clients say</SectionTitle>
                <span className="flex items-center gap-2 text-sm text-stone-warm">
                  <Stars rating={creative.rating} /> · {creative.reviews}{" "}
                  verified reviews
                </span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {reviews.map((r) => (
                  <figure key={r.name} className="card flex flex-col justify-between p-6">
                    <blockquote className="text-[0.9rem] leading-relaxed text-soot">
                      “{r.text}”
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      <Image
                        src={r.avatar}
                        alt=""
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium">{r.name}</div>
                        <div className="text-xs text-fog">{r.date}</div>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* more like this */}
            {others.length > 0 && (
              <div className="hairline mt-10 pt-9">
                <SectionTitle>More creatives like {firstName}</SectionTitle>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {others.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/creatives/${c.slug}`}
                      className="card card-hover flex items-center gap-4 p-4"
                    >
                      <Image
                        src={c.avatar}
                        alt=""
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {c.name}
                        </div>
                        <div className="truncate text-xs text-stone-warm">
                          {c.craft}
                        </div>
                        <div className="mt-0.5 text-xs text-stone-warm">
                          from <span className="font-semibold text-ink">${c.from}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <SectionTitle>Availability</SectionTitle>
              <div className="mt-4">
                <AvailabilityGrid slug={creative.slug} compact />
              </div>
              <p className="field-hint mt-3 text-center">
                Pick a time to start a booking instantly.
              </p>
            </div>

            <div className="card p-6">
              <SectionTitle>Services & rates</SectionTitle>
              <div className="mt-5 space-y-2.5">
                {creative.services.map((s) => (
                  <Link
                    key={s.id}
                    href={`/book/${creative.slug}?service=${s.id}`}
                    className="group block rounded-[3px] border border-line p-4 transition-colors hover:border-ink"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-[0.92rem] font-medium">{s.name}</div>
                      <span className="text-lg font-medium">${s.price}</span>
                    </div>
                    <div className="mt-1 text-xs text-stone-warm">
                      {s.duration} · {s.description}
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/book/${creative.slug}`}
                className="btn btn-primary mt-5 w-full"
              >
                Start a booking
              </Link>
              <p className="field-hint mt-3 text-center">
                Free cancellation up to 48 hours before.
              </p>
            </div>

            <div className="rounded-[4px] bg-cream p-5 text-[0.8rem] leading-relaxed text-stone-warm">
              <span className="font-semibold text-ink">
                Payment protection.
              </span>{" "}
              Your payment is held securely and only released to {firstName}{" "}
              after your session.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
