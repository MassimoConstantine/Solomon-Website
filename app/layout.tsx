import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/lib/site";
import "./globals.css";

// Computer Modern — display serif for headlines, equations, and labels.
const computerModern = localFont({
  src: [
    { path: "./fonts/cmunrm.woff", weight: "400", style: "normal" },
    { path: "./fonts/cmunti.woff", weight: "400", style: "italic" },
  ],
  variable: "--font-cm",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
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
    "world model",
    "epistemic ceiling",
    "hallucination architecture",
    "post-LLM",
    "AGI safety",
    "ASI alignment",
  ],
  alternates: {
    canonical: "/",
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
        height: 1200,
        alt: "Solomon — governed intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
  },
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
      className={`${computerModern.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
