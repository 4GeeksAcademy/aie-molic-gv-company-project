# TrackFlow: resumen del proyecto

## Empresa y actividad

TrackFlow presta servicios de logística de última milla y gestión de almacenes para marcas de comercio electrónico. Almacena inventario, prepara pedidos, los envía mediante transportistas y gestiona devoluciones. El briefing indica que opera en Estados Unidos y España, con almacenes en Los Ángeles y Zaragoza, aproximadamente 130 empleados y unos 9 millones de euros de ingresos anuales. [Fuente: `CONTEXT.md`]

## Situación y problemas

- **Almacenes:** Los dos centros usan sistemas distintos y no comparten visibilidad de inventario. Los pedidos entrantes se transcriben desde correos, el picking usa listas impresas y las discrepancias se detectan tarde.
- **Última milla:** La asignación de transportista y el seguimiento se hacen manualmente en portales separados. No hay datos históricos estructurados de puntualidad, incidencias o coste por peso.
- **Devoluciones:** Representan entre el 18 % y el 25 % del volumen según cliente y país; la aprobación y la inspección dependen de revisión humana y criterios no uniformes.
- **Experiencia de cliente:** Los agentes atienden consultas B2B y B2C por canales separados, sin ticketing ni base de conocimiento unificados. El briefing estima que el 80 % de las consultas podría automatizarse y señala que no hay cobertura fuera de horario.
- **Comercial:** La información de cuentas vive en hojas personales y correos; los informes a clientes son manuales y no existe visibilidad del riesgo de renovación.
- **Tecnología:** Hay dos WMS, un ERP legado, scripts punto a punto sin documentar, bases de datos en dos proveedores cloud y falta de telemetría centralizada.
- **Dirección:** Los informes consolidados se preparan manualmente y llegan con datos desactualizados; falta una vista común por país.

## Requisitos empresariales

El briefing solicita, como necesidades de negocio:

- Inventario unificado y en tiempo real, ingesta automatizada de pedidos, panel de almacén y alertas de stock bajo.
- Selección de transportista, seguimiento unificado, portal público de seguimiento y métricas de rendimiento.
- Aprobación configurable de devoluciones, flujo automatizado de recogida, inspección asistida por IA y análisis de patrones.
- Resolución automática de consultas frecuentes, conocimiento semántico para RAG, ticketing, panel de CX y análisis de sentimiento. El soporte español e inglés es opcional, aunque recomendado.
- Perfiles de cliente unificados, informes PDF automatizados, salud de cuentas, alertas de renovación y asistencia comercial.
- Telemetría, logging, pipeline para paneles, monitorización, alertas y automatización de tareas operativas.
- Panel ejecutivo con KPIs, informe semanal automático, comparación por país, alertas y asistente en lenguaje natural.

Estos son requisitos descritos en `CONTEXT.md`; no implican que estén priorizados, aprobados como alcance de un único hito ni implementados.

## Hito web autorizado (2026-10-25)

El alcance de SPEC/PLAN 001 es la landing estática de `uis/website/`, sin formulario funcional, backend ni funcionalidades operativas; Stitch es una referencia visual flexible dentro de los requisitos. El `index.html` actual contiene las secciones de la landing, utilidades responsive, metadatos y marcado Organization. El estado de implementación y sus evidencias se registran en [TASKS 001](../specs/001-website/tasks.md), cuyo resumen marca T001–T039 y T046 completadas; sin embargo, sus notas finales todavía dicen que el trabajo se detuvo en T021 y que T036, la fase responsive, el menú y auditorías siguen pendientes. Esta frase describe el estado documental anterior a la aprobación registrada el 2026-10-25 en el README del website; aún deben reconciliarse las notas contradictorias de TASKS 001 y las limitaciones de auditoría. La aprobación histórica no sustituye la comprobación de entrega actual.

## Hito SPEC 002 — Formulario multipaso

El formulario de solicitud de información (`application.html`) y su lógica de validación (`validation.js`) están implementados según [SPEC 002](../specs/002-website-form/spec.md) y [PLAN 002](../specs/002-website-form/plan.md). Incluye:

- **4 etapas de formulario más resumen**: (1) Datos de la empresa — F-01 y F-05; (2) Información de contacto — F-02 a F-04; (3) Datos de operación — F-06 a F-10; (4) Comentarios y privacidad — F-11 y F-12; (5) Resumen y envío simulado. El mensaje de éxito es una pantalla posterior, no una etapa del indicador de progreso.
- **12 campos** con validación completa (V-01 a V-12), validación en tiempo real (input/blur/change), botón de limpiar, contador de caracteres y aviso de volumen bajo (≤100 envíos/mes).
- **Navegación wizard** con JavaScript vanilla, sin dependencias externas.

El formulario se sirve en `/application.html` desde los CTA de la landing; su lógica no se carga automáticamente en `index.html`. El envío es exclusivamente simulado y DP-01 (política de privacidad real) sigue pendiente.

## Preparación para entrega a 4Geeks

La documentación del website se ha reorganizado para facilitar la entrega:

- `uis/README.md` (EN + ES) ahora es un índice conciso que enlaza al README detallado del website.
- `uis/website/README.md` se ha reestructurado con: visión general, descripción de páginas, tecnologías, estructura del proyecto, comandos, entrega a 4Geeks (artefactos, plantilla PR), evaluación completa y documentación relacionada.
- Se ha añadido una regla de agente en `.agents/rules/trackflow-development.md` que documenta la compilación correcta de Tailwind con la bandera `-c`.
- La sección de auditorías de `uis/website/README.md` consolida todas las verificaciones ejecutadas (T001–T050) con su estado y criterios de aceptación.

## Alcance personal propuesto

`company-choice.md` expresa interés personal por última milla, tecnología y área comercial, y propone como reto un sistema que recomiende el transportista más adecuado según destino, peso, urgencia, coste y rendimiento histórico. También plantea explicar la recomendación al coordinador y, tras su aprobación, permitir que se desencadene el siguiente paso.

Esta propuesta no sustituye ni reduce los requisitos empresariales anteriores y no consta como decisión de alcance aprobada. El motor de recomendación se registra como **fase futura**, no como trabajo inmediato de este hito.

## Fuentes y cuestiones abiertas

- Fuentes principales: [`CONTEXT.md`](../CONTEXT.md), [`company-choice.md`](../company-choice.md) y la guía de estructura en [`README.md`](../README.md).
- El briefing contiene una discrepancia sobre quién es el CEO: menciona a Thomas Harry en la introducción y a Daniel Espinoza en la sección de dirección ejecutiva. Pendiente de confirmación; no se modifica la fuente.
- La landing tiene el alcance documental anterior; los requisitos operativos posteriores, sus datos y criterios de aceptación siguen pendientes.
