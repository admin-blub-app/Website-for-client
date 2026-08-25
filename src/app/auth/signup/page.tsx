import type { Metadata } from "next";
import SignupWizard from "./SignupWizard";

export const metadata: Metadata = {
  title: "Create your creative page",
  description:
    "Create your free creative page on Snatch On. Add services, set your payout, and get booked.",
};

export default function SignupPage() {
  return <SignupWizard />;
}
