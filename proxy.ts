import { NextRequest, NextResponse } from "next/server";

const BOT_PATTERNS = [
  /bot|crawler|spider|scraper|fetch|curl|wget|python|axios|node-fetch/i,
  /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i,
  /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot/i,
  /semrush|ahrefs|majestic|moz|screaming frog/i,
  /headlesschrome|phantomjs|selenium|puppeteer|playwright/i,
];

export function isBot(userAgent: string): boolean {
  if (!userAgent) return true; // No UA = likely a bot
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

export const config = {
  matcher: "/api/analytics/:path*",
};

export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";

  // Block bot requests to analytics endpoints
  if (req.nextUrl.pathname.startsWith("/api/analytics/track") && isBot(ua)) {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.next();
}
