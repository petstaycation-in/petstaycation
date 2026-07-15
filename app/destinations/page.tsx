import { destinations } from "@/data/destinations";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Image from "next/image";

export const metadata = {
  title: "Explore Rajasthan's Pet-Friendly Destinations | Pet Staycation",
  description: "From majestic forts to serene lakes, discover the most welcoming places in Rajasthan for you and your furry companions.",
  openGraph: {
    title: "Explore Rajasthan's Pet-Friendly Destinations | Pet Staycation",
    description: "From majestic forts to serene lakes, discover the most welcoming places in Rajasthan for you and your furry companions.",
    url: "https://petstaycation.in/destinations",
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
    canonical: "https://petstaycation.in/destinations",
  },
};

export default function DestinationsPage() {
  return (
    <Container>
      <SectionHeading
        title="Explore Rajasthan's Pet-Friendly Destinations"
        description="From majestic forts to serene lakes, discover the most welcoming places in Rajasthan for you and your furry companions."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold text-forest-green">
                {destination.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {destination.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-beige/20 text-beige/80 px-2 py-1 text-xs rounded">
                  Pet Friendly: {destination.petFriendlyScore}/10
                </span>
              </div>
              <h4 className="mb-2 text-font-semibold text-gray-700 dark:text-gray-300">
                Top Attractions:
              </h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                {destination.attractions.slice(0, 3).map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}