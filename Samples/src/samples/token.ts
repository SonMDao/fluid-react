/**
 * Resolves a design token (e.g. `--accent-blue`) to the concrete colour value the browser has
 * already computed for it. Needed only for the two sample contexts that paint in an *imperative*
 * way — the `GraphicsView` canvas and the SVG `Shapes` — where a `var(--token)` reference passed
 * straight through as a paint value is not itself evaluated by the browser.
 *
 * It still "uses the token": the value is read from the token the app defines in `index.css`, so no
 * colour literal ever appears in app source (FR-009 / SC-004). The read happens at draw time —
 * after the stylesheet is applied — so the value is always present.
 *
 * @remarks Referenced by: `GraphicsViewSample` and the seven `Shapes` samples.
 */
export function tokenColor(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
