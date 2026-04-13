"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import { providerCardImages, uniqueBrands } from "@/data/imageMap";
import PerkCard, { BrandLogo } from "@/components/PerkCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

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

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const featuredPerks = useMemo(() => {
    return perksData
      .filter((p) => p.popular)
      .filter((p) => {
        if (category !== "all" && p.category !== category) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.provider.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          );
        }
        return true;
      });
  }, [search, category]);

  const creditCardProviders = providersData.filter((p) => p.type === "credit-card");

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
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Every perk you <em className="text-primary-light">deserve</em> to know
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

          {/* Right — stacked credit card images */}
          <div className="relative hidden lg:block animate-slide-cards delay-300">
            <div className="card-stack relative h-[420px]">
              {/* Back card */}
              <div className="absolute right-0 top-8 w-[340px] rotate-6 opacity-60">
                <Image
                  src="/images/cards/chase-sapphire-reserve.jpg"
                  alt="Chase Sapphire Reserve"
                  width={500}
                  height={315}
                  className="rounded-xl shadow-2xl shadow-black/40"
                />
              </div>
              {/* Middle card */}
              <div className="absolute right-12 top-0 w-[340px] rotate-2 opacity-80">
                <Image
                  src="/images/cards/amex-gold.jpg"
                  alt="Amex Gold"
                  width={500}
                  height={315}
                  className="rounded-xl shadow-2xl shadow-black/30"
                />
              </div>
              {/* Front card */}
              <div className="absolute right-24 top-12 w-[360px] -rotate-3">
                <Image
                  src="/images/cards/amex-platinum.jpg"
                  alt="Amex Platinum"
                  width={500}
                  height={315}
                  className="rounded-xl shadow-2xl shadow-black/50"
                  priority
                />
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

      {/* ===== SEARCH + QUICK FILTERS ===== */}
      <section className="mx-auto max-w-3xl px-6 py-14 text-center">
        <h2
          className="mb-3 text-3xl md:text-4xl tracking-tight animate-fade-up"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          What are you looking for?
        </h2>
        <p className="mb-8 text-sm text-ink-muted">
          Search across {perksData.length} perks from {providersData.length} providers
        </p>
        <SearchBar value={search} onChange={setSearch} large />
      </section>

      {/* ===== BENTO STATS ===== */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: 206, suffix: "+", label: "Perks tracked", sub: "and growing weekly" },
            { value: 67, suffix: "", label: "Providers", sub: "cards, apps, restaurants & more" },
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

      {/* ===== FEATURED CARDS SHOWCASE ===== */}
      <section className="bg-surface-alt border-y border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Featured
              </p>
              <h2
                className="text-3xl tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Popular perks
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

          <div className="mb-8 mt-6">
            <CategoryFilter selected={category} onChange={setCategory} />
          </div>

          {featuredPerks.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPerks.map((perk, i) => (
                <PerkCard key={perk.id} perk={perk} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border py-16 text-center">
              <p className="text-sm text-ink-muted">No perks found for your filters</p>
            </div>
          )}

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

      {/* ===== CREDIT CARD SHOWCASE ===== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-12 max-w-lg">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            Credit Cards
          </p>
          <h2
            className="mb-3 text-3xl tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Premium cards, premium perks
          </h2>
          <p className="text-sm leading-relaxed text-ink-muted">
            Your annual fee pays for more than you think. See what
            you&apos;re entitled to from every card in your wallet.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creditCardProviders.map((card, i) => {
            const cardPerks = perksData.filter(
              (p) => p.provider === card.name
            );
            const totalCents = cardPerks.reduce((sum, p) => sum + p.valueCents, 0);

            return (
              <Link
                href={`/browse?provider=${card.id}`}
                key={card.id}
                className="group block animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="card-hover overflow-hidden rounded-2xl bg-surface border border-border/70">
                  {card.cardImage && (
                    <div className="relative h-44 bg-dark overflow-hidden">
                      <Image
                        src={card.cardImage}
                        alt={card.name}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <BrandLogo provider={card.name} size={20} />
                      <h3 className="text-sm font-semibold text-ink">{card.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-ink-muted">
                        {cardPerks.length} perks · ${Math.round(totalCents / 100).toLocaleString()}+/yr value
                      </p>
                      <ArrowRight className="h-3.5 w-3.5 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="mb-4 text-3xl tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              See what you&apos;re <em className="text-primary-light">actually</em> paying for
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row lg:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <span className="text-[10px] font-bold text-white">P</span>
            </div>
            <span className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Perk<span className="text-primary">.ai</span>
            </span>
          </div>
          <p className="text-xs text-ink-muted">
            Not affiliated with any listed providers. For informational purposes only, not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
