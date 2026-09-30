import { useState } from 'react'
import { ActivityIndicator, Button, HorizontalStackLayout, Label, StackLayout } from '@Fluid'

/**
 * `ActivityIndicator` sample — a loading spinner, showing `IsRunning` (toggled by a `Button`,
 * proving the control mounts/unmounts with it) and `Color`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ActivityIndicatorSample() {
  const [running, setRunning] = useState(true)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="ActivityIndicator — IsRunning, Color" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <HorizontalStackLayout Spacing={16} style={{ alignItems: 'center' }}>
        <ActivityIndicator IsRunning={running} Color="var(--accent-blue)" />
        <Label Text={running ? 'Running' : 'Stopped'} FontSize="var(--text-md)" TextColor="var(--text)" />
        <Button Text={running ? 'Stop' : 'Start'} Command={() => setRunning((r) => !r)} Padding={8} />
      </HorizontalStackLayout>
    </StackLayout>
  )
}
