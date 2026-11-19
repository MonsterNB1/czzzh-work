"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { animationOrder, videoOrder, works } from "@/data/works";
import { designOrder, designs } from "@/data/designs";

type Item = {
  title: string;
  cover?: string;
  slug?: string;
  en?: string;
  desc?: string;
  meta?: string[];
  shape?: "portrait" | "landscape";
  /** some sections open on their own page instead of the TV room */
  href?: string;
  /** explicit narrow-screen variant of the cover */
  thumb?: string;
  /** replaces "打开电视 · 播放" when the entry opens onto something other than a player */
  cta?: string;
};

type Section = {
  key: string;
  title: string;
  en: string;
  groups: { label?: string; items: Item[] }[];
};

// the films read top to bottom in animationOrder, each carrying its own blurb
const animationItems: Item[] = animationOrder.map((slug) => {
  const w = works[slug];
  return {
    title: w.title,
    cover: w.cover,
    slug: w.slug,
    en: w.en,
    desc: w.desc,
    meta: w.meta,
    shape: w.shape,
  };
});

// the clips read top to bottom in videoOrder, same shape as the films
const videoItems: Item[] = videoOrder.map((slug) => {
  const w = works[slug];
  return {
    title: w.title,
    cover: w.cover,
    slug: w.slug,
    en: w.en,
    desc: w.desc,
    meta: w.meta,
    shape: w.shape,
    cta: w.wall ? "看封面墙" : undefined,
  };
});

const designItems: (Item & { group: string })[] = designOrder.map((slug) => {  const d = designs[slug];
  return {
    title: d.title,
    cover: d.cover,
    en: d.en,
    desc: d.desc,
    meta: d.meta,
    shape: d.shape,
    group: d.group,
    thumb: d.thumb,
    href: `/works/design/${d.slug}`,
  };
});

const sections: Section[] = [
  {
    key: "animation",
    title: "动画",
    en: "Animation",
    groups: [{ items: animationItems }],
  },
  {
    key: "design",
    title: "设计",
    en: "Design",
    groups: [
      { label: "游戏项目", items: designItems.filter((it) => it.group === "游戏项目") },
      { label: "其他项目", items: designItems.filter((it) => it.group === "其他项目") },
    ],
  },
  {
    key: "video",
    title: "视频",
    en: "Video",
    groups: [{ items: videoItems }],
  },
  {
    key: "aigc",
    title: "AIGC",
    en: "Generative",
    groups: [{ items: [{ title: "河神纪元 · 角色" }, { title: "河神纪元 · 地图" }] }],
  },
];

/** the film index: a vertical cover on the left, blurb and play button on the right */
function AnimationIndex({
  items,
  open,
  mode,
}: {
  items: Item[];
  open: (e: React.MouseEvent, it: Item) => void;
  mode: "phone" | "desktop";
}) {
  return (
    <div className="mt-7 md:mt-11 space-y-6 md:space-y-9">
      {items.map((it, i) => (
        <Link
          key={it.slug ?? it.title}
          href={it.slug ? `/works/${it.slug}` : "#"}
          onClick={(e) => open(e, it)}
          className={`group flex gap-4 md:gap-7 items-start ${it.slug ? "cursor-pointer" : "cursor-default"}`}
        >
          <div className="shrink-0 w-[116px] md:w-[232px] flex justify-start">
            <div
              className={`relative bg-[#fbf9f1] shadow-[0_14px_26px_-14px_rgba(60,45,25,0.6)] transition-transform duration-300 ease-out group-hover:-translate-y-1 ${
                it.shape === "portrait"
                  ? "w-[92px] md:w-[158px] p-[5px] pb-[20px] md:p-2 md:pb-[26px]"
                  : "w-full p-[5px] pb-[16px] md:p-[7px] md:pb-[22px]"
              }`}
              style={{ rotate: `${[-1.6, 1.2, -0.9, 1.4][i % 4]}deg` }}
            >
              <span
                className="tape -top-2 left-1/2 -translate-x-1/2 rotate-[-2deg]"
                style={{ width: 44, height: 12 }}
              />
              <div className={`bg-[#f1eee3] border border-[#e2dccb] flex items-center justify-center overflow-hidden ${
                it.shape === "portrait" ? "aspect-[3/4]" : "aspect-[16/9]"
              }`}>
                {it.cover ? (
                  <picture className="block w-full h-full">
                    {mode === "phone" ? (
                      <source media="(max-width: 767px)" srcSet={it.cover.replace(".webp", "-400.webp")} />
                    ) : (
                      <source media="(min-width: 768px)" srcSet={it.cover} />
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/blank.svg"
                      alt={it.title}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="block w-full h-full object-contain"
                    />
                  </picture>
                ) : null}
              </div>
              <div className="hand type text-[10px] md:text-[11px] text-marker leading-none text-center absolute left-1 right-1 bottom-[6px] md:bottom-[8px]">
                NO.{i + 1}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h2 className="hand text-[22px] md:text-[28px] font-bold text-ink-blue leading-none">
                {it.title}
              </h2>
              <span className="note type text-[11px] md:text-[12.5px] text-[#6f6f66]">{it.en}</span>
            </div>
            <p className="note text-[12px] md:text-[13.5px] leading-[1.65] text-[#2f2f2c] mt-2">
              {it.desc}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
              {it.meta?.map((m) => (
                <span key={m} className="note text-[10px] md:text-[11px] text-[#7d7d73]">
                  · {m}
                </span>
              ))}
            </div>
            <div className="mt-3.5 flex justify-end">
            <span className="inline-flex items-center gap-1.5 hand text-[12px] md:text-[13px] text-marker border-b-2 border-marker/30 pb-0.5 transition-colors group-hover:border-marker group-hover:text-[#a52a2c]">
              <span
                className="inline-block w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-current"
                aria-hidden
              />
              {it.cta ?? (
                <>
                  打开电视<span className="zh"> · </span>播放
                </>
              )}
            </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

const TABS_DROP = 30; // idle cards dip down; the active one is pulled back up

export default function WorksPage() {
  const [active, setActive] = useState(0);
  const current = sections[active];
  const router = useRouter();

  // leaving the notebook: the room goes dark, then the TV lights up
  const [leaving, setLeaving] = useState(false);

  const navTimer = useRef<number | null>(null);


  // the dark overlay must never survive a navigation: drop it after the push
  // and also whenever the browser restores this page (back / forward / bfcache)
  useEffect(() => {
    const cancel = () => {
      if (navTimer.current) {
        window.clearTimeout(navTimer.current);
        navTimer.current = null;
      }
      setLeaving(false);
    };
    window.addEventListener("popstate", cancel);
    window.addEventListener("pageshow", cancel);
    return () => {
      window.removeEventListener("popstate", cancel);
      window.removeEventListener("pageshow", cancel);
    };
  }, []);

  const open = (e: React.MouseEvent, it: Item) => {
    const href = it.href ?? (it.slug ? `/works/${it.slug}` : undefined);
    if (!href) return;
    e.preventDefault();
    setLeaving(true);
    navTimer.current = window.setTimeout(() => router.push(href), 520);
    window.setTimeout(() => setLeaving(false), 1500);
  };

  return (
    <>
      {/* =================== phone / narrow screens =================== */}
      <div className="md:hidden grid-bg min-h-screen px-4 pt-24 pb-16 page-type">
        {/* the four tabs become a row of paper tabs across the top */}
        <div className="flex gap-2 justify-center">
          {sections.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setActive(i)}
              className={`hand zh px-3 py-2.5 text-[13px] leading-none bg-[#fbf9f1] shadow-[0_6px_14px_-8px_rgba(60,45,25,0.5)] transition-transform ${
                i === active
                  ? "text-marker -translate-y-1.5 border-b-2 border-marker"
                  : "text-[#5c5c5c] rotate-[0.6deg]"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div key={current.key} className="mt-5 bg-[#f9faf5] border border-[#e6e0cf] shadow-[0_18px_40px_-20px_rgba(60,45,25,0.45)] px-4 pt-8 pb-10 sheet-content">
          <div className="flex items-baseline justify-center gap-2.5">
            <h1 className="hand text-[34px] font-bold text-ink-blue leading-none">{current.title}</h1>
            <span className="note type text-[11px] text-[#6f6f66]">{current.en}</span>
          </div>

          {current.key === "animation" || current.key === "video" ? (
            <AnimationIndex items={current.groups[0].items} open={open} mode="phone" />
          ) : (
          <div className="mt-7 space-y-8">
            {current.groups.map((g, gi) => (
              <div key={gi}>
                {g.label && (
                  <div className="hand text-[12px] text-marker mb-2.5">{g.label}</div>
                )}
                <div className="grid grid-cols-2 gap-x-3 gap-y-5 items-start">
                  {g.items.map((it, idx) => (
                    <Link
                      key={it.title}
                      href={it.href ?? (it.slug ? `/works/${it.slug}` : "#")}
                      onClick={(e) => open(e, it)}
                      className={`group block ${it.href || it.slug ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div
                        className="polaroid-card"
                        style={{ rotate: `${[-2.5, 1.8, -1.2, 2.2, -1.6][idx % 5]}deg` }}
                      >
                        {it.cover ? (
                          <picture className="block w-full">
                            <source
                              media="(max-width: 767px)"
                              srcSet={it.thumb ?? it.cover.replace(".webp", "-400.webp")}
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/assets/blank.svg"
                              alt={it.title}
                              loading={gi === 0 && idx < 4 ? "eager" : "lazy"}
                              decoding="async"
                              className="block w-full h-auto"
                            />
                          </picture>
                        ) : (
                          <div className="w-full aspect-[4/3] bg-[#cfccc1]" />
                        )}
                        <div className="hand text-[10px] text-marker leading-tight text-center absolute left-1 right-1 bottom-[7px]">
                          {it.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          )}

        </div>

        <Link href="/" className="mt-8 flex items-center gap-2 note text-[13px] text-ink-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/scrapbook/arrow-red.webp" alt="" className="h-6 w-auto rotate-180" />
          回到首页
        </Link>

        <div className="mt-14 flex justify-between note text-[12px] text-ink-soft">
          <span className="type">© 2026 Czzzh</span>
          <span className="type">Hangzhou -- China</span>
        </div>
      </div>

      {/* =================== tablet and up: the standing notebook =================== */}
      <div
        className="hidden md:block grid-bg fixed inset-0 overflow-hidden page-type"
        style={{ "--wb": "min(calc(100vw - 32px), 1280px)" } as React.CSSProperties}
      >
      {/* ===== the notebook: rotates 90° clockwise into the standing view ===== */}
      <div className="absolute left-1/2 top-0 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 mt-[88px] pointer-events-none">
        <div className="book-rotate">
          <picture className="block w-full">
            <source media="(min-width: 768px)" srcSet="/assets/scrapbook/notebook-open.webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/blank.svg"
              alt=""
              width={1888}
              height={971}
              className="w-full h-auto block"
              fetchPriority="high"
              draggable={false}
            />
          </picture>
        </div>
      </div>

      {/* ===== index tabs: dropped half, active card pulled back up ===== */}
      <div
        className="absolute z-10 flex gap-5"
        style={{
          right: "calc(50vw - 0.3675 * var(--wb) + 15px)",
          top: "calc(88px + 0.068 * var(--wb) + " + TABS_DROP + "px)",
        }}
      >
        {sections.map((s, i) => (
          <div
            key={s.key}
            className="transition-transform duration-300 ease-out"
            style={{
              transform: i === active ? `translateY(-${TABS_DROP}px)` : "none",
              zIndex: i === active ? 2 : 1,
            }}
          >
            <button
              onClick={() => setActive(i)}
              className={`tab-card ${i === active ? "tab-card-active" : ""}`}
              style={{ animationDelay: `${1.0 + i * 0.05}s` }}
            >
              <span className="note zh text-[11px] text-[#5c5c5c]">{s.title}</span>
            </button>
          </div>
        ))}
      </div>

      {/* ===== the white sheet ===== */}
      <div
        className="absolute z-20 overflow-y-auto sheet-paper"
        style={{
          left: "calc(50vw - 0.3675 * var(--wb))",
          width: "calc(0.735 * var(--wb))",
          top: "calc(88px + 0.141 * var(--wb))",
          bottom: "0",
        }}
      >
        <div key={current.key} className="pt-16 pb-28 px-16 sheet-content mx-auto max-w-[820px]">
          {/* category as the page title */}
          <div className="flex items-baseline justify-center gap-3">
            <h1 className="hand text-5xl sm:text-6xl font-bold text-ink-blue">{current.title}</h1>
            <span className="note type text-[13px] text-[#6f6f66]">{current.en}</span>
          </div>

          {current.key === "animation" || current.key === "video" ? (
            <AnimationIndex items={current.groups[0].items} open={open} mode="desktop" />
          ) : (
          <div className="mt-14 space-y-12">
            {current.groups.map((g, gi) => (
              <div key={gi}>
                <div className="grid grid-cols-3 gap-x-5 gap-y-8 items-start justify-items-start">
                  {g.label && (
                    <div className="col-span-3 hand text-[15px] text-marker mb-1 text-left">
                      {g.label}
                    </div>
                  )}
                  {g.items.map((it, idx) => (
                    <Link
                      key={it.title}
                      href={it.href ?? (it.slug ? `/works/${it.slug}` : "#")}
                      onClick={(e) => open(e, it)}
                      className={`group w-full ${it.href || it.slug ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div
                        className="polaroid-card"
                        style={{ rotate: `${[-2.5, 1.8, -1.2, 2.2, -1.6][idx % 5]}deg` }}
                      >
                        {it.cover ? (
                          <picture className="block w-full">
                            <source media="(min-width: 768px)" srcSet={it.cover} />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/assets/blank.svg"
                              alt={it.title}
                              loading={gi === 0 && idx < 3 ? "eager" : "lazy"}
                              decoding="async"
                              className="block w-full h-auto"
                            />
                          </picture>
                        ) : (
                          <div className="w-full aspect-[4/3] bg-[#cfccc1]" />
                        )}
                        <div className="hand text-[10px] text-marker leading-tight text-center absolute left-1 right-1 bottom-[9px]">
                          {it.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          )}

        </div>
      </div>


      {/* back arrow */}
      <Link
        href="/"
        className="absolute z-30 hidden md:block group arrow-in"
        style={{ left: "5%", bottom: "6%" }}
      >
        <img
          src="/assets/scrapbook/arrow-red.webp"
          alt="back"
          className="h-8 w-auto photo-shadow group-hover:-translate-x-1 transition-transform"
        />
      </Link>
      </div>

      {/* ===== lights out: one shared overlay for both layouts ===== */}
      {leaving && <div className="lights-out fixed inset-0 z-[90] pointer-events-none bg-[#0a0a09]" />}
    </>
  );
}
