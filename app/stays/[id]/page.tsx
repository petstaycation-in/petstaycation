import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import BookingInquiryForm from "@/components/forms/BookingInquiryForm";
import Image from "next/image";

export function generateStaticParams() {
  return properties.map((p) => ({
    id: String(p.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const stay = properties.find(
    (p) => p.id === Number(id)
  );

  if (!stay) {
    return {};
  }

  const baseUrl = "https://petstaycation.in";
  const url = `${baseUrl}/stays/${id}`;

  return {
    title: `${stay.title} | Pet Staycation`,
    description: stay.description,
    openGraph: {
      title: `${stay.title} | Pet Staycation`,
      description: stay.description,
      url,
      siteName: "Pet Staycation",
      images: [
        {
          url: stay.imageUrl.startsWith('/') ? `${baseUrl}${stay.imageUrl}` : stay.imageUrl,
          width: 1200,
          height: 630,
          alt: stay.title,
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
      canonical: url,
    },
  };
}

export default async function StayDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const stay = properties.find(
    (p) => p.id === Number(id)
  );

  if (!stay) {
    notFound();
  }

  const ratingFill = Math.floor(stay.rating);

  return (
    <Container>
      {/* Hero Image */}
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
        <Image
          src={stay.imageUrl}
          alt={stay.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-8">
        {/* Property Overview */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-bg-primary">
            {stay.title}
          </h1>

          <p className="mt-2 text-gray-500">
            {stay.location}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-bold text-gold">
              ₹{stay.pricePerNight}/night
            </span>

            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= ratingFill ? "★" : "☆"}
                </span>
              ))}
              <span className="ml-2">
                ({stay.rating})
              </span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">
            Highlights
          </h2>
          <div className="flex flex-wrap gap-2">
            {stay.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1 rounded bg-bg-primary/10 text-bg-primary text-sm"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Pet Policy */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">
            Pet Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {stay.petPolicy}
          </p>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">
            Amenities
          </h2>
          <div className="flex flex-wrap gap-2">
            {stay.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Stay Information */}
        <div className="mb-6 grid md:grid-cols-3 gap-4">
          <div>
            <strong>Guests:</strong> {stay.guestCount}
          </div>

          <div>
            <strong>Bedrooms:</strong> {stay.bedroomCount}
          </div>

          <div>
            <strong>Bathrooms:</strong> {stay.bathroomCount}
          </div>

          <div>
            <strong>Check-in:</strong> {stay.checkIn}
          </div>

          <div>
            <strong>Check-out:</strong> {stay.checkOut}
          </div>

          <div>
            <strong>Pet Friendly:</strong> Yes
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">
            Nearby Attractions
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {stay.nearbyAttractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col md:flex-row md:space-x-4">
          <Button
            asChild
            href="https://wa.me/919999999999"
            variant="primary"
            className="w-full md:w-auto"
          >
            Enquire on WhatsApp
          </Button>

          <Button
            asChild
            href="/stays"
            variant="secondary"
            className="w-full md:w-auto"
          >
            Back to Stays
          </Button>
        </div>
      </div>

      {/* Booking Inquiry */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-bg-primary">
          Booking Inquiry
        </h2>
        <BookingInquiryForm stayTitle={stay.title} />
      </div>
    </Container>
  );
}