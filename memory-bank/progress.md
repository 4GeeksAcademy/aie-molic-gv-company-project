# Progreso del proyecto

## Estado actual

El repositorio parte de una plantilla con documentación y estructura de carpetas, no de una solución operativa de TrackFlow. `CONTEXT.md` sí contiene el briefing de la empresa, aunque el README raíz todavía lo describe como placeholder.

Existe un paquete compartido con tipos TypeScript genéricos, una plantilla de agente vacía y un script de ejemplo Python/pandas. `uis/website` contiene una landing parcial; no hay aplicación backoffice, backend de TrackFlow ni funcionalidades operativas implementadas.

**Actualización 2026-10-25:** verificados los seis logos SVG y cuatro WebP sin modificar originales; T003, T007 y T013 cerradas. T014–T017 implementadas con paleta/espaciados base, Manrope/Inter, navbar marino, logos y hero. Compilación de desarrollo Tailwind 3.4.17 correcta, Preflight conservado, CSS 200 y recursos/fuentes cargados en localhost:3000. Revisión inicial a 320/375/768/1024/1440 px sin desbordamiento horizontal. Inventario y evidencias en [TASKS 001](../specs/001-website/tasks.md). T036 y las auditorías finales permanecen abiertas. El formulario sigue vacío y el menú JavaScript pendiente.

El motor de recomendación de transportistas aparece en `company-choice.md` como propuesta personal. Se considera **fase futura**, no tarea inmediata.

## Siguientes pasos inmediatos

1. Revisión visual del desarrollador del bloque hasta T017; detener implementación en este punto.
2. Con nueva autorización, continuar T018 y posteriores: servicios, cobertura, beneficios y footer específico; luego menú, SEO y verificaciones finales según sus dependencias.
3. Mantener T036 abierta aunque se recompile durante el desarrollo. No declarar el hito aceptado antes de las auditorías.

`AGENTS.md`, las reglas y las skills del repositorio ya existen. La foto original `last-mile.webp` contiene borde negro e icono incrustado; no se ha retocado.

## Decisiones e información pendientes

- Confirmar el alcance operativo posterior a la landing, sin adelantar el recomendador.
- Confirmar los datos disponibles, sus responsables, calidad, permisos y posibles integraciones; el repositorio no contiene conjuntos de datos operativos de TrackFlow.
- Para una futura fase del recomendador, acordar señales y criterios de evaluación, restricciones por país/cliente, explicación esperada y si la decisión será una recomendación humana o podrá iniciar acciones tras aprobación.
- Confirmar la arquitectura de futuras aplicaciones y servicios; la landing usa el stack limitado de techContext. FastAPI sigue como recomendación, no como decisión adoptada.
- Resolver la contradicción del briefing: la introducción de `CONTEXT.md` identifica a Thomas Harry como CEO, mientras que la sección de dirección ejecutiva identifica a Daniel Espinoza. Pendiente de confirmar; `CONTEXT.md` permanece sin cambios.

## Criterio para actualizar este archivo

Actualizar el estado solo cuando exista evidencia verificable en el repositorio. Mantener las propuestas, las decisiones confirmadas y las tareas futuras en categorías separadas; no marcar una funcionalidad como implementada por el hecho de que aparezca en el briefing o en un README de plantilla.
