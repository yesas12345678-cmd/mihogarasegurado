import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("admin_session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // 1. If ADMIN_PASSWORD is not set, refuse access by default to prevent any bypasses
  if (!adminPassword) {
    console.error("[Proxy] ADMIN_PASSWORD environment variable is missing on the server.");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Validate token signature and expiration
  const isValid = sessionCookie ? await verifySessionToken(sessionCookie, adminPassword) : false;

  if (!isValid) {
    const loginUrl = new URL("/login", request.url);
    // If cookie was present but invalid, clear it in the redirection response
    const response = NextResponse.redirect(loginUrl);
    if (sessionCookie) {
      response.cookies.delete("admin_session");
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
