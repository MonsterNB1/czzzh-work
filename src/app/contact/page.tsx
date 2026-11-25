const SOCIALS = [
  {
    name: "Instagram",
    handle: "@C_ZZZZH",
    qr: "/assets/contact/qr-instagram.png",
    href: "https://www.instagram.com/C_ZZZZH",
  },
  {
    name: "小红书",
    handle: "C_zzzh",
    qr: "/assets/contact/qr-xiaohongshu.png",
  },
  {
    name: "微信",
    handle: "Czzzh.",
    qr: "/assets/contact/qr-wechat.png",
    wide: true,
  },
];

export default function ContactPage() {
  return (
    <section className="grid-bg min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-2xl ruled-bg rounded-sm px-6 py-12 shadow-[0_12px_40px_rgba(80,65,35,0.15)] sm:px-14">
        <h1 className="hand text-5xl font-bold text-marker">Contact</h1>

        <div className="mt-8 space-y-4">
          <a
            href="mailto:XingKun.C@outlook.com"
            className="hand block text-2xl text-ink-blue hover:text-marker transition-colors sm:text-3xl"
          >
            XingKun.C@outlook.com
          </a>
          <p className="note text-ink-soft">杭州 · 可远程合作</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
          {SOCIALS.map((s) => {
            const card = (
              <>
                <div className="mx-auto w-full max-w-[150px] bg-white border border-[#e6e0cf] rounded-sm p-2 shadow-[0_8px_22px_-10px_rgba(60,45,25,0.45)] sm:max-w-none sm:p-3">
                  <img
                    src={s.qr}
                    alt={`${s.name} 二维码`}
                    className="aspect-square h-auto w-full block"
                    loading="lazy"
                  />
                </div>
                <p className="note mt-2 text-center text-sm text-ink-blue sm:text-base">{s.name}</p>
                <p className="note text-center text-xs text-ink-soft sm:text-sm">{s.handle}</p>
              </>
            );

            const itemClass = s.wide
              ? "col-span-2 sm:col-span-1 block"
              : "block";

            return s.href ? (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={itemClass}
              >
                {card}
              </a>
            ) : (
              <div key={s.name} className={itemClass}>
                {card}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 note text-lg text-ink-blue">
          <a
            href="https://github.com/MonsterNB1"
            className="hover:text-marker transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
