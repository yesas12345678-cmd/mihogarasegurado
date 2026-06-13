"use server";

import fs from "fs/promises";
import path from "path";
import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[^\w\-]+/g, "") // remove all non-word chars
    .replace(/\-\-+/g, "-") // replace multiple - with single -
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text
}

export async function createArticle(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const categorySlug = formData.get("category") as string;
  const author = formData.get("author") as string;
  const readTime = formData.get("readTime") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title || !excerpt || !content || !categorySlug || !author || !readTime) {
    return { error: "Todos los campos de texto son obligatorios." };
  }

  const categoryNames: Record<string, string> = {
    comparativas: "Comparativas",
    coberturas: "Coberturas",
    "tipos-de-vivienda": "Tipos de Vivienda",
    guias: "Guías",
  };

  const categoryName = categoryNames[categorySlug] || "Información";
  const id = slugify(title);
  
  // Format current date: e.g., "13 Jun 2026"
  const dateOptions: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
  const date = new Date().toLocaleDateString("es-ES", dateOptions)
    .replace(/\./g, "")
    .replace(/ de /g, " ");

  let imageUrl = "";
  let imageGradient = "from-slate-500 to-slate-700";

  // Process image upload
  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    try {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExt = path.extname(imageFile.name) || ".png";
      const fileName = `${id}-${Date.now()}${fileExt}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);

      imageUrl = `/uploads/${fileName}`;
    } catch (err) {
      console.error("Error saving uploaded image:", err);
      return { error: "Error al guardar la imagen subida en el servidor." };
    }
  } else {
    // Generate random gradient as fallback
    const gradients = [
      "from-cyan-500 to-blue-600",
      "from-teal-400 to-emerald-600",
      "from-amber-400 to-orange-500",
      "from-violet-500 to-purple-600",
      "from-indigo-500 to-sky-600",
      "from-rose-400 to-pink-600"
    ];
    imageGradient = gradients[Math.floor(Math.random() * gradients.length)];
  }

  try {
    const client = await pool.connect();
    try {
      await client.query(
        `
        INSERT INTO articles (id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `,
        [id, title, excerpt, categoryName, categorySlug, date, readTime, imageUrl, imageGradient, author, content]
      );
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("Error inserting article in DB:", err);
    if (err.code === "23505") {
      return { error: "Ya existe un artículo con un título idéntico o similar." };
    }
    return { error: "Error al guardar el artículo en la base de datos." };
  }

  // Clear path cache in Next.js
  revalidatePath("/");
  revalidatePath(`/articulos/${id}`);
  
  redirect("/admin");
}

export async function resetDemoArticles() {
  const client = await pool.connect();
  try {
    await client.query("TRUNCATE TABLE articles");
    console.log("Database table 'articles' truncated.");
  } catch (err) {
    console.error("Error truncating articles:", err);
  } finally {
    client.release();
  }

  const { initDB } = await import("@/lib/db");
  await initDB();

  revalidatePath("/");
  redirect("/admin");
}
