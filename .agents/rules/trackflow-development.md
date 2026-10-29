# Regla de desarrollo de TrackFlow

## Objetivo y alcance

Esta regla establece restricciones de arquitectura y dominio para los cambios de software de TrackFlow. Su ámbito previsto es **todo el monorepo** y debe aplicarse **siempre** al analizar, diseñar, implementar o revisar cambios que afecten a sus aplicaciones, servicios, datos, agentes, integraciones o documentación técnica.

Esta regla complementa las instrucciones generales de [`AGENTS.md`](../../AGENTS.md); no las reemplaza ni repite su flujo de trabajo, política de commits o actualización del Memory Bank.

## Arquitectura y ubicación

- La web pública pertenece a `uis/website`.
- La aplicación interna pertenece a `uis/backoffice`.
- El backend y las APIs de TrackFlow pertenecen a `services/`.
- No crees aplicaciones, backends ni copias paralelas en la raíz, dentro de otra aplicación o en carpetas ajenas a estas responsabilidades.
- Antes de añadir una aplicación o servicio, comprueba la estructura existente y su guía de carpeta. La carpeta `services/` y las rutas de UI indican ubicación, no una tecnología aprobada.

## Contratos y datos

- Antes de cambiar un contrato, campo, esquema o formato de datos, localiza y revisa sus definiciones y usos actuales en el componente y en sus consumidores.
- Reutiliza los contratos existentes cuando correspondan y propaga los cambios de forma coherente a productores y consumidores. Documenta incompatibilidades o migraciones necesarias.
- `packages/shared/types/index.ts` contiene ejemplos genéricos; no lo trates como contrato de dominio de TrackFlow.
- No inventes campos, estados, integraciones, transportistas, tarifas, inventario, métricas ni datos operativos. Si faltan, detente y solicita requisitos o fuentes verificables.

## Dominio TrackFlow

- Mantén diferenciados, cuando sean relevantes, los clientes de marca B2B y los destinatarios B2C, los países, los almacenes, los pedidos, los envíos y las devoluciones. No fusiones entidades o contextos por conveniencia técnica.
- No presupongas políticas comerciales, reglas de devolución o aprobación por cliente o país, tarifas, cobertura, disponibilidad ni rendimiento de transportistas. Usa únicamente información respaldada por el briefing, contratos u otras fuentes aprobadas.
- Distingue las necesidades empresariales descritas en [`CONTEXT.md`](../../CONTEXT.md) de las funcionalidades efectivamente implementadas; una necesidad del briefing no constituye aprobación de alcance.
- El motor de recomendación de transportistas de [`company-choice.md`](../../company-choice.md) es una propuesta personal para una fase futura, no trabajo inmediato aprobado. No lo implementes ni lo priorices salvo autorización explícita del desarrollador.
- La discrepancia sobre la identidad del CEO documentada en el Memory Bank sigue pendiente. No elijas una versión ni modifiques la fuente para resolverla.

## Convenciones de desarrollo

- Consulta `AGENTS.md` y el README de cada carpeta afectada antes de trabajar. Sigue sus responsabilidades, estructura y convenciones; si una carpeta no tiene README, usa el README raíz sin inventar reglas locales.
- Mantén los cambios dentro de la responsabilidad de cada componente y evita duplicar aplicaciones, contratos o fuentes de verdad.
- Documenta cada nueva aplicación o servicio con su propio README, incluyendo objetivo, tecnología realmente utilizada, configuración y validación disponible, según las guías del repositorio.
- No introduzcas ni presentes como adoptados frameworks, proveedores, servicios externos o infraestructura que no estén confirmados en el Memory Bank o en una decisión aprobada.

## Límites y autorización

- Si los contratos, datos, reglas comerciales o fuentes disponibles no permiten tomar una decisión verificable, detén el cambio afectado y solicita aclaración al desarrollador; no completes los vacíos mediante suposiciones.
- Detente y solicita autorización explícita antes de introducir una tecnología o integración nueva, alterar reglas de negocio no documentadas, realizar acciones externas o irreversibles, o ampliar el alcance aprobado.
- Si esta regla entra en conflicto con una decisión pendiente o con las instrucciones generales, no resuelvas la contradicción por cuenta propia: conserva el estado pendiente y solicita confirmación conforme a `AGENTS.md`.
