import type { FC } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    pricePerNight: number;
    rating: number;
    guestCount: number;
    bedroomCount: number;
    bathroomCount: number;
    amenities: string[];
    imageUrl: string;
    description: string;
  };
}

const PropertyCard: FC<{ property: PropertyCardProps["property"] }> = ({ property }) => {
  const ratingFill = Math.floor(property.rating);
  const hasHalfStar = property.rating % 1 >= 0.5;

  return (
    <article className="bg-surface dark:bg-surface/90 border border-border dark:border-border/80 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-video bg-border dark:bg-border/80">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-primary text-xl font-semibold mb-2">
          {property.title}
        </h3>

        {/* Location Badge */}
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
          📍 {property.location}
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-accent">₹{property.pricePerNight}/night</span>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center text-sm text-muted mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="mr-1">
              {star <= ratingFill ? "★" : star === ratingFill + 0.5 && hasHalfStar ? "½" : "☆"}
            </span>
          ))}
          <span className="ml-2 text-muted">({property.rating})</span>
        </div>

        {/* Pet-Friendly Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-surface/50 text-surface dark:bg-surface/50 dark:text-surface/50 mb-4">
          🐾 Pet-Friendly
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 4).map((amenity) => (
            <span key={amenity} className="px-2 py-0.5 text-xs rounded bg-muted dark:bg-muted/80">
              {amenity}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-muted line-clamp-3 mb-5">
          {property.description}
        </p>

        {/* View Details Button */}
        <Button
          asChild
          href={`/stays/${property.id}`}
          variant="primary"
          className="w-full"
        >
          View Details
        </Button>
      </div>
    </article>
  );
};

export default PropertyCard;