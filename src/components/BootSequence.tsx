"use client";

import { useEffect, useState } from "react";

export default function BootSequence() {
  const [phase, setPhase] = useState(0);
  // 0: black, 1: thin line, 2: expanding, 3: full flash, 4: fading out, 5: done

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),  // thin horizontal line appears
      setTimeout(() => setPhase(2), 350),  // expand vertically
      setTimeout(() => setPhase(3), 700),  // full screen flash
      setTimeout(() => setPhase(4), 1100), // fade out
      setTimeout(() => setPhase(5), 1700), // gone
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase >= 5) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
      style={{
        opacity: phase === 4 ? 0 : 1,
        transition: phase === 4 ? "opacity 0.6s ease-out" : "none",
      }}
    >
      {/* CRT power-on effect */}
      <div
        className="absolute left-0 right-0 bg-cyan-100"
        style={{
          height: phase <= 1 ? "2px" : phase === 2 ? "100vh" : "100vh",
          opacity: phase === 1 ? 0.9 : phase === 2 ? 0.6 : phase === 3 ? 0.15 : 0,
          transition:
            phase === 1
              ? "height 0.25s ease-in, opacity 0.25s"
              : phase === 2
              ? "height 0.3s ease-out, opacity 0.3s"
              : "opacity 0.4s",
          boxShadow:
            phase <= 2
              ? "0 0 60px rgba(0,255,255,0.8), 0 0 120px rgba(0,255,255,0.4)"
              : "0 0 200px rgba(0,255,255,0.2)",
        }}
      />
      {/* Scanline flicker during power on */}
      {phase >= 2 && phase <= 3 && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,255,255,0.03) 0px, rgba(0,255,255,0.03) 1px, transparent 1px, transparent 3px)",
          }}
        />
      )}
    </div>
  );
}
