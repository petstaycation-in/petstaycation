import Image from "next/image";
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
        description="Whether you’re planning a weekend retreat, a pet-friendly staycation, or a larger Rajasthan escape, we’re here to help you find the right fit."
      />

      <div className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(110,142,109,0.2),_transparent_45%),linear-gradient(135deg,_#f7f2e8_0%,_#ffffff_100%)] p-6 shadow-[0_24px_70px_-40px_rgba(21,29,40,0.45)] sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Contact us</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              We’ll help you shape a stay that feels effortless for both you and your pet.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
              Share your travel plans, preferences, or questions and we’ll guide you through the best options for a calm, comfortable getaway.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact-form"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Plan my stay
              </a>
              <a
                href="#location-panel"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View location
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-600">Weekend getaway</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-600">Pet-friendly villa</span>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm text-slate-600">Rajasthan retreat</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-5 backdrop-blur">
            <div className="relative h-44 w-full overflow-hidden rounded-[1.1rem]">
              <Image
                src="/images/stays/maru-retreat-farmstay/hero.png"
                alt="Pet-friendly luxury retreat"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 rounded-[1rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Quick response</p>
              <p className="mt-2 text-sm text-slate-600">
                We usually reply within one business day with tailored suggestions and booking support.
              </p>
            </div>
          </div>
        </div>
      </div>

            <div className="mb-6 rounded-[1.5rem] border border-primary/20 bg-gradient-to-r from-[#fdf7ee] via-white to-[#f3ebde] p-5 shadow-[0_20px_60px_-35px_rgba(99,74,34,0.35)]">

        <div className="grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">
              🐾 Pet Friendly
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Stays selected for pets
            </p>
          </div>


          <div className="rounded-xl bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">
              🏡 Handpicked Stays
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Premium retreats & resorts
            </p>
          </div>


          <div className="rounded-xl bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">
              💬 Personal Support
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Assistance before booking
            </p>
          </div>


        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div id="contact-form" className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-8">
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
          <div id="location-panel" className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Visit us</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">Our Jaipur base</h3>
            <div className="mt-4 overflow-hidden rounded-[1.1rem] border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Directions</span>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Map view</span>
              </div>
              <div className="p-4">
                <div className="rounded-[0.9rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(110,142,109,0.15),_transparent_40%),linear-gradient(135deg,_#f8f5ed_0%,_#ffffff_100%)] p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Jaipur Headquarters</p>
                  <p className="mt-2">Niwaru Road, Jhotwara</p>
                  <p>Jaipur, Rajasthan 302012</p>
                  <p className="mt-3 text-primary">Approx. 25–35 mins from central Jaipur depending on route</p>
                </div>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Jaipur+Rajasthan+302012"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-primary"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Connect</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">Direct contact</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-800">Phone:</span> +91 96490 88717</p>
              <p><span className="font-semibold text-slate-800">Email:</span> petstaycationindia@gmail.com</p>
              <p><span className="font-semibold text-slate-800">Emergency (Pet Care):</span> +91 77428 94249</p>
            </div>
            <div className="mt-5 rounded-[1rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              “We help pet parents find calm, comfortable stays that feel like a proper holiday.”
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Hours</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">When we’re available</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>Monday - Friday: 9:00 AM - 7:00 PM IST</p>
              <p>Saturday: 10:00 AM - 5:00 PM IST</p>
              <p>Sunday: 11:00 AM - 4:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}