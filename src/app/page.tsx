"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Search, CreditCard, Shield, Bell } from "lucide-react";
import perksData from "@/data/perks.json";
import providersData from "@/data/providers.json";
import { uniqueBrands, providerCardImages } from "@/data/imageMap";
import { BrandLogo } from "@/components/PerkCard";
import PerkCard from "@/components/PerkCard";

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
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-44 lg:px-10">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] text-white/60">
                Trusted by 1,000+ savvy cardholders
              </span>
            </div>

            <h1 className="mt-8 font-heading font-semibold text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] leading-[1.02] tracking-tight animate-fade-up delay-100">
              Stop leaving <span className="text-primary">money</span> on the table
            </h1>

            <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mt-6 animate-fade-up delay-200">
              Your credit cards, subscriptions, and memberships hold thousands in hidden value. We surface every perk so nothing goes to waste.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-10 animate-fade-up delay-300">
              <Link
                href="/my-perks"
                className="bg-primary text-dark font-semibold rounded-[26px] px-8 py-4 text-[15px] hover:bg-primary-light transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-[26px] border border-white/15 px-8 py-4 text-[15px] font-medium text-white/60 hover:text-white hover:border-white/30 transition-all"
              >
                See How It Works
              </Link>
            </div>

            <p className="text-[13px] text-white/25 mt-4 animate-fade-up delay-400">No credit card required</p>
          </div>

          {/* Device mockup showcase */}
          <div className="flex items-end justify-center mt-16 md:mt-24 animate-fade-up delay-500">
            {/* Laptop */}
            <div className="device-laptop w-full max-w-[640px]">
              <div className="device-laptop-screen">
                <div className="device-laptop-screen-inner">
                  <div className="p-4 bg-[#F8F8F4]">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-8 flex-1 rounded-full bg-white border border-[#E3E1D9]"></div>
                    </div>
                    <div className="mb-3 flex gap-2">
                      {["All", "Travel", "Food", "Shopping"].map(cat => (
                        <div key={cat} className={`rounded-full px-3 py-1 text-[9px] font-medium ${cat === "All" ? "bg-[#F59E0B] text-[#0C0C0A]" : "bg-[#F1F1EC] text-[#71716A]"}`}>{cat}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {perksData.filter(p => p.popular).slice(0, 6).map(perk => (
                        <div key={perk.id} className="rounded-xl bg-white p-2 border border-[#E3E1D9]">
                          <div className="mb-1 flex items-center gap-1">
                            <BrandLogo provider={perk.provider} size={12} />
                            <span className="text-[7px] text-[#71716A] truncate">{perk.provider}</span>
                          </div>
                          <div className="text-[8px] font-semibold text-[#0C0C0A] leading-tight truncate">{perk.title}</div>
                          <div className="mt-1 text-[8px] font-bold text-[#F59E0B]">{perk.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="device-laptop-base"></div>
            </div>

            {/* Phone */}
            <div className="device-phone w-[200px] md:w-[240px] animate-float -ml-16 mt-8 md:mt-12 relative z-10">
              <div className="device-phone-notch"></div>
              <div className="device-phone-screen">
                <div className="pt-10 bg-[#0C0C0A]">
                  <div className="px-4 pb-3">
                    <div className="text-[10px] text-white/40 font-medium">Your annual value</div>
                    <div className="text-[22px] font-bold text-white font-heading">$12,450</div>
                  </div>
                  <div className="bg-[#F8F8F4] rounded-t-2xl px-3 py-3 space-y-2 min-h-[200px]">
                    {perksData.filter(p => p.popular).slice(0, 4).map(perk => (
                      <div key={perk.id} className="flex items-center gap-2 rounded-xl bg-white p-2.5 border border-[#E3E1D9]">
                        <BrandLogo provider={perk.provider} size={18} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[9px] font-semibold text-[#0C0C0A] truncate">{perk.title}</div>
                          <div className="text-[8px] text-[#71716A]">{perk.provider}</div>
                        </div>
                        <div className="text-[9px] font-bold text-[#F59E0B]">{perk.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient gradient glow behind devices */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] gradient-glow" />
        {/* Bottom fade to cream */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F8F4] to-transparent" />
      </section>

      {/* ===== 2. TRUST BAR ===== */}
      <section className="py-12 overflow-hidden">
        <p className="mb-5 text-center text-[12px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
          Perks from {uniqueBrands.length}+ providers you already use
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F8F8F4] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F8F8F4] to-transparent z-10" />
          <div className="marquee-track">
            {[...uniqueBrands, ...uniqueBrands].map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex flex-shrink-0 items-center justify-center px-6">
                <BrandLogo provider={p.name} size={32} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. HOW IT WORKS ===== */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary mb-3">How it works</p>
        <h2 className="font-heading font-semibold text-3xl md:text-5xl tracking-tight mb-16">Three steps to unlock your perks</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { num: "01", title: "Select your providers", desc: "Tell us which credit cards, subscriptions, and memberships you have. We support 80+ providers." },
            { num: "02", title: "Discover hidden perks", desc: "We instantly surface every benefit, credit, and discount available to you — across all your providers." },
            { num: "03", title: "Never miss a benefit", desc: "Get reminders before perks expire, spot overlapping coverage, and maximize the value of what you already pay for." },
          ].map((step, i) => (
            <div key={step.num} className="rounded-[26px] bg-surface border border-border p-8 md:p-10 relative overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="text-7xl font-heading font-bold text-primary/10 absolute -top-4 -left-2">{step.num}</span>
              <h3 className="font-heading font-semibold text-xl mb-3 relative z-10">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-muted relative z-10">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. FEATURE: SMART DISCOVERY ===== */}
      <section className="bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
          <div className="grid items-center gap-12 md:gap-20 lg:grid-cols-2">
            {/* Laptop mockup */}
            <div className="animate-fade-up">
              <div className="device-laptop w-full max-w-[560px] mx-auto">
                <div className="device-laptop-screen">
                  <div className="device-laptop-screen-inner">
                    <div className="p-4 bg-[#F8F8F4]">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-8 flex-1 rounded-full bg-white border border-[#E3E1D9] flex items-center px-3">
                          <Search className="h-3 w-3 text-[#71716A]" />
                          <span className="ml-2 text-[8px] text-[#71716A]">Search perks...</span>
                        </div>
                      </div>
                      <div className="mb-3 flex gap-2">
                        {["All", "Travel", "Food", "Shopping", "Entertainment"].map(cat => (
                          <div key={cat} className={`rounded-full px-3 py-1 text-[9px] font-medium ${cat === "All" ? "bg-[#F59E0B] text-[#0C0C0A]" : "bg-[#F1F1EC] text-[#71716A]"}`}>{cat}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {perksData.filter(p => p.popular).slice(0, 6).map(perk => (
                          <div key={perk.id} className="rounded-xl bg-white p-2.5 border border-[#E3E1D9]">
                            <div className="mb-1 flex items-center gap-1">
                              <BrandLogo provider={perk.provider} size={14} />
                              <span className="text-[8px] text-[#71716A] truncate">{perk.provider}</span>
                            </div>
                            <div className="text-[9px] font-semibold text-[#0C0C0A] leading-tight truncate">{perk.title}</div>
                            <div className="mt-1 text-[9px] font-bold text-[#F59E0B]">{perk.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="device-laptop-base"></div>
              </div>
            </div>

            {/* Text content */}
            <div className="animate-fade-up delay-200">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary mb-3">Smart discovery</p>
              <h2 className="font-heading font-semibold text-3xl md:text-4xl tracking-tight mb-5">Browse thousands of perks in one place</h2>
              <p className="text-[15px] leading-relaxed text-ink-muted mb-8">
                Search across credit cards, loyalty programs, subscriptions, and memberships. Filter by category, provider, or value to find exactly what you&apos;re looking for.
              </p>
              <div className="space-y-4">
                {[
                  "200+ perks tracked across 14 categories",
                  "Real-time search across all providers",
                  "Sort by value, popularity, or expiration",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-ink-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. FEATURE: PERSONAL DASHBOARD ===== */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
          <div className="grid items-center gap-12 md:gap-20 lg:grid-cols-2">
            {/* Text content */}
            <div className="animate-fade-up">
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary mb-3">Personal dashboard</p>
              <h2 className="font-heading font-semibold text-3xl md:text-4xl tracking-tight mb-5">Your perks, personalized</h2>
              <p className="text-[15px] leading-relaxed text-white/40 mb-8">
                Select the cards and services you actually have. We&apos;ll show you exactly what you&apos;re entitled to — grouped by category, with your total estimated value.
              </p>
              <div className="space-y-4">
                {[
                  "See your total annual perk value at a glance",
                  "Perks grouped by category for easy browsing",
                  "Instantly spot overlapping or unused benefits",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center animate-fade-up delay-200">
              <div className="device-phone w-[280px] md:w-[300px] mx-auto animate-float">
                <div className="device-phone-notch"></div>
                <div className="device-phone-screen">
                  <div className="pt-10 bg-[#0C0C0A]">
                    <div className="px-4 pb-3">
                      <div className="text-[10px] text-white/40 font-medium">Your annual value</div>
                      <div className="text-[22px] font-bold text-white font-heading">$12,450</div>
                    </div>
                    <div className="bg-[#F8F8F4] rounded-t-2xl px-3 py-3 space-y-2 min-h-[280px]">
                      {perksData.filter(p => p.popular).slice(0, 5).map(perk => (
                        <div key={perk.id} className="flex items-center gap-2 rounded-xl bg-white p-2.5 border border-[#E3E1D9]">
                          <BrandLogo provider={perk.provider} size={20} />
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-[#0C0C0A] truncate">{perk.title}</div>
                            <div className="text-[9px] text-[#71716A]">{perk.provider}</div>
                          </div>
                          <div className="text-[10px] font-bold text-[#F59E0B]">{perk.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. FEATURE: CREDIT CARD SHOWCASE ===== */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
        <div className="grid items-center gap-12 md:gap-20 lg:grid-cols-2">
          {/* Card fan */}
          <div className="animate-fade-up">
            <div className="relative h-[400px] w-full max-w-[500px] mx-auto">
              {Object.entries(providerCardImages).slice(0, 5).map(([name, src], i) => (
                <div
                  key={name}
                  className="absolute transition-transform duration-500 hover:scale-105 hover:z-20"
                  style={{
                    width: '280px',
                    top: `${i * 30}px`,
                    left: `${i * 40}px`,
                    transform: `rotate(${(i - 2) * 5}deg)`,
                    zIndex: 5 - i,
                  }}
                >
                  <Image src={src} alt={name} width={500} height={315} className="rounded-xl shadow-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="animate-fade-up delay-200">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary mb-3">Premium cards</p>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl tracking-tight mb-5">All the cards you carry, one place to track</h2>
            <p className="text-[15px] leading-relaxed text-ink-muted mb-8">
              From Amex Platinum to Chase Sapphire, we cover every major credit card and their full perk catalogs. See exactly what each card gives you.
            </p>
            <Link href="/browse" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-primary transition-colors">
              Browse all providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 7. POPULAR PERKS ===== */}
      <section className="bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary mb-3">Featured</p>
              <h2 className="font-heading font-semibold text-3xl md:text-5xl tracking-tight">Popular perks</h2>
            </div>
            <Link href="/browse" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors">
              View all perks <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perksData.filter(p => p.popular).slice(0, 6).map((perk, i) => (
              <PerkCard key={perk.id} perk={perk} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/browse" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              View all perks <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 8. STATS ===== */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
          <h2 className="font-heading font-semibold text-3xl md:text-5xl tracking-tight text-center mb-16">The numbers speak for themselves</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: perksData.length, suffix: "+", label: "Perks tracked", sub: "and growing" },
              { value: providersData.length, suffix: "", label: "Providers", sub: "" },
              { value: 14, suffix: "", label: "Categories", sub: "" },
              { value: 250, suffix: "k+", label: "Total value", sub: "in potential savings", prefix: "$" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl md:text-6xl font-heading font-semibold text-primary">
                  {stat.prefix || ""}<AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-white/60">{stat.label}</p>
                {stat.sub && <p className="text-[13px] text-white/25">{stat.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. TESTIMONIALS ===== */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary mb-3">What people say</p>
        <h2 className="font-heading font-semibold text-3xl md:text-5xl tracking-tight mb-16">Loved by savvy cardholders</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote: "I had no idea my Amex Platinum had a $200 hotel credit I wasn't using. Perk.ai found it in seconds.",
              name: "Sarah M.",
              role: "Product Designer",
              initial: "S",
            },
            {
              quote: "Between my three credit cards, I was missing out on over $2,000 in annual benefits. This tool is a no-brainer.",
              name: "James K.",
              role: "Software Engineer",
              initial: "J",
            },
            {
              quote: "Finally, one place to see everything. I used to keep a spreadsheet — now I just check Perk.ai.",
              name: "Maria L.",
              role: "Financial Analyst",
              initial: "M",
            },
          ].map((t) => (
            <div key={t.name} className="rounded-[26px] bg-surface border border-border p-8 animate-fade-up">
              <p className="text-[15px] leading-relaxed text-ink-secondary mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-[13px] text-ink-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 10. CTA ===== */}
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="pointer-events-none absolute inset-0 gradient-glow" />
        <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44 lg:px-10 text-center">
          <h2 className="font-heading font-semibold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">Ready to unlock your perks?</h2>
          <p className="text-lg text-white/35 max-w-xl mx-auto mb-10">
            Join thousands of cardholders who are finally getting the full value from every card, subscription, and membership they pay for.
          </p>
          <Link
            href="/my-perks"
            className="inline-flex items-center gap-2 bg-primary text-dark font-semibold rounded-[26px] px-10 py-4 text-[16px] hover:bg-primary-light transition-colors"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-[13px] text-white/20 mt-5">Free to use. No credit card required.</p>
        </div>
      </section>

      {/* ===== 11. FOOTER ===== */}
      <footer className="bg-dark text-white border-t border-white/5">
        {/* Scrolling text banner */}
        <div className="overflow-hidden py-10 border-b border-white/5">
          <div className="scroll-banner">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-20 px-10">
                {["Discover", "Track", "Optimize", "Save", "Unlock", "Maximize", "Redeem", "Benefit"].map(w => (
                  <span key={`${w}-${i}`} className="text-7xl font-heading font-semibold text-white/[0.03] whitespace-nowrap">{w}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer content */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand column */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Perk.AI"
                className="h-6 w-auto rounded brightness-0 invert opacity-70"
              />
              <p className="text-sm text-white/30 leading-relaxed max-w-xs mt-4">
                Perk.ai helps you discover and track every benefit from your credit cards, subscriptions, and memberships. We are not a financial advisor.
              </p>
            </div>

            {/* Product */}
            <div>
              <p className="text-sm font-semibold text-white/50 mb-4">Product</p>
              <ul className="space-y-2.5">
                <li><Link href="/browse" className="text-sm text-white/35 hover:text-white/60 transition-colors">Browse Perks</Link></li>
                <li><Link href="/my-perks" className="text-sm text-white/35 hover:text-white/60 transition-colors">My Perks</Link></li>
                <li><Link href="/browse" className="text-sm text-white/35 hover:text-white/60 transition-colors">Popular</Link></li>
                <li><Link href="#how-it-works" className="text-sm text-white/35 hover:text-white/60 transition-colors">How It Works</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-sm font-semibold text-white/50 mb-4">Company</p>
              <ul className="space-y-2.5">
                <li><span className="text-sm text-white/35 hover:text-white/60 transition-colors cursor-default">About</span></li>
                <li><span className="text-sm text-white/35 hover:text-white/60 transition-colors cursor-default">Blog</span></li>
                <li><span className="text-sm text-white/35 hover:text-white/60 transition-colors cursor-default">Careers</span></li>
                <li><span className="text-sm text-white/35 hover:text-white/60 transition-colors cursor-default">Contact</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-sm font-semibold text-white/50 mb-4">Legal</p>
              <ul className="space-y-2.5">
                <li><span className="text-sm text-white/35 hover:text-white/60 transition-colors cursor-default">Privacy Policy</span></li>
                <li><span className="text-sm text-white/35 hover:text-white/60 transition-colors cursor-default">Terms of Service</span></li>
                <li><span className="text-sm text-white/35 hover:text-white/60 transition-colors cursor-default">Cookie Policy</span></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[13px] text-white/20">
              &copy; {new Date().getFullYear()} Perk.ai. Not affiliated with any listed providers. All trademarks belong to their respective owners.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[13px] text-white/20 hover:text-white/40 transition-colors cursor-default">Twitter</span>
              <span className="text-[13px] text-white/20 hover:text-white/40 transition-colors cursor-default">LinkedIn</span>
              <span className="text-[13px] text-white/20 hover:text-white/40 transition-colors cursor-default">Instagram</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
