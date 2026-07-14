"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface BookingInquiry {
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
  stayTitle: string;
  timestamp: string;
}

interface PropertyListing {
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
  timestamp: string;
}

export default function AdminDashboard() {
  const [bookingInquiries, setBookingInquiries] = useState<BookingInquiry[]>([]);
  const [propertyListings, setPropertyListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      // Load booking inquiries
      const bookingInquiriesData = localStorage.getItem("bookingInquiries");
      setBookingInquiries(
        bookingInquiriesData ? JSON.parse(bookingInquiriesData) : []
      );

      // Load property listings
      const propertyListingsData = localStorage.getItem("propertyListings");
      setPropertyListings(
        propertyListingsData ? JSON.parse(propertyListingsData) : []
      );

      setLoading(false);
    };

    loadData();

    // Listen for storage events (useful if data is modified from another tab)
    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <SectionHeading title="Admin Dashboard" description="Loading data..." />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full border-4 border-primary/20 border-primary w-12 h-12"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <SectionHeading
        title="Admin Dashboard"
        description="Overview of leads and property listings"
      />

      {/* Stats Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Booking Leads */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="mb-2 text-lg font-semibold text-forest-green">
            Total Booking Leads
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {bookingInquiries.length}
          </p>
        </div>

        {/* Total Property Leads */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="mb-2 text-lg font-semibold text-forest-green">
            Total Property Leads
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {propertyListings.length}
          </p>
        </div>

        {/* Total Properties */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="mb-2 text-lg font-semibold text-forest-green">
            Total Properties
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            3
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            From sample data
          </p>
        </div>

        {/* Total Destinations */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="mb-2 text-lg font-semibold text-forest-green">
            Total Destinations
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            4
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Jaipur, Udaipur, Jaisalmer, Jodhpur
          </p>
        </div>
      </div>

      {/* Booking Inquiries Table */}
      <section className="mb-12">
        <SectionHeading
          title="Booking Inquiries"
          description="Latest booking inquiries from potential guests"
        />

        {bookingInquiries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No booking inquiries yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Guest Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Check-in
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Check-out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {bookingInquiries
                  .slice()
                  .reverse()
                  .map((inquiry, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {inquiry.guestName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {inquiry.mobileNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {inquiry.stayTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {inquiry.checkInDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {inquiry.checkOutDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(inquiry.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Property Listings Table */}
      <section>
        <SectionHeading
          title="Property Listings"
          description="Latest property listing submissions from owners"
        />

        {propertyListings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No property listings yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Owner Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Property Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {propertyListings
                  .slice()
                  .reverse()
                  .map((listing, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {listing.ownerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {listing.propertyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {listing.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {listing.mobileNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(listing.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Container>
  );
}