import Image from "next/image";
import Link from "next/link";
import type { Creative } from "@/lib/data";
import Stars from "./Stars";

export default function CreativeCard({ creative }: { creative: Creative }) {
  return (
    <Link
      href={`/book/${creative.slug}`}
      className="card card-hover group block overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={creative.image}
          alt={`Work by ${creative.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
          from ${creative.from}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={creative.avatar}
              alt=""
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <div className="text-[0.95rem] font-semibold text-ink">
                {creative.name}
              </div>
              <div className="text-[0.8rem] text-stone-warm">
                {creative.craft}
              </div>
            </div>
          </div>
          <Stars rating={creative.rating} />
        </div>
        <div className="mt-4 flex items-center justify-between text-[0.8rem] text-stone-warm">
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
              <path
                d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {creative.city}
          </span>
          <span>{creative.reviews} reviews</span>
        </div>
      </div>
    </Link>
  );
}
