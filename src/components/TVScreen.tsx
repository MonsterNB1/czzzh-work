"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const R2_BASE = "https://pub-99c53aec3f634300b636798977401e47.r2.dev/monster-diner";

// 轮播素材池：后续其他作品的视频直接把地址追加到这个数组即可，
// 电视机会从池子里随机挑一段播放。
const VIDEO_POOL: string[] = [
  ...Array.from({ length: 12 }, (_, i) => `${R2_BASE}/ep${i + 1}.mp4`),
];

const CLIP_MIN = 5; // seconds
const CLIP_MAX = 7;
const SNOW_MS = 900;

function randomSrc(exclude?: string): string {
  const pool = VIDEO_POOL.filter((s) => s !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function TVScreen({ mobile = false }: { mobile?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [src, setSrc] = useState<string>(VIDEO_POOL[0]);
  const [phase, setPhase] = useState<"loading" | "play" | "snow">("loading");
  const clipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seeded = useRef(false);

  const clearTimers = () => {
    if (clipTimer.current) clearTimeout(clipTimer.current);
    if (snowTimer.current) clearTimeout(snowTimer.current);
  };

  // only the TV visible at the current breakpoint should load a video
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setActive(mobile ? !mq.matches : mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [mobile]);

  const startClip = useCallback((nextSrc: string) => {
    const v = videoRef.current;
    if (!v) return;
    setPhase("loading");
    v.load();
    v.onloadedmetadata = () => {
      const dur = v.duration || 60;
      // seek to a random safe position, away from intro / credits
      const start = Math.min(3, dur * 0.1);
      const end = Math.max(start + 1, dur - 10);
      v.currentTime = start + Math.random() * (end - start);
      v.muted = true;
      v.play().catch(() => {});
      setPhase("play");

      const len = CLIP_MIN + Math.random() * (CLIP_MAX - CLIP_MIN);
      clipTimer.current = setTimeout(() => {
        // cut to snow, then swap to the next clip
        setPhase("snow");
        v.pause();
        snowTimer.current = setTimeout(() => {
          setSrc((prev) => randomSrc(prev));
        }, SNOW_MS);
      }, len * 1000);
    };
  }, []);

  // pick a random clip once this screen becomes active
  useEffect(() => {
    if (!active) return;
    if (!seeded.current) {
      seeded.current = true;
      setSrc(randomSrc());
      return;
    }
    startClip(src);
    return clearTimers;
  }, [active, src, startClip]);

  // pause and stop timers when this screen hides
  useEffect(() => {
    if (!active) {
      clearTimers();
      videoRef.current?.pause();
    }
  }, [active]);

  if (!active) return <div className="absolute inset-0" />;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* playing clip */}
      <video
        ref={videoRef}
        key={src}
        muted
        playsInline
        preload="metadata"
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          phase === "play" ? "opacity-100" : "opacity-0"
        }`}
        src={src}
      />

      {/* snow / static transition */}
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${
          phase === "snow" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
          animation: "tv-snow 0.18s steps(3) infinite",
        }}
      />

      {/* CRT scanlines + vignette over the glass */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
