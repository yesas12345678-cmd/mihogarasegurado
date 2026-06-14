"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { editArticle } from "../../actions";

interface EditFormClientProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    category_slug: string;
    read_time: string;
    author: string;
    content: string;
    meta_title: string;
    meta_description: string;
    keyword: string;
  };
  defaultDate: string;
  defaultTime: string;
}

export default function EditFormClient({ article, defaultDate, defaultTime }: EditFormClientProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await editArticle(null, formData);
      if (result && result.error) {
        setErrorMsg(result.error);
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      console.error("Error submitting edit article form:", err);
      setErrorMsg("Ocurrió un error inesperado al intentar actualizar el artículo.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mb-2 group cursor-pointer"
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
            Editar Artículo
          </h1>
          <p className="font-sans text-sm text-slate-500 mt-1">
            Modifica la planificación organizativa, la keyword y los metadatos SEO de este artículo.
          </p>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-red-150 bg-red-50 p-4 text-sm text-red-700 mb-6 font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hidden current ID */}
          <input type="hidden" name="currentId" value={article.id} />

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
              defaultValue={article.title}
              placeholder="Ej: Cobertura de daños estéticos: qué límites tiene tu seguro"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-bold text-slate-700 mb-1.5">
              URL Slug (Identificador único de ruta)
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              required
              defaultValue={article.id}
              placeholder="Ej: cobertura-danos-esteticos-limites"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-mono placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200 text-slate-700"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Modificar el slug cambiará la URL pública del artículo. Utiliza solo minúsculas, números y guiones.
            </p>
          </div>

          {/* Keyword y Tiempos de Publicación */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Keyword */}
            <div>
              <label htmlFor="keyword" className="block text-sm font-bold text-slate-700 mb-1.5">
                Keyword Principal
              </label>
              <input
                type="text"
                name="keyword"
                id="keyword"
                required
                defaultValue={article.keyword || ""}
                placeholder="Ej: daños esteticos seguro hogar"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
              />
            </div>

            {/* Published Date */}
            <div>
              <label htmlFor="publishedDate" className="block text-sm font-bold text-slate-700 mb-1.5">
                Fecha de Publicación
              </label>
              <input
                type="date"
                name="publishedDate"
                id="publishedDate"
                required
                defaultValue={defaultDate}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
              />
            </div>

            {/* Published Time */}
            <div>
              <label htmlFor="publishedTime" className="block text-sm font-bold text-slate-700 mb-1.5">
                Hora de Publicación
              </label>
              <input
                type="time"
                name="publishedTime"
                id="publishedTime"
                required
                defaultValue={defaultTime}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
              />
            </div>
          </div>

          {/* SEO Meta Fields */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-bold text-slate-700 mb-1.5">
                Meta Título (SEO)
              </label>
              <input
                type="text"
                name="metaTitle"
                id="metaTitle"
                defaultValue={article.meta_title || ""}
                placeholder="Ej: Seguro de Daños Estéticos: Coberturas y Límites"
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
                defaultValue={article.meta_description || ""}
                placeholder="Ej: ¿Qué cubren los daños estéticos en el seguro de hogar? Desglosamos límites periciales comunes..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Idealmente entre 150 y 160 caracteres.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-1.5">
                Categoría
              </label>
              <select
                name="category"
                id="category"
                required
                defaultValue={article.category_slug}
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
                defaultValue={article.read_time}
                placeholder="Ej: Lectura de 12 min"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
              />
            </div>

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
                defaultValue={article.author}
                placeholder="Ej: Patricia G. (Ex-Perito)"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-bold text-slate-700 mb-1.5">
              Extracto Breve
            </label>
            <textarea
              name="excerpt"
              id="excerpt"
              required
              rows={2}
              defaultValue={article.excerpt}
              placeholder="Escribe una descripción resumida atractiva para tarjetas y previsualizaciones."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
            />
          </div>

          {/* Content (Hidden or read-only/editable if needed, but keeping it as requested) */}
          <div>
            <label htmlFor="content" className="block text-sm font-bold text-slate-700 mb-1.5">
              Cuerpo del Artículo (HTML)
            </label>
            <textarea
              name="content"
              id="content"
              rows={8}
              defaultValue={article.content || ""}
              placeholder="Por el momento, mantén este campo vacío para nuevos artículos."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-mono placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200 text-slate-700"
            />
          </div>

          {/* Submit buttons */}
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
              {loading ? "Guardando cambios..." : "Guardar Cambios"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
