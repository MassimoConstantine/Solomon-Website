import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

// Countries that count as "North America" for the alert.
const WATCH_COUNTRIES = new Set(["US", "CA", "MX"]);

// Cookie used to throttle pings to at most one per visitor per day.
const DEDUPE_COOKIE = "na_pinged";
const DEDUPE_MAX_AGE = 60 * 60 * 24; // 24h

const BOT_UA = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|vercel|monitor|headless|lighthouse|preview/i;

function buildPayload(message: string, webhookUrl: string) {
  // Discord webhooks use `content`; Slack uses `text`.
  if (webhookUrl.includes("discord.com")) {
    return { content: message };
  }
  return { text: message };
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const response = NextResponse.next();

  const webhookUrl = process.env.GEO_PING_WEBHOOK;
  if (!webhookUrl) return response; // not configured → no-op

  // Vercel injects this header in production. Locally it's absent;
  // set GEO_PING_TEST_COUNTRY=US to exercise the path in dev.
  const country =
    request.headers.get("x-vercel-ip-country") ??
    process.env.GEO_PING_TEST_COUNTRY ??
    "";

  if (!WATCH_COUNTRIES.has(country)) return response;

  // Skip obvious bots/crawlers/monitors.
  const ua = request.headers.get("user-agent") ?? "";
  if (BOT_UA.test(ua)) return response;

  // Throttle: one ping per visitor per day.
  if (request.cookies.has(DEDUPE_COOKIE)) return response;
  response.cookies.set(DEDUPE_COOKIE, "1", {
    maxAge: DEDUPE_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  const region = request.headers.get("x-vercel-ip-city")
    ? `${request.headers.get("x-vercel-ip-city")}, ${country}`
    : country;
  const path = request.nextUrl.pathname;
  const message = `🌎 North American visitor on the Solomon site — ${region} · ${path}`;

  event.waitUntil(
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(message, webhookUrl)),
    }).catch(() => {
      // Never let a webhook failure affect the page response.
    })
  );

  return response;
}

export const config = {
  matcher: [
    // Run on real page navigations only — skip API, static assets,
    // metadata files, and router prefetches (which would double-count).
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
