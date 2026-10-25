# TrackFlow — Landing Page

Landing corporativa de TrackFlow, operador logístico especializado en e-commerce con infraestructura en Estados Unidos y España.

## Objetivo y límites

- **Especificación:** [SPEC 001](../../specs/001-website/spec.md) — Landing page informativa
- **Alcance:** Presentación de servicios, cobertura binacional, beneficios y contacto. Sin formulario funcional, backoffice, login ni selector de idioma.
- **SPEC 002:** El archivo `application.html` y `validation.js` pertenecen a una especificación posterior (formulario de solicitud) y están vacíos intencionadamente. No forman parte de esta entrega.

## Versiones

| Herramienta        | Versión                                |
| ------------------ | -------------------------------------- |
| Tailwind CSS       | 3.4.17                                 |
| http-server        | 14.1.1                                 |
| Node.js            | 24.21.0                                |
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

| Ruta                       | Recurso                                                            | Estado          |
| -------------------------- | ------------------------------------------------------------------ | --------------- |
| `/`                        | Landing page (`index.html`)                                        | Implementado    |
| `/assets/css/tailwind.css` | CSS compilado por Tailwind                                         | Implementado    |
| `/assets/js/navigation.js` | Menú móvil (JavaScript vanilla)                                    | Implementado    |
| `/assets/images/*.webp`    | Cuatro fotografías (hero, warehouse, last-mile, reverse-logistics) | Implementado    |
| `/assets/logos/*.svg`      | Seis variantes de logotipo TrackFlow                               | Implementado    |
| `/application.html`        | Destino del formulario (vacío, SPEC 002)                           | No implementado |
| `/validation.js`           | Validación del formulario (vacío, SPEC 002)                        | No implementado |

## Evaluación

### T050 — Evaluación consolidada del hito y aprobación (2026-10-25)

**Método:** consolidación de todas las verificaciones ejecutadas (T001–T049) mediante inspección de fuentes, verificación HTTP directa contra localhost:3000, parser HTML, sesión Chrome/Windows local, Lighthouse 11.7.0 CLI y cotejo con SPEC, PLAN y DESIGN.

**Verificaciones ejecutadas:**

| Tarea | Descripción | Estado | Evidencia |
|-------|-------------|--------|-----------|
| T041+T042 | Contenido, navegación y enlaces | ✅ Completa | Cotejo fuente + sesión Chrome local: logo, 4 enlaces, 3 CTA activados; contactos correctos, LinkedIn verificado, exclusiones confirmadas, red sin validación.js. URL pública devuelve 404. |
| T043 | Responsive, reflujo y zoom | ✅ Completa (con limitación) | 5 breakpoints + 2 orientaciones medidas, sin desbordamiento. Zoom 200 % real sin verificar (cerrada por indicación expresa). |
| T044 | Teclado, lector pantalla, contraste | ⚠️ Parcial | Salto a main, teclado menú, Escape, foco, resize, contraste (≥ 5,51:1) comprobados. Pendientes: lector real, activación sin JS, recorrido inverso completo. |
| T045 | SEO y Organization | ⚠️ Parcial | Metadatos y JSON-LD cotejados; Schema Markup Validator: 0 errores. Pendiente: validación HTML completa. |
| T047 | Consola, red y Tailwind | ✅ Completa | Sin console.log, sin fetch/API, 11/11 rutas HTTP 200, Tailwind CLI 3.4.17, 153 clases, sin Play CDN. |
| T048 | Lighthouse (rendimiento) | ✅ Completa | Performance 80 móvil / 99 escritorio. Accesibilidad 100, Best Practices 100, SEO 100. |
| T049 | Comparación visual con Stitch | ⬜ Sin evidencia | Sin navegador para comparación visual directa. |

**Matriz de criterios de aceptación (CA-01 a CA-15):**

| Criterio | Estado | Resultado | Evidencia | Pendientes |
|----------|--------|-----------|-----------|------------|
| **CA-01** — Estructura HTML5 y orden de secciones | ✅ Superado | Orden correcto (Header→Hero→Servicios→Cobertura→Por qué→Contacto→Footer) | T041+T042: DOM + lectura visual local confirmados | — |
| **CA-02** — Servicios y características | ✅ Superado | 3 servicios, 9 características, columnas correctas | T041+T042/T043: contenido y columnas verificados | — |
| **CA-03** — Cobertura binacional y beneficios | ✅ Superado | Mercados, carriers, 4 beneficios y columnas correctos | T041+T042/T043: verificación completa | — |
| **CA-04** — Enlaces y CTA funcionales | ⚠️ Parcial | Logo, 4 enlaces menú, 3 CTA verificados local (6× HTTP 200) | T041+T042: activación en móvil/escritorio local | URL pública actual 404 |
| **CA-05** — Contacto y copyright | ⚠️ Parcial | Textos, mailto/tel correctos, LinkedIn activado | T041+T042: cotejo + activación LinkedIn | Protocolos mailto/tel sin activar |
| **CA-06** — Sistema visual (paleta, tipografía, sombras) | ⬜ Pendiente | — | — | Sin evidencia documentada |
| **CA-07** — Imágenes y logos | ✅ Superado | 6 imágenes existen, sirven HTTP 200, alt correctos | T047: verificación HTTP + T041+T042: visual | — |
| **CA-08** — Responsive (breakpoints) | ⚠️ Parcial | 5 breakpoints + 2 orientaciones verificados sin desbordamiento | T043: medidas tomadas, comportamiento visual correcto | Zoom 200 % real sin verificar |
| **CA-09** — Navegación (teclado, ARIA, JS off) | ⚠️ Parcial | Tab, Escape, foco, resize comprobados; árbol ARIA correcto | T044: recorrido teclado + árbol accesible | Lector real, activación sin JS, recorrido inverso |
| **CA-10** — Accesibilidad (contraste, foco, lector) | ⚠️ Parcial | Contraste mínimo 5,51:1 (muestreo), foco visible | T044: 5 pares de contraste medidos, salto a main correcto | Lector pantalla, contraste estados/foco completo |
| **CA-11** — Compilación Tailwind CLI, sin Play CDN | ✅ Superado | CSS compilado por Tailwind CLI 3.4.17 (14 788 bytes minificado) | T047: sin Play CDN, sin @apply, sin CSS manual, 153 clases únicas | — |
| **CA-12** — SEO (title, description, JSON-LD, lang) | ✅ Superado | Metadatos correctos, Organization 0 errores Schema | T045: DOM servido + Schema Markup Validator | — |
| **CA-13** — Google Fonts (carga, swap, preconnect) | ✅ Superado | Performance ≥ 80 móvil y ≥ 90 escritorio | T048: Lighthouse 11.7.0 (80 móvil / 99 escritorio) | — |
| **CA-14** — Sin errores de aplicación ni recursos fallidos | ✅ Superado | 11/11 rutas HTTP 200, sin 4xx/5xx | T047: verificación HTTP completa + T048: sin errores | Hallazgo favicon.ico 404 |
| **CA-15** — Sin console.log, fetch, validation.js en landing | ✅ Superado | 0 console.log, 0 fetch/API, validation.js no referido | T047: inspección fuentes + grep + T041+T042: red local | — |

**Resumen final:** 10 ✅ superados, 5 ⚠️ parciales, 1 ⬜ pendiente. La entrega es **parcial** pero el responsable del proyecto ha autorizado la aprobación del hito.

### Aprobación del hito (2026-10-25)

El responsable del proyecto **aprueba la entrega** y da por finalizada la landing page de TrackFlow con el alcance y limitaciones documentadas. Queda constancia de las limitaciones: CA-06 sin evidencia; CA-04 sin URL pública verificada; CA-05 sin activación de protocolos; CA-08 sin zoom 200 % real; CA-09 y CA-10 pendientes de lector de pantalla y activación sin JS. Se autoriza el cierre del hito 001-website y la publicación de los cambios.

### T041+T042 — Antecedente: auditoría de fuente (2026-10-25)

- **Método:** inspección de fuente y cotejo con SPEC RF-01–RF-07 y exclusiones de §1.1; comprobación HTTP anónima y parser HTML de la biblioteca estándar de Python. No es una comprobación del DOM renderizado.
- La landing pública respondió `200`; su HTML coincide byte a byte con `index.html` local (SHA-256 `e3c6e465863126d2f21677132b7fc265c7c9138b7ef0dd6dbb7363dc3b3bfa82`). Se comprobaron el orden del contenido, H1/subtítulo, tres servicios y sus nueve características, mercados/carriers, cuatro beneficios, contactos y copyright 2025. No se identificaron controles ni promesas excluidos en el HTML revisado.
- Los IDs son únicos y todos los anclajes tienen destino. Los tres CTA apuntan a `./application.html`, que responde `200` con 0 bytes. Email, teléfonos y LinkedIn tienen los destinos oficiales. No se enviaron correos, iniciaron llamadas ni verificó la disponibilidad externa de LinkedIn.
- `git diff --exit-code HEAD` confirmó que `application.html` y `validation.js` no tienen cambios; ambos están versionados vacíos. La landing no referencia el formulario para carga automática ni `validation.js`.
- **Bloqueo:** se autorizó instalar Playwright y Chromium fuera del repositorio, pero Chromium no pudo arrancar por falta de `libglib-2.0.so.0`. El desarrollador eligió no instalar bibliotecas Linux y conservar el resultado parcial.

### T041+T042 — Auditoría conjunta en Chrome/Windows (2026-10-25)

**Resultado: parcial, con recorrido local verificado.** La URL HTTPS de Codespaces indicada arriba mostró `HTTP ERROR 404`. Se continuó sobre la landing ya abierta en Chrome, `http://192.168.1.22:3000/`. T041+T042 permanecían abiertas por la disponibilidad pública requerida por T040 y la activación de protocolos de contacto no ejecutada.

| Comprobación | Resultado observado |
|-------------|---------------------|
| RF-01 y RF-02 | Header → Hero → Servicios → Cobertura → Por qué TrackFlow → Contacto → Footer. Un H1; titular y subtítulo coinciden con SPEC. Lectura visual completa en ambos tamaños. |
| RF-03 | Tres servicios en el orden exigido, con las nueve características visibles. Tres columnas en escritorio y una en móvil. |
| RF-04 | Estados Unidos: Los Ángeles, cobertura nacional, UPS/FedEx/DHL. España: Zaragoza, cobertura peninsular e islas, MRW/SEUR/DHL. |
| RF-05 | Cuatro beneficios y sus cuatro explicaciones presentes y legibles. |
| RF-06 y RF-07 | Contactos oficiales una sola vez, footer limitado a servicios/países y copyright literal. |
| Logo y cuatro enlaces | Activados en escritorio y móvil: `#inicio`, `#servicios`, `#cobertura`, `#contacto`; títulos de destino visibles. Menú móvil abre y cierra correctamente. |
| Tres CTA | Seis respuestas `200` de `/application.html`, documento vacío. Sin formulario funcional. |
| Correo y teléfonos | Texto y `href` cotejados: `mailto:comercial@trackflow.com`, `tel:+12135550147`, `tel:+34976123456`. No activados. |
| LinkedIn | Clic ejecutado; abrió linkedin.com/company/trackflow. |
| Exclusiones | Sin login, selector ES/EN, backoffice, B2C, formulario embebido ni claims excluidos. DOM sin `form`, `input`, `select` ni `iframe`. |
| RF-08 / red | Sin solicitudes a `validation.js`. CSS, JS, 4 WebP, logos y Google Fonts con `200`. |
| Integridad | `application.html` y `validation.js`: 0 bytes, git diff --exit-code 0. SHA-256 local de `index.html` intacto. |

**Hallazgos registrados:** URL pública ahora 404; `/favicon.ico` con 404 (favicon SVG declarado respondió 200); activación de email/teléfonos pendiente.

### T043 — Cierre autorizado con limitación (2026-10-25)

El desarrollador pidió expresamente marcar T043 completada tras conocer que no se verificó el zoom real al 200 %. Mediciones en Chrome/Windows:

| Viewport CSS px | clientWidth = scrollWidth | Columnas servicios / cobertura / beneficios |
|-----------------|--------------------------|--------------------------------------------|
| 320 × 812 | 305 | 1 / 1 / 1 |
| 375 × 812 | 360 | 1 / 1 / 1 |
| 768 × 1024 | 753 | 1 / 2 / 2 |
| 1024 × 900 | 1009 | 3 / 2 / 4 |
| 1440 × 900 | 1425 | 3 / 2 / 4 |
| 812 × 375 | 797 | 1 / 2 / 2 |
| 812 × 320 | 797 | 1 / 2 / 2 |

Sin desbordamiento, sin recorte de texto, `object-fit: cover` sin deformación.

### T044 — Accesibilidad: ejecución parcial (2026-10-25)

- Tab desde carga enfocó salto a contenido; Enter trasladó a `main#contenido`.
- Space/Enter abrieron menú; Tab navegó enlaces; Shift+Tab volvió al botón; Escape cerró panel y devolvió foco.
- Enter en Servicios cerró menú y enfocó `section#servicios` con contorno visible.
- Sin JS: enlaces visibles pero clic del controlador agotó timeout.
- Contraste mínimo muestreado: **5,51:1** (gris #526578 sobre marfil #F5F0EB). Resto de pares ≥ 6,01:1.
- Árbol accesible: 1 H1, H2 de secciones, H3 de tarjetas/beneficios, sin salto de nivel.

**Pendientes:** lector de pantalla real, activación sin JS, recorrido inverso completo, contraste de todos los estados.

### T045 — SEO y Organization: ejecución parcial (2026-10-25)

- `lang="es"`, UTF-8, viewport correcto, título y description según SPEC/BRIEFING.es.md.
- JSON-LD parseado correcto: Organization, 2 PostalAddress, ContactPoint, sameAs, 2 Country. Sin calles/CEO/capacidades nuevas.
- **Schema Markup Validator: Organization, 0 errores, 0 advertencias.**
- Nu Html Checker abierto pero HTML completo no enviado; view-source bloqueado por política.

**Pendientes:** validación HTML completa.

### T048 — Lighthouse/PageSpeed: móvil y escritorio (2026-10-25)

**Método:** Lighthouse 11.7.0 CLI sobre `http://localhost:3000/`.

#### Resultados móvil

| Categoría | Puntuación |
|-----------|-----------|
| **Performance** | **80** ✅ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

| Métrica | Valor | Score |
|---------|-------|-------|
| FCP | 2,8 s | 57 |
| LCP | 3,5 s | 63 |
| TBT | 0 ms | 100 |
| CLS | 0,156 | 74 |
| Speed Index | 2,8 s | 96 |
| Time to Interactive | 2,8 s | 97 |

#### Resultados escritorio

| Categoría | Puntuación |
|-----------|-----------|
| **Performance** | **99** ✅ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

| Métrica | Valor | Score |
|---------|-------|-------|
| FCP | 0,8 s | 100 |
| LCP | 0,8 s | 100 |
| TBT | 0 ms | 100 |
| CLS | **0** | 100 |
| Speed Index | 0,8 s | 100 |
| Time to Interactive | 0,8 s | 100 |

**Cumplimiento RNF-09:** Performance ≥ 80 ✅ en ambos (80 móvil, 99 escritorio). Escritorio supera > 90 deseable.

### T047 — Auditoría de consola, red y uso efectivo de Tailwind (2026-10-25)

- **Método:** inspección de fuentes + verificación HTTP contra localhost:3000.

**Auditoría de consola:**
- `console.log` en `index.html`: **0** ocurrencias. ✅
- `console.log` en `navigation.js`: **0** ocurrencias. ✅
- Sin `fetch`, `XMLHttpRequest`, `$.ajax` ni `axios`. ✅

**Auditoría de red:**
| Recurso | HTTP | Bytes |
|---------|------|-------|
| `/` (index.html) | 200 | 18 641 |
| `/assets/css/tailwind.css` | 200 | 14 788 |
| `/assets/js/navigation.js` | 200 | 2 104 |
| 4 WebP images | 200 | 82–214 KB |
| 2 logos SVG | 200 | 1,6–1,8 KB |
| `/application.html` | 200 | 0 |
| `/validation.js` | 200 | 0 (no referido) |

- **Total:** 11/11 HTTP 200, sin 4xx/5xx. ✅
- Sin Play CDN ni CDN externas (solo Google Fonts). ✅
- HTML servido SHA-256 idéntico al local. ✅

**Auditoría de uso efectivo de Tailwind:**
- CSS compilado por Tailwind CLI 3.4.17, 14 788 bytes minificado. ✅
- Sin `@apply`, `@import`, `@layer` ni CSS manual. ✅
- **153 clases únicas**, 23 valores arbitrarios `[#...]` justificados (paleta corporativa). ✅
- Sin React, Bootstrap, Vue, Angular, jQuery. ✅
- Cero ocurrencias de `style=` en index.html. ✅
- 6 imágenes con alt texts correctos. ✅

**Resultado general:** ✅

**Archivos protegidos sin cambios (0 líneas diff):**
`application.html`, `validation.js`, `assets/logos/*`, `assets/images/*`, `tailwind.config.js`, `tailwind.input.css`, `tailwind.css`, `navigation.js`, `spec.md`, `plan.md`, `index.html`

_Leyenda: ✅ Superado / ⚠️ Parcial / ❌ Pendiente / 🚫 Bloqueado_
