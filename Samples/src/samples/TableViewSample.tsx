import { useState } from 'react'
import { Label, StackLayout, SwitchCell, TableView, TableSection, TextCell, ViewCell } from '@Fluid'

/**
 * `TableView` sample — a grouped table for settings-style data, showing `Intent="Settings"` and
 * its cell vocabulary: `TableSection` (with `Title`), `TextCell` (`Text`/`Detail`), `ViewCell`
 * (arbitrary content), and the stateful `SwitchCell` (`On` + `onChanged`, controlled).
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function TableViewSample() {
  const [notifications, setNotifications] = useState(true)
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label Text="TableView — Intent=&quot;Settings&quot;, TableSection / TextCell / ViewCell / SwitchCell" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <TableView Intent="Settings" BackgroundColor="var(--card-border)">
        <TableSection Title="General">
          <TextCell Text="Language" Detail="English" />
          <TextCell Text="Region" Detail="Portugal" />
        </TableSection>
        <TableSection Title="Alerts">
          <SwitchCell Text="Push notifications" On={notifications} onChanged={(value) => setNotifications(value)} />
          <ViewCell>
            <StackLayout Orientation="Horizontal" Spacing={8} style={{ alignItems: 'center' }}>
              <Label Text="Sound: " FontSize="var(--text-base)" TextColor="var(--text-muted)" />
              <Label Text="Chime" FontSize="var(--text-base)" TextColor="var(--text)" />
            </StackLayout>
          </ViewCell>
        </TableSection>
      </TableView>
      <Label Text={`Push notifications: ${notifications ? 'on' : 'off'}`} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
