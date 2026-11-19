"use client";

import Link from "next/link";
import type { WorkData } from "@/data/works";

/**
 * The wall: for a series that never lived on our own storage. No TV, no player —
 * the covers are the work, so they get pinned up as a masonry of polaroids and
 * the year's whole output drifts past underneath.
 */
export default function WorkWall({ work }: { work: WorkData }) {
  const wall = work.wall;
  if (!wall) return null;

  const tilts = [-1.6, 1.2, -0.9, 1.5, -1.2, 0.8];

  return (
    <div className="grid-bg min-h-screen">
      {/* this page scrolls, so the fixed nav gets the paper fading out behind it */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[84px] bg-gradient-to-b from-[#f5f1e6] via-[#f5f1e6]/85 to-transparent md:h-[100px]" />

      <Link
        href="/works"
        className="fixed z-40 group top-[66px] left-4 md:absolute md:top-[7%] md:left-[3.2%]"
        aria-label="回到作品页"
      >        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/scrapbook/arrow-red.webp"
          alt=""
          className="h-7 w-auto rotate-180 transition-transform group-hover:-translate-x-1 md:h-8"
        />
      </Link>

      <main className="mx-auto w-full max-w-[1180px] px-5 pt-24 pb-16 md:px-8 md:pt-24 md:pb-20">
        {/* the header note, pinned like everything else on this site */}
        <div className="relative inline-block max-w-full bg-[#fbf9f1] px-4 py-3.5 shadow-[0_16px_30px_-16px_rgba(60,45,25,0.6)] rotate-[-0.6deg] md:px-5 md:py-4">
          <span className="tape -top-3 left-6 -rotate-3" style={{ width: 52, height: 14 }} />
          <p className="note type text-[10px] md:text-[11px] text-[#7d7d73]">{work.en}</p>
          <h1 className="zh mt-1 text-[22px] leading-tight text-ink-blue md:text-[28px]">
            {work.title}
          </h1>
          <p className="note mt-2 max-w-[520px] text-[11.5px] leading-[1.7] text-[#2f2f2c] md:text-[13px]">
            {work.desc}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
            {work.meta.map((m) => (
              <span key={m} className="note text-[10px] text-[#7d7d73] md:text-[11px]">
                · {m}
              </span>
            ))}
          </div>
          {work.external ? (
            <a
              href={work.external}
              target="_blank"
              rel="noopener noreferrer"
              className="note mt-2 inline-block text-[11px] text-marker underline decoration-dotted underline-offset-4 hover:text-[#a52a2c]"
            >
              去 B 站看这个栏目 →
            </a>
          ) : null}
        </div>

        {/* four finished covers, laid out like a row of feed cards */}
        <div className="mt-10 grid grid-cols-2 gap-x-3.5 gap-y-6 md:mt-12 md:grid-cols-4 md:gap-x-6 md:gap-y-8">
          {wall.covers.map((c, i) => (
            <figure
              key={c.img}
              className={i % 2 === 1 ? "md:translate-y-6" : ""}
            >
              <div
                className="polaroid-card group relative block"
                style={{ rotate: `${tilts[i % tilts.length]}deg`, paddingBottom: 11 }}
              >
                <span className="tape -top-2.5 left-1/2 -translate-x-1/2 -rotate-2" style={{ width: 46, height: 12 }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  srcSet={`${c.thumb} 400w, ${c.img} 900w`}
                  sizes="(max-width: 767px) 45vw, 270px"
                  alt={c.caption}
                  width={900}
                  height={1260}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
                {/* the film itself lives on the platform that published it */}
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.caption} — 去${c.platform ?? "原片"}看`}
                    className="absolute inset-0 z-10 flex items-center justify-center outline-none"
                  >
                    <span className="pointer-events-none absolute inset-0 bg-[rgba(20,18,14,0.42)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    <span className="pointer-events-none relative flex items-center gap-1.5 rounded-full bg-[#fbf9f1]/95 px-3.5 py-1.5 text-[10.5px] tracking-wide text-[#2f2f2c] opacity-0 shadow-[0_8px_18px_-8px_rgba(40,30,20,0.6)] transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:scale-105 md:text-[11.5px]">
                      <i className="inline-block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-[#f25d8e]" aria-hidden />
                      播放 · {c.platform ?? "原片"} ↗
                    </span>
                  </a>
                ) : null}
                <figcaption className="hand mt-1.5 text-[9.5px] leading-[1.25] text-[#4a4a44] md:text-[10.5px]">
                  {c.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* the year's output, drifting */}
        {wall.strip ? (
          <section className="mt-12 md:mt-16">
            <p className="note text-[11px] text-[#7d7d73] md:text-[12px]">
              {wall.stripNote ?? "全部封面"}
            </p>
            <div className="qidi-window relative mt-3 h-[460px] overflow-hidden border border-[#ddd6c4] bg-[#f2eee0] md:h-[620px]">
              <div className="qidi-drift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wall.strip}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto"
                />
                {/* second copy so the drift can loop without a seam */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wall.strip}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#f2eee0] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#f2eee0] to-transparent" />
            </div>
          </section>
        ) : null}

        <p className="note mt-8 text-[11px] leading-[1.7] text-[#7d7d73] md:text-[12px]">
          点开封面直接跳到原片。片子发布在 B 站和微信公众号，站内不做存档。
        </p>
      </main>
    </div>
  );
}
