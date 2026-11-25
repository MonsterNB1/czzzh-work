"use client";

import { useEffect } from "react";
import { playPaper, prefetchPaperSfx } from "@/lib/sfx";

/**
 * 全站的纸声：
 * - 任何跳到别的页面的链接 → 翻一页
 * - 标了 data-sfx="tab" 的标签按钮 → 拍一下纸片
 * - 标了 data-sfx="off" 的区域自动静音（留给以后要安静的控件）
 */
export default function PaperClicks() {
  useEffect(() => {
    prefetchPaperSfx();

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-sfx='off']")) return;

      const tab = target.closest("[data-sfx='tab']");
      if (tab) {
        playPaper("tab");
        return;
      }

      const link = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      playPaper("turn");
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
