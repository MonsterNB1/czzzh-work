"use client";

import { useEffect, useState } from "react";

export default function BootSequence() {
  const [opacity, setOpacity] = useState(1);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 1200);
    const t2 = setTimeout(() => setGone(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black transition-opacity duration-700"
      style={{ opacity }}
    >
      <div
        className="bg-cyan-400/20"
        style={{
          width: "100%",
          height: "100%",
          animation: "crtOn 0.6s ease-out forwards",
          boxShadow: "0 0 200px rgba(0,255,255,0.2)",
        }}
      />
    </div>
  );
}
