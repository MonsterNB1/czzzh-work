"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [buffering, setBuffering] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const src =
    work.episodesBase && work.episodes
      ? `${work.episodesBase}/ep${ep}.mp4`
      : work.video ?? "";

  const startTv = useCallback(() => {
    setFailed(false);
    setBuffering(true);
    setPlaying(true);
    const v = videoRef.current;
    if (!v) return;
    // the poster stays up until the first frame is decodable, so phones never
    // stare at a blank screen while 300MB starts to stream
    v.play().catch(() => {
      setBuffering(false);
      setPlaying(false);
    });
  }, []);

  const pickEp = (n: number) => {
    setEp(n);
    setFailed(false);
    if (playing) {
      setBuffering(true);
      window.setTimeout(() => videoRef.current?.play().catch(() => setBuffering(false)), 260);
    }
  };

  // iOS only allows JS to enter fullscreen through its own vendor method
  const goFullscreen = () => {
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const busy = () => setBuffering(true);
    const ready = () => setBuffering(false);
    const broken = () => {
      setBuffering(false);
      setFailed(true);
    };
    v.addEventListener("waiting", busy);
    v.addEventListener("stalled", busy);
    v.addEventListener("playing", ready);
    v.addEventListener("canplay", ready);
    v.addEventListener("error", broken);
    return () => {
      v.removeEventListener("waiting", busy);
      v.removeEventListener("stalled", busy);
      v.removeEventListener("playing", ready);
      v.removeEventListener("canplay", ready);
      v.removeEventListener("error", broken);
    };
  }, [ep]);

  return (
    <div className="grid-bg min-h-screen md:fixed md:inset-0 md:overflow-hidden">
      {/* back to the notebook */}
      <Link
        href="/works"
        className="fixed z-40 group top-[66px] left-4 md:absolute md:top-[15%] md:left-[3.2%]"
        style={{}}
      >
        <img
          src="/assets/scrapbook/arrow-red.webp"
          alt="back"
          className="h-7 w-auto rotate-180 transition-transform group-hover:-translate-x-1 md:h-8"
        />
      </Link>

      {/* ===== the TV: 100% of the phone width, a full screen-sized prop on desktop ===== */}
      <div className="tv-stage">
        <div className="tv-frame relative mx-auto">
          <div className="tv-shell relative">
          <picture className="block w-full">
            <source media="(min-width: 768px)" srcSet="/assets/scrapbook/tv-red.webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/scrapbook/tv-red-780.webp"
              alt=""
              width={1179}
              height={846}
              className="w-full h-auto block select-none"
              draggable={false}
            />
          </picture>

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
                  preload="none"
                  x5-playsinline="true"
                  webkit-playsinline="true"
                  onError={() => {
                    setBuffering(false);
                    setFailed(true);
                  }}
                />
                {!playing && (
                  <button
                    onClick={startTv}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/65 transition-colors hover:bg-black/55"
                    aria-label={`播放 ${work.title}`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#f5f1e6]/80 text-[#f5f1e6] md:h-14 md:w-14">
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 md:h-5 md:w-5" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="hand text-[12px] tracking-[0.14em] text-[#f5f1e6]">
                      打开电视
                    </span>
                  </button>
                )}

                {/* first-frame handshake — mp4 here is ~7Mbps, so give the wait a face */}
                {playing && buffering && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/45">
                    <span className="tv-spin h-7 w-7 rounded-full border-2 border-[#f5f1e6]/30 border-t-[#f5f1e6]" />
                    <span className="hand text-[11px] tracking-[0.12em] text-[#f5f1e6]/85">
                      接通信号…
                    </span>
                  </div>
                )}

                {failed && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 px-3 text-center">
                    <span className="note text-[12px] text-[#ffd7a0]">信号断了</span>
                    <div className="flex gap-2">
                      <button
                        onClick={startTv}
                        className="note text-[12px] text-[#f5f1e6] border border-[#f5f1e6]/60 rounded-full px-3 py-1"
                      >
                        重试
                      </button>
                      {work.external && (
                        <a
                          href={work.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="note text-[12px] text-[#ffd7a0] border border-[#ffd7a0]/50 rounded-full px-3 py-1"
                        >
                          去 B 站看 →
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {playing && (
                  <button
                    onClick={goFullscreen}
                    className="absolute bottom-1.5 right-1.5 z-10 rounded-[3px] bg-black/55 px-2 py-1 hand text-[10px] leading-none text-[#f5f1e6]/85 md:hidden"
                    aria-label="全屏播放"
                  >
                    全屏
                  </button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-black">
                {work.cover && (
                  /* eslint-disable-next-line @next/next/no-img-element */
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

          {/* ===== notes: taped under the knobs on desktop, stacked below the TV on phones ===== */}
          <div className="tv-notes">
            <div className="w-full bg-[#fbf9f1] px-3 py-3 shadow-[0_8px_16px_-9px_rgba(60,45,25,0.5)] md:rotate-[-1.5deg]">
              <span className="tape -top-3 left-6 md:left-1/2 md:-translate-x-1/2 -rotate-3" style={{ width: 64, height: 15 }} />
              <p className="hand text-[11px] md:text-[clamp(9px,0.85vw,12px)] text-marker">{work.en}</p>
              <p className="hand text-[19px] md:text-[clamp(14px,1.4vw,21px)] text-ink-blue mt-1">
                {work.title}
              </p>
              <p className="note text-[13px] leading-[1.6] md:text-[clamp(9px,0.82vw,12px)] md:leading-[1.45] text-[#2b2b2b] mt-2 md:mt-1.5">
                {work.desc}
              </p>
              <div className="mt-2 space-y-1 md:mt-1.5 md:space-y-0.5">
                {work.meta.map((m) => (
                  <p key={m} className="note text-[11px] md:text-[clamp(8px,0.72vw,11px)] text-[#7a7a72]">
                    · {m}
                  </p>
                ))}
              </div>
            </div>

            {work.episodesBase && work.episodes ? (
              <div className="tv-episodes relative z-10 bg-[#fbf9f1] px-3 py-2.5 shadow-[0_10px_22px_-10px_rgba(60,45,25,0.55)] md:rotate-[1.5deg]">
                <span className="tape -top-2.5 right-4 rotate-2" style={{ width: 44, height: 13 }} />
                <p className="hand text-[11px] leading-[1.35] md:text-[clamp(9px,0.8vw,12px)] text-marker">
                  集数 Episodes
                </p>
                <div className="mt-2 grid grid-cols-6 gap-1 md:mt-1.5 md:gap-0.5">
                  {Array.from({ length: work.episodes }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => pickEp(n)}
                      className={`hand text-[15px] leading-none py-2.5 rounded-[3px] transition-colors md:text-[clamp(9px,0.85vw,12px)] md:py-0.5 md:rounded-[2px] ${
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
