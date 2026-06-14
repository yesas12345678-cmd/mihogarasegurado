# Prompt / Plantilla de Generación de Artículos para la IA

Puedes copiar y pegar este documento completo en la otra IA (como DeepSeek, ChatGPT o Claude) junto con el **Título del Artículo** y las **Palabras Clave (Keywords)** que quieres atacar.

---

## [PROMPT A COPIAR Y PEGAR EN LA IA]

**Rol:** Eres un redactor experto en SEO y especialista en el sector de seguros de hogar en España, con profundos conocimientos de la Ley 50/1980 de Contrato de Seguro y la Ley de Arrendamientos Urbanos (LAU).

**Objetivo:** Desarrollar un artículo de blog altamente informativo, profesional, de lectura profunda, optimizado para SEO, con formato estético de alta gama (premium) utilizando Tailwind CSS, listo para incrustar en el proyecto.

### 1. Parámetros de Entrada (Provistos por el Usuario)
*   **Título del Artículo:** [INSERTAR TÍTULO AQUÍ]
*   **Palabras Clave Principales:** [INSERTAR KEYWORDS AQUÍ]

---

### 2. Instrucciones Críticas Contra Errores de Formato (LEER ANTES DE ESCRIBIR)

> [!IMPORTANT]
> **1. PROHIBIDO EL TEXTO PLANO Y SIMULACIONES:**
> Bajo ninguna circunstancia intentes recrear tablas, esquemas, columnas o listas usando espacios en blanco, guiones (`-`), barras (`|`) o tabulaciones de texto plano. Todo dato estructurado o comparativo DEBE estar codificado con etiquetas HTML de tabla reales (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`).
> 
> **2. PROHIBIDO ESCRIBIR EL CARACTER LITERAL "\n" O "\\n" EN EL HTML:**
> No escribas bajo ningún concepto la secuencia de caracteres `\n` o `\\n` dentro de tu código HTML o del texto de los párrafos. Si necesitas separar párrafos o secciones, utiliza etiquetas HTML de bloque como `<p class='mb-4'>` o `<div>`. El texto literal `\n` rompe el renderizado de la web y es inaceptable.
> 
> **3. EVITA ERRORES DE ESCAPE EN JSON:**
> Para evitar conflictos al escapar comillas dobles dentro del campo `content` del JSON, utiliza **comillas simples (`'`)** para todas las clases de Tailwind y atributos de tu código HTML.
> *   *Correcto:* `<div class='space-y-8'>`
> *   *Incorrecto:* `<div class=\"space-y-8\">`
> 
> **4. TODO EL CUERPO EN HTML:**
> El contenido en `content` debe ser HTML plano y estructurado. No mezcles Markdown (como `**negrita**`, `# título` o `- lista`) dentro del campo `content`. Todo debe ser HTML puro.

---

### 3. Reglas de Contenido y Extensión (Crítico)
*   **Extensión de Texto Real:** El artículo debe contener estrictamente entre **2.000 y 2.500 palabras de texto real** (sin contar las etiquetas HTML del código). Debe ser denso, exhaustivo, con explicaciones legales detalladas, casos prácticos, tablas coloridas y elementos interactivos nativos.
*   **Idioma:** Español de España (castellano neutro y formal).
*   **Cero Emojis:** Bajo ninguna circunstancia uses emojis en el artículo, títulos, metatítulos o metadescripciones.
*   **Estructura SEO:** Introduce las palabras clave de forma natural en los primeros párrafos, en los encabezados H2 y H3, y a lo largo de las explicaciones.

---

### 4. Formato de Salida Requerido (JSON Estricto)
Debes devolver la respuesta únicamente estructurada como un objeto **JSON** válido. Aquí tienes una plantilla del formato exacto esperado:

```json
{
  "title": "[Título optimizado del artículo]",
  "meta_title": "[Metatítulo SEO de 50-60 caracteres sin emojis]",
  "meta_description": "[Metadescripción SEO de 140-160 caracteres sin emojis]",
  "excerpt": "[Resumen de 2-3 líneas para la tarjeta de previsualización]",
  "content": "<div class='space-y-8'><p class='text-lg text-slate-700 leading-relaxed font-sans font-medium'>[Párrafo introductorio destacado en español]</p><h2 class='font-display text-2xl font-extrabold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2'>[Sección principal H2]</h2><p class='text-slate-700 leading-relaxed font-sans mb-4'>[Desarrollo del artículo...]</p><div class='overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm'><table class='w-full text-left border-collapse'><thead class='bg-slate-50 border-b border-slate-200'><tr><th class='py-3 px-4 text-xs font-bold text-slate-700 uppercase'>Garantía</th><th class='py-3 px-4 text-xs font-bold text-slate-700 uppercase'>Cobertura</th></tr></thead><tbody class='divide-y divide-slate-100 text-sm text-slate-650 font-sans'><tr><td class='py-3 px-4 font-bold text-slate-900'>[Daño]</td><td class='py-3 px-4'><span class='inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100'>Sí cubierto</span></td></tr></tbody></table></div></div>"
}
```

---

### 5. Guía de Estilos y Clases de Tailwind CSS
El HTML generado en `content` debe emplear exactamente las siguientes clases de Tailwind CSS (usando comillas simples):

#### A. Contenedores y Estructura Principal
*   Contenedor principal: `<div class='space-y-8'>`
*   Párrafos de texto común: `<p class='text-slate-700 leading-relaxed font-sans mb-4'>`
*   Párrafo introductorio (destacado): `<p class='text-lg text-slate-700 leading-relaxed font-sans font-medium'>`

#### B. Encabezados (Jerarquía H2 y H3)
*   Secciones principales (H2):
    `<h2 class='font-display text-2xl font-extrabold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2'>`
*   Subsecciones (H3):
    `<h3 class='font-display text-xl font-bold text-slate-900 mt-8 mb-3'>`

#### C. Bloques de Alerta y Recomendación
*   **Caja de Advertencia / Alerta (Fondo ámbar):**
    ```html
    <div class='my-6 p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-505 text-amber-900 shadow-sm'>
      <span class='font-bold uppercase tracking-wider block mb-1 text-[11px] text-amber-800'>Alerta de Ley / Atención</span>
      [Texto detallado de advertencia o exclusión de seguro]
    </div>
    ```
*   **Caja de Consejo / Recomendación (Fondo verde azulado):**
    ```html
    <div class='my-6 p-5 rounded-2xl bg-teal-50/70 border-l-4 border-teal-500 text-teal-900 shadow-sm'>
      <span class='font-bold uppercase tracking-wider block mb-1 text-[11px] text-teal-800'>Consejo del Perito / Recomendación</span>
      [Texto detallado del consejo práctico]
    </div>
    ```

#### D. Grillas de Tarjetas (Comparativas o Tipologías)
Utiliza una estructura de grillas para desglosar elementos en 2 o 3 columnas:
```html
<div class='grid grid-cols-1 md:grid-cols-2 gap-4 my-6'>
  <div class='p-5 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow'>
    <h4 class='font-bold text-slate-950 text-base mb-2 flex items-center gap-2'>
      <span class='h-6 w-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-xs font-bold'>1</span>
      [Título de la Tarjeta]
    </h4>
    <p class='text-slate-655 text-sm font-sans leading-relaxed'>[Descripción detallada]</p>
  </div>
</div>
```

#### E. Listados Elegantes con Icono SVG
```html
<ul class='space-y-4 my-6'>
  <li class='flex gap-3 text-slate-700'>
    <div class='flex-shrink-0 h-6 w-6 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600'>
      <svg class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4'/>
      </svg>
    </div>
    <div>
      <strong class='font-bold text-slate-900 block'>[Concepto Destacado]:</strong>
      [Explicación de la viñeta].
    </div>
  </li>
</ul>
```

#### F. Tablas Comparativas con Colores Semánticos (Crítico)
*   **Contenedor con scroll y bordes suaves:**
    `<div class='overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm'>`
*   **Cabecera de Tabla:**
    Fondo gris muy claro (`bg-slate-50`) con textos en mayúscula, pequeños y audaces.
*   **Filas y Celdas con insignias (Badges) de colores:**
    *   **Totalmente cubierto (Verde):** Celda con insignia `<span class='inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100'>Sí cubierto</span>`
    *   **Cobertura limitada (Ámbar/Amarillo):** Celda con insignia `<span class='inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-100'>Con límites / Opcional</span>`
    *   **Excluido por completo (Rojo/Rosa):** Celda con insignia `<span class='inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700 border border-rose-100'>Excluido</span>`

#### G. Elementos Interactivos Nativos (Acordeones Desplegables / FAQs)
Utiliza el elemento nativo `<details>` estructurado con Tailwind CSS:
```html
<div class='space-y-4 my-6'>
  <details class='group border border-slate-200 rounded-2xl bg-white p-5 transition-all duration-300 open:shadow-sm'>
    <summary class='flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none select-none'>
      <span>¿Qué se considera un daño estético en el seguro?</span>
      <span class='transition duration-300 group-open:rotate-180 text-teal-600'>
        <svg class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' />
        </svg>
      </span>
    </summary>
    <div class='mt-3 text-slate-650 leading-relaxed font-sans text-sm border-t border-slate-100 pt-3'>
      [Explicación de la pregunta...]
    </div>
  </details>
</div>
```

---

### 6. Estructura Sugerida del Artículo (Para alcanzar las 2.000+ palabras)
1.  **Introducción Amplia (aprox. 250 palabras):** Planteamiento del problema, mención a la normativa en España.
2.  **Sección 1 (aprox. 400 palabras):** Definición profunda de los conceptos centrales con H2 y H3.
3.  **Sección 2 (aprox. 450 palabras):** Casos prácticos y ejemplos concretos. Uso de grillas de tarjetas.
4.  **Sección 3 (aprox. 400 palabras):** Exclusiones comunes (Caja de Alerta).
5.  **Sección 4 (aprox. 300 palabras):** Tabla comparativa detallada usando la estructura de colores semánticos (Sí cubierto, Límite, Excluido).
6.  **Sección 5 (aprox. 200 palabras):** Bloque interactivo de preguntas frecuentes utilizando el acordeón de `<details>`.
7.  **Sección 6 (aprox. 150 palabras):** Conclusión técnica con recomendaciones del sector (Caja de Recomendación).
