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

const cardPositions = [
  { x: -360, y: -200, scale: 1.2, depth: 40 },
  { x: 320, y: -160, scale: 1.0, depth: 30 },
  { x: -280, y: 160, scale: 1.5, depth: 55 },
  { x: 360, y: 200, scale: 1.3, depth: 45 },
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
      <div className="absolute left-8 top-1/2 flex -translate-y-1/2 flex-col gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`text-sm font-bold transition-colors ${
              i === index ? "text-white" : "text-cyan-800"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>

      {/* Cards */}
      {slide.items.map((item, i) => {
        const pos = cardPositions[i];
        return (
          <div
            key={`${index}-${i}`}
            className="absolute"
            style={{
              transform: `translate(calc(-50% + ${pos.x + mouse.x * pos.depth}px), calc(-50% + ${pos.y + mouse.y * pos.depth}px)) scale(${pos.scale})`,
              opacity: visible ? 1 : 0,
              transition: `opacity 0.3s ease-out, transform 0.2s ease-out`,
            }}
          >
            <div className="w-44 rounded-sm border border-cyan-500/30 bg-gradient-to-br from-cyan-950/60 to-purple-950/40 p-4 shadow-[0_0_30px_rgba(0,255,255,0.15)] backdrop-blur-sm">
              <div className="h-28 w-full rounded-sm bg-gradient-to-br from-cyan-800/30 to-purple-800/20" />
              <div className="mt-3 text-base font-bold text-cyan-200">{item.title}</div>
              <div className="text-xs text-cyan-600">{item.cat}</div>
            </div>
          </div>
        );
      })}

      {/* Center word - pure white, bold, 2x */}
      <div
        className="relative z-10 text-center"
        style={{
          transform: `translate(${mouse.x * -15}px, ${mouse.y * -15}px)`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease-out, transform 0.2s ease-out",
        }}
      >
        <h1 className="text-8xl font-bold tracking-tight text-white sm:text-9xl">
          {slide.word}
        </h1>
        <p className="mt-4 text-sm font-bold tracking-[0.5em] text-cyan-400">{slide.en}</p>
      </div>

      {/* Hint */}
      <div className="absolute bottom-12 text-xs tracking-widest text-cyan-700">
        CLICK TO EXPLORE →
      </div>
    </div>
  );
}
