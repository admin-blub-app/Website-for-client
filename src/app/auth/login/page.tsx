import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Log in to your Snatch On creative dashboard to manage bookings, services, and payouts.",
};

export default function LoginPage() {
  return <LoginForm />;
}
