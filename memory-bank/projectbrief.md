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

El alcance de SPEC/PLAN 001 es la landing estática de `uis/website/`, sin formulario funcional, backend ni funcionalidades operativas; Stitch es una referencia visual flexible dentro de los requisitos. El `index.html` actual contiene las secciones de la landing, utilidades responsive, metadatos y marcado Organization. El estado de implementación y sus evidencias se registran en [TASKS 001](../specs/001-website/tasks.md), cuyo resumen marca T001–T039 y T046 completadas; sin embargo, sus notas finales todavía dicen que el trabajo se detuvo en T021 y que T036, la fase responsive, el menú y auditorías siguen pendientes. Por esta contradicción, no se considera aceptado el hito ni se da por resuelto el estado de validación hasta reconciliar ese registro.

## Alcance personal propuesto

`company-choice.md` expresa interés personal por última milla, tecnología y área comercial, y propone como reto un sistema que recomiende el transportista más adecuado según destino, peso, urgencia, coste y rendimiento histórico. También plantea explicar la recomendación al coordinador y, tras su aprobación, permitir que se desencadene el siguiente paso.

Esta propuesta no sustituye ni reduce los requisitos empresariales anteriores y no consta como decisión de alcance aprobada. El motor de recomendación se registra como **fase futura**, no como trabajo inmediato de este hito.

## Fuentes y cuestiones abiertas

- Fuentes principales: [`CONTEXT.md`](../CONTEXT.md), [`company-choice.md`](../company-choice.md) y la guía de estructura en [`README.md`](../README.md).
- El briefing contiene una discrepancia sobre quién es el CEO: menciona a Thomas Harry en la introducción y a Daniel Espinoza en la sección de dirección ejecutiva. Pendiente de confirmación; no se modifica la fuente.
- La landing tiene el alcance documental anterior; los requisitos operativos posteriores, sus datos y criterios de aceptación siguen pendientes.
