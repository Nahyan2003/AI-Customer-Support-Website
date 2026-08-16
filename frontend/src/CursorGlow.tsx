import { useEffect, useRef, useState } from "react";

/**
 * Animated cursor: a soft glowing halo that lags behind the pointer plus a
 * crisp dot that tracks it exactly. Hides on touch devices and when the user
 * prefers reduced motion.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("button, a, input, [role='button']")));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.14;
      ring.y += (target.y - ring.y) * 0.14;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  const scale = pressed ? 0.75 : active ? 1.9 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <div
        ref={ringRef}
        className="cursor-ring absolute left-0 top-0 size-10 rounded-full transition-[opacity,width,height] duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="size-full rounded-full border border-primary/50 bg-primary/10 backdrop-blur-[1px] transition-transform duration-300 ease-out"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-accent shadow-glow"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
