"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  currentCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchTerm?: string;
  onSearchChange?: (search: string) => void;
}

export default function Header({
  currentCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const categories = [
    { name: "Comparativas", slug: "comparativas" },
    { name: "Coberturas", slug: "coberturas" },
    { name: "Tipos de Vivienda", slug: "tipos-de-vivienda" },
    { name: "Guías", slug: "guias" },
  ];

  // Sync state with prop changes (e.g. from HomeClient filter resets)
  useEffect(() => {
    setSearchQuery(searchTerm || "");
  }, [searchTerm]);

  // Read initial search param from URL on mount if not controlled
  useEffect(() => {
    if (typeof window !== "undefined" && !searchTerm) {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    }
  }, [searchTerm]);

  const handleNavClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      if (slug) {
        router.push(`/?category=${slug}`);
      } else {
        router.push("/");
      }
    }
    setIsOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchQuery);
    } else {
      if (searchQuery.trim()) {
        router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        router.push("/");
      }
    }
    setIsOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (onSearchChange) {
      onSearchChange("");
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => handleNavClick("")}
          className="flex items-center gap-2 group flex-shrink-0"
          id="nav-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/20 group-hover:bg-teal-700 transition-colors duration-200">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900">
            Mi Hogar<span className="text-teal-600">Asegurado</span>
          </span>
        </Link>

        {/* Desktop Menu & Search Area */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            {categories.map((category) => {
              const isActive = currentCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => handleNavClick(category.slug)}
                  className={`font-sans text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-teal-600 border-b-2 border-teal-600 pb-1"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                  id={`nav-link-${category.slug}`}
                >
                  {category.name}
                </button>
              );
            })}
          </nav>

          {/* Elegant Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-64">
            <input
              type="text"
              placeholder="Buscar temas o artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50/70 px-4 py-1.5 pl-9 pr-8 text-xs font-sans placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-200 text-slate-800"
            />
            <button
              type="submit"
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>
        </div>

        {/* Mobile Hamburguer button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          id="mobile-menu-button"
        >
          <span className="sr-only">Abrir menú principal</span>
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white" id="mobile-menu">
          {/* Search bar inside mobile menu */}
          <div className="px-4 py-3 border-b border-slate-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Buscar temas o artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 pl-9 pr-8 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-200 text-slate-800"
              />
              <button
                type="submit"
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>
          </div>

          <div className="space-y-1 px-4 py-3 pb-4">
            {categories.map((category) => {
              const isActive = currentCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => handleNavClick(category.slug)}
                  className={`block w-full text-left rounded-lg px-3 py-2 text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-teal-50 text-teal-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  id={`mobile-nav-link-${category.slug}`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
