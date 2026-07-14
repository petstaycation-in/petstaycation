import { properties } from "@/data/properties";
import Container from "@/components/ui/Container";
import StaysContent from "./stays-content";

export const metadata = {
  title: "Pet-Friendly Stays in Rajasthan | Pet Staycation",
  description: "Browse pet-friendly resorts, cottages, farm stays and nature retreats across Rajasthan.",
  openGraph: {
    title: "Pet-Friendly Stays in Rajasthan | Pet Staycation",
    description: "Browse pet-friendly resorts, cottages, farm stays and nature retreats across Rajasthan.",
    url: "https://petstaycation.in/stays",
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
    canonical: "https://petstaycation.in/stays",
  },
};

export default function StaysPage() {
  return (
    <Container>
      <StaysContent properties={properties} />
    </Container>
  );
}