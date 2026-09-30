# Changelog

All notable changes to this project are documented here. Release tags also carry
auto-generated notes from the commit log; this file records the changes that affect the
published API surface.

## 0.1.0

Initial release.

- 50 controls, one folder each, with props mirroring the mobile native layout properties 1:1
  (PascalCase, same names and casing).
- Shared prop types (`ViewProps`, `LayoutOptions`, `TextAlignment`, `FontAttributes`, `Aspect`,
  `Orientation`, `Thickness`, `GridLengths`) and the helpers `thickness`, `gridTemplate`,
  `viewStyle` and `cx`.
- Ships ESM (`dist/fluidreact.js`) and CJS (`dist/fluidreact.cjs`) builds, bundled type
  declarations for both module systems, and a single stylesheet exposed as `fluidreact/style.css`.
- `react` and `react-dom` (`^19`) are peer dependencies; `ref` is a plain prop throughout, with no
  `forwardRef` wrappers.
