import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Perks — Perk.ai",
  description:
    "Select your credit cards, subscriptions, and memberships to see every perk and benefit you're entitled to.",
};

export default function MyPerksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
