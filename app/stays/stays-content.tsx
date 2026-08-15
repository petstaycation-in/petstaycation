"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import StaysFilter from "@/components/ui/StaysFilter";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property as CommercialProperty } from "@/data/properties";

interface StaysContentProps {
  properties: Array<CommercialProperty>;
}

export default function StaysContent({ properties }: StaysContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [guestCapacity, setGuestCapacity] = useState(1);
  const [petSize, setPetSize] = useState("All");
  const [bedroomCount, setBedroomCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count += 1;
    if (propertyType !== "All") count += 1;
    if (priceMin > 0) count += 1;
    if (priceMax > 0) count += 1;
    if (guestCapacity > 1) count += 1;
    if (petSize !== "All") count += 1;
    if (bedroomCount > 0) count += 1;
    if (bathroomCount > 0) count += 1;
    if (sortBy !== "recommended") count += 1;
    return count;
  }, [bathroomCount, bedroomCount, guestCapacity, petSize, priceMax, priceMin, propertyType, searchQuery, sortBy]);

  // Filter properties based on search and filters
  const filteredProperties = properties
    .filter((property) => {
      // Search by title or location (case insensitive)
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Property Type filter
      const matchesPropertyType =
        propertyType === "All" || property.propertyType === propertyType;

      // Price filter
      const matchesPrice =
        (priceMin === 0 || property.pricePerNight >= priceMin) &&
        (priceMax === 0 || property.pricePerNight <= priceMax);

      // A zero capacity means "not yet published", not "no guests allowed".
      // Keep those properties visible in the default browse state, but do not
      // promise that they satisfy an explicitly selected larger group size.
      const matchesGuestCapacity =
        property.guestCount >= guestCapacity ||
        (property.guestCount === 0 && guestCapacity === 1);

      // Pet Size filter
      const matchesPetSize =
        petSize === "All" || property.petSize === petSize;

      // Bedroom Count filter (0 means any)
      const matchesBedroomCount =
        bedroomCount === 0 || property.bedroomCount >= bedroomCount;

      // Bathroom Count filter (0 means any)
      const matchesBathroomCount =
        bathroomCount === 0 || property.bathroomCount >= bathroomCount;

      return (
        matchesSearch &&
        matchesPropertyType &&
        matchesPrice &&
        matchesGuestCapacity &&
        matchesPetSize &&
        matchesBedroomCount &&
        matchesBathroomCount
      );
    })
    // Sort properties
    .sort((a, b) => {
      if (sortBy === "recommended") {
        return (b.priorityScore ?? 0) - (a.priorityScore ?? 0);
      } else if (sortBy === "priceLowToHigh") {
        return a.pricePerNight - b.pricePerNight;
      } else if (sortBy === "priceHighToLow") {
        return b.pricePerNight - a.pricePerNight;
      } else if (sortBy === "ratingHighToLow") {
        return b.rating - a.rating;
      }
      return 0;
    });

  const featuredProperties = filteredProperties.slice(0, 3);
  const listingProperties = filteredProperties.length > 3 ? filteredProperties.slice(3) : filteredProperties;

  return (
    <>
      <SectionHeading
        title="Pet-Friendly Stays in Rajasthan"
        description="Browse handpicked resorts, cottages, farm stays and nature retreats across Rajasthan that welcome your pets."
      />

      <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(110,142,109,0.18),_transparent_45%),linear-gradient(135deg,_#f7f2e8_0%,_#ffffff_100%)] p-6 shadow-[0_24px_70px_-40px_rgba(21,29,40,0.45)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Curated escapes for pets and people</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-slate-900 sm:text-4xl">
            Discover calm stays with space to roam, rest, and reconnect.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            From villa-style retreats to farm stays and boutique resorts, every listing is selected for comfort, privacy, and easy pet-friendly hosting.
          </p>
        </div>

        <div className="lg:sticky lg:top-24 lg:w-[320px] lg:self-start">
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Refine search</p>
            <p className="mt-2 text-sm text-slate-600">
              Tailor your stay by pet size, room count, and budget without losing the big picture.
            </p>
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="mt-4 w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {showFilters ? "Hide filters" : `Open filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`}
            </button>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setPropertyType("All");
                  setPriceMin(0);
                  setPriceMax(0);
                  setGuestCapacity(1);
                  setPetSize("All");
                  setBedroomCount(0);
                  setBathroomCount(0);
                  setSortBy("recommended");
                }}
                className="mt-3 text-sm font-medium text-primary"
              >
                Clear all selections
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(135deg,_#f7f2e8_0%,_#ffffff_100%)] p-5 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Browse available stays</p>
            <p className="mt-1 text-sm text-slate-600">
              {filteredProperties.length} stay{filteredProperties.length === 1 ? "" : "s"} ready to explore
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
            “The best trips are the ones where your whole pack can arrive together — and settle in slowly.”
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Plan with ease</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Book the stay that fits your pace, your pet, and your season.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Every listing includes the essentials for a calm arrival, a comfortable stay, and easy future planning — from pet-friendly layouts to thoughtful amenities and flexible booking guidance.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Book this stay
          </a>
        </div>
      </div>

      {featuredProperties.length > 0 && filteredProperties.length > 3 && (
        <section className="mb-8 rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Featured stays</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">The first three picks for your next escape</h3>
            </div>
            <p className="text-sm text-slate-600">Handpicked for comfort, charm, and relaxed pet-friendly living.</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <a
                key={property.id}
                href={`/stays/${property.id}`}
                className="group relative overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-slate-50 shadow-[0_18px_40px_-28px_rgba(21,29,40,0.42)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(21,29,40,0.5)]"
              >
                <div className="absolute inset-x-0 top-0 z-10 flex justify-between p-4">
                  <span className="rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-700 backdrop-blur-sm">
                    Signature stays
                  </span>
                  <span className="rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                    Featured
                  </span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.imageUrl}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/5 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{property.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{property.location}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                      Starting from ₹{property.pricePerNight.toLocaleString("en-IN")}/night
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                    <span>Pet-friendly retreat</span>
                    <span className="text-primary">View stay →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {showFilters && (
        <div className="mb-6">
          <StaysFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            guestCapacity={guestCapacity}
            setGuestCapacity={setGuestCapacity}
            petSize={petSize}
            setPetSize={setPetSize}
            sortBy={sortBy}
            setSortBy={setSortBy}
            bedroomCount={bedroomCount}
            setBedroomCount={setBedroomCount}
            bathroomCount={bathroomCount}
            setBathroomCount={setBathroomCount}
          />
        </div>
      )}

      {/* Properties Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-20">
        {listingProperties.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">
            No properties match your filters.
          </p>
        ) : (
          <>
            {listingProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
