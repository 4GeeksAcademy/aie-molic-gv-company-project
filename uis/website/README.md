# TrackFlow — Landing Page

Landing corporativa de TrackFlow, operador logístico especializado en e-commerce con infraestructura en Estados Unidos y España.

## Objetivo y límites

- **Especificación:** [SPEC 001](../../specs/001-website/spec.md) — Landing page informativa
- **Alcance:** Presentación de servicios, cobertura binacional, beneficios y contacto. Sin formulario funcional, backoffice, login ni selector de idioma.
- **SPEC 002:** El archivo `application.html` y `validation.js` pertenecen a una especificación posterior (formulario de solicitud) y están vacíos intencionadamente. No forman parte de esta entrega.

## Versiones

| Herramienta | Versión |
|-------------|---------|
| Tailwind CSS | 3.4.17 |
| http-server | 14.1.1 |
| Node.js | 24.21.0 |
| Navegador objetivo | Chrome 130+ / Firefox 130+ / Edge 130+ |

## Prerrequisitos

- Node.js ≥ 18 (para Tailwind CLI y http-server)
- npm (incluido con Node.js)

## Comandos desde la raíz del monorepo

### 1. Compilar Tailwind (generar CSS)

```bash
npx tailwindcss@3.4.17 -i ./uis/website/assets/css/tailwind.input.css -o ./uis/website/assets/css/tailwind.css --minify -c ./uis/website/tailwind.config.js
```

> **Nota:** Recompilar después de cualquier cambio de clases en HTML o JS. La configuración de Tailwind escanea `./uis/website/**/*.{html,js}`.

### 2. Servir la landing localmente

```bash
npx http-server@14.1.1 ./uis/website -a 0.0.0.0 -p 3000 -c-1
```

- **Puerto predeterminado:** 3000
- **Puerto alternativo:** Si el 3000 está ocupado, usar otro (ej. `-p 3001`).
- **Caché:** Desactivada con `-c-1` para desarrollo.

### 3. Acceder

Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

### 4. Codespaces (despliegue para revisión)

1. Seguir los pasos 1 y 2 dentro del Codespaces.
2. Una vez sirviendo, reenviar el puerto 3000 a público.
3. Compartir la URL HTTPS generada (ej. `https://<hash>-3000.app.github.dev`).

## Rutas servidas

| Ruta | Recurso | Estado |
|------|---------|--------|
| `/` | Landing page (`index.html`) | Implementado |
| `/assets/css/tailwind.css` | CSS compilado por Tailwind | Implementado |
| `/assets/js/navigation.js` | Menú móvil (JavaScript vanilla) | Implementado |
| `/assets/images/*.webp` | Cuatro fotografías (hero, warehouse, last-mile, reverse-logistics) | Implementado |
| `/assets/logos/*.svg` | Seis variantes de logotipo TrackFlow | Implementado |
| `/application.html` | Destino del formulario (vacío, SPEC 002) | No implementado |
| `/validation.js` | Validación del formulario (vacío, SPEC 002) | No implementado |

## Evaluación

*Resultados de verificación pendientes — completar durante la fase de auditoría.*

| Criterio | Estado | Evidencia |
|----------|--------|-----------|
| CA-01 | ⬜ | — |
| CA-02 | ⬜ | — |
| CA-03 | ⬜ | — |
| CA-04 | ⬜ | — |
| CA-05 | ⬜ | — |
| CA-06 | ⬜ | — |
| CA-07 | ⬜ | — |
| CA-08 | ⬜ | — |
| CA-09 | ⬜ | — |
| CA-10 | ⬜ | — |
| CA-11 | ⬜ | — |
| CA-12 | ⬜ | — |
| CA-13 | ⬜ | — |
| CA-14 | ⬜ | — |
| CA-15 | ⬜ | — |

*Leyenda: ✅ Superado / ⚠️ Parcial / ❌ Pendiente / 🚫 Bloqueado*
