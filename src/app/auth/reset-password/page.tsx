import type { Metadata } from "next";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set a new password",
  description: "Choose a new password for your Snatch On account.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
