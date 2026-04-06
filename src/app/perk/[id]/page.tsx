"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  CheckCircle2,
  Tag,
} from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard from "@/components/PerkCard";

const categoryColors: Record<string, { gradient: string; bg: string; text: string }> = {
  Travel: { gradient: "from-teal to-teal-light", bg: "bg-teal/8", text: "text-teal" },
  Food: { gradient: "from-coral to-coral-light", bg: "bg-coral/8", text: "text-coral" },
  Software: { gradient: "from-purple to-purple-light", bg: "bg-purple/8", text: "text-purple" },
  Finance: { gradient: "from-mint to-teal", bg: "bg-mint/8", text: "text-mint" },
  Health: { gradient: "from-pink to-coral-light", bg: "bg-pink/8", text: "text-pink" },
  Shopping: { gradient: "from-sunny to-orange", bg: "bg-sunny/8", text: "text-orange" },
  Entertainment: { gradient: "from-blue to-purple-light", bg: "bg-blue/8", text: "text-blue" },
};

const categoryEmojis: Record<string, string> = {
  Travel: "✈️",
  Food: "🍕",
  Software: "💎",
  Finance: "💸",
  Health: "💖",
  Shopping: "🛍️",
  Entertainment: "🎉",
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
        <div className="mb-4 text-6xl">🤔</div>
        <h1
          className="mb-3 text-2xl font-black"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Perk not found
        </h1>
        <p className="mb-6 text-ink-muted">
          This perk doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/browse"
          className="rounded-full bg-gradient-to-r from-coral to-purple px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple/20 hover:scale-[1.03] transition-transform"
        >
          Browse all perks
        </Link>
      </div>
    );
  }

  const colors = categoryColors[perk.category] || categoryColors.Travel;

  return (
    <div className="min-h-screen">
      {/* Gradient header area */}
      <div className={`relative overflow-hidden bg-gradient-to-b from-${perk.category === "Travel" ? "teal" : perk.category === "Food" ? "coral" : perk.category === "Software" ? "purple" : perk.category === "Finance" ? "mint" : perk.category === "Health" ? "pink" : perk.category === "Entertainment" ? "blue" : "sunny"}/5 via-cream to-cream pb-2 pt-8`}>
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/browse"
            className="group mb-6 inline-flex items-center gap-2 rounded-full bg-white border border-ink/[0.06] px-4 py-2 text-sm font-medium text-ink-muted shadow-sm transition-all hover:shadow-md hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to all perks
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main content */}
          <div className="animate-slide-up">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cream-dark/80 to-white text-2xl shadow-md border border-ink/[0.04]">
                  {perk.providerLogo}
                </span>
                <div>
                  <div className="text-sm font-bold text-ink">{perk.provider}</div>
                  <div className="text-xs capitalize text-ink-muted">
                    {perk.providerType.replace("-", " ")}
                  </div>
                </div>
              </div>

              <h1
                className="mb-5 text-3xl font-black leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {perk.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`rounded-xl ${colors.bg} px-4 py-2 text-sm font-extrabold ${colors.text}`}>
                  {perk.value}
                </span>
                <span className="flex items-center gap-1.5 rounded-xl bg-ink/5 px-3 py-2 text-xs font-semibold text-ink/60">
                  {categoryEmojis[perk.category]} {perk.category}
                </span>
                {perk.expiration && (
                  <span className="flex items-center gap-1.5 rounded-xl bg-orange/8 px-3 py-2 text-xs font-semibold text-orange">
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
            <div className="mb-10 rounded-3xl border border-ink/[0.06] bg-white p-7 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                <span>📋</span> About this perk
              </h2>
              <p className="leading-relaxed text-ink-muted">
                {perk.fullDescription}
              </p>
            </div>

            {/* How to claim */}
            <div className="mb-10">
              <h2
                className="mb-5 flex items-center gap-2 text-xl font-black"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span>🗺️</span> How to claim
              </h2>
              <div className="space-y-3">
                {perk.claimSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-sm animate-slide-in"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colors.gradient} text-xs font-black text-white shadow-sm`}>
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-ink/70 pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-10 flex flex-wrap items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-ink-muted" />
              {perk.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Claim card */}
            <div className="mb-6 overflow-hidden rounded-3xl border border-ink/[0.06] bg-white shadow-lg animate-scale-in">
              <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-center text-white`}>
                <div className="mb-1 text-sm font-semibold text-white/70">
                  Estimated value
                </div>
                <div
                  className="text-3xl font-black"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {perk.value}
                </div>
              </div>
              <div className="p-5">
                <a
                  href={perk.claimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${colors.gradient} py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
                >
                  Claim this perk
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <div className="flex items-center justify-center gap-1.5 text-xs text-ink-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                  Verified & active
                </div>
              </div>
            </div>

            {/* Related perks */}
            {relatedPerks.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                  <span>🔗</span> Related perks
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
