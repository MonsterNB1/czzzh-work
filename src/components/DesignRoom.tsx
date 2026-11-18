"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DesignData } from "@/data/designs";

const thumbOf = (src: string) => src.replace(/\.webp$/, "-600.webp");

/** a design project is a sheet on the table: grouped plates, click one to look closer */
export default function DesignRoom({ work }: { work: DesignData }) {
  const groups = work.plates?.length
    ? work.plates
    : work.cover
      ? [{ label: "作品", shots: [work.cover] }]
      : [];

  // the plate being looked at up close, as [groupIndex, shotIndex]
  const [focus, setFocus] = useState<[number, number] | null>(null);

  const total = groups.length
    ? groups.reduce((n, g) => n + g.shots.length, 0)
    : 0;

  const step = (d: number) => {
    if (!focus || !total) return;
    setFocus((prev) => {
      if (!prev) return prev;
      let [g, s] = prev;
      s = s + d;
      if (s < 0) {
        g = (g - 1 + groups.length) % groups.length;
        s = groups[g].shots.length - 1;
      } else if (s >= groups[g].shots.length) {
        g = (g + 1) % groups.length;
        s = 0;
      }
      return [g, s];
    });
  };

  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocus(null);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [focus]);

  const focused = focus ? groups[focus[0]]?.shots[focus[1]] : undefined;
  const focusedNumber = focus
    ? groups.slice(0, focus[0]).reduce((n, g) => n + g.shots.length, 0) + focus[1] + 1
    : 0;

  return (
    <div className="min-h-screen grid-bg page-type px-4 pt-20 pb-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1000px]">
        <Link href="/works" className="note text-[13px] text-ink-soft inline-flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/scrapbook/arrow-red.webp" alt="" className="h-6 w-auto rotate-180" />
          回作品集
        </Link>

        <div className="mt-5 bg-[#fbf9f1] border border-[#e6e0cf] shadow-[0_26px_64px_-30px_rgba(60,45,25,0.55)] px-5 pt-7 pb-8 rotate-[-0.3deg] md:px-10 md:pt-10 md:pb-10">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="hand text-[26px] md:text-[40px] font-bold text-ink-blue leading-none">
              {work.title}
            </h1>
            {work.en ? (
              <span className="note type text-[11px] md:text-[13px] text-[#6f6f66]">{work.en}</span>
            ) : null}
          </div>

          {work.desc || work.meta?.length ? (
            <div className="mt-4 grid gap-4 md:grid-cols-[1.7fr_1fr]">
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

          {groups.length === 0 ? (
            <div className="mt-6 aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-[#f4f1e7] border border-[#e8e3d4]">
              <span className="tape -top-2 left-1/2 -translate-x-1/2" />
              <span className="note text-[13px] text-[#8b8779]">这一页还在整理</span>
            </div>
          ) : (
            <div className="mt-8 space-y-9">
              {groups.map((g, gi) => (
                <div key={`${g.label}-${gi}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="hand text-[13px] md:text-[15px] text-marker">{g.label}</span>
                    <span className="hand type text-[10px] text-[#a8a49a]">{g.shots.length}</span>
                    <span className="flex-1 h-px bg-[#e4dfd0]" />
                  </div>
                  <div className="columns-2 gap-3 md:columns-3 md:gap-4 [column-fill:balance]">
                    {g.shots.map((s, si) => (
                      <button
                        key={s}
                        onClick={() => setFocus([gi, si])}
                        className="group relative block w-full mb-3 md:mb-4 break-inside-avoid text-left bg-white border border-[#e8e3d4] shadow-[0_10px_26px_-18px_rgba(60,45,25,0.6)] overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbOf(s)}
                          alt={`${work.title} ${g.label} ${si + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="block w-full h-auto max-h-[330px] md:max-h-[470px] object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== the light table: one plate, everything else dimmed ===== */}
      {focus && focused ? (
        <div
          className="fixed inset-0 z-50 bg-[#1b1714]/94 backdrop-blur-[2px] flex items-center justify-center p-4 md:p-10"
          onClick={() => setFocus(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-[1200px] max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={focused}
              alt={`${work.title} ${groups[focus[0]].label}`}
              className="block max-h-[80vh] max-w-full w-auto h-auto object-contain shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
            />
            <div className="mt-3 flex items-center gap-4">
              <span className="note type text-[11px] text-[#e7e2d4]/70">
                {groups[focus[0]].label}
              </span>
              {total > 1 ? (
                <span className="hand type text-[11px] text-[#e7e2d4]/50">
                  {focusedNumber} / {total}
                </span>
              ) : null}
            </div>
          </div>

          {total > 1 ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="上一张"
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#fbf9f1]/90 border border-[#ded8c6] hand text-marker text-[17px]"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="下一张"
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#fbf9f1]/90 border border-[#ded8c6] hand text-marker text-[17px]"
              >
                →
              </button>
            </>
          ) : null}

          <button
            onClick={() => setFocus(null)}
            aria-label="关闭"
            className="absolute right-3 top-3 md:right-6 md:top-6 w-9 h-9 flex items-center justify-center hand text-[#e7e2d4]/70 hover:text-[#e7e2d4] text-[16px] border border-[#e7e2d4]/30"
          >
            ✕
          </button>
        </div>
      ) : null}
    </div>
  );
}
