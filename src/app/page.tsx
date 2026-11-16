"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const lines = [
  "$ czzzh --intro",
  "",
  "> name: 蔡振昊",
  "> role: animator / designer / editor",
  "> based in: hangzhou, cn",
  "> focus: motion · 3D · post-production",
  "",
];

export default function Home() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 120);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Terminal window */}
      <div className="border border-cyan-500/30 bg-black/40 rounded-sm">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-cyan-500/20 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-red-500/60" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
          <div className="h-2 w-2 rounded-full bg-green-500/60" />
          <span className="ml-3 text-xs text-cyan-600">czzzh@portfolio — bash</span>
        </div>

        {/* Content */}
        <div className="p-6 font-mono text-sm leading-relaxed">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={line.startsWith(">") ? "text-cyan-300" : "text-cyan-500"}>
              {line || "\u00A0"}
            </div>
          ))}
          {visibleLines >= lines.length && (
            <div className="mt-6 flex gap-4">
              <Link
                href="/works"
                className="border border-cyan-500/50 bg-cyan-500/10 px-5 py-2 text-cyan-300 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              >
                $ ./view_works
              </Link>
              <Link
                href="/contact"
                className="border border-cyan-500/20 px-5 py-2 text-cyan-500 transition-all hover:border-cyan-500/50 hover:text-cyan-300"
              >
                $ ./contact
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="mt-8 flex justify-between text-xs text-cyan-700">
        <span>[STATUS: online]</span>
        <span>[v2026.11]</span>
      </div>
    </section>
  );
}
