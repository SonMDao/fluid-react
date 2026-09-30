import { Label, Path, StackLayout } from '@Fluid'
import { tokenColor } from './token'

/**
 * `Path` sample — a vector shape drawn from path data, showing `Data` (SVG path mini-language),
 * `Fill`, `Stroke`/`StrokeThickness`, and `StrokeLineCap`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function PathSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16} style={{ alignItems: 'center' }}>
      <Label Text="Path — Data (SVG path syntax), Fill, Stroke, StrokeLineCap" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Path
        Data="M 10 90 C 40 10, 70 130, 95 50 S 130 90, 150 30"
        Fill="none"
        Stroke={tokenColor('--accent-blue')}
        StrokeThickness={4}
        StrokeLineCap="Round"
        WidthRequest={170}
        HeightRequest={120}
      />
    </StackLayout>
  )
}
