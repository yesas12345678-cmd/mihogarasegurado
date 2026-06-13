import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function to calculate SHA-256 hash in Edge/Node runtime
async function getSHA256Hash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("admin_session");
  const adminPassword = process.env.ADMIN_PASSWORD || "Manuel1214$";
  
  // Calculate correct hash of the environment variable password
  const correctHash = await getSHA256Hash(adminPassword);

  if (!sessionCookie || sessionCookie.value !== correctHash) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
