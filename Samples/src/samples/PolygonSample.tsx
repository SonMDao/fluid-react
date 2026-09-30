import { Label, Polygon, StackLayout } from '@Fluid'
import { tokenColor } from './token'

/**
 * `Polygon` sample — a closed shape from a list of points, showing `Points` (a `[x, y][]` array),
 * `Fill`, `Stroke`/`StrokeThickness`, and `FillRule`. Sized via `WidthRequest`/`HeightRequest`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function PolygonSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16} style={{ alignItems: 'center' }}>
      <Label Text="Polygon — Points, Fill, Stroke, StrokeThickness, FillRule" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Polygon
        Points={[
          [50, 0],
          [100, 40],
          [80, 100],
          [20, 100],
          [0, 40],
        ]}
        Fill={tokenColor('--accent-blue')}
        Stroke={tokenColor('--primary-action-bg')}
        StrokeThickness={3}
        FillRule="Nonzero"
        WidthRequest={120}
        HeightRequest={120}
      />
    </StackLayout>
  )
}
