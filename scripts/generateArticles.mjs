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

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ue141n9fuwc6czgz@187.127.233.89:5433/postgres";
const apiKey = process.env.DEEPSEEK_API_KEY;

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
        content: parsed.content
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
      content: unescapedHTML
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
    content: fallbackHTML
  };
}

async function main() {
  console.log("=== INICIANDO GENERADOR AUTOMÁTICO DE ARTÍCULOS ===");
  
  const templatePath = path.join(process.cwd(), "template.md");
  if (!fs.existsSync(templatePath)) {
    console.error("ERROR: No se encuentra 'template.md' en la raíz del proyecto.");
    process.exit(1);
  }

  const templateContent = fs.readFileSync(templatePath, "utf-8");
  console.log(`[OK] Plantilla cargada desde: template.md`);

  try {
    // Buscar artículos con cuerpo de contenido vacío
    const { rows } = await pool.query(
      "SELECT id, title, keyword, category_name, excerpt FROM articles WHERE content = '' OR LENGTH(content) = 0 ORDER BY published_at ASC"
    );

    const emptyCount = rows.length;
    console.log(`[DB] Se han encontrado ${emptyCount} artículos con cuerpo vacío.`);

    if (emptyCount === 0) {
      console.log("[FIN] Todos los artículos ya tienen contenido. Nada que hacer.");
      return;
    }

    // Procesar de uno en uno
    for (let i = 0; i < rows.length; i++) {
      const article = rows[i];
      console.log(`\n--------------------------------------------------`);
      console.log(`[PROCESANDO ${i + 1}/${emptyCount}] ID: ${article.id}`);
      console.log(`Título: "${article.title}"`);
      console.log(`Keyword: "${article.keyword}"`);
      console.log(`Categoría: "${article.category_name}"`);
      
      const prompt = `
      Plantilla de Instrucciones y Reglas de Formato:
      ${templateContent}

      Parámetros de Entrada para este Artículo:
      *   Título del Artículo: ${article.title}
      *   Palabras Clave Principales (Keywords): ${article.keyword}
      *   Categoría: ${article.category_name}
      
      Recuerda:
      1. Devolver estrictamente un objeto JSON que siga la estructura exacta definida en la sección 4 de las instrucciones.
      2. El artículo debe ser extremadamente largo, detallado y exhaustivo. Debe contener estrictamente entre 2.200 y 3.000 palabras de texto real (sin contar etiquetas HTML).
      3. BAJO NINGÚN CONCEPTO puede bajar de 1.200 palabras de texto real. Explica cada cobertura, exclusión, base legal e implicaciones periciales con total detalle para garantizar la máxima profundidad y longitud.
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
              temperature: 0.5,
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

          if (wordCount >= 1200) {
            finalResult = parsedResult;
            break;
          } else {
            console.warn(`>> ADVERTENCIA: El artículo generado tiene menos de 1200 palabras (${wordCount}). Reintentando con instrucciones de expansión estrictas...`);
            extraInstruction = `\n\n[ATENCIÓN CRÍTICA: Tu redacción anterior contenía únicamente ${wordCount} palabras. Es obligatorio que el artículo tenga más de 1.500 palabras y nunca baje de 1.200 palabras. Por favor, reescribe el artículo con muchísima más profundidad: añade más casos prácticos de la vida real en España, explica las normativas legales en detalle (Ley 50/1980), detalla de forma exhaustiva las exclusiones de la póliza y expande todas las secciones y tablas para superar con creces el límite mínimo.]`;
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
           SET title = $1, meta_title = $2, meta_description = $3, excerpt = $4, content = $5 
           WHERE id = $6`,
          [
            finalResult.title || article.title, 
            finalResult.meta_title || article.title, 
            finalResult.meta_description || article.excerpt, 
            finalResult.excerpt || article.excerpt, 
            finalResult.content, 
            article.id
          ]
        );
        console.log(`[OK] Guardado completado con éxito para: ${article.id}`);
        
        // Esperar para evitar saturar la API
        await new Promise(res => setTimeout(res, 4000));
      } else {
        console.error(`[FALLO] No se pudo generar contenido válido de más de 1200 palabras para: ${article.id}`);
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
