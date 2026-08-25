import Reveal from "@/components/Reveal";

export type LegalSection = { title: string; paragraphs: string[] };

export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="bg-cream pt-[4.5rem]">
        <div className="container-x py-14 md:py-20">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">
              {title}
            </h1>
            <p className="mt-4 text-sm font-medium text-fog">
              Last updated: {updated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1 border-l border-line pl-5">
              {sections.map((s, i) => (
                <a
                  key={s.title}
                  href={`#section-${i + 1}`}
                  className="block py-1.5 text-[0.85rem] font-medium text-stone-warm transition-colors hover:text-ink"
                >
                  {i + 1}. {s.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-soot">{intro}</p>
            {sections.map((s, i) => (
              <section
                key={s.title}
                id={`section-${i + 1}`}
                className="mt-12 scroll-mt-28"
              >
                <h2 className="font-display text-2xl font-semibold">
                  {i + 1}. {s.title}
                </h2>
                {s.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="mt-4 leading-relaxed text-stone-warm"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <div className="card mt-14 bg-cream p-7">
              <div className="font-semibold">Questions about this policy?</div>
              <p className="mt-2 text-sm text-stone-warm">
                Write to us at{" "}
                <a
                  href="mailto:legal@snatchon.com"
                  className="font-semibold text-ember hover:underline"
                >
                  legal@snatchon.com
                </a>{" "}
                and we will get back to you within two business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
