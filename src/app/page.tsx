import Link from "next/link";
import Viewer3D from "@/components/Viewer3D";

export default function Home() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16">
      {/* 3D centerpiece */}
      <div className="h-64 w-64 sm:h-80 sm:w-80">
        <Viewer3D />
      </div>

      {/* Name */}
      <h1 className="mt-8 text-center text-4xl font-light tracking-tight text-cyan-100 sm:text-6xl">
        蔡振昊
      </h1>
      <p className="mt-3 text-center text-sm tracking-widest text-cyan-500">
        ANIMATOR · DESIGNER · EDITOR
      </p>
      <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-cyan-600">
        专注动画、视觉设计与后期制作，现居杭州。
      </p>

      {/* CTA */}
      <Link
        href="/works"
        className="mt-10 border border-cyan-500/30 px-8 py-3 text-xs tracking-widest text-cyan-400 transition-all hover:border-cyan-400 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
      >
        VIEW WORKS
      </Link>
    </section>
  );
}
