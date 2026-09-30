import { BoxView, Label, VerticalStackLayout } from '@Fluid'

/**
 * `VerticalStackLayout` sample — a stack whose orientation is locked vertical; only `Spacing` is set
 * (here 8). Demonstrates the dedicated vertical variant used when vertical flow is always intended.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function VerticalStackLayoutSample() {
  return (
    <VerticalStackLayout Spacing={8} Padding={12}>
      <Label Text="VerticalStackLayout — Spacing=8" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <BoxView Color="var(--accent-blue)" CornerRadius={6} HeightRequest={24} />
      <BoxView Color="var(--primary-action-bg)" CornerRadius={6} HeightRequest={24} />
      <BoxView Color="var(--accent-blue)" CornerRadius={6} HeightRequest={24} />
    </VerticalStackLayout>
  )
}
