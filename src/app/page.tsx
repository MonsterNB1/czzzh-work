"use client";

import { useState } from "react";
import WordGallery from "@/components/WordGallery";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ perspective: "1200px" }}>
      {/* Layer 2 (back): main content - WordGallery */}
      <div
        className="absolute inset-0"
        style={{
          transform: entered ? "translateZ(0) scale(1)" : "translateZ(-200px) scale(0.95)",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: entered ? 1 : 0,
        }}
      >
        <WordGallery />
      </div>

      {/* Layer 1 (front): cover with logo */}
      <div
        className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center bg-[#020408]"
        onClick={() => setEntered(true)}
        style={{
          transform: entered ? "translateZ(-400px) scale(0.8)" : "translateZ(0) scale(1)",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease-out",
          opacity: entered ? 0 : 1,
          pointerEvents: entered ? "none" : "auto",
        }}
      >
        {/* Logo - inverted to white for dark bg */}
        <img
          src="/logo.png"
          alt="logo"
          className="h-48 w-48 object-contain"
          style={{
            filter: "invert(1) brightness(2) drop-shadow(0 0 20px rgba(0,255,255,0.4))",
          }}
        />
        <p className="mt-8 text-sm tracking-[0.5em] text-cyan-400">CZH</p>
        <p className="mt-2 text-xs tracking-widest text-cyan-700">click to enter</p>
      </div>
    </div>
  );
}
