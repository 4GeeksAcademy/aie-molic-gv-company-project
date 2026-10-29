---
name: trackflow-memory-bank-update
description: "Sincroniza el Memory Bank de TrackFlow con cambios y decisiones verificables del repositorio, conservando información válida y sin inventar alcance, tecnología ni funcionalidades. Usar después de cambios reales o decisiones aprobadas, o para comprobar si hace falta actualizar la memoria."
---

# Actualización del Memory Bank de TrackFlow

## 1. Objetivo

Mantener `memory-bank/projectbrief.md`, `memory-bank/techContext.md` y `memory-bank/progress.md` alineados con evidencia verificable del repositorio y decisiones aprobadas. Este es el único objetivo de la skill.

No implementes funcionalidades, modifiques código de aplicación ni tomes decisiones de negocio o arquitectura. Respeta [`AGENTS.md`](../../../AGENTS.md) y [la regla de desarrollo](../../../.agents/rules/trackflow-development.md); esta skill no sustituye esas instrucciones.

## 2. Cuándo utilizar la skill

Utilízala después de cambios implementados y comprobables, decisiones expresamente aprobadas o revisiones que deban determinar si el Memory Bank quedó desactualizado. También puede usarse para proponer una actualización sin editar.

No la uses para convertir requisitos del briefing, propuestas personales o planes futuros en funcionalidades implementadas o decisiones confirmadas.

## 3. Inputs obligatorios y opcionales

### Obligatorios

- El estado actual del repositorio, incluyendo cambios sin seguimiento, preparados y no preparados; si existe una referencia base pertinente, inspeccionar también sus diferencias.
- `AGENTS.md`, `.agents/rules/trackflow-development.md` y los tres documentos del Memory Bank.
- La descripción del cambio o evento que motiva la revisión y las fuentes relevantes del área afectada, incluidos sus README cuando correspondan.
- Autorización explícita para editar documentos del Memory Bank. Si la solicitud solo pide analizar, proponer o revisar, no edites.

### Opcionales

- Commit, rama, especificación aprobada o lista de archivos que delimite el cambio.
- Registro verificable de aprobación de una decisión de negocio o técnica.
- Resultados de pruebas, validaciones o revisión funcional relacionados con la implementación.

Si falta información obligatoria, intenta obtenerla de las fuentes disponibles. No deduzcas que un cambio ajeno al alcance actual pertenece a la tarea.

## 4. Procedimiento de ejecución

1. Lee `AGENTS.md`, `.agents/rules/trackflow-development.md`, `memory-bank/projectbrief.md`, `memory-bank/techContext.md` y `memory-bank/progress.md`. Consulta además los README y fuentes del componente afectado. Conserva cualquier trabajo local preexistente.
2. Inspecciona el estado de Git, incluidos cambios preparados, no preparados y archivos nuevos. Examina las diferencias pertinentes y separa los cambios de la tarea actual de otros cambios cuando la evidencia lo permita. Un diff por sí solo no demuestra aprobación ni funcionamiento.
3. Contrasta cada posible afirmación con archivos, documentación, resultados de validación o una aprobación explícita. Clasifícala como requisito empresarial, propuesta personal, decisión confirmada o funcionalidad implementada. Para declarar una funcionalidad implementada, comprueba la implementación y la evidencia de validación disponible; si falta, describe el estado con precisión como parcial o pendiente de validar.
4. Asigna cada hecho confirmado al documento pertinente:
   - `projectbrief.md`: contexto empresarial y requisitos confirmados.
   - `techContext.md`: estructura, contratos, tecnologías y decisiones técnicas verificadas.
   - `progress.md`: avances, tareas completadas, validaciones y próximos pasos.
5. Compara la actualización propuesta con el contenido existente. Conserva lo que siga siendo válido, evita repetir información y comprueba que la propuesta no contradiga otro documento. Si no hay cambios documentales necesarios, informa de ello y termina sin editar.
6. Si existe ambigüedad, contradicción o una decisión sin aprobación verificable, detente y solicita confirmación. No registres la decisión como confirmada mientras siga pendiente.
7. Con autorización, modifica solo las secciones necesarias de los documentos del Memory Bank. No reemplaces un documento completo cuando baste una edición puntual. No modifiques código, reglas, `AGENTS.md`, README ni archivos fuera del Memory Bank.
8. Revisa las diferencias resultantes y verifica que cada afirmación añadida tiene respaldo, que se conserva la información válida, que solo cambió el documento pertinente y que el Markdown y sus referencias siguen siendo válidos. Usa únicamente validaciones disponibles y documentadas; no inventes comandos.
9. Comprueba la idempotencia: vuelve a comparar los documentos con las mismas evidencias. Una segunda ejecución no debe generar cambios adicionales si no han aparecido hechos nuevos.
10. Informa qué documentos se actualizaron o por qué no se necesitó actualizar ninguno, las evidencias consideradas, las validaciones ejecutadas y cualquier cuestión pendiente. No hagas staging, commits ni push.

## 5. Outputs esperados

- Un resumen de los cambios documentales aplicados, con los documentos y temas afectados, o una declaración explícita de que no eran necesarios.
- La relación entre las afirmaciones registradas y sus fuentes verificables; las decisiones deben incluir evidencia de aprobación.
- Las validaciones realizadas, las limitaciones y las ambigüedades que requieren confirmación.
- Si no había autorización para editar, una propuesta puntual de cambios sin modificar archivos.

## 6. Criterios de aceptación

- Cada afirmación nueva corresponde a evidencia rastreable en el repositorio o a una decisión con aprobación verificable.
- Los requisitos empresariales, propuestas personales, decisiones confirmadas y funcionalidades implementadas aparecen diferenciados.
- Solo se actualiza `projectbrief.md`, `techContext.md` o `progress.md` cuando el cambio afecta a su responsabilidad; pueden actualizarse varios únicamente cuando cada uno requiera información distinta.
- El contenido válido anterior permanece, no se duplican hechos y no aparecen contradicciones nuevas.
- Se modifican solo secciones pertinentes y ningún archivo ajeno al Memory Bank.
- Los documentos continúan siendo Markdown válido y las referencias añadidas apuntan a fuentes existentes.
- Una repetición con las mismas entradas no produce modificaciones adicionales.
- No se realizan commits ni push.

## 7. Restricciones y condiciones de parada

- Obedece siempre las restricciones, protecciones y autorizaciones de `AGENTS.md` y `.agents/rules/trackflow-development.md`. Una ejecución de esta skill no concede autorización implícita para editar.
- No inventes tecnologías, integraciones, transportistas, métricas, políticas, campos, funcionalidades implementadas ni decisiones de TrackFlow.
- `CONTEXT.md` expresa necesidades empresariales, pero no demuestra implementación ni aprobación automática del alcance. La propuesta de recomendador de `company-choice.md` sigue siendo personal y futura mientras no se apruebe expresamente. No la registres como implementada.
- No resuelvas contradicciones por inferencia. En particular, conserva como pendiente la discrepancia del CEO registrada en el Memory Bank hasta recibir confirmación autorizada.
- Detente ante falta de evidencia, decisiones ambiguas, conflictos entre fuentes o dudas sobre el alcance de la autorización. Expón qué falta y pide confirmación antes de editar.
- No alteres fuentes originales, reglas, README, código ni configuración; no realices operaciones Git de escritura o publicación.

## 8. Casos de prueba

1. **Sin cambios documentales necesarios:** el estado Git y las fuentes no aportan hechos nuevos pertinentes; informar que no se requiere actualizar la memoria y no modificar archivos.
2. **Avance verificable:** un cambio de componente autorizado está implementado y validado; actualizar únicamente `progress.md` con evidencia y conservar el resto del contenido.
3. **Decisión ambigua:** una nota o cambio sugiere una decisión, pero no hay aprobación verificable; detenerse y solicitar confirmación sin registrarla como confirmada.
4. **Contradicción sobre el CEO:** las fuentes mantienen identidades distintas; conservar la discrepancia como pendiente y no elegir ni sobrescribir una versión.
