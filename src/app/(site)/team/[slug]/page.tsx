import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamMember, team } from "@/lib/team";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getTeamMember(slug);
  if (!m) return {};
  return {
    title: `${m.name} | ${m.role}`,
    description: m.bio[0],
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const others = team.filter((m) => m.slug !== member.slug);

  return (
    <div className="bg-white pt-[4.5rem]">
      <div className="container-x py-12 md:py-16">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.16em] text-stone-warm uppercase transition-colors hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to the team
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[24rem_minmax(0,1fr)]">
          {/* photo */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-cream">
              <Image
                src={member.img}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {member.socials.map((s) => (
                <span
                  key={s.label}
                  className="rounded-[2px] border border-line px-3.5 py-2 text-[0.65rem] font-medium tracking-[0.14em] text-soot uppercase"
                >
                  {s.label} · {s.handle}
                </span>
              ))}
            </div>
          </div>

          {/* story */}
          <div>
            <span className="eyebrow">{member.role}</span>
            <h1 className="display mt-3 text-4xl sm:text-5xl">{member.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-stone-warm">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                <path
                  d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              {member.location}
            </div>

            <div className="mt-8 max-w-2xl space-y-5">
              {member.bio.map((p, i) => (
                <p key={i} className="text-[1.02rem] leading-relaxed text-soot">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 max-w-2xl rounded-[3px] bg-cream p-5 text-[0.92rem] text-soot">
              <span className="font-semibold">Fun fact:</span> {member.funFact}
            </div>

            {/* rest of the team */}
            <div className="hairline mt-12 pt-9">
              <h2 className="text-[0.72rem] font-semibold tracking-[0.24em] text-ink uppercase">
                The rest of the team
              </h2>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {others.map((m) => (
                  <Link key={m.slug} href={`/team/${m.slug}`} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-[3px] bg-cream">
                      <Image
                        src={m.img}
                        alt={m.name}
                        fill
                        sizes="(max-width: 1024px) 33vw, 15rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-2.5 text-sm font-medium underline-offset-4 group-hover:underline">
                      {m.name}
                    </div>
                    <div className="text-xs text-stone-warm">{m.role}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Work with us
              </Link>
              <Link href="/about" className="btn btn-ghost">
                Back to About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
