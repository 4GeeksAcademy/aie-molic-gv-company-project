# PLAN 003-domain-models: utilidades de inventario y transportistas

- **Fecha:** 2026-11-13.
- **Estado:** aprobado por el desarrollador el 2026-11-13; refleja arquitectura y metodología guiada aprobadas. Esta actualización no crea archivos de implementación ni `tasks.md`.
- **Fuente funcional aprobada:** [SPEC 003](spec.md); los requisitos ES/EN conservan las firmas y reglas.
- **Alcance de esta actualización:** únicamente este PLAN. No se crean archivos TypeScript ni se modifican la SPEC, los requisitos, la web o la configuración.
- **Objetivo de aprendizaje:** preparación compartida y programación guiada; el desarrollador implementa personalmente la lógica de negocio, una función por vez.

## 1. Fuentes y estado comprobado

| Fuente                                                                                                                                             | Hecho relevante                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [SPEC 003](spec.md) y [requisitos ES](utils/requirements.md) / [EN](utils/requirements.en.md)                                                      | Definen entidades, 19 funciones, validaciones, casos límite y cuestiones QA-01 a QA-10. Las ambigüedades permanecen abiertas. |
| [AGENTS.md](../../AGENTS.md) y [regla de desarrollo](../../.agents/rules/trackflow-development.md)                                                 | `packages/` aloja bibliotecas reutilizables; no introducir stack confirmado ni implementar el agente futuro de recomendación. |
| [README raíz](../../README.md) y [README raíz ES](../../README.es.md)                                                                              | No hay runner de workspace en la raíz; cada carpeta tiene responsabilidad propia.                                             |
| [README de `packages/`](../../packages/README.md) y [versión ES](../../packages/README.es.md)                                                      | Cada subcarpeta es un paquete versionable y debe tener README propio.                                                         |
| [Memory Bank](../../memory-bank/projectbrief.md), [contexto técnico](../../memory-bank/techContext.md) y [progreso](../../memory-bank/progress.md) | El recomendador de `company-choice.md` sigue siendo futuro; no se ha adoptado stack TypeScript.                               |
| [PLAN 001](../001-website/plan.md) y [PLAN 002](../002-website-form/plan.md)                                                                       | Convención observada: estado, entradas comprobadas, decisiones, archivos, validación, riesgos y cierre.                       |
| `packages/shared/package.json` y búsqueda de `tsconfig*.json`                                                                                      | `@repo/shared-types` no define scripts de comprobación; no se encontró configuración TypeScript en el workspace.              |

No se ejecutaron comandos TypeScript: aún no existen código, configuración o paquete para esta funcionalidad. Los comandos de §6 son propuestas futuras, no están verificados ni autorizados para ejecución.

## 2. Arquitectura y ubicación propuestas

### 2.1 Paquete aislado

**Decisión aprobada:** ubicar el componente en **`packages/trackflow-utils/`**, con los fuentes bajo **`packages/trackflow-utils/src/`** y nombre privado **`@repo/trackflow-utils`**. `packages/` está definido para bibliotecas reutilizables/versionables; este ejercicio produce funciones sin interfaz, servidor, persistencia o ciclo operativo propio. `services/` corresponde a APIs/procesos backend, `internal/` a herramientas para el equipo de desarrollo, y `packages/shared/` ya contiene el paquete genérico `@repo/shared-types`, no una implementación de dominio.

El paquete será privado y no tendrá dependencias de ejecución. También están aprobados TypeScript estricto con configuración local, npm, Vitest y `src/index.ts` como punto de exportación. No se modificarán la web, `packages/shared/` ni otros paquetes. El formato de módulo, las versiones exactas de herramientas y cualquier distribución consumible quedan por concretar; no se propone workspace raíz, bundler ni publicación.

### 2.2 Archivos previstos para una futura fase autorizada

| Ruta                                                     | Responsabilidad propuesta                                                                                   |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `packages/trackflow-utils/README.md`                     | Propósito, alcance, API pública, requisitos y comandos realmente verificados; sigue la guía de `packages/`. |
| `packages/trackflow-utils/package.json`                  | Identidad privada y scripts locales `typecheck`/`test`; dependencias solo de desarrollo, si se aprueban.    |
| `packages/trackflow-utils/package-lock.json`             | Reproducibilidad local si se aprueban npm y las dependencias propuestas.                                    |
| `packages/trackflow-utils/tsconfig.json`                 | Comprobación local estricta, sin emitir artefactos.                                                         |
| `packages/trackflow-utils/src/models.ts`                 | Entidades y tipos unión exactos de la SPEC.                                                                 |
| `packages/trackflow-utils/src/utils/collections.ts`      | Las cinco funciones de RF-01.                                                                               |
| `packages/trackflow-utils/src/utils/search.ts`           | Las tres funciones de RF-02.                                                                                |
| `packages/trackflow-utils/src/utils/transformations.ts`  | Coste/scoring/selección y las cinco agregaciones de RF-03/RF-04.                                            |
| `packages/trackflow-utils/src/utils/validations.ts`      | Los tres validadores con las reglas enumeradas de RF-05.                                                    |
| `packages/trackflow-utils/src/index.ts`                  | Barrel opcional de exportaciones públicas; no reemplaza los módulos prescritos.                             |
| `packages/trackflow-utils/tests/collections.test.ts`     | Pruebas de las cinco funciones de colecciones.                                                              |
| `packages/trackflow-utils/tests/search.test.ts`          | Pruebas de las tres búsquedas.                                                                              |
| `packages/trackflow-utils/tests/transformations.test.ts` | Pruebas de las ocho transformaciones.                                                                       |
| `packages/trackflow-utils/tests/validations.test.ts`     | Pruebas de los tres validadores.                                                                            |

`src/utils/` conserva las rutas indicadas por los requisitos; `models.ts` centraliza los tipos. `src/index.ts` está aprobado como punto de exportación y reexportará los módulos sin cambiar sus contratos.

## 3. Configuración y dependencias propuestas

No hay un `tsconfig` ni configuración TypeScript existente que reutilizar. `packages/shared/package.json` no define scripts ni dependencias de compilación. Se aprobó una configuración TypeScript local y estricta, junto con npm y Vitest; sus versiones concretas y algunas opciones del compilador siguen pendientes de concretar:

- **`tsconfig.json`:** `strict: true`, `noEmit: true`, `target: "ES2022"`, `module: "ESNext"`, `moduleResolution: "Bundler"`; incluir solo `src/**/*.ts` y `tests/**/*.ts`. Es configuración para chequeo estático, no fija un runtime ni genera JavaScript.
- **`package.json`:** scripts locales `typecheck: "tsc --project tsconfig.json --noEmit"` y `test: "vitest run"`; nombre privado provisional `@repo/trackflow-utils`.
- **Dependencias de desarrollo aprobadas:** `typescript` para el compilador/verificador y `vitest` para ejecutar pruebas TypeScript. No habrá dependencias de ejecución, framework, backend, IA ni base de datos.
- **Versiones:** fijar versiones compatibles y registrar lockfile al preparar el paquete; comprobar primero Node disponible en Codespaces. El repositorio no fija una versión de Node para este paquete.

Quedan por decidir las versiones, el formato de módulo y las opciones `target`, `module` y `moduleResolution`. La aprobación del PLAN no permite modificar el manifiesto raíz ni introducir otras dependencias; todos los archivos de configuración y dependencias se limitarán al paquete aprobado.

## 4. Orden de implementación y práctica

La programación será guiada y conservará el control del aprendizaje en manos del desarrollador:

1. Copilot prepara, dentro del paquete aprobado, la estructura inicial, README y configuración local de TypeScript/npm/Vitest, así como `models.ts` con las interfaces y tipos exactos del briefing.
2. Copilot prepara las firmas/declaraciones de las funciones requeridas en sus módulos y los archivos de prueba correspondientes, sin lógica de negocio. Los casos que dependan de QA abierta quedan señalados como pendientes y no se consideran aprobados por estar escritos.
3. El desarrollador implementa una función cada vez. Copilot puede explicar conceptos, ofrecer pistas y revisar el intento. Si el desarrollador lo pide para una función concreta, puede proporcionar un ejemplo parcial o ayuda más directa, limitada a esa función.
4. Después de cada función, y con autorización del desarrollador para continuar con esa función, Copilot puede ejecutar la prueba enfocada y el chequeo de tipos, revisar errores y explicar opciones de corrección. La implementación de correcciones corresponde al desarrollador salvo que solicite explícitamente ayuda de edición sobre esa función.
5. Copilot no implementará automáticamente todas las funciones, no completará la lógica de negocio de funciones pendientes y no avanzará a otra función sin autorización explícita del desarrollador.

Las pruebas pueden prepararse antes de la implementación para guiar el ejercicio; las pruebas de una función no se declaran superadas hasta que su lógica se haya implementado y se hayan ejecutado.

| Orden | Bloque              | Funciones / objetivo                                                                                                  | Progresión                                                                     |
| ----- | ------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Orden | Bloque              | Acciones de preparación/estudio                                                                                       | Límite de implementación                                                       |
| ---   | ---                 | ---                                                                                                                   | ---                                                                            |
| 0     | Estructura          | Copilot prepara solo el paquete aprobado, README, configuración local y scripts de verificación.                      | No modifica raíz, web u otros paquetes.                                        |
| 1     | Modelos             | Copilot escribe en `models.ts` las interfaces y tipos unión exactos del briefing.                                     | Tipos solamente; el desarrollador los revisa antes de seguir.                  |
| 2     | Contratos y pruebas | Copilot prepara las firmas de las 19 funciones y pruebas para los casos definidos en §5.                              | Sin lógica de negocio; QA-02 a QA-10 permanece en estado sugerido.             |
| 3     | Filtrado            | El desarrollador aborda `filterProductsByWarehouse`, `filterProductsByCategory` y `filterLowStockProducts`.           | Una función por autorización; predicados, arrays y umbral `<=`.                |
| 4     | Búsqueda lineal     | El desarrollador aborda `findProductBySKU` y `findShipmentById`.                                                      | Una función por autorización; iteración, comparación y retorno nullable.       |
| 5     | Ordenación          | El desarrollador aborda `sortProductsByStock` y `sortCarriersByReliability`.                                          | Una función por autorización; comparadores asc/desc y no mutación.             |
| 6     | Validaciones        | El desarrollador aborda `validateProduct`, `validateShipment` y `validateCarrier`.                                    | Una función por autorización; errores y límites definidos, sin ampliar reglas. |
| 7     | Agregaciones        | El desarrollador aborda `countProductsByCategory`, `groupShipmentsByStatus` y `findTopCarriers`.                      | Una función por autorización; conteos y agrupaciones.                          |
| 8     | Búsqueda binaria    | El desarrollador aborda `binarySearchProductByWeight`.                                                                | Una función por autorización; intervalos e índices.                            |
| 9     | Cálculos            | El desarrollador aborda `calculateTotalInventoryValue`, `calculateAverageShipmentDistance` y `calculateShippingCost`. | Una función por autorización; reducciones, redondeo y QA-03/QA-05.             |
| 10    | Scoring y selección | El desarrollador aborda `scoreCarrierForShipment` y luego `selectBestCarrier`.                                        | Una función por autorización; QA-02/QA-04 antes de fijar resultados afectados. |

El orden de implementación es orientativo, pero el límite de autorización no lo es: cada función se mantiene pendiente hasta que el desarrollador solicite comenzar con ella. Si una ambigüedad impide probar un resultado, se pausa la función afectada y se solicita decisión; Copilot no completa la regla por su cuenta.

## 5. Estrategia de pruebas

Las pruebas futuras usarán Vitest, aprobado para este paquete. Copilot puede preparar los archivos y casos antes de implementar las funciones, sin añadir la lógica de negocio. Después de cada función implementada por el desarrollador, podrá ejecutar las pruebas enfocadas con autorización, revisar errores y explicar correcciones; la siguiente función no comienza sin nueva autorización. Los casos que dependan de QA abierta permanecen pendientes hasta que el desarrollador confirme la regla.

| Módulo / funciones                                                                | Casos mínimos por función                                                                                                                                                   |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filterProductsByWarehouse`, `filterProductsByCategory`, `filterLowStockProducts` | Coincidencia de uno/varios, sin coincidencias, vacío; umbral de stock igual y valores a cada lado. Verificar que array y objetos originales no cambian.                     |
| `sortProductsByStock`, `sortCarriersByReliability`                                | Asc/desc, vacío, unitario y extremos; guardar orden y referencias originales. Empates: QA-04.                                                                               |
| `findProductBySKU`                                                                | Coincidencia exacta y con capitalización distinta, no encontrado, vacío, primero/último.                                                                                    |
| `findShipmentById`                                                                | ID encontrado/no encontrado, vacío y retorno del mismo objeto. No añadir regla de mayúsculas no especificada.                                                               |
| `binarySearchProductByWeight`                                                     | Inicio/medio/final, ausente antes/entre/después, vacío y unitario. Duplicados y decimales: QA-08.                                                                           |
| `calculateShippingCost`                                                           | Standard, cantidades/pesos/distancias, tasas o distancia cero, Express/Same-day y redondeo. Recargo: QA-03.                                                                 |
| `scoreCarrierForShipment`                                                         | Activar/desactivar individualmente país, peso, prioridad y fragilidad; fiabilidad 0/100/intermedia y redondeo. Criterios introductorios: QA-02.                             |
| `selectBestCarrier`                                                               | Elegible más barato, score menor que 50 excluido e igual a 50 incluido, ninguno y lista vacía. Coste y score del ganador; empates: QA-04.                                   |
| `countProductsByCategory`                                                         | Categorías presentes/omitidas, conteos repetidos y vacío. Claves completas: QA-05.                                                                                          |
| `calculateTotalInventoryValue`                                                    | Uno/varios, stock cero, redondeo y vacío; verificar que no muta entradas.                                                                                                   |
| `calculateAverageShipmentDistance`                                                | Una/varias distancias, cero, redondeo y vacío: QA-05.                                                                                                                       |
| `groupShipmentsByStatus`                                                          | Varios estados, varios envíos del mismo estado, vacío; comprobar referencias y orden dentro de cada grupo. Claves: QA-05.                                                   |
| `findTopCarriers`                                                                 | Conteos repetidos/distintos, `carrier: null`, `topN` menor/igual/mayor que únicos, vacío. Valor, empates y `topN` inválido: QA-04/06/07.                                    |
| `validateProduct`                                                                 | Válido; cada regla inválida por separado; `weightKg` 0/100, dimensiones 0/200, stock/mínimo 0, coste 0 y errores múltiples. SKU en blanco: QA-10; malformed runtime: QA-09. |
| `validateShipment`                                                                | Válido; cantidad/valor 0 y positivos; distancia 0/negativa; múltiples errores. Entidades anidadas nulas: QA-09.                                                             |
| `validateCarrier`                                                                 | Válido; tasas 0/negativas; días/peso máximo 0; `onTimeRate` 0/100/fuera de rango; `operatesIn` vacío/no vacío; múltiples errores.                                           |

### Comprobación transversal de pureza

- Guardar orden, longitud y referencias de entrada antes/después; comprobar campos usados en los objetos. La ordenación debe devolver una colección ordenada sin ordenar en sitio; identidad de entradas vacías/unitarias queda sujeta a QA-04/05 si se prueba.
- Una búsqueda puede devolver la referencia del elemento encontrado, pero no modificarlo.
- No depender de fechas actuales, red, variables globales ni orden no especificado. Las preguntas abiertas se registran como pendientes, no como expectativas implícitas.

## 6. Comandos propuestos para Codespaces

No hay runner raíz ni comandos TypeScript verificados. Con npm, TypeScript y Vitest ya aprobados, y una vez creados el paquete, sus manifiestos y scripts, desde la raíz la instalación y las comprobaciones quedarían confinadas al paquete:

```bash
npm --prefix packages/trackflow-utils ci
npm --prefix packages/trackflow-utils run typecheck
npm --prefix packages/trackflow-utils test -- tests/collections.test.ts
npm --prefix packages/trackflow-utils test -- tests/search.test.ts
npm --prefix packages/trackflow-utils test -- tests/transformations.test.ts
npm --prefix packages/trackflow-utils test -- tests/validations.test.ts
npm --prefix packages/trackflow-utils test
```

`ci` presupone el manifiesto y lockfile del paquete; `typecheck` y `test` presuponen los scripts de §3. Ejecutar el test filtrado al practicar el módulo; ejecutar el conjunto completo tras completarlo. Estos comandos siguen siendo futuros: no se ejecutaron en esta actualización y su uso ocurrirá cuando se autorice preparar el paquete. No ejecutar `npm install` en la raíz ni crear un workspace raíz.

## 7. Cuestiones abiertas: requisitos y propuestas

La columna de propuesta no modifica los requisitos confirmados; cada sugerencia requiere aprobación antes de convertirse en implementación o expectativa de test.

| QA    | Requisito confirmado                                                                                              | Propuesta pendiente / efecto                                                                                                                                                               |
| ----- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QA-01 | Los archivos están bajo `003-domain-models`; los requisitos dicen Hito/Milestone 2.                               | Mantener el identificador de la carpeta y título neutral en este PLAN. Confirmar el título oficial para documentos futuros; no editar requisitos.                                          |
| QA-02 | La matriz de score detalla país, peso, prioridad, fragilidad y fiabilidad; el resumen menciona coste y velocidad. | Propuesta: seguir únicamente la matriz detallada, sin agregar coste ni `avgDeliveryDays`. Confirmar precedencia antes de aceptar tests de scoring.                                         |
| QA-03 | Se listan tarifas y recargos 0/30/60 %, pero no la base del recargo.                                              | Propuesta: porcentaje sobre el subtotal de base + peso + distancia. No fijar resultados ni implementar hasta aprobación.                                                                   |
| QA-04 | Se define orden asc/desc, menor coste y conteo descendente, pero no desempates.                                   | Propuesta: conservar orden de entrada entre iguales; elegir el primer carrier empatado y conservar primera aparición entre conteos iguales. Confirmar para tests deterministas.            |
| QA-05 | La media se redondea; los retornos son `Record`, pero vacío y claves ausentes no se detallan.                     | Propuesta: media vacía = 0; todas las categorías/estados presentes con cero/array vacío. Confirmar antes de tests.                                                                         |
| QA-06 | `Shipment.carrier` puede contener un string o `null`; `findTopCarriers` describe el valor retornado como nombre.  | Propuesta: agrupar/devolver literalmente el string almacenado, sin lookup ni catálogo añadido. Confirmar si el campo contiene nombre o ID antes de interpretarlo.                          |
| QA-07 | `topN` limita resultados; cero, negativos, decimales y valores superiores no se definen.                          | Propuesta: entero positivo; `topN <= 0` devuelve `[]`; por encima de carriers únicos devuelve todos. Acordar tratamiento de fracciones/`NaN`.                                              |
| QA-08 | La búsqueda binaria asume peso ascendente y devuelve índice o `-1`.                                               | Propuesta: igualdad numérica exacta y cualquier índice coincidente en duplicados; sin tolerancia epsilon. Confirmar duplicados/decimales.                                                  |
| QA-09 | Solo `Shipment.carrier` acepta `null`; contratos/validaciones enumeran campos tipados y reglas explícitas.        | Propuesta: no admitir entidades/arrays null fuera de contrato ni ampliar validaciones de negocio. Aclarar datos runtime malformados y números no finitos.                                  |
| QA-10 | Se requiere `{ valid, errors }`, pero no texto, idioma, orden, granularidad ni semántica de SKU con espacios.     | Propuesta: acumular errores en orden de propiedades de la SPEC, mensajes concisos en español y tratar SKU solo de espacios como vacío. Aprobación necesaria si tests fijan estos detalles. |

Los datos de muestra permiten preparar pruebas de los casos definidos sin resolver anticipadamente las decisiones abiertas.

## 8. Protección del website y alcance

- En esta fase solo se crea `specs/003-domain-models/plan.md`; `spec.md`, requisitos y Memory Bank quedan intactos.
- En una implementación futura, el límite de escritura será el nuevo `packages/trackflow-utils/` y cualquier otro archivo aprobado expresamente. No cambiar `uis/website/`, `services/`, `packages/shared/`, manifiestos/configuración/lockfiles de raíz, datos originales o infraestructura.
- No enlazar las funciones a la web, alterar sus assets, ni añadir dependencias a Tailwind o JavaScript del website.
- Revisar estado y diff antes/después de cambios futuros; ejecutar solo verificaciones locales documentadas. No limpiar archivos ajenos ni lanzar comandos globales.
- No crear backend, API, persistencia, base de datos, agente de IA, automatización real de carriers o estructuras paralelas.

## 9. Aprobaciones y dependencias

Quedan aprobados el paquete privado `packages/trackflow-utils/` (`@repo/trackflow-utils`), TypeScript estricto local, npm, Vitest, `src/index.ts` y la protección de la web y de otros paquetes. Las versiones exactas de herramientas y opciones complementarias de módulo/compilador se concretarán al preparar la configuración local. Las propuestas QA-02 a QA-10 siguen sujetas a confirmación antes de implementar o fijar pruebas para esos comportamientos; QA-01 queda como aclaración editorial no bloqueante para la arquitectura.

La disponibilidad y versión de Node/npm en Codespaces se comprobará al preparar el paquete. No se necesitan credenciales, servicios externos ni datos operativos reales.

## 10. Cierre de la fase PLAN

Este PLAN está aprobado. La metodología permite preparar estructura, configuración, modelos, firmas y pruebas, mientras el desarrollador escribe la lógica de negocio función por función con apoyo guiado. Esta actualización no crea `tasks.md`, configuración, `src/` ni código TypeScript; cada función requerirá autorización explícita antes de comenzar y antes de avanzar a la siguiente.

Quedan pendientes las versiones concretas de herramientas, las opciones complementarias de configuración y las decisiones QA requeridas por cada comportamiento. **No crear `tasks.md` ni iniciar una función de negocio sin autorización explícita del desarrollador.**
