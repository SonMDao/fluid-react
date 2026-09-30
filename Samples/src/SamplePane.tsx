import { Label, StackLayout } from '@Fluid'
import type { CatalogId } from './catalog'
import { samples } from './samples'

export interface SamplePaneProps {
  /** The selected control whose sample this pane shows. */
  selectedId: CatalogId
}

/**
 * The right-pane sample area: resolves the selected `CatalogId` to its sample component from the
 * registry and renders it. The sample is keyed by `selectedId`, so switching controls unmounts and
 * re-mounts the sample — giving each sample fresh local state — while the Splitter around this pane
 * (in `Body`) is not re-mounted, so the split position persists across selections.
 *
 * @remarks Referenced by: `Body` (the Splitter's second pane).
 */
export default function SamplePane({ selectedId }: SamplePaneProps) {
  const Sample = samples[selectedId]

  // The registry is `Record<CatalogId, …>`, so this branch is unreachable — it keeps the pane
  // resilient and satisfies the "never an empty right pane" requirement (FR-006).
  if (Sample == null) {
    return (
      <StackLayout Orientation="Vertical" Spacing={8} Padding={16} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Label Text={`No sample for “${selectedId}”.`} FontSize="var(--text-md)" TextColor="var(--text)" />
      </StackLayout>
    )
  }

  return <Sample key={selectedId} />
}
