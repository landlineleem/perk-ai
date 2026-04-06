"use client";

const categories = [
  { id: "all", label: "All", emoji: "🌟", color: "from-ink to-ink-light" },
  { id: "Travel", label: "Travel", emoji: "✈️", color: "from-teal to-teal-light" },
  { id: "Food", label: "Food", emoji: "🍕", color: "from-coral to-coral-light" },
  { id: "Software", label: "Software", emoji: "💎", color: "from-purple to-purple-light" },
  { id: "Finance", label: "Finance", emoji: "💸", color: "from-mint to-teal" },
  { id: "Health", label: "Health", emoji: "💖", color: "from-pink to-coral-light" },
  { id: "Shopping", label: "Shopping", emoji: "🛍️", color: "from-sunny to-orange" },
  { id: "Entertainment", label: "Entertainment", emoji: "🎉", color: "from-blue to-purple-light" },
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
          className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
            selected === cat.id
              ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-[1.03]`
              : "bg-white text-ink-muted border border-ink/[0.06] hover:border-ink/10 hover:shadow-md hover:scale-[1.02] hover:text-ink"
          }`}
        >
          <span className={`text-sm transition-transform duration-200 ${selected === cat.id ? "animate-wiggle" : ""}`}>
            {cat.emoji}
          </span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}
