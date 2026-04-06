"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard from "@/components/PerkCard";
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
          const duration = 1200;
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
    <div ref={ref} className="text-4xl md:text-5xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
      {count.toLocaleString()}{suffix}
    </div>
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

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero section */}
      <section className="relative pb-20 pt-12 md:pt-20">
        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Large gradient orbs */}
          <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-coral/15 to-purple/10 blur-[80px] animate-float-slow" />
          <div className="absolute top-40 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-teal/12 to-blue/8 blur-[80px] animate-float" />
          <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-sunny/10 to-coral/8 blur-[60px] animate-float-reverse" />

          {/* Floating emoji decorations */}
          <div className="absolute top-24 right-[15%] text-4xl animate-float opacity-40 hidden lg:block">✈️</div>
          <div className="absolute top-48 left-[10%] text-3xl animate-float-slow opacity-30 hidden lg:block">💳</div>
          <div className="absolute bottom-32 right-[20%] text-3xl animate-float-reverse opacity-30 hidden lg:block">🎉</div>
          <div className="absolute top-36 right-[35%] text-2xl animate-float opacity-20 hidden lg:block">💎</div>
          <div className="absolute bottom-48 left-[18%] text-4xl animate-float-slow opacity-25 hidden lg:block">🛍️</div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink shadow-lg shadow-ink/5 animate-slide-up border border-ink/[0.04]">
              <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-coral to-purple animate-pulse-soft" />
              Stop leaving money on the table
            </div>

            <h1
              className="mb-6 text-5xl font-black leading-[1.1] tracking-tight md:text-7xl animate-slide-up delay-100"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Every perk you
              <br />
              <span className="gradient-text">deserve to know</span>
            </h1>

            <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-ink-muted animate-slide-up delay-200">
              Discover hidden benefits from your credit cards, bank accounts,
              subscriptions, and memberships — all in one beautiful place.
            </p>

            <div className="mx-auto mb-8 max-w-xl animate-slide-up delay-300">
              <SearchBar value={search} onChange={setSearch} large />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 animate-slide-up delay-400">
              <span className="text-sm text-ink-muted">Try:</span>
              {["Amex Platinum", "Chase Sapphire", "Apple One", "Costco"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setSearch(term)}
                    className="rounded-full bg-white border border-ink/[0.06] px-4 py-1.5 text-sm font-medium text-ink-muted shadow-sm transition-all duration-200 hover:shadow-md hover:border-purple/20 hover:text-purple hover:scale-[1.04] active:scale-[0.98]"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: 42, suffix: "+", label: "Perks tracked", emoji: "🎁", gradient: "from-coral/10 to-coral/5" },
              { value: 17, suffix: "", label: "Providers", emoji: "🏢", gradient: "from-purple/10 to-purple/5" },
              { value: 7, suffix: "", label: "Categories", emoji: "📂", gradient: "from-teal/10 to-teal/5" },
              { value: 160, suffix: "k+", label: "Total value", emoji: "💰", gradient: "from-sunny/10 to-sunny/5" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`rounded-3xl bg-gradient-to-br ${stat.gradient} border border-ink/[0.04] p-6 text-center animate-scale-in`}
                style={{ animationDelay: `${i * 100 + 300}ms` }}
              >
                <div className="mb-2 text-2xl">{stat.emoji}</div>
                <div className="gradient-text">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm font-medium text-ink-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Perks */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="animate-slide-in">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <span className="text-xs font-bold uppercase tracking-widest text-coral">
                Featured
              </span>
            </div>
            <h2
              className="text-3xl font-black md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Most popular perks
            </h2>
          </div>
          <Link
            href="/browse"
            className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mb-8">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {featuredPerks.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPerks.map((perk, i) => (
              <PerkCard key={perk.id} perk={perk} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-ink/10 bg-white py-20 text-center">
            <div className="mb-3 text-4xl">🔍</div>
            <p className="text-lg font-semibold text-ink/60">No perks found</p>
            <p className="mt-1 text-sm text-ink-muted">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink via-ink-light to-purple/80 p-10 md:p-16 text-center">
            {/* Decorative orbs inside CTA */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-coral/20 blur-[50px] animate-float" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-teal/20 blur-[50px] animate-float-slow" />

            <div className="relative">
              <div className="mb-4 text-5xl animate-bounce-in">🚀</div>
              <h2
                className="mb-4 text-3xl font-black text-white md:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                See what you&apos;re{" "}
                <span className="gradient-text-warm">actually entitled to</span>
              </h2>
              <p className="mx-auto mb-8 max-w-md text-base text-white/60">
                Select your credit cards, subscriptions, and memberships to
                instantly surface every perk.
              </p>
              <Link
                href="/my-perks"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-bold text-ink shadow-2xl transition-all duration-300 hover:shadow-white/20 hover:scale-[1.05] active:scale-[0.98]"
              >
                <span className="transition-transform group-hover:scale-110 group-hover:rotate-12">✨</span>
                Unlock My Perks
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/5 bg-cream-dark/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-coral via-purple to-teal">
              <span className="text-[10px] font-black text-white">P</span>
            </div>
            <span className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Perk<span className="gradient-text">.ai</span>
            </span>
          </div>
          <p className="text-xs text-ink-muted">
            Made with ❤️ &middot; Not affiliated with any listed providers.
          </p>
        </div>
      </footer>
    </div>
  );
}
