import { Pool } from "pg";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local manually
try {
  const envPath = path.join(process.cwd(), ".env.local");
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
  }
} catch (e) {
  console.warn("No se pudo leer .env.local de forma manual:", e.message);
}

const connectionString = process.env.DATABASE_URL;
const apiKey = process.env.DEEPSEEK_API_KEY;

if (!connectionString) {
  console.error("ERROR: No se ha encontrado la variable DATABASE_URL en el entorno.");
  process.exit(1);
}

if (!apiKey) {
  console.error("ERROR: No se ha encontrado la variable DEEPSEEK_API_KEY en .env.local o variables de entorno.");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: false,
});

// Clean HTML tag stripper to count words in the article text
function getWordCount(html) {
  if (!html) return 0;
  const plainText = html.replace(/<[^>]*>/g, " ");
  return plainText.trim().split(/\s+/).filter(Boolean).length;
}

// Robust function to parse IA responses (JSON / Plain HTML / Truncated HTML)
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
    // If complete JSON parsing fails, do partial manual extraction
  }

  const contentRegex = /"content"\s*:\s*"(.*)/s;
  const match = rawText.match(contentRegex);
  if (match && match[1]) {
    let contentStr = match[1].trim();
    
    // Find end index by looking for the last unescaped double quote followed by completion indicators
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

// Function to build category-specific archetype prompts to avoid structural repetition and improve E-E-A-T value
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
    5. A DÓNDA DIRIGIRSE: CONTACTOS Y PLAZOS LEGALES (mínimo 300 palabras): Explica los plazos legales (por ejemplo, 1 mes para que el Defensor responda, o 7 días para comunicar el siniestro). Utiliza la Caja de Advertencia (fondo ámbar).
    6. CASO PRÁCTICO REAL RESUELTO (mínimo 300 palabras): Un ejemplo detallado de un consumidor que realizó este trámite con éxito (Expediente Reclamación Nº REC-2026/7821), con importes y dictamen final.
    7. PREGUNTAS FRECUENTES (FAQ) DE LA GESTIÓN (mínimo 4 acordeones desplegables con <details> y respuestas extensas de al menos 95 palabras cada una).
    8. CONSEJO FINAL DEL JURISTA (mínimo 200 palabras): Consejos prácticos de cierre. Usa la Caja de Consejo (fondo teal).
    `;
  }
}

async function main() {
  console.log("=== INICIANDO GENERADOR AUTOMÁTICO DE ARTÍCULOS ===");
  
  // Parse command line arguments for specific regeneration targets
  const args = process.argv.slice(2);
  let targetId = null;
  let isRegenerating = false;

  if (args.includes("--regenerate")) {
    const idx = args.indexOf("--regenerate");
    targetId = args[idx + 1];
    isRegenerating = true;
  } else if (args[0]) {
    targetId = args[0];
    isRegenerating = true;
  }

  const templatePath = path.join(process.cwd(), "template.md");
  if (!fs.existsSync(templatePath)) {
    console.error("ERROR: No se encuentra 'template.md' en la raíz del proyecto.");
    process.exit(1);
  }

  const templateContent = fs.readFileSync(templatePath, "utf-8");
  console.log(`[OK] Plantilla cargada desde: template.md`);

  try {
    let query = "SELECT id, title, keyword, category_name, excerpt FROM articles WHERE content = '' OR LENGTH(content) = 0 ORDER BY published_at ASC";
    let queryParams = [];
    
    if (isRegenerating && targetId) {
      console.log(`[MODO REGENERACIÓN] Intentando regenerar artículo ID: ${targetId}`);
      query = "SELECT id, title, keyword, category_name, excerpt FROM articles WHERE id = $1";
      queryParams = [targetId];
    }

    const { rows } = await pool.query(query, queryParams);
    const emptyCount = rows.length;

    if (emptyCount === 0) {
      console.log("[FIN] No se han encontrado artículos para procesar. Nada que hacer.");
      return;
    }

    console.log(`[DB] Se van a procesar ${emptyCount} artículos.`);

    // Procesar de uno en uno
    for (let i = 0; i < rows.length; i++) {
      const article = rows[i];
      console.log(`\n--------------------------------------------------`);
      console.log(`[PROCESANDO ${i + 1}/${emptyCount}] ID: ${article.id}`);
      console.log(`Título: "${article.title}"`);
      console.log(`Keyword: "${article.keyword}"`);
      console.log(`Categoría: "${article.category_name}"`);
      
      const archetypePrompt = getArchetypePrompt(article.category_name, article.title, article.keyword);

      const prompt = `
      Plantilla de Instrucciones y Reglas de Formato General:
      ${templateContent}

      Parámetros de Entrada para este Artículo:
      *   Título del Artículo: ${article.title}
      *   Palabras Clave Principales (Keywords): ${article.keyword}
      *   Categoría: ${article.category_name}
      
      INSTRUCCIONES DE VALOR AÑADIDO Y COMPONENTES EXCLUSIVOS (CRÍTICO):
      1. INCLUIR EXPEDIENTES DE SINIESTRO REALES: Debes inyectar al menos un caso de estudio real que cite detalles específicos: un número de expediente ficticio (ej. Expediente Nº S-2026/8492), una aseguradora implicada (Mapfre, Allianz, etc.), el coste pericial calculado y cómo se resolvió.
      2. DATOS ESTADÍSTICOS DE ESPAÑA: Cita estadísticas de informes de UNESPA o ICEA sobre siniestralidad de hogar en España (ej. "según el informe UNESPA el 38% de los siniestros son goteras" o "el tiempo medio de atención pericial").
      3. VARIACIÓN DE ESTRUCTURA: Debes seguir estrictamente el arquetipo que se describe a continuación para diferenciar visualmente y a nivel de contenido este artículo del resto del portal.
      
      ${archetypePrompt}

      No resumas ni uses viñetas cortas. Desarrolla cada párrafo extensamente para garantizar la máxima profundidad y alcanzar las 2.200 - 3.000 palabras totales. Si el contenido de 'content' tiene menos de 2.000 palabras de texto real, tu respuesta será rechazada de inmediato.
      `;

      let finalResult = null;
      let attempt = 0;
      const maxAttempts = 3;
      let extraInstruction = "";

      while (attempt < maxAttempts) {
        try {
          attempt++;
          console.log(`>> Llamando a la API de DeepSeek (Intento ${attempt})...`);
          
          const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages: [
                { role: "system", content: "Eres un redactor experto en SEO y desarrollo web. Debes responder estrictamente en formato JSON." },
                { role: "user", content: prompt + extraInstruction }
              ],
              temperature: 0.55,
              max_tokens: 8000,
              response_format: { type: "json_object" }
            })
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error (${response.status}): ${errText}`);
          }

          const data = await response.json();
          const rawContent = data.choices[0].message.content;
          const parsedResult = extractContentHTML(rawContent, article.title, article.excerpt, article.keyword);
          
          const wordCount = getWordCount(parsedResult.content);
          console.log(`>> Intento ${attempt}: El artículo tiene ${wordCount} palabras de texto real.`);

          if (wordCount >= 2000) {
            finalResult = parsedResult;
            break;
          } else {
            console.warn(`>> ADVERTENCIA: El artículo generado tiene menos de 2000 palabras (${wordCount}). Reintentando con instrucciones de expansión estrictas...`);
            extraInstruction = `\n\n[ATENCIÓN CRÍTICA: Tu redacción anterior contenía únicamente ${wordCount} palabras. Es obligatorio que el artículo tenga más de 2.200 palabras y nunca baje de 2.000 palabras. Por favor, reescribe el artículo con muchísima más profundidad: duplica la extensión de cada H2 y H3, añade más casos prácticos detallados, cita textualmente artículos de la Ley 50/1980 de Contrato de Seguro, detalla de forma sumamente exhaustiva las exclusiones de la póliza y expande todas las explicaciones para superar ampliamente el límite mínimo de 2.000 palabras.]`;
          }
        } catch (apiErr) {
          console.error(`>> Error de API en el intento ${attempt}:`, apiErr.message);
          if (attempt < maxAttempts) {
            console.log(">> Esperando 10 segundos antes de reintentar...");
            await new Promise(res => setTimeout(res, 10000));
          }
        }
      }

      if (finalResult) {
        console.log(`>> Guardando contenido y metadatos del artículo en la base de datos...`);
        
        await pool.query(
          `UPDATE articles 
           SET title = $1, meta_title = $2, meta_description = $3, excerpt = $4, content = $5, sources = $6, updated_at = NOW()
           WHERE id = $7`,
          [
            finalResult.title || article.title, 
            finalResult.meta_title || article.title, 
            finalResult.meta_description || article.excerpt, 
            finalResult.excerpt || article.excerpt, 
            finalResult.content, 
            JSON.stringify(finalResult.sources || []),
            article.id
          ]
        );
        console.log(`[OK] Guardado completado con éxito para: ${article.id}`);
        
        // Esperar para evitar saturar la API
        await new Promise(res => setTimeout(res, 3000));
      } else {
        console.error(`[FALLO] No se pudo generar contenido válido de más de 2000 palabras para: ${article.id}`);
      }
    }

    console.log("\n=== PROCESO DE GENERACIÓN COMPLETADO ===");
  } catch (err) {
    console.error("Excepción durante el proceso principal:", err);
  } finally {
    await pool.end();
  }
}

main().catch(console.error);
