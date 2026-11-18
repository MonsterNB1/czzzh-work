// Design work lives here, one record per project. The index reads the cover,
// the detail page walks `plates` group by group.

export type DesignPlateGroup = { label: string; shots: string[] };

export type DesignData = {
  slug: string;
  title: string;
  /** small line beside the title, set in the typewriter face */
  en?: string;
  desc?: string;
  meta?: string[];
  group: "游戏项目" | "其他项目";
  /** portrait or landscape plate, decides how the grid hangs it */
  shape?: "portrait" | "landscape";
  /** cover shown in the polaroid grid */
  cover?: string;
  /** -600 variant of the cover, served to narrow screens */
  thumb?: string;
  /** one section per folder the material came from */
  plates?: DesignPlateGroup[];
};

const MEDIA = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev"
).replace(/\/monster-diner$/, "");

/** a run of plates uploaded as <slug>/<key>-01.webp, -02.webp ... */
const series = (slug: string, key: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    `${MEDIA}/design/${slug}/${key}-${String(i + 1).padStart(2, "0")}.webp`,
  );

const quzhuCover = `${MEDIA}/design/quzhu/kv-08.webp`;

export const designs: Record<string, DesignData> = {
  quzhu: {
    slug: "quzhu",
    title: "《驱入虚空》",
    en: "GAME ART · IN TO THE VOID",
    group: "游戏项目",
    desc: "《驱入虚空》的视觉与运营物料。版本 KV 和五图负责定调，海报、战令、公告跟着版本节奏走，期刊漫画和表情包把世界观铺开；线下的易拉宝、店里的伞和钥匙扣，是同一套语言落到了实物上。",
    meta: ["主视觉 / 五图 / 海报", "期刊漫画 / 表情包", "线下物料 / 周边电商"],
    cover: quzhuCover,
    thumb: `${MEDIA}/design/quzhu/kv-08-600.webp`,
    plates: [
      { label: "主视觉 KV", shots: series("quzhu", "kv", 8) },
      { label: "版本五图", shots: series("quzhu", "ver", 6) },
      { label: "期刊 & 漫画", shots: series("quzhu", "journal", 5) },
      { label: "活动海报", shots: series("quzhu", "poster", 6) },
      { label: "战令 & 更新公告", shots: series("quzhu", "bp", 5) },
      { label: "线下物料", shots: series("quzhu", "offline", 3) },
      { label: "周边 · 电商", shots: series("quzhu", "merch", 3) },
      { label: "表情包", shots: series("quzhu", "emoji", 6) },
      { label: "游戏月历", shots: series("quzhu", "cal", 3) },
    ],
  },
  bluearchive: {
    slug: "bluearchive",
    title: "蔚蓝档案",
    en: "KEY VISUAL · BLUE ARCHIVE",
    group: "游戏项目",
    desc: "蔚蓝档案的线下展陈物料。从人物立牌到启动页、顶部宣传图，最后落到展位搭建的效果图上，一套东西要在屏幕、印刷和现场都对得上。",
    meta: ["立牌 / 启动页 / 宣传图", "展位搭建"],
    cover: `${MEDIA}/design/bluearchive/hero-01.webp`,
    thumb: `${MEDIA}/design/bluearchive/hero-01-600.webp`,
    plates: [
      { label: "展陈主视觉", shots: series("bluearchive", "hero", 3) },
      { label: "人物立牌", shots: series("bluearchive", "standee", 7) },
      { label: "品牌标识", shots: series("bluearchive", "brand", 2) },
    ],
  },
  snk: {
    slug: "snk",
    title: "SNK",
    en: "GAME ART",
    group: "游戏项目",
  },
  xiaobingbing: {
    slug: "xiaobingbing",
    title: "小冰冰传奇",
    en: "GAME ART",
    group: "游戏项目",
  },
  ro3: {
    slug: "ro3",
    title: "仙境传说 3",
    en: "GAME ART",
    group: "游戏项目",
  },
  promo: {
    slug: "promo",
    title: "剧本宣发系列",
    en: "KEY VISUAL",
    group: "其他项目",
  },
};

/** the design index reads in exactly this order, grouped the same way */
export const designOrder = ["quzhu", "bluearchive", "snk", "xiaobingbing", "ro3", "promo"] as const;
