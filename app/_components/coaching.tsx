import { TEL } from "../_lib/site";
import Reveal from "./reveal";

/* PLACEHOLDERS. Every name and specialism below is invented — get the real
   four from the owner before launch. Fake staff on a gym page is the one
   mistake a walk-in catches immediately. */
const coaches = [
  {
    name: "Youssef",
    field: "Strength",
    line: "Barbell work from the first rep. Programs in twelve-week blocks.",
  },
  {
    name: "Salma",
    field: "Conditioning",
    line: "Intervals and engine work for members training around a desk job.",
  },
  {
    name: "Karim",
    field: "Boxing",
    line: "Pads, footwork and rounds. No sparring unless you ask for it.",
  },
  {
    name: "Nadia",
    field: "Rehab & mobility",
    line: "Returning from injury, or training so you do not come back hurt.",
  },
];

const steps = [
  "We watch you move before we write anything down.",
  "You get a program on paper, not a photograph of a whiteboard.",
  "It is reviewed every six weeks, whether or not you ask.",
];

export default function Coaching() {
  return (
    <section
      id="coaching"
      aria-labelledby="coaching-title"
      className="grain relative isolate overflow-hidden bg-ink"
    >
      <div className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[40rem]">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-chalk/45">
                <span aria-hidden className="h-px w-8 bg-brass" />
                Coaching
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2
                id="coaching-title"
                className="mt-6 font-display text-[clamp(2.3rem,4.4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-chalk text-balance"
              >
                Four coaches who know your program.
              </h2>
            </Reveal>
          </div>

          {/* The method sits beside the heading so the names below read as
              people rather than a price list of services. */}
          <Reveal delay={240} className="mt-10 lg:mt-0 lg:max-w-[26rem]">
            <ol className="space-y-3.5">
              {steps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-baseline gap-4 text-[0.95rem] leading-[1.6] text-chalk/70"
                >
                  <span
                    aria-hidden
                    className="font-display text-[0.78rem] text-brass tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* Structure lives on the <li>: `first:` would match every <Reveal>,
            since each one is the only child of its own item. */}
        <ul className="mt-16 grid gap-x-10 border-t border-chalk/12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-0">
          {coaches.map((coach, i) => (
            <li
              key={coach.name}
              className="border-b border-chalk/12 py-8 lg:border-l lg:py-9 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <Reveal delay={i * 110} className="h-full">
                <p className="text-[0.72rem] tracking-[0.16em] uppercase text-brass">
                  {coach.field}
                </p>
                <h3 className="mt-4 font-display text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.1] font-medium tracking-[-0.02em] text-chalk">
                  {coach.name}
                </h3>
                <p className="mt-3.5 text-[0.93rem] leading-[1.65] text-chalk/60">
                  {coach.line}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={480}>
          <p className="mt-14 flex flex-wrap items-baseline gap-x-5 gap-y-3 border-t border-chalk/12 pt-8 text-[0.97rem] text-chalk/70">
            The first session is an assessment, and it is free.
            <a
              href={TEL}
              className="text-chalk underline decoration-brass/50 decoration-1 underline-offset-[6px] transition hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              Book it at the desk
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
