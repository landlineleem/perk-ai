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
    { href: "/browse", label: "Browse Perks" },
    { href: "/my-perks", label: "My Perks" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>P</span>
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Perk<span className="text-primary">.ai</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium tracking-wide uppercase transition-colors ${
                pathname === link.href
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          <Link
            href="/my-perks"
            className="rounded-full bg-dark px-5 py-2 text-[13px] font-semibold text-white transition-all hover:bg-dark-surface"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ink-muted hover:text-ink p-2"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-cream px-6 pb-5 pt-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-medium ${
                pathname === link.href ? "text-ink" : "text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/my-perks"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-full bg-dark py-3 text-center text-sm font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
