"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DesignData } from "@/data/designs";

const thumbOf = (src: string) => src.replace(/\.webp$/, "-600.webp");

/** plate grids: posters run 2–3 across, small assets 4 or 6 */
const gridClass = (cols: number = 3) =>
  cols >= 6
    ? "grid grid-cols-4 gap-2 md:grid-cols-6 md:gap-3 items-start"
    : cols === 4
      ? "grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3 items-start"
      : "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 items-start";

/** a design project is a sheet on the table: brief, numbers, then the plates */
export default function DesignRoom({ work }: { work: DesignData }) {
  const hero = work.hero ?? work.cover;

  const groups = work.plates?.length
    ? work.plates
    : work.cover
      ? [{ label: "作品", shots: [work.cover] }]
      : [];

  // the plate being looked at up close, as [groupIndex, shotIndex]
  const [focus, setFocus] = useState<[number, number] | null>(null);
  // a ranking screenshot opened on its own
  const [board, setBoard] = useState<string | null>(null);

  const total = groups.length ? groups.reduce((n, g) => n + g.shots.length, 0) : 0;

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
      {/* this page scrolls a long way, so keep the fixed nav readable */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[70px] md:h-[92px]"
        style={{
          background:
            "linear-gradient(to bottom, #f5f1e6 0%, #f5f1e6 64%, rgba(245,241,230,0.86) 82%, rgba(245,241,230,0) 100%)",
        }}
      />
      <div className="mx-auto max-w-[1000px]">
        <Link href="/works" className="note text-[13px] text-ink-soft inline-flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/scrapbook/arrow-red.webp" alt="" className="h-6 w-auto rotate-180" />
          回作品集
        </Link>

        <div className="mt-5 bg-[#fbf9f1] border border-[#e6e0cf] shadow-[0_26px_64px_-30px_rgba(60,45,25,0.55)] px-5 pt-6 pb-8 rotate-[-0.3deg] md:px-10 md:pt-9 md:pb-10">
          {/* ===== the printed key visual, pinned on the sheet ===== */}
          {hero ? (
            <figure className="relative bg-white p-[5px] shadow-[0_16px_30px_-18px_rgba(60,45,25,0.65)] -rotate-[0.5deg] outline outline-1 outline-[#efe9d8] md:p-2 md:-rotate-[0.8deg]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero} alt={`${work.title} 主视觉`} className="block w-full h-auto" />
              <span className="tape absolute -top-2 left-8 rotate-[-3deg]" />
              <span className="tape absolute -top-2 right-10 rotate-[4deg]" />
            </figure>
          ) : null}

          {/* ===== title block ===== */}
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="hand text-[26px] md:text-[38px] font-bold text-ink-blue leading-none">
                  {work.title}
                </h1>
                {work.en ? (
                  <span className="note type text-[10.5px] md:text-[12px] text-[#7d7d73]">
                    {work.en}
                  </span>
                ) : null}
              </div>
              {work.sub ? (
                <p className="note text-[12px] md:text-[13.5px] text-[#3b3b36] mt-2">{work.sub}</p>
              ) : null}
            </div>
            {work.credit ? (
              <span className="hand text-[12px] md:text-[13px] text-marker">{work.credit}</span>
            ) : null}
          </div>

          {work.desc ? (
            <p className="note mt-3 text-[12.5px] md:text-[14px] leading-[1.75] text-[#2f2f2c] max-w-[62ch]">
              {work.desc}
            </p>
          ) : null}

          {/* ===== 项目 / 主题 / 定位 / 思路, hung on a cross ===== */}
          {work.brief?.length ? (
            <div className="relative mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-9 md:gap-y-7">
              <span className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#ded8c6]" />
              <span className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-[#ded8c6]" />
              {work.brief.map((item) => (
                <div key={item.label} className="relative">
                  <div className="hand text-[16px] md:text-[18px] text-marker leading-none mb-2.5">
                    {item.label}
                  </div>
                  <ul className="space-y-1">
                    {item.lines.map((line) => (
                      <li
                        key={line}
                        className="note text-[12px] md:text-[13px] leading-[1.75] text-[#4a4a44]"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {/* ===== the numbers, then where it shipped ===== */}
          {work.stats?.length || work.platforms?.length ? (
            <div className="mt-8 border-t border-dashed border-[#ded8c6] pt-5">
              {work.stats?.length ? (
                <>
                  <div className="hand text-[13px] text-marker leading-none">游戏宣发数据</div>
                  <div className="mt-3 flex flex-wrap gap-x-10 gap-y-4 md:gap-x-14">
                    {work.stats.map((st) => (
                      <div key={st.label} className="min-w-[86px]">
                        <div className="hand text-[26px] md:text-[32px] text-ink-blue leading-none">
                          {st.value}
                        </div>
                        <div className="note text-[10px] md:text-[11px] text-[#8b8779] mt-1.5">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              {work.platforms?.length ? (
                <>
                  <div className="hand text-[13px] text-marker leading-none mt-6">合作平台</div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {work.platforms.map((p) => (
                      <span
                        key={p}
                        className="note text-[10.5px] md:text-[11px] text-[#5f5f57] border border-[#e0dac8] bg-white/40 px-1.5 py-[4px] leading-none"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}

              {work.boards?.length ? (
                <>
                  <div className="hand text-[13px] text-marker leading-none mt-6">平台榜单</div>
                  <div className="mt-2.5 space-y-2">
                    {work.boards.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBoard(b)}
                        className="block w-full bg-white border border-[#e8e3d4] p-1.5 text-left shadow-[0_10px_24px_-18px_rgba(60,45,25,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={b}
                          alt={`${work.title} 平台榜单`}
                          loading="lazy"
                          decoding="async"
                          className="block w-full h-auto"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ) : null}

          {/* ===== the plates, one section per kind ===== */}
          {groups.length === 0 ? (
            <div className="mt-6 aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-[#f4f1e7] border border-[#e8e3d4]">
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
                  <div className={gridClass(g.cols)}>
                    {g.shots.map((s, si) => (
                      <button
                        key={s}
                        onClick={() => setFocus([gi, si])}
                        className="group relative block w-full break-inside-avoid text-left bg-white border border-[#e8e3d4] shadow-[0_10px_26px_-18px_rgba(60,45,25,0.6)] overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbOf(s)}
                          alt={`${work.title} ${g.label} ${si + 1}`}
                          loading="lazy"
                          decoding="async"
                          className={`block w-full h-auto object-cover object-top ${
                            (g.cols ?? 3) > 3
                              ? "max-h-[190px] md:max-h-[230px]"
                              : "max-h-[330px] md:max-h-[470px]"
                          }`}
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

      {/* ===== a ranking screenshot, full size ===== */}
      {board ? (
        <div
          className="fixed inset-0 z-50 bg-[#1b1714]/94 backdrop-blur-[2px] flex items-center justify-center p-4 md:p-10"
          onClick={() => setBoard(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={board}
            alt={`${work.title} 平台榜单`}
            className="block max-h-[85vh] max-w-full w-auto h-auto object-contain shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
          />
        </div>
      ) : null}

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
