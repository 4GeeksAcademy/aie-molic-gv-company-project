# TrackFlow Operations Playground

Demo interna, completamente local y sin conexión a servicios externos, de las utilidades de `@repo/trackflow-utils`. Los productos, envíos, transportistas, tarifas, ubicaciones, cantidades y métricas son **datos sintéticos**. Esta aplicación no cambia inventario real, crea ni asigna envíos, persiste datos, autentica usuarios ni envía información.

## Requisitos

- Node.js 20 o posterior (LTS recomendado) y npm.
- Acceso a la raíz del repositorio para importar `packages/trackflow-utils/src/index.ts`.

Las dependencias Vite y Tailwind de esta aplicación están declaradas en este directorio; no se depende de instalaciones transitivas del paquete de utilidades. La tipografía usa fuentes del sistema y el logo se carga desde el SVG local de `uis/website/`. La inspección del código no encontró integraciones/API externas; una auditoría de red en navegador queda pendiente.

## Instalación

Desde la raíz del repositorio:

```sh
npm --prefix uis/backoffice/trackflow-playground install
```

En un Codespace recién creado, abre la raíz del repositorio en el terminal y ejecuta el mismo comando. En el directorio de la app también puedes ejecutar `npm install`.

## Desarrollo

Desde la raíz:

```sh
npm --prefix uis/backoffice/trackflow-playground run dev
```

Vite escucha en `0.0.0.0`. En Codespaces, usa el aviso **Open in Browser** para el puerto indicado (por defecto 5173); si no aparece, abre la pestaña **Ports**, reenvía 5173 y pulsa el enlace local del puerto. Para parar el servidor, usa `Ctrl+C` en el terminal.

## Build y vista previa

```sh
npm --prefix uis/backoffice/trackflow-playground run build
npm --prefix uis/backoffice/trackflow-playground run preview
```

`build` compila la hoja Tailwind local y genera `dist/` dentro de la app. `preview` sirve ese build en el puerto 4173; en Codespaces reenvía ese puerto si hace falta. El directorio `dist/` es salida generada y no es necesario editarlo.

## Verificaciones del paquete de utilidades

La app consume el TypeScript fuente directamente a través de Vite; el build de Vite no reemplaza el typecheck del paquete. Desde la raíz:

```sh
npm --prefix packages/trackflow-utils run typecheck
npm --prefix packages/trackflow-utils test
```

También están disponibles como scripts de ayuda desde esta aplicación: `npm run typecheck:utils` y `npm run test:utils` en el directorio de la app.

## Áreas de la demo

- **Resumen:** indicadores, categorías y estados calculados.
- **Inventario:** filtro por almacén/categoría/stock, orden, búsqueda de SKU, búsqueda binaria por peso, recuentos y valor de muestra.
- **Envíos:** listado, búsqueda por ID, distribución por estado y distancia media.
- **Transportistas:** orden por fiabilidad, escenario para score/coste y resultado devuelto por `selectBestCarrier`; solo como ejemplo, no recomendación operativa ni asignación real.
- **Validaciones:** respuesta original de los validadores Product, Shipment y Carrier para casos sintéticos válidos/invalidos.
- **Reportes:** recuentos, valor, distancia y top N carriers.

El botón **Restablecer demo** restaura copias nuevas de los fixtures y los controles iniciales. Los resultados de validación y las funciones de dominio vienen del paquete TypeScript real; la interfaz no mantiene una segunda implementación de esas reglas.

## Alcance de seguridad

La aplicación está diseñada para servirse localmente con Vite; no se añadió backend ni persistencia. Los datos son constantes ficticias en memoria y el estado vuelve a su valor inicial al recargar o restablecer. La ausencia de tráfico de red no ha sido auditada en navegador. No usar esta demo para decisiones de inventario, precios, asignación, cumplimiento o servicio.
