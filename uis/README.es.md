# Carpeta `uis`

Esta carpeta contiene **todos los proyectos con interfaz de usuario** para el proyecto transversal de AI Engineering de la compañía — por ejemplo: un sitio web público, un frontend de panel de administración, una interfaz de ecommerce, portales para clientes, aplicaciones Streamlit/Gradio u otras herramientas sólo-frontend.

Los dos proyectos principales que se almacenan aquí son:

- **`website`** — la presencia web pública de la compañía.
- **`backoffice`** — la aplicación interna de administración. Es el lugar ideal para desarrollar múltiples soluciones dentro de un mismo proyecto: autenticación, gestión de personas, gestión de operaciones, comunicación interna y otras capacidades de back-office.

Organiza `uis/` por **distintas áreas de la compañía** — cada subcarpeta agrupa un ámbito diferente (por ejemplo, web pública frente a operaciones internas) e incluye su propia documentación técnica y funcional.

- **Propósito principal**: centralizar en un único lugar todas las aplicaciones frontend que dan soporte a los casos de uso de la compañía.
- **Recomendación**: documenta en este archivo (o en sub-READMEs) las aplicaciones que vayas añadiendo, su objetivo, tecnología usada y cómo ejecutarlas.

> _These instructions are also available in [English](./README.md)._


## Landing de TrackFlow — `uis/website/`

La landing es una web estática con HTML5, una entrada de Tailwind CSS y un archivo JavaScript reservado para la navegación. Los recursos están en `website/assets/`. No necesita un backend para visualizar sus archivos. El flujo SDD está en [SPEC](../specs/001-website/spec.md), [PLAN](../specs/001-website/plan.md) y [TASKS](../specs/001-website/tasks.md).

### Estado comprobado y límites (24 de octubre de 2026)

- `index.html` contiene la estructura y los textos, pero aún no tiene clases Tailwind. El diseño y el comportamiento del menú están pendientes; compilar no implementará esas tareas.
- Existe `assets/css/tailwind.input.css` con las tres directivas de Tailwind. **No existe `assets/css/tailwind.css`**, aunque el HTML lo enlaza: hasta generarlo, esa petición dará un recurso ausente.
- Las cuatro fotografías WebP referenciadas existen. `assets/js/navigation.js` solo contiene comentarios y no se carga desde la landing. `application.html` y `validation.js` están vacíos; el CTA lleva a una página sin formulario.
- El PLAN describe una implementación futura y el Memory Bank todavía afirma que no existe la web. Para el estado actual, se han contrastado los archivos con TASKS: preparación y contenido HTML parciales, con estilos y comprobaciones posteriores pendientes.
- El desarrollador confirmó que el servidor Python del apartado 2 funciona desde la raíz del repositorio en su Dev Container de VS Code y permite abrir la landing en el puerto 3000. Esta comprobación no acredita estilos ni funcionalidades pendientes. En la revisión anterior se comprobaron Node.js `v22.23.4`, npm `10.9.9` y npx, pero no se localizaron Tailwind ni http-server instalados o en la caché habitual de npx. La compilación y la alternativa npm siguen sin verificarse; no se han descargado herramientas ni generado CSS. No hay una suite de pruebas documentada para este componente.

### 1. Requisitos y carpeta de trabajo

Para previsualizar necesitas el repositorio abierto en VS Code Dev Containers o GitHub Codespaces, un navegador y **Python 3** disponible como `python3`. El servidor pertenece a la biblioteca estándar de Python: no requiere instalar paquetes. Node.js, npm y npx solo son necesarios para compilar Tailwind o utilizar el servidor alternativo. No hay un `package.json` de esta web ni scripts npm de arranque.

Abre **Terminal → New Terminal** en VS Code. Ejecuta todos los comandos desde la **raíz del repositorio**, donde están `AGENTS.md`, `specs/` y `uis/`; no desde `uis/` ni `uis/website/`. Comprueba tu ubicación y Python:

```bash
pwd
ls AGENTS.md uis/website/index.html
python3 --version
```

Si estás en otra carpeta, usa `cd` seguido de la ruta real de tu copia del repositorio.

### 2. Previsualizar la landing con Python (opción principal)

Desde la raíz del repositorio:

```bash
python3 -m http.server 3000 --bind 0.0.0.0 --directory uis/website
```

Deja esa terminal abierta. `--directory uis/website` sirve únicamente la carpeta de la web; conserva esa ruta para no publicar el monorepo. El servidor entrega los archivos existentes y no compila Tailwind. Puedes previsualizar el contenido aunque falte el CSS; en ese caso aparecerá sin estilos y fallará la petición de la hoja.

Abre **http://localhost:3000/** o **http://localhost:3000/index.html** en tu navegador local, o utiliza Ports como se explica más abajo. `0.0.0.0` permite el acceso mediante reenvío de puertos; no es la URL que debes abrir.

Para detener el servidor, selecciona su terminal y pulsa **Ctrl+C**. **No ejecutes el servidor Python y el servidor alternativo simultáneamente en el puerto 3000.** Detén el primero antes de iniciar el otro. Si necesitas otro puerto libre, cambia `3000` por `3001` (en Python) o `-p 3000` por `-p 3001` (en la alternativa), y actualiza la URL y el reenvío. No detengas procesos ajenos.

#### Alternativa opcional: http-server con npx

Si prefieres la herramienta del PLAN, necesitas Node.js, npm y npx. Desde la misma raíz:

```bash
npx --yes http-server@14.1.1 ./uis/website -a 0.0.0.0 -p 3000 -c-1
```

Puede descargar `http-server` 14.1.1 y sus dependencias a la caché de npm; requiere acceso al registro npm si faltan. `--yes` acepta automáticamente la pregunta de descarga: ejecútalo cuando esa descarga esté autorizada. No añade dependencias al monorepo. `-c-1` desactiva la caché para desarrollo. Utiliza la misma URL y se detiene con **Ctrl+C**.

### 3. Compilar Tailwind CSS (paso separado)

La compilación será necesaria para visualizar los estilos Tailwind una vez implementadas sus clases en el HTML. **No es necesaria para arrancar el servidor Python y revisar el contenido actual.** La entrada existe, pero la salida `uis/website/assets/css/tailwind.css` todavía falta; compilar ahora no implementará el diseño pendiente. Stitch es una referencia visual flexible.

Necesitas Node.js, npm y npx. Puedes comprobarlos con:

```bash
node --version
npm --version
npx --version
```

Desde la raíz, utiliza el comando del PLAN con Tailwind CSS 3.4.17:

```bash
npx --yes tailwindcss@3.4.17 --input ./uis/website/assets/css/tailwind.input.css --output ./uis/website/assets/css/tailwind.css --content "./uis/website/*.html,./uis/website/assets/js/*.js" --minify
```

También puede descargar el paquete y sus dependencias mediante npx; ejecútalo cuando esa descarga esté autorizada. El comando genera el CSS y termina. Comprueba que finaliza sin errores y crea el archivo; no edites la salida manualmente. Recompila cuando cambien las clases de HTML o JavaScript. Si el CSS existe y las clases no han cambiado, no hace falta recompilar en cada arranque. Si el servidor ya está abierto, usa otra terminal desde la raíz para compilar y después recarga el navegador.

### 4. Abrir la web mediante Ports

#### VS Code Dev Containers

1. Mantén el servidor ejecutándose en la terminal del Dev Container.
2. Abre **Ports** (Puertos) en el panel inferior de VS Code. Si no aparece, busca **Ports: Focus on Ports View** en la paleta de comandos.
3. Localiza el puerto **3000**. Si no se detecta, pulsa **Forward a Port** (Reenviar un puerto) e introduce `3000`.
4. Pulsa **Open in Browser** (Abrir en el navegador) en esa fila. Usa la dirección local reenviada que muestra VS Code; normalmente será `http://localhost:3000/`. Si el puerto local asignado es otro, utiliza el que indique Ports.

Dev Containers ejecuta el entorno en un contenedor; no presupone las opciones de visibilidad pública/privada de Codespaces.

#### GitHub Codespaces

Mantén el servidor ejecutándose dentro del Codespace. En **Ports**, localiza o reenvía el puerto **3000** y pulsa **Open in Browser**. Utiliza la dirección HTTPS reenviada que muestra Codespaces; su host depende del Codespace. Para tu previsualización conserva la visibilidad privada si está disponible. Publicar el puerto para una auditoría es un paso distinto que requiere autorización y puede estar limitado por políticas de la organización.

En ambos entornos, termina con **Ctrl+C** en la terminal del servidor. Puedes quitar también el reenvío desde Ports.
