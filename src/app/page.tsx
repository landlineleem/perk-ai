"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Bell, Layers } from "lucide-react";
import perksData from "@/data/perks.json";
import PerkCard from "@/components/PerkCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1000;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold tabular-nums" style={{ fontFamily: "var(--font-heading)" }}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const featuredPerks = useMemo(() => {
    return perksData
      .filter((p) => p.popular)
      .filter((p) => {
        if (category !== "all" && p.category !== category) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.provider.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          );
        }
        return true;
      });
  }, [search, category]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-subtle px-3 py-1 text-xs font-semibold text-accent animate-slide-up">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Stop leaving money on the table
            </div>

            <h1
              className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl animate-slide-up delay-75"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Every perk you{" "}
              <span className="text-accent">deserve to know</span>
            </h1>

            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-ink-muted animate-slide-up delay-150">
              Discover hidden benefits from your credit cards, subscriptions,
              loyalty programs, and memberships — all in one place.
            </p>

            <div className="mx-auto mb-6 max-w-lg animate-slide-up delay-200">
              <SearchBar value={search} onChange={setSearch} large />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 animate-slide-up delay-300">
              <span className="text-xs text-ink-faint">Try:</span>
              {["Amex Platinum", "Chase Sapphire", "Apple One", "Costco"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setSearch(term)}
                    className="rounded-md border border-border bg-base px-3 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-ink-faint hover:text-ink"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Layers className="h-5 w-5" />,
                title: "All your perks, one place",
                desc: "Credit cards, subscriptions, loyalty programs, memberships — aggregated and organized.",
              },
              {
                icon: <Bell className="h-5 w-5" />,
                title: "Never miss a benefit",
                desc: "Track expiring credits, monthly resets, and time-sensitive offers before they disappear.",
              },
              {
                icon: <Shield className="h-5 w-5" />,
                title: "Know your total value",
                desc: "See exactly how much your perks are worth and what you're leaving on the table.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-surface p-6 animate-slide-up"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                  {item.icon}
                </div>
                <h3 className="mb-1 text-sm font-semibold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: 42, suffix: "+", label: "Perks tracked" },
              { value: 17, label: "Providers" },
              { value: 7, label: "Categories" },
              { value: 160, suffix: "k+", label: "Total value" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-accent">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs font-medium text-ink-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Perks */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
              Featured
            </p>
            <h2
              className="text-2xl font-bold md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Most popular perks
            </h2>
          </div>
          <Link
            href="/browse"
            className="group flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mb-6">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {featuredPerks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPerks.map((perk, i) => (
              <PerkCard key={perk.id} perk={perk} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-surface py-16 text-center">
            <p className="text-sm font-medium text-ink-muted">No perks found</p>
            <p className="mt-1 text-xs text-ink-faint">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-ink p-10 md:p-16 text-center">
            <h2
              className="mb-3 text-2xl font-bold text-white md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              See what you&apos;re actually entitled to
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm text-white/50">
              Select your credit cards, subscriptions, and memberships to
              instantly surface every perk you&apos;re paying for but not using.
            </p>
            <Link
              href="/my-perks"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-base"
            >
              Unlock my perks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-accent">
              <span className="text-[9px] font-bold text-white">P</span>
            </div>
            <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              Perk<span className="text-accent">.ai</span>
            </span>
          </div>
          <p className="text-xs text-ink-faint">
            Not affiliated with any listed providers. For informational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
