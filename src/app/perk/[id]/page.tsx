"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  CheckCircle2,
  Tag,
  Sparkles,
} from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard from "@/components/PerkCard";

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
          className="mb-4 text-2xl font-bold"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Perk not found
        </h1>
        <p className="mb-6 text-white/40">
          This perk doesn't exist or may have been removed.
        </p>
        <Link
          href="/browse"
          className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-gold-light"
        >
          Browse all perks
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/browse"
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to all perks
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Main content */}
        <div>
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl">
                {perk.providerLogo}
              </span>
              <div>
                <div className="text-sm text-white/40">{perk.provider}</div>
                <div className="text-xs capitalize text-white/20">
                  {perk.providerType.replace("-", " ")}
                </div>
              </div>
            </div>

            <h1
              className="mb-4 text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {perk.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gold/10 px-4 py-1.5 text-sm font-bold text-gold">
                {perk.value}
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/40">
                {perk.category}
              </span>
              {perk.expiration && (
                <span className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5 text-xs text-orange-400">
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

          {/* Description */}
          <div className="mb-10 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h2 className="mb-3 text-sm font-semibold text-white/60">
              About this perk
            </h2>
            <p className="leading-relaxed text-white/70">
              {perk.fullDescription}
            </p>
          </div>

          {/* How to claim */}
          <div className="mb-10">
            <h2
              className="mb-4 text-xl font-bold"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              How to claim
            </h2>
            <div className="space-y-3">
              {perk.claimSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-10 flex flex-wrap items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-white/20" />
            {perk.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {/* Claim card */}
          <div className="mb-6 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent p-6">
            <div className="mb-4 text-center">
              <div
                className="mb-1 text-2xl font-bold text-gold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {perk.value}
              </div>
              <div className="text-xs text-white/30">Estimated value</div>
            </div>

            <a
              href={perk.claimUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-sm font-bold text-charcoal transition-all hover:bg-gold-light hover:shadow-[0_0_20px_rgba(245,200,66,0.3)]"
            >
              Claim this perk
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <div className="flex items-center justify-center gap-1.5 text-xs text-white/30">
              <CheckCircle2 className="h-3 w-3 text-green-400" />
              Verified & active
            </div>
          </div>

          {/* Related perks */}
          {relatedPerks.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/50">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Related perks
              </h3>
              <div className="space-y-3">
                {relatedPerks.map((rp) => (
                  <PerkCard key={rp.id} perk={rp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
