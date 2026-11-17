# TASKS — TrackFlow Operations Playground

- **Fecha:** 2026-11-17.
- **Estado:** implementación autorizada y comprobada funcionalmente en navegador por el desarrollador. D001–D010 completadas según su alcance acotado; D011–D013 permanecen abiertas para las auditorías y cotejos exhaustivos indicados en cada tarea.
- **Fuentes:** [SPEC](spec.md), [PLAN](plan.md), [SPEC 003 del paquete](../spec.md) y [TASKS 003](../tasks.md).
- **Autorización:** el desarrollador declaró: “Apruebo la SPEC, el PLAN y las decisiones técnicas propuestas. Te autorizo a implementar la aplicación completa siguiendo las tareas documentadas.” Esta aprobación/permiso no autoriza cambios al website, al paquete de utilidades, a manifiestos raíz, operaciones Git ni a rutas excluidas.
- **Entrega:** playground interno en `uis/backoffice/trackflow-playground/`, basado en datos sintéticos y conectado a las exportaciones reales de `@repo/trackflow-utils`.

## Reglas de ejecución

1. Marcar completa una tarea solo cuando se haya satisfecho y comprobado el criterio; registrar límites de verificación sin extrapolar.
2. **Aprobación registrada:** la autorización explícita citada arriba habilitó la implementación. No extiende el alcance a rutas excluidas ni operaciones Git.
3. **Decisión técnica implementada:** la app declara Vite como dependencia local directa, importa el barrel real TypeScript por ruta relativa y limita `server.fs.allow` a la app, el paquete y los logos de marca locales usados. El build transpila/empaqueta; el typecheck del paquete se ejecuta por separado. No se copian ni reimplementan utilidades.
4. Cada tarea depende de sus predecesoras indicadas. No avanzar más allá de una tarea bloqueada por decisión pendiente.
5. Respetar las exclusiones de SPEC §3.2 y PLAN §8: no modificar `uis/website/` (sus recursos fuente no se alteran), `packages/trackflow-utils/`, `packages/shared/`, manifiestos/lockfiles raíz; no añadir backend, persistencia, red, autenticación, IA, datos reales o acciones operativas. El Memory Bank se actualiza con hechos de esta implementación, conforme a AGENTS.md.
6. Si una conducta depende de QA abierta en TASKS 003, demostrar solo el comportamiento actualmente observado, sin establecer una nueva regla ni fijar una expectativa no aprobada.
7. La app incluye documentación propia con tecnologías, configuración y comandos definidos. No cargar Google Fonts: CA-09 requiere cero solicitudes de red; se usa pila de sistema y el logo local existente.
8. No realizar commit, push, merge ni PR sin autorización explícita para esa operación.

## Tareas propuestas

### Fase 0 — Aprobaciones y viabilidad

- [x] **D001 — Confirmar alcance y autorización de implementación.** Revisar las versiones vigentes de SPEC, PLAN y TASKS; registrar las aprobaciones y las decisiones expresas sobre ubicación, importación/build, dependencias, idioma, diseño, tipografía sin red, verificación y alcance antes de crear código.
  - **Dependencias:** ninguna para la revisión; bloquea D002–D013.
  - **Archivos futuros:** ninguno requerido para la verificación de esta tarea.
  - **Criterios de finalización:** cumplidos por la declaración explícita de aprobación/autorización del desarrollador incluida en el encabezado. Ubicación y decisiones técnicas corresponden al PLAN aprobado; no se infiere aprobación distinta de la otorgada.

- [x] **D002 — Aprobar e identificar integración TypeScript/browser.** Se adoptó Vite local: importa `packages/trackflow-utils/src/index.ts` por ruta relativa, permite acceso dev mediante `server.fs.allow` explícito y mantiene el typecheck independiente. Vite y Tailwind CSS se declaran directamente en el manifest local; no se modificaron manifiestos raíz ni el paquete.
  - **Dependencias:** D001.
  - **Archivos futuros:** solo documentación/decisión técnica aprobada; cambios a configuraciones existentes requieren autorización explícita.
  - **Criterios de finalización:** decisión autorizada en la aprobación general; import real y build verificados (ver D003/D004/D013). El typecheck separado pasó. Dev server HTTP y recurso de marca respondieron 200; preview final respondió HTTP 200 con HTML esperado (D013).

### Fase 1 — Base aislada y datos auténticos

- [x] **D003 — Preparar el esqueleto documentado del playground.** App creada en `uis/backoffice/trackflow-playground/` con HTML semántico, módulos, README, manifest/config local de Vite y Tailwind CSS 3.4.17. Scanner y CSS son propios de la app.
  - **Dependencias:** D001–D002.
  - **Rutas candidatas:** `uis/backoffice/trackflow-playground/` y su README; confirmar antes si existe documentación nueva de carpeta y respetar las rutas autorizadas.
  - **Criterios de finalización:** build pasó; el dev server respondió HTTP 200 para `/`, `/src/main.js` y el logo SVG local. El preview respondió HTTP 200 (`text/html`) y sirvió marcadores esperados. El desarrollador confirmó visual y funcionalmente logo, resumen, navegación, controles y secciones en navegador. Configuración restringe FS a app, paquete y logo. Sin fuentes remotas en fuentes revisadas; auditoría de red exhaustiva sigue pendiente. No se modificó website. Build emite aviso de `caniuse-lite` desactualizado.

- [x] **D004 — Crear fixtures sintéticos y verificar importación real.** `src/data.js` aporta fixtures coherentes en memoria; `src/main.js` importa y usa las funciones desde el barrel TypeScript real. El build Vite verificó resolución/transpilación del módulo.
  - **Dependencias:** D003.
  - **Rutas candidatas:** módulos de datos y adaptación dentro de la app aprobada.
  - **Criterios de finalización:** fixtures rotulados como sintéticos; hay 12 productos, 12 envíos y 4 carriers. Build, typecheck separado y 78 tests del paquete pasaron. Un escaneo estático acotado no encontró llamadas explícitas a red/persistencia ni URLs HTTP(S) en los archivos fuente revisados; esto no reemplaza auditoría de tráfico en navegador, que sigue pendiente.

### Fase 2 — Marco y áreas funcionales

- [x] **D005 — Implementar marco, navegación y reset efímero.** Se implementaron resumen y cinco áreas, aviso de demo, contenido semántico y reset en memoria. Los links internos/CTA se unificaron para activar secciones y mantener hash; el botón de reset recupera datos/controles.
  - **Dependencias:** D003–D004.
  - **Criterios de finalización:** las cinco áreas y reset constan en HTML/JS. El desarrollador confirmó navegación entre secciones, controles/filtros y botón «Restablecer demo» en navegador. Teclado, accesibilidad y responsive siguen en D011.

- [x] **D006 — Implementar Inventory con sus ocho funciones.** Se implementaron controles/lista y las ocho funciones exactas en `src/main.js`.
  - **Funciones obligatorias:** `filterProductsByWarehouse`, `filterProductsByCategory`, `filterLowStockProducts`, `sortProductsByStock`, `findProductBySKU`, `binarySearchProductByWeight`, `countProductsByCategory`, `calculateTotalInventoryValue`.
  - **Dependencias:** D004–D005.
  - **Criterios de finalización:** invocaciones presentes en código, lista binaria ordenada en copia y estado de ausencia presentado. El desarrollador confirmó funcionalmente Inventory y sus controles en navegador; verificación individual de retornos corresponde a D012.

- [x] **D007 — Implementar Shipments.** Se implementaron listado, búsqueda por ID, agrupación y distancia media en `src/main.js`.
  - **Funciones obligatorias:** `findShipmentById`, `groupShipmentsByStatus`, `calculateAverageShipmentDistance`.
  - **Dependencias:** D004–D005.
  - **Criterios de finalización:** funciones e interacciones presentes; el desarrollador confirmó Shipments en navegador. No hay escrituras de envíos codificadas en las acciones observadas.

- [x] **D008 — Implementar Carriers como inspección de escenario sintético.** Se implementaron opciones de escenario, orden por fiabilidad y llamadas a coste, score, top carriers y selección de utilidad.
  - **Funciones obligatorias:** `sortCarriersByReliability`, `calculateShippingCost`, `scoreCarrierForShipment`, `selectBestCarrier`.
  - **Dependencias:** D004–D007.
  - **Criterios de finalización:** llamadas reales presentes; el desarrollador confirmó Carriers y sus controles en navegador. La UI presenta los retornos de `scoreCarrierForShipment` y `selectBestCarrier` sin duplicar el umbral de selección del paquete. Caso `null` y cotejo individual de salidas continúan en D011/D012.

- [x] **D009 — Implementar Validations con entidades completas.** Permite escoger entidades completas fixture y variaciones sintéticas, invocando los tres validadores reales.
  - **Funciones obligatorias:** `validateProduct`, `validateShipment`, `validateCarrier`.
  - **Dependencias:** D004–D005.
  - **Criterios de finalización:** presenta `valid` y mensajes en el orden recibido; casos completos definidos en JS. El desarrollador confirmó Validations y sus controles en navegador; cotejo individual de retornos continúa en D012.

- [x] **D010 — Implementar Reports.** Reportes de categoría, valor, estado, distancia y top N conectados a las funciones del paquete.
  - **Funciones obligatorias:** `countProductsByCategory`, `calculateTotalInventoryValue`, `groupShipmentsByStatus`, `calculateAverageShipmentDistance`, `findTopCarriers`.
  - **Dependencias:** D004–D009.
  - **Criterios de finalización:** las cinco funciones/representaciones se encuentran implementadas y topN viene del selector. El desarrollador confirmó Reports en navegador; el cotejo individual de resultados sigue en D012.

### Fase 3 — Estados, calidad y cierre

- [ ] **D011 — Completar estados, responsive y accesibilidad.** Revisar estados inicial, con resultados, vacío, sin coincidencia, selección `null`, validación válida/inválida, datos de ejemplo incompletos, error recuperable y reset; aplicar los requisitos responsive y de accesibilidad de SPEC.
  - **Dependencias:** D005–D010.
  - **Criterios de finalización:** en móvil no hay desbordamiento horizontal de página ni pérdida de información esencial; teclado, orden/foco visible, etiquetas, landmarks, encabezados y mensajes de estado son utilizables; color no es el único indicador y el aviso de ficción permanece visible.

- [ ] **D012 — Verificar trazabilidad de las 19 funciones y límites.** El control estático confirmó 19/19 funciones importadas e invocadas y el desarrollador confirmó el funcionamiento general de las secciones; falta completar el cotejo exhaustivo de cada retorno/interacción frente a SPEC §6 y CA-03.
  - **Dependencias:** D006–D011.
  - **Evidencia y límites:** control estático encontró las 19 funciones importadas desde `packages/trackflow-utils/src/index.ts` y llamadas en `main.js` (19/19; ninguna faltante). El desarrollador confirmó funcionamiento de controles y secciones en navegador. Esa confirmación junto al recuento estático no constituye evidencia individual de retornos/resultados para las 19 funciones; falta completar el cotejo explícito de salidas y revisar/cerrar formalmente que no haya lógica de dominio duplicada.

- [ ] **D013 — Ejecutar revisión final y documentar límites.** Build, typecheck/tests, preview, escaneo estático limitado, scope y estado Git ya revisados; falta cerrar auditorías de responsive/accesibilidad, red en navegador y cobertura de criterios que continúan abiertos.
  - **Dependencias:** D012.
  - **Comprobado el 2026-11-17:** README revisado; build de app correcto; preview respondió HTTP 200 y sirvió HTML con marcadores esperados; typecheck correcto; 6 archivos y 78 tests correctos; 19 imports y llamadas comprobados estáticamente; escaneo acotado de archivos fuente no encontró `fetch`, XHR, URLs HTTP(S) ni APIs comunes de almacenamiento persistente; `git diff --check` no reportó errores en cambios rastreados. El desarrollador confirmó manualmente logo, tarjetas resumen, navegación, filtros/controles, las cinco secciones y reset.
  - **Pendiente para el cierre integral:** auditoría de red en DevTools, teclado/accesibilidad, responsive en viewports, cobertura de estados límite (incluidos selección `null`, datos incompletos, error recuperable y persistencia tras reload), cotejo de retornos de las 19 funciones y revisión final contra todos los criterios de aceptación. No afirmar auditoría completa ni conformidad no comprobada. No realizar commit/push/PR.

## Trazabilidad con la SPEC

- **Navegación, transparencia, reset y estados:** D005, D011 (RF-01, RF-08; CA-01, CA-02, CA-09, CA-10, CA-14, CA-15).
- **Inventory:** D006 (RF-02; funciones 1–4, 6, 8–9, 12; CA-03, CA-04, CA-08).
- **Shipments:** D007 (RF-03; funciones 7, 10, 13; CA-03, CA-05).
- **Carriers:** D008 (RF-04; funciones 5, 14–16; CA-03, CA-06).
- **Validations:** D009 (RF-05; funciones 17–19; CA-03, CA-07).
- **Reports:** D010 (RF-06; funciones 9–13, 11; CA-03, CA-08).
- **Uso de API real y verificación completa:** D002, D004, D012 (RF-07; CA-03).
- **Responsive, accesibilidad y continuidad visual:** D003, D011, D013 (requisitos de diseño/accesibilidad; CA-11–CA-13).

> Esta lista registra la aprobación explícita para implementar y el estado/evidencia conocida. Las tareas pendientes no se consideran satisfechas por inferencia ni por la implementación aislada.
