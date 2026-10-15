import Image from "next/image";

import Reveal from "./reveal";

/* Figures are placeholders, like the desk number — swap for the owner's. */
const numbers = [
  { value: "2012", label: "Since" },
  { value: "800", label: "m² of floor" },
  { value: "4", label: "Coaches" },
];

const principles = [
  "Plates go back on the tree.",
  "Cables replaced before they fray.",
  "Your coach knows your program.",
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grain relative isolate overflow-hidden bg-ink"
    >
      <div className="grid lg:grid-cols-[1fr_48%] lg:items-stretch 2xl:grid-cols-[1fr_56%]">
        <div className="flex items-center px-6 py-20 sm:px-10 sm:py-24 lg:py-28 lg:pl-16 lg:pr-20">
          <div className="w-full max-w-[38rem]">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-chalk/45">
                <span aria-hidden className="h-px w-8 bg-brass" />
                Who we are
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2
                id="about-title"
                className="mt-6 font-display text-[clamp(2.3rem,4.4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-chalk text-balance"
              >
                We keep the room worth training in.
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 max-w-[40ch] text-[1.02rem] leading-[1.7] text-chalk/65">
                A members&rsquo; gym in Casablanca. No contracts built to trap
                you, no upsell at the desk.
              </p>
            </Reveal>

            <ul className="mt-9">
              {principles.map((line, i) => (
                <li key={line}>
                  <Reveal
                    delay={360 + i * 110}
                    className="flex items-baseline gap-4 border-t border-chalk/12 py-3.5 text-[0.97rem] text-chalk/85"
                  >
                    <span
                      aria-hidden
                      className="font-display text-[0.78rem] text-brass tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {line}
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={720}>
              <dl className="mt-9 flex gap-10 border-t border-chalk/12 pt-7 sm:gap-14">
                {numbers.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block font-display text-[clamp(1.8rem,3vw,2.2rem)] leading-none font-medium tracking-[-0.02em] text-chalk tabular-nums">
                        {item.value}
                      </span>
                      <span
                        aria-hidden
                        className="mt-2 block text-[0.74rem] text-chalk/45"
                      >
                        {item.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
        {/* Second in the markup so she looks back across the copy, not off the
            page; on mobile `order-first` puts the photograph up top again. */}
        <Reveal className="reveal-frame relative order-first min-h-[70svh] sm:min-h-[80svh] lg:order-none lg:min-h-[100svh]">
          <Image
            src="/images/back.jpg"
            alt="A member under the bar mid-set on the rig at Body Fitness."
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover object-[50%_28%] contrast-[1.04]"
          />
          {/* Feathered on the inner edge so the photo dissolves into the
              page instead of butting against the type with a hard seam. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,19,16,0.9),transparent_45%)] lg:bg-[linear-gradient(to_left,transparent_62%,rgba(23,19,16,0.92))] lg:before:absolute lg:before:inset-x-0 lg:before:top-0 lg:before:h-32 lg:before:bg-[linear-gradient(to_bottom,var(--color-ink),transparent)]"
          />
        </Reveal>

      </div>
    </section>
  );
}
