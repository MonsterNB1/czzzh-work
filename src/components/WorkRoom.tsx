"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export type Work = {
  title: string;
  en: string;
  cat: string;
  desc: string;
  meta: string[];
  cover?: string;
  video?: string;
  /** R2 folder holding ep1.mp4 ... epN.mp4 */
  episodesBase?: string;
  episodes?: number;
  external?: string;
};

export default function WorkRoom({ work }: { work: Work }) {
  const [ep, setEp] = useState(1);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const src =
    work.episodesBase && work.episodes
      ? `${work.episodesBase}/ep${ep}.mp4`
      : work.video ?? "";

  const startTv = () => {
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  };

  const pickEp = (n: number) => {
    setEp(n);
    if (playing) {
      window.setTimeout(() => videoRef.current?.play().catch(() => {}), 260);
    }
  };

  return (
    <div className="grid-bg fixed inset-0 overflow-hidden">
      {/* back to the notebook */}
      <Link href="/works" className="absolute z-40 group" style={{ left: "3.2%", top: "15%" }}>
        <img
          src="/assets/scrapbook/arrow-red.webp"
          alt="back"
          className="h-8 w-auto rotate-180 transition-transform group-hover:-translate-x-1"
        />
      </Link>

      {/* ===== the TV fills the room ===== */}
      <div className="absolute inset-0 flex items-center justify-center pt-[86px] pb-2">
        <div
          className="tv-frame relative"
          style={{ width: "min(calc(100vw - 8px), calc((100vh - 96px) * 1.393))" }}
        >
          <img
            src="/assets/scrapbook/tv-red.webp"
            alt=""
            className="w-full h-auto block select-none"
            draggable={false}
          />

          {/* screen area, measured from the artwork */}
          <div
            className="tv-screen absolute overflow-hidden bg-[#0b0d0c]"
            style={{ left: "6.4%", top: "6.6%", width: "69%", height: "76%" }}
          >
            {src ? (
              <>
                <video
                  key={ep}
                  ref={videoRef}
                  src={src}
                  poster={work.cover}
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                  controls={playing}
                  playsInline
                  preload="metadata"
                />
                {!playing && (
                  <button
                    onClick={startTv}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/65 transition-colors hover:bg-black/55"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#f5f1e6]/80 text-[#f5f1e6]">
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="hand text-[12px] tracking-[0.14em] text-[#f5f1e6]">
                      打开电视
                    </span>
                  </button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-black">
                {work.cover && (
                  <img
                    src={work.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-[7%] flex justify-center">
                  {work.external && (
                    <a
                      href={work.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="note text-[12px] text-[#ffd7a0] bg-black/60 border border-[#ffd7a0]/50 rounded-full px-4 py-1.5 hover:bg-black/80 transition-colors"
                    >
                      去 B 站看正片 →
                    </a>
                  )}
                </div>
              </div>
            )}
            <div className="tv-scanline pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_28px_rgba(0,0,0,0.75)]" />
          </div>

          {/* ===== notes taped under the control knobs (inside the TV) ===== */}
          <div
            className="absolute hidden md:flex flex-col items-end"
            style={{ right: "0.8%", top: "54%", width: "22.5%" }}
          >
            <div className="w-full bg-[#fbf9f1] px-3 py-3 shadow-[0_8px_16px_-9px_rgba(60,45,25,0.5)] rotate-[-1.5deg]">
              <span
                className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3"
                style={{ width: 64, height: 15 }}
              />
              <p className="hand text-[clamp(9px,0.85vw,12px)] text-marker">{work.en}</p>
              <p className="hand text-[clamp(14px,1.4vw,21px)] text-ink-blue mt-1">{work.title}</p>
              <p className="note text-[clamp(9px,0.82vw,12px)] leading-[1.45] text-[#2b2b2b] mt-1.5">
                {work.desc}
              </p>
              <div className="mt-1.5 space-y-0.5">
                {work.meta.map((m) => (
                  <p key={m} className="note text-[clamp(8px,0.72vw,11px)] text-[#7a7a72]">
                    · {m}
                  </p>
                ))}
              </div>
            </div>

            {work.episodesBase && work.episodes ? (
              <div className="relative z-10 mt-[30%] mr-[19%] bg-[#fbf9f1] px-2.5 py-2 shadow-[0_10px_22px_-10px_rgba(60,45,25,0.55)] rotate-[1.5deg]">
                <span
                  className="tape -top-2.5 right-3 rotate-2"
                  style={{ width: 44, height: 13 }}
                />
                <p className="hand text-[clamp(9px,0.8vw,12px)] leading-[1.35] text-marker">
                集数 Episodes
              </p>
                <div className="mt-1.5 grid grid-cols-6 gap-0.5">
                  {Array.from({ length: work.episodes }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => pickEp(n)}
                      className={`hand text-[clamp(9px,0.85vw,12px)] leading-none py-0.5 rounded-[2px] transition-colors ${
                        ep === n ? "text-marker bg-[#f3e6d0]" : "text-[#8a8a80] hover:text-ink-blue"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
