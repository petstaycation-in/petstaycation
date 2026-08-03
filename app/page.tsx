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

  <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">

    <div className="min-w-0 max-w-2xl">

      <div className="mb-5 inline-flex max-w-full rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur sm:text-[11px] sm:tracking-[0.3em]">
        India`&apos; premium pet travel platform
      </div>


      <h1 className="font-['Libre_Baskerville'] text-4xl font-semibold leading-tight tracking-[0.01em] text-slate-900 sm:text-5xl lg:text-6xl">

        Luxury Pet-Friendly Holidays
        <br />
        Across Rajasthan

      </h1>


      <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">

        Discover verified pet-friendly resorts, farm stays, and luxury retreats where you and your furry companion can relax, explore, and create unforgettable memories together.

      </p>


      <div className="mt-8 flex flex-wrap gap-3">

        <Button 
          asChild 
          href="/stays" 
          variant="primary" 
          size="lg" 
          className="rounded-full px-7"
        >
          Explore Pet-Friendly Stays
        </Button>


        <Button 
          asChild 
          href="/contact" 
          variant="outline" 
          size="lg" 
          className="rounded-full px-7"
        >
          Plan Your Pet Holiday
        </Button>

      </div>


      <div className="mt-8 grid gap-3 sm:grid-cols-2">

        <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700">
          ✓ Verified pet-friendly stays
        </span>

        <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700">
          ✓ Handpicked luxury properties
        </span>

        <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700">
          ✓ Pet parent support
        </span>

      </div>

    </div>


    <div className="relative">

      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_30px_80px_-35px_rgba(99,74,34,0.45)]">

        <Image
          src="/images/home-maru-pool-hero.png"
          alt="A couple and their dog relaxing beside the pool at Maru Retreat"
          width={1456}
          height={1086}
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="h-[380px] w-full rounded-[1.5rem] object-cover sm:h-[480px]"
        />

      </div>


      <div className="absolute -bottom-5 left-5 rounded-[1.25rem] border border-primary/10 bg-white/95 px-5 py-4 shadow-lg">

        <p className="text-sm font-semibold text-slate-900">
          Travel together. Stay together.
        </p>

        <p className="mt-1 text-sm text-slate-600">
          Premium pet-friendly escapes
        </p>

      </div>

    </div>

  </div>

</section>

        <section className="mt-16">

  <div className="mb-8 text-center">

    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
      Why Pet Staycation
    </p>

    <h2 className="mt-3 font-['Libre_Baskerville'] text-3xl font-semibold text-slate-900">
      Making pet travel simple, comfortable & memorable
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
      We help pet parents discover verified stays where every member of the family is welcomed.
    </p>

  </div>


  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">


    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">

      <div className="text-3xl">
        🐾
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        Verified Pet-Friendly Stays
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Carefully selected properties that genuinely welcome pets.
      </p>

    </div>



    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">

      <div className="text-3xl">
        🏡
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        Handpicked Properties
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Premium resorts, farm stays and retreats chosen for comfort.
      </p>

    </div>



    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">

      <div className="text-3xl">
        💬
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        Pet Parent Support
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Guidance before and during your stay whenever you need us.
      </p>

    </div>



    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">

      <div className="text-3xl">
        ❤️
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        Stress-Free Travel
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Enjoy holidays without worrying about pet restrictions.
      </p>

    </div>


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
        <section className="mt-16">

  <div className="mb-8 text-center">

    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
      FAQ
    </p>

    <h2 className="mt-3 font-['Libre_Baskerville'] text-3xl font-semibold text-slate-900">
      Everything you need to know
    </h2>

  </div>


  <div className="grid gap-5 md:grid-cols-2">


    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">

      <h3 className="font-semibold text-slate-900">
        Are all properties verified as pet-friendly?
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Yes. We focus on stays where pets are genuinely welcomed and comfortable.
      </p>

    </div>



    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">

      <h3 className="font-semibold text-slate-900">
        Can I travel with large dogs?
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Yes. Each property has its own pet policy, and we highlight those details clearly.
      </p>

    </div>



    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">

      <h3 className="font-semibold text-slate-900">
        Do I need to pay online immediately?
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Booking and payment options depend on the property. Our team helps you with the process.
      </p>

    </div>



    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">

      <h3 className="font-semibold text-slate-900">
        Can you help plan pet-friendly trips?
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Yes. We help pet parents choose stays and experiences suitable for their journey.
      </p>

    </div>


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
