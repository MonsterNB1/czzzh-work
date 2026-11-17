"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Item = { title: string; cover?: string; slug?: string };

type Section = {
  key: string;
  title: string;
  en: string;
  groups: { label?: string; items: Item[] }[];
};

const sections: Section[] = [
  {
    key: "animation",
    title: "动画",
    en: "Animation",
    groups: [
      {
        items: [
          { title: "怪兽小馆 国创动画", cover: "/assets/works/monster-diner.png", slug: "monster_diner" },
          { title: "Bottle 原创动画", cover: "/assets/works/bottle.png", slug: "bottle" },
          { title: "挂画 戏曲动画", cover: "/assets/works/gua-hua.png", slug: "guahua" },
          { title: "瓦猫 定格动画", cover: "/assets/works/wamiao.png", slug: "wamao" },
        ],
      },
    ],
  },
  {
    key: "design",
    title: "设计",
    en: "Design",
    groups: [
      {
        label: "游戏项目",
        items: [
          { title: "《驱逐虚空》" },
          { title: "SNK" },
          { title: "小冰冰传奇" },
          { title: "蔚蓝档案" },
          { title: "仙境传说 3" },
        ],
      },
      { label: "其他项目", items: [{ title: "剧本宣发系列" }] },
    ],
  },
  {
    key: "video",
    title: "视频",
    en: "Video",
    groups: [
      {
        items: [
          { title: "中国日报 · 起底工作室" },
          { title: "绿城 · 江澜鸣翠" },
          { title: "阿里国际站采购节" },
          { title: "支付宝广告开场片" },
          { title: "中国美院毕业季" },
          { title: "美的智慧家" },
          { title: "阿里黑科技" },
        ],
      },
    ],
  },
  {
    key: "aigc",
    title: "AIGC",
    en: "Generative",
    groups: [{ items: [{ title: "河神纪元 · 角色" }, { title: "河神纪元 · 地图" }] }],
  },
];

const TABS_DROP = 30; // idle cards dip down; the active one is pulled back up

export default function WorksPage() {
  const [active, setActive] = useState(0);
  const current = sections[active];
  const router = useRouter();

  // leaving the notebook: the room goes dark, then the TV lights up
  const [leaving, setLeaving] = useState(false);

  const open = (e: React.MouseEvent, it: Item) => {
    if (!it.slug) return;
    e.preventDefault();
    setLeaving(true);
    window.setTimeout(() => router.push(`/works/${it.slug}`), 520);
  };

  return (
    <div
      className="grid-bg fixed inset-0 overflow-hidden"
      style={{ "--wb": "min(calc(100vw - 32px), 1280px)" } as React.CSSProperties}
    >
      {/* ===== the notebook: rotates 90° clockwise into the standing view ===== */}
      <div className="absolute left-1/2 top-0 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 mt-[88px] pointer-events-none">
        <div className="book-rotate">
          <img
            src="/assets/scrapbook/notebook-open.png"
            alt=""
            className="w-full h-auto block"
            draggable={false}
          />
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
              <span className="note text-[11px] text-[#5c5c5c]">{s.title}</span>
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
            <span className="note text-[13px] text-[#8a8a80]">{current.en}</span>
          </div>

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
                      href={it.slug ? `/works/${it.slug}` : "#"}
                      onClick={(e) => open(e, it)}
                      className={`group w-full ${it.slug ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div
                        className="polaroid-card"
                        style={{ rotate: `${[-2.5, 1.8, -1.2, 2.2, -1.6][idx % 5]}deg` }}
                      >
                        {it.cover ? (
                          <img src={it.cover} alt={it.title} className="block w-full h-auto" />
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
        </div>
      </div>

      {/* ===== lights out ===== */}
      {leaving && <div className="lights-out fixed inset-0 z-[90] pointer-events-none bg-[#0a0a09]" />}

      {/* back arrow */}
      <Link
        href="/"
        className="absolute z-30 hidden md:block group arrow-in"
        style={{ left: "5%", bottom: "6%" }}
      >
        <img
          src="/assets/scrapbook/arrow-red.png"
          alt="back"
          className="h-8 w-auto photo-shadow group-hover:-translate-x-1 transition-transform"
        />
      </Link>
    </div>
  );
}
