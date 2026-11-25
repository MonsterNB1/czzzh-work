// Design work lives here, one record per project. The index reads the cover,
// the detail page lays out the brief, the numbers and the plates group by group.

export type DesignBrief = { label: string; lines: string[] };

export type DesignStat = { value: string; label: string };

export type DesignPlateGroup = {
  label: string;
  shots: string[];
  /** how dense the grid runs: 2 / 3 for posters, 4 / 6 for small assets */
  cols?: 2 | 3 | 4 | 6;
  /** a link out to the full set, shown at the end of the group heading */
  more?: { href: string; label: string };
};

export type DesignData = {
  slug: string;
  title: string;
  /** one line under the title, what the thing is */
  sub?: string;
  /** small line beside the title, set in the typewriter face */
  en?: string;
  desc?: string;
  /** who made the work */
  credit?: string;
  group: "游戏项目" | "其他项目";
  /** portrait or landscape plate, decides how the grid hangs it */
  shape?: "portrait" | "landscape";
  /** big print at the top of the detail page, defaults to the cover */
  hero?: string;
  /** narrow-screen variant of the hero, offered alongside it in the srcset */
  heroSmall?: string;
  /** cover shown in the polaroid grid */
  cover?: string;
  /** -600 variant of the cover, served to narrow screens */
  thumb?: string;
  /** the brand mark shown instead of a cover on the index, when the project reads better as a logo */
  logo?: string;
  /** which board the mark is printed on: paper-white or ink */
  logoPlate?: "paper" | "ink";
  /** 项目 / 主题 / 定位 / 思路, laid out as a cross */
  brief?: DesignBrief[];
  /** the numbers the campaign landed */
  stats?: DesignStat[];
  /** platforms the material shipped on */
  platforms?: string[];
  /** store ranking screenshots, opened at full size */
  boards?: string[];
  meta?: string[];
  /** one section per folder the material came from */
  plates?: DesignPlateGroup[];
};

const MEDIA = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev"
).replace(/\/monster-diner$/, "");

/** a run of plates that ship inside the repo, under /public/design */
const local = (slug: string, key: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    `/design/${slug}/${key}-${String(i + 1).padStart(2, "0")}.webp`,
  );

/** a run of plates uploaded as <slug>/<key>-01.webp, -02.webp ... */
const series = (slug: string, key: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    `${MEDIA}/design/${slug}/${key}-${String(i + 1).padStart(2, "0")}.webp`,
  );

/** 驱入虚空：重出的大图在 design/quzhu/hd/ 下，编号同样是两位数 */
const hd = (key: string, n: number | number[]) =>
  (Array.isArray(n) ? n : Array.from({ length: n }, (_, i) => i + 1)).map(
    (i) => `${MEDIA}/design/quzhu/hd/${key}-${String(i).padStart(2, "0")}.webp`,
  );

export const designs: Record<string, DesignData> = {
  quzhu: {
    slug: "quzhu",
    title: "《驱入虚空》",
    sub: "近未来科幻题材第三人称射击游戏",
    en: "INTO THE VOID · PROMOTIONAL ART",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "版本 KV 定调，海报和公告跟着赛季节奏走，月历、表情包和周边把世界观铺到屏幕外。",
    meta: ["主视觉 / 版本宣发", "海报 / 公告 / 月历", "表情包 / 周边 / 线下"],
    hero: `${MEDIA}/design/quzhu/hd/hero.webp`,
    heroSmall: `${MEDIA}/design/quzhu/hd/hero-1200.webp`,
    cover: `${MEDIA}/design/quzhu/hd/cover.webp`,
    thumb: `${MEDIA}/design/quzhu/hd/cover-600.webp`,
    brief: [
      {
        label: "项目",
        lines: ["科幻悬疑叙事游戏", "虚空侵蚀世界观", "强氛围沉浸体验", "探索 / 生存 / 解谜结合"],
      },
      { label: "主题", lines: ["INTO THE VOID", "IF YOU SEE IT, IT SEES YOU"] },
      {
        label: "定位",
        lines: [
          "科幻心理压迫感",
          "现实感未来美学",
          "强视觉风格化",
          "偏情绪与沉浸体验",
          "非传统爽感战斗",
        ],
      },
      {
        label: "思路",
        lines: [
          "近未来背景，文明高度数字化后，现实世界开始出现无法解释的「虚空渗透」。",
          "世界表面正常，底层秩序已经逐渐失控。",
        ],
      },
    ],
    stats: [
      { value: "30W", label: "TapTap 预约" },
      { value: "5W", label: "B 站预约" },
      { value: "1W", label: "好游快爆预约" },
      { value: "100+", label: "首发版本 APPU" },
    ],
    platforms: [
      "Google Play",
      "WeGame",
      "STEAM",
      "TapTap",
      "4399",
      "联想应用商店",
      "顺网游戏",
      "云更新",
      "HONOR",
      "HUAWEI",
      "小米应用商店",
      "360 软件宝库",
      "vivo",
      "OPPO",
    ],
    boards: [`${MEDIA}/design/quzhu/board-01.webp`],
    plates: [
      { label: "赛季战令宣传封面", shots: hd("pass", 4) },
      { label: "社区更新公告", shots: hd("notice", 4) },
      { label: "KV · 主视觉", shots: hd("kv", [7, 2]) },
      { label: "角色展示海报系列", shots: hd("char", 6) },
      { label: "节日活动海报系列", shots: hd("festival", 4) },
      { label: "游戏月历系列", shots: hd("calendar", 7) },
      {
        label: "游戏内部美术资源 · 表情包 & 聊天表情",
        shots: hd("sticker", 12),
        cols: 6,
      },
      { label: "头像框", shots: hd("frame", 3), cols: 4 },
      { label: "称号", shots: hd("title", 3), cols: 2 },
      { label: "游戏周边产品上架", shots: hd("goods", 4), cols: 4 },
      {
        label: "期刊 & 漫画",
        shots: ["zine-01", "zine-03"].map((k) => `${MEDIA}/design/quzhu/${k}.webp`),
        cols: 2,
        more: { href: "/works/design/quzhu/journal", label: "全 7 件" },
      },
      { label: "线下物料", shots: hd("offline", 4), cols: 4 },
    ],
  },
  bluearchive: {
    slug: "bluearchive",
    title: "蔚蓝档案",
    sub: "Bilibili World 2026 展陈物料",
    en: "EXHIBITION DESIGN · BW2026",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "2026 Bilibili World 的线下展陈物料。主视觉、场内导视，加上人物与道具立牌，最后收进展位搭建的方案和效果图，印刷和现场都得对得上。",
    meta: ["主视觉 / 场内导视", "人物＋道具立牌 / 搭建方案"],
    cover: `${MEDIA}/design/bluearchive/hero-01.webp`,
    thumb: `${MEDIA}/design/bluearchive/hero-01-600.webp`,
    logo: `${MEDIA}/design/logos/bluearchive.webp`,
    logoPlate: "paper",
    plates: [
      { label: "展陈主视觉", shots: series("bluearchive", "hero", 3) },
      { label: "人物立牌", shots: series("bluearchive", "standee", 7) },
      { label: "品牌标识", shots: series("bluearchive", "brand", 2) },
    ],
  },
  xiaobingbing: {
    slug: "xiaobingbing",
    title: "小冰冰传奇",
    sub: "XG 战队 2026 赛季应援物料",
    en: "ESPORTS SUPPORT KIT",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "小冰冰传奇成为 XG 战队 2026 赛季官方赞助商，围绕这件事做了一整套应援物料：选手横幅、双面手举牌、稀有收藏卡、角色冰箱贴。",
    meta: ["应援 KV / 选手横幅", "收藏卡 / 冰箱贴"],
    cover: "/design/xiaobingbing/xbb-01.webp",
    thumb: "/design/xiaobingbing/xbb-01-600.webp",
    logo: `${MEDIA}/design/logos/xiaobingbing.webp`,
    logoPlate: "paper",
    plates: [
      { label: "应援 KV & 手举牌", shots: ["/design/xiaobingbing/xbb-01.webp", "/design/xiaobingbing/xbb-02.webp"] },
      { label: "选手应援横幅", shots: local("xiaobingbing", "xbb", 7).slice(2) },
      { label: "稀有收藏卡", shots: local("xiaobingbing", "xbb", 11).slice(7) },
      { label: "周边", shots: local("xiaobingbing", "xbb", 13).slice(11) },
      { label: "品牌标识", shots: ["/design/xiaobingbing/xbb-14.webp"] },
    ],
  },
  snk: {
    slug: "snk",
    title: "SNK",
    sub: "ChinaJoy 主视觉",
    en: "KEY VISUAL · CHINAJOY",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "SNK 在 ChinaJoy 的主 K 方向。KOF 群像站在夜色街头，字标压在画面上沿，整张图只做一件事：让人一眼认出来。",
    meta: ["主 KV 方向稿"],
    cover: "/design/snk/snk-01.webp",
    thumb: "/design/snk/snk-01-600.webp",
    logo: "/design/snk/logo.webp",
    logoPlate: "paper",
    plates: [{ label: "ChinaJoy 主 KV", shots: ["/design/snk/snk-01.webp"] }],
  },
  ro3: {
    slug: "ro3",
    title: "仙境传说 3",
    sub: "线下展台物料",
    en: "OFFLINE BOOTH KIT · RO3",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "仙境传说 3 的线下展台物料。从展台规则牌、通缉令集章、手举牌到一米栏插牌和 logo 贴，玩家从排队到领周边，每一步都有对应的牌子接住。",
    meta: ["展台规则牌 / 通缉令", "手举牌 / 插牌 / 展台标识"],
    hero: "/design/ro3/ro3-01.webp",
    cover: "/design/ro3/ro3-09.webp",
    thumb: "/design/ro3/ro3-09-600.webp",
    logo: "/design/ro3/logo.webp",
    logoPlate: "paper",
    plates: [
      { label: "展台规则牌", shots: local("ro3", "ro3", 4) },
      { label: "通缉令 · 集章", shots: local("ro3", "ro3", 8).slice(4) },
      { label: "手举牌", shots: local("ro3", "ro3", 12).slice(8) },
      { label: "一米栏插牌", shots: local("ro3", "ro3", 14).slice(12) },
      { label: "展台标识", shots: local("ro3", "ro3", 17).slice(14) },
    ],
  },
  silvercity: {
    slug: "silvercity",
    title: "白银之城",
    sub: "试玩整理券",
    en: "PLAYTEST TICKET",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "白银之城的试玩整理券。蓝紫夜色打底，书名号式的标题压在中间，纸片和标签散在四周，像一张能撕下来的票。",
    meta: ["整理券 / 试玩券"],
    cover: "/design/silvercity/yc-01.webp",
    thumb: "/design/silvercity/yc-01-600.webp",
    logo: `${MEDIA}/design/logos/silverpalace.webp`,
    logoPlate: "ink",
    plates: [{ label: "试玩整理券", shots: ["/design/silvercity/yc-01.webp"] }],
  },
  promo: {
    slug: "promo",
    title: "剧本宣发系列",
    en: "KEY VISUAL",
    group: "其他项目",
  },
};

/** the design index reads in exactly this order, grouped the same way */
export const designOrder = [
  "quzhu",
  "bluearchive",
  "xiaobingbing",
  "ro3",
  "snk",
  "silvercity",
  "promo",
] as const;
