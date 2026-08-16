const PARTICLES = [
  { left: "8%", delay: "0s", duration: "22s", size: 3 },
  { left: "18%", delay: "4s", duration: "28s", size: 2 },
  { left: "29%", delay: "9s", duration: "24s", size: 4 },
  { left: "41%", delay: "2s", duration: "30s", size: 2 },
  { left: "53%", delay: "12s", duration: "26s", size: 3 },
  { left: "64%", delay: "6s", duration: "32s", size: 2 },
  { left: "74%", delay: "15s", duration: "23s", size: 4 },
  { left: "86%", delay: "3s", duration: "29s", size: 3 },
  { left: "94%", delay: "10s", duration: "27s", size: 2 },
];

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-aurora animate-aurora" />
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-10%] animate-float rounded-full bg-primary/40 blur-[1px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
