import { cookies } from "next/headers";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Helper to compute HMAC SHA-256 using standard Web Crypto API
async function hmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Generate a session token containing the timestamp and a signature
export async function createSessionToken(password: string): Promise<string> {
  const now = Date.now();
  const rawToken = `${now}`;
  const signature = await hmacSha256(rawToken, password);
  return `${rawToken}.${signature}`;
}

// Verify a session token signature and check if it has expired
export async function verifySessionToken(token: string, password: string): Promise<boolean> {
  if (!token) return false;
  
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration (7 days)
  if (Date.now() - timestamp > SESSION_MAX_AGE) {
    return false;
  }

  // Re-verify signature
  const expectedSignature = await hmacSha256(timestampStr, password);

  // Time-safe character comparison to prevent timing attacks
  if (signature.length !== expectedSignature.length) return false;
  let result = 0;
  for (let i = 0; i < signature.length; i++) {
    result |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }
  return result === 0;
}

// Helper to check authentication inside Server Components and Server Actions
export async function checkAuth(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("[Session Auth] ADMIN_PASSWORD is not set in environment variables!");
    return false;
  }

  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;
    if (!sessionToken) return false;

    return await verifySessionToken(sessionToken, adminPassword);
  } catch (err) {
    console.error("[Session Auth] Error retrieving cookies or verifying token:", err);
    return false;
  }
}
