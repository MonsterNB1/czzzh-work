"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ============ Hero: Word Gallery ============ */
const slides = [
  { word: "动画", en: "ANIMATION" },
  { word: "设计", en: "DESIGN" },
  { word: "AIGC", en: "GENERATIVE" },
  { word: "后期", en: "POST" },
];

function Hero() {
  const [index, setIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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

  return (
    <div
      className="relative flex h-screen w-full cursor-pointer items-center justify-center overflow-hidden"
      onClick={() => setIndex((i) => (i + 1) % slides.length)}
    >
      {/* Mouse glow */}
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

      {/* Center word */}
      <div
        className="relative z-10 text-center pointer-events-none"
        style={{
          transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)`,
        }}
      >
        <h1 className="text-[10rem] font-bold leading-none tracking-tight text-white sm:text-[14rem]">
          {slides[index].word}
        </h1>
        <p className="mt-6 text-base font-bold tracking-[0.6em] text-cyan-400">
          {slides[index].en}
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 z-20 text-xs tracking-widest text-cyan-600 pointer-events-none">
        SCROLL ↓
      </div>
    </div>
  );
}

/* ============ About Section ============ */
function About() {
  const stats = [
    { num: "752.8万", label: "B站播放" },
    { num: "2600万", label: "年短视频流量" },
    { num: "16+", label: "游戏平台宣发" },
    { num: "金龙奖", label: "最佳系列动画" },
  ];

  return (
    <section className="border-t border-cyan-500/10 py-32">
      <div className="mx-auto max-w-[1700px] px-12">
        <div className="grid grid-cols-12 gap-12">
          {/* Left: portrait placeholder */}
          <div className="col-span-4">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-950/60 to-purple-950/40 shadow-[0_0_40px_rgba(0,255,255,0.1)]">
              <div className="flex h-full items-center justify-center text-cyan-700">
                <span className="text-sm tracking-widest">PORTRAIT</span>
              </div>
            </div>
          </div>

          {/* Right: bio + contact */}
          <div className="col-span-8">
            <p className="text-xs tracking-[0.4em] text-cyan-500">ABOUT</p>
            <h2 className="mt-4 text-5xl font-bold text-white">蔡振昊</h2>
            <p className="mt-2 text-sm tracking-widest text-cyan-500">
              ANIMATOR · DESIGNER · EDITOR
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-cyan-300">
              鲁迅美术学院传媒动画专业毕业。做过定格动画、水墨国创、戏曲短片，
              也做过游戏宣发、短视频纪录片和 AIGC 美术。
              喜欢从分镜到成片全流程把控，也用 AI 工具扩展视觉边界。
              现居杭州，接动画、视觉设计和后期相关合作。
            </p>

            {/* Contact */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm">
              <a href="mailto:XingKun.C@outlook.com" className="text-cyan-400 hover:text-white transition-colors">
                XingKun.C@outlook.com
              </a>
              <span className="text-cyan-600">WeChat: CZH-1999</span>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-cyan-400/30 pl-4">
                  <div className="text-2xl font-bold text-white">{s.num}</div>
                  <div className="mt-1 text-xs text-cyan-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Featured Works ============ */
const featured = [
  { title: "怪兽小馆", cat: "动画 · 水墨", slug: "monster_diner", color: "from-cyan-900/50 to-blue-900/30" },
  { title: "河神纪元", cat: "AIGC · 游戏美术", slug: "river_gods", color: "from-purple-900/50 to-pink-900/30" },
  { title: "起底工作室", cat: "后期 · 纪录片", slug: "media_unlocked", color: "from-teal-900/50 to-cyan-900/30" },
  { title: "Bottle", cat: "动画 · 定格", slug: "bottle", color: "from-slate-900/50 to-cyan-900/20" },
];

function FeaturedWorks() {
  return (
    <section className="border-t border-cyan-500/10 py-32">
      <div className="mx-auto max-w-[1700px] px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.4em] text-cyan-500">SELECTED WORKS</p>
            <h2 className="mt-4 text-5xl font-bold text-white">精选项目</h2>
          </div>
          <Link href="/works" className="text-sm text-cyan-500 hover:text-white transition-colors">
            VIEW ALL →
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8">
          {featured.map((w) => (
            <Link
              key={w.slug}
              href={`/works/${w.slug}`}
              className="group block"
            >
              <div
                className={`aspect-[16/10] w-full overflow-hidden rounded-lg border-2 border-cyan-400/20 bg-gradient-to-br ${w.color} shadow-[0_0_30px_rgba(0,255,255,0.08)] transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_50px_rgba(0,255,255,0.2)]`}
              >
                <div className="flex h-full items-center justify-center text-cyan-700">
                  <span className="text-sm tracking-widest">THUMBNAIL</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {w.title}
                </h3>
                <span className="text-xs text-cyan-500">{w.cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Skills ============ */
const skills = [
  { icon: "◈", title: "动画", desc: "定格 / 二维 / 水墨，从分镜到成片全流程" },
  { icon: "◇", title: "视觉设计", desc: "海报 / 封面 / 宣发物料 / 周边产品" },
  { icon: "◉", title: "后期制作", desc: "剪辑 / 调色 / 包装 / 短视频纪录片" },
  { icon: "◎", title: "AIGC", desc: "Midjourney / Stable Diffusion 游戏美术" },
];

function Skills() {
  return (
    <section className="border-t border-cyan-500/10 py-32">
      <div className="mx-auto max-w-[1700px] px-12">
        <p className="text-xs tracking-[0.4em] text-cyan-500">CAPABILITIES</p>
        <h2 className="mt-4 text-5xl font-bold text-white">能力</h2>

        <div className="mt-16 grid grid-cols-4 gap-6">
          {skills.map((s) => (
            <div
              key={s.title}
              className="group rounded-lg border-2 border-cyan-400/20 bg-cyan-950/20 p-8 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]"
            >
              <div className="text-3xl text-cyan-400">{s.icon}</div>
              <h3 className="mt-6 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cyan-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Main Page ============ */
export default function Home() {
  const [entered, setEntered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      {/* Layer 2 (back): main scrollable content */}
      <div
        className="min-h-screen"
        style={{
          transform: entered ? "translateZ(0) scale(1)" : "translateZ(-200px) scale(0.95)",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: entered ? 1 : 0,
        }}
      >
        <Hero />
        <About />
        <FeaturedWorks />
        <Skills />
      </div>

      {/* Layer 1 (front): cover */}
      <div
        className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-[#020408]"
        onClick={() => setEntered(true)}
        style={{
          transform: entered ? "translateZ(-400px) scale(0.8)" : "translateZ(0) scale(1)",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease-out",
          opacity: entered ? 0 : 1,
          pointerEvents: entered ? "none" : "auto",
        }}
      >
        {/* Mouse glow */}
        <div
          className="pointer-events-none absolute h-[500px] w-[500px] rounded-full"
          style={{
            left: mouse.x - 250,
            top: mouse.y - 250,
            background:
              "radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,255,255,0.06) 40%, transparent 70%)",
            transition: "left 0.1s ease-out, top 0.1s ease-out",
          }}
        />

        <img
          src="/logo.png"
          alt="logo"
          className="h-[28rem] w-[28rem] object-contain"
          style={{
            filter:
              "invert(1) brightness(2) drop-shadow(0 0 40px rgba(0,255,255,0.5)) drop-shadow(0 0 80px rgba(0,255,255,0.2))",
          }}
        />
        <p className="mt-10 text-2xl font-light tracking-[0.3em] text-cyan-100">
          蔡振昊个人作品集
        </p>
        <p className="mt-3 text-xs tracking-[0.4em] text-cyan-500">
          CAI ZHENHAO — PORTFOLIO
        </p>
        <p className="mt-8 text-[10px] tracking-widest text-cyan-800">click to enter</p>
      </div>
    </div>
  );
}
