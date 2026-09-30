import { useState } from 'react'
import { Label, StackLayout, TimePicker } from '@Fluid'

/**
 * `TimePicker` sample — a time field, using the controlled pattern: the app owns the time string and
 * passes it back via `Time`, updating it from `onTimeSelected`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function TimePickerSample() {
  const [time, setTime] = useState('09:30')
  return (
    <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
      <Label Text="TimePicker — Time (controlled), onTimeSelected" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <TimePicker Time={time} onTimeSelected={(value) => setTime(value)} />
      <Label Text={`Selected: ${time}`} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
