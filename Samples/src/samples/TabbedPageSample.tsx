import { useState } from 'react'
import { Label, StackLayout, TabbedPage } from '@Fluid'

/**
 * `TabbedPage` sample — a tabbed container over `Pages`, using the controlled pattern: the app owns
 * `SelectedIndex` and drives it back from `onSelectedIndexChanged`. Shows `Pages` (`{ Title,
 * content }`), the bar/selected/unselected colour tokens, and `TabPlacement="Top"`. Fills the right
 * pane's height so the tab bar sits at the top of the content area.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function TabbedPageSample() {
  const [index, setIndex] = useState(0)
  return (
    <StackLayout Orientation="Vertical" Spacing={10} Padding={16} HeightRequest="100%">
      <Label Text="TabbedPage — Pages, SelectedIndex (controlled), TabPlacement=&quot;Top&quot;" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <TabbedPage
        Pages={[
          { Title: 'Home', content: <Label Text="Home tab content" FontSize="var(--text-md)" TextColor="var(--text)" Padding={12} /> },
          { Title: 'Search', content: <Label Text="Search tab content" FontSize="var(--text-md)" TextColor="var(--text)" Padding={12} /> },
          { Title: 'Settings', content: <Label Text="Settings tab content" FontSize="var(--text-md)" TextColor="var(--text)" Padding={12} /> },
        ]}
        SelectedIndex={index}
        onSelectedIndexChanged={(next) => setIndex(next)}
        BarBackgroundColor="var(--card-border)"
        BarTextColor="var(--text)"
        SelectedTabColor="var(--accent-blue)"
        UnselectedTabColor="var(--text-muted)"
        TabPlacement="Top"
      />
      <Label Text={`Selected index: ${index}`} FontSize="var(--text-base)" TextColor="var(--text)" />
    </StackLayout>
  )
}
