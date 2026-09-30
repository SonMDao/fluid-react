import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../index.css'

/**
 * Vite entry point: mounts the single `<App />` (the Fluid control-set showcase) into `#root`.
 *
 * React 19's `createRoot` is used directly; there is exactly one React instance — the `@Fluid`
 * library source is aliased to this package's `react` (see `vite.config.ts`), so the app and the
 * library share one dispatcher (FR-011).
 *
 * @remarks Referenced by: `index.html` (`<script type="module" src="/src/main.tsx">`).
 */
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
