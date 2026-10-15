"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lays invisible snap points down its section, one screen apart.
 *
 * The page snaps `mandatory`, which means the scroller has to come to rest on
 * a snap point. A section taller than the viewport with only one snap point at
 * its top therefore cannot be stopped inside — the scroller is pulled back to
 * that top or on to the next section, and the middle of the section becomes
 * unreachable. These markers give it somewhere to stop every screenful, so a
 * tall section is stepped through instead of skipped.
 *
 * Same trick the equipment gallery uses on its own scroller, except the count
 * is measured here: a section's height depends on its content and the
 * viewport, so it is not known until it renders.
 */
export default function SnapRail() {
  const host = useRef<HTMLDivElement>(null);
  /* Measured in pixels, not `svh`: on mobile the two disagree while the
     browser chrome collapses, and a marker half a bar off its screen is
     exactly the jitter this is meant to avoid. */
  const [stops, setStops] = useState<number[]>([]);

  useEffect(() => {
    const section = host.current?.parentElement;
    if (!section) return;

    const measure = () => {
      const screen = window.innerHeight;
      if (!screen) return;
      const count = Math.max(1, Math.ceil(section.offsetHeight / screen));
      setStops(Array.from({ length: count }, (_, i) => i * screen));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(section);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={host} aria-hidden className="pointer-events-none absolute inset-0">
      {stops.map((top) => (
        <div
          key={top}
          data-snap
          className="absolute inset-x-0 h-px snap-start snap-always"
          style={{ top }}
        />
      ))}
    </div>
  );
}
