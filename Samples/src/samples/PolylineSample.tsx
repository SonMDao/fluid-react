import { Label, Polyline, StackLayout } from '@Fluid'
import { tokenColor } from './token'

/**
 * `Polyline` sample — an open (unclosed) run of connected segments, showing `Points` (a string),
 * `Stroke`/`StrokeThickness`, `StrokeDashArray`, and `StrokeLineCap`/`StrokeLineJoin`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function PolylineSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16} style={{ alignItems: 'center' }}>
      <Label Text="Polyline — Points, Stroke, StrokeDashArray, StrokeLineCap/Join" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Polyline
        Points="0,80 30,20 60,80 90,20 120,80"
        Stroke={tokenColor('--accent-blue')}
        StrokeThickness={3}
        StrokeDashArray="8 5"
        StrokeLineCap="Round"
        StrokeLineJoin="Round"
        WidthRequest={130}
        HeightRequest={100}
      />
    </StackLayout>
  )
}
