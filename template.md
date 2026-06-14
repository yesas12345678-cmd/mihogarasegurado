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

### 2. Reglas de Contenido y Extensión (Crítico)
*   **Extensión de Texto Real:** El artículo debe contener estrictamente entre **2.000 y 2.500 palabras de texto real** (sin contar las etiquetas HTML del código). Debe ser denso, exhaustivo, con explicaciones legales detalladas, casos prácticos, tablas coloridas y elementos interactivos nativos.
*   **Idioma:** Español de España (castellano neutro y formal).
*   **Cero Emojis:** Bajo ninguna circunstancia uses emojis en el artículo, títulos, metatítulos o metadescripciones. Afecta la seriedad corporativa y la aceptación de Google AdSense.
*   **Estructura SEO:** Introduce las palabras clave de forma natural en los primeros párrafos, en los encabezados H2 and H3, y a lo largo de las explicaciones.

---

### 3. Reglas de Formato y Código (Crítico - Evitar Errores de Renderizado)
*   **Formato de Salida:** Devuelve el contenido estructurado únicamente como un objeto **JSON** con los siguientes campos:
    *   `title`: El título optimizado para el lector.
    *   `meta_title`: El título de la etiqueta `<title>` (idealmente entre 50 y 60 caracteres, sin emojis).
    *   `meta_description`: La metadescripción para buscadores (entre 140 y 160 caracteres, sin emojis, atractiva para clic).
    *   `excerpt`: Resumen de 2-3 líneas para la tarjeta de previsualización.
    *   `content`: El cuerpo del artículo en formato **HTML plano**.
*   **Estructura del HTML (`content`):**
    *   **Prohibido:** No utilices etiquetas estructurales globales de documento como `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, `<body>`, `meta` o estilos CSS externos `<style>`.
    *   **Permitido:** Solo utiliza etiquetas de estructura interna (`<div>`, `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`, `table`, `details`, `summary`, `strong`, etc.).
    *   Todo el HTML debe comenzar con un contenedor `<div class="space-y-8">` y terminar con `</div>`.

*   **REGLAS CRÍTICAS DE ESCAPE Y ESTRUCTURA (EVITAR ERRORES DE TEXTO PLANO):**
    *   **Prohibido usar caracteres de escape literales de salto de línea (`\n`, `\\n`, `\r`):** No debes escribir ni incluir de forma literal los caracteres de texto `\n`, `\\n`, `\r` o similares dentro del código HTML ni en los párrafos de texto. En HTML, los espacios y saltos de línea se logran exclusivamente mediante etiquetas de bloque (`<p>`, `<div>`, `<br />`). La presencia de secuencias como `\n` visibles en el texto final es inaceptable y destruye el diseño de la página.
    *   **Prohibidas las tablas de texto plano:** Bajo ninguna circunstancia simules tablas, esquemas o cuadros alineando textos mediante espacios en blanco, guiones o tabulaciones. Cualquier dato estructurado, comparativa o desglose debe estar implementado estrictamente con etiquetas HTML reales (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`), aplicando los estilos y clases de Tailwind indicados en esta guía.

---

### 4. Guía de Estilos y Clases de Tailwind CSS
El HTML generado debe emplear exactamente las siguientes clases de Tailwind CSS para garantizar la armonía estética y dinamismo visual:

#### A. Contenedores y Estructura Principal
*   Contenedor principal: `<div class="space-y-8">`
*   Párrafos de texto común: `<p class="text-slate-700 leading-relaxed font-sans mb-4">`
*   Párrafo introductorio (destacado, primer párrafo): `<p class="text-lg text-slate-700 leading-relaxed font-sans font-medium">`

#### B. Encabezados (Jerarquía H2 y H3)
*   Secciones principales (H2):
    `<h2 class="font-display text-2xl font-extrabold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">`
*   Subsecciones (H3):
    `<h3 class="font-display text-xl font-bold text-slate-900 mt-8 mb-3">`

#### C. Bloques de Alerta y Recomendación (Llamadas de Atención)
*   **Caja de Advertencia / Alerta (Fondo ámbar):**
    ```html
    <div class="my-6 p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-amber-900 shadow-sm">
      <span class="font-bold uppercase tracking-wider block mb-1 text-[11px] text-amber-800">Alerta de Ley / Atención</span>
      [Texto detallado de advertencia o exclusión de seguro]
    </div>
    ```
*   **Caja de Consejo / Recomendación (Fondo verde azulado):**
    ```html
    <div class="my-6 p-5 rounded-2xl bg-teal-50/70 border-l-4 border-teal-500 text-teal-900 shadow-sm">
      <span class="font-bold uppercase tracking-wider block mb-1 text-[11px] text-teal-800">Consejo del Perito / Recomendación</span>
      [Texto detallado del consejo práctico]
    </div>
    ```

#### D. Grillas de Tarjetas (Comparativas o Tipologías)
Utiliza una estructura de grillas para desglosar elementos en 2 o 3 columnas:
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
    <h4 class="font-bold text-slate-950 text-base mb-2 flex items-center gap-2">
      <span class="h-6 w-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-xs font-bold">1</span>
      [Título de la Tarjeta]
    </h4>
    <p class="text-slate-655 text-sm font-sans leading-relaxed">[Descripción detallada]</p>
  </div>
  <!-- Repetir tarjeta para la columna 2 -->
</div>
```

#### E. Listados Elegantes con Icono SVG
En lugar de viñetas simples, usa listas estructuradas con SVG para dar un aspecto prémium:
```html
<ul class="space-y-4 my-6">
  <li class="flex gap-3 text-slate-700">
    <div class="flex-shrink-0 h-6 w-6 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
      </svg>
    </div>
    <div>
      <strong class="font-bold text-slate-900 block">[Concepto Destacado]:</strong>
      [Explicación de la viñeta].
    </div>
  </li>
</ul>
```

#### F. Tablas Comparativas con Colores Semánticos (Crítico)
Para mostrar de forma clara y vistosa las coberturas, límites e información detallada, debes usar tablas estructuradas con colores que resalten visualmente cada caso utilizando las siguientes pautas:
*   **Contenedor con scroll y bordes suaves:**
    `<div class="overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm">`
*   **Cabecera de Tabla:**
    Fondo gris muy claro (`bg-slate-50`) con textos en mayúscula, pequeños y audaces.
*   **Filas y Celdas con insignias (Badges) de colores:**
    *   **Totalmente cubierto (Verde):** Celda con insignia `<span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100">Sí cubierto</span>`
    *   **Cobertura limitada o con franquicia (Ámbar/Amarillo):** Celda con insignia `<span class="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-100">Con límites / Opcional</span>`
    *   **Excluido por completo (Rojo/Rosa):** Celda con insignia `<span class="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700 border border-rose-100">Excluido</span>`

**Ejemplo de código para una tabla colorida:**
```html
<div class="overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm">
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-slate-50 border-b border-slate-200">
        <th class="py-3 px-4 text-xs font-bold text-slate-700 uppercase">Garantía / Siniestro</th>
        <th class="py-3 px-4 text-xs font-bold text-slate-700 uppercase">Nivel de Cobertura</th>
        <th class="py-3 px-4 text-xs font-bold text-slate-700 uppercase">Límite Aplicable</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100 text-sm text-slate-650 font-sans">
      <tr class="hover:bg-slate-50/30 transition-colors">
        <td class="py-3 px-4 font-bold text-slate-900">Rotura accidental de tuberías</td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100">
            Sí cubierto
          </span>
        </td>
        <td class="py-3 px-4 font-semibold text-slate-800">100% del coste de reparación</td>
      </tr>
      <tr class="hover:bg-slate-50/30 transition-colors">
        <td class="py-3 px-4 font-bold text-slate-900">Daños estéticos asociados</td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-100">
            Con límites / Opcional
          </span>
        </td>
        <td class="py-3 px-4 font-semibold text-teal-600">Hasta 1.500€ o 3.000€ según póliza</td>
      </tr>
      <tr class="hover:bg-slate-50/30 transition-colors">
        <td class="py-3 px-4 font-bold text-slate-900">Filtraciones por falta de mantenimiento</td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700 border border-rose-100">
            Excluido
          </span>
        </td>
        <td class="py-3 px-4 font-semibold text-slate-400 font-mono">- No aplica -</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### G. Elementos Interactivos Nativos (Acordeones Desplegables / FAQs)
Para añadir dinamismo interactivo al artículo sin requerir Javascript externo, utiliza el elemento nativo `<details>` estructurado con Tailwind CSS. Esto permite al usuario desplegar y replegar información (como preguntas frecuentes) de manera interactiva:
```html
<div class="space-y-4 my-6">
  <details class="group border border-slate-200 rounded-2xl bg-white p-5 transition-all duration-300 open:shadow-sm">
    <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none select-none">
      <span>¿Qué se considera un daño estético en el seguro?</span>
      <span class="transition duration-300 group-open:rotate-180 text-teal-600">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </summary>
    <div class="mt-3 text-slate-650 leading-relaxed font-sans text-sm border-t border-slate-100 pt-3">
      Un daño estético es la alteración visual que sufre una estancia tras la reparación de un siniestro cubierto (por ejemplo, si se rompe una tubería y al cambiar los azulejos rotos, los nuevos no coinciden con el resto). La cobertura cubre el coste de cambiar todos los azulejos de esa estancia para restablecer la coherencia estética.
    </div>
  </details>

  <details class="group border border-slate-200 rounded-2xl bg-white p-5 transition-all duration-300 open:shadow-sm">
    <summary class="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none select-none">
      <span>¿Tienen franquicia este tipo de reparaciones?</span>
      <span class="transition duration-300 group-open:rotate-180 text-teal-600">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </summary>
    <div class="mt-3 text-slate-650 leading-relaxed font-sans text-sm border-t border-slate-100 pt-3">
      Dependerá enteramente de las condiciones particulares pactadas. En pólizas de cobertura básica de daños por agua, es habitual encontrar una franquicia fija de entre 100€ y 150€ aplicable al total de la indemnización por siniestro.
    </div>
  </details>
</div>
```

---

### 5. Estructura Sugerida del Artículo (Para alcanzar las 2.000+ palabras)
Para asegurar la densidad de información y el cumplimiento del límite de palabras, el artículo debe dividirse de la siguiente forma:
1.  **Introducción Amplia (aprox. 250 palabras):** Planteamiento del problema o dilema, mención a la normativa en España.
2.  **Sección 1 (aprox. 400 palabras):** Definición profunda de los conceptos centrales del título con H2 y H3.
3.  **Sección 2 (aprox. 450 palabras):** Casos prácticos y ejemplos concretos. Uso de grillas de tarjetas.
4.  **Sección 3 (aprox. 400 palabras):** Exclusiones comunes y precauciones (Caja de Alerta).
5.  **Sección 4 (aprox. 300 palabras):** Tabla comparativa detallada usando la estructura de colores semánticos (Sí cubierto, Límite, Excluido).
6.  **Sección 5 (aprox. 200 palabras):** Bloque interactivo de preguntas frecuentes utilizando el acordeón de `<details>`.
7.  **Sección 6 (aprox. 150 palabras):** Conclusión técnica con recomendaciones del sector (Caja de Recomendación).
