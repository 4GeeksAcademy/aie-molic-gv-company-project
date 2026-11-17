# TrackFlow Operations Playground

## Estado (2026-11-17)

Se implementó con autorización explícita del desarrollador la demo interna `uis/backoffice/trackflow-playground/` conforme a [SPEC](../specs/003-domain-models/demo/spec.md), [PLAN](../specs/003-domain-models/demo/plan.md) y [TASKS](../specs/003-domain-models/demo/tasks.md). Presenta overview, Inventory, Shipments, Carriers, Validations y Reports usando fixtures sintéticos en memoria e importa las funciones desde el código TypeScript real de `packages/trackflow-utils/`.

La aplicación no tiene backend ni almacenamiento persistente. Las acciones actualizan controles/resultados de la demo local y el reset restaura fixtures. La interfaz usa JavaScript vanilla, HTML semántico, Tailwind CSS 3.4.17 compilado localmente, Vite 6.4.6 y el logo SVG existente de la web servido como recurso local; las fuentes son del sistema. Vite está declarado localmente en el manifest de la app, importa el barrel de utilidades por ruta relativa y limita `server.fs.allow` a la app, el paquete de utilidades y los logos locales usados.

## Evidencia de validación

- `npm --prefix uis/backoffice/trackflow-playground run build`: correcto; Tailwind y Vite generaron build local. Se observó advertencia de `caniuse-lite` desactualizado.
- `npm --prefix packages/trackflow-utils run typecheck`: correcto.
- `npm --prefix packages/trackflow-utils test`: correcto, 6 archivos y 78 tests.
- Vite dev server inició; el SVG local respondió `image/svg+xml` y el módulo `src/main.js` se sirvió correctamente. El preview de producción respondió HTTP 200 (`text/html`, 18,399 bytes) con marcadores `TrackFlow Operations Playground` e `id="overview-kpis"`; se detuvo deliberadamente con Ctrl+C.
- El desarrollador confirmó que probó la demo en navegador: logo y tarjetas de resumen visibles, navegación entre secciones, filtros/controles, Inventory, Shipments, Carriers, Validations, Reports y «Restablecer demo» funcionan.
- Un control estático encontró 19/19 utilidades esperadas importadas e invocadas. Esto verifica trazabilidad de imports/llamadas, no el cotejo individual de cada valor devuelto en la interfaz.
- Escaneo estático acotado de `index.html` y `src/{main,data,styles}.js` no encontró `fetch`, `XMLHttpRequest`, URLs HTTP(S), `localStorage`, `sessionStorage` ni `indexedDB`; no sustituye una auditoría de red en DevTools.
- `get_errors` de VS Code para `src/main.js`: no errors encontrados (consulta inicial de esta continuación; build posterior también correcto).

## Estado pendiente / límites

- D011: falta auditoría de teclado, accesibilidad/semántica, foco y responsive en viewports; la prueba funcional informada por el desarrollador no cubre estos aspectos.
- D012: se verificó estáticamente que las 19 funciones constan como importadas e invocadas. Falta cotejar caso por caso cada salida visible y cerrar formalmente una revisión exhaustiva de duplicación de lógica de dominio.
- D013: build, typecheck, tests y preview ya pasaron; siguen pendientes la auditoría de red en DevTools, estados de borde exhaustivos (incluidos `null`, entrada incompleta y error recuperable), prueba explícita de persistencia tras recargar y cotejo de todos los CA. El escaneo estático no prueba ausencia absoluta de tráfico.
- No se hicieron commit, push, merge ni PR. `node_modules/` y `dist/` locales se excluyen mediante `.gitignore` local de la aplicación; la hoja Tailwind compilada `assets/css/tailwind.css` es parte del árbol fuente de la app.

## Límites de alcance

No se modificaron `uis/website/`, `packages/trackflow-utils/`, `packages/shared/` ni manifiestos/lockfiles raíz. Se observó un `package-lock.json` no rastreado en la raíz, ajeno a este alcance y no tocado. No se añadieron backend, solicitudes externas deliberadas, persistencia, autenticación, datos reales ni operaciones de logística. Las propuestas de decisión/selección solo exponen cálculos deterministas del paquete sobre datos sintéticos; no son recomendaciones ni asignaciones reales.
