import { Label, Line, StackLayout } from '@Fluid'
import { tokenColor } from './token'

/**
 * `Line` sample — a straight segment between two points, showing `X1`/`Y1`/`X2`/`Y2`,
 * `Stroke`/`StrokeThickness`, and `StrokeLineCap`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function LineSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16} style={{ alignItems: 'center' }}>
      <Label Text="Line — X1 / Y1 / X2 / Y2, Stroke, StrokeThickness, StrokeLineCap" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Line
        X1={0}
        Y1={80}
        X2={160}
        Y2={10}
        Stroke={tokenColor('--accent-blue')}
        StrokeThickness={4}
        StrokeLineCap="Round"
        WidthRequest={170}
        HeightRequest={100}
      />
    </StackLayout>
  )
}
