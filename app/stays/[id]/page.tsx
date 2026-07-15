import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import StayDetail from "@/components/stays/StayDetail";

export function generateStaticParams() {
  return properties.map((p) => ({
    id: String(p.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const stay = properties.find(
    (p) => p.id === Number(id)
  );

  if (!stay) {
    return {};
  }

  const baseUrl = "https://petstaycation.in";
  const url = `${baseUrl}/stays/${id}`;

  return {
    title: `${stay.title} | Pet Staycation`,
    description: stay.description,
    openGraph: {
      title: `${stay.title} | Pet Staycation`,
      description: stay.description,
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
    },
    twitter: {
      handle: "@petstaycation",
      site: "@petstaycation",
      cardType: "summary_large_image",
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

  return <StayDetail property={stay} />;
}