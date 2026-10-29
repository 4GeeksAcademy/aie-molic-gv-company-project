// La navegación mejora el HTML existente; no interviene en el formulario.
function iniciarNavegacion() {
	const boton = document.getElementById('menu-toggle');
	const panel = document.getElementById('menu-panel');
	const navegacion = boton?.closest('nav');

	if (!boton || !panel || !navegacion) return;

	const escritorio = window.matchMedia('(min-width: 1024px)');
	const enlaces = panel.querySelectorAll('a[href^="#"]');

	function cambiarEstado(abierto) {
		panel.classList.toggle('hidden', !abierto);
		boton.setAttribute('aria-expanded', String(abierto));
	}

	function sincronizarPantalla() {
		const focoActual = document.activeElement;

		if (escritorio.matches) {
			cambiarEstado(true);
			// Antes de ocultar el botón, rescatar únicamente el foco que está en él.
			if (focoActual === boton) enlaces[0]?.focus();
			boton.hidden = true;
		} else {
			boton.hidden = false;
			if (panel.contains(focoActual)) boton.focus();
			cambiarEstado(false);
		}
	}

	boton.addEventListener('click', function () {
		cambiarEstado(boton.getAttribute('aria-expanded') !== 'true');
	});

	// El botón nativo ya convierte Enter/Espacio en click.
	navegacion.addEventListener('keydown', function (evento) {
		if (evento.key === 'Escape' && !escritorio.matches &&
			boton.getAttribute('aria-expanded') === 'true') {
			evento.preventDefault();
			boton.focus();
			cambiarEstado(false);
		}
	});

	enlaces.forEach(function (enlace) {
		enlace.addEventListener('click', function (evento) {
			// Conservar también los gestos nativos para abrir otra pestaña.
			if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;

			const destino = document.getElementById(enlace.hash.slice(1));
			if (!destino) return;

			// Mover el foco antes de ocultar el enlace. La acción nativa mantiene
			// el fragmento y el desplazamiento, sin animaciones ni scroll forzado.
			destino.focus({ preventScroll: true });
			if (!escritorio.matches) cambiarEstado(false);
		});
	});

	escritorio.addEventListener('change', sincronizarPantalla);
	sincronizarPantalla();
}

iniciarNavegacion();
