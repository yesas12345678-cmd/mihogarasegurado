export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: {
    name: string;
    slug: string;
  };
  date: string;
  readTime: string;
  imageUrl?: string;
  imageGradient: string;
  author: string;
  content: string; // Dynamic body content of the article
}

export const ALL_ARTICLES: Article[] = [
  {
    id: "seguro-basico-vs-todo-riesgo",
    title: "Seguro de hogar básico vs. todo riesgo: ¿Cuál elegir realmente?",
    excerpt: "¿Merece la pena pagar más por la cobertura todo riesgo o con la póliza básica es suficiente? Desglosamos las coberturas reales y las trampas habituales de las aseguradoras.",
    category: { name: "Comparativas", slug: "comparativas" },
    date: "10 Jun 2026",
    readTime: "Lectura de 5 min",
    imageGradient: "from-cyan-500 to-blue-600",
    author: "Patricia G. (Ex-Perito)",
    content: `El eterno dilema a la hora de contratar o renovar el seguro de hogar es si debemos decantarnos por una póliza básica o dar el salto a un seguro a "todo riesgo". En este artículo, analizamos de manera fría y objetiva qué estás pagando realmente en cada caso y cuándo merece la pena la diferencia económica.

## ¿Qué es un seguro de hogar básico?

Un seguro básico (a veces denominado "multirriesgo estándar") cubre los siniestros más graves pero menos frecuentes:
*   **Incendio, explosión y caída de rayo:** Cobertura fundamental y obligatoria si existe hipoteca.
*   **Daños por agua:** Reparación de tuberías propias y daños a terceros (responsabilidad civil).
*   **Robo dentro de la vivienda:** Con límites estrictos según el capital declarado en el contenido.
*   **Responsabilidad Civil (RC):** Cubre daños a terceros (por ejemplo, si inundas al vecino de abajo).

## ¿Qué añade la cobertura a "Todo Riesgo"?

Contrario a la creencia popular, "todo riesgo" no significa que cubra absolutamente cualquier cosa que pase en la casa. Significa que, además de los riesgos nominales descritos en la póliza básica, se cubre **cualquier daño accidental** sobre los bienes del hogar, a menos que esté expresamente excluido.
Ejemplos típicos cubiertos por el todo riesgo:
*   Se te cae el portátil al suelo y se rompe la pantalla.
*   Tu hijo tira un juguete y rompe el televisor del salón.
*   Un golpe accidental daña un mueble de diseño.

## ¿Qué NO cubre nunca (exclusiones comunes)?

Incluso en las pólizas a todo riesgo, las compañías excluyen:
1.  **Daños estéticos o de desgaste:** Si el suelo se raya por el uso o el sofá se desgasta, no está cubierto.
2.  **Falta de mantenimiento:** Humedades por condensación o tuberías corroídas por el paso de los años sin mantenimiento.
3.  **Hurto fuera del hogar:** Si te dejas el móvil en una cafetería, no es robo (con violencia), sino hurto, y suele estar excluido o muy limitado.

## Veredicto: ¿Cuál elegir?

El seguro a **todo riesgo** suele costar entre un 30% y un 50% más que la póliza básica. 
*   **Elige el Todo Riesgo si:** Tienes niños pequeños en casa, mascotas activas, o posees dispositivos electrónicos y mobiliario de alto valor propensos a accidentes domésticos.
*   **Elige el Básico si:** Vives solo o en pareja, tus electrodomésticos y tecnología son estándar, o buscas simplemente cumplir con el banco y protegerte frente a grandes catástrofes (incendios, grandes inundaciones).`
  },
  {
    id: "cobertura-danos-agua-exclusiones",
    title: "La cobertura de daños por agua: lo que las aseguradoras no te dicen",
    excerpt: "Los daños por agua son el siniestro más común en España, y a la vez el que más disputas genera. Conoce qué tuberías están cubiertas y qué se considera falta de mantenimiento.",
    category: { name: "Coberturas", slug: "coberturas" },
    date: "08 Jun 2026",
    readTime: "Lectura de 7 min",
    imageGradient: "from-teal-400 to-emerald-600",
    author: "Carlos M. (Jurista)",
    content: `Los daños por agua representan casi el 40% de los siniestros declarados en España. A pesar de ser la cobertura más utilizada, también es la fuente principal de denegaciones de siniestros y disputas entre clientes y compañías.

## Lo que suele estar cubierto

Por norma general, tu seguro responderá ante:
*   **Localización y reparación de la avería:** Encontrar la tubería rota que causa la fuga y repararla.
*   **Daños propios:** Reparar la pared dañada, la pintura o cambiar el parqué afectado por el agua.
*   **Daños a terceros (Responsabilidad Civil):** Si tu gotera ha dañado el techo del vecino de abajo, tu seguro asumirá el coste de pintores y reparaciones en su casa.

## Las exclusiones ocultas que debes conocer

Aquí es donde entra la letra pequeña que suele motivar las denegaciones:
1.  **Falta de mantenimiento (Corrosión):** Si la tubería se ha roto porque es de plomo antiguo o tiene un desgaste obvio de años sin mantenimiento, el seguro pagará los daños que cause el agua (pintura, gotera del vecino), pero **no pagará la reparación de la tubería en sí**. Te tocará contratar a un fontanero por tu cuenta para cambiar ese tramo.
2.  **Grifos abiertos y descuidos:** Dejar un grifo abierto suele estar cubierto por la Responsabilidad Civil (daños al vecino), pero algunas pólizas baratas excluyen o limitan los daños en tus propios bienes si consideran que hubo negligencia grave.
3.  **Humedades por condensación:** Si tus paredes tienen moho debido a la falta de ventilación o fallos térmicos de la estructura, esto no es un siniestro accidental y ningún seguro lo cubrirá.

## Consejos para reclamar con éxito

Si sufres una fuga de agua:
*   **Haz fotos y vídeos de inmediato:** Antes de tocar nada o de que venga el fontanero de urgencia.
*   **No tires las piezas rotas:** Si viene un fontanero privado porque el seguro tarda en responder, pídele que te deje el tramo de tubería afectado. El perito de la aseguradora querrá examinarlo.
*   **Revisa el límite de RC:** Asegúrate de que tu cobertura de Responsabilidad Civil sea de al menos 150.000€, ya que una fuga severa que dañe varios pisos inferiores puede superar rápidamente los límites bajos de pólizas "low cost".`
  },
  {
    id: "seguros-hogar-alquiler-responsabilidades",
    title: "Seguros de hogar para pisos de alquiler: responsabilidades de casero e inquilino",
    excerpt: "¿Quién debe asegurar el continente y quién el contenido? ¿Qué cubre la responsabilidad civil si hay un escape de agua? Te lo explicamos de forma sencilla y directa.",
    category: { name: "Tipos de Vivienda", slug: "tipos-de-vivienda" },
    date: "05 Jun 2026",
    readTime: "Lectura de 6 min",
    imageGradient: "from-amber-400 to-orange-500",
    author: "Elena R. (Abogada)",
    content: `El mercado del alquiler genera muchas dudas sobre qué seguros son necesarios y quién debe pagarlos. ¿Debe el inquilino contratar un seguro si el casero ya tiene uno? La respuesta corta es **sí**, y a continuación explicamos detalladamente por qué.

## Continente vs. Contenido: La división clave

Para entender los seguros en alquiler, debemos diferenciar estos dos conceptos:
*   **Continente (La estructura):** Paredes, techos, suelos, tuberías e instalaciones fijas. Su aseguramiento es responsabilidad del **propietario (casero)**.
*   **Contenido (Lo que hay dentro):** Muebles, electrodomésticos no encastrados, ropa, ordenadores y objetos personales. Su aseguramiento depende de quién sea el dueño de los objetos.

## ¿Qué debe asegurar el Propietario?

El casero debe contratar un seguro que cubra el **continente** al 100% y el **contenido que él haya aportado** (por ejemplo, si el piso se alquila amueblado). 
Además, necesita una cobertura de **Responsabilidad Civil de Propietario**. Si una tubería comunitaria o privativa del piso revienta y moja al vecino, el responsable legal es el propietario.

## ¿Qué debe asegurar el Inquilino?

El inquilino comete un grave error al pensar que el seguro del casero le protege. El seguro del propietario **no cubre las pertenencias del inquilino** ni su responsabilidad civil personal.
El inquilino debe contratar un seguro específico para inquilinos que incluya:
1.  **Contenido propio:** Para proteger su ropa, aparatos electrónicos y objetos valiosos frente a robos o incendios.
2.  **Responsabilidad Civil de Inquilino (RC Locativa):** Si por un despiste tuyo (un grifo abierto, una sartén que se incendia) causas daños al piso del casero o a otros vecinos, el seguro del propietario pagará el siniestro pero luego **te reclamará judicialmente la factura** a ti. Con tu propio seguro de inquilino, estarás protegido frente a estas reclamaciones.`
  },
  {
    id: "guia-reclamar-siniestro-efectiva",
    title: "Guía paso a paso: Cómo reclamar un siniestro de forma efectiva",
    excerpt: "Los plazos legales, la documentación necesaria y cómo redactar la reclamación a tu compañía de seguros para evitar retrasos y denegaciones injustas de cobertura.",
    category: { name: "Guías", slug: "guias" },
    date: "02 Jun 2026",
    readTime: "Lectura de 9 min",
    imageGradient: "from-violet-500 to-purple-600",
    author: "Carlos M. (Jurista)",
    content: `Cuando ocurre un percance en casa (un robo, una inundación o la rotura de un cristal), el momento de la reclamación puede ser estresante. Las aseguradoras siguen protocolos estrictos y cualquier error en la comunicación puede retrasar la indemnización o provocar un rechazo directo. 

## Paso 1: Actuar rápido (El plazo de los 7 días)

Según la Ley de Contrato de Seguro en España, dispones de un plazo máximo de **7 días** para comunicar el siniestro a tu aseguradora desde el momento en que lo detectas. Informar tarde puede ser motivo de penalización si se demuestra que el retraso causó mayores daños.

## Paso 2: Preservar las pruebas

*   **No tires nada:** Aunque se trate de un mueble inservible mojado o una tubería rota, no te deshagas de ellos hasta que el perito los inspeccione o la compañía te dé autorización por escrito.
*   **Fotografía todo:** Haz tomas generales y planos de detalle de los daños.
*   **Denuncia ante la policía:** En caso de robo o vandalismo, la aseguradora te exigirá una copia de la denuncia oficial antes de evaluar cualquier indemnización.

## Paso 3: Documentar el valor de las pérdidas

Prepara una lista detallada de los objetos dañados o sustraídos. Busca y adjunta:
*   Facturas de compra.
*   Extractos bancarios de los pagos.
*   Fotografías familiares donde se vea el objeto en la vivienda.
*   Manuales de usuario o cajas originales si no conservas la factura.

## Paso 4: La visita del perito

El perito es un profesional independiente enviado por la compañía para valorar el siniestro.
*   Sé honesto y no exageres las pérdidas; el perito detectará fácilmente contradicciones y podría anular la cobertura por intento de fraude.
*   Pídele una copia de su informe o pregunta bajo qué criterios está evaluando los daños.`
  },
  {
    id: "infraseguro-sobreseguro-valor-bienes",
    title: "El infraseguro y el sobreseguro: el peligro de calcular mal el valor de tus bienes",
    excerpt: "Valorar tu casa o tus muebles por encima o por debajo de su precio real puede salirte muy caro. Descubre cómo calcular el capital del continente y del contenido de forma precisa.",
    category: { name: "Guías", slug: "guias" },
    date: "28 May 2026",
    readTime: "Lectura de 8 min",
    imageGradient: "from-indigo-500 to-sky-600",
    author: "Patricia G. (Ex-Perito)",
    content: `Al contratar un seguro de hogar, la compañía nos pide declarar dos valores: el del continente (la construcción) y el del contenido (lo que hay dentro). Declarar cifras erróneas, ya sea por descuido o para abaratar la prima, genera dos problemas graves: el **infraseguro** y el **sobreseguro**.

## ¿Qué es el Infraseguro? (El verdadero peligro)

El infraseguro ocurre cuando declaras un valor **inferior** al real de tu vivienda o de tus bienes. Por ejemplo, si tus muebles y electrodomésticos valen 40.000€ pero declaras solo 20.000€ para pagar menos cuota mensual.
*   **La consecuencia (La regla proporcional):** Si sufres un incendio parcial que daña la cocina por valor de 10.000€, la aseguradora no te pagará los 10.000€ completos. Aplicará la regla proporcional: como aseguraste solo el 50% de tus bienes, solo te pagarán el 50% del siniestro, es decir, 5.000€.

## ¿Qué es el Sobreseguro? (Tirar el dinero)

El sobreseguro es el caso contrario: declaras un valor **superior** al real. Por ejemplo, valoras tu contenido en 60.000€ cuando realmente vale 30.000€.
*   **La consecuencia:** Pagarás una prima mensual inflada de manera innecesaria. En caso de siniestro total, la ley prohíbe el enriquecimiento injusto: la compañía te indemnizará únicamente por el valor real de los bienes dañados (30.000€), nunca por la suma asegurada de 60.000€.

## Cómo calcular los valores correctamente

1.  **Para el Continente:** No asegures el valor de compra o venta de la casa (que incluye el precio del suelo/solar). El suelo no se quema ni se destruye. Debes asegurar el **coste de reconstrucción**, que suele oscilar entre 900€ y 1.400€ por metro cuadrado según la calidad de los materiales.
2.  **Para el Contenido:** Haz un inventario habitación por habitación. Suma el coste de reponer a precio de nuevo toda la ropa, tecnología, electrodomésticos, vajilla, libros y mobiliario. Te sorprenderá lo rápido que sube la cifra.`
  },
  {
    id: "segunda-residencia-coberturas-indispensables",
    title: "Seguro de hogar para segundas residencias: ¿qué coberturas son indispensables?",
    excerpt: "Las viviendas que pasan mucho tiempo deshabitadas presentan riesgos específicos de robo y vandalismo. Analizamos qué pólizas específicas ofrecen la mejor protección real.",
    category: { name: "Tipos de Vivienda", slug: "tipos-de-vivienda" },
    date: "25 May 2026",
    readTime: "Lectura de 5 min",
    imageGradient: "from-rose-400 to-pink-600",
    author: "Elena R. (Abogada)",
    content: `Las viviendas de vacaciones o de fin de semana no tienen las mismas necesidades que tu residencia habitual. Al pasar semanas o meses deshabitadas, los riesgos de robo, escapes de agua no detectados a tiempo o vandalismo aumentan de forma considerable.

## Coberturas clave que debes exigir

1.  **Robo y vandalismo reforzados:** Asegúrate de que el seguro cubra los desperfectos que hagan en puertas o ventanas para entrar. Ten en cuenta que algunas pólizas exigen medidas específicas de seguridad (como rejas en ventanas si es un bajo, o cerraduras de seguridad) para indemnizar al 100%.
2.  **Daños por agua con localización ampliada:** Una gotera en un piso cerrado durante meses puede causar daños catastróficos. Es vital contar con una cobertura de localización y reparación amplia y sin franquicias elevadas.
3.  **Defensa Jurídica Completa:** Ante la preocupación por la ocupación ilegal, un buen seguro de segunda residencia debe contar con defensa jurídica específica para agilizar los trámites legales de desahucio y reclamación de daños.

## Exclusiones típicas en segundas viviendas

Las aseguradoras vigilan muy de cerca los periodos de desocupación. En las condiciones generales de la póliza suele haber cláusulas de exclusión si la vivienda permanece deshabitada de forma continua más de **30 o 90 días**. Si sufres un robo tras 4 meses sin pisar la casa, podrían reducirte la indemnización a menos que hayas declarado expresamente que se trata de una segunda residencia y pagado la prima correspondiente.`
  }
];
