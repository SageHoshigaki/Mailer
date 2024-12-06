// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; require-trusted-types-for 'script';"
  );

  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  response.headers.set("X-Content-Type-Options", "nosniff");

  response.headers.set("X-Frame-Options", "DENY");

  response.headers.set("Referrer-Policy", "no-referrer");

  response.headers.set(
    "Permissions-Policy",
    "geolocation=(self), microphone=()"
  );

  return response;
}

export const config = {
  matcher: "/:path*",
};
