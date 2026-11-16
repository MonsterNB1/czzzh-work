import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-cyan-500/10 bg-[#060a0f]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm tracking-widest text-cyan-300">
          CZH<span className="text-cyan-600">.</span>
        </Link>
        <ul className="flex gap-6 text-xs tracking-wider text-cyan-500">
          <li><Link href="/works" className="transition-colors hover:text-cyan-200">Works</Link></li>
          <li><Link href="/about" className="transition-colors hover:text-cyan-200">About</Link></li>
          <li><Link href="/contact" className="transition-colors hover:text-cyan-200">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
