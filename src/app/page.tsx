"use client";

import Link from "next/link";
import TVScreen from "@/components/TVScreen";

// every size below is expressed as a fraction of the book width (--wb),
// so the whole spread scales as one piece on any window.
const px = (k: number) => `calc(${k} * var(--wb))`;

// inner photo window of the polaroid frame, as a fraction of the frame box.
// the photo layer sits slightly larger than the punched hole so the frame's
// pale inner lip is covered and no white seam shows around the picture.
const POLAROID_INNER = {
  left: "11%",
  top: "10%",
  width: "81%",
  height: "65%",
};

// the four disciplines on the left page double as entry points into the
// matching tab of the work index
const DISCIPLINES = [
  { zh: "动画", en: "Animation", tab: "animation" },
  { zh: "设计", en: "Design", tab: "design" },
  { zh: "视频", en: "Video", tab: "video" },
  { zh: "AIGC", en: "", tab: "aigc" },
];

const worksHref = (tab: string) => `/works?tab=${tab}`;

export default function Home() {
  return (
    <div className="grid-bg relative min-h-screen w-full overflow-hidden md:flex md:items-start md:justify-center md:px-4 md:pt-24 md:pb-8">
      {/* =================== phone / narrow screens =================== */}
      {/* the two-page spread cannot be read on a 390px viewport, so phones get
          a single sheet with the same handwriting and the same tape-and-paper feel */}
      <div className="md:hidden px-5 pt-24 pb-10">
        <div className="relative bg-[#fbfaf4] border border-[#e6e0cf] shadow-[0_20px_44px_-20px_rgba(60,45,25,0.5)] rotate-[-0.7deg] px-6 pt-9 pb-8">
          <span className="tape -top-2 left-10 -rotate-2" style={{ width: 58, height: 14 }} />

          <p className="hand type font-bold text-ink-blue leading-[0.9] text-[64px]">
            Hi<span className="text-[22px] align-super">～</span>
          </p>
          <h1 className="hand type font-bold text-ink-blue text-[22px] mt-3 leading-[1.3]">
            I&apos;m{" "}
            <span className="tracking-[0.12em] inline-flex">
              <span className="inline-block -rotate-3">蔡</span>
              <span className="inline-block rotate-2">振</span>
              <span className="inline-block -rotate-1">昊</span>
            </span>
          </h1>

          <div className="mt-6 grid grid-cols-2 gap-y-2 gap-x-3">
            {DISCIPLINES.map((d) => (
              <Link
                key={d.zh}
                href={worksHref(d.tab)}
                className="flex items-baseline gap-1.5 transition-opacity hover:opacity-70"
              >
                <span className={`hand font-bold text-marker text-[17px] leading-[1.4]${d.zh === "AIGC" ? " zh" : ""}`}>
                  {d.zh}
                </span>
                {d.en && <span className="note type text-[#2b2b2b] text-[12px] leading-[1.4]">{d.en}</span>}
              </Link>
            ))}
          </div>

          <p className="note type text-[13px] leading-[1.65] text-[#2b2b2b] mt-7">
            I&apos;m a multidisciplinary creative working across animation, design and post --
            strong visuals, thoughtful storytelling.
          </p>

          <div className="mt-9 flex items-end gap-5">
            <div className="relative w-[44%] rotate-[-4deg]">
              <div className="absolute overflow-hidden" style={POLAROID_INNER}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/scrapbook/polaroid-portrait-a.webp"
                  alt=""
                  decoding="async"
                  className="block h-full w-full object-cover"
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/scrapbook/polaroid.webp"
                alt=""
                width={340}
                height={412}
                decoding="async"
                className="photo-shadow relative z-10 block h-auto w-full"
              />
            </div>
            <div className="relative w-[44%] rotate-[5deg] -mb-1">
              <div className="absolute overflow-hidden" style={POLAROID_INNER}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/scrapbook/polaroid-portrait-b.webp"
                  alt=""
                  decoding="async"
                  className="block h-full w-full object-cover"
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/scrapbook/polaroid.webp"
                alt=""
                width={340}
                height={412}
                decoding="async"
                className="photo-shadow relative z-10 block h-auto w-full"
              />
            </div>
          </div>

          <Link href="/works" className="mt-10 flex flex-col items-center group">
            <div className="relative w-[62%]">
              {/* clip sits behind the artwork and shows through its transparent screen */}
              <div
                className="absolute"
                style={{
                  left: "8.4%",
                  top: "5.8%",
                  width: "62.4%",
                  height: "41.2%",
                  overflow: "hidden",
                }}
              >
                <TVScreen mobile />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/scrapbook/retro-tv-440.webp"
                alt=""
                width={641}
                height={855}
                decoding="async"
                className="photo-shadow relative z-10 w-full h-auto block"
              />
            </div>
            <span className="note type text-[13px] text-[#2b2b2b] mt-3 group-hover:text-marker">
              try changing the channel →
            </span>
          </Link>

          <Link href="/works" className="mt-6 flex justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/scrapbook/arrow-red.webp" alt="see work" className="h-9 w-auto block" />
          </Link>
        </div>

        <div className="mt-8 flex justify-between note text-[12px] text-ink-soft">
          <span>© 2026 Czzzh</span>
          <span>Hangzhou — China</span>
        </div>
      </div>

      {/* =================== tablet and up: the open spread =================== */}
      <div
        className="relative hidden md:block w-full max-w-7xl -mt-2"
        style={
          {
            "--wb": "min(calc(100vw - 32px), 1280px)",
          } as React.CSSProperties
        }
      >
        {/* phones must not spend 146KB on a book they will never see:
            the media query keeps the artwork off small screens */}
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet="/assets/scrapbook/notebook-open.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/blank.svg"
            alt=""
            width={1888}
            height={971}
            className="w-full h-auto block"
            draggable={false}
            fetchPriority="high"
          />
        </picture>

        {/* ===== LEFT PAGE ===== */}
        {/* big "Hi, I'm" + smaller name, left aligned */}
        <div className="absolute" style={{ left: "13%", top: "13%" }}>
          <p
            className="hand type font-bold text-ink-blue leading-none"
            style={{ fontSize: px(0.068) }}
          >
            Hi<span className="text-[0.3em] align-middle -mt-2 inline-block">～</span>
          </p>
          <h1
            className="hand type font-bold text-ink-blue leading-[1.2]"
            style={{ fontSize: px(0.033), marginTop: px(0.003), marginLeft: px(0.006) }}
          >
            I&apos;m{" "}
            <span className="tracking-[0.12em] inline-flex">
              <span className="inline-block -rotate-3">蔡</span>
              <span className="inline-block rotate-2">振</span>
              <span className="inline-block -rotate-1">昊</span>
            </span>
          </h1>

          {/* four directions, two columns: animation+design left, AIGC+video right.
              each word is also the way into its tab on the work index */}
          <div
            style={{
              marginTop: px(0.0235),
              display: "grid",
              gridTemplateColumns: "max-content max-content",
              columnGap: px(0.075),
              rowGap: px(0.006),
              alignItems: "baseline",
            }}
          >
            <Link
              href={worksHref("animation")}
              className="flex items-baseline -rotate-2 transition-opacity hover:opacity-70"
              style={{ columnGap: px(0.0088) }}
            >
              <span
                className="hand font-bold text-marker leading-[1.5]"
                style={{ fontSize: px(0.0264) }}
              >
                动画
              </span>
              <span
                className="note type text-[#2b2b2b] leading-[1.5]"
                style={{ fontSize: px(0.0176) }}
              >
                Animation
              </span>
            </Link>
            <Link
              href={worksHref("aigc")}
              className="flex items-baseline transition-opacity hover:opacity-70"
              style={{ columnGap: px(0.0088) }}
            >
              <span
                className="hand zh font-bold text-marker leading-[1.4] -rotate-6"
                style={{ fontSize: px(0.022) }}
              >
                AIGC
              </span>
            </Link>
            <Link
              href={worksHref("design")}
              className="flex items-baseline rotate-1 transition-opacity hover:opacity-70"
              style={{ columnGap: px(0.0088), marginLeft: px(0.014), marginTop: px(0.004) }}
            >
              <span
                className="hand font-bold text-marker leading-[1.5]"
                style={{ fontSize: px(0.0264) }}
              >
                设计
              </span>
              <span
                className="note type text-[#2b2b2b] leading-[1.5]"
                style={{ fontSize: px(0.0176) }}
              >
                Design
              </span>
            </Link>
            <Link
              href={worksHref("video")}
              className="flex items-baseline rotate-1 transition-opacity hover:opacity-70"
              style={{ columnGap: px(0.0088), marginLeft: px(0.006), marginTop: px(0.004) }}
            >
              <span
                className="hand font-bold text-marker leading-[1.5]"
                style={{ fontSize: px(0.0264) }}
              >
                视频
              </span>
              <span
                className="note type text-[#2b2b2b] leading-[1.5]"
                style={{ fontSize: px(0.0176) }}
              >
                Video
              </span>
            </Link>
          </div>
        </div>

        {/* two decorative polaroids on the left page — kept low so they don't cover text */}
        <div
          className="absolute hidden md:block"
          style={{ left: "11%", bottom: "12%", transform: "rotate(-4deg)" }}
        >
          <div className="relative">
            <div className="absolute overflow-hidden" style={POLAROID_INNER}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/scrapbook/polaroid-portrait-a.webp"
                alt=""
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </div>
            <img
              src="/assets/scrapbook/polaroid.webp"
              alt=""
              width={340}
              height={412}
              className="photo-shadow relative z-10 h-auto block"
              decoding="async"
              style={{ width: px(0.13) }}
            />
          </div>
        </div>
        <div
          className="absolute hidden md:block"
          style={{ left: "24%", bottom: "12%", transform: "rotate(5deg)" }}
        >
          <div className="relative">
            <div className="absolute overflow-hidden" style={POLAROID_INNER}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/scrapbook/polaroid-portrait-b.webp"
                alt=""
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </div>
            <img
              src="/assets/scrapbook/polaroid.webp"
              alt=""
              width={340}
              height={412}
              className="photo-shadow relative z-10 h-auto block"
              decoding="async"
              style={{ width: px(0.13) }}
            />
          </div>
        </div>

        {/* ===== RIGHT PAGE ===== */}
        <div
          className="absolute hidden sm:block"
          style={{ left: "55%", top: "17%", width: "30%" }}
        >
          <p
            className="note type leading-relaxed text-[#2b2b2b] text-left"
            style={{ fontSize: px(0.0143) }}
          >
            I&apos;m a multidisciplinary creative working across animation, design
            and post -- strong visuals, thoughtful storytelling.
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
            // the TV stand runs past the bottom edge of the paper; clip it at
            // the sheet edge without touching the TV's size or position
            clipPath: "inset(0 0 20.8% 0)",
          }}
        >
          <div className="relative">
            {/* live clip playing inside the TV glass — it sits BEHIND the artwork
                and shows through the artwork's transparent screen, so the bezel
                itself masks the edges and no white sliver can appear */}
            <div
              className="absolute"
              style={{
                left: "8.4%",
                top: "5.8%",
                width: "62.4%",
                height: "41.2%",
                overflow: "hidden",
              }}
            >
              <TVScreen />
            </div>

            <picture className="relative z-10 block w-full">
              <source media="(min-width: 768px)" srcSet="/assets/scrapbook/retro-tv.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/blank.svg"
                alt=""
                width={641}
                height={855}
                className="photo-shadow w-full h-auto block"
                decoding="async"
              />
            </picture>

            <Link
              href="/works"
              className="note type absolute text-[#2b2b2b] hover:text-marker"
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
      <div className="hidden md:block absolute bottom-4 left-6 note text-sm text-ink-soft">
        © 2026 Czzzh, All rights reserved
      </div>
      <div className="hidden md:block absolute bottom-4 right-6 note text-sm text-ink-soft">
        Hangzhou — China
      </div>
    </div>
  );
}
