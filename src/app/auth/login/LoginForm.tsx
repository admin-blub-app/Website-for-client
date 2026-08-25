"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setSession } from "@/lib/demoSession";

const DEMO_ACCOUNTS = [
  {
    role: "Professional",
    email: "pro@snatchon.com",
    destination: "/demo?view=dashboard",
    blurb: "See the creator dashboard: bookings, payouts, services.",
  },
  {
    role: "Customer",
    email: "client@snatchon.com",
    destination: "/account",
    blurb: "See the client area: your bookings, rebooking, payment methods.",
  },
] as const;

const DEMO_PASSWORD = "demo1234";

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  function destinationFor(em: string) {
    const demo = DEMO_ACCOUNTS.find(
      (d) => d.email.toLowerCase() === em.trim().toLowerCase(),
    );
    return demo ? demo.destination : "/demo?view=dashboard";
  }

  function submitCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Your password is at least 8 characters.");
      return;
    }
    setError("");
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
    const isClient =
      email.trim().toLowerCase() === "client@snatchon.com";
    setSession(isClient ? "client" : "pro");
    router.push(destinationFor(email));
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
          {DEMO_ACCOUNTS.some(
            (d) => d.email === email.trim().toLowerCase(),
          ) && (
            <span className="mt-1 block text-xs text-fog">
              Demo account: any 6 digits work.
            </span>
          )}
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
          <button className="font-semibold text-ink hover:underline">
            Resend code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="card bg-white p-8 sm:p-10">
        <span className="eyebrow">Welcome back</span>
        <h1 className="display mt-3 text-3xl">Log in to Snatch On</h1>
        <p className="mt-3 text-[0.95rem] text-stone-warm">
          Manage your bookings, services and payouts.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                className="mb-1 text-xs font-semibold text-ink hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Protected by two-step verification. We will send you a code after
          this step.
        </p>

        <div className="hairline mt-8 pt-6 text-center text-sm text-stone-warm">
          New to Snatch On?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-ink hover:underline"
          >
            Create your free creative page
          </Link>
        </div>
      </div>

      {/* demo accounts */}
      <div className="card mt-4 bg-white p-6">
        <div className="text-[0.65rem] font-semibold tracking-[0.24em] text-stone-warm uppercase">
          Demo accounts
        </div>
        <div className="mt-4 space-y-3">
          {DEMO_ACCOUNTS.map((d) => (
            <button
              key={d.email}
              type="button"
              onClick={() => {
                setEmail(d.email);
                setPassword(DEMO_PASSWORD);
                setError("");
              }}
              className="group flex w-full items-center justify-between gap-4 rounded-[3px] border border-line p-4 text-left transition-colors hover:border-ink"
            >
              <div>
                <div className="text-sm font-medium">
                  {d.role}{" "}
                  <span className="font-normal text-stone-warm">
                    · {d.email}
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-stone-warm">{d.blurb}</div>
              </div>
              <span className="rounded-[2px] border border-line px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.14em] uppercase transition-colors group-hover:border-ink">
                Use
              </span>
            </button>
          ))}
        </div>
        <p className="field-hint mt-3">
          Password fills in automatically ({DEMO_PASSWORD}). Any 6-digit code
          passes verification.
        </p>
      </div>
    </div>
  );
}
