"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

interface FormData {
  propertyName: string;
  ownerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  city: string;
  state: string;
  propertyType: string;
  petPolicy: string;
  numRooms: string;
  pricePerNight: string;
  description: string;
}

export default function PropertyListingForm() {
  const [form, setForm] = useState<FormData>({
    propertyName: "",
    ownerName: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    city: "",
    state: "",
    propertyType: "",
    petPolicy: "",
    numRooms: "",
    pricePerNight: "",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.propertyName.trim()) newErrors.propertyName = "Required";
    if (!form.ownerName.trim()) newErrors.ownerName = "Required";
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = "Required";
    else if (!/^\d{10}$/.test(form.mobileNumber.replace(/\s/g, "")))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    if (!form.whatsappNumber.trim()) newErrors.whatsappNumber = "Required";
    else if (!/^\d{10}$/.test(form.whatsappNumber.replace(/\s/g, "")))
      newErrors.whatsappNumber = "Enter a valid 10-digit WhatsApp number";
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.state.trim()) newErrors.state = "Required";
    if (!form.propertyType.trim()) newErrors.propertyType = "Required";
    if (!form.petPolicy.trim()) newErrors.petPolicy = "Required";
    if (!form.numRooms.trim()) newErrors.numRooms = "Required";
    else if (parseInt(form.numRooms, 10) <= 0)
      newErrors.numRooms = "Must be at least 1";
    if (!form.pricePerNight.trim()) newErrors.pricePerNight = "Required";
    else if (parseFloat(form.pricePerNight) <= 0)
      newErrors.pricePerNight = "Must be greater than 0";
    if (!form.description.trim()) newErrors.description = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Store in localStorage
      const submissions = JSON.parse(localStorage.getItem("propertyListings") || "[]");
      submissions.push({
        ...form,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("propertyListings", JSON.stringify(submissions));

      // Build WhatsApp message
      const message = encodeURIComponent(
        `New Property Listing Submission%Property Name: ${form.propertyName}%Owner Name: ${form.ownerName}%Mobile: ${form.mobileNumber}%WhatsApp: ${form.whatsappNumber}%Email: ${form.email}%City: ${form.city}%State: ${form.state}%Property Type: ${form.propertyType}%Rooms: ${form.numRooms}%Price Per Night: ₹${form.pricePerNight}%Pet Policy: ${form.petPolicy}%Description: ${form.description}`
      );

      // Open WhatsApp in new tab
      window.open(`https://wa.me/919999999999?text=${message}`, '_blank');

      // Show success message
      setSuccess(true);
      // Reset form after a short delay
      setTimeout(() => {
        setForm({
          propertyName: "",
          ownerName: "",
          mobileNumber: "",
          whatsappNumber: "",
          email: "",
          city: "",
          state: "",
          propertyType: "",
          petPolicy: "",
          numRooms: "",
          pricePerNight: "",
          description: "",
        });
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        {success ? (
          <div className="mb-4 p-4 bg-forest-green/10 text-forest-green rounded">
            Thank you! Your property has been listed for review. We will get back to you shortly.
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Property Name
              </label>
              <input
                type="text"
                value={form.propertyName}
                onChange={(e) => setForm({ ...form, propertyName: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green ${
                  errors.propertyName ? "border-red-500" : ""
                }`}
                placeholder="Enter property name"
                required
              />
              {errors.propertyName && (
                <p className="mt-1 text-sm text-red-600">{errors.propertyName}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Owner Name
              </label>
              <input
                type="text"
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green ${
                  errors.ownerName ? "border-red-500" : ""
                }`}
                placeholder="Enter owner name"
                required
              />
              {errors.ownerName && (
                <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile Number
              </label>
              <input
                type="tel"
                value={form.mobileNumber}
                onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green ${
                  errors.mobileNumber ? "border-red-500" : ""
                }`}
                placeholder="Enter your 10-digit mobile number"
                required
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.whatsappNumber ? "border-red-500" : ""
                }`}
                placeholder="Enter your 10-digit WhatsApp number"
                required
              />
              {errors.whatsappNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email address"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.city ? "border-red-500" : ""
                }`}
                placeholder="Enter your city"
                required
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                State
              </label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.state ? "border-red-500" : ""
                }`}
                placeholder="Enter state (e.g., Rajasthan)"
                required
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Property Type
              </label>
              <select
                value={form.propertyType}
                onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.propertyType ? "border-red-500" : ""
                }`}
                required
              >
                <option value="">Select property type</option>
                <option value="Resort">Resort</option>
                <option value="Heritage Haveli">Heritage Haveli</option>
                <option value="Desert Camp">Desert Camp</option>
                <option value="Farm Stay">Farm Stay</option>
                <option value="Nature Retreat">Nature Retreat</option>
                <option value="Cottage">Cottage</option>
                <option value="Villa">Villa</option>
                <option value="Other">Other</option>
              </select>
              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Pet Policy
            </label>
            <textarea
              value={form.petPolicy}
              onChange={(e) => setForm({ ...form, petPolicy: e.target.value })}
              className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                errors.petPolicy ? "border-red-500" : ""
              }`}
              rows={4}
              placeholder="Describe your pet policy (e.g., Pet size limits, amenities, etc.)"
              required
            />
            {errors.petPolicy && (
              <p className="mt-1 text-sm text-red-600">{errors.petPolicy}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Rooms
              </label>
              <input
                type="number"
                min="1"
                value={form.numRooms}
                onChange={(e) => setForm({ ...form, numRooms: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.numRooms ? "border-red-500" : ""
                }`}
                placeholder="Enter number of rooms"
                required
              />
              {errors.numRooms && (
                <p className="mt-1 text-sm text-red-600">{errors.numRooms}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Price Per Night (₹)
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={form.pricePerNight}
                onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.pricePerNight ? "border-red-500" : ""
                }`}
                placeholder="Enter price per night"
                required
              />
              {errors.pricePerNight && (
                <p className="mt-1 text-sm text-red-600">{errors.pricePerNight}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                errors.description ? "border-red-500" : ""
              }`}
              rows={6}
              placeholder="Describe your property, amenities, location highlights, etc."
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto"
              disabled={Object.keys(errors).length > 0}
            >
              Submit Property Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}