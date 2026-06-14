"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createArticle } from "../actions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewArticlePage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await createArticle(null, formData);
      if (result && result.error) {
        setErrorMsg(result.error);
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      console.error("Error submitting new article form:", err);
      setErrorMsg("Ocurrió un error inesperado al intentar guardar el artículo.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mb-6 group cursor-pointer"
          >
            <svg
              className="h-4 w-4 transition-transform duration-250 transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al panel de control
          </Link>

          {/* Form container */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
            <div className="border-b border-slate-100 pb-5 mb-6">
              <h1 className="font-display text-2xl font-extrabold text-slate-900 leading-tight">
                Crear Nuevo Artículo SEO
              </h1>
              <p className="font-sans text-sm text-slate-500 mt-1">
                Escribe contenidos completos de entre 2000 y 2500 palabras estructurados para posicionar en buscadores.
              </p>
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-red-150 bg-red-50 p-4 text-sm text-red-700 mb-6 font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-1.5">
                  Título del Artículo
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder="Ej: Cobertura de robo en el jardín: qué límites tiene tu póliza"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                />
              </div>

              {/* Keyword & Publication Schedule */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="keyword" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Keyword Principal (Única)
                  </label>
                  <input
                    type="text"
                    name="keyword"
                    id="keyword"
                    placeholder="Ej: coberturas seguro jardin"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="publishedDate" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Fecha de Publicación
                  </label>
                  <input
                    type="date"
                    name="publishedDate"
                    id="publishedDate"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="publishedTime" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Hora de Publicación
                  </label>
                  <input
                    type="time"
                    name="publishedTime"
                    id="publishedTime"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>
              </div>

              {/* SEO Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Meta Título (SEO)
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    id="metaTitle"
                    placeholder="Ej: Seguro de Robo en el Jardín: Coberturas y Límites"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Idealmente entre 50 y 60 caracteres.
                  </p>
                </div>
                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Meta Descripción (SEO)
                  </label>
                  <input
                    type="text"
                    name="metaDescription"
                    id="metaDescription"
                    placeholder="Ej: ¿Cubre el seguro de hogar los robos en jardines o terrazas? Analizamos las coberturas, límites y exclusiones comunes..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Idealmente entre 150 y 160 caracteres.
                  </p>
                </div>
              </div>


              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Categoría
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white transition duration-200"
                  >
                    <option value="comparativas">Comparativas</option>
                    <option value="coberturas">Coberturas</option>
                    <option value="tipos-de-vivienda">Tipos de Vivienda</option>
                    <option value="guias">Guías</option>
                  </select>
                </div>

                {/* Read Time */}
                <div>
                  <label htmlFor="readTime" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Tiempo de Lectura
                  </label>
                  <input
                    type="text"
                    name="readTime"
                    id="readTime"
                    required
                    placeholder="Ej: Lectura de 12 min"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Autor / Cargo
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    required
                    placeholder="Ej: Patricia G. (Ex-Perito)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>

                {/* Image upload */}
                <div>
                  <label htmlFor="image" className="block text-sm font-bold text-slate-700 mb-1.5">
                    Imagen de Portada (Volumen Docker)
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="w-full text-sm font-sans text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 file:cursor-pointer transition duration-200"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    La imagen se guardará de forma permanente en el volumen configurado del contenedor.
                  </p>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-bold text-slate-700 mb-1.5">
                  Extracto Breve (SEO Meta Description)
                </label>
                <textarea
                  name="excerpt"
                  id="excerpt"
                  required
                  rows={2}
                  placeholder="Escribe una descripción resumida atractiva para los buscadores."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-bold text-slate-700 mb-1.5">
                  Cuerpo del Artículo (Soporta títulos con ## y listas)
                </label>
                <textarea
                  name="content"
                  id="content"
                  required
                  rows={12}
                  placeholder="Escribe el artículo aquí... Recuerda estructurarlo en secciones con subencabezados (ej. ## Título Sección), listas con asteriscos (*) o enumeraciones (1. 2.) para que el parser lo renderice en HTML semántico."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                />
              </div>

              {/* Submit button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition duration-200"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/10 hover:bg-teal-700 transition duration-200 disabled:bg-teal-400 cursor-pointer"
                >
                  {loading ? "Guardando artículo..." : "Publicar Artículo"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
