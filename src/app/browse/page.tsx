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
      {/* Header */}
      <div className="border-b border-border bg-surface py-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Browse
          </p>
          <h1
            className="mb-1 text-2xl font-bold md:text-3xl animate-slide-up"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            All perks
          </h1>
          <p className="text-sm text-ink-muted animate-slide-up delay-75">
            <span className="font-semibold text-ink">{filteredPerks.length}</span> perks across {providerTypes.length - 1} provider types
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Search */}
        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Category filter */}
        <div className="mb-4">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* Provider type + Sort */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {providerTypes.map((pt) => (
              <button
                key={pt.id}
                onClick={() => setProviderType(pt.id)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  providerType === pt.id
                    ? "border-accent/30 bg-accent-subtle text-accent"
                    : "border-border bg-surface text-ink-muted hover:border-ink-faint hover:text-ink"
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-ink-faint" />
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPerks.map((perk, i) => (
              <PerkCard key={perk.id} perk={perk} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-surface py-16 text-center">
            <p className="text-sm font-medium text-ink-muted">No perks match your filters</p>
            <p className="mt-1 text-xs text-ink-faint">
              Try broadening your search or clearing some filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
                setProviderType("all");
              }}
              className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
