export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6">
        <span className="text-cyan-600">$</span>{" "}
        <span className="text-cyan-300 glow-dim">cat ./about.txt</span>
      </div>

      <div className="space-y-6 font-mono text-sm leading-relaxed">
        <div>
          <span className="text-cyan-600">name</span>
          <span className="text-cyan-400"> 蔡振昊 / Cai Zhenhao</span>
        </div>
        <div>
          <span className="text-cyan-600">born</span>
          <span className="text-cyan-400"> 1999.05.01, anhui</span>
        </div>
        <div>
          <span className="text-cyan-600">school</span>
          <span className="text-cyan-400"> 鲁迅美术学院 · 传媒动画 (2017-2021)</span>
        </div>

        <div className="border-t border-cyan-500/20 pt-4">
          <div className="text-cyan-500">// experience</div>
          <div className="mt-3 space-y-3">
            <div>
              <div className="text-cyan-300">杭州紧张树科技 — 游戏宣发</div>
              <div className="text-cyan-600">2025.10 — 2026.05</div>
              <div className="text-cyan-700 text-xs mt-1">
                《驱入虚空》全渠道宣发物料，覆盖 WeGame/Steam/4399 等16个平台
              </div>
            </div>
            <div>
              <div className="text-cyan-300">杭州经岸文化传媒 — 视频策划/剪辑</div>
              <div className="text-cyan-600">2024.02 — 2024.08</div>
              <div className="text-cyan-700 text-xs mt-1">
                中国日报"起底工作室"，单视频获北京电影节三等奖
              </div>
            </div>
            <div>
              <div className="text-cyan-300">杭州时七羽墨文化 — 动画师</div>
              <div className="text-cyan-600">2022.02 — 2023.05</div>
              <div className="text-cyan-700 text-xs mt-1">
                《怪兽小馆》上色审核/关键帧/后期，B站752.8万播放
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-500/20 pt-4">
          <div className="text-cyan-500">// skills</div>
          <div className="mt-2 text-cyan-400">
            after effects · premiere · photoshop · midjourney · three.js · react
          </div>
        </div>
      </div>
    </section>
  );
}
