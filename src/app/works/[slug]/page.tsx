import Viewer3D from "@/components/Viewer3D";

const works = ["project-1", "project-2", "project-3"];

export function generateStaticParams() {
  return works.map((slug) => ({ slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-neutral-500">Work</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="mt-4 max-w-2xl text-neutral-400">
        项目介绍文案待填充。这里会展示项目背景、设计思路与成果。
      </p>
      <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
        <Viewer3D />
      </div>
    </section>
  );
}
