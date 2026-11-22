type Job = {
  when: string;
  firm: string;
  role: string;
  bullets: string[];
};

const jobs: Job[] = [
  {
    when: "2025.10 — 2026.5",
    firm: "杭州紧张树科技有限公司",
    role: "游戏宣发",
    bullets: [
      "负责自研游戏《驱入虚空》的全渠道宣发物料与资源位制作，覆盖 WeGame、Steam、4399、好游快爆、TapTap 等 16 个分发平台。",
      "独立产出新赛季战令宣传视频、游戏 PV 剪辑，以及周年庆礼包、铸币大头礼包等美术物料。",
      "产出游戏内聊天表情包与线下活动物料，从线上到线下的宣发流程都走了一遍。",
    ],
  },
  {
    when: "2024.2 — 2024.8",
    firm: "杭州径岸文化传媒有限公司",
    role: "视频策划 / 剪辑 / 包装",
    bullets: [
      "参与《中国日报 · 起底工作室》栏目视频制作，负责策划、剪辑、拍摄与动画包装。",
      "单条视频《我在人民大会堂前放了个柱状图》获北京电影节新闻类三等奖；中国南海相关视频获外交部发函表扬。",
      "服务蚂蚁集团、深圳机场、欧洲杯等多个客户项目，覆盖政务、企业、高校场景。",
    ],
  },
  {
    when: "2022.2 — 2023.5",
    firm: "杭州时七羽墨文化创意有限公司",
    role: "动画师",
    bullets: [
      "参与国风动画《怪兽小馆》制作，负责动画上色审核、水墨关键帧与后期。",
      "《怪兽小馆》B 站总播放量 752.8 万，获广电总局 2023 年第四季度优秀网络视听作品、第 20 届中国动漫金龙奖最佳系列动画。",
    ],
  },
  {
    when: "外包 · 持续",
    firm: "游戏行业设计与视频制作",
    role: "独立承接",
    bullets: [
      "SNK 2026 ChinaJoy 展会主视觉；蔚蓝档案 Blue Archive 联名线下展台搭建视觉与物料；莉莉丝《小冰冰传奇》宣传物料。",
      "《白银之城》《闪耀！优俊少女》《伊莫》《仙境传说 RO》宣传物料与视觉设计。",
    ],
  },
];

const clients = [
  "SNK · ChinaJoy 主视觉",
  "蔚蓝档案 · 线下展台",
  "小冰冰传奇 · 莉莉丝",
  "白银之城 · 试玩券",
  "闪耀！优俊少女",
  "伊莫",
  "仙境传说 RO",
  "美的智慧家 · 系列短片",
  "中国美术学院 · 毕业季",
  "阿里巴巴 · 黑科技",
  "绿城 · 江澜鸣翠",
  "阿里巴巴国际站",
];

const skills = [
  "动画制作",
  "摄影 / 摄像",
  "视频策划剪辑",
  "视频包装",
  "平面设计",
  "周边产品设计",
  "AIGC 出图与视频",
];

const awards = [
  "第 20 届中国动漫金龙奖最佳系列动画 ·《怪兽小馆》",
  "广电总局 2023 年第四季度优秀网络视听作品 ·《怪兽小馆》",
  "北京电影节新闻类三等奖 ·《我在人民大会堂前放了个柱状图》",
  "外交部发函表扬 · 中国南海相关视频",
  "国家艺术基金戏曲动画项目支持 ·《挂画》，南京博物馆展出（2019）",
  "青年摄影大赛优秀奖（2018、2019）",
];

const facts = [
  ["毕业", "鲁迅美术学院 · 传媒动画", "2017.9 — 2021.6"],
  ["辅修", "影视舞台美术 / 动漫周边 / 面塑人偶 / 摄影", null],
  ["证书", "PADI OW 潜水证", "2019"],
  ["供稿", "视觉中国独家供稿人", "2021.1 签约"],
  ["校园", "传媒动画学院学生会主席", "2018.5 — 2020.8"],
  ["足迹", "日本 / 德国 / 法国 / 意大利 / 瑞士 / 泰国 / 印尼 / 国内西北自驾", "2018 — 2024"],
];

function SectionTitle({ zh, en }: { zh: string; en: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3 border-b border-dashed border-[#d8d0bb] pb-2">
      <h2 className="hand text-[17px] font-bold text-marker md:text-[19px]">{zh}</h2>
      <span className="type text-[10px] tracking-[0.18em] text-[#9a9382] md:text-[10.5px] uppercase">
        {en}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <section className="grid-bg min-h-screen px-4 pt-28 pb-24 md:px-6 md:pt-32">
      <div className="page-in mx-auto w-full max-w-5xl">
        <div className="relative bg-[#fbf9f1] border border-[#e6e0cf] px-6 py-9 shadow-[0_14px_40px_-24px_rgba(60,45,25,0.5),0_30px_70px_-40px_rgba(60,45,25,0.6)] md:px-12 md:py-12">
          <span className="tape -top-3 left-10 rotate-[-2deg]" style={{ width: 56, height: 14 }} />
          <span className="tape -top-3 right-12 rotate-[3deg]" style={{ width: 44, height: 14 }} />

          {/* ===== the name, the one line, the stamp ===== */}
          <header className="relative">
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <h1 className="hand text-[46px] font-bold leading-none text-ink-blue md:text-[62px]">
                蔡振昊
              </h1>
              <span className="type text-[11px] tracking-[0.22em] text-[#8d8676] md:text-[12px]">
                CAI ZHENHAO / CZZZH
              </span>
            </div>
            <p className="note mt-2 text-[12.5px] tracking-[0.08em] text-[#6f6555] md:text-[13.5px]">
              视觉设计 · 动画 · 后期 · AIGC
            </p>

            <span className="pointer-events-none absolute -top-1 right-0 hidden rotate-[-8deg] rounded-full border-[3px] border-[#c0392b]/55 px-4 py-3 text-center sm:block">
              <span className="hand block text-[10px] leading-tight text-[#c0392b]/70">
                档案
                <br />
                NO.01
              </span>
            </span>
          </header>

          {/* ===== intro ===== */}
          <div className="mt-7 max-w-[720px] space-y-3 note text-[13px] leading-[1.95] text-[#2f2f2c] md:text-[14px]">
            <p>
              鲁迅美术学院传媒动画专业，2021 年毕业。在校辅修影视舞台美术、动漫周边设计和摄影，那几年把动画的整套流程摸了一遍。
            </p>
            <p>
              出来之后做过国风水墨动画的上色和后期，给品牌拍过纪录片、剪过短视频，也在游戏公司做了半年多的全渠道宣发。现在把 AIGC
              接进流程里，从分镜、出图到成片，尽量自己走完一整遍。
            </p>
            <p className="text-[#6b6557]">目前人在杭州，接动画、视觉设计、后期和 AIGC 相关的合作。</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 note text-[12.5px] text-[#5f594c] md:gap-x-5 md:text-[13px]">
            <a
              href="mailto:XingKun.C@outlook.com"
              className="text-ink-blue underline decoration-[#2b4bd8]/35 decoration-1 underline-offset-4 hover:text-marker hover:decoration-[#d9303a]/60 transition-colors"
            >
              XingKun.C@outlook.com
            </a>
            <span className="hidden text-[#c9c2ae] sm:inline">|</span>
            <span>杭州 · 可远程合作</span>
            <span className="hidden text-[#c9c2ae] sm:inline">|</span>
            <span>1999 · 27</span>
          </div>

          {/* ===== body: main column + the index card ===== */}
          <div className="mt-10 grid gap-x-12 gap-y-11 md:grid-cols-[minmax(0,1fr)_268px]">
            <div className="space-y-11">
              <section>
                <SectionTitle zh="工作经历" en="Work Experience" />
                <div className="space-y-7">
                  {jobs.map((j) => (
                    <article key={j.firm + j.when}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="hand text-[15.5px] font-bold text-[#22221f] md:text-[16.5px]">
                          {j.firm}
                        </h3>
                        <span className="hand text-[13px] text-marker md:text-[13.5px]">{j.role}</span>
                      </div>
                      <div className="type mt-1 text-[10.5px] tracking-[0.12em] text-[#9a9382]">
                        {j.when}
                      </div>
                      <ul className="mt-2.5 space-y-1.5">
                        {j.bullets.map((b) => (
                          <li
                            key={b}
                            className="note flex gap-2 text-[12.5px] leading-[1.85] text-[#3a3a35] md:text-[13px]"
                          >
                            <span className="mt-[1px] shrink-0 text-[#c0392b]/70">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle zh="外包项目" en="Selected Clients" />
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {clients.map((c) => (
                    <span
                      key={c}
                      className="note rounded-[2px] border border-[#ded7c4] bg-[#f5f1e5] px-2.5 py-1 text-[11.5px] text-[#4a463c] md:text-[12px]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </section>

              <section className="md:hidden">
                <SectionTitle zh="简历细目" en="Details" />
                <dl className="space-y-3">
                  {facts.map(([k, v, t]) => (
                    <div key={k} className="border-b border-dashed border-[#e0d9c6] pb-2.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="hand text-[12px] text-marker">{k}</dt>
                        {t ? (
                          <dd className="type shrink-0 whitespace-nowrap text-[9.5px] text-[#9a9382]">
                            {t}
                          </dd>
                        ) : null}
                      </div>
                      <dd className="note mt-0.5 text-[12px] leading-[1.7] text-[#3a3a35]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="hidden space-y-2.5 border border-[#e2dbc8] bg-[#f3eee1] px-4 py-4 md:block">
                {facts.map(([k, v, t]) => (
                  <div key={k} className="border-b border-dashed border-[#ddd5c1] pb-2 last:border-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="hand text-[11.5px] text-marker">{k}</span>
                      {t ? <span className="type text-[9.5px] text-[#9a9382]">{t}</span> : null}
                    </div>
                    <div className="note mt-0.5 text-[11.5px] leading-[1.65] text-[#3a3a35]">{v}</div>
                  </div>
                ))}
              </div>

              <div>
                <SectionTitle zh="技能" en="Skills" />
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="note border-b border-[#c9c2ae]/70 pb-0.5 text-[11.5px] text-[#3a3a35] md:text-[12px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle zh="奖项" en="Awards" />
                <ul className="space-y-2">
                  {awards.map((a) => (
                    <li
                      key={a}
                      className="note flex gap-2 text-[11.5px] leading-[1.75] text-[#3a3a35] md:text-[12px]"
                    >
                      <span className="mt-[1px] shrink-0 text-[#c0392b]/70">·</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-dashed border-[#d8d0bb] pt-4">
                <a
                  href="/works"
                  className="hand inline-flex items-center gap-1 text-[14px] text-ink-blue transition-colors hover:text-marker"
                >
                  看作品 →
                </a>
              </div>
            </aside>
          </div>
        </div>

        <p className="note mt-6 text-center text-[11px] tracking-[0.1em] text-[#9a9382]">
          更新于 2026 · 简历信息来源：蔡振昊个人简历
        </p>
      </div>
    </section>
  );
}
