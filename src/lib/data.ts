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
  {
    slug: "marcus-bell",
    name: "Marcus Bell",
    craft: "Event & Concert Photographer",
    category: "category-1",
    city: "Nashville, TN",
    rating: 4.9,
    reviews: 176,
    from: 260,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=68",
    tags: ["Concerts", "Festivals", "Nightlife"],
    bio: "Shooting stages, crowds and green rooms for eight years. Fast turnarounds for artists and venues: highlights the same night, full gallery in 48 hours.",
    services: [
      {
        id: "s1",
        name: "Show coverage",
        price: 260,
        duration: "2 hrs",
        description: "Full set coverage, 30 edited images, same-night selects.",
      },
      {
        id: "s2",
        name: "Festival day pass",
        price: 850,
        duration: "Full day",
        description: "Multi-stage coverage with artist and crowd galleries.",
      },
    ],
  },
  {
    slug: "ivy-chen",
    name: "Ivy Chen",
    craft: "Packaging & Web Designer",
    category: "category-2",
    city: "Los Angeles, CA",
    rating: 4.8,
    reviews: 92,
    from: 300,
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=38",
    tags: ["Packaging", "Web design", "Labels"],
    bio: "I design packaging people keep and websites people finish. DTC brands mostly: skincare, coffee, spirits. Dielines, mockups and a launch-ready storefront.",
    services: [
      {
        id: "s1",
        name: "Label & packaging design",
        price: 300,
        duration: "1 week",
        description: "One SKU: dieline, print files and 3D mockups.",
      },
      {
        id: "s2",
        name: "Landing page design",
        price: 700,
        duration: "10 days",
        description: "Conversion-focused page, developer-ready handoff.",
      },
    ],
  },
  {
    slug: "noah-reed",
    name: "Noah Reed",
    craft: "Drone & Aerial Photographer",
    category: "category-1",
    city: "Austin, TX",
    rating: 4.7,
    reviews: 58,
    from: 240,
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=15",
    tags: ["Drone", "Real estate", "Aerial video"],
    bio: "FAA-licensed drone pilot for real estate, construction progress and events. 4K video and stills, flight permissions handled, insured up to $1M.",
    services: [
      {
        id: "s1",
        name: "Aerial photo package",
        price: 240,
        duration: "1 hr",
        description: "15 edited aerial stills, property or site of your choice.",
      },
      {
        id: "s2",
        name: "Aerial film",
        price: 520,
        duration: "Half day",
        description: "Cinematic 4K flyover film, color graded, licensed music.",
      },
    ],
  },
  {
    slug: "zara-malik",
    name: "Zara Malik",
    craft: "Motion & Social Video Editor",
    category: "category-1",
    city: "Miami, FL",
    rating: 4.9,
    reviews: 143,
    from: 190,
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1400&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/160?img=41",
    tags: ["Reels", "Motion graphics", "Editing"],
    bio: "I turn raw footage into reels that actually get watched. Motion graphics, captions, sound design. Creators and brands send me clips, I send back scroll-stoppers.",
    services: [
      {
        id: "s1",
        name: "Reel edit pack, 4 videos",
        price: 190,
        duration: "3 days",
        description: "Four edited verticals with captions and sound design.",
      },
      {
        id: "s2",
        name: "Brand launch video",
        price: 640,
        duration: "1 week",
        description: "60-second hero video with motion graphics package.",
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

/* ------------------------------------------------------------------ */
/* Per-creative portfolio and reviews, derived deterministically       */
/* ------------------------------------------------------------------ */

const PORTFOLIO_POOLS: Record<string, string[]> = {
  "category-1": [
    "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop",
  ],
  "category-2": [
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop",
  ],
};

const REVIEW_POOL = [
  {
    name: "Danielle W.",
    date: "2 weeks ago",
    avatar: "https://i.pravatar.cc/80?img=9",
    text: "Made our whole team feel at ease from the first minute. Delivered ahead of schedule and the results are stunning.",
  },
  {
    name: "Chris O.",
    date: "1 month ago",
    avatar: "https://i.pravatar.cc/80?img=61",
    text: "Scouted everything beforehand and came with a plan. The final work looks like it belongs in a magazine.",
  },
  {
    name: "Priya R.",
    date: "3 weeks ago",
    avatar: "https://i.pravatar.cc/80?img=16",
    text: "Clear communication, fair pricing, zero surprises. Exactly what booking creative work should feel like.",
  },
  {
    name: "Jordan M.",
    date: "2 months ago",
    avatar: "https://i.pravatar.cc/80?img=33",
    text: "Second booking and just as good as the first. Fast turnaround and genuinely fun to work with.",
  },
  {
    name: "Alicia F.",
    date: "1 week ago",
    avatar: "https://i.pravatar.cc/80?img=24",
    text: "Understood the brief instantly and elevated it. We have already booked the next session.",
  },
  {
    name: "Sam K.",
    date: "6 weeks ago",
    avatar: "https://i.pravatar.cc/80?img=52",
    text: "Professional from booking to delivery. The platform made scheduling painless and the work speaks for itself.",
  },
];

function seed(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function portfolioFor(creative: Creative): string[] {
  const pool = PORTFOLIO_POOLS[creative.category] ?? PORTFOLIO_POOLS["category-1"];
  const start = seed(creative.slug) % pool.length;
  const out = [creative.image];
  for (let i = 0; i < pool.length && out.length < 6; i++) {
    const img = pool[(start + i) % pool.length];
    if (!out.includes(img)) out.push(img);
  }
  return out;
}

export function reviewsFor(creative: Creative) {
  const start = seed(creative.slug) % REVIEW_POOL.length;
  return [0, 2, 4].map((offset) => {
    const r = REVIEW_POOL[(start + offset) % REVIEW_POOL.length];
    return { ...r, text: r.text };
  });
}

export function factsFor(creative: Creative) {
  const h = seed(creative.slug);
  return {
    responseTime: ["under 1 hour", "a few hours", "under 2 hours"][h % 3],
    memberSince: ["2024", "2025", "2026"][h % 3],
    completed: 40 + (h % 200),
    repeatRate: 55 + (h % 35),
  };
}
