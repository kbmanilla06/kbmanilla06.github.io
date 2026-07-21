"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { submitContactRequest, type ContactState } from "@/app/actions/contact";
import WdlButton from "@/components/ui/WdlButton";
import SectionIndex from "@/components/ui/SectionIndex";

const initialContactState: ContactState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return <WdlButton type="submit" variant="accent" disabled={pending}>{pending ? "Sending…" : "Send message"}</WdlButton>;
}

/**
 * WDL Structured contact form (03-wdl-components.md §Structured contact
 * form, DR-037d): each field is prefixed by a decorative Index numeral.
 * The numeral never substitutes for the field's real, visible, persistent
 * label — it is purely a wayfinding aid alongside it.
 */
function Field({ index, label, name, type = "text", error, placeholder, autoComplete }: { index: number; label: string; name: string; type?: string; error?: string; placeholder?: string; autoComplete?: string; }) {
  const errorId = `${name}-error`;
  return (
    <div className="numbered-field">
      <SectionIndex n={index} className="wdl-index-inline" />
      <label className="wdl-field" htmlFor={name}>
        <span>{label}</span>
        <input id={name} name={name} type={type} required autoComplete={autoComplete} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
        {error && <small id={errorId}><AlertCircle aria-hidden="true" />{error}</small>}
      </label>
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(submitContactRequest, initialContactState);
  const StatusIcon = state.status === "success" ? CheckCircle2 : state.status === "not_configured" ? Info : AlertCircle;
  return (
    <form action={formAction} className="contact-form">
      <div className="sr-only" aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field index={1} label="Name" name="name" autoComplete="name" placeholder="Your name" error={state.fieldErrors?.name} />
        <Field index={2} label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={state.fieldErrors?.email} />
      </div>
      <Field index={3} label="Subject" name="subject" placeholder="Project inquiry or opportunity" error={state.fieldErrors?.subject} />
      <div className="numbered-field">
        <SectionIndex n={4} className="wdl-index-inline" />
        <label className="wdl-field" htmlFor="message">
          <span>Message</span>
          <textarea id="message" name="message" required rows={6} placeholder="Tell me what you would like to discuss." aria-invalid={Boolean(state.fieldErrors?.message)} aria-describedby={state.fieldErrors?.message ? "message-error" : undefined} />
          {state.fieldErrors?.message && <small id="message-error"><AlertCircle aria-hidden="true" />{state.fieldErrors.message}</small>}
        </label>
      </div>
      <SubmitButton />
      {state.status !== "idle" && <p role="status" className={`form-status status-${state.status}`}><StatusIcon aria-hidden="true" />{state.message}</p>}
    </form>
  );
}
