/**
 * The control catalog: the 50 top-level `@Fluid` controls, each exactly once, grouped under the
 * five library categories. This is the single source of truth for the left-pane list (FR-004) and
 * the selection (the first entry in `order` is the default selection, FR-006).
 *
 * The `id` of every entry equals the `@Fluid` barrel's export name for that control. That equality
 * is what makes "50 of 50" (SC-001) and the sample-registry bijection hold: the catalog's `id`s are
 * the registry's keys. `CatalogId` is a literal union over exactly those 50 names, so the registry
 * (`Record<CatalogId, SampleComponent>`) is checked by `tsc` to cover all of them and none other.
 *
 * Sub-components (`GridItem`, `FlexItem`, `TableSection`, …) are deliberately absent — they are
 * demonstrated inside their parent control's sample, not catalogued as their own entry.
 */

/**
 * The five category headings of the library catalog, in list order (FR-004).
 *
 * @remarks Referenced by: `Category` (the type alias over it).
 */
export const CATEGORIES = [
  'Layouts',
  'Inputs & display',
  'Collections',
  'Containers & navigation',
  'Graphics & shapes',
] as const

/**
 * A single category heading.
 *
 * @remarks Referenced by: `CATALOG_GROUPS` (each group's `category`) and `CatalogEntry.category`.
 */
export type Category = (typeof CATEGORIES)[number]

/**
 * The 50 controls grouped under their category. `as const` pins each `id` to its exact literal so
 * `CatalogId` below becomes the union of precisely these 50 names — the set the registry must cover.
 * Order here is the catalog order (and, within a category, the list order).
 *
 * @remarks Referenced by: `CatalogId` (the union over its `controls`), `ControlCatalog` (the left-pane
 * list), and `buildCatalog` (which flattens it into `catalog`).
 */
export const CATALOG_GROUPS = [
  {
    category: 'Layouts',
    controls: [
      'Grid',
      'StackLayout',
      'VerticalStackLayout',
      'HorizontalStackLayout',
      'FlexLayout',
      'AbsoluteLayout',
      'ScrollView',
      'Border',
      'ContentView',
      'Splitter',
    ],
  },
  {
    category: 'Inputs & display',
    controls: [
      'Label',
      'Button',
      'ImageButton',
      'Image',
      'Entry',
      'Editor',
      'SearchBar',
      'Picker',
      'DatePicker',
      'TimePicker',
      'Switch',
      'CheckBox',
      'RadioButton',
      'Slider',
      'Stepper',
      'ActivityIndicator',
      'ProgressBar',
      'BoxView',
      'WebView',
      'HybridWebView',
    ],
  },
  {
    category: 'Collections',
    controls: ['CollectionView', 'CarouselView', 'ListView', 'TableView'],
  },
  {
    category: 'Containers & navigation',
    controls: ['ContentPage', 'NavigationPage', 'TabbedPage', 'FlyoutPage', 'Shell', 'RefreshView', 'SwipeView', 'IndicatorView'],
  },
  {
    category: 'Graphics & shapes',
    controls: ['GraphicsView', 'Polygon', 'Polyline', 'Path', 'Ellipse', 'Rectangle', 'Line', 'RoundRectangle'],
  },
] as const

/**
 * The exact union of the 50 top-level control names — the keys the sample registry must cover.
 *
 * @remarks Referenced by: the `samples` registry (`src/samples/index.ts`, typed `Record<CatalogId, …>`),
 * `Body`, `SamplePane`, `ControlCatalog`, `App`, and `CatalogEntry.id`.
 */
export type CatalogId = (typeof CATALOG_GROUPS)[number]['controls'][number]

/**
 * One row of the left-pane control list (data-model §1).
 *
 * @remarks Referenced by: `catalog` (the array of these) and `buildCatalog` (which constructs them).
 */
export interface CatalogEntry {
  /** Stable, unique key; equals the `@Fluid` barrel export name and the sample-registry key. */
  id: CatalogId
  /** Display name shown in the list — the control's PascalCase name. */
  name: string
  /** The category heading this control is grouped under. */
  category: Category
  /** 1-based position in the overall catalog order (monotonic within each category). */
  order: number
}

/**
 * The 50 catalogued controls in catalog order (built once from {@link CATALOG_GROUPS}).
 *
 * @remarks Referenced by: `Footer` (derives the "50 controls" count from `catalog.length`) and
 * `firstControlId`.
 */
export const catalog: CatalogEntry[] = buildCatalog()

/**
 * The first control in catalog order — the default selection so the right pane is never empty (FR-006).
 *
 * @remarks Referenced by: `App` (initialises its `selectedId` state to this).
 */
export const firstControlId: CatalogId = catalog[0].id

/**
 * Flattens {@link CATALOG_GROUPS} into an ordered, de-duplicated-by-construction `CatalogEntry` array.
 *
 * @remarks Referenced by: `catalog` (invoked once at module load to build it).
 */
function buildCatalog(): CatalogEntry[] {
  const entries: CatalogEntry[] = []
  let order = 0
  for (const { category, controls } of CATALOG_GROUPS) {
    for (const id of controls) {
      order += 1
      entries.push({ id, name: id, category, order })
    }
  }
  return entries
}
