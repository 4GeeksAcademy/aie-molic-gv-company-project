# PLAN — TrackFlow Operations Playground

- **Fecha:** 2026-11-17.
- **Estado:** PLAN aprobado por el desarrollador para implementación junto con la SPEC; la autorización está citada en [TASKS](tasks.md). La implementación y los límites de su verificación se registran allí.
 **Límite de autorización:** la aprobación se limita a la demo descrita. No autoriza cambios al website, paquetes existentes, manifiestos raíz, operaciones Git u otras funcionalidades.

## 1. Fuentes y estado comprobado
 8. **Pruebas y verificación:** el plan de verificación se definió en §6. Las pruebas de estados UI, responsive, accesibilidad y ausencia de red/persistencia siguen sujetas a la evidencia pendiente descrita en D011–D013; no añadir herramientas o dependencias no aprobadas.
| Auditorías manuales y cotejo individual no completados                             | Sobreafirmar aceptación, accesibilidad, privacidad o correspondencia de resultados           | Mantener D011–D013 abiertas hasta registrar evidencia de cada criterio pendiente; no presentar build/typecheck/tests como sustitutos de esas comprobaciones.                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SPEC aprobada](spec.md)                                                                                                                                                                            | Cinco áreas, 19 llamadas requeridas, límites, identidad visual, accesibilidad, datos ficticios, estados y CA-01–CA-15; aprobación citada en TASKS.                                                                                                                      |
| [SPEC 003 del paquete](../spec.md), [requisitos EN](../utils/requirements.md), [requisitos ES](../utils/requirements.es.md), [TASKS 003](../tasks.md)                                               | Contratos y decisiones QA del paquete. El playground debe tratar el paquete como fuente de verdad y no cerrar decisiones de dominio abiertas.                                                                                                                           |
| [API pública](../../../packages/trackflow-utils/src/index.ts), [`package.json`](../../../packages/trackflow-utils/package.json), [`tsconfig.json`](../../../packages/trackflow-utils/tsconfig.json) | Existe `@repo/trackflow-utils`, paquete privado ESM TypeScript, con `strict: true`, `noEmit: true`, scripts locales typecheck/test y 19 funciones exportadas. El navegador no importa directamente esos `.ts` como JavaScript nativo; se requiere transformación/build. |
| [Reglas globales](../../../AGENTS.md), [regla de desarrollo](../../../.agents/rules/trackflow-development.md), [regla frontend](../../../.agents/rules/trackflow-frontend-learning.md)              | UI interna en `uis/backoffice/`; no inventar stack/dependencias; HTML semántico, mobile-first, Tailwind y JavaScript simple cuando sean aplicables; ninguna operación Git sin autorización.                                                                             |
| [README de `uis/`](../../../uis/README.md) y [README de website](../../../uis/website/README.md)                                                                                                    | `uis/backoffice/` está previsto pero no contiene una aplicación existente. El website sí utiliza HTML, Tailwind 3.4.17 CLI con configuración explícita, JavaScript vanilla, Manrope/Inter servidas desde Google Fonts y hoja Tailwind propia.                           |
| [DESIGN.md](../../../uis/website/docs/design/DESIGN.md), [`index.html`](../../../uis/website/index.html), [`application.html`](../../../uis/website/application.html)                               | Referencias de marca. La paleta/tokens documentados y aplicados no coinciden completamente; se propone seguir los colores vigentes en HTML para el playground sin modificar el website y documentar el criterio.                                                        |
| [Memory Bank: brief](../../../memory-bank/projectbrief.md), [contexto técnico](../../../memory-bank/techContext.md), [progreso](../../../memory-bank/progress.md)                                   | No hay datos operativos reales, backoffice, runner raíz ni stack general aprobado. Las discrepancias históricas de pruebas del hito 003 no pertenecen a este alcance.                                                                                                   |

Nota histórica de preparación: el estado de Git observado entonces mostró `specs/003-domain-models/demo/` como directorio no rastreado. La implementación posterior se registra en [TASKS](tasks.md); esta nota no describe por sí sola el estado Git actual.

## 2. Decisiones aprobadas para la implementación

Las siguientes decisiones de arquitectura fueron aprobadas para este playground y se implementaron dentro del alcance autorizado:

1. **Ubicación:** `uis/backoffice/trackflow-playground/`, como aplicación UI interna coherente con la responsabilidad de carpeta establecida por `AGENTS.md` y `.agents/rules/trackflow-development.md`. No usar `uis/website/`, `internal/`, la raíz ni una nueva carpeta paralela. La aplicación será una demo aislada y no se enlazará desde la landing.
2. **Tecnología de interfaz:** HTML5, JavaScript vanilla modular y Tailwind CSS 3.4.17 CLI, siguiendo la regla frontend. No adoptar framework ni librería de gráficos.
3. **Consumo del paquete:** usar Vite como herramienta local de desarrollo y build estático. La entrada importa directamente el barrel `packages/trackflow-utils/src/index.ts` por ruta relativa para que Vite transforme y empaquete el TypeScript auténtico; no se asume un import bare `@repo/trackflow-utils`, pues no hay `exports` ni workspace raíz confirmado. El servidor de desarrollo limita `server.fs.allow` a la app y fuentes locales permitidas. El build no reemplaza al typecheck independiente del paquete. Vite se declara como dependencia directa en el manifiesto de la app. No se cambia el `tsconfig` ni se modifica el paquete para resolver `noEmit`.
4. **CSS/Tailwind:** configuración y salida propias bajo la app del backoffice; no ampliar el scanner, input o output CSS de `uis/website/`. Para invocar Tailwind, usar configuración explícita `-c` correspondiente a la app. No usar Play CDN.
5. **Interacción:** navegación por cinco secciones, formularios/controles con acción explícita para búsquedas y cálculos, y filtros recalculados al cambiar o al aplicar según se resuelva en diseño. Los valores actuales y los resultados provienen de llamadas a las funciones correspondientes.
6. **Idioma:** interfaz en español como opción inicial coherente con la SPEC y website; no ofrecer bilingüismo en esta fase salvo aprobación adicional. Preservar nombres de funciones, tipos, estados y datos contractuales exactos.
7. **Visual y tipografía:** implementar continuidad con los colores vigentes del HTML (`#F6F5F1`, blanco, `#03142E`, `#06295D`, `#0758BD`, `#526578`, `#ECEFF1`, `#00DCCF`, `#00CFFF`) y foco visible. La marca usa Manrope/Inter, pero el website las carga desde Google Fonts; para respetar CA-09 y evitar red, se propone una pila de fuentes de sistema, salvo que se encuentren fuentes locales autorizadas. No incluir enlaces a Google Fonts ni modificar el website/sistema compartido ni resolver la divergencia de `DESIGN.md` para otros consumidores.
8. **Datos y red:** dataset sintético local fijo en memoria; sin fetch, almacenamiento persistente, telemetría ni credenciales. Las operaciones de carrier son solo simulación de una llamada determinista.
9. **Validación:** los scripts y dependencias son locales a la app, no a la raíz. Se aprobaron Vite y Tailwind CLI 3.4.17; el build y preview confirmaron que se sirve una app que importa el módulo TypeScript del paquete. No se modificaron manifiestos raíz.

## 3. Arquitectura funcional propuesta

### 3.1 Capas simples

1. **Marco y navegación:** estructura semántica, aviso persistente «Demo interna · Datos sintéticos», navegación por áreas, salto a contenido y acción de reset.
2. **Dataset y estado efímero:** fixtures TypeScript/JavaScript que satisfacen los modelos existentes, en memoria, con relaciones consistentes entre productos, envíos y carriers. El restablecimiento recrea valores iniciales.
3. **Adaptador de aplicación:** funciones pequeñas por interacción que importan y llaman directamente las utilidades públicas, preparan parámetros/orden de entrada si se requiere y entregan retornos a la vista. No contiene fórmulas, reglas de elegibilidad, ordenamiento de negocio o validaciones duplicadas.
4. **Vistas de dominio:** Inventory, Shipments, Carriers, Validations y Reports; muestran datos y estados derivados de retornos reales.
5. **Presentación:** componentes/funciones sencillas de render, formato de moneda/unidades y estados accesibles. El formato no modifica los números retornados.

La decisión de integración se resolvió y aprobó antes de la implementación: Vite transforma los `.ts` importados, el servidor de desarrollo restringe `server.fs.allow` y el typecheck del paquete permanece independiente. Build y preview se ejecutaron con éxito según la evidencia registrada en TASKS. La fuente de lógica sigue siendo el paquete; no se copiaron sus funciones. Estos puntos describen la solución implementada, no un bloqueo pendiente.

### 3.2 Dataset de alcance mínimo

Preparar registros ficticios mínimos que permitan demostrar todos los caminos requeridos sin dar a entender cobertura real:

- Productos de Los Angeles y Zaragoza, varias categorías y cantidades por encima, iguales y por debajo de `minStockThreshold`; pesos que permitan coincidencia y ausencia en búsqueda binaria; SKUs conocidos y no coincidentes; costes de prueba.
- Envíos relacionados con productos existentes, varios estados y prioridades, destinos/países del modelo, distancias de prueba y al menos un `carrier: null`; algunos carriers repetidos en los envíos para observar `findTopCarriers`.
- Dos o más carriers ficticios con valores distintos y comparables en atributos usados por las funciones, configurados para obtener resultados de coste/scoring/selección diversos y, si puede demostrarse sin introducir reglas nuevas, un caso `null` de selección. No atribuir sus nombres o valores a proveedores reales.
- Variantes de validación: ejemplos completos que el paquete acepte y variantes aisladas cuyo retorno efectivo pueda mostrarse. No prometer errores exactos en casos afectados por QA abiertas ni crear lógica UI para forzarlos.

El dataset implementado contiene 12 productos, 12 envíos y 4 carriers sintéticos. La creación se hizo en la app, tras revisar los modelos; el paquete no se editó. D004 registra la evidencia y sus límites.

## 4. Estructura prevista en la propuesta inicial

La tabla siguiente conserva el inventario de rutas propuesto antes de implementar y no es una lista exhaustiva del árbol final. La estructura creada y las rutas efectivamente incluidas se encuentran en `uis/backoffice/trackflow-playground/`; su estado se documenta en TASKS y en el README propio. No debe interpretarse esta tabla histórica como una autorización adicional ni como inventario Git actual.

| Ruta candidata                                                      | Responsabilidad propuesta                                                                                                  |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `uis/backoffice/README.md`                                          | Guía índice de herramientas internas, solo si se crea siguiendo las convenciones vigentes de la carpeta.                   |
| `uis/backoffice/trackflow-playground/README.md`                     | Propósito, límites, tecnologías aprobadas, configuración, build/preview, validación y advertencias de datos sintéticos.    |
| `uis/backoffice/trackflow-playground/index.html`                    | Documento semántico y shell de las cinco áreas.                                                                            |
| `uis/backoffice/trackflow-playground/assets/css/tailwind.input.css` | Entradas Tailwind locales, no compartidas con website.                                                                     |
| `uis/backoffice/trackflow-playground/tailwind.config.js`            | Scanner limitado al HTML/JS del playground; build con Tailwind 3.4.17 y configuración explícita propia.                    |
| `uis/backoffice/trackflow-playground/assets/css/tailwind.css`       | CSS generado localmente por Tailwind (no editar manualmente).                                                              |
| `uis/backoffice/trackflow-playground/src/main.js`                   | Punto de entrada, navegación y composición de vistas.                                                                      |
| `uis/backoffice/trackflow-playground/src/data/demo-data.*`          | Fixture ficticio y consistente; extensión según mecanismo de build aprobado.                                               |
| `uis/backoffice/trackflow-playground/src/state.js`                  | Estado UI efímero y restablecimiento.                                                                                      |
| `uis/backoffice/trackflow-playground/src/operations.js`             | Adaptadores que invocan API pública real; sin duplicación algorítmica.                                                     |
| `uis/backoffice/trackflow-playground/src/views/*.js`                | Vistas por área y estados accesibles, solo si la división reduce complejidad.                                              |
| `package.json` y configuración local de Vite/Tailwind               | Solo dentro de la app y tras aprobación; Vite declarado directamente como devDependency. No tocar manifiestos/runner raíz. |

No fijar una estructura de módulos por archivo antes de validar la ruta de build e importación. Para mantener bajo el costo cognitivo, se prefiere el menor número de módulos que respete responsabilidades y claridad.

## 5. Secuencia de trabajo propuesta

El desarrollo se dividiría en bloques pequeños. Cada bloque requiere que SPEC, PLAN y TASKS estén aprobados, además de autorización explícita para comenzar implementación; no se adelantan bloques por aprobación documental.

| Orden | Bloque                     | Resultado esperado                                                                                                                                                                   | Dependencias / condición de avance                                                          |
| ----: | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
|     0 | Aprobación y preflight     | Confirmar SPEC, PLAN y TASKS; revisar README de UI interna existente o ausencia; aprobar ubicación, Vite/importación/build, dependencias, idioma, paleta, fuentes sin red y pruebas. | No crear aplicación ni instalar dependencias antes de aprobar; resolver bloqueadores.       |
|     1 | Esqueleto aislado          | Crear estructura mínima en `uis/backoffice/trackflow-playground/`, documentación propia, shell semántico y configuración local aprobada de Vite/Tailwind.                            | No tocar website, raíz ni otros paquetes; verificar scanner y rutas.                        |
|     2 | Consumo real y datos       | Importar el barrel TypeScript existente mediante ruta local/alias; crear fixture sintético y probar importación/llamada, build y preview.                                            | Vite aprobado; `server.fs.allow` acotado; tipos/modelos revisados; typecheck independiente. |
|     3 | Marco y navegación         | Aviso de demo, cinco áreas, navegación de teclado, foco, estado inicial y reset efímero.                                                                                             | Estructura y estilos base verificados en escritorio/móvil.                                  |
|     4 | Inventory                  | Filtros, orden, SKU, búsqueda binaria, conteos y valor; cada acción conectada a sus ocho funciones pertinentes.                                                                      | Precondición de búsqueda binaria y salidas reales visibles; criterios QA no se redefinen.   |
|     5 | Shipments                  | Búsqueda ID, agrupación y distancia media; enlace de caso sintético al escenario de carrier.                                                                                         | No permitir acciones operativas ni escritura del Shipment.                                  |
|     6 | Carriers                   | Orden fiable, coste, score y selección; mostrar parámetros y resultados de funciones, con aclaración de simulación.                                                                  | No crear recomendador, asignación ni datos de rendimiento real.                             |
|     7 | Validations                | Ejecutar tres validadores con entidades completas y renderizar `valid`/`errors` sin modificación.                                                                                    | Casos preparados según modelos; discrepancias QA documentadas.                              |
|     8 | Reports                    | Conteos, valor, grupos, distancia y carriers top con control de `topN`.                                                                                                              | Resultados cotejables con retornos; no duplicar agregaciones.                               |
|     9 | Estados y pulido accesible | Vacíos, no coincidencia, `null`, validez, errores recuperables, estado de reset, responsive y teclado.                                                                               | Sin persistencia/red; revisar anuncios live y zoom.                                         |
|    10 | Verificación final         | Tests disponibles, revisión manual de flujos, responsive/accesibilidad básica, comprobación de ausencia de red/persistencia y diff.                                                  | Solo comandos realmente definidos y dependencias aprobadas; informar limitaciones.          |

La secuencia anterior fue la propuesta de trabajo; su ejecución y dependencias se reflejan en D001–D013 de TASKS. Las 19 llamadas están comprobadas estáticamente (19/19) y la navegación general fue confirmada en navegador; el cotejo individual de retornos todavía debe completarse en D012. Una pantalla visual sin llamada al paquete no satisface el plan.

## 6. Estrategia de calidad y verificación

### Verificación funcional

- Comprobar una interacción representativa y el retorno observado para cada una de las 19 funciones, con datos controlados; verificar en la fuente/importación de aplicación que se llama el export existente.
- Cotejar listas, índices, registros, números y objetos de validación con retornos reales, no con expectativas reescritas en el frontend.
- Verificar enlaces coherentes entre entidades demo; búsqueda binaria opera sobre entrada previamente ordenada ascendentemente; se muestra `-1` y `null` tal cual en el estado pertinente.
- Confirmar reset restaura filtros/inputs y datos locales iniciales; recargar restaura el mismo dataset sin estado persistido.
- Verificar ninguna acción cambia un envío/campo operacional o envía solicitudes externas.

### Verificación visual, responsive y accesibilidad

- Revisar las cinco áreas en viewport estrecho y ancho; confirmar que la página no tenga desbordamiento horizontal y las tablas se transformen sin perder datos esenciales.
- Recorrer navegación, búsqueda, selector, botones, validaciones y reset solo con teclado; observar foco y orden.
- Revisar etiquetas, asociación de mensajes, jerarquía de encabezados, landmarks, contraste y que color no sea único indicador. No afirmar conformidad formal WCAG sin medición adecuada.
- Confirmar que el contenido se puede ampliar y que el estado de datos sintéticos permanece inequívoco.

### Verificación de privacidad y arquitectura

- Inspección de fuentes/network durante tareas: ninguna llamada `fetch`/XHR, fuente remota (incluido Google Fonts) ni endpoint externo; ninguna API de almacenamiento persistente (`localStorage`, `sessionStorage`, IndexedDB) añadida; no se guardan datos.
- Inspeccionar `git diff --check` y estado Git solo como revisión local si se autoriza la fase de implementación; preservar cualquier cambio ajeno.
- Confirmar cambios confinados a la app aprobada y documentos de demo aprobados; no regenerar Tailwind del website ni cambiar lockfile/package raíz.

### Comandos

Los comandos vigentes de instalación, desarrollo, build, preview, typecheck y tests están documentados en el README propio de la app. Build, preview, typecheck y tests se ejecutaron; resultados y limitaciones (incluida la advertencia de `caniuse-lite`) constan en D003, D004 y D013. Tailwind usa la configuración local explícita con `-c`; no se usa el comando del website. El build de Vite no sustituye el typecheck independiente del paquete.

## 7. Riesgos y mitigaciones: estado al cierre

La tabla conserva riesgos identificados durante el diseño. Las decisiones de integración, ubicación y stack se resolvieron para esta demo y se implementaron; las comprobaciones de privacidad, accesibilidad y estados exhaustivos que no tienen evidencia siguen pendientes según D011–D013. La columna de mitigación no representa una solicitud de aprobación aún abierta.

| Riesgo / bloqueo                                                                   | Consecuencia                                                                                 | Mitigación propuesta                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| El paquete usa TS ESM con `noEmit: true` y no hay bundler de navegador configurado | Una página estática no importa directamente los `.ts`; copiar funciones sería incumplimiento | Candidata: Vite declarado en el manifiesto local, import del barrel real por ruta/alias, `server.fs.allow` limitado al paquete y typecheck independiente. Requiere prueba de concepto y aprobación; no asumir que la dependencia transitiva existente basta. |
| `uis/backoffice/` es solo ubicación prevista                                       | No hay convención de scripts/servidor de app interna                                         | Acordar ruta interna de acuerdo con guía; leer README de carpeta si existe; documentar el setup propio de la app sin afectar raíz.                                                                                                                           |
| La paleta de DESIGN difiere del HTML vigente                                       | Elección arbitraria de tokens o deriva visual                                                | Para esta demo, aprobación explícita de paleta vigente aplicada al HTML; limitar la resolución a la app y dejar una futura normalización del design system fuera de alcance.                                                                                 |
| Validadores/funciones tienen QA abierta                                            | Fixtures podrían inducir reglas esperadas no aprobadas                                       | Construir entradas válidas según tipos y documentar salida observada; evitar fijar mensajes, desempates y comportamiento runtime no definidos. Revisar TASKS 003 antes de fixtures/tests.                                                                    |
| `selectBestCarrier` puede entenderse como recomendación empresarial                | Riesgo de confundir herramienta didáctica con decisión operativa                             | Texto “simulación de utilidad”; mostrar datos ficticios y resultado crudo; sin aceptación/asignación ni acción externa.                                                                                                                                      |
| Dependencia de fuentes externas de tipografía                                      | Google Fonts generaría solicitudes de red incompatibles con CA-09                            | No incluir Google Fonts; usar pila de sistema salvo disponibilidad y autorización de archivos locales. Comprobar red en runtime.                                                                                                                             |
| Tailwind scanner no incluye backoffice                                             | Clases no aparecen en CSS o se propone tocar config web                                      | Configuración/CSS independientes y scanner limitado al nuevo proyecto, aprobados antes de crear.                                                                                                                                                             |
| Crecimiento en alcance (login, datos vivos, reportes productivos, bilingüismo)     | App excede propósito y reglas                                                                | Mantener exclusiones de SPEC; cualquier ampliación requiere una nueva decisión/actualización SDD aprobada.                                                                                                                                                   |
| Herramientas de test/servidor no están decididas                                   | Comandos inventados o dependencias no autorizadas                                            | No declarar comandos; resolver herramienta en PLAN detallado/preflight y documentar antes de ejecutarlos.                                                                                                                                                    |

## 8. Exclusiones y protección de archivos

- La implementación de la demo fue autorizada expresamente, como registra TASKS. Esa autorización se limita al playground y sus documentos de demo; no extiende el alcance a las rutas protegidas a continuación.
- No se crean ni modifican `uis/website/`, su Tailwind, imágenes/logos, HTML, scripts ni README.
- No se cambian `packages/trackflow-utils/`, sus exportaciones, firmas, implementación, pruebas o configuración; tampoco `packages/shared/`.
- No se modifica `package.json`, lockfile, configuración, scripts o dependencias en la raíz del monorepo.
- No se crea `services/`, API, backend, persistencia, autenticación, despliegue, telemetry, servicio externo o agente.
- El Memory Bank se actualizó para reflejar decisiones y evidencias verificadas de esta implementación. Cualquier actualización posterior deberá conservar las limitaciones pendientes y basarse en nueva evidencia.
- No realizar commit, push, merge ni PR. La petición del usuario actual también excluye commit.

## 9. Cierre y siguiente paso

La ruta aprobada e implementada usa Vite local para servir y empaquetar las fuentes TypeScript reales, importación por ruta local, acceso de desarrollo acotado y typecheck independiente. Tailwind 3.4.17, configuración y scanner son locales a la app; la interfaz usa fuentes de sistema para respetar el requisito de no solicitar recursos remotos. Los resultados de build, typecheck, tests y preview, junto con las limitaciones de las comprobaciones manuales, están registrados en TASKS.

**Cierre:** la implementación dentro del alcance está completada y el funcionamiento general fue confirmado por el desarrollador. No se deben declarar cerrados los criterios que requieren auditorías exhaustivas: D011–D013 permanecen abiertas hasta completar su evidencia. La autorización de implementación no autorizó operaciones Git; no realizar commit, push, merge o PR sin autorización específica.
