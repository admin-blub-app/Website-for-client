import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that govern your use of the Snatch On marketplace.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      updated="August 25, 2026"
      intro="These terms are the agreement between you and Snatch On, Inc. when you use snatchon.com. They cover both clients who book creative services and creatives who offer them. By creating an account or making a booking, you agree to them."
      sections={[
        {
          title: "The service",
          paragraphs: [
            "Snatch On is a marketplace that connects clients with independent creative professionals. Creatives publish their services, prices and availability; clients discover, book and pay for those services through the platform.",
            "Creatives on Snatch On are independent professionals, not employees or agents of Snatch On. The creative, not Snatch On, is responsible for performing the booked work.",
          ],
        },
        {
          title: "Accounts and eligibility",
          paragraphs: [
            "You must be at least 16 years old (18 to offer paid services) and provide accurate account information. You are responsible for activity under your account and for keeping your credentials secure. We strongly recommend enabling two-step verification.",
          ],
        },
        {
          title: "Bookings and payments",
          paragraphs: [
            "When you book a service, you authorize Snatch On to charge your payment method for the listed price plus any applicable fees and taxes. Payment is held by our payment processor and released to the creative according to our payout schedule after the service is delivered.",
            "Prices are set by creatives. The price you see at checkout is the price you pay; there are no hidden fees.",
          ],
        },
        {
          title: "Cancellations and refunds",
          paragraphs: [
            "Clients may cancel free of charge up to 48 hours before a scheduled service unless the creative's listing states otherwise. Cancellations inside 48 hours may be subject to a fee of up to 50% of the booking.",
            "If a creative fails to deliver a booked service, you receive a full refund. Disputes can be raised within 14 days of the scheduled delivery date and are reviewed by our support team.",
          ],
        },
        {
          title: "Creative obligations",
          paragraphs: [
            "Creatives agree to keep their availability accurate, honor confirmed bookings, deliver work professionally and on time, and comply with applicable laws, including tax obligations on their earnings.",
            "Repeated cancellations, misrepresentation of work, or attempts to move payment off-platform may result in removal from the marketplace.",
          ],
        },
        {
          title: "Content and intellectual property",
          paragraphs: [
            "Creatives retain ownership of their portfolios. By publishing content on Snatch On you grant us a license to display it for the purpose of operating and promoting the marketplace.",
            "Ownership and usage rights for commissioned work are defined between client and creative in the booking. Unless stated otherwise in the listing, clients receive the usage rights described in the service description upon full payment.",
          ],
        },
        {
          title: "Prohibited conduct",
          paragraphs: [
            "You may not use Snatch On to break the law, infringe intellectual property, harass others, post misleading reviews, circumvent fees, scrape the platform, or attempt to compromise its security.",
          ],
        },
        {
          title: "Liability",
          paragraphs: [
            "Snatch On provides the platform on an as-is basis. To the maximum extent permitted by law, our aggregate liability for any claim is limited to the greater of $100 or the amounts you paid through the platform in the 12 months before the claim.",
          ],
        },
        {
          title: "Termination",
          paragraphs: [
            "You may close your account at any time. We may suspend or terminate accounts that violate these terms. Sections that by their nature should survive termination (payments owed, liability limits, disputes) survive.",
          ],
        },
        {
          title: "Governing law and changes",
          paragraphs: [
            "These terms are governed by the laws of the State of Georgia, USA. We may update these terms; material changes will be announced at least 14 days before they take effect.",
          ],
        },
      ]}
    />
  );
}
