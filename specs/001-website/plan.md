# PLAN 001-website: implementación de la landing de TrackFlow

- **Fecha:** 2026-10-22.
- **Estado:** propuesta técnica pendiente de revisión; no implementada ni probada.
- **Fuente principal:** [spec.md](spec.md), leída completamente.
- **Autorización de esta fase:** redactar únicamente este PLAN. La petición actual permite avanzar desde SPEC a PLAN sin modificar el estado del documento anterior. No autoriza TASKS ni IMPLEMENT.

## 1. Resumen y comprobación de entrada

Construir una página estática en HTML5, estilizada con utilidades Tailwind compiladas, con un script vanilla pequeño dedicado al menú responsive. Servir directamente `uis/website/` sin backend, router SPA, framework de componentes ni infraestructura adicional. Mantener la landing utilizable sin JavaScript para lectura y navegación básica.

La SPEC contiene contenido, límites, referencias, RF-01 a RF-08, RD-01 a RD-06, RNF-01 a RNF-10 y CA-01 a CA-15 suficientes para planificar. No se identifican contradicciones bloqueantes: la precedencia visual y las exclusiones de Stitch ya están resueltas en su apartado 1.1. Este plan no cambia los requisitos ni el copyright de 2025.

### Estado real comprobado al preparar el plan

| Elemento                     | Evidencia y consecuencia                                                                                                                                                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                 | Existe y está vacío. Hay que implementar la landing, no adaptar una implementación supuestamente válida.                                                                                                                                                  |
| `application.html`           | Existe y está vacío. Se preservará; solo se comprobará que el enlace resuelve el recurso. No representa todavía una experiencia de solicitud utilizable.                                                                                                  |
| `validation.js`              | Existe y está vacío. Se preservará y no se cargará desde la landing.                                                                                                                                                                                      |
| Recursos                     | Existen seis logos SVG y cuatro fotografías WebP con los nombres del apartado 9. La lectura del SVG intentada fue bloqueada por la configuración de Copilot; no se ha verificado su apariencia ni se conocen dimensiones/pesos de las fotografías.        |
| Documentación del componente | Existen ambos briefings y las referencias de diseño; no existe README propio ni manifiesto/configuración de ejecución en `uis/website/`. Se aplican las guías raíz y de `uis/`.                                                                           |
| SDD                          | En `.agents/` solo se localizaron la regla global de desarrollo y la skill de Memory Bank; no se ha localizado una plantilla PLAN. Se conserva la organización por funcionalidad y la trazabilidad de la SPEC sin atribuirle una plantilla no disponible. |
| Git                          | La SPEC estaba preparada para commit al comenzar. No se cambia su contenido ni el índice.                                                                                                                                                                 |
| Memory Bank                  | Continúa describiendo la ausencia de `uis/website/`. Se consulta como antecedente, no como inventario vigente, y no se modifica por restricción expresa.                                                                                                  |

**Referencias de trabajo:** [AGENTS.md](../../AGENTS.md), [regla global](../../.agents/rules/trackflow-development.md), [README raíz](../../README.md), [README raíz en español](../../README.es.md), [guía UI](../../uis/README.md), [guía UI en español](../../uis/README.es.md), [projectbrief](../../memory-bank/projectbrief.md), [techContext](../../memory-bank/techContext.md) y [progress](../../memory-bank/progress.md). Se han revisado [BRIEFING.md](../../uis/website/BRIEFING.md), [BRIEFING.es.md](../../uis/website/BRIEFING.es.md), [DESIGN.md](../../uis/website/docs/design/DESIGN.md) y visualmente [screen.png](../../uis/website/docs/design/screen.png).

## 2. Contexto técnico y decisiones propuestas

| Decisión                    | Solución y motivo                                                                                                                                                                                                                                                                                                          | Requisitos                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| PT-01. HTML estático        | Contenido completo en `index.html`, sin inyección con JavaScript. Facilita indexación, semántica y revisión del ejercicio.                                                                                                                                                                                                 | RF-01 a RF-07; RNF-01, RNF-07 |
| PT-02. Tailwind compilado   | Proponer Tailwind CSS **3.4.17**, con su CLI mediante `npx`, sin instalación ni runner en la raíz. Versión fijada para comandos reproducibles y utilidades conocidas; no se presenta como la última versión. No usar Play CDN como entrega final: introduce compilación en el navegador y dependencia de red en ejecución. | RNF-02, RNF-09, RNF-10        |
| PT-03. Configuración mínima | No crear `tailwind.config.js` ni manifiestos para este hito: utilizar valores arbitrarios literales para colores, sombras y fuentes. La CLI recibe rutas de contenido explícitas.                                                                                                                                          | RD-02 a RD-04; RNF-02         |
| PT-04. JavaScript acotado   | Un archivo `assets/js/navigation.js`, cargado con `defer`, para el menú. Sin dependencias, estado global, llamadas de red ni funciones del formulario.                                                                                                                                                                     | US-03; RF-08; RNF-04          |
| PT-05. Fuentes              | Proponer carga de Manrope 600/700/800 e Inter 400/500/600 mediante una hoja de Google Fonts con `display=swap` y subconjunto latino. Sin librería de iconos ni fuentes adicionales. Este proveedor no consta aprobado: su uso requiere confirmación antes de integrar.                                                     | RD-03; RNF-09; DEP-03         |
| PT-06. Servidor             | Proponer `http-server` **14.1.1** ejecutado con `npx`, sirviendo solo `uis/website/`. No es un servicio backend de TrackFlow.                                                                                                                                                                                              | RNF-10; CA-14                 |

Estas son propuestas concretas para revisión del PLAN, no dependencias instaladas, tecnologías adoptadas globalmente ni comandos verificados. Antes de IMPLEMENT deberán aprobarse las herramientas y el proveedor propuestos conforme a las reglas del repositorio. No se modifica ahora el Memory Bank para registrarlos.

## 3. Arquitectura y organización de archivos

| Ruta prevista                                                                         | Responsabilidad y tratamiento futuro                                                                                                                                                        |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `uis/website/index.html`                                                              | Documento principal: metadatos, JSON-LD, enlaces de estilos/fuentes, contenido semántico y navegación. Único HTML que se implementará para 001.                                             |
| `uis/website/assets/js/navigation.js`                                                 | Mejora progresiva del menú, estados y gestión de foco. Nuevo archivo únicamente cuando se autorice IMPLEMENT.                                                                               |
| `uis/website/assets/css/tailwind.input.css`                                           | Entrada de compilación con solo las tres directivas estándar `@tailwind base`, `@tailwind components` y `@tailwind utilities`. No contendrá reglas de diseño personalizadas.                |
| `uis/website/assets/css/tailwind.css`                                                 | Salida minificada generada por la CLI; no se editará manualmente. Se conservará como recurso estático para poder servir sin compilar en cada arranque.                                      |
| `uis/website/README.md`                                                               | Documentación propia futura del componente: objetivo, límites, herramientas, compilación, ejecución desde raíz, puerto, Codespaces y validaciones realmente realizadas. No se crea en PLAN. |
| `uis/website/application.html`, `uis/website/validation.js`                           | Archivos existentes reservados a 002: conservar sin cambios.                                                                                                                                |
| `uis/website/assets/logos/`, `uis/website/assets/images/`, `uis/website/docs/design/` | Recursos y fuentes aprobados: reutilizar sin modificar.                                                                                                                                     |

**Justificación del CSS:** los dos archivos previstos son entrada declarativa y salida generada de Tailwind, no una hoja de estilos de componentes hecha a mano. Son necesarios para entregar utilidades compiladas sin runtime CDN. No añadir `styles.css`, `@apply`, resets propios ni CSS inline de diseño. La futura implementación deberá autorizar estos archivos como parte de la solución propuesta.

El navegador solicitará `./assets/css/tailwind.css` y `./assets/js/navigation.js` desde `index.html`. Todas las rutas de recursos serán relativas al documento, sin prefijo `/uis/website/`. No se creará un `<base>` que altere enlaces o fragmentos.

## 4. Implementación de secciones y contenido

Crear primero el esqueleto y los textos completos de RF-01 a RF-07; después aplicar composición y utilidades. La SPEC y el briefing español son la lista de cotejo de textos, no los rótulos ilustrativos de la imagen.

| Bloque     | Estructura y tratamiento técnico                                                                                                                                                                                                                                                                                                           | Trazabilidad        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| Header     | `header` en flujo normal, sin posición fija para simplificar navegación y foco. Logo enlazado a `#inicio`; `nav` con nombre «Navegación principal» y lista de enlaces a `#inicio`, `#servicios`, `#cobertura` y `#contacto`. CTA literal hacia `./application.html`. Menú ampliable por debajo de `lg`.                                    | RF-01; CA-04        |
| Hero       | Primera sección de `main`, `id="inicio"`, H1 exacto, subtítulo íntegro de RF-02 y CTA. Texto primero y fotografía después, también en escritorio: banda abierta, sin convertir el hero en una tarjeta ni inventar una composición dividida. Limitar el ancho del texto para lectura y el alto de la imagen mediante proporción responsive. | RF-02; RD-01; CA-01 |
| Servicios  | `section id="servicios"` con H2 y tres `article` con H3, fotografía y lista `ul` de las tres características exactas de RF-03. Mismo orden DOM y visual. Tarjetas con altura flexible, no truncados ni características ocultas.                                                                                                            | RF-03; CA-02        |
| Cobertura  | `section id="cobertura"` con H2. Conservar el énfasis binacional de Stitch mediante una franja oscura con ambas ciudades, sin avión, ruta, distancia o datos en vivo. Dos artículos de mercado con H3 y listas de almacén, cobertura y carriers exactos de RF-04. Los carriers son etiquetas informativas, no botones ni «integraciones».  | RF-04; CA-03, CA-15 |
| Beneficios | Sección con H2 «Por qué TrackFlow» y lista de cuatro elementos con H3 y explicaciones de RF-05. Sin textos adicionales sobre facturación, horario bilingüe, Shopify, predicción u otras capacidades de Stitch.                                                                                                                             | RF-05; CA-03        |
| Contacto   | `section id="contacto"` con H2, franja oscura y CTA. Email y teléfonos como enlaces identificables y bloques que se apilan cuando falta espacio; no tarjetas anidadas. Sin formulario embebido, plazos de atención ni promesas nuevas.                                                                                                     | RF-06; CA-05        |
| Footer     | Logo legible, descripción breve limitada al briefing, LinkedIn y copyright literal de 2025. Enlaces externos en la misma pestaña por defecto; si se justifica otra pestaña, indicar el comportamiento y usar `rel="noopener noreferrer"`.                                                                             | RF-07; CA-05        |

Un `main id="contenido"` contendrá las secciones; un enlace de salto al inicio del documento llevará a ese destino enfocable. Los contactos oficiales aparecen una sola vez en `section#contacto`, junto al CTA, y no se repiten en `footer`. Ambos elementos conservan su semántica y comparten un fondo sólido `#06295D`, sin borde de separación y con espaciado continuo compacto. Contacto usa los destinos `mailto:comercial@trackflow.com`, `tel:+12135550147`, `tel:+34976123456`; footer conserva `https://linkedin.com/company/trackflow`.

## 5. Integración del sistema visual de Stitch

### Paleta y superficies

Aplicar la decisión de SPEC 1.1: fondo base `#F6F5F1`, tarjetas blancas y apoyos puntuales `#f7f9ff`; marino `#03142E` y corporativo `#06295D` para header, contacto, franja binacional y footer. Mantener las secciones como bandas o contenido abierto, no contenedores flotantes. La mayoría del recorrido de lectura seguirá siendo claro.

Usar `#0758BD` para CTA/enlaces y `#00DCCF` o `#00CFFF` para acentos discretos. Texto principal `#03142E`, secundario `#526578`, divisores `#ECEFF1` o borde `rgba(82,101,120,0.16)`. No introducir otra familia de colores.

En Tailwind 3, utilizar utilidades literales como `bg-[#F6F5F1]`, `text-[#03142E]`, `border-[#526578]/[0.16]`. Header con `bg-gradient-to-r from-[#03142E] via-[#06295D] to-[#03142E]`; iluminación suave mediante transparencias lineales azul/turquesa integradas en su fondo. Sin orbes, nuevas ilustraciones ni capas que tapen texto o reciban eventos. Contacto/footer usan el fondo sólido compartido `#06295D` aprobado para unificar visualmente el cierre. El contraste se medirá en el punto más desfavorable del degradado.

### Tipografía, dimensiones y componentes

- Familia en utilidades arbitrarias literales: `font-['Inter',sans-serif]` en el documento y `font-['Manrope',sans-serif]` en títulos. No generar clases por concatenación en JavaScript.
- H1 móvil: `text-4xl leading-[2.75rem] font-extrabold`; escritorio: `lg:text-[3.5rem] lg:leading-[4rem]`. H2 móvil: `text-[1.75rem] leading-9`; escritorio: `lg:text-[2.5rem] lg:leading-[3rem]`. H3: `text-2xl leading-8 font-semibold` donde el espacio lo permita.
- Cuerpo: `text-[0.9375rem] leading-6`; subtítulo destacado: `text-lg leading-7`; etiquetas: 14 px/20 px. Mantener `tracking-normal` en todos los tamaños, según RD-03, no los valores negativos del YAML.
- Tipografía adaptable por escalones y unidades `rem`, no mediante `vw` ni tamaños ligados continuamente al viewport. «Fluida» significa aquí reflujo natural, límites de ancho y adaptación progresiva sin recortes; no se usará `line-clamp`.
- Espaciado con `gap-1`, `gap-2`, `gap-4`, `gap-6`, `gap-10`, `p-4` y `p-6`. Contenedor `mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12`; separaciones de bloques basadas en el ritmo de 40 px y sus múltiplos.
- Controles `rounded-lg` (8 px), tarjetas de servicio/mercado/beneficio `rounded-2xl` (16 px), según RD-04. Sombras de nivel 1 del diseño mediante valor arbitrario literal, sin elevar todas las secciones ni añadir efectos de movimiento irrelevantes.
- CTA como enlace `inline-flex` con texto completo, fondo eléctrico y blanco; altura mínima `min-h-12 lg:min-h-11`, padding adaptable y `rounded-lg`. Hover corporativo, active marino y foco distinguible del fondo. En móvil ocuparán el ancho disponible; desde `sm` podrán ser de ancho intrínseco.

No se trasladarán selector ES/EN, login, navegación inferior duplicada, telemetría, SLA, estados «live», precisión, garantías, aduanas ni el espacio negro residual de la captura. Los ajustes por contenido completo, contraste y responsive se documentarán en la comparación visual; no se persigue una copia de píxeles defectuosos.

## 6. Estrategia mobile-first

Conservar los breakpoints por defecto de Tailwind 3: `sm` 640 px, `md` 768 px y `lg` 1024 px. Las clases sin prefijo definen la experiencia a 320/375 px. No usar `sm:` como sinónimo de móvil ni imponer una anchura fija al documento.

| Elemento        | Base móvil, referencia 375 px                                                                                        | Tablet, 768 px (`md`)                                                                                                    | Escritorio, 1440 px (`lg` ya activo)                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Header          | Logo y botón Menú en fila flexible; CTA en fila disponible o panel, sin ocultar su acceso. Panel en flujo, no modal. | Mantener menú compacto: no forzar cuatro enlaces y CTA en ancho insuficiente.                                            | Navegación visible en fila; botón oculto; CTA visible.                                                                  |
| Hero            | Texto, CTA ancho y foto debajo. H1 de 36 px con reflujo. Foto con proporción inicial 4:3.                            | Mantener el orden; ampliar el área de lectura y usar foto más panorámica si el sujeto lo permite.                        | H1 de 56 px; foto bajo el texto, proporción orientativa 16:9 y alto máximo controlado, sin altura de pantalla completa. |
| Servicios       | `grid grid-cols-1 gap-6`; tres tarjetas apiladas.                                                                    | Mantener una columna para evitar una última tarjeta huérfana; limitar ancho y no agrandar artificialmente la fotografía. | `lg:grid-cols-3`; las tres tarjetas en una fila.                                                                        |
| Cobertura       | Mercados apilados; franja binacional con ciudades en orden vertical si es necesario.                                 | `md:grid-cols-2` para los dos mercados; franja con ciudades en fila cuando quepan.                                       | Dos columnas equilibradas.                                                                                              |
| Beneficios      | `grid-cols-1`.                                                                                                       | `md:grid-cols-2`.                                                                                                        | `lg:grid-cols-4`, títulos de tamaño contenido y sin altura de texto fija.                                               |
| Contacto/footer | Enlaces y bloques apilados; teléfonos sin columnas obligatorias.                                                     | Columnas solo donde el texto quepa íntegro.                                                                              | Distribución horizontal de grupos con ancho flexible y `flex-wrap`.                                                     |

En `sm` ajustar ancho del CTA y agrupaciones pequeñas cuando aporte espacio, sin alterar la secuencia. En imágenes usar `block w-full` y proporciones reservadas; en hijos de grid/flex, `min-w-0`; permitir `break-words` en email y textos largos. No usar `w-screen` para contenedores con padding ni `overflow-x-hidden` en la página para esconder errores. Corregir la causa de cualquier desbordamiento. `overflow-hidden` solo donde corresponda al recorte de una imagen, sin cortar focos o texto.

Validar además 320, 1024 px, orientación móvil horizontal y zoom 200 %. La referencia 375 px no sustituye esos límites de RNF-03 y CA-08.

## 7. Navegación móvil y accesibilidad

### Contrato de `navigation.js`

Usar un único conjunto de enlaces dentro de `nav`, con botón nativo `type="button"`, nombre «Menú», `aria-controls` apuntando a un identificador real y `aria-expanded` sincronizado. Es un patrón de disclosure de navegación, no un widget `role="menu"`: los enlaces mantienen comportamiento nativo.

1. HTML inicial con navegación visible y botón oculto. Si JavaScript falla, los enlaces y CTA seguirán disponibles.
2. Al inicializar, localizar los elementos y comprobar su existencia. Por debajo de 1024 px mostrar el botón, cerrar el panel y reflejar `aria-expanded="false"`; cerrar mediante la clase `hidden`, que elimina los enlaces del árbol de accesibilidad y del orden de tabulación.
3. Al activar el botón, alternar visibilidad y atributo. Enter/Space funcionan por ser un botón nativo; no duplicar sus eventos de teclado con manejadores que provoquen doble activación. Tab continúa desde el botón hacia los enlaces al abrir.
4. Escape mientras el foco esté en el disclosure abierto cierra y devuelve el foco al botón. No capturar Escape globalmente sin necesidad.
5. Al elegir una sección, cerrar el panel móvil, actualizar el estado y enfocar el destino con `tabindex="-1"` antes de dejar el foco en un elemento oculto. Mantener el fragmento en la URL y desplazamiento esperado; al CTA dejarle navegar a `application.html` sin interceptarlo.
6. Sincronizar con `matchMedia('(min-width: 1024px)')`: escritorio siempre visible, botón fuera del foco; al volver a móvil, panel cerrado. Si el cambio oculta el elemento enfocado, trasladar foco a un control visible adecuado, no al `body` ni a un botón oculto.

Las clases cambiadas por el script estarán escritas literalmente y cubiertas por el escaneo de Tailwind. No usar `innerHTML`, capturar datos, bloquear scroll ni implementar una trampa de foco: el panel está en el flujo y no es un diálogo.

### Comprobaciones accesibles previstas

| Aspecto            | Implementación y forma de comprobarlo                                                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Semántica          | `lang="es"`, landmarks nativos, un H1 y H2/H3 ordenados. Inspeccionar DOM y árbol de accesibilidad; validar HTML.                                                                                                                           |
| Teclado            | Enlace de salto visible al enfocar, `tabindex="-1"` en destinos que requieran foco programático, secuencia DOM lógica. Recorrer con Tab/Shift+Tab, activar con Enter/Space y probar Escape y resize. No usar `tabindex` positivo.           |
| Foco               | Utilidades `focus-visible:outline`, grosor 2 px y offset 2 px; eléctrico sobre claro y cian/blanco sobre marino según contraste. Comprobar cada estado sin que bordes o recortes oculten el indicador.                                      |
| Contraste          | Medir texto normal >=4,5:1; texto grande y componentes pertinentes >=3:1. Blanco sobre eléctrico y marino; texto marino sobre acentos claros. Evitar blanco pequeño sobre turquesa y opacidades que reduzcan contraste.                     |
| Alternativas       | Alt significativo en imágenes informativas y `alt=""` solo si son realmente decorativas. Logo con nombre accesible TrackFlow sin repetirlo mediante etiqueta y texto adyacente. Comprobar con imágenes deshabilitadas y lector de pantalla. |
| Nombre/estado      | Texto visible en CTA/contactos; `aria-expanded` real; no añadir ARIA redundante a enlaces/botones nativos. Leer el menú abierto y cerrado con lector de pantalla y comprobar que no anuncie enlaces ocultos.                                |
| Reflujo/movimiento | Sin alturas fijas para texto, targets mínimos de 48 px móvil/44 px escritorio. No animar contenido esencial; cualquier transición respetará `motion-reduce:transition-none`. Verificar 200 % y 320 px.                                      |

Estas comprobaciones cubren US-03, RNF-01 y RNF-04 a RNF-06; las herramientas automáticas no sustituyen la lectura y el recorrido manuales.

## 8. SEO y Schema.org

En el `head`, planificar UTF-8, `viewport` con `width=device-width, initial-scale=1` sin limitar zoom, título **«TrackFlow | Logística e-commerce en Estados Unidos y España»** y meta description **«Gestión de almacenes, entregas de última milla y logística inversa para marcas de e-commerce en Estados Unidos y España. Solicita información a TrackFlow.»**

Mantener el contenido y enlaces en HTML, no detrás del menú de manera permanente ni cargados mediante JavaScript. No añadir `noindex`, bloqueo de rastreo ni canonical hacia una URL temporal de Codespaces. El `url` corporativo del JSON-LD seguirá siendo el del briefing; no implica que se controle o despliegue allí. No añadir sitemap, robots, metadatos sociales o imágenes nuevas sin necesidad o datos aprobados.

Incluir un único bloque `script type="application/ld+json"`, copiando el objeto completo del briefing español, sin traducir ni normalizar sus valores:

| Campo                       | Valor exacto previsto                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `@context`, `@type`, `name` | `https://schema.org`, `Organization`, `TrackFlow`                                                                  |
| `description`               | `Gestión de almacenes y entregas de última milla para e-commerce`                                                  |
| `url`, `foundingDate`       | `https://trackflow.com`, cadena `2009`                                                                             |
| `address[0]`                | `@type: PostalAddress`, `addressCountry: US`, `addressLocality: Los Ángeles`, `addressRegion: California`          |
| `address[1]`                | `@type: PostalAddress`, `addressCountry: ES`, `addressLocality: Zaragoza`, `addressRegion: Aragón`                 |
| `contactPoint`              | `@type: ContactPoint`, `telephone: +1-213-555-0147`, `contactType: sales`, `availableLanguage: [Spanish, English]` |
| `sameAs`                    | Array con `https://linkedin.com/company/trackflow`                                                                 |
| `areaServed`                | Array de dos `Country`, con `name` `Estados Unidos` y `Spain`, respectivamente                                     |

No añadir calles, códigos postales, CEO, nombres legales, idiomas de interfaz adicionales ni horarios. Validar con un parser JSON y Schema Markup Validator; comprobar coincidencia con SPEC 7.1. La ausencia de un resultado enriquecido en Google no equivale a un error de vocabulario. Trazabilidad: RNF-07, RNF-08, CA-12.

## 9. Recursos, fuentes y rendimiento

### Inventario y rutas relativas

| Uso                        | Ruta desde `index.html`                                                                                                                        | Tratamiento previsto                                                                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                       | `./assets/images/hero.webp`                                                                                                                    | Imagen visible principal: `loading="eager"`, prioridad alta si es candidata LCP; no lazy.                                                                                              |
| Almacenes                  | `./assets/images/warehouse.webp`                                                                                                               | Imagen de la primera tarjeta; `loading="lazy"`, `decoding="async"`.                                                                                                                    |
| Última milla               | `./assets/images/last-mile.webp`                                                                                                               | Imagen de la segunda tarjeta; carga diferida y decodificación asíncrona.                                                                                                               |
| Logística inversa          | `./assets/images/reverse-logistics.webp`                                                                                                       | Imagen de la tercera tarjeta; carga diferida y decodificación asíncrona.                                                                                                               |
| Logo horizontal            | `./assets/logos/trackflow-horizontal-dark.svg` o `./assets/logos/trackflow-horizontal-light.svg`                                               | Elegir el que realmente tenga denominación legible sobre marino, tras inspección permitida. No adivinar la semántica del sufijo. Reutilizar en header/footer cuando el fondo coincida. |
| Otras variantes existentes | `trackflow-full-dark.svg`, `trackflow-full-light.svg`, `trackflow-symbol-dark.svg`, `trackflow-symbol-light.svg`, en la misma carpeta de logos | Inventariadas, no cargarlas todas ni sustituir el nombre por el símbolo solo.                                                                                                          |

Antes de fijar atributos `width`/`height`, obtener dimensiones intrínsecas reales o `viewBox` mediante inspección permitida; no inventarlas. Establecer esos atributos y proporciones CSS estables. Fotografías con `w-full object-cover` en un marco proporcional, comenzando por 4:3 en móvil; ajustar `object-position` y recorte solo tras ver el sujeto. Si un recorte oculta información importante, preferir altura automática o `object-contain` antes que deformar. No crear derivados ni reescribir originales sin autorización.

Los `alt` finales describirán lo que realmente se vea, no inferencias del nombre de archivo: escena logística del hero, almacén, reparto y revisión de devoluciones solo si la imagen lo confirma. No incrustar en alt los claims excluidos de Stitch. Para los logos usar `alt="TrackFlow"` y dimensiones reservadas.

No crear un `srcset` ficticio apuntando a variantes que no existen. Comprobar peso transferido y LCP de los originales; si impiden alcanzar 80, presentar evidencia y solicitar autorización para optimización o derivados, sin cambiar las fotos por genéricas.

### Fuentes y costes de ejecución

La propuesta Google Fonts requerirá aprobación explícita del proveedor. Una única solicitud CSS para ambas familias, solo pesos usados, `display=swap`, preconexión a `fonts.googleapis.com` y `fonts.gstatic.com` (esta última con `crossorigin`) y fallback `sans-serif`. Las familias se aplicarán con utilidades, sin `@font-face` propio. Comprobar que las fuentes cargan y que el cambio no desplaza contenido de forma apreciable. Si no se aprueba el proveedor, acordar autoalojamiento/licencias antes de sustituirlo; no dar por cumplido RD-03 solo por el fallback.

CSS compilado minificado, script de menú diferido y sin runtime de Tailwind, carruseles, mapas, tracking ni librerías adicionales. Reservar proporciones, evitar descargas de imágenes ocultas duplicadas y priorizar solo la imagen principal. Performance mínimo 80 móvil y escritorio, deseable >90, pendiente de medición, no garantizado por estas decisiones. Trazabilidad: RD-05, RNF-09, CA-07, CA-13.

## 10. Compilación, ejecución local y Codespaces

**Comandos propuestos para una implementación futura aprobada; no ejecutados en PLAN.** Prerrequisitos: Node.js/npm/npx disponibles, acceso al registro npm en la primera ejecución y los archivos futuros descritos en el apartado 3. La primera descarga puede pedir o requerir aprobación del entorno; `--yes` solo evita la pregunta de instalación de npx, no concede autorización de proyecto.

Desde la **raíz del repositorio**, compilación de utilidades antes de servir y cada vez que cambien clases:

```bash
npx --yes tailwindcss@3.4.17 --input ./uis/website/assets/css/tailwind.input.css --output ./uis/website/assets/css/tailwind.css --content "./uis/website/*.html,./uis/website/assets/js/*.js" --minify
```

El escaneo incluye los HTML locales para futura reutilización visual, sin modificarlos ni implementar el formulario. Las clases deberán ser completas y literales. El mismo CSS generado podrá enlazarse desde `application.html` en SPEC 002, cuando se autorice; hoy no se añadirá ese enlace. Sin watcher obligatorio, bundler ni nueva configuración raíz.

Ejecución estática desde la **misma raíz**:

```bash
npx --yes http-server@14.1.1 ./uis/website -a 0.0.0.0 -p 3000 -c-1
```

- Abrir `http://localhost:3000/` o `/index.html`; `./application.html` debe resolver `/application.html`. Sin fallback SPA que oculte errores 404.
- `-c-1` desactiva caché para desarrollo/revisión: comprobar también la primera carga sin caché en auditoría y no confundirlo con una política de producción.
- Si 3000 está ocupado, elegir otro puerto libre, por ejemplo 3001, y actualizar puerto reenviado y URL de evidencia. No detener procesos ajenos.
- En la vista Ports de Codespaces, reenviar el puerto elegido y, con autorización de quien controla el Codespace, cambiar su visibilidad a pública. Obtener la URL HTTPS mostrada por Codespaces; no inventar el nombre del host.
- Exponer solo esta web de demostración, sin secretos ni datos de clientes. Comprobar acceso sin sesión desde otra ventana antes de enviar la URL a la auditoría. Cerrar la exposición pública cuando termine la revisión.
- No modificar `.devcontainer/`, `infra/`, manifiestos ni reglas del repositorio. No usar un servidor desde la raíz que publique el monorepo completo.

El comando de servidor sirve archivos existentes sin compilar: si falta la salida Tailwind, primero hay que compilar. Ambos comandos, sus versiones, directorio, prerrequisitos, puerto, URL, limitación del formulario vacío y evidencias de validación deberán documentarse en el futuro `uis/website/README.md`. No se edita documentación plantilla en esta fase.

## 11. Estrategia de verificación y trazabilidad

No hay una suite, runner o comando de validación del componente actualmente documentado. Las siguientes son comprobaciones **previstas**, no resultados exitosos. No se crean tests ni se instalan herramientas en PLAN. Las automatizables podrán hacerse con herramientas del navegador o validadores; cualquier nueva dependencia de pruebas necesitará autorización, sin introducir una suite completa para esta landing.

| Criterios SPEC | Verificación automatizable o asistida                                                                                                       | Verificación manual necesaria                                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CA-01          | Consulta DOM: un H1, orden de secciones, IDs únicos; comparar titular y subtítulo exactos.                                                  | Lectura completa y correspondencia de encabezados con el orden visual.                                                                                                                        |
| CA-02, CA-03   | Contar tres servicios, sus características, dos mercados, carriers y cuatro beneficios; estilos calculados de grid a 375/1024/1440 px.      | Cotejar textos con RF-03 a RF-05 y comprobar composición/legibilidad.                                                                                                                         |
| CA-04          | Resolver href, fragmentos y respuesta del destino `application.html`; comprobar ausencia de 404.                                            | Activar logo, cuatro enlaces y CTA de header/hero/contacto con ratón y teclado; comprobar destino y foco. La página vacía se reportará como dependencia de 002, no como formulario funcional. |
| CA-05          | Comparar `mailto:`, `tel:`, LinkedIn y copyright con valores oficiales.                                                                     | Revisar texto visible, nombres accesibles y ausencia de datos añadidos. No iniciar llamadas ni enviar correos para probar.                                                                    |
| CA-06          | Capturas a 375, 768 y 1440 px; inspección de estilos calculados, familias y colores.                                                        | Comparación lado a lado con Stitch y DESIGN, anotando solo diferencias justificadas por SPEC 1.1, accesibilidad y responsive. No usar coincidencia exacta de píxeles como umbral.             |
| CA-07          | Network: rutas correctas, respuestas satisfactorias, tipo WebP/SVG, dimensiones reservadas, prioridades y lazy loading.                     | Inspeccionar cada imagen y logo renderizado, claridad, proporciones, recorte y correspondencia con su servicio.                                                                               |
| CA-08          | En los cinco anchos SPEC, comparar ancho del documento y viewport, detectar cajas fuera de límites y capturar pantalla.                     | Revisar zoom 200 %, orientación móvil horizontal y contenido largo; no aceptar que overflow oculto disimule fallos.                                                                           |
| CA-09          | Inspección de `aria-expanded`, visibilidad, foco y respuesta de teclado del disclosure, incluido cambio de breakpoint.                      | Recorrido Tab/Shift+Tab/Enter/Space/Escape; foco tras seleccionar sección, menú cerrado, salto a contenido y ausencia de trampas.                                                             |
| CA-10          | Auditoría de accesibilidad de Lighthouse, comprobador de contraste y árbol de accesibilidad.                                                | Lector de pantalla, nombres y estados, orden de lectura, alt y semántica; revisar manualmente hallazgos no automatizables.                                                                    |
| CA-11          | Revisar recursos y HTML/clases fuente: CSS compilado Tailwind, sin runtime CDN ni frameworks extra; clases responsive presentes.            | Justificar la entrada CSS estándar y confirmar que no hay estilos de componentes personalizados innecesarios.                                                                                 |
| CA-12          | Validación HTML con Nu HTML Checker; parseo del JSON-LD y Schema Markup Validator; inspección de metadatos.                                 | Comparar Organization con SPEC 7.1 y briefing español; revisar título, idioma e indexabilidad. No exigir rich results garantizados.                                                           |
| CA-13          | Lighthouse o PageSpeed Insights sobre URL pública, perfiles móvil y escritorio: Performance >=80 en ambos, objetivo >90.                    | Registrar fecha, URL, versión/herramienta, perfil, configuración y condiciones; interpretar LCP, CLS y recursos antes de proponer cambios.                                                    |
| CA-14          | Comprobar proceso/puerto, respuestas de landing, CSS, JS, imágenes y destino del formulario; sin errores de consola o solicitudes fallidas. | Seguir el README desde raíz en Codespaces y abrir URL pública sin autenticación. No confundir página servida con formulario implementado.                                                     |
| CA-15          | Búsqueda de controles y afirmaciones excluidos; comprobar que no se carga `validation.js`.                                                  | Revisión editorial y de alcance: sin datos inventados ni funciones de dashboards o B2C.                                                                                                       |

Usar validadores con HTML público o sin datos sensibles; registrar sus informes cuando se ejecute la implementación. Evitar solicitudes reales a teléfonos/email y no tratar fallos externos de LinkedIn como excusa para alterar el contacto oficial.

La primera validación funcional futura debe centrarse en el contenido/navegación tocados; ampliar a responsive, teclado, SEO y rendimiento al completar esas superficies. No ejecutar suites globales. No declarar una prueba pasada por estar planificada; si hay fallos, respetar el límite del repositorio de dos intentos de corrección y reportar el bloqueo.

## 12. Dependencias, riesgos y condiciones de cierre

| Riesgo o dependencia                           | Tratamiento y decisión pendiente                                                                                                                                                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SVG/fotografías no inspeccionables por Copilot | No eludir exclusiones. Necesitar inspección permitida o confirmación del desarrollador antes de fijar variante de logo, dimensiones, alt y recortes. Sus rutas y uso están definidos; no se generan recursos nuevos.      |
| Herramientas/proveedor aún no adoptados        | Revisar PT-02, PT-05 y PT-06 antes de instalar/descargar/integrar. Aprobar la generación CSS y la fuente externa, o revisar el plan con una alternativa autorizada. La selección en PLAN no concede permiso de IMPLEMENT. |
| Pesos de imágenes y fuentes desconocidos       | Medir transferencia/LCP durante implementación. Si requieren modificar originales, detener esa optimización y pedir permiso con evidencia; no prometer 80/90 sin auditoría.                                               |
| Formulario vacío                               | Mantener `application.html` y `validation.js` intactos. CA-04 y CA-14 prueban navegación/disponibilidad, no envío ni campos. La experiencia comercial completa depende de 002.                                            |
| Divergencias Stitch/briefing                   | Aplicar SPEC 1.1 y RF-01 a RF-07; preservar composición, no claims inventados, controles ajenos ni copyright de 2024. No editar las referencias.                                                                          |
| Plantilla SDD no disponible                    | Seguir el formato por funcionalidad y trazabilidad aquí definido; si se aporta otra plantilla, revisar compatibilidad, sin afirmar cumplimiento no verificable.                                                           |
| Memory Bank desactualizado                     | No usarlo para negar archivos comprobados ni registrar decisiones como adoptadas. Su sincronización será una tarea separada autorizada.                                                                                   |
| Auditoría pública y red externa                | Acceso al registro npm/fuentes y visibilidad de puerto sujetos al entorno. Si la política impide exponerlo, registrar bloqueo y acordar alternativa antes de declarar CA-13/CA-14 satisfechos.                            |

La identidad podrá reutilizarse en 002 compartiendo recursos, fuentes y CSS compilado; no se extraerá ahora una librería o paquete compartido ni se modificarán sus archivos. Este PLAN no incluye campos, reglas de validación, envío ni código del formulario.

**Entregable actual:** únicamente `specs/001-website/plan.md`. La revisión documental no demuestra que la landing funcione ni que los comandos hayan sido ejecutados. Quedan pendientes aprobación del plan y decisiones señaladas, ejecución de verificaciones en la futura implementación y autorización expresa para cualquier siguiente fase. **Detenerse en PLAN; no crear TASKS ni implementar.**
