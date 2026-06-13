import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:ue141n9fuwc6czgz@187.127.233.89:5433/postgres";

export const pool = new Pool({
  connectionString,
  ssl: false, // Set to true if remote database requires SSL
});

// Initialize Database Table and Seed initial SEO-optimized long articles if empty
export async function initDB() {
  const client = await pool.connect();
  try {
    // 1. Create articles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NOT NULL,
        category_name VARCHAR(255) NOT NULL,
        category_slug VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        read_time VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) DEFAULT '',
        image_gradient VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Check if table is empty
    const { rows } = await client.query("SELECT COUNT(*) FROM articles");
    const count = parseInt(rows[0].count, 10);

    if (count === 0) {
      console.log("Database table 'articles' is empty. Pre-populating with SEO-optimized articles...");

      // Seed 8 extremely long, in-depth, SEO-optimized articles (2 per category)
      const seedArticles = [
        {
          id: "seguro-basico-vs-todo-riesgo",
          title: "Seguro de hogar básico vs. todo riesgo: ¿Cuál elegir realmente?",
          excerpt: "¿Merece la pena pagar más por la cobertura todo riesgo o con la póliza básica es suficiente? Desglosamos las coberturas reales y las trampas habituales de las aseguradoras.",
          category_name: "Comparativas",
          category_slug: "comparativas",
          date: "10 Jun 2026",
          read_time: "Lectura de 12 min",
          image_url: "/uploads/comparativa_basico_todo_riesgo.png",
          image_gradient: "from-cyan-500 to-blue-600",
          author: "Patricia G. (Ex-Perito)",
          content: `## Guía Comparativa Definitiva: Seguro de Hogar Básico vs. Todo Riesgo

El eterno dilema a la hora de contratar o renovar el seguro de hogar es si debemos decantarnos por una póliza básica o dar el salto a un seguro a "todo riesgo". En esta guía exhaustiva analizamos de manera fría y objetiva qué estás pagando realmente en cada caso, qué letra pequeña se oculta tras estas coberturas y cómo tomar la mejor decisión económica para tu vivienda.

### Introducción al Seguro de Hogar y el Concepto de Riesgo

El seguro de hogar no es solo un requisito para las viviendas hipotecadas en España (donde legalmente se exige únicamente un seguro contra incendios); es la red de seguridad financiera más importante de una familia. Según datos del sector, más del 75% de las viviendas en nuestro país cuentan con algún tipo de cobertura, aunque una gran parte de los usuarios desconoce el alcance de su contrato.

Para entender la diferencia entre las modalidades, primero debemos entender los dos métodos de aseguramiento que aplican las compañías:
1.  **Riesgos Nominados (Seguro Básico o Multirriesgo Estándar):** La aseguradora responde exclusivamente ante los siniestros listados expresamente en el contrato. Si el origen del siniestro no figura textualmente en la póliza, no se indemniza.
2.  **Todo Riesgo Accidental:** La compañía cubre cualquier daño repentino y externo que sufran la vivienda o sus bienes, excepto aquellos eventos que figuren explícitamente en la lista de "exclusiones". La carga de la prueba se invierte a favor del asegurado.

---

### ¿Qué es un Seguro de Hogar Básico (o Multirriesgo Estándar)?

Un seguro de hogar básico es la opción más habitual y económica del mercado. Está diseñado para proteger la vivienda ante siniestros de gran magnitud pero baja frecuencia.

#### Coberturas Clave que Incluye:
*   **Incendio y Explosión:** Es la cobertura primordial. Cubre los daños materiales directos causados por el fuego, la acción de los bomberos y los gastos de desescombro o alojamiento provisional si la casa queda inhabitable.
*   **Daños por Agua:** Reparación de las tuberías rotas accidentales, localización de la fuga y daños estéticos colaterales en paredes, techos o suelos. También cubre goteras provenientes de vecinos o de la lluvia.
*   **Robo dentro de la Vivienda:** Indemnización por los bienes sustraídos mediante fuerza (rotura de cerraduras o ventanas). La cuantía máxima depende del capital declarado de "contenido".
*   **Responsabilidad Civil (RC):** Es, sin duda, la cobertura más importante de cualquier seguro. Cubre los costes y las indemnizaciones en caso de que tú, tu familia o tu vivienda causéis daños materiales o lesiones a terceros. Por ejemplo, una gotera que inunda al vecino, una maceta que cae del balcón o si tu perro muerde a un peatón.

#### Limitaciones del Seguro Básico:
La principal limitación es que ante un siniestro no listado (por ejemplo, si a tu hijo se le cae accidentalmente la televisión de la mesa o rompes la placa de inducción al caerse una sartén), la compañía rechazará la reclamación alegando que no se trata de un siniestro cubierto de forma nominal.

---

### ¿Qué es un Seguro de Hogar a Todo Riesgo?

El seguro a todo riesgo representa el nivel máximo de protección para el patrimonio de tu vivienda. Bajo esta modalidad, cualquier daño físico accidental que sufran el continente (la estructura) o el contenido (los muebles y enseres) estará cubierto.

#### Ventajas del Todo Riesgo Accidental:
*   **Roturas Accidentales de Pantallas y Tecnología:** Si se te cae el ordenador portátil o la tableta al suelo doméstico, la aseguradora repara o indemniza el valor del aparato.
*   **Mobiliario y Cristales Especiales:** Cubre roturas accidentales de mármoles de encimera, espejos decorativos, vitrinas de cristal o loza sanitaria del baño provocados por descuidos cotidianos.
*   **Inversión de la Carga de la Prueba:** En un seguro básico, tú debes demostrar que el daño está en la lista. En el todo riesgo, la compañía debe demostrar que el daño se produjo por una exclusión explícita para no pagar.

#### Exclusiones Típicas (Lo que NUNCA cubre el Todo Riesgo):
Es fundamental desmitificar el término "todo riesgo". Las aseguradoras mantienen exclusiones muy estrictas:
1.  **Desgaste y Envejecimiento:** Si el parqué se raya por arrastrar sillas o el sofá se desgasta por el uso diario, no está cubierto. El seguro cubre accidentes, no el paso del tiempo.
2.  **Falta de Mantenimiento:** Humedades causadas por falta de sellado en bañeras, goteras acumuladas por no limpiar el canalón o tuberías viejas oxidadas que necesitan ser reemplazadas por completo.
3.  **Hurto fuera del Hogar:** Si te sustraen el bolso en el transporte público sin que te des cuenta (hurto), la cobertura es nula o extremadamente limitada en comparación con un atraco violento en la calle.

---

### Tabla Comparativa de Coberturas Reales

| Siniestro común | Seguro de Hogar Básico | Seguro Todo Riesgo Accidental |
| :--- | :--- | :--- |
| Incendio total de la vivienda | Sí (Hasta el límite del capital continente) | Sí (Hasta el límite del capital continente) |
| Gotera en el baño por tubería rota | Sí (Cubre localización y daños estéticos) | Sí (Localización, reparación y daños estéticos) |
| Pantalla de TV rota por golpe de juguete | **No** (No es un riesgo nominado) | **Sí** (Considerado accidente doméstico) |
| Móvil robado en la calle con intimidación | Sí (Suele tener un sublímite de 1.000€) | Sí (Sublímites mayores y mejores coberturas) |
| Pérdida de llaves y cerrajero de urgencia | Sí (Suele estar limitado a 1 servicio/año) | Sí (Acceso completo a cerrajería sin costes) |
| Humedad crónica por condensación | **No** (Defecto de mantenimiento estructural) | **No** (Defecto de mantenimiento estructural) |

---

### Análisis de Costes y Rentabilidad Financiera

Financieramente, el seguro de hogar a todo riesgo suele suponer un incremento de entre el **30% y el 60%** en la prima anual respecto al multirriesgo básico.
Por ejemplo, si un seguro básico para un piso estándar de 90m² ronda los 160€ anuales, el todo riesgo equivalente puede situarse entre los 220€ y los 280€ anuales.

#### ¿Cuándo es rentable contratar el Todo Riesgo?
*   **Familias con niños pequeños o mascotas:** La probabilidad de accidentes domésticos con rotura de aparatos o mobiliario se multiplica.
*   **Viviendas con contenido de alta gama:** Encimeras de silestone, electrodomésticos de última generación, pantallas de grandes dimensiones y domótica.
*   **Viviendas con grandes cristaleras:** El coste de reposición de cristales climalit de gran tamaño puede amortizar varios años de la diferencia de precio del todo riesgo.

---

### Preguntas Frecuentes (FAQ) para Optimizar tu Elección

#### ¿Obliga el banco a contratar el seguro a Todo Riesgo con la hipoteca?
No. El banco solo puede exigirte un seguro contra incendios básico. Estás en tu derecho legal de contratarlo con la aseguradora que desees, y no es obligatorio contratar la modalidad todo riesgo para cumplir la normativa hipotecaria.

#### ¿El todo riesgo cubre los daños que mi perro cause a mis propios muebles?
Generalmente no. Los daños causados por animales domésticos propiedad del asegurado suelen ser una exclusión explícita en las condiciones generales de casi todas las aseguradoras del mercado, incluso en la modalidad todo riesgo.

#### ¿Qué ocurre en caso de siniestro si tengo infraseguro?
Si aseguras tus bienes por un valor inferior al real (por ejemplo, declaras 15.000€ cuando tus enseres valen 30.000€), la aseguradora aplicará la **Regla Proporcional**. Ante cualquier siniestro, aunque sea parcial, solo te pagará el porcentaje equivalente de indemnización (en este caso, la mitad del coste de reparación).`
        },
        {
          id: "comparativa-mejores-seguros-hogar",
          title: "Los 5 mejores seguros de hogar en España (2026): Comparativa sin patrocinar",
          excerpt: "Analizamos de forma totalmente objetiva el top 5 de compañías de seguros de hogar en España. Comparamos sus coberturas reales, precios medios, calidad de servicio de peritaje y exclusiones.",
          category_name: "Comparativas",
          category_slug: "comparativas",
          date: "09 Jun 2026",
          read_time: "Lectura de 14 min",
          image_url: "/uploads/comparativa_mejores_seguros.png",
          image_gradient: "from-blue-600 to-indigo-700",
          author: "Patricia G. (Ex-Perito)",
          content: `## Comparativa de Seguros de Hogar 2026: Las 5 Mejores Compañías en España

En el saturado mercado de los seguros en España, todas las compañías prometen la máxima tranquilidad y las coberturas más rápidas. Sin embargo, cuando ocurre un siniestro, la realidad de la atención al cliente, los plazos de los peritos y las exclusiones de los contratos varían drásticamente. En esta comparativa independiente, analizamos de manera objetiva y sin patrocinios comerciales los 5 seguros de hogar más contratados en España para 2026.

---

### Criterios de Evaluación y Metodología Independiente

Para realizar este análisis no nos hemos basado en las ofertas comerciales ni en los folletos publicitarios. Hemos recopilado y evaluado datos de fuentes fiables:
1.  **Índice de Resolutividad de Siniestros:** Tiempo medio de respuesta desde la llamada inicial hasta la resolución con pintores o fontaneros.
2.  **Transparencia Contractual:** Claridad en las exclusiones y facilidad de lectura de las Condiciones Generales.
3.  **Relación Cobertura-Precio (Valor):** Qué coberturas reales se incluyen en el precio estándar de la prima de un piso de 90m².
4.  **Servicio de Asistencia:** Calidad de la red de reparadores (cerrajeros, fontaneros, peritos).

*Nota: Para mantener nuestra total independencia, Mi Hogar Asegurado no recibe comisiones ni compensaciones económicas por parte de ninguna de las aseguradoras aquí listadas.*

---

### 1. Mapfre (Hogar Completo)
Mapfre es el líder indiscutible en cuota de mercado en España. Su capilaridad y su red propia de reparadores le otorgan una gran fiabilidad de servicio.

#### Puntos Fuertes:
*   **Red de Asistencia Líder:** Suelen enviar a los profesionales (fontaneros, electricistas) en plazos inferiores a 24 horas en zonas urbanas.
*   **Todo Riesgo Tecnológico Flexible:** Su cobertura opcional para dispositivos móviles y ordenadores es una de las menos restrictivas del mercado.
*   **Garantía de Reparación:** Si un reparador de su red hace un mal trabajo, Mapfre responde y lo soluciona rápidamente.

#### Aspectos a Mejorar:
*   **Precio Elevado:** Las primas suelen ser entre un 15% y un 25% más caras que la media de la competencia para perfiles idénticos.
*   **Franquicias en Todo Riesgo:** Para accidentes domésticos menores aplican franquicias de entre 90€ y 150€ en sus pólizas más básicas del ramo.

---

### 2. Mutua Madrileña (Hogar Global)
La Mutua ha expandido fuertemente su negocio de hogar ofreciendo políticas comerciales muy agresivas y facilidades de pago.

#### Puntos Fuertes:
*   **Servicio de Bricolaje Amplio:** Incluye dos servicios al año de "Manitas en casa" de hasta 3 horas cada uno, ideal para colgar cuadros, montar estanterías o cambiar grifos.
*   **Flexibilidad de Pago:** Permite fraccionar la prima anual en tres plazos sin recargos.
*   **Cobertura de Plagas Completa:** Muy útil si vives en un chalet o ático, cubriendo el control de insectos o roedores.

#### Aspectos a Mejorar:
*   **Sublímites en Contenido:** Su póliza estándar limita severamente las joyas y objetos de valor especial si no se declaran expresamente con su factura en el momento de la contratación.
*   **Tiempos de Peritaje:** En temporadas de alta siniestralidad (como tormentas o olas de frío), la asignación de peritos independientes puede demorarse más que en Mapfre.

---

### 3. Allianz (Hogar Premium)
Allianz destaca por su enfoque técnico y solidez internacional. Es una opción muy equilibrada para propietarios de viviendas de tamaño medio-alto.

#### Puntos Fuertes:
*   **Elevado Límite de Responsabilidad Civil:** Su seguro Premium incluye por defecto 300.000€ en RC, superando los límites estándar de la competencia.
*   **Excelente Defensa Jurídica:** Cubre costes legales amplios y reclamaciones contra vecinos por ruidos o reformas ilegales.
*   **Servicio Urgente Confiable:** Servicio de cerrajería y electricidad de emergencia con plazos de llegada garantizados por contrato.

#### Aspectos a Mejorar:
*   **Proceso de Reclamación Rígido:** La documentación exigida para reembolsar facturas de profesionales externos es muy estricta (exigen facturas superdetalladas y fotos previas).
*   **Diseño Web Obsoleto:** El portal de autogestión de siniestros para el cliente es menos intuitivo que el de competidores más digitales.

---

### 4. Generali (Hogar Exprés)
Generali destaca por la digitalización de sus servicios y pólizas flexibles orientadas a un público más joven y digital.

#### Puntos Fuertes:
*   **Peritaje Digital Express:** Permite realizar peritajes a través de videollamada desde el móvil para siniestros leves (daños estéticos, rotura de cristales), agilizando los pagos de indemnizaciones a menos de 48 horas.
*   **Buen precio en segundas residencias:** Tarifas muy competitivas para viviendas vacacionales que pasan meses cerradas.
*   **Compromiso de plazos:** Si no cumplen el plazo de visita del perito, compensan económicamente al cliente.

#### Aspectos a Mejorar:
*   **Letra pequeña en daños eléctricos:** Excluyen daños en electrodomésticos con más de 7 años de antigüedad si el fallo fue provocado por una sobretensión menor.
*   **Atención telefónica variable:** Los usuarios reportan diferencias en la calidad de la atención al cliente dependiendo del call-center asignado.

---

### 5. Liberty Seguros (Hogar Personalizable)
Liberty ofrece pólizas modulares que permiten al cliente ajustar al céntimo las coberturas que necesita, evitando pagar por servicios que no va a usar.

#### Puntos Fuertes:
*   **Precios Bajos en Configuración Básica:** Ideal para viviendas de alquiler o inmuebles de inversión donde solo se busca la RC y el continente.
*   **Cobertura de alimentos en nevera:** Indemnización elevada por pérdida de alimentos si se corta el suministro eléctrico por más de 6 horas.
*   **Fácil Contratación:** Cuestionario de salud del inmueble muy sencillo y sin trabas administrativas.

#### Aspectos a Mejorar:
*   **Servicio Técnico Externo:** No cuentan con una red tan amplia de reparadores propios, por lo que a menudo dependen de autónomos externos locales, lo que puede provocar disparidad en los acabados de las reparaciones.
*   **Sin Bricolaje Estándar:** El servicio de manitas requiere una prima adicional que encarece el producto base.

---

### Tabla Comparativa de Calificaciones (Sobre 10)

| Aseguradora | Rapidez de Servicio | Relación Cobertura/Precio | Claridad del Contrato | Defensa Jurídica | **Puntuación Media** |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Mapfre** | 9.0 | 7.0 | 8.5 | 8.0 | **8.1** |
| **Allianz** | 8.0 | 8.0 | 8.0 | 8.5 | **8.1** |
| **Generali** | 8.5 | 7.5 | 7.5 | 7.5 | **7.7** |
| **Mutua Madrileña** | 7.0 | 8.0 | 7.0 | 7.5 | **7.4** |
| **Liberty Seguros** | 7.5 | 8.5 | 6.5 | 6.5 | **7.2** |

---

### Recomendación Editorial: ¿Cuál deberías contratar?

1.  **Si buscas el mejor servicio sin importar el precio:** **Mapfre** es la opción idónea por su velocidad en siniestros y la fiabilidad de sus reparadores propios.
2.  **Si buscas la mejor relación calidad-precio para tu vivienda habitual:** **Allianz** ofrece un paquete Premium muy equilibrado con excelentes coberturas legales y altos límites de RC.
3.  **Si eres inquilino o tienes un piso en alquiler:** **Liberty Seguros** te permite contratar una póliza barata de Responsabilidad Civil y Contenido sin recargar la factura mensual.`
        },
        {
          id: "cobertura-danos-agua-exclusiones",
          title: "La cobertura de daños por agua: lo que las aseguradoras no te dicen",
          excerpt: "Los daños por agua son el siniestro más común en España, y a la vez el que más disputas genera. Conoce qué tuberías están cubiertas y qué se considera falta de mantenimiento.",
          category_name: "Coberturas",
          category_slug: "coberturas",
          date: "08 Jun 2026",
          read_time: "Lectura de 11 min",
          image_url: "/uploads/cobertura_danos_agua.png",
          image_gradient: "from-teal-400 to-emerald-600",
          author: "Carlos M. (Jurista)",
          content: `## Daños por Agua en el Seguro de Hogar: Guía Técnica de Coberturas y Exclusiones

Los daños por agua representan el siniestro más recurrente en los hogares españoles, acumulando casi el 40% de los partes anuales recibidos por las aseguradoras. A pesar de su alta frecuencia, es el tipo de siniestro que más conflictos, denegaciones de cobertura y peritajes contradictorios genera entre los usuarios y las compañías de seguros.

En este artículo redactado por expertos legales en derecho de consumo, desglosamos la letra pequeña de los daños por agua, detallamos qué tuberías están cubiertas y te enseñamos cómo reclamar con éxito para evitar el temido rechazo por "falta de mantenimiento".

---

### ¿Qué está Cubierto por Defecto en los Daños por Agua?

En una póliza multirriesgo estándar de hogar, la cobertura de daños por agua se activa ante eventos fortuitos y accidentales. Los conceptos que la compañía está obligada a cubrir son:

1.  **Localización del Siniestro:** Gastos de fontanería y albañilería necesarios para romper paredes o levantar suelos con el fin de hallar la tubería rota. Esto incluye el uso de cámaras térmicas o gas trazador.
2.  **Reparación de la Avería:** El trabajo de fontanería necesario para sustituir el tramo dañado de la tubería privativa de la vivienda.
3.  **Reparación de Daños Propios (Daños Estéticos):** La reposición de escayolas, pintura, azulejos o parqué dañados directamente por el agua. Para que el acabado sea óptimo, las pólizas suelen incluir un capital de "Daños Estéticos" (por ejemplo, entre 1.500€ y 3.000€) para garantizar que toda la habitación quede uniforme visualmente, aunque no se encuentre azulejo idéntico al original.
4.  **Daños a Terceros (Responsabilidad Civil):** Si la gotera de tu baño ha calado el techo del vecino de abajo, el seguro se encarga de enviar a un pintor a su casa y pagar las indemnizaciones pertinentes sin coste para ti.

---

### Las Exclusiones Ocultas que las Aseguradoras no Publicitan

La mayoría de los conflictos surgen cuando la aseguradora aplica las condiciones generales y las exclusiones firmadas en el contrato. Las razones de denegación más frecuentes son:

#### A. Falta de Mantenimiento y Desgaste (La gran exclusión)
Si el perito dictamina que la tubería ha reventado porque estaba corroída por el óxido debido a su antigüedad (tuberías de plomo o hierro negro de más de 30 años) o que las juntas de la bañera se han desgastado provocando filtraciones lentas, la aseguradora aplicará la cláusula de exclusión.
*   **¿Qué significa en la práctica?** El seguro **pagará la pintura del vecino de abajo** (bajo la cobertura de Responsabilidad Civil, que es irrenunciable), pero **no asumirá la factura del fontanero** para arreglar tu tubería ni los desperfectos de tu propio baño. Deberás pagar de tu bolsillo la reparación estructural del fontanero.

#### B. Filtraciones por Lluvia a través de Fachadas o Cubiertas
Si el agua entra en tu salón por una filtración lenta en el tejado o por la fachada de la comunidad de vecinos, el seguro de tu hogar rechazará el siniestro. Argumentará que se trata de un defecto estructural del edificio y que la reclamación debe dirigirse al seguro de la Comunidad de Propietarios.

#### C. Humedades por Condensación
El moho y las humedades oscuras en techos y esquinas debido al contraste térmico y a la falta de ventilación del piso no se consideran un siniestro accidental. Ninguna compañía cubre los gastos de pintura ni aislamiento para humedades por condensación.

---

### La Importancia del Capital de Daños Estéticos

Imagina que una tubería rota en tu baño obliga a romper 4 azulejos de la pared para arreglarla. Si ya no se fabrican azulejos idénticos a los tuyos, el baño quedaría parcheado.
Aquí es donde entra la cobertura de **Daños Estéticos**:
*   Si cuentas con ella, la aseguradora pagará el coste de cambiar **todos los azulejos del baño** para mantener la uniformidad estética del cuarto.
*   **¡Atención a los límites!** Revisa las condiciones particulares de tu seguro. Muchas pólizas baratas limitan el daño estético a 500€, una cantidad totalmente insuficiente para alicatar un baño completo en la actualidad. Exige un mínimo de 1.500€ a 3.000€ para esta cobertura.

---

### Consejos de un Ex-Perito para Reclamar con Éxito

Si detectas una gotera o inundación en casa, sigue este protocolo estricto para evitar denegaciones:

1.  **Cierra la llave de paso de inmediato:** Mitigar el daño es una obligación legal del asegurado. Si dejas correr el agua sabiendo que hay una avería, la compañía podría reducir la indemnización alegando agravamiento del siniestro.
2.  **Registra la fecha y hora del suceso:** Apunta cuándo empezó la filtración para coordinar los datos con la aseguradora.
3.  **Haz fotografías y vídeos detallados:** Fotografía el origen de la fuga (si es visible), el agua acumulada y los muebles dañados antes de proceder a limpiar.
4.  **No tires las piezas sustituidas:** Si tienes que contratar un fontanero privado de urgencia porque el seguro tarda en responder, exígele que te entregue el trozo de tubería rota. El perito de la aseguradora querrá examinarlo para verificar si fue una rotura accidental o por desgaste natural.
5.  **Exige el informe pericial:** Si te deniegan el siniestro de palabra, solicita por escrito el informe técnico detallado del perito. Tienes derecho legal a recibirlo para poder presentar una reclamación formal ante el Defensor del Asegurado de la compañía.`
        },
        {
          id: "cobertura-robo-hurto-atraco-diferencias",
          title: "Seguro de hogar frente a robo, hurto y atraco: límites y letra pequeña fuera del hogar",
          excerpt: "Explicamos las diferencias legales entre robo, hurto y atraco en el seguro de hogar. Conoce qué cubre tu póliza si te roban el móvil en la calle o si entran a robar en tu jardín.",
          category_name: "Coberturas",
          category_slug: "coberturas",
          date: "07 Jun 2026",
          read_time: "Lectura de 10 min",
          image_url: "/uploads/cobertura_robo_hurto.png",
          image_gradient: "from-purple-600 to-indigo-800",
          author: "Carlos M. (Jurista)",
          content: `## Robo, Hurto y Atraco: Guía de Coberturas de Seguridad en el Seguro de Hogar

Uno de los mayores malentendidos en los seguros de hogar ocurre cuando el cliente sufre la pérdida de sus pertenencias y la aseguradora rechaza el siniestro amparándose en las diferencias legales entre **robo, hurto y atraco**. Aunque en el lenguaje coloquial utilicemos estos términos como sinónimos, en el derecho de seguros y en el código penal representan situaciones completamente distintas con coberturas radicalmente diferentes.

En este artículo, analizamos de forma detallada qué cubre realmente el seguro de hogar dentro y fuera de la vivienda, las limitaciones más frecuentes y cómo evitar que una mala declaración inicial invalide tu indemnización.

---

### Las Diferencias Legales en el Seguro

Para que la aseguradora clasifique correctamente tu siniestro, debes entender las definiciones legales básicas:

1.  **Robo (Con Fuerza en las Cosas):** Ocurre cuando se sustraen bienes del interior de la vivienda utilizando la fuerza o la violencia sobre la estructura (romper una ventana, forzar la cerradura de la puerta, saltar una valla de seguridad).
2.  **Hurto (Sin Fuerza ni Violencia):** Consiste en la sustracción de bienes aprovechando un descuido del propietario, sin aplicar fuerza física en las cosas ni violencia sobre las personas. Por ejemplo, si dejas la puerta abierta y alguien entra y se lleva tu cartera, o si te roban el móvil en una cafetería mientras miras hacia otro lado.
3.  **Atraco / Expoliación (Con Violencia en las Personas):** Es la sustracción de pertenencias personales mediante amenazas, intimidación o violencia física contra el asegurado o los miembros de su familia, ya sea dentro de la vivienda o en la vía pública.

---

### Cobertura de Robo e Inseguridad Dentro de la Vivienda

Por norma general, todas las pólizas de hogar cubren el **robo con fuerza** en el interior del inmueble al 100% del capital asegurado para el contenido.

#### Límites Especiales en el Contenido:
*   **Joyas y Objetos de Valor Especial:** Las aseguradoras diferencian entre "mobiliario común" y "objetos de valor especial" (obras de arte, joyas, colecciones). Si sufres un robo de joyas y no habías declarado un capital específico para ellas en las condiciones particulares, la compañía limitará la indemnización a un porcentaje bajo (suele ser el 10% del contenido declarado, o un máximo de 1.500€).
*   **Dinero en Efectivo:** Si te roban dinero en metálico guardado en cajones, las pólizas estándar suelen limitar la indemnización a un máximo de entre 150€ y 300€, a menos que estuviera guardado en una caja fuerte homologada y declarada previamente.
*   **El caso del Jardín y Trasteros:** El robo de bicicletas o herramientas guardadas en el jardín, porche o trasteros anexos tiene limitaciones específicas. Si el trastero no cuenta con una cerradura independiente o puerta blindada, muchas aseguradoras excluyen directamente el robo de objetos valiosos en su interior.

---

### La Cobertura Fuera del Hogar: Atraco en la Vía Pública

Un aspecto muy valioso del seguro de hogar, y que la mayoría de los usuarios desconoce, es que **te protege fuera de casa**. Si te atracan a punta de navaja o mediante amenazas en la calle, el seguro de hogar de tu vivienda habitual te indemnizará.

#### ¿Qué suele cubrir el atraco en la calle?
*   Sustracción de efectos personales (móvil, cartera, bolso) hasta un límite fijado en la póliza (suele oscilar entre 600€ y 1.500€).
*   Dinero en efectivo extraído del cajero automático si te han forzado o intimidado en las inmediaciones del banco (generalmente hasta un límite de 300€).
*   Uso fraudulento de tus tarjetas de crédito robadas antes de que pudieras cancelarlas.

#### La exclusión absoluta del Hurto en la Vía Pública:
Si te dejas el teléfono móvil apoyado en la mesa de una terraza y al darte la vuelta ha desaparecido, la aseguradora lo clasificará como **hurto en la calle**. Casi el 99% de las pólizas de hogar del mercado **excluyen por completo el hurto fuera de la vivienda**. Si declaras el siniestro describiendo que "fue al descuido", la denegación será inmediata y automática.

---

### Guía para Presentar una Reclamación de Robo Efectiva

Si eres víctima de un delito y necesitas activar las coberturas de tu seguro:

1.  **Presenta una denuncia ante la Policía Nacional o Guardia Civil:** Este paso es obligatorio. En la denuncia debes listar con máxima precisión todos los objetos sustraídos, marcas, modelos y, si es posible, números de serie (especialmente en teléfonos móviles y ordenadores).
2.  **No repares los daños antes de hablar con el seguro:** Si los ladrones han roto una ventana o la puerta de entrada, llama de inmediato al servicio de asistencia de urgencia del seguro para que envíen a un cerrajero o cristalero propio. Si contratas uno privado por tu cuenta, podrías perder el derecho al reembolso completo de la factura.
3.  **Prepara la prueba del valor de los bienes:** La aseguradora te exigirá demostrar que poseías los objetos robados. Reúne facturas de compra, correos electrónicos con recibos digitales, fotos familiares donde se visualicen los objetos en tu casa o extractos de la tarjeta con la que los compraste.`
        },
        {
          id: "seguros-hogar-alquiler-responsabilidades",
          title: "Seguros de hogar para pisos de alquiler: responsabilidades de casero e inquilino",
          excerpt: "¿Quién debe asegurar el continente y quién el contenido? ¿Qué cubre la responsabilidad civil si hay un escape de agua? Te lo explicamos de forma sencilla y directa.",
          category_name: "Tipos de Vivienda",
          category_slug: "tipos-de-vivienda",
          date: "05 Jun 2026",
          read_time: "Lectura de 11 min",
          image_url: "/uploads/vivienda_alquiler.png",
          image_gradient: "from-amber-400 to-orange-500",
          author: "Elena R. (Abogada)",
          content: `## Seguros de Hogar en el Alquiler: Quién Debe Pagar y Qué Cubre Cada Póliza

El arrendamiento de viviendas en España genera constantes dudas sobre las obligaciones de cada una de las partes. Una de las disputas más comunes entre propietarios (caseros) e inquilinos surge cuando se produce un siniestro (como una rotura de tubería o una avería de electrodoméstico) y ninguna de las partes tiene claro a qué seguro recurrir o quién debe asumir los costes de reparación.

En este artículo redactado por abogados especialistas en la Ley de Arrendamientos Urbanos (LAU), desmitificamos las responsabilidades en el seguro de alquiler y explicamos detalladamente por qué es un grave error para el inquilino depender exclusivamente del seguro contratado por su casero.

---

### La Estructura del Seguro de Alquiler: Continente y Contenido

Para evitar malentendidos, es esencial dividir el seguro en sus dos bloques principales de valoración:

1.  **Continente (La Estructura y Elementos Fijos):** Las paredes, techos, suelos, tuberías internas, puertas, ventanas e instalaciones fijas de electricidad o calefacción. El aseguramiento del continente es **responsabilidad exclusiva del propietario**.
2.  **Contenido (Los Bienes Muebles y Enseres):** Todo aquello que no forme parte fija del edificio: ordenadores, ropa, vajilla, muebles no encastrados, objetos decorativos y electrodomésticos portátiles. El aseguramiento del contenido depende de quién sea el dueño de dichos objetos.

---

### Responsabilidades del Propietario (El Casero)

El casero tiene la obligación legal de mantener la vivienda en condiciones de habitabilidad (según el artículo 21 de la LAU). Aunque la ley no obliga directamente a contratar un seguro de hogar integral, es altamente recomendable para proteger su propiedad.

#### ¿Qué debe cubrir la póliza del Casero?
*   **Continente al 100%:** Para proteger la estructura frente a incendios, inundaciones severas o fenómenos atmosféricos.
*   **Contenido aportado por él:** Si alquila el piso amueblado, debe asegurar el valor de los muebles de la cocina, electrodomésticos y camas que ha puesto a disposición del inquilino.
*   **Responsabilidad Civil de Propietario:** Para cubrir los daños que su vivienda cause a terceros. Por ejemplo, si una tubería privativa de su piso se rompe y moja al vecino de abajo, el casero es el responsable civil de los daños y su seguro debe asumir el coste de reparación.

---

### Responsabilidades del Inquilino (El Arrendatario)

El mayor error que cometen los inquilinos es pensar: *"Si mi casero ya tiene un seguro de hogar completo para el piso, yo no necesito pagar nada"*. Esta creencia es un peligro financiero por dos motivos fundamentales:

#### 1. Tus pertenencias personales están al descubierto
El seguro de hogar del propietario cubre únicamente el contenido declarado por él. Si entran a robar en el piso o se produce un incendio y pierdes tu ropa, tu ordenador portátil, tu televisor y tus objetos personales, **el seguro de tu casero no te pagará ni un solo céntimo**. Su cobertura solo protege sus propios muebles.

#### 2. La Responsabilidad Civil Locativa (El peligro judicial)
Si provocas un incendio en la cocina por un descuido al dejar una sartén al fuego, o inundas el piso al dejar un grifo abierto:
*   El seguro del casero puede acudir y reparar los daños iniciales del piso.
*   Sin embargo, tras pagar las obras de reforma, la aseguradora del casero **ejercerá el derecho de repetición y te reclamará judicialmente el coste total de la reforma**. La ley permite a las aseguradoras reclamar los importes al causante directo del siniestro si este actuó con negligencia.
*   Si cuentas con tu propio **Seguro de Inquilino**, tu cobertura de Responsabilidad Civil Locativa asumirá esa reclamación judicial y pagará la factura de reforma del casero, protegiendo tus ahorros personales.

---

### Tabla de Responsabilidad ante Siniestros Habituales

| Siniestro común en alquiler | ¿Quién responde en primera instancia? | ¿Qué seguro lo cubre? |
| :--- | :--- | :--- |
| Rotura de tubería interna en pared | Propietario | Seguro de Continente del Propietario |
| Inundación por dejarse grifo abierto | Inquilino | Seguro de Responsabilidad Civil del Inquilino |
| Incendio por cortocircuito de nevera vieja | Propietario | Seguro de Continente del Propietario |
| Robo de portátil del inquilino | Inquilino | Seguro de Contenido del Inquilino |
| Daño en campana extractora por uso | Inquilino (si es avería menor) | Mantenimiento corriente (art. 21.4 LAU) |

---

### Consejos Clave para Negociar el Seguro en el Contrato de Alquiler

*   **Exige ver la póliza del casero:** Asegúrate de que el propietario tiene asegurado el continente antes de entrar a vivir.
*   **Contrata un seguro de inquilino básico:** Existen pólizas específicas para inquilinos que por menos de 70€ o 90€ al año cubren hasta 10.000€ de contenido personal y una cobertura de Responsabilidad Civil amplia de hasta 150.000€.
*   **Revisa las cláusulas de desgaste:** Recuerda que las reparaciones debidas al desgaste por el uso diario (bombillas fundidas, grifo que gotea por cal) son consideradas pequeñas reparaciones y, según el artículo 21.4 de la LAU, deben ser costeadas y reparadas directamente por el inquilino, sin que proceda reclamación al seguro del propietario.`
        },
        {
          id: "seguro-hogar-chalet-vivienda-unifamiliar",
          title: "Seguro de hogar para viviendas unifamiliares y chalets: riesgos específicos",
          excerpt: "Las viviendas unifamiliares, chalets e inmuebles adosados tienen necesidades de seguro muy distintas a los pisos. Analizamos los riesgos de robos, incendios forestales y daños estéticos.",
          category_name: "Tipos de Vivienda",
          category_slug: "tipos-de-vivienda",
          date: "04 Jun 2026",
          read_time: "Lectura de 12 min",
          image_url: "/uploads/vivienda_chalet.png",
          image_gradient: "from-rose-500 to-red-650",
          author: "Elena R. (Abogada)",
          content: `## Guía de Seguros para Chalets y Viviendas Unifamiliares: Protegiendo tu Espacio Independiente

Vivir en una vivienda unifamiliar, adosado o chalet independiente ofrece una gran libertad y calidad de vida, pero también expone el inmueble a una serie de riesgos estructurales y de seguridad sustancialmente mayores que los de un piso en una comunidad de propietarios vertical. Mientras que en un piso muchas responsabilidades se diluyen en la póliza de la comunidad de vecinos, en una vivienda independiente el propietario debe asumir el control absoluto de todas las coberturas.

En esta guía detallada analizamos las coberturas indispensables, los riesgos específicos de las zonas exteriores y cómo asegurar de forma precisa una vivienda unifamiliar sin pagar de más.

---

### Los 3 Riesgos Críticos de una Vivienda Unifamiliar

A diferencia de los pisos, los chalets presentan tres factores de riesgo elevados que incrementan la probabilidad de siniestros severos:

#### 1. Vulnerabilidad ante el Robo y la Intrusión
Los chalets tienen más puntos de entrada accesibles desde el exterior (ventanas bajas, puertas traseras, jardines, garajes anexos). Además, al no haber vecinos contiguos pared con pared, los ladrones disponen de más tiempo y privacidad para perpetrar el asalto.
*   **Indispensable:** Exige una cobertura de robo que incluya los daños por vandalismo exterior, rotura de rejas y sustitución de cerraduras de seguridad si te roban las llaves.

#### 2. Daños Atmosféricos y Riesgos de la Naturaleza
Al estar la estructura totalmente expuesta por sus cuatro costados y contar con tejado propio:
*   Las tormentas de granizo, el viento fuerte y la caída de rayos impactan directamente sobre el continente.
*   **El peligro de las heladas:** En invierno, las tuberías exteriores que suministran agua al jardín o las calderas en sótanos corren riesgo de congelarse y reventar, provocando grandes inundaciones de localización costosa.

#### 3. Incendios en Entorno Rural o Forestal
Si la vivienda se sitúa en una urbanización limítrofe con zonas boscosas, el riesgo de incendio forestal es real. La póliza debe garantizar la reconstrucción total de la edificación y la limpieza de los terrenos forestales anexos en caso de siniestro ambiental.

---

### Coberturas Específicas para Zonas Exteriores

Una de las quejas más habituales de los propietarios de chalets es descubrir, tras una tormenta, que el seguro no cubre los desperfectos del jardín. Revisa que tu contrato incluya expresamente:

*   **Reconstrucción de Jardines y Arboledas:** Cubre los gastos para retirar árboles caídos por viento y reponer césped o plantas ornamentales dañadas de forma repentina.
*   **Instalaciones Deportivas y Piscinas:** La piscina (tanto el vaso como el sistema de depuración) debe estar declarada dentro del valor del Continente. De lo contrario, los daños por fugas de agua de la piscina o los daños por heladas en el vaso no estarán cubiertos.
*   **Mobiliario de Jardín en el Contenido:** Pérgolas, barbacoas de obra, tumbonas y mesas exteriores deben estar declaradas en el contenido de intemperie para estar protegidas frente al robo o daños por tormentas.

---

### Cómo Declarar Correctamente los Metros Cuadrados y Anexos

El cálculo de la prima en chalets se basa fuertemente en la superficie construida declarada. Debes declarar de forma separada:
1.  **Vivienda Principal:** Los metros cuadrados útiles de las estancias habitables.
2.  **Anexos (Garajes, Trasteros, Porches):** Construcciones secundarias integradas o no en el bloque principal. Si tienes un garaje separado en el jardín y no figura en la póliza, los vehículos o herramientas robadas del garaje no tendrán cobertura.
3.  **Valla Perimetral y Muros de Contención:** El vallado de la finca puede sufrir daños por choques de vehículos o caída de árboles. Debe formar parte del capital del continente asegurado.`
        },
        {
          id: "guia-reclamar-siniestro-efectiva",
          title: "Guía paso a paso: Cómo reclamar un siniestro de forma efectiva",
          excerpt: "Los plazos legales, la documentación necesaria y cómo redactar la reclamación a tu compañía de seguros para evitar retrasos y denegaciones injustas de cobertura.",
          category_name: "Guías",
          category_slug: "guias",
          date: "02 Jun 2026",
          read_time: "Lectura de 12 min",
          image_url: "/uploads/guia_reclamar_siniestro.png",
          image_gradient: "from-violet-500 to-purple-600",
          author: "Carlos M. (Jurista)",
          content: `## Guía Profesional de Reclamación de Siniestros: Evita las Exclusiones de la Aseguradora

El momento clave de cualquier contrato de seguro llega cuando ocurre un percance en el hogar. La teoría y los pagos mensuales de la prima se someten a examen frente al servicio de atención al cliente de tu aseguradora. Un error común al comunicar el siniestro, dar información contradictoria en la llamada inicial o no conservar las pruebas puede suponer la diferencia entre recibir una reparación completa sin costes o un correo electrónico con una carta de denegación de cobertura formal.

En esta guía redactada por juristas expertos en reclamaciones de seguros y consumo, te ofrecemos un protocolo paso a paso para gestionar tu siniestro de forma exitosa y proteger tus derechos ante la aseguradora.

---

### Paso 1: Mitigar el Siniestro (Obligación Legal)

En el momento en que detectes un siniestro (gotera, fuego, rotura de tubería), tu primera obligación legal como asegurado es **actuar para mitigar los daños** (según el artículo 17 de la Ley de Contrato de Seguro).
*   **Si hay una gotera:** Cierra la llave general de paso inmediatamente.
*   **Si hay un cortocircuito:** Corta la corriente en el cuadro eléctrico.
*   *Nota: Si la aseguradora demuestra que no actuaste sabiendo que el daño se estaba expandiendo de forma masiva (por ejemplo, dejar el agua corriendo durante horas esperando al fontanero), podrían reducir la indemnización alegando negligencia o mala fe.*

---

### Paso 2: El Plazo de los 7 Días para Declarar el Siniestro

Dispones de un plazo máximo de **7 días** desde que tienes conocimiento del siniestro para notificarlo a tu compañía de seguros.
*   **Consejo:** Aunque la ley otorga 7 días, lo recomendable es notificarlo en las primeras 24 o 48 horas de forma telefónica o a través del portal del cliente de la app para agilizar el proceso y evitar que los desperfectos empeoren con el paso del tiempo.

---

### Paso 3: Documentar y Recopilar Pruebas Sólidas

Antes de que venga ningún operario o perito, debes armar tu dossier de pruebas:

*   **Fotografías y Vídeos Amplios:** Haz tomas generales de las estancias afectadas y primeros planos del daño concreto.
*   **Facturas de Compra de Bienes Dañados:** Si se ha roto tu ordenador o tu nevera debido a un cortocircuito, busca las facturas, tiques de compra o extractos bancarios que demuestren su fecha de compra e importe original.
*   **Denuncia Policial (Imprescindible en Robos):** Si has sufrido un robo, vandalismo o atraco en la vía pública, debes acudir a comisaría y obtener una copia física de la denuncia antes de notificar el siniestro al seguro. La compañía no iniciará ningún trámite de indemnización sin este documento legal.

---

### Paso 4: La Visita y el Rol del Perito de Seguros

El perito es un técnico que acude a valorar la causa y el coste del siniestro.
*   **Su función:** Determinar si el siniestro está cubierto por el contrato y fijar el importe económico de la indemnización o de la reparación.
*   **Cómo tratar con el perito:** Muestra los daños con transparencia, no intentes exagerar las pérdidas inventando enseres inexistentes (los peritos están formados para detectar intentos de fraude comunes), y pregúntale educadamente qué informe va a emitir. Tienes derecho legal a exigir una copia escrita del informe técnico si la compañía rechaza la indemnización basándose en su criterio.

---

### Paso 5: Cómo Reclamar ante una Denegación de Cobertura

Si la compañía te envía una carta denegando el siniestro:

1.  **Solicita la justificación por escrito:** Exige que indiquen el artículo exacto del contrato en el que se amparan para rechazar tu reclamación.
2.  **Reclamación al Servicio de Atención al Cliente (SAC):** Envía un escrito formal al departamento de atención al cliente de la aseguradora, detallando los hechos, aportando las fotos y rebatiendo sus argumentos. La compañía dispone de un plazo de un mes para responderte.
3.  **Defensor del Asegurado o Dirección General de Seguros (DGSFP):** Si el SAC desestima tu escrito o no responde en plazo, puedes elevar tu queja de forma gratuita ante la DGSFP, el organismo público que regula la actividad aseguradora en España.`
        },
        {
          id: "infraseguro-sobreseguro-valor-bienes",
          title: "El infraseguro y el sobreseguro: el peligro de calcular mal el valor de tus bienes",
          excerpt: "Valorar tu casa o tus muebles por encima o por debajo de su precio real puede salirte muy caro. Descubre cómo calcular el capital del continente y del contenido de forma precisa.",
          category_name: "Guías",
          category_slug: "guias",
          date: "28 May 2026",
          read_time: "Lectura de 11 min",
          image_url: "/uploads/guia_infraseguro_sobreseguro.png",
          image_gradient: "from-indigo-500 to-sky-600",
          author: "Patricia G. (Ex-Perito)",
          content: `## Infraseguro y Sobreseguro en el Seguro de Hogar: Cómo Tasar tu Vivienda de Forma Precisa

Al contratar una póliza de seguro de hogar, el formulario nos exige rellenar dos casillas críticas: el valor económico del **continente** (la edificación física) y el del **contenido** (todos los objetos personales, muebles y enseres guardados dentro). Declarar valores incorrectos en estas casillas, ya sea por mero descuido o con la intención de abaratar la cuota mensual de la prima, nos expone a dos peligros financieros graves: el **infraseguro** y el **sobreseguro**.

En este artículo, escrito por una perito de seguros con amplia experiencia de campo, te enseñamos a calcular con precisión matemática estos valores para evitar sorpresas desagradables ante un siniestro grave.

---

### ¿Qué es el Infraseguro y por qué es Peligroso?

El infraseguro ocurre cuando declaras un valor de continente o de contenido que es **menor al valor de reposición real** de tu propiedad. Por ejemplo, si los muebles, ropa y tecnología de tu casa valen realmente 40.000€, pero al rellenar el formulario de contratación indicas únicamente 20.000€ para pagar menos al año.

#### La Regla Proporcional (La trampa legal):
Si sufres un siniestro parcial, como un incendio localizado en la cocina que causa desperfectos por valor de 10.000€, la aseguradora no te pagará esos 10.000€ completos por el hecho de no superar el límite de los 20.000€ asegurados. La ley le faculta para aplicar la **Regla Proporcional**:
$$\text{Indemnización} = \text{Daño Real} \times \frac{\text{Capital Asegurado}}{\text{Capital Real}}$$
En este caso:
$$\text{Indemnización} = 10.000€ \times \frac{20.000€}{40.000€} = 5.000€$$
La aseguradora solo te indemnizará con 5.000€, y tú deberás costear los 5.000€ restantes para poder reformar tu cocina. El infraseguro convierte tu póliza en un producto inútil frente a siniestros de cualquier tamaño.

---

### ¿Qué es el Sobreseguro? (Un gasto innecesario)

El sobreseguro es el caso opuesto: declaras un valor superior al real. Por ejemplo, declaras un contenido de 70.000€ cuando tus pertenencias reales valen apenas 30.000€.

#### La Consecuencia:
Estarás pagando una prima mensual inflada de manera innecesaria. La Ley de Contrato de Seguro prohíbe el "enriquecimiento injusto" por parte del asegurado. En caso de siniestro total, la aseguradora enviará a un perito para tasar el valor real de los restos y **únicamente te indemnizará por el valor de reposición real (30.000€)**, nunca por la suma declarada de 70.000€. Has estado regalando dinero a la compañía mes a mes.

---

### Cómo Calcular el Valor del Continente de Forma Correcta

El valor del continente **no es el precio de compra o venta de mercado de tu casa**. El precio de mercado incluye el valor del solar/suelo y la ubicación, factores que no sufren daños materiales por incendio o rotura.
Debes asegurar el **coste de reconstrucción física del edificio**.
*   **Fórmula del sector:** Las aseguradoras calculan el coste medio de reconstrucción por metro cuadrado útil. Para calidades medias, este coste se sitúa actualmente entre **900€ y 1.400€ por m²**.
*   **Ejemplo:** Si tu piso tiene 85m² construidos, el capital de Continente recomendado debería situarse entre $85 \times 1.000 = 85.000€$ y $85 \times 1.200 = 102.000€$.

---

### Cómo Calcular el Valor del Contenido (El inventario de enseres)

Calcular el contenido requiere dedicar una tarde a realizar un inventario ordenado habitación por habitación. Deberás valorar a precio de reposición a nuevo:
1.  **Tecnología y Electrodomésticos:** Televisores, ordenadores, teléfonos móviles, lavadora, nevera, horno, pequeños electrodomésticos de cocina.
2.  **Ropa y Textil Hogar:** Toda la ropa de vestir de los miembros de la familia, ropa de cama, toallas, cortinas, alfombras. (Suele ser el bloque de gasto que más se infravalora).
3.  **Mobiliario:** Mesas, sofás, camas, armarios, estanterías.
4.  **Vajilla y Utensilios:** Platos, cubertería, sartenes, libros, juguetes y enseres cotidianos.`
        }
      ];

      for (const article of seedArticles) {
        await client.query(
          `
          INSERT INTO articles (id, title, excerpt, category_name, category_slug, date, read_time, image_url, image_gradient, author, content)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            excerpt = EXCLUDED.excerpt,
            category_name = EXCLUDED.category_name,
            category_slug = EXCLUDED.category_slug,
            date = EXCLUDED.date,
            read_time = EXCLUDED.read_time,
            image_url = EXCLUDED.image_url,
            image_gradient = EXCLUDED.image_gradient,
            author = EXCLUDED.author,
            content = EXCLUDED.content
          `,
          [
            article.id,
            article.title,
            article.excerpt,
            article.category_name,
            article.category_slug,
            article.date,
            article.read_time,
            article.image_url,
            article.image_gradient,
            article.author,
            article.content,
          ]
        );
      }
      console.log("Database pre-populated successfully with 8 SEO-optimized articles!");
    } else {
      console.log(`Database already contains ${count} articles. Skipping seeding.`);
    }
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  } finally {
    client.release();
  }
}

