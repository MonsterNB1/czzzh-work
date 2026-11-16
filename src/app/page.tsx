import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col justify-center px-6 py-32">
      <p className="mb-4 font-mono text-sm text-neutral-500">你好，我是</p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
        蔡振昊
        <span className="text-neutral-600">.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-neutral-400">
        设计师 / 创意开发者。专注于交互体验、3D 视觉与动效设计，
        喜欢把想法变成可交互的数字作品。
      </p>
      <div className="mt-10 flex gap-4">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
        >
          查看作品 <ArrowRight size={16} />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          联系我
        </Link>
      </div>
    </section>
  );
}
