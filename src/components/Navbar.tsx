import Link from "next/link";
import VinylPlayer from "./VinylPlayer";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-5">
        <Link
          href="/"
          className="hand text-4xl font-bold text-ink-blue leading-none sm:text-5xl"
        >
          czzzh
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6 text-lg note text-ink-blue">
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
