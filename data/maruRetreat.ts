export type MaruImage = { src: string; alt: string; category: string; source: string };

const confirm = "Confirm during booking";

export const maruRetreat = {
  publicName: "Maru Retreat Farmstay",
  featured: true,
  recommended: true,
  priorityScore: 100,
  editorialBadge: "Petstaycation Top Pick",
  petFriendly: true,
  privatePool: true,
  fullPropertyOption: true,
  locationLabel: "Pushkar countryside, Rajasthan",
  address: { addressRegion: "Rajasthan", addressCountry: "IN" },
  commercial: { checkIn: "13:00", checkOut: "12:00", tariff: null, cancellation: confirm, whatsappNumber: "919649088717" },
  highlights: ["Two private plunge-pool villas", "Pet-friendly open farm setting", "Farm and nearby-field dining", "Traditional outdoor chulha", "Private dining on request", "Near Pushkar, beyond town congestion"],
  rooms: [
    { name: "Private Pool Villa", slug: "private-pool-villa-one", descriptor: "Warm, restful interiors", description: "A comfortable private villa with a king-size bed, handcrafted details and direct access to its own plunge pool.", bed: "King-size bed; extra sleeping arrangements available", occupancy: confirm, pool: "Private plunge pool" },
    { name: "Private Pool Villa", slug: "private-pool-villa-two", descriptor: "Earthy, spacious comfort", description: "A calm private villa with tactile natural finishes, a generous bedroom and its own plunge pool.", bed: "King-size bed; extra sleeping arrangements available", occupancy: confirm, pool: "Private plunge pool" },
  ],
  petPolicy: { allowed: "Yes — dogs, cats and other companion animals welcome", maximum: confirm, fee: confirm, weight: "No fixed limit published", vaccinations: "Current vaccination details requested", leash: "Supervision requested around farm areas", furniture: confirm, pool: confirm, dining: confirm, unattended: confirm, bowls: confirm, bedding: confirm, meals: "May be discussed in advance", waste: "Pet parents are asked to clean up after pets" },
  experiences: [
    ["Organic farm visit", "Walk through the fields and learn about seasonal crops.", "Seasonal · advance request", "Pet suitability confirmed for the day"],
    ["Vegetable gathering", "Gather available produce and connect the meal with the land.", "Subject to harvest and farm conditions", "Supervised pets may join"],
    ["Traditional cooking", "Join selected Rajasthani cooking or use the outdoor chulha.", "Advance reservation required", "Pet participation confirmed on request"],
    ["Farm-based meals", "Fresh breakfast, lunch or dinner guided by produce and preferences.", "On request", "Pet-friendly setup can be discussed"],
    ["Nature & rose-farm walks", "Explore local plants, birds and, in season, Pushkar’s rose fields.", "Seasonal · guided on request", "Route suitability confirmed for each pet"],
    ["Village interaction", "A respectful introduction to everyday rural life and local context.", "On request", "Pet suitability depends on route"],
  ] as const,
  cultural: [
    ["Rebari Trails", "Pastoral desert-life interpretation, local storytelling and community context."],
    ["Folk Evenings", "Kalbeliya, dhol, nagada, music and dance may be arranged on request."],
    ["Sacred Paths of Pushkar", "A considered visit to the lake, ghats, Brahma Temple, sacred lanes and market."],
  ] as const,
  images: [
    { src: "/images/stays/maru-retreat-farmstay/pet-playing-hero.png", source: "original Petstaycation hero", category: "Pet-friendly retreat", alt: "Two dogs playing together beside a private countryside farmstay." },
    { src: "/images/stays/maru-retreat-farmstay/gallery-1.png", source: "owned property photo", category: "Bedroom", alt: "Private villa bedroom with a king-size stone bed and colourful handworked textiles." },
    { src: "/images/stays/maru-retreat-farmstay/gallery-2.png", source: "owned property photo", category: "Bedroom", alt: "Earth-finished private bedroom with a stone bed, wall niches and natural textures." },
    { src: "/images/stays/maru-retreat-farmstay/gallery-3.png", source: "gallery-3.png", category: "Private Pool", alt: "Private plunge pool beside a shaded veranda overlooking open farmland." },
    { src: "/images/stays/maru-retreat-farmstay/gallery-4.png", source: "gallery-4.png", category: "Interiors", alt: "Hand-finished villa sitting room with woven chairs and illuminated wall niches." },
    { src: "/images/stays/maru-retreat-farmstay/gallery-5.png", source: "gallery-5.png", category: "Interiors", alt: "Window daybed framed by traditional textiles inside a private villa." },
    { src: "/images/stays/maru-retreat-farmstay/hero.png", source: "owned property photo", category: "The retreat", alt: "Earth-finished private farmstay villa surrounded by green countryside." },
  ] satisfies MaruImage[],
  faqs: [
    ["Is Maru Retreat pet-friendly?", "Yes. Companion animals are welcome. Share each pet’s type, breed, size and needs when enquiring so the stay can be prepared thoughtfully."],
    ["What stay options are available?", "The retreat offers two private pool villas. We will recommend the best available arrangement for your dates and group."],
    ["Does each villa have a private pool?", "Yes. Each villa is paired with a private plunge pool."],
    ["Can both villas be booked together?", "A two-villa booking can be requested. The degree of exclusivity, capacity and visitor conditions are confirmed with availability."],
    ["How many guests can stay?", "Final occupancy and extra-bed arrangements are confirmed for your group during the direct enquiry."],
    ["Is food available?", "Yes. Fresh, seasonal meals can be prepared around guest preferences, using farm and nearby local produce where available."],
    ["Can guests cook?", "Kitchen or outdoor traditional chulha access may be requested in advance."],
    ["Is the farm enclosed?", "Boundary and off-leash suitability are confirmed during booking; pets should remain supervised around working farm areas."],
    ["Is parking and Wi-Fi available?", "Yes. The current public listing includes free on-site parking and Wi-Fi."],
    ["Are farm experiences available year-round?", "Activities vary with season, crops, weather and farm conditions. Advance reservation is recommended."],
  ] as const,
} as const;
