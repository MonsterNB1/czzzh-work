import Link from "next/link";
import VinylPlayer from "./VinylPlayer";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-4 md:px-6 md:pt-5">
        <Link
          href="/"
          className="hand text-[27px] font-bold text-ink-blue leading-none md:text-5xl"
        >
          czzzh
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          <ul className="flex gap-3.5 text-[13px] note text-ink-blue md:gap-6 md:text-lg">
            <li>
              <Link href="/works" className="nav-wiggle hover:opacity-60">Work</Link>
            </li>
            <li>
              <Link href="/about" className="nav-wiggle hover:opacity-60">About</Link>
            </li>
            <li>
              <Link href="/contact" className="nav-wiggle hover:opacity-60">Contact</Link>
            </li>
          </ul>
          <VinylPlayer />
        </div>
      </nav>
    </header>
  );
}
