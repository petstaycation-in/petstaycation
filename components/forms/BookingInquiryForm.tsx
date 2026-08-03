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
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState("");

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
    else if (form.checkInDate < new Date().toISOString().slice(0, 10)) newErrors.checkInDate = "Choose today or a future date";
    if (!form.checkOutDate) newErrors.checkOutDate = "Required";
    else if (form.checkInDate && form.checkOutDate <= form.checkInDate) newErrors.checkOutDate = "Check-out must be after check-in";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && consent) {
      setSubmitting(true);
      setSubmitError("");
      const rawMessage = `Pet Staycation booking enquiry\n\nProperty: ${stayTitle}\nGuest: ${form.guestName}\nMobile: ${form.mobileNumber}\nEmail: ${form.email}\nCity: ${form.city}\nCheck-in: ${form.checkInDate}\nCheck-out: ${form.checkOutDate}\nAdults: ${form.adults}\nChildren: ${form.children}\nPets: ${form.numPets} ${form.petType}(s), ${form.petSize}\nSpecial requirements: ${form.specialRequirements || "None"}`;
      try {
        const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "booking", name: form.guestName, email: form.email, phone: form.mobileNumber, subject: `Booking enquiry: ${stayTitle}`, details: { ...form, stayTitle }, privacyConsent: consent, website, startedAt }) });
        if (!response.ok) {
          const result = await response.json().catch(() => null) as { error?: string } | null;
          setSubmitError(result?.error || "We could not prepare your enquiry. Please try again.");
          setSubmitting(false);
          return;
        }
      } catch {
        setSubmitError("We could not connect. Please check your internet connection and try again.");
        setSubmitting(false);
        return;
      }
      // Build WhatsApp message
      const message = encodeURIComponent(rawMessage);

      // Open WhatsApp in new tab
      window.open(`https://wa.me/919649088717?text=${message}`, "_blank", "noopener,noreferrer");

      // Show success message
      setSuccess(true);
      setSubmitting(false);
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
            Your enquiry is ready in WhatsApp. Send the message there to complete it.
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="absolute -left-[10000px]" aria-hidden="true">Website<input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
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
                min={new Date().toISOString().slice(0, 10)}
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
                min={form.checkInDate || new Date().toISOString().slice(0, 10)}
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

          <label className="flex items-start gap-3 text-sm leading-6 text-gray-600"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 h-4 w-4 accent-primary" /><span>I agree to the <a href="/privacy" className="font-semibold text-primary underline">Privacy Policy</a> and allow my enquiry to be stored and sent through email, Google Sheets and WhatsApp.</span></label>
          {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
          <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto"
              disabled={Object.keys(errors).length > 0 || submitting || !consent}
            >
              {submitting ? "Saving enquiry…" : "Submit Inquiry"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
