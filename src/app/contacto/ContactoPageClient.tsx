"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactoPageClient() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const consent = formData.get("consent");

    if (!name || !email || !message || !consent) {
      setErrorMsg("Por favor, rellena todos los campos obligatorios y acepta la política de privacidad.");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to send message
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setErrorMsg("Ocurrió un error inesperado al enviar el mensaje. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mb-6 group cursor-pointer"
            >
              <svg
                className="h-4 w-4 transition-transform duration-250 transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Volver a la portada
            </Link>

            <h1 className="font-display text-2xl font-extrabold text-slate-900 leading-tight mb-2">
              Contacto
            </h1>
            <p className="font-sans text-sm text-slate-500 mb-8 leading-relaxed">
              ¿Tienes alguna duda sobre seguros de hogar o quieres colaborar con nosotros? Envíanos tu consulta y te responderemos a la mayor brevedad.
            </p>

            {errorMsg && (
              <div className="rounded-xl border border-red-150 bg-red-50 p-4 text-sm text-red-700 mb-6 font-semibold">
                {errorMsg}
              </div>
            )}

            {submitted ? (
              <div className="text-center py-8 animate-in fade-in duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  ¡Mensaje Recibido!
                </h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-sm mx-auto mb-6">
                  Hemos registrado tu consulta correctamente. Nuestro equipo editorial se pondrá en contacto contigo en un plazo de 24 a 48 horas laborables.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition duration-200 cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Ej: Juan Pérez"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Ej: juan.perez@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Asunto de la Consulta
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Ej: Duda sobre cobertura de agua o propuesta de colaboración"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mensaje / Consulta *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={5}
                    placeholder="Escribe aquí los detalles de tu consulta..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-sans placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 items-center">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-slate-350 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                  </div>
                  <div className="text-xs">
                    <label htmlFor="consent" className="font-medium text-slate-500 leading-relaxed cursor-pointer">
                      Acepto que mis datos de contacto sean procesados de acuerdo con la{" "}
                      <Link href="/privacidad" className="text-teal-600 underline font-semibold hover:text-teal-700">
                        Política de Privacidad
                      </Link>{" "}
                      para dar respuesta a mi consulta.
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-teal-600 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/10 hover:bg-teal-700 active:scale-[0.98] transition duration-200 disabled:bg-teal-400 cursor-pointer"
                  >
                    {loading ? "Enviando mensaje..." : "Enviar Mensaje"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
