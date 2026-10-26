/**
 * validation.js — Lógica del wizard multipaso de TrackFlow
 * =========================================================
 * Estado, navegación, indicador de progreso, gestión de foco.
 * Sin validaciones completas, sin modal, sin envío simulado.
 * Sin frameworks, sin fetch/axios, sin localStorage.
 *
 * Dependencias: cargado con defer desde application.html
 * Requiere: elementos HTML con ids específicos (ver SPEC §4.1)
 */

'use strict';

// ============================================================
// ESTADO GLOBAL DEL WIZARD
// ============================================================

/**
 * wizardState: objeto central que mantiene el estado en memoria.
 * @property {number} currentStep - Índice de la etapa activa (0-4).
 * @property {Object[]} steps - Metadatos de cada etapa.
 * @property {Object} data - Valores actuales de los campos { f01...f12 }.
 */
const wizardState = {
  currentStep: 0,
  steps: [
    { id: 'step-empresa',    titulo: 'Datos de la empresa',      campos: ['f01', 'f05'] },
    { id: 'step-contacto',   titulo: 'Información de contacto',  campos: ['f02', 'f03', 'f04'] },
    { id: 'step-operacion',  titulo: 'Datos de operación',       campos: ['f06', 'f07', 'f08', 'f09', 'f10'] },
    { id: 'step-comentarios',titulo: 'Comentarios y privacidad', campos: ['f11', 'f12'] },
    { id: 'step-resumen',    titulo: 'Revisa tu solicitud',      campos: [] }
  ],
  data: {
    f01: '', f02: '', f03: '', f04: '', f05: '',
    f06: '', f07: '', f08: '', f09: '', f10: '',
    f11: '', f12: ''
  }
};

// ============================================================
// REFERENCIAS DOM (se asignan en initWizard)
// ============================================================

let paneles = null;
let indicadorPasos = null;
let btnAnterior = null;
let btnSiguiente = null;
let form = null;

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

/**
 * Obtiene el valor actual de un campo desde el DOM.
 * Soporta input, select, textarea, checkboxes (array) y radios.
 * @param {string} id - Identificador del campo (ej. 'f01', 'f09').
 * @returns {string|string[]} Valor del campo.
 */
function obtenerValorCampo(id) {
  // Checkboxes múltiples (F-09): no hay elemento con id="f09",
  // se buscan por name. Debe ir ANTES del chequeo de existencia.
  if (id === 'f09') {
    const checkboxes = document.querySelectorAll('input[name="f09"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
  }

  // Radio buttons (F-10): no hay elemento con id="f10".
  if (id === 'f10') {
    const seleccionado = document.querySelector('input[name="f10"]:checked');
    return seleccionado ? seleccionado.value : '';
  }

  // Checkbox individual (F-12): el value del atributo no cambia con el estado;
  // se debe comprobar la propiedad checked.
  if (id === 'f12') {
    const chk = document.getElementById('f12');
    return chk && chk.checked ? chk.value : '';
  }

  // Input, select, textarea con id directo
  const elemento = document.getElementById(id);
  if (!elemento) return '';
  return elemento.value;
}

/**
 * Establece el valor de un campo en el DOM.
 * @param {string} id - Identificador del campo.
 * @param {string|string[]} valor - Valor a asignar.
 */
function establecerValorCampo(id, valor) {
  // Checkboxes múltiples (F-09): no hay elemento con id="f09",
  // se buscan por name. Debe ir ANTES del chequeo de existencia.
  if (id === 'f09') {
    const valores = Array.isArray(valor) ? valor : [];
    document.querySelectorAll('input[name="f09"]').forEach(cb => {
      cb.checked = valores.includes(cb.value);
    });
    return;
  }

  // Radio buttons (F-10): no hay elemento con id="f10".
  if (id === 'f10') {
    const radio = document.querySelector('input[name="f10"][value="' + valor + '"]');
    if (radio) radio.checked = true;
    return;
  }

  // Checkbox individual (F-12): restaurar propiedad checked, no value.
  if (id === 'f12') {
    const chk = document.getElementById('f12');
    if (chk) chk.checked = (valor === 'aceptada');
    return;
  }

  // Campos normales con id directo
  const elemento = document.getElementById(id);
  if (!elemento) return;
  elemento.value = valor;
}

/**
 * Guarda los valores actuales del DOM en wizardState.data
 * para la etapa indicada (o la etapa actual por defecto).
 * @param {number} [indice] - Índice de la etapa (0-4).
 */
function guardarDatosEtapa(indice) {
  const idx = indice !== undefined ? indice : wizardState.currentStep;
  const etapa = wizardState.steps[idx];
  if (!etapa) return;

  etapa.campos.forEach(id => {
    wizardState.data[id] = obtenerValorCampo(id);
  });
}

/**
 * Restaura los valores de wizardState.data en el DOM
 * para la etapa indicada.
 * @param {number} indice - Índice de la etapa (0-4).
 */
function restaurarDatosEtapa(indice) {
  const etapa = wizardState.steps[indice];
  if (!etapa) return;

  etapa.campos.forEach(id => {
    if (wizardState.data[id] !== undefined) {
      establecerValorCampo(id, wizardState.data[id]);
    }
  });
}

// ============================================================
// FUNCIONES DE NAVEGACIÓN
// ============================================================

// ============================================================
// FUNCIONES DE VALIDACIÓN INDIVIDUAL (V-01 a V-12)
// Cada función recibe el valor del campo y devuelve
// { isValid: boolean, message: string }
// ============================================================

/**
 * V-01: Nombre de la empresa — mínimo 2 caracteres.
 */
function validarEmpresa(valor) {
  const texto = (typeof valor === 'string' ? valor : '').trim();
  if (texto.length < 2) {
    return { isValid: false, message: 'El nombre de la empresa debe tener al menos 2 caracteres' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-02: Persona de contacto — mínimo 2 palabras,
 * cada una de al menos 2 caracteres.
 */
function validarContacto(valor) {
  const texto = (typeof valor === 'string' ? valor : '').trim();
  const palabras = texto.split(/\s+/).filter(p => p.length > 0);
  if (palabras.length < 2 || palabras.some(p => p.length < 2)) {
    return { isValid: false, message: 'Ingresa nombre y apellido del contacto' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-03: Email corporativo — debe contener @ y dominio con punto.
 */
function validarEmail(valor) {
  const texto = (typeof valor === 'string' ? valor : '').trim();
  // Regex básico: algo@algo.algo
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(texto)) {
    return { isValid: false, message: 'Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-04: Teléfono — debe comenzar con + seguido de código de país.
 */
function validarTelefono(valor) {
  const texto = (typeof valor === 'string' ? valor : '').trim();
  // Debe empezar con +, luego al menos 2 dígitos (código país + número)
  const regexTel = /^\+\d{2,}$/;
  if (!regexTel.test(texto.replace(/[\s\-()]/g, ''))) {
    return { isValid: false, message: 'El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-05: Sitio web — si se proporciona, debe empezar con http:// o https://.
 */
function validarWeb(valor) {
  const texto = (typeof valor === 'string' ? valor : '').trim();
  if (texto.length === 0) {
    // Campo opcional: vacío es válido
    return { isValid: true, message: '' };
  }
  if (!/^https?:\/\//.test(texto)) {
    return { isValid: false, message: 'Si incluyes sitio web, debe ser una URL válida' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-06: País de operación — debe seleccionar una opción distinta de vacío.
 */
function validarPais(valor) {
  if (!valor || valor === '') {
    return { isValid: false, message: 'Selecciona el país de operación principal' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-07: Tipo de producto — debe seleccionar una opción distinta de vacío.
 */
function validarProducto(valor) {
  if (!valor || valor === '') {
    return { isValid: false, message: 'Selecciona el tipo de producto que manejas' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-08: Volumen mensual — debe seleccionar una opción distinta de vacío.
 */
function validarVolumen(valor) {
  if (!valor || valor === '') {
    return { isValid: false, message: 'Selecciona el volumen mensual estimado' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-09: Servicios de interés — al menos un checkbox marcado.
 * @param {string|string[]} valor - Array con los valores seleccionados.
 */
function validarServicios(valor) {
  const seleccionados = Array.isArray(valor) ? valor : [];
  if (seleccionados.length === 0) {
    return { isValid: false, message: 'Selecciona al menos un servicio de interés' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-10: 3PL actual — debe seleccionar una opción radio.
 */
function validarTPL(valor) {
  if (!valor || valor === '') {
    return { isValid: false, message: 'Indica si actualmente trabajas con otro proveedor logístico' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-11: Comentarios — máximo 500 caracteres.
 */
function validarComentarios(valor) {
  const texto = typeof valor === 'string' ? valor : '';
  if (texto.length > 500) {
    const restantes = 500 - texto.length;
    return { isValid: false, message: 'Los comentarios no pueden exceder 500 caracteres (quedan ' + restantes + ')' };
  }
  return { isValid: true, message: '' };
}

/**
 * V-12: Política de privacidad — checkbox debe estar marcado.
 * @param {boolean|string} valor - true o 'aceptada' si está marcado.
 */
function validarPrivacidad(valor) {
  const marcado = valor === true || valor === 'aceptada';
  if (!marcado) {
    return { isValid: false, message: 'Debes aceptar la política de privacidad para continuar' };
  }
  return { isValid: true, message: '' };
}

// ============================================================
// ARREGLO DE ASOCIACIÓN: campo → validación
// Cada entrada asocia un campo con su función de validación,
// la etapa a la que pertenece y el span de error correspondiente.
// ============================================================

const VALIDATIONS = [
  { campo: 'f01', etapa: 0, fn: validarEmpresa },
  { campo: 'f05', etapa: 0, fn: validarWeb },
  { campo: 'f02', etapa: 1, fn: validarContacto },
  { campo: 'f03', etapa: 1, fn: validarEmail },
  { campo: 'f04', etapa: 1, fn: validarTelefono },
  { campo: 'f06', etapa: 2, fn: validarPais },
  { campo: 'f07', etapa: 2, fn: validarProducto },
  { campo: 'f08', etapa: 2, fn: validarVolumen },
  { campo: 'f09', etapa: 2, fn: validarServicios },
  { campo: 'f10', etapa: 2, fn: validarTPL },
  { campo: 'f11', etapa: 3, fn: validarComentarios },
  { campo: 'f12', etapa: 3, fn: validarPrivacidad }
];

// ============================================================
// GESTIÓN DE ERRORES EN EL DOM
// ============================================================

/**
 * Muestra un mensaje de error debajo de un campo.
 * - Escribe el mensaje en el <span id="fXX-error"> correspondiente.
 * - Añade borde rojo al campo (clase border-[#ba1a1a]).
 * - Vincula el error con aria-describedby para accesibilidad.
 * Nota: F-09 y F-10 no tienen un elemento con id directo,
 *       solo se actualiza el span de error.
 * @param {string} campoId - Identificador del campo (ej. 'f01').
 * @param {string} mensaje - Texto del error a mostrar.
 */
function mostrarError(campoId, mensaje) {
  const spanError = document.getElementById(campoId + '-error');
  if (spanError) {
    spanError.textContent = mensaje;
  }

  // F-09 y F-10 son grupos (fieldset) sin id directo, no hay borde que añadir
  if (campoId === 'f09' || campoId === 'f10') return;

  const campo = document.getElementById(campoId);
  if (campo) {
    campo.classList.add('border-[#ba1a1a]');
    campo.setAttribute('aria-describedby', campoId + '-error');
    campo.setAttribute('aria-invalid', 'true');
  }
}

/**
 * Limpia el error de un campo (inverso de mostrarError).
 * @param {string} campoId - Identificador del campo.
 */
function limpiarError(campoId) {
  const spanError = document.getElementById(campoId + '-error');
  if (spanError) {
    spanError.textContent = '';
  }

  // F-09 y F-10 son grupos sin id directo
  if (campoId === 'f09' || campoId === 'f10') return;

  const campo = document.getElementById(campoId);
  if (campo) {
    campo.classList.remove('border-[#ba1a1a]');
    campo.removeAttribute('aria-describedby');
    campo.removeAttribute('aria-invalid');
  }
}

/**
 * Limpia todos los errores de una etapa específica.
 * @param {number} numEtapa - Índice de la etapa (0-3).
 */
function limpiarErroresEtapa(numEtapa) {
  VALIDATIONS.forEach(function (regla) {
    if (regla.etapa === numEtapa) {
      limpiarError(regla.campo);
    }
  });
}

/**
 * Enfoca el primer campo con error dentro de un conjunto de reglas.
 * Para F-09 y F-10 (fieldset sin id directo), busca el primer input
 * del grupo. Para el resto, busca por id.
 * @param {Array} reglasFallidas - Array de objetos { campo } con errores.
 */
function enfocarPrimerError(reglasFallidas) {
  if (reglasFallidas.length === 0) return;
  const campoId = reglasFallidas[0].campo;

  // F-09 y F-10: enfocar el primer input del fieldset
  if (campoId === 'f09') {
    const primerCheckbox = document.querySelector('input[name="f09"]');
    if (primerCheckbox) primerCheckbox.focus({ preventScroll: false });
    return;
  }
  if (campoId === 'f10') {
    const primerRadio = document.querySelector('input[name="f10"]');
    if (primerRadio) primerRadio.focus({ preventScroll: false });
    return;
  }

  const primerCampoError = document.getElementById(campoId);
  if (primerCampoError) {
    primerCampoError.focus({ preventScroll: false });
  }
}

// ============================================================
// VALIDACIÓN POR ETAPA Y GLOBAL
// ============================================================

/**
 * Valida todos los campos de una etapa específica.
 * Recoge los valores del DOM, ejecuta las funciones de validación,
 * muestra o limpia errores según corresponda.
 * @param {number} numEtapa - Índice de la etapa a validar (0-3).
 * @returns {boolean} true si todos los campos de la etapa son válidos.
 */
function validarEtapa(numEtapa) {
  // Primero limpiar errores previos de esta etapa
  limpiarErroresEtapa(numEtapa);

  const reglasFallidas = [];
  const reglasEtapa = VALIDATIONS.filter(function (r) { return r.etapa === numEtapa; });

  reglasEtapa.forEach(function (regla) {
    const valor = obtenerValorCampo(regla.campo);
    const resultado = regla.fn(valor);

    if (!resultado.isValid) {
      mostrarError(regla.campo, resultado.message);
      reglasFallidas.push(regla);
    }
  });

  // Si hay errores, enfocar el primer campo con error
  if (reglasFallidas.length > 0) {
    enfocarPrimerError(reglasFallidas);
    return false;
  }

  return true;
}

/**
 * Valida todos los campos del formulario (todas las etapas).
 * Se usa al pulsar "Enviar solicitud" desde el resumen.
 * @returns {boolean} true si todos los campos son válidos.
 */
function validarTodo() {
  let todoValido = true;

  // Limpiar errores de todas las etapas
  for (var i = 0; i <= 3; i++) {
    limpiarErroresEtapa(i);
  }

  const reglasFallidas = [];

  VALIDATIONS.forEach(function (regla) {
    const valor = obtenerValorCampo(regla.campo);
    const resultado = regla.fn(valor);

    if (!resultado.isValid) {
      mostrarError(regla.campo, resultado.message);
      reglasFallidas.push(regla);
      todoValido = false;
    }
  });

  // Si hay errores, enfocar el primer campo con error
  if (reglasFallidas.length > 0) {
    enfocarPrimerError(reglasFallidas);
  }

  return todoValido;
}

// ============================================================
// CONTADOR DE CARACTERES (F-11)
// ============================================================

/**
 * Actualiza el contador de caracteres de F-11 en tiempo real.
 * Muestra "Quedan X caracteres" y valida el límite de 500.
 */
function inicializarContador() {
  const textarea = document.getElementById('f11');
  const contador = document.getElementById('contador-f11');
  if (!textarea || !contador) return;

  textarea.addEventListener('input', function () {
    const longitud = this.value.length;
    const restantes = 500 - longitud;

    // Actualizar texto del contador
    if (restantes < 0) {
      contador.textContent = 'Has superado el límite en ' + Math.abs(restantes) + ' caracteres';
    } else {
      contador.textContent = 'Quedan ' + restantes + ' caracteres';
    }

    // Validar en tiempo real
    if (longitud > 500) {
      mostrarError('f11', 'Los comentarios no pueden exceder 500 caracteres (quedan ' + restantes + ')');
    } else {
      limpiarError('f11');
    }
  });
}

// ============================================================
// FUNCIONES DE NAVEGACIÓN
// ============================================================

/**
 * Cambia a la etapa indicada por el índice.
 * @param {number} nuevoIndice - Índice de destino (0-4).
 */
function irAEtapa(nuevoIndice) {
  if (nuevoIndice < 0 || nuevoIndice >= wizardState.steps.length) return;

  // Guardar el índice anterior ANTES de actualizar currentStep
  const indiceAnterior = wizardState.currentStep;

  // Ocultar etapa actual
  const etapaActual = paneles[indiceAnterior];
  if (etapaActual) {
    guardarDatosEtapa(indiceAnterior);
    etapaActual.classList.add('hidden');
  }

  // Mostrar nueva etapa
  const nuevaEtapa = paneles[nuevoIndice];
  if (nuevaEtapa) {
    restaurarDatosEtapa(nuevoIndice);
    nuevaEtapa.classList.remove('hidden');
  }

  // Actualizar estado
  wizardState.currentStep = nuevoIndice;

  // Si llegamos al resumen (paso 4), actualizar la vista previa
  if (nuevoIndice === 4) {
    actualizarResumen();
  }

  // Actualizar botones de navegación
  actualizarBotones();

  // Actualizar indicador de progreso
  actualizarProgreso();

  // Gestionar el foco según la dirección
  gestionarFocoNavegacion(nuevoIndice, indiceAnterior);
}

/**
 * Maneja el clic en "Siguiente" o "Revisar solicitud".
 * Valida la etapa actual antes de avanzar. Si hay errores, no avanza.
 */
function avanzarEtapa() {
  const pasoActual = wizardState.currentStep;

  // Validar etapa actual (solo etapas 0-3, no resumen)
  if (pasoActual >= 0 && pasoActual <= 3) {
    guardarDatosEtapa(pasoActual);
    if (!validarEtapa(pasoActual)) {
      // Si hay errores, no avanzar
      return;
    }
  }

  const siguiente = pasoActual + 1;
  if (siguiente < wizardState.steps.length) {
    irAEtapa(siguiente);
  }
}

/**
 * Maneja el clic en "Anterior".
 * Retrocede a la etapa anterior. Sin validación al retroceder.
 */
function retrocederEtapa() {
  const anterior = wizardState.currentStep - 1;
  if (anterior >= 0) {
    guardarDatosEtapa(wizardState.currentStep);
    irAEtapa(anterior);
  }
}

// ============================================================
// ACTUALIZACIÓN DEL RESUMEN (WF-09)
// ============================================================

/**
 * Actualiza los valores del panel de resumen con los datos
 * actuales de wizardState.data.
 * Se llama cada vez que se navega al resumen (paso 4).
 */
function actualizarResumen() {
  // Datos de la empresa (E-1)
  document.getElementById('resumen-f01').textContent = wizardState.data.f01 || '—';
  document.getElementById('resumen-f05').textContent = wizardState.data.f05 || '—';

  // Información de contacto (E-2)
  document.getElementById('resumen-f02').textContent = wizardState.data.f02 || '—';
  document.getElementById('resumen-f03').textContent = wizardState.data.f03 || '—';
  document.getElementById('resumen-f04').textContent = wizardState.data.f04 || '—';

  // Datos de operación (E-3)
  document.getElementById('resumen-f06').textContent = wizardState.data.f06 || '—';
  document.getElementById('resumen-f07').textContent = wizardState.data.f07 || '—';
  document.getElementById('resumen-f08').textContent = wizardState.data.f08 || '—';

  // Servicios de interés: mostrar lista separada por comas
  const servicios = Array.isArray(wizardState.data.f09) ? wizardState.data.f09 : [];
  document.getElementById('resumen-f09').textContent = servicios.length > 0 ? servicios.join(', ') : '—';

  // 3PL
  document.getElementById('resumen-f10').textContent = wizardState.data.f10 || '—';

  // Comentarios y privacidad (E-4)
  document.getElementById('resumen-f11').textContent = wizardState.data.f11 || '—';
  document.getElementById('resumen-f12').textContent = (wizardState.data.f12 === 'aceptada') ? 'Aceptada' : '—';
}

// ============================================================
// ENVÍO SIMULADO Y ADVERTENCIA DE VOLUMEN (WF-09 / WF-10)
// ============================================================

/**
 * Ejecuta el envío simulado:
 * - Oculta el formulario (wizard + indicador de progreso).
 * - Muestra un aviso visible de que es una demo.
 * - Muestra el mensaje de éxito con el texto exacto de RF-05.
 * - Enfoca el mensaje de éxito.
 * - No envía datos, no almacena nada, no hace fetch.
 */
function simularEnvio() {
  const formulario = document.getElementById('form-solicitud');
  const progreso = document.querySelector('nav[aria-label="Progreso del formulario"]');
  const mensajeExito = document.getElementById('mensaje-exito');

  // Ocultar formulario e indicador de progreso
  if (formulario) formulario.classList.add('hidden');
  if (progreso) progreso.classList.add('hidden');

  // Mostrar mensaje de éxito
  if (mensajeExito) {
    mensajeExito.classList.remove('hidden');
    mensajeExito.setAttribute('tabindex', '-1');
    mensajeExito.focus({ preventScroll: false });
  }
}

/**
 * Inserta un aviso visible de demo justo encima del formulario.
 * Se muestra durante toda la navegación y persiste al enviar.
 */
function mostrarAvisoDemo() {
  // Evitar duplicados
  if (document.getElementById('aviso-demo')) return;

  const aviso = document.createElement('div');
  aviso.id = 'aviso-demo';
  aviso.className = 'mx-auto mb-6 max-w-2xl rounded-lg border border-amber-400/40 bg-amber-50 p-4 text-sm text-amber-800';
  aviso.setAttribute('role', 'alert');
  aviso.textContent = '🧪 Esta es una demostración interactiva. No se ha enviado ninguna solicitud real.';

  const formulario = document.getElementById('form-solicitud');
  if (formulario && formulario.parentNode) {
    formulario.parentNode.insertBefore(aviso, formulario);
  }
}

/**
 * Referencias al modal de advertencia (se asignan en initWizard).
 */
let modalVolumen = null;
let btnModalContinuar = null;
let btnModalCancelar = null;

/**
 * Muestra el modal de advertencia de volumen bajo (RF-04).
 */
function mostrarAdvertenciaVolumen() {
  if (!modalVolumen) return;
  modalVolumen.classList.remove('hidden');
  modalVolumen.classList.add('flex');
  if (btnModalCancelar) {
    btnModalCancelar.focus({ preventScroll: false });
  }
}

/**
 * Cierra el modal de advertencia de volumen y vuelve al resumen.
 */
function cerrarAdvertenciaVolumen() {
  if (!modalVolumen) return;
  modalVolumen.classList.add('hidden');
  modalVolumen.classList.remove('flex');
  if (btnSiguiente) {
    btnSiguiente.focus({ preventScroll: false });
  }
}

/**
 * Maneja la pulsación de Escape en el modal de advertencia.
 * @param {KeyboardEvent} e
 */
function manejarEscapeModal(e) {
  if (e.key === 'Escape') {
    cerrarAdvertenciaVolumen();
  }
}

/**
 * Procesa el clic en "Enviar solicitud" desde el resumen.
 * 1. Guarda datos de la última etapa.
 * 2. Ejecuta validación global.
 * 3. Si hay errores, navega a la primera etapa con error.
 * 4. Si todo válido y volumen = '0-100', muestra advertencia.
 * 5. Si todo válido y volumen ≠ '0-100', envía directamente.
 */
function procesarEnvio() {
  // Guardar datos de la etapa de comentarios (E-4)
  guardarDatosEtapa(3);

  // Validar todos los campos (ya muestra errores y enfoca primero)
  if (!validarTodo()) {
    // Navegar a la primera etapa que tenga errores visibles
    for (var i = 0; i <= 3; i++) {
      var tieneError = VALIDATIONS.some(function (r) {
        if (r.etapa !== i) return false;
        var span = document.getElementById(r.campo + '-error');
        return span && span.textContent.length > 0;
      });
      if (tieneError) {
        irAEtapa(i);
        return;
      }
    }
    return;
  }

  // Todo válido: comprobar advertencia de volumen
  if (wizardState.data.f08 === '0-100') {
    mostrarAdvertenciaVolumen();
  } else {
    simularEnvio();
  }
}

// ============================================================
// ACTUALIZACIÓN DE BOTONES
// ============================================================

/**
 * Actualiza la visibilidad y el texto de los botones
 * según la etapa actual.
 */
function actualizarBotones() {
  const paso = wizardState.currentStep;

  // Botón Anterior: oculto en E-1 (paso 0), visible desde E-2
  if (paso === 0) {
    btnAnterior.classList.add('hidden');
  } else {
    btnAnterior.classList.remove('hidden');
  }

  // Botón Siguiente: cambia de texto según la etapa
  if (paso < 3) {
    // E-1, E-2, E-3 → "Siguiente"
    btnSiguiente.textContent = 'Siguiente';
  } else if (paso === 3) {
    // E-4 → "Revisar solicitud"
    btnSiguiente.textContent = 'Revisar solicitud';
  } else {
    // Resumen (paso 4) → "Enviar solicitud"
    btnSiguiente.textContent = 'Enviar solicitud';
  }
}

// ============================================================
// INDICADOR DE PROGRESO
// ============================================================

/**
 * Actualiza las clases CSS y atributos ARIA del indicador
 * de progreso según la etapa actual.
 *
 * Convención de clases:
 * - 'active'   → etapa actual
 * - 'completed' → etapas ya superadas
 * - 'pending'   → etapas siguientes (sin clase específica)
 */
function actualizarProgreso() {
  const pasos = indicadorPasos.querySelectorAll('li');
  const pasoActual = wizardState.currentStep;

  pasos.forEach((paso, index) => {
    const circulo = paso.querySelector('span');
    const texto = paso.querySelector('span:not(.flex)'); // la etiqueta textual
    const svg = paso.querySelector('svg');

    // Resetear clases y ARIA
    if (circulo) {
      circulo.classList.remove('bg-[#0758BD]', 'bg-[#00DCCF]', 'bg-[#526578]');
    }
    if (svg) {
      svg.classList.remove('text-[#0758BD]', 'text-[#00DCCF]', 'text-[#526578]');
    }

    // Eliminar aria-current de todos
    paso.removeAttribute('aria-current');
    if (circulo) circulo.removeAttribute('aria-current');

    if (index < pasoActual) {
      // Etapa completada: círculo turquesa, texto normal
      if (circulo) {
        circulo.classList.add('bg-[#00DCCF]');
        circulo.textContent = '✓';
      }
      if (svg) svg.classList.add('text-[#00DCCF]');
      if (texto) texto.style.color = '';
      // El texto de las etiquetas sm:inline se deja con color por defecto
    } else if (index === pasoActual) {
      // Etapa activa: círculo azul, aria-current
      if (circulo) {
        circulo.classList.add('bg-[#0758BD]');
        circulo.textContent = String(index + 1);
      }
      paso.setAttribute('aria-current', 'step');
      if (circulo) circulo.setAttribute('aria-current', 'step');
      if (svg) svg.classList.add('text-[#0758BD]');
    } else {
      // Etapa pendiente: círculo slate, sin aria-current
      if (circulo) {
        circulo.classList.add('bg-[#526578]');
        circulo.textContent = String(index + 1);
      }
      if (svg) svg.classList.add('text-[#526578]');
    }
  });
}

// ============================================================
// GESTIÓN DEL FOCO (WF-06)
// ============================================================

/**
 * Gestiona el foco al navegar entre etapas.
 *
 * Reglas (PF-04, PLAN §4.4):
 * - Al avanzar: foco en el título h2 de la nueva etapa.
 * - Al retroceder: foco en el botón "Siguiente" de la etapa anterior.
 * - Al mostrar error: foco en el primer campo con error (pendiente WF-08).
 * - Modal advertencia: foco en "Cancelar" al abrir (WF-09).
 * - Éxito: foco en mensaje de éxito al simular envío (WF-10).
 *
 * @param {number} nuevoIndice - Índice de la etapa de destino.
 * @param {number} indiceAnterior - Índice de la etapa previa.
 */
function gestionarFocoNavegacion(nuevoIndice, indiceAnterior) {
  // Determinar si se avanzó o retrocedió
  if (nuevoIndice > indiceAnterior) {
    // Avanzar: foco en el título h2 de la nueva etapa
    const panel = paneles[nuevoIndice];
    if (panel) {
      const h2 = panel.querySelector('h2');
      if (h2) {
        h2.setAttribute('tabindex', '-1');
        h2.focus({ preventScroll: false });
      }
    }
  } else if (nuevoIndice < indiceAnterior) {
    // Retroceder: foco en el botón "Siguiente" de la etapa actual
    if (btnSiguiente) {
      btnSiguiente.focus({ preventScroll: false });
    }
  }
  // Nota: al llegar desde error o desde editar en resumen,
  // se manejará con funciones específicas en futuras fases.
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

/**
 * Navega a la etapa correspondiente desde un enlace "Editar"
 * del resumen. Guarda el estado actual y lleva al usuario
 * a la etapa solicitada.
 * @param {number} indice - Índice de la etapa destino (0-3).
 */
function irAEtapaEditar(indice) {
  if (indice < 0 || indice > 3) return;
  guardarDatosEtapa(wizardState.currentStep);
  irAEtapa(indice);
}

/**
 * Inicializa el wizard: oculta etapas, muestra la primera,
 * asigna eventos a los botones, renderiza el progreso.
 */
function initWizard() {
  // Obtener referencias DOM
  paneles = document.querySelectorAll('.step-panel');
  indicadorPasos = document.querySelector('nav[aria-label="Progreso del formulario"] ol');
  btnAnterior = document.getElementById('btn-anterior');
  btnSiguiente = document.getElementById('btn-siguiente');
  form = document.getElementById('form-solicitud');

  if (!paneles.length || !indicadorPasos || !btnAnterior || !btnSiguiente) {
    console.error('Error: faltan elementos requeridos del wizard.');
    return;
  }

  // Ocultar todas las etapas menos la primera
  paneles.forEach((panel, index) => {
    if (index === 0) {
      panel.classList.remove('hidden');
    } else {
      panel.classList.add('hidden');
    }
  });

  // Estado inicial: paso 0, progreso, botones
  wizardState.currentStep = 0;
  actualizarProgreso();
  actualizarBotones();

  // Asignar eventos a botones de navegación
  btnSiguiente.addEventListener('click', function () {
    // Si estamos en el resumen (paso 4), ejecutar envío
    if (wizardState.currentStep === 4) {
      procesarEnvio();
    } else {
      avanzarEtapa();
    }
  });
  btnAnterior.addEventListener('click', retrocederEtapa);

  // Asignar eventos a los enlaces "Editar" del resumen
  document.querySelectorAll('.editar-etapa').forEach(function (enlace) {
    enlace.addEventListener('click', function (e) {
      e.preventDefault();
      const etapa = parseInt(this.getAttribute('data-etapa'), 10);
      if (!isNaN(etapa)) {
        irAEtapaEditar(etapa);
      }
    });
  });

  // Referencias al modal de advertencia de volumen
  modalVolumen = document.getElementById('modal-volumen');
  btnModalContinuar = document.getElementById('modal-volumen-continuar');
  btnModalCancelar = document.getElementById('modal-volumen-cancelar');

  // Asignar eventos a los botones del modal
  if (btnModalContinuar) {
    btnModalContinuar.addEventListener('click', function () {
      cerrarAdvertenciaVolumen();
      simularEnvio();
    });
  }
  if (btnModalCancelar) {
    btnModalCancelar.addEventListener('click', cerrarAdvertenciaVolumen);
  }

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', manejarEscapeModal);

  // Mostrar aviso visible de demo
  mostrarAvisoDemo();

  // Inicializar contador de caracteres de F-11
  inicializarContador();

  // Prevenir envío del formulario (sin action/method por PF-07)
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // El envío se maneja desde el botón en el resumen
      if (wizardState.currentStep === 4) {
        procesarEnvio();
      }
    });
  }

  // Establecer foco inicial en el primer campo de la primera etapa
  const primerCampo = document.getElementById('f01');
  if (primerCampo) {
    primerCampo.focus();
  }

  console.log('Wizard iniciado correctamente.');
}

// ============================================================
// ARRANQUE
// ============================================================

document.addEventListener('DOMContentLoaded', initWizard);
