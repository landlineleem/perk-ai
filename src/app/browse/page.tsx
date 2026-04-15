"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, Star, Flame, Search } from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard, { BrandLogo } from "@/components/PerkCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

const categories = [
  { id: "all", label: "All" },
  { id: "Travel", label: "Travel" },
  { id: "Food", label: "Food & Dining" },
  { id: "Shopping", label: "Shopping" },
  { id: "Entertainment", label: "Entertainment" },
  { id: "Finance", label: "Finance" },
  { id: "Software", label: "Software" },
  { id: "Health", label: "Health" },
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Curated sections
  const featuredPerk = perksData.find((p) => p.id === "amex-platinum-lounge")!;

  const highValue = useMemo(
    () => perksData.filter((p) => p.valueCents >= 10000).sort((a, b) => b.valueCents - a.valueCents).slice(0, 6),
    []
  );

  const popularPerks = useMemo(
    () => perksData.filter((p) => p.popular && p.id !== featuredPerk?.id).slice(0, 6),
    [featuredPerk]
  );

  const newestPerks = useMemo(
    () => [...perksData].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).slice(0, 6),
    []
  );

  // Group perks by category for the browsable sections
  const perksByCategory = useMemo(() => {
    return categories
      .filter((c) => c.id !== "all")
      .map((cat) => ({
        ...cat,
        perks: perksData.filter((p) => p.category === cat.id),
      }))
      .filter((c) => c.perks.length > 0);
  }, []);

  // Search results mode
  const searchResults = useMemo(() => {
    if (!search && category === "all") return null;
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
    return result;
  }, [search, category]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <h1
            className="mb-2 text-3xl tracking-tight md:text-4xl animate-fade-up"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Discover perks
          </h1>
          <p className="text-sm text-white/40 animate-fade-up delay-100">
            Curated picks, top deals, and every perk worth knowing about
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* Search + filters */}
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} placeholder="Search perks, providers, categories..." />
        </div>
        <div className="mb-10">
          <CategoryFilter selected={category} onChange={(val) => setCategory(val)} />
        </div>

        {/* If searching/filtering, show results */}
        {searchResults ? (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-ink-muted">
                <span className="font-medium text-ink">{searchResults.length}</span> perk{searchResults.length !== 1 ? "s" : ""} found
              </p>
              {(search || category !== "all") && (
                <button
                  onClick={() => { setSearch(""); setCategory("all"); }}
                  className="text-xs font-medium text-ink-muted hover:text-ink transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
            {searchResults.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((perk, i) => (
                  <PerkCard key={perk.id} perk={perk} index={i} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-border bg-surface py-20 text-center">
                <p className="text-base font-medium text-ink-muted">No perks match your search</p>
                <p className="mt-1 text-sm text-ink-faint">Try different keywords or clear filters</p>
                <button
                  onClick={() => { setSearch(""); setCategory("all"); }}
                  className="mt-5 rounded-full bg-dark px-6 py-2.5 text-sm font-semibold text-white"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Curated discovery view */
          <div className="space-y-16">

            {/* ===== FEATURED PERK ===== */}
            {featuredPerk && (
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Editor&apos;s pick
                  </p>
                </div>
                <Link href={`/perk/${featuredPerk.id}`} className="group block">
                  <div className="card-hover overflow-hidden rounded-2xl bg-dark text-white">
                    <div className="p-8 md:p-10">
                      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                        <div>
                          <div className="mb-3 flex items-center gap-2.5">
                            <BrandLogo provider={featuredPerk.provider} size={28} />
                            <span className="text-sm font-medium text-white/50">{featuredPerk.provider}</span>
                          </div>
                          <h2
                            className="mb-3 text-2xl tracking-tight md:text-3xl group-hover:text-primary-light transition-colors"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {featuredPerk.title}
                          </h2>
                          <p className="max-w-lg text-sm leading-relaxed text-white/40">
                            {featuredPerk.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary-light" style={{ fontFamily: "var(--font-heading)" }}>
                            {featuredPerk.value}
                          </p>
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/25">
                            estimated value
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* ===== HIGH VALUE ===== */}
            <section>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      Highest value
                    </p>
                  </div>
                  <h2
                    className="text-2xl tracking-tight md:text-3xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Worth the most
                  </h2>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {highValue.map((perk, i) => (
                  <PerkCard key={perk.id} perk={perk} index={i} />
                ))}
              </div>
            </section>

            {/* ===== POPULAR ===== */}
            <section>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      Trending
                    </p>
                  </div>
                  <h2
                    className="text-2xl tracking-tight md:text-3xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Most popular perks
                  </h2>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {popularPerks.map((perk, i) => (
                  <PerkCard key={perk.id} perk={perk} index={i} />
                ))}
              </div>
            </section>

            {/* ===== RECENTLY ADDED ===== */}
            <section>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      Just added
                    </p>
                  </div>
                  <h2
                    className="text-2xl tracking-tight md:text-3xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Newest perks
                  </h2>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {newestPerks.map((perk, i) => (
                  <PerkCard key={perk.id} perk={perk} index={i} />
                ))}
              </div>
            </section>

            {/* ===== BROWSE BY CATEGORY ===== */}
            <section>
              <div className="mb-8">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  All perks
                </p>
                <h2
                  className="text-2xl tracking-tight md:text-3xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Browse by category
                </h2>
              </div>
              <div className="space-y-12">
                {perksByCategory.map((cat) => (
                  <div key={cat.id}>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3
                          className="text-lg font-bold text-ink"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {cat.label}
                        </h3>
                        <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted">
                          {cat.perks.length}
                        </span>
                      </div>
                      <button
                        onClick={() => { setCategory(cat.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="group hidden items-center gap-1 text-xs font-medium text-ink-muted transition-colors hover:text-ink md:flex"
                      >
                        View all
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {cat.perks.filter((p) => p.popular).slice(0, 3).length > 0
                        ? cat.perks.filter((p) => p.popular).slice(0, 3).map((perk, i) => (
                            <PerkCard key={perk.id} perk={perk} index={i} />
                          ))
                        : cat.perks.slice(0, 3).map((perk, i) => (
                            <PerkCard key={perk.id} perk={perk} index={i} />
                          ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}
      </div>
    </div>
  );
}
