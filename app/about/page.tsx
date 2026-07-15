import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "About Pet Staycation - Our Story",
  description: "Learn about our mission to create unforgettable travel experiences for pets and their parents across Rajasthan's most treasured destinations.",
  openGraph: {
    title: "About Pet Staycation - Our Story",
    description: "Learn about our mission to create unforgettable travel experiences for pets and their parents across Rajasthan's most treasured destinations.",
    url: "https://petstaycation.in/about",
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
    canonical: "https://petstaycation.in/about",
  },
};

export default function AboutPage() {
  return (
    <Container>
      <SectionHeading
        title="Our Story"
        description="Creating unforgettable travel experiences for pets and their parents across Rajasthan's most treasured destinations."
      />

      <div className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(110,142,109,0.2),_transparent_45%),linear-gradient(135deg,_#f7f2e8_0%,_#ffffff_100%)] p-6 shadow-[0_24px_70px_-40px_rgba(21,29,40,0.45)] sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About Pet Staycation</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              We created a new way to travel — one that leaves no pawprint behind.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
              In a world where travel often feels limited by who can come along, Pet Staycation reimagines the getaway. We curate calm, beautiful places in Rajasthan where pets are welcomed not as an afterthought, but as part of the experience itself.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-4 backdrop-blur">
            <div className="relative h-56 w-full overflow-hidden rounded-[1.1rem]">
              <Image
                src="/images/stays/maru-retreat-farmstay/hero.png"
                alt="Pet Staycation retreat in Rajasthan"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">The concept</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">A stay that feels good for every member of the family</h3>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Every Pet Staycation property is chosen for its comfort, character, and ability to welcome pets with ease. From open outdoor spaces and thoughtful amenities to warm hospitality and local guidance, we make sure your escape feels luxurious, relaxed, and genuinely inclusive.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Our goal is simple: to help pet parents discover stays that feel as special as the memories they create there. Whether it is a quiet countryside retreat or a regal escape in Rajasthan, the experience should feel effortless from arrival to departure.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Why Rajasthan</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">A landscape made for slow travel</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Rajasthan offers a rare mix of heritage, serenity, and scenic beauty. It is the perfect setting for pet-friendly getaways that feel both restorative and memorable.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Our promise</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">Thoughtful stays, not just pet-friendly rooms</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We go beyond basic pet policies. Our stays are selected for comfort, safety, and genuine hospitality, with care designed around both pets and their people.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(21,29,40,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Our community</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">A growing circle of pet travelers</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Pet Staycation is built for travelers who want to share beautiful experiences with their companions. It is a community rooted in comfort, trust, and unforgettable escapes.
            </p>
          </div>
        </div>
      </div>
            <section className="mt-12 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-[#fdf7ee] via-white to-[#f3ebde] p-8 text-center shadow-[0_20px_60px_-35px_rgba(99,74,34,0.35)] sm:p-10">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Our Mission
        </p>

        <h2 className="mt-3 font-['Libre_Baskerville'] text-3xl font-semibold text-slate-900">
          Making every pet feel welcome on every journey.
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Pet Staycation exists to make travelling with pets simple, joyful, and stress-free. 
          We connect pet parents with beautiful stays where comfort, hospitality, and unforgettable memories come together.
        </p>


        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-5">
            <p className="text-2xl font-semibold text-primary">
              Verified
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Pet-friendly properties
            </p>
          </div>


          <div className="rounded-2xl bg-white p-5">
            <p className="text-2xl font-semibold text-primary">
              Premium
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Curated travel experiences
            </p>
          </div>


          <div className="rounded-2xl bg-white p-5">
            <p className="text-2xl font-semibold text-primary">
              Together
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Pets are family
            </p>
          </div>

        </div>

      </section>
    </Container>
  );
}