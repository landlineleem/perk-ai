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
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
            <span className="text-xs font-bold text-white">P</span>
          </div>
          <span
            className="text-base font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Perk<span className="text-accent">.ai</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-accent-subtle text-accent"
                  : "text-ink-muted hover:text-ink hover:bg-base-dark/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/my-perks"
            className="flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
          >
            Get started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ink-muted hover:text-ink rounded-lg p-2 hover:bg-base-dark/50 transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-surface px-6 pb-4 pt-2 md:hidden animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg py-2.5 px-3 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-accent-subtle text-accent"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/my-perks"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex h-10 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white"
          >
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}
