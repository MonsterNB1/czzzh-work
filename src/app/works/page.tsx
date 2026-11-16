import Link from "next/link";

const categories = [
  {
    type: "DIR",
    name: "animation/",
    items: ["bottle/", "monster_diner/", "guahua/", "wamao/"],
  },
  {
    type: "DIR",
    name: "design/",
    items: ["posters/", "video_covers/", "keyart/"],
  },
  {
    type: "DIR",
    name: "aigc/",
    items: ["river_gods/"],
  },
  {
    type: "DIR",
    name: "postproduction/",
    items: ["media_unlocked/", "corporate/"],
  },
];

const works = [
  { slug: "bottle", title: "Bottle", cat: "动画 · 定格", year: "2021", desc: "本科毕业创作，记录一个承载记忆的瓶子" },
  { slug: "monster_diner", title: "怪兽小馆", cat: "动画 · 水墨", year: "2023", desc: "国创动画，B站752.8万播放，金龙奖最佳系列动画" },
  { slug: "guahua", title: "挂画", cat: "动画 · 戏曲", year: "2019", desc: "国家艺术基金项目，改编自传统戏曲" },
  { slug: "wamao", title: "瓦猫", cat: "动画 · 定格", year: "2020", desc: "云南题材定格动画，神兽守门传说" },
  { slug: "river_gods", title: "河神纪元", cat: "AIGC · 游戏美术", year: "2025", desc: "Midjourney/SD 游戏美术：角色/道具/地图设计" },
  { slug: "media_unlocked", title: "起底工作室", cat: "后期 · 短视频", year: "2024", desc: "中国日报短视频全流程，年流量2600万" },
];

export default function WorksPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8">
        <span className="text-cyan-600">$</span>{" "}
        <span className="text-cyan-300 glow-dim">ls -la ./works</span>
      </div>

      <div className="space-y-8">
        {works.map((w, i) => (
          <Link
            key={w.slug}
            href={`/works/${w.slug}`}
            className="term-card block border p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-cyan-600">
                  [{String(i + 1).padStart(2, "0")}] {w.cat} · {w.year}
                </div>
                <h2 className="mt-1 text-xl text-cyan-200 glow-dim">{w.title}</h2>
                <p className="mt-1 text-sm text-cyan-600">{w.desc}</p>
              </div>
              <span className="text-cyan-600">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
