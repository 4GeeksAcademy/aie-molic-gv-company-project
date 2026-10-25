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

### T050 — Evaluación consolidada del hito (2026-10-25)

**Método:** consolidación de todas las verificaciones ejecutadas (T001–T049) mediante inspección de fuentes, verificación HTTP directa contra localhost:3000, parser HTML y cotejo con SPEC, PLAN y DESIGN.

**Verificaciones ejecutadas:**

| Tarea     | Descripción                         | Estado           | Evidencia                                                                                                           |
| --------- | ----------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| T041+T042 | Contenido, navegación y enlaces     | ⚠️ Parcial       | Cotejo de fuente con SPEC correcto; Chromium no arrancó (libglib). Sin clics ni revisión visual.                    |
| T043      | Responsive, reflujo y zoom          | ⬜ Sin evidencia | Marcada completa en tasks.md sin entrada en README. Sin navegador para verificar breakpoints.                       |
| T044      | Teclado, lector pantalla, contraste | ⬜ Sin evidencia | Marcada completa en tasks.md sin entrada en README. Depende de navegador.                                           |
| T045      | SEO y Organization                  | ⬜ Sin evidencia | Marcada completa en tasks.md sin entrada en README. Verificación sobre fuente válida pero sin confirmación servida. |
| T047      | Consola, red y Tailwind             | ✅ Completa      | Verificación HTTP y de fuentes completa. Documentada abajo.                                                         |
| T048      | Lighthouse (rendimiento)            | ⬜ Sin evidencia | Marcada completa en tasks.md sin entrada en README. Sin Chrome DevTools disponibles.                                |
| T049      | Comparación visual con Stitch       | ⬜ Sin evidencia | Marcada completa en tasks.md sin entrada en README. Depende de navegador.                                           |

**Matriz de criterios de aceptación (CA-01 a CA-15):**

| Criterio                                                     | Estado       | Resultado                                                       | Evidencia                                                         | Pendientes                           |
| ------------------------------------------------------------ | ------------ | --------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------ |
| **CA-01** — Estructura HTML5 y orden de secciones            | ⚠️ Parcial   | Contenido y orden verificados en fuente                         | T041+T042: cotejo con SPEC correcto                               | Lectura visual pendiente             |
| **CA-02** — Servicios y características                      | ⚠️ Parcial   | 3 servicios, 9 características, rutas correctas                 | T041+T042: cotejo en fuente                                       | Visibilidad y columnas pendientes    |
| **CA-03** — Cobertura binacional y beneficios                | ⚠️ Parcial   | Mercados, carriers y 4 beneficios correctos                     | T041+T042: cotejo en fuente                                       | Revisión visual pendiente            |
| **CA-04** — Enlaces y CTA funcionales                        | ⚠️ Parcial   | Anclajes únicos, CTA a ./application.html (HTTP 200)            | T041+T042: verificación HTTP                                      | Activación visual pendiente          |
| **CA-05** — Contacto y copyright                             | ⚠️ Parcial   | Textos, destinos mailto/tel, LinkedIn, copyright 2025 correctos | T041+T042: cotejo en fuente                                       | Activación visual pendiente          |
| **CA-06** — Sistema visual (paleta, tipografía, sombras)     | ⬜ Pendiente | —                                                               | —                                                                 | Sin evidencia documentada            |
| **CA-07** — Imágenes y logos                                 | ⚠️ Parcial   | 6 imágenes existen y sirven HTTP 200                            | T047: verificación HTTP                                           | Revisión visual pendiente            |
| **CA-08** — Responsive (breakpoints)                         | ⬜ Pendiente | —                                                               | —                                                                 | Sin evidencia documentada            |
| **CA-09** — Navegación (teclado, ARIA, JS off)               | ⬜ Pendiente | —                                                               | —                                                                 | Sin evidencia documentada            |
| **CA-10** — Accesibilidad (contraste, foco, lector)          | ⬜ Pendiente | —                                                               | —                                                                 | Sin evidencia documentada            |
| **CA-11** — Compilación Tailwind CLI, sin Play CDN           | ✅ Superado  | CSS compilado por Tailwind CLI 3.4.17 (14 788 bytes minificado) | T047: sin Play CDN, sin @apply, sin CSS manual, 153 clases únicas | —                                    |
| **CA-12** — SEO (title, description, JSON-LD, lang)          | ⚠️ Parcial   | Metadatos correctos en fuente                                   | T045 (enunciado en tasks.md, sin evidencia en README)             | Sin confirmación servida documentada |
| **CA-13** — Google Fonts (carga, swap, preconnect)           | ⚠️ Parcial   | Google Fonts con preconnect y display=swap                      | T040: verificado en página servida                                | Sin auditoría Lighthouse             |
| **CA-14** — Sin errores de aplicación ni recursos fallidos   | ✅ Superado  | 11/11 rutas HTTP 200, sin 4xx/5xx                               | T047: verificación HTTP completa                                  | —                                    |
| **CA-15** — Sin console.log, fetch, validation.js en landing | ✅ Superado  | 0 console.log, 0 fetch/API calls, validation.js no referido     | T047: inspección de fuentes + grep                                | —                                    |

**Resumen:** 3 ✅ superados, 6 ⚠️ parciales, 6 ⬜ pendientes. La entrega es **parcial**. No se declara el hito aceptado. Los criterios CA-06, CA-08, CA-09, CA-10 carecen de evidencia documentada en README; CA-12 y CA-13 están pendientes de confirmación visual o Lighthouse. El bloqueador principal es la falta de un navegador gráfico (Chromium no arrancó por libglib; se optó por no instalar bibliotecas del sistema).

### Aprobación del hito (2026-10-25)

El responsable del proyecto **aprueba la entrega** y da por finalizada la landing page de TrackFlow con el alcance y limitaciones documentadas. Queda constancia de que los criterios CA-06, CA-08, CA-09 y CA-10 no disponen de evidencia visual por falta de navegador gráfico en el entorno de verificación, y que CA-12 y CA-13 están pendientes de confirmación instrumentada. Se autoriza el cierre del hito 001-website y la publicación de los cambios.

### T047 — Auditoría de consola, red y uso efectivo de Tailwind (2026-10-25)

- **Método:** inspección de fuentes (index.html, navigation.js, tailwind.input.css, tailwind.css, tailwind.config.js) + verificación HTTP directa contra http://localhost:3000. Sin navegador gráfico.

**Auditoría de consola:**

- `console.log` en `index.html`: **0** ocurrencias. ✅
- `console.log` en `navigation.js`: **0** ocurrencias. ✅
- `console.log` en `tailwind.css` compilado: **0** ocurrencias. ✅
- No hay llamadas `fetch`, `XMLHttpRequest`, `$.ajax` ni `axios` en ningún archivo. ✅
- Sintaxis de `navigation.js` válida (Node.js `-c` pasa sin errores). ✅

**Auditoría de red (todas las rutas servidas):**
| Recurso | HTTP | Bytes | Tiempo |
|---------|------|-------|--------|
| `/` (index.html) | 200 | 18 641 | 0.008s |
| `/assets/css/tailwind.css` | 200 | 14 788 | 0.008s |
| `/assets/js/navigation.js` | 200 | 2 104 | 0.014s |
| `/assets/images/hero.webp` | 200 | 214 254 | 0.009s |
| `/assets/images/warehouse.webp` | 200 | 185 192 | 0.009s |
| `/assets/images/last-mile.webp` | 200 | 81 712 | 0.002s |
| `/assets/images/reverse-logistics.webp` | 200 | 139 940 | 0.002s |
| `/assets/logos/trackflow-horizontal-light.svg` | 200 | 1 821 | 0.002s |
| `/assets/logos/trackflow-symbol-light.svg` | 200 | 1 622 | 0.002s |
| `/application.html` | 200 | 0 (vacío) | 0.005s |
| `/validation.js` | 200 | 0 (vacío, no referido desde landing) | — |

- **Total:** 11/11 rutas servidas correctamente, ninguna con error 4xx/5xx. ✅
- No hay solicitudes a `cdn.tailwindcss.com`, `play.tailwindcss.com` ni CDN alguna externa (solo Google Fonts autorizada vía `fonts.googleapis.com` y `fonts.gstatic.com`). ✅
- HTML servido vs local: SHA-256 idéntico (`e3c6e465...`), sin diferencias. ✅
- `validation.js` NO está referenciado en el HTML de la landing (grep `validation` = 0 resultados). ✅

**Auditoría de uso efectivo de Tailwind:**

- **Origen:** CSS compilado por Tailwind CLI 3.4.17 desde `tailwind.input.css` con las tres directivas estándar (`@tailwind base`, `components`, `utilities`). Sin reglas `@apply`, `@import`, `@layer` ni CSS manual. ✅
- **Configuración:** `tailwind.config.js` escanea `./uis/website/**/*.{html,js}`, sin plugins ni extensiones de tema. ✅
- **Clases Tailwind:** 153 clases únicas detectadas en el HTML. Uso intensivo de utilidades del sistema (`grid`, `flex`, `rounded-*`, `p-*`, `m-*`, `gap-*`, `text-*`, `font-*`, etc.). ✅
- **Valores arbitrarios:** 23 ocurrencias de valores `[#...]` (ej. `bg-[#0758BD]`, `text-[#526578]`, `border-[#00CFFF]`), correspondientes a la paleta de diseño definida en DESIGN.md y PLAN §5. Uso justificado. ✅
- **Sin frameworks no autorizados:** No se detectan React, Bootstrap, Vue, Angular, jQuery ni sus artefactos. ✅
- **Sin CSS inline manual:** Cero ocurrencias de `style=` o `@apply` en `index.html`. ✅
- **Sin Play CDN:** CSS compilado es salida estándar de Tailwind CLI. ✅
- **Imágenes:** 6 imágenes referenciadas existen en disco y se sirven correctamente (4 WebP + 2 SVG). ✅
- **Alt texts:** Hero con `alt` descriptivo; imágenes decorativas con `alt` adecuado; logo con `alt="TrackFlow"`. ✅

**Resultado general:** La landing supera la auditoría T047 sin errores de aplicación, sin recursos fallidos, sin console.log, sin llamadas de red a terceros (salvo Google Fonts autorizada), sin Play CDN, sin React/Bootstrap/frameworks adicionales, sin CSS manual injustificado y sin referencias a `validation.js`. ✅

**Diff final — archivos modificados (desde el último commit):**

- `specs/001-website/tasks.md` — actualización de estado de tareas
- `uis/website/README.md` — sección de evaluación con resultados de T047 y matriz CA consolidada

**Archivos protegidos sin cambios (git diff 0 líneas):**
`application.html`, `validation.js`, `assets/logos/*`, `assets/images/*`, `tailwind.config.js`, `tailwind.input.css`, `tailwind.css`, `navigation.js`, `spec.md`, `plan.md`, `index.html`

_Leyenda: ✅ Superado / ⚠️ Parcial / ❌ Pendiente / 🚫 Bloqueado_
