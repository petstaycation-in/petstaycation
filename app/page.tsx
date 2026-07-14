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
        {/* HERO SECTION (EXISTING - UNCHANGED) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 px-4 pt-20 pb-24">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
              Travel Together. Stay Together.
            </h1>
            <p className="text-lg text-muted max-w-xl md:max-w-lg">
              Discover pet-friendly resorts, farm stays, and nature escapes across Rajasthan. Because adventures are better when your pets come along.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                asChild
                href="/stays"
                variant="primary"
              >
                Explore Stays
              </Button>
              <Button
                asChild
                href="/contact"
                variant="secondary"
              >
                Contact Us
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            {/* Image Placeholder */}
            <div className="aspect-w-16 aspect-h-9 bg-border dark:bg-border/50 flex items-center justify-center rounded-lg overflow-hidden">
              <span className="text-muted dark:text-muted/50 text-xl">Hero Image Placeholder</span>
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