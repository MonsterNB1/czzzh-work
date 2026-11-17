"use client";

import { useRef, useState } from "react";

export default function VinylPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    setPlaying((p) => {
      const next = !p;
      const a = audioRef.current;
      if (a) {
        if (next) a.play().catch(() => {});
        else a.pause();
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "暂停音乐" : "播放音乐"}
      className="relative block h-16 w-16 -rotate-6 cursor-pointer"
    >
      {/* vinyl */}
      <img
        src="/assets/scrapbook/vinyl.webp"
        alt=""
        className="photo-shadow h-16 w-16 rounded-full"
        style={{ animation: playing ? "vinylspin 2.4s linear infinite" : "none" }}
      />
      {/* tonearm: pivot base at top-right, slim arm swings onto record */}
      <div
        className="absolute"
        style={{
          top: "-4px",
          right: "-6px",
          width: "26px",
          height: "26px",
        }}
      >
        {/* pivot base */}
        <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-neutral-800 shadow" />
        {/* arm */}
        <div
          className="absolute right-0 top-1 origin-top-right rounded-full bg-gradient-to-b from-neutral-600 to-neutral-800"
          style={{
            width: "2.5px",
            height: "38px",
            transform: playing ? "rotate(50deg)" : "rotate(-18deg)",
            transformOrigin: "top right",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* headshell */}
          <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-sm bg-neutral-900" />
        </div>
      </div>

      <audio ref={audioRef} src="/music.mp3" loop preload="none" />

      <style jsx>{`
        @keyframes vinylspin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
