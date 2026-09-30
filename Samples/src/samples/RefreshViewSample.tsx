import { useState } from 'react'
import { Button, Label, RefreshView, StackLayout } from '@Fluid'

/**
 * `RefreshView` sample — a pull-to-refresh wrapper, shown with its `IsRefreshing` state toggled by a
 * `Button` (the native pull gesture needs touch, so on desktop the `IsRefreshing`/`Command` pair is
 * driven explicitly). Shows `RefreshColor`, `Command`, and `PullThreshold`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function RefreshViewSample() {
  const [refreshing, setRefreshing] = useState(false)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="RefreshView — IsRefreshing, Command, RefreshColor (touch pull on mobile)" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <RefreshView
        IsRefreshing={refreshing}
        Command={() => setRefreshing(false)}
        RefreshColor="var(--accent-blue)"
        PullThreshold={64}
      >
        <StackLayout Orientation="Vertical" Spacing={8} Padding={12}>
          <Label Text="Content that refreshes" FontSize="var(--text-md)" TextColor="var(--text)" />
          <Label Text={refreshing ? 'Refreshing…' : 'Ready to refresh'} FontSize="var(--text-base)" TextColor="var(--text-muted)" />
        </StackLayout>
      </RefreshView>
      <Button Text={refreshing ? 'Stop' : 'Start refresh'} Command={() => setRefreshing((r) => !r)} Padding={10} />
    </StackLayout>
  )
}
