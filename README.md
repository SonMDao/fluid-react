# FluidReact

[![CI](https://github.com/SonMDao/fluid-react/actions/workflows/ci.yml/badge.svg)](https://github.com/SonMDao/fluid-react/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/fluidreact.svg)](https://www.npmjs.com/package/fluidreact)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A React 19 control set whose props mirror the **mobile native layout** vocabulary **1:1**. If you
have laid out a mobile screen with a grid's `RowDefinitions="Auto,*,Auto"`, or a label with
`HorizontalOptions="Center" FontAttributes="Bold"`, you already know the API — the names, the
casing and the accepted values are the same.

```tsx
import { Grid, Label, Button, VerticalStackLayout } from 'fluidreact'
import 'fluidreact/style.css'

export default function App() {
  return (
    <Grid RowDefinitions="Auto,*" Padding={16}>
      <Grid.Item Row={0}>
        <Label Text="Hello" FontSize={24} FontAttributes="Bold" HorizontalOptions="Center" />
      </Grid.Item>
      <Grid.Item Row={1}>
        <VerticalStackLayout Spacing={8} VerticalOptions="Center">
          <Button Text="Save" Command={() => console.log('saved')} />
          <Button Text="Cancel" BackgroundColor="#eee" TextColor="#333" />
        </VerticalStackLayout>
      </Grid.Item>
    </Grid>
  )
}
```

## Why

- **One vocabulary across stacks.** Porting a mobile screen to the web is a transcription, not a
  redesign: `Padding`, `Margin`, `HorizontalOptions`, `Spacing`, `CornerRadius` all keep their
  meaning.
- **No page CSS.** Layout is driven entirely through control properties. Each control owns the
  static half of its own `style.css`; anything a property controls becomes an inline style.
- **Typed end to end.** Every control ships `.d.ts`, and property values are literal unions
  (`'Start' | 'Center' | 'End' | 'Fill' | …`), so a typo is a compile error.
- **React 19 native.** `ref` is a plain prop — no `forwardRef` wrappers anywhere.

## Install

```bash
npm install fluidreact
```

`react` and `react-dom` (both `^19`) are peer dependencies — the package uses your copy.

Import the stylesheet once, at your app's entry point:

```ts
import 'fluidreact/style.css'
```

The package ships ESM and CJS builds plus type declarations, and is side-effect free apart from
that stylesheet, so unused controls tree-shake out of your bundle.

## Controls

50 controls, one folder per control under [src/](src/).

| Category | Controls |
| --- | --- |
| **Layouts** | `Grid` (+`GridItem`), `StackLayout`, `VerticalStackLayout`, `HorizontalStackLayout`, `FlexLayout` (+`FlexItem`), `AbsoluteLayout` (+`AbsoluteChild`), `ScrollView`, `Border`, `ContentView`, `Splitter` |
| **Inputs & display** | `Label`, `Button`, `ImageButton`, `Image`, `Entry`, `Editor`, `SearchBar`, `Picker`, `DatePicker`, `TimePicker`, `Switch`, `CheckBox`, `RadioButton`, `Slider`, `Stepper`, `ActivityIndicator`, `ProgressBar`, `BoxView`, `WebView`, `HybridWebView` |
| **Collections** | `CollectionView`, `CarouselView`, `ListView`, `TableView` (+`TableSection`, `TextCell`, `ViewCell`, `SwitchCell`) |
| **Containers & navigation** | `ContentPage`, `NavigationPage`, `TabbedPage`, `FlyoutPage`, `Shell`, `RefreshView`, `SwipeView`, `IndicatorView` |
| **Graphics & shapes** | `GraphicsView`, `Polygon`, `Polyline`, `Path`, `Ellipse`, `Rectangle`, `Line`, `RoundRectangle` |

Shared prop types (`ViewProps`, `LayoutOptions`, `TextAlignment`, `FontAttributes`, `Aspect`,
`Orientation`, `Thickness`, `GridLengths`) and the helpers `thickness`, `gridTemplate`, `viewStyle`
and `cx` are exported from the same barrel.

### Value shorthands

`Thickness` accepts every form the native layout syntax does, plus arrays and objects:

```tsx
<Border Padding={12} />                        {/* uniform          */}
<Border Padding="12,8" />                      {/* horizontal,vertical */}
<Border Padding="12,8,12,16" />                {/* l,t,r,b          */}
<Border Padding={[12, 8]} />
<Border Padding={{ left: 12, top: 8 }} />
```

`GridLength` lists take the native shorthand string or an array:

```tsx
<Grid RowDefinitions="Auto,*,2*,120" ColumnDefinitions={['Auto', '*']} />
```

## Samples

[`Samples/`](Samples/) is a Vite showcase app with a live, runnable example for every one of the
50 controls, browsable by category.

```bash
npm run samples:install
npm run samples:dev      # http://localhost:5173
```

The showcase consumes the library **as source** — its `@Fluid` alias points straight at
[src/index.ts](src/index.ts), so a library edit shows up on the next reload with no build in
between. See [Samples/vite.config.ts](Samples/vite.config.ts) for that wiring.

## Developing

Requires Node 20.19+ (see [.nvmrc](.nvmrc)).

```bash
npm install            # library dev dependencies
npm run typecheck      # tsc over src/, no emit
npm run build          # dist/ — ESM + CJS bundles, one stylesheet, .d.ts + .d.cts
npm run verify:package # build, then lint the package with publint and attw
npm run samples:build
```

`npm run build` runs the typecheck first, then bundles with Vite
([vite.config.ts](vite.config.ts)) and emits declarations in two steps: `tsc -p
tsconfig.build.json` writes a declaration tree to `.types/`, and
[rollup.dts.config.mjs](rollup.dts.config.mjs) flattens it into a single `dist/index.d.ts` plus a
`dist/index.d.cts` twin for `require`. Flattening is what keeps the declarations valid under
TypeScript's `node16`/`nodenext` resolution — the per-file tree `tsc` emits uses extensionless
relative imports, which are an error in an ESM `.d.ts`.

`npm run verify:package` is the gate CI enforces: [publint](https://publint.dev) checks the
`exports` map and [attw](https://arethetypeswrong.github.io) resolves the types the way each
consumer flavour (ESM, CJS, bundler, node10) would.

## Contributing

Bug reports, control fixes and new samples are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md)
for the layout conventions a control folder has to follow.

## License

[MIT](LICENSE) © Son Dao
