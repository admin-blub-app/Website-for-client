export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  img: string;
  location: string;
  bio: string[];
  funFact: string;
  socials: { label: string; handle: string }[];
};

export const team: TeamMember[] = [
  {
    slug: "jordan-sole",
    name: "Jordan Sole",
    role: "Founder & CEO",
    img: "https://i.pravatar.cc/600?img=13",
    location: "Atlanta, GA",
    bio: [
      "Jordan spent six years as a working photographer before starting Snatch On, and lost count of how many gigs died in a DM thread. The spreadsheet that matched photographers with founders in 2024 was his, and the platform still runs on the same conviction: creative work should be as easy to book as a table for two.",
      "Before photography he led growth at a booking startup, which is where the obsession with calendars, deposits and no-show rates comes from.",
    ],
    funFact: "Still takes one portrait commission every month to stay honest.",
    socials: [
      { label: "X", handle: "@jordansole" },
      { label: "LinkedIn", handle: "in/jordan-sole" },
    ],
  },
  {
    slug: "keisha-monroe",
    name: "Keisha Monroe",
    role: "Head of Community",
    img: "https://i.pravatar.cc/600?img=31",
    location: "Nashville, TN",
    bio: [
      "Keisha ran a creative studio collective in Nashville for eight years, managing forty freelancers and every client relationship that came with them. On Snatch On she owns the creative side of the marketplace: onboarding, education, payouts advocacy and the community program.",
      "If a creative has a problem at 9 PM, Keisha usually knows about it by 9:05. Every policy on the platform gets read by her before it ships.",
    ],
    funFact: "Books a different Snatch On creative for something personal every quarter.",
    socials: [
      { label: "Instagram", handle: "@keisha.builds" },
      { label: "LinkedIn", handle: "in/keisha-monroe" },
    ],
  },
  {
    slug: "andre-silva",
    name: "Andre Silva",
    role: "Head of Product",
    img: "https://i.pravatar.cc/600?img=53",
    location: "Austin, TX",
    bio: [
      "Andre built scheduling systems at two marketplaces before this one, and believes the calendar is the product: if the slots are wrong, nothing else matters. He leads product and engineering, from the availability engine to the two-tap booking flow.",
      "His rule for every feature: a busy creative should be able to use it one-handed, between clients, without reading anything.",
    ],
    funFact: "Keeps a wall of printed screenshots of confusing booking flows as a warning.",
    socials: [
      { label: "X", handle: "@andresilva_" },
      { label: "LinkedIn", handle: "in/andre-silva" },
    ],
  },
  {
    slug: "lena-fischer",
    name: "Lena Fischer",
    role: "Head of Trust & Safety",
    img: "https://i.pravatar.cc/600?img=20",
    location: "Seattle, WA",
    bio: [
      "Lena came from payments, where she spent five years on fraud and disputes. She owns everything that makes strangers comfortable transacting: verified reviews, payment protection, cancellation policies and what happens when a booking goes sideways.",
      "Her team answers every dispute with a human, not a form, and she reads the weekly refund log personally.",
    ],
    funFact: "Has personally test-booked over 200 sessions under a mystery-shopper account.",
    socials: [{ label: "LinkedIn", handle: "in/lena-fischer" }],
  },
];

export function getTeamMember(slug: string) {
  return team.find((m) => m.slug === slug);
}
