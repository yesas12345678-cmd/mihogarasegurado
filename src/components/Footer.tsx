"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: "Políticas de Privacidad", href: "/privacidad" },
    { name: "Políticas de Cookies", href: "/cookies" },
    { name: "Aviso Legal", href: "/aviso-legal" },
    { name: "Página de Autores", href: "/autores" },
    { name: "Contacto", href: "/contacto", isContact: true },
    { name: "Términos y Condiciones", href: "/terminos" },
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand & Mission column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-slate-900">
                Mi Hogar<span className="text-teal-600">Asegurado</span>
              </span>
            </div>
            <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-md">
              Tu portal de información independiente y honesto sobre seguros de hogar.
              Analizamos de forma transparente y sin presiones comerciales para que entiendas tu seguro.
            </p>
          </div>

          {/* Legal / Pages Navigation Column */}
          <div className="md:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-800 mb-4">
              Enlaces de Interés
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-slate-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Informative Disclaimer (E-E-A-T) */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-1">
              Nota Editorial e Independencia
            </span>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              **Mi Hogar Asegurado** es un portal web de carácter puramente informativo e independiente. No vendemos seguros, no somos agentes ni corredores, ni mantenemos vinculación comercial directa que afecte a la imparcialidad de nuestros análisis. Toda la información presentada tiene carácter orientativo y busca educar al consumidor sobre sus derechos y coberturas.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-slate-400">
            &copy; {currentYear} Mi Hogar Asegurado. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
