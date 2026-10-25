# Contexto técnico

## Estructura del monorepo

La estructura siguiente refleja las carpetas presentes y el propósito que les asigna el README raíz y los README de cada área. La plantilla orienta sobre dónde ubicar trabajo; no significa que ya exista una aplicación en cada carpeta.

| Ruta                                                          | Finalidad documentada                                                                                       | Estado observado                                                          |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `uis/`                                                        | Interfaces de usuario. El README raíz propone `uis/website` y `uis/backoffice`.                             | Landing estática implementada en `uis/website`; aceptación final pendiente. Backoffice pendiente. |
| `services/`                                                   | Backend, APIs y workers.                                                                                    | Existe la carpeta y su README; no hay servicio de TrackFlow implementado. |
| `data/raw/`, `data/pipelines/`, `data/process/`, `data/eval/` | Fuentes, transformación, salidas intermedias y evaluación.                                                  | Las carpetas existen; no se observó un pipeline de TrackFlow.             |
| `agents/`                                                     | Agentes de IA; `_template/` proporciona una estructura inicial y `tools/` aloja herramientas reutilizables. | Existe la plantilla; `agents/_template/agent.py` está vacío.              |
| `skills/`                                                     | Capacidades reutilizables para agentes.                                                                     | Hay ejemplos/plantillas; el script de análisis de datos es genérico.      |
| `mcps/`                                                       | Servidores MCP para exponer herramientas, recursos o contexto.                                              | Existe la carpeta con README; no se observa un servidor implementado.     |
| `workflows/`                                                  | Automatizaciones y orquestación entre sistemas.                                                             | Existe la carpeta con README; no se observan flujos de TrackFlow.         |
| `packages/shared/`                                            | Paquete compartido `@repo/shared-types`.                                                                    | Hay metadatos y tipos TypeScript genéricos de ejemplo.                    |
| `shared/`                                                     | Recursos comunes que no constituyen un paquete, como esquemas o plantillas.                                 | Existe la carpeta con README.                                             |
| `docs/`                                                       | Documentación transversal y decisiones técnicas.                                                            | Existe la carpeta con README.                                             |
| `infra/`                                                      | Configuración de infraestructura y despliegue.                                                              | Existe la carpeta con README.                                             |
| `scripts/`                                                    | Scripts auxiliares y automatización pequeña.                                                                | Existe la carpeta con README.                                             |
| `internal/`                                                   | Herramientas estructuradas para el equipo de desarrollo.                                                    | Existe la carpeta con README.                                             |

README de referencia: [agents](../agents/README.md), [plantilla de agentes](../agents/_template/README.md), [tests de agentes](../agents/_template/tests/README.md), [herramientas de agentes](../agents/tools/README.md), [services](../services/README.md), [skills](../skills/README.md), [mcps](../mcps/README.md), [workflows](../workflows/README.md), [packages](../packages/README.md), [shared](../shared/README.md), [uis](../uis/README.md), [docs](../docs/README.md), [infra](../infra/README.md), [scripts](../scripts/README.md) e [internal](../internal/README.md). Para `data/` y sus subcarpetas, se usa la descripción del [README raíz](../README.md); no hay README de esa área en el repositorio actual.

## Tecnologías verificadas

- `packages/shared/package.json` identifica el paquete privado `@repo/shared-types`; `packages/shared/types/index.ts` contiene tipos TypeScript genéricos (`Id` y `BaseEntity`), no modelos de dominio de TrackFlow.
- `skills/data-analysis/scripts/pandas_clean.py` es un script Python que importa pandas y contiene una receta genérica de limpieza de CSV.
- `agents/_template/agent.py` está vacío.
- El README raíz declara que no hay un workspace runner configurado en la raíz ni aplicaciones ejecutables en la plantilla.

Para la landing están autorizados HTML5, Tailwind CSS 3.4.17 compilado por CLI y Google Fonts (Manrope/Inter). `uis/website/index.html` contiene las secciones hasta el footer, utilidades responsive, metadatos y JSON-LD Organization, y referencia la hoja CSS compilada y el script de navegación. No hay manifiesto de la web ni runner raíz. [TASKS 001](../specs/001-website/tasks.md) marca T027–T029 como implementadas y registra la compilación de Tailwind y comprobaciones en localhost, pero también conserva notas que contradicen ese estado (incluidos el menú y T036 como pendientes); hay que reconciliar esas evidencias antes de afirmar la validación de esas funciones. Las auditorías finales de aceptación siguen pendientes. Comandos: [PLAN §10](../specs/001-website/plan.md); alternativa Python documentada en [uis/README.es.md](../uis/README.es.md). Evidencias y límites: [TASKS](../specs/001-website/tasks.md).

No hay backend de TrackFlow, almacenamiento, despliegue o proveedor de IA adoptados por este cambio. FastAPI sigue siendo una recomendación de la plantilla.

## Ubicaciones previstas y límites

- Interfaces: `uis/website` contiene la landing estática; su aceptación final no está acreditada. `uis/backoffice` sigue siendo una ubicación prevista, sin aplicación implementada.
- Backend: `services/`, según el README raíz y `services/README.md`. La documentación raíz recomienda una API central FastAPI, pero la tecnología y arquitectura concretas siguen pendientes de decisión.
- Datos, agentes, skills, MCP, workflows y demás áreas se ubican en las carpetas indicadas en la tabla y sus README; su presencia no acredita funcionalidad implementada.
- El README menciona `docker-compose.yml` como parte de la plantilla, pero ese archivo no está presente en la raíz actual.

## Decisiones pendientes

- Elegir tecnologías para aplicaciones futuras, backend, persistencia, despliegue y observabilidad cuando se defina su alcance; el stack de la landing queda limitado al indicado arriba.
- Confirmar si la recomendación de FastAPI de la plantilla será adoptada.
- Acordar el alcance operativo posterior a la landing y sus fuentes de datos e integraciones antes de diseñar esos componentes.
