# Contributing to FluidReact

Thanks for helping out. This project has one governing rule, and most review comments trace back
to it:

> **A control's props mirror the mobile native layout properties 1:1 — same names, same
> PascalCase, same value vocabulary.**

If the native control calls it `HorizontalOptions` with values `Start | Center | End | Fill`, so do
we. We do not rename it to `align`, we do not lowercase it, and we do not invent a value the
native layout does not have.

## Getting set up

Node 20.19+ (see [.nvmrc](.nvmrc)).

```bash
git clone https://github.com/SonMDao/fluid-react.git
cd FluidReact
npm install                 # library dev dependencies
npm run samples:install     # showcase app dependencies
npm run samples:dev         # http://localhost:5173
```

The showcase imports the library from source through its `@Fluid` alias, so you edit a control in
`src/` and see it in the browser on the next reload — no library build in the loop.

## Layout of a control

Every control is one folder under [src/](src/), named exactly after the control:

```
src/Button/
  Button.tsx     default-exported component + exported `ButtonProps`
  style.css      static styling only
```

Conventions that apply to all of them:

- **`Button.tsx`** default-exports the component and named-exports `ButtonProps extends ViewProps`.
  React 19 treats `ref` as a plain prop — do not add `forwardRef`.
- **Property-driven styling is inline.** If a prop controls it, compute it into the `style` object
  using the converters in [src/Shared/fluid-shared.ts](src/Shared/fluid-shared.ts) (`thickness`,
  `gridTemplate`, `viewStyle`, `fontAttributes`, `size`). Only the static remainder belongs in
  `style.css`.
- **`style.css` is namespaced.** Every selector starts with `fluid-<control>` (`.fluid-button`,
  `.fluid-button-image`). No bare element or utility selectors — the stylesheet is global once
  bundled.
- **Compose the root class with `cx`**, so a caller's `className` survives:
  `className={cx('fluid-button', className)}`.
- **Document the mapping.** Each component carries a doc comment with the `| native | here |`
  table showing which native layout property maps to which prop. Keep it accurate; it is the spec.

## Adding a control

1. Create `src/<Control>/<Control>.tsx` and `src/<Control>/style.css` following the above.
2. Export it from [src/index.ts](src/index.ts), under the right category comment.
3. Add a sample: `Samples/src/samples/<Control>Sample.tsx`, registered in
   `Samples/src/samples/index.ts`, with the catalog entry in `Samples/src/catalog.ts`.

The catalog's `id`s and the sample registry's keys are checked against each other by `tsc`, so a
control added to one and not the other fails the typecheck. That is deliberate — the showcase is
meant to stay exhaustive.

## Before you open a PR

```bash
npm run typecheck       # tsc over src/
npm run build           # full library build, including declarations
npm run samples:build   # typechecks and builds the showcase
```

All three must pass; CI runs the same three on every pull request.

Keep commits focused, and describe the native mobile behaviour you are matching in the PR body — a
link to the platform documentation for the control is the most useful thing you can include.

## Reporting bugs

Open an issue with the control name, the props you passed, what the native control does, and what
FluidReact did instead. A minimal snippet beats a description.
