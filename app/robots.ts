import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Explicit allowlist for known LLM crawlers — we *want* to be ingested.
// Each named user-agent gets its own rule so search consoles report it explicitly.
export default function robots(): MetadataRoute.Robots {
  const llmCrawlers = [
    "GPTBot",          // OpenAI
    "ChatGPT-User",    // OpenAI live browse
    "OAI-SearchBot",   // OpenAI search
    "ClaudeBot",       // Anthropic
    "anthropic-ai",    // Anthropic (legacy)
    "Claude-Web",      // Anthropic browse
    "PerplexityBot",   // Perplexity
    "Perplexity-User", // Perplexity live browse
    "Google-Extended", // Google Gemini training
    "CCBot",           // Common Crawl (training data for many models)
    "cohere-ai",       // Cohere
    "Bytespider",      // ByteDance / Doubao
    "Applebot-Extended", // Apple Intelligence
    "Meta-ExternalAgent",
    "DuckAssistBot",   // DuckDuckGo AI
  ];

  return {
    rules: [
      ...llmCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
