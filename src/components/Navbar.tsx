"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
    <nav className="sticky top-0 z-50 bg-cream/70 backdrop-blur-2xl border-b border-ink/5">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-coral via-purple to-teal transition-transform group-hover:scale-110 group-hover:rotate-3">
            <span className="text-sm font-black text-white">P</span>
          </div>
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Perk<span className="gradient-text">.ai</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-ink text-white"
                  : "text-ink-muted hover:text-ink hover:bg-ink/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/my-perks"
            className="group flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-coral via-purple to-teal px-6 text-sm font-bold text-white shadow-lg shadow-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple/30 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="transition-transform group-hover:scale-110">✨</span>
            My Perks
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ink/60 hover:text-ink rounded-xl p-2 hover:bg-ink/5 transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-ink/5 bg-cream px-6 pb-5 pt-2 md:hidden animate-slide-up">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-xl py-3 px-4 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-ink/5 text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/my-perks"
            onClick={() => setMobileOpen(false)}
            className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral via-purple to-teal text-sm font-bold text-white"
          >
            ✨ My Perks
          </Link>
        </div>
      )}
    </nav>
  );
}
