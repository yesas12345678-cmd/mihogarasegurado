import { Pool } from "pg";
import fs from "fs";
import path from "path";
import { SEED_ARTICLES } from "./seedData";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ue141n9fuwc6czgz@187.127.233.89:5433/postgres";

export const pool = new Pool({
  connectionString,
  ssl: false,
});

// Initialize Database Table, alter schema and seed initial SEO-optimized HTML articles if empty
export async function initDB() {
  const client = await pool.connect();
  try {
    // 1. Create articles table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        category_name VARCHAR(255) NOT NULL,
        category_slug VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        read_time VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) DEFAULT '',
        image_gradient VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Safely alter table schema to add meta fields if missing
    await client.query(`
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_description TEXT;
    `);

    // 3. Check if table is empty
    const { rows } = await client.query("SELECT COUNT(*) FROM articles");
    const count = parseInt(rows[0].count, 10);

    if (count === 0) {
      console.log("Database table 'articles' is empty. Pre-populating with SEO-optimized HTML articles...");

      const articlesDir = path.join(process.cwd(), "src", "data", "articles");

      for (const article of SEED_ARTICLES) {
        // Read the HTML content from the articles directory
        const htmlPath = path.join(articlesDir, `${article.id}.html`);
        let htmlContent = "";

        if (fs.existsSync(htmlPath)) {
          htmlContent = fs.readFileSync(htmlPath, "utf8");
        } else {
          console.warn(`HTML content file not found for article: ${article.id} at path: ${htmlPath}`);
          htmlContent = `<div class="space-y-4"><p class="text-slate-700 leading-relaxed font-sans">${article.excerpt}</p></div>`;
        }

        await client.query(
          `
          INSERT INTO articles (id, title, meta_title, meta_description, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            meta_title = EXCLUDED.meta_title,
            meta_description = EXCLUDED.meta_description,
            excerpt = EXCLUDED.excerpt,
            category_name = EXCLUDED.category_name,
            category_slug = EXCLUDED.category_slug,
            date = EXCLUDED.date,
            read_time = EXCLUDED.read_time,
            image_url = EXCLUDED.image_url,
            image_gradient = EXCLUDED.image_gradient,
            author = EXCLUDED.author,
            content = EXCLUDED.content
          `,
          [
            article.id,
            article.title,
            article.meta_title,
            article.meta_description,
            article.excerpt,
            article.category_name,
            article.category_slug,
            article.date,
            article.read_time,
            article.image_url,
            article.image_gradient,
            article.author,
            htmlContent,
          ]
        );
      }
      console.log("Database pre-populated successfully with 8 SEO-optimized HTML articles!");
    } else {
      console.log(`Database already contains ${count} articles. Skipping seeding.`);
    }
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  } finally {
    client.release();
  }
}
