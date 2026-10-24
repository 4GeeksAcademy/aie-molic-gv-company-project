# `uis` folder

This folder contains **all projects with a user interface** for the cross-functional AI Engineering company project — for example: a public website, admin dashboard frontend, ecommerce UI, customer portals, Streamlit/Gradio app or other frontend-only tools.

The two main projects stored here are:

- **`website`** — the company's public-facing web presence.
- **`backoffice`** — the internal admin application. This is the ideal place to develop multiple solutions within a single project: authentication, people management, operations management, internal communication, and other back-office capabilities.

Organize `uis/` by **different concerns** — each subfolder covers a distinct area of the company (for example, public web vs internal operations) and includes its own technical and functional documentation.

- **Main purpose**: to centralize in a single place all frontend applications that support the company's use cases.
- **Recommendation**: document in this file (or in sub-READMEs) the applications you add, their objective, the technology used, and how to run them.

> _Estas instrucciones también están disponibles en [español](./README.es.md)._


## TrackFlow landing — `uis/website/`

The landing is a static website with HTML5, a Tailwind CSS input file and a JavaScript file reserved for navigation. Resources live in `website/assets/`. Viewing its files does not require a backend. The SDD workflow is documented in [SPEC](../specs/001-website/spec.md), [PLAN](../specs/001-website/plan.md) and [TASKS](../specs/001-website/tasks.md).

### Checked status and limitations (24 October 2026)

- `index.html` contains the structure and copy but has no Tailwind classes yet. Styling and menu behavior remain pending; compilation will not implement those tasks.
- `assets/css/tailwind.input.css` contains the three Tailwind directives. **`assets/css/tailwind.css` does not exist**, although the HTML links to it: that request will be missing until the output is generated.
- The four referenced WebP photographs exist. `assets/js/navigation.js` contains comments only and is not loaded by the landing. `application.html` and `validation.js` are empty; the CTA leads to a page without a form.
- PLAN describes a future implementation and the Memory Bank still says the website does not exist. Files were checked against TASKS for the current status: partial preparation and HTML content, with styling and later checks pending.
- The developer confirmed that the Python server in section 2 works from the repository root in their VS Code Dev Container and opens the landing on port 3000. This does not validate pending styling or functionality. The previous review checked Node.js `v22.23.4`, npm `10.9.9` and npx, but did not find Tailwind or http-server installed or in the usual npx cache. Compilation and the npm alternative remain unverified; no tools were downloaded and no CSS was generated. No test suite is documented for this component.

### 1. Prerequisites and working directory

For previewing, you need the repository open in VS Code Dev Containers or GitHub Codespaces, a browser and **Python 3** available as `python3`. The server is part of Python's standard library: no package installation is required. Node.js, npm and npx are only needed to compile Tailwind or use the alternative server. This website has no `package.json` or npm startup scripts.

Open **Terminal → New Terminal** in VS Code. Run every command from the **repository root**, containing `AGENTS.md`, `specs/` and `uis/`, rather than from `uis/` or `uis/website/`. Check your location and Python:

```bash
pwd
ls AGENTS.md uis/website/index.html
python3 --version
```

If you are elsewhere, use `cd` followed by the actual path to your repository checkout.

### 2. Preview with Python (main option)

From the repository root:

```bash
python3 -m http.server 3000 --bind 0.0.0.0 --directory uis/website
```

Keep this terminal open. `--directory uis/website` serves only the website folder; keep that path to avoid exposing the monorepo. The server delivers existing files and does not compile Tailwind. You can preview the content without CSS; in that case it will be unstyled and the stylesheet request will fail.

Open **http://localhost:3000/** or **http://localhost:3000/index.html** in your local browser, or use Ports as explained below. `0.0.0.0` supports port forwarding; it is not the browser URL.

To stop the server, select its terminal and press **Ctrl+C**. **Do not run Python and the alternative server simultaneously on port 3000.** Stop one before starting the other. To use another free port, replace `3000` with `3001` (Python) or `-p 3000` with `-p 3001` (the alternative), and update the URL and forwarding. Do not stop someone else's processes.

#### Optional alternative: http-server with npx

If you prefer the tool from PLAN, you need Node.js, npm and npx. From the same root:

```bash
npx --yes http-server@14.1.1 ./uis/website -a 0.0.0.0 -p 3000 -c-1
```

This may download http-server 14.1.1 and its dependencies into the npm cache; registry access is required when missing. `--yes` automatically accepts the download prompt: run it when that download is authorized. It does not add dependencies to the monorepo. `-c-1` disables caching for development. Use the same URL and stop it with **Ctrl+C**.

### 3. Compile Tailwind CSS (separate step)

Compilation will be needed to view Tailwind styles once their HTML classes are implemented. **It is not required to start the Python server and inspect the current content.** The input exists, but `uis/website/assets/css/tailwind.css` is still missing; compiling now will not implement the pending design. Stitch is a flexible visual reference.

You need Node.js, npm and npx. Check them with:

```bash
node --version
npm --version
npx --version
```

From the root, use the PLAN command with Tailwind CSS 3.4.17:

```bash
npx --yes tailwindcss@3.4.17 --input ./uis/website/assets/css/tailwind.input.css --output ./uis/website/assets/css/tailwind.css --content "./uis/website/*.html,./uis/website/assets/js/*.js" --minify
```

This may also download the package and its dependencies through npx; run it when that download is authorized. The command generates CSS and exits. Check that it finishes without errors and creates the file; do not edit the output manually. Recompile when HTML or JavaScript classes change. If CSS exists and classes have not changed, compilation is unnecessary on each startup. If the server is already running, compile in another terminal from the root, then reload the browser.

### 4. Open the website through Ports

#### VS Code Dev Containers

1. Keep the server running in the Dev Container terminal.
2. Open **Ports** in the bottom VS Code panel. If hidden, search for **Ports: Focus on Ports View** in the command palette.
3. Find port **3000**. If it was not detected, select **Forward a Port** and enter `3000`.
4. Select **Open in Browser** on that row. Use the local forwarded address shown by VS Code, usually `http://localhost:3000/`. If a different local port was assigned, use the one shown in Ports.

Dev Containers runs the environment in a container; it does not imply Codespaces public/private visibility controls.

#### GitHub Codespaces

Keep the server running inside the Codespace. In **Ports**, find or forward port **3000** and select **Open in Browser**. Use the forwarded HTTPS address shown by Codespaces; its hostname depends on the Codespace. Keep visibility private for your preview if available. Publishing the port for an audit is a separate step requiring authorization and may be restricted by organization policies.

In either environment, finish with **Ctrl+C** in the server terminal. You can also remove forwarding in Ports.

