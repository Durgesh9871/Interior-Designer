import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import FloatingLeadTrigger from "@/components/FloatingLeadTrigger";
import SmoothScrollProvider from "@/components/SmoothScroll";
import { siteConfig } from "@/data/siteConfig";

const headingFont = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.seo.siteTitle,
  description: siteConfig.seo.metaDescription,
  metadataBase: new URL(siteConfig.seo.canonicalUrl),
  authors: [{ name: "IDC Architects" }],
  keywords: [
    "IDC Architects",
    "Luxury Architecture Bengaluru",
    "Interior Design Bengaluru",
    "Bespoke Residential Architect",
    "Turnkey Interior Execution",
    "NRI Architecture Services Bengaluru"
  ],
  openGraph: {
    title: siteConfig.seo.siteTitle,
    description: siteConfig.seo.metaDescription,
    url: siteConfig.seo.canonicalUrl,
    siteName: "IDC Architects",
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1920,
        height: 1080,
        alt: "IDC Architects - Luxury Architecture & Interiors Bengaluru",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.siteTitle,
    description: siteConfig.seo.metaDescription,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1113",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalService",
    "name": siteConfig.brandName,
    "telephone": siteConfig.phone,
    "description": siteConfig.seo.metaDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "21/1, Second Floor, Above Bharat Textiles, S. M. Road, Opp Vaishnavi Rathnam, T Dasarahalli, near Jalahalli Cross Road",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560057",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0445,
      "longitude": 77.5147
    },
    "url": siteConfig.seo.canonicalUrl,
    "openingHours": "Mo-Sa 09:30-18:30",
    "areaServed": [
      {
        "@type": "City",
        "name": "Bengaluru"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Karnataka"
      }
    ],
    "priceRange": "$$$$"
  };

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#fbf9f5] text-[#17181a] selection:bg-[#c5a059]/20 selection:text-[#17181a]">
        <SmoothScrollProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingLeadTrigger />
          <MobileStickyBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
