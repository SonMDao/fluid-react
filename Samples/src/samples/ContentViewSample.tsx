import { ContentView, Label, StackLayout } from '@Fluid'

/**
 * `ContentView` sample — the single-child base container, shown with a `Padding` and
 * `BackgroundColor` around one piece of content. The base for building custom controls.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ContentViewSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={12}>
      <Label Text="ContentView — Padding + BackgroundColor around one child" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <ContentView Padding={20} BackgroundColor="var(--card-border)">
        <Label Text="Single content child" FontSize="var(--text-md)" TextColor="var(--text)" HorizontalTextAlignment="Center" />
      </ContentView>
    </StackLayout>
  )
}
