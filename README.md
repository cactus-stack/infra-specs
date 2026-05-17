# Infra Specs

Visualizador estatico de investigaciones de infraestructura hechas por IA para revision humana antes de ejecucion.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Vercel debe usar:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Agregar investigaciones

1. Guardar el HTML final en `public/investigaciones/`.
2. Agregar su metadata en `src/research-items.js`.
3. Correr `npm run build`.
