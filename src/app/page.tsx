"use client";

import { useState, useEffect } from "react";
import WordGallery from "@/components/WordGallery";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ perspective: "1200px" }}>
      {/* Layer 2 (back): main content */}
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

      {/* Layer 1 (front): cover */}
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
        {/* Mouse-follow glow */}
        <div
          className="pointer-events-none absolute h-[500px] w-[500px] rounded-full"
          style={{
            left: mouse.x - 250,
            top: mouse.y - 250,
            background:
              "radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,255,255,0.06) 40%, transparent 70%)",
            transition: "left 0.1s ease-out, top 0.1s ease-out",
          }}
        />

        {/* Logo - 3x bigger */}
        <div className="relative">
          <img
            src="/logo.png"
            alt="logo"
            className="h-[28rem] w-[28rem] object-contain"
            style={{
              filter:
                "invert(1) brightness(2) drop-shadow(0 0 40px rgba(0,255,255,0.5)) drop-shadow(0 0 80px rgba(0,255,255,0.2))",
            }}
          />
        </div>

        <p className="mt-10 text-2xl font-light tracking-[0.3em] text-cyan-100">
          蔡振昊个人作品集
        </p>
        <p className="mt-3 text-xs tracking-[0.4em] text-cyan-500">
          CAI ZHENHAO — PORTFOLIO
        </p>
        <p className="mt-8 text-[10px] tracking-widest text-cyan-800">click to enter</p>
      </div>
    </div>
  );
}
