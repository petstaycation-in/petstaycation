import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import { properties } from "@/data/properties";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Luxury Pet-Friendly Stays in Rajasthan | Pet Staycation",
  description: "Discover premium pet-friendly resorts, farm stays, and palace retreats across Rajasthan. Book unforgettable escapes where your pets are treated like royalty.",
  openGraph: {
    title: "Luxury Pet-Friendly Stays in Rajasthan | Pet Staycation",
    description: "Discover premium pet-friendly resorts, farm stays, and palace retreats across Rajasthan. Book unforgettable escapes where your pets are treated like royalty.",
    url: "https://petstaycation.in/",
    siteName: "Pet Staycation",
    images: [
      {
        url: "https://petstaycation.in/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pet Staycation luxury pet-friendly stays in Rajasthan",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    handle: "@petstaycation",
    site: "@petstaycation",
    cardType: "summary_large_image",
  },
  alternates: {
    canonical: "https://petstaycation.in/",
  },
};

export default function Home() {
  return (
    <section className="bg-background">
      <Container>
        <section className="relative overflow-hidden rounded-[2rem] border border-[#e9dccb] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.98),_rgba(248,239,227,0.9))] px-6 py-12 shadow-[0_30px_90px_-35px_rgba(99,74,34,0.45)] sm:px-8 lg:px-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur">
                Luxury pet-friendly stays in Rajasthan
              </div>
              <h1 className="font-['Libre_Baskerville'] text-4xl font-semibold tracking-[0.01em] text-slate-900 sm:text-5xl lg:text-6xl">
                Where royal heritage meets effortless travel with your pet.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Discover curated palace retreats, boutique farm stays, and desert escapes designed for travelers who value comfort, privacy, and unforgettable memories with their furry companions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild href="/stays" variant="primary" size="lg" className="rounded-full px-6">
                  Explore stays
                </Button>
                <Button asChild href="/contact" variant="outline" size="lg" className="rounded-full px-6">
                  Speak to a concierge
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-2">✓ Handpicked stays</span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-2">✓ Pet-first hospitality</span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-2">✓ Premium Rajasthan experiences</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 p-3 shadow-[0_30px_80px_-35px_rgba(99,74,34,0.45)] backdrop-blur">
                <Image
                  src="/pstlogo.png"
                  alt="Pet Staycation luxury retreat showcase"
                  width={900}
                  height={900}
                  priority
                  loading="eager"
                  className="h-[360px] w-full rounded-[1.25rem] object-cover sm:h-[460px]"
                />
              </div>
              <div className="absolute -bottom-4 left-4 rounded-[1.25rem] border border-primary/10 bg-white/95 px-4 py-3 shadow-lg">
                <p className="text-sm font-semibold text-slate-900">Trusted by pet-loving travelers</p>
                <p className="text-sm text-slate-600">Luxury stays across Pushkar, Jodhpur & Pilani</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">01 • Curated escapes</p>
            <h2 className="mt-3 font-['Libre_Baskerville'] text-2xl font-semibold text-slate-900">Every stay is handpicked for privacy, charm, and comfort.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">From heritage retreats to farm stays, we select properties that feel indulgent and welcoming for both you and your pet.</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">02 • Pet-first service</p>
            <h2 className="mt-3 font-['Libre_Baskerville'] text-2xl font-semibold text-slate-900">Thoughtful touches that make pet travel feel effortless.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Open spaces, pet-friendly amenities, and concierge support help your journey feel seamless from arrival to departure.</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">03 • Local experiences</p>
            <h2 className="mt-3 font-['Libre_Baskerville'] text-2xl font-semibold text-slate-900">Stay close to Rajasthan’s best cultural and natural highlights.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Explore lakes, forts, villages, and artisan experiences with the confidence of a fully curated stay.</p>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Featured stays</p>
              <h2 className="font-['Libre_Baskerville'] text-3xl font-semibold text-slate-900">Luxury stays crafted for memorable escapes</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">Browse a selection of premium properties where design, comfort, and pet-friendly hospitality come together in Rajasthan.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild href="/stays" variant="primary" size="lg" className="rounded-full px-6">
              See all stays
            </Button>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Explore by destination</p>
              <h2 className="font-['Libre_Baskerville'] text-3xl font-semibold text-slate-900">Discover Rajasthan’s most welcoming regions</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">Choose the setting that best matches your travel mood — lakeside serenity, desert grandeur, or countryside calm.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {destinations.map((destination) => (
              <article key={destination.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-['Libre_Baskerville'] text-xl font-semibold text-slate-900">{destination.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{destination.description}</p>
                <div className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Pet-friendly score {destination.petFriendlyScore}/10
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-[#fdf7ee] via-white to-[#f3ebde] p-8 text-center shadow-[0_20px_60px_-35px_rgba(99,74,34,0.35)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Host with us</p>
          <h2 className="mt-3 font-['Libre_Baskerville'] text-3xl font-semibold text-slate-900">List your property and welcome guests who value extraordinary stays.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">Whether you manage a boutique villa, a heritage home, or a countryside retreat, Pet Staycation helps you reach discerning travelers looking for premium pet-friendly experiences.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild href="/list-property" variant="primary" size="lg" className="rounded-full px-6">
              List your property
            </Button>
            <Button asChild href="/contact" variant="outline" size="lg" className="rounded-full px-6">
              Contact us
            </Button>
          </div>
        </section>
      </Container>
    </section>
  );
}