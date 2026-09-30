import { SwipeView, Label, StackLayout } from '@Fluid'

/**
 * `SwipeView` sample — a swipable content row with `LeftItems`/`RightItems` actions, showing
 * `Threshold`, `onOpen`/`onClose`, and the per-action `BackgroundColor`/`TextColor`/`Command`.
 * (On desktop the actions render alongside the content; on touch they reveal on swipe.)
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function SwipeViewSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={14} Padding={16}>
      <Label Text="SwipeView — LeftItems / RightItems, Threshold, onOpen / onClose" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <SwipeView
        LeftItems={[{ Text: 'Archive', BackgroundColor: 'var(--navbar-btn-border)', TextColor: 'var(--text)', Command: () => undefined }]}
        RightItems={[
          { Text: 'Share', BackgroundColor: 'var(--accent-blue)', TextColor: 'var(--fluid-switch-thumb)', Command: () => undefined },
          { Text: 'Delete', BackgroundColor: 'var(--primary-action-bg)', TextColor: 'var(--fluid-switch-thumb)', Command: () => undefined },
        ]}
        Threshold={40}
        onOpen={() => undefined}
        onClose={() => undefined}
      >
        <StackLayout Orientation="Horizontal" Spacing={10} Padding={12} style={{ alignItems: 'center' }}>
          <Label Text="A message row" FontSize="var(--text-md)" TextColor="var(--text)" />
          <Label Text="Swipe to reveal actions" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
        </StackLayout>
      </SwipeView>
    </StackLayout>
  )
}
