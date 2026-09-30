import { useState } from 'react'
import { Label, Slider, StackLayout } from '@Fluid'

/**
 * `Slider` sample — a continuous value selector, using the controlled pattern: the app owns the
 * value and passes it back via `Value`, updating it from `onValueChanged`. Shows `Minimum`/
 * `Maximum`, `Step`, and the `MinimumTrackColor`/`MaximumTrackColor`/`ThumbColor` styling.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function SliderSample() {
  const [value, setValue] = useState(40)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="Slider — Value (controlled), onValueChanged, Step" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Slider
        Value={value}
        Minimum={0}
        Maximum={100}
        Step={5}
        onValueChanged={(next) => setValue(next)}
        MinimumTrackColor="var(--fluid-slider-thumb)"
        MaximumTrackColor="var(--card-border)"
        ThumbColor="var(--fluid-slider-thumb)"
      />
      <Label Text={`Value: ${value}`} FontSize="var(--text-md)" TextColor="var(--text)" />
    </StackLayout>
  )
}
