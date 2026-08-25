"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  function submitCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const em = String(fd.get("email") || "");
    const pw = String(fd.get("password") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (pw.length < 8) {
      setError("Your password is at least 8 characters.");
      return;
    }
    setError("");
    setEmail(em);
    setStep("otp");
  }

  function setDigit(i: number, v: string) {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      (el as HTMLInputElement | null)?.focus();
    }
  }

  function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.join("").length < 6) {
      setError("Enter the 6-digit code we sent you.");
      return;
    }
    router.push("/demo?view=dashboard");
  }

  if (step === "otp") {
    return (
      <div className="card w-full max-w-md bg-white p-8 sm:p-10">
        <span className="eyebrow">Two-step verification</span>
        <h1 className="display mt-3 text-3xl">Check your inbox</h1>
        <p className="mt-3 text-[0.95rem] text-stone-warm">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-ink">{email}</span>. It expires in
          10 minutes.
        </p>
        <form onSubmit={submitOtp} className="mt-8">
          <div className="flex justify-between gap-2">
            {otp.map((d, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                className="field-input h-14 w-12 !p-0 text-center text-xl font-semibold"
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
          {error && (
            <p className="mt-3 text-sm font-medium text-ember">{error}</p>
          )}
          <button type="submit" className="btn btn-primary mt-7 w-full">
            Verify and log in
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between text-sm">
          <button
            onClick={() => setStep("credentials")}
            className="font-medium text-stone-warm hover:text-ink"
          >
            Use a different account
          </button>
          <button className="font-semibold text-ember hover:underline">
            Resend code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full max-w-md bg-white p-8 sm:p-10">
      <span className="eyebrow">Welcome back</span>
      <h1 className="display mt-3 text-3xl">Log in to Snatch On</h1>
      <p className="mt-3 text-[0.95rem] text-stone-warm">
        Manage your bookings, services and payouts from your creative
        dashboard.
      </p>

      <form onSubmit={submitCredentials} noValidate className="mt-8 space-y-5">
        <div>
          <label className="field-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="field-label" htmlFor="login-password">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="mb-1 text-xs font-semibold text-ember hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="field-input"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm font-medium text-ember">{error}</p>}
        <button type="submit" className="btn btn-primary w-full">
          Continue
        </button>
      </form>

      <p className="field-hint mt-4">
        Protected by two-step verification. We will send you a code after this
        step.
      </p>

      <div className="hairline mt-8 pt-6 text-center text-sm text-stone-warm">
        New to Snatch On?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-ember hover:underline"
        >
          Create your free creative page
        </Link>
      </div>
    </div>
  );
}
