import WorkRoom, { type Work } from "@/components/WorkRoom";
import { works, type WorkData } from "@/data/works";

export function generateStaticParams() {
  return Object.keys(works).map((slug) => ({ slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found: WorkData | undefined = works[slug];
  const work: Work = found ?? { title: slug, en: "", cat: "", desc: "", meta: [] };

  return <WorkRoom work={work} />;
}
