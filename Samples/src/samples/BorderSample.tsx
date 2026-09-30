import { Border, HorizontalStackLayout, Label } from '@Fluid'

/**
 * `Border` sample — three bordered boxes side by side, one per `StrokeShape`: a rounded rectangle
 * (`"RoundRectangle 12"`), an ellipse (`"Ellipse"`), and a plain rectangle (no `StrokeShape`). All
 * share `Stroke`, `StrokeThickness`, and `Padding`, taken from the design tokens.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function BorderSample() {
  return (
    <HorizontalStackLayout Spacing={16} Padding={12}>
      <Border Stroke="var(--accent-blue)" StrokeThickness={2} StrokeShape="RoundRectangle 12" Padding={12} WidthRequest={120}>
        <Label Text="RoundRectangle 12" FontSize="var(--text-sm)" TextColor="var(--text)" />
      </Border>
      <Border Stroke="var(--primary-action-bg)" StrokeThickness={2} StrokeShape="Ellipse" Padding={12} WidthRequest={120} HeightRequest={120}>
        <Label Text="Ellipse" FontSize="var(--text-sm)" TextColor="var(--text)" />
      </Border>
      <Border Stroke="var(--navbar-btn-border)" StrokeThickness={2} Padding={12} WidthRequest={120} HeightRequest={120}>
        <Label Text="Rectangle" FontSize="var(--text-sm)" TextColor="var(--text)" />
      </Border>
    </HorizontalStackLayout>
  )
}
