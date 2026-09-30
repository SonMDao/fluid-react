import { useState } from 'react'
import { ImageButton, Label, StackLayout } from '@Fluid'

/** A self-contained image resource (an inline SVG data URI) so the sample needs no asset files. */
const DEMO_ICON =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%3E%3Ccircle%20cx='24'%20cy='24'%20r='22'%20fill='%232563eb'/%3E%3Cpath%20d='M14%2024%20L21%2031%20L34%2017'%20stroke='%23fff'%20stroke-width='4'%20fill='none'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E"

/**
 * `ImageButton` sample — a tappable image button, showing `Source`, `Aspect`, `CornerRadius`,
 * `BorderColor`/`BorderWidth`, `AutomationName` (the accessible label), and `Command` (the tap
 * binding) driving a click counter.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ImageButtonSample() {
  const [clicks, setClicks] = useState(0)
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="ImageButton — Source, Command, CornerRadius, AutomationName" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <StackLayout Orientation="Horizontal" Spacing={16} style={{ alignItems: 'center' }}>
        <ImageButton
          Source={DEMO_ICON}
          Command={() => setClicks((c) => c + 1)}
          Aspect="AspectFit"
          CornerRadius={10}
          BorderColor="var(--navbar-btn-border)"
          BorderWidth={1}
          AutomationName="Confirm"
          WidthRequest={48}
          HeightRequest={48}
        />
        <Label Text={`Tapped ${clicks}×`} FontSize="var(--text-md)" TextColor="var(--text)" />
      </StackLayout>
    </StackLayout>
  )
}
