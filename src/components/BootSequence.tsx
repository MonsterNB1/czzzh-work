"use client";

import { useEffect, useState } from "react";

const bootLines = [
  "CZZH-WORK BIOS v2.6.1",
  "Memory check: 640K OK",
  "Loading creative modules...",
  "  [OK] animation_engine",
  "  [OK] motion_design",
  "  [OK] post_production",
  "  [OK] aigc_pipeline",
  "Mounting /dev/portfolio...",
  "",
  "> SYSTEM READY_",
];

export default function BootSequence() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (progress < bootLines.length) {
      const timer = setTimeout(() => setProgress((p) => p + 1), 200);
      return () => clearTimeout(timer);
    } else {
      const t1 = setTimeout(() => setFading(true), 800);
      const t2 = setTimeout(() => setDone(true), 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* CRT power-on flash */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="bg-cyan-400/20"
          style={{
            width: "100%",
            height: progress === 0 ? "4px" : "100%",
            transition: "height 0.3s ease-out",
            boxShadow: "0 0 100px rgba(0,255,255,0.3)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-8 font-mono text-sm">
        {bootLines.slice(0, progress).map((line, i) => (
          <div
            key={i}
            className="boot-line text-cyan-400 glow-dim"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {line === "" ? "\u00A0" : line}
          </div>
        ))}
        {progress >= bootLines.length && (
          <div className="cursor text-cyan-300 glow" />
        )}
      </div>
    </div>
  );
}
