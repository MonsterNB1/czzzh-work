"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CRTTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"hidden" | "line" | "expand" | "fade">("hidden");

  useEffect(() => {
    // Start: thin bright line appears
    setPhase("line");
    // Expand to full bright screen
    const t1 = setTimeout(() => setPhase("expand"), 150);
    // Fade out to reveal new page
    const t2 = setTimeout(() => setPhase("fade"), 500);
    const t3 = setTimeout(() => setPhase("hidden"), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  if (phase === "hidden") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div
        className="w-full bg-cyan-100"
        style={{
          height: phase === "line" ? "3px" : phase === "expand" ? "100vh" : "100vh",
          opacity: phase === "fade" ? 0 : 1,
          transition:
            phase === "line"
              ? "height 0.35s ease-in"
              : phase === "expand"
              ? "height 0.3s ease-out, opacity 0.4s ease-out"
              : "opacity 0.4s ease-out",
          boxShadow:
            phase === "line"
              ? "0 0 80px rgba(0,255,255,0.9), 0 0 160px rgba(0,255,255,0.5)"
              : "0 0 200px rgba(0,255,255,0.3)",
        }}
      />
    </div>
  );
}
