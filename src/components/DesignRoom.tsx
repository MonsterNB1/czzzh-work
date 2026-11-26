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
      : cols === 2
        ? "grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 items-start"
        : "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 items-start";

/** a design project is a sheet on the table: brief, numbers, then the plates */
export default function DesignRoom({ work }: { work: DesignData }) {
  const hero = work.hero ?? work.cover;

  // the plates, minus the case where the only plate is the hero already pinned at the top
  const rawGroups = work.plates?.length
    ? work.plates
    : work.cover && work.cover !== hero
      ? [{ label: "作品", shots: [work.cover] }]
      : [];
  const groups =
    rawGroups.length === 1 && rawGroups[0].shots.length === 1 && rawGroups[0].shots[0] === hero
      ? []
      : rawGroups;

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

        <div className="mt-5 min-h-[calc(100vh-9rem)] bg-[#fbf9f1] border border-[#e6e0cf] shadow-[0_26px_64px_-30px_rgba(60,45,25,0.55)] px-5 pt-6 pb-8 rotate-[-0.3deg] md:min-h-[calc(100vh-13rem)] md:px-10 md:pt-9 md:pb-10">
          {/* ===== the printed key visual, pinned on the sheet ===== */}
          {hero ? (
            <figure className="relative w-fit max-w-full mx-auto bg-white p-[5px] shadow-[0_16px_30px_-18px_rgba(60,45,25,0.65)] -rotate-[0.5deg] outline outline-1 outline-[#efe9d8] md:p-2 md:-rotate-[0.8deg]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero}
                srcSet={work.heroSmall ? `${work.heroSmall} 1280w, ${hero} 2880w` : undefined}
                sizes={work.heroSmall ? "(min-width: 1024px) 62vw, 94vw" : undefined}
                alt={`${work.title} 主视觉`}
                className="block w-auto max-w-full mx-auto h-auto max-h-[440px] md:max-h-[600px] object-contain"
              />
              <span className="tape absolute -top-2 left-8 rotate-[-3deg]" />
              <span className="tape absolute -top-2 right-10 rotate-[4deg]" />
              {work.heroNote ? (
                <figcaption className="mt-1 flex justify-end pr-0.5">
                  <span className="note text-[9px] md:text-[10px] text-[#8f8a7c]">{work.heroNote}</span>
                </figcaption>
              ) : null}
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

          {/* ===== 关键词：两圈叠在一起，交叉的那块才是题 ===== */}
          {work.keywords ? (
            <section className="mt-9">
              <div className="flex items-center gap-2 mb-2">
                <span className="hand text-[13px] md:text-[15px] text-marker leading-none">关键词提取</span>
                <span className="flex-1 h-px bg-[#e4dfd0]" />
              </div>
              <p className="note text-[11px] md:text-[12px] leading-relaxed text-[#8b8779]">
                左边是人物，右边是街，两圈叠住的那块才是这张 KV 的题。
              </p>

              <div className="relative mt-4 w-full aspect-[100/62]">
                <div className="absolute left-0 md:left-[1%] top-1/2 -translate-y-1/2 w-[58%] aspect-square rounded-full border border-[#d8d0ba] bg-[#f2e7cf]/55" />
                <div className="absolute right-0 md:right-[1%] top-1/2 -translate-y-1/2 w-[58%] aspect-square rounded-full border border-[#d8d0ba] bg-[#e3eae4]/55" />

                {work.keywords.leftLabel ? (
                  <span className="absolute left-[10%] top-[19%] hand text-[10px] md:text-[11.5px] text-[#a39d8d] leading-none">
                    {work.keywords.leftLabel}
                  </span>
                ) : null}
                {work.keywords.rightLabel ? (
                  <span className="absolute right-[10%] top-[19%] hand text-[10px] md:text-[11.5px] text-[#a39d8d] leading-none">
                    {work.keywords.rightLabel}
                  </span>
                ) : null}

                <ul className="absolute left-[8%] top-[31%] bottom-[31%] w-[27%] flex flex-col justify-between text-left">
                  {work.keywords.left.map((w) => (
                    <li key={w} className="note text-[11px] md:text-[14.5px] leading-[1.2] text-[#3f3f39]">
                      {w}
                    </li>
                  ))}
                </ul>

                <ul className="absolute right-[8%] top-[31%] bottom-[31%] w-[27%] flex flex-col justify-between text-right">
                  {work.keywords.right.map((w) => (
                    <li key={w} className="note text-[11px] md:text-[14.5px] leading-[1.2] text-[#3f3f39]">
                      {w}
                    </li>
                  ))}
                </ul>

                <ul className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24%] md:w-[20%] space-y-1.5 md:space-y-2 text-center">
                  {work.keywords.cross.map((w, i) => (
                    <li
                      key={w}
                      className={`hand leading-[1.2] ${
                        i === 0
                          ? "text-[14px] md:text-[18px] text-marker"
                          : "text-[10px] md:text-[12px] text-[#6f6a5e]"
                      }`}
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {/* ===== 黑白稿：上色前，线稿和明暗各走一遍 ===== */}
          {work.mono?.shots.length ? (
            <section className="mt-9">
              <div className="flex items-center gap-2 mb-2">
                <span className="hand text-[13px] md:text-[15px] text-marker leading-none">黑白稿</span>
                <span className="hand type text-[10px] text-[#a8a49a]">{work.mono.shots.length}</span>
                <span className="flex-1 h-px bg-[#e4dfd0]" />
                <span className="note text-[10px] md:text-[11px] text-[#8b8779]">上色前的结构</span>
              </div>
              {work.mono.intro ? (
                <p className="note text-[11px] md:text-[12px] leading-relaxed text-[#8b8779]">
                  {work.mono.intro}
                </p>
              ) : null}

              <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
                {work.mono.shots.map((m, i) => (
                  <figure key={m.label}>
                    <button
                      onClick={() => setBoard(m.image)}
                      className="block w-full bg-white p-[4px] md:p-[5px] border border-[#e8e3d4] shadow-[0_12px_26px_-20px_rgba(60,45,25,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.image.replace(/\.webp$/, "-800.webp")}
                        srcSet={`${m.image.replace(/\.webp$/, "-800.webp")} 800w, ${m.image} 1600w`}
                        sizes="(min-width: 768px) 46vw, 92vw"
                        alt={`${work.title} 黑白稿 ${i + 1} ${m.label}`}
                        width={1600}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="block w-full h-auto"
                      />
                    </button>
                    <figcaption className="mt-2 flex items-start gap-2">
                      <span className="hand text-[11px] md:text-[12px] text-marker leading-none mt-[3px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="hand text-[12px] md:text-[13px] text-[#2f2f2c] leading-none">
                          {m.label}
                        </div>
                        <p className="note text-[10.5px] md:text-[11.5px] text-[#8b8779] leading-[1.6] mt-1">
                          {m.note}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {/* ===== 过程稿：从层结构倒推的四步合成 ===== */}
          {work.steps?.length ? (
            <section className="mt-9">
              <div className="flex items-center gap-2 mb-2">
                <span className="hand text-[13px] md:text-[15px] text-marker leading-none">过程稿</span>
                <span className="hand type text-[10px] text-[#a8a49a]">{work.steps.length}</span>
                <span className="flex-1 h-px bg-[#e4dfd0]" />
                <span className="note text-[10px] md:text-[11px] text-[#8b8779]">逐组打开，04 就是页首那张定稿</span>
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
                {work.steps.map((st, i) => (
                  <figure key={st.label}>
                    <button
                      onClick={() => setBoard(st.shot)}
                      className="block w-full bg-white p-[4px] md:p-[5px] border border-[#e8e3d4] shadow-[0_12px_26px_-20px_rgba(60,45,25,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={st.shot.replace(/\.webp$/, "-800.webp")}
                        srcSet={`${st.shot.replace(/\.webp$/, "-800.webp")} 800w, ${st.shot} 1600w`}
                        sizes="(min-width: 768px) 46vw, 92vw"
                        alt={`${work.title} 过程稿 ${i + 1} ${st.label}`}
                        width={1600}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="block w-full h-auto"
                      />
                    </button>
                    <figcaption className="mt-2 flex items-start gap-2">
                      <span className="hand text-[11px] md:text-[12px] text-marker leading-none mt-[3px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="hand text-[12px] md:text-[13px] text-[#2f2f2c] leading-none">
                          {st.label}
                        </div>
                        <p className="note text-[10.5px] md:text-[11.5px] text-[#8b8779] leading-[1.6] mt-1">
                          {st.note}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {/* ===== 字标：夜里单独亮出来的一块牌 ===== */}
          {work.slogan ? (
            <section className="mt-10 -mx-5 md:-mx-10">
              <div className="relative bg-[#16120f] border-y border-[#2b241c] px-4 py-7 md:px-9 md:py-9 overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.7) 0 1px, transparent 1px 3px)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="hand text-[12px] md:text-[13px] text-[#e8d9ae] leading-none">SLOGAN</span>
                    <span className="flex-1 h-px bg-[#3a3128]" />
                    <span className="hand type text-[9.5px] md:text-[10px] text-[#7d7365]">定稿字标</span>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={work.slogan.image}
                    alt={work.slogan.headline}
                    width={2000}
                    height={733}
                    loading="lazy"
                    decoding="async"
                    className="block mx-auto mt-5 w-full max-w-[600px] h-auto"
                  />

                  {work.slogan.line ? (
                    <p className="note mt-4 text-center text-[10.5px] md:text-[12px] text-[#cdbfa0] leading-[1.8]">
                      {work.slogan.line}
                    </p>
                  ) : null}

                  {work.slogan.variants?.length ? (
                    <>
                      <div className="mt-7 flex items-center gap-2">
                        <span className="hand text-[11px] md:text-[12px] text-[#a99c7f] leading-none">换掉的几稿</span>
                        <span className="flex-1 h-px bg-[#332c24]" />
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
                        {work.slogan.variants.map((v) => (
                          <div key={v.title}>
                            <div className="flex h-[86px] md:h-[112px] items-center justify-center bg-[#0e0c0a] border border-[#2e261d] p-1.5 md:p-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={v.image.replace(/\.webp$/, "-600.webp")}
                                alt={`${work.title} 字标 ${v.title}`}
                                loading="lazy"
                                decoding="async"
                                className="block max-h-full max-w-full w-auto h-auto opacity-85"
                              />
                            </div>
                            <div className="note mt-1.5 text-[10px] md:text-[11px] text-[#a2967f] leading-[1.4]">
                              {v.title}
                            </div>
                            <div className="hand text-[9px] md:text-[10px] text-[#6b6156] leading-none mt-1">
                              {v.note}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {work.slogan.note ? (
                    <p className="note mt-6 max-w-[52ch] text-[11px] md:text-[12px] leading-[1.75] text-[#948a7b]">
                      {work.slogan.note}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
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
            hero ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="hand text-[13px] md:text-[15px] text-marker whitespace-nowrap">主视觉</span>
                <span className="hidden h-px bg-[#e4dfd0] md:block md:flex-1" />
                <span className="note text-[10.5px] leading-relaxed text-[#8b8779] md:text-[11px]">
                  这一项只有一张主视觉，上面那版就是完整原稿
                </span>
              </div>
            ) : (
              <div className="mt-6 aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-[#f4f1e7] border border-[#e8e3d4]">
                <span className="note text-[13px] text-[#8b8779]">这一页还在整理</span>
              </div>
            )
          ) : (
            <div className="mt-8 space-y-9">
              {groups.map((g, gi) => (
                <div key={`${g.label}-${gi}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="hand text-[13px] md:text-[15px] text-marker">{g.label}</span>
                    <span className="hand type text-[10px] text-[#a8a49a]">{g.shots.length}</span>
                    <span className="flex-1 h-px bg-[#e4dfd0]" />
                    {g.more ? (
                      <Link
                        href={g.more.href}
                        className="group hand text-[11px] md:text-[12px] text-marker hover:underline underline-offset-4"
                      >
                        {g.more.label}
                        <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                      </Link>
                    ) : null}
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
                          className="block w-full h-auto"
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
            alt={`${work.title} 大图`}
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
