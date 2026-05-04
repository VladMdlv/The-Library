# The Library

## Task

Brief and requirements for this project are in the **(https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view)**.

## How to run the app

**Prerequisites:** [Node.js](https://nodejs.org/) LTS (includes `npm`).

1. Clone this repository and open the project folder in a terminal. (git clone "https://github.com/VladMdlv/The-Library.git")

2. Install dependencies:

   ```bash
   npm install
   ```

3. **Development** — start Vite:

   ```bash
   npm run dev
   ```

   Open the URL printed in the terminal (`http://localhost:5173`).

4. **Production build** — into `dist/`:

   ```bash
   npm run build
   ```
---

## Folder structure

| Path | Contents |
|------|----------|
| `src/` | Application source: entry script, styles, modules. |
| `src/assets/` | Static assets used from source (SVG icons). |
| `src/constants/` | Shared constants and configuration values. |
| `src/utils/` | Helpers: book search (Open Library API), rendering, favorites storage, cover URLs, SVG snippets. |
| `index.html` | HTML shell; Vite uses it as the dev/prod entry. |
