import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perk Details — Perk.ai",
  description:
    "View perk details, estimated value, and step-by-step instructions on how to claim this benefit.",
};

export default function PerkDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
