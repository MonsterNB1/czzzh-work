// 《驱入虚空》期刊 & 漫画：主页面只摆三张做引子，完整一套放在这个二级页里。

const MEDIA = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev"
).replace(/\/monster-diner$/, "");

export type JournalItem = {
  src: string;
  w: number;
  h: number;
  caption: string;
  kind: "封面" | "内页" | "漫画";
};

const at = (key: string) => `${MEDIA}/design/quzhu/${key}.webp`;

export const quzhuJournal: JournalItem[] = [
  { src: at("zine-01"), w: 1600, h: 900, caption: "《高塔》VOL.6 · 七夕特刊 封面", kind: "封面" },
  { src: at("zine-02"), w: 1080, h: 4740, caption: "《高塔》VOL.6 · 七夕特刊 内页长图", kind: "内页" },
  { src: at("zine-03"), w: 1600, h: 900, caption: "《高塔》VOL.5 · 亡灵节 封面", kind: "封面" },
  { src: at("zine-04"), w: 1080, h: 6627, caption: "《高塔》VOL.5 · 亡灵节 内页长图", kind: "内页" },
  { src: at("zine-05"), w: 1400, h: 3613, caption: "四格漫画 · 七夕", kind: "漫画" },
  { src: at("zine-06"), w: 620, h: 1600, caption: "四格漫画 · 圣诞 01", kind: "漫画" },
  { src: at("zine-07"), w: 620, h: 1600, caption: "四格漫画 · 圣诞 02", kind: "漫画" },
];
