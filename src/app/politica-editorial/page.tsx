import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política Editorial y Rigor Científico | Mi Hogar Asegurado",
  description: "Conoce nuestro compromiso con la verdad, la transparencia y el rigor técnico en el análisis de seguros de hogar en España.",
};

export default function PoliticaEditorialPage() {
  const pillars = [
    {
      title: "Criterios de Investigación y Fact-Checking",
      desc: "Nuestros artículos no se basan en opiniones superficiales o folletos publicitarios de aseguradoras. Realizamos lecturas sistemáticas de las Condiciones Generales y Particulares registradas formalmente por las compañías en el Registro de Contratos de la Dirección General de Seguros y Fondos de Pensiones (DGSFP). Contrastamos técnicamente las cláusulas de exclusión con operarios, fontaneros y peritos oficiales en activo para validar qué siniestros son rechazados y cuáles son cubiertos realmente."
    },
    {
      title: "Selección de Fuentes de Autoridad",
      desc: "Solo citamos y utilizamos fuentes oficiales de alta autoridad jurídica y sectorial en España. Entre ellas se encuentran el Boletín Oficial del Estado (BOE), la Ley 50/1980 de Contrato de Seguro, la Ley de Arrendamientos Urbanos (LAU), estadísticas oficiales de UNESPA (Asociación Empresarial del Seguro), reportes de ICEA y resoluciones oficiales del Servicio de Reclamaciones de la DGSFP."
    },
    {
      title: "Proceso de Actualización y Revisión Constante",
      desc: "El mercado asegurador y los precios de las primas cambian con frecuencia debido al IPC y los costes de reconstrucción. Nos comprometemos a auditar y actualizar cada guía e informe de comparativas de forma periódica. Al inicio de cada publicación se indica claramente la fecha de redacción original y la fecha del último análisis técnico realizado, además de la fecha de la próxima revisión programada."
    },
    {
      title: "Fe de Erratas y Transparencia en Correcciones",
      desc: "A pesar de nuestro rigor, si detectamos un error técnico, un cambio legislativo o una errata en un sublímite de póliza, actuamos con rapidez. Los lectores pueden notificarnos cualquier discrepancia directamente por correo. Las correcciones importantes se aplican en un plazo máximo de 48 horas laborables y se documentan transparentemente indicando el cambio realizado en la última fecha de actualización."
    }
  ];

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
              Rigor Técnico
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              Política Editorial y Estándares de Calidad
            </h1>
            <p className="font-sans text-slate-650 text-base leading-relaxed">
              En <strong>Mi Hogar Asegurado</strong>, nos tomamos muy en serio la confianza de nuestros lectores. Analizar productos YMYL (Your Money or Your Life) como los seguros requiere la máxima precisión. Por ello, aplicamos un protocolo estricto de control de calidad editorial para asegurar que cada recomendación, guía y caso de estudio sea preciso, veraz y totalmente independiente.
            </p>
          </div>

          <div className="space-y-8">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="border-l-4 border-teal-500 pl-5 py-2">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm text-slate-650 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* E-E-A-T Independence Box */}
          <div className="mt-12 rounded-2xl bg-slate-900 text-white p-8 shadow-md">
            <h3 className="font-display text-lg font-bold text-teal-400 mb-3">Compromiso de Independencia Editorial</h3>
            <p className="font-sans text-xs text-slate-300 leading-relaxed mb-4">
              Ninguna compañía aseguradora (como Mapfre, Allianz, Santalucía, Mutua Madrileña, etc.) tiene participación en nuestra junta editorial ni puede influir en las valoraciones finales de nuestros análisis. Nuestras comparativas y guías de reclamaciones se fundamentan exclusivamente en las condiciones técnicas reales de los contratos.
            </p>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              No nos financiamos mediante la recomendación sesgada o captación de comisiones encubiertas por contratación. Garantizamos objetividad absoluta para que el usuario elija informado.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
