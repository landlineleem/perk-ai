"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, DollarSign, Check, X } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import PerkCard from "@/components/PerkCard";

function normalizeProvider(provider: string): string {
  return provider.toLowerCase().replace(/[\s\-]/g, "");
}

export default function MyPerksPage() {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [providerSearch, setProviderSearch] = useState("");

  const filteredProviders = useMemo(() => {
    if (!providerSearch) return providersData;
    const q = providerSearch.toLowerCase();
    return providersData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [providerSearch]);

  const toggleProvider = (id: string) => {
    setSelectedProviders((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const myPerks = useMemo(() => {
    if (selectedProviders.length === 0) return [];

    const selectedNames = selectedProviders.map((id) => {
      const provider = providersData.find((p) => p.id === id);
      return provider ? normalizeProvider(provider.name) : "";
    });

    return perksData.filter((perk) => {
      const perkProvider = normalizeProvider(perk.provider);
      return selectedNames.some(
        (name) => perkProvider.includes(name) || name.includes(perkProvider)
      );
    });
  }, [selectedProviders]);

  const totalValue = useMemo(() => {
    const cents = myPerks.reduce((sum, p) => sum + p.valueCents, 0);
    return Math.round(cents / 100);
  }, [myPerks]);

  const groupedPerks = useMemo(() => {
    const groups: Record<string, typeof perksData> = {};
    myPerks.forEach((perk) => {
      if (!groups[perk.category]) groups[perk.category] = [];
      groups[perk.category].push(perk);
    });
    return groups;
  }, [myPerks]);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1
          className="mb-3 text-3xl font-bold md:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          My Perks
        </h1>
        <p className="text-white/40">
          Select what you have and we'll show you every perk you're entitled to.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        {/* Provider selector */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white/60">
              What do you have?
            </h3>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={providerSearch}
                onChange={(e) => setProviderSearch(e.target.value)}
                placeholder="Search providers..."
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none focus:border-gold/30"
              />
            </div>

            {/* Selected count */}
            {selectedProviders.length > 0 && (
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-gold">
                  {selectedProviders.length} selected
                </span>
                <button
                  onClick={() => setSelectedProviders([])}
                  className="flex items-center gap-1 text-xs text-white/30 hover:text-white/50"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              </div>
            )}

            {/* Provider list */}
            <div className="max-h-[400px] space-y-1 overflow-y-auto pr-1">
              {filteredProviders.map((provider) => {
                const isSelected = selectedProviders.includes(provider.id);
                return (
                  <button
                    key={provider.id}
                    onClick={() => toggleProvider(provider.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                      isSelected
                        ? "bg-gold/10 text-white"
                        : "text-white/50 hover:bg-white/5 hover:text-white/70"
                    }`}
                  >
                    <span className="text-base">{provider.logo}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {provider.name}
                      </div>
                      <div className="text-[11px] text-white/30 capitalize">
                        {provider.type.replace("-", " ")}
                      </div>
                    </div>
                    <div
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all ${
                        isSelected
                          ? "border-gold bg-gold text-charcoal"
                          : "border-white/20"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {selectedProviders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10">
                <Sparkles className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white/60">
                Select your providers
              </h3>
              <p className="max-w-xs text-sm text-white/30">
                Choose your credit cards, bank accounts, subscriptions, and
                memberships from the list to see all your perks.
              </p>
            </div>
          ) : (
            <>
              {/* Value banner */}
              <div className="mb-8 rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/5 to-gold/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20">
                    <DollarSign className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gold/60">
                      Estimated total perk value
                    </div>
                    <div
                      className="text-3xl font-bold text-gold"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      ${totalValue.toLocaleString()}
                      <span className="text-base font-normal text-gold/50">
                        +/year
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/30">
                  Based on {myPerks.length} perks across{" "}
                  {selectedProviders.length} providers. Actual value varies by
                  usage.
                </p>
              </div>

              {/* Grouped perks */}
              {Object.entries(groupedPerks).map(([cat, perks]) => (
                <div key={cat} className="mb-10">
                  <h3
                    className="mb-4 text-lg font-bold"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {cat}{" "}
                    <span className="text-sm font-normal text-white/30">
                      ({perks.length})
                    </span>
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {perks.map((perk) => (
                      <PerkCard key={perk.id} perk={perk} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
