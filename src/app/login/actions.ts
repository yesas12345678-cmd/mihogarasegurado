"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { createSessionToken } from "@/lib/session";
import { isRateLimited } from "@/lib/rateLimit";

export async function loginAdmin(prevState: any, formData: FormData) {
  // 1. Rate Limiting protection
  let ip = "127.0.0.1";
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
  } catch (err) {
    console.warn("Could not retrieve request headers for rate limiting:", err);
  }

  // Allow max 5 login attempts per 1 minute window
  if (isRateLimited(ip, 5, 60 * 1000)) {
    return { error: "Demasiados intentos de inicio de sesión. Por favor, espera 1 minuto." };
  }

  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("[Login] ADMIN_PASSWORD environment variable is not defined!");
    return { error: "La autenticación de administrador no está configurada en el servidor." };
  }

  if (!password) {
    return { error: "La contraseña es obligatoria." };
  }

  // 2. Secure Timing-safe Password Comparison
  const enteredHash = crypto.createHash("sha256").update(password).digest();
  const correctHash = crypto.createHash("sha256").update(adminPassword).digest();

  const isPasswordCorrect = enteredHash.length === correctHash.length && 
    crypto.timingSafeEqual(enteredHash, correctHash);

  if (!isPasswordCorrect) {
    return { error: "Contraseña incorrecta. Inténtalo de nuevo." };
  }

  // 3. Generate Secure Cryptographically Signed Token
  const token = await createSessionToken(adminPassword);

  // 4. Set Cookie with HttpOnly, Secure, and SameSite=Strict flags
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Redirect to admin panel
  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/");
}
