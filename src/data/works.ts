// One source of truth for the four films: the index lists them, the TV room
// plays them, and neither keeps its own copy of the blurb.

export type WorkData = {
  slug: string;
  title: string;
  en: string;
  cat: string;
  /** short pitch, shown beside the cover in the index */
  desc: string;
  /** credits / facts, shown as small bullets */
  meta: string[];
  cover: string;
  /** single film at <root>/<slug>/ep1.mp4 */
  video?: string;
  /** series at <root>/<slug>/ep1.mp4 ... epN.mp4 */
  episodesBase?: string;
  episodes?: number;
  external?: string;
};

// NEXT_PUBLIC_MEDIA_BASE wants the storage root (https://cdn.czzzh.work), a
// trailing /monster-diner is tolerated so the older value keeps working.
const MEDIA_ROOT = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev"
).replace(/\/monster-diner$/, "");

const film = (slug: string) => `${MEDIA_ROOT}/${slug}/ep1.mp4`;

export const works: Record<string, WorkData> = {
  monster_diner: {
    slug: "monster_diner",
    title: "怪兽小馆",
    en: "INK ANIMATION · 2023",
    cat: "动画",
    desc: "桃子和火不伙为妖怪开了一家小饭馆，一本食谱打破平静。B站 752.8 万播放，金龙奖最佳系列动画。",
    meta: ["上色 / 色检 / 后期", "B站 752.8 万播放", "金龙奖最佳系列动画"],
    cover: "/assets/works/monster-diner.webp",
    episodesBase: `${MEDIA_ROOT}/monster-diner`,
    episodes: 12,
    external: "https://www.bilibili.com/bangumi/play/ss43359",
  },
  bottle: {
    slug: "bottle",
    title: "Bottle",
    en: "STOP MOTION · 2021",
    cat: "动画",
    desc: "本科毕业创作。定格动画，记录一个承载记忆的瓶子，虚实之间是对未来的告别。",
    meta: ["导演 / 动画 / 后期", "鲁迅美术学院毕业作品"],
    cover: "/assets/works/bottle.webp",
    video: film("bottle"),
  },
  wamao: {
    slug: "wamao",
    title: "瓦猫",
    en: "STOP MOTION · 2020",
    cat: "动画",
    desc: "云南瓦猫传说。神兽藏于门缝守护百姓，定格动画短片。",
    meta: ["脚本 / 分镜 / 场景 / 后期"],
    cover: "/assets/works/wamiao.webp",
    video: film("wamao"),
  },
  guahua: {
    slug: "guahua",
    title: "挂画",
    en: "OPERA ANIMATION · 2019",
    cat: "动画",
    desc: "国家艺术基金项目，改编自传统戏曲《挂画》。",
    meta: ["后期合成", "国家艺术基金"],
    cover: "/assets/works/gua-hua.webp",
    video: film("guahua"),
  },
};

/** the index reads top to bottom in exactly this order */
export const animationOrder = ["monster_diner", "bottle", "wamao", "guahua"] as const;
