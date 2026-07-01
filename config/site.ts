/**
 * SITE CONFIG — single source of truth for site-wide constants.
 * Nav, socials, products, contact, and SEO defaults live here so that
 * every surface (nav, footer, metadata, JSON-LD, sitemap) reads one source.
 */

export const siteConfig = {
  name: "Bharvix",
  legalName: "Bharvix",
  domain: "bharvix.com",
  url: "https://bharvix.com",
  tagline: "Engineering the software India can't live without.",
  description:
    "Bharvix is a venture studio engineering AI-native products India can't live without. We conceive, build, launch and scale category-defining companies.",
  locale: "en_IN",
  founded: 2025,
  location: "India",
  email: "hello@bharvix.com",
  ogImage: "/og.png",
  twitterHandle: "@bharvix",
} as const;

/**
 * Primary navigation. Currently anchor links on the landing page; each item
 * carries an optional `route` so it can graduate to a real page without
 * touching the Nav component.
 */
export type NavItem = {
  label: string;
  href: string;
  route?: string;
  external?: boolean;
  /** Future top-level sections gate behind a flag until their page ships. */
  enabled?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Products", href: "#products", route: "/products", enabled: true },
  { label: "Studio", href: "#about", route: "/about", enabled: true },
  { label: "Founders", href: "#founders", route: "/about#founders", enabled: true },
  { label: "Contact", href: "#contact", route: "/contact", enabled: true },
  // Graduating routes (flip enabled when the page ships):
  { label: "Blog", href: "/blog", route: "/blog", enabled: false },
  { label: "Careers", href: "/careers", route: "/careers", enabled: false },
  { label: "Docs", href: "/docs", route: "/docs", enabled: false },
];

export const footerNav = {
  Products: [
    { label: "Unipost", href: "https://unipost.in", external: true },
    { label: "Zuppy", href: "#", external: false },
    { label: "Jarvis", href: "#", external: false },
  ],
  Studio: [
    { label: "About", href: "#about", external: false },
    { label: "Founders", href: "#founders", external: false },
    { label: "Model", href: "#about", external: false },
  ],
  Connect: [
    { label: "Twitter / X", href: "https://twitter.com/bharvix", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/company/bharvix", external: true },
    { label: "hello@bharvix.com", href: "mailto:hello@bharvix.com", external: false },
  ],
} as const;

export const socials = {
  twitter: "https://twitter.com/bharvix",
  linkedin: "https://linkedin.com/company/bharvix",
  github: "https://github.com/bharvix",
} as const;

/**
 * Product registry — drives the Products section, individual product pages,
 * sitemap, and structured data. Add a product here, not in a component.
 */
export type ProductStatus = "live" | "beta" | "coming-soon";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  accent: string;
  tags: string[];
  url?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "unipost",
    name: "Unipost",
    tagline: "Schedule. Analyse. Grow.",
    description:
      "India's most intelligent social media co-pilot. Helps creators and businesses grow their audience smarter — with AI at the centre.",
    status: "live",
    accent: "#8b5cf6",
    tags: ["Scheduling", "Analytics", "Growth Coach", "Creator Score"],
    url: "https://unipost.in",
    featured: true,
  },
  {
    slug: "zuppy",
    name: "Zuppy",
    tagline: "Hyperlocal business intelligence.",
    description:
      "Giving local businesses the analytics and automation tools that only enterprises could previously afford.",
    status: "coming-soon",
    accent: "#f59e0b",
    tags: ["Local Business", "AI Analytics", "Automation"],
  },
  {
    slug: "jarvis",
    name: "Jarvis",
    tagline: "Your AI chief of staff.",
    description:
      "An intelligent operations layer for founders and teams — managing tasks, meetings, priorities and decisions.",
    status: "coming-soon",
    accent: "#06b6d4",
    tags: ["Productivity", "AI Assistant", "Founders"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Responsive breakpoints — mirror tailwind's defaults so JS media queries and
 * CSS utilities never disagree. Mobile-first: min-width semantics.
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;
