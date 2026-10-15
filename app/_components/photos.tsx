import Image from "next/image";

import { MAPS } from "../_lib/site";
import Reveal from "./reveal";
import SnapRail from "./snap-rail";

/* PLACEHOLDERS, and thinner than the rest of the page: these are the only
   uploads clean enough to print. The watermarked stock comps are left out on
   purpose. Add entries here — frame, ratio and caption — and the mosaic
   extends without touching the layout. */
const frames = [
  {
    src: "/images/photo9.jpg",
    alt: "Six coaches and members standing together in front of the rig.",
    caption: "The Saturday group, after the session.",
    crop: "object-center",
    /* Sets both its place in the mosaic and its shape. The tall frame spans
       two rows, so it keeps its own height and the ratio is dropped there. */
    cell: "lg:col-span-7",
    shape: "aspect-[16/10]",
  },
  {
    src: "/images/photo8.jpg",
    alt: "A member at the top of a barbell curl, head back, mid-set.",
    caption: "Last rep of the set.",
    cell: "lg:col-span-5 lg:row-span-2",
    shape: "aspect-[3/4] lg:aspect-auto lg:h-full",
    /* Held to the left edge: the photographer's watermark sits in the right
       quarter of this one and the crop drops it. Goes when the real photo
       lands. */
    crop: "object-left",
  },
  {
    src: "/images/photo6.jpeg",
    alt: "Two members in the mirror between sets under the ceiling lamps.",
    caption: "Between sets, Thursday evening.",
    crop: "object-center",
    cell: "lg:col-span-4",
    shape: "aspect-[3/4]",
  },
];

export default function Photos() {
  return (
    <section
      id="photos"
      aria-labelledby="photos-title"
      className="snap-section band grain relative isolate overflow-hidden [--band-from:var(--color-ink)] [--band-to:var(--color-ash)]"
    >
      <SnapRail />

      <div className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="max-w-[40rem]">
          <Reveal>
            <p className="flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-chalk/45">
              <span aria-hidden className="h-px w-8 bg-brass" />
              The room
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2
              id="photos-title"
              className="mt-6 font-display text-[clamp(2.3rem,4.4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-chalk text-balance"
            >
              Ordinary evenings, not a brochure.
            </h2>
          </Reveal>
        </div>

        {/* `items-start` keeps each frame at its own height: stretched grid
            items would override the ratios above and square everything off. */}
        <div className="mt-14 grid gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-12 lg:items-start">
          {frames.map((frame, i) => (
            <Reveal
              key={frame.src}
              delay={i * 140}
              className={`reveal-frame ${frame.cell} ${i === 1 ? "lg:h-full" : ""}`}
            >
              <figure className="flex h-full flex-col">
                <div
                  className={`relative overflow-hidden bg-iron ${frame.shape}`}
                >
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className={`object-cover contrast-[1.04] ${frame.crop}`}
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-3 text-[0.78rem] text-chalk/40">
                  <span aria-hidden className="font-display text-brass tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {frame.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}

          {/* Fills the hole the tall frame leaves at the foot of the mosaic,
              and gives the grid somewhere to send you next. */}
          <Reveal delay={420} className="lg:col-span-3 lg:self-end lg:pb-10">
            <p className="text-[0.97rem] leading-[1.7] text-chalk/65">
              Everything here was shot on the floor during open hours. No
              staged sessions, no empty room at six in the morning.
            </p>
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block text-[0.97rem] text-chalk underline decoration-brass/50 decoration-1 underline-offset-[6px] transition hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              Come and see it
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
