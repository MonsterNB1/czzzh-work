import Viewer3D from "@/components/Viewer3D";

const works: Record<string, { title: string; cat: string; desc: string }> = {
  bottle: { title: "Bottle", cat: "Animation · Stop Motion", desc: "本科毕业创作。定格动画，记录一个承载记忆的瓶子，虚实之间是对未来的告别。" },
  monster_diner: { title: "怪兽小馆", cat: "Animation · Ink", desc: "国创水墨动画。桃子和火不伙为妖怪开了一家小饭馆，一本食谱打破平静。B站752.8万播放，金龙奖最佳系列动画。" },
  guahua: { title: "挂画", cat: "Animation · Opera", desc: "国家艺术基金项目，改编自传统戏曲《挂画》。" },
  wamao: { title: "瓦猫", cat: "Animation · Stop Motion", desc: "云南瓦猫传说，定格动画。神兽藏于门缝守护百姓。" },
  river_gods: { title: "河神纪元", cat: "AIGC · Game Art", desc: "陨石雨后的重生世界。Midjourney/SD 完成角色、道具、地图全套游戏美术。" },
  media_unlocked: { title: "起底工作室", cat: "Post-production", desc: "中国日报短视频纪录片团队。从策划到封面全流程，年流量2600万。" },
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
  const work = works[slug] ?? { title: slug, cat: "", desc: "" };

  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <p className="text-xs tracking-widest text-cyan-600">{work.cat}</p>
      <h1 className="mt-3 text-4xl font-light text-cyan-100">{work.title}</h1>
      <p className="mt-6 text-base leading-relaxed text-cyan-400">{work.desc}</p>

      <div className="mt-10 aspect-video w-full overflow-hidden border border-cyan-500/15 bg-black/40">
        <Viewer3D />
      </div>
    </section>
  );
}
