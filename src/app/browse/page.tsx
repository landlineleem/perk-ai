"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
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

const PAGE_SIZE = 24;

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const providerParam = searchParams.get("provider") || "";

  const initialProviderType = useMemo(() => {
    if (!providerParam) return "all";
    const provider = providersData.find((p) => p.id === providerParam);
    return provider ? provider.type : "all";
  }, [providerParam]);

  const [search, setSearch] = useState(() => {
    if (!providerParam) return "";
    const provider = providersData.find((p) => p.id === providerParam);
    return provider ? provider.name : "";
  });
  const [category, setCategory] = useState("all");
  const [providerType, setProviderType] = useState(initialProviderType);
  const [sort, setSort] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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

  const visiblePerks = filteredPerks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPerks.length;

  return (
    <div className="min-h-screen">
      {/* Header with card images */}
      <div className="bg-dark text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h1
                className="mb-2 text-4xl tracking-tight md:text-5xl font-heading font-semibold animate-fade-up"
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
          <SearchBar value={search} onChange={(val) => { setSearch(val); setVisibleCount(PAGE_SIZE); }} />
        </div>

        <div className="mb-5">
          <CategoryFilter selected={category} onChange={(val) => { setCategory(val); setVisibleCount(PAGE_SIZE); }} />
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Provider type as dropdown instead of 14 buttons */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={providerType}
                onChange={(e) => { setProviderType(e.target.value); setVisibleCount(PAGE_SIZE); }}
                className="appearance-none rounded-full border border-border bg-surface py-2.5 pl-4 pr-9 text-[13px] font-medium text-ink outline-none cursor-pointer focus:border-primary/50"
              >
                {providerTypes.map((pt) => (
                  <option key={pt.id} value={pt.id}>{pt.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
            </div>
            {providerType !== "all" && (
              <button
                onClick={() => { setProviderType("all"); setVisibleCount(PAGE_SIZE); }}
                className="text-xs font-medium text-ink-muted hover:text-ink transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2">
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

        {visiblePerks.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePerks.map((perk, i) => (
                <PerkCard key={perk.id} perk={perk} index={i} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="rounded-full border border-border bg-surface px-8 py-3 text-sm font-semibold text-ink transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  Show more ({filteredPerks.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[26px] border-2 border-dashed border-border bg-surface py-20 text-center">
            <p className="text-base font-medium text-ink-muted">No perks match your filters</p>
            <p className="mt-1 text-sm text-ink-faint">Try broadening your search</p>
            <button
              onClick={() => { setSearch(""); setCategory("all"); setProviderType("all"); setVisibleCount(PAGE_SIZE); }}
              className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-dark"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
