"use client";

import Link from "next/link";
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

const categoryStyle: Record<string, { text: string; bg: string }> = {
  Travel: { text: "text-teal-700", bg: "bg-teal-50" },
  Food: { text: "text-red-700", bg: "bg-red-50" },
  Software: { text: "text-indigo-700", bg: "bg-indigo-50" },
  Finance: { text: "text-emerald-700", bg: "bg-emerald-50" },
  Health: { text: "text-pink-700", bg: "bg-pink-50" },
  Shopping: { text: "text-amber-700", bg: "bg-amber-50" },
  Entertainment: { text: "text-blue-700", bg: "bg-blue-50" },
};

export default function PerkCard({ perk, index = 0 }: { perk: Perk; index?: number }) {
  const style = categoryStyle[perk.category] || categoryStyle.Travel;

  const isExpiring =
    perk.expiration &&
    new Date(perk.expiration) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  return (
    <Link
      href={`/perk/${perk.id}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-full rounded-xl bg-surface border border-border p-5 transition-all duration-200 hover:border-border hover:shadow-md">
        {/* Top row */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-base-dark/60 text-base">
              {perk.providerLogo}
            </span>
            <span className="text-xs font-medium text-ink-muted">{perk.provider}</span>
          </div>
          <span className={`rounded-md ${style.bg} px-2 py-0.5 text-[11px] font-semibold ${style.text}`}>
            {perk.category}
          </span>
        </div>

        {/* Title and description */}
        <h3 className="mb-1 text-sm font-semibold leading-snug text-ink group-hover:text-accent transition-colors">
          {perk.title}
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-ink-muted line-clamp-2">
          {perk.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-accent-subtle px-2 py-0.5 text-sm font-bold text-accent">
              {perk.value}
            </span>
            {isExpiring && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-warning">
                <Clock className="h-3 w-3" />
                Expiring
              </span>
            )}
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-base-dark/50 text-ink-faint transition-all duration-200 group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
