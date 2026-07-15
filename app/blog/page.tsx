import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Image from 'next/image';

export const metadata = {
  title: "Pet Travel Journal - Blog | Pet Staycation",
  description: "Expert tips, destination guides, and stories from luxury pet-friendly travels across Rajasthan and beyond.",
  openGraph: {
    title: "Pet Travel Journal - Blog | Pet Staycation",
    description: "Expert tips, destination guides, and stories from luxury pet-friendly travels across Rajasthan and beyond.",
    url: "https://petstaycation.in/blog",
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
    canonical: "https://petstaycation.in/blog",
  },
};

export default function BlogPage() {
  return (
    <Container>
      <SectionHeading
        title="Pet Travel Journal"
        description="Expert tips, destination guides, and stories from luxury pet-friendly travels across Rajasthan and beyond."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Placeholder blog posts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 relative">
            <Image
              src="/pstlogo.png"
              alt="Pet travel tips"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <span className="inline-block mb-3 px-3 py-1 bg-forest-green/10 text-forest-green text-xs font-medium rounded">
              Travel Guide
            </span>
            <h3 className="mb-2 text-lg font-semibold text-forest-green">
              10 Essential Tips for Traveling with Pets in Rajasthan
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              Learn how to make your pet&apos;s journey comfortable and enjoyable
              while exploring the magnificent forts and palaces of Rajasthan.
            </p>
            <a
              href="#"
              className="inline-block text-sm font-medium text-forest-green hover:text-forest-green/80"
            >
              Read More →
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 relative">
            <Image
              src="/pstlogo.png"
              alt="Pet friendly hotels"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-bg-primary text-xs font-medium rounded">
              Featured Stay
            </span>
            <h3 className="mb-2 text-lg font-semibold text-bg-primary">
              The Most Luxurious Pet-Friendly Hotels in Jaipur
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              Discover palatial accommodations that welcome both you and your
              furry family members with royal treatment.
            </p>
            <a
              href="#"
              className="inline-block text-sm font-medium text-bg-primary hover:text-bg-primary/80"
            >
              Read More →
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 relative">
            <Image
              src="/pstlogo.png"
              alt="Pet wellness travel"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-bg-primary text-xs font-medium rounded">
              Wellness
            </span>
            <h3 className="mb-2 text-lg font-semibold text-bg-primary">
              Wellness Retreats for Pets and Owners in Udaipur
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              Experience holistic wellness programs designed specifically for
              pets and their owners amidst the serene lakes of Udaipur.
            </p>
            <a
              href="#"
              className="inline-block text-sm font-medium text-bg-primary hover:text-bg-primary/80"
            >
              Read More →
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 relative">
            <Image
              src="/pstlogo.png"
              alt="Desert adventure with pets"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-bg-primary text-xs font-medium rounded">
              Adventure
            </span>
            <h3 className="mb-2 text-lg font-semibold text-bg-primary">
              Desert Camping with Pets: A Jaisalmer Adventure Guide
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              Experience the magic of the Thar Desert with your pet by your
              side - from camel rides to starlit dinners.
            </p>
            <a
              href="#"
              className="inline-block text-sm font-medium text-bg-primary hover:text-bg-primary/80"
            >
              Read More →
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}