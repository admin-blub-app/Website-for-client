# Snatch On (snatchon.com)

Demo website for the Snatch On creative marketplace, built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Pages

| Page | Path |
| --- | --- |
| Home | `/home` (root `/` redirects here) |
| About Us | `/about` |
| Services hub | `/services` (search, filters, sorting) |
| Category 1: Photography & Video | `/services/category-1` |
| Category 2: Design & Branding | `/services/category-2` |
| Contact Us | `/contact` |
| Privacy Policy | `/privacy-policy` |
| Terms of Service | `/terms` |
| Sign Up (5-step creator onboarding) | `/auth/signup` |
| Login (with 2-step verification) | `/auth/login` |
| Forgot / Reset password | `/auth/forgot-password`, `/auth/reset-password` |
| Live demo (creative page + creator dashboard) | `/demo` |
| Booking flow | `/book/[creative]` |
| Booking return / confirmation | `/booking/confirmation` |

The sign-up wizard follows the agreed onboarding pipeline: 1. Identification, 2. Profile (bio, location, searchable category keywords, social links), 3. Services to offer, 4. Location of service, 5. Payment information.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

All data is mocked in `src/lib/data.ts`; no backend is required for this demo. Photography is loaded from Unsplash, avatars from pravatar.cc (see `next.config.ts` image allowlist).
