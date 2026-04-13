"use client";

const categories = [
  { id: "all", label: "All" },
  { id: "Travel", label: "Travel" },
  { id: "Food", label: "Food" },
  { id: "Software", label: "Software" },
  { id: "Finance", label: "Finance" },
  { id: "Health", label: "Health" },
  { id: "Shopping", label: "Shopping" },
  { id: "Entertainment", label: "Entertainment" },
];

export default function CategoryFilter({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            selected === cat.id
              ? "bg-accent text-white"
              : "bg-surface text-ink-muted border border-border hover:border-ink-faint hover:text-ink"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
