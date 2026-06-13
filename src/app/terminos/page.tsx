import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TerminosPage() {
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
            Términos y Condiciones de Uso
          </h1>

          <div className="space-y-6 text-slate-700 font-sans text-base leading-relaxed">
            <p>
              Bienvenido a **Mi Hogar Asegurado**. Al acceder a nuestro portal informativo, aceptas cumplir y estar sujeto a los siguientes términos y condiciones de uso.
            </p>
            
            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">1. Naturaleza Informativa</h2>
            <p>
              Este sitio web provee artículos de divulgación, análisis y guías prácticas sobre seguros de hogar. **No prestamos servicios financieros, de asesoramiento legal formal ni de intermediación de seguros**. Ninguna información aquí vertida constituye una oferta de venta ni una recomendación formal de contratación de una marca en concreto.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">2. Ausencia de Relación Contractual</h2>
            <p>
              El uso de la información del sitio no crea una relación cliente-profesional ni cliente-aseguradora. Cualquier reclamación relacionada con las condiciones de tu póliza de seguro debe ser dirimida directamente con tu compañía de seguros contratada o a través de los canales de consumo de tu comunidad autónoma.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">3. Enlaces a Sitios Externos</h2>
            <p>
              Nuestros artículos pueden contener enlaces a sitios web de terceros (como organismos oficiales de consumo, BOE, reguladores financieros). No tenemos control sobre el contenido de dichos sitios ni asumimos responsabilidad por sus servicios, políticas de privacidad o disponibilidad.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">4. Modificaciones de los Términos</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del portal después de la publicación de cambios constituye la aceptación de los nuevos términos de uso.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
