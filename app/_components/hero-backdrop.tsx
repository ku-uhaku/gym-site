"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** Drop your clip at these paths. Nothing else needs to change. */
const CLIP = "/media/hero.mp4";
const POSTER = "/media/hero-poster.jpg";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Subscribes to the motion preference so it stays correct if the OS flips. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * The moving layer behind the hero.
 *
 * The designed fallback (warm light + grain) sits underneath, so the section
 * looks finished before the clip paints, or if no clip is present at all.
 * The pause control is here because the footage loops for longer than five
 * seconds, which WCAG asks us to let people stop.
 */
export default function HeroBackdrop() {
  const video = useRef<HTMLVideoElement>(null);
  const calm = usePrefersReducedMotion();
  const [override, setOverride] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  // Someone's explicit choice wins; otherwise follow the motion preference.
  const playing = override ?? !calm;

  // Playback is driven here rather than by `autoplay`, so the preference is
  // honoured on the first frame instead of after a flash of motion.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (playing) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [playing]);

  return (
    <>
      {/* Fallback: a shaft of warm light across oxidised dark. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink bg-[radial-gradient(120%_90%_at_72%_8%,var(--color-iron)_0%,var(--color-ink)_55%,#0d0a08_100%)]"
      />

      {/* The poster is frame zero of the clip, so it paints immediately and
          playback starts from the identical image with nothing to fade. */}
      <video
        ref={video}
        className="absolute inset-0 size-full object-cover brightness-90 saturate-[0.95]"
        poster={POSTER}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
      >
        <source src={CLIP} type="video/mp4" />
      </video>

      {/* Scrim: dark at the top so the header reads over whatever the footage
          has up there, a clear window across the middle, dark ground below. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,19,16,0.97)_0%,rgba(23,19,16,0.80)_34%,rgba(45,20,22,0.52)_66%,rgba(23,19,16,0.86)_100%)]"
      />

      {ready && (
        <button
          type="button"
          onClick={() => setOverride(!playing)}
          aria-pressed={!playing}
          className="absolute bottom-5 right-5 z-20 grid size-10 place-items-center rounded-full border border-chalk/20 bg-ink/40 text-chalk/70 backdrop-blur-sm transition hover:border-brass/60 hover:text-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass sm:bottom-7 sm:right-7"
        >
          <span className="sr-only">
            {playing ? "Pause background video" : "Play background video"}
          </span>
          {playing ? (
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
              <rect width="3" height="12" fill="currentColor" />
              <rect x="7" width="3" height="12" fill="currentColor" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
              <path d="M0 0l10 6-10 6z" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
