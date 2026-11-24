"use client";

import { useActionState, useEffect, useRef } from "react";
import { Arrow } from "@/components/ui/arrow";
import { enquiryLimits, initialEnquiryState, type EnquiryField, type EnquiryState } from "@/lib/enquiry";

type Labels = {
  title: string;
  fields: Record<EnquiryField, string>;
  optional: string;
  submit: string;
  sending: string;
  privacy: string;
  closed: { title: string; text: string };
  invalid: string;
  failed: string;
  sent: { title: string; text: string };
};

type Props = {
  action: (state: EnquiryState, formData: FormData) => Promise<EnquiryState>;
  needs: string[];
  /** False until the email settings exist, so the form never pretends to send. */
  isOpen: boolean;
  labels: Labels;
};

const input =
  "mt-1.5 block w-full rounded-lg border bg-paper px-3.5 py-3 text-base text-ink aria-invalid:border-accent disabled:cursor-not-allowed disabled:opacity-60 not-aria-invalid:border-line";

export function EnquiryForm({ action, needs, isOpen, labels }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialEnquiryState);
  const summary = useRef<HTMLParagraphElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const { values, errors } = state;

  useEffect(() => {
    if (state.status === "invalid" || state.status === "failed" || state.status === "unavailable") summary.current?.focus();
    if (state.status === "sent") done.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={done} tabIndex={-1} role="status" className="rounded-2xl border border-line bg-surface p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold">{labels.sent.title}</h2>
        <p className="mt-2 text-muted">{labels.sent.text}</p>
      </div>
    );
  }

  const describe = (field: EnquiryField) => (errors[field] ? `${field}-error` : undefined);
  const error = (field: EnquiryField) =>
    errors[field] && (
      <p id={`${field}-error`} className="mt-1.5 text-sm font-semibold text-accent">
        {errors[field]}
      </p>
    );
  const optional = <span className="font-normal text-muted"> ({labels.optional})</span>;

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold">{labels.title}</h2>

      {!isOpen && (
        <div role="note" className="mt-4 rounded-lg border border-accent/40 bg-paper p-4">
          <p className="font-semibold">{labels.closed.title}</p>
          <p className="mt-1 text-sm text-muted">{labels.closed.text}</p>
        </div>
      )}

      <p ref={summary} tabIndex={-1} aria-live="polite" className="text-sm font-semibold text-accent empty:hidden [&:not(:empty)]:mt-4">
        {state.status === "invalid" ? labels.invalid : state.status === "failed" ? labels.failed : state.status === "unavailable" ? labels.closed.text : ""}
      </p>

      <form action={formAction} noValidate className="mt-5">
        <fieldset disabled={!isOpen || isPending} className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-semibold">
              {labels.fields.name}
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={enquiryLimits.name.max}
              defaultValue={values.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describe("name")}
              className={input}
            />
            {error("name")}
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-semibold">
              {labels.fields.phone}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              maxLength={enquiryLimits.phone.max}
              defaultValue={values.phone}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describe("phone")}
              className={input}
            />
            {error("phone")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-sm font-semibold">
              {labels.fields.email}
              {optional}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={enquiryLimits.email.max}
              defaultValue={values.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describe("email")}
              className={input}
            />
            {error("email")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="area" className="text-sm font-semibold">
              {labels.fields.area}
              {optional}
            </label>
            <input
              id="area"
              name="area"
              autoComplete="address-level2"
              maxLength={enquiryLimits.area.max}
              defaultValue={values.area}
              aria-invalid={Boolean(errors.area)}
              aria-describedby={describe("area")}
              className={input}
            />
            {error("area")}
          </div>

          <fieldset className="sm:col-span-2" aria-invalid={Boolean(errors.need)} aria-describedby={describe("need")}>
            <legend className="text-sm font-semibold">{labels.fields.need}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {needs.map((need) => (
                <label key={need} className="cursor-pointer has-disabled:cursor-not-allowed">
                  <input type="radio" name="need" value={need} defaultChecked={values.need === need} required className="peer sr-only" />
                  <span className="inline-flex min-h-10 items-center rounded-full border border-line bg-paper px-4 text-sm font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber peer-disabled:opacity-60 hover:border-ink">
                    {need}
                  </span>
                </label>
              ))}
            </div>
            {error("need")}
          </fieldset>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="text-sm font-semibold">
              {labels.fields.message}
              {optional}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={enquiryLimits.message.max}
              defaultValue={values.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describe("message")}
              className={`${input} resize-y`}
            />
            {error("message")}
          </div>

          {/* Hidden from people and screen readers. Only bots fill it in. */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="group inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-amber px-6 font-semibold text-night disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? labels.sending : labels.submit}
              <Arrow className="size-5 transition-transform motion-safe:group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-sm text-muted">{labels.privacy}</p>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
