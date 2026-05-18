// Central site config — single source of truth for URLs, names, and identity.
// Used by metadata, sitemap, robots, llms.txt, JSON-LD schema, and RSS feed.

export const site = {
  url: "https://www.collapsingai.com",
  name: "Solomon",
  legalName: "Solomon Research Lab",
  shortName: "Solomon",
  description:
    "Solomon Research Lab — the architecture of governed intelligence. Verification-first. Wisdom as the form intelligence takes when it knows itself.",
  tagline: "You can't reach ASI through optimization. Truth is the opposite.",
  locale: "en_US",
  author: {
    name: "Harald Ikonen",
    role: "Founder, Solomon Research Lab",
  },
  links: {
    whitepaper: "/which-way-does-the-spirit-collapse.pdf",
  },
  // OpenGraph image — falls back to favicon for now until a dedicated OG asset exists.
  ogImage: "/solomon-fractal.png",
} as const;

export type SiteConfig = typeof site;
