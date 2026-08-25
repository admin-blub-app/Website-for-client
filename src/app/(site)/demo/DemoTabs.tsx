"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Stars from "@/components/Stars";
import { getCreative } from "@/lib/data";

const demo = getCreative("amara-osei")!;

const portfolio = [
  "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
];

const reviews = [
  {
    name: "Danielle W.",
    date: "2 weeks ago",
    text: "Amara made our whole team feel comfortable in front of the camera. Headshots were delivered in 48 hours and they are stunning.",
    avatar: "https://i.pravatar.cc/80?img=9",
  },
  {
    name: "Chris O.",
    date: "1 month ago",
    text: "Booked the brand shoot for our cafe. She scouted the light beforehand and every photo looks like a magazine spread.",
    avatar: "https://i.pravatar.cc/80?img=61",
  },
];

const upcoming = [
  { client: "Loam Candle Co.", service: "Brand shoot, half day", when: "Fri, Aug 28 · 10:00 AM", price: 650, status: "Confirmed" },
  { client: "Danielle Ward", service: "Portrait session", when: "Sat, Aug 29 · 2:00 PM", price: 180, status: "Confirmed" },
  { client: "Fig & Fern Cafe", service: "Event coverage", when: "Wed, Sep 2 · 6:00 PM", price: 420, status: "Pending" },
];

const payouts = [
  { date: "Aug 21, 2026", desc: "Weekly payout", amount: 1250 },
  { date: "Aug 14, 2026", desc: "Weekly payout", amount: 830 },
  { date: "Aug 7, 2026", desc: "Weekly payout", amount: 1460 },
];

function Tabs() {
  const params = useSearchParams();
  const [view, setView] = useState<"page" | "dashboard">(
    params.get("view") === "dashboard" ? "dashboard" : "page",
  );

  return (
    <section className="bg-shell pb-20 md:pb-28">
      <div className="container-x">
        {/* switch */}
        <div className="sticky top-[4.5rem] z-30 -mx-1.5 flex justify-center py-4">
          <div className="inline-flex rounded-full border border-line bg-white p-1.5 shadow-sm">
            {(
              [
                ["page", "Creative page"],
                ["dashboard", "Creator dashboard"],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  view === v ? "bg-ink text-white" : "text-soot hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {view === "page" ? <CreativePage /> : <Dashboard />}
      </div>
    </section>
  );
}

/* ================= CREATIVE PAGE VIEW ================= */

function CreativePage() {
  return (
    <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_24rem]">
      <div className="space-y-8">
        {/* profile header */}
        <div className="card overflow-hidden bg-white">
          <div className="relative h-44 md:h-56">
            <Image
              src={demo.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <Image
                  src={demo.avatar}
                  alt={demo.name}
                  width={88}
                  height={88}
                  className="-mt-14 rounded-2xl border-4 border-white shadow-lg"
                />
                <div>
                  <h2 className="font-display text-2xl font-semibold">
                    {demo.name}
                  </h2>
                  <div className="text-sm text-stone-warm">
                    {demo.craft} · {demo.city}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Stars rating={demo.rating} />
                <span className="text-sm text-stone-warm">
                  {demo.reviews} reviews
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-2xl leading-relaxed text-soot">
              {demo.bio}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {demo.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-soot"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* portfolio */}
        <div>
          <h3 className="font-display text-xl font-semibold">Portfolio</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {portfolio.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl bg-cream"
              >
                <Image
                  src={src}
                  alt={`Portfolio piece ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* reviews */}
        <div>
          <h3 className="font-display text-xl font-semibold">
            What clients say
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <figure key={r.name} className="card bg-white p-6">
                <blockquote className="text-[0.92rem] leading-relaxed text-soot">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <Image
                    src={r.avatar}
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs text-fog">{r.date}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* booking sidebar */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="card bg-white p-6">
          <div className="text-sm font-semibold text-fog">Book a service</div>
          <div className="mt-4 space-y-3">
            {demo.services.map((s) => (
              <Link
                key={s.id}
                href={`/book/${demo.slug}?service=${s.id}`}
                className="group flex items-center justify-between rounded-xl border border-line p-4 transition-colors hover:border-ink"
              >
                <div>
                  <div className="text-[0.92rem] font-semibold">{s.name}</div>
                  <div className="text-xs text-stone-warm">{s.duration}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-semibold">
                    ${s.price}
                  </span>
                  <svg viewBox="0 0 24 24" className="size-4 text-fog transition-transform group-hover:translate-x-1" fill="none" aria-hidden>
                    <path
                      d="M5 12h14m-6-6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={`/book/${demo.slug}`}
            className="btn btn-ember mt-5 w-full"
          >
            Start a booking
          </Link>
          <p className="field-hint mt-3 text-center">
            Free cancellation up to 48 hours before.
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ================= DASHBOARD VIEW ================= */

function Dashboard() {
  return (
    <div className="mt-4 space-y-6">
      {/* welcome + stats */}
      <div className="card bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={demo.avatar}
              alt=""
              width={52}
              height={52}
              className="rounded-2xl"
            />
            <div>
              <div className="font-display text-xl font-semibold">
                Good morning, Amara
              </div>
              <div className="text-sm text-stone-warm">
                Here is how your week is going.
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-moss-soft px-4 py-2 text-xs font-semibold text-moss">
            <span className="size-2 rounded-full bg-moss" />
            Accepting bookings
          </span>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-4">
          {[
            ["Earnings this month", "$4,820", "+32%"],
            ["Bookings", "14", "+4"],
            ["Profile views", "1,382", "+18%"],
            ["Response rate", "98%", "steady"],
          ].map(([label, value, delta]) => (
            <div key={label} className="rounded-xl bg-cream p-5">
              <div className="text-xs font-medium text-stone-warm">{label}</div>
              <div className="font-display mt-1.5 text-2xl font-semibold">
                {value}
              </div>
              <div className="mt-1 text-xs font-semibold text-moss">
                {delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* bookings */}
        <div className="card bg-white p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">
              Upcoming bookings
            </h3>
            <span className="text-xs font-semibold text-ember">View all</span>
          </div>
          <div className="mt-4 divide-y divide-line">
            {upcoming.map((b) => (
              <div
                key={b.client}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div>
                  <div className="text-[0.92rem] font-semibold">{b.client}</div>
                  <div className="text-xs text-stone-warm">
                    {b.service} · {b.when}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${b.price}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase ${
                      b.status === "Confirmed"
                        ? "bg-moss-soft text-moss"
                        : "bg-ember-soft text-ember-deep"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* payouts */}
        <div className="card bg-white p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Payouts</h3>
            <span className="text-xs font-semibold text-ember">History</span>
          </div>
          <div className="mt-4 rounded-xl bg-ink p-5 text-white">
            <div className="text-xs text-white/60">Next payout, Friday</div>
            <div className="font-display mt-1 text-3xl font-semibold">
              $1,250.00
            </div>
            <div className="mt-1 text-xs text-white/60">
              To bank account ····4821
            </div>
          </div>
          <div className="mt-4 divide-y divide-line">
            {payouts.map((p) => (
              <div
                key={p.date}
                className="flex items-center justify-between py-3.5"
              >
                <div>
                  <div className="text-sm font-medium">{p.desc}</div>
                  <div className="text-xs text-fog">{p.date}</div>
                </div>
                <span className="text-sm font-semibold text-moss">
                  +${p.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* services management */}
      <div className="card bg-white p-7">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Your services</h3>
          <span className="btn btn-ghost !px-4 !py-2 text-xs">
            + Add service
          </span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {demo.services.map((s) => (
            <div key={s.id} className="rounded-xl border border-line p-5">
              <div className="flex items-start justify-between">
                <div className="text-[0.92rem] font-semibold">{s.name}</div>
                <span className="rounded-full bg-moss-soft px-2.5 py-1 text-[0.65rem] font-semibold text-moss uppercase">
                  Live
                </span>
              </div>
              <div className="mt-1 text-xs text-stone-warm">{s.duration}</div>
              <div className="font-display mt-3 text-xl font-semibold">
                ${s.price}
              </div>
              <div className="mt-3 flex gap-2 text-xs font-semibold">
                <span className="cursor-pointer text-soot hover:text-ink">
                  Edit
                </span>
                <span className="text-line">|</span>
                <span className="cursor-pointer text-soot hover:text-ink">
                  Archive
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card flex flex-wrap items-center justify-between gap-4 bg-ember-soft p-7">
        <div>
          <div className="font-display text-lg font-semibold">
            Want this dashboard for your own craft?
          </div>
          <div className="mt-1 text-sm text-stone-warm">
            Setup takes about 4 minutes. Free until your first booking.
          </div>
        </div>
        <Link href="/auth/signup" className="btn btn-ember">
          Create your page
        </Link>
      </div>
    </div>
  );
}

export default function DemoTabs() {
  return (
    <Suspense>
      <Tabs />
    </Suspense>
  );
}
