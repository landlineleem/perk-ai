"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard from "@/components/PerkCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

const providerTypes = [
  { id: "all", label: "All Types" },
  { id: "credit-card", label: "Credit Cards" },
  { id: "bank", label: "Banks" },
  { id: "subscription", label: "Subscriptions" },
  { id: "membership", label: "Memberships" },
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

    // Filter by search
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

    // Filter by category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Filter by provider type
    if (providerType !== "all") {
      result = result.filter((p) => p.providerType === providerType);
    }

    // Sort
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
    <div className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="mb-3 text-3xl font-bold md:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Browse all perks
        </h1>
        <p className="text-white/40">
          {filteredPerks.length} perks across {providerTypes.length - 1} provider
          types
        </p>
      </div>

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
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                providerType === pt.id
                  ? "border-gold/30 bg-gold/10 text-gold"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {pt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-white/30" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 outline-none focus:border-gold/30"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-charcoal">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {filteredPerks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPerks.map((perk) => (
            <PerkCard key={perk.id} perk={perk} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] py-20 text-center">
          <p className="text-lg text-white/30">No perks match your filters</p>
          <p className="mt-2 text-sm text-white/20">
            Try broadening your search or clearing some filters
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
              setProviderType("all");
            }}
            className="mt-4 rounded-full border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold/10"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
