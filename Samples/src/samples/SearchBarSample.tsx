import { useState } from 'react'
import { Label, SearchBar, StackLayout } from '@Fluid'

/**
 * `SearchBar` sample — the search field, using the controlled pattern (`Text` + `onTextChanged`).
 * Shows `Placeholder`, `SearchCommand` (fires on submit), and `CancelButtonColor`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function SearchBarSample() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)
  return (
    <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
      <Label Text="SearchBar — Text + onTextChanged, SearchCommand on submit" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <SearchBar
        Text={query}
        onTextChanged={(value) => setQuery(value)}
        Placeholder="Search the control set"
        SearchCommand={(value) => setSubmitted(value ?? query)}
        CancelButtonColor="var(--fluid-cancel)"
      />
      <Label
        Text={submitted != null ? `Submitted: “${submitted}”` : 'Type and press Enter to submit'}
        FontSize="var(--text-base)"
        TextColor="var(--text)"
      />
    </StackLayout>
  )
}
