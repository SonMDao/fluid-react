import { Label, Splitter, StackLayout } from '@Fluid'

/**
 * `Splitter` sample — a draggable, resizable divider between two panes, `orientation="horizontal"`
 * (side by side). `initialRatio` gives the starting 40/60 split as a fraction of the measured
 * container (not a pixel value), and the `minFirstSize`/`minSecondSize` clamps keep both panes
 * usable. Dragging the handle persists for the life of the page — it does not reset when you
 * re-select this sample, because the Splitter itself is not re-mounted.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function SplitterSample() {
  return (
    <Splitter
      orientation="horizontal"
      initialRatio={0.4}
      minFirstSize={120}
      minSecondSize={120}
      firstPane={
        <StackLayout Orientation="Vertical" Spacing={8} Padding={16}>
          <Label Text="First pane" FontSize="var(--text-md)" FontAttributes="Bold" TextColor="var(--text)" />
          <Label Text="Drag the handle to resize" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
        </StackLayout>
      }
      secondPane={
        <StackLayout Orientation="Vertical" Spacing={8} Padding={16}>
          <Label Text="Second pane" FontSize="var(--text-md)" FontAttributes="Bold" TextColor="var(--text)" />
          <Label Text="orientation=&quot;horizontal&quot;, initialRatio=0.4" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
        </StackLayout>
      }
    />
  )
}
