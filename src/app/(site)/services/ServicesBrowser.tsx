"use client";

import { useMemo, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AvailabilityGrid from "@/components/AvailabilityGrid";
import Stars from "@/components/Stars";
import { categories, creatives, type Creative } from "@/lib/data";

function Browser() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"rated" | "low" | "high">("rated");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = creatives.filter((c) => {
      const inCat = cat === "all" || c.category === cat;
      if (!inCat) return false;
      if (!needle) return true;
      const hay = [c.name, c.craft, c.city, ...c.tags]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
    list = [...list].sort((a, b) =>
      sort === "low"
        ? a.from - b.from
        : sort === "high"
          ? b.from - a.from
          : b.rating - a.rating,
    );
    return list;
  }, [q, cat, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="flex flex-1 items-center gap-3 rounded-[3px] border border-line bg-white px-5 py-3">
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-fog" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, craft, style or city..."
            className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-fog"
            aria-label="Search creatives"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {[{ slug: "all", name: "All" }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`rounded-[2px] px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.14em] uppercase transition-colors ${
                cat === c.slug
                  ? "bg-ink text-white"
                  : "border border-line bg-white text-soot hover:border-ink"
              }`}
            >
              {c.name}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-[2px] border border-line bg-white px-4 py-2.5 text-[0.75rem] font-medium outline-none"
            aria-label="Sort results"
          >
            <option value="rated">Top rated</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      <div className="mt-3 text-[0.8rem] text-stone-warm">
        {results.length} creative{results.length === 1 ? "" : "s"} available.
        Book directly from the calendar, free cancellation up to 48 hours
        before.
      </div>

      {results.length === 0 ? (
        <div className="card mt-6 bg-white p-14 text-center">
          <div className="display text-2xl">No matches for “{q}”</div>
          <p className="mt-3 text-stone-warm">
            Try a broader term like “photographer” or “design”, or clear the
            filters.
          </p>
          <button
            onClick={() => {
              setQ("");
              setCat("all");
            }}
            className="btn btn-ghost mt-6"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {results.map((c) => (
            <ResultRow key={c.slug} creative={c} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Doctolib-style result row with availability grid ---------- */

function ResultRow({ creative }: { creative: Creative }) {
  return (
    <div className="card grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* left: profile */}
      <div className="flex gap-4">
        <Link href={`/creatives/${creative.slug}`} className="shrink-0">
          <Image
            src={creative.avatar}
            alt={creative.name}
            width={64}
            height={64}
            className="rounded-full"
          />
        </Link>
        <div className="min-w-0">
          <Link
            href={`/creatives/${creative.slug}`}
            className="text-[1.02rem] font-medium hover:underline"
          >
            {creative.name}
          </Link>
          <div className="mt-0.5 text-sm text-stone-warm">{creative.craft}</div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-stone-warm">
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                <path
                  d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              {creative.city}
            </span>
            <Stars rating={creative.rating} />
            <span>{creative.reviews} reviews</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {creative.tags.map((t) => (
              <span
                key={t}
                className="rounded-[2px] border border-line px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.12em] text-soot uppercase"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 text-[0.8rem] text-stone-warm">
            from <span className="font-semibold text-ink">${creative.from}</span>
          </div>
        </div>
      </div>

      {/* right: availability */}
      <div className="lg:border-l lg:border-line lg:pl-6">
        <AvailabilityGrid slug={creative.slug} />
      </div>
    </div>
  );
}

export default function ServicesBrowser() {
  return (
    <Suspense>
      <Browser />
    </Suspense>
  );
}
