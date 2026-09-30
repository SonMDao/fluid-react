import { useState } from 'react'
import { CheckBox, Label, StackLayout } from '@Fluid'

/**
 * `CheckBox` sample — a boolean check, using the controlled pattern: the app owns the boolean and
 * passes it back via `IsChecked`, updating it from `onCheckedChanged`. Shows the `Color` styling.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function CheckBoxSample() {
  const [checked, setChecked] = useState(true)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="CheckBox — IsChecked (controlled), onCheckedChanged" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <StackLayout Orientation="Horizontal" Spacing={12} style={{ alignItems: 'center' }}>
        <CheckBox IsChecked={checked} onCheckedChanged={(value) => setChecked(value)} Color="var(--accent-blue)" />
        <Label Text={checked ? 'Checked' : 'Unchecked'} FontSize="var(--text-md)" TextColor="var(--text)" />
      </StackLayout>
    </StackLayout>
  )
}
