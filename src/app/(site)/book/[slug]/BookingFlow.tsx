"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Stars from "@/components/Stars";
import type { Creative, Service } from "@/lib/data";

const SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"];

function nextDays(count: number) {
  const out: { key: string; label: string; day: string }[] = [];
  const d = new Date();
  for (let i = 1; i <= count; i++) {
    const date = new Date(d);
    date.setDate(d.getDate() + i);
    out.push({
      key: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return out;
}

function Flow({ creative }: { creative: Creative }) {
  const router = useRouter();
  const params = useSearchParams();
  const days = useMemo(() => nextDays(8), []);

  const preselected =
    creative.services.find((s) => s.id === params.get("service")) ?? null;

  const [service, setService] = useState<Service | null>(preselected);
  const [date, setDate] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(preselected ? 2 : 1);

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
      <div className="container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_22rem]">
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
              <div className="mt-1 flex items-center gap-3 text-sm text-stone-warm">
                {creative.craft} · {creative.city}
                <Stars rating={creative.rating} />
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
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {days.map((d) => (
                      <button
                        key={d.key}
                        onClick={() => setDate(d.key)}
                        className={`min-w-[4.5rem] rounded-xl border px-3 py-3 text-center transition-colors ${
                          date === d.key
                            ? "border-ink bg-ink text-white"
                            : "border-line bg-white hover:border-ink"
                        }`}
                      >
                        <div className="text-[0.68rem] font-medium opacity-70">
                          {d.day}
                        </div>
                        <div className="mt-0.5 text-sm font-semibold">
                          {d.label}
                        </div>
                      </button>
                    ))}
                  </div>
                  {date && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {SLOTS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSlot(s)}
                          className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                            slot === s
                              ? "border-ember bg-ember text-white"
                              : "border-line bg-white hover:border-ink"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  {date && slot && (
                    <button
                      onClick={() => setStep(3)}
                      className="btn btn-primary mt-6"
                    >
                      Continue
                    </button>
                  )}
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
