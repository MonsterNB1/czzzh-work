"use client";

import { useEffect, useRef, useState } from "react";

// the track lives in the R2 bucket next to the rest of the media, not in the repo
// (v2: same recording, loudness raised to -16 LUFS so it reads as music, not air)
const TRACK =
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev/music/no-rush-v2.mp3";

export default function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blockedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playing, setPlaying] = useState(false);
  // a click answers instantly, even when the first bytes are still on their way
  const [pending, setPending] = useState(false);
  // only shows up if the browser refused playback outright
  const [blocked, setBlocked] = useState(false);

  const turning = playing || pending;

  // the button never keeps its own idea of the state: the record itself does.
  // whatever pauses it -- a film starting, the track running out -- the arm
  // swings back without the component having to guess.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => {
      setPlaying(true);
      setPending(false);
      setBlocked(false);
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
    };
    const onPause = () => {
      setPlaying(false);
      setPending(false);
    };
    const onError = () => {
      setPending(false);
      setBlocked(true);
    };
    const onWaiting = () => setPending(true);
    const onPlaying = () => {
      setPending(false);
      setBlocked(false);
    };
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("error", onError);
    a.addEventListener("waiting", onWaiting);
    a.addEventListener("playing", onPlaying);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("error", onError);
      a.removeEventListener("waiting", onWaiting);
      a.removeEventListener("playing", onPlaying);
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
      if (blockedTimer.current) clearTimeout(blockedTimer.current);
    };
  }, []);

  // films play in several rooms of the site; any one of them taking the
  // speakers makes the record step aside instead of playing underneath.
  // muted reels are exempt: the homepage TV runs a silent loop that restarts
  // every few seconds, and it must not keep cutting the music off.
  useEffect(() => {
    const onVideoPlay = (e: Event) => {
      const v = e.target;
      if (!(v instanceof HTMLVideoElement)) return;
      if (v.muted || v.volume === 0) return;
      audioRef.current?.pause();
    };
    // capture: a video's play event does not bubble
    document.addEventListener("play", onVideoPlay, true);
    return () => document.removeEventListener("play", onVideoPlay, true);
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      // one pair of speakers: starting the record silences whatever film runs
      // (silent reels are left alone, they are decoration)
      document.querySelectorAll("video").forEach((v) => {
        if (!v.paused && !v.muted && v.volume > 0) v.pause();
      });
      setBlocked(false);
      setPending(true);
      // if nothing at all comes back, stop pretending after 15s
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
      pendingTimer.current = setTimeout(() => setPending(false), 15000);
      // Safari ignores play() on a media element that has never fetched a byte
      // (preload="none"); force the fetch, but only the first time, so resuming
      // a paused record keeps its position instead of jumping back to 0:00
      if (a.readyState === 0) a.load();
      a.play()
        .then(() => setPending(false))
        .catch(() => {
          setPending(false);
          setBlocked(true);
          if (blockedTimer.current) clearTimeout(blockedTimer.current);
          blockedTimer.current = setTimeout(() => setBlocked(false), 4000);
        });
    } else {
      a.pause();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={turning ? "暂停背景音乐" : "播放背景音乐"}
      aria-pressed={turning}
      title="低皮质醇放松爵士 · 点一下播放"
      className="group relative block h-11 w-11 md:h-16 md:w-16 -rotate-6 cursor-pointer"
    >
      {/* a soft halo, only while the record is turning */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500"
        style={{
          opacity: turning ? 1 : 0,
          boxShadow: "0 0 0 3px rgba(200,60,40,0.10), 0 0 18px rgba(200,60,40,0.18)",
        }}
      />

      {/* vinyl */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/scrapbook/vinyl.webp"
        alt=""
        width={512}
        height={512}
        className="photo-shadow relative h-11 w-11 md:h-16 md:w-16 rounded-full transition-transform duration-300 group-hover:scale-[1.04] group-active:scale-95"
        style={{ animation: turning ? "vinylspin 2.4s linear infinite" : "none" }}
      />

      {/* tonearm: pivot base at top-right, slim arm swings onto record */}
      <div
        className="absolute"
        style={{ top: "-4px", right: "-6px", width: "26px", height: "26px" }}
      >
        {/* pivot base */}
        <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-neutral-800 shadow" />
        {/* arm */}
        <div
          className="absolute right-0 top-1 origin-top-right rounded-full bg-gradient-to-b from-neutral-600 to-neutral-800"
          style={{
            width: "2.5px",
            height: "38px",
            transform: turning ? "rotate(50deg)" : "rotate(-18deg)",
            transformOrigin: "top right",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* headshell */}
          <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-sm bg-neutral-900" />
        </div>
      </div>

      {/* only when the buffer is still filling */}
      {pending && !playing && (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-1.5 left-1/2 h-1 w-6 -translate-x-1/2 overflow-hidden rounded-full bg-[#2b2b2b]/15"
        >
          <span className="block h-full w-1/2 animate-pulse rounded-full bg-[#c83c28]" />
        </span>
      )}

      {/* the browser refused to play: a quiet mark, not a modal */}
      {blocked && (
        <span
          aria-hidden
          title="浏览器拦住了播放，再点一下试试"
          className="pointer-events-none absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c83c28] text-[10px] font-bold leading-none text-[#f5f1e6] shadow"
        >
          !
        </span>
      )}

      <audio ref={audioRef} src={TRACK} loop preload="none" />

      <style jsx>{`
        @keyframes vinylspin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  );
}
