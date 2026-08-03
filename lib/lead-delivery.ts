import "server-only";

export type LeadPayload = {
  type: "booking" | "property-listing" | "contact";
  name: string;
  email: string;
  phone?: string;
  subject: string;
  details: Record<string, string | number>;
  privacyConsent: boolean;
  website?: string;
  startedAt?: number;
};

export async function deliverLead(lead: LeadPayload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) throw new Error("Lead delivery is not configured.");

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, secret: webhookSecret, receivedAt: new Date().toISOString() }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("The enquiry service did not accept this submission.");
  const result = await response.json().catch(() => null) as { ok?: boolean } | null;
  if (!result?.ok) throw new Error("The enquiry service could not store this submission.");
}
