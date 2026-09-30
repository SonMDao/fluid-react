import { useState } from 'react'
import { DatePicker, Label, StackLayout } from '@Fluid'

/**
 * `DatePicker` sample — a date field, using the controlled pattern: the app owns the date and
 * passes it back via `Date`, updating it from `onDateSelected`. Shows `MinimumDate`/`MaximumDate`
 * bounds and a `Format` hint.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function DatePickerSample() {
  const [date, setDate] = useState(new Date())
  return (
    <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
      <Label Text="DatePicker — Date (controlled), MinimumDate, MaximumDate" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <DatePicker
        Date={date}
        onDateSelected={(value) => setDate(value)}
        MinimumDate={new Date(2020, 0, 1)}
        MaximumDate={new Date(2030, 11, 31)}
      />
      <Label Text={`Selected: ${date.toISOString().slice(0, 10)}`} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
