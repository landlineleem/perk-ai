"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search perks, providers, categories...",
  large = false,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  large?: boolean;
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-coral/20 via-purple/20 to-teal/20 opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted/50 transition-colors group-focus-within:text-purple ${large ? "h-5 w-5" : "h-4 w-4"}`} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-2xl border-2 border-ink/[0.06] bg-white text-ink placeholder-ink-muted/40 outline-none transition-all duration-300 focus:border-purple/30 focus:shadow-lg focus:shadow-purple/5 ${
            large ? "py-4.5 pl-12 pr-5 text-base" : "py-3 pl-11 pr-4 text-sm"
          }`}
        />
      </div>
    </div>
  );
}
