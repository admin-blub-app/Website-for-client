export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  crafts: string[];
};

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
};

export type Creative = {
  slug: string;
  name: string;
  craft: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  from: number;
  image: string;
  avatar: string;
  tags: string[];
  bio: string;
  services: Service[];
};

export const categories: Category[] = [
  {
    slug: "category-1",
    name: "Photography & Video",
    tagline: "Frame the moment",
    description:
      "Portrait sessions, brand shoots, weddings, product photography and full video production. Browse portfolios, compare rates and book the lens that fits your story.",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600&auto=format&fit=crop",
    crafts: [
      "Portrait photography",
      "Wedding & events",
      "Product & e-commerce",
      "Brand films",
      "Drone & aerial",
      "Photo editing",
    ],
  },
  {
    slug: "category-2",
    name: "Design & Branding",
    tagline: "Make it unmistakable",
    description:
      "Logos, brand identities, packaging, social kits and everything in between. Work with designers who turn a rough idea into a brand people remember.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop",
    crafts: [
      "Logo & identity",
      "Packaging design",
      "Social media kits",
      "Illustration",
      "Pitch decks",
      "Web & app design",
    ],
  },
];

export const comingSoon = [
  { name: "Music & Audio", note: "Producers, session players, mixing" },
  { name: "Beauty & Styling", note: "MUAs, hair stylists, wardrobe" },
  { name: "Events & Entertainment", note: "Hosts, DJs, performers" },
  { name: "Web & Digital", note: "No-code builds, motion, 3D" },
];

export const creatives: Creative[] = [
  {
    slug: "amara-osei",
    name: "Amara Osei",
    craft: "Portrait & Brand Photographer",
    category: "category-1",
    city: "Atlanta, GA",
    rating: 4.9,
    reviews: 128,
    from: 180,
    image:
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=47",
    tags: ["Portraits", "Editorial", "Brand shoots"],
    bio: "Ten years behind the lens shooting portraits and campaigns for founders, artists and growing brands. Natural light obsessive. I keep sessions relaxed, fast and intentional, and deliver retouched selects within 72 hours.",
    services: [
      {
        id: "s1",
        name: "Portrait session",
        price: 180,
        duration: "1 hr",
        description: "Studio or on location. 10 retouched images included.",
      },
      {
        id: "s2",
        name: "Brand shoot, half day",
        price: 650,
        duration: "4 hrs",
        description: "Products, team and space. 40 edited images, usage rights.",
      },
      {
        id: "s3",
        name: "Event coverage",
        price: 420,
        duration: "3 hrs",
        description: "Candid coverage with a same-week gallery delivery.",
      },
    ],
  },
  {
    slug: "diego-ferrer",
    name: "Diego Ferrer",
    craft: "Brand Identity Designer",
    category: "category-2",
    city: "Austin, TX",
    rating: 5.0,
    reviews: 86,
    from: 350,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=12",
    tags: ["Logos", "Identity systems", "Packaging"],
    bio: "Identity designer for brands that want to feel inevitable. I have shipped 60+ identities for restaurants, startups and record labels. Every engagement ends with a full brand book you can actually use.",
    services: [
      {
        id: "s1",
        name: "Logo essentials",
        price: 350,
        duration: "1 week",
        description: "Three directions, two rounds, final files in all formats.",
      },
      {
        id: "s2",
        name: "Full identity system",
        price: 1400,
        duration: "3 weeks",
        description: "Logo, type, color, guidelines and launch templates.",
      },
    ],
  },
  {
    slug: "june-park",
    name: "June Park",
    craft: "Wedding & Event Filmmaker",
    category: "category-1",
    city: "Seattle, WA",
    rating: 4.8,
    reviews: 214,
    from: 900,
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=32",
    tags: ["Weddings", "Highlight films", "Drone"],
    bio: "Cinematic wedding and event films with a documentary heart. Two-camera coverage, licensed drone pilot, and a highlight film your grandparents and your group chat will both replay.",
    services: [
      {
        id: "s1",
        name: "Highlight film",
        price: 900,
        duration: "6 hrs",
        description: "A 4 to 6 minute film, color graded, licensed music.",
      },
      {
        id: "s2",
        name: "Full ceremony edit",
        price: 1600,
        duration: "Full day",
        description: "Complete coverage plus highlight film and raw footage.",
      },
    ],
  },
  {
    slug: "mina-kowalski",
    name: "Mina Kowalski",
    craft: "Illustrator & Muralist",
    category: "category-2",
    city: "Chicago, IL",
    rating: 4.9,
    reviews: 64,
    from: 240,
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=25",
    tags: ["Illustration", "Murals", "Album art"],
    bio: "Bold, hand-drawn illustration for walls, packaging and album covers. I sketch fast, iterate with you live, and paint on-site for interiors and storefronts across the Midwest.",
    services: [
      {
        id: "s1",
        name: "Custom illustration",
        price: 240,
        duration: "1 week",
        description: "One hero illustration, print and digital ready.",
      },
      {
        id: "s2",
        name: "Interior mural",
        price: 1800,
        duration: "3 days",
        description: "Design, prep and paint. Price per standard wall.",
      },
    ],
  },
  {
    slug: "theo-brandt",
    name: "Theo Brandt",
    craft: "Product Photographer",
    category: "category-1",
    city: "Brooklyn, NY",
    rating: 4.8,
    reviews: 97,
    from: 220,
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=59",
    tags: ["Product", "E-commerce", "Food"],
    bio: "Studio product photography that sells. E-commerce packshots, lifestyle sets and food photography for DTC brands. Fixed per-image pricing, five-day turnaround, no surprises.",
    services: [
      {
        id: "s1",
        name: "E-commerce pack, 10 images",
        price: 220,
        duration: "2 days",
        description: "White background packshots, retouched, store ready.",
      },
      {
        id: "s2",
        name: "Lifestyle set, half day",
        price: 700,
        duration: "4 hrs",
        description: "Styled scenes with props and model add-on options.",
      },
    ],
  },
  {
    slug: "sofia-reyes",
    name: "Sofia Reyes",
    craft: "Social & Content Designer",
    category: "category-2",
    city: "Miami, FL",
    rating: 4.7,
    reviews: 152,
    from: 150,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=44",
    tags: ["Social kits", "Reels covers", "Templates"],
    bio: "I design scroll-stopping social kits and content systems for creators and small brands. You get on-brand templates your team can reuse forever, not one-off graphics.",
    services: [
      {
        id: "s1",
        name: "Social starter kit",
        price: 150,
        duration: "3 days",
        description: "Profile refresh plus 9 branded post templates.",
      },
      {
        id: "s2",
        name: "Monthly content system",
        price: 480,
        duration: "Monthly",
        description: "20 designed posts and stories, delivered weekly.",
      },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "I booked a brand photographer on a Tuesday and had the shoot Friday morning. The whole thing, browsing, booking, paying, took less time than writing one email used to.",
    name: "Rachel Nguyen",
    role: "Founder, Loam Candle Co.",
    avatar: "https://i.pravatar.cc/96?img=5",
  },
  {
    quote:
      "Snatch On replaced my DMs, my invoices and my calendar juggling. Clients book real slots, pay upfront, and I just show up and shoot.",
    name: "Marcus Bell",
    role: "Photographer on Snatch On",
    avatar: "https://i.pravatar.cc/96?img=68",
  },
  {
    quote:
      "We found an identity designer whose portfolio we loved, saw transparent pricing, and kicked off the same day. The final brand book blew our team away.",
    name: "Priya Raman",
    role: "COO, Fig & Fern Cafe",
    avatar: "https://i.pravatar.cc/96?img=16",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCreative(slug: string) {
  return creatives.find((c) => c.slug === slug);
}

export function creativesInCategory(slug: string) {
  return creatives.filter((c) => c.category === slug);
}
