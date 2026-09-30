import { Label, StackLayout } from '@Fluid'

/**
 * `Label` sample — the text control, shown across its key text properties: `FontSize`,
 * `FontAttributes` (Bold / Italic), `TextColor` (tokens), and `HorizontalTextAlignment`.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function LabelSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={10} Padding={16}>
      <Label Text="Bold — FontSize 16 (var --text-header)" FontAttributes="Bold" FontSize="var(--text-header)" TextColor="var(--text)" />
      <Label Text="Italic — FontSize 14 (var --text-base)" FontAttributes="Italic" FontSize="var(--text-base)" TextColor="var(--text)" />
      <Label Text="Accent — TextColor var(--accent-blue)" FontSize="var(--text-md)" TextColor="var(--accent-blue)" />
      <Label Text="Muted — TextColor var(--text-muted)" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <StackLayout Orientation="Horizontal" Spacing={8} Padding={12} BackgroundColor="var(--card-border)">
        <Label Text="Start" FontSize="var(--text-sm)" TextColor="var(--text)" HorizontalTextAlignment="Start" />
        <Label Text="Center" FontSize="var(--text-sm)" TextColor="var(--text)" HorizontalTextAlignment="Center" />
        <Label Text="End" FontSize="var(--text-sm)" TextColor="var(--text)" HorizontalTextAlignment="End" />
      </StackLayout>
    </StackLayout>
  )
}
