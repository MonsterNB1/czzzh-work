"use client";

import Link from "next/link";
import Viewer3D from "@/components/Viewer3D";
import MouseParallax from "@/components/MouseParallax";
import { useEffect, useState } from "react";

export default function Home() {
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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
      <MouseParallax />

      {/* Central CRT TV screen - subtle parallax opposite to stickers */}
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${pos.x * -15}px, ${pos.y * -15}px)`,
        }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-black/80 p-2 shadow-[0_0_60px_rgba(0,255,255,0.08)]">
          <div className="relative h-72 w-72 overflow-hidden rounded-xl bg-black sm:h-96 sm:w-96">
            <Viewer3D />
            {/* Screen glare */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(0,255,255,0.03) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Text */}
      <h1 className="mt-10 text-center text-3xl font-light tracking-tight text-cyan-100 sm:text-5xl">
        蔡振昊
      </h1>
      <p className="mt-3 text-center text-xs tracking-[0.3em] text-cyan-500">
        ANIMATOR · DESIGNER · EDITOR
      </p>

      <Link
        href="/works"
        className="mt-8 border border-cyan-500/30 px-8 py-3 text-xs tracking-[0.2em] text-cyan-400 transition-all hover:border-cyan-400 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
      >
        VIEW WORKS
      </Link>
    </section>
  );
}
