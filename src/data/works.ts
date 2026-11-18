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
  /** the cover's own orientation, so the index can hang it the right way up */
  shape?: "portrait" | "landscape";
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
    desc: "水墨动画。桃子、火不伙和阿福守着一家专给妖怪开的小饭馆，菜的口碑一直不错；一本食谱的出现，把这里的平静打破了。",
    meta: ["水墨动画 / 上色 / 色检 / 后期", "B站 752.8 万播放", "金龙奖最佳系列动画"],
    shape: "portrait",
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
    desc: "本科毕业创作动画短片。定格拍摄，在梦幻和现实之间搭了一个「虚与实」的空间，写对未来的焦虑，也写和过去那段时间的告别。",
    meta: ["定格动画拍摄 / 后期制作", "导演 / 动画", "鲁迅美术学院毕业作品"],
    cover: "/assets/works/bottle.webp",
    video: film("bottle"),
  },
  wamao: {
    slug: "wamao",
    title: "瓦猫",
    en: "STOP MOTION · 2020",
    cat: "动画",
    desc: "定格动画。传说南邵古国时妖怪为祸人间，百姓与妖物相斗，死伤惨重；上天不愿看人间疾苦，派神兽下凡，藏在门缝里替人家挡灾。",
    meta: ["脚本 / 分镜 / 场景美术", "后期合成"],
    cover: "/assets/works/wamiao.webp",
    video: film("wamao"),
  },
  guahua: {
    slug: "guahua",
    title: "挂画",
    en: "OPERA ANIMATION · 2019",
    cat: "动画",
    desc: "国家艺术基金项目，二维动画。改编自传统戏曲《挂画》：耶律含嫣与猎户花云彼此爱慕，哥哥不允；哥哥大婚当天，含嫣假意布置新房，让花云男扮女装混进府里，二人趁机逃走。",
    meta: ["后期合成", "国家艺术基金", "二维动画"],
    cover: "/assets/works/gua-hua.webp",
    video: film("guahua"),
  },
};

/** the index reads top to bottom in exactly this order */
export const animationOrder = ["monster_diner", "bottle", "wamao", "guahua"] as const;
