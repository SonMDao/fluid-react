import { useState } from 'react'
import { Button, HorizontalStackLayout, IndicatorView, Label, StackLayout } from '@Fluid'

/**
 * `IndicatorView` sample — a page-position indicator, using the controlled pattern: the app owns
 * `Position` (with `Count`) and drives it back from `onPositionChanged`. Shows `IndicatorColor`/
 * `SelectedIndicatorColor`, `IndicatorsShape`, and `IndicatorSize`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function IndicatorViewSample() {
  const [position, setPosition] = useState(0)
  const [square, setSquare] = useState(false)
  const count = 4
  return (
    <StackLayout Orientation="Vertical" Spacing={16} Padding={16}>
      <Label Text="IndicatorView — Count, Position (controlled), IndicatorsShape" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <IndicatorView
        Count={count}
        Position={position}
        onPositionChanged={(index) => setPosition(index)}
        IndicatorColor="var(--card-border)"
        SelectedIndicatorColor="var(--accent-blue)"
        IndicatorsShape={square ? 'Square' : 'Circle'}
        IndicatorSize={10}
      />
      <HorizontalStackLayout Spacing={10}>
        <Button Text="◀ Prev" Command={() => setPosition((p) => Math.max(0, p - 1))} Padding={10} />
        <Button Text="Next ▶" Command={() => setPosition((p) => Math.min(count - 1, p + 1))} Padding={10} />
        <Button Text={`Shape: ${square ? 'Square' : 'Circle'}`} Command={() => setSquare((s) => !s)} Padding={10} />
      </HorizontalStackLayout>
      <Label Text={`Position: ${position} of ${count - 1}`} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
