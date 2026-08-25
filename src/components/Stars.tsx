export default function Stars({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label={`Rated ${rating} out of 5`}
    >
      <svg viewBox="0 0 20 20" className="size-4 fill-ember" aria-hidden>
        <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6l-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6z" />
      </svg>
      <span className="text-sm font-semibold text-ink">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}
