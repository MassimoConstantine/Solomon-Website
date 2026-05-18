import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Today's sitemap is small (homepage + whitepaper PDF reference).
// As concept pages and research essays land, append entries here — each new URL
// becomes a citation surface for crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${site.url}${site.links.whitepaper}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
