import WorkRoom, { type Work } from "@/components/WorkRoom";

const R2 = "https://pub-99c53aec3f634300b636798977401e47.r2.dev/monster-diner";

const works: Record<string, Work> = {
  monster_diner: {
    title: "怪兽小馆",
    en: "INK ANIMATION · 2023",
    cat: "动画",
    desc: "桃子和火不伙为妖怪开了一家小饭馆，一本食谱打破平静。B站 752.8 万播放，金龙奖最佳系列动画。",
    meta: ["上色 / 色检 / 后期", "B站 752.8 万播放", "金龙奖最佳系列动画"],
    cover: "/assets/works/monster-diner.png",
    episodesBase: R2,
    episodes: 12,
    external: "https://www.bilibili.com/bangumi/play/ss43359",
  },
  bottle: {
    title: "Bottle",
    en: "STOP MOTION · 2021",
    cat: "动画",
    desc: "本科毕业创作。定格动画，记录一个承载记忆的瓶子，虚实之间是对未来的告别。",
    meta: ["导演 / 动画 / 后期", "鲁迅美术学院毕业作品"],
    cover: "/assets/works/bottle.png",
  },
  guahua: {
    title: "挂画",
    en: "OPERA ANIMATION · 2019",
    cat: "动画",
    desc: "国家艺术基金项目，改编自传统戏曲《挂画》。",
    meta: ["后期合成", "国家艺术基金"],
    cover: "/assets/works/gua-hua.png",
  },
  wamao: {
    title: "瓦猫",
    en: "STOP MOTION · 2020",
    cat: "动画",
    desc: "云南瓦猫传说。神兽藏于门缝守护百姓，定格动画短片。",
    meta: ["脚本 / 分镜 / 场景 / 后期"],
    cover: "/assets/works/wamiao.png",
  },
};

export function generateStaticParams() {
  return Object.keys(works).map((slug) => ({ slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works[slug] ?? { title: slug, en: "", cat: "", desc: "", meta: [] };

  return <WorkRoom work={work} />;
}
