"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(fd.get("name") || "").trim()) next.name = "Please add your name.";
    const email = String(fd.get("email") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email does not look right.";
    if (String(fd.get("message") || "").trim().length < 10)
      next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className="card grid min-h-[28rem] place-items-center bg-white p-10 text-center">
        <div>
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-moss-soft">
            <svg viewBox="0 0 24 24" className="size-7 text-moss" fill="none" aria-hidden>
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="font-display mt-6 text-2xl font-semibold">
            Message sent
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-stone-warm">
            Thanks for reaching out. Someone from the team will get back to you
            within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card bg-white p-8 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="c-name">
            Full name
          </label>
          <input
            id="c-name"
            name="name"
            className="field-input"
            placeholder="Alex Rivera"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-ember">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="field-label" htmlFor="c-email">
            Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            className="field-input"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-ember">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label className="field-label" htmlFor="c-topic">
          What is this about?
        </label>
        <select id="c-topic" name="topic" className="field-input">
          <option>Booking a creative</option>
          <option>I am a creative</option>
          <option>Payments & payouts</option>
          <option>Partnerships & press</option>
          <option>Something else</option>
        </select>
      </div>

      <div className="mt-5">
        <label className="field-label" htmlFor="c-message">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          className="field-input resize-none"
          placeholder="Tell us what you are working on..."
        />
        {errors.message && (
          <p className="mt-1.5 text-xs font-medium text-ember">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-7 w-full sm:w-auto">
        Send message
      </button>
      <p className="field-hint mt-4">
        By sending this form you agree to our privacy policy. We only use your
        details to reply to you.
      </p>
    </form>
  );
}
