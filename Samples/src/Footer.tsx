import { Border, Label, StackLayout } from '@Fluid'
import { catalog } from './catalog'

/**
 * The auto-generated showcase footer — the library identity (`@Fluid` control set) and the total
 * control count. The count is derived from {@link catalog}.length (50) rather than hard-coded, so it
 * can never drift from the catalog. Composed from Fluid controls only (no raw HTML) and rendered
 * identically on every sample page (FR-002, FR-008).
 *
 * @remarks Referenced by: `App` (root grid row 2).
 */
export default function Footer() {
  return (
    <Border Stroke="var(--card-border)" StrokeThickness={1} Padding={10}>
      <StackLayout
        Orientation="Horizontal"
        Spacing={8}
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Label Text="@Fluid control set" FontAttributes="Bold" FontSize="var(--text-sm)" TextColor="var(--text)" />
        <Label Text={`${catalog.length} controls`} FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      </StackLayout>
    </Border>
  )
}
