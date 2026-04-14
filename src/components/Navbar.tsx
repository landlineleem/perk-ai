"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const categories = [
  { label: "Travel", slug: "Travel" },
  { label: "Food & Dining", slug: "Food & Dining" },
  { label: "Shopping", slug: "Shopping" },
  { label: "Entertainment", slug: "Entertainment" },
  { label: "Finance", slug: "Finance" },
  { label: "Software", slug: "Software" },
  { label: "Health", slug: "Health" },
];

const providerTypes = [
  { label: "Credit Cards", slug: "credit-cards" },
  { label: "Airlines", slug: "airlines" },
  { label: "Hotels", slug: "hotels" },
  { label: "Restaurants", slug: "restaurants" },
  { label: "Streaming", slug: "streaming" },
  { label: "Retail", slug: "retail" },
];

const navLinks = [
  { href: "/browse", label: "Browse Perks" },
  { href: "/my-perks", label: "My Perks" },
  { href: "/#how-it-works", label: "How It Works" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse All" },
  { href: "/my-perks", label: "My Perks" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) => {
    if (href === "/#how-it-works") return pathname === "/" && false;
    return pathname === href;
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 h-20 bg-cream/95 backdrop-blur-lg border-b border-border/40">
        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Left — Logo */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Perk.AI"
              className="h-8 w-auto rounded-md"
            />
          </Link>

          {/* Center — Desktop links */}
          <div className="hidden items-center gap-8 md:flex absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-ink font-semibold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-3">
            {/* Log in — desktop only */}
            <Link
              href="/login"
              className="hidden md:inline-block text-[14px] font-medium text-ink-muted hover:text-ink transition-colors"
            >
              Log in
            </Link>

            {/* Get Started pill — desktop only */}
            <Link
              href="/get-started"
              className="hidden md:inline-block rounded-[26px] bg-primary px-6 py-2.5 text-[13px] font-semibold text-dark hover:bg-primary-light transition-colors"
            >
              Get Started
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-alt transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="h-5 w-5 text-ink" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen Overlay Menu ── */}
      <div
        className={`fixed inset-0 z-[60] bg-dark text-white ${
          menuOpen ? "nav-overlay open" : "nav-overlay closed"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Top bar — logo + close */}
          <div className="flex h-20 items-center justify-between">
            <Link href="/" onClick={closeMenu}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Perk.AI"
                className="h-8 w-auto rounded-md brightness-0 invert"
              />
            </Link>
            <button
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white/60 hover:text-white" />
            </button>
          </div>

          {/* Content grid */}
          <div className="grid gap-12 pt-8 grid-cols-1 md:grid-cols-3">
            {/* Column 1: Browse by Category */}
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Browse by Category
              </p>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/browse?category=${encodeURIComponent(cat.slug)}`}
                    onClick={closeMenu}
                    className="block text-lg text-white/70 hover:text-primary transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Provider Types */}
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Provider Types
              </p>
              <div className="space-y-3">
                {providerTypes.map((type) => (
                  <Link
                    key={type.slug}
                    href={`/browse?type=${type.slug}`}
                    onClick={closeMenu}
                    className="block text-lg text-white/70 hover:text-primary transition-colors"
                  >
                    {type.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Quick Links + Account */}
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Quick Links
              </p>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block text-lg text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-10">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  Account
                </p>
                <div className="space-y-3">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block text-lg text-white/70 hover:text-primary transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/my-perks"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-2 rounded-[26px] bg-primary px-7 py-3 text-[15px] font-semibold text-dark hover:bg-primary-light transition-colors"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
