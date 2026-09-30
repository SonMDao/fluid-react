import { useState } from 'react'
import { Entry, Label, StackLayout } from '@Fluid'

/**
 * `Entry` sample — single-line text input, using the controlled pattern: the app owns the value and
 * passes it back via `Text`, updating it from `onTextChanged`. Shows `Placeholder`, `PlaceholderColor`,
 * `MaxLength`, and a `Keyboard` hint.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function EntrySample() {
  const [text, setText] = useState('')
  return (
    <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
      <Label Text="Entry — Text + onTextChanged (controlled), Placeholder, MaxLength" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Entry
        Text={text}
        onTextChanged={(value) => setText(value)}
        Placeholder="Type here…"
        PlaceholderColor="var(--fluid-placeholder)"
        MaxLength={40}
        Keyboard="Text"
      />
      <Label
        Text={text ? `Value: “${text}”` : 'Value: (empty)'}
        FontSize="var(--text-base)"
        TextColor="var(--text)"
      />
    </StackLayout>
  )
}
