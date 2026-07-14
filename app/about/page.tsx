import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "About Pet Staycation - Our Story",
  description: "Learn about our mission to create unforgettable travel experiences for pets and their parents across Rajasthan's most treasured destinations.",
  openGraph: {
    title: "About Pet Staycation - Our Story",
    description: "Learn about our mission to create unforgettable travel experiences for pets and their parents across Rajasthan's most treasured destinations.",
    url: "https://petstaycation.in/about",
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
    canonical: "https://petstaycation.in/about",
  },
};

export default function AboutPage() {
  return (
    <Container>
      <SectionHeading
        title="Our Story"
        description="Creating unforgettable travel experiences for pets and their parents across Rajasthan's most treasured destinations."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Our Mission
          </h2>
          <p className="text-muted mb-6">
            At Pet Staycation, we believe that every family member deserves to
            experience the magic of travel - including the four-legged ones.
            Our mission is to curate luxury accommodations across Rajasthan
            where pets are not just allowed, but celebrated.
          </p>
          <p className="text-muted">
            We hand-select each property to ensure it meets our highest
            standards for comfort, safety, and genuine pet hospitality.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-surface dark:bg-surface rounded-xl p-6 border border-border dark:border-border/80">
            <h3 className="mb-3 text-lg font-semibold text-primary">
              Why Rajasthan?
            </h3>
            <p className="text-muted">
              Rajasthan offers a unique blend of regal heritage, stunning
              landscapes, and warm hospitality that creates the perfect
              backdrop for unforgettable pet-friendly adventures.
            </p>
          </div>

          <div className="bg-surface dark:bg-surface rounded-xl p-6 border border-border dark:border-border/80">
            <h3 className="mb-3 text-lg font-semibold text-primary">
              Our Promise
            </h3>
            <p className="text-muted">
              Every stay on our platform includes thoughtful pet amenities,
              personalized welcome treats, and local pet care resources to
              ensure both you and your companion have an extraordinary
              experience.
            </p>
          </div>

          <div className="bg-surface dark:bg-surface rounded-xl p-6 border border-border dark:border-border/80">
            <h3 className="mb-3 text-lg font-semibold text-primary">
              Join Our Community
            </h3>
            <p className="text-muted">
              Share your Pet Staycation experiences with our growing community
              of luxury pet travelers and discover hidden gems recommended by
              fellow pet lovers.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}