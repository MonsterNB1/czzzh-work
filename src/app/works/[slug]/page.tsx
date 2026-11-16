import Viewer3D from "@/components/Viewer3D";

const works: Record<string, { title: string; cat: string; desc: string; tools: string }> = {
  bottle: { title: "Bottle", cat: "动画 · 定格", desc: "本科毕业创作动画短片。营造既梦幻又现实的虚与实空间，是对未来焦虑的告别，也是对过去时间的告别。", tools: "定格拍摄 / 后期制作" },
  monster_diner: { title: "怪兽小馆", cat: "动画 · 水墨", desc: "桃子和火不伙、阿福打理着一家为妖怪而开的小饭馆。一本食谱的出现打破了小馆的平静。B站总播放752.8万，获国家广电总局优秀网络视听作品、第20届中国动漫金龙奖最佳系列动画。", tools: "水墨上色 / 色检 / 后期" },
  guahua: { title: "挂画", cat: "动画 · 戏曲", desc: "国家艺术基金二维动画项目，根据传统戏曲《挂画》改编。耶律含嫣与猎户花云彼此爱慕，哥哥不允，二人趁机动身逃跑……", tools: "后期合成" },
  wamao: { title: "瓦猫", cat: "动画 · 定格", desc: "相传南邵古国时期妖怪为祸人间，上天派神兽下凡藏于门缝守护百姓。云南瓦猫题材定格动画。", tools: "脚本 / 分镜 / 场景美术 / 后期" },
  river_gods: { title: "河神纪元", cat: "AIGC · 游戏美术", desc: "陨石雨坠落劫后，大地复苏，生灵渐生。使用 Midjourney、Stable Diffusion 完成角色设计、道具卡片、地图设计全套美术。", tools: "Midjourney / Stable Diffusion" },
  media_unlocked: { title: "起底工作室", cat: "后期 · 短视频", desc: "中国日报旗下短视频纪录片团队，专注国际舆论场讲述中国故事。单个视频号年流量破2600万，纪录片全平台近2亿流量。", tools: "策划 / 分镜 / 拍摄 / 剪辑 / 封面" },
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
  const work = works[slug] ?? { title: slug, cat: "", desc: "", tools: "" };

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-4">
        <span className="text-cyan-600">$</span>{" "}
        <span className="text-cyan-300 glow-dim">cat ./works/{slug}.md</span>
      </div>

      <div className="border border-cyan-500/30 bg-black/40 p-6">
        <div className="text-xs text-cyan-600">{work.cat}</div>
        <h1 className="mt-1 text-3xl text-cyan-200 glow">{work.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-cyan-400">{work.desc}</p>
        <div className="mt-4 text-xs text-cyan-600">// {work.tools}</div>
      </div>

      {/* 3D viewer placeholder */}
      <div className="mt-6 aspect-video w-full overflow-hidden border border-cyan-500/20 bg-black/60">
        <Viewer3D />
      </div>
    </section>
  );
}
