export default function AboutPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-20">
      <h1 className="text-sm tracking-widest text-cyan-600">About</h1>

      <div className="mt-12 space-y-6 text-base leading-relaxed text-cyan-300">
        <p>
          我是蔡振昊，鲁迅美术学院传媒动画专业毕业。
        </p>
        <p>
          做过定格动画、水墨国创、戏曲短片，也做过游戏宣发、短视频纪录片和 AIGC 美术。
          喜欢从分镜到成片全流程自己把控，也喜欢用 AI 工具扩展视觉边界。
        </p>
        <p>
          目前在杭州，接动画、视觉设计和后期相关的合作。
        </p>
      </div>

      <div className="mt-16 space-y-2 text-sm text-cyan-600">
        <div className="flex justify-between border-b border-cyan-500/10 py-2">
          <span>2025—现在</span>
          <span>游戏宣发 · 紧张树科技</span>
        </div>
        <div className="flex justify-between border-b border-cyan-500/10 py-2">
          <span>2024</span>
          <span>视频策划剪辑 · 经岸文化</span>
        </div>
        <div className="flex justify-between border-b border-cyan-500/10 py-2">
          <span>2022—2023</span>
          <span>动画师 · 时七羽墨</span>
        </div>
      </div>
    </section>
  );
}
