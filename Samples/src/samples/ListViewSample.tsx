import { useState } from 'react'
import { Label, ListView, StackLayout } from '@Fluid'

const TEAM = ['A. Almeida', 'B. Brandt', 'C. Costa', 'D. Duarte', 'E. Eriksson', 'F. Fontaine'] as const

/**
 * `ListView` sample — a simple row list over `ItemsSource`/`ItemTemplate`, using the controlled
 * selection pattern: the app owns `SelectedItem` and drives it back from `onItemTapped`. Shows
 * `RowHeight`, `SeparatorVisibility`/`SeparatorColor`, and `Footer`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ListViewSample() {
  const [selected, setSelected] = useState<(typeof TEAM)[number] | undefined>(undefined)
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label Text="ListView — ItemsSource, ItemTemplate, SelectedItem (controlled), onItemTapped" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <ListView
        ItemsSource={TEAM}
        ItemTemplate={(person) => (
          <Label Text={person} FontSize="var(--text-base)" TextColor="var(--text)" HorizontalTextAlignment="Start" />
        )}
        SelectedItem={selected}
        onItemTapped={(person) => setSelected(person)}
        RowHeight={44}
        SeparatorVisibility="Default"
        SeparatorColor="var(--fluid-separator)"
        Footer={<Label Text={`${TEAM.length} people`} FontSize="var(--text-sm)" TextColor="var(--text-muted)" Padding={6} />}
        HeightRequest={240}
      />
      <Label Text={selected ? `Selected: ${selected}` : 'Tap a row to select it'} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
