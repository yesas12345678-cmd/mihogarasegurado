import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_ARTICLES } from "@/data/articles";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_ARTICLES.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = ALL_ARTICLES.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  // Simple parser to render basic markdown elements into clean JSX elements
  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      // Headers
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="font-display text-2xl font-extrabold text-slate-900 mt-8 mb-4">
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      
      // Unordered list items
      if (paragraph.startsWith("*   ") || paragraph.startsWith("-   ") || paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
        const items = paragraph.split("\n");
        return (
          <ul key={index} className="list-disc pl-5 space-y-2 text-slate-700 font-sans my-4">
            {items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item.replace(/^(\*\s+|\-\s+|\*\s{3}|\-\s{3})/, "")}
              </li>
            ))}
          </ul>
        );
      }

      // Ordered list items
      if (paragraph.match(/^\d+\.\s+/)) {
        const items = paragraph.split("\n");
        return (
          <ol key={index} className="list-decimal pl-5 space-y-2 text-slate-700 font-sans my-4">
            {items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item.replace(/^\d+\.\s+/, "")}
              </li>
            ))}
          </ol>
        );
      }

      // Bold text replacements (for simple bold formatting)
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      const elements = parts.map((part, pidx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pidx} className="font-bold text-slate-950">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <p key={index} className="font-sans text-base leading-relaxed text-slate-700 mb-6">
          {elements}
        </p>
      );
    });
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm">
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

          {/* Body Content */}
          <div className="article-body">
            {renderContent(article.content)}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
