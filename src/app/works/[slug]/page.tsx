import WorkRoom, { type Work } from "@/components/WorkRoom";
import WorkWall from "@/components/WorkWall";
import WorkGallery from "@/components/WorkGallery";
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

  // a series published elsewhere has no clip to put in the TV: hang the covers instead
  if (found?.wall) return <WorkWall work={found} />;

  // a project that only exists as stills gets a wall of prints
  if (found?.gallery) return <WorkGallery work={found} />;

  return <WorkRoom work={work} />;
}
