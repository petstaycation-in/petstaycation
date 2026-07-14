"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import StaysFilter from "@/components/ui/StaysFilter";
import PropertyCard from "@/components/ui/PropertyCard";

interface StaysContentProps {
  properties: Array<any>;
}

export default function StaysContent({ properties }: StaysContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [guestCapacity, setGuestCapacity] = useState(1);
  const [petSize, setPetSize] = useState("All");
  const [sortBy, setSortBy] = useState("priceLowToHigh");

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

      // Guest Capacity filter (property must accommodate at least the selected number)
      const matchesGuestCapacity = property.guestCount >= guestCapacity;

      // Pet Size filter
      const matchesPetSize =
        petSize === "All" || property.petSize === petSize;

      return (
        matchesSearch &&
        matchesPropertyType &&
        matchesPrice &&
        matchesGuestCapacity &&
        matchesPetSize
      );
    })
    // Sort properties
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") {
        return a.pricePerNight - b.pricePerNight;
      } else if (sortBy === "priceHighToLow") {
        return b.pricePerNight - a.pricePerNight;
      } else if (sortBy === "ratingHighToLow") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <>
      <SectionHeading
        title="Pet-Friendly Stays in Rajasthan"
        description="Browse handpicked resorts, cottages, farm stays and nature retreats across Rajasthan that welcome your pets."
      />

      {/* Filters */}
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
      />

      {/* Properties Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 pt-16 pb-20">
        {filteredProperties.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">
            No properties match your filters.
          </p>
        ) : (
          <>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </>
        )}
      </div>
    </>
  );
}