"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard from "@/components/PerkCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

const providerTypes = [
  { id: "all", label: "All Types", emoji: "🌟" },
  { id: "credit-card", label: "Credit Cards", emoji: "💳" },
  { id: "bank", label: "Banks", emoji: "🏦" },
  { id: "subscription", label: "Subscriptions", emoji: "📱" },
  { id: "membership", label: "Memberships", emoji: "🎫" },
];

const sortOptions = [
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Most Popular" },
  { id: "expiring", label: "Expiring Soon" },
  { id: "value-high", label: "Highest Value" },
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [providerType, setProviderType] = useState("all");
  const [sort, setSort] = useState("popular");

  const filteredPerks = useMemo(() => {
    let result = [...perksData];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.provider.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (providerType !== "all") {
      result = result.filter((p) => p.providerType === providerType);
    }

    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
        break;
      case "popular":
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      case "expiring":
        result.sort((a, b) => {
          if (!a.expiration) return 1;
          if (!b.expiration) return -1;
          return (
            new Date(a.expiration).getTime() - new Date(b.expiration).getTime()
          );
        });
        break;
      case "value-high":
        result.sort((a, b) => b.valueCents - a.valueCents);
        break;
    }

    return result;
  }, [search, category, providerType, sort]);

  return (
    <div className="min-h-screen">
      {/* Header with gradient bg */}
      <div className="relative overflow-hidden bg-gradient-to-b from-purple/5 via-cream to-cream pb-4 pt-10">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-purple/8 blur-[80px]" />
        <div className="pointer-events-none absolute top-10 -left-20 h-56 w-56 rounded-full bg-teal/8 blur-[60px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-2 text-4xl animate-bounce-in">🗂️</div>
          <h1
            className="mb-2 text-4xl font-black md:text-5xl animate-slide-up"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Browse <span className="gradient-text-cool">all perks</span>
          </h1>
          <p className="text-ink-muted animate-slide-up delay-100">
            <span className="font-semibold text-ink">{filteredPerks.length}</span> perks across {providerTypes.length - 1} provider types
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Search */}
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Category filter */}
        <div className="mb-6">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* Provider type + Sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {providerTypes.map((pt) => (
              <button
                key={pt.id}
                onClick={() => setProviderType(pt.id)}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                  providerType === pt.id
                    ? "border-purple/30 bg-purple/8 text-purple shadow-sm"
                    : "border-ink/[0.06] bg-white text-ink-muted hover:border-ink/10 hover:shadow-sm hover:text-ink"
                }`}
              >
                <span className="text-xs">{pt.emoji}</span>
                {pt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-ink/[0.06] bg-white px-3 py-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-ink-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-sm font-medium text-ink outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {filteredPerks.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPerks.map((perk, i) => (
              <PerkCard key={perk.id} perk={perk} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-ink/10 bg-white py-20 text-center">
            <div className="mb-3 text-5xl">😅</div>
            <p className="text-lg font-bold text-ink/60">No perks match your filters</p>
            <p className="mt-1 text-sm text-ink-muted">
              Try broadening your search or clearing some filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
                setProviderType("all");
              }}
              className="mt-5 rounded-full bg-gradient-to-r from-coral to-purple px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
