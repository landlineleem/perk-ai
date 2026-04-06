"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard from "@/components/PerkCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

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
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] via-transparent to-transparent" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold/[0.04] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold">
              <Sparkles className="h-3 w-3" />
              Discover every perk you're missing
            </div>

            <h1
              className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-[1.1]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Your perks,{" "}
              <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                all in one place
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
              Stop leaving money on the table. Track every benefit from your
              credit cards, bank accounts, subscriptions, and memberships.
            </p>

            <div className="mx-auto mb-6 max-w-lg">
              <SearchBar value={search} onChange={setSearch} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/30">
              <span>Popular:</span>
              {["Amex Platinum", "Chase Sapphire", "Apple One", "Costco"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setSearch(term)}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs transition-colors hover:border-gold/30 hover:text-gold"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/5 bg-charcoal-light/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-6 md:grid-cols-4">
          {[
            { label: "Perks tracked", value: `${perksData.length}+` },
            { label: "Providers", value: "17" },
            { label: "Categories", value: "7" },
            { label: "Total value", value: "$160k+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-gold md:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/30">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Perks */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-gold">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Featured
              </span>
            </div>
            <h2
              className="text-2xl font-bold md:text-3xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Most popular perks
            </h2>
          </div>
          <Link
            href="/browse"
            className="group flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors hover:text-gold"
          >
            View all perks
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mb-8">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {featuredPerks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPerks.map((perk) => (
              <PerkCard key={perk.id} perk={perk} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] py-16 text-center">
            <p className="text-lg text-white/30">No perks found</p>
            <p className="mt-1 text-sm text-white/20">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/5 bg-charcoal-light/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2
            className="mb-4 text-2xl font-bold md:text-3xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            See what you're{" "}
            <span className="text-gold">actually entitled to</span>
          </h2>
          <p className="mx-auto mb-8 max-w-md text-white/40">
            Select your credit cards, subscriptions, and memberships to instantly
            see every perk available to you.
          </p>
          <Link
            href="/my-perks"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-charcoal transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(245,200,66,0.3)]"
          >
            <Sparkles className="h-4 w-4" />
            Unlock My Perks
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-bold" style={{ fontFamily: "var(--font-syne)" }}>
              Perk<span className="text-gold">.ai</span>
            </span>
          </div>
          <p className="text-xs text-white/20">
            Made with care. Not affiliated with any listed providers.
          </p>
        </div>
      </footer>
    </div>
  );
}
