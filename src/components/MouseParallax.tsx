"use client";

import { useEffect, useState } from "react";

export default function MouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <>
      {/* Floating sticker elements with parallax */}

      {/* Top-left: circular ✦ badge - bigger */}
      <div
        className="pointer-events-auto absolute left-10 top-28 hidden sm:block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${pos.x * 30}px, ${pos.y * 30}px)`,
        }}
      >
        <div className="group flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-cyan-400/70 bg-black/70 shadow-[0_0_30px_rgba(0,255,255,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(0,255,255,0.5)]">
          <span className="text-3xl text-cyan-300 transition-transform duration-300 group-hover:rotate-90">
            ✦
          </span>
        </div>
      </div>

      {/* Top: chromatic bars - bigger */}
      <div
        className="pointer-events-none absolute left-[20%] top-24 hidden sm:block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${pos.x * 50}px, ${pos.y * 50}px)`,
        }}
      >
        <div className="h-1.5 w-36 bg-gradient-to-r from-red-500/70 via-cyan-400/70 to-blue-500/70 blur-[1px]" />
      </div>
      <div
        className="pointer-events-none absolute right-[20%] top-24 hidden sm:block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${pos.x * 50}px, ${pos.y * 50}px)`,
        }}
      >
        <div className="h-1.5 w-36 bg-gradient-to-r from-cyan-400/70 via-purple-500/70 to-pink-500/70 blur-[1px]" />
      </div>

      {/* Right: phone mockup - bigger */}
      <div
        className="pointer-events-none absolute right-8 top-1/3 hidden sm:block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${pos.x * 40}px, ${pos.y * 40}px)`,
        }}
      >
        <div className="h-64 w-32 rounded-lg border border-cyan-500/30 bg-gradient-to-b from-cyan-900/40 to-purple-900/30 p-1.5 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
          <div className="h-full w-full rounded-md bg-gradient-to-b from-cyan-800/30 via-black/60 to-purple-800/30" />
        </div>
      </div>

      {/* Bottom-left: color block - bigger */}
      <div
        className="pointer-events-none absolute bottom-28 left-[20%] hidden sm:block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${pos.x * 60}px, ${pos.y * 60}px)`,
        }}
      >
        <div className="h-10 w-28 bg-gradient-to-r from-purple-600/50 to-pink-500/50 blur-[3px]" />
      </div>

      {/* Bottom-right: OPEN TO WORK badge - bigger, interactive */}
      <div
        className="pointer-events-auto absolute bottom-28 right-10 hidden sm:block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${pos.x * 25}px, ${pos.y * 25}px)`,
        }}
      >
        <div className="group cursor-pointer rotate-[-6deg] rounded-xl border-2 border-lime-400/70 bg-lime-950/70 px-6 py-4 text-center shadow-[0_0_30px_rgba(163,230,53,0.2)] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-[0_0_50px_rgba(163,230,53,0.4)]">
          <div className="text-base font-bold tracking-wider text-lime-300">OPEN TO</div>
          <div className="text-base font-bold tracking-wider text-lime-300">WORK</div>
          <div className="mt-1 text-xs text-lime-500/80">let's talk →</div>
        </div>
      </div>
    </>
  );
}
