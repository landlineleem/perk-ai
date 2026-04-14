"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import { uniqueBrands, providerCardImages } from "@/data/imageMap";
import { BrandLogo } from "@/components/PerkCard";

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
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {

  return (
    <div className="min-h-screen">
      {/* ===== HERO — centered single-column ===== */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40 lg:px-10">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p
              className="mb-5 text-sm font-medium tracking-widest uppercase text-primary animate-fade-up"
            >
              Stop leaving money on the table
            </p>

            <h1
              className="mb-6 font-heading font-medium text-[2.8rem] md:text-[4rem] lg:text-[5rem] leading-[1.05] tracking-tight animate-fade-up delay-100"
            >
              Every perk you <span className="text-primary">deserve</span> to know
            </h1>

            <p className="mb-10 text-lg leading-relaxed text-white/45 max-w-xl mx-auto animate-fade-up delay-200">
              Your credit cards, subscriptions, and memberships hold thousands in
              hidden value. We surface every benefit so nothing goes to waste.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up delay-300">
              <Link
                href="/my-perks"
                className="rounded-[26px] bg-primary px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-primary-light"
              >
                Unlock My Perks
              </Link>
              <Link
                href="/browse"
                className="rounded-[26px] border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>

        {/* Ambient gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_60%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#F5F5F0] to-transparent" />
      </section>

      {/* ===== PROVIDER LOGOS MARQUEE ===== */}
      <section className="border-b border-border/60 py-10 overflow-hidden">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Perks from {uniqueBrands.length}+ providers you already use
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F5F5F0] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F5F0] to-transparent z-10" />
          <div className="marquee-track">
            {[...uniqueBrands, ...uniqueBrands].map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex flex-shrink-0 items-center justify-center px-6">
                <BrandLogo provider={p.name} size={32} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENTO STATS ===== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: perksData.length, suffix: "+", label: "Perks tracked", sub: "and growing weekly" },
            { value: providersData.length, suffix: "", label: "Providers", sub: "cards, apps, restaurants & more" },
            { value: 14, suffix: "", label: "Categories", sub: "travel to fast food" },
            { value: 250, suffix: "k", label: "Total value", sub: "in potential savings", prefix: "$" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-[26px] bg-surface border border-border/70 p-8 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="text-4xl font-bold text-ink font-heading font-medium">
                {stat.prefix || ""}<AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-ink">{stat.label}</p>
              <p className="text-xs text-ink-muted">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROVIDERS GRID ===== */}
      <section className="bg-surface-alt border-y border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Providers
              </p>
              <h2
                className="text-3xl tracking-tight md:text-5xl font-heading font-medium"
              >
                Explore by provider
              </h2>
            </div>
            <Link
              href="/browse"
              className="group hidden items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink md:flex"
            >
              View all perks
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {providersData.map((provider, i) => {
              const providerPerks = perksData.filter(
                (p) => p.provider === provider.name
              );
              return (
                <Link
                  href={`/browse?provider=${provider.id}`}
                  key={provider.id}
                  className="group block animate-fade-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="card-hover flex flex-col items-center gap-3 rounded-[26px] bg-surface border border-border/70 p-6 text-center">
                    {provider.cardImage ? (
                      <Image
                        src={provider.cardImage}
                        alt={provider.name}
                        width={80}
                        height={50}
                        className="rounded object-contain"
                      />
                    ) : (
                      <BrandLogo provider={provider.name} size={36} />
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                        {provider.name}
                      </h3>
                      <p className="text-[11px] text-ink-muted mt-0.5">
                        {providerPerks.length} perk{providerPerks.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              View all perks
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="mb-4 text-4xl tracking-tight md:text-6xl font-heading font-medium"
            >
              See what you&apos;re <span className="text-primary">actually</span> paying for
            </h2>
            <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-white/45">
              Select your cards, subscriptions, and memberships. We&apos;ll show you
              every perk, credit, and benefit — so you never leave money on the table again.
            </p>
            <Link
              href="/my-perks"
              className="inline-flex items-center gap-2.5 rounded-[26px] bg-primary px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-primary-light"
            >
              Unlock My Perks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-dark text-white">
        <div className="overflow-hidden border-b border-white/5 py-8">
          <div className="scroll-banner">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 px-8">
                {["Discover", "Track", "Optimize", "Save", "Unlock", "Maximize"].map((word) => (
                  <span key={`${word}-${i}`} className="text-6xl font-heading font-medium text-white/[0.03] whitespace-nowrap">{word}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Perk.AI"
                className="mb-3 h-6 w-auto rounded brightness-0 invert opacity-70"
              />
              <p className="max-w-sm text-xs leading-relaxed text-white/40">
                Perk.ai helps you discover and track every benefit from your credit cards,
                subscriptions, and memberships. We are not a financial advisor.
              </p>
            </div>
            <div className="flex gap-10">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Product</p>
                <ul className="space-y-1.5 text-xs text-white/40">
                  <li><Link href="/browse" className="hover:text-white/70 transition-colors">Browse Perks</Link></li>
                  <li><Link href="/my-perks" className="hover:text-white/70 transition-colors">My Perks</Link></li>
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Legal</p>
                <ul className="space-y-1.5 text-xs text-white/40">
                  <li><span className="cursor-default">Privacy Policy</span></li>
                  <li><span className="cursor-default">Terms of Service</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="text-[11px] text-white/20">
              &copy; {new Date().getFullYear()} Perk.ai. Not affiliated with any listed providers. All trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
