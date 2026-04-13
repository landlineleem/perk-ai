"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import { providerCardImages } from "@/data/imageMap";
import PerkCard from "@/components/PerkCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

const providerTypes = [
  { id: "all", label: "All" },
  { id: "credit-card", label: "Credit Cards" },
  { id: "restaurant", label: "Restaurants" },
  { id: "airline", label: "Airlines" },
  { id: "hotel", label: "Hotels" },
  { id: "streaming", label: "Streaming" },
  { id: "retail", label: "Retail" },
  { id: "grocery", label: "Grocery" },
  { id: "rideshare", label: "Rideshare" },
  { id: "fintech", label: "Fintech" },
  { id: "subscription", label: "Subscriptions" },
  { id: "membership", label: "Memberships" },
  { id: "bank", label: "Banks" },
  { id: "fitness", label: "Fitness" },
];

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "value-high", label: "Highest Value" },
  { id: "expiring", label: "Expiring Soon" },
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

    if (category !== "all") result = result.filter((p) => p.category === category);
    if (providerType !== "all") result = result.filter((p) => p.providerType === providerType);

    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case "popular":
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      case "expiring":
        result.sort((a, b) => {
          if (!a.expiration) return 1;
          if (!b.expiration) return -1;
          return new Date(a.expiration).getTime() - new Date(b.expiration).getTime();
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
      {/* Header with card images */}
      <div className="bg-dark text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h1
                className="mb-2 text-3xl tracking-tight md:text-4xl animate-fade-up"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Browse all perks
              </h1>
              <p className="text-sm text-white/40 animate-fade-up delay-100">
                <span className="text-white/70 font-medium">{filteredPerks.length} perks</span> across {providerTypes.length - 1} provider types
              </p>
            </div>
            {/* Mini card fan */}
            <div className="hidden lg:flex items-center gap-3 animate-slide-cards delay-200">
              {Object.entries(providerCardImages).slice(0, 3).map(([name, src], i) => (
                <div key={name} className="w-28 opacity-50 hover:opacity-100 transition-opacity" style={{ transform: `rotate(${(i - 1) * 5}deg)` }}>
                  <Image src={src} alt={name} width={500} height={315} className="rounded-lg shadow-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mb-5">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {providerTypes.map((pt) => (
              <button
                key={pt.id}
                onClick={() => setProviderType(pt.id)}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
                  providerType === pt.id
                    ? "border-dark bg-dark text-white"
                    : "border-border bg-surface text-ink-muted hover:text-ink hover:border-ink-muted"
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-ink-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-[13px] font-medium text-ink outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredPerks.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPerks.map((perk, i) => (
              <PerkCard key={perk.id} perk={perk} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-border bg-surface py-20 text-center">
            <p className="text-base font-medium text-ink-muted">No perks match your filters</p>
            <p className="mt-1 text-sm text-ink-faint">Try broadening your search</p>
            <button
              onClick={() => { setSearch(""); setCategory("all"); setProviderType("all"); }}
              className="mt-5 rounded-full bg-dark px-6 py-2.5 text-sm font-semibold text-white"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
