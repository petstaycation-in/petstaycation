import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import { properties } from "@/data/properties";

export const metadata = {
  title: "Pet Staycation - Pet-Friendly Stays in Rajasthan",
  description: "Discover pet-friendly resorts, farm stays, and nature escapes across Rajasthan. Because adventures are better when your pets come along.",
  openGraph: {
    title: "Pet Staycation - Pet-Friendly Stays in Rajasthan",
    description: "Discover pet-friendly resorts, farm stays, and nature escapes across Rajasthan. Because adventures are better when your pets come along.",
    url: "https://petstaycation.in/",
    siteName: "Pet Staycation",
    images: [
      {
        url: "https://petstaycation.in/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pet Staycation logo",
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
        {/* HERO SECTION - ENHANCED */}
        <div className="relative">
          <div className="absolute inset-0">
            <Image
              src="/pstlogo.png"
              alt="Pet Staycation logo"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
              loading="eager"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center px-4 pt-20 pb-24 lg:items-start lg:pt-28 lg:pb-32">
            <div className="text-center lg:text-left max-w-xl">
              <h1 className="mb-4 text-5xl font-bold text-primary md:text-6xl lg:text-7xl tracking-tighter">
                Where Royal Heritage Welcomes Every Paw
              </h1>
              <p className="text-lg text-muted max-w-xl">
                Experience curated palace stays, desert camps, and boutique retreats where pets are treated like royalty. Discover Rajasthan's most exclusive pet-friendly escapes.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  href="/stays"
                  variant="primary"
                  className="hover:scale-[1.02] transition-transform duration-200"
                >
                  Explore Royal Retreats
                </Button>
                <Button
                  asChild
                  href="/contact"
                  variant="secondary"
                  className="hover:scale-[1.02] hover:bg-primary/10 transition-all duration-200"
                >
                  Speak to a Concierge
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* NEW: FEATURED PET-FRIENDLY STAYS SECTION */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Featured Pet-Friendly Stays
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Discover handpicked resorts, farm stays, and nature escapes across Rajasthan that welcome your furry companions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pt-16 pb-20">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              href="/stays"
              variant="primary"
            >
              See All Stays
            </Button>
          </div>
        </section>

        {/* CTA: List Your Property */}
        <section className="mt-16 bg-background">
          <div className="Container">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Host Guests & Earn
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                List your pet-friendly property on Pet Staycation and start
                earning from hosting guests with their furry companions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <Button
                  asChild
                  href="/list-property"
                  variant="primary"
                >
                  List Your Property
                </Button>
                <Button
                  asChild
                  href="/stays"
                  variant="secondary"
                >
                  Explore Stays
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
}