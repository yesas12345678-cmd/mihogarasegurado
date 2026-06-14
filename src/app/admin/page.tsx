import Link from "next/link";
import { pool, initDB } from "@/lib/db";
import { resetDemoArticles } from "./actions";
import { logoutAdmin } from "@/app/login/actions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminClient from "@/components/AdminClient";

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
        "SELECT id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, published_at, keyword, content FROM articles ORDER BY published_at DESC"
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

              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl border border-red-150 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-100/50 hover:text-red-800 transition duration-200 cursor-pointer"
                >
                  Cerrar Sesión
                </button>
              </form>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-2xl border border-red-150 bg-red-50 p-4 text-sm text-red-700 mb-6">
              {errorMsg}
            </div>
          )}

          {/* Interactive Client Component List */}
          <AdminClient initialArticles={articles} />
        </div>
      </main>
      <Footer />
    </>
  );
}
