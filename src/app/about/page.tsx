export default function AboutPage() {
  return (
    <section className="grid-bg min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-2xl ruled-bg rounded-sm px-8 py-12 shadow-[0_12px_40px_rgba(80,65,35,0.15)] sm:px-14">
        <h1 className="hand text-5xl font-bold text-marker">About</h1>

        <div className="mt-8 space-y-5 text-[15px] leading-loose text-ink">
          <p>我是蔡振昊，鲁迅美术学院传媒动画专业毕业。</p>
          <p>
            做过定格动画、水墨国创、戏曲短片，也做过游戏宣发、短视频纪录片和 AIGC
            美术。喜欢从分镜到成片全流程自己把控，也喜欢用 AI 工具扩展视觉边界。
          </p>
          <p>目前在杭州，接动画、视觉设计和后期相关的合作。</p>
        </div>

        <div className="mt-12 space-y-3 note text-sm text-ink">
          <div className="flex justify-between border-b border-[#d8d0bb] pb-2">
            <span className="text-ink-soft">2025 — 现在</span>
            <span>游戏宣发 · 紧张树科技</span>
          </div>
          <div className="flex justify-between border-b border-[#d8d0bb] pb-2">
            <span className="text-ink-soft">2024</span>
            <span>视频策划剪辑 · 经岸文化</span>
          </div>
          <div className="flex justify-between border-b border-[#d8d0bb] pb-2">
            <span className="text-ink-soft">2022 — 2023</span>
            <span>动画师 · 时七羽墨</span>
          </div>
        </div>
      </div>
    </section>
  );
}
