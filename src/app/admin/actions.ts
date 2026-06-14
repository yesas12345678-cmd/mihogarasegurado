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
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const categorySlug = formData.get("category") as string;
  const author = formData.get("author") as string;
  const readTime = formData.get("readTime") as string;
  const imageFile = formData.get("image") as File | null;
  const keyword = formData.get("keyword") as string;
  const publishedDate = formData.get("publishedDate") as string;
  const publishedTime = formData.get("publishedTime") as string;

  if (!title || !excerpt || !categorySlug || !author || !readTime) {
    return { error: "Todos los campos de texto obligatorios deben estar completos." };
  }

  const categoryNames: Record<string, string> = {
    comparativas: "Comparativas",
    coberturas: "Coberturas",
    "tipos-de-vivienda": "Tipos de Vivienda",
    guias: "Guías",
  };

  const categoryName = categoryNames[categorySlug] || "Información";
  const id = slugify(title);

  let publishedAtVal = new Date();
  if (publishedDate) {
    const timeStr = publishedTime || "12:00";
    publishedAtVal = new Date(`${publishedDate}T${timeStr}:00`);
  }
  
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const dayStr = String(publishedAtVal.getDate()).padStart(2, "0");
  const monthStr = months[publishedAtVal.getMonth()];
  const yearStr = publishedAtVal.getFullYear();
  const dateStr = `${dayStr} ${monthStr} ${yearStr}`;

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
      "from-rose-500 to-red-650"
    ];
    imageGradient = gradients[Math.floor(Math.random() * gradients.length)];
  }

  try {
    const client = await pool.connect();
    try {
      if (keyword) {
        const { rows } = await client.query("SELECT id FROM articles WHERE keyword = $1", [keyword]);
        if (rows.length > 0) {
          return { error: `La palabra clave "${keyword}" ya está asignada a otro artículo.` };
        }
      }

      await client.query(
        `
        INSERT INTO articles (id, title, meta_title, meta_description, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content, published_at, keyword)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        `,
        [id, title, metaTitle || null, metaDescription || null, excerpt, categoryName, categorySlug, dateStr, readTime, imageUrl, imageGradient, author, content || "", publishedAtVal, keyword || null]
      );
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("Error inserting article in DB:", err);
    if (err.code === "23505") {
      return { error: "Ya existe un artículo con un título o slug idéntico." };
    }
    return { error: "Error al guardar el artículo en la base de datos." };
  }

  // Clear path cache in Next.js
  revalidatePath("/");
  revalidatePath("/admin");
  
  redirect("/admin");
}

export async function editArticle(prevState: any, formData: FormData) {
  const currentId = formData.get("currentId") as string;
  const newSlug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const categorySlug = formData.get("category") as string;
  const author = formData.get("author") as string;
  const readTime = formData.get("readTime") as string;
  const keyword = formData.get("keyword") as string;
  const publishedDate = formData.get("publishedDate") as string;
  const publishedTime = formData.get("publishedTime") as string;

  if (!currentId || !newSlug || !title || !excerpt || !categorySlug || !author || !readTime) {
    return { error: "Todos los campos de texto obligatorios deben estar completos." };
  }

  const categoryNames: Record<string, string> = {
    comparativas: "Comparativas",
    coberturas: "Coberturas",
    "tipos-de-vivienda": "Tipos de Vivienda",
    guias: "Guías",
  };
  const categoryName = categoryNames[categorySlug] || "Información";

  let publishedAtVal = new Date();
  if (publishedDate) {
    const timeStr = publishedTime || "12:00";
    publishedAtVal = new Date(`${publishedDate}T${timeStr}:00`);
  }

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const dayStr = String(publishedAtVal.getDate()).padStart(2, "0");
  const monthStr = months[publishedAtVal.getMonth()];
  const yearStr = publishedAtVal.getFullYear();
  const dateStr = `${dayStr} ${monthStr} ${yearStr}`;

  try {
    const client = await pool.connect();
    try {
      // Check if keyword is used by another article
      if (keyword) {
        const { rows } = await client.query(
          "SELECT id FROM articles WHERE keyword = $1 AND id != $2",
          [keyword, currentId]
        );
        if (rows.length > 0) {
          return { error: `La palabra clave "${keyword}" ya está asignada a otro artículo.` };
        }
      }

      // Check if new slug is taken
      if (newSlug !== currentId) {
        const { rows } = await client.query(
          "SELECT id FROM articles WHERE id = $1",
          [newSlug]
        );
        if (rows.length > 0) {
          return { error: `El URL Slug "${newSlug}" ya está tomado por otro artículo.` };
        }
      }

      // Update query
      await client.query(
        `
        UPDATE articles SET
          id = $1,
          title = $2,
          meta_title = $3,
          meta_description = $4,
          excerpt = $5,
          category_name = $6,
          category_slug = $7,
          date = $8,
          read_time = $9,
          author = $10,
          content = $11,
          published_at = $12,
          keyword = $13
        WHERE id = $14
        `,
        [
          newSlug,
          title,
          metaTitle || null,
          metaDescription || null,
          excerpt,
          categoryName,
          categorySlug,
          dateStr,
          readTime,
          author,
          content || "",
          publishedAtVal,
          keyword || null,
          currentId
        ]
      );
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("Error updating article in DB:", err);
    return { error: "Error al actualizar el artículo en la base de datos." };
  }

  // Clear path cache in Next.js
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/articulos/${currentId}`);
  if (newSlug !== currentId) {
    revalidatePath(`/articulos/${newSlug}`);
  }

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
