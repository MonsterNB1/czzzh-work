export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">关于我</h1>
      <div className="mt-8 space-y-6 text-neutral-400">
        <p>
          蔡振昊，设计师 / 创意开发者，现居杭州。
          专注于交互体验、3D 视觉与动效设计，
          热衷于探索设计与代码的边界。
        </p>
        <h2 className="text-xl font-semibold text-white">经历</h2>
        <ul className="space-y-4">
          <li className="border-l-2 border-white/20 pl-4">
            <p className="text-white">设计公司 · 视觉设计师</p>
            <p className="text-sm text-neutral-500">2025 — 至今</p>
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-white">技能</h2>
        <p>
          Figma · Three.js / React Three Fiber · Framer Motion ·
          Next.js · Capture One · 视频剪辑
        </p>
      </div>
    </section>
  );
}
