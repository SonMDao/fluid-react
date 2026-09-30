import { BoxView, Label, StackLayout } from '@Fluid'

/**
 * `StackLayout` sample — the default vertical stack, here explicitly set with `Orientation="Vertical"`
 * and a `Spacing` gap between its three children. The `VerticalStackLayout` /
 * `HorizontalStackLayout` samples show the two fixed-orientation variants.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function StackLayoutSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={12}>
      <Label Text="StackLayout — Orientation=&quot;Vertical&quot;, Spacing=12" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <BoxView Color="var(--accent-blue)" CornerRadius={6} HeightRequest={28} />
      <BoxView Color="var(--primary-action-bg)" CornerRadius={6} HeightRequest={28} />
      <BoxView Color="var(--accent-blue)" CornerRadius={6} HeightRequest={28} />
    </StackLayout>
  )
}
