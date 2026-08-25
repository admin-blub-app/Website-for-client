"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Types & constants                                                   */
/* ------------------------------------------------------------------ */

type ServiceDraft = { name: string; price: string; duration: string };

type Form = {
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
  location: string;
  categories: string[];
  website: string;
  instagram: string;
  x: string;
  youtube: string;
  services: ServiceDraft[];
  serviceMode: "remote" | "in-person" | "both";
  radius: string;
  payoutMethod: "bank" | "debit";
  accountName: string;
  routing: string;
  account: string;
  schedule: "instant" | "weekly";
};

const STEPS = [
  { n: 1, title: "Identification", sub: "Who you are" },
  { n: 2, title: "Profile", sub: "How clients find you" },
  { n: 3, title: "Services to offer", sub: "What they book" },
  { n: 4, title: "Location of service", sub: "Where you work" },
  { n: 5, title: "Payment information", sub: "How you get paid" },
];

const CATEGORY_KEYWORDS = [
  "Portrait photography",
  "Wedding photography",
  "Product photography",
  "Event coverage",
  "Videography",
  "Drone & aerial",
  "Photo editing",
  "Logo design",
  "Brand identity",
  "Packaging design",
  "Illustration",
  "Murals",
  "Social media design",
  "Motion graphics",
  "Web design",
  "Album art",
];

const initial: Form = {
  name: "",
  email: "",
  password: "",
  phone: "",
  bio: "",
  location: "",
  categories: [],
  website: "",
  instagram: "",
  x: "",
  youtube: "",
  services: [{ name: "", price: "", duration: "" }],
  serviceMode: "both",
  radius: "25",
  payoutMethod: "bank",
  accountName: "",
  routing: "",
  account: "",
  schedule: "weekly",
};

function pwStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

/* ------------------------------------------------------------------ */
/* Wizard                                                              */
/* ------------------------------------------------------------------ */

export default function SignupWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [catQuery, setCatQuery] = useState("");
  const [done, setDone] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const filteredKeywords = useMemo(() => {
    const needle = catQuery.trim().toLowerCase();
    return CATEGORY_KEYWORDS.filter(
      (k) =>
        !form.categories.includes(k) &&
        (!needle || k.toLowerCase().includes(needle)),
    ).slice(0, 8);
  }, [catQuery, form.categories]);

  function validate(current: number) {
    const e: Record<string, string> = {};
    if (current === 1) {
      if (form.name.trim().length < 2) e.name = "Please add your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "That email does not look right.";
      if (pwStrength(form.password) < 2)
        e.password = "Use at least 8 characters with a mix of cases or numbers.";
      if (form.phone.replace(/\D/g, "").length < 10)
        e.phone = "Add a phone number we can send verification codes to.";
    }
    if (current === 2) {
      if (!form.location.trim()) e.location = "Location is required.";
      if (form.categories.length === 0)
        e.categories = "Pick at least one category keyword.";
    }
    if (current === 3) {
      const valid = form.services.filter(
        (s) => s.name.trim() && Number(s.price) > 0,
      );
      if (valid.length === 0)
        e.services = "Add at least one service with a name and a price.";
    }
    if (current === 4) {
      if (
        form.serviceMode !== "remote" &&
        (!form.radius || Number(form.radius) <= 0)
      )
        e.radius = "Set how far you will travel.";
    }
    if (current === 5) {
      if (!form.accountName.trim())
        e.accountName = "Add the name on the account.";
      if (form.payoutMethod === "bank") {
        if (form.routing.replace(/\D/g, "").length !== 9)
          e.routing = "Routing numbers have 9 digits.";
        if (form.account.replace(/\D/g, "").length < 6)
          e.account = "That account number looks too short.";
      } else if (form.account.replace(/\D/g, "").length < 12) {
        e.account = "Enter the debit card number for instant payouts.";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate(step)) return;
    if (step === 5) {
      setDone(true);
      return;
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setErrors({});
    setStep(Math.max(1, step - 1));
  }

  /* ---------------------------------------------------------------- */

  if (done) {
    return (
      <div className="card w-full max-w-xl bg-white p-10 text-center sm:p-14">
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
        <h1 className="display mt-7 text-4xl">You are on, {form.name.split(" ")[0] || "creative"}.</h1>
        <p className="mx-auto mt-4 max-w-md text-stone-warm">
          Your creative page is ready to publish. We sent a verification code
          to <span className="font-semibold text-ink">{form.email}</span> and{" "}
          <span className="font-semibold text-ink">{form.phone}</span> to
          switch on two-step verification.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/demo?view=dashboard" className="btn btn-ember">
            Preview your dashboard
          </Link>
          <Link href="/home" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      {/* progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Create your free creative page</span>
          <span className="text-xs font-semibold text-fog">
            Step {step} of 5
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {STEPS.map((s) => (
            <span
              key={s.n}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                s.n <= step ? "bg-ember" : "bg-line"
              }`}
            />
          ))}
        </div>
        <h1 className="display mt-5 text-3xl sm:text-4xl">
          {STEPS[step - 1].title}
        </h1>
        <p className="mt-1.5 text-stone-warm">{STEPS[step - 1].sub}</p>
      </div>

      <div className="card bg-white p-7 sm:p-9">
        {/* ---------------- STEP 1: Identification ---------------- */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="field-label" htmlFor="su-name">
                Full name
              </label>
              <input
                id="su-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="field-input"
                placeholder="Alex Rivera"
                autoComplete="name"
              />
              {errors.name && <Err msg={errors.name} />}
            </div>
            <div>
              <label className="field-label" htmlFor="su-email">
                Email
              </label>
              <input
                id="su-email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="field-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <Err msg={errors.email} />}
            </div>
            <div>
              <label className="field-label" htmlFor="su-password">
                Password
              </label>
              <input
                id="su-password"
                type="password"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                className="field-input"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
              <PwMeter pw={form.password} />
              {errors.password && <Err msg={errors.password} />}
            </div>
            <div>
              <label className="field-label" htmlFor="su-phone">
                Phone number
              </label>
              <input
                id="su-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="field-input"
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />
              {errors.phone && <Err msg={errors.phone} />}
              <p className="field-hint">
                Used for 2-step verification. We text you a code when you log
                in from a new device.
              </p>
            </div>
          </div>
        )}

        {/* ---------------- STEP 2: Profile ---------------- */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="field-label" htmlFor="su-bio">
                Bio <span className="font-normal text-fog">(optional)</span>
              </label>
              <textarea
                id="su-bio"
                rows={4}
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                className="field-input resize-none"
                placeholder="Tell clients what you make and how you work..."
              />
            </div>
            <div>
              <label className="field-label" htmlFor="su-location">
                Location <span className="text-ember">*</span>
              </label>
              <input
                id="su-location"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                className="field-input"
                placeholder="Atlanta, GA"
              />
              {errors.location && <Err msg={errors.location} />}
            </div>
            <div>
              <label className="field-label" htmlFor="su-cat">
                Category <span className="text-ember">*</span>
              </label>
              {form.categories.length > 0 && (
                <div className="mb-2.5 flex flex-wrap gap-2">
                  {form.categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() =>
                        set(
                          "categories",
                          form.categories.filter((x) => x !== c),
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-full bg-ember-soft px-3 py-1.5 text-xs font-semibold text-ember-deep"
                    >
                      {c}
                      <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
              <input
                id="su-cat"
                value={catQuery}
                onChange={(e) => setCatQuery(e.target.value)}
                className="field-input"
                placeholder="Search keywords: portrait, logo, drone..."
              />
              {filteredKeywords.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {filteredKeywords.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => {
                        set("categories", [...form.categories, k]);
                        setCatQuery("");
                      }}
                      className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-soot transition-colors hover:border-ember hover:text-ember"
                    >
                      + {k}
                    </button>
                  ))}
                </div>
              )}
              {errors.categories && <Err msg={errors.categories} />}
              <p className="field-hint">
                These searchable keywords decide when you show up in results.
              </p>
            </div>

            <div className="hairline pt-5">
              <div className="field-label mb-3">Social links</div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SocialInput
                  label="Website"
                  value={form.website}
                  onChange={(v) => set("website", v)}
                  placeholder="yoursite.com"
                />
                <SocialInput
                  label="Instagram"
                  value={form.instagram}
                  onChange={(v) => set("instagram", v)}
                  placeholder="@handle"
                />
                <SocialInput
                  label="X"
                  value={form.x}
                  onChange={(v) => set("x", v)}
                  placeholder="@handle"
                />
                <SocialInput
                  label="YouTube"
                  value={form.youtube}
                  onChange={(v) => set("youtube", v)}
                  placeholder="youtube.com/@channel"
                />
              </div>
            </div>
          </div>
        )}

        {/* ---------------- STEP 3: Services ---------------- */}
        {step === 3 && (
          <div className="space-y-5">
            {form.services.map((s, i) => (
              <div key={i} className="rounded-xl border border-line p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-soot">
                    Service {i + 1}
                  </span>
                  {form.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "services",
                          form.services.filter((_, j) => j !== i),
                        )
                      }
                      className="text-xs font-semibold text-ember hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
                  <div>
                    <label className="field-label">Service name</label>
                    <input
                      value={s.name}
                      onChange={(e) => {
                        const next = [...form.services];
                        next[i] = { ...s, name: e.target.value };
                        set("services", next);
                      }}
                      className="field-input"
                      placeholder="Portrait session"
                    />
                  </div>
                  <div>
                    <label className="field-label">Price (USD)</label>
                    <input
                      inputMode="numeric"
                      value={s.price}
                      onChange={(e) => {
                        const next = [...form.services];
                        next[i] = { ...s, price: e.target.value };
                        set("services", next);
                      }}
                      className="field-input"
                      placeholder="180"
                    />
                  </div>
                  <div>
                    <label className="field-label">Duration</label>
                    <input
                      value={s.duration}
                      onChange={(e) => {
                        const next = [...form.services];
                        next[i] = { ...s, duration: e.target.value };
                        set("services", next);
                      }}
                      className="field-input"
                      placeholder="1 hr"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                set("services", [
                  ...form.services,
                  { name: "", price: "", duration: "" },
                ])
              }
              className="btn btn-ghost w-full"
            >
              + Add another service
            </button>
            {errors.services && <Err msg={errors.services} />}
            <p className="field-hint">
              You set the price, you keep control. Snatch On adds a small
              service fee at checkout, never out of your payout.
            </p>
          </div>
        )}

        {/* ---------------- STEP 4: Location of service ---------------- */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["remote", "Remote", "Deliver online from anywhere"],
                  ["in-person", "In person", "On location with the client"],
                  ["both", "Both", "Flexible depending on the job"],
                ] as const
              ).map(([value, label, sub]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set("serviceMode", value)}
                  className={`rounded-xl border p-5 text-left transition-all ${
                    form.serviceMode === value
                      ? "border-ember bg-ember-soft"
                      : "border-line hover:border-ink"
                  }`}
                >
                  <div className="text-[0.95rem] font-semibold">{label}</div>
                  <div className="mt-1 text-xs text-stone-warm">{sub}</div>
                </button>
              ))}
            </div>

            {form.serviceMode !== "remote" && (
              <div>
                <label className="field-label" htmlFor="su-radius">
                  Travel radius (miles)
                </label>
                <input
                  id="su-radius"
                  inputMode="numeric"
                  value={form.radius}
                  onChange={(e) => set("radius", e.target.value)}
                  className="field-input sm:max-w-48"
                  placeholder="25"
                />
                {errors.radius && <Err msg={errors.radius} />}
                <p className="field-hint">
                  Measured from {form.location || "your profile location"}.
                  Clients outside this radius see you as remote-only.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ---------------- STEP 5: Payment information ---------------- */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["bank", "Bank transfer", "Free, arrives in 1-2 business days"],
                  ["debit", "Debit card", "Instant payout, 1% fee"],
                ] as const
              ).map(([value, label, sub]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set("payoutMethod", value)}
                  className={`rounded-xl border p-5 text-left transition-all ${
                    form.payoutMethod === value
                      ? "border-ember bg-ember-soft"
                      : "border-line hover:border-ink"
                  }`}
                >
                  <div className="text-[0.95rem] font-semibold">{label}</div>
                  <div className="mt-1 text-xs text-stone-warm">{sub}</div>
                </button>
              ))}
            </div>

            <div>
              <label className="field-label" htmlFor="su-acct-name">
                Name on account
              </label>
              <input
                id="su-acct-name"
                value={form.accountName}
                onChange={(e) => set("accountName", e.target.value)}
                className="field-input"
                placeholder={form.name || "Alex Rivera"}
              />
              {errors.accountName && <Err msg={errors.accountName} />}
            </div>

            {form.payoutMethod === "bank" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="su-routing">
                    Routing number
                  </label>
                  <input
                    id="su-routing"
                    inputMode="numeric"
                    value={form.routing}
                    onChange={(e) => set("routing", e.target.value)}
                    className="field-input"
                    placeholder="9 digits"
                  />
                  {errors.routing && <Err msg={errors.routing} />}
                </div>
                <div>
                  <label className="field-label" htmlFor="su-account">
                    Account number
                  </label>
                  <input
                    id="su-account"
                    inputMode="numeric"
                    value={form.account}
                    onChange={(e) => set("account", e.target.value)}
                    className="field-input"
                    placeholder="Account number"
                  />
                  {errors.account && <Err msg={errors.account} />}
                </div>
              </div>
            ) : (
              <div>
                <label className="field-label" htmlFor="su-card">
                  Debit card number
                </label>
                <input
                  id="su-card"
                  inputMode="numeric"
                  value={form.account}
                  onChange={(e) => set("account", e.target.value)}
                  className="field-input"
                  placeholder="Card number"
                />
                {errors.account && <Err msg={errors.account} />}
              </div>
            )}

            <div>
              <div className="field-label">Payout schedule</div>
              <div className="flex gap-3">
                {(
                  [
                    ["weekly", "Weekly, every Friday"],
                    ["instant", "After every job"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set("schedule", value)}
                    className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                      form.schedule === value
                        ? "border-ink bg-ink text-white"
                        : "border-line text-soot hover:border-ink"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-cream p-4 text-[0.8rem] leading-relaxed text-stone-warm">
              Payouts are processed by Stripe. Your details are encrypted and
              never stored on Snatch On servers. This is a demo form, so
              please do not enter real account numbers.
            </div>
          </div>
        )}

        {/* nav */}
        <div className="mt-9 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={back} className="btn btn-ghost">
              Back
            </button>
          ) : (
            <Link href="/auth/login" className="text-sm font-medium text-stone-warm hover:text-ink">
              Already have an account?
            </Link>
          )}
          <button type="button" onClick={next} className="btn btn-ember">
            {step === 5 ? "Finish and create my page" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Err({ msg }: { msg: string }) {
  return <p className="mt-1.5 text-xs font-medium text-ember">{msg}</p>;
}

function PwMeter({ pw }: { pw: string }) {
  const s = pwStrength(pw);
  if (!pw) return null;
  const labels = ["Too short", "Weak", "Okay", "Strong", "Excellent"];
  return (
    <div className="mt-2 flex items-center gap-2">
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
  );
}

function SocialInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
        placeholder={placeholder}
      />
    </div>
  );
}
