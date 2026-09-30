import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Library build for the published `fluidreact` package.
 *
 * The barrel (`src/index.ts`) is the single entry: it bundles to one ESM file and one CJS file,
 * and every control's `style.css` collapses into a single `dist/fluidreact.css`, which the package
 * exposes as the `fluidreact/style.css` subpath for consumers to import once. `react`/`react-dom`
 * stay external — they are peer dependencies, so the consumer's copy is the only one in the bundle.
 *
 * Type declarations are not produced here; `tsc -p tsconfig.build.json` emits them alongside
 * (see the `build` script).
 *
 * @remarks The showcase app in `Samples/` does not use this build — it consumes `src/` directly
 * through its own `@Fluid` alias, so library edits show up there without a build step.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
      name: 'FluidReact',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'fluidreact.js' : 'fluidreact.cjs'),
    },
    // One stylesheet for the whole library rather than one per entry chunk.
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
  },
})
