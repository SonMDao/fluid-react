import { Label, ScrollView, StackLayout } from '@Fluid'

/**
 * `ScrollView` sample — a vertically scrollable region with a fixed `HeightRequest` (160) that is
 * smaller than its content, so the row of 20 labels overflows and scrolls. Demonstrates the
 * `Orientation="Vertical"` default and the `Content`/children slot.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function ScrollViewSample() {
  const rows = Array.from({ length: 20 }, (_, i) => i + 1)
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={12}>
      <Label Text="ScrollView — HeightRequest=160, 20 rows of content" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <ScrollView Orientation="Vertical" HeightRequest={160} BackgroundColor="var(--card-border)" Padding={8}>
        <StackLayout Orientation="Vertical" Spacing={6}>
          {rows.map((n) => (
            <Label key={n} Text={`Row ${String(n).padStart(2, '0')} of 20`} FontSize="var(--text-base)" TextColor="var(--text)" />
          ))}
        </StackLayout>
      </ScrollView>
    </StackLayout>
  )
}
