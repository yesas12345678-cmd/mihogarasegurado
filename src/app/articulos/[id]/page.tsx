import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pool } from "@/lib/db";
import { Article } from "@/data/articles";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

// Dynamic SEO metadata generation for article pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT title, excerpt, meta_title, meta_description FROM articles WHERE id = $1 AND published_at <= NOW()",
        [id]
      );
      if (rows.length > 0) {
        const article = rows[0];
        
        // Use custom SEO meta title and meta description if they exist, otherwise fallback
        const seoTitle = article.meta_title ? article.meta_title : `${article.title} | Mi Hogar Asegurado`;
        const seoDescription = article.meta_description ? article.meta_description : article.excerpt;

        return {
          title: seoTitle,
          description: seoDescription,
          openGraph: {
            title: seoTitle,
            description: seoDescription,
            type: "article",
          },
        };
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error generating metadata:", err);
  }

  return {
    title: "Artículo | Mi Hogar Asegurado",
    description: "Portal de información independiente sobre seguros de hogar.",
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  let article: Article | null = null;

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content, meta_title, meta_description FROM articles WHERE id = $1 AND published_at <= NOW()",
        [id]
      );
      
      if (rows.length > 0) {
        const row = rows[0];
        article = {
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
          content: row.content,
          metaTitle: row.meta_title || undefined,
          metaDescription: row.meta_description || undefined,
        };
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error fetching article from PostgreSQL:", err);
  }

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Header image area */}
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-slate-100 border-b border-slate-200">
            {article.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${article.imageGradient} flex items-center justify-center p-8`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/25 backdrop-blur-md text-white border border-white/20">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-12">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mb-8 group cursor-pointer"
            >
              <svg
                className="h-4 w-4 transition-transform duration-250 transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Volver a la portada
            </Link>

            {/* Category, Date & Read Time */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-md border border-teal-100 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                {article.category.name}
              </span>
              <span className="font-sans text-xs text-slate-400">{article.date}</span>
              <span className="font-sans text-xs text-slate-400">•</span>
              <span className="font-sans text-xs text-slate-400">{article.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-3 border-y border-slate-150 py-4 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white font-semibold text-sm">
                {article.author.split(" ")[0][0]}
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-slate-900">{article.author}</p>
                <p className="font-sans text-xs text-slate-500">Colaborador Experto de Mi Hogar Asegurado</p>
              </div>
            </div>

            {/* Body Content (renders raw HTML for custom Tailwind CSS designs) */}
            <div className="article-body font-sans text-base leading-relaxed text-slate-700">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
