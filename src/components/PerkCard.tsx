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

const categoryColors: Record<string, { gradient: string; text: string; bg: string; shadow: string }> = {
  Travel: { gradient: "from-teal to-teal-light", text: "text-teal", bg: "bg-teal/8", shadow: "shadow-teal/10" },
  Food: { gradient: "from-coral to-coral-light", text: "text-coral", bg: "bg-coral/8", shadow: "shadow-coral/10" },
  Software: { gradient: "from-purple to-purple-light", text: "text-purple", bg: "bg-purple/8", shadow: "shadow-purple/10" },
  Finance: { gradient: "from-mint to-teal", text: "text-mint", bg: "bg-mint/8", shadow: "shadow-mint/10" },
  Health: { gradient: "from-pink to-coral-light", text: "text-pink", bg: "bg-pink/8", shadow: "shadow-pink/10" },
  Shopping: { gradient: "from-sunny to-orange", text: "text-orange", bg: "bg-sunny/8", shadow: "shadow-sunny/10" },
  Entertainment: { gradient: "from-blue to-purple-light", text: "text-blue", bg: "bg-blue/8", shadow: "shadow-blue/10" },
};

export default function PerkCard({ perk, index = 0 }: { perk: Perk; index?: number }) {
  const colors = categoryColors[perk.category] || categoryColors.Travel;

  const isExpiring =
    perk.expiration &&
    new Date(perk.expiration) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  return (
    <Link
      href={`/perk/${perk.id}`}
      className="group block animate-scale-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`card-3d relative h-full overflow-hidden rounded-2xl bg-white border border-ink/[0.06] p-5 shadow-sm hover:shadow-xl ${colors.shadow} transition-all duration-300`}>
        {/* Colored top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Top row */}
        <div className="mb-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cream-dark/50 to-cream text-lg shadow-sm">
              {perk.providerLogo}
            </span>
            <div>
              <span className="text-xs font-semibold text-ink/70">{perk.provider}</span>
            </div>
          </div>
          <span className={`rounded-full ${colors.bg} px-2.5 py-1 text-[11px] font-bold ${colors.text} tracking-wide uppercase`}>
            {perk.category}
          </span>
        </div>

        {/* Title and description */}
        <h3 className="mb-1.5 text-[15px] font-bold leading-snug text-ink group-hover:gradient-text transition-all duration-200">
          {perk.title}
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-ink-muted line-clamp-2">
          {perk.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`rounded-lg ${colors.bg} px-2.5 py-1 text-sm font-extrabold ${colors.text}`}>
              {perk.value}
            </span>
            {isExpiring && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-orange">
                <Clock className="h-3 w-3" />
                Expiring
              </span>
            )}
          </div>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink/30 transition-all duration-300 group-hover:bg-gradient-to-br ${colors.gradient} group-hover:text-white group-hover:scale-110 group-hover:rotate-12`}>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
