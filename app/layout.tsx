import type { Metadata, Viewport } from "next";
import {
  Cormorant,
  Fraunces,
  JetBrains_Mono,
  Noto_Serif_JP,
  Space_Grotesk,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/lib/site";
import "./globals.css";

// Shoji: the pairing Japanese editorial design uses, at its lightest weights.
// Noto Serif JP for titles, Zen Kaku Gothic New for text, Cormorant for
// equations, JetBrains Mono for the small capitals. Nothing bold anywhere.
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-title",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-text",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal", "italic"],
  variable: "--font-eq",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// The one heavy mark on the site. Used once, on the screen after the hero,
// and nowhere else — see docs/HANDOFF-WEBSITE-ONE-STROKE §2.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-stroke",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

// The wordmark, and only the wordmark.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-mark",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.legalName,
  authors: [{ name: site.author.name }],
  creator: site.author.name,
  publisher: site.legalName,
  keywords: [
    "Solomon",
    "Solomon Research Lab",
    "governed intelligence",
    "Truth Protocol",
    "wisdom architecture",
    "verification-first AI",
    "AI governance",
    "AI provenance",
    "epistemic integrity",
    "Solomon Research Lab",
    "Ezer",
    "Ezer AI",
    "Solomon Ezer",
    "Synthetic Collapse",
    "Adaptive Loop",
    "Geometry of Truth",
    "Bayesian governance",
    "substrate compounding",
    "brain nerves body architecture",
    "epistemic ceiling",
    "hallucination architecture",
    "post-LLM",
    "AGI safety",
    "ASI alignment",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Solomon — Research" }],
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    locale: site.locale,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: site.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [{ url: site.ogImage, alt: site.ogImageAlt }],
  },
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerifJP.variable} ${zenKaku.variable} ${cormorant.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
