"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CalculadoraInfraseguroPage() {
  // Inputs
  const [metros, setMetros] = useState<number>(100);
  const [calidad, setCalidad] = useState<number>(1300); // Euros per m2 (reconstruction cost)
  const [continenteDeclarado, setContinenteDeclarado] = useState<number>(130000);
  
  const [muebles, setMuebles] = useState<number>(15000);
  const [electrodomesticos, setElectrodomesticos] = useState<number>(6000);
  const [tecnologia, setTecnologia] = useState<number>(4000);
  const [ropa, setRopa] = useState<number>(5000);
  const [contenidoDeclarado, setContenidoDeclarado] = useState<number>(30000);

  const [danoSiniestro, setDanoSiniestro] = useState<number>(12000);

  // Calculations
  const continenteReal = metros * calidad;
  const contenidoReal = muebles + electrodomesticos + tecnologia + ropa;

  // Auto-fill inputs on slider adjustments to keep experience smooth
  useEffect(() => {
    // When metros or quality changes, let's suggest a default Continente
    setContinenteDeclarado(metros * calidad);
  }, [metros, calidad]);

  useEffect(() => {
    // When content breakdown changes, let's suggest a default Contenido
    setContenidoDeclarado(muebles + electrodomesticos + tecnologia + ropa);
  }, [muebles, electrodomesticos, tecnologia, ropa]);

  // Proportional rule ratio
  const ratioContinente = Math.min(continenteDeclarado / (continenteReal || 1), 1);
  const ratioContenido = Math.min(contenidoDeclarado / (contenidoReal || 1), 1);

  // Siniestro resolution
  const indemnizacionContinente = danoSiniestro * ratioContinente;
  const perdidaUsuarioContinente = danoSiniestro - indemnizacionContinente;

  const isInfraseguroContinente = ratioContinente < 0.9;
  const isInfraseguroContenido = ratioContenido < 0.9;

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm">
          
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
              Herramienta Técnica Gratuita
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              Calculadora de Infraseguro y Regla Proporcional
            </h1>
            <p className="font-sans text-slate-650 text-base leading-relaxed">
              El <strong>infraseguro</strong> ocurre cuando declaras un valor de continente o contenido inferior a su coste real de reconstrucción o reposición. En caso de siniestro, las aseguradoras aplican por ley la <strong>regla proporcional</strong>, pagándote solo la misma proporción de indemnización que declaraste. Calcula tu exposición al riesgo en segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Interactive Inputs (8 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section 1: Continente */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                <h2 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-600 text-white text-xs font-bold">1</span>
                  Tasar el Continente (Estructura de la casa)
                </h2>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5">
                      <span>Metros Cuadrados Construidos</span>
                      <span className="text-teal-650 font-bold">{metros} m²</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="300"
                      step="5"
                      value={metros}
                      onChange={(e) => setMetros(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">Incluye muros comunes, garaje o trastero anexo.</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5">
                      <span>Coste de Reconstrucción Medio</span>
                      <span className="text-teal-650 font-bold">{calidad} €/m²</span>
                    </div>
                    <select
                      value={calidad}
                      onChange={(e) => setCalidad(parseInt(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 font-sans"
                    >
                      <option value="1100">Calidad Básica / Piso medio (1.100 €/m²)</option>
                      <option value="1300">Calidad Media / Adosado estándar (1.300 €/m²)</option>
                      <option value="1600">Calidad Alta / Chalet individual (1.600 €/m²)</option>
                      <option value="2000">Lujo / Vivienda singular (2.000 €/m²)</option>
                    </select>
                    <span className="text-[10px] text-slate-400 block mt-1">Coste aproximado para rehacer la vivienda sin incluir el precio del suelo.</span>
                  </div>

                  <div className="pt-2 border-t border-slate-250/50">
                    <div className="flex justify-between items-center text-sm font-bold text-slate-900 mb-2">
                      <span>Valor de Continente Real sugerido:</span>
                      <span className="text-slate-950 font-mono text-base font-extrabold">{continenteReal.toLocaleString("es-ES")} €</span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Capital Declarado en tu Póliza Actual</span>
                        <span className="font-bold text-slate-800">{continenteDeclarado.toLocaleString("es-ES")} €</span>
                      </div>
                      <input
                        type="range"
                        min={Math.floor(continenteReal * 0.4)}
                        max={Math.floor(continenteReal * 1.3)}
                        step="2500"
                        value={continenteDeclarado}
                        onChange={(e) => setContinenteDeclarado(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                      <p className="text-[10px] text-slate-400">Desplaza esta barra para simular qué capital declaraste al seguro (infraseguro si es inferior a la estimación real).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Contenido */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                <h2 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-600 text-white text-xs font-bold">2</span>
                  Tasar el Contenido (Muebles, ropa, enseres)
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Mobiliario / Cocina (€)</label>
                      <input
                        type="number"
                        value={muebles}
                        onChange={(e) => setMuebles(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Electrodomésticos (€)</label>
                      <input
                        type="number"
                        value={electrodomesticos}
                        onChange={(e) => setElectrodomesticos(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Tecnología y Joyas (€)</label>
                      <input
                        type="number"
                        value={tecnologia}
                        onChange={(e) => setTecnologia(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Ropa y Enseres Personales (€)</label>
                      <input
                        type="number"
                        value={ropa}
                        onChange={(e) => setRopa(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-250/50">
                    <div className="flex justify-between items-center text-sm font-bold text-slate-900 mb-2">
                      <span>Valor de Contenido Real estimado:</span>
                      <span className="text-slate-950 font-mono text-base font-extrabold">{contenidoReal.toLocaleString("es-ES")} €</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Capital Contenido Declarado en Póliza</span>
                        <span className="font-bold text-slate-800">{contenidoDeclarado.toLocaleString("es-ES")} €</span>
                      </div>
                      <input
                        type="range"
                        min={Math.floor(contenidoReal * 0.4)}
                        max={Math.floor(contenidoReal * 1.4)}
                        step="1000"
                        value={contenidoDeclarado}
                        onChange={(e) => setContenidoDeclarado(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Damage scenario */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                <h2 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-600 text-white text-xs font-bold">3</span>
                  Simular un Siniestro / Daño Accidental
                </h2>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5">
                    <span>Coste de los Daños del Siniestro (ej. inundación severa)</span>
                    <span className="text-rose-600 font-mono font-bold text-base">{danoSiniestro.toLocaleString("es-ES")} €</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="40000"
                    step="500"
                    value={danoSiniestro}
                    onChange={(e) => setDanoSiniestro(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Desplaza para definir el importe de los daños que el perito ha valorado tras un siniestro.</p>
                </div>
              </div>

            </div>

            {/* Right Column: Calculations & Results (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: E-E-A-T Diagnostico */}
              <div className="border border-slate-250 rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  DIAGNÓSTICO DE TU PÓLIZA
                </h3>

                <div className="space-y-4">
                  {/* Continente diagnosis */}
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold text-slate-800 block mb-1">Continente (La Casa)</span>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-500">Exposición:</span>
                      <span className={`text-xs font-bold rounded px-2 py-0.5 ${isInfraseguroContinente ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                        {isInfraseguroContinente ? 'Infraseguro Detectado' : 'Correctamente Asegurado'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${isInfraseguroContinente ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min(ratioContinente * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Declarado: {Math.round(ratioContinente * 100)}%</span>
                      <span>100% necesario</span>
                    </div>
                  </div>

                  {/* Contenido diagnosis */}
                  <div>
                    <span className="text-xs font-bold text-slate-800 block mb-1">Contenido (Muebles y Ropa)</span>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-500">Exposición:</span>
                      <span className={`text-xs font-bold rounded px-2 py-0.5 ${isInfraseguroContenido ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                        {isInfraseguroContenido ? 'Infraseguro Detectado' : 'Correctamente Asegurado'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${isInfraseguroContenido ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min(ratioContenido * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Declarado: {Math.round(ratioContenido * 100)}%</span>
                      <span>100% necesario</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Resolution (Regla Proporcional) */}
              <div className={`border-2 rounded-3xl p-6 shadow-md transition-all duration-300 ${isInfraseguroContinente ? 'border-amber-500 bg-amber-50/15' : 'border-emerald-500 bg-emerald-50/10'}`}>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
                  APLICACIÓN DE REGLA PROPORCIONAL
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Daño Declarado:</span>
                    <span className="font-semibold text-slate-900">{danoSiniestro.toLocaleString("es-ES")} €</span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-600">
                    <span>% de Indemnización Aplicable:</span>
                    <span className={`font-bold ${isInfraseguroContinente ? 'text-amber-600' : 'text-emerald-700'}`}>{Math.round(ratioContinente * 100)}%</span>
                  </div>

                  <div className="border-t border-slate-200/60 pt-4 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">Indemnización Seguro:</span>
                    <span className="text-xl font-mono font-black text-emerald-600">{Math.round(indemnizacionContinente).toLocaleString("es-ES")} €</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-500">Pérdida para ti (de tu bolsillo):</span>
                    <span className={`font-mono font-bold ${perdidaUsuarioContinente > 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                      {Math.round(perdidaUsuarioContinente).toLocaleString("es-ES")} €
                    </span>
                  </div>
                </div>

                {isInfraseguroContinente && (
                  <div className="mt-5 p-3.5 rounded-xl bg-amber-100/50 border border-amber-250 text-amber-900 text-xs leading-relaxed">
                    <strong>Pérdida Pericial:</strong> Como tu capital declarado es un {Math.round((1 - ratioContinente) * 100)}% inferior al coste de reconstrucción real, el seguro solo pagará el {Math.round(ratioContinente * 100)}% de cualquier siniestro parcial. ¡Te tocará abonar de tu bolsillo {Math.round(perdidaUsuarioContinente).toLocaleString("es-ES")} €!
                  </div>
                )}
              </div>

              {/* Card 3: Advice */}
              <div className="border border-slate-200 rounded-3xl bg-slate-900 text-white p-6 shadow-sm">
                <h4 className="font-display text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">CONSEJO DEL PERITO</h4>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  Para evitar sorpresas desagradables en caso de incendio o inundación severa:
                </p>
                <ul className="space-y-2 mt-3 text-xs text-slate-400">
                  <li className="flex gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span><strong>Actualización por IPC:</strong> Asegúrate de que tu póliza incluya cláusula de revalorización automática de capitales según IPC.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span><strong>Tasa el contenido:</strong> Realiza fotos de cada habitación y guarda facturas importantes en la nube.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span><strong> Margen del 10%:</strong> Muchas aseguradoras perdonan el infraseguro si la desviación es inferior al 10%.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
