"use server";

/* The desk form.
 *
 * NOT YET DELIVERED ANYWHERE. Validation, the reply the member sees and the
 * progressive-enhancement path are all finished; the one missing piece is a
 * destination. Drop the owner's choice in at `deliver()` below — an SMTP send,
 * a Resend/Postmark call, or a webhook into whatever the desk already reads —
 * and nothing above it has to change. Until then every enquiry lands in the
 * server log and nowhere else, so do not launch on this. */

export type ContactState = {
  status: "idle" | "error" | "sent";
  errors?: Partial<Record<Field, string>>;
  /* Echoed back so a rejected form does not empty itself under the member. */
  values?: Partial<Record<Field, string>>;
};

type Field = "name" | "phone" | "email" | "about" | "message";

export const initialContactState: ContactState = { status: "idle" };

/* Mirrors the <select>; an unknown value is treated as unset rather than
   trusted, since the options are a promise about what the desk can answer. */
const subjects = ["Membership", "Coaching", "Classes", "Something else"];

export async function sendEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const read = (field: Field) => String(formData.get(field) ?? "").trim();

  const values = {
    name: read("name"),
    phone: read("phone"),
    email: read("email"),
    about: read("about"),
    message: read("message"),
  };

  const errors: Partial<Record<Field, string>> = {};

  if (values.name.length < 2) {
    errors.name = "Tell us what to call you.";
  }

  /* Deliberately loose: Moroccan numbers get written +212, 0, with spaces and
     with dashes, and a stricter pattern only rejects real members. */
  const digits = values.phone.replace(/[^\d]/g, "");
  if (digits.length < 9 || digits.length > 15) {
    errors.phone = "A number the desk can call back on.";
  }

  /* Optional — the desk calls. Only checked when something was typed. */
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = "That address looks mistyped.";
  }

  if (!subjects.includes(values.about)) {
    errors.about = "Pick the one closest to it.";
  }

  if (values.message.length < 10) {
    errors.message = "A line or two about what you are after.";
  } else if (values.message.length > 2000) {
    errors.message = "Shorter than that, please — then call the desk.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  await deliver(values);

  return { status: "sent" };
}

async function deliver(enquiry: Record<Field, string>) {
  // TODO(before launch): send this to the desk. See the note at the top.
  console.info("[contact] enquiry received", enquiry);
}
