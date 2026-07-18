import type { FC } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface PropertyCardProps { property: { id: number; title: string; location: string; pricePerNight: number; rating: number; guestCount: number; bedroomCount: number; bathroomCount: number; amenities: string[]; imageUrl: string; description: string; }; }

const PropertyCard: FC<{ property: PropertyCardProps["property"] }> = ({ property }) => {
  const ratingFill = Math.floor(property.rating);
  const hasHalfStar = property.rating % 1 >= 0.5;
  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_-35px_rgba(21,29,40,0.5)]">
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
        <Image src={property.imageUrl} alt={property.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-700 ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/5 to-transparent" />
        <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white shadow-md">Pet-friendly</div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{property.pricePerNight > 0 ? "From" : "Direct enquiry"}</p><p className="mt-1 text-xl font-bold text-white sm:text-2xl">{property.pricePerNight > 0 ? <>₹{property.pricePerNight}<span className="text-sm font-normal text-white/80">/night</span></> : "Tariff on request"}</p></div><a href={`/stays/${property.id}`} className="shrink-0 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-900 shadow-lg transition hover:bg-white">Explore</a></div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-tight text-slate-900">{property.title}</h3><p className="mt-2 text-sm font-medium text-slate-500">📍 {property.location}</p>
        {property.rating > 0 && <div className="mt-5 flex items-center gap-3"><div className="flex items-center gap-1">{[1,2,3,4,5].map((star) => <span key={star} className="text-sm text-primary">{star <= ratingFill ? "★" : star === ratingFill + 0.5 && hasHalfStar ? "½" : "☆"}</span>)}</div><span className="text-sm font-semibold text-slate-700">{property.rating}</span></div>}
        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5"><span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">🛏 {property.bedroomCount} rooms</span><span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">🚿 {property.bathroomCount} baths</span></div>
        <div className="mt-5 flex flex-wrap gap-2">{property.amenities.slice(0,3).map((amenity) => <span key={amenity} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary">{amenity}</span>)}</div>
        <p className="mt-4 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">{property.description}</p><Button asChild href={`/stays/${property.id}`} variant="primary" className="mt-6 w-full">Explore this retreat</Button>
      </div>
    </article>
  );
};
export default PropertyCard;
