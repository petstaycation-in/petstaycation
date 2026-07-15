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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Search by name or location
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
              placeholder="Enter property name or city"
            />
          </div>

          {/* Filters Row */}
          <div className="gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Property Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
              >
                {propertyTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Price Range (₹)
              </label>
              <div className="gap-3 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Min
                  </label>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value === "" ? 0 : Number(e.target.value))}
                    className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Max
                  </label>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value === "" ? 0 : Number(e.target.value))}
                    className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
                    placeholder="1000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Guest Capacity */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Guest Capacity
              </label>
              <select
                value={guestCapacity}
                onChange={(e) => setGuestCapacity(Number(e.target.value))}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
              >
                {guestCapacityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 6 ? "6+" : option.toString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedroom Count */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Bedroom Count
              </label>
              <select
                value={bedroomCount}
                onChange={(e) => setBedroomCount(Number(e.target.value))}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
              >
                <option value="0">Any</option>
                {bedroomCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 6 ? "6+" : option.toString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Bathroom Count */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Bathroom Count
              </label>
              <select
                value={bathroomCount}
                onChange={(e) => setBathroomCount(Number(e.target.value))}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
              >
                <option value="0">Any</option>
                {bathroomCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 6 ? "6+" : option.toString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Pet Size Allowed */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Pet Size Allowed
              </label>
              <select
                value={petSize}
                onChange={(e) => setPetSize(e.target.value)}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
              >
                {petSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green`}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end pt-4">
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
              className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}