"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  CheckCircle2,
  Tag,
} from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard from "@/components/PerkCard";

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

export default function PerkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const perk = perksData.find((p) => p.id === id);

  const relatedPerks = useMemo(() => {
    if (!perk) return [];
    return perksData
      .filter(
        (p) =>
          p.id !== perk.id &&
          (p.provider === perk.provider || p.category === perk.category)
      )
      .slice(0, 3);
  }, [perk, id]);

  if (!perk) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
        <h1
          className="mb-2 text-2xl font-bold"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Perk not found
        </h1>
        <p className="mb-6 text-sm text-ink-muted">
          This perk doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/browse"
          className="rounded-full bg-dark px-6 py-2.5 text-sm font-semibold text-white"
        >
          Browse all perks
        </Link>
      </div>
    );
  }

  const logoSrc = providerImages[perk.provider];
  const cardSrc = providerCardImages[perk.provider];

  return (
    <div className="min-h-screen">
      {/* Hero with card image */}
      <div className="bg-dark text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="py-6">
            <Link
              href="/browse"
              className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to all perks
            </Link>
          </div>

          <div className="grid items-center gap-10 pb-14 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                {logoSrc && (
                  <Image
                    src={logoSrc}
                    alt={perk.provider}
                    width={32}
                    height={32}
                    className="rounded object-contain"
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-white/80">{perk.provider}</div>
                  <div className="text-xs capitalize text-white/30">
                    {perk.providerType.replace("-", " ")}
                  </div>
                </div>
              </div>

              <h1
                className="mb-4 text-3xl tracking-tight md:text-4xl animate-fade-up"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {perk.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-white">
                  {perk.value}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/60">
                  {perk.category}
                </span>
                {perk.expiration && (
                  <span className="flex items-center gap-1 rounded-full bg-warning/20 px-3 py-1.5 text-xs font-medium text-yellow-300">
                    <Clock className="h-3 w-3" />
                    Expires{" "}
                    {new Date(perk.expiration).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>

            {/* Card image */}
            {cardSrc && (
              <div className="hidden lg:block w-[280px] animate-slide-cards delay-200">
                <Image
                  src={cardSrc}
                  alt={perk.provider}
                  width={500}
                  height={315}
                  className="rounded-xl shadow-2xl shadow-black/40"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div>
            {/* Description */}
            <div className="mb-8 rounded-2xl border border-border/70 bg-surface p-7">
              <h2 className="mb-3 text-sm font-bold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
                About this perk
              </h2>
              <p className="text-[15px] leading-relaxed text-ink-secondary">
                {perk.fullDescription}
              </p>
            </div>

            {/* How to claim */}
            <div className="mb-8">
              <h2
                className="mb-5 text-xl font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                How to claim
              </h2>
              <div className="space-y-3">
                {perk.claimSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-xl border border-border/70 bg-surface p-5 animate-fade-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-dark text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-ink-secondary pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-ink-muted" />
              {perk.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-ink-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="mb-6 overflow-hidden rounded-2xl border border-border/70 bg-surface">
              <div className="bg-dark p-6 text-center text-white">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">
                  Estimated value
                </p>
                <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                  {perk.value}
                </p>
              </div>
              <div className="p-5">
                <a
                  href={perk.claimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
                >
                  Claim this perk
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <div className="flex items-center justify-center gap-1.5 text-xs text-ink-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  Verified & active
                </div>
              </div>
            </div>

            {relatedPerks.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
                  Related perks
                </h3>
                <div className="space-y-3">
                  {relatedPerks.map((rp, i) => (
                    <PerkCard key={rp.id} perk={rp} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
