"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const labels = ["Too short", "Weak", "Okay", "Strong", "Excellent"];

export default function ResetPasswordForm() {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const s = useMemo(() => strength(pw), [pw]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (pw !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <div className="card w-full max-w-md bg-white p-8 text-center sm:p-10">
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
        <h1 className="display mt-6 text-3xl">Password updated</h1>
        <p className="mt-3 text-[0.95rem] text-stone-warm">
          Your new password is set. Log in to get back to your dashboard.
        </p>
        <Link href="/auth/login" className="btn btn-primary mt-8 w-full">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="card w-full max-w-md bg-white p-8 sm:p-10">
      <span className="eyebrow">Reset password</span>
      <h1 className="display mt-3 text-3xl">Choose a new password</h1>
      <p className="mt-3 text-[0.95rem] text-stone-warm">
        Make it long, make it unique, and let your password manager remember
        it.
      </p>
      <form onSubmit={submit} noValidate className="mt-8 space-y-5">
        <div>
          <label className="field-label" htmlFor="rp-pw">
            New password
          </label>
          <input
            id="rp-pw"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="field-input"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex flex-1 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    s > i
                      ? s <= 1
                        ? "bg-ember"
                        : s <= 2
                          ? "bg-amber-400"
                          : "bg-moss"
                      : "bg-line"
                  }`}
                />
              ))}
            </div>
            <span className="w-20 text-right text-xs font-medium text-stone-warm">
              {labels[s]}
            </span>
          </div>
        </div>
        <div>
          <label className="field-label" htmlFor="rp-confirm">
            Confirm password
          </label>
          <input
            id="rp-confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="field-input"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        {error && <p className="text-sm font-medium text-ember">{error}</p>}
        <button type="submit" className="btn btn-primary w-full">
          Update password
        </button>
      </form>
    </div>
  );
}
