"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  checkIn: string; checkOut: string; adults: string; children: string; rooms: string;
  pets: string; petType: string; breed: string; weight: string; petAge: string;
  vaccinated: string; requirements: string; phone: string; email: string; contact: string;
  name: string;
};

const initial: FormState = { checkIn: "", checkOut: "", adults: "2", children: "0", rooms: "1", pets: "1", petType: "Dog", breed: "", weight: "", petAge: "", vaccinated: "", requirements: "", phone: "", email: "", contact: "WhatsApp", name: "" };

function ErrorText({ field, errors }: { field: string; errors: Record<string, string> }) {
  return errors[field] ? <p id={`${field}-error`} className="mt-1 text-xs text-red-700">{errors[field]}</p> : null;
}

function track(event: string, detail?: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent("petstaycation:analytics", { detail: { event, ...detail } }));
}

export default function RedStoneFortEnquiry({ whatsappNumber }: { whatsappNumber: string }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());

  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.checkIn) nextErrors.checkIn = "Select a check-in date.";
    if (!form.checkOut) nextErrors.checkOut = "Select a check-out date.";
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) nextErrors.checkOut = "Check-out must be after check-in.";
    if (!form.phone.trim()) nextErrors.phone = "Enter a phone number.";
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (Number(form.pets) > 0 && !form.breed.trim()) nextErrors.breed = "Tell us the pet breed or type.";
    if (!consent) nextErrors.consent = "Privacy consent is required.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { track("enquiry_form_error", { fields: Object.keys(nextErrors) }); return; }

    const message = [
      "Hello, I would like to enquire about The Red Stone Fort.", "",
      `Check-in: ${form.checkIn}`, `Check-out: ${form.checkOut}`,
      `Adults: ${form.adults}`, `Children: ${form.children}`, `Rooms: ${form.rooms}`,
      `Number of pets: ${form.pets}`, `Pet type/breed: ${form.petType} / ${form.breed}`,
      `Approximate pet weight: ${form.weight || "Not provided"}`, `Pet age: ${form.petAge || "Not provided"}`,
      `Vaccination status: ${form.vaccinated || "Not provided"}`, `Special requirements: ${form.requirements || "None"}`,
      `Guest phone: ${form.phone}`, `Guest email: ${form.email}`, `Preferred contact: ${form.contact}`,
    ].join("\n");
    track("enquiry_form_submit", { property: "the-red-stone-fort" });
    setSubmitting(true);
    const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "booking", name: form.name, email: form.email, phone: form.phone, subject: "Booking enquiry: The Red Stone Fort", details: form, privacyConsent: consent, website, startedAt }) });
    if (!response.ok) { const result = await response.json().catch(() => null) as { error?: string } | null; setErrors({ submit: result?.error || "We could not save your enquiry." }); setSubmitting(false); return; }
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitting(false);
  }

  const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-[#cdbba9] bg-white/80 px-4 text-sm text-[#342821] outline-none transition focus:border-[#8f4d30] focus:ring-2 focus:ring-[#8f4d30]/15";
  return (
    <form onSubmit={submit} onFocus={() => track("enquiry_form_start")} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="absolute -left-[10000px]" aria-hidden="true">Website<input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
      <label className="text-sm font-medium">Check-in<input type="date" min={minDate} value={form.checkIn} onChange={(e) => update("checkIn", e.target.value)} className={fieldClass} aria-invalid={!!errors.checkIn} aria-describedby={errors.checkIn ? "checkIn-error" : undefined} /><ErrorText field="checkIn" errors={errors} /></label>
      <label className="text-sm font-medium">Check-out<input type="date" min={form.checkIn || minDate} value={form.checkOut} onChange={(e) => update("checkOut", e.target.value)} className={fieldClass} aria-invalid={!!errors.checkOut} aria-describedby={errors.checkOut ? "checkOut-error" : undefined} /><ErrorText field="checkOut" errors={errors} /></label>
      {[["adults","Adults"],["children","Children"],["rooms","Rooms"],["pets","Number of pets"]].map(([field,label]) => <label key={field} className="text-sm font-medium">{label}<input type="number" min={field === "adults" || field === "rooms" ? 1 : 0} max={field === "rooms" ? 4 : 12} value={form[field as keyof FormState]} onChange={(e) => update(field as keyof FormState,e.target.value)} className={fieldClass} /></label>)}
      <label className="text-sm font-medium">Pet type<select value={form.petType} onChange={(e) => update("petType",e.target.value)} className={fieldClass}><option>Dog</option><option>Cat</option><option>Other</option></select></label>
      <label className="text-sm font-medium">Breed<input value={form.breed} onChange={(e) => update("breed",e.target.value)} className={fieldClass} aria-invalid={!!errors.breed} aria-describedby={errors.breed ? "breed-error" : undefined} /><ErrorText field="breed" errors={errors} /></label>
      <label className="text-sm font-medium">Approximate weight<input value={form.weight} onChange={(e) => update("weight",e.target.value)} placeholder="e.g. 18 kg" className={fieldClass} /></label>
      <label className="text-sm font-medium">Pet age<input value={form.petAge} onChange={(e) => update("petAge",e.target.value)} placeholder="e.g. 4 years" className={fieldClass} /></label>
      <label className="text-sm font-medium">Vaccination status<select value={form.vaccinated} onChange={(e) => update("vaccinated",e.target.value)} className={fieldClass}><option value="">Select</option><option>Up to date</option><option>Partially vaccinated</option><option>To be discussed</option></select></label>
      <label className="text-sm font-medium">Preferred contact<select value={form.contact} onChange={(e) => update("contact",e.target.value)} className={fieldClass}><option>WhatsApp</option><option>Phone</option><option>Email</option></select></label>
      <label className="text-sm font-medium">Guest name<input value={form.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} /><ErrorText field="name" errors={errors} /></label>
      <label className="text-sm font-medium">Phone number<input type="tel" value={form.phone} onChange={(e) => update("phone",e.target.value)} className={fieldClass} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} /><ErrorText field="phone" errors={errors} /></label>
      <label className="text-sm font-medium">Email<input type="email" value={form.email} onChange={(e) => update("email",e.target.value)} className={fieldClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} /><ErrorText field="email" errors={errors} /></label>
      <label className="text-sm font-medium sm:col-span-2">Special requirements<textarea value={form.requirements} onChange={(e) => update("requirements",e.target.value)} rows={4} className={`${fieldClass} py-3`} /></label>
      <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4" /><span>I agree to the <a href="/privacy" className="underline">Privacy Policy</a> and allow this enquiry to be stored and sent by email, Google Sheets and WhatsApp.</span></label>
      <div className="sm:col-span-2"><ErrorText field="consent" errors={errors} /><ErrorText field="submit" errors={errors} /></div>
      <button type="submit" disabled={submitting} className="min-h-12 rounded-full bg-[#7c3f28] px-6 font-semibold text-white transition hover:bg-[#66321f] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c3f28] sm:col-span-2">{submitting ? "Saving enquiry…" : "Send availability enquiry on WhatsApp"}</button>
    </form>
  );
}
