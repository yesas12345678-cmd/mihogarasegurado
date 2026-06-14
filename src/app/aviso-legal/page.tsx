import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aviso Legal | Mi Hogar Asegurado",
  description: "Información legal, términos de exención de responsabilidad y titularidad del portal independiente Mi Hogar Asegurado.",
};

export default function AvisoLegalPage() {
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
            Aviso Legal
          </h1>

          <div className="space-y-6 text-slate-700 font-sans text-base leading-relaxed">
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se exponen a continuación los datos identificativos del portal.
            </p>
            
            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">1. Datos Identificativos</h2>
            <p>
              El sitio web **Mi Hogar Asegurado** es un portal informativo operado de manera independiente por el equipo editorial de Mi Hogar Asegurado. Para cualquier aclaración, puedes contactarnos a través de nuestra sección de contacto.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">2. Condiciones de Uso y Exención de Responsabilidad</h2>
            <p>
              El acceso a este portal atribuye la condición de usuario e implica la aceptación de estas condiciones. El contenido de este sitio web es **meramente de carácter orientativo e informativo**. 
            </p>
            <p>
              Aunque nos esforzamos por mantener la información actualizada y veraz, no garantizamos la ausencia de erratas o la actualización inmediata de regulaciones de aseguradoras privadas. **El usuario debe contrastar los datos con su aseguradora antes de formalizar cualquier contrato**. No nos hacemos responsables de las decisiones tomadas por los lectores basándose exclusivamente en este contenido.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">3. Propiedad Intelectual</h2>
            <p>
              Todos los textos, infografías y diseños de marca son de propiedad exclusiva de Mi Hogar Asegurado. Queda prohibida la reproducción parcial o total del contenido de este blog en otros sitios web sin consentimiento explícito y enlaces de atribución correctos.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
