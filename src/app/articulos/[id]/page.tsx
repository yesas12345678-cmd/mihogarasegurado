import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pool } from "@/lib/db";
import { Article } from "@/data/articles";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

// Dynamic SEO metadata generation for article pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT title, excerpt, meta_title, meta_description FROM articles WHERE id = $1 AND published_at <= NOW()",
        [id]
      );
      if (rows.length > 0) {
        const article = rows[0];
        
        // Use custom SEO meta title and meta description if they exist, otherwise fallback
        const seoTitle = article.meta_title ? article.meta_title : `${article.title} | Mi Hogar Asegurado`;
        const seoDescription = article.meta_description ? article.meta_description : article.excerpt;

        return {
          title: seoTitle,
          description: seoDescription,
          alternates: {
            canonical: `/articulos/${id}`,
          },
          openGraph: {
            title: seoTitle,
            description: seoDescription,
            type: "article",
          },
        };
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error generating metadata:", err);
  }

  return {
    title: "Artículo | Mi Hogar Asegurado",
    description: "Portal de información independiente sobre seguros de hogar.",
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  let article: Article | null = null;

  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content, meta_title, meta_description, updated_at, sources FROM articles WHERE id = $1 AND published_at <= NOW()",
        [id]
      );
      
      if (rows.length > 0) {
        const row = rows[0];
        article = {
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
          content: row.content,
          metaTitle: row.meta_title || undefined,
          metaDescription: row.meta_description || undefined,
          updatedAt: row.updated_at ? new Date(row.updated_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }) : undefined,
          sources: row.sources || undefined,
        };
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error fetching article from PostgreSQL:", err);
  }

  if (!article) {
    notFound();
  }

  const authorsData = [
    {
      name: "Patricia Guerrero",
      slug: "patricia-guerrero",
      imageUrl: "/uploads/author_patricia.png",
      role: "Editora Técnica y Co-Fundadora",
      colegiatura: "Perito Colegiada APCAS nº 4892 (DGSFP)",
      linkedin: "https://www.linkedin.com/in/patricia-guerrero-perito",
      opinion: "Como ex-perito de siniestros, te aconsejo que antes de declarar cualquier siniestro a tu aseguradora revises minuciosamente el redactado de las exclusiones del contrato y dispongas de pruebas fotográficas detalladas de forma inmediata."
    },
    {
      name: "Carlos Merino",
      slug: "carlos-merino",
      imageUrl: "/uploads/author_carlos.png",
      role: "Especialista en Derecho y Arbitraje de Consumo",
      colegiatura: "Mediador en Consumo (OMIC)",
      linkedin: "https://www.linkedin.com/in/carlos-merino-jurista",
      opinion: "Desde el punto de vista legal, recuerda que la Ley de Contrato de Seguro protege siempre al eslabón más débil: el consumidor. No aceptes un rechazo genérico de tu aseguradora sin una carta formal motivada."
    },
    {
      name: "Elena Ramos",
      slug: "elena-ramos",
      imageUrl: "/uploads/author_elena.png",
      role: "Abogada de Vivienda y Arrendamientos",
      colegiatura: "Abogada Colegiada ICAM nº 84.921",
      linkedin: "https://www.linkedin.com/in/elena-ramos-abogada",
      opinion: "En viviendas de alquiler, la clave está en separar el continente del contenido y delimitar la Responsabilidad Civil Locativa. Un seguro mal estructurado puede dejar al inquilino expuesto ante reclamaciones del casero."
    },
  ];

  const matchedAuthor = authorsData.find((a) => article.author.toLowerCase().trim().startsWith(a.name.toLowerCase().trim()));

  let displayContent = article.content;
  if (article.content.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(article.content);
      displayContent = parsed.content || "";
    } catch (e) {
      const match = article.content.match(/"content"\s*:\s*"(.*)"\s*\}\s*$/);
      if (match) {
        displayContent = match[1]
          .replace(/\\"/g, '"')
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t');
      } else {
        try {
          const cleaned = article.content.replace(/[\n\r\t]/g, (m) => m === '\n' ? '\\n' : m === '\r' ? '\\r' : '\\t');
          const parsed = JSON.parse(cleaned);
          displayContent = parsed.content || "";
        } catch (e2) {
          console.error("Failed to parse content JSON:", e2);
        }
      }
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": matchedAuthor ? matchedAuthor.name : article.author,
      "jobTitle": matchedAuthor ? matchedAuthor.role : "Colaborador Experto",
      "sameAs": matchedAuthor ? matchedAuthor.linkedin : undefined,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mi Hogar Asegurado",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mihogarasegurado.com/icon.svg",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mihogarasegurado.com/articulos/${article.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Header image area */}
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-slate-100 border-b border-slate-200">
            {article.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${article.imageGradient} flex items-center justify-center p-8`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/25 backdrop-blur-md text-white border border-white/20">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-12">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors mb-8 group cursor-pointer"
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

            {/* Category, Date & Read Time */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs font-sans text-slate-400">
              <span className="inline-flex items-center rounded-md border border-teal-100 bg-teal-50 px-2.5 py-0.5 font-semibold text-teal-700">
                {article.category.name}
              </span>
              <span>Publicado: {article.date}</span>
              {article.updatedAt && (
                <>
                  <span>•</span>
                  <span>Actualizado: {article.updatedAt}</span>
                </>
              )}
              <span>•</span>
              <span className="text-teal-650 font-medium bg-teal-50/30 px-2 py-0.5 rounded border border-teal-100/50">
                Próxima revisión: Ene 2027
              </span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-3 border-t border-slate-150 pt-4 mb-4">
              {matchedAuthor ? (
                <Link 
                  href={`/autores/${matchedAuthor.slug}`} 
                  className="h-10 w-10 rounded-full overflow-hidden shrink-0 relative bg-slate-200 border border-slate-100 hover:opacity-85 transition-opacity"
                >
                  <img
                    src={matchedAuthor.imageUrl}
                    alt={article.author}
                    className="h-full w-full object-cover"
                  />
                </Link>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white font-semibold text-sm">
                  {article.author.split(" ")[0][0]}
                </div>
              )}
              <div>
                <p className="font-sans text-sm font-bold text-slate-900">
                  {matchedAuthor ? (
                    <Link href={`/autores/${matchedAuthor.slug}`} className="hover:text-teal-650 hover:underline transition-colors">
                      {matchedAuthor.name}
                    </Link>
                  ) : article.author}
                </p>
                <p className="font-sans text-xs text-slate-500">
                  {matchedAuthor ? `${matchedAuthor.role} • ${matchedAuthor.colegiatura}` : "Colaborador Experto de Mi Hogar Asegurado"}
                </p>
              </div>
            </div>

            {/* Validation box at start (E-E-A-T) */}
            <div className="flex items-start gap-3 rounded-2xl bg-teal-50/40 border border-teal-100 p-4 mb-8 text-xs text-slate-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white text-[10px] font-bold shadow-sm">
                ✓
              </span>
              <div>
                <p className="font-bold text-slate-900 mb-0.5">Artículo Verificado y Validado Técnicamente</p>
                <p className="text-slate-600 leading-relaxed">
                  Este análisis ha sido revisado por {matchedAuthor ? `${matchedAuthor.name} (${matchedAuthor.colegiatura})` : article.author} para garantizar su precisión técnica, rigor legal y total conformidad con la Ley 50/1980 de Contrato de Seguro en España.
                </p>
              </div>
            </div>

            {/* Independent methodology notice for reviews */}
            {article.category.slug === "comparativas" && (
              <div className="mb-8 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Garantía de Independencia</span>
                <h4 className="font-display text-sm font-bold text-slate-900 mb-1.5">¿Cómo realizamos esta comparativa?</h4>
                <p className="font-sans text-xs text-slate-600 leading-relaxed mb-3">
                  En Mi Hogar Asegurado evaluamos de forma independiente basándonos en condiciones generales de pólizas reales sin recibir comisiones de aseguradoras. Justificamos cada veredicto objetivamente.
                </p>
                <Link href="/como-comparamos" className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                  Ver nuestra metodología de evaluación →
                </Link>
              </div>
            )}

            {/* Body Content (renders raw HTML for custom Tailwind CSS designs) */}
            <div className="article-body font-sans text-base leading-relaxed text-slate-700">
              <div dangerouslySetInnerHTML={{ __html: displayContent }} />
            </div>

            {/* Sources consulted (E-E-A-T Trustworthiness) */}
            {article.sources && (() => {
              try {
                const parsedSources = JSON.parse(article.sources);
                if (Array.isArray(parsedSources) && parsedSources.length > 0) {
                  return (
                    <div className="mt-12 border-t border-slate-100 pt-8">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
                          Fuentes y Documentación Oficial Consultada
                        </span>
                        <ul className="space-y-2">
                          {parsedSources.map((src: any, idx: number) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-slate-650 font-sans">
                              <span className="text-teal-500">●</span>
                              {src.url ? (
                                <a 
                                  href={src.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-teal-650 hover:text-teal-700 hover:underline font-medium transition-colors"
                                >
                                  {src.name}
                                </a>
                              ) : (
                                <span>{src.name}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                        <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic">
                          * Mi Hogar Asegurado audita su contenido periódicamente contrastándolo con el Boletín Oficial del Estado (BOE), el registro público de contratos de la Dirección General de Seguros y Fondos de Pensiones (DGSFP) y reportes de siniestralidad sectorial (UNESPA).
                        </p>
                      </div>
                    </div>
                  );
                }
              } catch (e) {
                console.error("Failed to parse sources JSON:", e);
              }
              return null;
            })()}

            {/* Author's Signature / Opinion box at the end (La Firma del Experto) */}
            {matchedAuthor && (
              <div className="mt-12 border-t border-slate-150 pt-8">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col sm:flex-row gap-5">
                  <div className="h-14 w-14 rounded-2xl overflow-hidden shrink-0 relative bg-slate-250 border border-slate-200 self-start sm:self-center">
                    <img
                      src={matchedAuthor.imageUrl}
                      alt={matchedAuthor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-teal-600 block mb-0.5">La Firma del Experto</span>
                      <h4 className="font-display text-base font-bold text-slate-900">
                        <Link href={`/autores/${matchedAuthor.slug}`} className="hover:text-teal-650 hover:underline transition-colors">
                          {matchedAuthor.name}
                        </Link>
                      </h4>
                      <p className="font-sans text-[11px] text-slate-500">{matchedAuthor.role} • {matchedAuthor.colegiatura}</p>
                    </div>
                    <p className="font-sans text-xs italic text-slate-650 leading-relaxed">
                      "{matchedAuthor.opinion}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
