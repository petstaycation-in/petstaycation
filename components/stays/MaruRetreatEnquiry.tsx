"use client";
import { FormEvent, useMemo, useState } from "react";

const initial = { checkIn:"", checkOut:"", adults:"2", children:"0", stay:"Best available villa", pets:"1", petType:"Dog", breed:"", name:"", phone:"", email:"", notes:"" };

export default function MaruRetreatEnquiry({ whatsappNumber }: { whatsappNumber: string }) {
  const [form,setForm] = useState(initial);
  const [errors,setErrors] = useState<Record<string,string>>({});
  const minDate = useMemo(() => new Date().toISOString().slice(0,10), []);
  const [consent,setConsent] = useState(false);
  const [submitting,setSubmitting] = useState(false);
  const [website,setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());
  const update = (key:keyof typeof initial,value:string) => setForm(v=>({...v,[key]:value}));
  const cls = "mt-2 min-h-12 w-full rounded-xl border border-[#cfbda6] bg-white px-4 text-sm outline-none focus:border-[#8a4f3d] focus:ring-2 focus:ring-[#8a4f3d]/15";
  const field = (key:keyof typeof initial,label:string,type="text") => <label className="text-sm font-medium">{label}<input type={type} value={form[key]} min={type==="date"?minDate:undefined} onChange={e=>update(key,e.target.value)} className={cls}/>{errors[key]&&<span className="mt-1 block text-xs text-red-700">{errors[key]}</span>}</label>;

  async function submit(e:FormEvent) {
    e.preventDefault();
    const next:Record<string,string>={};
    if(!form.checkIn) next.checkIn="Select check-in.";
    if(!form.checkOut || form.checkOut<=form.checkIn) next.checkOut="Choose a check-out after check-in.";
    if(!form.name.trim()) next.name="Enter your name.";
    if(!form.phone.trim()) next.phone="Enter a phone number.";
    if(!/^\S+@\S+\.\S+$/.test(form.email)) next.email="Enter a valid email.";
    if(!consent) next.consent="Privacy consent is required.";
    if(Number(form.pets)>0 && !form.breed.trim()) next.breed="Tell us the breed or type.";
    setErrors(next);
    if(Object.keys(next).length) return;
    const message=["Hello, I would like to book Maru Retreat Farmstay through Petstaycation.","",`Check-in: ${form.checkIn}`,`Check-out: ${form.checkOut}`,`Adults: ${form.adults}`,`Children: ${form.children}`,`Stay preference: ${form.stay}`,`Pets: ${form.pets}`,`Pet type: ${form.petType}`,`Breed / type: ${form.breed}`,`Guest name: ${form.name}`,`Phone: ${form.phone}`,`Notes: ${form.notes||"None"}`].join("\n");
    setSubmitting(true);
    const response = await fetch("/api/enquiries", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ type:"booking", name:form.name, email:form.email, phone:form.phone, subject:"Booking enquiry: Maru Retreat Farmstay", details:form, privacyConsent:consent, website, startedAt }) });
    if(!response.ok){ const result=await response.json().catch(()=>null) as {error?:string}|null; setErrors({submit:result?.error||"We could not save your enquiry."}); setSubmitting(false); return; }
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
    setSubmitting(false);
  }

  return <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
    <label className="absolute -left-[10000px]" aria-hidden="true">Website<input value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
    {field("checkIn","Check-in","date")}{field("checkOut","Check-out","date")}{field("adults","Adults","number")}{field("children","Children","number")}
    <label className="text-sm font-medium">Stay preference<select value={form.stay} onChange={e=>update("stay",e.target.value)} className={cls}><option>Best available villa</option><option>One private villa</option><option>Both villas</option></select></label>{field("pets","Number of pets","number")}
    <label className="text-sm font-medium">Pet type<select value={form.petType} onChange={e=>update("petType",e.target.value)} className={cls}><option>Dog</option><option>Cat</option><option>Other companion animal</option></select></label>{field("breed","Breed / type")}{field("name","Guest name")}{field("phone","Phone","tel")}{field("email","Email","email")}
    <label className="text-sm font-medium sm:col-span-2">Anything else?<textarea value={form.notes} onChange={e=>update("notes",e.target.value)} className={`${cls} min-h-28 py-3`} /></label>
    <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 h-4 w-4" /><span>I agree to the <a href="/privacy" className="underline">Privacy Policy</a> and allow this enquiry to be stored and sent by email, Google Sheets and WhatsApp.</span></label>{errors.consent&&<span className="text-xs text-red-700 sm:col-span-2">{errors.consent}</span>}{errors.submit&&<span role="alert" className="text-xs text-red-700 sm:col-span-2">{errors.submit}</span>}
    <button disabled={submitting} className="min-h-12 rounded-full bg-[#8a4f3d] px-6 font-semibold text-white hover:bg-[#713e30] disabled:opacity-60 sm:col-span-2">{submitting?"Saving enquiry…":"Send direct availability enquiry"}</button>
  </form>;
}
