import { site } from "@/lib/site";

// RSS 2.0 feed scaffold. Populated as research essays land — for now it advertises
// the site itself so subscribers can lock in early.
export const dynamic = "force-static";

export function GET() {
  const now = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name} — Research</title>
    <link>${site.url}</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${site.description}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>Solomon Research Lab</generator>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
