import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-ink text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Image
          src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="45vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="relative">
          <Logo light />
        </div>
        <div className="relative">
          <blockquote className="font-display max-w-md text-3xl leading-snug font-medium">
            “Snatch On replaced my DMs, my invoices and my calendar juggling.
            Clients book, I create.”
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <Image
              src="https://i.pravatar.cc/96?img=68"
              alt=""
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <div className="text-sm font-semibold">Marcus Bell</div>
              <div className="text-xs text-white/60">
                Photographer on Snatch On
              </div>
            </div>
          </div>
        </div>
        <div className="relative text-xs text-white/40">
          © {new Date().getFullYear()} Snatch On, Inc.
        </div>
      </aside>

      {/* Form panel */}
      <div className="flex flex-col bg-shell">
        <div className="flex items-center justify-between px-6 py-5 lg:px-12">
          <span className="lg:hidden">
            <Logo />
          </span>
          <span className="hidden lg:block" />
          <Link
            href="/home"
            className="text-sm font-medium text-stone-warm transition-colors hover:text-ink"
          >
            Back to site
          </Link>
        </div>
        <div className="flex flex-1 items-start justify-center px-6 pt-4 pb-16 lg:items-center lg:px-12 lg:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
