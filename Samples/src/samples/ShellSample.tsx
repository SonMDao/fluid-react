import { useState } from 'react'
import { Label, Shell, StackLayout } from '@Fluid'

const ROUTES = [
  { route: 'feed', title: 'Feed' },
  { route: 'messages', title: 'Messages' },
  { route: 'profile', title: 'Profile' },
] as const

/**
 * `Shell` sample — an app shell with a flyout of `Items`, using the controlled pattern: the app
 * owns `CurrentRoute` and drives it back from `onRouteChanged`. Shows `FlyoutHeader`/`FlyoutFooter`
 * and the shell's own flyout toggle. Fills the right pane's height.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ShellSample() {
  const [route, setRoute] = useState<string>('feed')
  return (
    <Shell
      Items={ROUTES.map((item) => ({
        Title: item.title,
        Route: item.route,
        content: (
          <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
            <Label Text={item.title} FontAttributes="Bold" FontSize="var(--text-md)" TextColor="var(--text)" />
            <Label Text={`Route: ${item.route}`} FontSize="var(--text-base)" TextColor="var(--text-muted)" />
          </StackLayout>
        ),
      }))}
      CurrentRoute={route}
      onRouteChanged={(next) => setRoute(next)}
      FlyoutHeader={<Label Text="FluidReact" FontAttributes="Bold" FontSize="var(--text-md)" TextColor="var(--text)" Padding={8} />}
      FlyoutFooter={<Label Text={`Route: ${route}`} FontSize="var(--text-sm)" TextColor="var(--text-muted)" Padding={8} />}
      FlyoutBackgroundColor="var(--card-border)"
      FlyoutWidth={240}
      HeightRequest="100%"
    />
  )
}
