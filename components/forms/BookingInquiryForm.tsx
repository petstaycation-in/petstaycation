"use client";

import { FormEvent, useMemo, useState } from "react";
import { getProperty, mealPlans, properties } from "@/data/properties";

type Props = { stayTitle?: string };
type State = { property: string; checkIn: string; checkOut: string; adults: string; children: string; pets: string; petType: string; breed: string; bookingUnit: string; mealPlan: string; guestName: string; phone: string; email: string; notes: string };

export default function BookingInquiryForm({ stayTitle = properties[0].title }: Props) {
  const initialProperty = getProperty(stayTitle) ?? properties[0];
  const [form, setForm] = useState<State>({ property: initialProperty.title, checkIn: "", checkOut: "", adults: "2", children: "0", pets: "1", petType: "Dog", breed: "", bookingUnit: initialProperty.bookingUnits[0].name, mealPlan: "EP", guestName: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false); const [submitting, setSubmitting] = useState(false); const [success, setSuccess] = useState(false);
  const [website, setWebsite] = useState(""); const [startedAt] = useState(() => Date.now());
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const selected = getProperty(form.property) ?? properties[0];
  const unit = selected.bookingUnits.find((item) => item.name === form.bookingUnit) ?? selected.bookingUnits[0];
  const set = (key: keyof State, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const cls = "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15";
  const error = (key: string) => errors[key] ? <span role="alert" className="mt-1 block text-xs text-red-700">{errors[key]}</span> : null;

  function changeProperty(value: string) { const property = getProperty(value) ?? properties[0]; setForm((current) => ({ ...current, property: property.title, bookingUnit: property.bookingUnits[0].name, adults: "2", children: "0" })); }
  async function submit(event: FormEvent) {
    event.preventDefault(); const next: Record<string, string> = {}; const guests = Number(form.adults) + Number(form.children);
    if (!form.checkIn || form.checkIn < minDate) next.checkIn = "Choose today or a future date.";
    if (!form.checkOut || form.checkOut <= form.checkIn) next.checkOut = "Check-out must be after check-in.";
    if (Number(form.adults) < 1) next.adults = "At least one adult is required.";
    if (guests > unit.maxGuests) next.adults = `${form.bookingUnit} accommodates up to ${unit.maxGuests} guests.`;
    if (Number(form.pets) < 0) next.pets = "Number of pets cannot be negative.";
    if (Number(form.pets) > 0 && (!form.petType || !form.breed.trim())) next.breed = "Add the pet type and breed/type.";
    if (!form.guestName.trim()) next.guestName = "Enter your name."; if (!form.phone.trim()) next.phone = "Enter your phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email."; if (!consent) next.consent = "Privacy consent is required.";
    setErrors(next); if (Object.keys(next).length) return;
    const message = ["Petstaycation booking enquiry", `Property: ${form.property}`, `Booking Unit: ${form.bookingUnit}`, `Meal Plan: ${form.mealPlan}`, `Check-in: ${form.checkIn}`, `Check-out: ${form.checkOut}`, `Adults: ${form.adults}`, `Children: ${form.children}`, `Pets: ${form.pets}`, `Pet type: ${form.petType || "None"}`, `Breed/type: ${form.breed || "None"}`, `Guest: ${form.guestName}`, `Phone: ${form.phone}`, `Email: ${form.email}`, `Notes: ${form.notes || "None"}`].join("\n");
    setSubmitting(true); setSuccess(false);
    try { const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "booking", name: form.guestName, email: form.email, phone: form.phone, subject: `Booking enquiry: ${form.property}`, details: { ...form, selectedProperty: form.property, numberOfPets: form.pets, petBreedType: form.breed, specialRequirements: form.notes }, privacyConsent: consent, website, startedAt }) }); if (!response.ok) { const result = await response.json().catch(() => null) as { error?: string } | null; throw new Error(result?.error || "We could not save your enquiry."); }
      window.dispatchEvent(new CustomEvent("petstaycation:analytics", { detail: { event: "enquiry_form_submit", property: selected.id } })); window.open(`https://wa.me/919649088717?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer"); setSuccess(true);
    } catch (caught) { setErrors({ submit: caught instanceof Error ? caught.message : "We could not connect. Please try again." }); } finally { setSubmitting(false); }
  }

  return <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
    <label className="absolute -left-[10000px]" aria-hidden="true">Website<input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
    <label className="text-sm font-medium sm:col-span-2">Property<select value={form.property} onChange={(e) => changeProperty(e.target.value)} className={cls}>{properties.map((property) => <option key={property.id}>{property.title}</option>)}</select></label>
    <label className="text-sm font-medium">Check-in date<input type="date" min={minDate} value={form.checkIn} onChange={(e) => { set("checkIn", e.target.value); if (form.checkOut && form.checkOut <= e.target.value) set("checkOut", ""); }} className={cls} />{error("checkIn")}</label>
    <label className="text-sm font-medium">Check-out date<input type="date" min={form.checkIn ? new Date(new Date(`${form.checkIn}T00:00:00`).getTime() + 86400000).toISOString().slice(0,10) : minDate} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} className={cls} />{error("checkOut")}</label>
    <label className="text-sm font-medium">Booking unit<select value={form.bookingUnit} onChange={(e) => set("bookingUnit", e.target.value)} className={cls}>{selected.bookingUnits.map((item) => <option key={item.name} value={item.name}>{item.name} — {item.capacity}</option>)}</select></label>
    <label className="text-sm font-medium">Meal plan<select value={form.mealPlan} onChange={(e) => set("mealPlan", e.target.value)} className={cls}>{mealPlans.map((plan) => <option key={plan.code} value={plan.code}>{plan.code} — {plan.label}</option>)}</select></label>
    {([["adults","Adults",1],["children","Children",0],["pets","Number of pets",0]] as const).map(([key,label,min]) => <label key={key} className="text-sm font-medium">{label}<input type="number" min={min} max={key === "pets" ? 12 : unit.maxGuests} value={form[key]} onChange={(e) => set(key,e.target.value)} className={cls} />{error(key)}</label>)}
    <label className="text-sm font-medium">Pet type<select value={form.petType} onChange={(e) => set("petType",e.target.value)} className={cls}><option>Dog</option><option>Cat</option><option>Other companion animal</option><option value="">No pets</option></select></label>
    <label className="text-sm font-medium">Breed/type<input value={form.breed} onChange={(e) => set("breed",e.target.value)} className={cls} />{error("breed")}</label>
    <label className="text-sm font-medium">Guest name<input value={form.guestName} onChange={(e) => set("guestName",e.target.value)} autoComplete="name" className={cls} />{error("guestName")}</label>
    <label className="text-sm font-medium">Phone<input type="tel" value={form.phone} onChange={(e) => set("phone",e.target.value)} autoComplete="tel" className={cls} />{error("phone")}</label>
    <label className="text-sm font-medium">Email<input type="email" value={form.email} onChange={(e) => set("email",e.target.value)} autoComplete="email" className={cls} />{error("email")}</label>
    <label className="text-sm font-medium sm:col-span-2">Special requirements/notes<textarea value={form.notes} onChange={(e) => set("notes",e.target.value)} rows={4} className={`${cls} py-3`} /></label>
    <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary" /><span>I agree to the <a href="/privacy" className="font-semibold text-primary underline">Privacy Policy</a> and allow my enquiry to be stored and sent through Google Sheets and WhatsApp.</span></label>{error("consent")}{error("submit")}
    <button type="submit" disabled={submitting} className="min-h-12 rounded-full bg-primary px-6 font-semibold text-white transition hover:bg-secondary disabled:opacity-60 sm:col-span-2">{submitting ? "Sending enquiry…" : "Check Availability & Get Exact Quote"}</button>
    {success && <div role="status" className="rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900 sm:col-span-2"><strong>Thank you! Your booking enquiry has been received. Our team will check availability and share the exact tariff shortly.</strong><br />Pets stay complimentary—there is no additional pet accommodation charge.</div>}
  </form>;
}
