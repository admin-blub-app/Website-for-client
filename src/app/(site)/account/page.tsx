import type { Metadata } from "next";
import AccountView from "./AccountView";

export const metadata: Metadata = {
  title: "My account",
  description:
    "Your Snatch On client area: bookings, rebooking, payment methods and settings.",
};

export default function AccountPage() {
  return <AccountView />;
}
