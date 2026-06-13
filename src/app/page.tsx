import { pool, initDB } from "@/lib/db";
import HomeClient from "@/components/HomeClient";
import { Article } from "@/data/articles";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Ensure database is initialized and seeded on startup
  await initDB();

  let articles: Article[] = [];

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author FROM articles ORDER BY created_at DESC"
      );
      
      // Map DB row structure to unified camelCase React state props
      articles = rows.map((row) => ({
        id: row.id,
        title: row.title,
        excerpt: row.excerpt,
        category: {
          name: row.category_name,
          slug: row.category_slug,
        },
        date: row.date,
        readTime: row.read_time,
        imageUrl: row.image_url || undefined,
        imageGradient: row.image_gradient,
        author: row.author,
        content: "", // Content body is not needed on the main grid list view, saving bandwidth
      }));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error loading articles from PostgreSQL in homepage:", err);
  }

  return <HomeClient initialArticles={articles} />;
}
