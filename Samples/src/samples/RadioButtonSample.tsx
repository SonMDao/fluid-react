import { useState } from 'react'
import { Label, RadioButton, StackLayout } from '@Fluid'

const SIZES = ['Small', 'Medium', 'Large'] as const
type Size = (typeof SIZES)[number]

/**
 * `RadioButton` sample — mutually exclusive selection, using the controlled pattern: the app owns
 * which option is checked and drives each radio's `IsChecked` from it, updating from
 * `onCheckedChanged`. All three share a `GroupName` so the native semantics stay one group.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function RadioButtonSample() {
  const [size, setSize] = useState<Size>('Medium')
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label Text="RadioButton — IsChecked (controlled), GroupName, onCheckedChanged" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      {SIZES.map((option) => (
        <StackLayout key={option} Orientation="Horizontal" Spacing={12} style={{ alignItems: 'center' }}>
          <RadioButton
            IsChecked={size === option}
            onCheckedChanged={(checked) => {
              if (checked) setSize(option)
            }}
            GroupName="sample-size"
            Value={option}
          />
          <Label Text={option} FontSize="var(--text-md)" TextColor="var(--text)" />
        </StackLayout>
      ))}
      <Label Text={`Selected: ${size}`} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
