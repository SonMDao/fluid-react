import { useEffect, useRef, type ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A swipeable, one-item-at-a-time carousel.
 *
 * | native | here |
 * | --- | --- |
 * | `ItemsSource` | `ItemsSource` |
 * | `ItemTemplate` | `ItemTemplate` — `(item, index) => ReactNode` |
 * | `Position` | `Position` (controlled — scrolls the strip to that index) |
 * | `PositionChanged` | `onPositionChanged(index)` (fired on scroll-snap) |
 * | `CurrentItem` / `CurrentItemChanged` | `onCurrentItemChanged(item)` |
 * | `IsSwipeEnabled` | `IsSwipeEnabled` |
 * | `PeekAreaInsets` | `PeekAreaInsets` (px of the neighbouring item left visible) |
 */
export interface CarouselViewProps<T = unknown> extends ViewProps {
  ItemsSource: readonly T[]
  ItemTemplate: (item: T, index: number) => ReactNode
  Position?: number
  onPositionChanged?: (index: number) => void
  onCurrentItemChanged?: (item: T) => void
  IsSwipeEnabled?: boolean
  PeekAreaInsets?: number
}

export default function CarouselView<T>(props: CarouselViewProps<T>) {
  const {
    ItemsSource,
    ItemTemplate,
    Position = 0,
    onPositionChanged,
    onCurrentItemChanged,
    IsSwipeEnabled = true,
    PeekAreaInsets = 0,
    className,
    ...view
  } = props

  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const child = track.children[Position] as HTMLElement | undefined
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [Position])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const index = Math.round(track.scrollLeft / (track.clientWidth - PeekAreaInsets * 2))
    if (index !== Position) {
      onPositionChanged?.(index)
      if (ItemsSource[index] !== undefined) onCurrentItemChanged?.(ItemsSource[index])
    }
  }

  return (
    <div
      ref={trackRef}
      className={cx('fluid-carouselview', !IsSwipeEnabled && 'fluid-carouselview-locked', className)}
      style={{ paddingInline: PeekAreaInsets ? `${PeekAreaInsets}px` : undefined, ...viewStyle(view as ViewProps) }}
      onScroll={handleScroll}
      {...xNameAttr(view)}
    >
      {ItemsSource.map((item, index) => (
        <div key={index} className="fluid-carouselview-item">
          {ItemTemplate(item, index)}
        </div>
      ))}
    </div>
  )
}
