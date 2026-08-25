import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Snatch On collects, uses and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      updated="August 25, 2026"
      intro="Your trust is the product. This policy explains what personal data Snatch On collects, why we collect it, how we protect it, and the choices you have. We keep it in plain language on purpose."
      sections={[
        {
          title: "Information we collect",
          paragraphs: [
            "Account information: when you create an account we collect your name, email address, phone number and password. Creatives may also add a bio, location, category tags, social links and payout details.",
            "Booking information: when you book a creative we collect the service selected, scheduling details, briefs or notes you attach, and payment confirmation from our payment processor. We never store full card numbers on our servers.",
            "Usage information: like most platforms, we collect device, log and analytics data (pages visited, searches made, general location from IP) to keep the service fast, safe and relevant.",
          ],
        },
        {
          title: "How we use your information",
          paragraphs: [
            "We use your data to operate the marketplace: matching clients with creatives, processing bookings and payouts, sending confirmations and reminders, and providing support.",
            "We also use aggregate, de-identified data to understand how the platform is used and to improve search, recommendations and reliability.",
            "We do not sell your personal data. Ever.",
          ],
        },
        {
          title: "Two-step verification and security",
          paragraphs: [
            "Snatch On supports two-step verification via SMS or email one-time codes. Verification codes are short-lived and never reused.",
            "All traffic is encrypted in transit with TLS. Passwords are hashed with modern algorithms, payment credentials are handled exclusively by our PCI-compliant payment processor, and access to production data is restricted and audited.",
          ],
        },
        {
          title: "Sharing with third parties",
          paragraphs: [
            "We share data only with service providers who help us run Snatch On: payment processing (Stripe), transactional email and SMS, cloud hosting and analytics. Each provider is bound by contract to use your data only to provide their service to us.",
            "When you book a creative, we share with them the details they need to deliver the work: your name, the brief, and the booking details. Your payment credentials are never shared with creatives.",
          ],
        },
        {
          title: "Your rights and choices",
          paragraphs: [
            "You can access, correct or export your data from account settings at any time. You can delete your account, and we will delete or de-identify your personal data except where we are legally required to retain it (for example, tax records for completed transactions).",
            "You can opt out of marketing email with one click. Transactional messages, such as booking confirmations, are sent as part of providing the service.",
          ],
        },
        {
          title: "Data retention",
          paragraphs: [
            "We retain account data while your account is active. Booking and transaction records are retained for as long as required by tax and accounting laws. Analytics data is retained in aggregate form.",
          ],
        },
        {
          title: "Children",
          paragraphs: [
            "Snatch On is not directed at children under 16, and we do not knowingly collect data from them. If you believe a minor has created an account, contact us and we will remove it.",
          ],
        },
        {
          title: "Changes to this policy",
          paragraphs: [
            "If we make material changes we will notify you by email and in the product before the changes take effect. The date at the top of this page always reflects the latest version.",
          ],
        },
      ]}
    />
  );
}
