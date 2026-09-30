import { BoxView, HorizontalStackLayout, Label, StackLayout } from '@Fluid'

/**
 * `BoxView` sample — the plain solid-colour rectangle, showing `Color` (each box a different design
 * token) and `CornerRadius` (plain number and a `Thickness` value, for per-corner radii).
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function BoxViewSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="BoxView — Color (tokens), CornerRadius (number | Thickness)" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <HorizontalStackLayout Spacing={12} style={{ alignItems: 'flex-start' }}>
        <BoxView Color="var(--accent-blue)" CornerRadius={0} WidthRequest={56} HeightRequest={56} />
        <BoxView Color="var(--primary-action-bg)" CornerRadius={8} WidthRequest={56} HeightRequest={56} />
        <BoxView Color="var(--navbar-btn-border)" CornerRadius={{ top: 28, bottom: 0 }} WidthRequest={56} HeightRequest={56} />
        <BoxView Color="var(--fluid-progress-color)" CornerRadius={28} WidthRequest={56} HeightRequest={56} />
      </HorizontalStackLayout>
    </StackLayout>
  )
}
