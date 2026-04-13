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
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <h1
          className="mb-2 text-xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Perk not found
        </h1>
        <p className="mb-6 text-sm text-ink-muted">
          This perk doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/browse"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
        >
          Browse all perks
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-surface py-6">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/browse"
            className="group mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to all perks
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div className="animate-slide-up">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-dark/60 text-xl">
                  {perk.providerLogo}
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{perk.provider}</div>
                  <div className="text-xs capitalize text-ink-faint">
                    {perk.providerType.replace("-", " ")}
                  </div>
                </div>
              </div>

              <h1
                className="mb-4 text-2xl font-bold leading-tight md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {perk.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-accent-subtle px-3 py-1 text-sm font-bold text-accent">
                  {perk.value}
                </span>
                <span className="rounded-md bg-base-dark px-2.5 py-1 text-xs font-medium text-ink-muted">
                  {perk.category}
                </span>
                {perk.expiration && (
                  <span className="flex items-center gap-1 rounded-md bg-warning-subtle px-2.5 py-1 text-xs font-medium text-warning">
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
            <div className="mb-8 rounded-xl border border-border bg-surface p-6">
              <h2 className="mb-2 text-sm font-semibold text-ink">About this perk</h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                {perk.fullDescription}
              </p>
            </div>

            {/* How to claim */}
            <div className="mb-8">
              <h2
                className="mb-4 text-base font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                How to claim
              </h2>
              <div className="space-y-2">
                {perk.claimSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 animate-slide-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-ink-faint" />
              {perk.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-base-dark px-2.5 py-1 text-xs font-medium text-ink-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            {/* Claim card */}
            <div className="mb-6 overflow-hidden rounded-xl border border-border bg-surface">
              <div className="bg-ink p-5 text-center text-white">
                <div className="mb-0.5 text-xs font-medium text-white/40">
                  Estimated value
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {perk.value}
                </div>
              </div>
              <div className="p-4">
                <a
                  href={perk.claimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
                >
                  Claim this perk
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <div className="flex items-center justify-center gap-1.5 text-xs text-ink-faint">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  Verified & active
                </div>
              </div>
            </div>

            {/* Related perks */}
            {relatedPerks.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink">
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
