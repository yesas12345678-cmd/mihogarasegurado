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
}

export const SEED_ARTICLES: SeedArticleMetadata[] = [
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
    author: "Patricia G. (Ex-Perito)"
  },
  {
    id: "comparativa-mejores-seguros-hogar",
    title: "Los 5 mejores seguros de hogar en España (2026): Comparativa sin patrocinar",
    meta_title: "Mejores Seguros de Hogar en España (2026) - Comparativa Real",
    meta_description: "Análisis y comparativa real de los 5 mejores seguros de hogar en España para 2026. Evaluamos Mapfre, Allianz, Mutua Madrileña, Generali y Liberty sin patrocinios.",
    excerpt: "Comparamos los 5 mejores seguros de hogar en España. Analizamos Mapfre, Allianz, Mutua Madrileña, Generali y Liberty Seguros, desglosando precios medios, rapidez de peritaje y exclusiones.",
    category_name: "Comparativas",
    category_slug: "comparativas",
    date: "09 Jun 2026",
    read_time: "Lectura de 15 min",
    image_url: "/uploads/comparativa_mejores_seguros.png",
    image_gradient: "from-blue-600 to-indigo-700",
    author: "Patricia G. (Ex-Perito)"
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
    author: "Carlos M. (Jurista)"
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
    author: "Carlos M. (Jurista)"
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
    author: "Elena R. (Abogada)"
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
    author: "Elena R. (Abogada)"
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
    author: "Carlos M. (Jurista)"
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
    author: "Patricia G. (Ex-Perito)"
  }
];
