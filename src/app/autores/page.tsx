import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Equipo Editorial | Mi Hogar Asegurado",
  description: "Conoce a nuestro equipo de peritos, juristas y abogados de consumo dedicados a analizar seguros de hogar de forma independiente y sin sesgos.",
};

const AUTHORS = [
  {
    name: "Patricia G. (Ex-Perito de Siniestros)",
    role: "Editora Técnica y Co-Fundadora",
    bio: "Patricia trabajó durante más de 9 años inspeccionando siniestros del hogar para dos de las aseguradoras más grandes de España. Cansada de ver reclamaciones legítimas denegadas por desconocimiento de las cláusulas por parte del usuario, decidió fundar Mi Hogar Asegurado para equilibrar la balanza y educar al consumidor de forma transparente.",
    initials: "PG",
    imageUrl: "/uploads/author_patricia.png",
  },
  {
    name: "Carlos M. (Jurista de Consumo)",
    role: "Especialista en Derecho de Seguros",
    bio: "Graduado en Derecho y especializado en la protección del consumidor. Carlos analiza las pólizas de seguros del hogar, detecta cláusulas abusivas y redacta guías paso a paso para ayudar a nuestros lectores a formular reclamaciones oficiales de manera efectiva ante los defensores del asegurado.",
    initials: "CM",
    imageUrl: "/uploads/author_carlos.png",
  },
  {
    name: "Elena R. (Abogada de Vivienda)",
    role: "Colaboradora de Arrendamientos",
    bio: "Abogada ejerciente especializada en propiedad horizontal y arrendamientos urbanos. Elena aporta su experiencia en el blog analizando las coberturas cruzadas entre el seguro de la comunidad de vecinos, el del casero y el del inquilino, aclarando quién debe asumir el coste de cada tipo de siniestro.",
    initials: "ER",
    imageUrl: "/uploads/author_elena.png",
  },
];

export default function AutoresPage() {
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

          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-display text-3xl font-extrabold text-slate-900 leading-tight mb-4">
              Nuestro Equipo Editorial
            </h1>
            <p className="font-sans text-slate-600 text-base leading-relaxed">
              En Mi Hogar Asegurado no publicamos contenido anónimo ni redactado por inteligencia artificial sin supervisión. Cada artículo pasa por la validación de profesionales con experiencia contrastada en el sector legal e inmobiliario.
            </p>
          </div>

          <div className="space-y-12">
            {AUTHORS.map((author) => (
              <div key={author.name} className="flex flex-col md:flex-row gap-6 p-6 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="h-16 w-16 rounded-2xl overflow-hidden shrink-0 shadow-md shadow-teal-600/10 relative bg-slate-200 border border-slate-100">
                  {author.imageUrl ? (
                    <img
                      src={author.imageUrl}
                      alt={author.name}
                      className="h-full w-full object-cover animate-in fade-in duration-300"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-teal-600 text-white font-display text-xl font-bold">
                      {author.initials}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900 mb-1">{author.name}</h2>
                  <p className="font-sans text-xs font-semibold text-teal-600 uppercase tracking-wider mb-4">{author.role}</p>
                  <p className="font-sans text-sm text-slate-650 leading-relaxed">{author.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
