"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import { getCreative } from "@/lib/data";
import {
  getSession,
  SESSION_EVENT,
  type DemoSession,
} from "@/lib/demoSession";

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[0.72rem] font-semibold tracking-[0.24em] text-ink uppercase">
      {children}
    </h3>
  );
}

function Tabs() {
  const params = useSearchParams();
  const [session, setSession] = useState<DemoSession | null>(null);
  const [view, setView] = useState<"page" | "dashboard">(
    params.get("view") === "dashboard" ? "dashboard" : "page",
  );

  useEffect(() => {
    const sync = () => setSession(getSession());
    sync();
    window.addEventListener(SESSION_EVENT, sync);
    return () => window.removeEventListener(SESSION_EVENT, sync);
  }, []);

  // A logged-in creator lands on their dashboard unless they explicitly
  // asked for the page view.
  useEffect(() => {
    if (getSession()?.role === "pro" && !params.get("view")) {
      setView("dashboard");
    }
  }, [params]);

  const isOwner = session?.role === "pro";

  return (
    <>
      {/* hero: marketing framing for visitors, studio framing for the owner */}
      <section className="bg-white pt-[4.5rem]">
        <div className="container-x pt-12 pb-10 text-center md:pt-16">
          {isOwner ? (
            <Reveal>
              <span className="eyebrow">Creator studio</span>
              <h1 className="display mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl">
                Good to see you, {session?.name}.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-stone-warm">
                Run your bookings, services and payouts, or check how your
                public page looks to clients.
              </p>
            </Reveal>
          ) : (
            <Reveal>
              <span className="eyebrow">Live demo</span>
              <h1 className="display mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl">
                This is what you get on day one.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-stone-warm">
                A real creative page clients can book, and a dashboard that
                runs your business. Explore both below, no account needed.
              </p>
              {session?.role === "client" && (
                <p className="mt-4 text-sm">
                  <Link
                    href="/account"
                    className="font-semibold text-ink underline decoration-1 underline-offset-4"
                  >
                    Looking for your own bookings? Go to My bookings
                  </Link>
                </p>
              )}
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="container-x">
          {/* switch */}
          <div className="flex justify-center pb-10">
            <div className="inline-flex rounded-[3px] border border-line bg-white p-1">
              {(
                [
                  ["page", isOwner ? "My public page" : "Creative page"],
                  ["dashboard", isOwner ? "Dashboard" : "Creator dashboard"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-[2px] px-5 py-3 text-[0.68rem] font-medium tracking-[0.16em] uppercase transition-colors ${
                    view === v
                      ? "bg-ink text-white"
                      : "text-soot hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {isOwner && view === "page" && (
            <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center gap-3 rounded-[3px] bg-cream px-4 py-3 text-[0.8rem] text-stone-warm">
              <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" aria-hidden>
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              This is exactly how clients see your page right now.
            </div>
          )}

          {view === "page" ? (
            <CreativePage />
          ) : (
            <Dashboard isOwner={isOwner} onViewPage={() => setView("page")} />
          )}
        </div>
      </section>
    </>
  );
}

/* ================= CREATIVE PAGE VIEW ================= */

function CreativePage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_23rem]">
      <div>
        {/* cover */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-[4px] bg-cream">
          <Image
            src={demo.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        {/* identity row */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Image
              src={demo.avatar}
              alt={demo.name}
              width={64}
              height={64}
              className="rounded-[3px]"
            />
            <div>
              <h2 className="text-2xl font-medium tracking-tight">
                {demo.name}
              </h2>
              <div className="mt-0.5 text-sm text-stone-warm">
                {demo.craft} · {demo.city}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Stars rating={demo.rating} />
            <span className="text-sm text-stone-warm">
              {demo.reviews} reviews
            </span>
          </div>
        </div>

        {/* bio */}
        <p className="mt-5 max-w-2xl leading-relaxed text-soot">{demo.bio}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {demo.tags.map((t) => (
            <span
              key={t}
              className="rounded-[2px] border border-line px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.14em] text-soot uppercase"
            >
              {t}
            </span>
          ))}
        </div>

        {/* portfolio */}
        <div className="hairline mt-10 pt-9">
          <SectionTitle>Portfolio</SectionTitle>
          <div className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-3">
            {portfolio.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-[3px] bg-cream"
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
        <div className="hairline mt-10 pt-9">
          <SectionTitle>What clients say</SectionTitle>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <figure key={r.name} className="card p-6">
                <blockquote className="text-[0.92rem] leading-relaxed text-soot">
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
      </div>

      {/* booking sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <SectionTitle>Book a service</SectionTitle>
          <div className="mt-5 space-y-2.5">
            {demo.services.map((s) => (
              <Link
                key={s.id}
                href={`/book/${demo.slug}?service=${s.id}`}
                className="group flex items-center justify-between rounded-[3px] border border-line p-4 transition-colors hover:border-ink"
              >
                <div>
                  <div className="text-[0.92rem] font-medium">{s.name}</div>
                  <div className="mt-0.5 text-xs text-stone-warm">
                    {s.duration}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium">${s.price}</span>
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
          <Link href={`/book/${demo.slug}`} className="btn btn-primary mt-5 w-full">
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

type DashService = {
  id: string;
  name: string;
  price: number;
  duration: string;
  archived: boolean;
};

function Dashboard({
  isOwner,
  onViewPage,
}: {
  isOwner: boolean;
  onViewPage: () => void;
}) {
  const [bookings, setBookings] = useState(
    upcoming.map((b) => ({ ...b })),
  );
  const [services, setServices] = useState<DashService[]>(
    demo.services.map((s) => ({ ...s, archived: false })),
  );
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", price: "", duration: "" });
  const [notice, setNotice] = useState("");

  function flash(msg: string) {
    setNotice(msg);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function setBookingStatus(client: string, status: string) {
    setBookings((list) =>
      status === "Declined"
        ? list.filter((b) => b.client !== client)
        : list.map((b) => (b.client === client ? { ...b, status } : b)),
    );
    flash(
      status === "Declined"
        ? "Booking declined. The client has been notified."
        : "Booking confirmed. Confirmation sent to the client.",
    );
  }

  function saveService() {
    const price = Number(draft.price);
    if (!draft.name.trim() || !(price > 0)) return;
    if (editingId) {
      setServices((list) =>
        list.map((s) =>
          s.id === editingId
            ? { ...s, name: draft.name, price, duration: draft.duration }
            : s,
        ),
      );
      flash("Service updated.");
    } else {
      setServices((list) => [
        ...list,
        {
          id: `new-${list.length + 1}`,
          name: draft.name,
          price,
          duration: draft.duration || "1 hr",
          archived: false,
        },
      ]);
      flash("Service added. It is now live on your page.");
    }
    setAdding(false);
    setEditingId(null);
    setDraft({ name: "", price: "", duration: "" });
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {notice && (
        <div className="rounded-[3px] bg-moss-soft px-4 py-3 text-[0.8rem] font-medium text-moss">
          {notice}
        </div>
      )}
      {/* welcome + stats */}
      <div className="card p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={demo.avatar}
              alt=""
              width={52}
              height={52}
              className="rounded-[3px]"
            />
            <div>
              <div className="text-xl font-medium tracking-tight">
                Good morning, Amara
              </div>
              <div className="text-sm text-stone-warm">
                Here is how your week is going.
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-[2px] bg-moss-soft px-3.5 py-2 text-[0.65rem] font-semibold tracking-[0.14em] text-moss uppercase">
            <span className="size-1.5 rounded-full bg-moss" />
            Accepting bookings
          </span>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-4">
          {[
            ["Earnings this month", "$4,820", "+32%"],
            ["Bookings", "14", "+4"],
            ["Profile views", "1,382", "+18%"],
            ["Response rate", "98%", "steady"],
          ].map(([label, value, delta]) => (
            <div key={label} className="rounded-[3px] bg-cream p-5">
              <div className="text-[0.65rem] font-medium tracking-[0.14em] text-stone-warm uppercase">
                {label}
              </div>
              <div className="mt-2 text-2xl font-medium">{value}</div>
              <div className="mt-1 text-xs font-semibold text-moss">
                {delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        {/* bookings */}
        <div className="card p-7">
          <div className="flex items-center justify-between">
            <SectionTitle>Upcoming bookings</SectionTitle>
            <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-fog uppercase">
              {bookings.length} scheduled
            </span>
          </div>
          <div className="mt-3 divide-y divide-line">
            {bookings.map((b) => (
              <div
                key={b.client}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div>
                  <div className="text-[0.92rem] font-medium">{b.client}</div>
                  <div className="text-xs text-stone-warm">
                    {b.service} · {b.when}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">${b.price}</span>
                  {b.status === "Pending" ? (
                    <span className="flex gap-2">
                      <button
                        onClick={() => setBookingStatus(b.client, "Confirmed")}
                        className="rounded-[2px] bg-ink px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.12em] text-white uppercase hover:bg-black"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setBookingStatus(b.client, "Declined")}
                        className="rounded-[2px] border border-line px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.12em] text-soot uppercase hover:border-ink"
                      >
                        Decline
                      </button>
                    </span>
                  ) : (
                    <span className="rounded-[2px] bg-moss-soft px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-moss uppercase">
                      {b.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* payouts */}
        <div className="card p-7">
          <div className="flex items-center justify-between">
            <SectionTitle>Payouts</SectionTitle>
            <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-fog uppercase">
              Last 3 weeks
            </span>
          </div>
          <div className="mt-4 rounded-[3px] bg-ink p-5 text-white">
            <div className="text-[0.65rem] tracking-[0.14em] text-white/60 uppercase">
              Next payout, Friday
            </div>
            <div className="mt-1.5 text-3xl font-medium">$1,250.00</div>
            <div className="mt-1 text-xs text-white/60">
              To bank account ····4821
            </div>
          </div>
          <div className="mt-2 divide-y divide-line">
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
      <div className="card p-7">
        <div className="flex items-center justify-between">
          <SectionTitle>Your services</SectionTitle>
          <button
            onClick={() => {
              setAdding((v) => !v);
              setEditingId(null);
              setDraft({ name: "", price: "", duration: "" });
            }}
            className="btn btn-ghost !px-4 !py-2.5 !text-[0.6rem]"
          >
            {adding ? "Close" : "+ Add service"}
          </button>
        </div>

        {(adding || editingId) && (
          <div className="mt-5 grid gap-3 rounded-[3px] border border-ink p-5 sm:grid-cols-[2fr_1fr_1fr_auto]">
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="field-input"
              placeholder="Service name"
            />
            <input
              value={draft.price}
              onChange={(e) => setDraft({ ...draft, price: e.target.value })}
              inputMode="numeric"
              className="field-input"
              placeholder="Price (USD)"
            />
            <input
              value={draft.duration}
              onChange={(e) =>
                setDraft({ ...draft, duration: e.target.value })
              }
              className="field-input"
              placeholder="Duration"
            />
            <button onClick={saveService} className="btn btn-primary">
              {editingId ? "Save" : "Add"}
            </button>
          </div>
        )}

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className={`rounded-[3px] border border-line p-5 ${
                s.archived ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-[0.92rem] font-medium">{s.name}</div>
                <span
                  className={`rounded-[2px] px-2 py-1 text-[0.58rem] font-semibold tracking-[0.12em] uppercase ${
                    s.archived
                      ? "bg-cream text-stone-warm"
                      : "bg-moss-soft text-moss"
                  }`}
                >
                  {s.archived ? "Archived" : "Live"}
                </span>
              </div>
              <div className="mt-1 text-xs text-stone-warm">{s.duration}</div>
              <div className="mt-3 text-xl font-medium">${s.price}</div>
              <div className="mt-3 flex gap-3 text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                <button
                  onClick={() => {
                    setEditingId(s.id);
                    setAdding(false);
                    setDraft({
                      name: s.name,
                      price: String(s.price),
                      duration: s.duration,
                    });
                  }}
                  className="cursor-pointer text-soot hover:text-ink"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setServices((list) =>
                      list.map((x) =>
                        x.id === s.id ? { ...x, archived: !x.archived } : x,
                      ),
                    );
                    flash(
                      s.archived
                        ? "Service restored and live again."
                        : "Service archived. It is hidden from your page.",
                    );
                  }}
                  className="cursor-pointer text-soot hover:text-ink"
                >
                  {s.archived ? "Restore" : "Archive"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {isOwner ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[4px] bg-ink p-7 text-white">
          <div>
            <div className="text-lg font-medium tracking-tight">
              Your page is live at snatchon.com/amara-osei
            </div>
            <div className="mt-1 text-sm text-white/60">
              Share the link, or check how it looks to clients.
            </div>
          </div>
          <button onClick={onViewPage} className="btn btn-light">
            View my public page
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[4px] bg-ink p-7 text-white">
          <div>
            <div className="text-lg font-medium tracking-tight">
              Want this dashboard for your own craft?
            </div>
            <div className="mt-1 text-sm text-white/60">
              Setup takes about 4 minutes. Free until your first booking.
            </div>
          </div>
          <Link href="/auth/signup" className="btn btn-light">
            Create your page
          </Link>
        </div>
      )}
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
