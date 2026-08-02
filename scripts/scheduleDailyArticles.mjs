import { Pool } from "pg";
import fs from "fs";
import path from "path";

// Load environment variables from local env files if they exist (.env.local, .env)
const envFiles = [".env.local", ".env", ".env.production"];
for (const file of envFiles) {
  try {
    const envPath = path.join(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      envContent.split("\n").forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const index = trimmed.indexOf("=");
          const key = trimmed.slice(0, index).trim();
          const val = trimmed.slice(index + 1).trim();
          process.env[key] = val;
        }
      });
      console.log(`[ENV] Cargadas variables desde: ${file}`);
    }
  } catch (e) {
    console.warn(`No se pudo leer ${file}:`, e.message);
  }
}

const connectionString = process.env.DATABASE_URL;
const apiKey = process.env.DEEPSEEK_API_KEY;

if (!connectionString) {
  const errMsg = "ERROR: No se ha encontrado la variable DATABASE_URL.";
  console.error("\n=====================================================================");
  console.error(errMsg);
  console.error("=====================================================================\n");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: false,
});

async function logCronExecution(status, errorMessage = null, details = null) {
  try {
    await pool.query(
      `INSERT INTO cron_logs (script_name, status, error_message, details)
       VALUES ($1, $2, $3, $4)`,
      ["scheduleDailyArticles.mjs", status, errorMessage, details]
    );
  } catch (e) {
    console.error("Failed to write cron log to DB:", e.message);
  }
}

if (!apiKey) {
  const errMsg = "ERROR: No se ha encontrado la variable DEEPSEEK_API_KEY.";
  console.error("\n=====================================================================");
  console.error(errMsg);
  console.error("Para solucionarlo en producción (Dokploy/VPS):");
  console.error("1. Ve al panel de Dokploy de esta aplicación.");
  console.error("2. Haz clic en la pestaña 'Environment'.");
  console.error("3. Añade la variable:");
  console.error("   - Key: DEEPSEEK_API_KEY");
  console.error("   - Value: [Tu clave de API de DeepSeek]");
  console.error("4. Guarda los cambios (Save) y haz clic en 'Deploy' para redesplegar.");
  console.error("=====================================================================\n");
  await logCronExecution("ERROR", errMsg, "Missing DEEPSEEK_API_KEY environment variable.");
  await pool.end();
  process.exit(1);
}

// Premium images by category for Home Insurance
const CATEGORY_IMAGES = {
  "comparativas": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60", // Casa con contrato
    "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=60", // Firma / acuerdo
    "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800&auto=format&fit=crop&q=60", // Hogar acogedor
    "https://images.unsplash.com/photo-1521791136364-7286475269a9?w=800&auto=format&fit=crop&q=60"  // Trato de manos
  ],
  "coberturas": [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60", // Reparaciones / reformas
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60", // Instalador técnico
    "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=800&auto=format&fit=crop&q=60", // Familia y hogar seguro
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=60"  // Grifo / agua
  ],
  "tipos-de-vivienda": [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60", // Unifamiliar moderno
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60", // Edificio / pisos
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60", // Chalet ajardinado
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60"  // Casa residencial
  ],
  "guias": [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60", // Oficina / ordenador / guías
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60", // Papeles / finanzas
    "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&auto=format&fit=crop&q=60", // Review de documentos
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60"  // Redacción / análisis
  ]
};

// Date formatter in Spanish (e.g. "17 Jun 2026")
function formatSpanishDate(d) {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// Clean HTML tag stripper to count words in the article text
function getWordCount(html) {
  if (!html) return 0;
  const plainText = html.replace(/<[^>]*>/g, " ");
  return plainText.trim().split(/\s+/).filter(Boolean).length;
}

// Cleaner/Extractor for JSON and HTML
function extractContentHTML(rawText, originalTitle, originalExcerpt, originalKeyword) {
  const defaultSources = [
    { name: "Ley 50/1980, de 8 de octubre, de Contrato de Seguro (BOE)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1980-22501" },
    { name: "Dirección General de Seguros y Fondos de Pensiones (DGSFP)", url: "https://www.dgsfp.mineco.es/" }
  ];

  try {
    let cleanJSON = rawText.trim();
    if (cleanJSON.startsWith("```")) {
      cleanJSON = cleanJSON
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/s, "")
        .trim();
    }
    const parsed = JSON.parse(cleanJSON);
    if (parsed && parsed.content) {
      return {
        title: parsed.title || originalTitle,
        meta_title: parsed.meta_title || parsed.metaTitle || originalTitle,
        meta_description: parsed.meta_description || parsed.metaDescription || originalExcerpt,
        excerpt: parsed.excerpt || originalExcerpt,
        content: parsed.content,
        sources: parsed.sources || defaultSources
      };
    }
  } catch (e) {
    // If complete JSON fails, proceed to manual extraction
  }

  const contentRegex = /"content"\s*:\s*"(.*)/s;
  const match = rawText.match(contentRegex);
  if (match && match[1]) {
    let contentStr = match[1].trim();
    let endIdx = -1;
    for (let j = 0; j < contentStr.length; j++) {
      if (contentStr[j] === '"' && (j === 0 || contentStr[j - 1] !== '\\')) {
        const sub = contentStr.slice(j + 1).trim();
        if (sub === "" || sub === "}" || sub.startsWith(",") || sub.startsWith('"')) {
          endIdx = j;
          break;
        }
      }
    }
    if (endIdx !== -1) {
      contentStr = contentStr.slice(0, endIdx);
    } else {
      contentStr = contentStr.replace(/["\}\,\s]+$/, "");
    }
    const unescapedHTML = contentStr
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .replace(/\\\\/g, '\\');

    let title = originalTitle;
    let meta_title = originalTitle;
    let meta_description = originalExcerpt;
    let excerpt = originalExcerpt;

    const titleMatch = rawText.match(/"title"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (titleMatch) title = titleMatch[1].replace(/\\"/g, '"');
    const metaTitleMatch = rawText.match(/"meta_title"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (metaTitleMatch) meta_title = metaTitleMatch[1].replace(/\\"/g, '"');
    const metaDescMatch = rawText.match(/"meta_description"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (metaDescMatch) meta_description = metaDescMatch[1].replace(/\\"/g, '"');
    const excerptMatch = rawText.match(/"excerpt"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (excerptMatch) excerpt = excerptMatch[1].replace(/\\"/g, '"');

    return {
      title,
      meta_title: meta_title || title,
      meta_description: meta_description || originalKeyword,
      excerpt: excerpt || originalExcerpt,
      content: unescapedHTML,
      sources: defaultSources
    };
  }

  const fallbackHTML = rawText
    .replace(/^```html\s*/i, "")
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/s, "")
    .trim();

  return {
    title: originalTitle,
    meta_title: originalTitle,
    meta_description: originalExcerpt,
    excerpt: originalExcerpt,
    content: fallbackHTML,
    sources: defaultSources
  };
}

function getArchetypePrompt(categoryName, title, keyword) {
  const cleanCategory = categoryName.toLowerCase().trim();
  
  if (cleanCategory.includes("comparativa")) {
    return `
    ESTRUCTURA REQUERIDA (ARQUETIPO B - COMPARATIVAS DE PÓLIZAS DE SEGURO):
    Debes redactar un artículo extenso (mínimo 2.200 palabras) utilizando las siguientes secciones estructuradas en HTML dentro de la propiedad 'content':
    
    1. INTRODUCCIÓN Y CONTEXTO EDITORIAL INDEPENDIENTE (mínimo 250 palabras): Explica la relevancia de esta comparativa de seguros de hogar en España. Presenta un resumen del análisis de mercado y la necesidad de transparencia.
    2. TABLA COMPARATIVA DE LÍMITES Y GARANTÍAS (mínimo 300 palabras explicativas + tabla HTML): Diseña una tabla detallada con al menos 4 aseguradoras (ej. Mapfre, Allianz, Mutua Madrileña, AXA) comparando límites de Responsabilidad Civil, Daños Estéticos, Asistencia de urgencia y Franquicias. Utiliza insignias semánticas (bg-emerald-50 para 'Sí cubierto', bg-amber-50 para 'Opcional / Límite', bg-rose-50 para 'Excluido').
    3. DUELO CARA A CARA: PROS Y CONTRAS DE CADA ASEGURADORA (mínimo 550 palabras): Utiliza una grilla de tarjetas (grid-cols-1 md:grid-cols-2) para desglosar detalladamente los pros y contras de cada compañía en España.
    4. ANÁLISIS DE COBERTURAS CRÍTICAS Y LETRA PEQUEÑA (mínimo 450 palabras): Analiza en profundidad la diferencia en el trato pericial de estas compañías ante goteras, daños eléctricos o atascos de tuberías. Usa la Caja de Advertencia (fondo ámbar) para alertar sobre límites ocultos.
    5. ESTADÍSTICAS DEL SECTOR Y RATIOS DE ATENCIÓN (mínimo 350 palabras): Cita estadísticas reales en España basadas en la Memoria Social del Seguro de UNESPA o ICEA (por ejemplo, el coste medio de los siniestros por agua de 420€ o que representan el 38% de las incidencias).
    6. EL VEREDICTO DEL PERITO SEGÚN TU PERFIL DE VIVIENDA (mínimo 250 palabras): Usa la Caja de Consejo (fondo teal) para recomendar qué aseguradora conviene si es un piso alquilado, un chalet con piscina o una vivienda unifamiliar.
    7. PREGUNTAS FRECUENTES SOBRE ESTA COMPARATIVA (mínimo 4 acordeones desplegables con <details> y respuestas muy desarrolladas de al menos 95 palabras cada una).
    `;
  } else if (cleanCategory.includes("cobertura")) {
    return `
    ESTRUCTURA REQUERIDA (ARQUETIPO C - COBERTURAS TÉCNICAS Y RECLAMACIÓN):
    Debes redactar un artículo extenso (mínimo 2.200 palabras) utilizando las siguientes secciones estructuradas en HTML dentro de la propiedad 'content':
    
    1. INTRODUCCIÓN AL SINIESTRO Y COBERTURA (mínimo 250 palabras): Explica detalladamente en qué consiste este riesgo en el hogar y cómo lo percibe el asegurado medio en España.
    2. MARCO LEGAL Y REGLAMENTO DE SEGUROS (mínimo 350 palabras): Cita explícitamente artículos de la Ley 50/1980 de Contrato de Seguro en España (por ejemplo, el Artículo 38 sobre nombramiento de peritos, o el Artículo 18 sobre el pago de la indemnización mínima) y detalla su aplicación práctica en este siniestro.
    3. QUÉ EXAMINA EL PERITO: CRITERIOS TÉCNICOS DE ACEPTACIÓN (mínimo 500 palabras): Detalla minuciosamente los puntos clave que un perito de seguros inspecciona al acudir al hogar (ej. si la gotera viene de una junta de silicona deteriorada, si el daño eléctrico fue por rayo o sobretensión de la distribuidora, etc.).
    4. EXCLUSIONES COMUNES Y GLOSARIO DE LETRA PEQUEÑA (mínimo 400 palabras): Explica de forma sumamente detallada qué incidentes NO están cubiertos. Utiliza la Caja de Advertencia (fondo ámbar) para alertar al lector sobre la exclusión por falta de mantenimiento o desgaste.
    5. CASO DE ESTUDIO DE SINIESTRO REAL EN ESPAÑA (mínimo 450 palabras): Describe un expediente de reclamación realista y detallado. Incluye:
       - Código de Expediente ficticio (ej. Siniestro Nº SH-2026/4921)
       - Fecha de ocurrencia e aseguradora implicada
       - Detalles técnicos de la avería observada por el perito
       - Importe presupuestado, aplicación de depreciación o regla proporcional, e indemnización final cobrada.
    6. PREGUNTAS FRECUENTES SOBRE ESTA COBERTURA (mínimo 4 acordeones desplegables con <details> y respuestas explicativas de al menos 95 palabras cada una).
    7. RECOMENDACIÓN FINAL Y CONSEJOS DEL PERITO (mínimo 200 palabras): Recomendaciones para evitar rechazos de cobertura en el futuro. Usa la Caja de Consejo (fondo teal).
    `;
  } else if (cleanCategory.includes("vivienda") || cleanCategory.includes("tipo")) {
    return `
    ESTRUCTURA REQUERIDA (ARQUETIPO D - TIPOS DE VIVIENDA Y RIESGOS ESPECÍFICOS):
    Debes redactar un artículo extenso (mínimo 2.200 palabras) utilizando las siguientes secciones estructuradas en HTML dentro de la propiedad 'content':
    
    1. INTRODUCCIÓN Y MAPA DE RIESGO DE LA VIVIENDA (mínimo 250 palabras): Explica las particularidades de este tipo de inmueble en España (pisos en altura, chalets, áticos, alquileres) y sus vulnerabilidades estadísticas de siniestralidad.
    2. COBERTURAS INDISPENSABLES Y RECOMENDADAS (mínimo 450 palabras): Explica qué pólizas y coberturas adicionales se deben contratar obligatoriamente o de forma muy sugerida para este tipo de casa (ej. Responsabilidad Civil Locativa para inquilinos, robo exterior para chalets aislados).
    3. TABLA COMPARATIVA DE CAPITALES SUGERIDOS (mínimo 300 palabras explicativas + tabla HTML): Elabora una tabla con recomendaciones de tasación de continente y contenido según metros cuadrados y calidades de construcción para este tipo de inmueble.
    4. RESPONSABILIDADES Y CONFLICTOS FRECUENTES (mínimo 400 palabras): Trata los conflictos entre seguro comunitario y seguro privado, o casero frente a inquilino. Usa la Caja de Advertencia (fondo ámbar) para alertar sobre la concurrencia de seguros.
    5. CASO DE ESTUDIO REAL DE PERITACIÓN (mínimo 450 palabras): Describe un caso práctico detallado de este tipo de vivienda. Incluye:
       - Código de Expediente de Siniestro (ej. Expediente Nº PV-2026/3819)
       - Origen del daño técnico
       - Dictamen pericial y desglose económico de la indemnización.
    6. PREGUNTAS FRECUENTES (FAQ) SOBRE ESTA TIPOLOGÍA (mínimo 4 acordeones desplegables con <details> y respuestas extensas de al menos 95 palabras cada una).
    7. CONCLUSIONES Y RECOMENDACIÓN DE CONTRATACIÓN (mínimo 200 palabras): Usa la Caja de Consejo (fondo teal) para dar la firma final sobre cómo blindar este inmueble.
    `;
  } else {
    // Guías
    return `
    ESTRUCTURA REQUERIDA (ARQUETIPO A - GUÍAS DE CONSUMO PASO A PASO):
    Debes redactar un artículo extenso (mínimo 2.200 palabras) utilizando las siguientes secciones estructuradas en HTML dentro de la propiedad 'content':
    
    1. INTRODUCCIÓN Y ANTECEDENTES DE LA GESTIÓN (mínimo 250 palabras): Explica la importancia de este trámite y la dificultad burocrática habitual que afronta el asegurado en España.
    2. LÍNEA DE TIEMPO CRONOLÓGICA DEL PROCESO (mínimo 450 palabras): Desarrolla una línea de tiempo visual o cronológica de los pasos a seguir. Representa esto visualmente usando una lista estilizada en HTML/Tailwind con bordes, números grandes y sombreados (CSS Timeline).
    3. DOCUMENTACIÓN REQUERIDA Y REQUISITOS (mínimo 350 palabras): Detalla qué papeles, facturas, fotos, denuncias o informes técnicos debe reunir el asegurado. Utiliza una lista con iconos SVG de verificación.
    4. MODELO DE CARTA / ESCRITO DE RECLAMACIÓN OFICIAL (mínimo 300 palabras): Proporciona una plantilla modelo de escrito formal listo para copiar y rellenar. Preséntalo en una caja con bordes grises y tipografía monoespacio (code/pre block).
    5. A DÓNDE DIRIGIRSE: CONTACTOS Y PLAZOS LEGALES (mínimo 300 palabras): Explica los plazos legales (por ejemplo, 1 mes para que el Defensor responda, o 7 días para comunicar el siniestro). Utiliza la Caja de Advertencia (fondo ámbar).
    6. CASO PRÁCTICO REAL RESUELTO (mínimo 300 palabras): Un ejemplo detallado de un consumidor que realizó este trámite con éxito (Expediente Reclamación Nº REC-2026/7821), con importes y dictamen final.
    7. PREGUNTAS FRECUENTES (FAQ) DE LA GESTIÓN (mínimo 4 acordeones desplegables con <details> y respuestas extensas de al menos 95 palabras cada una).
    8. CONSEJO FINAL DEL JURISTA (mínimo 200 palabras): Consejos prácticos de cierre. Usa la Caja de Consejo (fondo teal).
    `;
  }
}

async function main() {
  console.log("=== PLANIFICADOR DIARIO: GENERADOR DE 2 ARTÍCULOS NUEVOS ===");
  const generatedArticles = [];

  // 1. Obtener títulos y keywords existentes de la BD para evitar duplicados
  console.log(">> Obteniendo registros existentes de la base de datos...");
  const existingRes = await pool.query("SELECT id, title, keyword FROM articles");
  const existingArticles = existingRes.rows;
  console.log(`[BD] Encontrados ${existingArticles.length} artículos existentes.`);

  const existingTitlesList = existingArticles.map(a => ` - ${a.title} (${a.keyword})`).join("\n");

  // 2. Cargar la plantilla general de redacción
  const templatePath = path.join(process.cwd(), "template.md");
  if (!fs.existsSync(templatePath)) {
    console.error("ERROR: No se encuentra 'template.md' en la raíz del proyecto.");
    process.exit(1);
  }
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  // 3. Solicitar a la IA propuestas de artículos únicas hasta obtener 2 válidas que no existan en la BD
  let lasDosPropuestas = [];
  let attemptsProp = 0;
  const maxPropAttempts = 3;

  while (lasDosPropuestas.length < 2 && attemptsProp < maxPropAttempts) {
    attemptsProp++;
    console.log(`>> Solicitar nuevas ideas a DeepSeek (Intento ${attemptsProp})...`);
    
    const promptPropuestas = `
Eres el director editorial de mihogarasegurado.com, un portal en Español especializado en seguros de hogar en España, coberturas, comparativas de pólizas y guías para el consumidor.
Queremos publicar exactamente DOS artículos hoy en la web. Deben ser temas de gran interés, optimizados para SEO y 100% únicos.

Aquí está la lista de artículos que YA están en la web:
${existingTitlesList}
${lasDosPropuestas.map(p => ` - ${p.title} (${p.keyword})`).join("\n")}

Por favor, propón DOS temas completamente nuevos en español que no estén en la lista anterior.
Debes devolver la respuesta estrictamente como un objeto JSON con la siguiente estructura:
{
  "propuestas": [
    {
      "title": "Un título SEO muy atractivo y profesional sobre seguros de hogar en España, sin emojis",
      "keyword": "La keyword principal de búsqueda en Google para el artículo",
      "slug": "un-slug-amigable-para-la-url-ej-seguro-hogar-humedades-cobertura",
      "excerpt": "Un resumen introductorio o excerpt de 2 líneas para la tarjeta de previsualización",
      "category_name": "Debe ser exactamente una de estas cuatro: 'Comparativas', 'Coberturas', 'Tipos de Vivienda', 'Guías'",
      "category_slug": "Debe ser exactamente una de estas cuatro correspondientes: 'comparativas', 'coberturas', 'tipos-de-vivienda', 'guias'",
      "read_time": "Lectura de X min (ej: 'Lectura de 8 min')",
      "author": "Debe ser exactamente uno de estos tres: 'Patricia G.', 'Carlos M.' o 'Elena R.'"
    },
    {
      "title": "Otro título SEO atractivo y profesional sobre seguros de hogar en España, sin emojis",
      "keyword": "La keyword principal del segundo artículo",
      "slug": "otro-slug-amigable-para-la-url-ej-comparativa-seguros-hogar-robos",
      "excerpt": "Un resumen del segundo artículo",
      "category_name": "Debe ser exactamente una de estas cuatro: 'Comparativas', 'Coberturas', 'Tipos de Vivienda', 'Guías'",
      "category_slug": "Debe ser exactamente una de estas cuatro correspondientes: 'comparativas', 'coberturas', 'tipos-de-vivienda', 'guias'",
      "read_time": "Lectura de X min (ej: 'Lectura de 9 min')",
      "author": "Debe ser exactamente uno de estos tres: 'Patricia G.', 'Carlos M.' o 'Elena R.'"
    }
  ]
}
Devuelve únicamente el objeto JSON.
`;

    let responsePropuestasText = "";
    try {
      const res = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "Eres un director editorial que responde estrictamente en JSON." },
            { role: "user", content: promptPropuestas }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });

      if (!res.ok) {
        throw new Error(`Error en API al proponer temas: ${res.statusText}`);
      }
      const data = await res.json();
      responsePropuestasText = data.choices[0].message.content;
    } catch (err) {
      console.error("Error obteniendo propuestas de la IA:", err);
      continue;
    }

    try {
      let cleanJSON = responsePropuestasText.trim();
      if (cleanJSON.startsWith("```")) {
        cleanJSON = cleanJSON
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/```$/s, "")
          .trim();
      }
      
      const parsed = JSON.parse(cleanJSON);
      let propuestasObtenidas = parsed.propuestas || parsed.articles || parsed.articlesList || parsed;
      if (!Array.isArray(propuestasObtenidas)) {
        if (typeof propuestasObtenidas === "object" && propuestasObtenidas !== null) {
          propuestasObtenidas = Object.values(propuestasObtenidas).find(val => Array.isArray(val)) || [];
        } else {
          continue;
        }
      }

      // Validar y filtrar duplicados programáticamente contra la base de datos
      for (const p of propuestasObtenidas) {
        const keywordNorm = p.keyword.toLowerCase().trim();
        const slugNorm = p.slug.toLowerCase().trim();

        const isKeywordDup = existingArticles.some(a => a.keyword && a.keyword.toLowerCase().trim() === keywordNorm) || 
                             lasDosPropuestas.some(lp => lp.keyword.toLowerCase().trim() === keywordNorm);
        const isSlugDup = existingArticles.some(a => a.id.toLowerCase().trim() === slugNorm) ||
                          lasDosPropuestas.some(lp => lp.slug.toLowerCase().trim() === slugNorm);

        if (!isKeywordDup && !isSlugDup) {
          lasDosPropuestas.push(p);
          if (lasDosPropuestas.length === 2) break;
        } else {
          console.warn(`[DUPLICADO] Filtrada propuesta con keyword '${p.keyword}' o slug '${p.slug}'`);
        }
      }
    } catch (e) {
      console.error("Error parseando el JSON de propuestas:", e.message);
    }
  }

  if (lasDosPropuestas.length < 2) {
    console.error("ERROR: No se pudieron obtener suficientes propuestas únicas que no estén ya en la base de datos.");
    process.exit(1);
  }

  console.log(`[OK] Propuestas únicas seleccionadas:`);
  lasDosPropuestas.forEach((p, idx) => {
    console.log(`  ${idx + 1}. [${p.category_name}] ${p.title} (Keyword: ${p.keyword})`);
  });

  // Define random publication hours of today
  const randomTimes = [
    { startHour: 8, endHour: 13 },
    { startHour: 15, endHour: 21 }
  ];

  // Gradients for fallback
  const gradients = [
    "from-cyan-500 to-blue-600",
    "from-teal-400 to-emerald-600",
    "from-amber-400 to-orange-500",
    "from-violet-500 to-purple-600",
    "from-indigo-500 to-sky-600",
    "from-rose-500 to-red-650"
  ];

  for (let i = 0; i < lasDosPropuestas.length; i++) {
    const prop = lasDosPropuestas[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`>> Generando Artículo ${i + 1}/2: "${prop.title}"...`);

    const archetypePrompt = getArchetypePrompt(prop.category_name, prop.title, prop.keyword);

    const promptRedaccion = `
Plantilla de Instrucciones y Reglas de Formato General:
${templateContent}

Parámetros de Entrada para este Artículo:
*   Título del Artículo: ${prop.title}
*   Palabras Clave Principales (Keywords): ${prop.keyword}
*   Categoría: ${prop.category_name}

INSTRUCCIONES DE VALOR AÑADIDO Y COMPONENTES EXCLUSIVOS (CRÍTICO):
1. INCLUIR EXPEDIENTES DE SINIESTRO REALES: Debes inyectar al menos un caso de estudio real que cite detalles específicos: un número de expediente ficticio (ej. Expediente Nº S-2026/8492), una aseguradora implicada (Mapfre, Allianz, etc.), el coste pericial calculated y cómo se resolvió.
2. DATOS ESTADÍSTICOS DE ESPAÑA: Cita estadísticas de informes de UNESPA o ICEA sobre siniestralidad de hogar en España (ej. "según el informe UNESPA el 38% de los siniestros son goteras" o "el tiempo medio de atención pericial").
3. VARIACIÓN DE ESTRUCTURA: Debes seguir estrictamente el arquetipo que se describe a continuación para diferenciar visualmente y a nivel de contenido este artículo del resto del portal.

${archetypePrompt}

No resumas ni uses viñetas cortas. Desarrolla cada párrafo extensamente para garantizar la máxima profundidad y alcanzar las 2.200 - 3.000 palabras totales. Si el contenido de 'content' tiene menos de 2.000 palabras de texto real, tu respuesta será rechazada.
`;

    let finalResult = null;
    let attempt = 0;
    const maxAttempts = 3;
    let extraInstruction = "";

    while (attempt < maxAttempts) {
      try {
        attempt++;
        console.log(`  Intento ${attempt}: Conectando con DeepSeek...`);
        const res = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "Eres un redactor experto en SEO y desarrollo web. Debes responder estrictamente en formato JSON." },
              { role: "user", content: promptRedaccion + extraInstruction }
            ],
            temperature: 0.5,
            max_tokens: 8000,
            response_format: { type: "json_object" }
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`API Error (${res.status}): ${errText}`);
        }

        const data = await res.json();
        const rawContent = data.choices[0].message.content;
        const parsedResult = extractContentHTML(rawContent, prop.title, prop.excerpt, prop.keyword);
        
        const wordCount = getWordCount(parsedResult.content);
        console.log(`  -> Intento ${attempt}: El artículo tiene ${wordCount} palabras de texto real.`);

        if (wordCount >= 2000) {
          finalResult = parsedResult;
          break;
        } else {
          console.warn(`  -> ADVERTENCIA: El artículo generado tiene menos de 2000 palabras (${wordCount}). Reintentando con instrucciones de expansión estrictas...`);
          extraInstruction = `\n\n[ATENCIÓN CRÍTICA: Tu redacción anterior contenía únicamente ${wordCount} palabras. Es obligatorio que el artículo tenga más de 2.200 palabras y nunca baje de 2.000 palabras. Por favor, reescribe el artículo con muchísima más profundidad: duplica la extensión de cada H2 y H3, añade más casos prácticos detallados, cita textualmente artículos de la Ley 50/1980 de Contrato de Seguro, detalla de forma sumamente exhaustiva las exclusiones de la póliza y expande todas las explicaciones para superar ampliamente el límite mínimo de 2.000 palabras.]`;
        }
      } catch (err) {
        console.error(`  Error en intento ${attempt}:`, err.message);
        if (attempt < maxAttempts) {
          console.log("  Esperando 10 segundos antes de reintentar...");
          await new Promise(res => setTimeout(res, 10000));
        }
      }
    }

    if (!finalResult) {
      console.error(`[ERROR] No se pudo generar un artículo que cumpla con el mínimo de palabras para: ${prop.title}`);
      continue;
    }

    // Calculate random time
    const timeLimit = randomTimes[i];
    const formatterStr = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" }); // "YYYY-MM-DD"
    const [yr, mo, dy] = formatterStr.split("-").map(Number);

    const pubDate = new Date(Date.UTC(yr, mo - 1, dy));
    const randomHour = timeLimit.startHour + Math.floor(Math.random() * (timeLimit.endHour - timeLimit.startHour));
    const randomMinute = Math.floor(Math.random() * 60);
    
    pubDate.setUTCHours(randomHour);
    pubDate.setUTCMinutes(randomMinute);
    pubDate.setUTCSeconds(0);
    pubDate.setUTCMilliseconds(0);

    const dateStr = formatSpanishDate(pubDate);

    // Get premium image
    const imgList = CATEGORY_IMAGES[prop.category_slug] || CATEGORY_IMAGES["guias"];
    const randomImg = imgList[Math.floor(Math.random() * imgList.length)];

    // Gradient
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    // Save to database
    console.log(`  Guardando en la BD con fecha de publicación programada: ${pubDate.toISOString()} (${dateStr} a las ${String(randomHour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')})...`);
    
    // Prepare HTML content value for DB format (JSON string containing title and content)
    const dbContentJSON = {
      title: finalResult.title || prop.title,
      content: finalResult.content
    };
    const dbContentValue = JSON.stringify(dbContentJSON);

    await pool.query(
      `INSERT INTO articles (
        id, title, excerpt, category_name, category_slug, 
        date, read_time, image_url, image_gradient, 
        author, content, meta_title, meta_description, published_at, keyword,
        sources, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        published_at = EXCLUDED.published_at,
        date = EXCLUDED.date,
        sources = EXCLUDED.sources,
        updated_at = NOW()`,
      [
        prop.slug,
        finalResult.title || prop.title,
        finalResult.excerpt || prop.excerpt,
        prop.category_name,
        prop.category_slug,
        dateStr,
        prop.read_time,
        randomImg,
        randomGradient,
        prop.author,
        dbContentValue,
        finalResult.meta_title || prop.title,
        finalResult.meta_description || prop.excerpt,
        pubDate,
        prop.keyword,
        JSON.stringify(finalResult.sources || [])
      ]
    );

    console.log(`[OK] Guardado completado con éxito para slug: ${prop.slug}`);
    
    generatedArticles.push({
      title: finalResult.title || prop.title,
      slug: prop.slug,
      category: prop.category_name,
      keyword: prop.keyword
    });

    // Waiting interval
    await new Promise(res => setTimeout(res, 4000));
  }

  console.log("\n=== PLANIFICADOR DIARIO COMPLETADO CON ÉXITO ===");
  await logCronExecution("SUCCESS", null, `Se generaron y publicaron ${generatedArticles.length} artículos: ${JSON.stringify(generatedArticles)}`);
  await pool.end();
}

main().catch(async (err) => {
  console.error("Excepción general en el proceso:", err);
  try {
    await logCronExecution("ERROR", err.message, err.stack);
  } catch (e) {
    console.error("Error logging exception:", e);
  }
  await pool.end();
});
