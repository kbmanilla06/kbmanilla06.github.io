"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuestRequest, type ContactState } from "@/app/actions/contact";
import GuildButton from "@/components/ui/GuildButton";
import WaxSeal from "@/components/ui/WaxSeal";

const initialContactState: ContactState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <GuildButton type="submit" variant="accent" brass disabled={pending}>
      {pending ? "Sealing…" : "Submit Request →"}
    </GuildButton>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="block" htmlFor={name}>
      <span className="mb-1.5 block text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
        {label}
      </span>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded border border-[var(--color-brass-dark)] bg-[var(--color-charcoal)] px-3 py-2.5 text-[var(--color-ivory)] placeholder:text-[var(--color-text-muted)]"
      />
      {error && <span id={errorId} className="mt-1 block text-xs text-[var(--color-error)]">{error}</span>}
    </label>
  );
}

export default function GuildReceptionForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitQuestRequest,
    initialContactState
  );

  return (
    <form action={formAction} className="leather-frame space-y-5 p-6">
      {/* Honeypot — hidden from sighted and screen-reader users, real visitors never fill it */}
      <div style={{ position: "absolute", left: "-9999px", top: "auto" }} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" placeholder="Your name" error={state.fieldErrors?.name} />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          error={state.fieldErrors?.email}
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        placeholder="Project inquiry, collaboration…"
        error={state.fieldErrors?.subject}
      />

      <label className="block" htmlFor="message">
        <span className="mb-1.5 block text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
          Message
        </span>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project…"
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className="w-full rounded border border-[var(--color-brass-dark)] bg-[var(--color-charcoal)] px-3 py-2.5 text-[var(--color-ivory)] placeholder:text-[var(--color-text-muted)]"
        />
        {state.fieldErrors?.message && (
          <span id="message-error" className="mt-1 block text-xs text-[var(--color-error)]">{state.fieldErrors.message}</span>
        )}
      </label>

      <div className="flex items-center gap-4">
        <SubmitButton />
        <WaxSeal />
      </div>

      {state.status !== "idle" && (
        <p
          role="status"
          className="text-sm"
          style={{
            color:
              state.status === "success"
                ? "var(--color-emerald)"
                : state.status === "not_configured"
                  ? "var(--color-amber)"
                  : "var(--color-error)",
          }}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
