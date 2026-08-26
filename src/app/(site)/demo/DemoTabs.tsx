"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AvailabilityGrid from "@/components/AvailabilityGrid";
import PortfolioGallery from "@/components/PortfolioGallery";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import { getCreative, portfolioFor } from "@/lib/data";
import {
  getSession,
  SESSION_EVENT,
  type DemoSession,
} from "@/lib/demoSession";

const demo = getCreative("amara-osei")!;

const portfolio = portfolioFor(demo);

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

const initialBookings = [
  { client: "Loam Candle Co.", service: "Brand shoot, half day", when: "Fri, Aug 28 · 10:00 AM", price: 650, status: "Confirmed" },
  { client: "Danielle Ward", service: "Portrait session", when: "Sat, Aug 29 · 2:00 PM", price: 180, status: "Confirmed" },
  { client: "Fig & Fern Cafe", service: "Event coverage", when: "Wed, Sep 2 · 6:00 PM", price: 420, status: "Pending" },
];

const payouts = [
  { date: "Aug 21, 2026", desc: "Weekly payout", amount: 1250 },
  { date: "Aug 14, 2026", desc: "Weekly payout", amount: 830 },
  { date: "Aug 7, 2026", desc: "Weekly payout", amount: 1460 },
];

const HOURS = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

type Profile = {
  name: string;
  craft: string;
  city: string;
  bio: string;
  tags: string[];
  website: string;
  instagram: string;
  x: string;
  youtube: string;
};

type DashService = {
  id: string;
  name: string;
  price: number;
  duration: string;
  archived: boolean;
};

type DayHours = { on: boolean; start: string; end: string };

const initialProfile: Profile = {
  name: demo.name,
  craft: demo.craft,
  city: demo.city,
  bio: demo.bio,
  tags: [...demo.tags],
  website: "amaraosei.com",
  instagram: "@amara.shoots",
  x: "@amaraosei",
  youtube: "",
};

const initialHours: Record<string, DayHours> = {
  Mon: { on: true, start: "09:00", end: "17:00" },
  Tue: { on: true, start: "09:00", end: "17:00" },
  Wed: { on: true, start: "09:00", end: "17:00" },
  Thu: { on: true, start: "09:00", end: "19:00" },
  Fri: { on: true, start: "09:00", end: "19:00" },
  Sat: { on: true, start: "10:00", end: "15:00" },
  Sun: { on: false, start: "10:00", end: "15:00" },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[0.72rem] font-semibold tracking-[0.24em] text-ink uppercase">
      {children}
    </h3>
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

/* ==================================================================== */

function Tabs() {
  const params = useSearchParams();
  const [session, setSession] = useState<DemoSession | null>(null);
  const [override, setOverride] = useState<"page" | "dashboard" | null>(null);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [peek, setPeek] = useState(false);

  useEffect(() => {
    const sync = () => setSession(getSession());
    sync();
    window.addEventListener(SESSION_EVENT, sync);
    return () => window.removeEventListener(SESSION_EVENT, sync);
  }, []);

  const isOwner = session?.role === "pro";
  const isClient = session?.role === "client";

  const paramView =
    params.get("view") === "dashboard"
      ? ("dashboard" as const)
      : params.get("view") === "page"
        ? ("page" as const)
        : null;
  const view = override ?? paramView ?? (isOwner ? "dashboard" : "page");
  const setView = setOverride;

  // A peeking client sees only the demo dashboard, clearly framed as a
  // preview, never the full sales demo.
  if (isClient && peek) {
    return (
      <section className="bg-white pt-[4.5rem] pb-24">
        <div className="container-x pt-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[3px] bg-ink px-5 py-4 text-white">
            <div className="flex items-center gap-3 text-[0.8rem]">
              <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" aria-hidden>
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              You are previewing a demo creator dashboard. This is what yours
              would look like.
            </div>
            <div className="flex gap-2">
              <Link
                href="/auth/signup"
                className="rounded-[2px] bg-white px-4 py-2 text-[0.62rem] font-semibold tracking-[0.14em] text-ink uppercase hover:bg-cream"
              >
                Become a creative
              </Link>
              <button
                onClick={() => setPeek(false)}
                className="rounded-[2px] border border-white/30 px-4 py-2 text-[0.62rem] font-semibold tracking-[0.14em] uppercase hover:border-white"
              >
                Exit preview
              </button>
            </div>
          </div>
          <Dashboard
            isOwner={false}
            onViewPage={() => setPeek(false)}
            profile={profile}
            setProfile={setProfile}
          />
        </div>
      </section>
    );
  }

  // A logged-in client never sees the sales demo: they get the
  // become-a-creative journey instead (unless they choose to peek).
  if (isClient && !peek) {
    return (
      <>
        <section className="bg-white pt-[4.5rem]">
          <div className="container-x pt-12 pb-10 text-center md:pt-16">
            <Reveal>
              <span className="eyebrow">For creatives</span>
              <h1 className="display mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl">
                Ever thought about the other side, {session?.name}?
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-stone-warm">
                You book creatives here. With a creative page of your own, you
                could get booked too: real slots, automatic payouts, zero DMs.
              </p>
              <p className="mt-4 text-sm">
                <Link
                  href="/account"
                  className="font-semibold text-ink underline decoration-1 underline-offset-4"
                >
                  Looking for your bookings? Go to My bookings
                </Link>
              </p>
            </Reveal>
          </div>
        </section>
        <section className="bg-white pb-24">
          <div className="container-x">
            <ProTeaser onPeek={() => setPeek(true)} />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
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
              This is exactly how clients see your page right now. Edit it from
              Dashboard, Profile.
            </div>
          )}

          {view === "page" ? (
            <CreativePage profile={profile} />
          ) : isClient && !peek ? (
            <ProTeaser onPeek={() => setPeek(true)} />
          ) : (
            <Dashboard
              isOwner={isOwner}
              onViewPage={() => setView("page")}
              profile={profile}
              setProfile={setProfile}
            />
          )}
        </div>
      </section>
    </>
  );
}

/* ================= PRO TEASER (logged-in clients) ================= */

function ProTeaser({ onPeek }: { onPeek: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-[4px] border border-line">
      {/* blurred dashboard preview */}
      <div
        aria-hidden
        className="pointer-events-none max-h-[34rem] overflow-hidden opacity-50 blur-[3px] select-none"
      >
        <div className="p-6">
          <div className="card p-7">
            <div className="flex items-center gap-4">
              <Image src={demo.avatar} alt="" width={52} height={52} className="rounded-[3px]" />
              <div>
                <div className="text-xl font-medium">Good morning, you</div>
                <div className="text-sm text-stone-warm">
                  Here is how your week is going.
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {[
                ["Earnings this month", "$4,820"],
                ["Bookings", "14"],
                ["Profile views", "1,382"],
                ["Response rate", "98%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[3px] bg-cream p-5">
                  <div className="text-[0.65rem] font-medium tracking-[0.14em] text-stone-warm uppercase">
                    {label}
                  </div>
                  <div className="mt-2 text-2xl font-medium">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="h-32 rounded-[3px] bg-cream" />
              <div className="h-32 rounded-[3px] bg-ink" />
            </div>
          </div>
        </div>
      </div>

      {/* pitch overlay */}
      <div className="absolute inset-0 grid place-items-center bg-white/70 p-6 backdrop-blur-[2px]">
        <div className="card w-full max-w-lg bg-white p-8 text-center shadow-[0_24px_60px_-20px_rgb(18_18_18/0.25)] sm:p-10">
          <span className="eyebrow">For creatives</span>
          <h2 className="display mt-3 text-2xl sm:text-3xl">
            This could be your dashboard.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-[0.95rem] text-stone-warm">
            You book creatives here. You could get booked too: your own page,
            real-slot bookings, automatic payouts.
          </p>
          <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left text-sm text-soot">
            {[
              "Free page, set up in about 4 minutes",
              "You set your prices and your hours",
              "Paid out automatically after every job",
            ].map((li) => (
              <li key={li} className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-moss" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {li}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth/signup" className="btn btn-primary">
              Become a creative
            </Link>
            <button onClick={onPeek} className="btn btn-ghost">
              Just peek at the demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= CREATIVE PAGE VIEW ================= */

function CreativePage({ profile }: { profile: Profile }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem]">
      <div>
        <div className="relative aspect-[21/9] overflow-hidden rounded-[4px] bg-cream">
          <Image
            src={demo.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Image
              src={demo.avatar}
              alt={profile.name}
              width={64}
              height={64}
              className="rounded-[3px]"
            />
            <div>
              <h2 className="text-2xl font-medium tracking-tight">
                {profile.name}
              </h2>
              <div className="mt-0.5 text-sm text-stone-warm">
                {profile.craft} · {profile.city}
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

        <p className="mt-5 max-w-2xl leading-relaxed text-soot">
          {profile.bio}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.tags.map((t) => (
            <span
              key={t}
              className="rounded-[2px] border border-line px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.14em] text-soot uppercase"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="hairline mt-10 pt-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle>Portfolio</SectionTitle>
            <span className="text-xs text-fog">
              Click any piece to view it full screen
            </span>
          </div>
          <div className="mt-5">
            <PortfolioGallery images={portfolio} name={profile.name} />
          </div>
        </div>

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

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <SectionTitle>Availability</SectionTitle>
          <div className="mt-4">
            <AvailabilityGrid slug={demo.slug} compact />
          </div>
          <p className="field-hint mt-3 text-center">
            Pick a time to start a booking instantly.
          </p>
        </div>

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

/* ================= DASHBOARD ================= */

const SECTIONS = [
  "Overview",
  "Profile",
  "Services",
  "Availability",
  "Payouts",
  "Settings",
] as const;
type Section = (typeof SECTIONS)[number];

function Dashboard({
  isOwner,
  onViewPage,
  profile,
  setProfile,
}: {
  isOwner: boolean;
  onViewPage: () => void;
  profile: Profile;
  setProfile: (p: Profile) => void;
}) {
  const [section, setSection] = useState<Section>("Overview");
  const [bookings, setBookings] = useState(
    initialBookings.map((b) => ({ ...b })),
  );
  const [services, setServices] = useState<DashService[]>(
    demo.services.map((s) => ({ ...s, archived: false })),
  );
  const [notice, setNotice] = useState("");

  function flash(msg: string) {
    setNotice(msg);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* studio nav */}
      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-line pb-px">
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
          </button>
        ))}
      </div>

      {notice && (
        <div className="mb-5 rounded-[3px] bg-moss-soft px-4 py-3 text-[0.8rem] font-medium text-moss">
          {notice}
        </div>
      )}

      <div className="space-y-5">
        {section === "Overview" && (
          <Overview
            isOwner={isOwner}
            onViewPage={onViewPage}
            bookings={bookings}
            setBookings={setBookings}
            flash={flash}
            goTo={setSection}
          />
        )}
        {section === "Profile" && (
          <ProfileSection
            profile={profile}
            setProfile={setProfile}
            flash={flash}
            onViewPage={onViewPage}
          />
        )}
        {section === "Services" && (
          <ServicesSection
            services={services}
            setServices={setServices}
            flash={flash}
          />
        )}
        {section === "Availability" && <AvailabilitySection flash={flash} />}
        {section === "Payouts" && <PayoutsSection flash={flash} />}
        {section === "Settings" && <SettingsSection flash={flash} />}
      </div>
    </div>
  );
}

/* ---------------- Overview ---------------- */

function Overview({
  isOwner,
  onViewPage,
  bookings,
  setBookings,
  flash,
  goTo,
}: {
  isOwner: boolean;
  onViewPage: () => void;
  bookings: { client: string; service: string; when: string; price: number; status: string }[];
  setBookings: React.Dispatch<
    React.SetStateAction<
      { client: string; service: string; when: string; price: number; status: string }[]
    >
  >;
  flash: (m: string) => void;
  goTo: (s: Section) => void;
}) {
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

  return (
    <>
      <div className="card p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src={demo.avatar} alt="" width={52} height={52} className="rounded-[3px]" />
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
              <div className="mt-1 text-xs font-semibold text-moss">{delta}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
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

        <div className="card p-7">
          <div className="flex items-center justify-between">
            <SectionTitle>Payouts</SectionTitle>
            <button
              onClick={() => goTo("Payouts")}
              className="text-[0.65rem] font-semibold tracking-[0.14em] text-stone-warm uppercase hover:text-ink"
            >
              Manage
            </button>
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
            {payouts.slice(0, 2).map((p) => (
              <div key={p.date} className="flex items-center justify-between py-3.5">
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
    </>
  );
}

/* ---------------- Profile ---------------- */

function ProfileSection({
  profile,
  setProfile,
  flash,
  onViewPage,
}: {
  profile: Profile;
  setProfile: (p: Profile) => void;
  flash: (m: string) => void;
  onViewPage: () => void;
}) {
  const [draft, setDraft] = useState<Profile>({ ...profile, tags: [...profile.tags] });
  const [tagInput, setTagInput] = useState("");

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div className="card p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>Public profile</SectionTitle>
        <button
          onClick={onViewPage}
          className="text-[0.65rem] font-semibold tracking-[0.14em] text-stone-warm uppercase hover:text-ink"
        >
          Preview page
        </button>
      </div>
      <p className="field-hint mt-2">
        Everything here is what clients see on your public page.
      </p>

      <div className="mt-6 flex items-center gap-5">
        <Image src={demo.avatar} alt="" width={72} height={72} className="rounded-[3px]" />
        <div className="flex gap-2">
          <button
            onClick={() => flash("Photo upload is disabled in the demo.")}
            className="btn btn-ghost !px-4 !py-2.5 !text-[0.6rem]"
          >
            Change photo
          </button>
          <button
            onClick={() => flash("Cover photo upload is disabled in the demo.")}
            className="btn btn-ghost !px-4 !py-2.5 !text-[0.6rem]"
          >
            Change cover
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">Display name</label>
          <input
            value={draft.name}
            onChange={(e) => set("name", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label">Craft / title</label>
          <input
            value={draft.craft}
            onChange={(e) => set("craft", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label">Location</label>
          <input
            value={draft.city}
            onChange={(e) => set("city", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label">Public URL</label>
          <input
            value="snatchon.com/amara-osei"
            readOnly
            className="field-input opacity-60"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="field-label">Bio</label>
        <textarea
          rows={4}
          value={draft.bio}
          onChange={(e) => set("bio", e.target.value)}
          className="field-input resize-none"
        />
      </div>

      <div className="mt-5">
        <label className="field-label">Tags</label>
        <div className="flex flex-wrap items-center gap-2">
          {draft.tags.map((t) => (
            <button
              key={t}
              onClick={() =>
                set("tags", draft.tags.filter((x) => x !== t))
              }
              className="inline-flex items-center gap-1.5 rounded-[2px] bg-cream px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.12em] text-soot uppercase hover:bg-line"
            >
              {t}
              <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tagInput.trim()) {
                e.preventDefault();
                if (!draft.tags.includes(tagInput.trim()))
                  set("tags", [...draft.tags, tagInput.trim()]);
                setTagInput("");
              }
            }}
            placeholder="Add tag, press Enter"
            className="field-input !w-48 !py-2"
          />
        </div>
      </div>

      <div className="hairline mt-7 grid gap-5 pt-6 sm:grid-cols-2">
        {(
          [
            ["website", "Website"],
            ["instagram", "Instagram"],
            ["x", "X"],
            ["youtube", "YouTube"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label className="field-label">{label}</label>
            <input
              value={draft[key]}
              onChange={(e) => set(key, e.target.value)}
              className="field-input"
              placeholder={key === "youtube" ? "youtube.com/@channel" : ""}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setProfile({ ...draft, tags: [...draft.tags] });
          flash("Profile saved. Your public page is updated.");
        }}
        className="btn btn-primary mt-7"
      >
        Save profile
      </button>
    </div>
  );
}

/* ---------------- Services ---------------- */

function ServicesSection({
  services,
  setServices,
  flash,
}: {
  services: DashService[];
  setServices: React.Dispatch<React.SetStateAction<DashService[]>>;
  flash: (m: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", price: "", duration: "" });

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
            onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
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
                  s.archived ? "bg-cream text-stone-warm" : "bg-moss-soft text-moss"
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
  );
}

/* ---------------- Availability ---------------- */

function AvailabilitySection({ flash }: { flash: (m: string) => void }) {
  const [hours, setHours] = useState(initialHours);
  const [minNotice, setMinNotice] = useState("24 hours");
  const [horizon, setHorizon] = useState("2 months");
  const [radius, setRadius] = useState("25");

  return (
    <>
      <div className="card p-7">
        <SectionTitle>Weekly hours</SectionTitle>
        <p className="field-hint mt-2">
          Clients can only book inside these windows.
        </p>
        <div className="mt-5 divide-y divide-line">
          {Object.entries(hours).map(([day, h]) => (
            <div
              key={day}
              className="flex flex-wrap items-center justify-between gap-3 py-3.5"
            >
              <div className="flex items-center gap-4">
                <Toggle
                  on={h.on}
                  label={`${day} availability`}
                  onChange={(v) =>
                    setHours((prev) => ({ ...prev, [day]: { ...h, on: v } }))
                  }
                />
                <span className="w-10 text-sm font-medium">{day}</span>
              </div>
              {h.on ? (
                <div className="flex items-center gap-2 text-sm">
                  <select
                    value={h.start}
                    onChange={(e) =>
                      setHours((prev) => ({
                        ...prev,
                        [day]: { ...h, start: e.target.value },
                      }))
                    }
                    className="rounded-[2px] border border-line bg-white px-3 py-2 outline-none"
                  >
                    {HOURS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <span className="text-fog">to</span>
                  <select
                    value={h.end}
                    onChange={(e) =>
                      setHours((prev) => ({
                        ...prev,
                        [day]: { ...h, end: e.target.value },
                      }))
                    }
                    className="rounded-[2px] border border-line bg-white px-3 py-2 outline-none"
                  >
                    {HOURS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <span className="text-sm text-fog">Unavailable</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-7">
        <SectionTitle>Booking rules</SectionTitle>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <div>
            <label className="field-label">Minimum notice</label>
            <select
              value={minNotice}
              onChange={(e) => setMinNotice(e.target.value)}
              className="field-input"
            >
              {["2 hours", "12 hours", "24 hours", "48 hours"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <p className="field-hint">How close to a slot clients can book.</p>
          </div>
          <div>
            <label className="field-label">Booking horizon</label>
            <select
              value={horizon}
              onChange={(e) => setHorizon(e.target.value)}
              className="field-input"
            >
              {["2 weeks", "1 month", "2 months", "6 months"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <p className="field-hint">How far ahead your calendar opens.</p>
          </div>
          <div>
            <label className="field-label">Travel radius (miles)</label>
            <input
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              inputMode="numeric"
              className="field-input"
            />
            <p className="field-hint">For on-location sessions.</p>
          </div>
        </div>
        <button
          onClick={() => flash("Availability saved. Your calendar is updated.")}
          className="btn btn-primary mt-6"
        >
          Save availability
        </button>
      </div>
    </>
  );
}

/* ---------------- Payouts ---------------- */

function PayoutsSection({ flash }: { flash: (m: string) => void }) {
  const [schedule, setSchedule] = useState<"weekly" | "instant">("weekly");

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-7">
          <SectionTitle>Payout account</SectionTitle>
          <div className="mt-4 rounded-[3px] bg-ink p-5 text-white">
            <div className="text-[0.65rem] tracking-[0.14em] text-white/60 uppercase">
              Next payout, Friday
            </div>
            <div className="mt-1.5 text-3xl font-medium">$1,250.00</div>
            <div className="mt-1 text-xs text-white/60">
              To bank account ····4821
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-[3px] border border-line p-4">
            <div>
              <div className="text-sm font-medium">Chase Bank ····4821</div>
              <div className="text-xs text-stone-warm">Default payout method</div>
            </div>
            <button
              onClick={() => flash("Payout method editing is disabled in the demo.")}
              className="text-[0.65rem] font-semibold tracking-[0.12em] text-soot uppercase hover:text-ink"
            >
              Edit
            </button>
          </div>
          <div className="mt-5">
            <div className="field-label">Payout schedule</div>
            <div className="flex gap-2">
              {(
                [
                  ["weekly", "Weekly, every Friday"],
                  ["instant", "After every job, 1% fee"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => {
                    setSchedule(value);
                    flash(`Payout schedule set to ${label.toLowerCase()}.`);
                  }}
                  className={`rounded-[2px] border px-4 py-2.5 text-[0.72rem] font-medium transition-colors ${
                    schedule === value
                      ? "border-ink bg-ink text-white"
                      : "border-line text-soot hover:border-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-7">
          <SectionTitle>Payout history</SectionTitle>
          <div className="mt-3 divide-y divide-line">
            {payouts.map((p) => (
              <div key={p.date} className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm font-medium">{p.desc}</div>
                  <div className="text-xs text-fog">{p.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-moss">
                    +${p.amount.toLocaleString()}
                  </span>
                  <span className="rounded-[2px] bg-cream px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-stone-warm uppercase">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="hairline mt-2 flex items-center justify-between pt-4 text-sm">
            <span className="text-stone-warm">Total paid out in August</span>
            <span className="font-semibold">$3,540.00</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- Settings ---------------- */

function SettingsSection({ flash }: { flash: (m: string) => void }) {
  const [prefs, setPrefs] = useState({
    autoConfirm: true,
    smsReminders: true,
    emailSummary: true,
    reviewRequests: true,
  });
  const [cancelWindow, setCancelWindow] = useState("48 hours");

  const rows: { key: keyof typeof prefs; title: string; sub: string }[] = [
    {
      key: "autoConfirm",
      title: "Auto-confirm bookings",
      sub: "Accept new bookings instantly without manual review.",
    },
    {
      key: "smsReminders",
      title: "SMS reminders to clients",
      sub: "Automatic reminders the day before and 2 hours before.",
    },
    {
      key: "emailSummary",
      title: "Daily email summary",
      sub: "Tomorrow's schedule in your inbox every evening.",
    },
    {
      key: "reviewRequests",
      title: "Automatic review requests",
      sub: "Ask clients for a review 2 hours after each session.",
    },
  ];

  return (
    <>
      <div className="card p-7">
        <SectionTitle>Booking policy</SectionTitle>
        <div className="mt-5 divide-y divide-line">
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
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div>
              <div className="text-sm font-medium">Free cancellation window</div>
              <div className="mt-0.5 text-xs text-stone-warm">
                Cancellations inside this window may be charged 50%.
              </div>
            </div>
            <select
              value={cancelWindow}
              onChange={(e) => {
                setCancelWindow(e.target.value);
                flash(`Cancellation window set to ${e.target.value}.`);
              }}
              className="rounded-[2px] border border-line bg-white px-3 py-2 text-sm outline-none"
            >
              {["24 hours", "48 hours", "72 hours"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card p-7">
        <SectionTitle>Account</SectionTitle>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="field-label">Email</label>
            <input value="pro@snatchon.com" readOnly className="field-input opacity-60" />
          </div>
          <div>
            <label className="field-label">Phone</label>
            <input value="(555) 010-4477" readOnly className="field-input opacity-60" />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => flash("A password reset link has been sent to your email.")}
            className="btn btn-ghost !px-5 !py-3 !text-[0.62rem]"
          >
            Change password
          </button>
          <button
            onClick={() => flash("Two-step verification is already on for this account.")}
            className="btn btn-ghost !px-5 !py-3 !text-[0.62rem]"
          >
            Two-step verification: On
          </button>
          <button
            onClick={() => flash("Pausing your page is disabled in the demo.")}
            className="btn btn-ghost !px-5 !py-3 !text-[0.62rem]"
          >
            Pause my page
          </button>
        </div>
      </div>
    </>
  );
}

export default function DemoTabs() {
  return (
    <Suspense>
      <Tabs />
    </Suspense>
  );
}
