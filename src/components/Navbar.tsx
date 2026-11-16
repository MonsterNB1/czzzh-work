import Link from "next/link";

const links = [
  { href: "/", label: "home" },
  { href: "/works", label: "works" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export default function Navbar() {
  return (
    <header className="border-b border-cyan-500/20 bg-[#060a0f]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-mono text-cyan-400 glow-dim">
          czzzh@portfolio:~$ <span className="text-cyan-200">whoami</span>
        </Link>
        <ul className="flex gap-5 text-xs text-cyan-500">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="term-link">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
