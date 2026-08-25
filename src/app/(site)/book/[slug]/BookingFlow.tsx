"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Stars from "@/components/Stars";
import { weekFor } from "@/lib/availability";
import type { Creative, Service } from "@/lib/data";

function Flow({ creative }: { creative: Creative }) {
  const router = useRouter();
  const params = useSearchParams();
  const days = useMemo(
    () => [0, 1, 2, 3].flatMap((w) => weekFor(creative.slug, w)),
    [creative.slug],
  );

  const preselected =
    creative.services.find((s) => s.id === params.get("service")) ?? null;

  // Slots handed over from the search results calendar.
  const paramDayIndex = days.findIndex((d) => d.key === params.get("date"));
  const paramDay = paramDayIndex >= 0 ? days[paramDayIndex] : null;
  const paramSlot =
    paramDay && paramDay.slots.includes(params.get("slot") ?? "")
      ? (params.get("slot") as string)
      : "";

  const [service, setService] = useState<Service | null>(preselected);
  const [date, setDate] = useState<string>(paramDay?.key ?? "");
  const [slot, setSlot] = useState<string>(paramSlot);
  const [weekOffset, setWeekOffset] = useState(
    paramDayIndex >= 0 ? Math.floor(paramDayIndex / 5) : 0,
  );
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(
    preselected ? (paramSlot ? 3 : 2) : 1,
  );

  const week = days.slice(weekOffset * 5, weekOffset * 5 + 5);
  const weekEmpty = week.every((d) => d.slots.length === 0);
  const maxWeek = Math.floor((days.length - 1) / 5);

  const fee = service ? Math.round(service.price * 0.08) : 0;

  function confirm() {
    if (!service || !date || !slot) return;
    const q = new URLSearchParams({
      creative: creative.name,
      service: service.name,
      price: String(service.price + fee),
      date,
      slot,
    });
    router.push(`/booking/confirmation?${q}`);
  }

  const dateLabel = days.find((d) => d.key === date);

  return (
    <div className="bg-shell pt-[4.5rem]">
      <div className="container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_21rem]">
        {/* left: flow */}
        <div>
          {/* creative header */}
          <div className="flex items-center gap-4">
            <Image
              src={creative.avatar}
              alt=""
              width={56}
              height={56}
              className="rounded-2xl"
            />
            <div>
              <div className="eyebrow">Book a session</div>
              <h1 className="display mt-1 text-3xl sm:text-4xl">
                {creative.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-stone-warm">
                {creative.craft} · {creative.city}
                <Stars rating={creative.rating} />
                <Link
                  href={`/creatives/${creative.slug}`}
                  className="text-[0.65rem] font-semibold tracking-[0.12em] text-ink uppercase underline decoration-1 underline-offset-4"
                >
                  View full profile
                </Link>
              </div>
            </div>
          </div>

          {/* steps */}
          <div className="mt-8 space-y-5">
            {/* STEP 1: service */}
            <section className="card bg-white p-6 sm:p-7">
              <StepHeader
                n={1}
                title="Choose a service"
                done={!!service}
                active={step === 1}
                onEdit={() => setStep(1)}
                summary={service ? `${service.name} · $${service.price}` : ""}
              />
              {step === 1 && (
                <div className="mt-5 space-y-3">
                  {creative.services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setService(s);
                        setStep(2);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl border p-5 text-left transition-colors ${
                        service?.id === s.id
                          ? "border-ember bg-ember-soft"
                          : "border-line hover:border-ink"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{s.name}</div>
                        <div className="mt-0.5 text-sm text-stone-warm">
                          {s.description}
                        </div>
                        <div className="mt-1 text-xs text-fog">{s.duration}</div>
                      </div>
                      <span className="font-display ml-4 text-xl font-semibold">
                        ${s.price}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* STEP 2: date & time */}
            <section className="card bg-white p-6 sm:p-7">
              <StepHeader
                n={2}
                title="Pick a date and time"
                done={!!date && !!slot}
                active={step === 2}
                onEdit={() => service && setStep(2)}
                summary={
                  date && slot && dateLabel
                    ? `${dateLabel.day}, ${dateLabel.label} · ${slot}`
                    : ""
                }
              />
              {step === 2 && (
                <div className="mt-5">
                  {/* week navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
                      disabled={weekOffset === 0}
                      aria-label="Previous days"
                      className="grid size-9 place-items-center rounded-[2px] border border-line text-soot transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                        <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-stone-warm uppercase">
                      {week[0]?.label} – {week[4]?.label}
                    </span>
                    <button
                      onClick={() =>
                        setWeekOffset((w) => Math.min(maxWeek, w + 1))
                      }
                      disabled={weekOffset >= maxWeek}
                      aria-label="Next days"
                      className="grid size-9 place-items-center rounded-[2px] border border-line text-soot transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* day columns with slots */}
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {week.map((d) => (
                      <div key={d.key} className="min-w-0">
                        <div
                          className={`rounded-[3px] border px-1 py-2.5 text-center ${
                            date === d.key
                              ? "border-ink bg-ink text-white"
                              : d.slots.length === 0
                                ? "border-line opacity-45"
                                : "border-line"
                          }`}
                        >
                          <div className="text-[0.62rem] font-medium tracking-[0.1em] uppercase opacity-70">
                            {d.day}
                          </div>
                          <div className="mt-0.5 text-sm font-semibold">
                            {d.label}
                          </div>
                        </div>
                        <div className="mt-2 space-y-1.5">
                          {d.slots.length === 0 ? (
                            <div className="py-2 text-center text-[0.72rem] text-fog">
                              —
                            </div>
                          ) : (
                            d.slots.map((s) => {
                              const active = date === d.key && slot === s;
                              return (
                                <button
                                  key={s}
                                  onClick={() => {
                                    setDate(d.key);
                                    setSlot(s);
                                  }}
                                  className={`w-full rounded-[2px] py-2 text-[0.78rem] font-medium transition-colors ${
                                    active
                                      ? "bg-ink text-white"
                                      : "bg-cream text-ink hover:bg-ink hover:text-white"
                                  }`}
                                >
                                  {s}
                                </button>
                              );
                            })
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {weekEmpty && (
                    <div className="mt-4 rounded-[3px] bg-cream px-4 py-3 text-center text-sm text-stone-warm">
                      Fully booked these days. Try the next week.
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-sm text-stone-warm">
                      {date && slot && dateLabel ? (
                        <>
                          Selected:{" "}
                          <span className="font-semibold text-ink">
                            {dateLabel.day}, {dateLabel.label} · {slot}
                          </span>
                        </>
                      ) : (
                        "Pick any time that works for you."
                      )}
                    </span>
                    {date && slot && (
                      <button
                        onClick={() => setStep(3)}
                        className="btn btn-primary"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* STEP 3: brief */}
            <section className="card bg-white p-6 sm:p-7">
              <StepHeader
                n={3}
                title="Add your brief"
                done={step === 3 && notes.length > 0}
                active={step === 3}
                onEdit={() => date && slot && setStep(3)}
                summary=""
              />
              {step === 3 && (
                <div className="mt-5">
                  <textarea
                    rows={5}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="field-input resize-none"
                    placeholder={`Tell ${creative.name.split(" ")[0]} about your project: goals, style references, location details...`}
                  />
                  <p className="field-hint">
                    Optional, but bookings with a brief get delivered faster.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* right: summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card bg-white p-6">
            <div className="text-sm font-semibold text-fog">
              Booking summary
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <SummaryRow label="Creative" value={creative.name} />
              <SummaryRow
                label="Service"
                value={service ? service.name : "Not selected"}
              />
              <SummaryRow
                label="When"
                value={
                  date && slot && dateLabel
                    ? `${dateLabel.day}, ${dateLabel.label} · ${slot}`
                    : "Not selected"
                }
              />
            </div>
            <div className="hairline mt-5 space-y-2.5 pt-5 text-sm">
              <SummaryRow
                label="Service price"
                value={service ? `$${service.price}` : "-"}
              />
              <SummaryRow
                label="Snatch On fee"
                value={service ? `$${fee}` : "-"}
              />
              <div className="flex items-center justify-between pt-1 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-display text-2xl font-semibold">
                  {service ? `$${service.price + fee}` : "-"}
                </span>
              </div>
            </div>
            <button
              onClick={confirm}
              disabled={!service || !date || !slot}
              className="btn btn-ember mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm and pay
            </button>
            <p className="field-hint mt-3 text-center">
              Demo checkout. No card required, nothing is charged.
            </p>
          </div>
          <div className="card mt-4 flex items-start gap-3 bg-moss-soft p-5 text-sm text-moss">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0" fill="none" aria-hidden>
              <path
                d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Payment is held securely and only released to the creative after
            your session. Free cancellation up to 48 hours before.
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepHeader({
  n,
  title,
  done,
  active,
  summary,
  onEdit,
}: {
  n: number;
  title: string;
  done: boolean;
  active: boolean;
  summary: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className={`grid size-8 place-items-center rounded-full text-sm font-semibold ${
            done
              ? "bg-moss text-white"
              : active
                ? "bg-ink text-white"
                : "bg-cream text-fog"
          }`}
        >
          {done ? (
            <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            n
          )}
        </span>
        <div>
          <div className="font-semibold">{title}</div>
          {!active && summary && (
            <div className="text-xs text-stone-warm">{summary}</div>
          )}
        </div>
      </div>
      {!active && (
        <button
          onClick={onEdit}
          className="text-xs font-semibold text-ember hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-stone-warm">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

export default function BookingFlow({ creative }: { creative: Creative }) {
  return (
    <Suspense>
      <Flow creative={creative} />
    </Suspense>
  );
}
