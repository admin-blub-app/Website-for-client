import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationCard from "./ConfirmationCard";

export const metadata: Metadata = {
  title: "Booking confirmed",
  description: "Your Snatch On booking is confirmed.",
};

export default function BookingConfirmationPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6 pt-[4.5rem] pb-16">
      <Suspense>
        <ConfirmationCard />
      </Suspense>
    </div>
  );
}
