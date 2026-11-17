"use client";

import Link from "next/link";

// every size below is expressed as a fraction of the book width (--wb),
// so the whole spread scales as one piece on any window.
const px = (k: number) => `calc(${k} * var(--wb))`;

export default function Home() {
  return (
    <div className="grid-bg relative min-h-screen w-full overflow-hidden flex items-start justify-center px-4 pt-24 pb-8">
      {/* the open two-page spread — bigger, lifted up */}
      <div
        className="relative w-full max-w-7xl -mt-2"
        style={
          {
            "--wb": "min(calc(100vw - 32px), 1280px)",
          } as React.CSSProperties
        }
      >
        <img
          src="/assets/scrapbook/notebook-open.webp"
          alt=""
          width={1888}
          height={971}
          className="w-full h-auto block"
          draggable={false}
          fetchPriority="high"
        />

        {/* ===== LEFT PAGE ===== */}
        {/* big "Hi, I'm" + smaller name, left aligned */}
        <div className="absolute" style={{ left: "13%", top: "13%" }}>
          <p
            className="hand font-bold text-marker leading-none"
            style={{ fontSize: px(0.0792) }}
          >
            Hi<span className="text-[0.3em] align-middle -mt-2 inline-block">～</span>
          </p>
          <h1
            className="hand font-bold text-marker leading-[1.2]"
            style={{ fontSize: px(0.033), marginTop: px(0.0132) }}
          >
            I&apos;m{" "}
            <span className="tracking-[0.12em] inline-flex">
              <span className="inline-block -rotate-3">蔡</span>
              <span className="inline-block rotate-2">振</span>
              <span className="inline-block -rotate-1">昊</span>
            </span>
          </h1>

          {/* four directions, hand-placed */}
          <div style={{ marginTop: px(0.0235) }}>
            <div className="flex items-baseline" style={{ columnGap: px(0.0088) }}>
              <span
                className="hand font-bold text-ink-blue leading-[1.5]"
                style={{ fontSize: px(0.0264) }}
              >
                动画
              </span>
              <span
                className="note text-[#2b2b2b] leading-[1.5]"
                style={{ fontSize: px(0.0176) }}
              >
                Animation
              </span>
              <span
                className="hand font-bold text-ink-blue leading-[1.4] -rotate-6"
                style={{ fontSize: px(0.022), marginLeft: px(0.0264) }}
              >
                AIGC
              </span>
            </div>
            <div
              className="flex items-baseline -rotate-2 inline-block"
              style={{
                columnGap: px(0.0088),
                marginLeft: px(0.0264),
                marginTop: px(0.0088),
              }}
            >
              <span
                className="hand font-bold text-ink-blue leading-[1.5]"
                style={{ fontSize: px(0.0264) }}
              >
                设计
              </span>
              <span
                className="note text-[#2b2b2b] leading-[1.5]"
                style={{ fontSize: px(0.0176) }}
              >
                Design
              </span>
            </div>
            <div
              className="flex items-baseline rotate-1 inline-block"
              style={{
                columnGap: px(0.0088),
                marginLeft: px(0.019),
                marginTop: px(0.0088),
              }}
            >
              <span
                className="hand font-bold text-ink-blue leading-[1.5]"
                style={{ fontSize: px(0.0264) }}
              >
                视频
              </span>
              <span
                className="note text-[#2b2b2b] leading-[1.5]"
                style={{ fontSize: px(0.0176) }}
              >
                Video
              </span>
            </div>
          </div>
        </div>

        {/* two decorative polaroids on the left page — kept low so they don't cover text */}
        <div
          className="absolute hidden md:block"
          style={{ left: "11%", bottom: "2%", transform: "rotate(-4deg)" }}
        >
          <img
            src="/assets/scrapbook/polaroid.webp"
            alt=""
            width={340}
            height={412}
            className="photo-shadow h-auto block"
            decoding="async"
            style={{ width: px(0.13) }}
          />
        </div>
        <div
          className="absolute hidden md:block"
          style={{ left: "24%", bottom: "2%", transform: "rotate(5deg)" }}
        >
          <img
            src="/assets/scrapbook/polaroid.webp"
            alt=""
            width={340}
            height={412}
            className="photo-shadow h-auto block"
            decoding="async"
            style={{ width: px(0.13) }}
          />
        </div>

        {/* ===== RIGHT PAGE ===== */}
        <div
          className="absolute hidden sm:block"
          style={{ left: "55%", top: "17%", width: "30%" }}
        >
          <p
            className="note leading-relaxed text-[#2b2b2b] text-left"
            style={{ fontSize: px(0.0143) }}
          >
            I&apos;m a multidisciplinary creative working across animation, design
            and post — strong visuals, thoughtful storytelling.
          </p>
        </div>

        {/* retro TV on the right page */}
        <div
          className="absolute hidden md:block"
          style={{
            left: "68%",
            top: "46%",
            width: "24.6%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="relative">
            <div className="overflow-hidden" style={{ aspectRatio: "0.982" }}>
              <img
                src="/assets/scrapbook/retro-tv.webp"
                alt=""
                width={641}
                height={855}
                className="photo-shadow w-full h-auto block"
                decoding="async"
              />
            </div>
            <Link
              href="/works"
              className="note absolute text-[#2b2b2b] hover:text-marker"
              style={{
                left: "18%",
                top: "36%",
                width: "50%",
                fontSize: px(0.011),
              }}
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
            src="/assets/scrapbook/arrow-red.webp"
            alt="see work"
            className="w-auto block photo-shadow group-hover:translate-x-1 transition-transform"
            style={{ height: px(0.0352) }}
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
