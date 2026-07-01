/**
 * SEO — metadata factory + structured data (JSON-LD).
 * Every page calls `createMetadata()` instead of hand-writing a Metadata object,
 * so titles, OG tags, canonicals, and Twitter cards stay consistent as the site
 * grows to product pages, blog, careers, docs, and IR.
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type CreateMetadataArgs = {
  title?: string;
  description?: string;
  path?: string; // e.g. "/products/unipost"
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article" | "profile";
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
  keywords = [],
  type = "website",
}: CreateMetadataArgs = {}): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — Venture Studio`;
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    keywords: [
      "Bharvix",
      "venture studio",
      "India",
      "AI-native products",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: siteConfig.twitterHandle,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/* ------------------------------------------------------------------
 * JSON-LD structured data builders — inject via a <script type="application/ld+json">.
 * ------------------------------------------------------------------ */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    foundingDate: String(siteConfig.founded),
    foundingLocation: siteConfig.location,
    sameAs: [
      "https://twitter.com/bharvix",
      "https://linkedin.com/company/bharvix",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function productSchema(p: {
  name: string;
  description: string;
  slug: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.description,
    url: p.url ?? `${siteConfig.url}/products/${p.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
