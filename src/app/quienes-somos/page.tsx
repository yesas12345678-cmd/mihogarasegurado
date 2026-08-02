import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Quiénes Somos e Independencia | Mi Hogar Asegurado",
  description: "Conoce el origen, misión y financiación independiente de Mi Hogar Asegurado. Rigor pericial y legal al servicio del consumidor.",
};

export default function QuienesSomosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm">
          
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

          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-100 mb-3">
              Nuestra Misión
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              Quiénes Somos: Transparencia en Seguros de Hogar
            </h1>
            <p className="font-sans text-slate-650 text-base leading-relaxed">
              Mi Hogar Asegurado nació en 2026 con un objetivo muy claro: equilibrar la balanza entre las aseguradoras y el consumidor final. Las pólizas de seguros de hogar en España se redactan bajo una fuerte jerga jurídica y técnica que, con frecuencia, deja al tomador indefenso ante goteras, incendios o robos debido a exclusiones que desconocía.
            </p>
          </div>

          {/* Core Story */}
          <div className="space-y-6 text-slate-650 font-sans text-sm leading-relaxed mb-10">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">¿Quién está detrás del proyecto?</h2>
            <p>
              Detrás de este portal de información independiente hay un equipo técnico y legal cualificado, con amplia trayectoria real e inspección de campo:
            </p>
            <ul className="space-y-3 pl-4 list-disc text-slate-750">
              <li>
                <strong>Patricia Guerrero:</strong> Ex-Perito de Seguros e inspectora técnica. Ha evaluado e informado de miles de siniestros de hogar para grandes aseguradoras nacionales en Cataluña y Madrid.
              </li>
              <li>
                <strong>Carlos Merino:</strong> Jurista especializado en consumo, mediador y redactor de guías administrativas y jurídicas para reclamaciones de daños ante aseguradoras.
              </li>
              <li>
                <strong>Elena Ramos:</strong> Abogada ejerciente especializada en propiedad horizontal y arrendamientos urbanos, que asiste jurídicamente en conflictos cruzados de seguros en viviendas de alquiler.
              </li>
            </ul>
            <p>
              Puedes conocer sus trayectorias completas, números de colegiado oficiales y artículos publicados en nuestra{" "}
              <Link href="/autores" className="text-teal-600 hover:text-teal-750 font-semibold underline">
                página de equipo editorial
              </Link>.
            </p>
          </div>

          {/* Funding and Independence (Critical for E-E-A-T) */}
          <div className="border-t border-slate-100 pt-8 mb-10">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">¿Cómo se financia esta web?</h2>
            <p className="text-slate-650 font-sans text-sm leading-relaxed mb-4">
              Para garantizar que nuestras opiniones e informes comparativos sean objetivos y 100% sinceros, hemos diseñado un modelo de financiación limpio de conflictos de interés:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                <h4 className="font-bold text-slate-950 text-sm mb-1.5 flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-[10px] font-bold">✓</span>
                  Financiación Transparente
                </h4>
                <p className="text-slate-600 text-xs font-sans leading-relaxed">
                  Nos financiamos mediante publicidad contextual de banners y red publicitaria general (AdSense). Esto nos permite mantener los accesos libres y sin suscripciones.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                <h4 className="font-bold text-slate-950 text-sm mb-1.5 flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 text-[10px] font-bold">✗</span>
                  Cero Comisiones
                </h4>
                <p className="text-slate-600 text-xs font-sans leading-relaxed">
                  <strong>No vendemos pólizas ni captamos 'leads' de seguros.</strong> No nos pagan por llevar clientes a ninguna marca específica. Las notas de las comparativas corresponden únicamente al rigor de los contratos analizados.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">¿Quieres contactar con nosotros?</h2>
            <p className="text-slate-650 font-sans text-sm leading-relaxed mb-4">
              Si tienes dudas sobre una guía, has detectado un error técnico en una póliza revisada o quieres compartir tu caso de estudio pericial para que lo analicemos, puedes escribirnos a través de nuestro canal de contacto:
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 text-white font-sans text-sm font-bold px-6 py-3 hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/10 cursor-pointer"
            >
              Ir al Formulario de Contacto
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
