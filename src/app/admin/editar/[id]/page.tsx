import { notFound } from "next/navigation";
import { pool } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditFormClient from "./EditFormClient";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: EditPageProps) {
  const { id } = await params;
  let article: any = null;

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, excerpt, category_slug, read_time, author, content, meta_title, meta_description, published_at, keyword FROM articles WHERE id = $1",
        [id]
      );
      if (rows.length > 0) {
        article = rows[0];
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error fetching article for editing:", err);
  }

  if (!article) {
    notFound();
  }

  // Format published_at timestamp to separate date and time for HTML inputs
  const pubDate = new Date(article.published_at);
  const tzOffset = pubDate.getTimezoneOffset() * 60000; // local offset in ms
  const localISODate = new Date(pubDate.getTime() - tzOffset).toISOString();
  
  const publishedDate = localISODate.split("T")[0]; // YYYY-MM-DD
  const publishedTime = String(pubDate.getHours()).padStart(2, "0") + ":" + String(pubDate.getMinutes()).padStart(2, "0"); // HH:MM

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <EditFormClient 
            article={article} 
            defaultDate={publishedDate} 
            defaultTime={publishedTime} 
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
