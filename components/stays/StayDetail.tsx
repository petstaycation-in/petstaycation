import Image from "next/image";
import Container from "@/components/ui/Container";

const sectionTone = "bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.98),_rgba(248,239,227,0.9))]";

const bookingCardStyles = "animate-[fadeIn_0.45s_ease-out]";

interface Property {
  id: number;
  title: string;
  location: string;
  propertyType: string;
  pricePerNight: number;
  guestCount: number;
  petSize: string;
  rating: number;
  bedroomCount: number;
  bathroomCount: number;
  amenities: string[];
  imageUrl: string;
  description: string;
  petPolicy: string;
  checkIn: string;
  checkOut: string;
  highlights: string[];
  nearbyAttractions: string[];
  gallery?: string[];
}

interface StayDetailProps {
  property: Property;
}

export default function StayDetail({ property }: StayDetailProps) {
  const galleryImages: string[] = property.gallery ?? [];
  const images: string[] = galleryImages.length > 0 ? galleryImages : [property.imageUrl];
  const heroImage = images[0];
  const galleryCards = images.slice(1, 5);
  const highlights = property.highlights ?? [];
  const amenities = property.amenities ?? [];
  const nearby = property.nearbyAttractions ?? [];

  return (
    <Container>
      <div className="pb-20 pt-2 md:pt-6">
        <div className="sticky top-4 z-20 mb-6 flex justify-end">
          <div className={`w-full max-w-md ${bookingCardStyles} rounded-[1.5rem] border border-primary/20 bg-white/95 p-4 shadow-[0_20px_60px_-25px_rgba(99,74,34,0.45)] backdrop-blur`}>

            <div className="flex items-start justify-between gap-3">
  <div>
    <p className="text-sm font-semibold text-slate-900">
      Reserve your pet-friendly stay
    </p>

    <div className="mt-2 flex items-end gap-1">
      <span className="text-3xl font-semibold text-primary">
        ₹{property.pricePerNight.toLocaleString()}
      </span>
      <span className="pb-1 text-sm text-slate-500">
        / night
      </span>
    </div>

    <p className="mt-1 text-sm text-slate-600">
      ★ {property.rating.toFixed(1)} guest rating
    </p>
  </div>

  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
    Verified
  </span>
</div>


<div className="mt-5 grid gap-3 sm:grid-cols-2">

  <label className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
    <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">
      Check in
    </span>
    <input 
      type="date" 
      className="w-full bg-transparent text-sm outline-none" 
    />
  </label>


  <label className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
    <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">
      Check out
    </span>
    <input 
      type="date" 
      className="w-full bg-transparent text-sm outline-none" 
    />
  </label>

</div>


<div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
  <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
    Guests
  </span>

  <p className="mt-1 text-sm font-semibold text-slate-900">
    Up to {property.guestCount} guests
  </p>
</div>


<button className="mt-5 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90">
  Reserve your stay
</button>


<p className="mt-3 text-center text-xs text-slate-500">
  No payment required today • WhatsApp support available
</p>
          </div>
        </div>

        <section className={`overflow-hidden rounded-[2rem] border border-[#e9dccb] ${sectionTone} shadow-[0_30px_90px_-35px_rgba(99,74,34,0.45)]`}>
          <div className="relative h-[420px] md:h-[560px]">
            <Image
              src={heroImage}
              alt={`${property.title} - hero`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/20" />
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-4 inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/95 backdrop-blur-sm">
                      {property.propertyType}
                    </div>
                    <h1 className="font-['Libre_Baskerville'] text-3xl font-semibold tracking-[0.01em] text-white sm:text-4xl lg:text-5xl">
                      {property.title}
                    </h1>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                      {property.location} • Pet-friendly luxury retreat designed for slow travel and unforgettable stays.
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] border border-white/20 bg-white/90 p-4 text-slate-900 shadow-lg backdrop-blur md:min-w-[240px]">
                    <div className="text-sm font-medium text-slate-500">Starting from</div>
                    <div className="mt-1 text-3xl font-semibold text-primary">₹{property.pricePerNight.toLocaleString()}</div>
                    <div className="mt-1 text-sm text-slate-600">per night</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.45)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Curated for comfort
              </span>
              <span className="text-sm text-slate-500">★ {property.rating.toFixed(1)} guest rating</span>
            </div>
            <h2 className="mt-4 font-['Libre_Baskerville'] text-2xl font-semibold text-slate-900 sm:text-3xl">
              A stay that feels like a private escape in the heart of Rajasthan.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {property.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Guests</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">{property.guestCount}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Bedrooms</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">{property.bedroomCount}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Bathrooms</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">{property.bathroomCount}</div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-[#fdf7ee] via-white to-[#f3ebde] p-6 shadow-[0_20px_60px_-35px_rgba(99,74,34,0.35)] sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900">Stay essentials</h3>
            <div className="mt-5 space-y-4 text-sm text-slate-700">
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Check in</div>
                <div className="mt-1 text-base font-semibold text-slate-900">{property.checkIn}</div>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Check out</div>
                <div className="mt-1 text-base font-semibold text-slate-900">{property.checkOut}</div>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Pet policy</div>
                <div className="mt-1 text-base font-semibold text-slate-900">{property.petPolicy}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
  <div className="mb-5 flex items-end justify-between">
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
        Gallery
      </p>
      <h2 className="mt-1 font-['Libre_Baskerville'] text-2xl font-semibold text-slate-900">
        Experience the stay
      </h2>
    </div>

    <p className="hidden text-sm text-slate-500 sm:block">
      Explore rooms, dining, nature & pet experiences
    </p>
  </div>

  <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-2">

    <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 lg:col-span-2 lg:row-span-2">
      <Image
        src={heroImage}
        alt={`${property.title} main gallery`}
        fill
        sizes="(max-width:768px) 100vw, 50vw"
        className="object-cover transition duration-700 hover:scale-105"
      />
    </div>

    {images.slice(1,5).map((src, idx)=>(
      <div
        key={idx}
        className="relative h-48 overflow-hidden rounded-[1.5rem] border border-slate-200"
      >
        <Image
          src={src}
          alt={`${property.title} gallery ${idx+2}`}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition duration-700 hover:scale-105"
        />
      </div>
    ))}

  </div>

  <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
    {images.map((src,idx)=>(
      <div
        key={idx}
        className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl border border-slate-200"
      >
        <Image
          src={src}
          alt={`${property.title} preview ${idx+1}`}
          fill
          sizes="150px"
          className="object-cover"
        />
      </div>
    ))}
  </div>
</section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-8">
            <h3 className="font-['Libre_Baskerville'] text-xl font-semibold text-slate-900">What makes this place special</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-8">
            <h3 className="font-['Libre_Baskerville'] text-xl font-semibold text-slate-900">Amenities</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {amenities.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-8">
          <h3 className="font-['Libre_Baskerville'] text-xl font-semibold text-slate-900">Nearby experiences</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {nearby.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}