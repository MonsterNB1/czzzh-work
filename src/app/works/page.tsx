import Link from "next/link";

const works = [
  { slug: "monster_diner", title: "怪兽小馆", cat: "Animation" },
  { slug: "bottle", title: "Bottle", cat: "Animation" },
  { slug: "wamao", title: "瓦猫", cat: "Animation" },
  { slug: "guahua", title: "挂画", cat: "Animation" },
  { slug: "river_gods", title: "河神纪元", cat: "AIGC · Game Art" },
  { slug: "media_unlocked", title: "起底工作室", cat: "Post-production" },
];

export default function WorksPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <h1 className="text-sm tracking-widest text-cyan-600">Works</h1>

      <div className="mt-12 divide-y divide-cyan-500/10">
        {works.map((w) => (
          <Link
            key={w.slug}
            href={`/works/${w.slug}`}
            className="group flex items-baseline justify-between py-6 transition-colors"
          >
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-light text-cyan-100 transition-colors group-hover:text-cyan-300 sm:text-3xl">
                {w.title}
              </span>
            </div>
            <span className="text-xs tracking-wider text-cyan-600">
              {w.cat}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
