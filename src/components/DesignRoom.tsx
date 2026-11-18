"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DesignData } from "@/data/designs";

/** a design project opens as a plate on the table: one image up, the rest as a strip */
export default function DesignRoom({ work }: { work: DesignData }) {
  const plates = work.shots?.length ? work.shots : work.cover ? [work.cover] : [];
  const [idx, setIdx] = useState(0);
  const total = plates.length;
  const current = total ? plates[Math.min(idx, total - 1)] : undefined;

  const step = (d: number) => {
    if (!total) return;
    setIdx((i) => (i + d + total) % total);
  };

  useEffect(() => {
    if (total < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <div className="min-h-screen grid-bg page-type px-4 pt-20 pb-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[960px]">
        <Link href="/works" className="note text-[13px] text-ink-soft inline-flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/scrapbook/arrow-red.webp" alt="" className="h-6 w-auto rotate-180" />
          回作品集
        </Link>

        <div className="mt-5 bg-[#fbf9f1] border border-[#e6e0cf] shadow-[0_26px_64px_-30px_rgba(60,45,25,0.55)] px-5 pt-7 pb-7 rotate-[-0.4deg] md:px-10 md:pt-10 md:pb-9">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="hand text-[26px] md:text-[40px] font-bold text-ink-blue leading-none">
              {work.title}
            </h1>
            {work.en ? (
              <span className="note type text-[11px] md:text-[13px] text-[#6f6f66]">{work.en}</span>
            ) : null}
          </div>

          {/* the plate itself */}
          <div className="relative mt-5 overflow-hidden bg-white border border-[#e8e3d4] shadow-[0_12px_30px_-20px_rgba(60,45,25,0.6)]">
            {current ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current}
                alt={work.title}
                className="block w-full h-auto"
                decoding="async"
              />
            ) : (
              <div className="aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-[#f4f1e7]">
                <span className="tape -top-2 left-1/2 -translate-x-1/2" />
                <span className="note text-[13px] text-[#8b8779]">这一张还在整理</span>
              </div>
            )}

            {total > 1 ? (
              <>
                <button
                  onClick={() => step(-1)}
                  aria-label="上一张"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#fbf9f1]/90 border border-[#ded8c6] hand text-marker text-[16px] shadow-[0_6px_14px_-8px_rgba(60,45,25,0.5)] hover:text-[#a52a2c]"
                >
                  ←
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="下一张"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#fbf9f1]/90 border border-[#ded8c6] hand text-marker text-[16px] shadow-[0_6px_14px_-8px_rgba(60,45,25,0.5)] hover:text-[#a52a2c]"
                >
                  →
                </button>
                <div className="absolute right-3 bottom-3 hand type text-[10px] text-[#8b8779]">
                  {Math.min(idx + 1, total)} / {total}
                </div>
              </>
            ) : null}
          </div>

          {/* contact strip */}
          {total > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {plates.map((p, i) => (
                <button
                  key={`${p}-${i}`}
                  onClick={() => setIdx(i)}
                  className={`shrink-0 w-16 h-12 md:w-20 md:h-14 overflow-hidden bg-[#fbf9f1] border transition-colors ${
                    i === Math.min(idx, total - 1)
                      ? "border-marker"
                      : "border-[#ded8c6] hover:border-[#c9c1aa]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p}
                    alt=""
                    className="block w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          ) : null}

          {work.desc || work.meta?.length ? (
            <div className="mt-7 grid gap-6 md:grid-cols-[1.6fr_1fr]">
              {work.desc ? (
                <p className="note text-[12.5px] md:text-[14px] leading-[1.7] text-[#2f2f2c]">
                  {work.desc}
                </p>
              ) : null}
              {work.meta?.length ? (
                <div className="space-y-1">
                  {work.meta.map((m) => (
                    <div key={m} className="note text-[11px] md:text-[12px] text-[#7d7d73]">
                      · {m}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
