# PLAN 002-website-form: formulario multipaso de solicitud de información

- **Fecha:** 2026-10-26.
- **Estado:** propuesta técnica; pendiente de revisión. No autoriza TASKS ni implementación.
- **Fuente principal:** [spec.md](spec.md) (versión 2 aprobada), leída completamente.
- **Autorización de esta fase:** redactar únicamente este PLAN. No autoriza TASKS ni IMPLEMENT.
- **Predecesor técnico:** [PLAN 001](../001-website/plan.md). Se asumen adoptadas las decisiones PT-01 a PT-06, la compilación Tailwind, el servidor http-server y la identidad visual Corporate Tech Premium, todos verificados en la implementación de la landing.

## 1. Resumen y comprobación de entrada

Construir una página HTML5 (`application.html`) con un formulario asistente multipaso (wizard) de 4 etapas + resumen, validado con JavaScript vanilla (`validation.js`), que comparte el sistema visual (Tailwind compilado, Google Fonts, paleta, logos) de la landing existente. El envío se simula: no hay backend, persistencia, API ni almacenamiento.

### Estado real comprobado al preparar el plan

| Elemento                                              | Estado y consecuencia                                                                                                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `uis/website/application.html`                        | Existe y está vacío (0 bytes). Hay que implementar la página completa con el wizard. No renombrar ni mover.                                             |
| `uis/website/validation.js`                           | Existe y está vacío (0 bytes). Hay que implementar toda la lógica del wizard y validación. No renombrar ni mover.                                       |
| `uis/website/index.html`                              | Implementado y aprobado (SPEC 001). No se modifica. Tres CTA enlazan a `./application.html`.                                                            |
| `uis/website/assets/css/tailwind.css`                 | Compilado y servido. Se reutiliza desde `application.html`. Las nuevas clases del wizard deben añadirse a `tailwind.input.css` o usarse como literales. |
| `uis/website/tailwind.config.js`                      | Configuración existente; escanea `./uis/website/**/*.{html,js}`. No se modifica.                                                                        |
| Google Fonts (Manrope 600/700/800, Inter 400/500/600) | Cargadas desde la landing con `display=swap`. `application.html` usará las mismas URLs.                                                                 |
| Recursos gráficos (logos, favicon)                    | Existen y se sirven. No se crean nuevos.                                                                                                                |
| DEP-01 a DEP-05 (SPEC 002)                            | Todas completadas o documentadas. Ninguna bloquea este PLAN.                                                                                            |
| DP-01 (privacidad)                                    | Pendiente. El checkbox F-12 debe existir y ser funcional, pero sin enlace real ni política inventada.                                                   |

**Referencias de trabajo:** [AGENTS.md](../../AGENTS.md), [regla global](../../.agents/rules/trackflow-development.md), [README raíz](../../README.md), [guía UI](../../uis/README.md), [SPEC 002](spec.md), [PLAN 001](../001-website/plan.md), [BRIEFING.es.md](../../uis/website/BRIEFING.es.md), [DESIGN.md](../../uis/website/docs/design/DESIGN.md), [index.html](../../uis/website/index.html). Memory Bank consultado: [projectbrief](../../memory-bank/projectbrief.md), [techContext](../../memory-bank/techContext.md), [progress](../../memory-bank/progress.md).

## 2. Contexto técnico y decisiones propuestas

### 2.1 Stack reutilizado de la landing

| Decisión                         | Herencia de PLAN 001                         | Aplicación en 002                                                                                                                                                   |
| -------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PT-01 / HTML estático**        | Landing con contenido completo en HTML.      | `application.html` página completa con el wizard en HTML; la navegación entre etapas la gestiona JavaScript.                                                        |
| **PT-02 / Tailwind compilado**   | Tailwind CSS 3.4.17 CLI, sin Play CDN.       | Mismo comando de compilación. Clases nuevas del wizard añadidas como literales en `tailwind.input.css` o usadas directamente con valores arbitrarios (`bg-[#...]`). |
| **PT-03 / Configuración mínima** | Sin `tailwind.config.js` propio.             | Se reutiliza el `tailwind.config.js` existente; su escaneo `./uis/website/**/*.{html,js}` cubre `application.html` y `validation.js`.                               |
| **PT-05 / Google Fonts**         | Manrope 600/700/800, Inter 400/500/600.      | Mismas URLs, mismo `display=swap`, mismos preconnect.                                                                                                               |
| **PT-06 / http-server**          | http-server 14.1.1 sirviendo `uis/website/`. | Mismo servidor, mismo puerto. Sin cambios en la configuración.                                                                                                      |

### 2.2 Decisiones específicas de 002

| ID                                                             | Decisión                                                                                                                                                                                                                                                                         | Solución y motivo    | Trazabilidad |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------ |
| **PF-01. JavaScript vanilla en un solo archivo**               | Toda la lógica del wizard (navegación, validación, contador, advertencia, simulación) en `validation.js`, cargado con `defer` desde `application.html`. Sin frameworks, sin fetch/axios, sin localStorage. Código comentado en español para facilitar el aprendizaje de juniors. | RNF-02, RF-07        |
| **PF-02. Estado del wizard en objeto JavaScript**              | Un objeto `wizardState` en memoria conserva: etapa actual, datos de todos los campos, errores de la etapa activa. No hay persistencia entre recargas (DP-05). Al avanzar/retroceder los datos se mantienen en este objeto.                                                       | RF-07, RNF-09, DP-05 |
| **PF-03. Navegación por secciones visibles**                   | Cada etapa es un `<fieldset>` o `<div>` dentro del `<form>`. JavaScript muestra/oculta secciones mediante clases CSS (`hidden`/`block`) o `display` controlado. No hay recarga de página ni peticiones al servidor.                                                              | RF-07, RNF-01        |
| **PF-04. Validación por etapa en Siguiente, global en Enviar** | Al pulsar «Siguiente» se validan solo los campos de la etapa actual. Al pulsar «Enviar solicitud» se validan todos los campos (de todas las etapas) antes de proceder. Los mensajes de error se asocian con `aria-describedby`.                                                  | RF-03, RF-07, RNF-05 |
| **PF-05. Advertencia de volumen como paso intermedio**         | Si F-08 = «0-100» al enviar, se muestra un diálogo modal o superposición con la advertencia exacta y dos botones: «Continuar» (simula envío) y «Cancelar» (vuelve al resumen). Se implementa con JavaScript, sin HTML oculto condicional.                                        | RF-04, US-03         |
| **PF-06. Contador de caracteres en tiempo real**               | Un `<span>` junto al textarea F-11 muestra «Quedan X caracteres». Se actualiza en cada `input` del teclado. Al llegar a 0 se muestra el error V-11 y se bloquea el envío.                                                                                                        | RF-03 (V-11), RNF-08 |
| **PF-07. Sin envío HTTP**                                      | El `<form>` no tiene atributos `action` ni `method`. La validación usa `preventDefault()` en el submit. No hay backend, no se envían datos, no se almacena nada.                                                                                                                 | RNF-01, RNF-06       |
| **PF-08. Cabecera simplificada**                               | `application.html` usa cabecera con el logo horizontal claro enlazado a `./index.html` con texto «Volver al inicio», y footer con logo + copyright. No se replica el menú de navegación. No se carga `navigation.js`.                                                            | RF-06, DP-04         |
| **PF-09. Checkbox de privacidad con placeholder**              | F-12 existe como checkbox obligatorio. El `<label>` incluye el texto «Acepto la política de privacidad». El enlace (`<a>`) apunta a `#` o se omite temporalmente, con un comentario `TODO` en el código señalando DP-01. No se crea una página `/privacidad.html` ficticia.      | RF-02, DP-01         |
| **PF-10. Recompilación Tailwind**                              | Tras implementar `application.html`, recompilar Tailwind con el mismo comando de PLAN 001 para que las nuevas clases literales queden incluidas en `tailwind.css`.                                                                                                               | RNF-03, DEP-05       |

## 3. Arquitectura y organización de archivos

### 3.1 Archivos implicados

| Ruta                                        | Responsabilidad                                                                                                              | Acción en 002                                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `uis/website/application.html`              | Página completa del formulario: cabecera simplificada, wizard con 4 etapas + resumen, footer.                                | **Implementar** (crear desde cero).                                                                |
| `uis/website/validation.js`                 | Lógica JavaScript: estado del wizard, navegación, validaciones, contador, advertencia, simulación de envío, gestión de foco. | **Implementar** (crear desde cero).                                                                |
| `uis/website/assets/css/tailwind.input.css` | Entrada de compilación Tailwind.                                                                                             | **Modificar**: añadir las nuevas clases literales del wizard si no están cubiertas por el escaneo. |
| `uis/website/assets/css/tailwind.css`       | Salida compilada (minificada).                                                                                               | **Recompilar** después de implementar HTML/JS.                                                     |
| `uis/website/tailwind.config.js`            | Configuración de escaneo.                                                                                                    | **No se modifica** (ya escanea `./uis/website/**/*.{html,js}`).                                    |

### 3.2 Archivos no modificables

| Ruta                                  | Restricción                                                |
| ------------------------------------- | ---------------------------------------------------------- |
| `uis/website/index.html`              | No se modifica. Sus CTA ya enlazan a `./application.html`. |
| `uis/website/assets/js/navigation.js` | No se modifica. No se carga desde `application.html`.      |
| `uis/website/assets/images/*`         | No se modifican ni se añaden.                              |
| `uis/website/assets/logos/*`          | No se modifican. Se reutilizan.                            |

### 3.3 Flujo de datos en memoria

```
validation.js
  └── wizardState (objeto en memoria)
        ├── currentStep: number (0-4, donde 4 = resumen)
        ├── steps: array de objetos con { id, title, fields[], isValid }
        └── data: objeto con valores de todos los campos { f01, f02, … f12 }

  Flujo de navegación:
    1. Usuario introduce datos → se actualiza wizardState.data en cada cambio (o al pulsar Siguiente)
    2. Pulsa «Siguiente» → validateCurrentStep() → si ok, avanza currentStep, renderiza nueva etapa
    3. Pulsa «Anterior» → currentStep--, renderiza etapa anterior con datos preservados
    4. Pulsa «Enviar solicitud» → validateAll() → si ok, checkVolumen() → si aplica, showWarning() → simularEnvio()
    5. Tras envío → ocultar formulario, mostrar mensaje de éxito, focus en mensaje
```

## 4. Estructura del wizard

### 4.1 Etapas y campos

Cada etapa es una sección HTML dentro de `<form id="form-solicitud">`. Se muestran/ocultan mediante JavaScript.

| Etapa       | ID en HTML         | Título visible             | Campos                                                                     | Botón navegación                 |
| ----------- | ------------------ | -------------------------- | -------------------------------------------------------------------------- | -------------------------------- |
| **E-1**     | `step-empresa`     | «Datos de la empresa»      | F-01 (empresa), F-05 (web)                                                 | Solo «Siguiente»                 |
| **E-2**     | `step-contacto`    | «Información de contacto»  | F-02 (contacto), F-03 (email), F-04 (teléfono)                             | «Anterior» + «Siguiente»         |
| **E-3**     | `step-operacion`   | «Datos de operación»       | F-06 (país), F-07 (producto), F-08 (volumen), F-09 (servicios), F-10 (3PL) | «Anterior» + «Siguiente»         |
| **E-4**     | `step-comentarios` | «Comentarios y privacidad» | F-11 (comentarios), F-12 (privacidad)                                      | «Anterior» + «Revisar solicitud» |
| **Resumen** | `step-resumen`     | «Revisa tu solicitud»      | Solo lectura de todos los campos                                           | «Anterior» + «Enviar solicitud»  |

### 4.2 Indicador de progreso

Elemento HTML fuera del `<form>` (pero dentro del `<main>`), antes del wizard. Puede ser:

- Lista ordenada (`<ol>`) con 5 elementos (E-1 a E-4 + Resumen).
- Cada elemento: círculo/punto con número, texto breve, y opcionalmente conector visual.
- Clase CSS `active` para etapa actual, `completed` para etapas anteriores, sin clase (o `pending`) para las siguientes.
- Colores: activo `#0758BD`, completado `#00DCCF`, pendiente `#526578`.
- Accesible: `aria-label="Paso X de 5: [nombre etapa]"` y `aria-current="step"` en el activo.

### 4.3 Resumen (modo solo lectura)

Antes de enviar, el resumen muestra todos los datos introducidos agrupados por etapa. No hay campos editables; cada sección tiene un enlace o botón «Editar» que lleva a la etapa correspondiente (navega a ese paso y deja el foco en el primer campo editable).

Implementación: al llegar al resumen, JavaScript lee `wizardState.data` y genera el HTML del resumen dinámicamente, o bien el HTML del resumen tiene elementos `<span>` / `<p>` que se rellenan desde el estado.

### 4.4 Gestión del foco (accesibilidad)

| Acción                             | Destino del foco                       | Método                                               |
| ---------------------------------- | -------------------------------------- | ---------------------------------------------------- |
| Avanzar de etapa                   | Título `h2` de la nueva etapa          | `focus()` + `tabindex="-1"`                          |
| Retroceder de etapa                | Botón «Siguiente» de la etapa anterior | O al primer campo si estaba vacío                    |
| Error en etapa al pulsar Siguiente | Primer campo con error                 | `focus()` en ese campo                               |
| Envío exitoso                      | Inicio del mensaje de éxito            | `focus()` en el `<div>` contenedor + `tabindex="-1"` |
| Advertencia de volumen (modal)     | Primer botón del modal («Continuar»)   | `focus()` al abrir; al cerrar, volver al resumen     |

## 5. Estrategia de validación

### 5.1 Reglas V-01 a V-12

Las 12 reglas se implementan como funciones independientes en `validation.js`, cada una recibe el valor del campo y devuelve un objeto `{ isValid: boolean, message: string }`.

| Regla | Función propuesta             | Lógica                                                               |
| ----- | ----------------------------- | -------------------------------------------------------------------- |
| V-01  | `validateEmpresa(valor)`      | `valor.trim().length >= 2`                                           |
| V-02  | `validateContacto(valor)`     | `valor.trim().split(/\s+/).length >= 2` y cada parte >= 2 caracteres |
| V-03  | `validateEmail(valor)`        | expresión regular básica: contiene `@` y dominio con punto           |
| V-04  | `validateTelefono(valor)`     | empieza con `+` seguido de dígitos, mínimo 2 caracteres tras el `+`  |
| V-05  | `validateWeb(valor)`          | si no está vacío, debe empezar con `http://` o `https://`            |
| V-06  | `validatePais(valor)`         | `valor !== ""` (distinto de la opción por defecto)                   |
| V-07  | `validateProducto(valor)`     | `valor !== ""`                                                       |
| V-08  | `validateVolumen(valor)`      | `valor !== ""`                                                       |
| V-09  | `validateServicios(selected)` | al menos un checkbox marcado (array con longitud > 0)                |
| V-10  | `validateTPL(valor)`          | `valor !== ""` (un radio seleccionado)                               |
| V-11  | `validateComentarios(valor)`  | `valor.length <= 500`                                                |
| V-12  | `validatePrivacidad(marcado)` | `marcado === true`                                                   |

### 5.2 Validación por etapa

Al pulsar «Siguiente» en cada etapa:

1. Recoger valores de los campos de la etapa actual desde el DOM.
2. Ejecutar la función de validación correspondiente para cada campo.
3. Si algún campo no es válido:
   - Mostrar el mensaje de error exacto debajo del campo (en `#ba1a1a`).
   - Añadir borde rojo al campo (`border-[#ba1a1a]`).
   - Vincular el error con `aria-describedby` en el campo.
   - **No avanzar** de etapa.
   - Enfocar el primer campo con error.
4. Si todos los campos son válidos:
   - Guardar los valores en `wizardState.data`.
   - Avanzar a la siguiente etapa.

### 5.3 Validación global al enviar

Al pulsar «Enviar solicitud» desde el resumen:

1. Recoger valores de **todos los campos** desde el DOM (o desde `wizardState.data` si están actualizados).
2. Ejecutar todas las validaciones V-01 a V-12.
3. Si hay errores, mostrar los mensajes y **no enviar**. El usuario debe navegar a la etapa correspondiente para corregir.
4. Si todo es válido, proceder a la comprobación de volumen (RF-04).

### 5.4 Advertencia de volumen (RF-04)

Si F-08 = «0-100» y la validación global es correcta:

1. Mostrar superposición o modal con el texto exacto de advertencia.
2. Botón «Continuar» → ejecuta `simularEnvio()`.
3. Botón «Cancelar» → cierra la advertencia, vuelve al resumen.

Si F-08 ≠ «0-100», se salta la advertencia y se ejecuta `simularEnvio()` directamente.

### 5.5 Simulación de envío (RF-05)

```javascript
function simularEnvio() {
  // 1. Ocultar el formulario (wizard y progreso)
  // 2. Mostrar el mensaje de éxito (HTML exacto del briefing)
  // 3. Enfocar el mensaje de éxito
  // 4. (Opcional) Registrar en consola que es una simulación, sin datos reales
  // No hay fetch, no hay localStorage, no hay red.
}
```

## 6. Integración con la landing

### 6.1 Coherencia visual

`application.html` debe ser visualmente indistinguible de la landing en cabecera y footer, compartiendo:

- Mismo degradado marino en cabecera (`bg-gradient-to-r from-[#03142E] via-[#06295D] to-[#03142E]`).
- Mismo logo horizontal claro (`trackflow-horizontal-light.svg`).
- Mismo fondo marfil (`bg-[#F6F5F1]`).
- Mismas tipografías (Manrope para títulos, Inter para cuerpo y labels).
- Mismo footer (logo + copyright © 2025 TrackFlow).
- Misma paleta de colores, sombras y radios.

### 6.2 Cabecera simplificada (DP-04)

A diferencia de la landing, `application.html` no tiene menú de navegación. La cabecera contiene:

```html
<header
  class="bg-gradient-to-r from-[#03142E] via-[#06295D] to-[#03142E] text-white"
>
  <div class="...contenedor max-w-[1440px]...">
    <a href="./index.html" aria-label="TrackFlow, volver al inicio" class="...">
      <img
        src="./assets/logos/trackflow-horizontal-light.svg"
        alt="TrackFlow"
        ...
      />
    </a>
    <a href="./index.html" class="...">Volver al inicio</a>
  </div>
</header>
```

### 6.3 Footer simplificado

Footer sin menú, solo logo + copyright:

```html
<footer
  class="bg-gradient-to-r from-[#03142E] via-[#06295D] to-[#03142E] text-white"
>
  <div class="...contenedor...">
    <img
      src="./assets/logos/trackflow-horizontal-light.svg"
      alt="TrackFlow"
      ...
    />
    <p class="text-sm">© 2025 TrackFlow. Todos los derechos reservados.</p>
  </div>
</footer>
```

### 6.4 Recursos compartidos

- CSS: `<link rel="stylesheet" href="./assets/css/tailwind.css">`
- Google Fonts: mismas URLs de preconnect y stylesheet que `index.html`.
- Favicon: `<link rel="icon" type="image/svg+xml" href="./assets/logos/trackflow-symbol-light.svg">`
- No cargar `navigation.js`.
- No incluir JSON-LD (ya está en la landing).

### 6.5 Campo F-12 y DP-01 (privacidad)

El checkbox de privacidad se implementa con un enlace placeholder:

```html
<div class="campo-privacidad">
  <input type="checkbox" id="f12" name="f12" value="aceptada" required />
  <label for="f12">
    Acepto la
    <a
      href="#"
      class="enlace-privacidad"
      aria-label="Política de privacidad (pendiente de publicación)"
    >
      política de privacidad
    </a>
  </label>
  <!-- TODO: DP-01 — sustituir href por la URL real cuando exista -->
  <span id="f12-error" class="text-[#ba1a1a] text-sm" role="alert"></span>
</div>
```

El `href="#"` no navega a ningún sitio (se puede usar `javascript:void(0)` y manejarlo con JS, o simplemente `href="#"` con `preventDefault` en el clic). Lo importante es que no se crea una página ficticia de privacidad.

## 7. Estrategia responsive

### 7.1 Misma base que la landing

- Breakpoints por defecto de Tailwind 3: `sm` 640 px, `md` 768 px, `lg` 1024 px.
- Contenedor máximo: `max-w-[1440px] mx-auto`.
- Márgenes: `px-4 md:px-8 lg:px-12`.
- Wizard en una columna en **todos** los tamaños (RNF-04). Los campos dentro de cada etapa se apilan en vertical siempre.

### 7.2 Comportamiento por etapa

| Etapa             | Disposición en todos los breakpoints                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E-1 (Empresa)     | Dos campos (F-01 text, F-05 url) apilados verticalmente.                                                                                                                                    |
| E-2 (Contacto)    | Tres campos apilados.                                                                                                                                                                       |
| E-3 (Operación)   | Selects, checkbox group y radio group apilados. Checkboxes y radios con `flex flex-col` en móvil, `flex-row flex-wrap` en tablet/escritorio si hay espacio, pero sin forzar fila que rompa. |
| E-4 (Comentarios) | Textarea ancho completo, checkbox debajo.                                                                                                                                                   |
| Resumen           | Bloques de solo lectura apilados.                                                                                                                                                           |

### 7.3 Puntos de verificación

- 320 px: sin scroll horizontal, campos no recortados, botones ocupan el ancho disponible.
- 375 px: referencia de texto medio; comprobar que los placeholders no desbordan.
- 768 px (tablet): márgenes laterales mayores, mismo apilamiento vertical.
- 1024 px (escritorio): contenedor más ancho, campos y botones con altura 44 px.
- 1440 px: contenedor centrado con máximo de ancho.

## 8. Accesibilidad (WCAG 2.2 AA)

### 8.1 Semántica y landmarks

- `lang="es"`, UTF-8, viewport móvil.
- `<main>` contiene exclusivamente el wizard.
- Cada campo tiene `<label for="...">` explícito.
- Checkboxes (F-09) agrupados con `<fieldset>` y `<legend>`.
- Radios (F-10) agrupados con `<fieldset>` y `<legend>`.
- Errores vinculados mediante `aria-describedby` en el campo.
- Indicador de progreso con `aria-label` descriptivo y `aria-current="step"`.
- Botones con texto descriptivo (no iconos sin texto).

### 8.2 Gestión de foco (detallada en §4.4)

- Foco visible en todos los controles (`outline` 2 px, color `#0758BD` sobre claro, `#00CFFF` sobre oscuro).
- Al cambiar de etapa, mover foco al inicio.
- Tras error, mover foco al primer campo con error.
- Tras envío exitoso, mover foco al mensaje de éxito.

### 8.3 Contraste

- Texto normal ≥ 4,5:1. Texto grande ≥ 3:1.
- Errores `#ba1a1a` sobre fondo blanco: contraste suficiente.
- Botón primario texto blanco sobre `#0758BD`: contraste ≥ 4,5:1.

### 8.4 Navegación por teclado

- Orden de tabulación lógico: campos → Siguiente → Anterior → indicador de progreso (skip si es decorativo).
- Sin trampas de foco. Sin `tabindex` positivo.
- Escape en modal de advertencia: cierra y vuelve al resumen.

## 9. Estrategia de verificación y trazabilidad

No hay suite de pruebas automatizada para este componente. Las siguientes comprobaciones se realizarán manualmente durante la implementación, y se documentarán en TASKS.

| Criterio SPEC        | Verificación prevista                                   | Método                                                 |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| CA-01, RF-01         | Acceso desde CTA de landing y URL directa               | Navegador, inspección de respuesta HTTP 200            |
| CA-02, RF-02         | 12 campos con tipos/placeholders/textos exactos         | Cotejo visual con SPEC y briefing                      |
| CA-03, RF-07         | 4 etapas + resumen, indicador de progreso               | Inspección DOM + navegador                             |
| CA-04, RF-03         | Errores exactos al pulsar Siguiente con datos inválidos | Prueba manual campo por campo                          |
| CA-05, RF-07         | Navegación completa, datos en resumen                   | Recorrido completo del wizard                          |
| CA-06, RF-05         | Envío exitoso, mensaje, mailto, vuelta a landing        | Envío simulado, inspección de red (sin llamadas)       |
| CA-07, RF-04         | Advertencia volumen 0-100, Continuar/Cancelar           | Seleccionar 0-100 y enviar                             |
| CA-08, V-11, RNF-08  | Contador de caracteres en F-11                          | Escribir en textarea, verificar conteo                 |
| CA-09, RNF-01        | Labels, fieldsets, aria-describedby, sin method/action  | Inspección de código fuente                            |
| CA-10, RNF-05, US-04 | Recorrido solo teclado, foco en cambios de etapa        | Tab/Shift+Tab por todo el wizard                       |
| CA-11, RNF-04        | 5 breakpoints, una columna, sin desbordamiento          | Redimensionar navegador                                |
| CA-12, RF-06         | Solo validation.js cargado, no navigation.js            | Inspeccionar red en carga de página                    |
| CA-13, RNF-03        | Mismo CSS, fuentes y logos que landing                  | Comparar headers HTML                                  |
| CA-14, §6.1          | Coherencia visual con DESIGN.md                         | Comparación visual lado a lado                         |
| CA-15, RF-06         | Landing sin modificar                                   | `git diff --exit-code` sobre index.html, navigation.js |

### Verificaciones automatizables

Se pueden usar durante la implementación:

- **Validador HTML** (Nu Html Checker) para semántica.
- **Lighthouse** (accesibilidad, rendimiento) sobre `application.html`.
- **Inspección de red** para confirmar 0 peticiones a backend.
- **Contraste**: medir con herramienta de color.
- **Git diff** para confirmar que no se modifican archivos de la landing.

## 10. Dependencias, riesgos y condiciones de cierre

| Riesgo o dependencia                  | Tratamiento                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **DP-01 (privacidad)**                | Pendiente de resolución. El checkbox se implementa con placeholder (`href="#"` o similar), sin página ficticia. El PLAN asume que se resolverá antes de la validación final del hito o se acordará una solución en TASKS.                                                                                                                                                                              |
| **Nuevas clases Tailwind**            | Las clases literales del wizard deben estar cubiertas por el escaneo de Tailwind. Si se usa `application.html` pero la clase no aparece en ningún HTML durante la compilación, puede omitirse. Solución: añadir la clase a `tailwind.input.css` como comentario o en una lista `@layer` si Tailwind la soporta. En la práctica, el escaneo `./uis/website/**/*.{html,js}` ya cubre `application.html`. |
| **Recompilación olvidada**            | Si se implementa el HTML/JS pero no se recompila Tailwind, las clases nuevas no tendrán estilos. Incluir la recompilación como primer paso de verificación.                                                                                                                                                                                                                                            |
| **Mismos comandos que landing**       | Los comandos de compilación y servidor son idénticos a PLAN 001. La landing ya tiene un README con instrucciones. No se duplica.                                                                                                                                                                                                                                                                       |
| **validation.js no renombrable**      | El archivo existe y está vacío. No renombrar a `validation.js.js` ni moverlo.                                                                                                                                                                                                                                                                                                                          |
| **Sin modificar landing**             | Verificar con `git diff` antes de declarar completado.                                                                                                                                                                                                                                                                                                                                                 |
| **Ausencia de pruebas automatizadas** | No hay runner ni suite. Las comprobaciones serán manuales. Documentar en TASKS qué se verificó y qué queda pendiente.                                                                                                                                                                                                                                                                                  |
| **Juniors en el equipo**              | El código JavaScript debe ser simple, con comentarios en español, funciones cortas y nombres descriptivos. Evitar patrones abstractos, closures complejas o expresiones regulares avanzadas.                                                                                                                                                                                                           |

## 11. Cierre de la fase PLAN

Este PLAN describe la arquitectura técnica para implementar el formulario multipaso de 4 etapas + resumen en `application.html` y `validation.js`, reutilizando el stack de la landing (HTML5, Tailwind CSS 3.4.17 CLI, JavaScript vanilla, Google Fonts, http-server).

Quedan aprobadas las decisiones PF-01 a PF-10. La única cuestión abierta es **DP-01** (política de privacidad), que no bloquea el inicio de la implementación pero debe resolverse antes de la validación final del checkbox F-12.

**No avanzar a TASKS o implementación sin autorización expresa.**
