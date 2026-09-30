import { useState } from 'react'
import { Button, Label, NavigationPage, StackLayout } from '@Fluid'

/**
 * `NavigationPage` sample — a navigation container with a bar: `Title`, `BarBackgroundColor`/
 * `BarTextColor`, and an `onBack` handler (which also enables the back button). Fills the right
 * pane's height.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function NavigationPageSample() {
  const [backTaps, setBackTaps] = useState(0)
  return (
    <NavigationPage
      Title="Inbox"
      BarBackgroundColor="var(--card-border)"
      BarTextColor="var(--text)"
      onBack={() => setBackTaps((t) => t + 1)}
      HeightRequest="100%"
    >
      <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
        <Label Text="NavigationPage — Title, bar colours, onBack" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
        <Label Text="Pushed page content." FontSize="var(--text-md)" TextColor="var(--text)" />
        <Button Text={`Go back (${backTaps})`} Command={() => setBackTaps((t) => t + 1)} Padding={10} />
      </StackLayout>
    </NavigationPage>
  )
}
