# TrackFlow Utilities

Paquete privado TypeScript `@repo/trackflow-utils` con modelos y funciones puras para filtrar, ordenar, buscar, calcular agregaciones/costes, puntuar y validar datos de inventario, envíos y transportistas del hito `003-domain-models`.

## Requisitos y configuración

- Node.js permitido por el paquete: `^22.12.0 || ^24.0.0 || >=26.0.0`.
- npm.
- TypeScript y Vitest son dependencias de desarrollo locales y están fijadas en `package.json` (TypeScript `7.0.2`, Vitest `5.1.0`).
- El paquete mantiene configuración, dependencias y scripts locales; no depende de scripts raíz.

## Instalación local

Desde la raíz del monorepo:

```bash
npm --prefix packages/trackflow-utils ci
```

## Comprobaciones

Desde la raíz del monorepo:

```bash
npm --prefix packages/trackflow-utils run typecheck
npm --prefix packages/trackflow-utils test
```

El typecheck usa el `tsconfig.json` del paquete con `strict: true` y `noEmit: true`. El test ejecuta la suite completa con Vitest. Para un archivo concreto:

```bash
npm --prefix packages/trackflow-utils test -- tests/collections.test.ts
```

## API

`src/index.ts` exporta los modelos y tipos definidos en `src/models.ts`, las 19 funciones requeridas por el hito y `ValidationResult`. Los módulos de implementación están bajo `src/utils/`:

- `collections.ts`: filtros de producto y ordenación.
- `search.ts`: búsquedas por SKU/ID y búsqueda binaria por peso.
- `transformations.ts`: agregaciones, coste de envío, puntuación y selección de carrier.
- `validations.ts`: validación de Product, Shipment y Carrier.

Las funciones operan sobre sus argumentos y no realizan I/O ni modifican las colecciones/objetos de entrada. Los comportamientos de casos límite aprobados para este hito se documentan en `specs/003-domain-models/tasks.md` y en la sección de decisiones QA de ese documento.

## Alcance

Este paquete contiene utilidades deterministas del ejercicio. No implementa API, persistencia, integración real de transportistas, asignación externa de envíos ni un agente autónomo.
