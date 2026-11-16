export default function CRTOverlay() {
  return (
    <>
      {/* Screen noise */}
      <div className="crt-noise" />
      {/* Vignette */}
      <div className="crt-vignette" />
      {/* Screen glare/reflection - diagonal light streak */}
      <div
        className="pointer-events-none fixed inset-0 z-[9994]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
        }}
      />
      {/* Chromatic aberration edge glow */}
      <div
        className="pointer-events-none fixed inset-0 z-[9993]"
        style={{
          boxShadow:
            "inset 0 0 80px rgba(0,255,255,0.06), inset 0 0 200px rgba(0,0,0,0.5)",
        }}
      />
      {/* Flicker */}
      <div className="crt-flicker" />
      {/* Scanlines */}
      <div className="crt-scanlines" />
    </>
  );
}
