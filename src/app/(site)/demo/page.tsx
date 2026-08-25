import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import DemoTabs from "./DemoTabs";

export const metadata: Metadata = {
  title: "Live demo",
  description:
    "See how a creative page and dashboard look on Snatch On with this demo profile.",
};

export default function DemoPage() {
  return (
    <>
      <section className="bg-cream pt-[4.5rem]">
        <div className="container-x py-14 text-center md:py-20">
          <Reveal>
            <span className="eyebrow">Live demo</span>
            <h1 className="display mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">
              This is what you get on day one.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-stone-warm">
              A real creative page clients can book, and a dashboard that runs
              your business. Explore both below, no account needed.
            </p>
          </Reveal>
        </div>
      </section>
      <DemoTabs />
    </>
  );
}
