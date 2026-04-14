"use client";

import Link from "next/link";
import Image from "next/image";
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
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-lg border-b border-border/40">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Perk.AI"
            className="h-8 w-auto rounded-md"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[14px] font-medium transition-colors ${
                pathname === link.href
                  ? "text-ink font-semibold"
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
            className="bg-primary rounded-[26px] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-primary-light transition-colors"
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
            className="mt-2 block rounded-full bg-primary py-3 text-center text-sm font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
