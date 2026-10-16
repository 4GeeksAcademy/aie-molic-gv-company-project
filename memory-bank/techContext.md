# Contexto técnico

## Estructura del monorepo

La estructura siguiente refleja las carpetas presentes y el propósito que les asigna el README raíz y los README de cada área. La plantilla orienta sobre dónde ubicar trabajo; no significa que ya exista una aplicación en cada carpeta.

| Ruta                                                          | Finalidad documentada                                                                                       | Estado observado                                                          |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `uis/`                                                        | Interfaces de usuario. El README raíz propone `uis/website` y `uis/backoffice`.                             | Solo existe la guía de `uis/`; no hay esas aplicaciones todavía.          |
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

No hay evidencia en estos archivos de un stack adoptado para las interfaces, un backend de TrackFlow, almacenamiento, despliegue o proveedores de IA. El README raíz describe un backend centralizado FastAPI como estructura recomendada; es orientación de la plantilla, no una decisión técnica confirmada para este proyecto.

## Ubicaciones previstas y límites

- Interfaces: `uis/website` para web pública y `uis/backoffice` para aplicación interna, según la guía del README raíz. Esas subcarpetas aún no existen.
- Backend: `services/`, según el README raíz y `services/README.md`. La documentación raíz recomienda una API central FastAPI, pero la tecnología y arquitectura concretas siguen pendientes de decisión.
- Datos, agentes, skills, MCP, workflows y demás áreas se ubican en las carpetas indicadas en la tabla y sus README; su presencia no acredita funcionalidad implementada.
- El README menciona `docker-compose.yml` como parte de la plantilla, pero ese archivo no está presente en la raíz actual.

## Decisiones pendientes

- Elegir y documentar tecnologías para las aplicaciones, backend, persistencia, despliegue y observabilidad cuando se defina su alcance.
- Confirmar si la recomendación de FastAPI de la plantilla será adoptada.
- Acordar el primer alcance funcional y las fuentes de datos e integraciones disponibles antes de diseñar componentes de TrackFlow.
