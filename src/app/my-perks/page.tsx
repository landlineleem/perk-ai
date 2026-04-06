"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Check, X } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import PerkCard from "@/components/PerkCard";

function normalizeProvider(provider: string): string {
  return provider.toLowerCase().replace(/[\s\-]/g, "");
}

const categoryEmojis: Record<string, string> = {
  Travel: "✈️",
  Food: "🍕",
  Software: "💎",
  Finance: "💸",
  Health: "💖",
  Shopping: "🛍️",
  Entertainment: "🎉",
};

function AnimatedValue({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = to;
    const duration = 600;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return <>{display.toLocaleString()}</>;
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-coral/5 via-cream to-cream pb-4 pt-10">
        <div className="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-coral/8 blur-[80px]" />
        <div className="pointer-events-none absolute top-10 right-0 h-56 w-56 rounded-full bg-sunny/10 blur-[60px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-2 text-4xl animate-bounce-in">✨</div>
          <h1
            className="mb-2 text-4xl font-black md:text-5xl animate-slide-up"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            My <span className="gradient-text-warm">Perks</span>
          </h1>
          <p className="text-ink-muted animate-slide-up delay-100">
            Select what you have — see every perk you&apos;re entitled to.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* Provider selector */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-ink/[0.06] bg-white p-5 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
                <span>🎒</span> What do you have?
              </h3>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted/50" />
                <input
                  type="text"
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                  placeholder="Search providers..."
                  className="w-full rounded-xl border border-ink/[0.06] bg-cream/50 py-2.5 pl-9 pr-3 text-sm text-ink placeholder-ink-muted/40 outline-none transition-all focus:border-purple/30 focus:bg-white"
                />
              </div>

              {/* Selected count */}
              {selectedProviders.length > 0 && (
                <div className="mb-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-purple/8 to-teal/8 px-3 py-2">
                  <span className="text-xs font-bold text-purple">
                    {selectedProviders.length} selected
                  </span>
                  <button
                    onClick={() => setSelectedProviders([])}
                    className="flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium text-ink-muted hover:bg-white hover:text-ink transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                </div>
              )}

              {/* Provider list */}
              <div className="max-h-[420px] space-y-1 overflow-y-auto pr-1">
                {filteredProviders.map((provider) => {
                  const isSelected = selectedProviders.includes(provider.id);
                  return (
                    <button
                      key={provider.id}
                      onClick={() => toggleProvider(provider.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-purple/8 to-purple/5 shadow-sm"
                          : "hover:bg-cream-dark/50"
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cream-dark/80 to-cream text-base shadow-sm">
                        {provider.logo}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold truncate ${isSelected ? "text-ink" : "text-ink/70"}`}>
                          {provider.name}
                        </div>
                        <div className="text-[11px] text-ink-muted capitalize">
                          {provider.type.replace("-", " ")}
                        </div>
                      </div>
                      <div
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-purple bg-purple text-white scale-110"
                            : "border-ink/15 hover:border-ink/30"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
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
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-ink/8 py-24 text-center">
                <div className="mb-6 text-6xl animate-float">🎁</div>
                <h3
                  className="mb-2 text-xl font-bold text-ink/70"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Your perks are waiting
                </h3>
                <p className="max-w-xs text-sm text-ink-muted">
                  Select your credit cards, bank accounts, subscriptions, and
                  memberships from the list to uncover all your benefits.
                </p>
              </div>
            ) : (
              <>
                {/* Value banner */}
                <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-ink-light to-purple/80 p-7 text-white animate-scale-in">
                  <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-coral/20 blur-[40px]" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-teal/20 blur-[40px]" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-2xl animate-wiggle">
                      💰
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Estimated total perk value
                      </div>
                      <div
                        className="text-4xl font-black text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        $<AnimatedValue value={totalValue} />
                        <span className="text-lg font-normal text-white/40">
                          +/year
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="relative mt-3 text-xs text-white/30">
                    Based on {myPerks.length} perks across{" "}
                    {selectedProviders.length} providers. Actual value varies by
                    usage.
                  </p>
                </div>

                {/* Grouped perks */}
                {Object.entries(groupedPerks).map(([cat, perks]) => (
                  <div key={cat} className="mb-10 animate-slide-up">
                    <h3
                      className="mb-4 flex items-center gap-2 text-xl font-black"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      <span className="text-xl">{categoryEmojis[cat] || "📦"}</span>
                      {cat}
                      <span className="ml-1 rounded-full bg-ink/5 px-2.5 py-0.5 text-sm font-semibold text-ink-muted">
                        {perks.length}
                      </span>
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {perks.map((perk, i) => (
                        <PerkCard key={perk.id} perk={perk} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
