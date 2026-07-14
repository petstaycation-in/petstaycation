import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Contact Pet Staycation - Get in Touch",
  description: "Have questions or need assistance planning your perfect pet-friendly Rajasthan getaway? We're here to help.",
  openGraph: {
    title: "Contact Pet Staycation - Get in Touch",
    description: "Have questions or need assistance planning your perfect pet-friendly Rajasthan getaway? We're here to help.",
    url: "https://petstaycation.in/contact",
    siteName: "Pet Staycation",
    images: [
      {
        url: "https://petstaycation.in/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pet Staycation logo",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    handle: "@petstaycation",
    site: "@petstaycation",
    cardType: "summary_large_image",
  },
  alternates: {
    canonical: "https://petstaycation.in/contact",
  },
};

export default function ContactPage() {
  return (
    <Container>
      <SectionHeading
        title="Get in Touch"
        description="Have questions or need assistance planning your perfect pet-friendly Rajasthan getaway? We're here to help."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-bg-primary/50 focus:border-bg-primary"
                placeholder="Please share your questions or travel plans..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-bg-primary text-white hover:bg-bg-primary/90 focus:ring-2 focus:ring-bg-primary/30 disabled:opacity-50"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="mb-3 text-lg font-semibold text-bg-primary">
              Our Offices
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Jaipur Headquarters:</strong><br />
              Niwaru Road, Jhotwara<br />
              Jaipur, Rajasthan 302012<br />
              India
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="mb-3 text-lg font-semibold text-bg-primary">
              Contact Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Phone:</strong> +91 96490 88717
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <strong>Email:</strong> petstaycationindia@gmail.com
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <strong>Emergency (Pet Care):</strong> +91 77428 94249
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="mb-3 text-lg font-semibold text-bg-primary">
              Business Hours
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monday - Friday: 9:00 AM - 7:00 PM IST
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Saturday: 10:00 AM - 5:00 PM IST
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Sunday: 11:00 AM - 4:00 PM IST
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}