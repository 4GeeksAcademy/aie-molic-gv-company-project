# TrackFlow — Landing Page

Landing corporativa de TrackFlow, operador logístico especializado en e-commerce con infraestructura en Estados Unidos y España.

## Objetivo y límites

- **Especificación:** [SPEC 001](../../specs/001-website/spec.md) — Landing page informativa
- **Alcance:** Presentación de servicios, cobertura binacional, beneficios y contacto. Sin formulario funcional, backoffice, login ni selector de idioma.
- **SPEC 002:** El archivo `application.html` y `validation.js` pertenecen a una especificación posterior (formulario de solicitud) y están vacíos intencionadamente. No forman parte de esta entrega.

## Versiones

| Herramienta | Versión |
|-------------|---------|
| Tailwind CSS | 3.4.17 |
| http-server | 14.1.1 |
| Node.js | 24.21.0 |
| Navegador objetivo | Chrome 130+ / Firefox 130+ / Edge 130+ |

## Prerrequisitos

- Node.js ≥ 18 (para Tailwind CLI y http-server)
- npm (incluido con Node.js)

## Comandos desde la raíz del monorepo

### 1. Compilar Tailwind (generar CSS)

```bash
npx tailwindcss@3.4.17 -i ./uis/website/assets/css/tailwind.input.css -o ./uis/website/assets/css/tailwind.css --minify -c ./uis/website/tailwind.config.js
```

> **Nota:** Recompilar después de cualquier cambio de clases en HTML o JS. La configuración de Tailwind escanea `./uis/website/**/*.{html,js}`.

### 2. Servir la landing localmente

```bash
npx http-server@14.1.1 ./uis/website -a 0.0.0.0 -p 3000 -c-1
```

- **Puerto predeterminado:** 3000
- **Puerto alternativo:** Si el 3000 está ocupado, usar otro (ej. `-p 3001`).
- **Caché:** Desactivada con `-c-1` para desarrollo.

### 3. Acceder

Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

### 4. Codespaces (despliegue para revisión)

1. Seguir los pasos 1 y 2 dentro del Codespaces.
2. Una vez sirviendo, reenviar el puerto 3000 a público.
3. Compartir la URL HTTPS generada (ej. `https://<hash>-3000.app.github.dev`).

### Estado de revisión en Codespaces (2026-10-25)

- El puerto 3000 sirve únicamente `uis/website/` con el comando documentado. La landing respondió `200` tanto en `localhost` como desde la URL HTTPS de Codespaces, sin autenticación:
  [https://curly-engine-xjw775j647gfp75g-3000.app.github.dev/](https://curly-engine-xjw775j647gfp75g-3000.app.github.dev/)
- Verificados sin sesión: CSS compilado, JavaScript de navegación, las cuatro imágenes WebP, los seis logos SVG y `/application.html`; todos respondieron `200`. `application.html` está vacío (0 bytes), según el alcance pendiente de SPEC 002.
- La URL es temporal y no es el dominio corporativo. Mientras el puerto esté configurado como público, cualquiera que tenga la URL puede consultar la web y los recursos servidos. El servidor está limitado al directorio `uis/website/`; no se sirve la raíz del monorepo. Mantener el puerto público solo durante la revisión y volverlo privado al terminar.
- **T040 completada** para la disponibilidad pública y el acceso anónimo comprobado. La autorización de auditoría pública no equivale a aceptar los criterios restantes ni a afirmar que el formulario esté implementado.

## Rutas servidas

| Ruta | Recurso | Estado |
|------|---------|--------|
| `/` | Landing page (`index.html`) | Implementado |
| `/assets/css/tailwind.css` | CSS compilado por Tailwind | Implementado |
| `/assets/js/navigation.js` | Menú móvil (JavaScript vanilla) | Implementado |
| `/assets/images/*.webp` | Cuatro fotografías (hero, warehouse, last-mile, reverse-logistics) | Implementado |
| `/assets/logos/*.svg` | Seis variantes de logotipo TrackFlow | Implementado |
| `/application.html` | Destino del formulario (vacío, SPEC 002) | No implementado |
| `/validation.js` | Validación del formulario (vacío, SPEC 002) | No implementado |

## Evaluación

### T041+T042 — Antecedente: auditoría de fuente (2026-10-25)

- **Método:** inspección de fuente y cotejo con SPEC RF-01–RF-07 y exclusiones de §1.1; comprobación HTTP anónima y parser HTML de la biblioteca estándar de Python. No es una comprobación del DOM renderizado.
- La landing pública respondió `200`; su HTML coincide byte a byte con `index.html` local (SHA-256 `e3c6e465863126d2f21677132b7fc265c7c9138b7ef0dd6dbb7363dc3b3bfa82`). Se comprobaron el orden del contenido, H1/subtítulo, tres servicios y sus nueve características, mercados/carriers, cuatro beneficios, contactos y copyright 2025. No se identificaron controles ni promesas excluidos en el HTML revisado.
- Los IDs son únicos y todos los anclajes tienen destino. Los tres CTA apuntan a `./application.html`, que responde `200` con 0 bytes. Email, teléfonos y LinkedIn tienen los destinos oficiales. No se enviaron correos, iniciaron llamadas ni verificó la disponibilidad externa de LinkedIn.
- `git diff --exit-code HEAD` confirmó que `application.html` y `validation.js` no tienen cambios; ambos están versionados vacíos. La landing no referencia el formulario para carga automática ni `validation.js`. La ausencia de solicitudes en ejecución todavía no se ha comprobado.
- **Bloqueo:** se autorizó instalar Playwright y Chromium fuera del repositorio, pero Chromium no pudo arrancar por falta de `libglib-2.0.so.0`. El desarrollador eligió no instalar bibliotecas Linux y conservar el resultado parcial. No hubo clics automatizados, capturas ni revisión visual.
- **Pendientes de aquella sesión:** clics, lectura visual y red. La sesión siguiente aporta esas comprobaciones locales; no convierte la evidencia pública histórica en disponibilidad actual.

### T041+T042 — Auditoría conjunta en Chrome/Windows (2026-10-25)

**Resultado: parcial, con recorrido local verificado.** La URL HTTPS de Codespaces indicada arriba mostró `HTTP ERROR 404`. Se continuó sobre la landing ya abierta en Chrome, `http://192.168.1.22:3000/`, sin arrancar servidores, instalar herramientas ni cambiar exposición de puertos. T041+T042 permanecen abiertas por la disponibilidad pública requerida por T040 y la activación de protocolos de contacto no ejecutada.

Método: lectura de fuente, DOM/árbol accesible, capturas revisadas durante la sesión, clics y Enter mediante el navegador conectado, y eventos Network de Chrome DevTools Protocol. Viewports: escritorio 1920 × 855 y móvil 375 × 812 CSS px. Se restauró el viewport y se cerró la pestaña temporal. No se guardaron capturas adicionales ni se ejecutó una suite: el componente no tiene un comando de pruebas documentado. Esta revisión no sustituye T043, T044 ni T047.

| Comprobación | Resultado observado |
|-------------|---------------------|
| RF-01 y RF-02 | Header → Hero → Servicios → Cobertura → Por qué TrackFlow → Contacto → Footer. Un H1; titular y subtítulo coinciden con SPEC al normalizar espacios/saltos de línea. Lectura visual completa en ambos tamaños. |
| RF-03 | Tres servicios en el orden exigido, con las nueve características visibles. Tres columnas en escritorio y una en el móvil comprobado. |
| RF-04 | Estados Unidos: Los Ángeles, cobertura nacional, UPS/FedEx/DHL. España: Zaragoza, cobertura peninsular e islas, MRW/SEUR/DHL. Dos columnas en escritorio y una en móvil. |
| RF-05 | Cuatro beneficios y sus cuatro explicaciones presentes y legibles. Las explicaciones 2–4 comienzan con mayúscula por estar en párrafos independientes; se conserva su contenido. |
| RF-06 y RF-07 | Contactos oficiales una sola vez, descripción del footer limitada a servicios/países y copyright literal «© 2025 TrackFlow. Todos los derechos reservados.». |
| Logo y cuatro enlaces | Activados en escritorio y móvil: `#inicio`, `#servicios`, `#cobertura`, `#contacto`; títulos de destino visibles, sin quedar tapados. El foco se sitúa en la sección. En móvil el menú abre y se cierra al elegir destino (`aria-expanded` vuelve a `false`). Inicio también se activó con Enter. |
| Tres CTA | Header, hero y contacto activados por clic en escritorio y Enter en móvil: seis respuestas `200` de `/application.html`, con documento vacío. No se acredita un formulario funcional. |
| Correo y teléfonos | Texto y `href` cotejados en DOM: `mailto:comercial@trackflow.com`, `tel:+12135550147`, `tel:+34976123456`. No se activaron los protocolos externos; no se iniciaron llamadas ni correos. Su activación permanece sin verificar. |
| LinkedIn | Clic ejecutado; abrió la página de empresa en `https://www.linkedin.com/company/trackflow`, a partir del destino oficial `https://linkedin.com/company/trackflow`. No se valida la identidad comercial de la página externa. |
| Exclusiones | Sin login, selector ES/EN, backoffice, funciones B2C, formulario embebido ni claims excluidos de SPEC §1.1. DOM sin `form`, `input`, `select` ni `iframe`. |
| RF-08 / red | Antes de activar CTA, no hubo solicitudes a `application.html` ni `validation.js`; el primero se solicitó como navegación al activar los CTA. Tampoco se observó `validation.js` durante los recorridos. CSS, navegación, cuatro WebP, logos utilizados y Google Fonts respondieron `200`. |
| Integridad | `application.html` y `validation.js`: 0 bytes; `git diff --exit-code HEAD -- uis/website/application.html uis/website/validation.js` terminó con código 0. SHA-256 local de `index.html` igual al registrado en la sesión anterior. No se obtuvo una nueva comparación byte a byte del HTML servido; sí se cotejó su contenido renderizado. |

**Hallazgos y cierre pendiente:**

- Restablecer o aportar la URL pública de revisión y verificar su disponibilidad antes de cerrar la dependencia T040. Su comprobación histórica con `200` se conserva; actualmente devuelve `404`.
- La sesión registró solicitudes a `/favicon.ico` con `404`, aunque el favicon SVG declarado respondió `200`. No se atribuye su origen sin investigación; revisar en T047. Los destinos internos y los seis accesos por CTA no devolvieron `404`.
- Queda sin ejecutar la activación de email/teléfonos. Los valores oficiales están comprobados; no se deben iniciar llamadas ni enviar correos al completar esta comprobación.
- Aplicación, formulario, estilos y recursos intactos. No se modificaron infraestructura ni datos de contacto para resolver hallazgos.

| Criterio | Estado | Evidencia |
|----------|--------|-----------|
| CA-01 | ✅ | DOM y lectura visual local: orden, H1 y subtítulo comprobados. |
| CA-02 | ✅ | Contenido y columnas de servicios comprobados en T041+T042/T043. |
| CA-03 | ✅ | Mercados, carriers, beneficios y columnas comprobados en T041+T042/T043. |
| CA-04 | ⚠️ | Logo, menú y tres CTA verificados en móvil/escritorio local; disponibilidad pública actual pendiente. |
| CA-05 | ⚠️ | Contactos/copyright correctos y LinkedIn activado; protocolos mailto/tel sin activar. |
| CA-06 | ⬜ | — |
| CA-07 | ⬜ | — |
| CA-08 | ⚠️ | T043 cerrada por indicación del desarrollador; zoom real 200 % sin verificar. |
| CA-09 | ⚠️ | Teclado, foco y resize comprobados; activación sin JS pendiente. |
| CA-10 | ⚠️ | Árbol accesible y contraste de texto muestreado correctos; lector y estados completos pendientes. |
| CA-11 | ⬜ | — |
| CA-12 | ⚠️ | Metadatos y Organization cotejados; Schema sin errores/advertencias. HTML completo pendiente. |
| CA-13 | ✅ | Performance ≥ 80/100 en móvil (80) y escritorio (99) con Lighthouse 11.7.0. LCP 3,5 s/0,8 s; CLS 0,156/0. |
| CA-14 | ⚠️ | Acceso local y CTA 200; Codespaces ahora 404. Hallazgo favicon.ico y cierre de red pendientes de T047. |
| CA-15 | ✅ | Fuente, DOM, lectura visual y red local: sin funciones excluidas ni carga de validation.js. |

*Leyenda: ✅ Superado / ⚠️ Parcial / ❌ Pendiente / 🚫 Bloqueado*

### T043 — Cierre autorizado con limitación (2026-10-25)

El desarrollador pidió expresamente marcar T043 completada tras conocer que no se verificó el zoom real al 200 %. Se conserva esa limitación; el cierre no constituye una prueba de zoom superada ni aceptación global del hito.

Mediciones de la sesión anterior en Chrome/Windows sobre la URL local, acompañadas de inspección visual de menús, textos, fotografías y grupos:

| Viewport CSS px | clientWidth = scrollWidth | Columnas servicios / cobertura / beneficios |
|-----------------|--------------------------|--------------------------------------------|
| 320 × 812 | 305 | 1 / 1 / 1 |
| 375 × 812 | 360 | 1 / 1 / 1 |
| 768 × 1024 | 753 | 1 / 2 / 2 |
| 1024 × 900 | 1009 | 3 / 2 / 4 |
| 1440 × 900 | 1425 | 3 / 2 / 4 |
| 812 × 375 | 797 | 1 / 2 / 2 |
| 812 × 320 | 797 | 1 / 2 / 2 |

La diferencia de 15 px corresponde al espacio de la barra vertical. No se detectaron elementos de contenido fuera del ancho útil ni desbordamiento de texto en las medidas; `overflow-x` de html/body era `visible`. Fotografías cargadas con `object-fit: cover`, sin deformación observada. No se guardaron capturas adicionales. Los atajos de zoom no produjeron una medición de 200 %; el intento de control nativo terminó por no poder identificar con seguridad la URL activa. El viewport temporal se restauró.

### T044 — Accesibilidad: ejecución parcial (2026-10-25)

Auditoría sobre la landing local mediante Chrome conectado, a 375 px y con transición a 1024 px. Aplicación en solo lectura, sin instalar herramientas.

- Tab desde la carga enfocó el salto a contenido, visible en captura; Enter trasladó el foco a `main#contenido`.
- Space y Enter abrieron el menú. Tab pasó a Inicio; Shift+Tab volvió al botón. Escape cerró el panel y devolvió el foco al botón; el siguiente Tab saltó al CTA, sin entrar en enlaces ocultos.
- Enter en Servicios cerró el menú y enfocó `section#servicios`; el contorno de foco fue visible. Al pasar de móvil a escritorio con foco en navegación se mantuvo un enlace visible; al volver a móvil el panel quedó cerrado y el foco pasó al botón.
- Recorrido hacia delante con menú abierto: Inicio, Servicios, Cobertura, Contacto, CTA header, CTA hero, email, dos teléfonos, CTA contacto y LinkedIn; después el foco abandonó los enlaces del documento. No se observó una trampa en este recorrido. No equivale a una revisión exhaustiva con lector de pantalla.
- Árbol accesible con nombres de navegación, botón, regiones, enlaces y textos alternativos; un H1, secciones H2 y tarjetas/beneficios H3, sin salto de nivel observado.
- Con ejecución JavaScript deshabilitada y página recargada, el árbol mostró los cuatro enlaces y el CTA, sin botón de menú. El intento de clic del controlador agotó el tiempo de espera de `Runtime.evaluate`; no se acredita activación sin JS. Se restauró inmediatamente la ejecución de JavaScript y se recargó la página.
- Contraste calculado desde estilos computados de texto visible y sus fondos, componiendo alfa y tomando el peor extremo del degradado: gris sobre marfil **5,51:1**, gris sobre blanco **6,01:1**, blanco sobre CTA azul **6,69:1**, blanco al 70 % sobre degradado **7,60:1**, turquesa sobre degradado **8,19:1**. El resto de pares muestreados dio valores superiores. Es una comprobación de texto en estado normal, no una medición completa de todos los controles/estados.

**Pendiente para cerrar:** recorrido con lector de pantalla real, activación de navegación sin JS, recorrido inverso completo y contraste de todos los estados interactivos e indicadores de foco. T044 permanece abierta. JS y viewport restaurados; pestaña de auditoría cerrada.

### T045 — SEO y Organization: ejecución parcial (2026-10-25)

- Inspección del DOM servido: `lang="es"`, UTF-8, viewport `width=device-width, initial-scale=1`, título «TrackFlow | Logística e-commerce en Estados Unidos y España» y description «Gestión de almacenes, entregas de última milla y logística inversa para marcas de e-commerce en Estados Unidos y España. Solicita información a TrackFlow.». Sin canonical temporal ni meta robots restrictivo observado. El contenido está presente incluso en el árbol obtenido sin JS; no se afirma indexación efectiva en buscadores.
- `JSON.parse` del JSON-LD servido correcto. Comparados todos los valores con SPEC §7.1 y BRIEFING.es.md: Organization/TrackFlow, descripción, URL, foundingDate `2009`, dos PostalAddress (US/Los Ángeles/California y ES/Zaragoza/Aragón), ContactPoint (teléfono, sales, Spanish/English), sameAs y dos Country (Estados Unidos/Spain). Sin calles, códigos postales, CEO ni capacidades nuevas.
- Se envió únicamente el fragmento JSON-LD servido, envuelto en su etiqueta script, a [Schema Markup Validator](https://validator.schema.org/). Resultado observado: **Organization, 0 errores, 0 advertencias**. No se presenta como validación del HTML completo ni como prueba de veracidad empresarial.
- [Nu Html Checker](https://validator.w3.org/nu/) abrió correctamente, pero no se llegó a enviar el HTML completo. El intento de obtener la fuente servida mediante `view-source:` fue rechazado por la política del navegador (solo HTTP/HTTPS); no se eludió el bloqueo. No hay resultado de validación HTML de esta sesión.

**Pendiente para cerrar:** validar el HTML completo de la entrega y resolver el cierre pendiente de T044. T045 permanece abierta. No se modificaron metadatos ni código; las pestañas temporales de validadores se cerraron.

### T048 — Lighthouse/PageSpeed: móvil y escritorio (2026-10-25)

**Método:** Lighthouse 11.7.0 vía CLI, perfil móvil (emulated Moto G4, throttling applied) y perfil escritorio (emulated desktop, no throttling), sobre `http://localhost:3000/`. Herramienta/versión registradas. La URL pública de Codespaces devuelve `404`; se usa la alternativa local documentada en T048. Informes JSON conservados localmente como `lighthouse-report.json` y `lighthouse-desktop-report.json`.

#### Resultados móvil

| Categoría | Puntuación |
|-----------|-----------|
| **Performance** | **80** ✅ (umbral ≥ 80) |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

**Métricas principales (móvil):**

| Métrica | Valor | Score |
|---------|-------|-------|
| First Contentful Paint (FCP) | 2,8 s | 57 |
| Largest Contentful Paint (LCP) | 3,5 s | 63 |
| Total Blocking Time (TBT) | 0 ms | 100 |
| Cumulative Layout Shift (CLS) | 0,156 | 74 |
| Speed Index | 2,8 s | 96 |
| Time to Interactive | 2,8 s | 97 |

**Hallazgos relevantes (móvil):**
- **Render-blocking resources:** Google Fonts CSS (820 ms wasted) y `tailwind.css` (302 ms wasted). Se asume el coste de las fuentes externas autorizadas; no se inlining el CSS por diseño Tailwind compilado.
- **Text compression:** El `http-server` no comprime respuestas; ~14 KB desperdiciados en HTML y ~11 KB en CSS. Compresión desactivada por simplicidad del servidor de desarrollo; no aplica en producción.
- **Image sizing:** Algunas imágenes (hero, warehouse, reverse-logistics) tienen dimensiones reales mayores que las mostradas. Es esperable con imágenes responsivas fijas sin `srcset`.
- **CLS 0,156:** Provocado principalmente por la carga diferida de imágenes y la carga de Google Fonts. Afecta el score de rendimiento.
- **bfcache:** Bloqueado por `cache-control: no-store` del servidor de desarrollo.

#### Resultados escritorio

| Categoría | Puntuación |
|-----------|-----------|
| **Performance** | **99** ✅ (objetivo preferente > 90) |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

**Métricas principales (escritorio):**

| Métrica | Valor | Score |
|---------|-------|-------|
| First Contentful Paint (FCP) | 0,8 s | 100 |
| Largest Contentful Paint (LCP) | 0,8 s | 100 |
| Total Blocking Time (TBT) | 0 ms | 100 |
| Cumulative Layout Shift (CLS) | 0 | 100 |
| Speed Index | 0,8 s | 100 |
| Time to Interactive | 0,8 s | 100 |

**Observaciones (escritorio):**
- Rendimiento excelente (99/100). Sin throttling y con más ancho de banda, las fuentes y el CSS se cargan sin impacto apreciable.
- CLS perfecto (0): sin desplazamiento de layout en escritorio.
- LCP en 0,8 s, muy por debajo del umbral de 2,5 s.

#### Cumplimiento de RNF-09

| Requisito | Móvil | Escritorio |
|-----------|-------|-----------|
| Performance ≥ 80/100 | ✅ **80** | ✅ **99** |
| Performance > 90/100 (deseable) | ⚠️ 80 (no alcanza; limitado por FCP/LCP/CLS en móvil) | ✅ **99** |

**Conclusión:** la landing cumple el umbral obligatorio de rendimiento (≥ 80) en ambos perfiles. Escritorio supera ampliamente el objetivo preferente (> 90). Móvil alcanza exactamente el mínimo requerido; las oportunidades de mejora identificadas (compresión, image sizing, CLS) no son bloqueantes para esta entrega y quedarían como deuda técnica para una iteración de optimización posterior.

**Peso total de página:** ~720 KB (HTML 18 KB + CSS 15 KB + JS 2 KB + 4 WebP ~621 KB + logos ~11 KB + fuentes externas).

| Criterio | Estado | Evidencia |
|----------|--------|-----------|
| CA-13 | ✅ | Performance ≥ 80/100 en móvil (80) y escritorio (99) con Lighthouse 11.7.0. LCP 3,5 s móvil / 0,8 s escritorio; CLS 0,156 móvil / 0 escritorio. |
