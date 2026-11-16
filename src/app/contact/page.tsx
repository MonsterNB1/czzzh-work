export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">联系</h1>
      <p className="mt-4 text-neutral-400">
        有项目合作或工作机会？欢迎通过以下方式联系我。
      </p>
      <div className="mt-10 space-y-4">
        <a
          href="mailto:hi@czzzh.work"
          className="block rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30"
        >
          <p className="text-sm text-neutral-500">Email</p>
          <p className="mt-1 text-lg">hi@czzzh.work</p>
        </a>
        <a
          href="https://github.com/MonsterNB1"
          className="block rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30"
        >
          <p className="text-sm text-neutral-500">GitHub</p>
          <p className="mt-1 text-lg">@MonsterNB1</p>
        </a>
      </div>
    </section>
  );
}
