import HeroBackdrop from "./hero-backdrop";

const MAPS =
  "https://www.google.com/maps/place/Body+fitness+Gym/@33.5302508,-7.645914,17z";

/* Replace with the real desk number before this goes live. */
const PHONE = "+212 5 22 00 00 00";

const facts = [
  { label: "Open", value: "Daily, 06:00 — 23:00" },
  { label: "Where", value: "Casablanca, Morocco", href: MAPS },
  { label: "Front desk", value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
];

export default function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackdrop />

      <header className="relative z-10 flex items-baseline justify-between px-6 pt-7 sm:px-10 lg:px-16">
        <a
          href="#"
          className="font-display text-xl tracking-tight text-chalk focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
        >
          Body&nbsp;Fitness
        </a>
        <a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          className="text-[0.8rem] text-chalk/70 underline decoration-brass/50 decoration-1 underline-offset-[6px] transition hover:text-chalk hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
        >
          Call the desk
        </a>
      </header>

      <div className="relative z-10 mt-auto px-6 pb-9 sm:px-10 lg:px-16 lg:pb-14">
        <h1 className="settle max-w-[14ch] font-display text-[clamp(3.4rem,15vw,9.5rem)] leading-[0.86] font-medium tracking-[-0.03em] text-chalk text-balance">
          Built, not bought.
        </h1>

        <p
          className="settle mt-6 max-w-[42ch] text-[0.98rem] leading-[1.65] text-chalk/75 sm:text-[1.05rem]"
          style={{ animationDelay: "160ms" }}
        >
          A members&rsquo; gym in Casablanca. Weights that are racked, machines
          that are serviced, and coaches who remember your program.
        </p>

        <div
          className="settle mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
          style={{ animationDelay: "300ms" }}
        >
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center bg-brass px-8 py-4 text-[0.95rem] font-medium text-ink transition hover:bg-brass-lit focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-lit"
          >
            Book a visit
          </a>
          <a
            href={MAPS}
            target="_blank"
            rel="noreferrer"
            className="inline-flex self-start sm:self-auto items-center py-2 text-[0.95rem] text-chalk/85 underline decoration-chalk/30 decoration-1 underline-offset-[7px] transition hover:text-chalk hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
          >
            Get directions
          </a>
        </div>

        <dl
          className="settle mt-11 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-chalk/15 pt-6 sm:flex sm:justify-between sm:gap-10 lg:max-w-4xl"
          style={{ animationDelay: "440ms" }}
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[0.74rem] text-chalk/55">{fact.label}</dt>
              <dd className="mt-1.5 text-[0.9rem] text-chalk/90">
                {fact.href ? (
                  <a
                    href={fact.href}
                    target={fact.href.startsWith("http") ? "_blank" : undefined}
                    rel={fact.href.startsWith("http") ? "noreferrer" : undefined}
                    className="transition hover:text-brass-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
