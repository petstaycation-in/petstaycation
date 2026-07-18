import Image from "next/image";

type Property = {
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  guestCount: number;
  bedroomCount: number;
  bathroomCount: number;
  checkIn: string;
  checkOut: string;
};

const quickHighlights = ["Pet Friendly", "Organic Farm", "Horse Riding", "Family Friendly", "Nature Retreat"];

const highlights = [
  ["◌", "Organic orchards"], ["♧", "Pet friendly"], ["♞", "Horse riding"],
  ["◇", "Camel experience"], ["⌁", "Bird watching"], ["◉", "Organic food"],
  ["⌂", "Private rooms"], ["♡", "Family friendly"], ["P", "Free parking"],
  ["⌁", "Wi-Fi"], ["✿", "Garden"], ["↝", "Farm walks"],
  ["△", "Nature trails"], ["◎", "Village experience"], ["☼", "Sunrise views"],
  ["✦", "Stargazing"], ["≈", "Fresh air"], ["↗", "Weekend escape"],
];

const farmExperiences = [
  ["Orchard country", "Walk among olive, date palm, sweet lime, guava and apple ber plantations—each season bringing a different colour, scent and harvest."],
  ["From soil to season", "Discover seasonal crops, organic vegetables and traditional farming practices shaped by the climate and rhythms of rural Rajasthan."],
  ["Botanical stories", "Learn about medicinal plants including ashwagandha, alongside sandalwood trees and native Rajasthan plantation chosen for resilience and biodiversity."],
  ["Harvest moments", "Join guided farm walks and, when the crop is ready, experience the simple pleasure of picking fruit directly from the orchard."],
];

const animals = [
  ["Indigenous cattle", "Meet Gir, Sahiwal, Rathi and Tharparkar cows and learn how native breeds support the farm’s natural cycle."],
  ["Marwari horses", "Spend time around Rajasthan’s graceful Marwari horses, with guided riding experiences subject to weather and suitability."],
  ["Camel & farm life", "A gentle introduction to the farm camel and the long relationship between Rajasthan’s communities and animals."],
  ["Small ecosystems", "Pause by the fish pond, discover Kadaknath poultry, observe bee keeping and listen for the many birds that share the farm."],
];

const activities = ["Horse riding", "Camel ride", "Nature walks", "Farm walks", "Bird watching", "Photography", "Village tour", "Cycling", "Kids’ activities", "Organic farming", "Animal feeding", "Stargazing", "Sunrise walks", "Sunset walks", "Digital detox", "Family picnic", "Outdoor games"];
const audiences = ["Families", "Couples", "Pet parents", "Nature lovers", "Photographers", "Weekend travellers", "Corporate retreats", "BITS visitors", "CEERI visitors", "Children", "International guests", "Slow travellers"];
const amenities = ["Wi-Fi", "Free parking", "Air-conditioned rooms", "Private bathroom", "Garden", "Terrace", "Workspace", "Pet friendly", "Family rooms", "Organic farm", "Horse riding", "Nature walks", "Outdoor seating", "Farm tours"];
const nearby = ["Regional town", "Local markets", "Village experiences", "Nearby temples", "Countryside roads"];
const faqs = [
  ["Is Organic Orchard Retreat pet friendly?", "Yes. Pets are welcomed, with generous outdoor walking areas and natural surroundings. Guests are asked to supervise pets around farm animals and shared spaces."],
  ["Can children stay?", "Absolutely. The retreat is well suited to families, with outdoor discovery, farm experiences and space for children to reconnect with nature."],
  ["Is parking available?", "Yes, complimentary on-site parking is available for staying guests."],
  ["Are meals available?", "Fresh vegetarian meals built around seasonal produce and local flavours can be arranged. Share dietary preferences before arrival."],
  ["Is Wi-Fi available?", "Yes. Wi-Fi is available, although many guests choose to slow down and enjoy a gentler digital detox."],
  ["What activities are available?", "Farm and nature walks, bird watching, photography, animal interactions and seasonal harvest experiences are among the highlights. Some activities depend on weather and availability."],
  ["What is the best season to visit?", "October to March offers especially pleasant outdoor weather. Every farming season has a different character, so ask what is growing before your stay."],
  ["Is horse riding available?", "Guided horse riding may be arranged subject to weather, rider suitability and the animals’ wellbeing."],
  ["Can I bring multiple pets?", "Multiple pets may be possible. Contact the host before booking so the team can confirm the most comfortable room and arrangements."],
];

const image = {
  hero: "/images/stays/organic-orchard-retreat/hero.png",
  orchard: "/images/stays/organic-orchard-retreat/orchards.png",
  room: "/images/stays/organic-orchard-retreat/room.png",
  pet: "/images/stays/organic-orchard-retreat/dogs-playing-farmstay.png",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#a88342]">{children}</p>;
}

function Heading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <h2 className={`font-['Libre_Baskerville'] text-3xl leading-tight sm:text-4xl ${light ? "text-[#fffaf0]" : "text-[#18392b]"}`}>{children}</h2>;
}

function CTA({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return <a href="#booking" className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${secondary ? "border border-white/40 bg-white/10 text-white hover:bg-white/20" : "bg-[#e4c27d] text-[#173528] hover:bg-[#f0d59b]"}`}>{children}</a>;
}

export default function OrganicOrchardDetail({ property }: { property: Property }) {
  return (
    <article className="overflow-x-hidden bg-[#f7f2e8] text-[#31453b]">
      <section className="relative min-h-[760px] overflow-hidden sm:min-h-[820px]">
        <Image src={image.hero} alt="Organic Orchard Retreat amid orchards at sunrise" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,34,25,.9)_0%,rgba(12,34,25,.54)_52%,rgba(12,34,25,.12)_100%)]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-16 pt-28 sm:min-h-[820px] sm:px-8 sm:pb-24 lg:px-10">
          <div className="min-w-0 w-full max-w-[calc(100vw-2.5rem)] animate-[fadeIn_.7s_ease-out] sm:max-w-3xl">
            <p className="mb-6 max-w-[22rem] text-[10px] font-semibold uppercase leading-5 tracking-[.22em] text-[#efd99f] sm:max-w-none sm:text-xs sm:tracking-[.32em]">A private working organic farm in Rajasthan</p>
            <h1 className="font-['Libre_Baskerville'] text-[2.65rem] leading-[1.02] text-white sm:text-6xl lg:text-7xl"><span className="block sm:inline">Organic</span><span className="block sm:inline"> Orchard</span><span className="block">Retreat</span></h1>
            <p className="mt-5 text-xl font-light text-white/90 sm:text-2xl">A private organic farm stay</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90"><span>★ {property.rating.toFixed(1)}</span><span>{property.location}</span><span>Up to {property.guestCount} guests</span></div>
            <div className="mt-6 grid w-[calc(100vw-2.5rem)] max-w-[22rem] grid-cols-2 gap-2 sm:flex sm:w-full sm:max-w-md sm:flex-wrap">{quickHighlights.map((item) => <span key={item} className="rounded-full border border-white/25 bg-white/10 px-3 py-2 text-center text-[11px] font-medium text-white backdrop-blur-md sm:px-4 sm:text-xs">{item}</span>)}</div>
            <div className="mt-9 grid w-[calc(100vw-2.5rem)] max-w-[22rem] grid-cols-2 gap-3 sm:flex sm:w-full sm:max-w-none sm:flex-wrap"><CTA>Book your stay</CTA><CTA secondary>Check availability</CTA></div>
          </div>
        </div>
      </section>

      <nav aria-label="Property sections" className="sticky top-0 z-30 hidden border-b border-[#dcd1bb] bg-[#f7f2e8]/95 backdrop-blur lg:block"><div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-10 py-4 text-xs font-semibold uppercase tracking-[.16em] text-[#385344]"><a href="#story">The retreat</a><a href="#farm">The farm</a><a href="#animals">Animals</a><a href="#pets">Pet friendly</a><a href="#dining">Dining</a><a href="#amenities">Amenities</a><a href="#booking">Book</a></div></nav>

      <section id="story" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_.9fr] lg:px-10">
        <div><Eyebrow>Return to a slower rhythm</Eyebrow><Heading>Space to breathe. Time to notice.</Heading><p className="mt-7 max-w-2xl text-lg leading-8 text-[#52645b]">Set inside a working organic farm, Organic Orchard Retreat is less about escaping life and more about returning to its essentials. Wake to birdsong, walk beneath fruit trees and let mornings unfold without an itinerary. The air feels cleaner, the silences longer and the pace entirely your own.</p><p className="mt-5 max-w-2xl leading-8 text-[#64736b]">Come for a quiet weekend, a family celebration or a restorative digital detox. There is room for photography, unhurried conversations and meaningful farm experiences—and, importantly, space for your pet to be part of the holiday rather than left behind.</p></div>
        <div className="grid grid-cols-2 gap-3 self-end">{[[property.guestCount,"guests"],[property.bedroomCount,"private rooms"],[property.bathroomCount,"bathrooms"],["365","days of nature"]].map(([value,label]) => <div key={label} className="rounded-[1.75rem] border border-[#ded3bd] bg-white/70 p-6 shadow-[0_18px_45px_-32px_rgba(24,57,43,.45)]"><strong className="font-['Libre_Baskerville'] text-3xl text-[#204f3a]">{value}</strong><p className="mt-2 text-xs uppercase tracking-[.17em] text-[#758078]">{label}</p></div>)}</div>
      </section>

      <section className="border-y border-[#ded3bd] bg-[#efe6d5] px-5 py-20 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><Eyebrow>What awaits</Eyebrow><Heading>Rooted in the landscape</Heading><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{highlights.map(([icon,label]) => <div key={label} className="group rounded-[1.5rem] border border-[#d8cbb2] bg-[#faf6ee] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#9f824d]"><span className="text-2xl text-[#9f824d]">{icon}</span><p className="mt-5 text-sm font-semibold text-[#294636]">{label}</p></div>)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:px-10"><div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem]"><Image src={image.room} alt="Calm private room with orchard view" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div><div className="self-center"><Eyebrow>Your room</Eyebrow><Heading>Simple comfort, framed by green.</Heading><p className="mt-6 text-lg leading-8 text-[#5d6d64]">Private, air-conditioned rooms offer comfortable bedding, crisp linen and an attached bathroom, with natural ventilation and garden or farm views keeping you connected to the landscape.</p><div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">{["Attached bathroom","Garden views","Air conditioning","Workspace","Balcony","Natural ventilation","Comfortable bedding","Clean linen","Family stay","Couple friendly"].map(item => <p key={item} className="border-b border-[#ddd2bd] pb-3">✓ {item}</p>)}</div></div></section>

      <section id="farm" className="bg-[#173a2b] py-20 text-[#dbe6dc] sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div className="lg:sticky lg:top-24 lg:self-start"><Eyebrow>The farm experience</Eyebrow><Heading light>A living landscape, not a backdrop.</Heading><p className="mt-6 leading-8 text-white/65">The retreat changes with the season. What is flowering, fruiting or being planted becomes part of each visit.</p></div><div className="relative min-h-[480px] overflow-hidden rounded-[2.5rem]"><Image src={image.orchard} alt="Organic fruit orchard and seasonal vegetable beds" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" /></div></div><div className="mt-14 grid gap-4 md:grid-cols-2">{farmExperiences.map(([title,text],i) => <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[.06] p-7 backdrop-blur"><span className="text-xs text-[#e4c27d]">0{i+1}</span><h3 className="mt-5 font-['Libre_Baskerville'] text-2xl text-white">{title}</h3><p className="mt-4 leading-7 text-white/65">{text}</p></div>)}</div></div></section>

      <section id="animals" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><Eyebrow>Meet our animals</Eyebrow><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><Heading>Farm residents with stories of their own.</Heading><p className="max-w-md leading-7 text-[#617168]">Calm, guided encounters create respect for the animals and a closer understanding of regenerative farm life.</p></div><div className="mt-12 grid gap-4 md:grid-cols-2">{animals.map(([title,text]) => <div key={title} className="rounded-[2rem] border border-[#ddd2bd] bg-white/60 p-8"><h3 className="font-['Libre_Baskerville'] text-2xl text-[#214936]">{title}</h3><p className="mt-4 leading-7 text-[#607067]">{text}</p></div>)}</div></section>

      <section className="bg-[#eadfc9] py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Eyebrow>Things to do</Eyebrow><Heading>Fill the day—or leave it beautifully empty.</Heading><div className="mt-10 flex flex-wrap gap-3">{activities.map(item => <span key={item} className="rounded-full border border-[#cdbd9e] bg-[#f8f2e7] px-5 py-3 text-sm text-[#345141]">{item}</span>)}</div><p className="mt-7 text-sm text-[#68766e]">Experiences are seasonal and may vary with weather, animal wellbeing and farm activity. Please confirm favourites before arrival.</p></div></section>

      <section id="pets" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:px-10"><div className="self-center"><Eyebrow>Pets belong on the guest list</Eyebrow><Heading>A holiday that keeps the whole family together.</Heading><p className="mt-7 text-lg leading-8 text-[#57685f]">At Organic Orchard Retreat, pet-friendly means more than allowing pets inside a room. It means open skies, fresh air and generous walking spaces where shared routines become the best part of the day.</p><p className="mt-5 leading-8 text-[#64746b]">The natural setting creates a calmer, less confined escape for pets and people alike. Thoughtful supervision around livestock and common areas keeps every guest comfortable, so your holiday feels relaxed from arrival to the journey home.</p></div><div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem]"><Image src={image.pet} alt="Family walking with their dog beside the farm paddock" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div></section>

      <section id="dining" className="bg-[#5b321f] py-20 text-[#f7ead9] sm:py-28"><div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10"><div><Eyebrow>Farm-to-table dining</Eyebrow><Heading light>Food with a clear sense of place.</Heading><p className="mt-7 text-lg leading-8 text-white/70">Meals celebrate what the farm and local season offer: organic produce, freshly picked vegetables and vegetarian cooking grounded in familiar regional flavours. Healthy preparations keep ingredients at the centre, turning each table into an extension of the orchard.</p></div><div><Eyebrow>Sustainability</Eyebrow><h3 className="font-['Libre_Baskerville'] text-2xl text-white">Care for the soil. Respect for the season.</h3><p className="mt-5 leading-8 text-white/65">Organic methods, natural manure derived from cow dung and cow urine, traditional agriculture and low-chemical cultivation support healthier soil. Water conservation, native planting, bee keeping and mixed habitats help protect biodiversity while responsible tourism keeps the farm’s living ecosystem in balance.</p></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><Eyebrow>Perfect for</Eyebrow><Heading>Every reason to step away.</Heading><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{audiences.map(item => <div key={item} className="rounded-[1.5rem] border border-[#ddd2bd] bg-white/65 p-6 text-sm font-semibold text-[#31503f]">{item}</div>)}</div></section>

      <section id="amenities" className="border-y border-[#ded3bd] bg-[#efe7d8] py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-2"><div><Eyebrow>Amenities</Eyebrow><Heading>Everything you need, nothing you don’t.</Heading><div className="mt-9 grid grid-cols-2 gap-x-8">{amenities.map(item => <p key={item} className="border-b border-[#d6c9b0] py-3 text-sm">✓ {item}</p>)}</div></div><div><Eyebrow>Nearby</Eyebrow><Heading>Pilani, within easy reach.</Heading><div className="mt-9 space-y-3">{nearby.map((item,i) => <div key={item} className="flex items-center justify-between rounded-2xl bg-[#faf6ee] px-5 py-4"><span>{item}</span><span className="text-xs text-[#a1844c]">0{i+1}</span></div>)}</div></div></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><Eyebrow>Gallery stories</Eyebrow><Heading>One retreat, many ways to remember it.</Heading><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[image.hero,"The retreat", "Hero · Nature · Sunrise"],[image.room,"Private rooms","Rooms · Garden views"],[image.orchard,"Inside the orchards","Orchards · Farm walks · Dining"],[image.pet,"Together outdoors","Animals · Pets · Activities"]].map(([src,title,label],i) => <figure key={title} className={`group relative overflow-hidden rounded-[2rem] ${i === 0 ? "sm:col-span-2" : ""} h-[360px]`}><Image src={src} alt={title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /><figcaption className="absolute bottom-0 p-6 text-white"><p className="font-['Libre_Baskerville'] text-2xl">{title}</p><p className="mt-2 text-xs uppercase tracking-[.16em] text-white/70">{label}</p></figcaption></figure>)}</div></section>

      <section className="bg-[#183a2c] py-20 text-white sm:py-28"><div className="mx-auto max-w-4xl px-5 sm:px-8"><div className="text-center"><Eyebrow>Good to know</Eyebrow><Heading light>Questions before the countryside calls.</Heading></div><div className="mt-12 divide-y divide-white/10 border-y border-white/10">{faqs.map(([q,a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold"><span>{q}</span><span className="text-[#e4c27d] transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 leading-7 text-white/65">{a}</p></details>)}</div></div></section>

      <section id="booking" className="bg-[#f7f2e8] py-20 sm:py-28"><div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#e8dbc2] shadow-[0_35px_80px_-45px_rgba(27,58,44,.55)] lg:grid-cols-[1.1fr_.9fr]"><div className="p-8 sm:p-12"><Eyebrow>Your orchard stay</Eyebrow><Heading>Make space for a slower weekend.</Heading><p className="mt-5 max-w-lg leading-7 text-[#5c6b63]">Tell us your dates, group size and how many pets are travelling. Our team will help confirm the best available arrangement.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://wa.me/919649088717?text=I%20would%20like%20to%20check%20availability%20at%20Organic%20Orchard%20Retreat" className="rounded-full bg-[#173a2b] px-6 py-3 text-sm font-semibold text-white">WhatsApp</a><a href="tel:+919649088717" className="rounded-full border border-[#173a2b]/30 px-6 py-3 text-sm font-semibold text-[#173a2b]">Call now</a></div></div><div className="bg-[#173a2b] p-8 text-white sm:p-12"><div className="flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-white/55">From</p><p className="mt-2 font-['Libre_Baskerville'] text-4xl">₹{property.pricePerNight.toLocaleString("en-IN")}</p><p className="mt-1 text-sm text-white/55">per night</p></div><span className="text-sm text-[#e4c27d]">★ {property.rating.toFixed(1)}</span></div><div className="mt-9 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 p-4"><span className="text-xs text-white/50">Check in</span><p className="mt-1 font-semibold">{property.checkIn}</p></div><div className="rounded-2xl border border-white/10 p-4"><span className="text-xs text-white/50">Check out</span><p className="mt-1 font-semibold">{property.checkOut}</p></div></div><a href="https://wa.me/919649088717?text=I%20would%20like%20to%20reserve%20Organic%20Orchard%20Retreat" className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-[#e4c27d] px-5 font-semibold text-[#173a2b]">Check availability</a><p className="mt-4 text-center text-xs text-white/45">Availability and activities are confirmed personally.</p></div></div></section>

      <div className="fixed bottom-4 left-4 z-40 flex w-[calc(100vw-2rem)] max-w-[22.5rem] items-center justify-between gap-3 rounded-full border border-white/15 bg-[#173a2b]/95 p-2 pl-5 text-white shadow-2xl backdrop-blur lg:hidden"><div className="min-w-0"><p className="text-[9px] uppercase tracking-[.13em] text-white/55">From ₹{property.pricePerNight.toLocaleString("en-IN")}</p><p className="truncate text-xs font-semibold sm:text-sm">Organic Orchard Retreat</p></div><a href="#booking" className="shrink-0 rounded-full bg-[#e4c27d] px-4 py-3 text-sm font-semibold text-[#173a2b]">Book now</a></div>
    </article>
  );
}
