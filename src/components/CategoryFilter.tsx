"use client";

const categories = [
  { id: "all", label: "All" },
  { id: "Travel", label: "Travel" },
  { id: "Food", label: "Food & Dining" },
  { id: "Shopping", label: "Shopping" },
  { id: "Entertainment", label: "Entertainment" },
  { id: "Finance", label: "Finance" },
  { id: "Software", label: "Software" },
  { id: "Health", label: "Health" },
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
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
            selected === cat.id
              ? "bg-primary text-dark"
              : "bg-surface-alt text-ink-muted hover:text-ink hover:bg-border/60"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
