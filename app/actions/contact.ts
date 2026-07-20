"use server";

import { z } from "zod";
import { getResendClient } from "@/lib/email/resend";
import { getSmtpTransport } from "@/lib/email/smtp";
import { PROFILE } from "@/lib/content/profile";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message is too short").max(4000),
});

export interface ContactState {
  status: "idle" | "success" | "error" | "not_configured";
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitContactRequest(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: a hidden field real visitors never fill. Checked before
  // validation so bots get a fake "success" without us ever touching
  // the mail-sending path.
  const honeypot = formData.get("company")?.toString().trim() ?? "";
  if (honeypot.length > 0) {
    return { status: "success", message: "Your message was sent successfully." };
  }

  const parsed = ContactSchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    subject: formData.get("subject")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const resend = getResendClient();
  const smtp = getSmtpTransport();

  if (!resend && !smtp) {
    return {
      status: "not_configured",
      message:
        "Message sending isn't wired up yet — reach out directly via the links below instead.",
    };
  }

  const { name, email, subject, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || PROFILE.email;
  const textBody = `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;

  try {
    if (resend) {
      const result = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `[Portfolio Contact] ${subject}`,
        text: textBody,
      });
      if (result.error) throw new Error(result.error.message);
    } else if (smtp) {
      await smtp.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to,
        replyTo: email,
        subject: `[Portfolio Contact] ${subject}`,
        text: textBody,
      });
    }
    return { status: "success", message: "Your message was sent successfully." };
  } catch (err) {
    console.error("[contact] send failed", err);
    return {
      status: "error",
      message: "Something went wrong sending your request. Please try again or email directly.",
    };
  }
}
