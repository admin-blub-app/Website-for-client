// Deterministic mock availability, Doctolib-style: every creative gets a
// stable-looking schedule derived from a hash of their slug and the date,
// so the grid is consistent across renders and days without a backend.

export type DaySlots = {
  key: string; // yyyy-mm-dd
  day: string; // Mon
  label: string; // Aug 31
  slots: string[];
};

const SLOT_POOL = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "13:30",
  "14:30",
  "16:00",
  "17:00",
  "18:30",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function dayAt(offset: number) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
}

function slotsFor(slug: string, date: Date): string[] {
  const key = date.toISOString().slice(0, 10);
  const h = hash(`${slug}:${key}`);
  // Sundays off; roughly 1 in 4 other days fully booked.
  if (date.getDay() === 0 || h % 4 === 0) return [];
  const count = 2 + (h % 4); // 2-5 slots
  const start = h % (SLOT_POOL.length - count);
  const step = 1 + (h % 2);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = start + i * step;
    if (idx < SLOT_POOL.length) out.push(SLOT_POOL[idx]);
  }
  return out;
}

/** Five days of availability starting weekOffset weeks from tomorrow. */
export function weekFor(slug: string, weekOffset: number): DaySlots[] {
  const out: DaySlots[] = [];
  for (let i = 0; i < 5; i++) {
    const date = dayAt(1 + weekOffset * 5 + i);
    out.push({
      key: date.toISOString().slice(0, 10),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      label: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      slots: slotsFor(slug, date),
    });
  }
  return out;
}

/** First date with an open slot, looking up to 45 days ahead. */
export function nextAvailability(
  slug: string,
  fromOffset = 1,
): { key: string; label: string } | null {
  for (let i = fromOffset; i < 45 + fromOffset; i++) {
    const date = dayAt(i);
    if (slotsFor(slug, date).length > 0) {
      return {
        key: date.toISOString().slice(0, 10),
        label: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      };
    }
  }
  return null;
}
