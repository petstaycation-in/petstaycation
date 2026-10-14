"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { getProperty, mealPlans, properties } from "@/data/properties";
import {
  addDateOnlyDays,
  calculateStayEstimate,
  getMaruBookingUnitCode,
  isMealPlanCode,
  parseDateOnly,
  type StayEstimate,
} from "@/lib/pricing/maruRetreatPricing";

type Props = { stayTitle?: string };
type State = { property: string; checkIn: string; checkOut: string; adults: string; children: string; pets: string; petType: string; breed: string; bookingUnit: string; mealPlan: string; guestName: string; phone: string; email: string; budget: string; source: string; notes: string };

const inr = (value: number) => `₹${value.toLocaleString("en-IN")}`;

type AutomatedEstimate = StayEstimate & { accommodationSubtotal: number; extraAdultSubtotal: number; mealPlanSubtotal: number; estimatedTotal: number };

function hasAutomatedEstimate(estimate: StayEstimate | null): estimate is AutomatedEstimate {
  return Boolean(estimate && estimate.accommodationSubtotal !== null && estimate.extraAdultSubtotal !== null && estimate.mealPlanSubtotal !== null && estimate.estimatedTotal !== null);
}

function todayDateOnly() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function formatDisplayDate(value: string) {
  const { year, month, day } = parseDateOnly(value);
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

function EstimateCard({ estimate, childrenCount }: { estimate: StayEstimate; childrenCount: number }) {
  if (estimate.estimatedTotal === null) {
    return <div className="rounded-[1.5rem] border border-[#d4a373]/40 bg-[#fbf6ee] p-5 sm:col-span-2"><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Group enquiry</p><p className="mt-2 text-xl font-semibold text-slate-900">Custom quote required for 7–8 guests.</p><p className="mt-2 text-sm leading-6 text-slate-600">Share your dates and group details and Petstaycation will prepare a tailored tariff.</p>{childrenCount > 0 && <p className="mt-2 text-xs leading-5 text-slate-600">Child tariff, if applicable, will be confirmed based on age and extra-bed requirements.</p>}</div>;
  }

  return <div className="overflow-hidden rounded-[1.5rem] border border-[#d4a373]/40 bg-[linear-gradient(145deg,#fffdf8,#f7eee1)] shadow-[0_20px_50px_-35px_rgba(15,76,92,.5)] sm:col-span-2">
    <div className="border-b border-[#d4a373]/25 p-5 sm:flex sm:items-end sm:justify-between">
      <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Estimated stay tariff</p><p className="mt-2 text-lg font-semibold text-slate-900">{formatDisplayDate(estimate.nightlyBreakdown[0]?.date ?? "")} – {formatDisplayDate(addDateOnlyDays(estimate.nightlyBreakdown.at(-1)?.date ?? "", 1))}</p><p className="mt-1 text-sm text-slate-600">{estimate.nights} night{estimate.nights === 1 ? "" : "s"}</p></div>
      {estimate.containsSpecialRate && <div className="mt-3 rounded-full bg-[#d4a373]/20 px-3 py-2 text-xs font-semibold text-amber-950 sm:mt-0">Special date pricing applies{estimate.eventNames.length ? ` · ${estimate.eventNames.join(", ")}` : ""}</div>}
    </div>
    <dl className="grid gap-3 p-5 text-sm">
      <div className="flex justify-between gap-4"><dt className="text-slate-600">Accommodation</dt><dd className="font-semibold text-slate-900">{inr(estimate.accommodationSubtotal ?? 0)}</dd></div>
      <div className="flex justify-between gap-4"><dt className="text-slate-600">Meal plan — {estimate.mealPlan}</dt><dd className="font-semibold text-slate-900">{inr(estimate.mealPlanSubtotal ?? 0)}</dd></div>
      <div className="flex justify-between gap-4"><dt className="text-slate-600">Extra guest</dt><dd className="font-semibold text-slate-900">{inr(estimate.extraAdultSubtotal ?? 0)}</dd></div>
      <div className="mt-1 flex justify-between gap-4 border-t border-[#d4a373]/25 pt-4 text-lg"><dt className="font-semibold text-slate-900">Estimated total</dt><dd className="font-bold text-primary">{inr(estimate.estimatedTotal)}</dd></div>
    </dl>
    <div className="space-y-2 bg-white/65 px-5 py-4 text-xs leading-5 text-slate-600"><p className="font-semibold text-primary">Pets stay complimentary.</p><p>Final availability and tariff will be reconfirmed by Petstaycation before payment.</p>{childrenCount > 0 && <p>Child tariff, if applicable, will be confirmed based on age and extra-bed requirements.</p>}</div>
  </div>;
}

export default function BookingInquiryForm({ stayTitle = properties[0].title }: Props) {
  const initialProperty = getProperty(stayTitle) ?? properties[0];
  const [form, setForm] = useState<State>({ property: initialProperty.title, checkIn: "", checkOut: "", adults: "2", children: "0", pets: "1", petType: "Dog", breed: "", bookingUnit: initialProperty.bookingUnits[0].name, mealPlan: "EP", guestName: "", phone: "", email: "", budget: "", source: "Website", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false); const [submitting, setSubmitting] = useState(false); const [success, setSuccess] = useState(false);
  const [website, setWebsite] = useState(""); const [startedAt] = useState(() => Date.now());
  const submissionInFlight = useRef(false); const conversionFired = useRef(false);
  const minDate = useMemo(() => todayDateOnly(), []);
  const selected = getProperty(form.property) ?? properties[0];
  const unit = selected.bookingUnits.find((item) => item.name === form.bookingUnit) ?? selected.bookingUnits[0];
  const hasMaruPricing = selected.pricingModel === "maru-date-based";
  const set = (key: keyof State, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const cls = "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15";
  const error = (key: string) => errors[key] ? <span role="alert" className="mt-1 block text-xs text-red-700">{errors[key]}</span> : null;

  const estimate = (() => {
    if (!hasMaruPricing || !form.checkIn || !form.checkOut || form.checkOut <= form.checkIn) return null;
    const bookingUnit = unit.code ?? getMaruBookingUnitCode(unit.name);
    if (!bookingUnit || !isMealPlanCode(form.mealPlan)) return null;
    try { return calculateStayEstimate({ checkIn: form.checkIn, checkOut: form.checkOut, bookingUnit, adults: Number(form.adults), children: Number(form.children), mealPlan: form.mealPlan }); } catch { return null; }
  })();

  function changeProperty(value: string) { const property = getProperty(value) ?? properties[0]; setForm((current) => ({ ...current, property: property.title, bookingUnit: property.bookingUnits[0].name, adults: "2", children: "0", pets: Number(current.pets) > 6 && property.pricingModel === "maru-date-based" ? "6" : current.pets })); }

  async function submit(event: FormEvent) {
    event.preventDefault(); if (submissionInFlight.current) return;
    const next: Record<string, string> = {}; const guests = Number(form.adults) + Number(form.children);
    if (!form.checkIn || form.checkIn < minDate) next.checkIn = "Choose today or a future date.";
    if (!form.checkOut || form.checkOut <= form.checkIn) next.checkOut = "Check-out must be after check-in.";
    if (Number(form.adults) < 1) next.adults = "At least one adult is required.";
    if (guests > unit.maxGuests) next.adults = `${form.bookingUnit} accommodates up to ${unit.maxGuests} guests.`;
    if (unit.code === "GROUP_ENQUIRY" && guests < 7) next.adults = "Group Enquiry is for 7–8 guests.";
    if (Number(form.pets) < 0) next.pets = "Number of pets cannot be negative.";
    if (hasMaruPricing && Number(form.pets) > 6) next.pets = "Maru Retreat Farmstay accepts up to 6 pets per enquiry.";
    if (Number(form.pets) > 0 && (!form.petType || !form.breed.trim())) next.breed = "Add the pet type and breed/type.";
    if (estimate && !estimate.minimumStaySatisfied) next.minimumStay = `A minimum stay of ${estimate.minimumStayRequired} nights applies for these dates.`;
    if (!form.guestName.trim()) next.guestName = "Enter your name."; if (!form.phone.trim()) next.phone = "Enter your phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email."; if (!consent) next.consent = "Privacy consent is required.";
    setErrors(next); if (Object.keys(next).length) return;

    const automatedEstimate = hasAutomatedEstimate(estimate) ? estimate : null;
    const estimateLines = automatedEstimate ? [
      `Estimated tariff: INR ${automatedEstimate.estimatedTotal.toLocaleString("en-IN")}`,
      `Number of nights: ${automatedEstimate.nights}`,
      `Accommodation subtotal: INR ${automatedEstimate.accommodationSubtotal.toLocaleString("en-IN")}`,
      `Extra-adult subtotal: INR ${automatedEstimate.extraAdultSubtotal.toLocaleString("en-IN")}`,
      `Meal-plan subtotal: INR ${automatedEstimate.mealPlanSubtotal.toLocaleString("en-IN")}`,
      `Estimated total: INR ${automatedEstimate.estimatedTotal.toLocaleString("en-IN")}`,
      ...(automatedEstimate.eventNames.length ? [`Special rate/event: ${automatedEstimate.eventNames.join(", ")}`] : []),
    ] : estimate ? ["Estimated tariff: Custom quote required for 7–8 guests.", `Number of nights: ${estimate.nights}`] : [];
    const message = ["Petstaycation booking enquiry", `Property: ${form.property}`, `Booking Unit: ${form.bookingUnit}`, `Meal Plan: ${form.mealPlan}`, `Check-in: ${form.checkIn}`, `Check-out: ${form.checkOut}`, `Adults: ${form.adults}`, `Children: ${form.children}`, `Pets: ${form.pets}`, `Pet type: ${form.petType || "None"}`, `Breed/type: ${form.breed || "None"}`, ...estimateLines, `Budget: ${form.budget || "Not specified"}`, `Guest: ${form.guestName}`, `Phone: ${form.phone}`, `Email: ${form.email}`, `Notes: ${form.notes || "None"}`].join("\n");
    const estimateDetails = automatedEstimate ? { estimatedTariff: `INR ${automatedEstimate.estimatedTotal}`, numberOfNights: String(automatedEstimate.nights), accommodationSubtotal: String(automatedEstimate.accommodationSubtotal), extraAdultSubtotal: String(automatedEstimate.extraAdultSubtotal), mealPlanSubtotal: String(automatedEstimate.mealPlanSubtotal), estimatedTotal: String(automatedEstimate.estimatedTotal), specialRateEvent: automatedEstimate.eventNames.join(", ") } : estimate ? { estimatedTariff: "Custom quote required for 7–8 guests", numberOfNights: String(estimate.nights) } : {};

    submissionInFlight.current = true; conversionFired.current = false; setSubmitting(true); setSuccess(false);
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "booking", name: form.guestName, email: form.email, phone: form.phone, subject: `Booking enquiry: ${form.property}`, details: { ...form, selectedProperty: form.property, numberOfPets: form.pets, petBreedType: form.breed, specialRequirements: form.notes, ...estimateDetails }, privacyConsent: consent, website, startedAt }) });
      if (!response.ok) { const result = await response.json().catch(() => null) as { error?: string } | null; throw new Error(result?.error || "We could not save your enquiry."); }
      if (!conversionFired.current) { conversionFired.current = true; const eventParameters = { form_name: "booking_enquiry", property_public_name: form.property, booking_unit: form.bookingUnit, meal_plan: form.mealPlan, lead_source: "website", ...(automatedEstimate ? { estimated_value: automatedEstimate.estimatedTotal, number_of_nights: automatedEstimate.nights } : {}) }; sendGTMEvent({ event: "form_submit", ...eventParameters }); sendGTMEvent({ event: "generate_lead", ...eventParameters }); }
      window.open(`https://wa.me/919649088717?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer"); setSuccess(true);
    } catch (caught) { setErrors({ submit: caught instanceof Error ? caught.message : "We could not connect. Please try again." }); } finally { submissionInFlight.current = false; setSubmitting(false); }
  }

  return <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
    <label className="absolute -left-[10000px]" aria-hidden="true">Website<input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
    <label className="text-sm font-medium sm:col-span-2">Property<select value={form.property} onChange={(e) => changeProperty(e.target.value)} className={cls}>{properties.map((property) => <option key={property.id}>{property.title}</option>)}</select></label>
    <label className="text-sm font-medium">Check-in date<input type="date" min={minDate} value={form.checkIn} onChange={(e) => { set("checkIn", e.target.value); if (form.checkOut && form.checkOut <= e.target.value) set("checkOut", ""); }} className={cls} />{error("checkIn")}</label>
    <label className="text-sm font-medium">Check-out date<input type="date" min={form.checkIn ? addDateOnlyDays(form.checkIn, 1) : minDate} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} className={cls} />{error("checkOut")}</label>
    <label className="text-sm font-medium">Booking unit<select value={form.bookingUnit} onChange={(e) => set("bookingUnit", e.target.value)} className={cls}>{selected.bookingUnits.map((item) => <option key={item.name} value={item.name}>{item.name} — {item.capacity}</option>)}</select></label>
    <label className="text-sm font-medium">Meal plan<select value={form.mealPlan} onChange={(e) => set("mealPlan", e.target.value)} className={cls}>{mealPlans.map((plan) => <option key={plan.code} value={plan.code}>{plan.code} — {plan.label}</option>)}</select></label>
    {([ ["adults", "Adults", 1], ["children", "Children", 0], ["pets", "Number of pets", 0] ] as const).map(([key, label, min]) => <label key={key} className="text-sm font-medium">{label}<input type="number" min={min} max={key === "pets" ? (hasMaruPricing ? 6 : 12) : unit.maxGuests} value={form[key]} onChange={(e) => set(key, e.target.value)} className={cls} />{error(key)}</label>)}
    {hasMaruPricing && estimate && <EstimateCard estimate={estimate} childrenCount={Number(form.children)} />}
    {estimate && !estimate.minimumStaySatisfied && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 sm:col-span-2">A minimum stay of {estimate.minimumStayRequired} nights applies for these dates.</div>}
    <label className="text-sm font-medium">Pet type<select value={form.petType} onChange={(e) => set("petType", e.target.value)} className={cls}><option>Dog</option><option>Cat</option><option>Other companion animal</option><option value="">No pets</option></select></label>
    <label className="text-sm font-medium">Breed/type<input value={form.breed} onChange={(e) => set("breed", e.target.value)} className={cls} />{error("breed")}</label>
    <label className="text-sm font-medium">Guest name<input value={form.guestName} onChange={(e) => set("guestName", e.target.value)} autoComplete="name" className={cls} />{error("guestName")}</label>
    <label className="text-sm font-medium">Phone<input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={cls} />{error("phone")}</label>
    <label className="text-sm font-medium">Email<input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={cls} />{error("email")}</label>
    <label className="text-sm font-medium">Budget (optional)<input value={form.budget} onChange={(e) => set("budget", e.target.value)} placeholder="For example, INR 10,000" className={cls} /></label>
    <label className="text-sm font-medium">How did you find us?<select value={form.source} onChange={(e) => set("source", e.target.value)} className={cls}><option>Website</option><option>WhatsApp</option><option>Instagram</option><option>Referral</option><option>Other</option></select></label>
    <label className="text-sm font-medium sm:col-span-2">Special requirements/notes<textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={4} className={`${cls} py-3`} /></label>
    <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary" /><span>I agree to the <a href="/privacy" className="font-semibold text-primary underline">Privacy Policy</a> and allow my enquiry to be stored and sent through Google Sheets and WhatsApp.</span></label>{error("consent")}{error("submit")}
    <button type="submit" disabled={submitting || Boolean(estimate && !estimate.minimumStaySatisfied)} className="min-h-12 rounded-full bg-primary px-6 font-semibold text-white transition hover:bg-secondary disabled:opacity-60 sm:col-span-2">{submitting ? "Sending enquiry…" : "Check Availability & Get Exact Quote"}</button>
    {success && <div role="status" className="rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900 sm:col-span-2"><strong>Thank you! Your booking enquiry has been received. Our team will check availability and share the exact tariff shortly.</strong><br />Pets stay complimentary—there is no additional pet accommodation charge.</div>}
  </form>;
}
