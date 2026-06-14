"use client";

import { useState } from "react";
import Link from "next/link";

interface ArticleRow {
  id: string;
  title: string;
  excerpt: string;
  category_name: string;
  category_slug: string;
  date: string;
  read_time: string;
  image_url: string;
  image_gradient: string;
  author: string;
  published_at: string;
  keyword: string;
  content: string;
}

interface AdminClientProps {
  initialArticles: ArticleRow[];
}

export default function AdminClient({ initialArticles }: AdminClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewTab, setViewTab] = useState<"all" | "empty">("all");

  // Helper to count words in HTML content
  const getWordCount = (content: string | null | undefined): number => {
    if (!content) return 0;
    const cleanText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (!cleanText) return 0;
    return cleanText.split(/\s+/).filter(Boolean).length;
  };

  // Check if article is published
  const isPublished = (publishedAtStr: string): boolean => {
    const pubDate = new Date(publishedAtStr);
    return pubDate.getTime() <= Date.now();
  };

  // Format date and time to Spanish display
  const formatDateTime = (dateStr: string): string => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  // Handle Copy for AI
  const handleCopyForIA = (articleId: string, title: string, keyword: string) => {
    const textToCopy = `Título: ${title}\nKeywords a atacar: ${keyword || "Ninguna"}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopiedId(articleId);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error("Error al copiar para IA:", err);
      });
  };

  // Filter articles
  const filteredArticles = initialArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.keyword && article.keyword.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || article.category_slug === selectedCategory;

    const published = isPublished(article.published_at);
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "published" && published) ||
      (selectedStatus === "scheduled" && !published);

    const wordCount = getWordCount(article.content);
    const matchesTab = viewTab === "all" || (viewTab === "empty" && wordCount === 0);

    return matchesSearch && matchesCategory && matchesStatus && matchesTab;
  });

  const totalAllCount = initialArticles.length;
  const totalEmptyCount = initialArticles.filter((a) => getWordCount(a.content) === 0).length;

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
        <div className="flex-1 max-w-md">
          <label htmlFor="search" className="sr-only">
            Buscar artículos
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Buscar por título, slug o palabra clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pl-10 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-sans focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
            >
              <option value="all">Todas las categorías</option>
              <option value="comparativas">Comparativas</option>
              <option value="coberturas">Coberturas</option>
              <option value="tipos-de-vivienda">Tipos de Vivienda</option>
              <option value="guias">Guías</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-sans focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
            >
              <option value="all">Todos los estados</option>
              <option value="published">Publicados</option>
              <option value="scheduled">Programados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Articles List Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/50">
          {/* Tab buttons */}
          <div className="flex border-b border-slate-150">
            <button
              id="tab-all-articles"
              onClick={() => setViewTab("all")}
              className={`flex-1 md:flex-none px-6 py-4 text-sm font-sans font-bold border-b-2 transition-all duration-200 cursor-pointer ${
                viewTab === "all"
                  ? "border-teal-600 text-teal-600 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/30"
              }`}
            >
              Todos los artículos
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                viewTab === "all" ? "bg-teal-100 text-teal-700" : "bg-slate-250 text-slate-600"
              }`}>
                {totalAllCount}
              </span>
            </button>
            <button
              id="tab-empty-articles"
              onClick={() => setViewTab("empty")}
              className={`flex-1 md:flex-none px-6 py-4 text-sm font-sans font-bold border-b-2 transition-all duration-200 cursor-pointer ${
                viewTab === "empty"
                  ? "border-teal-600 text-teal-600 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50/30"
              }`}
            >
              Artículos vacíos
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                viewTab === "empty" 
                  ? "bg-teal-100 text-teal-700" 
                  : totalEmptyCount > 0 
                    ? "bg-amber-100 text-amber-700 animate-pulse font-extrabold" 
                    : "bg-slate-250 text-slate-600"
              }`}>
                {totalEmptyCount}
              </span>
            </button>
          </div>
          
          {/* List count and info */}
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white">
            <h2 className="font-display text-sm font-bold text-slate-700">
              {viewTab === "all" 
                ? `Todos los Artículos (${filteredArticles.length} mostrados)`
                : `Artículos sin contenido - 0 palabras (${filteredArticles.length} mostrados)`
              }
            </h2>
            <span className="font-sans text-xs text-slate-500">
              Último orden por fecha de publicación
            </span>
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Estado</th>
                  <th className="py-4 px-6">Título / Palabra Clave</th>
                  <th className="py-4 px-6">Categoría</th>
                  <th className="py-4 px-6">Fecha y Hora</th>
                  <th className="py-4 px-6">Palabras</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-sm text-slate-700">
                {filteredArticles.map((article) => {
                  const published = isPublished(article.published_at);
                  const wordCount = getWordCount(article.content);
                  
                  return (
                    <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Status Badges */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {published ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                            Publicado
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>
                            Programado
                          </span>
                        )}
                      </td>
                      
                      {/* Title and Keyword */}
                      <td className="py-4 px-6 max-w-sm sm:max-w-md">
                        <div className="font-semibold text-slate-900 line-clamp-2 leading-snug">
                          {article.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-slate-400">
                          <span>Slug: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-slate-600 font-mono">{article.id}</code></span>
                          {article.keyword && (
                            <>
                              <span>•</span>
                              <span className="text-teal-600 font-medium bg-teal-50/60 px-1.5 py-0.5 rounded border border-teal-100/50">Keyword: {article.keyword}</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200/50">
                          {article.category_name}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-6 whitespace-nowrap text-slate-600 text-xs">
                        {formatDateTime(article.published_at)}
                      </td>

                      {/* Word Count */}
                      <td className="py-4 px-6 whitespace-nowrap font-medium text-slate-600">
                        {wordCount} palabras
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 whitespace-nowrap text-right">
                        <div className="inline-flex gap-2">
                          <Link
                            href={published ? `/articulos/${article.id}` : "#"}
                            className={`inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold transition duration-200 ${
                              published 
                                ? "text-slate-700 hover:bg-slate-50" 
                                : "text-slate-300 bg-slate-50 cursor-not-allowed border-slate-100"
                            }`}
                            title={published ? "Ver artículo publicado" : "No publicado todavía"}
                            onClick={(e) => {
                              if (!published) e.preventDefault();
                            }}
                          >
                            Ver
                          </Link>

                          <Link
                            href={`/admin/editar/${article.id}`}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition duration-200"
                          >
                            Editar
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleCopyForIA(article.id, article.title, article.keyword)}
                            className={`inline-flex items-center justify-center rounded-lg px-2.5 py-1.5 text-xs font-bold border transition duration-200 cursor-pointer ${
                              copiedId === article.id
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "bg-teal-50 border-teal-100 text-teal-700 hover:bg-teal-100"
                            }`}
                          >
                            {copiedId === article.id ? "¡Copiado!" : "Copiar para IA"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-slate-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h3 className="font-display text-base font-bold text-slate-900 mb-1">
              Ningún artículo coincide con los filtros
            </h3>
            <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto">
              Intenta cambiar los términos de búsqueda o los filtros de categoría y estado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
