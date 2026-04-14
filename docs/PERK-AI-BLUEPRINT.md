# Perk.ai — Complete Product & Design Blueprint

> This document is a comprehensive brief for building Perk.ai. It covers the business model, product vision, target audience, monetization, website design system, page-by-page specs, technical stack, and design principles. Use this as the single source of truth when building or iterating on the product.

---

## Table of Contents

1. [Business Overview](#1-business-overview)
2. [Problem & Opportunity](#2-problem--opportunity)
3. [Target Audience](#3-target-audience)
4. [Product Vision](#4-product-vision)
5. [Core Features](#5-core-features)
6. [Monetization Strategy](#6-monetization-strategy)
7. [Go-to-Market Plan](#7-go-to-market-plan)
8. [Technical Stack](#8-technical-stack)
9. [Design Philosophy & References](#9-design-philosophy--references)
10. [Design System](#10-design-system)
11. [Page-by-Page Specifications](#11-page-by-page-specifications)
12. [Component Library](#12-component-library)
13. [Data Architecture](#13-data-architecture)
14. [Design Rules — Do's and Don'ts](#14-design-rules--dos-and-donts)
15. [Future Roadmap](#15-future-roadmap)

---

## 1. Business Overview

**Perk.ai** is a consumer product that aggregates perks, benefits, credits, and discounts across everything a person already pays for — credit cards, subscriptions, loyalty programs, fast food apps, memberships, and more — into a single dashboard with reminders, overlap detection, and personalized recommendations.

**One-liner:** "The app that shows you every perk you're paying for but not using."

**Domain:** perk.ai
**GitHub:** github.com/landlineleem/perk-ai
**Stage:** Pre-launch, building toward friends & family beta

### What makes Perk.ai different

No one does this. Existing solutions only solve a fragment:

| Existing Solution | What it does | What it misses |
|---|---|---|
| NerdWallet | Tells you what cards to GET | Doesn't help with cards you HAVE |
| Card issuer apps (Amex, Chase) | Shows their own perks | No cross-provider view, no stacking, no overlap detection |
| AwardWallet | Tracks loyalty points/miles | Doesn't cover credits, benefits, or subscriptions |
| Spreadsheets | Manual tracking | No reminders, no discovery, doesn't scale |

**Perk.ai's moat is cross-provider intelligence.** We're the only product that shows you:
- Every perk across ALL your providers in one place
- Which perks overlap (you're paying twice for the same benefit)
- Which perks are expiring soon
- How to stack perks across providers for maximum value
- Your total annual benefit value

---

## 2. Problem & Opportunity

### The problem

The average premium credit card holder pays $400-700/year in annual fees. Most cards come with $1,000-3,000+ in potential annual benefits. But studies show **60-70% of credit card perks go unused** because:

1. People don't know what perks they have
2. Perks are buried in fine print across multiple issuer websites
3. There are no reminders before credits expire
4. Nobody aggregates perks across providers
5. Loyalty programs, subscriptions, and memberships add even more hidden benefits that go untracked

### The opportunity

- **47 million** Americans hold premium credit cards ($95+ annual fee)
- The average household has **3.8 credit cards**, plus streaming subscriptions, loyalty programs, warehouse memberships, etc.
- This is a wealthy demographic that's already spending — they just need to be shown what they're entitled to
- Affiliate revenue from credit card referrals is $50-200 per application
- The TAM for perks/benefits optimization is largely unaddressed

---

## 3. Target Audience

### Primary: "The Affluent Optimizer"

- Age 28-55
- Household income $100k+
- Holds 2-5 credit cards, at least one premium (Amex Platinum, Chase Sapphire Reserve, etc.)
- Multiple subscriptions (streaming, fitness, software)
- Loyalty program memberships (airlines, hotels, grocery, fast food)
- Warehouse memberships (Costco, Sam's Club)
- Knows they're leaving money on the table but doesn't have time to track everything manually
- Values their time — willing to pay for a tool that does the work for them

### Secondary: "The Credit Card Enthusiast"

- Deep into the points/miles game
- Already tracks some perks manually
- Wants a centralized dashboard to optimize across all their cards
- Power user who would pay for premium features

### How they talk about the problem

- "I keep forgetting to use my airline credit before it resets"
- "I think two of my cards have the same DoorDash benefit — am I paying twice?"
- "I have no idea what perks my Costco membership actually includes"
- "My Amex has like 20 benefits and I use maybe 3 of them"

---

## 4. Product Vision

### Phase 1 (Current): Perk Discovery & Tracking
- Curated catalog of 200+ perks across 80+ providers
- Browse, search, and filter perks
- Select your providers to see a personalized dashboard
- See your total annual perk value
- Claim perks via direct links

### Phase 2: User Accounts & Persistence
- User registration/login
- Saved provider selections
- Perk usage tracking (mark perks as "used" / "claimed")
- Perk calendar showing when credits reset and expire

### Phase 3: Smart Features
- Expiration reminders (email/push)
- Overlap/waste detection ("You have DoorDash credits on 2 cards — you're paying for this twice")
- Perk stacking suggestions ("Use your Amex Gold for dining + your Uber One membership for delivery = maximum savings")
- Recommendation engine ("Based on your spending, you're missing out on X")

### Phase 4: Monetization & Growth
- Affiliate links on all provider/perk recommendations
- "You might also like" card recommendations (affiliate revenue)
- Premium tier for advanced features (calendar, reminders, recommendations)
- Partner integrations

---

## 5. Core Features

### 5.1 Browse Perks
- Full-text search across perk titles, descriptions, providers, tags
- Filter by category: Travel, Food & Dining, Shopping, Entertainment, Finance, Software, Health
- Filter by provider type: Credit Cards, Airlines, Hotels, Restaurants, Streaming, Retail, Grocery, Rideshare, Fintech, Subscriptions, Memberships, Banks, Fitness
- Sort by: Most Popular, Newest, Highest Value, Expiring Soon
- Pagination (24 perks per page with "Load More")

### 5.2 My Perks (Personalized Dashboard)
- Provider selector: search and toggle the cards/services you have
- Instant calculation of your total annual perk value
- Perks grouped by category with counts
- Direct claim links for each perk

### 5.3 Perk Detail Pages
- Full perk description
- Step-by-step claim instructions
- Estimated value
- Expiration warnings
- Related perks from the same provider or category
- Direct external claim link

### 5.4 Navigation & Discovery
- Full-screen overlay navigation menu
- Browse by category or provider type
- How it works guide
- Login/signup access

---

## 6. Monetization Strategy

### Primary: Affiliate Revenue
Every perk and provider recommendation should eventually carry an affiliate link. Revenue sources:

| Referral Type | Est. Revenue Per Conversion |
|---|---|
| Credit card application | $50-200 |
| App download (DoorDash, Uber, etc.) | $5-15 |
| Subscription referral (streaming, fitness) | $5-30 |
| Insurance/financial product | $20-100 |

**Key principle:** Recommendations must always feel user-aligned. Never let commission rates influence which perks are shown first. The product should feel like it works FOR the user, not for advertisers. Trust is the product — lose it and there's nothing.

### Secondary: Premium Subscription (Future)
- Monthly/annual plan for advanced features
- Calendar & reminders
- Overlap/waste detection
- Personalized recommendations
- Priority support

### Implementation Notes
- The API route at `/api/claim/[id]` already handles redirects to external claim URLs
- This is where affiliate tracking parameters should be appended
- Start with credit card referral programs (highest revenue per conversion)
- Track click-through rates to optimize placement

---

## 7. Go-to-Market Plan

### Phase 1: Friends & Family Beta
- Share with 10-20 people in personal network
- Gather feedback on UX, perk accuracy, missing providers
- Iterate on design and data quality

### Phase 2: Organic/Content Growth
- SEO-optimized content: "Best Amex Platinum benefits 2026", "Chase Sapphire Reserve perks you're not using"
- Social media presence (Twitter/X, Reddit — r/creditcards, r/churning)
- Product Hunt launch

### Phase 3: Paid Acquisition
- Once affiliate revenue validates the model, reinvest in paid channels
- Target: Google Ads for high-intent searches ("credit card perks tracker")
- Retargeting for users who visited but didn't sign up

---

## 8. Technical Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Fonts | DM Sans (headings), Inter (body) — via next/font/google |
| Data | Static JSON files (perks.json, providers.json) |
| Images | Local assets in /public/images/ (brand logos as SVG/PNG, credit card images as JPG) |
| Deployment | GitHub Pages or Vercel |
| Repository | github.com/landlineleem/perk-ai |

### Project Structure
```
perk-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Navbar, fonts
│   │   ├── globals.css         # Design system (colors, animations, device mockups)
│   │   ├── page.tsx            # Homepage (11 sections)
│   │   ├── browse/page.tsx     # Browse all perks with search/filter
│   │   ├── my-perks/page.tsx   # Personalized perk dashboard
│   │   ├── perk/[id]/page.tsx  # Individual perk detail
│   │   └── api/claim/[id]/route.ts  # Redirect to external claim URLs
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky nav with full-screen dropdown overlay
│   │   ├── PerkCard.tsx        # Reusable perk card + BrandLogo component
│   │   ├── SearchBar.tsx       # Reusable search input
│   │   └── CategoryFilter.tsx  # Horizontal pill filter
│   └── data/
│       ├── perks.json          # 200+ perks with full metadata
│       ├── providers.json      # 80+ providers with logos and card images
│       └── imageMap.ts         # Dynamic logo/card image maps
├── public/
│   └── images/
│       ├── brands/             # SVG/PNG logos for each provider
│       ├── cards/              # Credit card images (JPG)
│       └── logo.png            # Perk.ai logo
└── docs/
    └── PERK-AI-BLUEPRINT.md    # This file
```

---

## 9. Design Philosophy & References

### The Standard: perk.com

**The primary design reference is [perk.com](https://perk.com)** — a corporate travel/spend management platform (completely different business, but exceptional design).

What perk.com does right and what we're emulating:

1. **Bold typography** — Headings are LARGE (80-90px on desktop, 48px mobile). Weight 500-600. Tight line-height (~1.02-1.05). This creates immediate visual authority.

2. **High-contrast color blocking** — Dark sections (#14140F near-black) alternate with cream (#F5F5EB) and white. The accent color (lime green #BEFF50) is used sparingly but pops dramatically.

3. **Device mockups** — They show their product running on laptops and phones. This is a CSS technique where a device frame (dark border, rounded corners) wraps actual UI content. It looks incredibly professional and shows the product in context.

4. **Generous whitespace** — Sections have 40-80px padding on desktop. Cards have 24-40px internal padding. Nothing feels cramped. The spacing itself communicates "premium."

5. **Pill-shaped buttons** — Border-radius 26px, 40px height. Primary buttons are bright accent color with dark text. Secondary buttons are transparent with a 1px border.

6. **Subtle, purposeful animation** — Fade-ups with cubic-bezier easing, not bouncy or flashy. Elements enter smoothly as you scroll. Nothing distracts.

7. **Full-screen navigation overlay** — When you click the menu, a dark overlay drops down covering the full screen. Organized in columns with category navigation.

8. **Alternating section backgrounds** — Dark, cream, white sections create natural visual rhythm and separation without heavy dividers.

9. **Scrolling text banners** — Subtle animated text scrolling horizontally in the footer area. Very faint opacity (~3%) creating texture, not distraction.

10. **Professional restraint** — No gradients everywhere, no floating emojis, no excessive animations. The design earns trust through restraint.

### What we've adapted for Perk.ai

- **Accent color:** Warm gold/amber (#F59E0B) instead of perk.com's lime green. Gold signals value, premium, and financial rewards — perfect for our product.
- **Device mockups:** We render actual perk data inside CSS phone/laptop frames. The phone shows a "My Perks" view with annual value. The laptop shows the browse interface.
- **Section structure:** Our homepage has 11 sections that tell a story: What is this? → How does it work? → What does it look like? → What can I find? → Is it legit? → What should I do?

### Secondary References

These products also have excellent design worth studying:

- **Linear.app** — Clean, dark UI with subtle animations and confident typography
- **Stripe.com** — Master of using CSS/HTML for visual impact without relying on photography
- **Ramp.com** — Fintech product with premium feel, good use of device mockups
- **Notion.so** — Clean, approachable, lots of whitespace

---

## 10. Design System

### 10.1 Color Palette

```
PRIMARY ACCENT
--primary:        #F59E0B   (amber/gold — main accent for buttons, highlights)
--primary-light:  #FBBF24   (lighter gold — hover states)
--primary-dark:   #D97706   (darker gold — text on light backgrounds)
--primary-subtle: #FFFBEB   (very faint gold tint — selected states, badges)

BACKGROUNDS
--dark:           #0C0C0A   (near-black — hero sections, dark blocks)
--dark-surface:   #161614   (slightly lighter — dark section cards)
--dark-card:      #1E1E1C   (dark card backgrounds)
--cream:          #F8F8F4   (warm off-white — main page background)
--surface:        #FFFFFF   (white — cards, inputs)
--surface-alt:    #F1F1EC   (slightly darker cream — alternating sections)

TEXT
--ink:            #0C0C0A   (primary text)
--ink-secondary:  #3D3D38   (secondary text)
--ink-muted:      #71716A   (muted/tertiary text)
--ink-faint:      #A8A8A0   (placeholder text, timestamps)

BORDERS
--border:         #E3E1D9   (light mode borders)
--border-dark:    #2A2A26   (dark mode borders)

STATUS
--success:        #1A7F37
--warning:        #BF6A02
--danger:         #CF222E
```

### 10.2 Typography

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height |
|---|---|---|---|---|---|
| Hero heading | DM Sans | 600-700 | 5.5rem (88px) | 2.5rem (40px) | 1.02 |
| Section heading | DM Sans | 600 | 3rem-3.5rem | 1.875rem | 1.1 |
| Card heading | DM Sans | 600 | 1rem-1.25rem | 1rem | 1.3 |
| Body text | Inter | 400 | 15px | 14px | 1.6 |
| Small/label | Inter | 500-600 | 13px | 12px | 1.4 |
| Eyebrow label | Inter | 600 | 12px | 11px | 1.0 |

**Rules:**
- Headings ALWAYS use the `font-heading` Tailwind class (DM Sans)
- Body text uses the default Inter font
- Eyebrow labels are always: uppercase, wide letter-spacing (0.15em), small (12px), semibold, colored with the primary accent
- NEVER use Instrument Serif or any serif font
- NEVER use `style={{ fontFamily }}` inline styles — always use Tailwind classes

### 10.3 Spacing

| Element | Desktop | Mobile |
|---|---|---|
| Section padding (vertical) | 96-176px (py-24 to py-44) | 64-96px |
| Container max-width | 80rem (max-w-7xl) | Full width |
| Container horizontal padding | 40px (px-10) | 24px (px-6) |
| Card internal padding | 32-40px (p-8 to p-10) | 24px (p-6) |
| Grid gaps | 20-32px (gap-5 to gap-8) | 16-20px |
| Between heading and content | 48-64px (mb-12 to mb-16) | 32px |

### 10.4 Components

**Cards:**
- Border radius: 26px (`rounded-[26px]`)
- Background: white (`bg-surface`)
- Border: 1px `border-border`
- Shadow (resting): `0px 2px 8px rgba(0,0,0,0.04)`
- Shadow (hover): `0 8px 30px rgba(0,0,0,0.08)`
- Hover: translateY(-3px) with smooth cubic-bezier transition

**Buttons — Primary (CTA):**
- Background: gold (`bg-primary`)
- Text: DARK (`text-dark`) — NOT white
- Border radius: 26px (`rounded-[26px]`)
- Padding: `px-8 py-4`
- Font: 15px, semibold
- Hover: lighter gold (`hover:bg-primary-light`)

**Buttons — Secondary:**
- Background: transparent
- Border: 1px, white/15 on dark sections, border-color on light
- Border radius: 26px
- Text: muted color, brightens on hover
- Padding: same as primary

**Pills/Badges:**
- Active: `bg-primary text-dark` (gold with dark text)
- Inactive: `bg-surface-alt text-ink-muted`
- Border radius: full (`rounded-full`)
- Padding: `px-5 py-2.5`

**Inputs:**
- Border radius: full (`rounded-full`)
- Border: 1px `border-border`
- Shadow: subtle resting shadow
- Focus: border shifts to primary/50, subtle ring

### 10.5 Device Mockups

We use CSS-only device frames to show the product in context. These are defined in `globals.css`:

**Phone mockup:** A rounded rectangle (44px border-radius) with a dark bezel (12px padding), a notch element, and an inner screen area with 34px border-radius. Aspect ratio 9:19.5. Box shadow creates depth.

**Laptop mockup:** A dark-bordered screen area (12px border, 12px top radius) with a base/stand below it. Screen inner area has 4px top radius. Aspect ratio 16:10.

Inside these frames, we render simplified versions of our actual UI using hardcoded HTML/CSS that mimics the real app — real perk data, real brand logos, real values. This makes the mockups look authentic.

### 10.6 Animations

All animations use `cubic-bezier(0.16, 1, 0.3, 1)` — a smooth, decelerating ease that feels natural.

| Animation | Duration | What it does |
|---|---|---|
| fadeUp | 0.7s | Fade in + slide up 28px |
| fadeIn | 0.5s | Simple opacity fade |
| scaleIn | 0.6s | Fade in + scale from 95% |
| slideDown | 0.4s | Slide down from -12px (for dropdowns) |
| float | 6s infinite | Gentle vertical bob (for phone mockups) |
| marquee | 60s linear infinite | Horizontal scroll for logo trust bar |
| scroll-banner | 30s linear infinite | Horizontal scroll for footer text banner |

Stagger animations using delay classes: `delay-100` through `delay-800` (100ms increments).

---

## 11. Page-by-Page Specifications

### 11.1 Homepage (`/`)

The homepage is a marketing/product page that tells a story. It is NOT a data page — the actual tool functionality lives in /browse and /my-perks.

**Section 1: Hero (dark background)**
- Eyebrow badge: "Trusted by 1,000+ savvy cardholders" in a pill with subtle border
- Main heading: "Stop leaving money on the table" — with "money" highlighted in gold
- Supporting text explaining the value proposition
- Two CTA buttons: "Get Started Free" (gold) and "See How It Works" (ghost)
- Below: Device mockup showcase — laptop showing browse UI + phone showing my-perks, overlapping
- Ambient gradient glow behind devices
- Bottom fade transitioning to cream background

**Section 2: Trust Bar (cream)**
- Scrolling marquee of 80+ provider logos
- Label: "Perks from X+ providers you already use"
- Edge gradient fades for polish

**Section 3: How It Works (cream, id="how-it-works")**
- Three numbered step cards with large watermark numbers
- Steps: Select providers → Discover perks → Never miss a benefit
- Clean, informative, builds confidence

**Section 4: Feature — Smart Discovery (surface-alt)**
- Split layout: laptop mockup on left, text on right
- Laptop shows simplified browse UI with real perk data
- Text describes search/filter capabilities with bullet points

**Section 5: Feature — Personal Dashboard (dark)**
- Split layout reversed: text on left, phone mockup on right
- Phone shows annual value header + perk list with real data
- Phone has subtle floating animation
- Text describes personalization features

**Section 6: Feature — Credit Card Showcase (cream)**
- Split layout: fanned credit card images on left, text on right
- 5 real credit card images arranged in an overlapping fan with rotation
- Cards hover-scale on interaction
- Text describes provider coverage

**Section 7: Popular Perks (surface-alt)**
- Section heading with "View all perks" link
- Grid of 6 popular perks using the PerkCard component
- Links to the browse page

**Section 8: Stats (dark)**
- "The numbers speak for themselves" heading
- 4 animated counters: perks tracked, providers, categories, total value
- Numbers are large (text-5xl to 6xl) in gold

**Section 9: Testimonials (cream)**
- 3 testimonial cards with quotes, names, roles, and initial avatars
- Clean card design matching the component system

**Section 10: CTA (dark with gradient glow)**
- "Ready to unlock your perks?" in large type
- Supporting text + gold CTA button
- "Free to use. No credit card required."

**Section 11: Footer (dark)**
- Scrolling text banner with faint animated words
- 4-column grid: Brand description, Product links, Company links, Legal links
- Bottom bar with copyright and social links
- Logo with inverted colors for dark background

### 11.2 Browse Perks (`/browse`)

- Dark header with page title and perk count
- Full-width search bar (pill-shaped)
- Horizontal category filter pills (gold active state)
- Provider type dropdown (pill-shaped)
- Sort dropdown (pill-shaped)
- 3-column responsive grid of PerkCards
- "Load More" pagination (24 per page)
- Empty state with clear filters button

### 11.3 My Perks (`/my-perks`)

- Dark header with page title
- Two-column layout:
  - LEFT: Sticky sidebar with provider selector (search, checkboxes, selection count, clear button)
  - RIGHT: Either empty state (card imagery + prompt) or:
    - Value banner showing total annual perk value with animated counter
    - Perks grouped by category with count badges
    - PerkCard grid within each category

### 11.4 Perk Detail (`/perk/[id]`)

- Dark hero with provider info, perk title, value badge, category tag, expiration warning
- Optional card image for credit card providers
- Two-column layout below:
  - MAIN (2/3): Full description card, numbered claim steps, tag pills
  - SIDEBAR (1/3, sticky): Value display, "Claim this perk" button, related perks

### 11.5 Navigation

**Desktop:**
- 80px tall, sticky, cream background with backdrop blur
- Logo (left) — centered nav links — Log in + Get Started + hamburger (right)
- 3 nav links: Browse Perks, My Perks, How It Works

**Full-screen overlay (hamburger trigger):**
- Dark overlay covering entire viewport
- Logo + close button at top
- 3-column grid: Browse by Category, Provider Types, Quick Links + Account
- Categories link to `/browse?category=X`
- Provider types link to `/browse?type=X`
- Account section has Log In link and "Get Started Free" gold button

**Mobile:**
- Logo + hamburger only (center links and right-side items hidden)
- Same overlay behavior

---

## 12. Component Library

### PerkCard
Reusable card showing a single perk. Used on homepage, browse, my-perks, and perk detail (related perks).

Props: `perk` (Perk object), `index` (for stagger animation)

Displays: Provider logo + name, category tag, perk title, description (2-line truncate), value in gold, expiration warning if applicable, hover arrow.

### BrandLogo
Renders a provider logo from the image map. Falls back to first letter if no logo found. Configurable size.

### SearchBar
Reusable search input. Props: `value`, `onChange`, `placeholder`, `large` variant. Always pill-shaped with subtle shadow.

### CategoryFilter
Horizontal row of pill buttons for category filtering. Gold active state with dark text. 8 categories: All, Travel, Food & Dining, Shopping, Entertainment, Finance, Software, Health.

---

## 13. Data Architecture

### perks.json
```typescript
interface Perk {
  id: string;              // "amex-platinum-airline-credit"
  title: string;           // "$200 Airline Fee Credit"
  description: string;     // Short description for cards
  fullDescription: string; // Long description for detail page
  provider: string;        // "Amex Platinum"
  providerType: string;    // "credit-card"
  providerLogo: string;    // Emoji fallback (legacy, logos now in providers.json)
  category: string;        // "Travel"
  value: string;           // "$200/year"
  valueCents: number;      // 20000 (for sorting/calculation)
  expiration: string|null; // ISO date or null
  claimUrl: string;        // External URL for claiming
  claimSteps: string[];    // Step-by-step claim instructions
  tags: string[];          // ["airline", "travel", "credit"]
  popular: boolean;        // Featured on homepage
  dateAdded: string;       // ISO date
}
```

### providers.json
```typescript
interface Provider {
  id: string;              // "amex-platinum"
  name: string;            // "Amex Platinum"
  type: string;            // "credit-card"
  logo: string;            // "/images/brands/amex.svg"
  cardImage: string|null;  // "/images/cards/amex-platinum.jpg" (credit cards only)
  color: string;           // "#C4B590" (brand color)
}
```

### imageMap.ts
Dynamic maps built from providers.json:
- `providerLogos`: provider name → logo path
- `providerCardImages`: provider name → card image path (null-filtered)
- `uniqueBrands`: deduplicated providers for the logo marquee

---

## 14. Design Rules — Do's and Don'ts

### DO:
- Use generous whitespace — when in doubt, add more padding
- Use large, bold headings — our headings should feel confident and commanding
- Alternate between dark and light sections for visual rhythm
- Use the gold accent sparingly — CTAs, highlights, active states, NOT everywhere
- Use dark text on gold buttons (never white text on gold)
- Use device mockups to show the product in context
- Keep animations subtle and purposeful — smooth fade-ups, gentle floats
- Use real data in mockups — actual perk names, real values, real logos
- Follow the 26px border-radius standard for cards and buttons
- Use the eyebrow label pattern: tiny uppercase, wide tracking, gold color, above every section heading

### DON'T:
- Use gradients everywhere, floating shapes, or decorative orbs
- Use emojis in the UI
- Use bouncy, playful, or attention-seeking animations
- Use serif fonts (no Instrument Serif, no Georgia, no Times)
- Use `style={{ fontFamily }}` inline styles — always use Tailwind `font-heading` class
- Use white text on gold/amber backgrounds (contrast is too low)
- Make sections feel cramped — minimum 96px vertical padding on desktop
- Use generic stock photography — device mockups with real data look much better
- Add too many colors — stick to the palette (dark, cream, gold, that's it)
- Make it look "AI-generated" — no generic tech aesthetic with gradient blobs and floating icons. This should look like a real product built by a real company.
- Over-animate — one animation per element max. No chains, no sequences, no parallax scrolling effects.

---

## 15. Future Roadmap

### Near-term (Next 2-4 weeks)
- [ ] Expand perk catalog to 300+ perks
- [ ] Add user authentication (email/password + OAuth)
- [ ] Persist provider selections per user
- [ ] Add perk usage tracking ("Mark as used")
- [ ] Build perk calendar view (monthly view of credit resets/expirations)
- [ ] Wire up affiliate links on claim buttons

### Medium-term (1-3 months)
- [ ] Expiration reminders (email notifications)
- [ ] Overlap/waste detection algorithm
- [ ] Perk stacking recommendations
- [ ] Mobile-responsive improvements
- [ ] SEO content pages (per-provider, per-card guides)
- [ ] Analytics dashboard (admin) for tracking affiliate conversions

### Long-term (3-6 months)
- [ ] Mobile app (React Native or PWA)
- [ ] AI-powered perk recommendations based on spending patterns
- [ ] Integration with financial aggregators (Plaid) for automatic provider detection
- [ ] Premium subscription tier
- [ ] Community features (tips, perk alerts, deal sharing)

---

## Appendix: Key Technical Notes

1. **Next.js 16 breaking changes:** The project uses Next.js 16 with the App Router. Read `node_modules/next/dist/docs/` before making framework-level changes. APIs may differ from training data.

2. **Tailwind CSS 4:** Uses `@theme` directive for custom tokens instead of `tailwind.config.js`. All custom colors are defined in `globals.css` under `@theme`.

3. **Remote images:** `next.config.ts` allows remote image patterns from `cdn.brandfetch.io` and `cdn.prodstatic.com`.

4. **Claim redirect:** The `/api/claim/[id]` route finds the perk and redirects to its `claimUrl`. This is where affiliate parameters should be appended in the future.

5. **No backend yet:** All data is static JSON. User features (accounts, persistence, reminders) will require a backend — likely Supabase, Firebase, or a custom API.

---

*Last updated: April 14, 2026*
*Version: 2.0*
