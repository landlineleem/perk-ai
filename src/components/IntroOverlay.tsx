"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function IntroOverlay() {
  const [phase, setPhase] = useState<"waiting" | "playing" | "done">("waiting");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("perk-intro-seen")) {
      setPhase("done");
    }
  }, []);

  const handleEnter = useCallback(() => {
    setPhase("playing");
    sessionStorage.setItem("perk-intro-seen", "true");
    setTimeout(() => setPhase("done"), 1800);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0A0F1C] cursor-pointer transition-opacity duration-700 ${
        phase === "playing" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={handleEnter}
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #0D6E5E 0%, transparent 70%)",
            animation: "introBreath 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #C8965A 0%, transparent 70%)",
            animation: "introBreath 4s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt="Perk.AI"
          className="h-14 w-auto md:h-20"
          style={{ animation: "introRevealLogo 1.2s ease-out both" }}
        />

        <p
          className="mt-6 mb-10 text-sm text-white/30"
          style={{ animation: "introRevealText 1s ease-out 0.5s both" }}
        >
          Every benefit you deserve to know
        </p>

        <div
          className="flex items-center gap-2 text-xs text-white/20"
          style={{ animation: "introRevealText 1s ease-out 0.8s both" }}
        >
          <span className="h-px w-8 bg-white/20" />
          Click anywhere to enter
          <span className="h-px w-8 bg-white/20" />
        </div>
      </div>
    </div>
  );
}
