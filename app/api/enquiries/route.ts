import { NextRequest } from "next/server";
import { deliverLead, type LeadPayload } from "@/lib/lead-delivery";

const attempts = new Map<string, number[]>();
const allowedTypes = new Set(["booking", "property-listing", "contact"]);

function clean(value: unknown, max = 500) {
  return String(value ?? "").replace(/[<>\u0000-\u001f]/g, " ").trim().slice(0, max);
}

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 20_000) return Response.json({ error: "Submission is too large." }, { status: 413 });

  const now = Date.now();
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid submission." }, { status: 400 }); }
  if (clean(body.website)) return Response.json({ ok: true });
  if (!body.privacyConsent) return Response.json({ error: "Privacy consent is required." }, { status: 400 });
  if (!allowedTypes.has(clean(body.type))) return Response.json({ error: "Invalid enquiry type." }, { status: 400 });
  if (typeof body.startedAt !== "number" || now - body.startedAt < 2_500) return Response.json({ error: "Please review the form and try again." }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const recent = (attempts.get(ip) || []).filter((time) => now - time < 15 * 60_000);
  if (recent.length >= 5) return Response.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
  attempts.set(ip, [...recent, now]);

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 30);
  const subject = clean(body.subject, 180);
  if (!name || !subject || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Valid name, email and subject are required." }, { status: 400 });

  const rawDetails = body.details && typeof body.details === "object" ? body.details as Record<string, unknown> : {};
  const details = Object.fromEntries(Object.entries(rawDetails).slice(0, 30).map(([key, value]) => [clean(key, 60), clean(value, 1000)])) as Record<string, string>;
  if (body.type === "booking") {
    const checkIn = details.checkIn || "";
    const checkOut = details.checkOut || "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut) || checkOut <= checkIn) return Response.json({ error: "Valid travel dates are required." }, { status: 400 });
    details.enquiryStatus = "New";
    details.bookingValue = details.bookingValue || "";
    details.commission = details.commission || "";
    details.ravindraShare = details.ravindraShare || "";
    details.paymentStatus = details.paymentStatus || "Not started";
    details.notes = details.notes || details.specialRequirements || "";
  }
  const lead: LeadPayload = { type: clean(body.type) as LeadPayload["type"], name, email, phone, subject, details, privacyConsent: true };
  try {
    await deliverLead(lead);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Lead delivery failed", error instanceof Error ? error.message : "Unknown error");
    // The CRM is a secondary delivery channel. Do not prevent a guest from
    // continuing to WhatsApp when Google Sheets or email is temporarily down.
    return Response.json({ ok: true, deliveryPending: true }, { status: 202 });
  }
}
