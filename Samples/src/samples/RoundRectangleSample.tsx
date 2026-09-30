import { Label, RoundRectangle, StackLayout } from '@Fluid'
import { tokenColor } from './token'

/**
 * `RoundRectangle` sample — a rectangle with independently roundable corners, showing
 * `CornerRadius` (a `[tl, tr, br, bl]` array for per-corner radii), `Fill`, and
 * `WidthRequest`/`HeightRequest`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function RoundRectangleSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16} style={{ alignItems: 'center' }}>
      <Label Text="RoundRectangle — CornerRadius [tl, tr, br, bl], Fill, Width/HeightRequest" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <RoundRectangle
        CornerRadius={[32, 8, 32, 8]}
        Fill={tokenColor('--accent-blue')}
        WidthRequest={160}
        HeightRequest={90}
      />
    </StackLayout>
  )
}
