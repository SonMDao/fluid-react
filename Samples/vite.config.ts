import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Vite configuration for the FluidReactSample showcase app.
 *
 * Two wiring decisions make consuming the library *as source* work (research §1, FR-011):
 * 1. `@Fluid` aliases to the library's single barrel (`../src/index.ts`), so every app import is
 *    barrel-only and the library compiles straight into the app bundle. This app deliberately
 *    consumes the library **as source** rather than through its published `dist/` — a library
 *    change is visible here on the next reload, with no library build in between.
 * 2. `react` and `react/jsx-runtime` resolve to this package's own installed copy, so there is
 *    exactly one React instance shared by app and library.
 *
 * @remarks Referenced by: Vite (dev server and `vite build`); the `tsconfig.node.json` module.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // The library barrel — app code imports `@Fluid`, never a control folder directly.
      { find: /^@Fluid$/, replacement: fileURLToPath(new URL('../src/index.ts', import.meta.url)) },
      // Single React instance: the library folder has its own `node_modules` (it is a publishable
      // package, and npm installs its `react` peer dependency there), so these aliases are what pin
      // every `react` import — from app *and* library source — to this app's one copy instead of
      // letting the library's copy resolve too (regex so `react` does not swallow
      // `react/jsx-runtime`). One dispatcher, no "two Reacts".
      { find: /^react$/, replacement: fileURLToPath(new URL('node_modules/react/index.js', import.meta.url)) },
      {
        find: /^react\/jsx-runtime$/,
        replacement: fileURLToPath(new URL('node_modules/react/jsx-runtime.js', import.meta.url)),
      },
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: fileURLToPath(new URL('node_modules/react/jsx-dev-runtime.js', import.meta.url)),
      },
    ],
  },
})
