export type PropertyExperience = {
  id: string;
  title: string;
  description: string;
  pricingType: "complimentary" | "per_person" | "per_jeep" | "on_request";
  price?: number;
  availabilityNote?: string;
};

export const redStoneFort = {
  publicName: "The Red Stone Fort",
  descriptor: "An Intimate Heritage Homestay in Rural Rajasthan",
  locationLabel: "Jodhpur countryside, Rajasthan",
  shortLocation: "Rajasthan countryside",
  address: {
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  propertySize: "Approximately 1 acre",
  roomCount: 4,
  roomSize: "Approximately 240 sq. ft.",
  gardens: 2,
  pool: true,
  petFriendly: true,
  coordinates: null,
  plusCode: null,
  access: {
    jodhpurDistance: "Approximately 55 km",
    driveTime: "Generally 1–1.5 hours, depending on traffic and route conditions",
  },
  commercial: {
    roomTariff: null,
    mealPlans: null,
    petFee: null,
    cancellationPolicy: null,
    checkIn: "14:00",
    checkOut: "11:00",
    whatsappNumber: "919649088717",
  },
  roomAmenities: [
    "Ensuite bathroom", "Air conditioning", "Space heater", "Wi-Fi",
    "Mini refrigerator", "Smart TV", "Tea and coffee maker", "Hairdryer",
    "Toiletries", "Fresh towels", "Slippers", "Housekeeping",
    "Sitting area", "Wardrobe space", "Jaquar bathroom fittings",
    "Large veranda access", "Garden outlook",
  ],
  propertyAmenities: [
    "Four ensuite guestrooms", "Two gardens", "Outdoor swimming pool",
    "Large pool deck", "Garden-facing veranda", "Dining room",
    "Multiple common spaces", "Freshly prepared meals", "Wi-Fi",
    "Air conditioning", "Pet-friendly stay", "Hosted experiences",
  ],
  petPolicy: {
    petsAllowed: true,
    permittedTypes: "Confirm with property",
    maximumPets: "Confirm with property",
    fee: "Confirm at booking",
    securityDeposit: "Confirm at booking",
    leashRequirements: "Confirm with property",
    diningAccess: "Confirm with property",
    poolAccess: "Confirm with property",
    vaccinationRecords: "May be requested",
    damageCharges: "As applicable",
    notes: "Detailed pet conditions are confirmed during reservation according to the number, size and type of pets travelling.",
  },
  experiences: [
    { id: "day-lunch", title: "Lunch for Day Visitors", description: "A freshly prepared lunch at the heritage residence for guests visiting without an overnight stay. Prior reservation is required.", pricingType: "per_person", price: 1500 },
    { id: "village-walk", title: "Village Walk", description: "Explore the surrounding countryside on foot and encounter everyday rural life and a slower local rhythm.", pricingType: "complimentary" },
    { id: "wilderness-drive", title: "Countryside Drive with High Tea", description: "Travel beyond the village into the surrounding countryside, with a high-tea stop shaped around the landscape and time of day.", pricingType: "per_jeep", price: 3500 },
    { id: "artisan-safari", title: "Artisan Safari with Tea & Snacks", description: "A guided journey connecting guests with selected local craftspeople and regional making traditions, accompanied by tea and snacks.", pricingType: "per_jeep", price: 3500 },
    { id: "farm-visit", title: "Farm Visit with Breakfast or High Tea", description: "Visit a working rural farm and pair the experience with breakfast or high tea, subject to the selected timing and availability.", pricingType: "per_jeep", price: 3500 },
    { id: "cooking-class", title: "Cooking Class", description: "A hands-on introduction to selected recipes and kitchen techniques, guided by the culinary team or hosts.", pricingType: "per_person", price: 2500 },
    { id: "cultural", title: "Seasonal Cultural Experience", description: "Seasonal cultural experiences may be arranged around local festivals, traditions and the property calendar.", pricingType: "on_request" },
  ] satisfies PropertyExperience[],
  images: [
    { src: "/images/stays/red-stone-fort/hero/red-stone-fort-garden-facade.webp", source: "IMG_9085.JPG", category: "The Fort", alt: "Red-sandstone residence seen through the garden at The Red Stone Fort." },
    { src: "/images/stays/red-stone-fort/architecture/red-stone-fort-main-entrance.webp", source: "IMG_9099.JPG", category: "The Fort", alt: "Carved red-sandstone entrance with a heritage jeep at The Red Stone Fort." },
    { src: "/images/stays/red-stone-fort/architecture/red-stone-fort-sandstone-facade.webp", source: "IMG_9181.JPG", category: "The Fort", alt: "Sunlit red-sandstone façade and carved windows of the residence." },
    { src: "/images/stays/red-stone-fort/architecture/red-stone-fort-inner-corridor.webp", source: "IMG_9101.JPG", category: "The Fort", alt: "Plant-lined inner corridor leading through the heritage residence." },
    { src: "/images/stays/red-stone-fort/gardens/red-stone-fort-veranda-seating.webp", source: "IMG_9073.JPG", category: "Gardens", alt: "Wicker chairs on the garden-facing red-sandstone veranda." },
    { src: "/images/stays/red-stone-fort/gardens/red-stone-fort-morning-tea.webp", source: "IMG_9092.JPG", category: "Gardens", alt: "Morning tea arranged at a table in the garden." },
    { src: "/images/stays/red-stone-fort/gardens/red-stone-fort-garden-view.webp", source: "IMG_9086.JPG", category: "Gardens", alt: "Landscaped garden facing the red-sandstone residence." },
    { src: "/images/stays/red-stone-fort/experiences/red-stone-fort-hosted-welcome.webp", source: "IMG_9034.JPG", category: "Rural Experiences", alt: "Traditional flower-garland welcome at the carved entrance." },
  ],
  faqs: [
    ["Is The Red Stone Fort pet friendly?", "Yes. The owner has confirmed that pets are welcome. Detailed conditions are confirmed during reservation according to the pets travelling."],
    ["How far is the property from Jodhpur?", "The residence is approximately 55 km from Jodhpur. Driving time is generally around 1–1.5 hours, depending on traffic and route conditions."],
    ["How many guestrooms are there?", "There are four guestrooms, each approximately 240 sq. ft., with an ensuite bathroom, sitting area and wardrobe space."],
    ["Is there a swimming pool?", "Yes. The property has an outdoor swimming pool with a large deck and sitting area."],
    ["Are meals available?", "Yes. Meals are prepared fresh and may be adapted to resident guests’ preferences. Indian cuisine is the focus, with a limited selection of Chinese and Italian dishes."],
    ["Can experiences be booked in advance?", "Yes. Experiences are subject to availability and advance confirmation. Current prices may change."],
    ["Can day visitors have lunch?", "A pre-booked lunch for day visitors is currently listed at ₹1,500 per person, subject to confirmation."],
    ["What pet information is needed?", "Please share the number, type, breed, approximate weight, age and vaccination status of pets when enquiring."],
  ] as const,
} as const;

export function formatExperiencePrice(experience: PropertyExperience) {
  if (experience.pricingType === "complimentary") return "Complimentary";
  if (experience.pricingType === "on_request") return "On request";
  const suffix = experience.pricingType === "per_jeep" ? "per jeep" : "per person";
  return `₹${experience.price?.toLocaleString("en-IN")} ${suffix}`;
}
