"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, Check, X } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import { providerCardImages } from "@/data/imageMap";
import PerkCard, { BrandLogo } from "@/components/PerkCard";

function normalizeProvider(provider: string): string {
  return provider.toLowerCase().replace(/[\s\-]/g, "");
}

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
      (p) => p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
    );
  }, [providerSearch]);

  const toggleProvider = (id: string) => {
    setSelectedProviders((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const myPerks = useMemo(() => {
    if (selectedProviders.length === 0) return [];
    const selectedNames = new Set(
      selectedProviders.map((id) => {
        const provider = providersData.find((p) => p.id === id);
        return provider ? normalizeProvider(provider.name) : "";
      })
    );
    return perksData.filter((perk) => {
      return selectedNames.has(normalizeProvider(perk.provider));
    });
  }, [selectedProviders]);

  const totalValue = useMemo(() => {
    return Math.round(myPerks.reduce((sum, p) => sum + p.valueCents, 0) / 100);
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
      <div className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h1
            className="mb-2 text-4xl tracking-tight md:text-5xl font-heading font-semibold animate-fade-up"
          >
            My Perks
          </h1>
          <p className="text-sm text-white/40 animate-fade-up delay-100">
            Select what you have — see every benefit you&apos;re entitled to.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* Provider selector */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-[26px] border border-border/70 bg-surface p-6">
              <h3 className="mb-4 text-sm font-bold text-ink font-heading font-semibold">
                What do you have?
              </h3>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
                <input
                  type="text"
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                  placeholder="Search providers..."
                  className="w-full rounded-full border border-border bg-surface-alt py-2.5 pl-9 pr-3 text-sm text-ink placeholder-ink-faint outline-none focus:border-primary/40"
                />
              </div>

              {selectedProviders.length > 0 && (
                <div className="mb-3 flex items-center justify-between rounded-xl bg-primary-subtle px-3 py-2">
                  <span className="text-xs font-semibold text-primary-dark">
                    {selectedProviders.length} selected
                  </span>
                  <button
                    onClick={() => setSelectedProviders([])}
                    className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                </div>
              )}

              <div className="max-h-[480px] space-y-1 overflow-y-auto">
                {filteredProviders.map((provider) => {
                  const isSelected = selectedProviders.includes(provider.id);
                  return (
                    <button
                      key={provider.id}
                      onClick={() => toggleProvider(provider.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                        isSelected ? "bg-primary-subtle" : "hover:bg-surface-alt"
                      }`}
                    >
                      <BrandLogo provider={provider.name} size={28} />
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${isSelected ? "text-ink" : "text-ink-secondary"}`}>
                          {provider.name}
                        </div>
                        <div className="text-[11px] text-ink-faint capitalize">
                          {provider.type.replace("-", " ")}
                        </div>
                      </div>
                      <div
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-dark"
                            : "border-border"
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
              <div className="flex flex-col items-center justify-center rounded-[26px] border-2 border-dashed border-border py-24 text-center">
                <div className="mb-6 flex -space-x-4">
                  {Object.entries(providerCardImages).slice(0, 3).map(([name, src]) => (
                    <div key={name} className="w-24 rounded-lg overflow-hidden shadow-md border-2 border-surface">
                      <Image src={src} alt={name} width={500} height={315} className="object-cover" />
                    </div>
                  ))}
                </div>
                <h3
                  className="mb-2 text-lg font-bold text-ink font-heading font-semibold"
                >
                  Your perks are waiting
                </h3>
                <p className="max-w-xs text-sm text-ink-muted">
                  Select your credit cards, subscriptions, and memberships to uncover all your benefits.
                </p>
              </div>
            ) : (
              <>
                {/* Value banner */}
                <div className="mb-8 rounded-[26px] bg-dark p-10 text-white animate-fade-up">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">
                    Estimated annual perk value
                  </p>
                  <p
                    className="text-5xl font-bold tabular-nums font-heading font-semibold"
                  >
                    $<AnimatedValue value={totalValue} />
                    <span className="text-lg font-normal text-white/25 ml-1">+/year</span>
                  </p>
                  <p className="mt-3 text-xs text-white/20">
                    Based on {myPerks.length} perks across {selectedProviders.length} providers
                  </p>
                </div>

                {/* Grouped perks */}
                {Object.entries(groupedPerks).map(([cat, perks]) => (
                  <div key={cat} className="mb-10">
                    <div className="mb-4 flex items-center gap-3">
                      <h3
                        className="text-2xl font-bold font-heading font-semibold"
                      >
                        {cat}
                      </h3>
                      <span className="rounded-full bg-primary-subtle text-primary-dark px-2.5 py-0.5 text-xs font-semibold">
                        {perks.length}
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
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
