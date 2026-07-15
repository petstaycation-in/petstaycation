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
}

interface StayDetailProps {
  property: Property;
}

export default function StayDetail({ property }: StayDetailProps) {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-primary mb-4">{property.title}</h1>
      <p className="text-lg text-muted mb-8">
        📍 {property.location}
      </p>
    </Container>
  );
}