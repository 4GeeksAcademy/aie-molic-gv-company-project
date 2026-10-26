# Contexto técnico

## Estructura del monorepo

La estructura siguiente refleja las carpetas presentes y el propósito que les asigna el README raíz y los README de cada área. La plantilla orienta sobre dónde ubicar trabajo; no significa que ya exista una aplicación en cada carpeta.

| Ruta                                                          | Finalidad documentada                                                                                       | Estado observado                                                                                  |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `uis/`                                                        | Interfaces de usuario. El README raíz propone `uis/website` y `uis/backoffice`.                             | Landing y formulario multipaso implementados en `uis/website`; entrega 4Geeks aún pendiente de evidencias. Backoffice pendiente. |
| `services/`                                                   | Backend, APIs y workers.                                                                                    | Existe la carpeta y su README; no hay servicio de TrackFlow implementado.                         |
| `data/raw/`, `data/pipelines/`, `data/process/`, `data/eval/` | Fuentes, transformación, salidas intermedias y evaluación.                                                  | Las carpetas existen; no se observó un pipeline de TrackFlow.                                     |
| `agents/`                                                     | Agentes de IA; `_template/` proporciona una estructura inicial y `tools/` aloja herramientas reutilizables. | Existe la plantilla; `agents/_template/agent.py` está vacío.                                      |
| `skills/`                                                     | Capacidades reutilizables para agentes.                                                                     | Hay ejemplos/plantillas; el script de análisis de datos es genérico.                              |
| `mcps/`                                                       | Servidores MCP para exponer herramientas, recursos o contexto.                                              | Existe la carpeta con README; no se observa un servidor implementado.                             |
| `workflows/`                                                  | Automatizaciones y orquestación entre sistemas.                                                             | Existe la carpeta con README; no se observan flujos de TrackFlow.                                 |
| `packages/shared/`                                            | Paquete compartido `@repo/shared-types`.                                                                    | Hay metadatos y tipos TypeScript genéricos de ejemplo.                                            |
| `shared/`                                                     | Recursos comunes que no constituyen un paquete, como esquemas o plantillas.                                 | Existe la carpeta con README.                                                                     |
| `docs/`                                                       | Documentación transversal y decisiones técnicas.                                                            | Existe la carpeta con README.                                                                     |
| `infra/`                                                      | Configuración de infraestructura y despliegue.                                                              | Existe la carpeta con README.                                                                     |
| `scripts/`                                                    | Scripts auxiliares y automatización pequeña.                                                                | Existe la carpeta con README.                                                                     |
| `internal/`                                                   | Herramientas estructuradas para el equipo de desarrollo.                                                    | Existe la carpeta con README.                                                                     |

README de referencia: [agents](../agents/README.md), [plantilla de agentes](../agents/_template/README.md), [tests de agentes](../agents/_template/tests/README.md), [herramientas de agentes](../agents/tools/README.md), [services](../services/README.md), [skills](../skills/README.md), [mcps](../mcps/README.md), [workflows](../workflows/README.md), [packages](../packages/README.md), [shared](../shared/README.md), [uis](../uis/README.md), [docs](../docs/README.md), [infra](../infra/README.md), [scripts](../scripts/README.md) e [internal](../internal/README.md). Para `data/` y sus subcarpetas, se usa la descripción del [README raíz](../README.md); no hay README de esa área en el repositorio actual.

## Tecnologías verificadas

- `packages/shared/package.json` identifica el paquete privado `@repo/shared-types`; `packages/shared/types/index.ts` contiene tipos TypeScript genéricos (`Id` y `BaseEntity`), no modelos de dominio de TrackFlow.
- `skills/data-analysis/scripts/pandas_clean.py` es un script Python que importa pandas y contiene una receta genérica de limpieza de CSV.
- `agents/_template/agent.py` está vacío.
- El README raíz declara que no hay un workspace runner configurado en la raíz ni aplicaciones ejecutables en la plantilla.

Para la landing están autorizados HTML5, Tailwind CSS 3.4.17 compilado por CLI y Google Fonts (Manrope/Inter). `uis/website/index.html` contiene las secciones hasta el footer, utilidades responsive, metadatos y JSON-LD Organization, y referencia la hoja CSS compilada y el script de navegación. No hay manifiesto de la web ni runner raíz.

### Formulario multipaso (SPEC 002)

El formulario (`application.html` + `validation.js`) usa:

- **JavaScript vanilla** para la navegación wizard (4 etapas de campos + resumen, 5 pasos en el indicador), sin frameworks.
- **Validación completa** de 12 campos (V-01 a V-12) con reglas específicas (email, teléfono, web, required, etc.).
- **Validación en tiempo real** mediante eventos input, blur y change con feedback visual inmediato.
- **Botón de limpiar** que restablece el formulario al estado inicial.
- **Contador de caracteres** para campo de comentarios (F-11).
- **Aviso de volumen bajo** para solicitudes de ≤100 envíos/mes.
- **Envío simulado** con confirmación de éxito.
- Sin dependencias de librerías externas ni frameworks CSS para el formulario (usa Tailwind compilado).

### Compilación de Tailwind CSS

El comando autorizado usa siempre la bandera `-c` con la ruta al archivo de configuración. Ver `.agents/rules/trackflow-development.md` para la regla de agente. El único comando válido desde la raíz del monorepo:

```bash
npx tailwindcss@3.4.17 -i ./uis/website/assets/css/tailwind.input.css -o ./uis/website/assets/css/tailwind.css --minify -c ./uis/website/tailwind.config.js
```

> ⚠️ Ejecutar Tailwind sin `-c` puede usar una configuración incorrecta y generar CSS sin estilos.

### Estructura de documentación del website

La documentación de `uis/website/` sigue esta organización:

| Archivo                              | Contenido                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| `uis/README.md`                      | Índice de proyectos UI (enlace al README del website)                                  |
| `uis/website/README.md`              | Documentación técnica completa (visión, páginas, stack, comandos, entrega, evaluación) |
| `uis/website/BRIEFING.md` / `.es.md` | Briefing del proyecto (EN / ES)                                                        |
| `uis/website/docs/design/DESIGN.md`  | Sistema de diseño visual (paleta, tipografía, espaciado)                               |
| `uis/website/docs/design/screen.png` | Composición visual de referencia (Stitch)                                              |

Los artefactos de auditoría (Lighthouse, pruebas responsive) se almacenarán en `uis/website/docs/audits/lighthouse/` siguiendo el mismo patrón que `docs/design/`.

[TASKS 001](../specs/001-website/tasks.md) marca T027–T029 como implementadas y registra la compilación de Tailwind y comprobaciones en localhost, pero también conserva notas que contradicen ese estado (incluidos el menú y T036 como pendientes); hay que reconciliar esas evidencias antes de afirmar la validación de esas funciones. La aprobación histórica de la landing está documentada con limitaciones; las evidencias de entrega actual siguen pendientes. Comandos: [PLAN §10](../specs/001-website/plan.md). Evidencias y límites: [TASKS](../specs/001-website/tasks.md).

No hay backend de TrackFlow, almacenamiento, despliegue o proveedor de IA adoptados por este cambio. FastAPI sigue siendo una recomendación de la plantilla.

## Ubicaciones previstas y límites

- Interfaces: `uis/website` contiene la landing estática y el formulario multipaso; la entrega final a 4Geeks sigue pendiente de evidencias actualizadas. `uis/backoffice` sigue siendo una ubicación prevista, sin aplicación implementada.
- Backend: `services/`, según el README raíz y `services/README.md`. La documentación raíz recomienda una API central FastAPI, pero la tecnología y arquitectura concretas siguen pendientes de decisión.
- Datos, agentes, skills, MCP, workflows y demás áreas se ubican en las carpetas indicadas en la tabla y sus README; su presencia no acredita funcionalidad implementada.
- El README menciona `docker-compose.yml` como parte de la plantilla, pero ese archivo no está presente en la raíz actual.

## Decisiones pendientes

- Elegir tecnologías para aplicaciones futuras, backend, persistencia, despliegue y observabilidad cuando se defina su alcance; el stack de la landing queda limitado al indicado arriba.
- Confirmar si la recomendación de FastAPI de la plantilla será adoptada.
- Acordar el alcance operativo posterior a la landing y sus fuentes de datos e integraciones antes de diseñar esos componentes.
