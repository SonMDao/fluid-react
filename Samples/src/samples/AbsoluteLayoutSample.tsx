import { AbsoluteLayout, BoxView, Label, StackLayout } from '@Fluid'

/**
 * `AbsoluteLayout` sample — children positioned by explicit `[x, y, width, height]`
 * `LayoutBounds` on `<AbsoluteLayout.Child>` rather than by flow. The two shapes overlap to show
 * that bounds are measured from the layout's top-left corner.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function AbsoluteLayoutSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={12}>
      <Label Text="AbsoluteLayout — children placed by LayoutBounds [x, y, width, height]" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <AbsoluteLayout HeightRequest={140} BackgroundColor="var(--card-border)">
        <AbsoluteLayout.Child LayoutBounds={[12, 12, 96, 64]}>
          <BoxView Color="var(--accent-blue)" CornerRadius={8} />
        </AbsoluteLayout.Child>
        <AbsoluteLayout.Child LayoutBounds={[120, 52, 96, 64]}>
          <BoxView Color="var(--primary-action-bg)" CornerRadius={8} />
        </AbsoluteLayout.Child>
      </AbsoluteLayout>
    </StackLayout>
  )
}
