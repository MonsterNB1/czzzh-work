"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const polaroids = [
  {
    title: "动画",
    en: "Animation",
    rot: -6,
    x: -260,
    y: -100,
    depth: 30,
    items: "怪兽小馆 · Bottle · 瓦猫 · 挂画",
    href: "/works/monster_diner",
  },
  {
    title: "设计",
    en: "Design",
    rot: 4,
    x: 260,
    y: -120,
    depth: 46,
    items: "海报 · 封面 · 宣发 · 周边",
    href: "/works/posters",
  },
  {
    title: "AIGC",
    en: "Generative",
    rot: 5,
    x: -250,
    y: 140,
    depth: 58,
    items: "河神纪元 · 角色 · 道具 · 地图",
    href: "/works/river_gods",
  },
  {
    title: "后期",
    en: "Post",
    rot: -4,
    x: 270,
    y: 150,
    depth: 40,
    items: "起底工作室 · 剪辑 · 调色 · 包装",
    href: "/works/media_unlocked",
  },
];

export default function WorksPage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div className="grid-bg relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 pt-28 pb-16">
      <div className="relative w-full max-w-5xl">
        <div className="ruled-bg relative rounded-[2px] px-8 py-16 sm:px-20 sm:py-20 shadow-[0_18px_50px_rgba(80,65,35,0.18)] min-h-[70vh]">
          <img
            src="/assets/scrapbook/rings.png"
            alt=""
            aria-hidden
            className="photo-shadow pointer-events-none absolute -right-8 top-1/2 h-[112%] -translate-y-1/2 hidden md:block"
          />
          <div className="pointer-events-none absolute -left-5 top-0 h-full w-5 rounded-l-sm bg-[#161412]/90 hidden md:block" />

          <div className="relative z-10 text-center">
            <h1 className="hand text-5xl sm:text-7xl font-bold text-marker">Works</h1>
            <p className="note mt-3 text-ink-soft">—— 夹在本子里的照片 ——</p>
          </div>

          {polaroids.map((p, i) => (
            <div
              key={p.title}
              className="absolute left-1/2 top-1/2 z-20 hidden md:block"
              style={{
                transform: `translate(calc(-50% + ${p.x + mouse.x * p.depth}px), calc(-50% + ${p.y + mouse.y * p.depth}px))`,
              }}
            >
              <Link href={p.href} className="group block">
                <div
                  className="drift relative"
                  style={{ ["--rot" as string]: `${p.rot}deg`, animationDelay: `${i * 0.7}s` }}
                >
                  <img
                    src="/assets/scrapbook/polaroid.png"
                    alt=""
                    className="photo-shadow relative w-44 h-auto"
                  />
                  <div className="absolute left-1/2 top-[34%] -translate-x-1/2 text-center w-full">
                    <div className="hand text-2xl font-bold text-ink-blue group-hover:text-marker transition-colors">
                      {p.title}
                    </div>
                    <div className="note text-[11px] text-ink-soft mt-1">{p.en}</div>
                  </div>
                  <div className="note absolute bottom-4 left-1/2 w-40 -translate-x-1/2 text-center text-[10px] leading-tight text-ink-soft">
                    {p.items}
                  </div>
                  <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* mobile list */}
      <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-4 md:hidden">
        {polaroids.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="rounded-sm border border-[#d8d0bb] bg-[#faf7ee] p-4 shadow-sm"
          >
            <div className="hand text-2xl font-bold text-ink-blue">{p.title}</div>
            <div className="note text-[11px] text-ink-soft mt-1">{p.en}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
