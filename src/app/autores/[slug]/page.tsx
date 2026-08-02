import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { pool } from "@/lib/db";
import { Article } from "@/data/articles";

interface AuthorProfile {
  slug: string;
  fullName: string;
  role: string;
  colegiatura: string;
  formacion: string;
  experiencia: string;
  especialidad: string;
  bio: string;
  linkedin: string;
  imageUrl: string;
  initials: string;
}

const AUTHORS_DATA: Record<string, AuthorProfile> = {
  "patricia-guerrero": {
    slug: "patricia-guerrero",
    fullName: "Patricia Guerrero",
    role: "Editora Técnica y Co-Fundadora",
    colegiatura: "Perito de Seguros Colegiada APCAS nº 4892 (DGSFP)",
    formacion: "Graduada en Ingeniería Industrial por la Universidad Politécnica de Cataluña (UPC). Certificación de Perito de Seguros por el Ministerio de Economía.",
    experiencia: "Más de 12 años de trayectoria. Trabajó durante 9 años inspeccionando siniestros graves e incidentes de hogar para Mapfre y Allianz en España.",
    especialidad: "Valoración pericial de siniestros, análisis de daños por agua, daños estéticos y cálculo de indemnizaciones por la regla proporcional.",
    bio: "Patricia Guerrero trabajó durante más de 9 años inspeccionando siniestros del hogar sobre el terreno. Cansada de observar cómo reclamaciones legítimas de los asegurados eran denegadas o reducidas drásticamente por el simple desconocimiento de la letra pequeña de los contratos, decidió cofundar Mi Hogar Asegurado. Su objetivo es democratizar el conocimiento pericial y contractual de los seguros en España.",
    linkedin: "https://www.linkedin.com/in/patricia-guerrero-perito",
    imageUrl: "/uploads/author_patricia.png",
    initials: "PG",
  },
  "carlos-merino": {
    slug: "carlos-merino",
    fullName: "Carlos Merino",
    role: "Especialista en Derecho y Arbitraje de Consumo",
    colegiatura: "Mediador en Consumo Colegiado y Colaborador Técnico (OMIC)",
    formacion: "Graduado en Derecho por la Universidad Complutense de Madrid (UCM). Máster en Derecho de Daños y Responsabilidad Civil.",
    experiencia: "8 años asesorando a consumidores en reclamaciones ante la Dirección General de Seguros (DGSFP) y mediación en juntas arbitrales.",
    especialidad: "Cláusulas abusivas en contratos financieros y de seguros de hogar, redacción de reclamaciones oficiales, y mediación y arbitraje.",
    bio: "Carlos Merino es graduado en Derecho y se ha especializado en defender al eslabón más débil: el consumidor. En Mi Hogar Asegurado, Carlos analiza las pólizas línea por línea para alertar sobre exclusiones lesivas. Domina el funcionamiento formal y los plazos legales para plantear quejas efectivas ante las compañías, el Defensor del Asegurado y el Servicio de Reclamaciones de la DGSFP.",
    linkedin: "https://www.linkedin.com/in/carlos-merino-jurista",
    imageUrl: "/uploads/author_carlos.png",
    initials: "CM",
  },
  "elena-ramos": {
    slug: "elena-ramos",
    fullName: "Elena Ramos",
    role: "Abogada de Vivienda y Arrendamientos",
    colegiatura: "Abogada Colegiada del Ilustre Colegio de la Abogacía de Madrid (ICAM nº 84.921)",
    formacion: "Licenciada en Derecho por la Universidad Autónoma de Madrid (UAM). Curso de Especialización de Arrendamientos Urbanos y Propiedad Horizontal.",
    experiencia: "11 años ejerciendo como letrada especialista en conflictos de vivienda y propiedad horizontal ante tribunales ordinarios en España.",
    especialidad: "Concurrencia de seguros en alquileres (casero e inquilino), seguros de comunidad de vecinos, y delimitación de Responsabilidad Civil Locativa.",
    bio: "Elena Ramos es abogada en ejercicio y experta en derecho inmobiliario. Su colaboración técnica en Mi Hogar Asegurado aporta claridad sobre un punto conflictivo: quién debe asumir legalmente el coste de cada tipo de siniestro en un piso de alquiler, analizando la concurrencia entre los seguros comunitarios, del propietario y las pertenencias del inquilino.",
    linkedin: "https://www.linkedin.com/in/elena-ramos-abogada",
    imageUrl: "/uploads/author_elena.png",
    initials: "ER",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "patricia-guerrero" },
    { slug: "carlos-merino" },
    { slug: "elena-ramos" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = AUTHORS_DATA[slug];
  if (!author) {
    return {
      title: "Autor no encontrado",
    };
  }
  return {
    title: `${author.fullName} - Equipo Técnico | Mi Hogar Asegurado`,
    description: `Conoce la trayectoria profesional de ${author.fullName}, ${author.role} de Mi Hogar Asegurado. Perfil pericial o legal verificado.`,
  };
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const author = AUTHORS_DATA[slug];

  if (!author) {
    notFound();
  }

  let articles: Article[] = [];
  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author FROM articles WHERE author = $1 AND published_at <= NOW() ORDER BY published_at DESC",
        [author.fullName]
      );
      articles = rows.map((row) => ({
        id: row.id,
        title: row.title,
        excerpt: row.excerpt,
        category: {
          name: row.category_name,
          slug: row.category_slug,
        },
        date: row.date,
        readTime: row.read_time,
        imageUrl: row.image_url || undefined,
        imageGradient: row.image_gradient,
        author: row.author,
        content: "",
      }));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error fetching author articles:", err);
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <Link
            href="/autores"
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
            Ver todo el equipo editorial
          </Link>

          {/* Author Biography Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row gap-8 sm:gap-10">
              
              {/* Picture & Social Link */}
              <div className="flex flex-col items-center shrink-0 w-full md:w-56 text-center">
                <div className="h-32 w-32 sm:h-44 sm:w-44 rounded-3xl overflow-hidden shadow-md relative bg-slate-200 border-2 border-white mb-4">
                  {author.imageUrl ? (
                    <img
                      src={author.imageUrl}
                      alt={author.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-teal-600 text-white font-display text-3xl font-bold">
                      {author.initials}
                    </div>
                  )}
                </div>

                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-650 hover:text-teal-800 transition-colors"
                >
                  <svg className="h-4.5 w-4.5 text-teal-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn Verificado
                </a>
              </div>

              {/* Textual Info */}
              <div className="flex-1">
                <div className="border-b border-slate-100 pb-4 mb-5">
                  <h1 className="font-display text-3xl font-extrabold text-slate-900 leading-tight mb-1">
                    {author.fullName}
                  </h1>
                  <p className="font-sans text-base font-semibold text-teal-600">
                    {author.role}
                  </p>
                </div>

                {/* Professional Badges */}
                <div className="grid grid-cols-1 gap-3.5 mb-6 bg-slate-50 border border-slate-150 rounded-2xl p-5 text-sm text-slate-750">
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-[10px] font-bold">✓</span>
                    <span><strong>Colegiatura Oficial:</strong> {author.colegiatura}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-[10px] font-bold">✓</span>
                    <span><strong>Formación Académica:</strong> {author.formacion}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-[10px] font-bold">✓</span>
                    <span><strong>Experiencia en el Sector:</strong> {author.experiencia}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-[10px] font-bold">✓</span>
                    <span><strong>Especialidad Técnica:</strong> {author.especialidad}</span>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none text-slate-650 font-sans text-sm leading-relaxed">
                  <p>{author.bio}</p>
                </div>
              </div>

            </div>
          </div>

          {/* List of published articles */}
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
              Artículos y Guías Publicadas por {author.fullName}
            </h2>

            {articles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((art) => (
                  <ArticleCard key={art.id} article={art} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl">
                <p className="text-slate-500 font-sans text-sm">Este autor no cuenta con publicaciones actualmente.</p>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
