import { useState } from 'react'
import { BoxView, CollectionView, Label, StackLayout } from '@Fluid'

const FRUIT = [
  { id: 'apple', name: 'Apple', color: 'var(--accent-blue)' },
  { id: 'plum', name: 'Plum', color: 'var(--primary-action-bg)' },
  { id: 'lemon', name: 'Lemon', color: 'var(--navbar-btn-border)' },
  { id: 'lime', name: 'Lime', color: 'var(--fluid-progress-color)' },
] as const

/**
 * `CollectionView` sample — a virtualized item list over `ItemsSource`/`ItemTemplate`, using the
 * controlled selection pattern: `SelectionMode="Single"`, the app owns `SelectedItem` and drives it
 * back from `onSelectionChanged`. Shows `ItemsLayout` (span-2 grid), `ItemSpacing`, and `Header`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function CollectionViewSample() {
  const [selected, setSelected] = useState<(typeof FRUIT)[number] | undefined>(FRUIT[0])
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label Text="CollectionView — ItemsSource, ItemTemplate, SelectionMode=&quot;Single&quot; (controlled)" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <CollectionView
        ItemsSource={FRUIT}
        KeySelector={(fruit) => fruit.id}
        ItemTemplate={(fruit) => (
          <StackLayout Orientation="Vertical" Spacing={8} Padding={14} style={{ alignItems: 'center' }}>
            <BoxView Color={fruit.color} CornerRadius={8} WidthRequest={44} HeightRequest={44} />
            <Label Text={fruit.name} FontSize="var(--text-base)" TextColor="var(--text)" />
          </StackLayout>
        )}
        SelectionMode="Single"
        SelectedItem={selected}
        onSelectionChanged={(selection) => {
          if (selection != null && !Array.isArray(selection)) setSelected(selection)
        }}
        ItemsLayout={{ Orientation: 'Vertical', Span: 2 }}
        ItemSpacing={10}
        Header={<Label Text="Fruits" FontAttributes="Bold" FontSize="var(--text-md)" TextColor="var(--text)" Padding={4} />}
        HeightRequest={220}
      />
      <Label Text={selected ? `Selected: ${selected.name}` : 'Selected: (none)'} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
