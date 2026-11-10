"use client";

import { useEffect, useRef, useState } from "react";

/** Número que cuenta hasta su valor al entrar en pantalla. El valor final está en el HTML. */
export default function CountUp({ value, prefix = "", suffix = "", from = 0 }: { value: number; prefix?: string; suffix?: string; from?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setShown(Math.round(from + (value - from) * eased));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        setShown(from);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, from]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
