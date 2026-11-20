import Link from "next/link";
import type { WorkData } from "@/data/works";

/**
 * A series that lives as stills only — covers, maps, character sheets. No player,
 * so the page is a wall of prints, each hung at its own size and never blown up
 * past its real pixels.
 */
export default function WorkGallery({ work }: { work: WorkData }) {
  const shots = work.gallery;
  if (!shots) return null;

  const tilts = [-0.7, 0.5, -0.4, 0.8, -0.6, 0.3];
  // two stills (a cover and its vertical cut) belong side by side, not in two columns
  const rowMode = shots.length <= 2;

  return (
    <div className="grid-bg min-h-screen">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[84px] bg-gradient-to-b from-[#f5f1e6] via-[#f5f1e6]/85 to-transparent md:h-[100px]" />

      <Link
        href="/works"
        className="fixed z-40 group top-[66px] left-4 md:absolute md:top-[7%] md:left-[3.2%]"
        aria-label="回到作品页"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/scrapbook/arrow-red.webp"
          alt=""
          className="h-7 w-auto rotate-180 transition-transform group-hover:-translate-x-1 md:h-8"
        />
      </Link>

      <main className="mx-auto w-full max-w-[1180px] px-5 pt-24 pb-16 md:px-8 md:pt-24 md:pb-20">
        <div className="relative inline-block w-full max-w-[600px] bg-[#fbf9f1] px-4 py-3.5 shadow-[0_16px_30px_-16px_rgba(60,45,25,0.6)] rotate-[-0.6deg] md:px-5 md:py-4">
          <span className="tape -top-3 left-6 -rotate-3" style={{ width: 52, height: 14 }} />
          <p className="note type text-[10px] md:text-[11px] text-[#7d7d73]">{work.en}</p>
          <h1 className="zh mt-1 text-[22px] leading-tight text-ink-blue md:text-[28px]">
            {work.title}
          </h1>
          <p className="note mt-2 max-w-[520px] text-[11.5px] leading-[1.7] text-[#2f2f2c] md:text-[13px]">
            {work.desc}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
            {work.meta.map((m) => (
              <span key={m} className="note text-[10px] text-[#7d7d73] md:text-[11px]">
                · {m}
              </span>
            ))}
          </div>
        </div>

        {/* prints, in reading order, column by column; a pair reads better as a row */}
        <div
          className={
            rowMode
              ? "mt-9 flex flex-wrap items-start gap-4 md:mt-12 md:gap-7"
              : "mt-9 gap-4 md:mt-12 md:columns-2 md:gap-7"
          }
        >
          {shots.map((s, i) => (
            <figure
              key={s.src}
              className="mb-5 break-inside-avoid md:mb-7"
              style={rowMode ? { width: s.w, maxWidth: "100%", flex: "0 0 auto" } : undefined}
            >
              <a
                href={s.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                style={{ maxWidth: `min(100%, ${s.w}px)` }}
              >
                <div
                  className="bg-[#fdfcf7] p-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_10px_22px_-14px_rgba(80,65,35,0.55)] transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{ rotate: `${tilts[i % tilts.length]}deg` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={s.caption ?? work.title}
                    width={s.w}
                    height={s.h}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="block w-full h-auto"
                  />
                </div>
              </a>
              {s.caption ? (
                <figcaption className="hand mt-2 text-[10px] leading-[1.3] text-[#4a4a44] md:text-[11px]">
                  {s.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>

        {work.galleryNote ? (
          <p className="note mt-6 text-[11px] leading-[1.7] text-[#7d7d73] md:text-[12px]">
            {work.galleryNote}
          </p>
        ) : null}
      </main>
    </div>
  );
}
