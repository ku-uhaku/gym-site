import Image from "next/image";

import { TEL } from "../_lib/site";
import Reveal from "./reveal";
import SnapRail from "./snap-rail";

/* PLACEHOLDER COPY AND PHOTOGRAPHY. The four services are the ones the owner
   described; the wording, and every image below, needs confirming against the
   real offer before launch. Nutrition and the kit desk are standing in with
   photographs of something else entirely — those two are the first to swap. */
const services = [
  {
    name: "Personal coaching",
    note: "One to one",
    line: "One coach, one program, written on paper and reviewed every six weeks.",
    src: "/images/photo1.jpg",
    alt: "A member mid-curl with an EZ bar on the training floor.",
  },
  {
    name: "Classes",
    note: "Small groups",
    line: "Kettlebell, conditioning and boxing rounds. Timetable on the board at the desk.",
    src: "/images/photo10.jpg",
    alt: "A row of members starting a kettlebell set together in a class.",
  },
  {
    name: "Nutrition",
    note: "Monthly review",
    line: "A plan built around what you actually eat, not around what we sell.",
    src: "/images/photo2.jpg",
    alt: "A member resting with a battle rope across her shoulders.",
  },
  {
    name: "Kit & equipment",
    note: "At the desk",
    line: "Belts, straps, wraps and bars. Ordered in at cost when we do not stock it.",
    src: "/images/equipment4.jpg",
    alt: "A squat rack loaded with a barbell beside a rack of dumbbells and plates.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="snap-section grain relative isolate overflow-hidden bg-ink"
    >
      <SnapRail />

      <div className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[40rem]">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-chalk/45">
                <span aria-hidden className="h-px w-8 bg-brass" />
                What we do
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2
                id="services-title"
                className="mt-6 font-display text-[clamp(2.3rem,4.4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-chalk text-balance"
              >
                Four ways to use the place.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={240} className="mt-8 lg:mt-0 lg:max-w-[24rem]">
            <p className="text-[1.02rem] leading-[1.7] text-chalk/65">
              Membership gets you the floor. The rest is there when you want it,
              and nobody at the desk will push it on you.
            </p>
          </Reveal>
        </div>

        {/* `group` lives on the <li>, so the photograph answers a hover that
            lands anywhere on the card — including the words under it. */}
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
          {services.map((service, i) => (
            <li key={service.name} className="group">
              <Reveal delay={i * 110}>
                <div className="relative aspect-[4/5] overflow-hidden bg-iron">
                  <Image
                    src={service.src}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 90vw"
                    className="object-cover contrast-[1.04] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  {/* Weighted to the foot of the frame so the number below it
                      reads against a dark edge in every one of the four. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,19,16,0.72),transparent_55%)]"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-chalk/12 pt-4">
                  <span
                    aria-hidden
                    className="font-display text-[0.78rem] text-brass tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.72rem] tracking-[0.16em] uppercase text-chalk/40">
                    {service.note}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[1.1] font-medium tracking-[-0.02em] text-chalk">
                  {service.name}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-[1.65] text-chalk/60">
                  {service.line}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={480}>
          <p className="mt-14 flex flex-wrap items-baseline gap-x-5 gap-y-3 border-t border-chalk/12 pt-8 text-[0.97rem] text-chalk/70">
            Prices are on the board at the desk, and they do not change at the
            till.
            <a
              href={TEL}
              className="text-chalk underline decoration-brass/50 decoration-1 underline-offset-[6px] transition hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              Ask us anything
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
