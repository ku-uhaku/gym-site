"use client";

import Image from "next/image";
import { useActionState } from "react";

import {
  initialContactState,
  sendEnquiry,
  type ContactState,
} from "../_actions/contact";
import { MAPS, PHONE, TEL } from "../_lib/site";
import Reveal from "./reveal";
import SnapRail from "./snap-rail";

const subjects = ["Membership", "Coaching", "Classes", "Something else"];

/* Hours and the street line are placeholders, like the number in _lib/site —
   confirm all three with the owner before launch. */
const desk = [
  { label: "Front desk", value: PHONE, href: TEL },
  { label: "Open", value: "Daily, 06:00 — 23:00" },
  { label: "Where", value: "Casablanca, Morocco", href: MAPS },
];

const field =
  "mt-2.5 w-full border-0 border-b border-chalk/20 bg-transparent pb-2.5 text-[1rem] text-chalk placeholder:text-chalk/30 transition-colors focus:border-brass focus:outline-none";

const label = "text-[0.72rem] tracking-[0.16em] uppercase text-chalk/45";

export default function Contact() {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendEnquiry,
    initialContactState,
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="snap-section band grain relative isolate [clip-path:inset(0)] [--band-from:var(--color-ash)] [--band-to:var(--color-ink)]"
    >
      {/* PLACEHOLDER SHOT, and the one frame on the page used twice — first
          in the queue when the owner sends a proper wide interior.

          The picture is kept off the form on purpose. On a wide screen it
          holds the left half, behind the heading and the desk details, and
          `.shot-veil` takes it to solid ink before the fields start. On a
          phone the form runs the full width, so the picture is a band across
          the top instead and the fields sit below it on clean ground.

          Cropped to 25% across: that is the dumbbell rack, which is dark and
          textural. The right of this frame is a wall of blown-out windows,
          and letting those under the type was what made the first attempt
          unreadable. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[52%] lg:inset-y-0 lg:right-auto lg:h-auto lg:w-[54%]"
      >
        <div className="shot-pin w-full">
          <Image
            src="/images/equipment5.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 54vw, 100vw"
            quality={60}
            className="object-cover object-[25%_55%] brightness-[0.5] grayscale contrast-[1.06]"
          />
          <div className="shot-veil absolute inset-0" />
        </div>

        {/* Spans the region and does not travel with the pin, so the section
            still opens on ash and closes on ink. */}
        <div className="shot-seam absolute inset-0" />
      </div>

      <SnapRail />

      <div className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20 xl:gap-28">
          <div className="max-w-[34rem]">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-chalk/45">
                <span aria-hidden className="h-px w-8 bg-brass" />
                Get in touch
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2
                id="contact-title"
                className="mt-6 font-display text-[clamp(2.3rem,4.4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-chalk text-balance"
              >
                Come in, or ask first.
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 text-[1.02rem] leading-[1.7] text-chalk/65">
                Leave a number and a coach calls you back the same day. Walk-ins
                are welcome too — the desk will show you the floor.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <dl className="mt-10 border-t border-chalk/12">
                {desk.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-6 border-b border-chalk/12 py-4"
                  >
                    <dt className={label}>{item.label}</dt>
                    <dd className="text-[0.95rem] text-chalk/90">
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          className="underline decoration-brass/40 decoration-1 underline-offset-[6px] transition hover:text-brass-lit hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:pt-2">
            {state.status === "sent" ? (
              /* Replaces the form rather than sitting above it: there is
                 nothing left to fill in, and a second enquiry is a phone
                 call. `role="status"` announces it where focus already is. */
              <div
                role="status"
                className="border-t border-brass/50 bg-iron/40 px-7 py-10 sm:px-9 sm:py-12"
              >
                <p className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.15] font-medium tracking-[-0.02em] text-chalk">
                  That&rsquo;s with us.
                </p>
                <p className="mt-4 max-w-[38ch] text-[0.97rem] leading-[1.7] text-chalk/65">
                  A coach will call you back today. If it is urgent, the desk
                  picks up faster than we do.
                </p>
                <a
                  href={TEL}
                  className="mt-7 inline-block text-[0.97rem] text-chalk underline decoration-brass/50 decoration-1 underline-offset-[6px] transition hover:decoration-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                >
                  {PHONE}
                </a>
              </div>
            ) : (
              <form action={action} noValidate className="grid gap-9">
                <div className="grid gap-9 sm:grid-cols-2">
                  <Field
                    name="name"
                    label="Your name"
                    placeholder="Amine Benali"
                    autoComplete="name"
                    state={state}
                  />
                  <Field
                    name="phone"
                    label="Phone"
                    type="tel"
                    placeholder="06 00 00 00 00"
                    autoComplete="tel"
                    state={state}
                  />
                </div>

                <div className="grid gap-9 sm:grid-cols-2">
                  <Field
                    name="email"
                    label="Email — optional"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    state={state}
                  />

                  <div>
                    <label htmlFor="about" className={label}>
                      What about
                    </label>
                    {/* `appearance-none` drops the platform chrome so the
                        control keeps the same hairline as the text fields; the
                        caret below is drawn in its place. */}
                    <div className="relative">
                      <select
                        id="about"
                        name="about"
                        defaultValue={state.values?.about ?? ""}
                        aria-invalid={state.errors?.about ? true : undefined}
                        aria-describedby={
                          state.errors?.about ? "about-error" : undefined
                        }
                        className={`${field} appearance-none pr-8`}
                      >
                        <option value="" disabled>
                          Choose one
                        </option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-1 bottom-4 text-[0.7rem] text-brass"
                      >
                        ▼
                      </span>
                    </div>
                    <Error id="about-error" message={state.errors?.about} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={label}>
                    What you are after
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue={state.values?.message}
                    placeholder="Training around shift work, back squat stuck at 90kg, first time in a gym — whatever it is."
                    aria-invalid={state.errors?.message ? true : undefined}
                    aria-describedby={
                      state.errors?.message ? "message-error" : undefined
                    }
                    className={`${field} resize-none leading-[1.65]`}
                  />
                  <Error id="message-error" message={state.errors?.message} />
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-1">
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center justify-center bg-brass px-8 py-4 text-[0.95rem] font-medium text-ink transition hover:bg-brass-lit focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-lit disabled:opacity-60"
                  >
                    {pending ? "Sending…" : "Send it"}
                  </button>
                  <p className="text-[0.85rem] leading-[1.6] text-chalk/45">
                    We use it to call you back. Nothing else, no list.
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label: text,
  state,
  ...input
}: {
  name: "name" | "phone" | "email";
  label: string;
  state: ContactState;
} & React.ComponentProps<"input">) {
  const error = state.errors?.[name];

  return (
    <div>
      <label htmlFor={name} className={label}>
        {text}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={state.values?.[name]}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={field}
        {...input}
      />
      <Error id={`${name}-error`} message={error} />
    </div>
  );
}

/* Always mounted so a screen reader hears the message appear rather than
   finding a new node; empty, it takes no vertical space. */
function Error({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} aria-live="polite" className="mt-2 text-[0.82rem] text-brass-lit empty:mt-0">
      {message}
    </p>
  );
}
