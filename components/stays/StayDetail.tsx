import Image from "next/image";
import Container from "@/components/ui/Container";

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
  gallery?: string[]; // optional gallery images
}

interface StayDetailProps {
  property: Property;
}

export default function StayDetail({ property }: StayDetailProps) {
  // Determine image list: use gallery if provided and has more than one, else just the main image
  const galleryImages: string[] = property.gallery ?? [];
  const images: string[] = galleryImages.length > 0 ? galleryImages : [property.imageUrl];
  const heroImage = images[0];
  const thumbnailImages = images.length > 1 ? images.slice(1, 5) : []; // up to 4 thumbnails

  return (
    <Container>
      {/* Hero Image */}
      <div className="relative w-full h-[400px] md:h-[560px] overflow-hidden rounded-lg shadow-lg mb-8">
        <Image
          src={heroImage}
          alt={`${property.title} - hero`}
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnails Section */}
      {thumbnailImages.length > 0 && (
        <>
          {/* Desktop: Grid */}
          <div className="grid gap-4 md:grid-cols-2 hidden md:block">
            {thumbnailImages.map((src, idx) => (
              <div key={idx} className="relative w-full h-48">
                <Image
                  src={src}
                  alt={`${property.title} - thumbnail ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg shadow-sm"
                />
              </div>
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="flex overflow-x-auto space-x-4 pt-4 block md:hidden">
            {thumbnailImages.map((src, idx) => (
              <div key={idx} className="flex-shrink-0 relative w-24 h-16">
                <Image
                  src={src}
                  alt={`${property.title} - thumbnail ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg shadow-sm"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}