"use client";

import { useEffect } from "react";
import { playPaper, prefetchPaperSfx } from "@/lib/sfx";

/**
 * 只在「进入项目」那一下响纸声。
 * 触发条件是链接上带 data-sfx="turn"，别的地方一概不响。
 */
export default function PaperClicks() {
  useEffect(() => {
    prefetchPaperSfx();

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-sfx='off']")) return;

      const link = target.closest("a[data-sfx='turn']") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!href || href === "#") return;

      playPaper();
    };

    // 第一次按下时也补一次预取，防止页面加载时网络被别的资源占满
    const prime = () => prefetchPaperSfx();

    document.addEventListener("click", onClick, true);
    window.addEventListener("pointerdown", prime, { once: true, capture: true });
    window.addEventListener("keydown", prime, { once: true, capture: true });

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pointerdown", prime, true);
      window.removeEventListener("keydown", prime, true);
    };
  }, []);

  return null;
}
