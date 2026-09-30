import { Label, Rectangle, StackLayout } from '@Fluid'
import { tokenColor } from './token'

/**
 * `Rectangle` sample — a rectangle filling its layout box, showing `Fill`, `RadiusX`/`RadiusY`
 * (independent corner radii), and `WidthRequest`/`HeightRequest`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function RectangleSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16} style={{ alignItems: 'center' }}>
      <Label Text="Rectangle — Fill, RadiusX / RadiusY, Width/HeightRequest" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Rectangle
        Fill={tokenColor('--primary-action-bg')}
        RadiusX={24}
        RadiusY={12}
        WidthRequest={160}
        HeightRequest={90}
      />
    </StackLayout>
  )
}
