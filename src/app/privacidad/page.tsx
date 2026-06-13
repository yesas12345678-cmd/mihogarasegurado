import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
