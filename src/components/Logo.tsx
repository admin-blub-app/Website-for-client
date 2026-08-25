import Link from "next/link";

/**
 * Snatch On wordmark, rebuilt as a vector from the client's brand logo:
 * thin tracked uppercase letters with a chain-link in place of the O in
 * "ON". The original PNG lives at public/brand/snatchon-logo-dark.png.
 */
export function ChainLink({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      strokeWidth="1.7"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <g transform="rotate(-45 12 12)">
        <rect x="1.75" y="8.75" width="12" height="6.5" rx="3.25" />
        <rect x="10.25" y="8.75" width="12" height="6.5" rx="3.25" />
      </g>
    </svg>
  );
}

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
      className={`group inline-flex items-center ${className} ${
        light ? "text-white" : "text-ink"
      }`}
      aria-label="Snatch On home"
    >
      <span className="wordmark flex items-center text-[1.05rem]">
        <span>Snatch</span>
        <span className="w-2.5" />
        <ChainLink className="size-[1.5em] shrink-0 -translate-y-px transition-transform duration-300 group-hover:rotate-[360deg]" />
        <span className="ml-[0.08em]">N</span>
      </span>
    </Link>
  );
}
