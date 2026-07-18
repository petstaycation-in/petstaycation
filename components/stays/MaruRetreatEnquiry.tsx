"use client";
import { FormEvent, useMemo, useState } from "react";

const initial = { checkIn:"", checkOut:"", adults:"2", children:"0", stay:"Best available villa", pets:"1", petType:"Dog", breed:"", name:"", phone:"", notes:"" };

export default function MaruRetreatEnquiry({ whatsappNumber }: { whatsappNumber: string }) {
  const [form,setForm] = useState(initial);
  const [errors,setErrors] = useState<Record<string,string>>({});
  const minDate = useMemo(() => new Date().toISOString().slice(0,10), []);
  const update = (key:keyof typeof initial,value:string) => setForm(v=>({...v,[key]:value}));
  const cls = "mt-2 min-h-12 w-full rounded-xl border border-[#cfbda6] bg-white px-4 text-sm outline-none focus:border-[#8a4f3d] focus:ring-2 focus:ring-[#8a4f3d]/15";
  const field = (key:keyof typeof initial,label:string,type="text") => <label className="text-sm font-medium">{label}<input type={type} value={form[key]} min={type==="date"?minDate:undefined} onChange={e=>update(key,e.target.value)} className={cls}/>{errors[key]&&<span className="mt-1 block text-xs text-red-700">{errors[key]}</span>}</label>;

  function submit(e:FormEvent) {
    e.preventDefault();
    const next:Record<string,string>={};
    if(!form.checkIn) next.checkIn="Select check-in.";
    if(!form.checkOut || form.checkOut<=form.checkIn) next.checkOut="Choose a check-out after check-in.";
    if(!form.name.trim()) next.name="Enter your name.";
    if(!form.phone.trim()) next.phone="Enter a phone number.";
    if(Number(form.pets)>0 && !form.breed.trim()) next.breed="Tell us the breed or type.";
    setErrors(next);
    if(Object.keys(next).length) return;
    const message=["Hello, I would like to book Maru Retreat Farmstay through Petstaycation.","",`Check-in: ${form.checkIn}`,`Check-out: ${form.checkOut}`,`Adults: ${form.adults}`,`Children: ${form.children}`,`Stay preference: ${form.stay}`,`Pets: ${form.pets}`,`Pet type: ${form.petType}`,`Breed / type: ${form.breed}`,`Guest name: ${form.name}`,`Phone: ${form.phone}`,`Notes: ${form.notes||"None"}`].join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
  }

  return <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
    {field("checkIn","Check-in","date")}{field("checkOut","Check-out","date")}{field("adults","Adults","number")}{field("children","Children","number")}
    <label className="text-sm font-medium">Stay preference<select value={form.stay} onChange={e=>update("stay",e.target.value)} className={cls}><option>Best available villa</option><option>One private villa</option><option>Both villas</option></select></label>{field("pets","Number of pets","number")}
    <label className="text-sm font-medium">Pet type<select value={form.petType} onChange={e=>update("petType",e.target.value)} className={cls}><option>Dog</option><option>Cat</option><option>Other companion animal</option></select></label>{field("breed","Breed / type")}{field("name","Guest name")}{field("phone","Phone","tel")}
    <label className="text-sm font-medium sm:col-span-2">Anything else?<textarea value={form.notes} onChange={e=>update("notes",e.target.value)} className={`${cls} min-h-28 py-3`} /></label>
    <button className="min-h-12 rounded-full bg-[#8a4f3d] px-6 font-semibold text-white hover:bg-[#713e30] sm:col-span-2">Send direct availability enquiry</button>
  </form>;
}
