import Link from "next/link";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Map category slugs to specific tag colors for a more polished look
  const categoryStyles: Record<string, string> = {
    comparativas: "bg-cyan-50 text-cyan-700 border-cyan-100",
    coberturas: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "tipos-de-vivienda": "bg-amber-50 text-amber-700 border-amber-100",
    guias: "bg-violet-50 text-violet-700 border-violet-100",
  };

  const currentCategoryStyle = categoryStyles[article.category.slug] || "bg-slate-50 text-slate-700 border-slate-100";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50">
      {/* Visual Image Placeholder */}
      <div className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${article.imageGradient} flex items-center justify-center p-8`}>
        {/* Abstract design elements inside placeholder */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* House / Protection Minimalist Icon */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/25 backdrop-blur-md text-white border border-white/20 transition-transform duration-500 group-hover:scale-110">
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

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category & Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${currentCategoryStyle}`}>
            {article.category.name}
          </span>
          <span className="font-sans text-xs text-slate-400">{article.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-teal-600 transition-colors duration-200 mb-2">
          <Link href={`/articulos/${article.id}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="font-sans text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {article.excerpt}
        </p>

        {/* Bottom Metadata & Link */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="font-sans text-xs font-medium text-slate-400">
            Por {article.author}
          </span>
          
          <div className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 group-hover:text-teal-700 transition-colors duration-200">
            <span>Leer más</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
