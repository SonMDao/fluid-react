import { useState } from 'react'
import { Button, FlyoutPage, HorizontalStackLayout, Label, StackLayout } from '@Fluid'

const MENU = ['Home', 'Search', 'Library', 'Settings'] as const

/**
 * `FlyoutPage` sample — a slide-in menu over `Detail`, using the controlled pattern: the app owns
 * `IsPresented` and drives it back from `onIsPresentedChanged`. Shows `FlyoutLayoutBehavior`
 * (toggled between `Popover` and `Split`) and `FlyoutWidth`. Fills the right pane's height.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function FlyoutPageSample() {
  const [presented, setPresented] = useState(false)
  const [behavior, setBehavior] = useState<'Popover' | 'Split'>('Popover')
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16} HeightRequest="100%">
      <Label Text="FlyoutPage — Flyout, Detail, IsPresented (controlled), FlyoutLayoutBehavior" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <HorizontalStackLayout Spacing={10}>
        <Button Text={presented ? 'Hide flyout' : 'Show flyout'} Command={() => setPresented((p) => !p)} Padding={10} />
        <Button Text={`Layout: ${behavior}`} Command={() => setBehavior((b) => (b === 'Popover' ? 'Split' : 'Popover'))} Padding={10} />
      </HorizontalStackLayout>
      <FlyoutPage
        Flyout={
          <StackLayout Orientation="Vertical" Spacing={6} Padding={12} role="menu" aria-label="Flyout menu">
            {MENU.map((item) => (
              <Label
                key={item}
                Text={item}
                FontSize="var(--text-md)"
                TextColor="var(--text)"
                role="menuitem"
                tabIndex={0}
                style={{ display: 'block' }}
                onClick={() => setPresented(false)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setPresented(false)
                  }
                }}
              />
            ))}
          </StackLayout>
        }
        Detail={
          <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
            <Label Text="Detail (the main page)" FontSize="var(--text-md)" TextColor="var(--text)" />
            <Label Text="The flyout slides in over it." FontSize="var(--text-base)" TextColor="var(--text-muted)" />
          </StackLayout>
        }
        IsPresented={presented}
        onIsPresentedChanged={(value) => setPresented(value)}
        FlyoutLayoutBehavior={behavior}
        FlyoutWidth={240}
      />
    </StackLayout>
  )
}
