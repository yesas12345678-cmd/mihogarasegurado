import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pool } from "@/lib/db";

export const metadata: Metadata = {
  title: "Equipo Editorial y Expertos | Mi Hogar Asegurado",
  description: "Conoce a nuestro equipo de peritos colegiados, juristas y abogados de consumo independientes. Garantía de rigor legal y pericial en seguros de hogar.",
};

interface AuthorDetails {
  fullName: string;
  role: string;
  colegiatura: string;
  formacion: string;
  bio: string;
  linkedin: string;
  imageUrl: string;
  initials: string;
}

const AUTHORS: AuthorDetails[] = [
  {
    fullName: "Patricia Guerrero",
    role: "Editora Técnica y Co-Fundadora",
    colegiatura: "Perito de Seguros Colegiada APCAS nº 4892 (DGSFP)",
    formacion: "Graduada en Ingeniería Industrial por la Universidad Politécnica de Cataluña (UPC)",
    bio: "Patricia trabajó durante más de 9 años inspeccionando siniestros graves e incidentes de hogar para Mapfre y Allianz en España. Como perito de seguros certificada por la Dirección General de Seguros y Fondos de Pensiones, domina el funcionamiento práctico del peritaje técnico. Cofundó este portal para traducir el lenguaje de exclusiones periciales y ayudar al asegurado a defenderse ante tasaciones injustas.",
    linkedin: "https://www.linkedin.com/in/patricia-guerrero-perito",
    imageUrl: "/uploads/author_patricia.png",
    initials: "PG",
  },
  {
    fullName: "Carlos Merino",
    role: "Especialista en Derecho y Arbitraje de Consumo",
    colegiatura: "Mediador de Seguros y Colaborador Técnico en Consumo (OMIC)",
    formacion: "Graduado en Derecho por la Universidad Complutense de Madrid (UCM)",
    bio: "Especializado en la protección legal del consumidor y en derecho de daños. Carlos analiza las pólizas de seguro del hogar a nivel contractual, identificando cláusulas abusivas o lesivas y asesorando en reclamaciones oficiales ante el Defensor del Asegurado y la Dirección General de Seguros (DGSFP). Su experiencia en arbitraje de consumo permite resolver disputas sin recurrir a la vía judicial.",
    linkedin: "https://www.linkedin.com/in/carlos-merino-jurista",
    imageUrl: "/uploads/author_carlos.png",
    initials: "CM",
  },
  {
    fullName: "Elena Ramos",
    role: "Abogada de Vivienda y Arrendamientos",
    colegiatura: "Abogada Colegiada del Ilustre Colegio de la Abogacía de Madrid (ICAM nº 84.921)",
    formacion: "Licenciada en Derecho por la Universidad Autónoma de Madrid (UAM)",
    bio: "Abogada ejerciente con más de una década de experiencia en litigios inmobiliarios y arrendamientos urbanos (LAU). Elena aporta su visión jurídica analizando la concurrencia de seguros (comunidad, propietario e inquilino) y aclarando quién tiene la obligación legal de responder y costear cada tipo de avería o siniestro en viviendas de alquiler y copropiedades.",
    linkedin: "https://www.linkedin.com/in/elena-ramos-abogada",
    imageUrl: "/uploads/author_elena.png",
    initials: "ER",
  },
];

export default async function AutoresPage() {
  const authorStats: Record<string, { count: number; articles: Array<{ id: string; title: string }> }> = {};

  try {
    const client = await pool.connect();
    try {
      for (const author of AUTHORS) {
        const { rows } = await client.query(
          "SELECT id, title FROM articles WHERE author = $1 AND published_at <= NOW() ORDER BY published_at DESC LIMIT 2",
          [author.fullName]
        );
        const countRes = await client.query(
          "SELECT COUNT(*) FROM articles WHERE author = $1 AND published_at <= NOW()",
          [author.fullName]
        );
        authorStats[author.fullName] = {
          count: parseInt(countRes.rows[0].count, 10),
          articles: rows,
        };
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error loading author stats from DB:", err);
  }

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

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-100 mb-3">
              Garantía E-E-A-T
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              Equipo de Expertos y Consejo Editorial
            </h1>
            <p className="font-sans text-slate-600 text-base leading-relaxed">
              En <strong>Mi Hogar Asegurado</strong>, todo nuestro contenido está firmado y respaldado por profesionales reales con amplia experiencia en peritaje de siniestros, derecho de seguros y derecho de arrendamientos en España. No publicamos guías automáticas ni sin supervisión cualificada.
            </p>
          </div>

          <div className="space-y-16">
            {AUTHORS.map((author) => {
              const stats = authorStats[author.fullName] || { count: 0, articles: [] };
              return (
                <div
                  key={author.fullName}
                  className="flex flex-col lg:flex-row gap-8 p-6 sm:p-8 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50/80 transition-colors duration-250"
                >
                  {/* Left Column: Picture and Quick Info */}
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left shrink-0 w-full lg:w-48">
                    <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-3xl overflow-hidden shadow-md shadow-teal-600/5 relative bg-slate-200 border-2 border-white mb-4">
                      {author.imageUrl ? (
                        <img
                          src={author.imageUrl}
                          alt={author.fullName}
                          className="h-full w-full object-cover animate-in fade-in duration-300"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-teal-600 text-white font-display text-2xl font-bold">
                          {author.initials}
                        </div>
                      )}
                    </div>
                    
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
                    >
                      <svg className="h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Ver perfil verificado
                    </a>

                    <div className="mt-4 border-t border-slate-200/60 pt-4 w-full text-center lg:text-left">
                      <p className="font-sans text-xs font-medium text-slate-400">Contribuciones</p>
                      <p className="font-sans text-lg font-extrabold text-teal-600">{stats.count} artículos</p>
                    </div>
                  </div>

                  {/* Right Column: Bio and Credentials */}
                  <div className="flex-1">
                    <div className="border-b border-slate-100 pb-4 mb-4">
                      <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
                        {author.fullName}
                      </h2>
                      <p className="font-sans text-sm font-semibold text-teal-600">
                        {author.role}
                      </p>
                    </div>

                    {/* Verifiable Credentials Badges */}
                    <div className="flex flex-col gap-2.5 mb-6">
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 text-[10px] font-bold border border-teal-100">
                          ✓
                        </span>
                        <span>
                          <strong>Colegiatura Oficial:</strong> {author.colegiatura}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 text-[10px] font-bold border border-teal-100">
                          ✓
                        </span>
                        <span>
                          <strong>Formación Académica:</strong> {author.formacion}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Bio */}
                    <p className="font-sans text-sm text-slate-650 leading-relaxed mb-6">
                      {author.bio}
                    </p>

                    {/* Author's Latest Publications */}
                    {stats.articles && stats.articles.length > 0 && (
                      <div className="border-t border-slate-100 pt-4 bg-slate-50/50 rounded-xl p-4 border border-slate-200/40">
                        <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Últimos análisis publicados
                        </h3>
                        <ul className="space-y-2">
                          {stats.articles.map((art) => (
                            <li key={art.id}>
                              <Link
                                href={`/articulos/${art.id}`}
                                className="font-sans text-sm font-semibold text-slate-800 hover:text-teal-600 transition-colors line-clamp-1 flex items-center gap-1.5"
                              >
                                <span className="text-teal-500">→</span>
                                {art.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
