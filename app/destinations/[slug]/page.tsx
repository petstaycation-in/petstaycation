import { destinations } from "@/data/destinations";
import { properties } from "@/data/properties";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import PropertyCard from "@/components/ui/PropertyCard";
import Button from "@/components/ui/Button";

export const generateStaticParams = async () => {
  return destinations.map((dest) => ({
    slug: dest.name.toLowerCase().replace(/\s+/g, "-"),
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string } | { slug: undefined }>;
}) {
  const { slug } = await params;
  const slugName = slug?.replace(/-/g, " ") ?? "";
  const destination = destinations.find(
    (d) => d.name.toLowerCase() === slugName.toLowerCase()
  );

  if (!destination) {
    return {};
  }

  return {
    title: `${destination.name} | Pet Staycation`,
    description: destination.description,
    openGraph: {
      title: `${destination.name} | Pet Staycation`,
      description: destination.description,
      url: `https://petstaycation.in/destinations/${slug}`,
      siteName: "Pet Staycation",
      images: [
        {
          url: destination.imageUrl,
          width: 1200,
          height: 630,
          alt: `${destination.name} destination`,
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
      canonical: `https://petstaycation.in/destinations/${slug}`,
    },
  };
}

export default function DestinationPage({
  params,
}: {
  params: { slug: string } | { slug: undefined };
}) {
  // Convert slug back to name for matching (simple conversion)
  const slug = params?.slug ?? "";
  const slugName = slug.replace(/-/g, " ");
  const destination = destinations.find(
    (d) => d.name.toLowerCase() === slugName.toLowerCase()
  );

  if (!destination) {
    // TODO: 404 page
    return (
      <Container>
        <SectionHeading title="Destination Not Found" />
        <p>We couldn&apos;t find the destination you&apos;re looking for.</p>
      </Container>
    );
  }

  // Filter properties for this destination (location contains destination name)
  const recommendedStays = properties.filter((property) =>
    property.location.toLowerCase().includes(destination.name.toLowerCase())
  );

  return (
    <Container>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={destination.imageUrl}
            alt={`${destination.name} destination`}
            width={1200}
            height={500}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h1 className="mb-4 text-3xl font-bold text-bg-primary">
              {destination.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {destination.description}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-beige/20 text-beige/80 px-3 py-1 text-xs rounded">
                Pet Friendly: {destination.petFriendlyScore}/10
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Travel Guide */}
      <SectionHeading title="Pet Travel Guide" description={`Tips for traveling with your pet to ${destination.name}`} center />
      <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="mb-4 text-xl font-semibold text-bg-primary">Pet-Friendly Tips</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
          <li>Check pet policies in advance for attractions and accommodations.</li>
          <li>Carry a pet first-aid kit and sufficient food/water for journeys.</li>
          <li>Ensure your pet is vaccinated and carries identification tags.</li>
          <li>Use a leash in public areas and respect local rules regarding pets.</li>
          <li>Consider pet-friendly transportation options for intercity travel.</li>
        </ul>
      </section>

      {/* Recommended Stays */}
      <SectionHeading title="Recommended Stays" description={`Handpicked pet-friendly accommodations in ${destination.name}`} center />
      <section className="mb-12">
        {recommendedStays.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedStays.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No pet-friendly stays found for {destination.name}. Please check back later.
          </p>
        )}
      </section>

      {/* Attractions */}
      <SectionHeading title="Top Attractions" description={`Must-visit places in ${destination.name} that welcome pets`} center />
      <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="mb-4 text-xl font-semibold text-bg-primary">Popular Attractions</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
          {destination.attractions.map((attraction, index) => (
            <li key={index}>{attraction}</li>
          ))}
        </ul>
      </section>

      {/* Travel Tips */}
      <SectionHeading title="Travel Tips" description={`Essential advice for a smooth trip to ${destination.name} with your pet`} center />
      <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="mb-4 text-xl font-semibold text-bg-primary">General Advice</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
          <li>The best time to visit {destination.name} is between October and March for pleasant weather.</li>
          <li>Always carry copies of your pet&apos;s vaccination records.</li>
          <li>Book pet-friendly accommodations well in advance, especially during peak season.</li>
          <li>Respect local culture and keep your pet under control in public spaces.</li>
          <li>Have a list of emergency veterinary clinics saved in your phone.</li>
        </ul>
      </section>

      {/* CTA Section */}
      <SectionHeading title={`Ready to Explore ${destination.name}?`} description="Find the perfect pet-friendly stay for your adventure" center />
      <section className="mb-12 bg-beige/50 dark:bg-gray-700/50 rounded-xl px-6 py-12 text-center">
        <Button
          variant="primary"
          size="lg"
          className="mx-4"
          href="/stays"
        >
          Browse Pet-Friendly Stays in {destination.name}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="mx-4"
          href="/list-property"
        >
          List Your Property in {destination.name}
        </Button>
      </section>
    </Container>
  );
}