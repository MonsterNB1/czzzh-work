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
  /** R2 folder that holds ep1.mp4 ... epN.mp4 */
  episodesBase?: string;
  episodes?: number;
  external?: string;
};

export default function WorkRoom({ work }: { work: Work }) {
  const [ep, setEp] = useState(1);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startTv = () => {
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  };

  const pickEp = (n: number) => {
    setEp(n);
    if (playing) {
      // let the new source mount, then keep the set running
      window.setTimeout(() => videoRef.current?.play().catch(() => {}), 260);
    }
  };

  const src =
    work.episodesBase && work.episodes
      ? `${work.episodesBase}/ep${ep}.mp4`
      : work.video ?? "";

  return (
    <div className="grid-bg fixed inset-0 overflow-hidden">
      {/* back to the notebook */}
      <Link href="/works" className="absolute z-40 group" style={{ left: "4%", top: "13%" }}>
        <img
          src="/assets/scrapbook/arrow-red.png"
          alt="back"
          className="h-8 w-auto rotate-180 transition-transform group-hover:-translate-x-1"
        />
      </Link>

      {/* ===== the retro TV, the screen holds the film ===== */}
      <div className="absolute inset-0 flex items-center justify-start pl-[2.5%] pr-4 pt-24 pb-8">
        <div className="tv-frame relative" style={{ width: "min(70vw, 70vh * 1.393, 1000px)" }}>
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
                  className="absolute inset-0 w-full h-full object-cover bg-black"
                  poster={work.cover}
                  controls={playing}
                  playsInline
                  preload="metadata"
                />
                {!playing && (
                  <button
                    onClick={startTv}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 transition-colors hover:bg-black/60"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f5f1e6]/80 text-[#f5f1e6]">
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="hand text-[13px] text-[#f5f1e6] tracking-wide">打开电视</span>
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
        </div>
      </div>

      {/* ===== info taped beside the TV ===== */}
      <div className="absolute hidden md:block" style={{ right: "3.5%", top: "24%", width: "17%" }}>
        <div className="note-tape relative bg-[#fbf9f1] px-4 py-4 shadow-[0_10px_22px_-10px_rgba(80,65,35,0.45)]">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
          <p className="hand text-[11px] text-marker">{work.en}</p>
          <p className="hand text-xl text-ink-blue mt-1.5">{work.title}</p>
          <p className="note text-[10px] leading-relaxed text-[#2b2b2b] mt-2.5">{work.desc}</p>
          <div className="mt-2.5 space-y-1">
            {work.meta.map((m) => (
              <p key={m} className="note text-[9px] text-[#7a7a72]">
                · {m}
              </p>
            ))}
          </div>
        </div>

        {/* episodes, written like a channel list */}
        {work.episodesBase && work.episodes ? (
          <div className="note-tape relative mt-5 bg-[#fbf9f1] px-3 py-3 shadow-[0_10px_22px_-10px_rgba(80,65,35,0.45)]">
            <span className="tape -top-2.5 right-3 rotate-2" />
            <p className="hand text-[10px] text-marker">集数 Episodes</p>
            <div className="mt-2 grid grid-cols-6 gap-1">
              {Array.from({ length: work.episodes }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => pickEp(n)}
                  className={`hand text-[11px] leading-none py-1 rounded-sm transition-colors ${
                    ep === n
                      ? "text-marker bg-[#f3e6d0]"
                      : "text-[#8a8a80] hover:text-ink-blue"
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
  );
}
