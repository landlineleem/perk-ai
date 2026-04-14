import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse All Perks — Perk.ai",
  description:
    "Search and filter 200+ perks from credit cards, subscriptions, loyalty programs, and memberships. Find every benefit you're entitled to.",
};

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
