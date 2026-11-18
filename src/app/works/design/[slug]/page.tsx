import { notFound } from "next/navigation";
import DesignRoom from "@/components/DesignRoom";
import { designs } from "@/data/designs";

export function generateStaticParams() {
  return Object.keys(designs).map((slug) => ({ slug }));
}

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = designs[slug];
  if (!work) notFound();
  return <DesignRoom work={work} />;
}
