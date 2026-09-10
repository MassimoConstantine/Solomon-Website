import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { SUBJECTS, researchSorted } from "@/lib/research";

// Static surfaces plus every artifact in the research register. New papers are
// added in lib/research.ts and appear here automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const papers: MetadataRoute.Sitemap = researchSorted
    .filter((entry) => !entry.href.startsWith("http"))
    .map((entry) => ({
      url: `${site.url}${entry.href}`,
      lastModified: new Date(`${entry.updated ?? entry.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${site.url}/research`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/references`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...SUBJECTS.map((subject) => ({
      url: `${site.url}/research/${subject.key}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...papers,
  ];
}
