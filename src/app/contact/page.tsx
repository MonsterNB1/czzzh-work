export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6">
        <span className="text-cyan-600">$</span>{" "}
        <span className="text-cyan-300 glow-dim">ssh czzzh@contact</span>
      </div>

      <div className="space-y-4 font-mono text-sm">
        <div className="term-card border p-4">
          <div className="text-cyan-600">email</div>
          <a href="mailto:XingKun.C@outlook.com" className="term-link text-cyan-300">
            XingKun.C@outlook.com
          </a>
        </div>
        <div className="term-card border p-4">
          <div className="text-cyan-600">wechat</div>
          <div className="text-cyan-300">CZH-1999</div>
        </div>
        <div className="term-card border p-4">
          <div className="text-cyan-600">phone</div>
          <div className="text-cyan-300">+86 180-9886-5170</div>
        </div>
        <div className="term-card border p-4">
          <div className="text-cyan-600">github</div>
          <a href="https://github.com/MonsterNB1" className="term-link text-cyan-300">
            @MonsterNB1
          </a>
        </div>
      </div>
    </section>
  );
}
