import { Border, Label, StackLayout } from '@Fluid'

/**
 * The auto-generated showcase header — the app name "FluidReact Sample" plus a subtitle identifying
 * the app as a showcase of the `@Fluid` control set. Composed entirely from Fluid controls
 * (`Border` / `StackLayout` / `Label`, no raw HTML) and rendered identically on every sample page:
 * it is chrome, never sample-specific (FR-001, FR-008). Colours are taken from the design tokens.
 *
 * @remarks Referenced by: `App` (root grid row 0).
 */
export default function Header() {
  return (
    <Border Stroke="var(--card-border)" StrokeThickness={1} Padding={12}>
      <StackLayout Orientation="Horizontal" Spacing={10} style={{ alignItems: 'center' }}>
        <Label
          Text="FluidReact Sample"
          FontAttributes="Bold"
          FontSize="var(--text-header)"
          TextColor="var(--text)"
        />
        <Label
          Text="— a showcase of the @Fluid control set"
          FontSize="var(--text-sm)"
          TextColor="var(--text-muted)"
        />
      </StackLayout>
    </Border>
  )
}
