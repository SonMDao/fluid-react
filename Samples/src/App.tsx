import { useState } from 'react'
import { Grid } from '@Fluid'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import { firstControlId, type CatalogId } from './catalog'

/**
 * Root of the showcase. A `Grid` with `RowDefinitions="Auto,*,Auto"` lays out the three rows —
 * the auto-generated `Header` (row 0), the `Body` with its catalog/sample Splitter (row 1,
 * expanded), and the auto-generated `Footer` (row 2) — and owns the single `selectedId` piece of
 * app state (FR-005), initialized to the first control so the right pane is never empty (FR-006).
 *
 * @remarks Referenced by: `src/main.tsx`.
 */
export default function App() {
  const [selectedId, setSelectedId] = useState<CatalogId>(firstControlId)

  return (
    <Grid HeightRequest="100%" WidthRequest="100%" RowDefinitions="Auto,*,Auto">
      <Grid.Item Row={0}>
        <Header />
      </Grid.Item>
      <Grid.Item Row={1}>
        <Body selectedId={selectedId} onSelect={setSelectedId} />
      </Grid.Item>
      <Grid.Item Row={2}>
        <Footer />
      </Grid.Item>
    </Grid>
  )
}
