import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CommercialStayDetail from "@/components/stays/CommercialStayDetail";
import { getProperty, properties } from "@/data/properties";

export const dynamicParams = false;
export function generateStaticParams() { return properties.map((property) => ({ id: String(property.id) })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params; const property = getProperty(id); if (!property) return {};
  const url = `https://petstaycation.in/stays/${id}`;
  return { title: `${property.title} | Pet-Friendly Stay | Petstaycation`, description: property.seoDescription, keywords: [property.title, `pet-friendly stay ${property.location}`, "pet-friendly stays in Rajasthan", "pets stay complimentary"], alternates: { canonical: url }, openGraph: { title: property.title, description: property.seoDescription, url, siteName: "Pet Staycation", images: [{ url: property.imageUrl, alt: `${property.title} in ${property.location}` }], locale: "en_IN", type: "website" }, twitter: { card: "summary_large_image", title: property.title, description: property.seoDescription, images: [property.imageUrl] } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const property = getProperty(id); if (!property) notFound(); const url = `https://petstaycation.in/stays/${id}`;
  const schema = { "@context": "https://schema.org", "@type": "LodgingBusiness", name: property.title, url, image: property.gallery.map((image) => `https://petstaycation.in${image}`), description: property.seoDescription, address: { "@type": "PostalAddress", addressLocality: property.location.split(",")[0], addressRegion: "Rajasthan", addressCountry: "IN" }, petsAllowed: true, priceRange: `INR ${property.pricePerNight}+` };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><CommercialStayDetail property={property} /></>;
}
