import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Questions about booking, payouts or partnerships? Talk to the Snatch On team. We answer within one business day.",
};

export default function ContactPage() {
  return (
    <section className="bg-cream pt-[4.5rem]">
      <div className="container-x grid gap-14 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <span className="eyebrow">Contact us</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-4 text-4xl sm:text-5xl">
              Talk to a human.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-stone-warm">
              Whether you are a client with a project, a creative with a
              question, or a partner with an idea, we answer within one
              business day.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-10 space-y-5">
            <div className="card bg-white p-6">
              <div className="text-xs font-semibold tracking-[0.14em] text-fog uppercase">
                Email
              </div>
              <a
                href="mailto:hello@snatchon.com"
                className="mt-1 block text-lg font-semibold text-ink hover:text-ember"
              >
                hello@snatchon.com
              </a>
            </div>
            <div className="card bg-white p-6">
              <div className="text-xs font-semibold tracking-[0.14em] text-fog uppercase">
                Creator support
              </div>
              <a
                href="mailto:creators@snatchon.com"
                className="mt-1 block text-lg font-semibold text-ink hover:text-ember"
              >
                creators@snatchon.com
              </a>
            </div>
            <div className="card bg-white p-6">
              <div className="text-xs font-semibold tracking-[0.14em] text-fog uppercase">
                Headquarters
              </div>
              <div className="mt-1 text-lg font-semibold">Atlanta, GA</div>
              <div className="text-sm text-stone-warm">
                Remote-first, everywhere creatives are.
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
