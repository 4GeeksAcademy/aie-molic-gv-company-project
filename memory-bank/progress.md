# Progreso del proyecto

## Estado actual

## Estado vigente — 2026-10-26

- **SPEC 001 — Landing:** implementada y aprobada históricamente con limitaciones registradas en el README del website; el historial de TASKS 001 contiene entradas contradictorias y aún debe reconciliarse. La aprobación anterior no acredita automáticamente la entrega actual.
- **SPEC 002 — Formulario:** `application.html` y `validation.js` implementados: cuatro etapas de campos, resumen (quinto paso), validaciones V-01–V-12, validación en tiempo real, reinicio de formulario y envío simulado. La política de privacidad real (DP-01) queda pendiente; no existe backend ni recepción real de solicitudes.
- **Estilos:** restaurados visualmente tras recompilar Tailwind CLI 3.4.17 con la opción obligatoria `-c ./uis/website/tailwind.config.js`. Comando en [README del website](../uis/website/README.md#compilación-de-tailwind-css).
- **Evaluación 4Geeks:** pendientes las pruebas manuales finales de reset/validación en tiempo real y accesibilidad, Lighthouse actualizado de la versión entregable, captura, URL pública del Codespace y descripción/PR. Hay evidencia histórica Lighthouse del 2026-10-25 (móvil 80, escritorio 99), que no sustituye una nueva medición.
- **Documentación:** reorganización propuesta; no considerar cerrada la revisión documental hasta verificar enlaces y aprobar los cambios.

### Historial anterior

Los apartados fechados a continuación reflejan lo observado en su momento. Las referencias a `application.html` y `validation.js` vacíos son **históricas** y no describen el estado actual.


El repositorio parte de una plantilla con documentación y estructura de carpetas, no de una solución operativa de TrackFlow. `CONTEXT.md` sí contiene el briefing de la empresa, aunque el README raíz todavía lo describe como placeholder.

Existe un paquete compartido con tipos TypeScript genéricos, una plantilla de agente vacía y un script de ejemplo Python/pandas. `uis/website/index.html` contiene la landing estática con sus secciones, estilos utilitarios responsive, metadatos y marcado Organization. No hay aplicación backoffice, backend de TrackFlow ni funcionalidades operativas implementadas.

**Actualización 2026-10-25:** la inspección del HTML confirma que la landing ya incluye servicios, cobertura, beneficios, contacto y footer, además de clases responsive, metadatos y JSON-LD. Tras habilitar el puerto 3000 como público, T040 quedó completada: se verificó sin autenticación la URL HTTPS de Codespaces y recibieron `200` la landing, CSS, JavaScript, las cuatro imágenes WebP, los seis logos SVG y `/application.html` (vacío, 0 bytes). La URL y las implicaciones de exposición temporal constan en el README de la website. [TASKS 001](../specs/001-website/tasks.md) marca ahora T001–T040 y T046 completadas; las auditorías finales aún están pendientes. El mismo documento conserva notas anteriores que contradicen el estado de la implementación (por ejemplo, detenerse en T021 y T036 abierta), por lo que se debe reconciliar antes de declarar aceptado el hito. El formulario no pertenece a este alcance y permanece pendiente de SPEC 002.

**Auditoría conjunta T041+T042, sesión posterior del 2026-10-25:** Chrome/Windows permitió revisar DOM, contenido visual, logo, cuatro enlaces y tres CTA en escritorio/móvil sobre la web local. Los seis accesos por CTA respondieron `200`; formulario y validación siguen vacíos e intactos, sin carga automática desde la landing. LinkedIn se activó; email/teléfonos se cotejaron sin lanzar protocolos. La URL pública de Codespaces devuelve ahora `404`, por lo que las tareas permanecen abiertas; se registró además `/favicon.ico` con `404` para investigar en T047. Evidencia y límites en [Evaluación de la web](../uis/website/README.md). No se modificó la aplicación ni se acepta el hito.

**T043–T045 (2026-10-25):** T043 se marca completada por instrucción expresa del desarrollador tras informar del zoom real 200 % sin verificar; cinco anchos y ambas orientaciones móviles comprobados localmente. T044 sigue parcial: teclado/foco/resize, árbol accesible y contraste normal muestreado correctos; pendientes lector real, activación sin JS, recorrido inverso completo y estados de contraste/foco. T045 sigue parcial: metadatos/JSON-LD cotejados y Schema Markup Validator con 0 errores/advertencias; validación HTML completa pendiente. Evidencias en [Evaluación](../uis/website/README.md). Sin cambios de aplicación ni aceptación global.

El motor de recomendación de transportistas aparece en `company-choice.md` como propuesta personal. Se considera **fase futura**, no tarea inmediata.

## Estado de la documentación

### Reorganización propuesta, pendiente de revisión (2026-10-26)

Se ha preparado una reorganización general de la documentación del monorepo para preparar la entrega a 4Geeks:

- **`uis/README.md` (EN + ES):** Simplificado de ~140 líneas a un índice conciso (~15 líneas) que enlaza a `uis/website/README.md`. Se eliminó la duplicación de instrucciones de setup (Python server, Tailwind, Ports, Codespaces) que estaban copiadas idénticamente en ambos archivos. Nota histórica añadida.
- **`uis/website/README.md`:** Reestructurado completamente con:
  - Visión general y tabla de contenidos
  - Descripción de ambas páginas (landing + formulario multipaso con 5 etapas)
  - Tabla de tecnologías con versiones
  - **Sección de compilación de Tailwind con advertencia explícita del uso de `-c`**
  - Estructura del proyecto (tree)
  - Comandos (compilar, servir, Codespaces)
  - **Sección de entrega a 4Geeks** con artefactos requeridos y plantilla de PR
  - Evaluación completa consolidada (T050, matriz CA, T041–T049)
  - Tabla de documentación relacionada
- **`.agents/rules/trackflow-development.md`:** Añadida subsección "Compilación de Tailwind CSS" que documenta el comando autorizado con la bandera `-c` y la advertencia de no ejecutar sin configuración explícita.

Próximos pasos en documentación:

- Crear `uis/website/docs/audits/lighthouse/` para capturas de auditoría.
- Verificar que los README raíz (`docs/README.md`, `README.md`) no necesitan actualización.

## Siguientes pasos inmediatos

**Prioridad para la entrega actual:** verificar reset y validación en tiempo real en navegador, auditar Lighthouse de nuevo, guardar evidencia y verificar URL pública/PR. Las tareas históricas siguientes siguen registradas para reconciliación documental, sin impedir describir la implementación actual.


1. Reconciliar las casillas de estado, evidencias y notas finales de [TASKS 001](../specs/001-website/tasks.md), que no describen un estado coherente.
2. Restablecer la disponibilidad pública de revisión y completar los pendientes de T041+T042, T044–T045 y T047–T050. T043 queda cerrada con la limitación aceptada del zoom. T040 y T046 figuran completadas históricamente, pero la URL de T040 ya no está disponible en la última comprobación.
3. No declarar el hito aceptado hasta que las auditorías y sus evidencias estén cerradas y el estado de T036 quede consistente. No añadir un formulario funcional a SPEC 001.
4. Crear el directorio `uis/website/docs/audits/lighthouse/` para almacenar capturas de auditoría de la entrega a 4Geeks.

`AGENTS.md`, las reglas y las skills del repositorio ya existen. La foto original `last-mile.webp` contiene borde negro e icono incrustado; no se ha retocado.

## Decisiones e información pendientes

- Confirmar el alcance operativo posterior a la landing, sin adelantar el recomendador.
- Confirmar los datos disponibles, sus responsables, calidad, permisos y posibles integraciones; el repositorio no contiene conjuntos de datos operativos de TrackFlow.
- Para una futura fase del recomendador, acordar señales y criterios de evaluación, restricciones por país/cliente, explicación esperada y si la decisión será una recomendación humana o podrá iniciar acciones tras aprobación.
- Confirmar la arquitectura de futuras aplicaciones y servicios; la landing usa el stack limitado de techContext. FastAPI sigue como recomendación, no como decisión adoptada.
- Resolver la contradicción del briefing: la introducción de `CONTEXT.md` identifica a Thomas Harry como CEO, mientras que la sección de dirección ejecutiva identifica a Daniel Espinoza. Pendiente de confirmar; `CONTEXT.md` permanece sin cambios.

## Criterio para actualizar este archivo

Actualizar el estado solo cuando exista evidencia verificable en el repositorio. Mantener las propuestas, las decisiones confirmadas y las tareas futuras en categorías separadas; no marcar una funcionalidad como implementada por el hecho de que aparezca en el briefing o en un README de plantilla.
