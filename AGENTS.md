# Instrucciones para agentes de programación de TrackFlow

Estas instrucciones son obligatorias para cualquier agente que analice o modifique este repositorio. Si una solicitud entra en conflicto con una restricción de este archivo, detente y solicita confirmación al desarrollador.

## 1. Proyecto

TrackFlow presta servicios de logística de última milla y gestión de almacenes para marcas de comercio electrónico en Estados Unidos y España. El briefing describe necesidades en operaciones de almacén, transportistas, devoluciones, experiencia de cliente, gestión comercial, tecnología y dirección. El estado y alcance documentados se mantienen en `memory-bank/`.

Trata las necesidades descritas en `CONTEXT.md` como requisitos empresariales, no como funcionalidades ya implementadas ni como alcance automáticamente aprobado para cada tarea. El motor de recomendación de transportistas descrito en `company-choice.md` es una propuesta personal para una fase futura; no lo conviertas en trabajo inmediato sin aprobación explícita del desarrollador. La discrepancia del CEO señalada en el Memory Bank sigue pendiente: no elijas una versión ni cambies la fuente por tu cuenta.

## 2. Stack tecnológico

Hechos comprobados en el repositorio:

- `packages/shared/package.json` declara el paquete privado `@repo/shared-types`, y `packages/shared/types/index.ts` contiene tipos TypeScript genéricos de ejemplo.
- `skills/data-analysis/scripts/pandas_clean.py` es un script Python que importa pandas; no constituye un servicio de TrackFlow.
- `agents/_template/agent.py` está vacío.

El README raíz recomienda una API centralizada FastAPI en `services/`, pero esa recomendación no consta como decisión técnica adoptada. No se ha confirmado un stack para las aplicaciones, persistencia, despliegue, observabilidad o proveedores de IA. No agregues ni presentes tecnologías, servicios externos o dependencias como decisiones confirmadas. Si una tarea requiere seleccionar alguno, solicita confirmación y registra la decisión aprobada en el Memory Bank.

## 3. Estructura del monorepo

Respeta la responsabilidad de cada área descrita por el README raíz y los README de carpeta:

- `uis/`: interfaces de usuario. Las aplicaciones futuras deben ubicarse en `uis/website` (web pública) y `uis/backoffice` (herramientas internas); no crees estructuras paralelas en otras carpetas.
- `services/`: APIs y procesos backend de la empresa. Todo backend futuro de TrackFlow debe residir aquí; no crees un backend paralelo en la raíz o bajo `uis/`.
- `data/raw/`: datos de origen; `data/pipelines/`: ingesta y transformación; `data/process/`: resultados intermedios; `data/eval/`: evaluación.
- `agents/`: agentes concretos, uno por subcarpeta; `agents/tools/`: herramientas reutilizables; `agents/_template/`: referencia de plantilla.
- `skills/`: capacidades reutilizables para agentes.
- `mcps/`: servidores MCP y sus herramientas o recursos.
- `workflows/`: automatizaciones e integración de procesos.
- `packages/`: bibliotecas versionables reutilizadas; `packages/shared/` contiene el paquete de tipos existente.
- `shared/`: recursos compartidos que no justifican un paquete.
- `docs/`: arquitectura y documentación transversal; `infra/`: infraestructura y despliegue; `scripts/`: automatización auxiliar; `internal/`: herramientas de desarrollo estructuradas.
- `memory-bank/`: brief del proyecto, contexto técnico y progreso. Mantenlo sincronizado con hechos y decisiones aprobadas.

Antes de trabajar en una carpeta, consulta su `README.md` (y el `README.es.md` correspondiente si está disponible). Si no existe un README en esa carpeta, consulta la guía raíz y no inventes convenciones locales. Cada nueva aplicación, servicio, agente o pipeline debe incluir su propia documentación según las guías aplicables.

## 4. Comandos

Actualmente no hay comandos raíz verificados de instalación, ejecución o pruebas para el monorepo. El README raíz indica que no hay aplicaciones ejecutables ni workspace runner configurado en la raíz. No infieras comandos a partir de ejemplos de plantilla.

Antes de ejecutar un comando de un componente, comprueba su README y sus archivos de configuración o manifiestos. Documenta y usa únicamente comandos que estén definidos en esos archivos o en documentación vigente. Si no hay un comando de prueba o validación verificable, informa que no está disponible; no lo sustituyas por uno inventado.

## 5. Convenciones

- Sigue el estilo, las dependencias y la organización que ya use el componente; no introduzcas un formato o framework nuevo por preferencia personal.
- Mantén cada responsabilidad en su carpeta y evita duplicar implementaciones, documentación o fuentes de verdad.
- Usa subcarpetas con una responsabilidad concreta y documenta cada componente nuevo con objetivo, tecnología realmente utilizada, configuración y forma de validación cuando esos datos estén disponibles.
- Distingue en documentación los hechos del repositorio, las recomendaciones de la plantilla y las decisiones pendientes.
- No declares implementada una necesidad porque aparezca en `CONTEXT.md`, en `company-choice.md` o en un README.

## 6. Reglas de dominio

- Conserva las distinciones del dominio entre marcas B2B y destinatarios B2C, países, almacenes, clientes, pedidos, envíos, transportistas y devoluciones cuando sean relevantes para la tarea.
- No inventes políticas por país o cliente, reglas de aprobación, datos de inventario, disponibilidad o rendimiento de transportistas, contratos, tarifas, integraciones ni métricas que no estén respaldadas por fuentes del proyecto.
- El briefing solicita automatización en varias áreas, pero no define todas las reglas operativas. No conviertas una recomendación técnica en una política de negocio ni realices acciones externas o irreversibles sin requisitos y autorización confirmados.
- El soporte en español e inglés figura como opcional y recomendado, no como requisito obligatorio ya aprobado.
- La selección inteligente de transportistas es una necesidad empresarial descrita en `CONTEXT.md`; la implementación concreta del agente recomendador de `company-choice.md` es una propuesta personal y una fase futura. No la desarrolles como tarea inmediata salvo aprobación expresa.

## 7. Forma de trabajar

Al inicio de cada sesión y de nuevo antes de modificar cualquier archivo, lee `memory-bank/projectbrief.md`, `memory-bank/techContext.md` y `memory-bank/progress.md`. Lee también el README de cada carpeta afectada antes de trabajar allí. Comprueba el estado actual de los archivos y conserva cambios preexistentes que no sean tuyos.

Considera siempre activa y de alcance global para todas las tareas del monorepo la regla `.agents/rules/trackflow-development.md`: léela y aplícala al inicio de cada sesión y de nuevo antes de modificar código. Copilot no garantiza la carga automática de reglas ubicadas en `.agents/rules/`; la referencia explícita desde este `AGENTS.md` es el mecanismo de integración de este repositorio.

Trabaja en el alcance autorizado más pequeño. Antes de editar, identifica los archivos afectados y cualquier decisión no resuelta que bloquee la implementación; solicita confirmación cuando sea necesaria. No inventes funcionalidades, tecnologías, decisiones empresariales, comandos ni resultados de pruebas. No amplíes el alcance de una tarea sin autorización.

Actualiza el documento correspondiente del Memory Bank cuando cambie, con evidencia verificable, el alcance o una decisión (`projectbrief.md`), la estructura o una decisión técnica (`techContext.md`), o el estado, avance y tareas pendientes (`progress.md`). Registra las decisiones como confirmadas solo después de su aprobación; conserva las cuestiones no resueltas como pendientes. No modifiques `CONTEXT.md` ni `company-choice.md` para resolver contradicciones sin autorización.

Antes de cada commit, sigue y verifica en este orden:

1. Lee los tres documentos del Memory Bank y los README de todas las carpetas afectadas; confirma que el cambio sigue alineado con el alcance aprobado.
2. Revisa el estado de Git y el diff para identificar cambios previos, archivos fuera de alcance y posibles datos sensibles. No descartes ni sobrescribas cambios ajenos.
3. Ejecuta las pruebas, validaciones o comprobaciones documentadas para el componente afectado. Si no existe un comando verificable, anota esa limitación y no inventes uno.
4. Actualiza el documento del Memory Bank que corresponda a cualquier cambio confirmado de decisión, funcionalidad o progreso.
5. Revisa de nuevo el diff, comprueba que solo incluye archivos autorizados y valida que la documentación y el estado reflejan los cambios reales.
6. Comunica el resultado de las comprobaciones y cualquier limitación; solicita autorización explícita antes de realizar el commit.

## 8. Límites y verificación

Requieren autorización explícita del desarrollador antes de modificarse:

- `CONTEXT.md`, `CONTEXT.es.md` y `company-choice.md`, que contienen contexto y elección de empresa.
- Los README existentes que forman parte de la plantilla, incluidos `README.md`, `README.es.md` y las guías de carpetas. Esta restricción no impide crear el README propio que exija la documentación de un componente nuevo autorizado.
- `.devcontainer/`, `infra/` y los datos originales bajo `data/raw/`.
- Archivos de configuración del repositorio, manifiestos de dependencias, configuración de despliegue y cualquier archivo que implique cambiar o añadir stack, proveedor, servicio externo o credenciales.

Un desarrollador puede autorizar expresamente una modificación de estos archivos o carpetas; en tal caso, limítala a lo autorizado y verifica el diff. No incluyas secretos, credenciales ni datos personales o de clientes en el repositorio.

No realices commits, push, merges ni Pull Requests sin autorización explícita del desarrollador para la operación correspondiente. Una autorización para editar o probar no autoriza operaciones Git. No declares una validación exitosa si no se ejecutó; informa qué se comprobó y qué quedó sin verificar.

Al terminar cada tarea, verifica que los cambios respetan las rutas de este monorepo, que no se ha creado una aplicación paralela, que la documentación refleja el estado real y que el diff no contiene archivos fuera del alcance autorizado.
