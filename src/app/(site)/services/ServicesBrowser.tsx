"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CreativeCard from "@/components/CreativeCard";
import { categories, creatives } from "@/lib/data";

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
        <label className="flex flex-1 items-center gap-3 rounded-full border border-line bg-white px-5 py-3">
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
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
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
            className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium outline-none"
            aria-label="Sort results"
          >
            <option value="rated">Top rated</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="card mt-8 bg-white p-14 text-center">
          <div className="font-display text-2xl font-semibold">
            No matches for “{q}”
          </div>
          <p className="mt-2 text-stone-warm">
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <CreativeCard key={c.slug} creative={c} />
          ))}
        </div>
      )}
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
