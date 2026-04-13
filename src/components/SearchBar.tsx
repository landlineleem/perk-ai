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
    <div className="relative">
      <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint ${large ? "h-5 w-5" : "h-4 w-4"}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-border bg-surface text-ink placeholder-ink-faint outline-none transition-all focus:border-accent/40 focus:ring-2 focus:ring-accent/10 ${
          large ? "py-3.5 pl-11 pr-4 text-base" : "py-2.5 pl-10 pr-4 text-sm"
        }`}
      />
    </div>
  );
}
