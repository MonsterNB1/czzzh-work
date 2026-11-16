import Link from "next/link";

// TODO: 替换为真实作品数据
const works = [
  { slug: "project-1", title: "项目一", year: "2026", tag: "3D / Web" },
  { slug: "project-2", title: "项目二", year: "2026", tag: "品牌 / 视觉" },
  { slug: "project-3", title: "项目三", year: "2025", tag: "动效 / 交互" },
];

export default function WorksPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">作品</h1>
      <p className="mt-2 text-neutral-500">Selected Works</p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w) => (
          <Link
            key={w.slug}
            href={`/works/${w.slug}`}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30"
          >
            <div className="aspect-video rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900" />
            <h2 className="mt-4 text-lg font-medium group-hover:text-white">
              {w.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {w.tag} · {w.year}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
