import { Splitter } from '@Fluid'
import type { CatalogId } from './catalog'
import ControlCatalog from './ControlCatalog'
import SamplePane from './SamplePane'

export interface BodyProps {
  /** The selected control (shown in the right pane). */
  selectedId: CatalogId
  /** Fires when the catalog selection changes. */
  onSelect: (id: CatalogId) => void
}

/**
 * The app body — a draggable `Splitter` (`orientation="horizontal"`) with the `ControlCatalog` in
 * the left pane and the `SamplePane` in the right. `initialRatio={0.3}` starts the split at 30/70
 * (measured, not pixel-based), and the `minFirstSize`/`minSecondSize` clamps keep both panes usable
 * (T024). The Splitter lives here — the parent of the re-mounted sample — so dragging the handle
 * persists across selection changes (T025).
 *
 * @remarks Referenced by: `App` (root grid row 1).
 */
export default function Body({ selectedId, onSelect }: BodyProps) {
  return (
    <Splitter
      orientation="horizontal"
      initialRatio={0.3}
      minFirstSize={240}
      minSecondSize={280}
      firstPane={<ControlCatalog selectedId={selectedId} onSelect={onSelect} />}
      secondPane={<SamplePane selectedId={selectedId} />}
    />
  )
}
