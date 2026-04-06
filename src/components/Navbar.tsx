"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse" },
    { href: "/my-perks", label: "My Perks" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-charcoal/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-gold" />
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Perk<span className="text-gold">.ai</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-white/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/browse"
            className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/50 transition-colors hover:border-gold/30 hover:text-white/80"
          >
            <Search className="h-3.5 w-3.5" />
            Search perks...
          </Link>
          <Link
            href="/my-perks"
            className="flex h-9 items-center gap-1.5 rounded-full bg-gold px-5 text-sm font-semibold text-charcoal transition-all hover:bg-gold-light hover:shadow-[0_0_20px_rgba(245,200,66,0.3)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            My Perks
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/60 hover:text-white"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-charcoal px-6 pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors ${
                pathname === link.href ? "text-gold" : "text-white/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/my-perks"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex h-10 items-center justify-center gap-1.5 rounded-full bg-gold text-sm font-semibold text-charcoal"
          >
            <Sparkles className="h-3.5 w-3.5" />
            My Perks
          </Link>
        </div>
      )}
    </nav>
  );
}
