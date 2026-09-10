export const mealPlans = [
  { code: "EP", label: "Stay only" },
  { code: "CP", label: "Stay with breakfast" },
  { code: "MAP", label: "Stay with breakfast and either lunch or dinner" },
  { code: "AP", label: "Stay with breakfast, lunch and dinner" },
] as const;

export type VerificationStatus = "verified" | "needs-reconfirmation" | "unconfirmed";
export type PropertyVerification = {
  status: VerificationStatus;
  evidenceSource: string;
  verificationDate: string | null;
  contact: string | null;
  unconfirmedFields: string[];
};

export type PropertyRateCard = {
  weekday: number;
  weekend: number;
  longWeekend: number;
  advancePercent: number;
  currency: "INR";
  reconfirmationRequired: boolean;
};

export type Property = {
  id: number; title: string; location: string; seoDescription: string;
  propertyType: string; pricePerNight: number; baseUnit: string;
  capacitySummary: string; guestCount: number; bedroomCount: number;
  bathroomCount: number; rating: number; petSize: string; priorityScore: number;
  amenities: string[]; highlights: string[]; bookingUnits: { name: string; capacity: string; maxGuests: number }[];
  imageUrl: string; gallery: string[]; description: string;
  verification: PropertyVerification; rateCard?: PropertyRateCard;
  petPolicy: { allowed: "yes" | "no" | "unconfirmed"; fee: string; notes: string };
};

export const pricingDisclaimer = "Final tariff depends on travel dates, booking unit, number of guests, selected meal plan and weekend/holiday pricing.";

export const properties: Property[] = [
  {
    id: 1, title: "Marubhoomi Pushkar", location: "Pushkar, Rajasthan",
    seoDescription: "A documented pet-friendly stay option in Pushkar with weekday, weekend and long-weekend rates that require reconfirmation before booking.",
    propertyType: "Accommodation details to be confirmed", pricePerNight: 4000, baseUnit: "Weekday rate: INR 4,000",
    capacitySummary: "Guest capacity and booking unit: to be confirmed", guestCount: 0,
    bedroomCount: 0, bathroomCount: 0, rating: 0, petSize: "To be confirmed", priorityScore: 100,
    amenities: [],
    highlights: ["Pets complimentary", "30% advance documented", "Weekday, weekend and long-weekend rates documented"],
    bookingUnits: [{ name: "Availability and unit to be confirmed", capacity: "Confirm with property", maxGuests: 20 }],
    imageUrl: "/images/stays/maru-retreat-farmstay/pet-playing-hero.png",
    gallery: ["/images/stays/maru-retreat-farmstay/pet-playing-hero.png", "/images/stays/maru-retreat-farmstay/gallery-1.png", "/images/stays/maru-retreat-farmstay/gallery-2.png", "/images/stays/maru-retreat-farmstay/gallery-3.png", "/images/stays/maru-retreat-farmstay/gallery-4.png", "/images/stays/maru-retreat-farmstay/gallery-5.png"],
    description: "A documented pet-friendly stay option in Pushkar. Share your dates and pet details to request availability and a current quote.",
    rateCard: { weekday: 4000, weekend: 5500, longWeekend: 6000, advancePercent: 30, currency: "INR", reconfirmationRequired: true },
    verification: { status: "needs-reconfirmation", evidenceSource: "Petstaycation operating context supplied in this conversation", verificationDate: null, contact: null, unconfirmedFields: ["current availability", "current rates", "room or unit type", "guest capacity", "amenities", "cancellation terms", "owner contact"] },
    petPolicy: { allowed: "yes", fee: "Complimentary", notes: "The supplied baseline says pets are complimentary; confirm the property-specific rules before payment." },
  },
  {
    id: 2, title: "The Red Stone Fort", location: "Near Jodhpur, Rajasthan",
    seoDescription: "A pet-friendly heritage stay near Jodhpur for couples, families and groups, with room-wise and entire-fort booking options. Pets stay complimentary.",
    propertyType: "Heritage Stay", pricePerNight: 5999, baseUnit: "One Room, 2 guests, EP",
    capacitySummary: "One to Three Rooms: 2–9 guests · Entire Fort: 8–12 guests", guestCount: 12,
    bedroomCount: 4, bathroomCount: 4, rating: 0, petSize: "Large", priorityScore: 80,
    amenities: ["Pet-friendly", "Heritage-style stay", "Room-wise booking", "Entire-property option"],
    highlights: ["Heritage-style pet-friendly stay", "Suitable for couples, families and groups", "Room-wise and entire-property booking options", "Pets stay complimentary"],
    bookingUnits: [{ name: "One Room", capacity: "2–3 guests", maxGuests: 3 }, { name: "Two Rooms", capacity: "4–6 guests", maxGuests: 6 }, { name: "Three Rooms", capacity: "6–9 guests", maxGuests: 9 }, { name: "Entire Fort", capacity: "8–12 guests", maxGuests: 12 }],
    imageUrl: "/images/stays/red-stone-fort/hero/red-stone-fort-garden-facade.webp",
    gallery: ["/images/stays/red-stone-fort/hero/red-stone-fort-garden-facade.webp", "/images/stays/red-stone-fort/architecture/red-stone-fort-main-entrance.webp", "/images/stays/red-stone-fort/architecture/red-stone-fort-sandstone-facade.webp", "/images/stays/red-stone-fort/architecture/red-stone-fort-inner-corridor.webp", "/images/stays/red-stone-fort/gardens/red-stone-fort-veranda-seating.webp"],
    description: "A heritage-style countryside stay near Jodhpur, suited to couples, families and groups travelling with pets.",
    verification: { status: "unconfirmed", evidenceSource: "Existing site content; owner confirmation required", verificationDate: null, contact: null, unconfirmedFields: ["current availability", "current rates", "pet rules", "amenities", "capacity", "cancellation terms", "owner contact"] },
    petPolicy: { allowed: "unconfirmed", fee: "To be confirmed", notes: "Confirm pet acceptance, fees and restrictions before presenting this property as bookable." },
  },
  {
    id: 3, title: "The Organic Orchard Retreat", location: "Pilani, Rajasthan",
    seoDescription: "A peaceful pet-friendly retreat near Pilani for couples, families and small groups. Pets stay complimentary.",
    propertyType: "Orchard Retreat", pricePerNight: 2999, baseUnit: "One Room, 2 guests, EP",
    capacitySummary: "One Room: 2–3 guests · Entire Retreat: 4–7 guests", guestCount: 7,
    bedroomCount: 2, bathroomCount: 2, rating: 4.8, petSize: "Large", priorityScore: 90,
    amenities: ["Pet-friendly", "Orchard/farm retreat", "Couples", "Families", "Small groups"],
    highlights: ["Peaceful pet-friendly orchard/farm retreat", "Suitable for couples, families and small groups", "Pets stay complimentary"],
    bookingUnits: [{ name: "One Room", capacity: "2–3 guests", maxGuests: 3 }, { name: "Entire Retreat", capacity: "4–7 guests", maxGuests: 7 }],
    imageUrl: "/images/stays/organic-orchard-retreat/hero.png",
    gallery: ["/images/stays/organic-orchard-retreat/hero.png", "/images/stays/organic-orchard-retreat/genuine-cottage.jpg", "/images/stays/organic-orchard-retreat/genuine-bedroom.jpg", "/images/stays/organic-orchard-retreat/genuine-bathroom.jpg"],
    description: "A peaceful orchard and farm retreat near Pilani for couples, families and small groups travelling with pets.",
    verification: { status: "unconfirmed", evidenceSource: "Existing site content; owner confirmation required", verificationDate: null, contact: null, unconfirmedFields: ["current availability", "current rates", "pet rules", "amenities", "capacity", "cancellation terms", "owner contact"] },
    petPolicy: { allowed: "unconfirmed", fee: "To be confirmed", notes: "Confirm pet acceptance, fees and restrictions before presenting this property as bookable." },
  },
];

export function getProperty(value: string | number) {
  return properties.find((property) => property.id === Number(value) || property.title === value);
}
