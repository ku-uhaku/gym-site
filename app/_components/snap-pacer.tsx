"use client";

import { useEffect } from "react";

/* The knob. The browser's own snap animation is fixed and fast, and no CSS
   property changes it, so the glide below replaces it. Raise for a longer
   settle, lower to get closer to native. */
const DURATION = 950;

/* How much wheel has to accumulate before the page moves on a stop. One mouse
   notch is ~100 and clears it outright; a trackpad gathers over a few frames. */
const STEP = 60;

/* Floor on the gap between stops, so a hard trackpad flick advances at a pace
   you can follow instead of firing off every stop it has delta for. */
const PACE = 220;

/* A gap this long means the gesture ended, so the next one starts fresh from
   wherever the page actually is. */
const GESTURE_END = 180;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Paces the page's section snapping.
 *
 * The snapping itself stays in CSS — this only takes over the animation, so a
 * wheel gesture glides to the next stop over `DURATION` instead of the
 * browser's much quicker default. Native snapping is switched off for the
 * length of each glide and handed straight back, so touch, keyboard and
 * anything this does not intercept behave exactly as before.
 *
 * Events are never swallowed. Scrolling on while a glide is running moves its
 * target along instead, and turning round mid-glide turns the glide round —
 * holding events until the animation finished was what made the page feel
 * stuck, and made going back up after going down look broken.
 */
export default function SnapPacer() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    /* Where the running glide is headed. Null means the page is at rest and
       the next stop is measured from where it actually sits. */
    let target: number | null = null;
    let gathered = 0;
    let lastEvent = 0;
    let lastStep = 0;

    /* Every rail marker, plus each section's own top. Read per step rather
       than cached: reveals and the responsive grids move these offsets. */
    const stops = () => {
      const nodes = document.querySelectorAll<HTMLElement>(
        "[data-snap], .snap-section",
      );
      const ys = [...nodes].map((n) =>
        Math.round(window.scrollY + n.getBoundingClientRect().top),
      );
      return [...new Set(ys)].sort((a, b) => a - b);
    };

    const glide = (to: number) => {
      /* Always re-aim from where the page is now, so a retarget continues the
         movement rather than restarting it from the old origin. */
      if (frame) cancelAnimationFrame(frame);

      const from = window.scrollY;
      const distance = to - from;
      target = to;

      if (!distance) {
        frame = 0;
        target = null;
        return;
      }

      /* Otherwise the browser snaps underneath the animation and fights it. */
      root.style.scrollSnapType = "none";
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION);
        window.scrollTo(0, from + distance * easeInOutCubic(progress));

        if (progress < 1) {
          frame = requestAnimationFrame(step);
          return;
        }

        frame = 0;
        target = null;
        root.style.scrollSnapType = "";
      };

      frame = requestAnimationFrame(step);
    };

    const onWheel = (event: WheelEvent) => {
      /* Things that scroll themselves: the equipment gallery, and the message
         field once what someone has written overflows it. Paging the document
         out from under either one is the obvious way to get this wrong. */
      if (
        (event.target as Element)?.closest?.("[data-inner-scroll], textarea")
      ) {
        return;
      }

      const down = event.deltaY > 0;
      if (!event.deltaY) return;

      const here = window.scrollY;

      /* Nothing left this way — at the top going up, or the bottom going
         down. Hands off, so the page keeps its own end-of-travel behaviour
         instead of locking up. Measured off the document rather than the stop
         list, because this runs on every single wheel event and reading the
         stops here would mean a layout pass per frame of a trackpad gesture. */
      const furthest = root.scrollHeight - window.innerHeight;
      if (down ? here >= furthest - 2 : here <= 2) return;

      event.preventDefault();

      const now = performance.now();
      /* A new gesture, or a change of mind, both start the count again — the
         second is what makes turning round feel immediate. */
      if (now - lastEvent > GESTURE_END) gathered = 0;
      if (gathered && Math.sign(event.deltaY) !== Math.sign(gathered)) {
        gathered = 0;
      }
      lastEvent = now;
      gathered += event.deltaY;

      if (Math.abs(gathered) < STEP) return;
      if (now - lastStep < PACE) return;

      gathered = 0;
      lastStep = now;

      /* Measure the next stop from where the page is heading, not from where
         it is, so scrolling on through a glide keeps advancing. Turning round
         re-bases on the live position instead, so the reversal is honoured
         from here rather than from a target behind you. */
      const basis =
        target !== null && (down ? target > here : target < here)
          ? target
          : here;

      /* Falling back to the document's own ends matters: there is page below
         the last stop and above the first, and without this the glide would
         find nothing to aim at and simply refuse to move. */
      const all = stops();
      const next = down
        ? (all.find((y) => y > basis + 2) ?? furthest)
        : ([...all].reverse().find((y) => y < basis - 2) ?? 0);

      glide(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (frame) cancelAnimationFrame(frame);
      root.style.scrollSnapType = "";
    };
  }, []);

  return null;
}
