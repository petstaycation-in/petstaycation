export const mealPlans = [
  { code: "EP", label: "Stay only" },
  { code: "CP", label: "Stay with breakfast" },
  { code: "MAP", label: "Stay with breakfast and either lunch or dinner" },
  { code: "AP", label: "Stay with breakfast, lunch and dinner" },
] as const;

export type Property = {
  id: number; title: string; location: string; seoDescription: string;
  propertyType: string; pricePerNight: number; baseUnit: string;
  capacitySummary: string; guestCount: number; bedroomCount: number;
  bathroomCount: number; rating: number; petSize: string; priorityScore: number;
  amenities: string[]; highlights: string[]; bookingUnits: { name: string; capacity: string; maxGuests: number }[];
  imageUrl: string; gallery: string[]; description: string;
};

export const pricingDisclaimer = "Final tariff depends on travel dates, booking unit, number of guests, selected meal plan and weekend/holiday pricing.";

export const properties: Property[] = [
  {
    id: 1, title: "Maru Retreat Farmstay", location: "Pushkar, Rajasthan",
    seoDescription: "A private pet-friendly farmstay in Pushkar with villa-based stays, private plunge pools and a relaxed farm setting. Pets stay complimentary.",
    propertyType: "Private Pool Farmstay", pricePerNight: 3499, baseUnit: "One Villa, 2 guests, EP",
    capacitySummary: "One Villa: 2–3 guests · Both Villas: 4–8 guests", guestCount: 8,
    bedroomCount: 2, bathroomCount: 2, rating: 5, petSize: "Large", priorityScore: 100,
    amenities: ["Pet-friendly", "Private plunge pool", "Farm experience", "Complimentary hi-tea", "Parking"],
    highlights: ["Private pet-friendly farmstay", "Villa-based stay", "Private plunge pool", "Farm experience", "Complimentary hi-tea", "Parking", "Pets stay complimentary"],
    bookingUnits: [{ name: "One Villa", capacity: "2–3 guests", maxGuests: 3 }, { name: "Both Villas", capacity: "4–8 guests", maxGuests: 8 }],
    imageUrl: "/images/stays/maru-retreat-farmstay/pet-playing-hero.png",
    gallery: ["/images/stays/maru-retreat-farmstay/pet-playing-hero.png", "/images/stays/maru-retreat-farmstay/gallery-1.png", "/images/stays/maru-retreat-farmstay/gallery-2.png", "/images/stays/maru-retreat-farmstay/gallery-3.png", "/images/stays/maru-retreat-farmstay/gallery-4.png", "/images/stays/maru-retreat-farmstay/gallery-5.png"],
    description: "A private villa-based farmstay near Pushkar with plunge pools and room to slow down together.",
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
  },
];

export function getProperty(value: string | number) {
  return properties.find((property) => property.id === Number(value) || property.title === value);
}
