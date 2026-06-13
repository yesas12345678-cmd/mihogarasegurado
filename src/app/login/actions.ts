"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

function getHash(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function loginAdmin(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD || "Manuel1214$";

  if (!password) {
    return { error: "La contraseña es obligatoria." };
  }

  const enteredHash = getHash(password);
  const correctHash = getHash(adminPassword);

  if (enteredHash !== correctHash) {
    return { error: "Contraseña incorrecta. Inténtalo de nuevo." };
  }

  // Set the cookie with the hash of the password
  const cookieStore = await cookies();
  cookieStore.set("admin_session", correctHash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
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
