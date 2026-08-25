import type { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your Snatch On password with a secure email link.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
