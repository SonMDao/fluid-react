import { BoxView, Label, HorizontalStackLayout, StackLayout } from '@Fluid'

/**
 * `HorizontalStackLayout` sample — a stack whose orientation is locked horizontal; only `Spacing` is
 * set (here 10). Demonstrates the dedicated horizontal variant for single-line, side-by-side layout.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function HorizontalStackLayoutSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={12}>
      <Label Text="HorizontalStackLayout — Spacing=10" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <HorizontalStackLayout Spacing={10}>
        <BoxView Color="var(--accent-blue)" CornerRadius={6} HeightRequest={24} WidthRequest={64} />
        <BoxView Color="var(--primary-action-bg)" CornerRadius={6} HeightRequest={24} WidthRequest={64} />
        <BoxView Color="var(--accent-blue)" CornerRadius={6} HeightRequest={24} WidthRequest={64} />
      </HorizontalStackLayout>
    </StackLayout>
  )
}
