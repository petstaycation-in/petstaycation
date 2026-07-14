import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PropertyListingForm from "@/components/forms/PropertyListingForm";

export const metadata = {
  title: "List Your Property | Pet Staycation",
  description: "List your pet-friendly property on Pet Staycation and earn from hosting guests with their furry companions.",
  openGraph: {
    title: "List Your Property | Pet Staycation",
    description: "List your pet-friendly property on Pet Staycation and earn from hosting guests with their furry companions.",
    url: "https://petstaycation.in/list-property",
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
    canonical: "https://petstaycation.in/list-property",
  },
};

export default function ListPropertyPage() {
  return (
    <Container>
      <SectionHeading
        title="List Your Property"
        description="Host guests and their pets at your pet-friendly property and earn extra income."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-bg-primary">
              Why List with Us?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Reach pet travelers actively seeking accommodations</li>
              <li>Secure booking system with protected payments</li>
              <li>Dedicated support for property owners</li>
              <li>Marketing and promotion across our channels</li>
              <li>Pet-friendly community verification</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-bg-primary">
              Property Types We Welcome
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Resorts & Hotels</li>
              <li>Heritage Havelis & Palaces</li>
              <li>Desert Camps & Tents</li>
              <li>Farm Stays & Cottages</li>
              <li>Nature Retreats & Lodges</li>
              <li>Villas & Apartments</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-bg-primary">
              Getting Started
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Submit your property details</li>
              <li>Our team reviews and verifies</li>
              <li>Property goes live on our platform</li>
              <li>Start receiving booking inquiries</li>
              <li>Host guests and earn revenue</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <PropertyListingForm />
      </div>
    </Container>
  );
}