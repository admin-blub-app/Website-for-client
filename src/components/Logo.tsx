import Link from "next/link";

export default function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Snatch On home"
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-ember text-white transition-transform duration-300 group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path
            d="M6 4h9a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h9"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={`font-display text-[1.35rem] font-semibold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Snatch&nbsp;On
      </span>
    </Link>
  );
}
