import { dts } from 'rollup-plugin-dts'

/**
 * Bundles the declaration tree that `tsc -p tsconfig.build.json` emits into `.types/`
 * down to two flat files: `dist/index.d.ts` (ESM) and `dist/index.d.cts` (CJS).
 *
 * Flattening is not cosmetic. The package is `"type": "module"`, so a shipped `.d.ts` is read as
 * ESM, where TypeScript's `node16`/`nodenext` resolution rejects the extensionless relative imports
 * `tsc` emits (`TS2834`). A single file has no relative imports left to reject. It also drops the
 * per-control `import './style.css'` side effects, which would otherwise point at files that never
 * reach `dist/` (the CSS is bundled into one `dist/fluidreact.css`).
 *
 * The `.d.cts` twin is what `require('fluidreact')` resolves its types through; without it the ESM
 * declarations masquerade as CJS types.
 */
export default {
  input: '.types/index.d.ts',
  output: [
    { file: 'dist/index.d.ts', format: 'es' },
    { file: 'dist/index.d.cts', format: 'es' },
  ],
  // React is a peer dependency: keep its imports as imports rather than inlining its types.
  external: [/^react($|\/)/, /^react-dom($|\/)/],
  plugins: [
    {
      // `import './style.css'` carries no types; resolve it to nothing so it drops out.
      name: 'drop-css-imports',
      resolveId: (id) => (id.endsWith('.css') ? { id, external: false } : null),
      load: (id) => (id.endsWith('.css') ? '' : null),
    },
    dts({ respectExternal: true }),
  ],
}
