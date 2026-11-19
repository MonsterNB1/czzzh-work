// One source of truth for the four films: the index lists them, the TV room
// plays them, and neither keeps its own copy of the blurb.

/** a clip that is not numbered ep1..epN: the films and the trailers name their own chapters */
export type WorkChapter = { label: string; src: string };

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
  /** clips that carry their own name instead of an episode number */
  chapters?: WorkChapter[];
  external?: string;
};

// NEXT_PUBLIC_MEDIA_BASE wants the storage root (https://cdn.czzzh.work), a
// trailing /monster-diner is tolerated so the older value keeps working.
const MEDIA_ROOT = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev"
).replace(/\/monster-diner$/, "");

const film = (slug: string) => `${MEDIA_ROOT}/${slug}/ep1.mp4`;

/** a clip that already sits at its own path under the storage root */
const clip = (path: string) => `${MEDIA_ROOT}/${path}`;

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

  // ---- 商业影像: the clips live under portfolio/ and misc/ on the storage root,
  // ---- each one already named after what it is, so they carry chapters, not ep numbers
  quzhu_videos: {
    slug: "quzhu_videos",
    title: "《驱入虚空》PV 与实机",
    en: "GAME TRAILERS · 2024",
    cat: "视频",
    desc: "游戏版本的宣传影像。公测、实机、一周年、2.0 四个节点的 PV，加上三个角色展示和「搜集暗令」系列的实机演示，一条片子对一个版本节奏。",
    meta: ["PV 剪辑 / 动效包装 / 字幕", "角色展示与实机演示"],
    shape: "landscape",
    cover: "/assets/works/quzhu-videos.webp",
    chapters: [
      { label: "公测 PV", src: clip("quzhu/videos/pv-open-beta.mp4") },
      { label: "实机 PV", src: clip("quzhu/videos/pv-gameplay.mp4") },
      { label: "一周年 PV", src: clip("quzhu/videos/pv-anniversary-1st.mp4") },
      { label: "2.0 版本 PV", src: clip("quzhu/videos/pv-2.0.mp4") },
      { label: "审核版 PV", src: clip("quzhu/videos/pv-review.mp4") },
      { label: "角色 · 沙娜", src: clip("quzhu/videos/character-shana.mp4") },
      { label: "角色 · 帕梅拉", src: clip("quzhu/videos/character-pamela-2.mp4") },
      { label: "角色 · 邵凯琳", src: clip("quzhu/videos/character-shaokailin.mp4") },
      { label: "暗令八 · 公告", src: clip("quzhu/videos/announcement-ep08.mp4") },
      { label: "暗令九 · 实机", src: clip("quzhu/videos/gameplay-ep09.mp4") },
      { label: "暗令十 · 实机", src: clip("quzhu/videos/gameplay-ep10.mp4") },
      { label: "暗令十一 · 实机", src: clip("quzhu/videos/gameplay-ep11.mp4") },
      { label: "BP7 · 帕梅拉", src: clip("quzhu/videos/gameplay-bp7-pamela.mp4") },
    ],
  },
  jianglan: {
    slug: "jianglan",
    title: "绿城 · 江澜鸣翠",
    en: "PROPERTY FILM · 2023",
    cat: "视频",
    desc: "99 户型的二维动画产品片，横版 Bcopy 定稿。插画分镜把户型的采光、视野和园区景观拆成几个具体场景来讲。",
    meta: ["二维动画 / 场景拼接", "户型视频 · Bcopy"],
    shape: "landscape",
    cover: "/assets/works/jianglan.webp",
    video: clip("portfolio/jianglanmingcui-apartment.mp4"),
  },
  alibaba: {
    slug: "alibaba",
    title: "阿里国际站采购节",
    en: "CAMPAIGN FILM · 2023",
    cat: "视频",
    desc: "9 月采购节的资金篇定稿。整片按卖点分段，一段一个功能，节奏卡得很紧。",
    meta: ["剪辑 / 字幕包装", "2K 素材交付"],
    shape: "landscape",
    cover: "/assets/works/alibaba.webp",
    video: clip("portfolio/alibaba-international-funding.mp4"),
  },
  alipay: {
    slug: "alipay",
    title: "支付宝广告开场片",
    en: "OPENING SEQUENCE · 2023",
    cat: "视频",
    desc: "企业进程宣传片的开场段。数据流从暗处浮上来，把年份数字当成一块正在成形的电路板来做。",
    meta: ["开场剪辑 / 三维动效"],
    shape: "landscape",
    cover: "/assets/works/alipay.webp",
    video: clip("portfolio/alipay-opening-film.mp4"),
  },
  cafa: {
    slug: "cafa",
    title: "中国美院毕业季",
    en: "GRADUATION FILM · 2024",
    cat: "视频",
    desc: "2024 届毕业展宣传片，竖屏发布版。整片像一张不断生长的海报，线条一根根连起来。",
    meta: ["竖屏版剪辑 / 版式动效"],
    shape: "portrait",
    cover: "/assets/works/cafa.webp",
    video: clip("portfolio/cafa-graduation-film.mp4"),
  },
  midea: {
    slug: "midea",
    title: "美的智慧家",
    en: "BRAND SHORTS · 2024",
    cat: "视频",
    desc: "智能家居的系列短视频，竖屏发布。三条片子各对一个产品卖点，负责脚本可视化与后期合成。",
    meta: ["竖屏短视频 / 后期合成"],
    shape: "portrait",
    cover: "/assets/works/midea.webp",
    chapters: [
      { label: "短片 01", src: clip("portfolio/midea-smart-home/video-01.mp4") },
      { label: "短片 02", src: clip("portfolio/midea-smart-home/video-02.mp4") },
      { label: "短片 03", src: clip("portfolio/midea-smart-home/video-03.mp4") },
    ],
  },
  shenzhen: {
    slug: "shenzhen",
    title: "深圳机场乘机码",
    en: "PROCESS FILM · 2023",
    cat: "视频",
    desc: "机场乘机码的流程演示片。从一个旅客进 T3 开始，把刷码、安检、登机串成一条能看完的线。",
    meta: ["流程演示 / 实拍剪辑", "ProRes 母版转网页版"],
    shape: "landscape",
    cover: "/assets/works/shenzhen.webp",
    video: clip("misc/shenzhen-airport-boarding.mp4"),
  },
};

/** the index reads top to bottom in exactly this order */
export const animationOrder = ["monster_diner", "bottle", "wamao", "guahua"] as const;

/** the video tab reads in this order */
export const videoOrder = [
  "jianglan",
  "alibaba",
  "alipay",
  "cafa",
  "midea",
  "quzhu_videos",
  "shenzhen",
] as const;

