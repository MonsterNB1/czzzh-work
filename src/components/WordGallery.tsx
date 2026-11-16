"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    word: "动画",
    en: "ANIMATION",
    items: [
      { title: "怪兽小馆", cat: "Ink", slug: "monster_diner" },
      { title: "Bottle", cat: "Stop-mo", slug: "bottle" },
      { title: "瓦猫", cat: "Stop-mo", slug: "wamao" },
      { title: "挂画", cat: "Opera", slug: "guahua" },
    ],
  },
  {
    word: "设计",
    en: "DESIGN",
    items: [
      { title: "海报", cat: "Print", slug: "posters" },
      { title: "封面", cat: "Video", slug: "covers" },
      { title: "宣发", cat: "Keyart", slug: "keyart" },
      { title: "周边", cat: "Merch", slug: "merch" },
    ],
  },
  {
    word: "AIGC",
    en: "GENERATIVE",
    items: [
      { title: "河神纪元", cat: "Game Art", slug: "river_gods" },
      { title: "角色", cat: "Character", slug: "river_gods" },
      { title: "道具", cat: "Prop", slug: "river_gods" },
      { title: "地图", cat: "Map", slug: "river_gods" },
    ],
  },
  {
    word: "后期",
    en: "POST",
    items: [
      { title: "起底工作室", cat: "Doc", slug: "media_unlocked" },
      { title: "剪辑", cat: "Edit", slug: "media_unlocked" },
      { title: "调色", cat: "Grade", slug: "media_unlocked" },
      { title: "包装", cat: "Pack", slug: "media_unlocked" },
    ],
  },
];

export default function WordGallery() {
  const [index, setIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  const next = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      setVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const slide = slides[index];

  const offsets = [
    { baseX: -320, baseY: -180, depth: 50, floatDur: 4, floatDelay: 0, rot: -3 },
    { baseX: 340, baseY: -140, depth: 35, floatDur: 5, floatDelay: 0.5, rot: 2 },
    { baseX: -300, baseY: 200, depth: 65, floatDur: 3.5, floatDelay: 1, rot: 4 },
    { baseX: 320, baseY: 180, depth: 45, floatDur: 4.5, floatDelay: 1.5, rot: -2 },
  ];

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      onClick={next}
    >
      {/* Mouse-follow cyan glow */}
      <div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full"
        style={{
          left: `calc(50% + ${mouse.x * 50}% - 300px)`,
          top: `calc(50% + ${mouse.y * 50}% - 300px)`,
          background:
            "radial-gradient(circle, rgba(0,255,255,0.18) 0%, rgba(0,255,255,0.05) 40%, transparent 70%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />

      {/* Pager */}
      <div className="absolute left-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`text-lg font-bold transition-colors ${
              i === index ? "text-white" : "text-cyan-800"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>

      {/* Cards - clickable links */}
      {slide.items.map((item, i) => {
        const o = offsets[i];
        return (
          <div
            key={`${index}-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${o.baseX + mouse.x * o.depth}px), calc(-50% + ${o.baseY + mouse.y * o.depth}px))`,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.3s ease-out",
              zIndex: 10,
              pointerEvents: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                animation: `floatCard${i} ${o.floatDur}s ease-in-out ${o.floatDelay}s infinite`,
              }}
            >
              <Link
                href={`/works/${item.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="block w-52 rounded-md border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-950/80 to-purple-950/60 p-4 transition-all duration-200 hover:border-cyan-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]"
                style={{
                  boxShadow:
                    "0 0 20px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.15), inset 0 0 20px rgba(0,255,255,0.05)",
                  transform: `rotate(${o.rot}deg)`,
                }}
              >
                <div className="h-32 w-full rounded-sm bg-gradient-to-br from-cyan-800/40 to-purple-800/30" />
                <div className="mt-3 text-lg font-bold text-white">{item.title}</div>
                <div className="text-xs text-cyan-400">{item.cat}</div>
              </Link>
            </div>
          </div>
        );
      })}

      {/* Center word */}
      <div
        className="relative z-10 text-center pointer-events-none"
        style={{
          transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <h1 className="text-[10rem] font-bold leading-none tracking-tight text-white sm:text-[12rem]">
          {slide.word}
        </h1>
        <p className="mt-6 text-base font-bold tracking-[0.6em] text-cyan-400">
          {slide.en}
        </p>
      </div>

      {/* Hint */}
      <div className="absolute bottom-10 z-20 text-xs tracking-widest text-cyan-600 pointer-events-none">
        CLICK TO EXPLORE →
      </div>

      <style>{`
        @keyframes floatCard0 {
          0%, 100% { translate: 0 0; rotate: 0deg; }
          50% { translate: 0 -15px; rotate: 2deg; }
        }
        @keyframes floatCard1 {
          0%, 100% { translate: 0 0; rotate: 0deg; }
          50% { translate: 0 12px; rotate: -3deg; }
        }
        @keyframes floatCard2 {
          0%, 100% { translate: 0 0; rotate: 0deg; }
          50% { translate: 0 -10px; rotate: -2deg; }
        }
        @keyframes floatCard3 {
          0%, 100% { translate: 0 0; rotate: 0deg; }
          50% { translate: 0 18px; rotate: 3deg; }
        }
      `}</style>
    </div>
  );
}
