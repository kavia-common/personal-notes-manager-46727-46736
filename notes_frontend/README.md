# Personal Notes - Nuxt App (Ocean Professional)

A single-page notes application with localStorage persistence.

- Create, read, update, delete notes.
- Search in sidebar.
- URL deep link to selected note (`?note=<id>`).
- Keyboard shortcuts: Ctrl/⌘+N (new), Ctrl/⌘+S (save).
- Responsive layout; Ocean Professional theme.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build
- `npm run preview` — Preview production build
- `npm run test` — Run minimal unit tests for the store

No external services are required; data is stored locally in the browser.

## Preview/Dev connection notes

The dev/preview server binds to `0.0.0.0` and uses the port from environment if set.

Environment variables honored:
- `NUXT_PUBLIC_HOST` (default `0.0.0.0`)
- `NUXT_PUBLIC_PORT` or `PORT` (default `3000`)

If the configured port is busy, Vite will choose the next available port (strictPort=false), preventing connection errors.
