import Link from "next/link";
import { quzhuJournal } from "@/data/quzhuJournal";

/**
 * 《驱入虚空》期刊 & 漫画二级页：整期杂志和四格漫画都摊在这里，一张不裁。
 * 长图按原始比例整条往下铺，点开就是原尺寸。
 */
export default function QuzhuJournalPage() {
  const covers = quzhuJournal.filter((i) => i.kind === "封面");
  const pages = quzhuJournal.filter((i) => i.kind === "内页");
  const comics = quzhuJournal.filter((i) => i.kind === "漫画");

  return (
    <div className="grid-bg min-h-screen">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[84px] bg-gradient-to-b from-[#f5f1e6] via-[#f5f1e6]/85 to-transparent md:h-[100px]" />

      <Link
        href="/works/design/quzhu"
        className="fixed z-40 group top-[66px] left-4 md:absolute md:top-[7%] md:left-[3.2%]"
        aria-label="回到驱入虚空"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/scrapbook/arrow-red.webp"
          alt=""
          className="h-7 w-auto rotate-180 transition-transform group-hover:-translate-x-1 md:h-8"
        />
      </Link>

      <main className="mx-auto w-full max-w-[1180px] px-5 pt-24 pb-16 md:px-8 md:pt-24 md:pb-20">
        <div className="relative inline-block w-full max-w-[660px] bg-[#fbf9f1] px-4 py-3.5 shadow-[0_16px_30px_-16px_rgba(60,45,25,0.6)] rotate-[-0.6deg] md:px-5 md:py-4">
          <span className="tape -top-3 left-6 -rotate-3" style={{ width: 52, height: 14 }} />
          <p className="note type text-[10px] md:text-[11px] text-[#7d7d73]">
            INTO THE VOID · PERIODICAL &amp; COMIC
          </p>
          <h1 className="zh mt-1 text-[22px] leading-tight text-ink-blue md:text-[28px]">
            《驱入虚空》期刊 &amp; 漫画
          </h1>
          <p className="note mt-2 max-w-[560px] text-[11.5px] leading-[1.7] text-[#2f2f2c] md:text-[13px]">
            游戏内连载的《高塔》杂志：两期的封面和整页内文，加上七夕与圣诞的三条四格漫画。全部按原稿比例展示，不裁切，点开看原尺寸。
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
            {["封面 2", "内页长图 2", "四格漫画 3"].map((m) => (
              <span key={m} className="note text-[10px] text-[#7d7d73] md:text-[11px]">
                · {m}
              </span>
            ))}
          </div>
        </div>

        <Section label="期刊 · 封面" count={covers.length}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {covers.map((s) => (
              <Figure key={s.src} item={s} />
            ))}
          </div>
        </Section>

        <Section label="期刊 · 内页长图" count={pages.length}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {pages.map((s) => (
              <Figure key={s.src} item={s} />
            ))}
          </div>
        </Section>

        <Section label="四格漫画" count={comics.length}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {comics.map((s) => (
              <Figure key={s.src} item={s} />
            ))}
          </div>
        </Section>

        <p className="note mt-10 text-[11px] leading-[1.7] text-[#7d7d73] md:text-[12px]">
          全部物料独立设计 / 制作 · 建议点开原图看细节
        </p>
      </main>
    </div>
  );
}

function Section({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 md:mt-12">
      <div className="mb-4 flex items-center gap-2">
        <span className="hand text-[13px] text-marker md:text-[15px]">{label}</span>
        <span className="hand type text-[10px] text-[#a8a49a]">{count}</span>
        <span className="h-px flex-1 bg-[#e4dfd0]" />
      </div>
      {children}
    </section>
  );
}

function Figure({ item }: { item: { src: string; w: number; h: number; caption: string } }) {
  return (
    <figure className="break-inside-avoid">
      <a
        href={item.src}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        style={{ maxWidth: `min(100%, ${item.w}px)` }}
      >
        <div className="bg-[#fdfcf7] p-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_10px_22px_-14px_rgba(80,65,35,0.55)] transition-transform duration-300 group-hover:-translate-y-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.caption}
            width={item.w}
            height={item.h}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      </a>
      <figcaption className="hand mt-2 text-[10px] leading-[1.3] text-[#4a4a44] md:text-[11px]">
        {item.caption}
      </figcaption>
    </figure>
  );
}
