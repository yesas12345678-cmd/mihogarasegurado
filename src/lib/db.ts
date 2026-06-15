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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        meta_title VARCHAR(255),
        meta_description TEXT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        keyword VARCHAR(255)
      );
    `);

    // 2. Safely alter table schema to add meta fields if missing
    await client.query(`
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_description TEXT;
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS keyword VARCHAR(255);
    `);

    // 3. Add UNIQUE constraint for keyword if not exists
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'articles_keyword_key') THEN
          ALTER TABLE articles ADD CONSTRAINT articles_keyword_key UNIQUE (keyword);
        END IF;
      END
      $$;
    `);

    // 4. Check if table is empty
    const { rows } = await client.query("SELECT COUNT(*) FROM articles");
    const count = parseInt(rows[0].count, 10);

    if (count === 0) {
      console.log("Database table 'articles' is empty. Pre-populating with SEO-optimized HTML articles...");

      const articlesDir = path.join(process.cwd(), "src", "data", "articles");

      for (const article of SEED_ARTICLES) {
        // Force empty content for all articles to ensure a word count of 0 as requested
        const htmlContent = "";

        // Parse published_at or use current timestamp
        const publishedAtVal = article.published_at ? new Date(article.published_at) : new Date();

        await client.query(
          `
          INSERT INTO articles (id, title, meta_title, meta_description, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content, published_at, keyword)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
            content = EXCLUDED.content,
            published_at = EXCLUDED.published_at,
            keyword = EXCLUDED.keyword
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
            publishedAtVal,
            article.keyword || `default-key-${article.id}`
          ]
        );
      }
      console.log("Database pre-populated successfully with 100 SEO-optimized HTML articles!");
    } else {
      console.log(`Database already contains ${count} articles. Skipping seeding.`);
    }

    // Ensure all articles have semantic cover and middle images populated
    const { rows: articleRows } = await client.query("SELECT id, title, category_slug, image_url, content FROM articles");
    let needsUpdate = false;
    for (const row of articleRows) {
      if (!row.image_url || row.image_url.includes('gradient') || (row.content && row.content.trim().startsWith('{') && !row.content.includes('<img'))) {
        needsUpdate = true;
        break;
      }
    }
    
    if (needsUpdate) {
      console.log("Database patching: updating articles with semantic cover and middle images...");
      const COVER_IMAGES = {
        cozy_house: "/uploads/cover_cozy_house.png",
        kitchen_water: "/uploads/cover_kitchen_water.png",
        apartment_view: "/uploads/cover_apartment_view.png",
        reclaim_form: "/uploads/cover_reclaim_form.png",
        house_keys: "/uploads/cover_house_keys.png"
      };

      const MIDDLE_IMAGES = {
        broken_glass: "/uploads/middle_broken_glass.png",
        burnt_socket: "/uploads/middle_burnt_socket.png",
        water_leak: "/uploads/middle_water_leak.png",
        house_interior: "/uploads/middle_house_interior.png",
        contract_signing: "/uploads/middle_contract_signing.png"
      };

      const getSemanticCoverImage = (categorySlug: string, title: string) => {
        const t = title.toLowerCase();
        if (categorySlug === "comparativas") {
          if (t.includes("alquiler") || t.includes("impago")) return COVER_IMAGES.house_keys;
          return COVER_IMAGES.cozy_house;
        }
        if (categorySlug === "coberturas") {
          if (t.includes("agua") || t.includes("gotera") || t.includes("filtracion") || t.includes("tuberia") || t.includes("helada")) {
            return COVER_IMAGES.kitchen_water;
          }
          return COVER_IMAGES.reclaim_form;
        }
        if (categorySlug === "tipos-de-vivienda") {
          if (t.includes("chalet") || t.includes("unifamiliar") || t.includes("campo") || t.includes("jardin") || t.includes("piscina") || t.includes("masia")) {
            return COVER_IMAGES.cozy_house;
          }
          if (t.includes("piso") || t.includes("atico") || t.includes("altura") || t.includes("compartido") || t.includes("loft")) {
            return COVER_IMAGES.apartment_view;
          }
          return COVER_IMAGES.house_keys;
        }
        return COVER_IMAGES.reclaim_form;
      };

      const getSemanticMiddleImage = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes("agua") || t.includes("gotera") || t.includes("filtracion") || t.includes("tuberia") || t.includes("helada") || t.includes("humedades")) {
          return MIDDLE_IMAGES.water_leak;
        }
        if (t.includes("robo") || t.includes("trastero") || t.includes("cristal") || t.includes("llave") || t.includes("cerrajero") || t.includes("vandalismo") || t.includes("atraco")) {
          return MIDDLE_IMAGES.broken_glass;
        }
        if (t.includes("electrico") || t.includes("cortocircuito") || t.includes("luz") || t.includes("incendio") || t.includes("chimenea") || t.includes("placas") || t.includes("rayo") || t.includes("apagón")) {
          return MIDDLE_IMAGES.burnt_socket;
        }
        if (t.includes("contrato") || t.includes("reclamar") || t.includes("perito") || t.includes("baja") || t.includes("cancelar") || t.includes("proporcional") || t.includes("impago") || t.includes("ley") || t.includes("legal") || t.includes("defensa")) {
          return MIDDLE_IMAGES.contract_signing;
        }
        return MIDDLE_IMAGES.house_interior;
      };

      const extractHtmlContent = (rawContent: string) => {
        if (!rawContent) return "";
        const trimmed = rawContent.trim();
        if (!trimmed.startsWith('{')) return trimmed;
        try {
          const parsed = JSON.parse(trimmed);
          return parsed.content || "";
        } catch (e) {
          const match = trimmed.match(/"content"\s*:\s*"([\s\S]*?)"\s*\}\s*$/);
          if (match) {
            return match[1]
              .replace(/\\"/g, '"')
              .replace(/\\n/g, '\n')
              .replace(/\\r/g, '\r')
              .replace(/\\t/g, '\t');
          }
          try {
            const cleaned = trimmed.replace(/[\n\r\t]/g, (m) => m === '\n' ? '\\n' : m === '\r' ? '\\r' : '\\t');
            const parsed = JSON.parse(cleaned);
            return parsed.content || "";
          } catch (e2) {
            return trimmed;
          }
        }
      };

      for (const row of articleRows) {
        const newCoverImage = getSemanticCoverImage(row.category_slug, row.title);
        const htmlContent = extractHtmlContent(row.content);
        
        let finalHtml = htmlContent;
        finalHtml = finalHtml.replace(/<div class="my-8 rounded-2xl[\s\S]*?<\/div>/gi, "");
        finalHtml = finalHtml.replace(/<img[\s\S]*?\/>/gi, "");

        const middleImageUrl = getSemanticMiddleImage(row.title);
        const middleImageTag = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative aspect-[16/9] w-full max-w-2xl mx-auto group">
  <img src="${middleImageUrl}" alt="Ilustración sobre ${row.title}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
</div>
`;
        const paragraphs = finalHtml.split('</p>');
        if (paragraphs.length >= 3) {
          paragraphs.splice(2, 0, middleImageTag);
          finalHtml = paragraphs.join('</p>');
        } else {
          finalHtml += middleImageTag;
        }

        const cleanJson = {
          title: row.title,
          content: finalHtml
        };
        const contentValue = JSON.stringify(cleanJson);

        await client.query(
          "UPDATE articles SET image_url = $1, content = $2 WHERE id = $3",
          [newCoverImage, contentValue, row.id]
        );
      }
      console.log("Database patching completed successfully!");
    }
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  } finally {
    client.release();
  }
}
