"use client";

const categories = [
  { id: "all", label: "All", icon: "✦" },
  { id: "Travel", label: "Travel", icon: "✈️" },
  { id: "Food", label: "Food", icon: "🍽️" },
  { id: "Software", label: "Software", icon: "💻" },
  { id: "Finance", label: "Finance", icon: "💰" },
  { id: "Health", label: "Health", icon: "🏥" },
  { id: "Shopping", label: "Shopping", icon: "🛍️" },
  { id: "Entertainment", label: "Entertainment", icon: "🎬" },
];

export default function CategoryFilter({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
            selected === cat.id
              ? "border-gold/40 bg-gold/10 text-gold shadow-[0_0_15px_rgba(245,200,66,0.1)]"
              : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70"
          }`}
        >
          <span className="text-xs">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}
