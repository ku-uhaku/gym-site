import Image from "next/image";

/* Stock photography, not the Casablanca floor — swap each src for the real
   room before launch and the captions will need checking against it. */
const shots = [
  {
    src: "/images/equipment1.jpg",
    name: "Kettlebells",
    line: "A full ladder, racked by weight. They go back where they came from.",
    alt: "Rows of kettlebells lined up by weight on the gym floor.",
  },
  {
    src: "/images/equipment2.jpg",
    name: "Cardio",
    line: "Treadmills, uprights and cross-trainers along the windows.",
    alt: "A cardio room of treadmills, bikes and cross-trainers facing tall windows.",
  },
  {
    src: "/images/equipment3.jpg",
    name: "Rowers",
    line: "Concept2 ergs. Chains oiled, monitors on the same setting.",
    alt: "A member mid-stroke on a Concept2 rowing machine.",
  },
  {
    src: "/images/equipment4.jpg",
    name: "Racks & barbells",
    line: "Olympic bars, bumpers and iron, benches that adjust and hold.",
    alt: "A squat rack loaded with a barbell beside a rack of dumbbells and plates.",
  },
  {
    src: "/images/equipment5.jpg",
    name: "Dumbbells",
    line: "The whole run in 2 kg steps, mirrored the length of the wall.",
    alt: "A long dumbbell rack running the length of the training floor.",
  },
];

export default function Equipment() {
  return (
    <section
      id="equipment"
      aria-labelledby="equipment-title"
      className="snap-section relative isolate h-[100svh] overflow-hidden bg-ink"
    >
      {/* Sits over the scroller, so the label holds still while the
          photographs slide underneath it. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-10 sm:px-10 sm:pt-12 lg:px-16 lg:pt-14">
        <p className="flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-chalk/55">
          <span aria-hidden className="h-px w-8 bg-brass" />
          Equipment
        </p>
        <h2
          id="equipment-title"
          className="mt-4 max-w-[22ch] font-display text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.15] font-medium tracking-[-0.02em] text-chalk/90 text-balance"
        >
          Everything on the floor, one at a time.
        </h2>
      </div>

      {/* The gallery owns its own scrolling, so mandatory snapping stops at
          exactly one photograph per flick without imposing snap points on the
          rest of the page. Overscroll is left to chain, so the last frame
          hands scrolling back. */}
      <div
        role="region"
        data-inner-scroll
        aria-label="Equipment photographs, one per screen"
        tabIndex={0}
        className="no-scrollbar h-full snap-y snap-mandatory scroll-smooth overflow-y-scroll focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brass"
      >
        <div className="relative">
          {/* The frames below are sticky, so their own boxes sit at the top of
              the scroller and cannot serve as snap points. These flat markers
              pin one snap point per screen instead; `snap-always` is what
              forbids skipping two photographs on one flick. */}
          {shots.map((shot, i) => (
            <div
              key={`snap-${shot.src}`}
              aria-hidden
              className="pointer-events-none absolute inset-x-0 h-px snap-start snap-always"
              style={{ top: `calc(${i} * 100svh)` }}
            />
          ))}

          {/* Each frame pins to the top and the next slides up over it, so the
              images stack rather than travel. Later frames paint over earlier
              ones by document order, so no z-index is needed between them. */}
          {shots.map((shot, i) => (
            <figure
              key={shot.src}
              className="grain sticky top-0 h-[100svh] w-full overflow-hidden"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                quality={80}
                /* Graded to one key so five rooms read as one gym. */
                className="object-cover grayscale contrast-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,19,16,0.92),rgba(23,19,16,0.12)_45%,rgba(23,19,16,0.7))]"
              />

              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 pb-12 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
                <span className="font-display text-[0.78rem] text-brass tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-chalk/55"> / {shots.length}</span>
                </span>
                <h3 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-medium tracking-[-0.03em] text-chalk">
                  {shot.name}
                </h3>
                <p className="max-w-[40ch] text-[0.97rem] leading-[1.6] text-chalk/70">
                  {shot.line}
                </p>
              </figcaption>

              {/* Only the first frame needs to say the stack moves. */}
              {i === 0 && (
                <p
                  aria-hidden
                  className="nudge absolute right-6 bottom-12 text-[0.72rem] tracking-[0.2em] uppercase text-chalk/60 sm:right-10 sm:bottom-14 lg:right-16 lg:bottom-16"
                >
                  Scroll ↓
                </p>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
