import { useState } from 'react'
import { Label, Picker, StackLayout } from '@Fluid'

const CITIES = ['Lisbon', 'Lyon', 'Oslo', 'Paris', 'Rome', 'Seville', 'Vienna'] as const

/**
 * `Picker` sample — a single-select dropdown over `ItemsSource`, using the controlled pattern:
 * the app owns the selected item and passes it back via `SelectedItem`, updating it from
 * `onSelectedIndexChanged`. Shows `ItemsSource`, `ItemDisplay`, `SelectedItem`, and `Title`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function PickerSample() {
  const [selected, setSelected] = useState<string>('Lisbon')
  return (
    <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
      <Label Text="Picker — ItemsSource, ItemDisplay, SelectedItem (controlled)" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Picker
        ItemsSource={CITIES}
        ItemDisplay={(city) => city}
        SelectedItem={selected}
        onSelectedIndexChanged={(_index, city) => city != null && setSelected(city)}
        Title="Capital city"
      />
      <Label Text={`Selected: ${selected}`} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
