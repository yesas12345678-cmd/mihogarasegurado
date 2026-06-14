export interface SeedArticleMetadata {
  id: string;
  title: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  category_name: string;
  category_slug: string;
  date: string;
  read_time: string;
  image_url: string;
  image_gradient: string;
  author: string;
  published_at?: string;
  keyword?: string;
}

// Original 8 articles
const ORIGINAL_ARTICLES: SeedArticleMetadata[] = [
  {
    id: "seguro-basico-vs-todo-riesgo",
    title: "Seguro de hogar básico vs. todo riesgo: ¿Cuál elegir realmente?",
    meta_title: "Seguro de Hogar Básico vs Todo Riesgo: Comparativa y Exclusiones",
    meta_description: "Comparativa definitiva entre el seguro de hogar básico (riesgos nominados) y la póliza a todo riesgo accidental. Descubre precios, coberturas reales y exclusiones periciales.",
    excerpt: "Guía comparativa de seguros de hogar básico y todo riesgo. Analizamos exclusiones de seguros de hogar, deducibles, daños accidentales de tecnología y la letra pequeña para ahorrar en tu póliza.",
    category_name: "Comparativas",
    category_slug: "comparativas",
    date: "10 Jun 2026",
    read_time: "Lectura de 15 min",
    image_url: "/uploads/comparativa_basico_todo_riesgo.png",
    image_gradient: "from-cyan-500 to-blue-600",
    author: "Patricia G. (Ex-Perito)",
    keyword: "seguro de hogar basico todo riesgo"
  },
  {
    id: "comparativa-mejores-seguros-hogar",
    title: "Los 5 mejores seguros de hogar en España (2026): Comparativa sin patrocinar",
    meta_title: "Mejores Seguros de Hogar en España (2026) - Comparativa Real",
    meta_description: "Análisis y comparativa real de los 5 mejores seguros de hogar en España para 2026. Evaluamos Mapfre, Allianz, Mutua Madrileña, Generali y Liberty sin patrocinios.",
    excerpt: "Comparamos los 5 mejores seguros de hogar en España. Analizamos Mapfre, Allianz, Mutua Madrileña, Generali y Liberty Seguros, desglosando precios medios, rapidez de peritaje and exclusiones.",
    category_name: "Comparativas",
    category_slug: "comparativas",
    date: "09 Jun 2026",
    read_time: "Lectura de 15 min",
    image_url: "/uploads/comparativa_mejores_seguros.png",
    image_gradient: "from-blue-600 to-indigo-700",
    author: "Patricia G. (Ex-Perito)",
    keyword: "mejores seguros de hogar"
  },
  {
    id: "cobertura-danos-agua-exclusiones",
    title: "La cobertura de daños por agua: lo que las aseguradoras no te dicen",
    meta_title: "Daños por Agua en el Seguro de Hogar: Guía y Exclusiones",
    meta_description: "Explicamos detalladamente la cobertura de daños por agua en los seguros de hogar en España. Evita que rechacen tu gotera por falta de mantenimiento, moho o juntas de silicona.",
    excerpt: "Los daños por agua son el siniestro más común en España, y a la vez el que más disputas genera. Conoce qué tuberías están cubiertas y qué se considera falta de mantenimiento.",
    category_name: "Coberturas",
    category_slug: "coberturas",
    date: "08 Jun 2026",
    read_time: "Lectura de 14 min",
    image_url: "/uploads/cobertura_danos_agua.png",
    image_gradient: "from-teal-400 to-emerald-600",
    author: "Carlos M. (Jurista)",
    keyword: "daños por agua seguro hogar"
  },
  {
    id: "cobertura-robo-hurto-atraco-diferencias",
    title: "Seguro de hogar frente a robo, hurto y atraco: límites y letra pequeña fuera del hogar",
    meta_title: "Robo, Hurto y Atraco: Coberturas en el Seguro de Hogar",
    meta_description: "Diferencias legales y de póliza entre robo, hurto y atraco en el seguro de hogar. Conoce qué cubre el seguro fuera de casa, sublímites de joyas, dinero y trasteros.",
    excerpt: "Diferencias entre robo, hurto y atraco en el seguro de hogar. Conoce los límites de indemnización de joyas, dinero en efectivo, trasteros y coberturas en la vía pública.",
    category_name: "Coberturas",
    category_slug: "coberturas",
    date: "07 Jun 2026",
    read_time: "Lectura de 14 min",
    image_url: "/uploads/cobertura_robo_hurto.png",
    image_gradient: "from-purple-600 to-indigo-800",
    author: "Carlos M. (Jurista)",
    keyword: "robo hurto atraco seguro hogar"
  },
  {
    id: "seguros-hogar-alquiler-responsabilidades",
    title: "Seguros de hogar para pisos de alquiler: responsabilidades de casero e inquilino",
    meta_title: "Seguro de Hogar en Alquiler: Propietario vs Inquilino",
    meta_description: "Guía legal sobre los seguros de hogar en pisos de alquiler. Qué cubre cada póliza, quién debe pagarla, ventajas fiscales y la importancia de la Responsabilidad Civil Locativa.",
    excerpt: "¿Quién debe asegurar el continente y quién el contenido? ¿Qué cubre la responsabilidad civil si hay un escape de agua? Te lo explicamos de forma sencilla y directa.",
    category_name: "Tipos de Vivienda",
    category_slug: "tipos-de-vivienda",
    date: "05 Jun 2026",
    read_time: "Lectura de 15 min",
    image_url: "/uploads/vivienda_alquiler.png",
    image_gradient: "from-amber-400 to-orange-500",
    author: "Elena R. (Abogada)",
    keyword: "seguro de hogar inquilino propietario"
  },
  {
    id: "seguro-hogar-chalet-vivienda-unifamiliar",
    title: "Seguro de hogar para viviendas unifamiliares y chalets: riesgos específicos",
    meta_title: "Seguro de Hogar para Chalets y Viviendas Unifamiliares",
    meta_description: "Análisis completo de coberturas de seguros para chalets. Aprende a declarar adecuadamente jardines, piscinas, anexos y riesgos de robo y congelación de tuberías exteriores.",
    excerpt: "Las viviendas que pasan mucho tiempo deshabitadas presentan riesgos específicos de robo y vandalismo. Analizamos qué pólizas específicas ofrecen la mejor protección real.",
    category_name: "Tipos de Vivienda",
    category_slug: "tipos-de-vivienda",
    date: "04 Jun 2026",
    read_time: "Lectura de 14 min",
    image_url: "/uploads/vivienda_chalet.png",
    image_gradient: "from-rose-500 to-red-650",
    author: "Elena R. (Abogada)",
    keyword: "seguro hogar chalet unifamiliar"
  },
  {
    id: "guia-reclamar-siniestro-efectiva",
    title: "Guía paso a paso: Cómo reclamar un siniestro de forma efectiva",
    meta_title: "Cómo Reclamar un Siniestro al Seguro de Hogar Paso a Paso",
    meta_description: "Guía legal paso a paso para reclamar un siniestro al seguro de hogar. Conoce plazos, cómo recopilar fotos y facturas, y defender tus derechos ante el perito de la compañía.",
    excerpt: "Los plazos legales, la documentación necesaria y cómo redactar la reclamación a tu compañía de seguros para evitar retrasos y denegaciones injustas de cobertura.",
    category_name: "Guías",
    category_slug: "guias",
    date: "02 Jun 2026",
    read_time: "Lectura de 14 min",
    image_url: "/uploads/guia_reclamar_siniestro.png",
    image_gradient: "from-violet-500 to-purple-600",
    author: "Carlos M. (Jurista)",
    keyword: "como reclamar siniestro seguro hogar"
  },
  {
    id: "infraseguro-sobreseguro-valor-bienes",
    title: "El infraseguro y el sobreseguro: el peligro de calcular mal el valor de tus bienes",
    meta_title: "Infraseguro y Sobreseguro: Tasar Continente y Contenido",
    meta_description: "Evita el infraseguro y sobreseguro en tu seguro de hogar. Descubre cómo aplicar la regla proporcional, tasar el continente y el contenido, y la actualización de capitales indexada al IPC.",
    excerpt: "Valorar tu casa o tus muebles por encima o por debajo de su precio real puede salirte muy caro. Descubre cómo calcular el capital del continente y del contenido de forma precisa.",
    category_name: "Guías",
    category_slug: "guias",
    date: "28 May 2026",
    read_time: "Lectura de 13 min",
    image_url: "/uploads/guia_infraseguro_sobreseguro.png",
    image_gradient: "from-indigo-500 to-sky-600",
    author: "Patricia G. (Ex-Perito)",
    keyword: "infraseguro sobreseguro valor bienes"
  }
];

// 23 New articles for Comparativas
const COMPARATIVAS_NEW = [
  { t: "Mapfre vs Mutua Madrileña: Comparativa detallada de seguros de hogar", k: "mapfre vs mutua hogar", s: "seguro-hogar-mapfre-vs-mutua", ex: "Comparamos las pólizas de hogar de Mapfre y Mutua Madrileña. Analizamos precios de salida, velocidad de asistencia y coberturas en caso de daños graves." },
  { t: "Allianz vs AXA: ¿Cuál ofrece mejor asistencia y cobertura ante siniestros?", k: "allianz vs axa hogar", s: "seguro-hogar-allianz-vs-axa", ex: "Análisis técnico y objetivo de Allianz y AXA en el ramo de hogar. Comparamos sus servicios de bricolaje, defensa jurídica y atención de goteras de urgencia." },
  { t: "Santalucía vs Mapfre: Coberturas esenciales y límites bajo la lupa", k: "santalucia vs mapfre hogar", s: "seguro-hogar-santalucia-vs-mapfre", ex: "Enfrentamos a dos gigantes de los seguros de hogar en España. Descubre los límites en daños estéticos, reposición de cristales y cobertura de robo en exteriores." },
  { t: "Generali vs Catalana Occidente: Análisis crítico de pólizas multirriesgo", k: "generali vs catalana occidente", s: "generali-vs-catalana-occidente-hogar", ex: "Analizamos de forma transparente las pólizas multirriesgo hogar de Generali y Catalana Occidente. Evaluamos la letra pequeña de su asistencia jurídica." },
  { t: "Línea Directa vs Verti: Seguros de hogar económicos frente a frente", k: "linea directa vs verti", s: "linea-directa-vs-verti-seguros", ex: "Comparativa directa de las dos grandes aseguradoras directas en España. ¿Vale la pena ahorrar en la prima sacrificando límites de cobertura?" },
  { t: "Caser vs Reale: ¿Cuál ofrece mejor relación calidad-precio en su póliza?", k: "caser vs reale hogar", s: "caser-vs-reale-hogar-comparativa", ex: "Comparamos Caser y Reale en seguros de hogar. Analizamos sus prestaciones para comunidades de propietarios y viviendas individuales." },
  { t: "Liberty Seguros vs Zurich: Comparativa para viviendas unifamiliares", k: "liberty vs zurich hogar", s: "liberty-seguros-vs-zurich-comparativa", ex: "Evaluación de pólizas de hogar para chalets y casas pareadas de Liberty y Zurich. Analizamos coberturas de jardines y heladas exteriores." },
  { t: "Seguro de hogar de BBVA vs CaixaBank: ¿Qué ofrece la banca tradicional?", k: "seguro hogar bbva caixabank", s: "seguro-hogar-bbva-vs-caixabank", ex: "Comparativa de los seguros de hogar BBVA y CaixaBank vinculados a préstamos e hipotecas. Evita pagar de más." },
  { t: "Banco Sabadell vs Santander: Seguros de hogar vinculados a hipotecas", k: "seguro hogar sabadell santander", s: "seguro-hogar-sabadell-vs-santander", ex: "Analizamos los pros y contras de los seguros de hogar vinculados comercializados por Banco Sabadell y Banco Santander." },
  { t: "Seguros de hogar premium: Comparativa de pólizas para viviendas de lujo", k: "seguros hogar de lujo", s: "seguros-de-hogar-premium-lujo", ex: "Análisis comparativo de seguros de hogar de gama alta. Coberturas específicas para obras de arte, joyas de gran valor y jardines de diseño." },
  { t: "Los mejores seguros de hogar con cobertura de robo en España", k: "mejor seguro hogar robo", s: "mejores-seguros-hogar-cobertura-robo", ex: "Comparamos las pólizas con los límites de indemnización más altos y menos exclusiones para robo, hurto y atraco en vía pública." },
  { t: "Comparativa de seguros de hogar multirriesgo: Coberturas indispensables", k: "comparativa seguro multirriesgo", s: "comparativa-seguros-hogar-multirriesgo", ex: "Desglosamos las coberturas estándar y opcionales de los seguros multirriesgo de hogar para ayudarte a decidir qué contratar realmente." },
  { t: "Seguro de hogar para inquilinos: Comparativa de precios y daños propios", k: "seguro inquilino comparativa", s: "seguro-hogar-inquilinos-comparativa", ex: "Comparamos las mejores pólizas diseñadas exclusivamente para proteger las pertenencias del inquilino y su responsabilidad civil locativa." },
  { t: "Seguro de impago de alquiler: Comparativa de las mejores compañías", k: "comparativa seguro impago alquiler", s: "seguros-impago-alquiler-comparativa", ex: "Analizamos y comparamos las coberturas de impago de rentas, defensa jurídica del casero y actos vandálicos del inquilino entre aseguradoras." },
  { t: "Comparativa de seguros de hogar para viviendas de alquiler turístico", k: "seguro piso turistico comparativa", s: "seguros-viviendas-alquiler-turistico", ex: "Análisis de seguros específicos para pisos turísticos con cobertura de daños por huéspedes, responsabilidad civil y pérdida de ingresos." },
  { t: "Seguro de hogar básico: ¿Qué aseguradora ofrece el precio más bajo?", k: "seguro hogar basico barato", s: "seguro-hogar-basico-mas-barato", ex: "Buscamos la póliza básica (riesgos nominados) con la prima más reducida del mercado español, analizando sus fuertes recortes de cobertura." },
  { t: "Póliza de hogar todo riesgo: Comparativa de franquicias y sublímites", k: "seguro todo riesgo franquicia", s: "seguro-hogar-todo-riesgo-franquicias", ex: "Analizamos cómo funcionan las franquicias en los seguros a todo riesgo de hogar y si compensan la rebaja en la prima anual del seguro." },
  { t: "Asistencia en el hogar: ¿Qué aseguradora responde más rápido ante averías?", k: "asistencia hogar comparativa", s: "asistencia-urgencias-hogar-comparativa", ex: "Comparamos los tiempos de respuesta declarados y reales para servicios de fontanería, electricidad y cerrajería urgente en España." },
  { t: "Seguros de hogar para comunidades: Comparativa de coberturas cruzadas", k: "seguro comunidad vs hogar", s: "seguro-comunidad-vecinos-vs-hogar", ex: "Estudio comparativo para evitar la duplicidad de coberturas y primas entre el seguro de la comunidad de propietarios y el seguro privado." },
  { t: "Seguro de hogar ecológico: Cobertura de placas solares y aerotermia", k: "seguro hogar placas solares", s: "seguro-hogar-placas-solares-aerotermia", ex: "Comparamos qué compañías cubren de serie las placas fotovoltaicas y los sistemas de aerotermia como continente sin recargos." },
  { t: "Comparativa de seguros de hogar para casas de madera y prefabricadas", k: "seguro casa prefabricada", s: "seguro-casas-madera-prefabricadas", ex: "Analizamos el coste y la dificultad de asegurar viviendas no tradicionales de madera, acero o modulares en el mercado español." },
  { t: "Seguros de hogar online: Comparativa de contratación y gestión digital", k: "seguro hogar digital online", s: "seguros-hogar-online-comparativa", ex: "Evaluamos la experiencia de usuario, rapidez de tramitación de partes y claridad de póliza en las aseguradoras 100% digitales." },
  { t: "Seguro de hogar con defensa jurídica avanzada: Comparativa de límites", k: "seguro defensa juridica hogar", s: "seguro-hogar-defensa-juridica-limites", ex: "Analizamos los límites económicos que imponen las aseguradoras para la libre elección de abogado y la reclamación de daños a terceros." }
];

// 23 New articles for Coberturas
const COBERTURAS_NEW = [
  { t: "Daños eléctricos en el seguro de hogar: Electrodomésticos que están cubiertos", k: "daños electricos seguro hogar", s: "cobertura-danos-electricos-electrodomesticos", ex: "Aprende qué electrodomésticos repara el seguro de hogar tras una sobretensión y cómo demostrar que el daño fue de origen eléctrico." },
  { t: "La cobertura de responsabilidad civil familiar: Qué es y qué daños cubre", k: "responsabilidad civil familiar seguro", s: "responsabilidad-civil-familiar-seguro-hogar", ex: "Te explicamos qué es la Responsabilidad Civil Familiar y cómo te protege ante accidentes causados por ti, tus hijos o tu pareja fuera de casa." },
  { t: "Seguro de hogar y cortocircuitos: ¿Está cubierta la instalación eléctrica?", k: "cortocircuito seguro hogar", s: "cortocircuito-instalacion-electrica-seguro", ex: "Descubre en qué casos el seguro de hogar asume el coste de reparación de la instalación eléctrica tras un cortocircuito o incendio." },
  { t: "Responsabilidad civil de mascotas: Cobertura obligatoria en el seguro", k: "responsabilidad civil perros seguro", s: "responsabilidad-civil-mascotas-perros-seguro", ex: "Guía sobre cómo incluir a tu perro en el seguro de hogar para cumplir con la ley de bienestar animal y qué límites de cobertura existen." },
  { t: "Daños estéticos en el seguro de hogar: Límites para azulejos y pintura", k: "daños esteticos seguro hogar", s: "cobertura-danos-esteticos-seguro-hogar", ex: "Analizamos la cobertura de daños estéticos: qué pasa si no hay azulejos iguales tras una reparación de tubería y cuánto dinero cubre la póliza." },
  { t: "Cobertura de alimentos en el frigorífico por corte de luz prolongado", k: "alimentos frigorifico seguro hogar", s: "cobertura-alimentos-frigorifico-corte-luz", ex: "El seguro de hogar puede indemnizarte por la comida estropeada si hay un apagón eléctrico prolongado. Requisitos y facturas necesarias." },
  { t: "Cerrajero de urgencia: ¿Cuándo cubre el seguro el cambio completo de llaves?", k: "cerrajero de urgencia seguro", s: "cerrajero-urgencia-seguro-cambio-llaves", ex: "Diferencias entre llamar al cerrajero por robo de llaves, pérdida, o simple avería de la cerradura. Cuándo es gratis y cuándo no." },
  { t: "Rotura de cristales y vitrocerámica: Coberturas comunes del seguro de hogar", k: "rotura vitroceramica seguro hogar", s: "rotura-cristales-vitroceramica-seguro-hogar", ex: "Explicamos detalladamente la cobertura de rotura de lunas, espejos, mármoles y placas vitrocerámicas. Exclusiones por arañazos estéticos." },
  { t: "Cobertura de robo en trasteros y garajes comunitarios: Qué debes saber", k: "robo trastero seguro hogar", s: "cobertura-robo-trasteros-garajes", ex: "Los robos en trasteros anexos tienen sublímites muy estrictos en las pólizas de hogar. Conoce las medidas de seguridad exigidas." },
  { t: "Uso fraudulento de tarjetas de crédito robadas: Cobertura de la póliza", k: "robo tarjetas de credito seguro", s: "uso-fraudulento-tarjetas-seguro-hogar", ex: "Descubre hasta qué importe te indemniza el seguro de hogar si te roban la tarjeta de crédito en la calle y realizan compras no autorizadas." },
  { t: "Cobertura de fenómenos atmosféricos: Viento, lluvia extrema, granizo y nieve", k: "fenomenos atmosfericos seguro hogar", s: "cobertura-fenomenos-atmosfericos-seguro", ex: "Aprende qué velocidad de viento y qué nivel de lluvia por metro cuadrado exige tu aseguradora para hacerse cargo de las goteras o tejados rotos." },
  { t: "Daños por vandalismo en el seguro de hogar: Límites y exclusiones reales", k: "daños vandalismo seguro hogar", s: "danos-vandalismo-seguro-hogar-cobertura", ex: "Analizamos qué cubre el seguro ante pintadas en fachadas, roturas de puertas por intentos de okupación u otros actos vandálicos de terceros." },
  { t: "Cobertura de inhabitabilidad temporal: ¿Paga el seguro tu hotel si hay incendio?", k: "inhabitabilidad temporal seguro", s: "cobertura-inhabitabilidad-temporal-alojamiento", ex: "Si tu vivienda queda inhabitable por un siniestro grave cubierto, el seguro paga tu alojamiento temporal. Descubre los límites diarios." },
  { t: "Daños por humo en el seguro de hogar: Incendios y mala combustión de chimeneas", k: "daños por humo seguro", s: "danos-humo-chimenea-incendio-seguro", ex: "Explicamos si el seguro cubre la limpieza de hollín por mala combustión de una chimenea o si solo responde ante fuegos accidentales." },
  { t: "Ruina del edificio y derrumbe: Coberturas extremas de la póliza de hogar", k: "derrumbe edificio seguro hogar", s: "cobertura-ruina-derrumbe-edificio", ex: "Qué cubre el seguro si se cae el techo de tu vivienda o si el edificio entero es declarado en ruina inminente por fallos estructurales." },
  { t: "Asistencia en el hogar para personas mayores: Servicios de teleasistencia integrados", k: "teleasistencia seguro hogar", s: "teleasistencia-personas-mayores-seguro", ex: "Muchas aseguradoras de hogar ofrecen de forma gratuita servicios de teleasistencia y ayuda a domicilio para personas dependientes." },
  { t: "El servicio de bricolaje a domicilio en el seguro de hogar: Qué tareas incluye", k: "servicio bricolaje seguro hogar", s: "servicio-bricolaje-manitas-seguro-hogar", ex: "El servicio de 'manitas' a domicilio te permite ahorrar en pequeñas reparaciones domésticas. Descubre las horas y tareas cubiertas al año." },
  { t: "Cobertura de defensa jurídica de hogar: Abogados y costas judiciales cubiertas", k: "defensa juridica seguro hogar", s: "defensa-juridica-costas-judiciales-seguro", ex: "Detalles sobre la cobertura legal del seguro de hogar: reclamación de daños a vecinos, defensa penal y redacción de contratos de alquiler." },
  { t: "Daños por heladas e inundaciones: Límites del seguro en temporada invernal", k: "daños heladas tuberias seguro", s: "cobertura-heladas-inundaciones-tuberias", ex: "Cómo actuar ante la congelación y rotura de tuberías exteriores en invierno y qué medidas de prevención exige la aseguradora para pagar." },
  { t: "Robo de joyas dentro de casa: Requisitos de caja fuerte y límites de la póliza", k: "asegurar joyas en casa", s: "robo-joyas-casa-caja-fuerte-seguro", ex: "Las joyas tienen consideración de objeto de valor especial. Conoce el límite máximo cubierto sin declarar y cuándo es obligatoria la caja fuerte." },
  { t: "Atraco en la vía pública: ¿Te cubre el seguro de hogar si te roban en la calle?", k: "atraco calle seguro hogar", s: "atraco-via-publica-seguro-hogar", ex: "Diferencia entre el hurto (descuido) en la calle y el atraco con violencia. Qué documentación exige el seguro para indemnizarte el móvil." },
  { t: "Daños causados por mascotas del vecino: Quién responde y cómo reclamar al seguro", k: "daños perro vecino reclamacion", s: "danos-mascotas-vecino-reclamar-seguro", ex: "Guía para saber qué seguro debe pagar los daños materiales o lesiones causadas por el perro o gato de tu vecino de forma amistosa o judicial." },
  { t: "Cobertura de filtraciones de lluvia por fachadas o cubiertas comunitarias", k: "filtraciones lluvia seguro hogar", s: "filtraciones-lluvia-fachada-cubierta-seguro", ex: "Descubre quién debe pagar los daños de humedades por lluvia: tu seguro de hogar, el de la comunidad o si se considera falta de mantenimiento." }
];

// 23 New articles for Tipos de Vivienda
const VIVIENDAS_NEW = [
  { t: "Seguro de hogar para pisos en altura: Riesgos y coberturas clave en bloques", k: "seguro hogar piso altura", s: "seguro-hogar-pisos-en-altura", ex: "Analizamos las necesidades específicas de los pisos en altura, como las filtraciones de agua a vecinos de abajo y la responsabilidad civil." },
  { t: "Seguro para casas rurales y masías: Coberturas para entornos aislados", k: "seguro casa rural masia", s: "seguro-casa-rural-masia-coberturas", ex: "Las casas rurales en parcelas aisladas requieren coberturas especiales contra robos sin alarma conectada y daños por incendios forestales." },
  { t: "Seguro de hogar para áticos y viviendas con grandes terrazas descubiertas", k: "seguro atico terraza cobertura", s: "seguro-hogar-aticos-terrazas", ex: "Los áticos sufren filtraciones de lluvia específicas y riesgos de daños a terceros por objetos caídos del viento. Analizamos su póliza." },
  { t: "Seguro de hogar para casas adosadas: Diferenciar zonas comunes de privadas", k: "seguro casa adosada", s: "seguro-casa-adosada-coberturas", ex: "Guía para asegurar correctamente un adosado sin duplicar coberturas con el seguro de la comunidad del complejo residencial." },
  { t: "Seguro de hogar para caravanas y casas móviles: Normativa y pólizas en España", k: "seguro caravana casa movil", s: "seguro-caravanas-casas-moviles", ex: "Las mobile homes y caravanas estáticas en campings tienen características especiales. Qué cubre el seguro de continente y qué se excluye." },
  { t: "Seguro de hogar para viviendas unifamiliares con jardín y piscina exterior", k: "seguro casa piscina jardin", s: "seguro-chalet-jardin-piscina-cobertura", ex: "Aprende a declarar el vaso de la piscina, la valla perimetral y el mobiliario de jardín para que estén cubiertos ante robo o tormentas." },
  { t: "Seguro de hogar para apartamentos de playa: Coberturas para casas de temporada", k: "seguro apartamento playa vacacional", s: "seguro-apartamento-playa-temporada", ex: "Los apartamentos de playa pasan meses vacíos. Evita exclusiones por falta de uso y protege tu vivienda frente a humedades por salinidad." },
  { t: "Seguro para viviendas desocupadas: Cómo evitar la cancelación unilateral de la póliza", k: "seguro vivienda vacia desocupada", s: "seguro-viviendas-vacias-desocupadas", ex: "Las aseguradoras rescinden pólizas si la vivienda está deshabitada más de 90 días seguidos. Descubre los seguros especiales para casas vacías." },
  { t: "Seguro de hogar para locales comerciales reconvertidos legalmente en vivienda", k: "seguro local reconvertido vivienda", s: "seguro-locales-reconvertidos-vivienda", ex: "Si has transformado un local en loft, debes asegurar continente bajo la nueva cédula de habitabilidad para evitar rechazos en siniestros." },
  { t: "Seguro de hogar para pisos compartidos: Coberturas para inquilinos y estudiantes", k: "seguro piso compartido estudiantes", s: "seguro-piso-compartido-coberturas", ex: "Analizamos cómo asegurar las pertenencias individuales en un piso compartido y cómo se gestiona la responsabilidad civil cruzada." },
  { t: "Seguro de hogar para viviendas de protección oficial (VPO) en España", k: "seguro vivienda vpo requisitos", s: "seguro-vivienda-proteccion-oficial-vpo", ex: "Las viviendas protegidas tienen un valor de módulo fijado por la administración. Cómo calcular el continente sin caer en sobreseguro." },
  { t: "Seguro de hogar para casas antiguas, rústicas o de interés histórico", k: "seguro casa antigua historica", s: "seguro-casas-antiguas-historicas", ex: "Las casas de piedra o con elementos protegidos requieren pólizas específicas debido a la dificultad y coste de la reconstrucción exacta." },
  { t: "Seguro de hogar para lofts modernos: Estructura diáfana y continente especial", k: "seguro loft moderno diáfano", s: "seguro-loft-moderno-diafano", ex: "Las viviendas tipo loft tienen valoraciones de continente diferentes al carecer de tabiquería tradicional. Coberturas recomendadas." },
  { t: "Seguro de hogar para casas de campo sin escriturar o en suelo rústico", k: "seguro casa campo rustica", s: "seguro-casa-campo-sin-escriturar", ex: "Guía sobre los límites de cobertura y la viabilidad de asegurar viviendas rurales que no disponen de registro de la propiedad formal." },
  { t: "Seguro de hogar para pisos alquilados por habitaciones: Responsabilidades legales", k: "seguro alquiler por habitaciones", s: "seguro-alquiler-habitaciones-propietario", ex: "Cómo proteger tu piso como casero si alquilas habitaciones individuales a diferentes estudiantes o trabajadores. Cobertura de daños." },
  { t: "Seguro de hogar para viviendas okupadas: Qué daños cubre realmente la póliza", k: "seguro hogar okupas cobertura", s: "seguro-hogar-viviendas-okupadas", ex: "Desmitificamos las coberturas de okupación. Qué aseguradoras cubren el desahucio legal, la pérdida de alquileres y los destrozos interiores." },
  { t: "Seguro de hogar para casas prefabricadas de hormigón o modulares", k: "seguro casa madera prefabricada", s: "seguro-casas-prefabricadas-modulares", ex: "Las casas prefabricadas de hormigón tienen la misma consideración que la obra tradicional. Analizamos costes de pólizas y requisitos." },
  { t: "Seguro para viviendas unifamiliares pareadas: Gestión de medianeras y conflictos", k: "seguro casa pareada medianera", s: "seguro-casas-pareadas-medianeras", ex: "Los siniestros en casas pareadas que afectan a la pared medianera suelen generar disputas. Quién debe pagar y cómo actúan los seguros." },
  { t: "Seguro de hogar para estudios pequeños y apartamentos tipo estudio urbanos", k: "seguro estudio pequeño apartamento", s: "seguro-estudio-pequeno-apartamento", ex: "Pólizas optimizadas para estudios de pocos metros cuadrados. Cómo valorar el contenido de forma ajustada para no pagar de más." },
  { t: "Seguro de hogar para casas con huerto familiar o terrenos colindantes", k: "seguro casa huerto terreno", s: "seguro-casa-huerto-terreno-agricola", ex: "Si tu vivienda tiene un huerto o terreno agrícola anexo, debes declarar los límites para evitar la exclusión de responsabilidad civil." },
  { t: "Seguro de hogar para viviendas en régimen de nuda propiedad en España", k: "seguro nuda propiedad españa", s: "seguro-hogar-nuda-propiedad", ex: "Quién debe pagar el seguro en una nuda propiedad: ¿el usufructuario o el propietario del inmueble? Reparto de responsabilidades legales." },
  { t: "Seguro para pisos con problemas de accesibilidad o reformas de movilidad reducida", k: "seguro piso reformado movilidad", s: "seguro-piso-reformas-accesibilidad", ex: "Cómo declarar las reformas de accesibilidad (rampas, ascensores, baños adaptados) en el seguro de hogar para que estén cubiertas al 100%." },
  { t: "Seguro de hogar para viviendas con instalaciones de domótica integrada", k: "seguro casa domotica inteligente", s: "seguro-casa-inteligente-domotica", ex: "Las casas inteligentes tienen sistemas de seguridad costosos. Descubre si las aseguradoras reducen la prima por instalar sensores de agua." }
];

// 23 New articles for Guías
const GUIAS_NEW = [
  { t: "Cómo declarar correctamente el valor del contenido en tu seguro de hogar", k: "calcular valor contenido seguro", s: "declarar-valor-contenido-seguro-hogar", ex: "Guía práctica para hacer un inventario detallado de tus bienes (muebles, ropa, tecnología) y no caer en infraseguro ni sobreseguro." },
  { t: "Cómo declarar el valor del continente: Guía basada en catastro y metros", k: "calcular valor continente seguro", s: "declarar-valor-continente-seguro-hogar", ex: "Aprende a calcular el valor de reconstrucción de tu casa utilizando la referencia catastral, sin incluir el valor del suelo." },
  { t: "Guía para declarar un siniestro al seguro de hogar a través de internet", k: "declarar siniestro online seguro", s: "declarar-siniestro-online-seguro-hogar", ex: "Paso a paso para comunicar un siniestro (gotera, rotura, robo) por la web o app de tu aseguradora para agilizar los trámites." },
  { t: "Plazos legales para comunicar un siniestro de hogar a la compañía de seguros", k: "plazo comunicar siniestro seguro", s: "plazo-legal-comunicar-siniestro-hogar", ex: "Conoce el plazo estricto de 7 días fijado por la Ley de Contrato de Seguro en España para dar un parte y evitar la pérdida de indemnización." },
  { t: "Qué hacer si el perito del seguro de hogar no acude a tu vivienda en plazo", k: "perito seguro no viene solucion", s: "perito-seguro-no-viene-soluciones", ex: "Si tu aseguradora retrasa la visita del perito, tienes derechos legales. Te explicamos los plazos máximos de respuesta pericial." },
  { t: "Cómo reclamar de forma oficial si el seguro de hogar rechaza tu siniestro", k: "seguro rechaza siniestro reclamacion", s: "reclamar-rechazo-siniestro-seguro-hogar", ex: "Guía para redactar una carta de reclamación ante el Defensor del Asegurado y el Servicio de Reclamaciones de la Dirección General de Seguros." },
  { t: "Guía para contratar un perito independiente de hogar en España (Ley 50/1980)", k: "perito independiente seguro hogar", s: "contratar-perito-independiente-seguro-hogar", ex: "Si no estás de acuerdo con la valoración de tu aseguradora, puedes nombrar a un perito independiente según el Artículo 38 de la ley de seguros." },
  { t: "Cómo cambiar de seguro de hogar al realizar la venta de tu vivienda", k: "cambiar seguro hogar venta piso", s: "cambiar-seguro-hogar-venta-vivienda", ex: "Qué hacer con la póliza contratada cuando vendes tu piso: ¿se puede transferir al nuevo comprador o se puede solicitar la devolución de prima?" },
  { t: "Guía para cancelar legalmente tu seguro de hogar vinculado a la hipoteca", k: "cancelar seguro hogar hipoteca bancaria", s: "cancelar-seguro-hogar-vinculado-hipoteca", ex: "Te explicamos cómo desvincular tu seguro del banco presentando una póliza alternativa y respetando los plazos de preaviso obligatorios." },
  { t: "Cómo dar de baja tu seguro de hogar: Carta modelo y plazos de preaviso", k: "baja seguro hogar carta modelo", s: "baja-seguro-hogar-carta-modelo-plazos", ex: "Guía con plantilla de carta para solicitar la no renovación de tu seguro de hogar con un mes de antelación según el Artículo 22." },
  { t: "Qué cubre el Consorcio de Compensación de Seguros en tu vivienda", k: "consorcio compensacion seguros hogar", s: "cobertura-consorcio-compensacion-seguros-casa", ex: "Aprende qué siniestros extraordinarios (terremotos, inundaciones catastróficas, terrorismo) paga el Consorcio en lugar de tu compañía." },
  { t: "Cómo actuar ante goteras persistentes que el vecino de arriba no quiere reparar", k: "vecino no repara gotera guia", s: "vecino-no-repara-gotera-pasos-legales", ex: "Guía jurídica para solventar humedades provocadas por un vecino insolidario o que no tiene seguro, utilizando la cobertura de defensa jurídica." },
  { t: "Guía sobre franquicias en seguros de hogar: ¿Vale la pena contratarlas?", k: "franquicia seguro hogar funcionamiento", s: "franquicia-seguros-hogar-guia-completa", ex: "Explicamos el funcionamiento de la franquicia absoluta en el seguro del hogar: ejemplos prácticos de reparto de costes de siniestros." },
  { t: "Cómo evitar el aumento injustificado de la prima anual en tu seguro de hogar", k: "evitar aumento prima seguro hogar", s: "evitar-subida-prima-anual-seguro-hogar", ex: "Consejos legales para reclamar ante una subida de precio no comunicada previamente por tu compañía de seguros con dos meses de antelación." },
  { t: "Guía para entender todas las exclusiones en las pólizas de hogar comunes", k: "exclusiones seguro hogar guia", s: "exclusiones-comunes-polizas-seguro-hogar", ex: "Repasamos la letra pequeña de los contratos: falta de mantenimiento, heladas en tuberías de plomo y robos fuera del recinto de la casa." },
  { t: "Cómo declarar joyas y objetos de valor especial en la póliza de hogar", k: "declarar joyas objetos valor seguro", s: "declarar-joyas-objetos-valor-especial-seguro", ex: "Qué objetos se consideran de valor especial y cómo tasarlos adecuadamente para asegurar su reposición al 100% del valor de mercado." },
  { t: "Guía para cambiar el tomador de un seguro de hogar paso a paso", k: "cambiar tomador seguro hogar", s: "cambiar-tomador-seguro-hogar-tramites", ex: "Trámites para transferir la titularidad de una póliza tras un divorcio, herencia o fallecimiento del tomador original." },
  { t: "Cómo actuar si tu vivienda sufre daños estructurales por obras en la calle", k: "daños obras calle seguro hogar", s: "danos-obras-calle-reclamar-seguro-hogar", ex: "Guía para reclamar los daños y grietas causados en tu vivienda por obras municipales, de metro o construcciones en parcelas colindantes." },
  { t: "Guía para reclamar daños al seguro de hogar tras una tormenta eléctrica", k: "reclamar tometa electrica seguro", s: "reclamar-danos-tormenta-electrica-seguro", ex: "Cómo documentar los daños por caída de rayo o sobretensión eléctrica en aparatos de aire acondicionado, calderas y electrodomésticos." },
  { t: "Cómo contratar un seguro de hogar si eres ciudadano extranjero en España", k: "seguro hogar extranjeros españa", s: "seguro-hogar-extranjeros-espana-guia", ex: "Requisitos de documentación (NIE, pasaporte) y cuentas bancarias españolas necesarios para asegurar viviendas en propiedad o alquiler." },
  { t: "Guía para entender la regla proporcional en la tasación de siniestros", k: "regla proporcional seguro hogar", s: "regla-proporcional-seguro-hogar-ejemplos", ex: "Explicamos con fórmulas y ejemplos sencillos cómo reduce la aseguradora tu indemnización si contrataste menos capital del real." },
  { t: "Cómo deducir el seguro de hogar en la declaración de la renta (IRPF)", k: "deducir seguro hogar irpf renta", s: "deducir-seguro-hogar-declaracion-renta-irpf", ex: "Casos en los que desgrava el seguro del hogar: deducción por vivienda habitual (adquirida antes de 2013) y deducción por alquiler." },
  { t: "Guía sobre seguros de hogar obligatorios frente a pólizas opcionales", k: "seguro hogar obligatorio ley", s: "seguro-hogar-obligatorio-hipoteca-ley", ex: "Aclaramos la normativa de la Ley del Mercado Hipotecario en España: ¿es obligatorio el seguro contra incendios en toda vivienda hipotecada?" }
];

// Helper to generate deterministic publication date/time
// Offset goes from -39 (earliest published) to 60 (latest scheduled)
// Base Date: 2026-06-14 (today)
function getDeterministicDate(offsetDays: number, title: string) {
  const baseDate = new Date("2026-06-14T12:00:00+02:00");
  baseDate.setDate(baseDate.getDate() + offsetDays);

  // Deterministic hour between 9 and 20 based on title hash
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hour = 9 + (Math.abs(hash) % 12); // 9 to 20
  const minute = Math.abs(hash >> 2) % 60; // 0 to 59

  baseDate.setHours(hour, minute, 0, 0);
  return baseDate;
}

// Format date to Spanish style like "10 Jun 2026"
function formatSpanishDate(d: Date): string {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function generateSeedArticles(): SeedArticleMetadata[] {
  const articles: SeedArticleMetadata[] = [];

  // Gather lists by category
  const compList: any[] = [];
  const cobList: any[] = [];
  const vivList: any[] = [];
  const guiaList: any[] = [];

  // Add original ones to their respective categories
  for (const art of ORIGINAL_ARTICLES) {
    const item = {
      id: art.id,
      title: art.title,
      meta_title: art.meta_title,
      meta_description: art.meta_description,
      excerpt: art.excerpt,
      category_name: art.category_name,
      category_slug: art.category_slug,
      read_time: art.read_time,
      image_url: art.image_url,
      image_gradient: art.image_gradient,
      author: art.author,
      keyword: art.keyword || ""
    };
    if (art.category_slug === "comparativas") compList.push(item);
    else if (art.category_slug === "coberturas") cobList.push(item);
    else if (art.category_slug === "tipos-de-vivienda") vivList.push(item);
    else if (art.category_slug === "guias") guiaList.push(item);
  }

  const authors = ["Patricia G. (Ex-Perito)", "Carlos M. (Jurista)", "Elena R. (Abogada)"];
  const gradients = [
    "from-cyan-500 to-blue-600",
    "from-teal-400 to-emerald-600",
    "from-amber-400 to-orange-500",
    "from-violet-500 to-purple-600",
    "from-indigo-500 to-sky-600",
    "from-rose-500 to-red-650"
  ];

  // Add new entries for Comparativas
  let idx = 0;
  for (const item of COMPARATIVAS_NEW) {
    compList.push({
      id: item.s,
      title: item.t,
      meta_title: item.t.substring(0, 60),
      meta_description: item.ex.substring(0, 160),
      excerpt: item.ex,
      category_name: "Comparativas",
      category_slug: "comparativas",
      read_time: `Lectura de ${10 + (idx % 6)} min`,
      image_url: "",
      image_gradient: gradients[idx % gradients.length],
      author: authors[idx % authors.length],
      keyword: item.k
    });
    idx++;
  }

  // Add new entries for Coberturas
  idx = 0;
  for (const item of COBERTURAS_NEW) {
    cobList.push({
      id: item.s,
      title: item.t,
      meta_title: item.t.substring(0, 60),
      meta_description: item.ex.substring(0, 160),
      excerpt: item.ex,
      category_name: "Coberturas",
      category_slug: "coberturas",
      read_time: `Lectura de ${10 + (idx % 6)} min`,
      image_url: "",
      image_gradient: gradients[idx % gradients.length],
      author: authors[idx % authors.length],
      keyword: item.k
    });
    idx++;
  }

  // Add new entries for Tipos de Vivienda
  idx = 0;
  for (const item of VIVIENDAS_NEW) {
    vivList.push({
      id: item.s,
      title: item.t,
      meta_title: item.t.substring(0, 60),
      meta_description: item.ex.substring(0, 160),
      excerpt: item.ex,
      category_name: "Tipos de Vivienda",
      category_slug: "tipos-de-vivienda",
      read_time: `Lectura de ${10 + (idx % 6)} min`,
      image_url: "",
      image_gradient: gradients[idx % gradients.length],
      author: authors[idx % authors.length],
      keyword: item.k
    });
    idx++;
  }

  // Add new entries for Guías
  idx = 0;
  for (const item of GUIAS_NEW) {
    guiaList.push({
      id: item.s,
      title: item.t,
      meta_title: item.t.substring(0, 60),
      meta_description: item.ex.substring(0, 160),
      excerpt: item.ex,
      category_name: "Guías",
      category_slug: "guias",
      read_time: `Lectura de ${10 + (idx % 6)} min`,
      image_url: "",
      image_gradient: gradients[idx % gradients.length],
      author: authors[idx % authors.length],
      keyword: item.k
    });
    idx++;
  }

  // Interleave the items in a strict cyclical sequence of categories:
  // comparativas -> coberturas -> tipos-de-vivienda -> guias
  const allArticlesList: any[] = [];
  for (let i = 0; i < 25; i++) {
    allArticlesList.push(compList[i]);
    allArticlesList.push(cobList[i]);
    allArticlesList.push(vivList[i]);
    allArticlesList.push(guiaList[i]);
  }

  // Now assign date offsets sequentially (-39 to 60)
  for (let i = 0; i < allArticlesList.length; i++) {
    const item = allArticlesList[i];
    const offset = i - 39; // i=0 -> -39 (earliest), i=39 -> 0 (today), i=99 -> 60 (latest)

    const pubDate = getDeterministicDate(offset, item.title);
    
    articles.push({
      ...item,
      date: formatSpanishDate(pubDate),
      published_at: pubDate.toISOString()
    });
  }

  return articles;
}

export const SEED_ARTICLES = generateSeedArticles();
