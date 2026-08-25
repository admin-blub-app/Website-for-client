"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories, creatives } from "@/lib/data";

const CITIES: { name: string; country: string }[] = [
  { name: "Atlanta, GA", country: "USA" },
  { name: "Austin, TX", country: "USA" },
  { name: "Brooklyn, NY", country: "USA" },
  { name: "Chicago, IL", country: "USA" },
  { name: "Los Angeles, CA", country: "USA" },
  { name: "Miami, FL", country: "USA" },
  { name: "Nashville, TN", country: "USA" },
  { name: "Seattle, WA", country: "USA" },
  { name: "Toronto", country: "Canada" },
  { name: "Vancouver", country: "Canada" },
  { name: "London", country: "United Kingdom" },
  { name: "Manchester", country: "United Kingdom" },
  { name: "Paris", country: "France" },
  { name: "Lyon", country: "France" },
  { name: "Berlin", country: "Germany" },
  { name: "Munich", country: "Germany" },
  { name: "Amsterdam", country: "Netherlands" },
  { name: "Madrid", country: "Spain" },
  { name: "Barcelona", country: "Spain" },
  { name: "Milan", country: "Italy" },
  { name: "Lisbon", country: "Portugal" },
  { name: "Dubai", country: "UAE" },
  { name: "Singapore", country: "Singapore" },
  { name: "Sydney", country: "Australia" },
  { name: "Melbourne", country: "Australia" },
  { name: "Mexico City", country: "Mexico" },
  { name: "São Paulo", country: "Brazil" },
  { name: "Tokyo", country: "Japan" },
  { name: "Mumbai", country: "India" },
  { name: "Remote", country: "Anywhere" },
];

const KEYWORDS = Array.from(
  new Set([
    ...categories.flatMap((c) => c.crafts),
    ...creatives.flatMap((c) => c.tags),
    "Photographer",
    "Videographer",
    "Designer",
    "Illustrator",
  ]),
).sort();

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [where, setWhere] = useState("");
  const [focus, setFocus] = useState<"what" | "where" | null>(null);
  const blurTimer = useRef<number | null>(null);

  const keywordMatches = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return KEYWORDS.slice(0, 5);
    return KEYWORDS.filter((k) => k.toLowerCase().includes(needle)).slice(0, 5);
  }, [q]);

  const creativeMatches = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return creatives
      .filter((c) =>
        [c.name, c.craft, c.city, ...c.tags]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
      .slice(0, 4);
  }, [q]);

  const cityMatches = useMemo(() => {
    const needle = where.trim().toLowerCase();
    if (!needle) return CITIES.slice(0, 8);
    return CITIES.filter((c) =>
      `${c.name} ${c.country}`.toLowerCase().includes(needle),
    ).slice(0, 8);
  }, [where]);

  function openPanel(which: "what" | "where") {
    if (blurTimer.current) window.clearTimeout(blurTimer.current);
    setFocus(which);
  }

  function scheduleClose() {
    blurTimer.current = window.setTimeout(() => setFocus(null), 120);
  }

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (where && where !== "Remote") params.set("where", where);
    setFocus(null);
    router.push(`/services${params.size ? `?${params}` : ""}#browse`);
  }

  return (
    <div className="relative">
      <form
        onSubmit={submit}
        className={`flex w-full flex-col gap-2 rounded-[3px] border border-line bg-white p-2 shadow-[0_12px_40px_-16px_rgb(18_18_18/0.16)] sm:flex-row sm:items-center ${
          compact ? "" : "sm:p-2.5"
        }`}
      >
        <label className="flex flex-1 items-center gap-3 px-4 py-2.5">
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-fog" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => openPanel("what")}
            onBlur={scheduleClose}
            placeholder="Photographer, designer, filmmaker..."
            className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-fog"
            aria-label="What are you looking for?"
            autoComplete="off"
          />
        </label>
        <div className="hidden h-8 w-px bg-line sm:block" />
        <label className="flex flex-1 items-center gap-3 border-t border-line px-4 py-2.5 sm:border-t-0">
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-fog" fill="none" aria-hidden>
            <path
              d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            onFocus={() => openPanel("where")}
            onBlur={scheduleClose}
            placeholder="City or remote"
            className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-fog"
            aria-label="Where?"
            autoComplete="off"
          />
        </label>
        <button type="submit" className="btn btn-ember m-1 sm:m-0">
          Search
        </button>
      </form>

      {/* what suggestions */}
      {focus === "what" && (keywordMatches.length > 0 || creativeMatches.length > 0) && (
        <div className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-[3px] border border-line bg-white shadow-[0_24px_60px_-20px_rgb(18_18_18/0.25)] sm:right-auto sm:w-[26rem]">
          {keywordMatches.length > 0 && (
            <div className="p-2">
              <div className="px-3 pt-2 pb-1 text-[0.6rem] font-semibold tracking-[0.2em] text-fog uppercase">
                Services
              </div>
              {keywordMatches.map((k) => (
                <button
                  key={k}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setQ(k);
                    setFocus(null);
                    router.push(`/services?q=${encodeURIComponent(k)}#browse`);
                  }}
                  className="flex w-full items-center gap-3 rounded-[2px] px-3 py-2.5 text-left text-[0.9rem] hover:bg-cream"
                >
                  <svg viewBox="0 0 24 24" className="size-4 text-fog" fill="none" aria-hidden>
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {k}
                </button>
              ))}
            </div>
          )}
          {creativeMatches.length > 0 && (
            <div className="border-t border-line p-2">
              <div className="px-3 pt-2 pb-1 text-[0.6rem] font-semibold tracking-[0.2em] text-fog uppercase">
                Creatives
              </div>
              {creativeMatches.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setFocus(null);
                    router.push(`/creatives/${c.slug}`);
                  }}
                  className="flex w-full items-center gap-3 rounded-[2px] px-3 py-2.5 text-left hover:bg-cream"
                >
                  <Image
                    src={c.avatar}
                    alt=""
                    width={34}
                    height={34}
                    className="rounded-full"
                  />
                  <span>
                    <span className="block text-[0.9rem] font-medium">
                      {c.name}
                    </span>
                    <span className="block text-xs text-stone-warm">
                      {c.craft} · {c.city}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* where suggestions */}
      {focus === "where" && (
        <div className="absolute top-full right-0 left-0 z-40 mt-2 overflow-hidden rounded-[3px] border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgb(18_18_18/0.25)] sm:left-auto sm:w-80">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setWhere("");
              setFocus(null);
              submit();
            }}
            className="flex w-full items-center gap-3 rounded-[2px] px-3 py-2.5 text-left text-[0.9rem] font-medium hover:bg-cream"
          >
            <svg viewBox="0 0 24 24" className="size-4 text-ink" fill="none" aria-hidden>
              <path
                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Around me
          </button>
          {cityMatches.map((c) => (
            <button
              key={c.name}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setWhere(c.name);
                setFocus(null);
              }}
              className="flex w-full items-center justify-between rounded-[2px] px-3 py-2.5 text-left text-[0.9rem] hover:bg-cream"
            >
              <span>{c.name}</span>
              <span className="text-xs text-fog">{c.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
