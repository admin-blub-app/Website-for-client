import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { creatives, getCreative } from "@/lib/data";
import BookingFlow from "./BookingFlow";

export function generateStaticParams() {
  return creatives.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const creative = getCreative(slug);
  if (!creative) return {};
  return {
    title: `Book ${creative.name}`,
    description: `${creative.craft} in ${creative.city}. Compare services, pick a slot and book securely on Snatch On.`,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creative = getCreative(slug);
  if (!creative) notFound();
  return <BookingFlow creative={creative} />;
}
