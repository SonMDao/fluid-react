import { useState } from 'react'
import { BoxView, CarouselView, IndicatorView, Label, StackLayout } from '@Fluid'

const SLIDES = [
  { id: 0, caption: 'Slide 1 — accent-blue', color: 'var(--accent-blue)' },
  { id: 1, caption: 'Slide 2 — primary-action-bg', color: 'var(--primary-action-bg)' },
  { id: 2, caption: 'Slide 3 — navbar-btn-border', color: 'var(--navbar-btn-border)' },
] as const

/**
 * `CarouselView` sample — a paged, swipeable list over `ItemsSource`/`ItemTemplate`, using the
 * controlled pattern: the app owns `Position` and drives it back from `onPositionChanged`. Paired
 * with an `IndicatorView` (same `Count`/`Position`) to show the current page.
 *
 * @remarks Referenced by: the sample registry (`src/samples/index.ts`), rendered in the right pane.
 */
export default function CarouselViewSample() {
  const [position, setPosition] = useState(0)
  return (
    <StackLayout Orientation="Vertical" Spacing={12} Padding={16}>
      <Label Text="CarouselView — ItemsSource, ItemTemplate, Position (controlled)" FontSize="var(--text-sm)" TextColor="var(--text-muted)" />
      <CarouselView
        ItemsSource={SLIDES}
        ItemTemplate={(slide) => (
          <StackLayout Orientation="Vertical" Spacing={8} Padding={20} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <BoxView Color={slide.color} CornerRadius={8} WidthRequest={140} HeightRequest={72} />
            <Label Text={slide.caption} FontSize="var(--text-base)" TextColor="var(--text)" />
          </StackLayout>
        )}
        Position={position}
        onPositionChanged={(index) => setPosition(index)}
        IsSwipeEnabled
        HeightRequest={180}
      />
      <StackLayout Orientation="Horizontal" Spacing={10} style={{ alignItems: 'center' }}>
        <IndicatorView Count={SLIDES.length} Position={position} onPositionChanged={(index) => setPosition(index)} IndicatorColor="var(--card-border)" SelectedIndicatorColor="var(--accent-blue)" />
        <Label Text={`Position: ${position}`} FontSize="var(--text-base)" TextColor="var(--text)" />
      </StackLayout>
    </StackLayout>
  )
}
