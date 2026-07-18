import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import StayDetail from "@/components/stays/StayDetail";
import OrganicOrchardDetail from "@/components/stays/OrganicOrchardDetail";
import RedStoneFortDetail from "@/components/stays/RedStoneFortDetail";
import MaruRetreatDetail from "@/components/stays/MaruRetreatDetail";
import { redStoneFort } from "@/data/redStoneFort";
import { maruRetreat } from "@/data/maruRetreat";
import type { Metadata } from "next";

export function generateStaticParams() {
  return properties.map((p) => ({
    id: String(p.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const stay = properties.find(
    (p) => p.id === Number(id)
  );

  if (!stay) {
    return {};
  }

  const baseUrl = "https://petstaycation.in";
  const url = `${baseUrl}/stays/${id}`;

  const isOrganicOrchard = stay.id === 3;
  const isRedStoneFort = stay.id === 2;
  const isMaru = stay.id === 1;
  const title = isMaru
    ? "Marubhoomi Pushkar | Pet-Friendly Private Pool Farmstay"
    : isRedStoneFort
    ? "The Red Stone Fort | Pet-Friendly Heritage Stay near Jodhpur"
    : isOrganicOrchard
    ? "Organic Orchard Retreat Pilani | Luxury Pet-Friendly Farm Stay"
    : `${stay.title} | Pet Staycation`;
  const description = isMaru
    ? "Stay with your pet at Marubhoomi near Pushkar, featuring two private plunge-pool villas, farm dining, open rural spaces and authentic Rajasthan experiences."
    : isRedStoneFort
    ? "Stay with your pet at The Red Stone Fort, an intimate four-room heritage homestay in Dhundhara near Jodhpur with gardens, a swimming pool, fresh dining and rural experiences."
    : isOrganicOrchard
    ? "Stay at Organic Orchard Retreat, a luxury pet-friendly organic farm stay in Pilani with orchards, farm-to-table meals, horse riding and family experiences."
    : stay.description;

  return {
    title,
    description,
    keywords: isMaru ? ["pet-friendly stay Pushkar", "private pool villa Pushkar", "pet-friendly farmstay Rajasthan", "farmstay near Pushkar", "dog-friendly stay Pushkar"] : isRedStoneFort ? [
      "pet-friendly stay near Jodhpur",
      "heritage homestay near Jodhpur",
      "rural Rajasthan homestay",
      "fort stay near Jodhpur",
      "boutique homestay near Jodhpur",
      "dog-friendly stay Rajasthan",
    ] : isOrganicOrchard ? [
      "Organic Orchard Retreat",
      "organic farm stay Pilani",
      "pet friendly stay Pilani",
      "luxury farm stay Rajasthan",
      "weekend getaway Pilani",
      "family farm stay Rajasthan",
      "stay near BITS Pilani",
    ] : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: "Pet Staycation",
      images: [
        {
          url: stay.imageUrl.startsWith('/') ? `${baseUrl}${stay.imageUrl}` : stay.imageUrl,
          width: 1200,
          height: 630,
          alt: stay.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [stay.imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function StayDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const stay = properties.find(
    (p) => p.id === Number(id)
  );

  if (!stay) {
    notFound();
  }

  if (stay.id === 3) {
    const url = "https://petstaycation.in/stays/3";
    const schema = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: "Organic Orchard Retreat",
      url,
      image: stay.gallery?.map((image) => `https://petstaycation.in${image}`),
      description: stay.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pilani",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
      petsAllowed: true,
      amenityFeature: stay.amenities.map((amenity) => ({
        "@type": "LocationFeatureSpecification",
        name: amenity,
        value: true,
      })),
      priceRange: `INR ${stay.pricePerNight}+`,
      starRating: { "@type": "Rating", ratingValue: stay.rating, bestRating: 5 },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <OrganicOrchardDetail property={stay} />
      </>
    );
  }

  if (stay.id === 1) {
    const url = "https://petstaycation.in/stays/1";
    const lodging = { "@context":"https://schema.org", "@type":"LodgingBusiness", name:maruRetreat.publicName, url, image:maruRetreat.images.map(image=>`https://petstaycation.in${image.src}`), description:stay.description, address:{"@type":"PostalAddress",...maruRetreat.address}, petsAllowed:true, checkinTime:maruRetreat.commercial.checkIn, checkoutTime:maruRetreat.commercial.checkOut, amenityFeature:maruRetreat.highlights.map(name=>({"@type":"LocationFeatureSpecification",name,value:true})) };
    const faq = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:maruRetreat.faqs.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}})) };
    const breadcrumbs = { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://petstaycation.in"},{"@type":"ListItem",position:2,name:"Stays",item:"https://petstaycation.in/stays"},{"@type":"ListItem",position:3,name:maruRetreat.publicName,item:url}] };
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([lodging,faq,breadcrumbs])}}/><MaruRetreatDetail/></>;
  }

  if (stay.id === 2) {
    const url = "https://petstaycation.in/stays/2";
    const lodgingSchema = {
      "@context": "https://schema.org", "@type": "LodgingBusiness",
      name: redStoneFort.publicName, url,
      image: redStoneFort.images.map((image) => `https://petstaycation.in${image.src}`),
      description: stay.description,
      address: { "@type": "PostalAddress", ...redStoneFort.address },
      geo: { "@type": "GeoCoordinates", ...redStoneFort.coordinates },
      petsAllowed: true,
      checkinTime: redStoneFort.commercial.checkIn,
      checkoutTime: redStoneFort.commercial.checkOut,
      amenityFeature: redStoneFort.propertyAmenities.map((amenity) => ({ "@type": "LocationFeatureSpecification", name: amenity, value: true })),
    };
    const faqSchema = {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: redStoneFort.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://petstaycation.in" },
        { "@type": "ListItem", position: 2, name: "Stays", item: "https://petstaycation.in/stays" },
        { "@type": "ListItem", position: 3, name: redStoneFort.publicName, item: url },
      ],
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([lodgingSchema, faqSchema, breadcrumbSchema]) }} />
        <RedStoneFortDetail />
      </>
    );
  }

  return <StayDetail property={stay} />;
}
