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
