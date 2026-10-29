# SPEC 002-website-form: formulario multipaso de solicitud de información

- **Fecha:** 2026-10-26. Versión 2: formulario multipaso (wizard).
- **Estado:** especificación; pendiente de revisión. No autoriza PLAN ni implementación.
- **Funcionalidad:** `002-website-form`.
- **Destino de implementación:** `uis/website/application.html` (estructura y campos HTML); `uis/website/validation.js` (validación, navegación del wizard y simulación de envío).
- **Stakeholder:** Miguel Torres, Director Comercial.
- **Idioma base:** español (establecido en SPEC 001). Sin traducción.
- **Predecesora:** [SPEC 001](../001-website/spec.md). Asume la landing implementada y los CTA «Solicitar información» navegando a `application.html`.

## 1. Fuentes y convenciones

| Referencia                                                                                                                    | Aplicación en esta SPEC                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [BRIEFING.es.md](../../uis/website/BRIEFING.es.md)                                                                            | Textos obligatorios: campos, validaciones, mensajes de error y éxito. Prevalecen sobre cualquier otra fuente.   |
| [DESIGN.md](../../uis/website/docs/design/DESIGN.md)                                                                          | Sistema Corporate Tech Premium: paleta, tipografía, componentes, ritmo. Aplicable al wizard.                    |
| [SPEC 001](../001-website/spec.md)                                                                                            | Contrato de enlace (RF-08): `application.html` comparte recursos, identidad visual y tipografía con la landing. |
| [PLAN 001](../001-website/plan.md) y [TASKS 001](../001-website/tasks.md)                                                     | Decisiones técnicas vigentes: Tailwind 3.4.17 CLI, Google Fonts Manrope/Inter, http-server 14.1.1.              |
| [index.html](../../uis/website/index.html)                                                                                    | Implementación real de la landing. El wizard debe mantener coherencia estética y de código.                     |
| Reglas de desarrollo ([AGENTS.md](../../AGENTS.md), [trackflow-development.md](../../.agents/rules/trackflow-development.md)) | Límites: no inventar backend, preservar fuentes, separar requisitos de implementación.                          |

### 1.1 Reglas de precedencia

1. Los textos del briefing en español (campos, validaciones, mensajes de error y éxito) son **exactos y obligatorios**. No se aceptan variaciones, traducciones ni paráfrasis.
2. No existe backend, API, base de datos, servicio de email ni CRM en el monorepo. El envío del formulario se **simula** con JavaScript: muestra el mensaje de éxito sin enviar datos a ningún destino. No hay recepción real de datos.
3. No existe documento de política de privacidad en el monorepo. El checkbox de aceptación (F-12) debe existir y ser funcional, pero el destino o contenido del enlace queda **pendiente** (DP-01) hasta disponer de un recurso real.
4. El formulario es para **empresas de e-commerce (clientes B2B)**, no para consumidores finales.
5. Los componentes visuales siguen el sistema Corporate Tech Premium de DESIGN.md, coherente con `index.html`.

## 2. Objetivo y usuarios

Capturar solicitudes de información de empresas interesadas en los servicios logísticos de TrackFlow, estructurando los datos que el equipo comercial necesita para calificar leads. El formulario se organiza en un asistente multipaso (wizard) que guía al usuario sin abrumarlo con todos los campos a la vez.

**Usuarios principales:** responsables de operaciones, logística o compras de marcas de e-commerce que evalúan externalizar su logística.

**Usuario secundario:** equipo comercial de TrackFlow, que usará los datos recogidos para contactar y calificar prospectos.

**Resultado esperado:** el visitante completa el wizard etapa por etapa, revisa un resumen final y recibe confirmación de que su solicitud ha sido recibida (simulada, sin envío real).

## 3. Alcance y exclusiones

### Incluido

- Página `application.html` con el wizard multipaso, mismo sistema visual que la landing.
- 12 campos del briefing (F-01 a F-12) con tipos HTML nativos.
- Wizard en 4 etapas + resumen final, con indicador de progreso y botones Anterior/Siguiente.
- Validación JavaScript en `validation.js`: reglas por campo, mensajes exactos del briefing, contador de caracteres, advertencia de volumen bajo y simulación de envío.
- Las respuestas se conservan al avanzar y retroceder. Resumen final antes del envío simulado.
- Diseño responsive (320-1440 px), accesible (WCAG 2.2 AA).
- Reutilización del CSS compilado de Tailwind, tipografías, paleta y logos de la landing.

### Excluido

- **Backend, persistencia o envío real.** No hay API, base de datos, email, CRM, almacenamiento en archivo ni ninguna forma de transmisión de datos. El envío se simula exclusivamente con JavaScript. No existe recepción real.
- **Autenticación, login, sesiones o área privada.**
- **Traducción al inglés** o selector de idioma.
- **Política de privacidad** completa. El checkbox existe pero el contenido o enlace del texto completo sigue pendiente (DP-01).
- **Notificaciones reales** al equipo comercial.
- **Panel de administración** para ver solicitudes.
- **Campos adicionales** no especificados en el briefing.
- **Integración con servicios externos** (Google Sheets, Airtable, Zapier, etc.).
- **Modificación de archivos de la landing** (`index.html`, `navigation.js`, CSS, recursos gráficos).
- **Guardado entre recargas.** No se conservan datos al recargar la página (ni localStorage ni otro mecanismo).
- **Límite de esta fase:** solo la SPEC. No se crean `plan.md`, `tasks.md` ni código.

## 4. Escenarios de usuario

### US-01. Completar el wizard y enviar correctamente (prioridad P1)

Como responsable de una marca de e-commerce, quiero rellenar el formulario paso a paso y recibir confirmación.

- **Dado** que accedo a `application.html`,
  **cuando** cumplimento cada etapa con datos válidos, navego con Siguiente/Anterior, reviso el resumen, acepto la privacidad y pulso «Enviar solicitud»,
  **entonces** el wizard se completa, desaparece el formulario y se muestra el mensaje de éxito con agradecimiento, confirmación, plazo 24-48 h y email `comercial@trackflow.com`.

### US-02. Errores de validación por etapa (prioridad P1)

Como visitante, quiero que cada etapa valide sus campos antes de avanzar.

- **Dado** que intento avanzar con campos obligatorios vacíos o inválidos,
  **cuando** pulso «Siguiente»,
  **entonces** la etapa no avanza, aparecen los mensajes de error específicos junto a los campos afectados y los datos ya introducidos se conservan.
- **Dado** un error visible,
  **cuando** corrijo el campo y vuelvo a pulsar «Siguiente»,
  **entonces** el error desaparece si la corrección es válida y se avanza a la siguiente etapa.

### US-03. Advertencia de volumen bajo (prioridad P2)

Como potencial cliente con envíos reducidos, quiero ser informado antes de enviar.

- **Dado** que en la etapa 4 (o resumen) el volumen estimado es «0-100»,
  **cuando** pulso «Enviar solicitud»,
  **entonces** aparece una advertencia: «Para volúmenes menores a 100 envíos mensuales, nuestros servicios podrían no ser la solución más eficiente. ¿Seguro que quieres continuar?»
- **Dado** la advertencia visible,
  **cuando** confirmo, el envío se completa; cuando cancelo, vuelvo al resumen para modificar.

### US-04. Navegación por teclado y lector de pantalla (prioridad P1)

Como usuario de tecnologías de asistencia, quiero completar el wizard sin barreras.

- **Dado** el wizard cargado,
  **cuando** navego con Tab,
  **entonces** el foco recorre campos, botones Siguiente/Anterior, checks, radios e indicador de progreso en orden lógico, con foco visible.
- **Dado** un campo con error,
  **cuando** el foco llega a él,
  **entonces** el mensaje de error se anuncia mediante `aria-describedby`.
- **Dado** el envío exitoso,
  **cuando** se muestra el mensaje de éxito,
  **entonces** el foco se traslada al inicio del mensaje.

## 5. Requisitos funcionales

### RF-01. Página del formulario

`application.html` debe ser una página HTML5 completa con la cabecera y pie de la landing (mismos logos, cabecera simplificada sin menú), el wizard como contenido principal y un enlace de vuelta a la landing.

- `lang="es"`, UTF-8, viewport móvil, título y meta description propios de la página de solicitud.
- Enlazar el mismo CSS compilado (`./assets/css/tailwind.css`) y las mismas Google Fonts (Manrope 600/700/800, Inter 400/500/600, `display=swap`) que la landing.
- Cargar `validation.js` con `defer`. No cargar `navigation.js` ni JSON-LD.
- El contenido principal será un `<main>` que contenga el wizard.

### RF-02. Campos del formulario

| ID   | Campo                         | Tipo HTML  | Opciones / placeholder                         | Obligatorio | Validación específica                           |
| ---- | ----------------------------- | ---------- | ---------------------------------------------- | ----------- | ----------------------------------------------- |
| F-01 | Nombre de la empresa          | `text`     | Placeholder: «Ej: TrackFlow S.L.»              | Sí          | Mínimo 2 caracteres                             |
| F-02 | Persona de contacto           | `text`     | Placeholder: «Ej: Ana García López»            | Sí          | Mínimo 2 palabras (nombre y apellido)           |
| F-03 | Email corporativo             | `email`    | Placeholder: «Ej: nombre@empresa.com»          | Sí          | Formato email válido (@ y dominio)              |
| F-04 | Teléfono                      | `tel`      | Placeholder: «Ej: +1 213 555 0147»             | Sí          | Debe comenzar con `+` seguido de código de país |
| F-05 | Sitio web de la empresa       | `url`      | Placeholder: «Ej: https://tutienda.com»        | No          | Si se proporciona, URL válida (http/https)      |
| F-06 | País de operación principal   | `select`   | Opciones fijas (ver §5.2)                      | Sí          | Debe seleccionar una opción                     |
| F-07 | Tipo de producto              | `select`   | Opciones fijas (ver §5.2)                      | Sí          | Debe seleccionar una opción                     |
| F-08 | Volumen mensual estimado      | `select`   | Opciones fijas (ver §5.2)                      | Sí          | Debe seleccionar una opción                     |
| F-09 | Servicios de interés          | `checkbox` | Múltiple (3 opciones, ver §5.2)                | Sí          | Al menos 1 marcado                              |
| F-10 | ¿Trabajas con otro 3PL?       | `radio`    | 3 opciones (ver §5.2)                          | Sí          | Debe seleccionar una opción                     |
| F-11 | Comentarios o necesidades     | `textarea` | Placeholder: «Cuéntanos más sobre tu proyecto» | No          | Máximo 500 caracteres, contador visible         |
| F-12 | Acepto política de privacidad | `checkbox` | Texto: «Acepto la política de privacidad»      | Sí          | Debe estar marcado para enviar                  |

### 5.2 Opciones de campos select, checkbox y radio

**F-06. País de operación principal (select)**

- «Selecciona una opción» (valor vacío, opción por defecto)
- Estados Unidos / España / Ambos / Otro

**F-07. Tipo de producto (select)**

- «Selecciona una opción» (valor vacío, opción por defecto)
- Moda / Electrónica / Cosmética / Alimentación / Otro

**F-08. Volumen mensual estimado de envíos (select)**

- «Selecciona una opción» (valor vacío, opción por defecto)
- 0-100 / 101-500 / 501-2000 / 2000+ / No estoy seguro

**F-09. Servicios de interés (checkbox múltiple)**

- Almacenaje / Última milla / Logística inversa

**F-10. ¿Actualmente trabajas con otro 3PL? (radio)**

- Sí / No / Estoy evaluando opciones

### RF-03. Validaciones

| Regla | Campo(s) | Condición                                                                           | Mensaje de error exacto (briefing español)                           |
| ----- | -------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| V-01  | F-01     | Mínimo 2 caracteres (tras recortar espacios).                                       | «El nombre de la empresa debe tener al menos 2 caracteres»           |
| V-02  | F-02     | Mínimo 2 palabras separadas por espacio. Cada palabra ≥ 2 caracteres.               | «Ingresa nombre y apellido del contacto»                             |
| V-03  | F-03     | Formato email válido: `@` y dominio con punto.                                      | «Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)»  |
| V-04  | F-04     | Debe comenzar con `+` seguido de código de país (dígitos) y al menos un dígito más. | «El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)» |
| V-05  | F-05     | Si se proporciona, debe comenzar con `http://` o `https://`.                        | «Si incluyes sitio web, debe ser una URL válida»                     |
| V-06  | F-06     | Debe seleccionar un valor distinto de la opción por defecto.                        | «Selecciona el país de operación principal»                          |
| V-07  | F-07     | Debe seleccionar un valor distinto de la opción por defecto.                        | «Selecciona el tipo de producto que manejas»                         |
| V-08  | F-08     | Debe seleccionar un valor distinto de la opción por defecto.                        | «Selecciona el volumen mensual estimado»                             |
| V-09  | F-09     | Al menos un checkbox marcado.                                                       | «Selecciona al menos un servicio de interés»                         |
| V-10  | F-10     | Una opción radio debe estar seleccionada.                                           | «Indica si actualmente trabajas con otro proveedor logístico»        |
| V-11  | F-11     | Máximo 500 caracteres. Contador en tiempo real. Si se excede, error.                | «Los comentarios no pueden exceder 500 caracteres (quedan X)»        |
| V-12  | F-12     | Checkbox debe estar marcado.                                                        | «Debes aceptar la política de privacidad para continuar»             |

La validación se ejecuta al pulsar **Siguiente** (campos de la etapa actual) y al pulsar **Enviar solicitud** (todos los campos del formulario). Los datos ya introducidos no se pierden al mostrar errores.

### RF-04. Advertencia de volumen bajo

Si F-08 (volumen mensual estimado) es «0-100», al pulsar «Enviar solicitud» (desde el resumen) debe mostrarse el texto exacto:

> «Para volúmenes menores a 100 envíos mensuales, nuestros servicios podrían no ser la solución más eficiente. ¿Seguro que quieres continuar?»

Dos opciones: **Continuar** (completa el envío simulado) o **Cancelar** (vuelve al resumen para modificar). La advertencia solo se muestra si la validación general es correcta.

La advertencia se muestra **siempre que F-08 sea «0-100»**, independientemente del tipo de producto seleccionado.

### RF-05. Mensaje de éxito

Cuando la validación es correcta y la advertencia de volumen ha sido aceptada (si aplica), se simula el envío y se muestra el mensaje exacto:

> **¡Gracias por tu interés en TrackFlow!**
>
> Hemos recibido tu solicitud. Nuestro equipo comercial revisará tu información y te contactará en las próximas 24-48 horas para agendar una llamada y conocer tus necesidades logísticas en detalle.
>
> Si tienes alguna consulta urgente, escríbenos directamente a comercial@trackflow.com

- El formulario se oculta o deshabilita y el foco se traslada al mensaje de éxito.
- `comercial@trackflow.com` debe ser un enlace `mailto:`.
- Debe incluir un enlace para volver a la landing (`./index.html` o `./`).
- El envío es una **simulación**: no se envían datos a ningún destino, no hay recepción real, no se almacena información.

### RF-06. Integración con la landing

- Los CTA «Solicitar información» de la landing enlazan a `./application.html`.
- El wizard comparte con la landing: mismo CSS compilado, mismas Google Fonts, misma paleta Corporate Tech Premium, mismos logos (`trackflow-horizontal-light.svg` para cabecera, `trackflow-symbol-light.svg` para favicon).
- Cabecera simplificada (logo + enlace «Volver al inicio» hacia la landing) y footer simplificado (logo + copyright). No se replica el menú de navegación completo.
- **No cargar** `navigation.js` desde `application.html`.
- `validation.js` se carga **solo** desde `application.html`. La landing no debe referenciarlo.

### RF-07. Wizard multipaso (multi-step)

Los 12 campos se organizan en 4 etapas temáticas más una pantalla de resumen. Cada etapa es un bloque HTML visible alternativamente mediante JavaScript (mostrar/ocultar secciones, no recargar la página).

#### Etapas del wizard

| Etapa                | Título                     | Campos incluidos                                                                                       | Validación al avanzar                                                               |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **E-1: Empresa**     | «Datos de la empresa»      | F-01 (empresa), F-05 (web)                                                                             | F-01 obligatorio; F-05 opcional, si se rellena se valida                            |
| **E-2: Contacto**    | «Información de contacto»  | F-02 (contacto), F-03 (email), F-04 (teléfono)                                                         | Los tres obligatorios                                                               |
| **E-3: Operación**   | «Datos de operación»       | F-06 (país), F-07 (producto), F-08 (volumen), F-09 (servicios), F-10 (3PL actual)                      | Todos obligatorios                                                                  |
| **E-4: Comentarios** | «Comentarios y privacidad» | F-11 (comentarios), F-12 (privacidad)                                                                  | F-11 opcional con contador; F-12 obligatorio                                        |
| **Resumen**          | «Revisa tu solicitud»      | Ningún campo. Muestra todos los datos introducidos (modo solo lectura) para confirmar antes de enviar. | Botón «Enviar solicitud» activa validación general + advertencia volumen si procede |

#### Comportamiento del wizard

- **Indicador de progreso:** barra o puntos numerados que muestran la etapa actual (E-1 a E-4 + Resumen). Debe ser accesible (texto descriptivo y aria).
- **Botón «Siguiente»:** valida los campos de la etapa actual. Si hay errores, no avanza y muestra los mensajes. Si todo es correcto, avanza a la siguiente etapa.
- **Botón «Anterior»:** retrocede a la etapa anterior **sin validar**, conservando los datos introducidos.
- **Etapa 4 («Comentarios»):** el botón «Siguiente» se etiqueta «Revisar solicitud» y lleva al resumen.
- **Resumen:** muestra todos los campos agrupados por etapa en modo solo lectura. No hay botón «Siguiente». Hay botón «Editar» o «Anterior» para volver a la etapa 4 y botón **«Enviar solicitud»** que ejecuta la validación final, la advertencia de volumen si procede y la simulación de envío.
- **Conservación de datos:** al avanzar y retroceder, todos los datos introducidos se mantienen. Se puede corregir cualquier campo en su etapa correspondiente.
- **Primera etapa (E-1):** no muestra botón «Anterior».
- **Última etapa antes del resumen (E-4 / «Comentarios»):** el botón «Siguiente» cambia a «Revisar solicitud».

#### Gestión del foco en el wizard

- Al avanzar de etapa, el foco se sitúa al inicio de la nueva etapa (p. ej. en el título de la etapa o en el primer campo).
- Al retroceder, el foco vuelve al último campo activo de la etapa anterior o al botón «Siguiente» de esa etapa.
- Tras el envío exitoso, el foco se traslada al mensaje de éxito.

## 6. Diseño y recursos

### 6.1 Coherencia visual

El wizard sigue el sistema Corporate Tech Premium (DESIGN.md) implementado en `index.html`. Los valores concretos son referencia desde la implementación real de la landing:

| Elemento                          | Especificación                                                                                                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fondo de página                   | `bg-[#F6F5F1]` (marfil)                                                                                                                                                                                                  |
| Cabecera                          | Degradado marino (`from-[#03142E] via-[#06295D] to-[#03142E]`), logo horizontal claro, sin menú                                                                                                                          |
| Footer                            | Degradado marino, logo horizontal claro, copyright                                                                                                                                                                       |
| Tarjeta del wizard                | Fondo blanco, borde `border-[#526578]/[0.16]`, sombra nivel 1, `rounded-2xl` (16 px)                                                                                                                                     |
| Inputs, textarea, select          | Fondo blanco, borde 1 px `rgba(82,101,120,0.24)`, `rounded-lg` (8 px), altura 44 px. Focus: `outline 2px solid #0758BD`                                                                                                  |
| Checkboxes y radios               | 18×18 px. Sin marcar: borde `#526578`. Marcado: relleno `#0758BD` con icono blanco                                                                                                                                       |
| Botones Siguiente/Anterior/Enviar | CTA primario: `bg-[#0758BD]`, texto blanco, `rounded-lg`. Hover: `bg-[#06295D]`. Active: `bg-[#03142E]`. Altura 48 px móvil / 44 px escritorio. El botón Anterior puede ser secundario (fondo transparente, borde sutil) |
| Texto del wizard                  | Títulos de etapa en Manrope. Etiquetas en Inter `label-md` (0.875rem, weight 600). Errores en Inter `body-sm` (0.8125rem) `#ba1a1a`                                                                                      |
| Indicador de progreso             | Diseño limpio: puntos o barra con numeración, color activo `#0758BD`, completado `#00DCCF`, pendiente `#526578`                                                                                                          |
| Espaciado                         | Ritmo del sistema: 4, 8, 16, 24, 40 px. Márgenes contenedor: 16 px móvil, 32 px tablet, 48 px escritorio. Máximo 1440 px                                                                                                 |

### 6.2 Mensajes de error y éxito

- **Errores:** aparecen debajo del campo, en `#ba1a1a`. Incluyen icono o indicador (ej. «⚠»). El campo con error muestra borde rojo (`border-[#ba1a1a]`). No desplazan bruscamente el contenido.
- **Éxito:** tarjeta blanca con borde `#0758BD` o `#00DCCF`, título en Manrope, cuerpo en Inter, email `mailto:`, enlace de vuelta a la landing.

### 6.3 Recursos

Se reutilizan los recursos de la landing, sin crear nuevos:

- Logos: `./assets/logos/trackflow-horizontal-light.svg`, `trackflow-symbol-light.svg` (favicon).
- CSS: `./assets/css/tailwind.css`.
- Fuentes: Google Fonts Manrope 600/700/800, Inter 400/500/600.
- Sin fotografías adicionales.

## 7. Requisitos no funcionales

| ID     | Requisito                                                                                                                                                                                                                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-01 | **HTML5 semántico.** `lang="es"`, UTF-8, viewport móvil. Cada campo con `<label>` explícito. Checks y radios agrupados con `<fieldset>` y `<legend>`. Errores vinculados mediante `aria-describedby`. La validación y el envío se gestionan con JavaScript (`preventDefault()`), no mediante envío HTTP.                                          |
| RNF-02 | **JavaScript vanilla.** Toda la lógica (validación, navegación del wizard, contador, advertencia, simulación de envío) en `validation.js`, un único archivo, sin dependencias. Sin frameworks, sin fetch/axios, sin almacenamiento externo. Código comentado en español.                                                                          |
| RNF-03 | **Tailwind CSS.** Reutilizar el CSS compilado de la landing. Las nuevas clases para el wizard deben añadirse a `tailwind.input.css` o usarse como clases literales, cubiertas por el escaneo de Tailwind. Sin hoja de estilos separada.                                                                                                           |
| RNF-04 | **Responsive.** Funcionar desde 320 px, revisado a 320, 375, 768, 1024 y 1440 px. Sin scroll horizontal, campos recortados ni superposiciones. El wizard se muestra en una columna en todos los tamaños (cada etapa se presenta en vertical, independientemente del ancho).                                                                       |
| RNF-05 | **Accesibilidad WCAG 2.2 AA.** Labels visibles, errores con `aria-describedby`, foco visible en todos los controles, contraste ≥ 4,5:1 texto normal, 3:1 texto grande. Navegación completa con teclado. Gestión de foco en cambios de etapa y tras envío exitoso. El indicador de progreso debe tener texto descriptivo (`aria-label` o similar). |
| RNF-06 | **Simulación de envío.** No hay backend. JavaScript oculta el wizard y muestra el mensaje de éxito. No enviar datos a ninguna URL, no almacenar en localStorage, no hacer fetch. No hay recepción real de datos.                                                                                                                                  |
| RNF-07 | **Mensajes de error exactos.** Deben coincidir literalmente con el briefing español (RF-03). Sin variaciones.                                                                                                                                                                                                                                     |
| RNF-08 | **Contador de caracteres.** F-11 muestra «Quedan X caracteres» en tiempo real. Al alcanzar 500, no permite escribir más o muestra error y bloquea el envío.                                                                                                                                                                                       |
| RNF-09 | **Sin pérdida de datos.** Los datos del usuario se conservan al navegar entre etapas, al mostrar errores y al retroceder.                                                                                                                                                                                                                         |
| RNF-10 | **Rendimiento.** Sin recursos innecesarios. La página del wizard debe cargarse con soltura en los mismos entornos que la landing.                                                                                                                                                                                                                 |

## 8. Dependencias y decisiones pendientes

### Decisiones adoptadas

Las siguientes decisiones, que en la versión anterior figuraban como pendientes, quedan resueltas e incorporadas al texto de la SPEC:

| ID    | Decisión                                                                                                                                          |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| DP-02 | **Advertencia de volumen bajo.** Se muestra **siempre** que F-08 = «0-100», sin filtrar por tipo de producto. Reflejado en RF-04.                 |
| DP-03 | **Confirmación al salir.** No se implementa. El usuario puede abandonar la página sin obstáculo.                                                  |
| DP-04 | **Cabecera simplificada** con logo y enlace «Volver al inicio». Sin menú de navegación. Reflejado en RF-06.                                       |
| DP-05 | **Guardado entre recargas.** No se utiliza localStorage ni ningún mecanismo de persistencia. Los datos se conservan solo al navegar entre etapas. |

### Decisión aún pendiente

| ID    | Decisión                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DP-01 | **Política de privacidad del checkbox F-12.** El checkbox debe existir y ser funcional, pero no se dispone de un documento de política de privacidad real. Se mantiene pendiente: no se inventa contenido ni se crea un enlace ficticio. La implementación del checkbox deberá dejarse preparada para incorporar el enlace cuando exista (p. ej. atributo `href` configurable o placeholder). Sin esta decisión el campo no puede darse por completo implementado, por lo que el PLAN deberá contemplar una solución provisional o diferida. |

### Dependencias externas

| ID     | Dependencia                                                                    | Estado                                   |
| ------ | ------------------------------------------------------------------------------ | ---------------------------------------- |
| DEP-01 | Landing implementada (SPEC 001) — CTA y destino de retorno.                    | Completada.                              |
| DEP-02 | CSS compilado de Tailwind (`tailwind.css`).                                    | Completado.                              |
| DEP-03 | Recursos gráficos (logos, favicon, fuentes).                                   | Completado.                              |
| DEP-04 | Archivos `application.html` y `validation.js` (existen, vacíos, no renombrar). | Completado.                              |
| DEP-05 | Comandos de compilación y servidor (mismos que landing).                       | Documentados en `uis/website/README.md`. |

## 9. Criterios de aceptación

| ID    | Comprobación y resultado exigido                                                                                                                                                                                                             | Trazabilidad          |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| CA-01 | Acceder a `application.html` desde los tres CTA de la landing y por URL directa. La página carga con cabecera, wizard visible y footer. Título y meta description descriptivos.                                                              | RF-01, RF-06          |
| CA-02 | El wizard contiene los 12 campos (F-01 a F-12) con tipos HTML, opciones, placeholders y textos exactos del briefing. Los selects tienen opción por defecto «Selecciona una opción».                                                          | RF-02, §5.2           |
| CA-03 | El wizard tiene 4 etapas (E-1 a E-4) más pantalla de resumen, con indicador de progreso visible y accesible. Los campos están distribuidos según lo especificado en RF-07.                                                                   | RF-07                 |
| CA-04 | En cada etapa, al pulsar «Siguiente» con campos obligatorios vacíos o inválidos, aparecen los mensajes de error exactos (V-01 a V-12) junto a los campos correspondientes. La etapa no avanza. Los datos se conservan.                       | RF-03, RF-07, RNF-09  |
| CA-05 | Rellenar todos los campos con datos válidos, navegar por todas las etapas (Siguiente/Anterior), llegar al resumen: todos los datos se muestran correctamente en modo solo lectura.                                                           | RF-07                 |
| CA-06 | Desde el resumen, pulsar «Enviar solicitud» con datos válidos: el wizard se oculta y aparece el mensaje de éxito exacto (RF-05). El email es `mailto:`. Hay enlace de vuelta a la landing. La consola no muestra errores ni llamadas de red. | RF-05, RNF-06, RNF-07 |
| CA-07 | Seleccionar volumen «0-100» y enviar desde resumen: aparece la advertencia exacta (RF-04). «Continuar» completa el envío. «Cancelar» vuelve al resumen.                                                                                      | RF-04, US-03          |
| CA-08 | El contador de comentarios (F-11) muestra «Quedan 500 caracteres» inicialmente, se actualiza al escribir y al alcanzar 0 bloquea o muestra error.                                                                                            | RF-03 (V-11), RNF-08  |
| CA-09 | Inspeccionar HTML: cada campo tiene `<label>`. Checks y radios con `<fieldset>`/`<legend>`. Errores vinculados con `aria-describedby`. El formulario no tiene `method="POST"` ni `action`; no envía por HTTP.                                | RNF-01, RNF-05        |
| CA-10 | Recorrer el wizard solo con teclado: todos los campos, botones y el indicador de progreso son accesibles. Foco visible en todo momento. Al avanzar/retroceder de etapa y al enviar, el foco se traslada correctamente.                       | RNF-05, US-04         |
| CA-11 | Revisar a 320, 375, 768, 1024 y 1440 px: sin scroll horizontal, campos recortados ni superposiciones. Una columna en todos los tamaños.                                                                                                      | RNF-04                |
| CA-12 | `validation.js` es el único JS cargado desde `application.html`. Sin `navigation.js`, sin frameworks, sin fetch/axios. La landing no carga `validation.js`.                                                                                  | RF-06, RNF-02         |
| CA-13 | El wizard comparte el mismo CSS compilado, Google Fonts y logos que la landing. Sin hojas adicionales.                                                                                                                                       | RF-06, RNF-03         |
| CA-14 | Comparar estilos del wizard (inputs, botones, checks, radios, tarjetas, indicador de progreso) con DESIGN.md y con la implementación de la landing. Misma identidad visual.                                                                  | §6.1, DESIGN.md       |
| CA-15 | Los archivos `index.html`, `navigation.js` y recursos de la landing no han sido modificados. La landing sigue funcional.                                                                                                                     | RF-06, §3             |

## 10. Cierre de la fase SPEC

Esta SPEC describe un formulario multipaso (wizard) de 4 etapas + resumen, con los 12 campos del briefing, validaciones, advertencia de volumen bajo, simulación de envío y los criterios de aceptación verificables. No se ha creado PLAN, TASKS ni código. Los archivos `application.html` y `validation.js` permanecen vacíos e intactos.

Pendientes: revisión y aprobación de esta SPEC y autorización para avanzar a PLAN. Las decisiones DP-02 a DP-05 están resueltas e incorporadas al texto. La única cuestión aún abierta es DP-01 (política de privacidad), que no bloquea el avance a PLAN pero deberá resolverse antes de la implementación completa del campo F-12.

**No avanzar a PLAN, TASKS o implementación sin autorización expresa.**
