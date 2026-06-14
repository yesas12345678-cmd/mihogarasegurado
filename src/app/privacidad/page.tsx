import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | Mi Hogar Asegurado",
  description: "Consulta cómo protegemos tus datos personales en Mi Hogar Asegurado. Un portal informativo independiente que no almacena datos bancarios ni de filiación.",
};

export default function PrivacidadPage() {
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
            Políticas de Privacidad
          </h1>

          <div className="space-y-6 text-slate-700 font-sans text-base leading-relaxed">
            <p>
              En **Mi Hogar Asegurado**, valoramos enormemente la privacidad de nuestros usuarios. Dado que este portal es estrictamente de carácter informativo, **no recopilamos datos personales sensibles, bancarios ni de filiación**.
            </p>
            
            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">1. Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos que voluntariamente se faciliten a través del formulario de contacto es el equipo editorial de Mi Hogar Asegurado. Puedes contactarnos para cualquier consulta sobre privacidad a través de nuestro correo oficial de contacto.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">2. Finalidad de la Recopilación de Datos</h2>
            <p>
              Únicamente recopilamos información como el nombre y dirección de correo electrónico cuando el usuario decide enviarnos una consulta mediante nuestro formulario de contacto. La única finalidad es responder a sus dudas e inquietudes.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">3. Derechos de los Usuarios</h2>
            <p>
              En virtud del RGPD (Reglamento General de Protección de Datos), todo usuario tiene derecho a acceder, rectificar, limitar o solicitar la supresión de sus datos personales. Si has enviado una consulta y deseas que eliminemos tu correo, puedes solicitarlo por vía electrónica.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">4. Cesión a Terceros</h2>
            <p>
              Bajo ninguna circunstancia vendemos, alquilamos ni cedemos información de contacto de nuestros lectores a aseguradoras, agencias de marketing ni terceras entidades.
            </p>

            <h2 className="font-display text-xl font-bold text-slate-900 mt-6 mb-2">5. Publicidad de Google AdSense y Cookies de Terceros</h2>
            <p>
              Este sitio web utiliza **Google AdSense** para mostrar anuncios publicitarios a nuestros lectores. Google, como proveedor asociado externo, utiliza cookies de publicidad para servir anuncios en nuestro sitio web basados en visitas anteriores de los usuarios a esta y otras páginas web en Internet.
            </p>
            <p>
              El uso de cookies de publicidad por parte de Google y de sus socios permite mostrar anuncios adaptados a los intereses del lector. Puedes inhabilitar la publicidad personalizada en cualquier momento a través de la sección de <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-teal-650 font-bold hover:underline">Configuración de anuncios de Google</a>. Alternativamente, puedes optar por inhabilitar el uso de cookies para publicidad personalizada de otros proveedores asociados externos visitando el portal independiente de autorregulación del sector en <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-teal-650 font-bold hover:underline">www.aboutads.info</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
