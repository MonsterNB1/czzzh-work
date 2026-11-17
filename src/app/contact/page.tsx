export default function ContactPage() {
  return (
    <section className="grid-bg min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-2xl ruled-bg rounded-sm px-8 py-12 shadow-[0_12px_40px_rgba(80,65,35,0.15)] sm:px-14">
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

        <div className="mt-12 flex gap-6 note text-lg text-ink-blue">
          <a href="#" className="hover:text-marker transition-colors">WeChat</a>
          <a href="#" className="hover:text-marker transition-colors">RedBook</a>
          <a href="#" className="hover:text-marker transition-colors">Instagram</a>
          <a href="https://github.com/MonsterNB1" className="hover:text-marker transition-colors">GitHub</a>
        </div>
      </div>
    </section>
  );
}
