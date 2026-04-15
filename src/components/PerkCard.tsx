"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { providerLogos } from "@/data/imageMap";

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

function BrandLogo({ provider, size = 24 }: { provider: string; size?: number }) {
  const src = providerLogos[provider];
  if (!src) return <span className="text-lg">{provider[0]}</span>;

  if (src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={provider} width={size} height={size} className="object-contain" />
    );
  }
  return (
    <Image src={src} alt={provider} width={size} height={size} className="rounded object-contain" />
  );
}

export default function PerkCard({ perk, index = 0 }: { perk: Perk; index?: number }) {
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

        <div className="p-5">
          {/* Provider row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BrandLogo provider={perk.provider} />
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

export { BrandLogo };
