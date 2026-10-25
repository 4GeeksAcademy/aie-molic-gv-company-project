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

### T041+T042 — Auditoría parcial (2026-10-25)

- **Método:** inspección de fuente y cotejo con SPEC RF-01–RF-07 y exclusiones de §1.1; comprobación HTTP anónima y parser HTML de la biblioteca estándar de Python. No es una comprobación del DOM renderizado.
- La landing pública respondió `200`; su HTML coincide byte a byte con `index.html` local (SHA-256 `e3c6e465863126d2f21677132b7fc265c7c9138b7ef0dd6dbb7363dc3b3bfa82`). Se comprobaron el orden del contenido, H1/subtítulo, tres servicios y sus nueve características, mercados/carriers, cuatro beneficios, contactos y copyright 2025. No se identificaron controles ni promesas excluidos en el HTML revisado.
- Los IDs son únicos y todos los anclajes tienen destino. Los tres CTA apuntan a `./application.html`, que responde `200` con 0 bytes. Email, teléfonos y LinkedIn tienen los destinos oficiales. No se enviaron correos, iniciaron llamadas ni verificó la disponibilidad externa de LinkedIn.
- `git diff --exit-code HEAD` confirmó que `application.html` y `validation.js` no tienen cambios; ambos están versionados vacíos. La landing no referencia el formulario para carga automática ni `validation.js`. La ausencia de solicitudes en ejecución todavía no se ha comprobado.
- **Bloqueo:** se autorizó instalar Playwright y Chromium fuera del repositorio, pero Chromium no pudo arrancar por falta de `libglib-2.0.so.0`. El desarrollador eligió no instalar bibliotecas Linux y conservar el resultado parcial. No hubo clics automatizados, capturas ni revisión visual.
- **Para cerrar:** activar logo, cuatro enlaces del menú y tres CTA en móvil/escritorio; verificar que las secciones quedan visibles y no tapadas, revisar visualmente el contenido y confirmar las solicitudes de red. T041+T042 permanecen abiertas.

| Criterio | Estado | Evidencia |
|----------|--------|-----------|
| CA-01 | ⚠️ | T041+T042: contenido y orden en fuente comprobados; lectura visual pendiente. |
| CA-02 | ⚠️ | T041+T042: servicios, características y rutas comprobados; visibilidad y columnas pendientes. |
| CA-03 | ⚠️ | T041+T042: mercados, carriers y beneficios comprobados en fuente; revisión visual pendiente. |
| CA-04 | ⚠️ | T041+T042: anclajes y rutas CTA comprobados; activación y destinos visibles pendientes. |
| CA-05 | ⚠️ | T041+T042: textos/destinos oficiales y copyright comprobados; activación en navegador pendiente. |
| CA-06 | ⬜ | — |
| CA-07 | ⬜ | — |
| CA-08 | ⬜ | — |
| CA-09 | ⬜ | — |
| CA-10 | ⬜ | — |
| CA-11 | ⬜ | — |
| CA-12 | ⬜ | — |
| CA-13 | ⬜ | — |
| CA-14 | ⚠️ | T040 acredita acceso público; activación de enlaces y verificaciones de cierre pendientes. |
| CA-15 | ⚠️ | T041+T042: sin controles excluidos en fuente; revisión visual y solicitudes de red pendientes. |

*Leyenda: ✅ Superado / ⚠️ Parcial / ❌ Pendiente / 🚫 Bloqueado*
