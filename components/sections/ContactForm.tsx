"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { submitContactRequest, type ContactState } from "@/app/actions/contact";
import WdlButton from "@/components/ui/WdlButton";

const initialContactState: ContactState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return <WdlButton type="submit" variant="accent" disabled={pending}>{pending ? "Sending…" : "Send message"}</WdlButton>;
}

function Field({ label, name, type = "text", error, placeholder, autoComplete }: { label: string; name: string; type?: string; error?: string; placeholder?: string; autoComplete?: string; }) {
  const errorId = `${name}-error`;
  return (
    <label className="wdl-field" htmlFor={name}>
      <span>{label}</span>
      <input id={name} name={name} type={type} required autoComplete={autoComplete} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
      {error && <small id={errorId}><AlertCircle aria-hidden="true" />{error}</small>}
    </label>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(submitContactRequest, initialContactState);
  const StatusIcon = state.status === "success" ? CheckCircle2 : state.status === "not_configured" ? Info : AlertCircle;
  return (
    <form action={formAction} className="contact-form">
      <div className="sr-only" aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" placeholder="Your name" error={state.fieldErrors?.name} />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={state.fieldErrors?.email} />
      </div>
      <Field label="Subject" name="subject" placeholder="Project inquiry or opportunity" error={state.fieldErrors?.subject} />
      <label className="wdl-field" htmlFor="message">
        <span>Message</span>
        <textarea id="message" name="message" required rows={6} placeholder="Tell me what you would like to discuss." aria-invalid={Boolean(state.fieldErrors?.message)} aria-describedby={state.fieldErrors?.message ? "message-error" : undefined} />
        {state.fieldErrors?.message && <small id="message-error"><AlertCircle aria-hidden="true" />{state.fieldErrors.message}</small>}
      </label>
      <SubmitButton />
      {state.status !== "idle" && <p role="status" className={`form-status status-${state.status}`}><StatusIcon aria-hidden="true" />{state.message}</p>}
    </form>
  );
}
