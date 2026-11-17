# TASKS 003-domain-models: utilidades de inventario y transportistas

- **Fecha:** 2026-11-13.
- **Estado:** T001–T027 completadas; T028–T032 revisadas en la fase final. T033 sigue pendiente y bloqueada por autorización explícita para preparar/realizar la entrega.
- **Fuentes aprobadas:** [SPEC 003](spec.md) y [PLAN 003](plan.md); los [requisitos EN](utils/requirements.md) y [ES](utils/requirements.es.md) contienen los contratos actuales.
- **Alcance:** paquete privado `packages/trackflow-utils/`, sin tocar la web, `packages/shared/`, manifiestos raíz, otros paquetes, backend, persistencia o IA.
- **Inventario:** 33 tareas en 11 fases. T009–T027 corresponden a las 19 funciones requeridas, una tarea independiente por función.

## Reglas de ejecución y aprendizaje

- Todas las casillas comienzan pendientes. Marcar una tarea solo después de completar sus criterios y registrar la verificación efectivamente realizada.
- Copilot prepara la estructura, configuración local aprobada, modelos exactos, firmas y pruebas sin lógica de negocio. El desarrollador revisa los tipos y desarrolla cada función.
- Una tarea de función requiere autorización explícita antes de comenzar. Copilot no implementa automáticamente funciones pendientes ni avanza a otra función sin autorización nueva.
- La ayuda ordinaria consiste en explicar, preguntar, dar pistas y revisar. El desarrollador puede pedir un ejemplo parcial o ayuda más directa para la función concreta activa.
- Después de una implementación autorizada, Copilot puede ejecutar la prueba enfocada y el chequeo de tipos, explicar fallos y proponer correcciones. No altera la lógica sin petición explícita.
- Las decisiones QA solo se consideran aprobadas dentro del alcance expresamente registrado en la tarea correspondiente. QA-01, QA-09 y QA-10, además de los subcasos de QA-04 aún no decididos, siguen pendientes; una prueba no convierte una propuesta en requisito.
- No ejecutar comandos raíz. Usar solo los scripts documentados del paquete una vez creados. No hacer commits, push ni Pull Requests sin autorización explícita para cada operación.

## Fase 0 — Preparación del proyecto (Copilot)

### T001 — Confirmar línea base y límites

- [x] **T001 — Comprobar el destino y preservar el monorepo.** Revisar estado Git, confirmar que `packages/trackflow-utils/` no existe y que la web y `packages/shared/` quedan fuera de alcance.
  - **Archivos:** solo lectura del estado Git y árbol de `packages/` y `uis/website/`.
  - **Dependencias:** ninguna.
  - **Verificación:** rama `feature/domain-models`; estado limpio antes de comenzar; el paquete no existía. No se modifican la web ni `packages/shared/`.
  - **Finalización:** cambios preexistentes identificados; trabajo limitado al paquete nuevo y a este registro de tareas; no se limpiaron archivos ajenos.

### T002 — Crear el esqueleto y documentarlo

- [x] **T002 — Crear la estructura local del paquete.** Crear `packages/trackflow-utils/`, `src/`, `src/utils/` y `tests/`; añadir un README con objetivo, alcance y cómo se documentarán los comandos verificados.
  - **Archivos:** paquete nuevo, sus carpetas y `README.md`.
  - **Dependencias:** T001; ubicación `packages/trackflow-utils/` y nombre privado aprobados.
  - **Verificación:** creados `packages/trackflow-utils/src/`, `src/utils/`, `tests/` y `README.md` del paquete.
  - **Finalización:** la estructura vive solo en el paquete; no se creó `src/` en raíz ni se modificó README de plantilla.

### T003 — Configurar el paquete y TypeScript

- [x] **T003 — Preparar `package.json`, `tsconfig.json` y lockfile local.** Declarar el paquete privado `@repo/trackflow-utils`, scripts locales `typecheck` y `test`, TypeScript estricto y opciones compatibles con el entorno comprobado de Codespaces.
  - **Archivos:** `packages/trackflow-utils/package.json`, `tsconfig.json` y `package-lock.json`.
  - **Dependencias:** T002; versiones de Node/npm/TypeScript revisadas en Codespaces.
  - **Verificación:** Node.js `v22.23.3`, npm `10.9.9`, TypeScript `7.0.2`, Vitest `5.1.0`; configuración `strict` y `noEmit`; dependencias y lockfile confinados al paquete.
  - **Finalización:** scripts y configuración autocontenidos; no se modificaron manifiestos ni lockfiles raíz. Versiones y comandos están documentados en el README del paquete.

### T004 — Configurar Vitest y prueba de arranque

- [x] **T004 — Preparar Vitest y comprobar el arnés de pruebas.** Añadir Vitest como dependencia local aprobada, configuración mínima si fuera necesaria y una prueba de humo que no implemente reglas del dominio.
  - **Archivos:** configuración local y `tests/setup.test.ts` (o equivalente justificado en README).
  - **Dependencias:** T003.
  - **Verificación:** `tests/setup.test.ts` ejecutó correctamente con Vitest `5.1.0` (1 archivo, 1 test aprobado); no fue necesaria configuración adicional de Vitest.
  - **Finalización:** test runner funcional; la prueba solo verifica el arnés y no contiene lógica de dominio.

### T005 — Verificar la preparación

- [x] **T005 — Ejecutar typecheck y prueba de arranque.** Verificar los scripts locales desde la raíz usando `npm --prefix packages/trackflow-utils run typecheck` y `npm --prefix packages/trackflow-utils test`.
  - **Archivos:** los de T002–T004; corregir solo defectos de preparación autorizados.
  - **Dependencias:** T004.
  - **Verificación:** `npm --prefix packages/trackflow-utils run typecheck` completó sin errores; `npm --prefix packages/trackflow-utils test` pasó (1 test).
  - **Finalización:** ambos comandos documentados y ejecutables; no se crearon modelos ni se implementaron funciones.

## Fase 1 — Modelos de dominio (Copilot + revisión del desarrollador)

- [x] **T006 — Definir modelos exactos en `src/models.ts`.** Copiar las declaraciones del briefing/SPEC para `Product`, `Dimensions`, `Shipment`, `Destination`, `Carrier`, `InventoryMovement`, `ProductCategory`, `WarehouseLocation`, `ProductStatus`, `Country`, `ShipmentPriority`, `ShipmentStatus` y `MovementType`.
  - **Firma/contrato:** conservar exactamente propiedades, nombres, uniones y tipos de §4 de SPEC 003; en particular `Shipment.carrier: string | null` y fechas `Date`.
  - **Dependencias:** T005. No agregar campos, validaciones ni tipos no especificados.
  - **Verificación:** declaraciones comparadas con §4 de SPEC 003; `src/index.ts` reexporta los 13 modelos y tipos unión; TypeScript reconoce referencias cruzadas bajo `strict`.
  - **Finalización:** contratos exactos, sin lógica de negocio, propiedades adicionales ni validaciones.

- [x] **T007 — Explicar los modelos y sus relaciones.** Explicar al desarrollador cada interfaz, sus propiedades y las referencias entre modelos (`Product`–`Dimensions`, `Shipment`–`Destination`, `Carrier`–`Country`/`ShipmentPriority`, `InventoryMovement`–`WarehouseLocation`/`MovementType`).
  - **Dependencias:** T006.
  - **Verificación:** explicación revisada y Fase 1 aprobada por el desarrollador.
  - **Finalización:** relaciones, nullabilidad y uso de tipos comprendidos antes de continuar.

- [x] **T008 — Verificar el tipado de los modelos.** Ejecutar `npm --prefix packages/trackflow-utils run typecheck` y revisar que las exportaciones de `src/index.ts` exponen los modelos aprobados.
  - **Dependencias:** T006–T007.
  - **Verificación:** `npm --prefix packages/trackflow-utils run typecheck` ejecutado sin errores; `src/index.ts` exporta los 13 modelos y tipos unión.
  - **Finalización:** contratos exportados sin cambios semánticos; no hay implementación funcional.

## Protocolo para T009–T027

Cada tarea de función se autoriza de forma independiente. Copilot prepara en esa tarea la declaración exacta y los tests descritos, sin solución de negocio. El desarrollador implementa la función; luego se ejecuta la prueba enfocada y el typecheck, se revisan los errores y se explica el resultado. No comenzar la siguiente tarea sin autorización explícita. Si hay una QA pendiente, avanzar solo en los casos confirmados y dejar los demás sin resolver hasta su aprobación.

## Fase 2 — Filtrado de productos (programación guiada)

- [x] **T009 — `filterProductsByWarehouse`**
  - **Archivo/firma:** `src/utils/collections.ts` — `filterProductsByWarehouse(products: Product[], warehouse: WarehouseLocation): Product[]`.
  - **Objetivo:** retornar productos cuyo `warehouse` coincide.
  - **Conceptos:** `filter`, predicados, tipos unión, arrays.
  - **Pruebas:** coincidencias múltiples y una; ningún resultado; array vacío; entrada sin mutaciones.
  - **Aceptación:** solo contiene coincidencias, conserva el orden de entrada y no modifica array ni productos.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/collections.test.ts` pasó (1 archivo, 5 pruebas); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores. Las pruebas confirman que el array original y sus productos no cambian.
  - **Dependencias/QA:** T006–T008. Ninguna QA bloqueante para el contrato especificado. Implementación revisada y aceptada por el desarrollador.

- [x] **T010 — `filterProductsByCategory`**
  - **Archivo/firma:** `src/utils/collections.ts` — `filterProductsByCategory(products: Product[], category: ProductCategory): Product[]`.
  - **Objetivo:** retornar productos cuya `category` coincide.
  - **Conceptos:** `filter`, comparación de literales, arrays.
  - **Pruebas:** una/múltiples coincidencias, otras categorías, ningún resultado, vacío y no mutación.
  - **Aceptación:** devuelve exactamente los productos de la categoría, en orden original, sin alterar entradas.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/collections.test.ts` pasó (1 archivo, 10 pruebas entre T009 y T010); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores. Los casos confirman igualdad de categoría, orden de entrada y no mutación.
  - **Dependencias/QA:** T006–T008. Ninguna QA bloqueante para los casos tipados. Implementación revisada y aceptada por el desarrollador.

- [x] **T011 — `filterLowStockProducts`**
  - **Archivo/firma:** `src/utils/collections.ts` — `filterLowStockProducts(products: Product[]): Product[]`.
  - **Objetivo:** retornar productos con `stockQuantity <= minStockThreshold`.
  - **Conceptos:** comparación inclusiva, límites, predicados.
  - **Pruebas:** stock menor, exactamente igual y mayor al umbral; array vacío; no mutación.
  - **Aceptación:** igualdad al umbral se incluye y valores mayores se excluyen; entradas intactas.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/collections.test.ts` pasó (1 archivo, 15 pruebas entre T009–T011); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores. Se verifican valores por debajo, en el umbral y por encima, array vacío y no mutación.
  - **Dependencias/QA:** T006–T008. No añadir reglas según `status`. Implementación revisada y aceptada por el desarrollador.

## Fase 3 — Búsqueda lineal (programación guiada)

- [x] **T012 — `findProductBySKU`**
  - **Archivo/firma:** `src/utils/search.ts` — `findProductBySKU(products: Product[], sku: string): Product | null`.
  - **Objetivo:** realizar búsqueda lineal por SKU ignorando mayúsculas/minúsculas; retornar producto o `null`.
  - **Conceptos:** recorrido lineal, normalización/comparación de cadenas, retorno nullable.
  - **Pruebas:** SKU exacto y con distinta capitalización, primer/último elemento, SKU inexistente y array vacío; retorno del mismo objeto.
  - **Aceptación:** encuentra el producto correcto sin mutar colección ni objeto; ausente retorna `null`.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/search.test.ts` pasó (1 archivo, 6 pruebas); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores. Se validan comparación case-insensitive, retorno nullable, posiciones inicial/final y no mutación.
  - **Dependencias/QA:** T006–T008. No ampliar comportamiento para entradas runtime nulas no contempladas en firma (QA-09). Implementación revisada y aceptada por el desarrollador.

- [x] **T013 — `findShipmentById`**
  - **Archivo/firma:** `src/utils/search.ts` — `findShipmentById(shipments: Shipment[], id: string): Shipment | null`.
  - **Objetivo:** realizar búsqueda lineal por ID y retornar envío o `null`.
  - **Conceptos:** recorrido lineal, comparación de identificadores, retorno nullable.
  - **Pruebas:** ID encontrado al inicio/final, ID ausente, array vacío; retorno del mismo objeto.
  - **Aceptación:** coincide por `id`, retorna `null` si falta y no muta entradas.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/search.test.ts` pasó (1 archivo, 11 pruebas entre T012 y T013); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores. Se verifican ID exacto, primer/último, ausente, vacío y no mutación.
  - **Dependencias/QA:** T006–T008. La sensibilidad de mayúsculas no está especificada; no imponer regla extra. Implementación revisada y aceptada por el desarrollador.

## Fase 4 — Ordenación (programación guiada)

- [x] **T014 — `sortProductsByStock`**
  - **Archivo/firma:** `src/utils/collections.ts` — `sortProductsByStock(products: Product[], order: "asc" | "desc"): Product[]`.
  - **Objetivo:** ordenar por `stockQuantity` según `order`, sin mutar la entrada.
  - **Conceptos:** comparador, orden ascendente/descendente, copia inmutable.
  - **Pruebas:** ambos órdenes, array vacío/unitario, varios valores; comparar orden y referencias de entrada antes/después.
  - **Aceptación:** resultado ordenado correctamente; el array fuente conserva orden y elementos. No fijar expectativa de empates sin resolver QA-04.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/collections.test.ts` pasó (1 archivo, 25 pruebas, entre todas las funciones de colecciones); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores. Para esta función se verifican ambos órdenes, array vacío/unitario, orden correcto y que el array y sus productos no cambian. No se fijan resultados de empates.
  - **Dependencias/QA:** T006–T008. Resolver QA-04 antes de probar desempates/estabilidad.

- [x] **T015 — `sortCarriersByReliability`**
  - **Archivo/firma:** `src/utils/collections.ts` — `sortCarriersByReliability(carriers: Carrier[], order: "asc" | "desc"): Carrier[]`.
  - **Objetivo:** ordenar por `onTimeRate` de acuerdo con `order`, sin mutar la entrada.
  - **Conceptos:** comparadores, invertir orden, inmutabilidad.
  - **Pruebas:** asc/desc, array vacío/unitario, tasas distintas; verificar que entrada y carriers no cambian.
  - **Aceptación:** orden correcto y fuente intacta; casos de tasas iguales se difieren hasta resolver QA-04.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/collections.test.ts` pasó (1 archivo, 25 pruebas, entre todas las funciones de colecciones); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores. Para esta función se verifican ambos órdenes, array vacío/unitario, tasas distintas y que el array y sus carriers no cambian. No se fijan resultados de tasas iguales.
  - **Dependencias/QA:** T006–T008. QA-04 para empates.

## Fase 5 — Validaciones (programación guiada)

- [x] **T016 — `validateProduct`**
  - **Archivo/firma:** `src/utils/validations.ts` — `validateProduct(product: Product): { valid: boolean; errors: string[] }`.
  - **Objetivo:** validar SKU no vacío, peso `> 0` y `<= 100`, cada dimensión `> 0` y `<= 200`, stock y umbral `>= 0`, coste `> 0`.
  - **Conceptos:** predicados, límites inclusivos/exclusivos, acumulación de errores, tipos de retorno.
  - **Pruebas:** caso válido; una violación por regla; límites exactos (peso 0/100, dimensión 0/200, stock/mínimo 0, coste 0); varias violaciones.
  - **Aceptación:** aplica solo esas reglas; válido retorna `{ valid: true, errors: [] }`; inválido retorna `valid: false` con errores. Mensaje/orden y SKU compuesto solo por espacios: QA-10.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/validations.test.ts` pasó (9 pruebas en el archivo para las tres funciones); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores; la suite completa `npm --prefix packages/trackflow-utils test` pasó (4 archivos, 46 pruebas). Se verifican reglas, límites especificados y acumulación de errores. No se fijan reglas para SKU compuesto solo por espacios ni formato/orden de mensajes (QA-10); no se prueban datos runtime malformados (QA-09).
  - **Dependencias/QA:** T006–T008. Resolver QA-09/QA-10 antes de expectativas sobre datos malformados, mensajes, orden o whitespace.

- [x] **T017 — `validateShipment`**
  - **Archivo/firma:** `src/utils/validations.ts` — `validateShipment(shipment: Shipment): { valid: boolean; errors: string[] }`.
  - **Objetivo:** validar `quantity > 0`, `declaredValueUSD > 0` y `destination.distanceKm >= 0`.
  - **Conceptos:** validación de propiedades anidadas, comparación de límites, reporte de errores.
  - **Pruebas:** caso válido; cantidad/valor cero y positivos; distancia cero y negativa; violaciones múltiples.
  - **Aceptación:** distancia cero válida; otros límites siguen las desigualdades estrictas; forma de retorno conforme al contrato.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/validations.test.ts` pasó (9 pruebas en el archivo para las tres funciones); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores; la suite completa `npm --prefix packages/trackflow-utils test` pasó (4 archivos, 46 pruebas). Se verifican cantidad/valor positivos, distancia cero válida y negativa inválida, y acumulación de errores. No se prueban datos runtime malformados ni se fija formato/orden de mensajes (QA-09/QA-10).
  - **Dependencias/QA:** T006–T008. Resolver QA-09/QA-10 antes de ampliar entradas malformadas o fijar política de mensajes.

- [x] **T018 — `validateCarrier`**
  - **Archivo/firma:** `src/utils/validations.ts` — `validateCarrier(carrier: Carrier): { valid: boolean; errors: string[] }`.
  - **Objetivo:** validar tarifas `>= 0`, días y peso máximo `> 0`, `onTimeRate` entre 0 y 100 inclusive y `operatesIn` con al menos un país.
  - **Conceptos:** límites, arrays, varias condiciones y acumulación de errores.
  - **Pruebas:** carrier válido; tasas 0/negativas; días/peso máximo 0; tasa 0/100 y fuera de rango; `operatesIn` vacío/no vacío; errores múltiples.
  - **Aceptación:** aplica todas y solo las reglas indicadas y retorna `valid/errors` con correspondencia correcta.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/validations.test.ts` pasó (9 pruebas en el archivo para las tres funciones); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores; la suite completa `npm --prefix packages/trackflow-utils test` pasó (4 archivos, 46 pruebas). Se verifican tarifas cero/negativas, días y peso máximo, límites de fiabilidad 0/100, países vacíos/no vacíos y acumulación de errores. No se prueban datos runtime malformados ni se fija formato/orden de mensajes (QA-09/QA-10).
  - **Dependencias/QA:** T006–T008. Resolver QA-09/QA-10 antes de validar campos runtime extra o fijar texto/orden de errores.

## Fase 6 — Agrupaciones y reportes (programación guiada)

- [x] **T019 — `countProductsByCategory`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `countProductsByCategory(products: Product[]): Record<ProductCategory, number>`.
  - **Objetivo:** contar productos por categoría.
  - **Conceptos:** acumuladores, `Record`, conteo por clave.
  - **Pruebas:** varias categorías y repetición, categoría ausente, array vacío, no mutación.
  - **Aceptación:** cada conteo corresponde a productos de entrada y el resultado respeta `Record<ProductCategory, number>`.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/transformations.test.ts` pasó (1 archivo, 11 pruebas de las tres funciones de Fase 6); typecheck terminó sin errores y la suite completa pasó (5 archivos, 57 pruebas). Se cubren categorías repetidas/presentes, ausentes en cero, entrada vacía y no mutación. QA-05 aprobada: se devuelven todas las claves de categoría.
  - **Dependencias/QA:** T006–T008. QA-05 aprobada para claves ausentes y entrada vacía.

- [x] **T020 — `groupShipmentsByStatus`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `groupShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, Shipment[]>`.
  - **Objetivo:** agrupar envíos por `status`.
  - **Conceptos:** acumulación en objetos, claves de unión, arrays por grupo.
  - **Pruebas:** uno/varios estados, varios envíos del mismo estado, array vacío, referencias y orden dentro de grupo, no mutación.
  - **Aceptación:** cada envío queda bajo su estado y el resultado respeta el tipo `Record`.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/transformations.test.ts` pasó (1 archivo, 11 pruebas de las tres funciones de Fase 6); typecheck terminó sin errores y la suite completa pasó (5 archivos, 57 pruebas). Se cubren estados presentes/ausentes, varios envíos por estado, array vacío, referencias, orden y no mutación. QA-05 aprobada: se devuelven todas las claves de estado.
  - **Dependencias/QA:** T006–T008. QA-05 aprobada para claves de estado ausentes y entrada vacía.

- [x] **T021 — `findTopCarriers`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `findTopCarriers(shipments: Shipment[], topN: number): Array<{ carrier: string; count: number }>`.
  - **Objetivo:** contar carriers de envíos asignados, omitir `null`, ordenar por uso descendente y limitar a `topN`.
  - **Conceptos:** conteo, `Map`/objeto, ordenación, límites y `null` explícito.
  - **Pruebas:** carrier repetido y distintos, `null`, vacío, `topN` menor/igual/mayor que carriers únicos.
  - **Aceptación:** salida descendente, cada conteo correcto, no incluye `null` y no muta shipments.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/transformations.test.ts` pasó (1 archivo, 11 pruebas de las tres funciones de Fase 6); typecheck terminó sin errores y la suite completa pasó (5 archivos, 57 pruebas). Se verifican conteos, orden descendente y de primera aparición para empates, omisión de `null`, topN, entrada vacía, valores inválidos y no mutación. QA-04 aprobada (estabilidad de primera aparición), QA-06 aprobada (usar literalmente `Shipment.carrier`) y QA-07 aprobada (solo entero positivo; no válido, incluido NaN, devuelve `[]`; valores mayores retornan todos los carriers únicos).
  - **Dependencias/QA:** T006–T008. QA-04, QA-06 y QA-07 aprobadas para las reglas descritas en la verificación.

## Fase 7 — Búsqueda binaria (programación guiada)

- [x] **T022 — `binarySearchProductByWeight`**
  - **Archivo/firma:** `src/utils/search.ts` — `binarySearchProductByWeight(sortedProducts: Product[], targetWeight: number): number`.
  - **Objetivo:** buscar por `weightKg` en array ya ordenado ascendentemente; retornar índice o `-1`.
  - **Conceptos:** búsqueda binaria, límites inclusivos, cálculo de punto medio, complejidad logarítmica.
  - **Pruebas:** coincidencia al inicio/medio/final; peso ausente antes/entre/después; vacío y unitario.
  - **Aceptación:** índice corresponde a producto con peso objetivo; ausente retorna `-1`; entrada intacta y precondición de orden respetada.
  - **Verificación:** `npm --prefix packages/trackflow-utils test -- tests/phase-7-9.test.ts` pasó (13 pruebas de Fases 7–9); `npm --prefix packages/trackflow-utils run typecheck` terminó sin errores; suite completa: 6 archivos y 70 pruebas pasaron. Se cubren primer/medio/último, ausente antes/entre/después, vacío/unitario, igualdad exacta y no mutación.
  - **Dependencias/QA:** T006–T008. QA-08 aprobada: igualdad exacta y cualquier índice coincidente si hay duplicados; la función no ordena la entrada.

## Fase 8 — Cálculos numéricos (programación guiada)

- [x] **T023 — `calculateTotalInventoryValue`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `calculateTotalInventoryValue(products: Product[]): number`.
  - **Objetivo:** sumar `stockQuantity * unitCostUSD` y redondear a dos decimales.
  - **Conceptos:** `reduce`, acumulación monetaria, redondeo.
  - **Pruebas:** producto único, varios productos, stock cero, suma que requiere redondeo y lista vacía; no mutación.
  - **Aceptación:** total coincide con la fórmula y dos decimales; no altera entradas.
  - **Verificación:** prueba enfocada de Fases 7–9 y typecheck pasaron; suite completa: 6 archivos y 70 pruebas pasaron. Se comprueban varios productos, redondeo, stock cero, entrada vacía y no mutación.
  - **Dependencias/QA:** T006–T008. No se añadieron reglas para datos runtime no finitos/null (QA-09).

- [x] **T024 — `calculateAverageShipmentDistance`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `calculateAverageShipmentDistance(shipments: Shipment[]): number`.
  - **Objetivo:** calcular la media de `destination.distanceKm`, redondeada a dos decimales.
  - **Conceptos:** suma/media, acceso anidado, redondeo.
  - **Pruebas:** un envío, varias distancias incluyendo cero, promedio que requiere redondeo, vacío.
  - **Aceptación:** media y redondeo correctos; resultado para lista vacía es cero según decisión aprobada.
  - **Verificación:** prueba enfocada de Fases 7–9 y typecheck pasaron; suite completa: 6 archivos y 70 pruebas pasaron. Se comprueban vacío, un envío, múltiples distancias, distancia cero y redondeo.
  - **Dependencias/QA:** T006–T008. QA-05 aprobada para esta función: lista vacía retorna `0`.

- [x] **T025 — `calculateShippingCost`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `calculateShippingCost(shipment: Shipment, product: Product, carrier: Carrier): number`.
  - **Objetivo:** combinar tarifa base, `weightKg * ratePerKgUSD * quantity`, `distanceKm * ratePerKmUSD` y recargo Standard 0 %, Express 30 %, Same-day 60 %; retornar dos decimales.
  - **Conceptos:** fórmula por componentes, porcentajes, selección condicional y redondeo monetario.
  - **Pruebas:** cada prioridad, peso/cantidad/distancia, tasas o distancia cero, subtotal que requiere redondeo.
  - **Aceptación:** usa los campos/fórmulas exactos del briefing y redondea a dos decimales según la base del recargo aprobada.
  - **Verificación:** prueba enfocada de Fases 7–9 y typecheck pasaron; suite completa: 6 archivos y 70 pruebas pasaron. Se prueban las tres prioridades, componentes del subtotal, cálculo de cantidad y redondeo.
  - **Dependencias/QA:** T006–T008. QA-03 aprobada: recargo aplicado al subtotal completo (base + peso + distancia). No se añadieron reglas runtime de QA-09.

## Fase 9 — Scoring y selección de transportistas (programación guiada)

- [x] **T026 — `scoreCarrierForShipment`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `scoreCarrierForShipment(carrier: Carrier, shipment: Shipment, product: Product): number`.
  - **Objetivo:** puntuar país (+20), peso permitido (+20), prioridad (+15), manejo de frágil (+15 según regla) y fiabilidad (`onTimeRate * 0.3`); redondear a dos decimales.
  - **Conceptos:** puntuación compuesta, condicionales, límites de peso, suma y redondeo.
  - **Pruebas:** cada criterio activado/desactivado aisladamente, frágil/no frágil, peso exactamente al máximo y superior, fiabilidad 0/100/intermedia.
  - **Aceptación:** matriz detallada aplicada exactamente y score conforme a los puntos definidos.
  - **Verificación:** prueba enfocada de Fases 7–9 y typecheck pasaron; suite completa: 6 archivos y 70 pruebas pasaron. Se cubren país, peso total y límite, prioridad, producto frágil/no frágil, fiabilidad y redondeo.
  - **Dependencias/QA:** T006–T008. QA-02 aprobada: aplicar solo la matriz detallada; no agregar puntos de coste o velocidad.

- [x] **T027 — `selectBestCarrier`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `selectBestCarrier(carriers: Carrier[], shipment: Shipment, product: Product): { carrier: Carrier; score: number; cost: number } | null`.
  - **Objetivo:** evaluar carriers, excluir score `< 50` y retornar el elegible de menor coste con score/cost, o `null`.
  - **Conceptos:** composición de funciones, filtrado, selección mínima y retorno nullable.
  - **Pruebas:** lista vacía, ninguno elegible, score debajo y exactamente 50, más de un elegible con costes distintos; verificar datos del ganador.
  - **Aceptación:** no selecciona score `< 50`, acepta 50, compara costes y retorna `null` si no hay elegibles.
  - **Verificación:** prueba enfocada de Fases 7–9 y typecheck pasaron; suite completa: 6 archivos y 70 pruebas pasaron. Se comprueban entrada vacía, inelegibilidad, umbral inclusivo de 50, menor coste y desempate.
  - **Dependencias/QA:** T025 y T026. QA-02 y QA-03 aprobadas como se documenta arriba; QA-04 aprobada específicamente para selección: ante coste mínimo empatado, gana el primer carrier elegible de la entrada.

## Fase final — Verificación y entrega

- [x] **T028 — Ejecutar todas las pruebas.** Correr `npm --prefix packages/trackflow-utils test` después de que todas las funciones autorizadas estén implementadas y sus tests activos.
  - **Dependencias:** T009–T027 y QA resueltas para los casos incluidos.
  - **Verificación:** `npm --prefix packages/trackflow-utils test` pasó el 2026-11-17: 6 archivos, 78 pruebas aprobadas. No se omitieron pruebas de la suite; siguen abiertas QA-04 para empates de ordenación, y QA-09/QA-10 para comportamientos no fijados; no se presentan como aprobados.
  - **Finalización:** suite completa pasa; las reglas aprobadas y las QA aún abiertas quedan distinguidas.

- [x] **T029 — Verificar TypeScript sin errores.** Ejecutar `npm --prefix packages/trackflow-utils run typecheck` con `strict` habilitado.
  - **Dependencias:** T006–T027.
  - **Verificación:** `npm --prefix packages/trackflow-utils run typecheck` pasó el 2026-11-17 con `strict: true`; cotejo de las 19 firmas definidas en los cuatro módulos de utilidades frente a `utils/requirements.md` y `utils/requirements.es.md`; `src/index.ts` exporta las 19 funciones y los modelos/tipos. La superficie pública fue añadida al barrel durante esta tarea.
  - **Finalización:** typecheck exitoso y contratos públicos exportados desde `src/index.ts`.

- [x] **T030 — Revisar pureza y no mutación.** Verificar que todas las funciones dependen de parámetros, no producen efectos externos y no alteran arrays/objetos recibidos.
  - **Dependencias:** T009–T027.
  - **Verificación:** revisión de las 19 implementaciones: todas son cálculos/recorridos sobre argumentos sin I/O, estado global ni asignación a propiedades de entrada; ordenaciones operan sobre copias. Tests explícitos de no mutación cubren filtros, ordenamientos, búsquedas, agregaciones, cálculos, scoring, selección y los tres validadores. Suite completa: 78/78.
  - **Finalización:** revisión de pureza completa; no se detectaron mutaciones ni efectos externos.

- [x] **T031 — Documentar comandos de uso y validación.** Actualizar el README propio del paquete con los comandos reales de instalación local, typecheck y pruebas.
  - **Dependencias:** T002–T005 y comandos finales verificados.
  - **Verificación:** `packages/trackflow-utils/README.md` actualizado con `npm --prefix packages/trackflow-utils ci`, `run typecheck`, `test` y ejemplo de test enfocado; cada comando coincide con el manifiesto/lockfile local y no requiere runner raíz.
  - **Finalización:** README documenta los comandos disponibles y la API presente.

- [x] **T032 — Revisar aceptación completa contra SPEC.** Recorrer CA-01 a CA-10, las firmas, límites, no mutación y QA aprobadas; anotar evidencias de ejecución.
  - **Dependencias:** T028–T031.
  - **Verificación:** CA-01–CA-08 y CA-10 cotejados con modelos, funciones, tests y revisión de pureza; CA-09 cotejado con casos límite y decisiones QA registradas. Suite 78/78 y typecheck strict pasaron. QA-01, QA-04 (empates de ordenación no definidos), QA-09/QA-10 quedan pendientes para nombre del hito, datos runtime malformados, valores no finitos, SKU en blanco/whitespace y política de mensajes; no se agregaron reglas por inferencia. La comparación EN/ES identificó nombres/enlaces inconsistentes; se mantienen los archivos sin rename/restore y la ruta definitiva requiere decisión.
  - **Finalización:** todos los criterios tienen evidencia o limitaciones/QA pendientes reportadas; no se declara resuelto aquello que sigue abierto.

- [ ] **T033 — Preparar commit y Pull Request hacia `main` (bloqueado por autorización).** Revisar estado/diff, preparar resumen y propuesta de commit/PR. Ejecutar commit, push o crear PR solo después de autorización explícita del desarrollador para cada operación.
  - **Dependencias:** T032 y autorización explícita. Revisar Memory Bank, README del paquete, cambios ajenos y archivos dentro del alcance.
  - **Finalización:** sin acción Git hasta recibir autorización; cuando se autorice, destino de PR `main`, cambios limitados al alcance aprobado y verificaciones comunicadas.

## Cierre

Esta lista define el orden y las verificaciones. T001–T032 reflejan trabajo y evidencia ejecutados; T033 no está completada ni autorizada. QA-02, QA-03, QA-04 (para cada decisión específica), QA-05, QA-06, QA-07 y QA-08 tienen las aprobaciones de alcance acotado anotadas en las tareas dependientes. QA-01, QA-09 y QA-10 siguen pendientes; las propuestas no aprobadas no se convierten en requisitos por estar documentadas aquí.
