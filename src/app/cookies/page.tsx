import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Cookies | Mi Hogar Asegurado",
  description: "Información detallada sobre el uso de cookies técnicas, analíticas y publicitarias en el portal informativo de Mi Hogar Asegurado.",
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mb-8 group"
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

          <h1 className="font-display text-3xl font-extrabold text-slate-900 leading-tight mb-6">
            Políticas de Cookies
          </h1>

          <div className="space-y-6 text-slate-700 font-sans text-base leading-relaxed">
            <p>
              En **Mi Hogar Asegurado**, deseamos informarte de manera transparente que nuestro sitio web utiliza cookies técnicas para garantizar una correcta navegación y mejorar tu experiencia como lector.
            </p>
            
            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">1. ¿Qué es una Cookie?</h2>
            <p>
              Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador para recordar información sobre tu visita, como recordar tus preferencias de contraste o recopilar estadísticas de rendimiento de carga.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">2. Tipos de Cookies que Utiliza esta Web</h2>
            <ul className="list-disc pl-5 space-y-2 font-sans text-sm sm:text-base text-slate-700">
              <li>
                **Cookies Técnicas (Necesarias):** Son imprescindibles para que la web funcione correctamente y recuerde tus preferencias (como el estado del banner de consentimiento). No recopilan datos personales de ningún tipo.
              </li>
              <li>
                **Cookies Analíticas:** Nos permiten analizar de forma completamente anónima y agregada el tráfico de usuarios en las diferentes secciones para optimizar la velocidad del blog.
              </li>
              <li>
                **Cookies Publicitarias (Google AdSense):** Google y sus proveedores asociados utilizan estas cookies de seguimiento para mostrar anuncios adaptados a las búsquedas e intereses de cada lector.
              </li>
            </ul>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">3. ¿Cómo Deshabilitar las Cookies?</h2>
            <p>
              Puedes configurar tu navegador web para restringir, bloquear o borrar las cookies de cualquier sitio web en cualquier momento. Cada navegador posee una interfaz diferente: consulta la sección de ayuda de Safari, Chrome, Firefox o Edge para cambiar estas preferencias.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
