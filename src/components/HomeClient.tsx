"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import ArticleCard from "@/components/ArticleCard";

import { Article } from "@/data/articles";

interface HomeClientProps {
  initialArticles: Article[];
}

const CATEGORIES = [
  { name: "Todos los artículos", slug: "" },
  { name: "Comparativas", slug: "comparativas" },
  { name: "Coberturas", slug: "coberturas" },
  { name: "Tipos de Vivienda", slug: "tipos-de-vivienda" },
  { name: "Guías", slug: "guias" },
];

export default function HomeClient({ initialArticles }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      
      const categoryParam = params.get("category");
      if (categoryParam && ["comparativas", "coberturas", "tipos-de-vivienda", "guias"].includes(categoryParam)) {
        setSelectedCategory(categoryParam);
      }

      const searchParam = params.get("search");
      if (searchParam) {
        setSearchTerm(searchParam);
      }
    }
  }, []);

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const filteredArticles = initialArticles.filter((article) => {
    const matchesCategory = selectedCategory
      ? article.category.slug === selectedCategory
      : true;
    
    if (!searchTerm) return matchesCategory;

    const normalizedSearch = normalizeText(searchTerm);
    const normalizedTitle = normalizeText(article.title);
    const normalizedExcerpt = normalizeText(article.excerpt);

    const matchesSearch =
      normalizedTitle.includes(normalizedSearch) ||
      normalizedExcerpt.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (slug) {
        url.searchParams.set("category", slug);
      } else {
        url.searchParams.delete("category");
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (query) {
        url.searchParams.set("search", query);
      } else {
        url.searchParams.delete("search");
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  return (
    <>
      {/* Header / Navbar with search state and callbacks */}
      <Header 
        currentCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100" id="hero-section">
          {/* Background decorative gradient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[10%] w-[400px] h-[400px] rounded-full bg-teal-100/30 blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[15%] w-[350px] h-[350px] rounded-full bg-cyan-100/25 blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Tag line */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100/60 px-3.5 py-1.5 text-xs font-semibold text-teal-800 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              Portal 100% Informativo e Independiente
            </div>

            {/* Friendly Title H1 */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto mb-6">
              Entiende tu seguro de hogar,<span className="text-teal-600 block mt-2">sin sorpresas ni letra pequeña.</span>
            </h1>

            {/* Impartial Subtitle */}
            <p className="font-sans text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Analizamos coberturas, comparamos pólizas del mercado y redactamos guías claras. 
              Sin comisiones, sin venderte nada y sin favorecer a ninguna aseguradora.
            </p>
          </div>
        </section>

        {/* Content Section (Articles Grid) */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="blog-section">
          {/* Section Header & Interactive Filter Bar */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8 border-b border-slate-200 pb-5">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                {searchTerm 
                  ? `Resultados para "${searchTerm}"`
                  : "Últimos Artículos Publicados"
                }
              </h2>
              <p className="font-sans text-sm text-slate-500 mt-1">
                Información analizada y redactada por expertos independientes en consumo.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2" id="category-filters">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.slug;
                return (
                  <button
                    key={category.slug}
                    onClick={() => handleCategorySelect(category.slug)}
                    className={`font-sans text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-teal-600 border-teal-600 text-white shadow-sm shadow-teal-600/10"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    id={`filter-btn-${category.slug || "all"}`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid responsive of cards */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" id="articles-grid">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8" id="no-articles-message">
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
                No se encontraron artículos
              </h3>
              <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto mb-6">
                No hemos encontrado ningún artículo que coincida con tu búsqueda o filtros actuales. ¡Prueba buscando otro tema!
              </p>
              <button
                onClick={() => {
                  handleCategorySelect("");
                  handleSearchChange("");
                }}
                className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700 transition duration-200 cursor-pointer shadow-sm"
              >
                Limpiar filtros y ver todos
              </button>
            </div>
          )}

          {/* About Us Component (Visually Differentiated) */}
          <AboutUs />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
