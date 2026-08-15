import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(21,29,40,.45)]">
    <Link href={`/stays/${property.id}`} className="relative block aspect-[4/3] overflow-hidden"><Image src={property.imageUrl} alt={`${property.title}, pet-friendly stay in ${property.location}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-500 hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white">Pets Stay Complimentary</span></Link>
    <div className="flex flex-1 flex-col p-6"><p className="text-sm font-medium text-primary">{property.location}</p><h3 className="mt-2 text-xl font-bold text-slate-900">{property.title}</h3><p className="mt-4 text-2xl font-bold text-slate-900">Starting from ₹{property.pricePerNight.toLocaleString("en-IN")}<span className="text-sm font-medium text-slate-500">/night</span></p><p className="mt-1 text-sm text-slate-600">Base: {property.baseUnit}</p><p className="mt-4 text-sm leading-6 text-slate-600">{property.capacitySummary}</p><div className="mt-4 flex flex-wrap gap-2">{["EP","CP","MAP","AP"].map((plan) => <span key={plan} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">{plan}</span>)}</div><p className="mt-4 text-sm font-semibold text-primary">No additional accommodation charge for pets.</p><a href={`/stays/${property.id}#booking`} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-4 text-center text-sm font-semibold text-white hover:bg-secondary">Check Availability &amp; Get Exact Quote</a></div>
  </article>;
}
