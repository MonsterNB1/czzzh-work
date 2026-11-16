export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-20">
      <h1 className="text-sm tracking-widest text-cyan-600">Contact</h1>

      <div className="mt-12 space-y-4">
        <a
          href="mailto:XingKun.C@outlook.com"
          className="block text-2xl font-light text-cyan-200 transition-colors hover:text-cyan-400"
        >
          XingKun.C@outlook.com
        </a>
        <p className="text-sm text-cyan-600">
          杭州 · 可远程合作
        </p>
      </div>

      <div className="mt-16 flex gap-6 text-sm text-cyan-500">
        <a href="#" className="transition-colors hover:text-cyan-300">WeChat</a>
        <a href="#" className="transition-colors hover:text-cyan-300">RedBook</a>
        <a href="#" className="transition-colors hover:text-cyan-300">Instagram</a>
        <a href="https://github.com/MonsterNB1" className="transition-colors hover:text-cyan-300">GitHub</a>
      </div>
    </section>
  );
}
