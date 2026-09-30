import { BoxView, FlexLayout, Label, StackLayout } from '@Fluid'

/**
 * `FlexLayout` sample — a row-direction flex container with `JustifyContent="SpaceBetween"` and
 * `AlignItems="Center"`. Two plain children take their natural size while a `<FlexLayout.Item>`
 * grows to fill the remaining space, demonstrating the item-level `Grow` prop.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function FlexLayoutSample() {
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={12}>
      <Label Text="FlexLayout — Direction=&quot;Row&quot;, JustifyContent=&quot;SpaceBetween&quot;" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <FlexLayout Direction="Row" JustifyContent="SpaceBetween" AlignItems="Center" HeightRequest={64} Padding={8} BackgroundColor="var(--card-border)">
        <BoxView Color="var(--accent-blue)" CornerRadius={6} WidthRequest={48} HeightRequest={32} />
        <FlexLayout.Item Grow={1}>
          <BoxView Color="var(--primary-action-bg)" CornerRadius={6} HeightRequest={32} Margin={{ left: 12, right: 12 }} />
        </FlexLayout.Item>
        <BoxView Color="var(--accent-blue)" CornerRadius={6} WidthRequest={48} HeightRequest={32} />
      </FlexLayout>
    </StackLayout>
  )
}
