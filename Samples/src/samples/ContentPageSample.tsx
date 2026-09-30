import { useState } from 'react'
import { ContentPage, Label, StackLayout } from '@Fluid'

/**
 * `ContentPage` sample — the base page container: a `Title` bar, `ToolbarItems` (with `Command`s
 * and `Order`), and the page `Content`. Fills the right pane's height.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ContentPageSample() {
  const [taps, setTaps] = useState(0)
  return (
    <ContentPage
      Title="Profile"
      ToolbarItems={[
        { Text: 'Edit', Command: () => setTaps((t) => t + 1), Order: 'Primary' },
        { Text: 'Share', Order: 'Secondary' },
      ]}
      HeightRequest="100%"
    >
      <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
        <Label Text="ContentPage — Title, ToolbarItems, Content" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
        <Label Text="Page content lives here." FontSize="var(--text-md)" TextColor="var(--text)" />
        <Label Text={`“Edit” tapped ${taps}×`} FontSize="var(--text-base)" TextColor="var(--text)" />
      </StackLayout>
    </ContentPage>
  )
}
