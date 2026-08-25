"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { nextAvailability, weekFor } from "@/lib/availability";

const VISIBLE_ROWS = 4;

export default function AvailabilityGrid({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [weekOffset, setWeekOffset] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const week = useMemo(() => weekFor(slug, weekOffset), [slug, weekOffset]);
  const weekEmpty = week.every((d) => d.slots.length === 0);
  const next = useMemo(
    () => (weekEmpty ? nextAvailability(slug, weekOffset * 5 + 1) : null),
    [slug, weekEmpty, weekOffset],
  );
  const maxRows = Math.max(...week.map((d) => d.slots.length));
  const visible = compact ? 3 : VISIBLE_ROWS;
  const rows = expanded ? maxRows : Math.min(maxRows, visible);

  function book(dateKey: string, slot: string) {
    router.push(`/book/${slug}?date=${dateKey}&slot=${encodeURIComponent(slot)}`);
  }

  const chipText = compact ? "text-[0.65rem]" : "text-[0.72rem]";

  return (
    <div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
          disabled={weekOffset === 0}
          aria-label="Previous days"
          className="grid size-7 shrink-0 place-items-center rounded-[2px] border border-line text-soot transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="grid flex-1 grid-cols-5 gap-1.5">
          {week.map((d) => (
            <div key={d.key} className="text-center">
              <div className={`font-semibold ${compact ? "text-[0.62rem]" : "text-[0.68rem]"}`}>
                {d.day}
              </div>
              <div className={`text-fog ${compact ? "text-[0.58rem]" : "text-[0.65rem]"}`}>
                {d.label}
              </div>
            </div>
          ))}
          {!weekEmpty &&
            Array.from({ length: rows }).map((_, r) =>
              week.map((d) => (
                <div key={`${d.key}-${r}`} className="text-center">
                  {d.slots[r] ? (
                    <button
                      onClick={() => book(d.key, d.slots[r])}
                      className={`w-full rounded-[2px] bg-cream py-1.5 font-medium text-ink transition-colors hover:bg-ink hover:text-white ${chipText}`}
                    >
                      {d.slots[r]}
                    </button>
                  ) : (
                    <span className={`block py-1.5 text-line ${chipText}`}>—</span>
                  )}
                </div>
              )),
            )}
        </div>

        <button
          onClick={() => setWeekOffset((w) => w + 1)}
          aria-label="Next days"
          className="grid size-7 shrink-0 place-items-center rounded-[2px] border border-line text-soot transition-colors hover:border-ink"
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {weekEmpty && next && (
        <button
          onClick={() => setWeekOffset((w) => w + 1)}
          className="mx-auto mt-4 flex items-center gap-2 rounded-[2px] border border-line px-4 py-2.5 text-[0.78rem] font-medium text-ink transition-colors hover:border-ink"
        >
          Next availability: <span className="font-semibold">{next.label}</span>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {!weekEmpty && maxRows > visible && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 w-full text-center text-[0.72rem] font-semibold text-ink underline decoration-1 underline-offset-4"
        >
          {expanded ? "Show fewer time slots" : "See more time slots"}
        </button>
      )}
    </div>
  );
}
