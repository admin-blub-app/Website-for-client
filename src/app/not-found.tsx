import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6">
      <div className="text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="font-display mt-10 text-8xl font-semibold text-ember">
          404
        </div>
        <h1 className="display mt-4 text-3xl">
          This page took a creative detour.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-stone-warm">
          The page you are looking for does not exist or has moved. Let us get
          you back to the good stuff.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/home" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/services" className="btn btn-ghost bg-white">
            Explore services
          </Link>
        </div>
      </div>
    </div>
  );
}
