import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/team";

export default function TeamGrid() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
      {team.map((m) => (
        <Link key={m.slug} href={`/team/${m.slug}`} className="group block">
          <div className="relative aspect-square overflow-hidden rounded-[4px] bg-cream">
            <Image
              src={m.img}
              alt={m.name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-ink/85 py-2.5 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur transition-transform duration-300 group-hover:translate-y-0">
              Read their story
            </span>
          </div>
          <div className="mt-4 text-[0.98rem] font-medium underline-offset-4 group-hover:underline">
            {m.name}
          </div>
          <div className="text-sm text-stone-warm">{m.role}</div>
        </Link>
      ))}
    </div>
  );
}
