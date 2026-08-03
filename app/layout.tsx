import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Libre_Baskerville,
} from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Pet Staycation",
  description: "Luxury pet-friendly travel experiences across Rajasthan",
  metadataBase: new URL("https://petstaycation.in"),
};


const schema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Pet Staycation",
  "url": "https://petstaycation.in",
  "description": "India's premium pet-friendly travel platform helping pet parents discover verified stays and holidays.",
  "areaServed": "India",
  "serviceType": [
    "Pet-friendly stays",
    "Luxury travel experiences",
    "Holiday planning"
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${libre.className} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col bg-background">

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />


        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />

      </body>

    </html>
  );
}
