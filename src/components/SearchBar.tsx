"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [where, setWhere] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (where) params.set("where", where);
    router.push(`/services${params.size ? `?${params}` : ""}`);
  }

  return (
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
          placeholder="Photographer, designer, filmmaker..."
          className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-fog"
          aria-label="What are you looking for?"
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
          placeholder="City or remote"
          className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-fog"
          aria-label="Where?"
        />
      </label>
      <button type="submit" className="btn btn-ember m-1 sm:m-0">
        Search
      </button>
    </form>
  );
}
