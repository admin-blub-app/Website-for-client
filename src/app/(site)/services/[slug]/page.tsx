import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CreativeCard from "@/components/CreativeCard";
import { categories, creativesInCategory, getCategory } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return { title: cat.name, description: cat.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const list = creativesInCategory(cat.slug);
  const other = categories.find((c) => c.slug !== cat.slug);

  return (
    <>
      <section className="relative pt-[4.5rem]">
        <div className="relative h-[22rem] overflow-hidden md:h-[26rem]">
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />
          <div className="absolute inset-x-0 bottom-0 pb-10 text-white">
            <div className="container-x">
            <Reveal>
              <nav className="text-xs font-medium text-white/60">
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white/90">{cat.name}</span>
              </nav>
              <h1 className="display mt-3 text-4xl sm:text-6xl">{cat.name}</h1>
              <p className="mt-3 max-w-xl text-white/75">{cat.tagline}.</p>
            </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <span className="eyebrow">About this category</span>
            <p className="mt-4 text-lg leading-relaxed text-soot">
              {cat.description}
            </p>
            <Link href="/auth/signup" className="btn btn-ghost mt-8">
              Offer {cat.name.toLowerCase()} on Snatch On
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cat.crafts.map((craft) => (
                <div
                  key={craft}
                  className="card flex min-h-20 items-center justify-center p-4 text-center text-sm font-medium text-soot"
                >
                  {craft}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-shell py-16 md:py-24">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-3xl sm:text-4xl">
              {cat.name} creatives
            </h2>
            <Link href="/services#browse" className="btn btn-ghost bg-white">
              Search everyone
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 80}>
                <CreativeCard creative={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {other && (
        <section className="bg-white py-16">
          <div className="container-x">
            <Reveal>
              <Link
                href={`/services/${other.slug}`}
                className="group relative block overflow-hidden rounded-[2rem]"
              >
                <div className="relative h-56 md:h-64">
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-ink/60" />
                  <div className="absolute inset-0 flex items-center justify-between px-8 text-white md:px-14">
                    <div>
                      <div className="text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">
                        Also explore
                      </div>
                      <div className="font-display mt-2 text-3xl font-semibold md:text-4xl">
                        {other.name}
                      </div>
                    </div>
                    <span className="grid size-12 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-ember">
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                        <path
                          d="M5 12h14m-6-6 6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
