import { Resend } from "resend";

let cachedClient: Resend | null = null;

/** Returns null (never throws) when RESEND_API_KEY isn't set. */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!cachedClient) cachedClient = new Resend(apiKey);
  return cachedClient;
}
