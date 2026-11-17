"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="grid-bg relative min-h-screen w-full overflow-hidden flex items-start justify-center px-4 pt-24 pb-8">
      {/* the open two-page spread — bigger, lifted up */}
      <div className="relative w-full max-w-7xl -mt-2">
        <img
          src="/assets/scrapbook/notebook-open.png"
          alt=""
          className="w-full h-auto block"
          draggable={false}
        />

        {/* ===== LEFT PAGE ===== */}
        {/* big "Hi, I'm" + smaller name, left aligned */}
        <div className="absolute" style={{ left: "13%", top: "15%" }}>
          <p className="hand text-5xl sm:text-7xl font-bold text-marker leading-none">
            Hi～
          </p>
          <h1 className="hand text-2xl sm:text-3xl font-bold text-marker mt-3">
            I&apos;m 蔡振昊
          </h1>

          {/* four directions, hand-placed */}
          <div className="mt-6 space-y-1">
            <div className="note text-lg text-[#2b2b2b]">Animation</div>
            <div className="note text-lg text-[#2b2b2b] ml-8 rotate-[-2deg] inline-block">Design</div>
            <div className="note text-lg text-[#2b2b2b] ml-2 mt-1 rotate-1 inline-block">Post</div>
            <div className="note text-lg text-ink-blue ml-12 mt-1 -rotate-1 inline-block">AIGC</div>
          </div>
        </div>

        {/* two decorative polaroids on the left page — kept low so they don't cover text */}
        <div
          className="absolute hidden md:block"
          style={{ left: "11%", bottom: "4%", transform: "rotate(-4deg)" }}
        >
          <img
            src="/assets/scrapbook/polaroid.png"
            alt=""
            className="photo-shadow w-32 h-auto"
          />
        </div>
        <div
          className="absolute hidden md:block"
          style={{ left: "24%", bottom: "4%", transform: "rotate(5deg)" }}
        >
          <img
            src="/assets/scrapbook/polaroid.png"
            alt=""
            className="photo-shadow w-32 h-auto"
          />
        </div>

        {/* ===== RIGHT PAGE ===== */}
        <div
          className="absolute hidden sm:block"
          style={{ right: "17%", top: "20%", width: "28%" }}
        >
          <p className="note text-[13px] leading-relaxed text-[#2b2b2b] text-center">
            I&apos;m a multidisciplinary creative working across animation, design
            and post — strong visuals, thoughtful storytelling.
          </p>
        </div>

        {/* retro TV on the right page */}
        <div
          className="absolute hidden md:block"
          style={{ right: "22%", bottom: "8%" }}
        >
          <div className="relative">
            <img
              src="/assets/scrapbook/retro-tv.png"
              alt=""
              className="photo-shadow w-40 h-auto"
            />
            <Link
              href="/works"
              className="note absolute text-[10px] text-[#2b2b2b] hover:text-marker"
              style={{ left: "18%", top: "36%", width: "50%" }}
            >
              try changing the channel →
            </Link>
          </div>
        </div>

        {/* red arrow at the bottom-right corner of the book */}
        <Link
          href="/works"
          className="absolute hidden md:block group"
          style={{ right: "9%", bottom: "5%" }}
        >
          <img
            src="/assets/scrapbook/arrow-red.png"
            alt="see work"
            className="h-8 w-auto photo-shadow group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* footer */}
      <div className="absolute bottom-4 left-6 note text-sm text-ink-soft">
        © 2026 Czzzh, All rights reserved
      </div>
      <div className="absolute bottom-4 right-6 note text-sm text-ink-soft">
        Hangzhou — China
      </div>
    </div>
  );
}
