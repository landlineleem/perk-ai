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
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted ${large ? "h-5 w-5" : "h-4 w-4"}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border border-border bg-surface text-ink placeholder-ink-faint outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/10 ${
          large
            ? "rounded-full py-4 pl-12 pr-6 text-base shadow-lg shadow-black/5 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]"
            : "rounded-full py-3 pl-11 pr-4 text-sm shadow-[0px_2px_8px_rgba(0,0,0,0.04)]"
        }`}
      />
    </div>
  );
}
