import { Ellipse, Label, StackLayout } from '@Fluid'
import { tokenColor } from './token'

/**
 * `Ellipse` sample — an ellipse filling its layout box, showing `Fill`, `Stroke`/`StrokeThickness`,
 * and `WidthRequest`/`HeightRequest` (which set both the box and the viewBox).
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function EllipseSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16} style={{ alignItems: 'center' }}>
      <Label Text="Ellipse — Fill, Stroke, StrokeThickness, Width/HeightRequest" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Ellipse
        Fill={tokenColor('--accent-blue')}
        Stroke={tokenColor('--primary-action-bg')}
        StrokeThickness={4}
        WidthRequest={140}
        HeightRequest={90}
      />
    </StackLayout>
  )
}
