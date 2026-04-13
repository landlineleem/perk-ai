"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";

interface Perk {
  id: string;
  title: string;
  description: string;
  provider: string;
  providerLogo: string;
  category: string;
  value: string;
  expiration: string | null;
}

const providerImages: Record<string, string> = {
  "Amex Platinum": "/images/brands/amex.png",
  "Amex Gold": "/images/brands/amex.png",
  "Chase Sapphire Reserve": "/images/brands/chase.png",
  "Chase Freedom Flex": "/images/brands/chase.png",
  "Capital One Venture": "/images/brands/capitalone.png",
  "Citi Credit Cards": "/images/brands/citi.png",
  "Mercury Bank": "/images/brands/mercury.png",
  "USAA": "/images/brands/usaa.png",
  "Apple One": "/images/brands/apple.png",
  "Amazon Prime": "/images/brands/amazon.png",
  "Spotify Premium": "/images/brands/spotify.png",
  "T-Mobile": "/images/brands/tmobile.png",
  "Walmart+": "/images/brands/walmart.png",
  "Costco": "/images/brands/costco.png",
  "AAA": "/images/brands/aaa.png",
  "Hilton Honors": "/images/brands/hilton.png",
  "GitHub Student Pack": "/images/brands/github.png",
};

const providerCardImages: Record<string, string> = {
  "Amex Platinum": "/images/cards/amex-platinum.png",
  "Amex Gold": "/images/cards/amex-gold.png",
  "Chase Sapphire Reserve": "/images/cards/chase-sapphire-reserve.png",
  "Chase Freedom Flex": "/images/cards/chase-freedom-flex.png",
  "Capital One Venture": "/images/cards/capital-one-venture.png",
  "Citi Credit Cards": "/images/cards/citi-double-cash.jpg",
};

export default function PerkCard({ perk, index = 0 }: { perk: Perk; index?: number }) {
  const logoSrc = providerImages[perk.provider];
  const cardSrc = providerCardImages[perk.provider];

  const isExpiring =
    perk.expiration &&
    new Date(perk.expiration) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  return (
    <Link
      href={`/perk/${perk.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="card-hover relative h-full overflow-hidden rounded-2xl bg-surface border border-border/70">
        {/* Card image strip at top if credit card */}
        {cardSrc && (
          <div className="relative h-36 overflow-hidden bg-surface-alt">
            <Image
              src={cardSrc}
              alt={perk.provider}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-5">
          {/* Provider row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={perk.provider}
                  width={24}
                  height={24}
                  className="rounded object-contain"
                />
              ) : (
                <span className="text-lg">{perk.providerLogo}</span>
              )}
              <span className="text-xs font-medium text-ink-muted">{perk.provider}</span>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              {perk.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-ink group-hover:text-primary transition-colors">
            {perk.title}
          </h3>
          <p className="mb-4 text-[13px] leading-relaxed text-ink-muted line-clamp-2">
            {perk.description}
          </p>

          {/* Bottom */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold text-primary">{perk.value}</span>
              {isExpiring && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-warning">
                  <Clock className="h-3 w-3" />
                  Expiring
                </span>
              )}
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-alt text-ink-muted transition-all group-hover:bg-primary group-hover:text-white">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
