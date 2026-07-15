"use client";

import { properties } from "@/data/properties";

interface StaysFilterProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  priceMin: number;
  setPriceMin: (value: number) => void;
  priceMax: number;
  setPriceMax: (value: number) => void;
  guestCapacity: number;
  setGuestCapacity: (value: number) => void;
  petSize: string;
  setPetSize: (value: string) => void;
  bedroomCount: number;
  setBedroomCount: (value: number) => void;
  bathroomCount: number;
  setBathroomCount: (value: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function StaysFilter({
  searchQuery,
  setSearchQuery,
  propertyType,
  setPropertyType,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  guestCapacity,
  setGuestCapacity,
  petSize,
  setPetSize,
  bedroomCount,
  setBedroomCount,
  bathroomCount,
  setBathroomCount,
  sortBy,
  setSortBy,
}: StaysFilterProps) {
  // Get unique property types from the data
  const propertyTypeOptions = ["All", ...new Set(properties.map(p => p.propertyType))];

  // Guest capacity options: we'll use numbers 1 to 6+
  const guestCapacityOptions = [1, 2, 3, 4, 5, 6];

  // Bedroom count options: we'll use numbers 1 to 6+
  const bedroomCountOptions = [1, 2, 3, 4, 5, 6];

  // Bathroom count options: we'll use numbers 1 to 6+
  const bathroomCountOptions = [1, 2, 3, 4, 5, 6];

  // Pet size options
  const petSizeOptions = ["All", "Small", "Medium", "Large"];

  // Sort options
  const sortOptions = [
    { value: "priceLowToHigh", label: "Price Low to High" },
    { value: "priceHighToLow", label: "Price High to Low" },
    { value: "ratingHighToLow", label: "Highest Rated" },
  ];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(135deg,_#fdfaf3_0%,_#ffffff_100%)] shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
      <div className="border-b border-slate-200/80 bg-white/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Filter your stay</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">Find the right retreat for your itinerary</h3>
          </div>
          <p className="text-sm text-slate-600">A few thoughtful choices, then the best matches appear.</p>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search by name or destination
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Enter property name or city"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">Property type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {propertyTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4 md:col-span-2 xl:col-span-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">Budget</label>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Min</label>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value === "" ? 0 : Number(e.target.value))}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Max</label>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value === "" ? 0 : Number(e.target.value))}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="1000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">Guest capacity</label>
              <select
                value={guestCapacity}
                onChange={(e) => setGuestCapacity(Number(e.target.value))}
                className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {guestCapacityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 6 ? "6+" : option.toString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">Bedrooms</label>
              <select
                value={bedroomCount}
                onChange={(e) => setBedroomCount(Number(e.target.value))}
                className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="0">Any</option>
                {bedroomCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 6 ? "6+" : option.toString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">Bathrooms</label>
              <select
                value={bathroomCount}
                onChange={(e) => setBathroomCount(Number(e.target.value))}
                className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="0">Any</option>
                {bathroomCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 6 ? "6+" : option.toString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">Pet size</label>
              <select
                value={petSize}
                onChange={(e) => setPetSize(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {petSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[1.25rem] border border-slate-200 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:min-w-[220px]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSearchQuery("");
                setPropertyType("All");
                setPriceMin(0);
                setPriceMax(0);
                setGuestCapacity(1);
                setPetSize("All");
                setBedroomCount(0);
                setBathroomCount(0);
                setSortBy("priceLowToHigh");
              }}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}