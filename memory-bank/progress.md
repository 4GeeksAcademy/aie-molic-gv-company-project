# Progreso del proyecto

## Estado actual

El repositorio parte de una plantilla con documentación y estructura de carpetas, no de una solución operativa de TrackFlow. `CONTEXT.md` sí contiene el briefing de la empresa, aunque el README raíz todavía lo describe como placeholder.

Existe un paquete compartido con metadatos y tipos TypeScript genéricos (`packages/shared/`), una plantilla de agente cuyo `agent.py` está vacío y un script genérico Python/pandas en `skills/data-analysis/`. No hay aplicaciones en `uis/website` ni `uis/backoffice`, backend de TrackFlow en `services/`, ni funcionalidades de negocio de inventario, selección/seguimiento de transportistas, devoluciones, CX, CRM o reporting implementadas.

El motor de recomendación de transportistas aparece en `company-choice.md` como propuesta personal. Se considera **fase futura**, no tarea inmediata.

## Siguientes pasos inmediatos

1. Completar `AGENTS.md` en la raíz con instrucciones de trabajo coherentes con el repositorio y TrackFlow.
2. Definir las reglas en `.agents/rules/`.
3. Crear y documentar la skill correspondiente en `.agents/skills/`.
4. Validar este hito del banco de memoria: comprobar los tres archivos, la correspondencia de rutas con la plantilla y que el contenido distingue hechos, propuestas y decisiones pendientes.

Estas rutas y tareas son pasos solicitados para el proyecto; `AGENTS.md` y `.agents/` no existían al preparar este documento.

## Decisiones e información pendientes

- Confirmar el alcance funcional inicial entre las necesidades empresariales del briefing y la propuesta personal del recomendador.
- Confirmar los datos disponibles, sus responsables, calidad, permisos y posibles integraciones; el repositorio no contiene conjuntos de datos operativos de TrackFlow.
- Para una futura fase del recomendador, acordar señales y criterios de evaluación, restricciones por país/cliente, explicación esperada y si la decisión será una recomendación humana o podrá iniciar acciones tras aprobación.
- Confirmar la tecnología y arquitectura de aplicaciones y servicios; FastAPI aparece como recomendación del README, no como decisión adoptada.
- Resolver la contradicción del briefing: la introducción de `CONTEXT.md` identifica a Thomas Harry como CEO, mientras que la sección de dirección ejecutiva identifica a Daniel Espinoza. Pendiente de confirmar; `CONTEXT.md` permanece sin cambios.

## Criterio para actualizar este archivo

Actualizar el estado solo cuando exista evidencia verificable en el repositorio. Mantener las propuestas, las decisiones confirmadas y las tareas futuras en categorías separadas; no marcar una funcionalidad como implementada por el hecho de que aparezca en el briefing o en un README de plantilla.
