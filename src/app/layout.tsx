import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perk.ai — Discover Every Perk You're Missing",
  description:
    "A beautifully designed hub to discover and track every perk, deal, benefit, and discount you have access to.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body
        className="min-h-screen bg-charcoal text-white antialiased"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
