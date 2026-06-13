export default function AboutUs() {
  return (
    <section className="my-16 rounded-3xl bg-slate-100/70 border border-slate-200 p-8 sm:p-12 shadow-sm">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-teal-600 block mb-2">
          ¿Quiénes Somos?
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
          Nuestra Misión: Transparencia y Educación Financiera
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Core pillar 1: Experience */}
        <div className="flex flex-col items-center text-center p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-teal-600 mb-4 border border-slate-200/50">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="font-display text-base font-bold text-slate-900 mb-2">
            Experiencia Técnica
          </h3>
          <p className="font-sans text-sm text-slate-600 leading-relaxed">
            Nuestro equipo está compuesto por juristas de consumo y ex-peritos de seguros con más de 12 años de trayectoria en el sector.
          </p>
        </div>

        {/* Core pillar 2: Impartiality */}
        <div className="flex flex-col items-center text-center p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-teal-600 mb-4 border border-slate-200/50">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h3 className="font-display text-base font-bold text-slate-900 mb-2">
            100% Imparcial
          </h3>
          <p className="font-sans text-sm text-slate-600 leading-relaxed">
            No vendemos pólizas ni trabajamos a comisión. Nuestros análisis de mercado y comparativas se realizan bajo estrictos criterios de beneficio al usuario.
          </p>
        </div>

        {/* Core pillar 3: Transparency */}
        <div className="flex flex-col items-center text-center p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-teal-600 mb-4 border border-slate-200/50">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="font-display text-base font-bold text-slate-900 mb-2">
            Letra Pequeña
          </h3>
          <p className="font-sans text-sm text-slate-600 leading-relaxed">
            Traducimos las complejas condiciones contractuales a un lenguaje simple y directo, alertando sobre exclusiones comunes y límites encubiertos.
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200/60 pt-8 text-center max-w-2xl mx-auto">
        <p className="font-sans text-sm text-slate-600 leading-relaxed">
          Creemos que un consumidor bien informado es el único capaz de elegir la póliza que realmente necesita. En **Mi Hogar Asegurado** no encontrarás trucos de ventas ni formularios de captación de datos: solo periodismo de seguros puro y riguroso.
        </p>
      </div>
    </section>
  );
}
