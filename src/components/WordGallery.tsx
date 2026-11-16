"use client";

import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    word: "动画",
    en: "ANIMATION",
    items: [
      { title: "怪兽小馆", cat: "Ink" },
      { title: "Bottle", cat: "Stop-mo" },
      { title: "瓦猫", cat: "Stop-mo" },
      { title: "挂画", cat: "Opera" },
    ],
  },
  {
    word: "设计",
    en: "DESIGN",
    items: [
      { title: "海报", cat: "Print" },
      { title: "封面", cat: "Video" },
      { title: "宣发", cat: "Keyart" },
      { title: "周边", cat: "Merch" },
    ],
  },
  {
    word: "AIGC",
    en: "GENERATIVE",
    items: [
      { title: "河神纪元", cat: "Game Art" },
      { title: "角色", cat: "Character" },
      { title: "道具", cat: "Prop" },
      { title: "地图", cat: "Map" },
    ],
  },
  {
    word: "后期",
    en: "POST",
    items: [
      { title: "起底工作室", cat: "Doc" },
      { title: "剪辑", cat: "Edit" },
      { title: "调色", cat: "Grade" },
      { title: "包装", cat: "Pack" },
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

  return (
    <div
      className="relative flex h-screen w-full cursor-pointer items-center justify-center overflow-hidden"
      onClick={next}
    >
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

      {/* Cards - really big, positioned around center */}
      {slide.items.map((item, i) => {
        // 4 corners relative to center, with parallax offset
        const offsets = [
          { baseX: -320, baseY: -180, depth: 50, scale: 1 },   // top-left
          { baseX: 340, baseY: -140, depth: 35, scale: 0.85 }, // top-right
          { baseX: -300, baseY: 200, depth: 65, scale: 1.15 }, // bottom-left
          { baseX: 320, baseY: 180, depth: 45, scale: 1 },     // bottom-right
        ];
        const o = offsets[i];
        return (
          <div
            key={`${index}-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${o.baseX + mouse.x * o.depth}px), calc(-50% + ${o.baseY + mouse.y * o.depth}px)) scale(${o.scale})`,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.3s ease-out",
              zIndex: 5,
            }}
          >
            <div className="w-52 rounded-md border border-cyan-500/30 bg-gradient-to-br from-cyan-950/70 to-purple-950/50 p-4 shadow-[0_0_40px_rgba(0,255,255,0.15)]">
              <div className="h-32 w-full rounded-sm bg-gradient-to-br from-cyan-800/40 to-purple-800/30" />
              <div className="mt-3 text-lg font-bold text-cyan-100">{item.title}</div>
              <div className="text-xs text-cyan-500">{item.cat}</div>
            </div>
          </div>
        );
      })}

      {/* Center word - huge, pure white, bold */}
      <div
        className="relative z-10 text-center"
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
      <div className="absolute bottom-10 z-20 text-xs tracking-widest text-cyan-600">
        CLICK TO EXPLORE →
      </div>
    </div>
  );
}
