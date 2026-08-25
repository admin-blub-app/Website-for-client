"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card w-full max-w-md bg-white p-8 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-moss-soft">
          <svg viewBox="0 0 24 24" className="size-7 text-moss" fill="none" aria-hidden>
            <path
              d="M4 7l8 6 8-6M4 7v10h16V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h1 className="display mt-6 text-3xl">Check your email</h1>
        <p className="mt-3 text-[0.95rem] text-stone-warm">
          If an account exists for{" "}
          <span className="font-semibold text-ink">{email}</span>, we sent a
          secure reset link. It expires in 30 minutes.
        </p>
        <Link href="/auth/reset-password" className="btn btn-primary mt-8 w-full">
          I have the link (demo: continue)
        </Link>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-medium text-stone-warm hover:text-ink"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="card w-full max-w-md bg-white p-8 sm:p-10">
      <span className="eyebrow">Reset password</span>
      <h1 className="display mt-3 text-3xl">Forgot your password?</h1>
      <p className="mt-3 text-[0.95rem] text-stone-warm">
        No drama. Enter your account email and we will send you a secure link
        to set a new one.
      </p>
      <form onSubmit={submit} noValidate className="mt-8 space-y-5">
        <div>
          <label className="field-label" htmlFor="fp-email">
            Email
          </label>
          <input
            id="fp-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
            placeholder="you@example.com"
          />
          {error && (
            <p className="mt-1.5 text-sm font-medium text-ember">{error}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Send reset link
        </button>
      </form>
      <div className="hairline mt-8 pt-6 text-center text-sm text-stone-warm">
        Remembered it?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-ember hover:underline"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
