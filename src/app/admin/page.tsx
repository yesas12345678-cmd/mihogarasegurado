import Link from "next/link";
import { pool, initDB } from "@/lib/db";
import { resetDemoArticles } from "./actions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Initialize DB tables and seed if empty
  await initDB();

  let articles: any[] = [];
  let errorMsg = "";

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, excerpt, category_name, date, read_time, image_url, image_gradient, author FROM articles ORDER BY created_at DESC"
      );
      articles = rows;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error fetching articles for admin panel:", err);
    errorMsg = "No se pudo conectar a la base de datos PostgreSQL. Verifica la conexión.";
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Welcome */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-teal-600 block mb-1">
                Panel de Control
              </span>
              <h1 className="font-display text-3xl font-extrabold text-slate-900 leading-tight">
                Administrador de Contenidos
              </h1>
            </div>

            {/* Admin actions */}
            <div className="flex flex-wrap gap-3">
              <form action={resetDemoArticles}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition duration-200 cursor-pointer"
                >
                  Restablecer Demostración
                </button>
              </form>

              <Link
                href="/admin/nuevo"
                className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/10 hover:bg-teal-700 transition duration-200"
              >
                + Escribir Artículo
              </Link>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-2xl border border-red-150 bg-red-50 p-4 text-sm text-red-700 mb-6">
              {errorMsg}
            </div>
          )}

          {/* List of articles */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Listado de Entradas ({articles.length})
              </h2>
              <span className="font-sans text-xs text-slate-500">
                Sincronizado con la base de datos externa
              </span>
            </div>

            {articles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="py-4 px-6">Portada</th>
                      <th className="py-4 px-6">Título</th>
                      <th className="py-4 px-6">Categoría</th>
                      <th className="py-4 px-6">Fecha y Autor</th>
                      <th className="py-4 px-6 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans text-sm text-slate-700">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Thumbnail */}
                        <td className="py-4 px-6">
                          {article.image_url ? (
                            <div className="h-12 w-20 overflow-hidden rounded-lg border border-slate-200 relative">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={article.image_url}
                                alt={article.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className={`h-12 w-20 rounded-lg bg-gradient-to-br ${article.image_gradient} flex items-center justify-center text-white text-[10px] font-bold`}>
                              CSS Gradient
                            </div>
                          )}
                        </td>
                        
                        {/* Title */}
                        <td className="py-4 px-6 font-medium text-slate-900 max-w-md">
                          <Link href={`/articulos/${article.id}`} className="hover:text-teal-600 transition-colors">
                            {article.title}
                          </Link>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{article.excerpt}</p>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center rounded-md bg-slate-150 px-2 py-0.5 text-xs font-medium text-slate-800">
                            {article.category_name}
                          </span>
                        </td>

                        {/* Date and Author */}
                        <td className="py-4 px-6">
                          <div>{article.date}</div>
                          <div className="text-xs text-slate-400">Por {article.author}</div>
                        </td>

                        {/* Link to view */}
                        <td className="py-4 px-6 text-right">
                          <Link
                            href={`/articulos/${article.id}`}
                            className="inline-flex items-center text-xs font-bold text-teal-600 hover:text-teal-700 transition"
                          >
                            Ver Artículo &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
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
                  No hay artículos registrados
                </h3>
                <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto mb-6">
                  La tabla está vacía. Puedes restablecer los artículos de demostración o escribir uno desde cero.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
