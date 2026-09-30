import { useState } from 'react'
import { Button, HorizontalStackLayout, Label, StackLayout } from '@Fluid'

/**
 * `Button` sample — the primary action control. Demonstrates `Text`, `Command` (the tap binding),
 * `CornerRadius`, `BorderColor`/`BorderWidth`, `Padding`, `IsEnabled`, and a `Command` that updates
 * app state — a counter proving the `Command` fires.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ButtonSample() {
  const [count, setCount] = useState(0)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="Button — Text, Command, CornerRadius, Border, IsEnabled" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <HorizontalStackLayout Spacing={12}>
        <Button Text="Default" Padding={12} />
        <Button
          Text={`Clicked ${count}×`}
          Command={() => setCount((c) => c + 1)}
          BackgroundColor="var(--accent-blue)"
          TextColor="var(--fluid-switch-thumb)"
          CornerRadius={8}
          Padding={12}
        />
        <Button
          Text="Disabled"
          IsEnabled={false}
          BorderColor="var(--navbar-btn-border)"
          BorderWidth={1}
          CornerRadius={4}
          Padding={12}
        />
      </HorizontalStackLayout>
    </StackLayout>
  )
}
