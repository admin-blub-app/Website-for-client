"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CreativeCard from "@/components/CreativeCard";
import { creatives, getCreative } from "@/lib/data";

/* ------------------------------------------------------------------ */

type Upcoming = {
  creative: string;
  slug: string;
  avatar: string;
  service: string;
  when: string;
  where: string;
  price: number;
  status: "Confirmed" | "Pending";
};

type Past = {
  creative: string;
  slug: string;
  avatar: string;
  service: string;
  when: string;
  price: number;
  reviewed: boolean;
};

const initialUpcoming: Upcoming[] = [
  {
    creative: "Amara Osei",
    slug: "amara-osei",
    avatar: "https://i.pravatar.cc/96?img=47",
    service: "Portrait session",
    when: "Friday, Aug 28 · 10:00 AM",
    where: "Studio, Atlanta, GA",
    price: 180,
    status: "Confirmed",
  },
  {
    creative: "Diego Ferrer",
    slug: "diego-ferrer",
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
    slug: "sofia-reyes",
    avatar: "https://i.pravatar.cc/96?img=44",
    service: "Social starter kit",
    when: "Aug 12, 2026",
    price: 150,
    reviewed: true,
  },
  {
    creative: "Amara Osei",
    slug: "amara-osei",
    avatar: "https://i.pravatar.cc/96?img=47",
    service: "Event coverage",
    when: "Jul 30, 2026",
    price: 420,
    reviewed: false,
  },
  {
    creative: "Theo Brandt",
    slug: "theo-brandt",
    avatar: "https://i.pravatar.cc/96?img=59",
    service: "E-commerce pack, 10 images",
    when: "Jul 18, 2026",
    price: 220,
    reviewed: true,
  },
];

const SECTIONS = ["Overview", "Bookings", "Favorites", "Payments", "Settings"] as const;
type Section = (typeof SECTIONS)[number];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[0.72rem] font-semibold tracking-[0.24em] text-ink uppercase">
      {children}
    </h2>
  );
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? "bg-ink" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
          on ? "left-[1.375rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */

export default function AccountView() {
  const [section, setSection] = useState<Section>("Overview");
  const [upcoming, setUpcoming] = useState(initialUpcoming);
  const [past, setPast] = useState(initialPast);
  const [managing, setManaging] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([
    "amara-osei",
    "diego-ferrer",
    "zara-malik",
  ]);
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

  const totalSpent = past.reduce((sum, b) => sum + b.price, 0);

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
          <Link href="/services" className="btn btn-primary">
            Find a creative
          </Link>
        </div>

        {/* section nav */}
        <div className="mt-8 flex gap-1 overflow-x-auto border-b border-line pb-px">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`shrink-0 border-b-2 px-4 py-3 text-[0.68rem] font-semibold tracking-[0.16em] uppercase transition-colors ${
                section === s
                  ? "border-ink text-ink"
                  : "border-transparent text-stone-warm hover:text-ink"
              }`}
            >
              {s}
              {s === "Favorites" && favorites.length > 0 && (
                <span className="ml-1.5 text-fog">({favorites.length})</span>
              )}
            </button>
          ))}
        </div>

        {notice && (
          <div className="mt-5 rounded-[3px] bg-moss-soft px-4 py-3 text-[0.8rem] font-medium text-moss">
            {notice}
          </div>
        )}

        <div className="mt-6 space-y-5">
          {/* ================= OVERVIEW ================= */}
          {section === "Overview" && (
            <>
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  ["Upcoming bookings", String(upcoming.length)],
                  ["Favorite creatives", String(favorites.length)],
                  ["Completed sessions", String(past.length)],
                  ["Spent on Snatch On", `$${totalSpent.toLocaleString()}`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[3px] bg-cream p-5">
                    <div className="text-[0.65rem] font-medium tracking-[0.14em] text-stone-warm uppercase">
                      {label}
                    </div>
                    <div className="mt-2 text-2xl font-medium">{value}</div>
                  </div>
                ))}
              </div>

              {upcoming[0] ? (
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-[4px] bg-ink p-7 text-white">
                  <div className="flex items-center gap-4">
                    <Image
                      src={upcoming[0].avatar}
                      alt=""
                      width={52}
                      height={52}
                      className="rounded-[3px]"
                    />
                    <div>
                      <div className="text-[0.65rem] tracking-[0.18em] text-white/50 uppercase">
                        Your next session
                      </div>
                      <div className="mt-1 text-lg font-medium tracking-tight">
                        {upcoming[0].service} with {upcoming[0].creative}
                      </div>
                      <div className="mt-0.5 text-sm text-white/60">
                        {upcoming[0].when} · {upcoming[0].where}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSection("Bookings")}
                    className="btn btn-light"
                  >
                    Manage booking
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-[4px] bg-ink p-7 text-white">
                  <div>
                    <div className="text-lg font-medium tracking-tight">
                      Nothing booked yet.
                    </div>
                    <div className="mt-1 text-sm text-white/60">
                      Find your next creative and lock in a slot.
                    </div>
                  </div>
                  <Link href="/services" className="btn btn-light">
                    Explore services
                  </Link>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <SectionTitle>Recommended for you</SectionTitle>
                  <Link
                    href="/services"
                    className="text-[0.65rem] font-semibold tracking-[0.14em] text-stone-warm uppercase hover:text-ink"
                  >
                    See all
                  </Link>
                </div>
                <p className="field-hint mt-1.5">
                  Based on your bookings with photographers and designers.
                </p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {creatives
                    .filter((c) => !favorites.includes(c.slug))
                    .slice(0, 3)
                    .map((c) => (
                      <CreativeCard key={c.slug} creative={c} />
                    ))}
                </div>
              </div>
            </>
          )}

          {/* ================= BOOKINGS ================= */}
          {section === "Bookings" && (
            <>
              <div className="card p-7">
                <SectionTitle>Upcoming bookings</SectionTitle>
                <div className="mt-4 space-y-3">
                  {upcoming.length === 0 && (
                    <div className="rounded-[3px] bg-cream p-8 text-center text-sm text-stone-warm">
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
                    <div key={b.service} className="rounded-[3px] border border-line p-5">
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
                              setManaging(managing === b.service ? null : b.service)
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
                            href={`/book/${b.slug}`}
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
                          <button
                            onClick={() =>
                              flash("Message sent to your creative. They reply fast.")
                            }
                            className="btn btn-ghost !px-4 !py-2.5 !text-[0.6rem]"
                          >
                            Message creative
                          </button>
                          <span className="text-xs text-fog">
                            Free cancellation until 48 hours before.
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-7">
                <SectionTitle>Past bookings</SectionTitle>
                <div className="mt-2 divide-y divide-line">
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
                            href={`/book/${b.slug}`}
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
            </>
          )}

          {/* ================= FAVORITES ================= */}
          {section === "Favorites" && (
            <div>
              <div className="flex items-center justify-between">
                <SectionTitle>Your favorite creatives</SectionTitle>
                <Link
                  href="/services"
                  className="text-[0.65rem] font-semibold tracking-[0.14em] text-stone-warm uppercase hover:text-ink"
                >
                  Find more
                </Link>
              </div>
              <p className="field-hint mt-1.5">
                Saved creatives get priority when new slots open up.
              </p>
              {favorites.length === 0 ? (
                <div className="card mt-4 p-10 text-center text-sm text-stone-warm">
                  No favorites yet. Tap the heart on any creative to save them
                  here.
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {favorites
                    .map((slug) => getCreative(slug))
                    .filter((c) => c != null)
                    .map((c) => (
                      <div
                        key={c.slug}
                        className="card flex flex-wrap items-center justify-between gap-4 p-5"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={c.avatar}
                            alt=""
                            width={52}
                            height={52}
                            className="rounded-full"
                          />
                          <div>
                            <div className="text-[0.95rem] font-medium">{c.name}</div>
                            <div className="text-xs text-stone-warm">
                              {c.craft} · {c.city} · from ${c.from}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setFavorites((f) => f.filter((s) => s !== c.slug));
                              flash(`${c.name} removed from favorites.`);
                            }}
                            aria-label={`Remove ${c.name} from favorites`}
                            className="grid size-9 place-items-center rounded-[2px] border border-line text-ink transition-colors hover:border-ink"
                          >
                            <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                              <path d="M12 21s-7.5-4.9-9.7-9.1C.8 8.9 2.6 5.5 5.9 5.1c1.9-.2 3.7.7 4.6 2.2h3c.9-1.5 2.7-2.4 4.6-2.2 3.3.4 5.1 3.8 3.6 6.8C19.5 16.1 12 21 12 21z" />
                            </svg>
                          </button>
                          <Link href={`/book/${c.slug}`} className="btn btn-primary !py-3">
                            Book again
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* ================= PAYMENTS ================= */}
          {section === "Payments" && (
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="card p-7">
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
                <button
                  onClick={() => {
                    setCards((list) => [
                      ...list,
                      {
                        label: "Mastercard ····1881",
                        expires: "Expires 03/29",
                        isDefault: false,
                      },
                    ]);
                    flash("Payment method added.");
                  }}
                  className="btn btn-ghost mt-4 w-full"
                >
                  Add payment method
                </button>
                <p className="field-hint mt-3">
                  Cards are stored securely by Stripe. Snatch On never sees the
                  full number.
                </p>
              </div>

              <div className="card p-7">
                <SectionTitle>Receipts</SectionTitle>
                <div className="mt-2 divide-y divide-line">
                  {past.map((b) => (
                    <div
                      key={`${b.service}-${b.when}`}
                      className="flex items-center justify-between py-4"
                    >
                      <div>
                        <div className="text-sm font-medium">{b.service}</div>
                        <div className="text-xs text-fog">
                          {b.creative} · {b.when}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">${b.price}</span>
                        <button
                          onClick={() =>
                            flash("Receipt sent to rachel@loamcandle.com.")
                          }
                          className="text-[0.65rem] font-semibold tracking-[0.12em] text-soot uppercase hover:text-ink"
                        >
                          Email receipt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hairline mt-2 flex items-center justify-between pt-4 text-sm">
                  <span className="text-stone-warm">Total spent</span>
                  <span className="font-semibold">
                    ${totalSpent.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= SETTINGS ================= */}
          {section === "Settings" && (
            <>
              <div className="card p-7">
                <SectionTitle>Contact details</SectionTitle>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label">Full name</label>
                    <input defaultValue="Rachel Nguyen" className="field-input" />
                  </div>
                  <div>
                    <label className="field-label">Company</label>
                    <input defaultValue="Loam Candle Co." className="field-input" />
                  </div>
                  <div>
                    <label className="field-label">Email</label>
                    <input defaultValue="rachel@loamcandle.com" className="field-input" />
                  </div>
                  <div>
                    <label className="field-label">Phone</label>
                    <input defaultValue="(555) 210-8842" className="field-input" />
                  </div>
                </div>
                <button
                  onClick={() => flash("Contact details saved.")}
                  className="btn btn-primary mt-6"
                >
                  Save changes
                </button>
              </div>

              <div className="card p-7">
                <SectionTitle>Notifications</SectionTitle>
                <NotificationRows flash={flash} />
              </div>

              <div className="card p-7">
                <SectionTitle>Account</SectionTitle>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      flash("A password reset link has been sent to your email.")
                    }
                    className="btn btn-ghost !px-5 !py-3 !text-[0.62rem]"
                  >
                    Change password
                  </button>
                  <button
                    onClick={() => flash("Your data export will arrive by email.")}
                    className="btn btn-ghost !px-5 !py-3 !text-[0.62rem]"
                  >
                    Export my data
                  </button>
                  <button
                    onClick={() => flash("Account deletion is disabled in the demo.")}
                    className="btn btn-ghost !px-5 !py-3 !text-[0.62rem]"
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationRows({ flash }: { flash: (m: string) => void }) {
  const [prefs, setPrefs] = useState({
    sms: true,
    email: true,
    reminders: true,
    marketing: false,
  });

  const rows: { key: keyof typeof prefs; title: string; sub: string }[] = [
    {
      key: "sms",
      title: "SMS booking updates",
      sub: "Confirmations, changes and cancellations by text.",
    },
    {
      key: "email",
      title: "Email confirmations",
      sub: "A copy of every booking and receipt in your inbox.",
    },
    {
      key: "reminders",
      title: "Session reminders",
      sub: "The day before and 2 hours before each session.",
    },
    {
      key: "marketing",
      title: "New creatives and offers",
      sub: "Occasional picks based on what you book.",
    },
  ];

  return (
    <div className="mt-2 divide-y divide-line">
      {rows.map((r) => (
        <div key={r.key} className="flex items-center justify-between gap-4 py-4">
          <div>
            <div className="text-sm font-medium">{r.title}</div>
            <div className="mt-0.5 text-xs text-stone-warm">{r.sub}</div>
          </div>
          <Toggle
            on={prefs[r.key]}
            label={r.title}
            onChange={(v) => {
              setPrefs((p) => ({ ...p, [r.key]: v }));
              flash(`${r.title} ${v ? "enabled" : "disabled"}.`);
            }}
          />
        </div>
      ))}
    </div>
  );
}
