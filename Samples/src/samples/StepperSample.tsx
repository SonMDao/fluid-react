import { useState } from 'react'
import { Label, StackLayout, Stepper } from '@Fluid'

/**
 * `Stepper` sample — a numeric +/- stepper, using the controlled pattern: the app owns the value and
 * passes it back via `Value`, updating it from `onValueChanged`. Shows `Minimum`/`Maximum` bounds
 * and `Increment`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function StepperSample() {
  const [value, setValue] = useState(5)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="Stepper — Value (controlled), onValueChanged, Increment" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <StackLayout Orientation="Horizontal" Spacing={16} style={{ alignItems: 'center' }}>
        <Stepper
          Value={value}
          Minimum={0}
          Maximum={10}
          Increment={1}
          onValueChanged={(next) => setValue(next)}
        />
        <Label Text={`Value: ${value}`} FontSize="var(--text-md)" TextColor="var(--text)" />
      </StackLayout>
    </StackLayout>
  )
}
