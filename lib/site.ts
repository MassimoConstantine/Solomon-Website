// Central site config — single source of truth for URLs, names, and identity.
// Used by metadata, sitemap, robots, llms.txt, JSON-LD schema, and RSS feed.

export const site = {
  url: "https://www.collapsingai.com",
  name: "Solomon",
  legalName: "Solomon Research Lab",
  shortName: "Solomon",
  description:
    "Solomon Research Lab — governed intelligence anchored to reality. A brain, nerves, and body architecture: every claim verified, every cycle compounding. The substrate grows only on what passes governance.",
  tagline: "Intelligence ≠ wisdom. The architecture that compounds on truth.",
  locale: "en_US",
  author: {
    name: "Harald Ikonen",
    role: "Founder, Solomon Research Lab",
    email: "harald@gideagency.com",
  },
  links: {
    whitepaper: "/which-way-does-the-spirit-collapse.pdf",
    linkedin: "https://www.linkedin.com/company/collapsing-ai",
    medium: "https://medium.com/@Harald-Ikonen",
  },
  // First public release of the manifesto, and its last substantive revision.
  // Bump `updated` when the argument changes, not for typography.
  published: "2026-09-09",
  updated: "2026-09-10",
  // OpenGraph card, 1200×630: the wordmark and the stroke on the site's paper.
  // Regenerate from scratchpad/og-card.html when the hero sentence changes.
  ogImage: "/og.png",
  ogImageAlt: "Solomon — You can't reach ASI through optimization. Truth is the opposite.",
} as const;

export type SiteConfig = typeof site;
