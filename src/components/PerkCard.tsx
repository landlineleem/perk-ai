"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

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

export default function PerkCard({ perk }: { perk: Perk }) {
  const isExpiring =
    perk.expiration &&
    new Date(perk.expiration) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  return (
    <Link href={`/perk/${perk.id}`} className="group block">
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(245,200,66,0.05)]">
        {/* Top row: provider logo + category */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">
              {perk.providerLogo}
            </span>
            <span className="text-xs font-medium text-white/40">{perk.provider}</span>
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-white/40">
            {perk.category}
          </span>
        </div>

        {/* Title and description */}
        <h3 className="mb-2 text-[15px] font-semibold leading-snug text-white group-hover:text-gold transition-colors duration-200">
          {perk.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-white/40 line-clamp-2">
          {perk.description}
        </p>

        {/* Bottom row: value + expiration + arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gold">{perk.value}</span>
            {isExpiring && (
              <span className="flex items-center gap-1 text-[11px] text-orange-400">
                <Clock className="h-3 w-3" />
                Expiring soon
              </span>
            )}
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white/30 transition-all duration-200 group-hover:bg-gold group-hover:text-charcoal">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
