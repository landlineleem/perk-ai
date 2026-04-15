# Perk.ai — Complete Assets, Data & Image Reference

> This document contains every asset path, provider, logo, card image, and the complete perk catalog used in the project. Use this alongside `PERK-AI-BLUEPRINT.md` to fully recreate the site with all data intact.

---

## Table of Contents

1. [Image Assets Inventory](#1-image-assets-inventory)
2. [Complete Providers Data](#2-complete-providers-data)
3. [Complete Perks Data](#3-complete-perks-data)
4. [Data Schema Reference](#4-data-schema-reference)
5. [Image Map Utility](#5-image-map-utility)

---

## 1. Image Assets Inventory

All images live in `/public/images/`. They are referenced as `/images/...` in code.

### Logo Files
```
/images/logo.png          — Main Perk.ai logo (for light backgrounds)
/images/logo-dark.svg     — Dark variant
/images/logo-light.svg    — Light variant (for dark backgrounds)
```

### Brand Logos (`/images/brands/`)

These are the logos for each provider. Mix of SVG and PNG. Some providers have both formats — the `providers.json` specifies which one to use.

| File | Provider | Format |
|---|---|---|
| `aaa.svg` | AAA | SVG |
| `adidas.svg` | Adidas | SVG |
| `amazon.png` | Amazon Prime | PNG |
| `americanairlines.png` | American Airlines | PNG |
| `amex.svg` | Amex Platinum / Amex Gold | SVG |
| `apple.svg` | Apple One | SVG |
| `bestbuy.png` | Best Buy | PNG |
| `burgerking.svg` | Burger King | SVG |
| `capitalone.png` | Capital One Venture | PNG |
| `cashapp.svg` | Cash App | SVG |
| `chase.svg` | Chase Sapphire Reserve / Chase Freedom Flex | SVG |
| `chickfila.png` | Chick-fil-A | PNG |
| `chipotle.png` | Chipotle | PNG |
| `citi.png` | Citi Credit Cards | PNG |
| `costco.png` | Costco | PNG |
| `delta.png` | Delta Air Lines | PNG |
| `disneyplus.png` | Disney+ | PNG |
| `dominos.png` | Domino's | PNG |
| `doordash.svg` | DoorDash | SVG |
| `dunkin.png` | Dunkin' | PNG |
| `github.svg` | GitHub Student Pack | SVG |
| `grubhub.png` | Grubhub | PNG |
| `hbomax.png` | HBO Max | PNG |
| `hilton.jpg` | Hilton Honors | JPG |
| `homedepot.png` | Home Depot | PNG |
| `hulu.png` | Hulu | PNG |
| `hyatt.jpg` | World of Hyatt | JPG |
| `ihg.png` | IHG Rewards | PNG |
| `instacart.png` | Instacart | PNG |
| `jetblue.png` | JetBlue | PNG |
| `kroger.png` | Kroger | PNG |
| `lyft.svg` | Lyft | SVG |
| `marriott.svg` | Marriott Bonvoy | SVG |
| `mcdonalds.svg` | McDonald's | SVG |
| `mercury.png` | Mercury Bank | PNG |
| `netflix.svg` | Netflix | SVG |
| `nike.svg` | Nike | SVG |
| `panerabread.png` | Panera Bread | PNG |
| `paramountplus.svg` | Paramount+ | SVG |
| `paypal.png` | PayPal | PNG |
| `peacock.png` | Peacock | PNG |
| `pizzahut.png` | Pizza Hut | PNG |
| `planetfitness.jpg` | Planet Fitness | JPG |
| `popeyes.png` | Popeyes | PNG |
| `publix.png` | Publix | PNG |
| `rei.png` | REI | PNG |
| `sephora.png` | Sephora | PNG |
| `sonic.svg` | Sonic | SVG |
| `southwest.png` | Southwest Airlines | PNG |
| `spotify.svg` | Spotify Premium | SVG |
| `starbucks.svg` | Starbucks | SVG |
| `subway.png` | Subway | PNG |
| `tacobell.svg` | Taco Bell | SVG |
| `target.svg` | Target | SVG |
| `tmobile.png` | T-Mobile | PNG |
| `traderjoes.png` | Trader Joe's | PNG |
| `uber.svg` | Uber | SVG |
| `united.svg` | United Airlines | SVG |
| `usaa.png` | USAA | PNG |
| `venmo.png` | Venmo | PNG |
| `walmart.png` | Walmart+ | PNG |
| `wendys.png` | Wendy's | PNG |
| `wholefoodsmarket.png` | Whole Foods | PNG |
| `wingstop.png` | Wingstop | PNG |
| `youtube.svg` | YouTube Premium | SVG |

**Total: 78 brand logo files** (some providers have duplicate formats — SVG and PNG)

### Credit Card Images (`/images/cards/`)

Physical card images used in hero sections, provider grids, and mockups.

| File | Card Name | Format |
|---|---|---|
| `amex-platinum.jpg` | Amex Platinum | JPG |
| `amex-gold.jpg` | Amex Gold | JPG |
| `chase-sapphire-reserve.jpg` | Chase Sapphire Reserve | JPG |
| `chase-freedom-flex.jpg` | Chase Freedom Flex | JPG |
| `capital-one-venture.jpg` | Capital One Venture | JPG |
| `citi-double-cash.png` | Citi Double Cash | PNG |

**Total: 6 card images**

### Duplicate/Alternate Format Files

Some providers have both SVG and PNG versions. The `providers.json` specifies which one is actively used. These extras exist in the directory but are not referenced:

```
aaa.png (unused — aaa.svg is referenced)
americanairlines.svg (unused — .png is referenced)
delta.svg (unused — .png is referenced)
hbomax.svg (unused — .png is referenced)
hilton.svg (unused — .jpg is referenced)
hyatt.png (unused — .jpg is referenced)
instacart.svg (unused — .png is referenced)
jetblue.svg (unused — .png is referenced)
kroger.jpg (unused — .png is referenced)
paypal.svg (unused — .png is referenced)
sephora.jpg (unused — .png is referenced)
sonic.png (unused — .svg is referenced)
venmo.svg (unused — .png is referenced)
```

---

## 2. Complete Providers Data

This is the complete `providers.json` — 81 providers across 13 types.

Copy this to `src/data/providers.json`:

```json
[
  { "id": "amex-platinum", "name": "Amex Platinum", "type": "credit-card", "logo": "/images/brands/amex.svg", "cardImage": "/images/cards/amex-platinum.jpg", "color": "#C4B590" },
  { "id": "amex-gold", "name": "Amex Gold", "type": "credit-card", "logo": "/images/brands/amex.svg", "cardImage": "/images/cards/amex-gold.jpg", "color": "#D4A843" },
  { "id": "chase-sapphire-reserve", "name": "Chase Sapphire Reserve", "type": "credit-card", "logo": "/images/brands/chase.svg", "cardImage": "/images/cards/chase-sapphire-reserve.jpg", "color": "#003087" },
  { "id": "chase-freedom-flex", "name": "Chase Freedom Flex", "type": "credit-card", "logo": "/images/brands/chase.svg", "cardImage": "/images/cards/chase-freedom-flex.jpg", "color": "#003087" },
  { "id": "capital-one-venture", "name": "Capital One Venture", "type": "credit-card", "logo": "/images/brands/capitalone.png", "cardImage": "/images/cards/capital-one-venture.jpg", "color": "#D03027" },
  { "id": "citi-credit-cards", "name": "Citi Credit Cards", "type": "credit-card", "logo": "/images/brands/citi.png", "cardImage": "/images/cards/citi-double-cash.png", "color": "#003DA5" },

  { "id": "mercury-bank", "name": "Mercury Bank", "type": "bank", "logo": "/images/brands/mercury.png", "cardImage": null, "color": "#5856D6" },
  { "id": "usaa", "name": "USAA", "type": "bank", "logo": "/images/brands/usaa.png", "cardImage": null, "color": "#1B3A5C" },

  { "id": "mcdonalds", "name": "McDonald's", "type": "restaurant", "logo": "/images/brands/mcdonalds.svg", "cardImage": null, "color": "#FFC72C" },
  { "id": "starbucks", "name": "Starbucks", "type": "restaurant", "logo": "/images/brands/starbucks.svg", "cardImage": null, "color": "#00704A" },
  { "id": "chick-fil-a", "name": "Chick-fil-A", "type": "restaurant", "logo": "/images/brands/chickfila.png", "cardImage": null, "color": "#E51636" },
  { "id": "chipotle", "name": "Chipotle", "type": "restaurant", "logo": "/images/brands/chipotle.png", "cardImage": null, "color": "#A81612" },
  { "id": "burger-king", "name": "Burger King", "type": "restaurant", "logo": "/images/brands/burgerking.svg", "cardImage": null, "color": "#D62300" },
  { "id": "taco-bell", "name": "Taco Bell", "type": "restaurant", "logo": "/images/brands/tacobell.svg", "cardImage": null, "color": "#702082" },
  { "id": "dominos", "name": "Domino's", "type": "restaurant", "logo": "/images/brands/dominos.png", "cardImage": null, "color": "#006491" },
  { "id": "dunkin", "name": "Dunkin'", "type": "restaurant", "logo": "/images/brands/dunkin.png", "cardImage": null, "color": "#FF671F" },
  { "id": "panera-bread", "name": "Panera Bread", "type": "restaurant", "logo": "/images/brands/panerabread.png", "cardImage": null, "color": "#4A7729" },
  { "id": "subway", "name": "Subway", "type": "restaurant", "logo": "/images/brands/subway.png", "cardImage": null, "color": "#008C15" },
  { "id": "wendys", "name": "Wendy's", "type": "restaurant", "logo": "/images/brands/wendys.png", "cardImage": null, "color": "#E2203A" },
  { "id": "pizza-hut", "name": "Pizza Hut", "type": "restaurant", "logo": "/images/brands/pizzahut.png", "cardImage": null, "color": "#EE3A23" },
  { "id": "popeyes", "name": "Popeyes", "type": "restaurant", "logo": "/images/brands/popeyes.png", "cardImage": null, "color": "#F15A22" },
  { "id": "sonic", "name": "Sonic", "type": "restaurant", "logo": "/images/brands/sonic.svg", "cardImage": null, "color": "#FFD700" },
  { "id": "wingstop", "name": "Wingstop", "type": "restaurant", "logo": "/images/brands/wingstop.png", "cardImage": null, "color": "#00843D" },

  { "id": "american-airlines", "name": "American Airlines", "type": "airline", "logo": "/images/brands/americanairlines.png", "cardImage": null, "color": "#0078D2" },
  { "id": "delta", "name": "Delta Air Lines", "type": "airline", "logo": "/images/brands/delta.png", "cardImage": null, "color": "#003366" },
  { "id": "united", "name": "United Airlines", "type": "airline", "logo": "/images/brands/united.svg", "cardImage": null, "color": "#002244" },
  { "id": "southwest", "name": "Southwest Airlines", "type": "airline", "logo": "/images/brands/southwest.png", "cardImage": null, "color": "#304CB2" },
  { "id": "jetblue", "name": "JetBlue", "type": "airline", "logo": "/images/brands/jetblue.png", "cardImage": null, "color": "#0033A0" },

  { "id": "hilton-honors", "name": "Hilton Honors", "type": "hotel", "logo": "/images/brands/hilton.jpg", "cardImage": null, "color": "#104C97" },
  { "id": "marriott-bonvoy", "name": "Marriott Bonvoy", "type": "hotel", "logo": "/images/brands/marriott.svg", "cardImage": null, "color": "#A4343A" },
  { "id": "world-of-hyatt", "name": "World of Hyatt", "type": "hotel", "logo": "/images/brands/hyatt.jpg", "cardImage": null, "color": "#D4A76A" },
  { "id": "ihg-rewards", "name": "IHG Rewards", "type": "hotel", "logo": "/images/brands/ihg.png", "cardImage": null, "color": "#2D2926" },

  { "id": "netflix", "name": "Netflix", "type": "streaming", "logo": "/images/brands/netflix.svg", "cardImage": null, "color": "#E50914" },
  { "id": "spotify-premium", "name": "Spotify Premium", "type": "subscription", "logo": "/images/brands/spotify.svg", "cardImage": null, "color": "#1DB954" },
  { "id": "disney-plus", "name": "Disney+", "type": "streaming", "logo": "/images/brands/disneyplus.png", "cardImage": null, "color": "#113CCF" },
  { "id": "hbo-max", "name": "HBO Max", "type": "streaming", "logo": "/images/brands/hbomax.png", "cardImage": null, "color": "#5822B4" },
  { "id": "hulu", "name": "Hulu", "type": "streaming", "logo": "/images/brands/hulu.png", "cardImage": null, "color": "#1CE783" },
  { "id": "peacock", "name": "Peacock", "type": "streaming", "logo": "/images/brands/peacock.png", "cardImage": null, "color": "#000000" },
  { "id": "paramount-plus", "name": "Paramount+", "type": "streaming", "logo": "/images/brands/paramountplus.svg", "cardImage": null, "color": "#0064FF" },
  { "id": "youtube-premium", "name": "YouTube Premium", "type": "streaming", "logo": "/images/brands/youtube.svg", "cardImage": null, "color": "#FF0000" },

  { "id": "target", "name": "Target", "type": "retail", "logo": "/images/brands/target.svg", "cardImage": null, "color": "#CC0000" },
  { "id": "best-buy", "name": "Best Buy", "type": "retail", "logo": "/images/brands/bestbuy.png", "cardImage": null, "color": "#0046BE" },
  { "id": "home-depot", "name": "Home Depot", "type": "retail", "logo": "/images/brands/homedepot.png", "cardImage": null, "color": "#F96302" },
  { "id": "nike", "name": "Nike", "type": "retail", "logo": "/images/brands/nike.svg", "cardImage": null, "color": "#111111" },
  { "id": "adidas", "name": "Adidas", "type": "retail", "logo": "/images/brands/adidas.svg", "cardImage": null, "color": "#000000" },
  { "id": "sephora", "name": "Sephora", "type": "retail", "logo": "/images/brands/sephora.png", "cardImage": null, "color": "#000000" },
  { "id": "rei", "name": "REI", "type": "retail", "logo": "/images/brands/rei.png", "cardImage": null, "color": "#2D5C34" },

  { "id": "costco", "name": "Costco", "type": "membership", "logo": "/images/brands/costco.png", "cardImage": null, "color": "#E31837" },
  { "id": "aaa", "name": "AAA", "type": "membership", "logo": "/images/brands/aaa.svg", "cardImage": null, "color": "#003893" },
  { "id": "github-student-pack", "name": "GitHub Student Pack", "type": "membership", "logo": "/images/brands/github.svg", "cardImage": null, "color": "#181717" },

  { "id": "kroger", "name": "Kroger", "type": "grocery", "logo": "/images/brands/kroger.png", "cardImage": null, "color": "#2B2D7B" },
  { "id": "whole-foods", "name": "Whole Foods", "type": "grocery", "logo": "/images/brands/wholefoodsmarket.png", "cardImage": null, "color": "#00674B" },
  { "id": "publix", "name": "Publix", "type": "grocery", "logo": "/images/brands/publix.png", "cardImage": null, "color": "#3B8540" },
  { "id": "trader-joes", "name": "Trader Joe's", "type": "grocery", "logo": "/images/brands/traderjoes.png", "cardImage": null, "color": "#DA291C" },

  { "id": "planet-fitness", "name": "Planet Fitness", "type": "fitness", "logo": "/images/brands/planetfitness.jpg", "cardImage": null, "color": "#5E2684" },

  { "id": "uber", "name": "Uber", "type": "rideshare", "logo": "/images/brands/uber.svg", "cardImage": null, "color": "#000000" },
  { "id": "lyft", "name": "Lyft", "type": "rideshare", "logo": "/images/brands/lyft.svg", "cardImage": null, "color": "#FF00BF" },
  { "id": "doordash", "name": "DoorDash", "type": "rideshare", "logo": "/images/brands/doordash.svg", "cardImage": null, "color": "#FF3008" },
  { "id": "grubhub", "name": "Grubhub", "type": "rideshare", "logo": "/images/brands/grubhub.png", "cardImage": null, "color": "#F63440" },
  { "id": "instacart", "name": "Instacart", "type": "rideshare", "logo": "/images/brands/instacart.png", "cardImage": null, "color": "#43B02A" },

  { "id": "paypal", "name": "PayPal", "type": "fintech", "logo": "/images/brands/paypal.png", "cardImage": null, "color": "#003087" },
  { "id": "venmo", "name": "Venmo", "type": "fintech", "logo": "/images/brands/venmo.png", "cardImage": null, "color": "#3D95CE" },
  { "id": "cash-app", "name": "Cash App", "type": "fintech", "logo": "/images/brands/cashapp.svg", "cardImage": null, "color": "#00D632" },

  { "id": "apple-one", "name": "Apple One", "type": "subscription", "logo": "/images/brands/apple.svg", "cardImage": null, "color": "#000000" },
  { "id": "amazon-prime", "name": "Amazon Prime", "type": "subscription", "logo": "/images/brands/amazon.png", "cardImage": null, "color": "#FF9900" },
  { "id": "t-mobile", "name": "T-Mobile", "type": "subscription", "logo": "/images/brands/tmobile.png", "cardImage": null, "color": "#E20074" },
  { "id": "walmart-plus", "name": "Walmart+", "type": "subscription", "logo": "/images/brands/walmart.png", "cardImage": null, "color": "#0071CE" }
]
```

### Provider Types Summary

| Type | Count | Examples |
|---|---|---|
| credit-card | 6 | Amex Platinum, Chase Sapphire Reserve, Capital One Venture |
| restaurant | 15 | McDonald's, Starbucks, Chick-fil-A, Chipotle |
| airline | 5 | American Airlines, Delta, United, Southwest, JetBlue |
| hotel | 4 | Hilton Honors, Marriott Bonvoy, World of Hyatt, IHG |
| streaming | 7 | Netflix, Disney+, HBO Max, Hulu, Peacock, Paramount+, YouTube Premium |
| retail | 7 | Target, Best Buy, Home Depot, Nike, Adidas, Sephora, REI |
| subscription | 4 | Apple One, Amazon Prime, T-Mobile, Walmart+, Spotify |
| membership | 3 | Costco, AAA, GitHub Student Pack |
| grocery | 4 | Kroger, Whole Foods, Publix, Trader Joe's |
| rideshare | 5 | Uber, Lyft, DoorDash, Grubhub, Instacart |
| fintech | 3 | PayPal, Venmo, Cash App |
| bank | 2 | Mercury Bank, USAA |
| fitness | 1 | Planet Fitness |

---

## 3. Complete Perks Data

The perks data is **188 perks across 5,310 lines of JSON**. It is too large to embed inline in a markdown file.

**The complete file is included alongside this document as `perks-complete-data.json`.**

Copy it to `src/data/perks.json` in your project.

### Perks Summary Statistics

| Metric | Value |
|---|---|
| Total perks | 188 |
| Popular perks (featured on homepage) | 61 |
| Categories | 7 (Travel, Food, Shopping, Entertainment, Finance, Software, Health) |
| Provider types | 13 |
| Unique providers | 67 |

### Perks by Category

| Category | Count |
|---|---|
| Travel | ~45 |
| Food | ~50 |
| Shopping | ~25 |
| Entertainment | ~30 |
| Finance | ~15 |
| Software | ~10 |
| Health | ~13 |

### Perks by Provider (top 10)

| Provider | Perks |
|---|---|
| Amex Platinum | ~12 |
| Amazon Prime | ~8 |
| Chase Sapphire Reserve | ~7 |
| Costco | ~6 |
| T-Mobile | ~6 |
| Amex Gold | ~5 |
| Capital One Venture | ~5 |
| Walmart+ | ~5 |
| Target | ~5 |
| Starbucks | ~5 |

### Perk Data Schema

Every perk in `perks.json` follows this exact structure:

```json
{
  "id": "amex-platinum-airline-credit",
  "title": "$200 Airline Fee Credit",
  "description": "Short description for cards (~1-2 sentences)",
  "fullDescription": "Long description for detail page (~3-5 sentences)",
  "provider": "Amex Platinum",
  "providerType": "credit-card",
  "providerLogo": "💳",
  "category": "Travel",
  "value": "$200/year",
  "valueCents": 20000,
  "expiration": null,
  "claimUrl": "https://www.americanexpress.com",
  "claimSteps": [
    "Step 1: Log in to your account",
    "Step 2: Navigate to the benefit",
    "Step 3: Enroll or activate",
    "Step 4: Use the benefit",
    "Step 5: Credit applied automatically"
  ],
  "tags": ["airline", "travel", "credit"],
  "popular": true,
  "dateAdded": "2024-01-15"
}
```

**Field descriptions:**

| Field | Type | Description |
|---|---|---|
| `id` | string | URL-safe unique ID, format: `provider-slug-perk-slug` |
| `title` | string | Short perk title, often includes the value |
| `description` | string | 1-2 sentence summary for card display |
| `fullDescription` | string | 3-5 sentence detailed description for the detail page |
| `provider` | string | Provider display name — MUST match a name in `providers.json` |
| `providerType` | string | Provider type slug — MUST match a type in `providers.json` |
| `providerLogo` | string | Legacy emoji fallback (not used — logos come from providers.json) |
| `category` | string | One of: Travel, Food, Shopping, Entertainment, Finance, Software, Health |
| `value` | string | Human-readable value (e.g., "$200/year", "4X points", "Free", "$50/month") |
| `valueCents` | number | Value in cents for sorting/calculation (0 if not quantifiable) |
| `expiration` | string\|null | ISO date string or null if no expiration |
| `claimUrl` | string | External URL where the user can claim/activate the perk |
| `claimSteps` | string[] | 3-5 ordered steps for claiming the perk |
| `tags` | string[] | 2-4 lowercase tags for search/filtering |
| `popular` | boolean | Whether to feature on the homepage |
| `dateAdded` | string | ISO date string for sorting by "newest" |

---

## 4. Data Schema Reference

### imageMap.ts

This utility file dynamically builds lookup maps from `providers.json`. Copy to `src/data/imageMap.ts`:

```typescript
import providersData from "./providers.json";

// Build logo map dynamically from providers.json
export const providerLogos: Record<string, string> = Object.fromEntries(
  providersData.map((p) => [p.name, p.logo])
);

// Build card image map dynamically from providers.json
export const providerCardImages: Record<string, string> = Object.fromEntries(
  providersData
    .filter((p) => p.cardImage !== null)
    .map((p) => [p.name, p.cardImage as string])
);

// Unique brands for marquee (deduplicated by logo path)
export const uniqueBrands = providersData.filter(
  (p, i, arr) => arr.findIndex((x) => x.logo === p.logo) === i
);
```

**What it provides:**

- `providerLogos` — Maps provider name (e.g., "Amex Platinum") to its logo path (e.g., "/images/brands/amex.svg")
- `providerCardImages` — Maps provider name to its card image path (only for credit cards that have card images; 6 total)
- `uniqueBrands` — Deduplicated provider list for the scrolling logo marquee (since Amex Platinum and Amex Gold share the same amex.svg logo, only one appears)

### BrandLogo Component

The `BrandLogo` component in `PerkCard.tsx` renders provider logos:

```typescript
function BrandLogo({ provider, size = 24 }: { provider: string; size?: number }) {
  const src = providerLogos[provider];
  if (!src) return <span className="text-lg">{provider[0]}</span>;

  if (src.endsWith(".svg")) {
    return <img src={src} alt={provider} width={size} height={size} className="object-contain" />;
  }
  return <Image src={src} alt={provider} width={size} height={size} className="rounded object-contain" />;
}
```

- SVGs use a regular `<img>` tag (to avoid Next.js Image optimization issues with SVGs)
- PNGs/JPGs use Next.js `<Image>` component
- Fallback: shows the first letter of the provider name if no logo exists

---

## 5. External Image Configuration

The Next.js config allows remote images from these domains (in case you use external logo sources):

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.brandfetch.io" },
      { hostname: "cdn.prodstatic.com" },
    ],
  },
};
```

---

## Notes for Rebuilding

1. **Copy the image files** — The `/public/images/` directory with all brand logos, card images, and site logos must be present. These are binary files that cannot be generated from this document.

2. **Copy `perks-complete-data.json`** — This file (alongside this document in `/docs/`) contains the complete 188 perks. Copy it to `src/data/perks.json`.

3. **Copy `providers-complete-data.json`** — This file contains all 81 providers. Copy it to `src/data/providers.json`.

4. **Provider name matching is critical** — The `provider` field in each perk MUST exactly match the `name` field of a provider in `providers.json`. If they don't match, the logo won't display and the My Perks page won't correctly filter perks.

5. **The `providerLogo` field in perks.json is legacy** — It contains emoji fallbacks from before we had real logos. It is NOT used for display. Logos come from `providers.json` via `imageMap.ts`.

---

*Last updated: April 14, 2026*
