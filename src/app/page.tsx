"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import { uniqueBrands, providerCardImages } from "@/data/imageMap";
import { BrandLogo } from "@/components/PerkCard";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1000;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const providerTypeLabels: Record<string, string> = {
  "credit-card": "Credit Cards",
  "restaurant": "Restaurants",
  "airline": "Airlines",
  "hotel": "Hotels",
  "streaming": "Streaming",
  "retail": "Retail",
  "grocery": "Grocery",
  "rideshare": "Rideshare & Delivery",
  "fintech": "Fintech",
  "subscription": "Subscriptions",
  "membership": "Memberships",
  "bank": "Banks",
  "fitness": "Fitness",
};

const typeOrder = [
  "credit-card", "restaurant", "airline", "hotel", "streaming",
  "subscription", "retail", "grocery", "rideshare", "membership",
  "fintech", "bank", "fitness",
];

export default function Home() {
  const groupedProviders = typeOrder
    .map((type) => ({
      type,
      label: providerTypeLabels[type] || type,
      providers: providersData.filter((p) => p.type === type),
    }))
    .filter((g) => g.providers.length > 0);

  return (
    <div className="min-h-screen">
      {/* ===== HERO — asymmetric layout with card imagery ===== */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1fr_1fr] lg:px-10">
          {/* Left — copy */}
          <div className="relative z-10 max-w-xl">
            <p
              className="mb-5 text-sm font-medium tracking-widest uppercase text-primary-light animate-fade-up"
            >
              Stop leaving money on the table
            </p>

            <h1
              className="mb-6 text-[3.2rem] leading-[1.08] tracking-tight md:text-[4.2rem] animate-fade-up delay-100"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every perk you <span className="text-primary-light">deserve</span> to know
            </h1>

            <p className="mb-10 text-base leading-relaxed text-white/50 max-w-md animate-fade-up delay-200">
              Your credit cards, subscriptions, and memberships hold thousands in
              hidden value. We surface every benefit so nothing goes to waste.
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-fade-up delay-300">
              <Link
                href="/my-perks"
                className="rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-primary-light"
              >
                Unlock My Perks
              </Link>
              <Link
                href="/browse"
                className="rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
              >
                Browse All
              </Link>
            </div>
          </div>

          {/* Right — phone mockup with floating widgets (perk.com style) */}
          <div className="relative hidden lg:block" style={{ height: 520 }}>
            {/* Main phone — center */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 animate-hero-device">
              <div className="hero-phone relative">
                <div className="hero-phone-notch" />
                <div className="hero-phone-screen">
                  {/* App header */}
                  <div className="bg-dark px-5 pt-9 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">My Perks</div>
                      <div className="h-6 w-6 rounded-full bg-white/10" />
                    </div>
                    <div className="text-[10px] text-white/35 mb-0.5">Estimated annual value</div>
                    <div className="text-[26px] font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>$12,450</div>
                    <div className="mt-2 flex gap-2">
                      <div className="rounded-full bg-primary/20 px-2.5 py-1 text-[8px] font-semibold text-primary-light">5 providers</div>
                      <div className="rounded-full bg-white/10 px-2.5 py-1 text-[8px] font-medium text-white/40">32 perks</div>
                    </div>
                  </div>
                  {/* Perk list */}
                  <div className="px-3 py-3 space-y-1.5 bg-[#F6F6F2]">
                    <div className="text-[8px] font-semibold text-ink-muted uppercase tracking-wider px-1 mb-1">Travel</div>
                    {perksData.filter(p => p.popular && p.category === "Travel").slice(0, 2).map(perk => (
                      <div key={perk.id} className="flex items-center gap-2 rounded-[10px] bg-white p-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-alt">
                          <BrandLogo provider={perk.provider} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-semibold text-ink truncate leading-tight">{perk.title}</div>
                          <div className="text-[8px] text-ink-muted mt-0.5">{perk.provider}</div>
                        </div>
                        <div className="text-[10px] font-bold text-primary">{perk.value}</div>
                      </div>
                    ))}
                    <div className="text-[8px] font-semibold text-ink-muted uppercase tracking-wider px-1 mt-2 mb-1">Food &amp; Dining</div>
                    {perksData.filter(p => p.popular && p.category === "Food").slice(0, 2).map(perk => (
                      <div key={perk.id} className="flex items-center gap-2 rounded-[10px] bg-white p-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-alt">
                          <BrandLogo provider={perk.provider} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-semibold text-ink truncate leading-tight">{perk.title}</div>
                          <div className="text-[8px] text-ink-muted mt-0.5">{perk.provider}</div>
                        </div>
                        <div className="text-[10px] font-bold text-primary">{perk.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating widget — top left: total savings */}
            <div className="absolute left-0 top-[5%] animate-hero-widget delay-1000" style={{ animationFillMode: 'both' }}>
              <div className="hero-widget animate-gentle-float flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-subtle">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-ink">$12,450/yr</div>
                  <div className="text-[9px] text-ink-muted">Total perk value</div>
                </div>
              </div>
            </div>

            {/* Floating widget — top right: provider count */}
            <div className="absolute right-0 top-[12%] animate-hero-widget delay-1300" style={{ animationFillMode: 'both' }}>
              <div className="hero-widget animate-gentle-float flex items-center gap-3" style={{ animationDelay: '1s' }}>
                <div className="flex -space-x-1.5">
                  {perksData.filter(p => p.popular).slice(0, 3).map(p => (
                    <div key={p.id} className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-alt border-2 border-white">
                      <BrandLogo provider={p.provider} size={14} />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-ink">80+ providers</div>
                  <div className="text-[9px] text-ink-muted">All tracked</div>
                </div>
              </div>
            </div>

            {/* Floating widget — bottom left: perk alert */}
            <div className="absolute left-[-5%] bottom-[18%] animate-hero-widget delay-1500" style={{ animationFillMode: 'both' }}>
              <div className="hero-widget animate-gentle-float flex items-center gap-3" style={{ animationDelay: '2s' }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-subtle">
                  <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-ink">Credit expiring</div>
                  <div className="text-[9px] text-ink-muted">Airline credit resets in 5 days</div>
                </div>
              </div>
            </div>

            {/* Floating widget — bottom right: category */}
            <div className="absolute right-[-2%] bottom-[25%] animate-hero-widget delay-1800" style={{ animationFillMode: 'both' }}>
              <div className="hero-widget animate-gentle-float flex items-center gap-2.5" style={{ animationDelay: '3s' }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-subtle">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-ink">14 categories</div>
                  <div className="text-[9px] text-ink-muted">Travel to streaming</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient gradients */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* ===== PROVIDER LOGOS MARQUEE ===== */}
      <section className="border-b border-border/60 py-8 overflow-hidden">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Perks from {uniqueBrands.length}+ providers you already use
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />
          <div className="marquee-track">
            {[...uniqueBrands, ...uniqueBrands].map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex flex-shrink-0 items-center justify-center px-6">
                <BrandLogo provider={p.name} size={32} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENTO STATS ===== */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: perksData.length, suffix: "+", label: "Perks tracked", sub: "and growing weekly" },
            { value: providersData.length, suffix: "", label: "Providers", sub: "cards, apps, restaurants & more" },
            { value: 14, suffix: "", label: "Categories", sub: "travel to fast food" },
            { value: 250, suffix: "k", label: "Total value", sub: "in potential savings", prefix: "$" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-surface border border-border/70 p-6 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="text-3xl font-bold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
                {stat.prefix || ""}<AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-ink">{stat.label}</p>
              <p className="text-xs text-ink-muted">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROVIDERS GROUPED BY TYPE ===== */}
      <section className="bg-surface-alt border-y border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Providers
              </p>
              <h2
                className="text-3xl tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Explore by category
              </h2>
            </div>
            <Link
              href="/browse"
              className="group hidden items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink md:flex"
            >
              View all perks
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="space-y-10">
            {groupedProviders.map((group) => {
              const groupPerkCount = group.providers.reduce(
                (sum, prov) => sum + perksData.filter((p) => p.provider === prov.name).length,
                0
              );
              return (
                <div key={group.type}>
                  <div className="mb-4 flex items-center gap-3">
                    <h3
                      className="text-lg font-bold text-ink"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {group.label}
                    </h3>
                    <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted border border-border/70">
                      {groupPerkCount} perk{groupPerkCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {group.providers.map((provider) => {
                      const providerPerks = perksData.filter(
                        (p) => p.provider === provider.name
                      );
                      return (
                        <Link
                          href={`/browse?provider=${provider.id}`}
                          key={provider.id}
                          className="group block"
                        >
                          <div className="card-hover flex flex-col items-center gap-2.5 rounded-2xl bg-surface border border-border/70 p-4 text-center">
                            {provider.cardImage && provider.type === "credit-card" ? (
                              <Image
                                src={provider.cardImage}
                                alt={provider.name}
                                width={72}
                                height={45}
                                className="rounded object-contain"
                              />
                            ) : (
                              <BrandLogo provider={provider.name} size={32} />
                            )}
                            <div>
                              <h4 className="text-[13px] font-semibold text-ink group-hover:text-primary transition-colors leading-tight">
                                {provider.name}
                              </h4>
                              <p className="text-[11px] text-ink-muted mt-0.5">
                                {providerPerks.length} perk{providerPerks.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              View all perks
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="mb-4 text-3xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              See what you&apos;re <span className="text-primary-light">actually</span> paying for
            </h2>
            <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-white/40">
              Select your cards, subscriptions, and memberships. We&apos;ll show you
              every perk, credit, and benefit — so you never leave money on the table again.
            </p>
            <Link
              href="/my-perks"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-primary-light"
            >
              Unlock My Perks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-new.svg"
                alt="Perk.AI"
                className="mb-3 h-7 w-auto"
              />
              <p className="max-w-sm text-xs leading-relaxed text-ink-muted">
                Perk.ai helps you discover and track every benefit from your credit cards,
                subscriptions, and memberships. We are not a financial advisor.
              </p>
            </div>
            <div className="flex gap-10">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">Product</p>
                <ul className="space-y-1.5 text-xs text-ink-muted">
                  <li><Link href="/browse" className="hover:text-ink transition-colors">Browse Perks</Link></li>
                  <li><Link href="/my-perks" className="hover:text-ink transition-colors">My Perks</Link></li>
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink">Legal</p>
                <ul className="space-y-1.5 text-xs text-ink-muted">
                  <li><span className="cursor-default">Privacy Policy</span></li>
                  <li><span className="cursor-default">Terms of Service</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border/60 pt-5">
            <p className="text-[11px] text-ink-faint">
              &copy; {new Date().getFullYear()} Perk.ai. Not affiliated with any listed providers. All trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
