# TASKS 003-domain-models: utilidades de inventario y transportistas

- **Fecha:** 2026-11-13.
- **Estado:** planificación aprobada; todas las tareas están pendientes. No se ha comenzado la implementación.
- **Fuentes aprobadas:** [SPEC 003](spec.md) y [PLAN 003](plan.md); los [requisitos ES](utils/requirements.md) y [EN](utils/requirements.en.md) son la fuente de contratos y reglas.
- **Alcance:** paquete privado `packages/trackflow-utils/`, sin tocar la web, `packages/shared/`, manifiestos raíz, otros paquetes, backend, persistencia o IA.
- **Inventario:** 33 tareas en 11 fases. T009–T027 corresponden a las 19 funciones requeridas, una tarea independiente por función.

## Reglas de ejecución y aprendizaje

- Todas las casillas comienzan pendientes. Marcar una tarea solo después de completar sus criterios y registrar la verificación efectivamente realizada.
- Copilot prepara la estructura, configuración local aprobada, modelos exactos, firmas y pruebas sin lógica de negocio. El desarrollador revisa los tipos y desarrolla cada función.
- Una tarea de función requiere autorización explícita antes de comenzar. Copilot no implementa automáticamente funciones pendientes ni avanza a otra función sin autorización nueva.
- La ayuda ordinaria consiste en explicar, preguntar, dar pistas y revisar. El desarrollador puede pedir un ejemplo parcial o ayuda más directa para la función concreta activa.
- Después de una implementación autorizada, Copilot puede ejecutar la prueba enfocada y el chequeo de tipos, explicar fallos y proponer correcciones. No altera la lógica sin petición explícita.
- Las decisiones QA-02 a QA-10 siguen siendo propuestas hasta aprobación. Una prueba que dependa de ellas debe quedar pendiente/no ejecutable hasta confirmar la regla; redactar el test no la aprueba.
- No ejecutar comandos raíz. Usar solo los scripts documentados del paquete una vez creados. No hacer commits, push ni Pull Requests sin autorización explícita para cada operación.

## Fase 0 — Preparación del proyecto (Copilot)

### T001 — Confirmar línea base y límites

- [ ] **T001 — Comprobar el destino y preservar el monorepo.** Revisar estado Git, confirmar que `packages/trackflow-utils/` no existe y que la web y `packages/shared/` quedan fuera de alcance.
  - **Archivos:** solo lectura del estado Git y árbol de `packages/` y `uis/website/`.
  - **Dependencias:** ninguna.
  - **Finalización:** registrar cambios preexistentes y confirmar que el trabajo se limita al paquete nuevo; no limpiar archivos ni cambiar archivos ajenos.

### T002 — Crear el esqueleto y documentarlo

- [ ] **T002 — Crear la estructura local del paquete.** Crear `packages/trackflow-utils/`, `src/`, `src/utils/` y `tests/`; añadir un README con objetivo, alcance y cómo se documentarán los comandos verificados.
  - **Archivos:** paquete nuevo, sus carpetas y `README.md`.
  - **Dependencias:** T001; ubicación `packages/trackflow-utils/` y nombre privado aprobados.
  - **Finalización:** la estructura vive solo en `packages/trackflow-utils/`; no se crea `src/` en la raíz ni se modifica README de plantilla.

### T003 — Configurar el paquete y TypeScript

- [ ] **T003 — Preparar `package.json`, `tsconfig.json` y lockfile local.** Declarar el paquete privado `@repo/trackflow-utils`, scripts locales `typecheck` y `test`, TypeScript estricto y opciones compatibles con el entorno comprobado de Codespaces.
  - **Archivos:** `packages/trackflow-utils/package.json`, `tsconfig.json` y `package-lock.json`.
  - **Dependencias:** T002; versiones de Node/npm/TypeScript revisadas en Codespaces.
  - **Finalización:** configuración autocontenida, `noEmit`, inclusión limitada a fuentes/tests del paquete; ninguna modificación a manifiestos o lockfiles raíz. Registrar en README versiones y decisiones aplicadas.

### T004 — Configurar Vitest y prueba de arranque

- [ ] **T004 — Preparar Vitest y comprobar el arnés de pruebas.** Añadir Vitest como dependencia local aprobada, configuración mínima si fuera necesaria y una prueba de humo que no implemente reglas del dominio.
  - **Archivos:** configuración local y `tests/setup.test.ts` (o equivalente justificado en README).
  - **Dependencias:** T003.
  - **Finalización:** el test runner inicia y la prueba de humo pasa; la prueba no contiene soluciones ni lógica de las funciones requeridas.

### T005 — Verificar la preparación

- [ ] **T005 — Ejecutar typecheck y prueba de arranque.** Verificar los scripts locales desde la raíz usando `npm --prefix packages/trackflow-utils run typecheck` y `npm --prefix packages/trackflow-utils test`.
  - **Archivos:** los de T002–T004; corregir solo defectos de preparación autorizados.
  - **Dependencias:** T004.
  - **Finalización:** ambos comandos completan correctamente; registrar salidas/resumen y versiones en el README. No declarar funciones implementadas.

## Fase 1 — Modelos de dominio (Copilot + revisión del desarrollador)

- [ ] **T006 — Definir modelos exactos en `src/models.ts`.** Copiar las declaraciones del briefing/SPEC para `Product`, `Dimensions`, `Shipment`, `Destination`, `Carrier`, `InventoryMovement`, `ProductCategory`, `WarehouseLocation`, `ProductStatus`, `Country`, `ShipmentPriority`, `ShipmentStatus` y `MovementType`.
  - **Firma/contrato:** conservar exactamente propiedades, nombres, uniones y tipos de §4 de SPEC 003; en particular `Shipment.carrier: string | null` y fechas `Date`.
  - **Dependencias:** T005. No agregar campos, validaciones ni tipos no especificados.
  - **Finalización:** revisión literal contra la SPEC; TypeScript reconoce referencias cruzadas y uniones bajo `strict`. Esta tarea crea tipos solamente, no funciones.

- [ ] **T007 — Explicar los modelos y sus relaciones.** Explicar al desarrollador cada interfaz, sus propiedades y las referencias entre modelos (`Product`–`Dimensions`, `Shipment`–`Destination`, `Carrier`–`Country`/`ShipmentPriority`, `InventoryMovement`–`WarehouseLocation`/`MovementType`).
  - **Dependencias:** T006.
  - **Finalización:** explicación revisada en conversación; dudas se aclaran antes de continuar.

- [ ] **T008 — Verificar el tipado de los modelos.** Ejecutar `npm --prefix packages/trackflow-utils run typecheck` y revisar que las exportaciones de `src/index.ts` exponen los modelos aprobados.
  - **Dependencias:** T006–T007.
  - **Finalización:** chequeo sin errores y contratos exportados sin cambios semánticos; no hay implementación funcional.

## Protocolo para T009–T027

Cada tarea de función se autoriza de forma independiente. Copilot prepara en esa tarea la declaración exacta y los tests descritos, sin solución de negocio. El desarrollador implementa la función; luego se ejecuta la prueba enfocada y el typecheck, se revisan los errores y se explica el resultado. No comenzar la siguiente tarea sin autorización explícita. Si hay una QA pendiente, avanzar solo en los casos confirmados y dejar los demás sin resolver hasta su aprobación.

## Fase 2 — Filtrado de productos (programación guiada)

- [ ] **T009 — `filterProductsByWarehouse`**
  - **Archivo/firma:** `src/utils/collections.ts` — `filterProductsByWarehouse(products: Product[], warehouse: WarehouseLocation): Product[]`.
  - **Objetivo:** retornar productos cuyo `warehouse` coincide.
  - **Conceptos:** `filter`, predicados, tipos unión, arrays.
  - **Pruebas:** coincidencias múltiples y una; ningún resultado; array vacío; entrada sin mutaciones.
  - **Aceptación:** solo contiene coincidencias, conserva el orden de entrada y no modifica array ni productos.
  - **Dependencias/QA:** T006–T008. Ninguna QA bloqueante para el contrato especificado.

- [ ] **T010 — `filterProductsByCategory`**
  - **Archivo/firma:** `src/utils/collections.ts` — `filterProductsByCategory(products: Product[], category: ProductCategory): Product[]`.
  - **Objetivo:** retornar productos cuya `category` coincide.
  - **Conceptos:** `filter`, comparación de literales, arrays.
  - **Pruebas:** una/múltiples coincidencias, otras categorías, ningún resultado, vacío y no mutación.
  - **Aceptación:** devuelve exactamente los productos de la categoría, en orden original, sin alterar entradas.
  - **Dependencias/QA:** T006–T008. Ninguna QA bloqueante para los casos tipados.

- [ ] **T011 — `filterLowStockProducts`**
  - **Archivo/firma:** `src/utils/collections.ts` — `filterLowStockProducts(products: Product[]): Product[]`.
  - **Objetivo:** retornar productos con `stockQuantity <= minStockThreshold`.
  - **Conceptos:** comparación inclusiva, límites, predicados.
  - **Pruebas:** stock menor, exactamente igual y mayor al umbral; array vacío; no mutación.
  - **Aceptación:** igualdad al umbral se incluye y valores mayores se excluyen; entradas intactas.
  - **Dependencias/QA:** T006–T008. No añadir reglas según `status`.

## Fase 3 — Búsqueda lineal (programación guiada)

- [ ] **T012 — `findProductBySKU`**
  - **Archivo/firma:** `src/utils/search.ts` — `findProductBySKU(products: Product[], sku: string): Product | null`.
  - **Objetivo:** realizar búsqueda lineal por SKU ignorando mayúsculas/minúsculas; retornar producto o `null`.
  - **Conceptos:** recorrido lineal, normalización/comparación de cadenas, retorno nullable.
  - **Pruebas:** SKU exacto y con distinta capitalización, primer/último elemento, SKU inexistente y array vacío; retorno del mismo objeto.
  - **Aceptación:** encuentra el producto correcto sin mutar colección ni objeto; ausente retorna `null`.
  - **Dependencias/QA:** T006–T008. No ampliar comportamiento para entradas runtime nulas no contempladas en firma (QA-09).

- [ ] **T013 — `findShipmentById`**
  - **Archivo/firma:** `src/utils/search.ts` — `findShipmentById(shipments: Shipment[], id: string): Shipment | null`.
  - **Objetivo:** realizar búsqueda lineal por ID y retornar envío o `null`.
  - **Conceptos:** recorrido lineal, comparación de identificadores, retorno nullable.
  - **Pruebas:** ID encontrado al inicio/final, ID ausente, array vacío; retorno del mismo objeto.
  - **Aceptación:** coincide por `id`, retorna `null` si falta y no muta entradas.
  - **Dependencias/QA:** T006–T008. La sensibilidad de mayúsculas no está especificada; no imponer regla extra.

## Fase 4 — Ordenación (programación guiada)

- [ ] **T014 — `sortProductsByStock`**
  - **Archivo/firma:** `src/utils/collections.ts` — `sortProductsByStock(products: Product[], order: "asc" | "desc"): Product[]`.
  - **Objetivo:** ordenar por `stockQuantity` según `order`, sin mutar la entrada.
  - **Conceptos:** comparador, orden ascendente/descendente, copia inmutable.
  - **Pruebas:** ambos órdenes, array vacío/unitario, varios valores; comparar orden y referencias de entrada antes/después.
  - **Aceptación:** resultado ordenado correctamente; el array fuente conserva orden y elementos. No fijar expectativa de empates sin resolver QA-04.
  - **Dependencias/QA:** T006–T008. Resolver QA-04 antes de probar desempates/estabilidad.

- [ ] **T015 — `sortCarriersByReliability`**
  - **Archivo/firma:** `src/utils/collections.ts` — `sortCarriersByReliability(carriers: Carrier[], order: "asc" | "desc"): Carrier[]`.
  - **Objetivo:** ordenar por `onTimeRate` de acuerdo con `order`, sin mutar la entrada.
  - **Conceptos:** comparadores, invertir orden, inmutabilidad.
  - **Pruebas:** asc/desc, array vacío/unitario, tasas distintas; verificar que entrada y carriers no cambian.
  - **Aceptación:** orden correcto y fuente intacta; casos de tasas iguales se difieren hasta resolver QA-04.
  - **Dependencias/QA:** T006–T008. QA-04 para empates.

## Fase 5 — Validaciones (programación guiada)

- [ ] **T016 — `validateProduct`**
  - **Archivo/firma:** `src/utils/validations.ts` — `validateProduct(product: Product): { valid: boolean; errors: string[] }`.
  - **Objetivo:** validar SKU no vacío, peso `> 0` y `<= 100`, cada dimensión `> 0` y `<= 200`, stock y umbral `>= 0`, coste `> 0`.
  - **Conceptos:** predicados, límites inclusivos/exclusivos, acumulación de errores, tipos de retorno.
  - **Pruebas:** caso válido; una violación por regla; límites exactos (peso 0/100, dimensión 0/200, stock/mínimo 0, coste 0); varias violaciones.
  - **Aceptación:** aplica solo esas reglas; válido retorna `{ valid: true, errors: [] }`; inválido retorna `valid: false` con errores. Mensaje/orden y SKU compuesto solo por espacios: QA-10.
  - **Dependencias/QA:** T006–T008. Resolver QA-09/QA-10 antes de expectativas sobre datos malformados, mensajes, orden o whitespace.

- [ ] **T017 — `validateShipment`**
  - **Archivo/firma:** `src/utils/validations.ts` — `validateShipment(shipment: Shipment): { valid: boolean; errors: string[] }`.
  - **Objetivo:** validar `quantity > 0`, `declaredValueUSD > 0` y `destination.distanceKm >= 0`.
  - **Conceptos:** validación de propiedades anidadas, comparación de límites, reporte de errores.
  - **Pruebas:** caso válido; cantidad/valor cero y positivos; distancia cero y negativa; violaciones múltiples.
  - **Aceptación:** distancia cero válida; otros límites siguen las desigualdades estrictas; forma de retorno conforme al contrato.
  - **Dependencias/QA:** T006–T008. Resolver QA-09/QA-10 antes de ampliar entradas malformadas o fijar política de mensajes.

- [ ] **T018 — `validateCarrier`**
  - **Archivo/firma:** `src/utils/validations.ts` — `validateCarrier(carrier: Carrier): { valid: boolean; errors: string[] }`.
  - **Objetivo:** validar tarifas `>= 0`, días y peso máximo `> 0`, `onTimeRate` entre 0 y 100 inclusive y `operatesIn` con al menos un país.
  - **Conceptos:** límites, arrays, varias condiciones y acumulación de errores.
  - **Pruebas:** carrier válido; tasas 0/negativas; días/peso máximo 0; tasa 0/100 y fuera de rango; `operatesIn` vacío/no vacío; errores múltiples.
  - **Aceptación:** aplica todas y solo las reglas indicadas y retorna `valid/errors` con correspondencia correcta.
  - **Dependencias/QA:** T006–T008. Resolver QA-09/QA-10 antes de validar campos runtime extra o fijar texto/orden de errores.

## Fase 6 — Agrupaciones y reportes (programación guiada)

- [ ] **T019 — `countProductsByCategory`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `countProductsByCategory(products: Product[]): Record<ProductCategory, number>`.
  - **Objetivo:** contar productos por categoría.
  - **Conceptos:** acumuladores, `Record`, conteo por clave.
  - **Pruebas:** varias categorías y repetición, categoría ausente, array vacío, no mutación.
  - **Aceptación:** cada conteo corresponde a productos de entrada y el resultado respeta `Record<ProductCategory, number>`.
  - **Dependencias/QA:** T006–T008. Resolver QA-05 antes de determinar si las categorías ausentes deben tener cero o pueden omitirse.

- [ ] **T020 — `groupShipmentsByStatus`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `groupShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, Shipment[]>`.
  - **Objetivo:** agrupar envíos por `status`.
  - **Conceptos:** acumulación en objetos, claves de unión, arrays por grupo.
  - **Pruebas:** uno/varios estados, varios envíos del mismo estado, array vacío, referencias y orden dentro de grupo, no mutación.
  - **Aceptación:** cada envío queda bajo su estado y el resultado respeta el tipo `Record`.
  - **Dependencias/QA:** T006–T008. Resolver QA-05 antes de decidir claves de estado sin envíos.

- [ ] **T021 — `findTopCarriers`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `findTopCarriers(shipments: Shipment[], topN: number): Array<{ carrier: string; count: number }>`.
  - **Objetivo:** contar carriers de envíos asignados, omitir `null`, ordenar por uso descendente y limitar a `topN`.
  - **Conceptos:** conteo, `Map`/objeto, ordenación, límites y `null` explícito.
  - **Pruebas:** carrier repetido y distintos, `null`, vacío, `topN` menor/igual/mayor que carriers únicos.
  - **Aceptación:** salida descendente, cada conteo correcto, no incluye `null` y no muta shipments.
  - **Dependencias/QA:** T006–T008. Resolver QA-04 (empates), QA-06 (nombre o ID) y QA-07 (`topN` no positivo/no entero/superior) antes de fijar esos resultados.

## Fase 7 — Búsqueda binaria (programación guiada)

- [ ] **T022 — `binarySearchProductByWeight`**
  - **Archivo/firma:** `src/utils/search.ts` — `binarySearchProductByWeight(sortedProducts: Product[], targetWeight: number): number`.
  - **Objetivo:** buscar por `weightKg` en array ya ordenado ascendentemente; retornar índice o `-1`.
  - **Conceptos:** búsqueda binaria, límites inclusivos, cálculo de punto medio, complejidad logarítmica.
  - **Pruebas:** coincidencia al inicio/medio/final; peso ausente antes/entre/después; vacío y unitario.
  - **Aceptación:** índice corresponde a producto con peso objetivo; ausente retorna `-1`; entrada intacta y precondición de orden respetada.
  - **Dependencias/QA:** T006–T008. Resolver QA-08 antes de fijar duplicados y tolerancia decimal; no ordenar la lista dentro de esta función.

## Fase 8 — Cálculos numéricos (programación guiada)

- [ ] **T023 — `calculateTotalInventoryValue`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `calculateTotalInventoryValue(products: Product[]): number`.
  - **Objetivo:** sumar `stockQuantity * unitCostUSD` y redondear a dos decimales.
  - **Conceptos:** `reduce`, acumulación monetaria, redondeo.
  - **Pruebas:** producto único, varios productos, stock cero, suma que requiere redondeo y lista vacía; no mutación.
  - **Aceptación:** total coincide con la fórmula y dos decimales; no altera entradas.
  - **Dependencias/QA:** T006–T008. Casos runtime no finitos/null, si se desean, dependen de QA-09; no añadir reglas implícitas.

- [ ] **T024 — `calculateAverageShipmentDistance`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `calculateAverageShipmentDistance(shipments: Shipment[]): number`.
  - **Objetivo:** calcular la media de `destination.distanceKm`, redondeada a dos decimales.
  - **Conceptos:** suma/media, acceso anidado, redondeo.
  - **Pruebas:** un envío, varias distancias incluyendo cero, promedio que requiere redondeo, vacío.
  - **Aceptación:** media y redondeo correctos; resultado para lista vacía solo se acepta tras decisión.
  - **Dependencias/QA:** T006–T008. Resolver QA-05 antes de fijar el resultado vacío.

- [ ] **T025 — `calculateShippingCost`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `calculateShippingCost(shipment: Shipment, product: Product, carrier: Carrier): number`.
  - **Objetivo:** combinar tarifa base, `weightKg * ratePerKgUSD * quantity`, `distanceKm * ratePerKmUSD` y recargo Standard 0 %, Express 30 %, Same-day 60 %; retornar dos decimales.
  - **Conceptos:** fórmula por componentes, porcentajes, selección condicional y redondeo monetario.
  - **Pruebas:** cada prioridad, peso/cantidad/distancia, tasas o distancia cero, subtotal que requiere redondeo.
  - **Aceptación:** usa los campos/fórmulas exactos del briefing y redondea a dos decimales según la base del recargo aprobada.
  - **Dependencias/QA:** T006–T008. Resolver QA-03 antes de implementar o fijar resultados del recargo; QA-09 solo si se amplía a datos runtime inválidos.

## Fase 9 — Scoring y selección de transportistas (programación guiada)

- [ ] **T026 — `scoreCarrierForShipment`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `scoreCarrierForShipment(carrier: Carrier, shipment: Shipment, product: Product): number`.
  - **Objetivo:** puntuar país (+20), peso permitido (+20), prioridad (+15), manejo de frágil (+15 según regla) y fiabilidad (`onTimeRate * 0.3`); redondear a dos decimales.
  - **Conceptos:** puntuación compuesta, condicionales, límites de peso, suma y redondeo.
  - **Pruebas:** cada criterio activado/desactivado aisladamente, frágil/no frágil, peso exactamente al máximo y superior, fiabilidad 0/100/intermedia.
  - **Aceptación:** matriz detallada aplicada exactamente y score conforme a los puntos definidos.
  - **Dependencias/QA:** T006–T008. Resolver QA-02 sobre la discrepancia del resumen coste/velocidad frente a la fórmula detallada antes de fijar el contrato de prueba; no añadir puntos por cuenta propia.

- [ ] **T027 — `selectBestCarrier`**
  - **Archivo/firma:** `src/utils/transformations.ts` — `selectBestCarrier(carriers: Carrier[], shipment: Shipment, product: Product): { carrier: Carrier; score: number; cost: number } | null`.
  - **Objetivo:** evaluar carriers, excluir score `< 50` y retornar el elegible de menor coste con score/cost, o `null`.
  - **Conceptos:** composición de funciones, filtrado, selección mínima y retorno nullable.
  - **Pruebas:** lista vacía, ninguno elegible, score debajo y exactamente 50, más de un elegible con costes distintos; verificar datos del ganador.
  - **Aceptación:** no selecciona score `< 50`, acepta 50, compara costes y retorna `null` si no hay elegibles.
  - **Dependencias/QA:** T025 y T026. Resolver QA-02 (score), QA-03 (coste) y QA-04 (empate de coste) antes de aceptar casos dependientes.

## Fase final — Verificación y entrega

- [ ] **T028 — Ejecutar todas las pruebas.** Correr `npm --prefix packages/trackflow-utils test` después de que todas las funciones autorizadas estén implementadas y sus tests activos.
  - **Dependencias:** T009–T027 y QA resueltas para los casos incluidos.
  - **Finalización:** suite completa pasa; reportar pruebas bloqueadas/omitidas y sus QA, sin presentarlas como aprobadas.

- [ ] **T029 — Verificar TypeScript sin errores.** Ejecutar `npm --prefix packages/trackflow-utils run typecheck` con `strict` habilitado.
  - **Dependencias:** T006–T027.
  - **Finalización:** typecheck exitoso y contratos públicos exportados desde `src/index.ts`.

- [ ] **T030 — Revisar pureza y no mutación.** Verificar que todas las funciones dependen de parámetros, no producen efectos externos y no alteran arrays/objetos recibidos.
  - **Dependencias:** T009–T027.
  - **Finalización:** casos de mutación pasan en filtros, ordenaciones, búsquedas, agregaciones, cálculos, scoring y validaciones; cualquier limitación se documenta.

- [ ] **T031 — Documentar comandos de uso y validación.** Actualizar el README propio del paquete con los comandos reales de instalación local, typecheck y pruebas.
  - **Dependencias:** T002–T005 y comandos finales verificados.
  - **Finalización:** README describe únicamente comandos disponibles en el manifiesto local, desde el directorio correcto, sin inventar runner raíz.

- [ ] **T032 — Revisar aceptación completa contra SPEC.** Recorrer CA-01 a CA-10, las firmas, límites, no mutación y QA aprobadas; anotar evidencias de ejecución.
  - **Dependencias:** T028–T031.
  - **Finalización:** cada criterio está probado, bloqueado por decisión pendiente o reportado con evidencia; no se declara éxito no ejecutado.

- [ ] **T033 — Preparar commit y Pull Request hacia `main` (bloqueado por autorización).** Revisar estado/diff, preparar resumen y propuesta de commit/PR. Ejecutar commit, push o crear PR solo después de autorización explícita del desarrollador para cada operación.
  - **Dependencias:** T032 y autorización explícita. Revisar Memory Bank, README del paquete, cambios ajenos y archivos dentro del alcance.
  - **Finalización:** sin acción Git hasta recibir autorización; cuando se autorice, destino de PR `main`, cambios limitados al alcance aprobado y verificaciones comunicadas.

## Cierre

Esta lista define el orden y las verificaciones, pero no inicia trabajo de implementación. Las tareas T009–T027 permanecen sujetas a autorización individual. QA-02 a QA-10 se mantienen como propuestas pendientes hasta confirmación expresa; ninguna tarea las convierte en requisitos por estar documentada aquí.
