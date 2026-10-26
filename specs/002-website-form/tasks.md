# TASKS 002-website-form: formulario multipaso de solicitud de información

- **Fecha:** 2026-10-26.
- **Estado:** planificación aprobada; pendiente de implementar.
- **Fuentes principales:** [SPEC](spec.md) (versión 2 aprobada), [PLAN](plan.md) (aprobado), ambos leídos completos.
- **Alcance:** implementar el wizard multipaso en `application.html` y `validation.js`. No modificar SPEC, PLAN, Memory Bank, landing (`index.html`, `navigation.js`) ni recursos protegidos. No realizar commits ni pushes sin autorización explícita.
- **Decisiones vigentes:** PF-01 a PF-10 (PLAN §2.2). DP-01 (política de privacidad) sigue pendiente — el checkbox F-12 se implementa con placeholder textual, sin enlace funcional ni página ficticia.
- **Inventario:** 12 tareas, WF-01 a WF-12, distribuidas en 6 fases.

## Convenciones

- **Rutas base:** todas las rutas de archivos son relativas a `uis/website/` salvo indicación expresa.
- **Archivos destino:** `application.html` y `validation.js` existen y están vacíos. No se renombran ni mueven.
- **Archivos no modificables:** `index.html`, `navigation.js`, `assets/images/*`, `assets/logos/*`, `tailwind.config.js`. La landing no se toca.
- **Tailwind:** las nuevas clases del wizard deben estar cubiertas por el escaneo `./uis/website/**/*.{html,js}` de `tailwind.config.js`. No se modifica la configuración. La ruta del archivo de configuración es `uis/website/tailwind.config.js`.
- **DP-01 (privacidad):** el checkbox F-12 muestra el texto «Acepto la política de privacidad» sin etiqueta `<a>` funcional. La palabra «política de privacidad» puede ser un `<span>` con clase visual de enlace o texto plano, pero **sin `href`**, y acompañada de un comentario `TODO` en el código señalando DP-01. No se crea ni enlaza una página de privacidad ficticia. DP-01 **no bloquea ninguna tarea**: el checkbox F-12 es completamente funcional para el wizard; lo pendiente es únicamente el destino del enlace, que no afecta al envío simulado ni a las validaciones.
- **Validación:** se ejecuta al pulsar «Siguiente» (solo etapa actual) y al pulsar «Enviar solicitud» (todos los campos). Los datos no se pierden al mostrar errores.
- **Código:** JavaScript comentado en español, funciones cortas, sin frameworks, sin fetch/axios, sin localStorage.

---

## Fase 1 — Preparación (WF-01)

- [ ] **WF-01 — Verificar línea base, archivos destino y cobertura Tailwind**

Comprobar que `application.html` y `validation.js` existen, están vacíos y sin modificar. Confirmar que `index.html` y `navigation.js` no han cambiado y que los CTA de la landing siguen apuntando a `./application.html`. Verificar que `tailwind.config.js` (en `uis/website/`) escanea `./uis/website/**/*.{html,js}`, cubriendo ambos archivos del formulario. Ejecutar una compilación de prueba para confirmar que el comando funciona:

```bash
npx tailwindcss@3.4.17 \
  -i ./uis/website/assets/css/tailwind.input.css \
  -o ./uis/website/assets/css/tailwind.css \
  --minify \
  -c ./uis/website/tailwind.config.js
```

- **Archivos:** inspeccionar `application.html`, `validation.js`, `index.html`; comando de compilación.
- **Dependencias:** ninguna.
- **Finalización:** archivos formulario vacíos e intactos; landing sin alteraciones; CTA enlazan a `./application.html`; Tailwind compila sin errores.

---

## Fase 2 — Estructura HTML y Tailwind del wizard (WF-02 a WF-04)

- [ ] **WF-02 — Crear `application.html` con cabecera, footer y recursos**

Crear la página HTML5 completa con:

- `lang="es"`, UTF-8, viewport móvil, título propio, meta description.
- Google Fonts (Manrope 600/700/800, Inter 400/500/600, `display=swap`), preconnect, favicon.
- CSS compilado (`./assets/css/tailwind.css`).
- `validation.js` cargado con `defer`.
- Cabecera simplificada (PF-08): degradado marino, logo horizontal claro enlazado a `./index.html`, texto «Volver al inicio».
- Footer simplificado: logo + «© 2025 TrackFlow. Todos los derechos reservados.»
- `<main>` contenedor del wizard; `<form id="form-solicitud">` sin `action` ni `method`.
- **No cargar** `navigation.js`. **No incluir** JSON-LD.

- **Archivos:** crear `application.html`.
- **Dependencias:** WF-01.
- **Finalización:** página válida, recursos enlazados, cabecera y footer coherentes con la landing, form sin envío HTTP.

- [ ] **WF-03 — Implementar las 4 etapas + resumen con todos los campos**

Dentro del `<form>`, crear una sección por etapa. Cada etapa es un `<div>` (o `<fieldset>` donde agrupe campos) que se muestra/oculta con JavaScript:

- **E-1 «Datos de la empresa»:** F-01 (text), F-05 (url).
- **E-2 «Información de contacto»:** F-02 (text), F-03 (email), F-04 (tel).
- **E-3 «Datos de operación»:** F-06 (select, 5 opciones), F-07 (select, 5 opciones), F-08 (select, 5 opciones), F-09 (3 checkboxes en `<fieldset>`/`<legend>`), F-10 (3 radios en `<fieldset>`/`<legend>`).
- **E-4 «Comentarios y privacidad»:** F-11 (textarea, placeholder exacto), F-12 (checkbox con texto «Acepto la política de privacidad», **sin `<a>` funcional**, con comentario `TODO` DP-01).
- **Resumen** (`<div>`): bloques de solo lectura que se rellenan desde JavaScript, con botón «Enviar solicitud».
- **Indicador de progreso:** lista ordenada (`<ol>`) con 5 elementos, fuera del `<form>` pero dentro del `<main>`, con clases preparadas para `active`/`completed`/`pending`.

Cada campo debe tener:

- `<label for="...">` explícito con el texto exacto del briefing.
- `id` y `name` coherentes (ej. `f01`, `f02`…).
- Placeholders exactos del briefing (SPEC §5.1).
- Opciones de selects idénticas a SPEC §5.2 (incluida la opción vacía por defecto).
- Contador de caracteres junto a F-11: `<span id="contador-f11">Quedan 500 caracteres</span>`.
- Mensajes de error: `<span id="fXX-error" class="text-[#ba1a1a] text-sm" role="alert"></span>`.

- **Archivos:** modificar `application.html`.
- **Dependencias:** WF-02.
- **Finalización:** 12 campos con tipos, opciones, placeholders y textos exactos del briefing. Errores preparados. Resumen con huecos para rellenar desde JS. Indicador de progreso presente.

- [ ] **WF-04 — Aplicar estilos Tailwind al wizard**

Añadir las clases Tailwind necesarias para que el wizard sea visualmente coherente con la landing, siguiendo la paleta Corporate Tech Premium (DESIGN.md, PLAN §6.1):

- Fondo marfil, tarjeta blanca con borde/sombra/radio.
- Inputs, selects, textarea con altura 44 px, borde sutil, `rounded-lg`, foco azul `#0758BD`.
- Checkboxes y radios 18×18 px con estilos de estado (marcado/desmarcado).
- Botón primario azul `#0758BD`, hover `#06295D`, active `#03142E`.
- Botón secundario (Anterior) con fondo transparente y borde.
- Indicador de progreso: activo `#0758BD`, completado `#00DCCF`, pendiente `#526578`.
- Títulos Manrope, etiquetas y errores Inter con los tamaños de DESIGN.md.

- **Archivos:** modificar `application.html`.
- **Dependencias:** WF-03.
- **Finalización:** wizard visualmente integrado con la landing. Coherencia verificable contra DESIGN.md.

---

## Fase 3 — Navegación del wizard en `validation.js` (WF-05 a WF-06)

- [ ] **WF-05 — Implementar estado, navegación e indicador de progreso**

En `validation.js`, crear:

**Estado del wizard:**

- Objeto `wizardState` con: `currentStep` (0-4), `steps[]` (metadatos: id, título, campos), `data` (objeto con valores de F-01 a F-12).

**Inicialización:**

- `initWizard()`: oculta todas las etapas menos la primera, renderiza el indicador de progreso, asigna eventos a botones, establece el foco inicial.

**Navegación:**

- `cambiarEtapa(direccion)`: avanza (+1) o retrocede (-1). Al avanzar: ejecuta `validarEtapa()` (ver WF-08); si falla, no avanza y muestra errores. Al retroceder: sin validar.
- Mostrar/ocultar la sección correspondiente a `currentStep`.
- Preservar datos al navegar (lectura desde DOM antes de ocultar, restauración al volver).
- Botón «Siguiente» en E-1 a E-3; «Revisar solicitud» en E-4.
- Botón «Anterior» visible desde E-2 en adelante, oculto en E-1.

**Indicador de progreso:**

- Leer `aria-label` de cada elemento de la lista y aplicar `active` a la etapa actual, `completed` a las anteriores, sin clase (o `pending`) a las siguientes.
- `aria-current="step"` en el elemento activo.
- Actualizar en cada `cambiarEtapa()`.

- **Archivos:** modificar `validation.js`.
- **Dependencias:** WF-03.
- **Finalización:** se navega por las 4 etapas + resumen; datos preservados; indicador de progreso refleja el estado en todo momento.

- [ ] **WF-06 — Gestionar el foco al navegar entre etapas**

Implementar el desplazamiento del foco (PF-04, PLAN §4.4):

- Al avanzar: foco en el título `h2` de la nueva etapa (`tabindex="-1"`, `focus()`).
- Al retroceder: foco en el botón «Siguiente» de la etapa anterior.
- Al mostrar error en etapa: foco en el primer campo con error.
- Modal de advertencia de volumen: foco en el primer botón del modal al abrir; al cerrar (Cancelar o Escape), volver al resumen.
- Envío exitoso: foco en el mensaje de éxito.

- **Archivos:** modificar `validation.js`.
- **Dependencias:** WF-05.
- **Finalización:** foco gestionado correctamente en todos los cambios de etapa y estados de error/éxito.

---

## Fase 4 — Validaciones (WF-07 a WF-08)

- [ ] **WF-07 — Implementar las 12 funciones de validación (V-01 a V-12)**

Crear en `validation.js` una función por regla de validación, cada una recibiendo el valor del campo y devolviendo `{ isValid: boolean, message: string }`:

| Regla | Función                 | Lógica                                               |
| ----- | ----------------------- | ---------------------------------------------------- |
| V-01  | `validarEmpresa(v)`     | `v.trim().length >= 2`                               |
| V-02  | `validarContacto(v)`    | al menos 2 palabras, cada una ≥ 2 caracteres         |
| V-03  | `validarEmail(v)`       | contiene `@` y dominio con punto                     |
| V-04  | `validarTelefono(v)`    | empieza con `+` seguido de dígitos                   |
| V-05  | `validarWeb(v)`         | si no está vacío, empieza con `http://` o `https://` |
| V-06  | `validarPais(v)`        | `v !== ""`                                           |
| V-07  | `validarProducto(v)`    | `v !== ""`                                           |
| V-08  | `validarVolumen(v)`     | `v !== ""`                                           |
| V-09  | `validarServicios(arr)` | `arr.length > 0`                                     |
| V-10  | `validarTPL(v)`         | `v !== ""`                                           |
| V-11  | `validarComentarios(v)` | `v.length <= 500`                                    |
| V-12  | `validarPrivacidad(m)`  | `m === true`                                         |

Declarar el arreglo `VALIDATIONS` con objetos `{ campo, etapa, fn, mensaje }` que asocie cada campo con su función de validación y el mensaje de error exacto del briefing (SPEC RF-03).

- **Archivos:** modificar `validation.js`.
- **Dependencias:** WF-05.
- **Finalización:** 12 funciones implementadas con mensajes exactos del briefing. Arreglo `VALIDATIONS` definido.

- [ ] **WF-08 — Implementar validación por etapa, global y contador de caracteres**

Crear en `validation.js`:

**Validación por etapa:**

- `validarEtapa(numEtapa)`: recoge los valores del DOM para los campos de la etapa, ejecuta sus funciones V-XX a través del arreglo `VALIDATIONS`, muestra/limpia errores, aplica/quita borde rojo a campos erróneos, devuelve `true`/`false`. Si hay error, la etapa no avanza.

**Validación global:**

- `validarTodo()`: ejecuta todas las validaciones V-01 a V-12 contra los valores actuales del DOM, muestra errores, devuelve `true`/`false`.

**Gestión de errores:**

- `mostrarError(campoId, mensaje)`: escribe el mensaje en el `<span>` de error correspondiente, añade borde rojo al campo, vincula con `aria-describedby`.
- `limpiarError(campoId)`: inverso de mostrarError.

**Contador de caracteres (F-11):**

- Escuchar evento `input` en F-11. Actualizar en tiempo real el texto del `<span>` contador: «Quedan X caracteres». Al llegar a 0 (o superar 500), mostrar error V-11 y bloquear envío. Al borrar texto, recuperar el contador y limpiar el error.

**Integración:**

- `validarEtapa()` se ejecuta dentro de `cambiarEtapa(1)` antes de avanzar.
- `validarTodo()` se ejecuta al pulsar «Enviar solicitud».

- **Archivos:** modificar `validation.js`.
- **Dependencias:** WF-07, WF-06.
- **Finalización:** validaciones ejecutadas en los momentos correctos; errores visibles y limpiables; contador funciona en tiempo real.

---

## Fase 5 — Resumen, advertencia de volumen y envío simulado (WF-09 a WF-10)

- [ ] **WF-09 — Implementar el resumen con datos en solo lectura**

Al llegar a la etapa de resumen (`currentStep === 4`), `validation.js` debe:

- Leer `wizardState.data` (o los valores actuales del DOM).
- Rellenar los bloques de solo lectura del resumen con todos los campos agrupados por etapa.
- Cada bloque incluye un enlace «Editar» que navega a la etapa correspondiente (`cambiarEtapa(n)`) y deja el foco en el primer campo editable de esa etapa.
- El botón «Enviar solicitud» está visible y activo.

- **Archivos:** modificar `validation.js`.
- **Dependencias:** WF-08.
- **Finalización:** el resumen muestra todos los datos correctamente agrupados; los enlaces «Editar» funcionan y gestionan el foco.

- [ ] **WF-10 — Implementar advertencia de volumen bajo y simulación de envío**

En `validation.js`:

**`simularEnvio()`:**

1. Ocultar formulario (wizard + indicador de progreso).
2. Mostrar mensaje de éxito exacto (SPEC RF-05): título «¡Gracias por tu interés en TrackFlow!», cuerpo con plazo 24-48 h, email `mailto:comercial@trackflow.com`, enlace de vuelta a `./index.html`.
3. Enfocar el mensaje de éxito.
4. Sin fetch, sin localStorage, sin red.

**`mostrarAdvertenciaVolumen()`:**

- Si `wizardState.data.f08 === "0-100"` antes de simular el envío, mostrar modal/superposición con el texto exacto de RF-04.
- Botón «Continuar» → ejecuta `simularEnvio()`.
- Botón «Cancelar» → cierra modal, vuelve al resumen.
- Escape en modal: cierra y vuelve al resumen.

**Integración en el botón «Enviar solicitud»:**

1. `validarTodo()` → si hay errores, no enviar.
2. Si todo válido y F-08 === «0-100» → `mostrarAdvertenciaVolumen()`.
3. Si todo válido y F-08 !== «0-100» → `simularEnvio()` directamente.

- **Archivos:** modificar `validation.js` y `application.html` (HTML del modal de advertencia y del mensaje de éxito, si se prefiere HTML estático en lugar de generarlo con JS).
- **Dependencias:** WF-09.
- **Finalización:** envío simulado sin efectos secundarios; advertencia de volumen funciona correctamente. DP-01 no afecta a esta tarea.

---

## Fase 6 — Verificación final (WF-11 a WF-12)

- [ ] **WF-11 — Recompilar Tailwind y verificar responsive y accesibilidad**

Ejecutar la compilación de Tailwind para incluir las nuevas clases del wizard en `tailwind.css`. Verificar que `application.html` carga el CSS sin errores 404.

A continuación, comprobar (manual, con herramientas del navegador):

- Navegación completa con teclado (Tab/Shift+Tab/Enter/Escape) por todas las etapas.
- Foco visible en todos los controles al navegar.
- Contraste de texto (≥ 4,5:1) y errores `#ba1a1a` (≥ 3:1).
- Etiquetas `<label>` y `aria-describedby` en campos con error.
- `<fieldset>`/`<legend>` en F-09 y F-10.
- Indicador de progreso con `aria-label` y `aria-current`.
- Breakpoints 320, 375, 768, 1024, 1440 px: sin scroll horizontal, una columna en todos.
- Sin carga de `navigation.js`; solo `validation.js`.

- **Archivos:** comando de compilación; solo verificación.
- **Dependencias:** WF-04, WF-06.
- **Finalización:** Tailwind compila sin errores; checklist de accesibilidad y responsive superado.

- [ ] **WF-12 — Verificar integridad y ausencia de regresiones**

Comprobar:

- `git diff --exit-code` sobre `index.html`, `navigation.js`, `tailwind.config.js`, `assets/images/*`, `assets/logos/*` — sin cambios.
- Los tres CTA de la landing siguen enlazando a `./application.html`.
- `application.html` no carga `navigation.js`.
- La landing sigue funcional en localhost:3000 (acceder a `/` y verificar secciones).
- Consola del navegador sin errores al cargar `application.html`.
- Ninguna llamada de red a backend al enviar el formulario (inspeccionar pestaña Red).
- DP-01 señalado con comentario `TODO` en el código de F-12.

- **Archivos:** sin cambios; solo verificación con `git diff` e inspección visual/navegador.
- **Dependencias:** WF-10, WF-11.
- **Finalización:** ningún archivo de la landing modificado; formulario autocontenido; sin regresiones. Hito listo para revisión y cierre.

---

## Resumen de fases y tareas

| Fase                                    | Descripción                                                                   | Tareas              |
| --------------------------------------- | ----------------------------------------------------------------------------- | ------------------- |
| **Fase 1 — Preparación**                | Verificar archivos destino, cobertura Tailwind y compilación inicial          | WF-01               |
| **Fase 2 — Estructura HTML y Tailwind** | Crear `application.html` con wizard completo (4 etapas + resumen) y estilos   | WF-02, WF-03, WF-04 |
| **Fase 3 — Navegación del wizard**      | Estado, navegación, indicador de progreso y gestión de foco                   | WF-05, WF-06        |
| **Fase 4 — Validaciones**               | 12 funciones V-01 a V-12, validación por etapa/global, contador de caracteres | WF-07, WF-08        |
| **Fase 5 — Resumen y envío**            | Resumen solo lectura, advertencia de volumen bajo, envío simulado             | WF-09, WF-10        |
| **Fase 6 — Verificación final**         | Recompilar Tailwind, accesibilidad, responsive y regresiones                  | WF-11, WF-12        |

**Total: 12 tareas (WF-01 a WF-12) en 6 fases.**

---

## Decisiones pendientes

| ID        | Asunto                        | Impacto en tareas                                                                                                                                                                                                                                                                                             | Estado                   |
| --------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **DP-01** | Política de privacidad (F-12) | El checkbox se implementa con texto plano (sin `<a>` funcional, sin `href`), más un comentario `TODO` en el código. **No bloquea ninguna tarea** — el checkbox es funcional y las validaciones operan sobre él; lo pendiente es exclusivamente el destino del enlace, que se resolverá en una fase posterior. | Pendiente, no bloqueante |

Las tareas están listas para comenzar la implementación. Se requiere autorización para avanzar a IMPLEMENT.
