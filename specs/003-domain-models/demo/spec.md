# SPEC — TrackFlow Operations Playground

- **Fecha:** 2026-11-17.
- **Estado:** SPEC aprobada por el desarrollador para implementación; ver autorización registrada en [TASKS](tasks.md). La implementación está cerrada con límites de verificación pendientes documentados en TASKS.
- **Funcionalidad:** demo interna opcional del hito `003-domain-models`.
- **Idioma:** español; conservar exactamente los identificadores, nombres de función, propiedades y literales TypeScript.
- **Objetivo:** definir la experiencia web interactiva aprobada que consume `@repo/trackflow-utils`; las decisiones autorizadas de implementación se detallan en el PLAN.

## 1. Contexto y objetivo

`packages/trackflow-utils/` ya contiene modelos y 19 funciones TypeScript puras para filtrar, buscar, ordenar, calcular, agregar y validar datos de inventario, envíos y transportistas. Este playground propone una interfaz interna de demostración para explorar ese comportamiento mediante datos sintéticos, controles comprensibles y resultados visibles.

El propósito es didáctico y demostrativo: permitir a una persona navegar por inventario, envíos, transportistas, validaciones y reportes, probar parámetros y observar el resultado de las funciones reales del paquete. No es un producto operativo, fuente de datos de producción ni herramienta para decidir o ejecutar operaciones reales.

La aplicación debe invocar la API pública existente de `@repo/trackflow-utils` —los modelos/tipos y las 19 funciones exportadas por `src/index.ts`— en vez de copiar fórmulas, reimplementar algoritmos o presentar resultados precalculados como si fueran interactivos. Las firmas y el comportamiento del paquete no se alteran para facilitar el demo. Si el frontend no puede consumir directamente el paquete por su configuración actual, la forma técnica de integración debe resolverse en PLAN; no se permite una copia paralela de la lógica.

## 2. Fuentes y precedencia

| Fuente                                                                                                                                                                                                                                              | Uso en esta SPEC                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SPEC 003 del dominio](../spec.md), [requisitos EN](../utils/requirements.md), [requisitos ES](../utils/requirements.es.md) y [TASKS 003](../tasks.md)                                                                                              | Contratos, nombres, reglas, comportamiento actual y decisiones QA aprobadas/pendientes para las 19 funciones.                                     |
| [`@repo/trackflow-utils` README](../../../packages/trackflow-utils/README.md) y [`src/index.ts`](../../../packages/trackflow-utils/src/index.ts)                                                                                                    | API pública y estructura del paquete verificada.                                                                                                  |
| [`CONTEXT.md`](../../../CONTEXT.md), [`company-choice.md`](../../../company-choice.md), [Memory Bank](../../../memory-bank/projectbrief.md) y [regla de desarrollo](../../../.agents/rules/trackflow-development.md)                                | Contexto empresarial, sedes/países y límites respecto a datos, necesidades no implementadas y selección automatizada de carriers.                 |
| [`uis/website/index.html`](../../../uis/website/index.html), [`application.html`](../../../uis/website/application.html), [`tailwind.config.js`](../../../uis/website/tailwind.config.js) y [DESIGN.md](../../../uis/website/docs/design/DESIGN.md) | Identidad visual observada y principios de adaptación del website. El HTML/CSS vigente evidencia las decisiones visuales efectivamente aplicadas. |
| [`AGENTS.md`](../../../AGENTS.md), [regla frontend](../../../.agents/rules/trackflow-frontend-learning.md), [`uis/README.md`](../../../uis/README.md) y [README de website](../../../uis/website/README.md)                                         | Responsabilidades de carpetas, stack existente y principios de mantenimiento/accesibilidad.                                                       |

Cuando documentos de dominio describen una conducta que continúa abierta en TASKS 003, el demo no debe fijar una interpretación nueva ni ocultar esa limitación: debe mostrar fielmente el comportamiento actual de la función e identificarlo como comportamiento de la implementación/dataset, no como una regla operacional general. Las decisiones QA ya cerradas en TASKS 003 pueden reflejarse como hechos del paquete.

**Nota de diseño:** la sección de tokens YAML al comienzo de `DESIGN.md` contiene valores de superficie/tipografía que no coinciden por completo con la paleta descrita en su prosa ni con los colores aplicados en `index.html` y `application.html`. Esta SPEC toma el HTML vigente como evidencia de marca en uso y conserva la discrepancia como punto que el PLAN debe resolver/documentar, no como autorización para cambiar la web.

## 3. Alcance

### 3.1 Incluido

- Una experiencia web interna, de una sola persona usuaria y en el navegador, para explorar cinco áreas: **Inventory**, **Shipments**, **Carriers**, **Validations** y **Reports**. Los títulos o microcopy pueden estar en español; los literales del dominio se preservan exactamente y pueden acompañarse de una traducción explicativa.
- Interacciones locales sobre conjuntos de ejemplo ficticios: filtros, búsqueda, ordenación, cálculo, agrupación, selección/simulación de carrier y edición de entidades de prueba para validación.
- Invocación de las 19 funciones exportadas de `@repo/trackflow-utils` y presentación clara de entradas, parámetros relevantes y resultados devueltos.
- Resultados recalculados al cambiar controles, seleccionar un caso de ejemplo o solicitar expresamente la operación; el PLAN definirá el patrón de actualización.
- Estado completamente efímero en memoria de la página. Recargar/restablecer vuelve a los datos demo iniciales.
- Adaptación visual coherente con el website TrackFlow y sus patrones documentados, sin exigir que el playground se incruste en las páginas públicas.

### 3.2 Excluido

- Cambios a `uis/website/`, landing, formulario, sus estilos, contenido, enlaces, comportamiento o datos.
- Backend, API, base de datos, almacenamiento en navegador, persistencia, autenticación, usuarios reales, solicitudes de red o servicios externos.
- Datos de producción, PII, clientes reales, tarifas reales, rendimiento real de carriers, seguimiento en vivo, disponibilidad, alertas operativas o afirmaciones comerciales no verificadas.
- Crear, actualizar, asignar, despachar, cancelar o entregar pedidos/envíos; reservar inventario; contactar carriers; emitir etiquetas; activar recomendaciones o cualquier acción operacional externa.
- Agentes o funcionalidades de IA, prompting o automatización. `selectBestCarrier` se puede exponer solo como salida determinista de la utilidad existente, no como un agente o decisión autorizada.
- Cambiar contratos, reglas, firmas o comportamiento de `@repo/trackflow-utils`; duplicar código de negocio; añadir reglas de validación UI; incorporar dependencias sin aprobación.
- Cambiar el website, paquete de utilidades, contratos, dependencias raíz o sistemas externos. La ubicación y decisiones técnicas de la demo se limitan a las aprobadas en el PLAN.
- Añadir funcionalidad operativa, persistencia, autenticación, datos reales u otras capacidades fuera de este alcance aprobado.

## 4. Usuarios y escenarios

### Usuario primario

Integrante del equipo TrackFlow Tech o persona revisora del hito que desea inspeccionar las utilidades de dominio con ejemplos visuales, sin asumir que los datos o resultados describen operaciones actuales.

### Escenarios

- **E-01 — Explorar stock:** la persona selecciona Los Angeles o Zaragoza, filtra una categoría, consulta productos en o bajo su umbral de stock, ordena por existencias y ve los productos y conteos resultantes.
- **E-02 — Encontrar un artículo:** introduce un SKU y observa coincidencia/no coincidencia; puede explorar una búsqueda por peso en la lista ordenada por peso, con índice encontrado o `-1`.
- **E-03 — Inspeccionar envíos:** busca por ID, selecciona un estado o visualiza envíos agrupados; los estados son los valores de `ShipmentStatus` y no se editan como flujo operativo.
- **E-04 — Comparar carriers con un caso sintético:** elige un envío y producto de demostración, consulta costes o puntuaciones de uno o más carriers y ejecuta la selección determinista de la utilidad. Se informa que es una simulación basada en inputs ficticios; no se asigna el carrier al envío.
- **E-05 — Probar validaciones:** escoge una entidad de ejemplo válida o una variante inválida controlada, edita campos permitidos y ve `valid` y todos los mensajes recibidos de `ValidationResult.errors` sin que la interfaz invente reglas o sustituya esos mensajes.
- **E-06 — Consultar reportes:** inspecciona conteos por categoría/estado, valor total del inventario, distancia media y carriers más usados; cambia el conjunto demo o el parámetro `topN` cuando corresponda.
- **E-07 — Recuperarse de una consulta sin resultados:** la persona ve un estado vacío explícito y puede limpiar filtros o volver a la consulta inicial sin perder o guardar datos.

## 5. Requisitos funcionales

### RF-01 — Navegación y marco de la demo

La interfaz presenta el nombre **TrackFlow Operations Playground**, identifica su condición de demo interna y ofrece acceso comprensible a las cinco áreas. La navegación cambia de sección/área sin navegación a la web pública ni carga de páginas de operación reales. Debe existir una acción visible para restablecer ejemplos y controles a su estado inicial.

### RF-02 — Inventory

La vista de inventario debe:

1. Presentar una lista legible de productos ficticios con, como mínimo, SKU, nombre, categoría, almacén, peso, cantidad en stock y umbral mínimo. Los demás campos se pueden ver en detalle cuando ayuden a entender validaciones o cálculos.
2. Ofrecer controles que llamen a `filterProductsByWarehouse`, `filterProductsByCategory`, `filterLowStockProducts` y `sortProductsByStock` con los parámetros de la selección actual.
3. Ofrecer búsqueda por SKU que invoque `findProductBySKU` y una consulta por peso que invoque `binarySearchProductByWeight` sobre una colección ordenada ascendentemente por `weightKg`. El orden previo debe ser explícito en la UI; no atribuir el ordenamiento a la búsqueda binaria.
4. Mostrar `countProductsByCategory` como conteos —en tabla, tarjetas o visualización sencilla— e informar el valor retornado por `calculateTotalInventoryValue` con moneda USD, aclarando que la valoración usa `unitCostUSD` de datos ficticios.
5. Mantener claros los filtros activos y permitir retirarlos/restablecerlos. El resultado visual corresponde al valor retornado por el paquete, no a cálculos duplicados en el componente.

### RF-03 — Shipments

La vista de envíos debe:

1. Presentar una lista de `Shipment` sintéticos con ID, SKU, origen, destino/país, prioridad, carrier (incluido `null`) y estado.
2. Permitir búsqueda por ID mediante `findShipmentById`.
3. Presentar el agrupamiento por estado usando `groupShipmentsByStatus` y la distancia media usando `calculateAverageShipmentDistance`. La distancia media se identifica como promedio del conjunto demo actual, no KPI real.
4. Permitir seleccionar un envío sintético para la simulación de carrier; si no existe el SKU asociado en el conjunto de productos, la UI informa que la combinación de ejemplo requerida no está disponible en lugar de inventar un producto.
5. No permitir modificar estados, crear envíos, enviar o cambiar el carrier guardado.

### RF-04 — Carriers

La vista presenta carriers sintéticos con nombre, países, tarifas, plazo promedio, porcentaje puntual, capacidad, fragilidad y prioridades admitidas, donde sean relevantes. Debe:

1. Permitir ordenación ascendente/descendente por `onTimeRate` con `sortCarriersByReliability`.
2. Para un par shipment/product seleccionado, mostrar el resultado de `calculateShippingCost` y `scoreCarrierForShipment` para el carrier elegido, indicando las entradas de cálculo esenciales (peso, cantidad, distancia, prioridad, país y atributos del carrier).
3. Permitir ejecutar `selectBestCarrier` sobre el conjunto de carriers de ejemplo y mostrar carrier, `score` y `cost` o ausencia de resultado. Presentarlo literalmente como “resultado de la utilidad para este escenario sintético”, no como decisión final, recomendación inteligente, asignación ni promesa de elegibilidad empresarial.
4. Enlazar esa salida a una explicación de los criterios conocidos por la SPEC 003 (país, peso, prioridad, fragilidad y fiabilidad) sin reconstruir un score propio. Para cualquier decisión QA aún abierta, mostrar una nota breve o referencia a la SPEC/TASKS, sin presentarla como política operativa.

### RF-05 — Validations

La vista de validación debe exponer casos para `Product`, `Shipment` y `Carrier`, construir instancias completas válidas según sus modelos, llamar respectivamente a `validateProduct`, `validateShipment` y `validateCarrier`, y presentar:

- Estado tal como retorna (`valid: true/false`).
- Cada entrada de `errors` que retorna el paquete, conservando texto, orden y cantidad.
- El tipo de entidad y los valores de campos relevantes para que el resultado sea explicable.

Se permite partir de entidades sintéticas válidas y seleccionar variaciones inválidas preparadas; también se puede editar valores si el diseño permite construir el objeto completo sin agregar reglas. Los errores de entrada vacía, formato numérico o controles del navegador no se deben presentar como errores de dominio de la utilidad. Si algún control no puede representar el contrato, debe aclararse en PLAN, no corregirse cambiando el validador.

### RF-06 — Reports

Una sección de reportes presenta resultados obtenidos de las funciones y conjunto actualmente seleccionado:

- Productos por categoría mediante `countProductsByCategory`.
- Valor total del inventario mediante `calculateTotalInventoryValue`.
- Envíos por estado mediante `groupShipmentsByStatus`.
- Distancia media de envíos mediante `calculateAverageShipmentDistance`.
- Carriers más utilizados mediante `findTopCarriers`, con un control para `topN` y el literal carrier almacenado en `Shipment.carrier`.

Las salidas pueden mostrarse como tablas, tarjetas, barras sencillas u otra presentación apropiada que decida el PLAN. No exigir una librería de gráficos. Si no hay visualización gráfica aprobada, tablas y métricas legibles satisfacen el requisito. Cada cifra/representación debe poder cotejarse con la salida de la función correspondiente.

### RF-07 — Reutilización auténtica de la biblioteca

Cada acción descrita en la matriz de §6 debe llamar la función nombrada desde las exportaciones reales de `@repo/trackflow-utils`. No se aceptan: una reimplementación equivalente en JavaScript, resultados guardados como fixtures presentados como respuesta calculada, ni lógica distinta duplicada en la UI. El adaptador de presentación, si PLAN lo considera necesario, solo puede preparar/convertir entradas del contrato y mostrar retornos; no puede reemplazar reglas del paquete.

### RF-08 — Estado local y transparencia

La demo debe identificar claramente que es **interna, educativa, no conectada y basada en datos sintéticos**. Toda interacción queda en memoria durante la carga actual y no se transmite ni conserva tras recarga. La UI debe evitar términos que sugieran información en tiempo real, operaciones actuales o acciones completadas.

## 6. Matriz de trazabilidad de las 19 funciones

Las 19 funciones siguientes son API existente del paquete. Cada fila es uso funcional obligatorio y criterio de trazabilidad; las áreas pueden combinarse visualmente en PLAN, pero no omitirse. Los controles son ejemplos de affordance, no una decisión de layout final.

|   # | Función pública exacta             | Área / interacción UI                                 | Resultado verificable presentado                                               |
| --: | ---------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
|   1 | `filterProductsByWarehouse`        | Inventory: selector de almacén                        | Lista de productos filtrada por almacén elegido.                               |
|   2 | `filterProductsByCategory`         | Inventory: selector de categoría                      | Lista filtrada por categoría seleccionada.                                     |
|   3 | `filterLowStockProducts`           | Inventory: filtro “en/bajo umbral”                    | Productos donde el retorno del paquete indica stock bajo según su comparación. |
|   4 | `sortProductsByStock`              | Inventory: selector asc/desc                          | Lista ordenada por cantidad de stock y dirección elegida.                      |
|   5 | `sortCarriersByReliability`        | Carriers: selector asc/desc                           | Lista ordenada por `onTimeRate` retornada.                                     |
|   6 | `findProductBySKU`                 | Inventory: campo de SKU + búsqueda                    | Producto encontrado o estado “sin coincidencia”.                               |
|   7 | `findShipmentById`                 | Shipments: campo de ID + búsqueda                     | Envío encontrado o estado “sin coincidencia”.                                  |
|   8 | `binarySearchProductByWeight`      | Inventory: peso objetivo en lista por peso ascendente | Índice devuelto o `-1`; indicar precondición de lista ordenada.                |
|   9 | `countProductsByCategory`          | Inventory / Reports: resumen por categoría            | Registro completo de conteos producido por el paquete.                         |
|  10 | `groupShipmentsByStatus`           | Shipments / Reports: grupos por estado                | Colecciones retornadas para cada estado.                                       |
|  11 | `findTopCarriers`                  | Reports: control `topN`                               | Lista carrier/conteo retornada, excluyendo solo lo que excluye el paquete.     |
|  12 | `calculateTotalInventoryValue`     | Inventory / Reports: tarjeta de valor                 | Número retornado, formateado como USD sin alterar el valor subyacente.         |
|  13 | `calculateAverageShipmentDistance` | Shipments / Reports: indicador de distancia           | Número retornado, con unidades km y alcance del conjunto indicado.             |
|  14 | `calculateShippingCost`            | Carriers: coste del caso elegido                      | Coste retornado, moneda USD, y parámetros de ejemplo utilizados.               |
|  15 | `scoreCarrierForShipment`          | Carriers: inspección de carrier para un escenario     | Puntaje retornado y factores de entrada conocidos.                             |
|  16 | `selectBestCarrier`                | Carriers: botón/acción “evaluar escenario”            | Carrier, puntaje y coste retornados o estado sin candidato. Sin asignación.    |
|  17 | `validateProduct`                  | Validations: entidad Product                          | `valid` y `errors` recibidos.                                                  |
|  18 | `validateShipment`                 | Validations: entidad Shipment                         | `valid` y `errors` recibidos.                                                  |
|  19 | `validateCarrier`                  | Validations: entidad Carrier                          | `valid` y `errors` recibidos.                                                  |

## 7. Requisitos de diseño derivados de la marca

### Hechos observados en el website

- HTML semántico con fondos claros y texto azul marino, jerarquía de títulos Manrope y texto/interfaz en Inter.
- El HTML actual usa `#F6F5F1` como canvas, `#FFFFFF` para superficies de tarjeta, `#03142E` para texto/header profundo, `#06295D` para azul corporativo, `#0758BD` en CTA/acciones, `#526578` para texto secundario, `#ECEFF1` como divisor y `#00DCCF`/`#00CFFF` como acentos limitados.
- Cabeceras en degradado marino, logo horizontal claro y divisores sutiles.
- Tarjetas blancas con borde fino, sombra tenue y esquinas grandes (el sitio utiliza `rounded-2xl` en módulos destacados); controles redondeados, con foco visible.
- Contenedor de contenido hasta 1440px, márgenes/gutters progresivos y orden mobile-first. Landing y formulario comparten logo, fuentes, CSS Tailwind compilado y estilo general.
- La landing aporta logo horizontal claro y símbolos en `uis/website/assets/logos/`; pueden reutilizarse visualmente desde la ubicación aprobada, sin editar sus originales ni vincular la herramienta como página pública.

### Requisitos de adaptación

1. Mantener el carácter TrackFlow (azul marino, azul de acción y acentos cyan/turquesa moderados, superficies claras, datos ordenados); no crear una identidad de marca paralela ni copiar necesariamente la composición publicitaria de la landing. Las fuentes Manrope/Inter son una referencia de marca, no autorización para solicitar Google Fonts u otros recursos de red; dado que CA-09 prohíbe solicitudes de red, la propuesta debe usar fuentes locales disponibles o una pila de fuentes de sistema, salvo cambio aprobado de ese límite.
2. Priorizar legibilidad de datos y densidad controlada en tablas/listas, con alineación numérica/tabular cuando proceda. El color no será el único indicador de stock, estado o validez; acompañar color con texto/etiqueta.
3. Aplicar proporciones y tokens del sistema de diseño cuando sean compatibles con el HTML vigente. Antes de fijar nombres/valores de tokens en PLAN, resolver cómo tratar la discrepancia de paleta del frontmatter de `DESIGN.md` frente a su prosa y el website implementado.
4. Usar el logotipo de forma proporcionada y preservar sus recursos fuente; no incorporar fotografías decorativas si no aportan orientación al playground.
5. Mantener diferencia visible entre demo/test data y navegación pública; no añadir enlaces/CTA que sugieran acceso de producción o acciones operativas.

## 8. Usabilidad, responsive y accesibilidad

- Diseño mobile-first; en anchos estrechos la información tabular se presenta en tarjetas resumen o con otra transformación que evite scroll horizontal de página. No ocultar los datos que hacen interpretable la función.
- En tamaños mayores, usar una composición clara para navegación de áreas y contenido principal; la forma de navegación (pestañas, sidebar, navegación superior, etc.) queda para PLAN.
- Todo control debe tener nombre/etiqueta persistente, asociación de ayuda/error cuando aplique, orden lógico de teclado, estados de foco visibles y activación por teclado. No depender de hover.
- Mantener encabezados jerárquicos y landmarks semánticos (`header`, `nav`, `main`, secciones); disponer de enlace de salto a contenido.
- Anunciar cambios de resultado/estado sin interrumpir el uso, con región live apropiada y sin emitir mensajes redundantes en cada pulsación. La estrategia concreta se define en PLAN.
- Mostrar los errores de validación como texto legible asociado a la sección/entidad; estado válido/inválido no se comunica solo con color o icono.
- Controles táctiles con tamaño/espacio suficiente y legibilidad al zoom; contenidos en español no deben depender de alturas fijas ni truncarse.
- Respetar `prefers-reduced-motion` si se usa animación para resultados o indicadores. No se requiere animación ni charts.
- Los objetivos cuantitativos de contraste, navegadores y nivel de conformidad deben definirse en PLAN si las fuentes del proyecto no los fijan expresamente para este demo; no declarar conformidad sin verificación.

## 9. Datos de demostración

Los datos se crean únicamente para satisfacer los tipos existentes de `Product`, `Shipment`, `Carrier` y, si se requiere para explicar el dominio, `InventoryMovement`. Deben formar un dataset pequeño, autocontenido, repetible y explícitamente rotulado **sintético/ficticio**.

- Puede reflejar contexto aprobado: almacenes de Los Angeles/Zaragoza, países United States/Spain, categorías y prioridades/estados exactos del modelo; nombres de carriers mencionados en el briefing solo como ejemplos de demo, no como evidencia de contrato, asociación o rendimiento real.
- Tarifas, peso/capacidad, días, `onTimeRate`, costes, distancias, fechas, códigos postales, cantidades, inventario y relaciones entre registros deben rotularse como valores sintéticos de prueba, no como mediciones actuales. Elegir valores que cubran búsquedas encontradas/no encontradas, stocks por encima/en/bajo umbral, múltiples estados/prioridades, `carrier: null`, empate/variación en orden, éxito/fracaso de búsqueda y validación válida/ inválida.
- Mantener coherencia referencial dentro del dataset: el SKU de un envío de ejemplo debe corresponder a un producto si se usa para cálculos; un escenario seleccionado debe tener los objetos completos que requieren las firmas.
- Los carriers localizados en distintos países se representan solo con datos explícitos de ejemplo; no inventar nombres de los carriers no identificados en el briefing ni sugerir cobertura real por país.
- Ningún dataset se descarga, sube o guarda. La persona puede restaurar todos los datos de inicio con una acción de reset.

## 10. Estados de resultados

La interfaz debe contemplar y distinguir, al menos:

| Estado                                          | Comportamiento requerido                                                                                                                        |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Inicial                                         | Cargar de forma determinista los ejemplos sintéticos, explicar el propósito y dejar claras las áreas disponibles.                               |
| Resultado con elementos                         | Presentar el retorno de la función, el filtro/parámetro aplicado y unidades/formato pertinentes.                                                |
| Lista vacía tras filtro                         | Mensaje de “sin resultados para estos filtros” y acción para limpiar/restablecer; no confundir con fallo de la función.                         |
| Búsqueda sin coincidencia                       | Mensaje inequívoco para producto/envío y, para búsqueda binaria, representación explícita de `-1`.                                              |
| `selectBestCarrier` sin resultado               | Informar que la función devolvió `null` para ese escenario sintético; no decir que no existe un carrier real disponible.                        |
| Validación inválida                             | Mostrar `valid: false` y cada string retornado por `errors`.                                                                                    |
| Validación válida                               | Mostrar `valid: true` y ausencia de errores según la respuesta devuelta.                                                                        |
| Datos requeridos para el ejemplo no disponibles | Explicar qué objeto falta en el set demo; no completar datos silenciosamente ni crear una regla.                                                |
| Error de interacción inesperado                 | Mensaje comprensible y recuperable que no exponga stack traces; el alcance de captura/log en consola y el tratamiento técnico quedan para PLAN. |
| Restauración                                    | Volver a entradas de muestra iniciales y limpiar búsqueda, filtros y resultados previos.                                                        |

## 11. Criterios de aceptación verificables

La SPEC se considera satisfecha tras implementación autorizada cuando cada criterio sea demostrado en la interfaz. No se afirma que estén implementados por aprobar esta SPEC.

| ID    | Criterio de aceptación                                                                                                                                                                                                                   |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CA-01 | La herramienta identifica visiblemente “TrackFlow Operations Playground”, su acceso interno, condición no productiva y uso de datos sintéticos.                                                                                          |
| CA-02 | Las cinco áreas Inventory, Shipments, Carriers, Validations y Reports son accesibles por navegación comprensible y cada una ofrece al menos una interacción funcional acorde con RF-02–RF-06.                                            |
| CA-03 | Cada una de las 19 funciones de la matriz §6 se invoca desde un control o interacción verificable y su salida corresponde al retorno real de `@repo/trackflow-utils`; ninguna se simula con output hardcodeado ni se reimplementa en UI. |
| CA-04 | Inventory permite filtrar por almacén/categoría/stock bajo, ordenar stock, buscar por SKU, consultar búsqueda binaria por peso con precondición visible, y presenta conteos por categoría y valor total.                                 |
| CA-05 | Shipments permite buscar por ID, mostrar grupos por estado y la distancia media; la interfaz no crea ni modifica el estado operativo de envíos.                                                                                          |
| CA-06 | Carriers permite ordenar por fiabilidad, calcular coste y puntaje para entradas elegidas, y ejecutar `selectBestCarrier`; muestra su resultado como simulación y no realiza asignación ni acción externa.                                |
| CA-07 | Validations permite invocar los tres validadores con objetos completos y muestra exactamente `valid` y los elementos `errors` devueltos, sin errores de negocio añadidos por la interfaz.                                                |
| CA-08 | Reports presenta los cinco reportes especificados, con el conjunto origen, parámetros aplicados y unidades/moneda correspondientes.                                                                                                      |
| CA-09 | Los datos muestran una señal persistente de ficción; no se realizan solicitudes de red, escritura persistente ni transmisión de datos al interactuar o resetear.                                                                         |
| CA-10 | Los estados inicial, resultados, sin resultados, búsqueda ausente, selección `null`, validación válida/inválida, datos incompletos y reset están diferenciados según §10.                                                                |
| CA-11 | El diseño conserva continuidad de marca con el website real (logos/fuentes/colores/patrones aplicables) y no modifica ni incorpora el playground a la web pública.                                                                       |
| CA-12 | En viewport móvil, interacciones y resultados permanecen utilizables sin desbordamiento horizontal de página; tablas se adaptan sin perder información esencial.                                                                         |
| CA-13 | Navegación y controles son operables por teclado, muestran foco visible, tienen etiquetas y nombres accesibles, y comunican estados sin depender únicamente del color.                                                                   |
| CA-14 | Al restablecer la demo, desaparecen búsquedas/filtros/resultados modificados y reaparece el dataset inicial; al recargar no persiste el estado anterior.                                                                                 |
| CA-15 | Ninguna pantalla o mensaje sugiere que los resultados, tarifas o datos son reales, en tiempo real, políticas corporativas aprobadas o resultados de un agente de IA.                                                                     |

## 12. Restricciones de diseño y riesgos residuales

Los siguientes puntos se identificaron al redactar la propuesta inicial y debían resolverse antes de implementar. La autorización y las decisiones adoptadas constan en el PLAN y en TASKS; se conservan aquí como límites de la solución, no como aprobaciones o bloqueos todavía pendientes. Las comprobaciones de aceptación que siguen sin evidencia suficiente permanecen abiertas en TASKS.

1. **Ubicación e integración:** la guía global destina UI interna a `uis/backoffice/`, pero `uis/backoffice/` está documentado como ubicación prevista y no implementada. Acordar si el playground tendrá carpeta/app propia en esa ubicación y cómo convive con el website, sin crear aplicación paralela ni alterar páginas públicas. Esta SPEC no elige ruta.
2. **Consumo de `@repo/trackflow-utils` en navegador:** el paquete es ESM TypeScript con `noEmit: true`; confirmar mecanismo de importación/compilación que use las exportaciones reales sin copiar algoritmos y sin añadir dependencias no aprobadas. No asumir que el browser carga `.ts` directamente.
3. **Tecnología y estructura:** reutilizar stack confirmado donde sea viable (HTML5, Tailwind 3.4.17, JavaScript vanilla para website) o solicitar aprobación para cualquier excepción. No hay un stack general de backoffice confirmado. Definir configuración local/compartida, compilación y comandos sin alterar el runner raíz.
4. **Diseño y navegación:** decidir disposición de las cinco áreas, si filtros/resultados se actualizan inmediatamente o por acción, modo de inspeccionar entradas/salidas y estrategia de presentación en pantalla pequeña.
5. **Contradicción de design tokens:** especificar si prevalece la paleta vigente en el website o se propone normalizar `DESIGN.md`; cualquier cambio a web/design system necesita alcance y autorización propios. Esta SPEC solo exige coherencia visual.
6. **Muestras y criterios abiertos:** definir dataset mínimo coherente, ejemplos que cubran funciones y cómo etiquetar valores sintéticos. No fijar en el demo resultados esperados que impliquen cerrar las preguntas QA pendientes del hito; comprobar TASKS 003 al preparar PLAN.
7. **Selección determinista vs. recomendación de negocio:** mantener la distinción visible entre la salida de `selectBestCarrier` y la propuesta futura de recomendador. No presentar el puntaje como criterio aprobado para operación real.
8. **Pruebas y verificación:** definir pruebas de integración que comprueben que las acciones importan/invocan cada función; pruebas de estados UI, responsive, accesibilidad y ausencia de red/persistencia. Determinar herramientas sin introducir dependencias hasta su aprobación.
9. **Localización:** decidir idioma de interfaz y si se requiere bilingüismo. Las fuentes declaran soporte ES/EN como opcional/recomendado en contexto general, no como requisito ya aprobado para este demo. En cualquier idioma, preservar los literales de tipo/estado exactos.
10. **Gráficos, formato y errores técnicos:** decidir si tablas/tarjetas bastan (preferidas para evitar dependencia), cómo formatear fechas/moneda sin alterar retornos, y qué feedback ofrecer ante excepción de ejecución.
11. **Tipografía y solicitudes de red:** resolver la tensión entre las fuentes Manrope/Inter observadas (cargadas actualmente desde Google Fonts en el website) y CA-09, que exige que el playground no realice solicitudes de red. La opción compatible propuesta es una pila de fuentes de sistema; solo se considerarán fuentes locales si existen y su reutilización está autorizada. No cargar Google Fonts desde el playground.
12. **Riesgo de interpretación:** incorporar avisos sintéticos cerca de resultados y evitar que capturas o demos internas sean confundidas con panel operativo, datos reales o disponibilidad de carriers.

## 13. Estado y siguiente paso

Esta SPEC y el PLAN fueron aprobados para implementación según la autorización explícita registrada en [TASKS](tasks.md). La aplicación y las cinco áreas están implementadas, y el desarrollador confirmó su funcionamiento general en navegador. Esto no demuestra por sí solo todos los criterios de aceptación: las verificaciones responsive/accesibilidad, red, estados límite y cotejo individual de retornos siguen pendientes según D011–D013. TASKS es la fuente del estado detallado de evidencia. La aprobación no autoriza cambios al website ni al paquete `trackflow-utils`, operaciones Git u otras ampliaciones de alcance.
