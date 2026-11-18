// Design work lives here, one record per project. The index reads the covers
// off `group`, the detail page reads the plate stack off `shots`.

export type DesignData = {
  slug: string;
  title: string;
  /** small line beside the title, set in the typewriter face */
  en?: string;
  desc?: string;
  meta?: string[];
  group: "游戏项目" | "其他项目";
  /** portrait or landscape plate — decides how the index hangs it */
  shape?: "portrait" | "landscape";
  /** cover shown in the polaroid grid; falls back to a blank frame */
  cover?: string;
  /** everything shown in the detail page, cover first */
  shots?: string[];
};

export const designs: Record<string, DesignData> = {
  quzhu: {
    slug: "quzhu",
    title: "《驱逐虚空》",
    en: "GAME ART",
    group: "游戏项目",
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
  bluearchive: {
    slug: "bluearchive",
    title: "蔚蓝档案",
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
export const designOrder = ["quzhu", "snk", "xiaobingbing", "bluearchive", "ro3", "promo"] as const;
