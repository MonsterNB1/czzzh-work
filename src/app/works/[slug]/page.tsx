import Link from "next/link";
import Viewer3D from "@/components/Viewer3D";

const works: Record<string, { title: string; cat: string; en: string; desc: string; meta: string[]; video?: string }> = {
  bottle: {
    title: "Bottle",
    en: "STOP MOTION · 2021",
    cat: "动画",
    desc: "本科毕业创作。定格动画，记录一个承载记忆的瓶子，虚实之间是对未来的告别。",
    meta: ["导演 / 动画 / 后期", "鲁迅美术学院毕业作品"],
  },
  monster_diner: {
    title: "怪兽小馆",
    en: "INK ANIMATION · 2023",
    cat: "动画",
    desc: "桃子和火不伙为妖怪开了一家小饭馆，一本食谱打破平静。B站752.8万播放，获金龙奖最佳系列动画。",
    meta: ["上色 / 色检 / 后期", "B站 752.8万播放", "金龙奖最佳系列动画"],
    video: "https://www.bilibili.com/bangumi/play/ss43359",
  },
  wamao: {
    title: "瓦猫",
    en: "STOP MOTION · 2020",
    cat: "动画",
    desc: "云南瓦猫传说。神兽藏于门缝守护百姓，定格动画短片。",
    meta: ["脚本 / 分镜 / 场景 / 后期"],
  },
  guahua: {
    title: "挂画",
    en: "OPERA ANIMATION · 2019",
    cat: "动画",
    desc: "国家艺术基金项目，改编自传统戏曲《挂画》。",
    meta: ["后期合成", "国家艺术基金"],
  },
  river_gods: {
    title: "河神纪元",
    en: "AIGC GAME ART · 2025",
    cat: "AIGC",
    desc: "陨石雨后的重生世界。使用 Midjourney、Stable Diffusion 完成角色设计、道具卡片、地图设计全套游戏美术。",
    meta: ["Midjourney", "Stable Diffusion", "角色 / 道具 / 地图"],
  },
  media_unlocked: {
    title: "起底工作室",
    en: "DOCUMENTARY · 2024",
    cat: "后期",
    desc: "中国日报旗下短视频纪录片团队，专注国际舆论场讲述中国故事。年流量2600万，全平台近2亿。",
    meta: ["策划 / 分镜 / 拍摄 / 剪辑", "年流量 2600万", "北京电影节三等奖"],
  },
  posters: {
    title: "海报",
    en: "GRAPHIC · 2022",
    cat: "设计",
    desc: "光盘行动系列海报等平面设计作品。",
    meta: ["平面设计"],
  },
  covers: {
    title: "封面",
    en: "VIDEO COVER · 2024",
    cat: "设计",
    desc: "飞书·海大集团视频封面、bilibili 个人频道封面等。",
    meta: ["视频封面设计"],
  },
  keyart: {
    title: "宣发",
    en: "KEYART · 2025",
    cat: "设计",
    desc: "《驱入虚空》全渠道宣发物料，覆盖 WeGame/Steam/4399 等16个平台。",
    meta: ["游戏宣发", "ChinaJoy 展位视觉"],
  },
  merch: {
    title: "周边",
    en: "MERCH · 2023",
    cat: "设计",
    desc: "蔚蓝档案 bilibili world 线下展周边设计。",
    meta: ["产品周边"],
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
  const work = works[slug] ?? {
    title: slug,
    en: "",
    cat: "",
    desc: "",
    meta: [],
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-5xl px-6 pb-32">
        {/* Back link */}
        <Link
          href="/"
          className="text-xs tracking-widest text-cyan-600 transition-colors hover:text-cyan-300"
        >
          ← BACK
        </Link>

        {/* Title */}
        <p className="mt-10 text-xs tracking-[0.4em] text-cyan-500">{work.en}</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-white sm:text-8xl">
          {work.title}
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-xl text-base leading-relaxed text-cyan-300">
          {work.desc}
        </p>

        {/* Meta */}
        <div className="mt-8 flex flex-wrap gap-2">
          {work.meta.map((m) => (
            <span
              key={m}
              className="border border-cyan-500/30 px-3 py-1 text-xs text-cyan-400"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Media area - CRT screen frame */}
        <div className="mt-16">
          <div className="relative overflow-hidden rounded-xl border-2 border-cyan-400/30 bg-black/60 p-2 shadow-[0_0_60px_rgba(0,255,255,0.1)]">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
              {work.video ? (
                <a
                  href={work.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full w-full items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/60 to-purple-950/40" />
                  <div className="relative z-10 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-400 bg-cyan-400/10 transition-all group-hover:scale-110 group-hover:bg-cyan-400/20 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                      <svg className="h-8 w-8 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm tracking-widest text-cyan-400">
                      在 Bilibili 上观看 →
                    </p>
                  </div>
                </a>
              ) : (
                <>
                  <Viewer3D />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(0,255,255,0.02) 100%)",
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
