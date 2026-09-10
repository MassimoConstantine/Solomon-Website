import { site } from "@/lib/site";
import { STATUS_LABEL, researchSorted } from "@/lib/research";

// RSS 2.0 feed over the research register. Adding a paper to lib/research.ts
// publishes it here.
export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const now = new Date().toUTCString();

  const items = researchSorted
    .map((entry) => {
      const url = entry.href.startsWith("http")
        ? entry.href
        : `${site.url}${entry.href}`;
      const pubDate = new Date(`${entry.date}T00:00:00Z`).toUTCString();
      const description = `${entry.abstract} [${STATUS_LABEL[entry.status]} — ${entry.version}]`;
      return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${entry.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
      <author>${escapeXml(entry.authors.join(", "))}</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name} — Research</title>
    <link>${site.url}/research</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>Solomon Research Lab</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
