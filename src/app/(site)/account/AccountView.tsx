"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Upcoming = {
  creative: string;
  avatar: string;
  service: string;
  when: string;
  where: string;
  price: number;
  status: "Confirmed" | "Pending";
};

type Past = {
  creative: string;
  avatar: string;
  service: string;
  when: string;
  price: number;
  reviewed: boolean;
};

const initialUpcoming: Upcoming[] = [
  {
    creative: "Amara Osei",
    avatar: "https://i.pravatar.cc/96?img=47",
    service: "Portrait session",
    when: "Friday, Aug 28 · 10:00 AM",
    where: "Studio, Atlanta, GA",
    price: 180,
    status: "Confirmed",
  },
  {
    creative: "Diego Ferrer",
    avatar: "https://i.pravatar.cc/96?img=12",
    service: "Logo essentials",
    when: "Kickoff call · Tue, Sep 1 · 3:00 PM",
    where: "Remote",
    price: 350,
    status: "Pending",
  },
];

const initialPast: Past[] = [
  {
    creative: "Sofia Reyes",
    avatar: "https://i.pravatar.cc/96?img=44",
    service: "Social starter kit",
    when: "Aug 12, 2026",
    price: 150,
    reviewed: true,
  },
  {
    creative: "Amara Osei",
    avatar: "https://i.pravatar.cc/96?img=47",
    service: "Event coverage",
    when: "Jul 30, 2026",
    price: 420,
    reviewed: false,
  },
  {
    creative: "Theo Brandt",
    avatar: "https://i.pravatar.cc/96?img=59",
    service: "E-commerce pack, 10 images",
    when: "Jul 18, 2026",
    price: 220,
    reviewed: true,
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[0.72rem] font-semibold tracking-[0.24em] text-ink uppercase">
      {children}
    </h2>
  );
}

export default function AccountView() {
  const [upcoming, setUpcoming] = useState(initialUpcoming);
  const [past, setPast] = useState(initialPast);
  const [managing, setManaging] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [cards, setCards] = useState([
    { label: "Visa ····4242", expires: "Expires 09/28", isDefault: true },
  ]);
  const [notice, setNotice] = useState("");

  function flash(msg: string) {
    setNotice(msg);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function cancelBooking(service: string) {
    setUpcoming((list) => list.filter((b) => b.service !== service));
    setManaging(null);
    flash(
      "Booking cancelled, free of charge. Your creative has been notified and any deposit is refunded.",
    );
  }

  function submitReview(service: string, stars: number) {
    setPast((list) =>
      list.map((b) => (b.service === service ? { ...b, reviewed: true } : b)),
    );
    setReviewing(null);
    flash(`Thanks! Your ${stars}-star review has been published.`);
  }

  function addCard() {
    setCards((list) => [
      ...list,
      {
        label: "Mastercard ····1881",
        expires: "Expires 03/29",
        isDefault: false,
      },
    ]);
    flash("Payment method added.");
  }

  return (
    <div className="bg-white pt-[4.5rem]">
      <div className="container-x py-12 md:py-16">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Image
              src="https://i.pravatar.cc/96?img=5"
              alt=""
              width={60}
              height={60}
              className="rounded-[3px]"
            />
            <div>
              <span className="eyebrow">Client area</span>
              <h1 className="mt-1 text-2xl font-medium tracking-tight">
                Welcome back, Rachel
              </h1>
            </div>
          </div>
          <span className="rounded-[2px] bg-cream px-3.5 py-2 text-[0.62rem] font-semibold tracking-[0.16em] text-stone-warm uppercase">
            Customer demo account
          </span>
        </div>

        {notice && (
          <div className="mt-6 rounded-[3px] bg-moss-soft px-4 py-3 text-[0.8rem] font-medium text-moss">
            {notice}
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div>
            {/* upcoming */}
            <SectionTitle>Upcoming bookings</SectionTitle>
            <div className="mt-4 space-y-3">
              {upcoming.length === 0 && (
                <div className="card p-8 text-center text-sm text-stone-warm">
                  No upcoming bookings.{" "}
                  <Link
                    href="/services"
                    className="font-semibold text-ink underline decoration-1 underline-offset-4"
                  >
                    Find your next creative
                  </Link>
                  .
                </div>
              )}
              {upcoming.map((b) => (
                <div key={b.service} className="card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={b.avatar}
                        alt=""
                        width={48}
                        height={48}
                        className="rounded-[3px]"
                      />
                      <div>
                        <div className="text-[0.95rem] font-medium">
                          {b.service}{" "}
                          <span className="font-normal text-stone-warm">
                            with {b.creative}
                          </span>
                        </div>
                        <div className="mt-0.5 text-xs text-stone-warm">
                          {b.when} · {b.where}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">${b.price}</span>
                      <span
                        className={`rounded-[2px] px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.12em] uppercase ${
                          b.status === "Confirmed"
                            ? "bg-moss-soft text-moss"
                            : "bg-cream text-stone-warm"
                        }`}
                      >
                        {b.status}
                      </span>
                      <button
                        onClick={() =>
                          setManaging(
                            managing === b.service ? null : b.service,
                          )
                        }
                        className="text-[0.65rem] font-semibold tracking-[0.12em] text-soot uppercase hover:text-ink"
                      >
                        {managing === b.service ? "Close" : "Manage"}
                      </button>
                    </div>
                  </div>

                  {managing === b.service && (
                    <div className="hairline mt-4 flex flex-wrap items-center gap-3 pt-4">
                      <Link
                        href="/book/amara-osei"
                        className="btn btn-ghost !px-4 !py-2.5 !text-[0.6rem]"
                      >
                        Reschedule
                      </Link>
                      <button
                        onClick={() => cancelBooking(b.service)}
                        className="btn btn-ghost !px-4 !py-2.5 !text-[0.6rem]"
                      >
                        Cancel booking
                      </button>
                      <span className="text-xs text-fog">
                        Free cancellation until 48 hours before.
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* past */}
            <div className="hairline mt-10 pt-9">
              <SectionTitle>Past bookings</SectionTitle>
              <div className="mt-4 divide-y divide-line">
                {past.map((b) => (
                  <div key={`${b.service}-${b.when}`} className="py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <Image
                          src={b.avatar}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-[3px]"
                        />
                        <div>
                          <div className="text-sm font-medium">
                            {b.service}{" "}
                            <span className="font-normal text-stone-warm">
                              with {b.creative}
                            </span>
                          </div>
                          <div className="text-xs text-fog">{b.when}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">${b.price}</span>
                        {!b.reviewed && (
                          <button
                            onClick={() =>
                              setReviewing(
                                reviewing === b.service ? null : b.service,
                              )
                            }
                            className="text-[0.65rem] font-semibold tracking-[0.12em] text-soot uppercase hover:text-ink"
                          >
                            Leave a review
                          </button>
                        )}
                        <Link
                          href="/book/amara-osei"
                          className="text-[0.65rem] font-semibold tracking-[0.12em] text-ink uppercase underline decoration-1 underline-offset-4"
                        >
                          Rebook
                        </Link>
                      </div>
                    </div>

                    {reviewing === b.service && (
                      <div className="hairline mt-4 flex items-center gap-3 pt-4">
                        <span className="text-xs text-stone-warm">
                          Tap a star to rate {b.creative.split(" ")[0]}:
                        </span>
                        <span className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              onClick={() => submitReview(b.service, n)}
                              aria-label={`${n} stars`}
                              className="text-fog transition-colors hover:text-ink"
                            >
                              <svg viewBox="0 0 20 20" className="size-5 fill-current">
                                <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6l-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6z" />
                              </svg>
                            </button>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <SectionTitle>Payment methods</SectionTitle>
              <div className="mt-4 space-y-2.5">
                {cards.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center justify-between rounded-[3px] border border-line p-4"
                  >
                    <div>
                      <div className="text-sm font-medium">{c.label}</div>
                      <div className="text-xs text-stone-warm">{c.expires}</div>
                    </div>
                    {c.isDefault && (
                      <span className="rounded-[2px] bg-cream px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-stone-warm uppercase">
                        Default
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addCard} className="btn btn-ghost mt-4 w-full">
                Add payment method
              </button>
            </div>

            <div className="card p-6">
              <SectionTitle>Settings</SectionTitle>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-stone-warm">Email</span>
                  <span className="font-medium">rachel@loamcandle.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-warm">Phone</span>
                  <span className="font-medium">(555) 210-8842</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-warm">SMS reminders</span>
                  <span className="rounded-[2px] bg-moss-soft px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-moss uppercase">
                    On
                  </span>
                </div>
              </div>
              <p className="field-hint mt-4">
                Manage notification preferences, export your data, or delete
                your account any time.
              </p>
            </div>

            <div className="rounded-[4px] bg-ink p-6 text-white">
              <div className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase">
                Book your next creative
              </div>
              <p className="mt-2 text-sm text-white/60">
                Photographers, designers, filmmakers and more, with real
                availability.
              </p>
              <Link href="/services" className="btn btn-light mt-4 w-full">
                Explore services
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
