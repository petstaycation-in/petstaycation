import type { BookingUnitCode } from "@/lib/pricing/maruRetreatPricing";

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

export type BookingUnit = {
  name: string;
  capacity: string;
  maxGuests: number;
  code?: BookingUnitCode;
  baseAdults?: number;
};

export type Property = {
  id: number; title: string; location: string; seoDescription: string;
  propertyTag: string;
  cardFeatures: string[];
  propertyType: string; pricePerNight: number; baseUnit: string;
  capacitySummary: string; guestCount: number; bedroomCount: number;
  bathroomCount: number; rating: number; petSize: string; priorityScore: number;
  amenities: string[]; highlights: string[]; bookingUnits: BookingUnit[];
  imageUrl: string; gallery: string[]; description: string;
  verification: PropertyVerification; rateCard?: PropertyRateCard;
  pricingModel?: "maru-date-based";
  petPolicy: { allowed: "yes" | "no" | "unconfirmed"; fee: string; notes: string };
};

export const pricingDisclaimer = "Final tariff depends on travel dates, booking unit, number of guests, selected meal plan and weekend/holiday pricing.";

export const properties: Property[] = [
  {
    id: 1, title: "Maru Retreat Farmstay", location: "Pushkar, Rajasthan",
    seoDescription: "A private pet-friendly villa stay in Pushkar with date-based pricing, flexible meal plans and complimentary stays for pets.",
    propertyTag: "Private plunge pool escape",
    cardFeatures: ["Private plunge pool", "Farm-to-table experience", "Live cooking", "Village tours"],
    propertyType: "Private Farmstay", pricePerNight: 4999, baseUnit: "One Villa · 2 adults · EP · date-based pricing",
    capacitySummary: "One Villa: up to 3 guests · Full Farm: up to 6 guests · Group enquiries: 7–8 guests", guestCount: 8,
    bedroomCount: 0, bathroomCount: 0, rating: 0, petSize: "To be confirmed", priorityScore: 100,
    amenities: [],
    highlights: ["Pets stay complimentary", "Private villa and full-farm options", "Date-based tariff estimate before enquiry"],
    bookingUnits: [
      { code: "ONE_VILLA", name: "One Villa", capacity: "2 guests included · up to 3 guests", baseAdults: 2, maxGuests: 3 },
      { code: "BOTH_VILLAS", name: "Both Villas / Full Farm", capacity: "4 guests included · up to 6 guests", baseAdults: 4, maxGuests: 6 },
      { code: "GROUP_ENQUIRY", name: "Group Enquiry", capacity: "7–8 guests · custom quote required", maxGuests: 8 },
    ],
    imageUrl: "/images/stays/maru-retreat-farmstay/pet-playing-hero.png",
    gallery: ["/images/stays/maru-retreat-farmstay/pet-playing-hero.png", "/images/stays/maru-retreat-farmstay/gallery-1.png", "/images/stays/maru-retreat-farmstay/gallery-2.png", "/images/stays/maru-retreat-farmstay/gallery-3.png", "/images/stays/maru-retreat-farmstay/gallery-4.png", "/images/stays/maru-retreat-farmstay/gallery-5.png"],
    description: "A relaxed private farmstay in Pushkar with villa and full-farm options for pet parents, families and small groups.",
    pricingModel: "maru-date-based",
    verification: { status: "needs-reconfirmation", evidenceSource: "Petstaycation operating context supplied in this conversation", verificationDate: null, contact: null, unconfirmedFields: ["current availability", "current rates", "room or unit type", "guest capacity", "amenities", "cancellation terms", "owner contact"] },
    petPolicy: { allowed: "yes", fee: "Complimentary", notes: "The supplied baseline says pets are complimentary; confirm the property-specific rules before payment." },
  },
  {
    id: 2, title: "The Red Stone Fort", location: "Near Jodhpur, Rajasthan",
    seoDescription: "A pet-friendly heritage stay near Jodhpur for couples, families and groups, with room-wise and entire-fort booking options. Pets stay complimentary.",
    propertyTag: "Royal heritage retreat",
    cardFeatures: ["Heritage setting", "Jeep safari", "Desert safari", "Horse riding"],
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
    propertyTag: "Farm & orchard retreat",
    cardFeatures: ["Organic food", "Farm produce picking", "Fresh farm products", "Orchard setting"],
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
