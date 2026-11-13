# SPEC 003-domain-models: utilidades de inventario y transportistas

- **Fecha:** 2026-11-13.
- **Estado:** especificación redactada; pendiente de revisión y aprobación. No autoriza PLAN ni implementación.
- **Funcionalidad:** `003-domain-models`.
- **Stakeholder del briefing:** Ana Whitfield, Directora de Operaciones de Almacén.
- **Idioma de esta SPEC:** español; los identificadores, nombres, propiedades, literales y firmas TypeScript se conservan exactamente como en los requisitos.
- **Fuente normativa:** [requisitos en español](utils/requirements.md) y [requisitos en inglés](utils/requirements.en.md).

## 1. Fuentes, precedencia y convenciones

| Fuente | Aplicación en esta SPEC |
| --- | --- |
| [Requisitos ES](utils/requirements.md) y [EN](utils/requirements.en.md) | Fuente de verdad del dominio, interfaces, funciones, reglas de validación y criterios de aceptación del ejercicio. |
| [AGENTS.md](../../AGENTS.md) y [regla de desarrollo](../../.agents/rules/trackflow-development.md) | Límites de alcance, distinción entre requisitos y funcionalidades implementadas, preservación del dominio y decisiones pendientes. |
| [README raíz](../../README.md) y [README raíz en español](../../README.es.md) | Organización del monorepo y carácter orientativo de sus recomendaciones. |
| [README de `packages/`](../../packages/README.md) y su [versión en español](../../packages/README.es.md) | Guía sobre la responsabilidad de los paquetes reutilizables; no selecciona en esta SPEC la ubicación física del componente. |
| [Memory Bank](../../memory-bank/projectbrief.md), [contexto técnico](../../memory-bank/techContext.md) y [progreso](../../memory-bank/progress.md) | Estado conocido, tecnologías no adoptadas y límite respecto de la propuesta futura de recomendación de transportistas. |
| [SPEC 001](../001-website/spec.md), [PLAN 001](../001-website/plan.md), [TASKS 001](../001-website/tasks.md), [SPEC 002](../002-website-form/spec.md), [PLAN 002](../002-website-form/plan.md) y [TASKS 002](../002-website-form/tasks.md) | Convención SDD observada: fuentes, objetivo, alcance/exclusiones, escenarios, requisitos, aceptación verificable y cierre explícito de fase. |

Esta SPEC describe requisitos funcionales y de calidad. No elige la carpeta física del paquete, herramientas, dependencias, configuración, comandos, estrategia de pruebas ni estructura de implementación más allá de los nombres de módulos indicados por los requisitos. Esas decisiones pertenecen al PLAN y requieren las aprobaciones aplicables.

Los documentos de requisitos no son una confirmación de funcionalidad ya implementada ni una aprobación de toda necesidad operativa del briefing empresarial. En particular, el recomendador mencionado en `company-choice.md` sigue siendo una propuesta futura según `AGENTS.md` y el Memory Bank. Esta SPEC se limita a las funciones explícitamente descritas aquí y no autoriza crear un agente, automatizar una asignación real o desencadenar acciones externas.

## 2. Objetivo y usuarios

Definir los modelos de datos y utilidades TypeScript para filtrar, buscar y ordenar productos y transportistas; calcular costes y puntuaciones de idoneidad; obtener agregaciones de inventario y envíos; y validar productos, envíos y transportistas antes de procesarlos.

**Usuarios previstos por el ejercicio:** personal de almacén y coordinación logística que necesita procesar datos de inventario, envíos y transportistas de los almacenes de Los Ángeles y Zaragoza.

**Resultado esperado:** una especificación verificable para funciones deterministas y tipadas que operan sobre los valores recibidos como argumentos. No se define una aplicación operativa, API, persistencia, integración con transportistas ni proceso automático de asignación.

## 3. Alcance y exclusiones

### Incluido

- Las interfaces y tipos de dominio `Product`, `Dimensions`, `Shipment`, `Destination`, `Carrier` e `InventoryMovement`, y los tipos unión que utilizan.
- Las 19 funciones requeridas, con nombres, tipos de parámetros, tipos de retorno y reglas funcionales exactos.
- La validación de las reglas de negocio enumeradas para `Product`, `Shipment` y `Carrier`.
- Casos límite y criterios de aceptación verificables, distinguiendo lo especificado de aquello cuyo resultado aún debe aclararse.
- Las rutas relativas `src/utils/collections.ts`, `src/utils/search.ts`, `src/utils/transformations.ts` y `src/utils/validations.ts` como organización indicada por los requisitos; la ubicación de ese `src/` dentro del monorepo queda para PLAN.

### Excluido

- Crear o modificar código TypeScript, pruebas, `src/`, paquetes, manifiestos, configuración, documentación distinta de esta SPEC o archivos de la web.
- API, backend, base de datos, persistencia, ingesta, interfaz, paneles, integración con carriers, solicitud de tarifas reales o ejecución de envíos.
- Agente de IA, prompting o motor autónomo de recomendación; la puntuación y selección de esta SPEC son funciones deterministas conforme a las fórmulas del ejercicio.
- Reglas de negocio, campos, estados, tarifas, políticas por país, disponibilidad o datos que no aparezcan en las fuentes aprobadas.
- Funciones de validación para `InventoryMovement`, porque no se solicitan.

## 4. Entidades y tipos requeridos

Las siguientes declaraciones preservan los nombres, tipos y literales del briefing. Las descripciones de propiedades se resumen; los nombres de propiedad y sus tipos son normativos.

```typescript
interface Product {
  sku: string;
  name: string;
  category: ProductCategory;
  weightKg: number;
  dimensions: Dimensions;
  warehouse: WarehouseLocation;
  stockQuantity: number;
  minStockThreshold: number;
  unitCostUSD: number;
  isFragile: boolean;
  status: ProductStatus;
}

interface Dimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

type ProductCategory =
  | "Fashion"
  | "Electronics"
  | "Cosmetics"
  | "Home"
  | "Other";
type WarehouseLocation = "Los Angeles" | "Zaragoza";
type ProductStatus = "Active" | "Low stock" | "Out of stock" | "Discontinued";

interface Shipment {
  id: string;
  sku: string;
  quantity: number;
  origin: WarehouseLocation;
  destination: Destination;
  priority: ShipmentPriority;
  declaredValueUSD: number;
  carrier: string | null;
  status: ShipmentStatus;
  createdAt: Date;
}

interface Destination {
  city: string;
  country: Country;
  postalCode: string;
  distanceKm: number;
}

type Country = "United States" | "Spain";
type ShipmentPriority = "Standard" | "Express" | "Same-day";
type ShipmentStatus =
  | "Pending"
  | "Assigned"
  | "In transit"
  | "Delivered"
  | "Failed";

interface Carrier {
  id: string;
  name: string;
  operatesIn: Country[];
  baseRateUSD: number;
  ratePerKgUSD: number;
  ratePerKmUSD: number;
  avgDeliveryDays: number;
  onTimeRate: number;
  maxWeightKg: number;
  handlesFragile: boolean;
  acceptsPriority: ShipmentPriority[];
}

interface InventoryMovement {
  id: string;
  sku: string;
  warehouse: WarehouseLocation;
  type: MovementType;
  quantity: number;
  reason: string;
  timestamp: Date;
}

type MovementType = "Inbound" | "Outbound" | "Transfer" | "Adjustment";
```

`Shipment.carrier` acepta `null` cuando no hay transportista asignado. Los nombres de categorías, estados, países, almacenes, prioridades y tipos de movimiento son los literales anteriores, no traducciones.

## 5. Requisitos funcionales

Los módulos listados son rutas relativas dentro del componente aún por ubicar. Sus contratos no fijan cómo se implementan.

### RF-01. Operaciones de colecciones

Módulo lógico indicado: `src/utils/collections.ts`.

```typescript
filterProductsByWarehouse(products: Product[], warehouse: WarehouseLocation): Product[]
filterProductsByCategory(products: Product[], category: ProductCategory): Product[]
filterLowStockProducts(products: Product[]): Product[]
sortProductsByStock(products: Product[], order: "asc" | "desc"): Product[]
sortCarriersByReliability(carriers: Carrier[], order: "asc" | "desc"): Carrier[]
```

- `filterProductsByWarehouse` retorna los productos cuyo `warehouse` coincide con el argumento.
- `filterProductsByCategory` retorna los productos cuya `category` coincide con el argumento.
- `filterLowStockProducts` retorna los productos para los que `stockQuantity <= minStockThreshold`.
- `sortProductsByStock` ordena por `stockQuantity` de forma ascendente o descendente según `order`.
- `sortCarriersByReliability` ordena por `onTimeRate` de forma ascendente o descendente según `order`.
- Las funciones de filtrado y ordenación no modifican el array de entrada; la no mutación está expresamente exigida para ambas funciones de ordenación y se incluye como requisito de calidad general para las utilidades.

### RF-02. Búsqueda

Módulo lógico indicado: `src/utils/search.ts`.

```typescript
findProductBySKU(products: Product[], sku: string): Product | null
findShipmentById(shipments: Shipment[], id: string): Shipment | null
binarySearchProductByWeight(sortedProducts: Product[], targetWeight: number): number
```

- `findProductBySKU` realiza búsqueda lineal y compara `sku` sin distinguir mayúsculas de minúsculas. Retorna el producto encontrado o `null`.
- `findShipmentById` realiza búsqueda lineal por `id`. Retorna el envío encontrado o `null`. No se especifica comparación insensible a mayúsculas.
- `binarySearchProductByWeight` recibe una lista ya ordenada por `weightKg` ascendente, busca el peso objetivo y retorna un índice o `-1` si no existe.

### RF-03. Coste, puntuación y selección de transportistas

Módulo lógico indicado: `src/utils/transformations.ts`.

```typescript
calculateShippingCost(shipment: Shipment, product: Product, carrier: Carrier): number
scoreCarrierForShipment(carrier: Carrier, shipment: Shipment, product: Product): number
selectBestCarrier(
  carriers: Carrier[],
  shipment: Shipment,
  product: Product,
): { carrier: Carrier; score: number; cost: number } | null
```

**`calculateShippingCost`** calcula los componentes siguientes:

- Tarifa base: `carrier.baseRateUSD`.
- Coste por peso: `product.weightKg * carrier.ratePerKgUSD * shipment.quantity`.
- Coste por distancia: `shipment.destination.distanceKm * carrier.ratePerKmUSD`.
- Recargo de prioridad: `Standard` = 0 % adicional, `Express` = +30 %, `Same-day` = +60 %.
- Retorna el coste total redondeado a 2 decimales.

Los requisitos no expresan explícitamente sobre qué importe se aplica el recargo. Esta SPEC conserva los componentes y porcentajes y no fija por inferencia la operación final del recargo; véase §9.

**`scoreCarrierForShipment`** retorna el puntaje de idoneidad redondeado a 2 decimales, según estos componentes:

| Criterio | Puntos |
| --- | --- |
| El carrier opera en `shipment.destination.country` | +20; en caso contrario, 0 |
| `product.weightKg * shipment.quantity <= carrier.maxWeightKg` | +20; en caso contrario, 0 |
| `carrier.acceptsPriority` contiene `shipment.priority` | +15; en caso contrario, 0 |
| Producto frágil y `carrier.handlesFragile` verdadero | +15 |
| Producto no frágil | +15 |
| Producto frágil y carrier incapaz de manejarlo | 0 |
| Fiabilidad | `carrier.onTimeRate * 0.3` puntos |

**`selectBestCarrier`** calcula puntuación y coste para los carriers recibidos, descarta los que obtengan un puntaje menor que 50 y, entre los restantes, elige el de menor coste. Retorna `{ carrier, score, cost }` para el elegido o `null` si no queda ninguno adecuado. El umbral es inclusivo en 50.

### RF-04. Agregaciones y reportes

Módulo lógico indicado: `src/utils/transformations.ts`.

```typescript
countProductsByCategory(products: Product[]): Record<ProductCategory, number>
calculateTotalInventoryValue(products: Product[]): number
calculateAverageShipmentDistance(shipments: Shipment[]): number
groupShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, Shipment[]>
findTopCarriers(
  shipments: Shipment[],
  topN: number,
): Array<{ carrier: string; count: number }>
```

- `countProductsByCategory` retorna un conteo de productos por cada `ProductCategory`.
- `calculateTotalInventoryValue` suma `stockQuantity * unitCostUSD` para cada producto y redondea el total a 2 decimales.
- `calculateAverageShipmentDistance` calcula la media de `destination.distanceKm` y la redondea a 2 decimales.
- `groupShipmentsByStatus` agrupa los envíos por `status` y retorna las colecciones en un `Record<ShipmentStatus, Shipment[]>`.
- `findTopCarriers` cuenta el uso de carriers en los envíos asignados, ignora `carrier: null`, ordena de mayor a menor conteo y limita el resultado a `topN`. Cada elemento tiene las propiedades `carrier` y `count`.

### RF-05. Validaciones de datos

Módulo lógico indicado: `src/utils/validations.ts`.

```typescript
validateProduct(product: Product): { valid: boolean; errors: string[] }
validateShipment(shipment: Shipment): { valid: boolean; errors: string[] }
validateCarrier(carrier: Carrier): { valid: boolean; errors: string[] }
```

Cada función retorna `valid: true` si se cumplen todas las reglas enumeradas para esa entidad y `errors: []`; de lo contrario retorna `valid: false` y un array de mensajes de error. Las fuentes no fijan el texto literal, idioma ni orden de esos mensajes.

#### RF-05.1 Reglas para `Product`

| Propiedad | Regla válida |
| --- | --- |
| `sku` | No está vacío. |
| `weightKg` | Mayor que 0 y menor o igual a 100. |
| `dimensions.lengthCm`, `dimensions.widthCm`, `dimensions.heightCm` | Cada dimensión es mayor que 0 y menor o igual a 200. |
| `stockQuantity` | Mayor o igual a 0. |
| `minStockThreshold` | Mayor o igual a 0. |
| `unitCostUSD` | Mayor que 0. |

#### RF-05.2 Reglas para `Shipment`

| Propiedad | Regla válida |
| --- | --- |
| `quantity` | Mayor que 0. |
| `declaredValueUSD` | Mayor que 0. |
| `destination.distanceKm` | Mayor o igual a 0. |

#### RF-05.3 Reglas para `Carrier`

| Propiedad | Regla válida |
| --- | --- |
| `baseRateUSD`, `ratePerKgUSD`, `ratePerKmUSD` | Cada tarifa es mayor o igual a 0. |
| `avgDeliveryDays` | Mayor que 0. |
| `onTimeRate` | Entre 0 y 100, incluidos ambos extremos. |
| `maxWeightKg` | Mayor que 0. |
| `operatesIn` | Contiene al menos un país. |

No se han proporcionado reglas de validación adicionales para los campos no listados ni para `InventoryMovement`.

## 6. Requisitos de calidad

- **Funciones puras:** el resultado depende de los argumentos; no se usan variables globales ni se realizan efectos externos.
- **Responsabilidad única:** cada función realiza únicamente la operación expresada por su nombre y contrato.
- **Tipado explícito:** se respetan los tipos, propiedades, uniones y retornos de §4 y §5; `carrier` puede ser `null` únicamente donde el contrato lo permite.
- **Sin mutaciones:** ninguna función cambia los arrays ni objetos recibidos. En particular, ordenar no altera el orden del array original.
- **Resultados deterministas:** con los mismos argumentos se obtiene el mismo resultado, sin leer estado externo.
- **Separación de responsabilidades:** las funciones pertenecen a los módulos lógicos de colecciones, búsqueda, transformaciones o validaciones indicados en §5. La raíz física de esos módulos queda pendiente de PLAN.
- **Manejo de entradas vacías y datos no válidos:** se debe atender los casos límite definidos en §7; no se amplía aquí el dominio de los parámetros tipados mediante supuestos sobre entradas `null` no declaradas.

## 7. Casos límite y comportamiento especificado

| Caso | Comportamiento que sí fijan los requisitos |
| --- | --- |
| Filtro sin coincidencias o lista vacía | El resultado es una lista vacía. |
| Ordenación de lista vacía | El resultado es una lista vacía; la lista de entrada no se altera. |
| SKU sin coincidencia | `findProductBySKU` retorna `null`; la comparación para coincidencias ignora mayúsculas/minúsculas. |
| ID de envío sin coincidencia | `findShipmentById` retorna `null`. |
| Peso sin coincidencia | `binarySearchProductByWeight` retorna `-1`. La entrada se considera ordenada ascendentemente por el llamador. |
| Carrier no asignado | `Shipment.carrier` puede ser `null`; `findTopCarriers` lo ignora. |
| Ningún carrier elegible | `selectBestCarrier` retorna `null`, incluso si la lista está vacía. |
| Valor exactamente en los límites de validación | Se aplican literalmente los operadores de §5: los límites expresados con `<=` o `>=` son válidos; los límites estrictos `>` no incluyen cero. |
| Distancia igual a cero | Es válida para `Shipment`. |
| Tarifas iguales a cero | Son válidas para `Carrier`. |
| Fiabilidad igual a 0 o 100 | Es válida para `Carrier`. |

No se asigna un resultado no indicado para medias de listas vacías, claves ausentes en agrupaciones/registros, valores de `topN` fuera de rango o empates. Esos casos se registran en §9 y deben resolverse antes de fijar sus criterios de prueba.

## 8. Criterios de aceptación

Los criterios describen comprobaciones futuras de la implementación; redactar esta SPEC no acredita que estén superadas. Cuando un criterio dependa de una cuestión abierta de §9, su cierre requiere la aclaración correspondiente.

| ID | Comprobación y resultado exigido | Trazabilidad |
| --- | --- | --- |
| CA-01 | Las interfaces, propiedades, tipos y literales de §4 existen con los mismos nombres y tipos. `Shipment.carrier` admite `string \| null`; fechas usan `Date`. | §4; requisitos de tipo |
| CA-02 | Las cinco funciones de colecciones filtran/ordenan por las propiedades definidas y ambas ordenaciones respetan `asc`/`desc`; las entradas no quedan mutadas. Las listas vacías y sin coincidencias producen listas vacías. | RF-01; §6; §7 |
| CA-03 | `findProductBySKU` encuentra SKU ignorando capitalización y retorna `null` al faltar; `findShipmentById` busca por ID y retorna `null` al faltar; búsqueda binaria retorna un índice válido al encontrar el peso o `-1` al no encontrarlo. | RF-02 |
| CA-04 | El coste usa la tarifa base, el coste por peso multiplicado por cantidad, el coste por distancia y los porcentajes de prioridad especificados; el resultado se redondea a 2 decimales conforme a la aclaración del recargo pendiente. | RF-03; cuestión abierta QA-02 |
| CA-05 | Cada condición de `scoreCarrierForShipment` aporta exactamente los puntos indicados, incluida la fórmula `onTimeRate * 0.3`; el resultado se redondea a 2 decimales. | RF-03 |
| CA-06 | `selectBestCarrier` excluye puntuaciones `< 50`, puede seleccionar puntuación `50`, elige el coste mínimo entre elegibles y retorna `null` si ninguno es elegible. | RF-03 |
| CA-07 | Las agregaciones producen conteos por categoría, total de inventario según `stockQuantity * unitCostUSD`, distancia media, grupos por estado y carriers más usados; total y media se redondean a 2 decimales. `findTopCarriers` omite carriers `null` y ordena conteos descendentes. | RF-04 |
| CA-08 | `validateProduct`, `validateShipment` y `validateCarrier` aceptan/rechazan las condiciones y límites exactos de §5. Un resultado válido tiene `valid: true` y `errors: []`; uno inválido tiene `valid: false` y errores. | RF-05 |
| CA-09 | Los casos explícitos de §7 se verifican. Los casos con comportamiento abierto no se consideran aprobados por una convención implícita: requieren resolución documentada antes del test correspondiente. | §7; §9 |
| CA-10 | La implementación no muta entradas, no depende de variables globales ni produce efectos externos; cada función se mantiene en la responsabilidad lógica indicada y conserva las firmas tipadas. | §5; §6 |

## 9. Discrepancias y preguntas abiertas

Se conservan sin resolver; esta SPEC no altera los requisitos originales.

| ID | Discrepancia o ambigüedad | Consecuencia / aclaración necesaria |
| --- | --- | --- |
| QA-01 | El encabezado del requisito identifica el ejercicio como **Milestone 2 / Hito 2**, mientras que la solicitud de trabajo lo denomina tercer hito. Los archivos están bajo `specs/003-domain-models/`. | Confirmar la numeración/título oficial del hito. La carpeta se conserva como `003-domain-models` en esta documentación. |
| QA-02 | El resumen de objetivos dice que el scoring de carriers se basa en coste, velocidad y fiabilidad; la fórmula detallada de `scoreCarrierForShipment` puntúa país, peso, prioridad, fragilidad y fiabilidad, sin coste ni `avgDeliveryDays`. | Confirmar si el resumen es general o si coste/velocidad debían formar parte del scoring. No se añaden puntos ni criterios a la fórmula detallada en esta SPEC. |
| QA-03 | Para `calculateShippingCost` se enumeran componentes y porcentajes de recargo, pero no se indica explícitamente si el recargo se aplica a la tarifa base, al subtotal de base + peso + distancia u otra base. | Confirmar la operación exacta antes de implementar o fijar el valor esperado de coste. |
| QA-04 | No se define desempate para ordenaciones con mismo stock/fiabilidad, carriers de igual coste en `selectBestCarrier` ni carriers con igual conteo en `findTopCarriers`. | Definir si basta cualquier orden entre empates o si se requiere estabilidad/desempate secundario. |
| QA-05 | No se fija el resultado de `calculateAverageShipmentDistance([])`, ni si los registros/agrupaciones incluyen todas las categorías/estados con cero/arrays vacíos o solo claves observadas. | Precisar el comportamiento de entradas vacías y claves sin elementos, en especial porque los retornos son `Record<...>`. |
| QA-06 | `Shipment.carrier` es `string | null`, pero no se especifica si la cadena representa `Carrier.id` o `Carrier.name`; `findTopCarriers` dice devolver el nombre del carrier. | Confirmar el valor almacenado en `Shipment.carrier` y si la salida debe conservar ese string o resolver una relación con `Carrier`. No se añade un parámetro ni una entidad a la firma. |
| QA-07 | `topN` no tiene reglas para cero, valores negativos o no enteros. Tampoco se define el resultado si excede el número de carriers disponibles. | Confirmar los límites admitidos y el comportamiento esperado. |
| QA-08 | Búsqueda binaria no define qué índice retornar si varios productos tienen el mismo `weightKg`, ni la tolerancia ante decimales de punto flotante. | Confirmar si cualquier índice coincidente es válido y si la comparación es exacta, o especificar otra regla. |
| QA-09 | La aceptación general solicita tratar «null values» y datos inválidos con gracia, pero las firmas reciben arrays y entidades no nulos, excepto `Shipment.carrier`. Las reglas de validación solo cubren los campos listados en §5. | Confirmar si «null» se refiere únicamente a `Shipment.carrier` y si deben validarse campos adicionales, valores no finitos (`NaN`/`Infinity`), cadenas en blanco u otros datos malformados. No ampliar las validaciones por inferencia. |
| QA-10 | Los requisitos no precisan la política exacta de errores de validación: texto, idioma, orden, granularidad ni si se reportan todas las reglas fallidas en una llamada. Además, `sku must not be empty` no especifica si una cadena de solo espacios cuenta como vacía. | Confirmar esos detalles solo si se requieren para implementar o evaluar de forma uniforme; no inventar textos o reglas adicionales. |

**Coincidencia ES/EN:** en los apartados leídos no se detectaron diferencias entre las dos versiones en nombres, firmas, tipos, fórmulas detalladas, límites de validación ni criterios de aceptación. Las ambigüedades QA-02 a QA-10 están presentes en ambos requisitos; no son discrepancias de traducción. QA-01 es una diferencia entre el encabezado del requisito y la descripción de esta solicitud, no entre las versiones ES/EN.

## 10. Cierre de la fase SPEC

Esta fase entrega únicamente esta especificación. Incluye las seis entidades, sus tipos, las 19 funciones requeridas, todas las reglas de validación explícitas, los requisitos de calidad, casos límite definidos y criterios de aceptación trazables. Las cuestiones abiertas se mantienen visibles y no se resuelven por suposición.

Quedan pendientes la revisión y aprobación de esta SPEC y, antes de fijar expectativas completas de los casos ambiguos, las aclaraciones aplicables de §9. No se ha creado PLAN, TASKS, `src/`, configuración ni implementación TypeScript. **No avanzar a PLAN ni a implementación sin aprobación expresa.**