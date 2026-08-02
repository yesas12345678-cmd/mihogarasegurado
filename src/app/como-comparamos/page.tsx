import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Metodología de Evaluación y Comparativas | Mi Hogar Asegurado",
  description: "Descubre cómo analizamos y evaluamos de forma independiente e imparcial los seguros de hogar en España. Criterios objetivos libres de comisiones.",
};

export default function MetodologiaPage() {
  const criteria = [
    {
      num: "1",
      title: "Amplitud de Coberturas y Garantías (Ponderación: 25%)",
      desc: "Evaluamos el catálogo de garantías incluidas en la póliza básica y todo riesgo. Analizamos si coberturas críticas (como los daños por agua, daños eléctricos, fenómenos atmosféricos o la rotura de vitrocerámica) se ofrecen de serie o requieren contratación adicional.",
      detail: "Valoramos especialmente la inclusión de servicios prácticos como el 'manitas' a domicilio (bricolaje) y la cobertura de inhabitabilidad temporal."
    },
    {
      num: "2",
      title: "Límites Económicos y Letra Pequeña (Ponderación: 25%)",
      desc: "El diablo está en los sublímites. Examinamos los topes económicos que impone cada aseguradora para siniestros comunes: el capital máximo para daños estéticos (pintura y azulejos), reposición de llaves por robo, dinero en efectivo fuera de casa y sublímites en trasteros.",
      detail: "Penalizamos fuertemente las cláusulas de desgaste u obsolescencia que aplican depreciación sobre los bienes asegurados (infraseguro inducido)."
    },
    {
      num: "3",
      title: "Relación Calidad-Precio de la Prima (Ponderación: 20%)",
      desc: "Calculamos el coste real de la prima anualizada comparando perfiles de vivienda idénticos en España (pisos urbanos, chalets, alquileres). No nos quedamos en el precio gancho de salida; proyectamos el coste a medio plazo y las subidas habituales tras declarar el primer parte.",
      detail: "Un seguro barato con límites ridículamente bajos obtiene peor nota que uno ligeramente más caro pero con coberturas robustas."
    },
    {
      num: "4",
      title: "Velocidad y Calidad de la Asistencia (Ponderación: 15%)",
      desc: "Analizamos los tiempos de respuesta oficiales y reales de los servicios de urgencia (fontanería, cerrajería, electricidad). Evaluamos la facilidad para reportar siniestros a través de apps y portales web, así como la flexibilidad de libre elección de profesionales externos.",
      detail: "Contemplamos las quejas recurrentes de consumidores ante la demora en el envío de peritos u operarios oficiales."
    },
    {
      num: "5",
      title: "Defensa Jurídica y Trato Pericial (Ponderación: 15%)",
      desc: "Medimos la calidad y el límite de cobertura de la defensa jurídica (gastos de abogados, reclamación de daños a terceros). También valoramos el protocolo que sigue la aseguradora en caso de disconformidad con el perito oficial (aplicación del Artículo 38 de la Ley de Contrato de Seguro).",
      detail: "Priorizamos a las compañías que ofrecen amplios márgenes para la designación de abogados independientes."
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
              Independencia Editorial
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              Metodología de Comparación y Análisis
            </h1>
            <p className="font-sans text-slate-650 text-base leading-relaxed">
              En Mi Hogar Asegurado, nuestro compromiso principal es con el usuario. Las pólizas de seguros están plagadas de términos jurídicos complejos y letra pequeña que confunden al consumidor. A continuación, te explicamos bajo qué criterios rigurosos y objetivos analizamos y puntuamos cada póliza en nuestras comparativas.
            </p>
          </div>

          {/* Core Independency Banner */}
          <div className="my-8 rounded-2xl bg-amber-50/60 border-l-4 border-amber-500 p-5 text-amber-900 shadow-sm">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-amber-800 block mb-1">
              Declaración de Transparencia
            </span>
            <p className="font-sans text-xs text-amber-900/90 leading-relaxed">
              <strong>No vendemos seguros, no somos mediadores y no cobramos comisiones</strong> de las aseguradoras por promocionar sus productos. Nuestras puntuaciones se basan estrictamente en la lectura minuciosa de las condiciones generales y particulares de los contratos registrados en la Dirección General de Seguros y Fondos de Pensiones (DGSFP) y en la experiencia de nuestro equipo pericial y legal.
            </p>
          </div>

          <h2 className="font-display text-2xl font-extrabold text-slate-900 mt-10 mb-6 border-b border-slate-100 pb-2">
            Nuestros 5 Criterios de Evaluación
          </h2>

          <div className="space-y-8">
            {criteria.map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/30 shadow-sm"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white font-display text-sm font-bold shadow-md shadow-teal-600/15">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-650 leading-relaxed mb-3">
                      {item.desc}
                    </p>
                    <p className="font-sans text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-slate-150">
                      <strong>Foco pericial:</strong> {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating Scale Box */}
          <div className="mt-12 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative">
              <h3 className="font-display text-xl font-bold mb-4">¿Cómo interpretamos la nota final?</h3>
              <p className="font-sans text-sm text-slate-300 leading-relaxed mb-6">
                Todas las pólizas reciben una calificación numérica de 1.0 a 10.0 basada en la media ponderada de los pilares anteriores.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-t border-white/20 pt-4">
                  <span className="font-display text-lg font-bold text-teal-400">8.5 - 10.0 (Excelente)</span>
                  <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                    Pólizas premium con límites muy altos, letra pequeña clara, pocas exclusiones de mantenimiento y un servicio de asistencia impecable.
                  </p>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <span className="font-display text-lg font-bold text-amber-400">6.0 - 8.4 (Aceptable)</span>
                  <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                    Seguros estándar con coberturas básicas cubiertas, pero con franquicias obligatorias o sublímites estrictos en daños estéticos u objetos de valor.
                  </p>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <span className="font-display text-lg font-bold text-rose-400">Menos de 6.0 (Riesgoso)</span>
                  <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                    Pólizas low-cost con exclusiones graves encubiertas, límites insuficientes de Responsabilidad Civil (menos de 150.000€) y asistencia demorada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
