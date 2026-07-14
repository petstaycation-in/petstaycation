"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

interface FormData {
  guestName: string;
  mobileNumber: string;
  email: string;
  city: string;
  checkInDate: string;
  checkOutDate: string;
  adults: string;
  children: string;
  petType: string;
  numPets: string;
  petSize: string;
  specialRequirements: string;
}

interface BookingInquiryFormProps {
  stayTitle: string;
}

export default function BookingInquiryForm({ stayTitle }: BookingInquiryFormProps) {
  const [form, setForm] = useState<FormData>({
    guestName: "",
    mobileNumber: "",
    email: "",
    city: "",
    checkInDate: "",
    checkOutDate: "",
    adults: "",
    children: "",
    petType: "",
    numPets: "",
    petSize: "",
    specialRequirements: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.guestName.trim()) newErrors.guestName = "Required";
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = "Required";
    else if (!/^\d{10}$/.test(form.mobileNumber.replace(/\s/g, "")))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.checkInDate) newErrors.checkInDate = "Required";
    if (!form.checkOutDate) newErrors.checkOutDate = "Required";
    if (!form.adults.trim()) newErrors.adults = "Required";
    else if (parseInt(form.adults, 10) <= 0)
      newErrors.adults = "Must be at least 1";
    if (!form.children.trim()) newErrors.children = "Required";
    else if (parseInt(form.children, 10) < 0)
      newErrors.children = "Cannot be negative";
    if (!form.petType.trim()) newErrors.petType = "Required";
    if (!form.numPets.trim()) newErrors.numPets = "Required";
    else if (parseInt(form.numPets, 10) < 0)
      newErrors.numPets = "Cannot be negative";
    if (!form.petSize.trim()) newErrors.petSize = "Required";
    // specialRequirements optional
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Store in localStorage
      const submissions = JSON.parse(localStorage.getItem("bookingInquiries") || "[]");
      submissions.push({
        ...form,
        timestamp: new Date().toISOString(),
        stayTitle: stayTitle
      });
      localStorage.setItem("bookingInquiries", JSON.stringify(submissions));

      // Build WhatsApp message
      const message = encodeURIComponent(
        `Pet Staycation Booking Inquiry%nGuest Name: ${form.guestName}%nMobile: ${form.mobileNumber}%nEmail: ${form.email}%nCity: ${form.city}%nPet Type: ${form.petType}%nCheck-in: ${form.checkInDate}%nCheck-out: ${form.checkOutDate}%nGuests: ${parseInt(form.adults, 10) + parseInt(form.children, 10)}%nSpecial Requirements: ${form.specialRequirements}%nProperty Interested In:%n${stayTitle}`
      );

      // Open WhatsApp in new tab
      window.open(`https://wa.me/919999999999?text=${message}`, '_blank');

      // Show success message
      setSuccess(true);
      // Reset form after a short delay
      setTimeout(() => {
        setForm({
          guestName: "",
          mobileNumber: "",
          email: "",
          city: "",
          checkInDate: "",
          checkOutDate: "",
          adults: "",
          children: "",
          petType: "",
          numPets: "",
          petSize: "",
          specialRequirements: "",
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
            Thank you! Your inquiry has been submitted. We will get back to you shortly.
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Guest Name
              </label>
              <input
                type="text"
                value={form.guestName}
                onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green ${
                  errors.guestName ? "border-red-500" : ""
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.guestName && (
                <p className="mt-1 text-sm text-red-600">{errors.guestName}</p>
              )}
            </div>
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
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-forest-green/50 focus:border-forest-green ${
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
                Check-in Date
              </label>
              <input
                type="date"
                value={form.checkInDate}
                onChange={(e) => setForm({ ...form, checkInDate: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.checkInDate ? "border-red-500" : ""
                }`}
                required
              />
              {errors.checkInDate && (
                <p className="mt-1 text-sm text-red-600">{errors.checkInDate}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Check-out Date
              </label>
              <input
                type="date"
                value={form.checkOutDate}
                onChange={(e) => setForm({ ...form, checkOutDate: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.checkOutDate ? "border-red-500" : ""
                }`}
                required
              />
              {errors.checkOutDate && (
                <p className="mt-1 text-sm text-red-600">{errors.checkOutDate}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Adults
              </label>
              <input
                type="number"
                min="1"
                value={form.adults}
                onChange={(e) => setForm({ ...form, adults: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.adults ? "border-red-500" : ""
                }`}
                placeholder="Enter number of adults"
                required
              />
              {errors.adults && (
                <p className="mt-1 text-sm text-red-600">{errors.adults}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Children
              </label>
              <input
                type="number"
                min="0"
                value={form.children}
                onChange={(e) => setForm({ ...form, children: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.children ? "border-red-500" : ""
                }`}
                placeholder="Enter number of children"
                required
              />
              {errors.children && (
                <p className="mt-1 text-sm text-red-600">{errors.children}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Pet Type
              </label>
              <select
                value={form.petType}
                onChange={(e) => setForm({ ...form, petType: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.petType ? "border-red-500" : ""
                }`}
                required
              >
                <option value="">Select pet type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </select>
              {errors.petType && (
                <p className="mt-1 text-sm text-red-600">{errors.petType}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Pets
              </label>
              <input
                type="number"
                min="0"
                value={form.numPets}
                onChange={(e) => setForm({ ...form, numPets: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.numPets ? "border-red-500" : ""
                }`}
                placeholder="Enter number of pets"
                required
              />
              {errors.numPets && (
                <p className="mt-1 text-sm text-red-600">{errors.numPets}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Pet Size
              </label>
              <select
                value={form.petSize}
                onChange={(e) => setForm({ ...form, petSize: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary ${
                  errors.petSize ? "border-red-500" : ""
                }`}
                required
              >
                <option value="">Select pet size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              {errors.petSize && (
                <p className="mt-1 text-sm text-red-600">{errors.petSize}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Special Requirements
              </label>
              <textarea
                value={form.specialRequirements}
                onChange={(e) => setForm({ ...form, specialRequirements: e.target.value })}
                className={`block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary`}
                rows={3}
                placeholder="Any special requests or notes?"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto"
              disabled={Object.keys(errors).length > 0}
            >
              Submit Inquiry
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}