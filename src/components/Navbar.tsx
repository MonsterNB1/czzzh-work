"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import VinylPlayer from "./VinylPlayer";

export default function Navbar() {
  // once the page is scrolled, the paper fades in behind the nav so nothing runs through the links
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const paper = document.querySelector(".sheet-paper") as HTMLElement | null;
      const offset = window.scrollY + (paper ? paper.scrollTop : 0);
      setSolid(offset > 8);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };
    const opts: AddEventListenerOptions = { passive: true, capture: true };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, opts);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, opts);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-30 h-[96px] md:h-[118px] transition-opacity duration-300 ${
          solid ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, #f5f1e6 0%, #f5f1e6 74%, rgba(245,241,230,0.93) 87%, rgba(245,241,230,0) 100%)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />
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
    </>
  );
}
