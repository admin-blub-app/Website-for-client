"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ConfirmationCard() {
  const params = useSearchParams();
  const creative = params.get("creative") ?? "your creative";
  const service = params.get("service") ?? "Session";
  const price = params.get("price");
  const date = params.get("date");
  const slot = params.get("slot");

  const when =
    date &&
    new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  const ref = `SN-${(date ?? "2026").replaceAll("-", "").slice(2)}${(slot ?? "A")
    .replace(/\D/g, "")
    .padStart(2, "0")}`;

  return (
    <div className="card w-full max-w-lg bg-white p-9 text-center sm:p-12">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-moss-soft">
        <svg viewBox="0 0 24 24" className="size-8 text-moss" fill="none" aria-hidden>
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="eyebrow mt-7 block">Booking confirmed</span>
      <h1 className="display mt-2 text-3xl sm:text-4xl">
        You are booked with {creative}.
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-stone-warm">
        A confirmation with all the details is on its way to your inbox. Your
        creative has your brief and will reach out if anything needs
        clarifying.
      </p>

      <div className="mt-8 space-y-3 rounded-2xl bg-cream p-6 text-left text-sm">
        <Row label="Service" value={service} />
        {when && slot && <Row label="When" value={`${when} · ${slot}`} />}
        {price && <Row label="Paid" value={`$${price}`} />}
        <Row label="Reference" value={ref} />
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/services" className="btn btn-primary">
          Browse more creatives
        </Link>
        <Link href="/home" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
      <p className="field-hint mt-5">
        Need to change something? Free cancellation up to 48 hours before your
        session.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-stone-warm">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
