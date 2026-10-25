# SPEC 001-website: landing pública de TrackFlow

- **Fecha:** 2026-10-22.
- **Estado:** especificación redactada; pendiente de revisión del desarrollador. No autoriza avanzar a PLAN ni implementar.
- **Funcionalidad:** `001-website`.
- **Destino de implementación futura:** `uis/website/index.html`.
- **Stakeholder:** Miguel Torres, Director Comercial.
- **Idioma base:** español, conforme a los textos obligatorios de esta solicitud y del briefing en español. El segundo idioma es opcional y queda fuera de este alcance.

## 1. Fuentes y convenciones

| Referencia                                                                                                                                                            | Aplicación en esta SPEC                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [BRIEFING.md](../../uis/website/BRIEFING.md) y [BRIEFING.es.md](../../uis/website/BRIEFING.es.md)                                                                     | Contexto del hito, orden de secciones, servicios, cobertura, contactos y marcado Organization. Se han leído completos; sus requisitos del formulario pertenecen a otra funcionalidad.              |
| [DESIGN.md](../../uis/website/docs/design/DESIGN.md)                                                                                                                  | Sistema Corporate Tech Premium: identidad, tipografía, colores, ritmo, formas, componentes y adaptación responsive pertinentes a una landing.                                                      |
| [screen.png](../../uis/website/docs/design/screen.png)                                                                                                                | Composición visual aprobada de Stitch, inspeccionada visualmente. Referencia de jerarquía, secuencia, fotografías, tarjetas, superficies y contraste; no es fuente de nuevas promesas comerciales. |
| [CONTEXT.md](../../CONTEXT.md)                                                                                                                                        | Contexto empresarial general; sus necesidades operativas no equivalen a funcionalidades implementadas ni amplían el hito web.                                                                      |
| [AGENTS.md](../../AGENTS.md), [regla de desarrollo](../../.agents/rules/trackflow-development.md), [README raíz](../../README.md) y [guía de UI](../../uis/README.md) | Ubicación, límites, preservación de fuentes y separación entre requisitos, decisiones e implementación.                                                                                            |
| [Memory Bank](../../memory-bank/progress.md), [resumen](../../memory-bank/projectbrief.md) y [contexto técnico](../../memory-bank/techContext.md)                     | Antecedentes y decisiones pendientes. Parte de su inventario está desactualizado; no acredita el estado actual de la web.                                                                          |

**Convención SDD comprobada:** existen carpetas de funcionalidades bajo `specs/`, pero no se ha localizado una plantilla SPEC, configuración SDD ni otra especificación de referencia en este checkout. No se declara cumplimiento de una plantilla inexistente. Este documento separa alcance, escenarios, requisitos identificados y aceptación para conservar trazabilidad; si se aporta una plantilla adicional, se revisará su formato sin ampliar el alcance.

**Organización comprobada:** `specs/001-website-landing/` y `specs/002-website-form/` estaban vacías. La primera se renombra a `specs/001-website/`; la segunda se conserva. No existía `specs/001-website-form/`. No se duplican especificaciones ni se crea la SPEC del formulario en esta fase.

### 1.1 Precedencia e inconsistencias relevantes

1. El contenido obligatorio, el orden y las restricciones del ejercicio prevalecen sobre los textos o controles ilustrativos de Stitch. La captura guía la composición; `DESIGN.md` guía el sistema visual aplicable.
2. `DESIGN.md` contiene tokens azulados (`#f7f9ff`, `#001539`, `#0e5abf`) y una descripción con marfil (`#F6F5F1`), marino (`#03142E`) y azul eléctrico (`#0758BD`). Para esta landing se priorizan las superficies claras y la composición aprobada, usando el marfil descrito como base preferente, blanco y tintes claros existentes como apoyo. No se crea otra paleta ni se convierte toda la página en una superficie azul.
3. La captura es móvil, no una maqueta de escritorio. Su composición se adapta a las tres columnas de servicios y dos de cobertura exigidas por el briefing en escritorio, sin cambiar el orden del contenido.
4. No se reproducen SLA del 99,8 %, precisión del 99,98 %, entregas garantizadas en 24/48 h, distancias, conexión aérea activa, estado en vivo, promesas de facturación centralizada, integraciones con plataformas concretas ni analítica predictiva de la captura: no están autorizados por el briefing. Tampoco se añaden aduanas, control de flota, denominación «Inc.» ni otras capacidades sugeridas por el pie de la imagen.
5. Login, selector ES/EN, tablas de manifiestos, filtros, telemetría y controles de backoffice quedan fuera. La navegación inferior de la captura no es un requisito adicional; no se exige duplicar la navegación móvil. El espacio negro residual de la imagen no forma parte de la página.
6. Se conserva el copyright literal de 2025 del briefing, aunque la captura muestra 2024 y la fecha de esta SPEC es posterior. Cambiarlo requerirá aprobación, no una actualización automática.
7. Los enlaces de traducción dentro de los briefings apuntan a nombres distintos de los archivos presentes; las referencias válidas para este trabajo son las enlazadas en la tabla. No se modifican las fuentes.
8. Los recursos gráficos existen con los nombres inventariados en el apartado 6, pero su contenido está excluido de lectura por Copilot. No se da por verificada su apariencia, dimensiones ni la correspondencia entre los sufijos del logo y el fondo adecuado.

## 2. Objetivo de negocio y usuarios

TrackFlow, fundada en 2009 en Los Ángeles, presta gestión de almacenes, entregas de última milla y logística inversa en Estados Unidos y España, con centros en Los Ángeles y Zaragoza y aproximadamente 130 profesionales. Su presencia digital debe comunicar con claridad estos servicios y su operación binacional, transmitir confianza y dirigir a empresas interesadas hacia una solicitud de información.

**Usuarios principales:** responsables de operaciones, logística, compras o dirección de marcas medianas de moda, electrónica y cosmética que venden online y estudian externalizar su logística. Son potenciales clientes B2B, no destinatarios B2C buscando un paquete o una devolución.

**Resultado esperado:** el visitante comprende qué ofrece TrackFlow, dónde opera y cómo contactar o acceder al formulario. No se fija una tasa de conversión ni una métrica comercial inventada.

## 3. Alcance y exclusiones

### Incluido

- Una landing pública en español, profesional, responsive, accesible y optimizada para buscadores.
- Header, hero, servicios, cobertura, beneficios, contacto y footer, en ese orden.
- Navegación por secciones, menú móvil accesible y CTA hacia `application.html`.
- Uso de identidad y recursos locales existentes, con las referencias de Stitch obligatorias.
- HTML5 semántico, Tailwind CSS, metadatos, Organization y requisitos de rendimiento y ejecución verificables.

### Excluido

- Crear o modificar el formulario, sus campos, reglas, mensajes, validación JavaScript o simulación de envío. Son responsabilidad futura de `002-website-form`.
- Backend, persistencia, captación real de datos, envío de emails, CRM, autenticación, seguimiento de paquetes, gestión de devoluciones, dashboards o recomendación de transportistas.
- Traducción completa al inglés, selector de idioma sin funcionalidad, mapas interactivos, nuevas páginas o controles decorativos que aparenten funciones disponibles.
- Testimonios, certificaciones gráficas, clientes, tarifas, garantías, estadísticas o políticas no aportadas. La mención textual a carriers certificados se conserva porque figura en el briefing; no autoriza inventar sellos.
- Nuevas imágenes genéricas, modificación de fotografías, logos, briefings o archivos de Stitch.

**Límite de esta fase:** solo se redacta esta SPEC y se adapta la carpeta vacía autorizada. No se crean `plan.md`, `tasks.md`, código, configuraciones ni comandos supuestamente validados. Los criterios siguientes describen la aceptación de una implementación futura, no comprobaciones ya superadas.

## 4. Escenarios de usuario

### US-01. Comprender servicios y cobertura (prioridad P1)

Como responsable de una marca de e-commerce, quiero identificar los servicios y mercados para evaluar si TrackFlow encaja con mi operación.

- **Dado** que accedo a la landing, **cuando** recorro su contenido, **entonces** encuentro las secciones en el orden del briefing, los tres servicios con sus características y ambos mercados con sus carriers.
- **Dado** cualquier tamaño de pantalla admitido, **cuando** leo las tarjetas, **entonces** todos sus textos y fotografías son visibles, sin recortes de información ni desplazamiento horizontal.

### US-02. Solicitar información o contactar (prioridad P1)

Como potencial cliente empresarial, quiero acceder al formulario o usar los contactos oficiales para iniciar una conversación comercial.

- **Dado** un CTA «Solicitar información» en header, hero o contacto, **cuando** lo activo, **entonces** navego a `application.html` dentro de la misma web, sin URL provisional ni error de recurso inexistente.
- **Dado** el bloque de contacto o footer, **cuando** activo el email, un teléfono o LinkedIn, **entonces** su destino corresponde exactamente al dato oficial documentado.
- La navegación hasta la página del formulario se verifica aquí; el contenido y funcionamiento del formulario no condicionan la aceptación de esta landing salvo la disponibilidad del destino.

### US-03. Navegar en móvil y con teclado (prioridad P1)

Como visitante en móvil o usuario de teclado y tecnologías de asistencia, quiero desplazarme entre secciones y encontrar el CTA sin barreras.

- **Dado** el menú móvil cerrado, **cuando** activo su botón con teclado o puntero, **entonces** aparecen los enlaces y se comunica su estado expandido.
- **Dado** el menú abierto, **cuando** pulso Escape o selecciono un destino, **entonces** se cierra; Escape devuelve el foco al activador y la selección permite continuar en el destino sin perder la orientación.
- **Dado** un menú cerrado, **cuando** navego con Tab, **entonces** no enfoco sus enlaces ocultos y el foco permanece visible en los controles disponibles.

## 5. Requisitos funcionales y contenido obligatorio

### RF-01. Estructura y navegación

La secuencia visual y del documento será exactamente: **Header → Hero → Servicios → Cobertura → Por qué TrackFlow → Contacto → Footer**. La navegación contendrá **Inicio, Servicios, Cobertura y Contacto**, con destinos internos existentes. El logo llevará a Inicio. Los destinos no quedarán tapados por la navegación si esta es fija.

El header mostrará el logo oficial adecuado para fondo oscuro y un CTA **«Solicitar información»**. En móvil, el menú expondrá los mismos destinos y mantendrá disponible el acceso al formulario. No habrá enlaces vacíos, `#` sin destino ni botones sin acción.

### RF-02. Hero

- Un único H1 con el texto exacto: **«Logística que escala con tu e-commerce»**.
- Subtítulo exacto: **«Gestión de almacenes, entregas de última milla y logística inversa en Estados Unidos y España. Más de 15 años ayudando a marcas de moda, electrónica y cosmética a crecer sin preocuparse por la operación.»**
- CTA **«Solicitar información»**, enlazado a `application.html`.
- Fotografía local `hero.webp`, con jerarquía y relación texto/imagen coherentes con la referencia móvil. No se superponen métricas o estados inventados.

### RF-03. Servicios

Se presentarán tres tarjetas, en este orden, con las siguientes características visibles; no se ocultarán tras interacciones:

| Servicio                     | Características obligatorias                                                                                          | Fotografía local         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Gestión de Almacenes**     | Almacenamiento, picking y packing; Inventario en tiempo real; Operamos almacenes en Los Ángeles y Zaragoza.           | `warehouse.webp`         |
| **Entregas de Última Milla** | Red de carriers certificados en ambos países; Seguimiento unificado de envíos; Gestión de incidencias y devoluciones. | `last-mile.webp`         |
| **Logística Inversa**        | Gestión completa de devoluciones; Inspección y reacondicionamiento; Integración con tu plataforma de ventas.          | `reverse-logistics.webp` |

En escritorio habrá tres columnas; en móvil, una, preservando el orden. Las características son contenido comercial requerido por el briefing del ejercicio, no evidencia de que el monorepo implemente esos sistemas. No se desarrolla ninguna de esas capacidades en este hito.

### RF-04. Cobertura

| Mercado            | Información obligatoria                                                      |
| ------------------ | ---------------------------------------------------------------------------- |
| **Estados Unidos** | Almacén en Los Ángeles; Cobertura nacional; Carriers: UPS, FedEx, DHL.       |
| **España**         | Almacén en Zaragoza; Cobertura peninsular e islas; Carriers: MRW, SEUR, DHL. |

Dos columnas en escritorio y una en móvil. La representación visual binacional de Stitch puede expresar únicamente la presencia en ambas ciudades; no implica rutas aéreas, distancias, tiempos garantizados, integración técnica con carriers ni disponibilidad en tiempo real. No se sustituyen DHL por denominaciones comerciales más específicas de la captura.

### RF-05. Por qué TrackFlow

Se mostrarán exactamente los cuatro beneficios corporativos obligatorios, con sus explicaciones:

1. **Operación binacional:** El único operador con infraestructura propia en Estados Unidos y España.
2. **Más de 130 profesionales:** dedicados a tu logística.
3. **Tecnología propia:** para visibilidad total de tu inventario.
4. **Especialización e-commerce:** en moda, electrónica y cosmética.

La exclusividad y «más de 130» se conservan por exigencia expresa del briefing del ejercicio, sin ampliarlas con estadísticas ni tratarlas como validaciones externas. El contexto general describe la plantilla como aproximadamente 130 personas.

### RF-06. Contacto

- Email visible: **comercial@trackflow.com**; destino `mailto:comercial@trackflow.com`.
- Los Ángeles: **+1 213 555 0147**; destino `tel:+12135550147`.
- Zaragoza: **+34 976 123 456**; destino `tel:+34976123456`.
- CTA **«Solicitar información»** hacia `application.html`.

No se añaden direcciones postales, horarios, plazos de respuesta ni promesas comerciales sin fuente.

### RF-07. Footer

Contendrá el logo oficial legible sobre el fondo elegido, una descripción breve limitada a los tres servicios y la presencia en Estados Unidos y España, el enlace **LinkedIn** a `https://linkedin.com/company/trackflow` y el texto **«© 2025 TrackFlow. Todos los derechos reservados.»**. No se reutilizará la descripción de aduanas y flota de la captura. Los enlaces externos tendrán nombre accesible y protección apropiada si abren otra pestaña.

Los contactos oficiales de RF-06 aparecen una sola vez en `section#contacto`, junto al CTA; no se repiten en `footer`. Ambos elementos conservan su semántica y forman un único bloque visual compacto y responsive con fondo continuo `#06295D`, sin separación marcada.

### RF-08. Contrato de enlace con 002-website-form

Todos los CTA de solicitud usarán el destino relativo `application.html`, resoluble desde `uis/website/index.html` tanto localmente como en Codespaces. No habrá formulario embebido en la landing ni dependencia de `validation.js` para navegar. La existencia previa de `application.html` no acredita que el formulario esté completo. La funcionalidad futura compartirá logos, fotografías pertinentes, tipografías y paleta; no duplicará una identidad alternativa.

## 6. Diseño y recursos obligatorios

| ID    | Requisito verificable                                                                                                                                                                                                                                                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RD-01 | Mantener la estética Corporate Tech Premium y la composición de `screen.png`: header oscuro, hero con titular y CTA prominentes seguido de fotografía en móvil, servicios ilustrados, cobertura binacional, cuatro beneficios, contacto destacado y footer oscuro. No sustituirlo por otro concepto visual.                                                              |
| RD-02 | Navbar en marino profundo con degradado e iluminaciones azules suaves; acentos azul eléctrico y turquesa; mayoría de superficies claras, preferentemente marfil suave. Reservar los fondos oscuros a anclajes visuales y bloques destacados de la referencia. Los azules no dominarán las superficies de lectura.                                                        |
| RD-03 | Manrope para titulares e Inter para texto y controles. Respetar jerarquías de tamaño y altura de línea de `DESIGN.md`, con tamaños móviles específicos, sin truncar el H1 ni copiar los textos cortados de la captura. Mantener espaciado entre letras en 0 por la restricción aplicable a la futura implementación.                                                     |
| RD-04 | Ritmo de espaciado del sistema: 4, 8, 16, 24 y 40 px; márgenes orientativos de 16 px en móvil, 32 px en tablet y 48 px en escritorio; contenido limitado a 1440 px. Tarjetas claras, bordes discretos, sombras suaves y esquinas coherentes con los componentes pertinentes del diseño (controles de 8 px y tarjetas de hasta 16 px). No trasladar módulos de dashboard. |
| RD-05 | Fotografías profesionales existentes, sin sustituirlas por imágenes nuevas. Mantener sujeto reconocible, proporciones estables y recortes que no distorsionen ni oculten contenido significativo. No estirar logos ni alterar sus colores o trazados.                                                                                                                    |
| RD-06 | Adaptar la referencia móvil a tablet y escritorio sin inventar otra estructura; mantener aire visual, lectura clara y distribución progresiva. Los ajustes de contraste y legibilidad prevalecen sobre defectos ilustrativos, sin rediseñar la identidad.                                                                                                                |

**Inventario disponible:**

- Carpeta `uis/website/assets/logos/`: `trackflow-full-dark.svg`, `trackflow-full-light.svg`, `trackflow-horizontal-dark.svg`, `trackflow-horizontal-light.svg`, `trackflow-symbol-dark.svg`, `trackflow-symbol-light.svg`.
- Carpeta `uis/website/assets/images/`: `hero.webp`, `warehouse.webp`, `last-mile.webp`, `reverse-logistics.webp`.

**Selección del logo:** utilizar en navegación una variante oficial con denominación TrackFlow legible en claro sobre el fondo oscuro, preferentemente horizontal. No deducir por el sufijo `dark` o `light` cuál es correcta: verificar su apariencia antes de elegir el archivo. El símbolo solo no sustituye al nombre de la empresa en navegación. En footer, elegir la variante oficial adecuada al fondo, reutilizando recursos sin modificarlos.

## 7. Requisitos no funcionales y restricciones técnicas

| ID                                       | Requisito                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-01. HTML5                            | Documento con idioma `es`, codificación UTF-8 y viewport móvil; `header`, `nav`, un `main`, secciones identificables y `footer`. Un solo H1, H2 por sección principal y niveles inferiores sin saltos arbitrarios. Listas para agrupaciones de características y enlaces para navegación, aunque visualmente parezcan botones.                                                                                                    |
| RNF-02. Tailwind                         | Utilizar clases utilitarias de Tailwind CSS y enfoque mobile-first con variantes `sm:`, `md:` y `lg:`. Evitar CSS personalizado innecesario; las excepciones de identidad o accesibilidad deberán ser mínimas y justificadas. No usar React, Bootstrap ni frameworks adicionales. La versión, distribución de Tailwind y herramientas concretas se definirán en PLAN, sin añadirlas en esta fase.                                 |
| RNF-03. Responsive                       | Funcionar desde 320 px, con revisión a 320, 375, 768, 1024 y 1440 px. Sin scroll horizontal de página, superposiciones, textos cortados ni controles fuera de pantalla. Servicios en una columna móvil y tres en escritorio; cobertura en una y dos, respectivamente; beneficios con distribución progresiva. Imágenes fluidas y espacio reservado para evitar saltos.                                                            |
| RNF-04. Teclado y menú                   | Toda interacción operable con Tab, Shift+Tab, Enter y Space cuando corresponda. Foco visible, orden lógico, sin trampas; acceso para saltar al contenido principal. Botón de menú con nombre accesible, `aria-expanded` y asociación al panel controlado; elementos cerrados fuera de foco. Cumplir US-03 sin imponer una librería o arquitectura de menú.                                                                        |
| RNF-05. Accesibilidad visual y semántica | Contraste WCAG 2.2 AA: al menos 4,5:1 para texto normal y 3:1 para texto grande y componentes/indicadores pertinentes. No depender solo del color. Imágenes informativas con `alt` descriptivo; decorativas con alternativa vacía y sin ruido para lectores de pantalla. Logo con nombre accesible TrackFlow, sin duplicarlo innecesariamente. HTML nativo primero y ARIA solo donde aporte semántica o estado.                   |
| RNF-06. Legibilidad                      | Texto legible al ampliar al 200 %, con reflujo sin pérdida de información a 320 px de ancho. CTA con área útil de al menos 44 px de alto en escritorio y 48 px en móvil, según el sistema visual. No truncar contenido obligatorio, incluso en etiquetas o tarjetas compactas. Respetar preferencia de movimiento reducido si se añaden transiciones.                                                                             |
| RNF-07. SEO                              | Título único descriptivo que incluya TrackFlow y su actividad, meta description en español sobre servicios y mercados, contenido textual indexable y jerarquía semántica coherente. No fijar una URL pública de Codespaces como identidad corporativa permanente. Imágenes optimizadas con nombres existentes y alternativas pertinentes.                                                                                         |
| RNF-08. Organization                     | Incluir marcado Schema.org `Organization` válido, conforme al objeto del briefing español y al detalle de 7.1, sin datos empresariales inventados. No presentar su inclusión como prueba de veracidad o despliegue del dominio.                                                                                                                                                                                                   |
| RNF-09. Rendimiento                      | Lighthouse/PageSpeed Insights: puntuación Performance mínima de 80/100 en móvil y escritorio; objetivo preferente superior a 90. Usar WebP y SVG locales eficientemente, reservar dimensiones, no cargar imágenes fuera del primer viewport de forma prioritaria ni retrasar la imagen principal innecesariamente. Evitar librerías, scripts, fuentes o recursos ajenos al objetivo. No modificar los originales en esta fase.    |
| RNF-10. Ejecución y auditoría            | La futura web deberá servirse mediante un comando `npx` compatible con Codespaces. Su documentación propia indicará comando exacto, directorio de trabajo, requisitos, puerto y acceso. Debe permitir exposición mediante URL pública de Codespaces para auditoría. Hoy no hay un comando del componente verificado: elegirlo, documentarlo y probarlo queda para fases autorizadas; no se prescribe aquí un paquete no aprobado. |

### 7.1 Datos obligatorios del marcado Organization

- `@context`: `https://schema.org`; `@type`: `Organization`; `name`: `TrackFlow`.
- `description`: «Gestión de almacenes y entregas de última milla para e-commerce».
- `url`: `https://trackflow.com`; `foundingDate`: `2009`.
- Dos `PostalAddress`: país `US`, localidad `Los Ángeles`, región `California`; país `ES`, localidad `Zaragoza`, región `Aragón`. Sin inventar calles ni códigos postales.
- `contactPoint` de tipo `ContactPoint`: `telephone` `+1-213-555-0147`, `contactType` `sales`, `availableLanguage` con `Spanish` y `English`, como exige el briefing. Esto no obliga a implementar dos idiomas en la interfaz.
- `sameAs`: `https://linkedin.com/company/trackflow`.
- `areaServed`: dos elementos de tipo `Country`, con `name` `Estados Unidos` y `Spain`, respetando los datos del objeto proporcionado.

## 8. Dependencias y decisiones diferidas

- **DEP-01. Recursos:** disponibilidad de los archivos existentes bajo `uis/website/assets/` y de ambas referencias de Stitch. Su existencia está comprobada; la elección visual del SVG y las dimensiones/peso de los recursos siguen pendientes de inspección permitida.
- **DEP-02. Formulario:** `application.html` debe ser un destino accesible para los CTA; su implementación y validación pertenecen exclusivamente a `002-website-form`, que tendrá sus propios documentos cuando se autorice.
- **DEP-03. Herramientas:** PLAN deberá concretar versión y entrega de Tailwind, carga de fuentes, mecanismo mínimo de menú y comando `npx` con las aprobaciones pertinentes. La SPEC exige resultados, no instala ni selecciona nuevos proveedores, dependencias o servicios.
- **DEP-04. Auditoría futura:** se necesitará servir la implementación y disponer de la URL pública de Codespaces para registrar las mediciones. No hay auditorías ni resultados de rendimiento ejecutados durante SPEC.
- **DEP-05. Documentación del repositorio:** el Memory Bank requiere sincronización posterior porque niega carpetas hoy presentes. Esta sesión no autoriza modificarlo ni resolver la discrepancia histórica del CEO, que no debe aparecer en la landing.
- **DEP-06. Convención SDD:** si existe una plantilla fuera de este checkout, deberá aportarse para comprobar compatibilidad de formato. No bloquea la redacción de los requisitos, pero su cumplimiento no puede darse por acreditado.

## 9. Criterios de aceptación de la futura landing

Las comprobaciones se aplicarán a la implementación futura. La revisión documental de esta SPEC no las da por superadas. No se exige crear archivos de pruebas automatizadas en esta fase.

| ID    | Comprobación y resultado exigido                                                                                                                                                                                                                                                                                                                                                                                                                         | Trazabilidad                   |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| CA-01 | Recorrer el DOM y la página: Header, Hero, Servicios, Cobertura, Por qué TrackFlow, Contacto y Footer aparecen en ese orden. Solo hay un H1, con el titular literal, y el subtítulo coincide íntegramente con RF-02.                                                                                                                                                                                                                                     | RF-01, RF-02, RNF-01           |
| CA-02 | Comparar las tres tarjetas con RF-03: mismos nombres, tres características por servicio y fotografía local asignada, sin omisiones. A 1024 y 1440 px se ven tres columnas; a 320 y 375 px, una.                                                                                                                                                                                                                                                          | RF-03, RD-05, RNF-03           |
| CA-03 | Comparar cobertura con RF-04: ambos almacenes, ámbitos y listas exactas de carriers presentes; dos columnas en escritorio y una en móvil. Los cuatro beneficios y sus explicaciones están visibles.                                                                                                                                                                                                                                                      | RF-04, RF-05                   |
| CA-04 | Activar logo y cada enlace del header, en escritorio y móvil: llevan a la sección correcta, visible y no tapada. Activar todos los CTA de solicitud del header, hero y contacto: resuelven `application.html` sin recurso inexistente. No evaluar sus campos ni su validación como parte de esta SPEC.                                                                                                                                                   | RF-01, RF-08, US-02            |
| CA-05 | Verificar texto y destinos del email, los dos teléfonos y LinkedIn en contacto/footer; contrastar información corporativa y copyright literal con RF-06 y RF-07. No hay direcciones, horarios o garantías añadidos.                                                                                                                                                                                                                                      | RF-06, RF-07                   |
| CA-06 | Comparar captura móvil de la implementación a 375 px con `screen.png`: se conservan secuencia, jerarquía, header/footer oscuros, CTA destacado, fotos, tarjetas y alternancia de superficies claras. Comparar colores, tipografías, ritmo y bordes con el subconjunto aplicable de `DESIGN.md`. Las diferencias se limitan a adaptación responsive, accesibilidad y exclusiones justificadas en 1.1; no se exige igualdad de píxeles ni copiar defectos. | RD-01 a RD-06                  |
| CA-07 | Inspeccionar recursos cargados: se usan las cuatro fotografías WebP locales y logos SVG oficiales; el logo de navegación es legible sobre fondo oscuro, conserva proporción y no usa solo el símbolo. No se han introducido fotos genéricas ni modificado los recursos originales o Stitch.                                                                                                                                                              | RD-05, DEP-01                  |
| CA-08 | Revisar a 320, 375, 768, 1024 y 1440 px, en ambas orientaciones móviles: sin scroll horizontal, recortes, solapamientos ni imágenes deformadas. Aumentar texto al 200 % sin perder contenido o controles.                                                                                                                                                                                                                                                | RNF-03, RNF-06                 |
| CA-09 | Recorrer la página solo con teclado, incluido salto a main y CTA. Abrir/cerrar el menú con teclado y puntero; verificar Escape, estado expandido, foco al cerrar y enlaces ocultos no enfocables. No hay trampas ni controles sin nombre o sin acción.                                                                                                                                                                                                   | US-03, RNF-04                  |
| CA-10 | Inspeccionar landmarks, idioma, jerarquía de encabezados, alternativas de imágenes y nombres/estados con árbol de accesibilidad o lector de pantalla. Medir contraste de textos, controles y foco según RNF-05; comprobar que color no sea el único indicador.                                                                                                                                                                                           | RNF-01, RNF-05, RNF-06         |
| CA-11 | Inspeccionar HTML renderizado: Tailwind mediante utilidades y variantes responsive; ausencia de React, Bootstrap y frameworks adicionales. Cualquier CSS excepcional tiene justificación concreta y no reemplaza innecesariamente las utilidades.                                                                                                                                                                                                        | RNF-02                         |
| CA-12 | Inspeccionar título, meta description, viewport y contenido indexable. Validar sintaxis y vocabulario del marcado Organization y comparar todos los datos de 7.1 con el briefing.                                                                                                                                                                                                                                                                        | RNF-01, RNF-07, RNF-08         |
| CA-13 | Ejecutar Lighthouse o PageSpeed Insights sobre la URL pública de Codespaces en perfiles móvil y escritorio, sin autenticación de acceso a la página. Registrar URL, fecha, herramienta/versión, perfil y resultados: Performance al menos 80 en ambos; más de 90 es deseable, no el umbral obligatorio. Revisar también resultados de accesibilidad y SEO junto con CA-10 y CA-12, sin sustituir las comprobaciones manuales.                            | RNF-09, DEP-04                 |
| CA-14 | Seguir la documentación futura del componente desde el directorio indicado: el comando `npx` sirve la landing, sus assets y el destino `application.html` en Codespaces. Registrar comando probado, puerto y URL pública utilizable para auditoría; no basta abrir el archivo por `file://`.                                                                                                                                                             | RNF-10, DEP-02                 |
| CA-15 | Revisar contenido y controles: no aparecen formulario embebido, login, métricas/garantías de Stitch, backoffice, funciones B2C ni integraciones fuera de alcance. El contenido comercial exigido no se presenta como una implementación operativa del monorepo.                                                                                                                                                                                          | Apartados 1.1, 3; RF-03, RF-04 |

## 10. Cierre de la fase SPEC

El entregable de esta fase es este archivo, revisable sin implementar la web. La estructura resultante reserva `specs/001-website/` para la landing y conserva `specs/002-website-form/` para el formulario futuro, sin documentos adicionales.

Quedan pendientes la revisión y aprobación de esta SPEC, la disponibilidad de una plantilla SDD externa si la hubiera, la verificación visual permitida de los assets y las decisiones técnicas propias de PLAN. No se considera implementada ni validada la landing por la existencia de esta especificación. **No avanzar a PLAN, TASKS o implementación sin autorización expresa.**
