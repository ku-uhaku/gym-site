import { cacheLife } from "next/cache";

import { MAPS, PHONE, TEL } from "../_lib/site";
import SnapRail from "./snap-rail";

const sections = [
  { label: "Who we are", href: "#about" },
  { label: "The floor", href: "#equipment" },
  { label: "What we do", href: "#services" },
  { label: "The room", href: "#photos" },
  { label: "Get in touch", href: "#contact" },
];

/* Hours are a placeholder, like the number and the street line. */
const hours = [
  { days: "Monday — Friday", time: "06:00 — 23:00" },
  { days: "Saturday", time: "08:00 — 21:00" },
  { days: "Sunday", time: "08:00 — 18:00" },
];

/* Next refuses `new Date()` during a prerender, and rightly: the year would
   be frozen at whatever the build machine's clock said. `"use cache"` lets it
   be prerendered and then revalidated on its own, so the line is correct in
   January without a redeploy. */
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await currentYear();

  return (
    /* `mt-auto` is what the flex column on <body> is there for: on a short
       page the footer still sits at the bottom instead of mid-screen.

       No rule along the top: the ink-to-pitch wash is what separates the
       footer from the form above it, and a hairline on top of that would be
       the only hard seam left on the page. */
    <footer className="snap-section band grain relative isolate mt-auto overflow-hidden [--band-from:var(--color-ink)] [--band-to:var(--color-pitch)]">
      <SnapRail />

      <div className="px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div className="max-w-[28rem]">
            <a
              href="#"
              className="font-display text-[1.6rem] leading-none tracking-tight text-chalk focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              Body&nbsp;Fitness
            </a>
            <p className="mt-5 text-[0.95rem] leading-[1.7] text-chalk/55">
              A members&rsquo; gym in Casablanca. Weights that are racked,
              machines that are serviced, and coaches who remember your
              program.
            </p>
            <a
              href={TEL}
              className="mt-6 inline-block font-display text-[1.15rem] text-chalk underline decoration-brass/40 decoration-1 underline-offset-[7px] transition hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              {PHONE}
            </a>
          </div>

          <nav aria-label="Sections">
            <h2 className="text-[0.72rem] tracking-[0.16em] uppercase text-chalk/40">
              The page
            </h2>
            <ul className="mt-5 grid gap-3">
              {sections.map((section) => (
                <li key={section.href}>
                  <a
                    href={section.href}
                    className="text-[0.95rem] text-chalk/75 transition hover:text-brass-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.72rem] tracking-[0.16em] uppercase text-chalk/40">
              Open
            </h2>
            <dl className="mt-5 grid gap-3">
              {hours.map((row) => (
                <div
                  key={row.days}
                  className="flex items-baseline justify-between gap-5 text-[0.95rem]"
                >
                  <dt className="text-chalk/55">{row.days}</dt>
                  <dd className="text-chalk/85 tabular-nums">{row.time}</dd>
                </div>
              ))}
            </dl>
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-[0.95rem] text-chalk/75 underline decoration-brass/40 decoration-1 underline-offset-[6px] transition hover:text-chalk hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              Get directions
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-chalk/12 pt-7 text-[0.8rem] text-chalk/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Body Fitness, Casablanca. All
            rights reserved.
          </p>
          <p>Built, not bought.</p>
        </div>
      </div>
    </footer>
  );
}
