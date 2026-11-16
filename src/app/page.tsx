import Link from "next/link";
import Viewer3D from "@/components/Viewer3D";

export default function Home() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
      {/* === Floating sticker elements (like ntch.design) === */}
      {/* Top-left: circular badge */}
      <div className="pointer-events-none absolute left-8 top-24 hidden sm:block">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan-400/60 bg-black/60 text-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
          <span className="text-lg">✦</span>
        </div>
      </div>

      {/* Top: chromatic bars */}
      <div className="pointer-events-none absolute left-1/4 top-20 hidden sm:block">
        <div className="h-1 w-24 bg-gradient-to-r from-red-500/60 via-cyan-400/60 to-blue-500/60 blur-[1px]" />
      </div>
      <div className="pointer-events-none absolute right-1/4 top-20 hidden sm:block">
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-400/60 via-purple-500/60 to-pink-500/60 blur-[1px]" />
      </div>

      {/* Right: phone mockup / vertical element */}
      <div className="pointer-events-none absolute right-6 top-1/3 hidden sm:block">
        <div className="h-48 w-24 rounded-md border border-cyan-500/30 bg-gradient-to-b from-cyan-900/40 to-purple-900/30 p-1">
          <div className="h-full w-full rounded-sm bg-gradient-to-b from-cyan-800/30 via-black/50 to-purple-800/30" />
        </div>
      </div>

      {/* Bottom-left: small block */}
      <div className="pointer-events-none absolute bottom-24 left-1/4 hidden sm:block">
        <div className="h-8 w-20 bg-gradient-to-r from-purple-600/40 to-pink-500/40 blur-[2px]" />
      </div>

      {/* Bottom-right: OPEN badge */}
      <div className="pointer-events-none absolute bottom-24 right-8 hidden sm:block">
        <div className="rotate-[-6deg] rounded-lg border border-lime-400/60 bg-lime-950/60 px-4 py-2 text-center shadow-[0_0_20px_rgba(163,230,53,0.15)]">
          <div className="text-xs font-bold tracking-wider text-lime-300">OPEN TO</div>
          <div className="text-xs font-bold tracking-wider text-lime-300">WORK</div>
          <div className="mt-0.5 text-[10px] text-lime-500/70">let's talk</div>
        </div>
      </div>

      {/* === Central CRT TV screen === */}
      <div className="relative">
        {/* Screen frame */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-black/80 p-2 shadow-[0_0_60px_rgba(0,255,255,0.08)]">
          {/* The screen content */}
          <div className="relative h-72 w-72 overflow-hidden rounded-xl bg-black sm:h-96 sm:w-96">
            <Viewer3D />
            {/* Screen reflection / glare on the glass */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(0,255,255,0.03) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* === Text below screen === */}
      <h1 className="mt-10 text-center text-3xl font-light tracking-tight text-cyan-100 sm:text-5xl">
        蔡振昊
      </h1>
      <p className="mt-3 text-center text-xs tracking-[0.3em] text-cyan-500">
        ANIMATOR · DESIGNER · EDITOR
      </p>

      <Link
        href="/works"
        className="mt-8 border border-cyan-500/30 px-8 py-3 text-xs tracking-[0.2em] text-cyan-400 transition-all hover:border-cyan-400 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
      >
        VIEW WORKS
      </Link>
    </section>
  );
}
