import { useState } from 'react'
import { Editor, Label, StackLayout } from '@Fluid'

/**
 * `Editor` sample — multi-line text input, using the controlled pattern (`Text` + `onTextChanged`).
 * Shows `Placeholder`, `PlaceholderColor`, `AutoSize="TextChanges"` with `AutoSizeMin`/`AutoSizeMax`
 * bounds, and `IsReadOnly`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function EditorSample() {
  const [text, setText] = useState('A multi-line editor.\nIt grows with its content (AutoSize="TextChanges").')
  return (
    <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
      <Label Text="Editor — Text + onTextChanged (controlled), AutoSize, IsReadOnly" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <Editor
        Text={text}
        onTextChanged={(value) => setText(value)}
        AutoSize="TextChanges"
        AutoSizeMin={60}
        AutoSizeMax={160}
      />
      <Editor
        Text="Read-only — IsReadOnly=true"
        Placeholder="Edit to change me"
        PlaceholderColor="var(--fluid-placeholder)"
        IsReadOnly
      />
    </StackLayout>
  )
}
