"use client";

import { useState } from "react";

const R2_BASE = "https://pub-99c53aec3f634300b636798977401e47.r2.dev/monster-diner";

export default function MonsterDinerPlayer() {
  const [ep, setEp] = useState(1);

  return (
    <div className="mt-16">
      <div className="relative overflow-hidden rounded-xl border-2 border-cyan-400/30 bg-black/60 p-2 shadow-[0_0_60px_rgba(0,255,255,0.1)]">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <video
            key={ep}
            controls
            className="h-full w-full"
            src={`${R2_BASE}/ep${ep}.mp4`}
            preload="metadata"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setEp(n)}
            className={`h-10 w-10 border text-sm transition-all ${
              ep === n
                ? "border-cyan-400 bg-cyan-400/20 text-cyan-200 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                : "border-cyan-500/30 text-cyan-500 hover:border-cyan-400/60 hover:text-cyan-300"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
