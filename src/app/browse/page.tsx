"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, ArrowLeft } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import { providerCardImages } from "@/data/imageMap";
import PerkCard, { BrandLogo } from "@/components/PerkCard";
import SearchBar from "@/components/SearchBar";

const providerTypeLabels: Record<string, string> = {
  "credit-card": "Credit Cards",
  "restaurant": "Restaurants",
  "airline": "Airlines",
  "hotel": "Hotels",
  "streaming": "Streaming",
  "retail": "Retail",
  "grocery": "Grocery",
  "rideshare": "Rideshare & Delivery",
  "fintech": "Fintech",
  "subscription": "Subscriptions",
  "membership": "Memberships",
  "bank": "Banks",
  "fitness": "Fitness",
};

const typeOrder = [
  "credit-card", "restaurant", "airline", "hotel", "streaming",
  "subscription", "retail", "grocery", "rideshare", "membership",
  "fintech", "bank", "fitness",
];

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const providerParam = searchParams.get("provider") || "";

  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(() => {
    if (!providerParam) return "";
    const provider = providersData.find((p) => p.id === providerParam);
    return provider ? provider.id : "";
  });

  const selectedProviderData = providersData.find((p) => p.id === selectedProvider);

  const providerPerks = useMemo(() => {
    if (!selectedProviderData) return [];
    return perksData.filter((p) => p.provider === selectedProviderData.name);
  }, [selectedProviderData]);

  const filteredProviders = useMemo(() => {
    if (!search) return providersData;
    const q = search.toLowerCase();
    return providersData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        providerTypeLabels[p.type]?.toLowerCase().includes(q)
    );
  }, [search]);

  const groupedProviders = typeOrder
    .map((type) => ({
      type,
      label: providerTypeLabels[type] || type,
      providers: filteredProviders.filter((p) => p.type === type),
    }))
    .filter((g) => g.providers.length > 0);

  // If a provider is selected, show its perks
  if (selectedProviderData) {
    return (
      <div className="min-h-screen">
        <div className="bg-dark text-white">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
            <button
              onClick={() => setSelectedProvider("")}
              className="group mb-6 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              All providers
            </button>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <BrandLogo provider={selectedProviderData.name} size={36} />
              </div>
              <div>
                <h1
                  className="text-3xl tracking-tight md:text-4xl animate-fade-up"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {selectedProviderData.name}
                </h1>
                <p className="text-sm text-white/40 animate-fade-up delay-100">
                  <span className="text-white/70 font-medium">{providerPerks.length} perk{providerPerks.length !== 1 ? "s" : ""}</span>
                  {" "}&middot;{" "}
                  {providerTypeLabels[selectedProviderData.type] || selectedProviderData.type}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          {providerPerks.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {providerPerks.map((perk, i) => (
                <PerkCard key={perk.id} perk={perk} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-border bg-surface py-20 text-center">
              <p className="text-base font-medium text-ink-muted">No perks found for this provider</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: show provider grid grouped by type
  return (
    <div className="min-h-screen">
      <div className="bg-dark text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h1
                className="mb-2 text-3xl tracking-tight md:text-4xl animate-fade-up"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Browse providers
              </h1>
              <p className="text-sm text-white/40 animate-fade-up delay-100">
                <span className="text-white/70 font-medium">{providersData.length} providers</span> across {typeOrder.length} categories &middot; select one to see its perks
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
        <div className="mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search providers..."
          />
        </div>

        {groupedProviders.length > 0 ? (
          <div className="space-y-10">
            {groupedProviders.map((group) => {
              const groupPerkCount = group.providers.reduce(
                (sum, prov) => sum + perksData.filter((p) => p.provider === prov.name).length,
                0
              );
              return (
                <div key={group.type}>
                  <div className="mb-4 flex items-center gap-3">
                    <h2
                      className="text-lg font-bold text-ink"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {group.label}
                    </h2>
                    <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted">
                      {groupPerkCount} perk{groupPerkCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {group.providers.map((provider) => {
                      const perkCount = perksData.filter(
                        (p) => p.provider === provider.name
                      ).length;
                      return (
                        <button
                          key={provider.id}
                          onClick={() => setSelectedProvider(provider.id)}
                          className="group block text-left"
                        >
                          <div className="card-hover flex flex-col items-center gap-2.5 rounded-2xl bg-surface border border-border/70 p-4 text-center">
                            {provider.cardImage ? (
                              <Image
                                src={provider.cardImage}
                                alt={provider.name}
                                width={72}
                                height={45}
                                className="rounded object-contain"
                              />
                            ) : (
                              <BrandLogo provider={provider.name} size={32} />
                            )}
                            <div>
                              <h3 className="text-[13px] font-semibold text-ink group-hover:text-primary transition-colors leading-tight">
                                {provider.name}
                              </h3>
                              <p className="text-[11px] text-ink-muted mt-0.5">
                                {perkCount} perk{perkCount !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-border bg-surface py-20 text-center">
            <p className="text-base font-medium text-ink-muted">No providers match your search</p>
            <button
              onClick={() => setSearch("")}
              className="mt-5 rounded-full bg-dark px-6 py-2.5 text-sm font-semibold text-white"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
