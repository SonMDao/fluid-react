import { useState } from 'react'
import { Label, StackLayout, Switch } from '@Fluid'

/**
 * `Switch` sample — the on/off toggle, using the controlled pattern: the app owns the boolean and
 * passes it back via `IsToggled`, updating it from `onToggled`. Shows the `OnColor`/`ThumbColor`
 * track/thumb styling.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function SwitchSample() {
  const [on, setOn] = useState(false)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="Switch — IsToggled (controlled), onToggled" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <StackLayout Orientation="Horizontal" Spacing={12} style={{ alignItems: 'center' }}>
        <Switch
          IsToggled={on}
          onToggled={(value) => setOn(value)}
          OnColor="var(--fluid-switch-on)"
          ThumbColor="var(--fluid-switch-thumb)"
        />
        <Label Text={on ? 'On' : 'Off'} FontSize="var(--text-md)" TextColor="var(--text)" />
      </StackLayout>
    </StackLayout>
  )
}
