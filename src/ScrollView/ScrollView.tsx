import { forwardRef, type CSSProperties, type UIEventHandler } from 'react'
import { cx, interactionAttrs, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Makes oversized content scrollable.
 *
 * | native | here |
 * | --- | --- |
 * | `Orientation` (`Vertical`/`Horizontal`/`Both`/`Neither`) | `Orientation` |
 * | `Content` | `Content` or `children` |
 * | `Scrolled` event / `ScrollToAsync` | `onScroll` + a forwarded ref to the scroll element |
 *
 * `HorizontalScrollBarVisibility` / `VerticalScrollBarVisibility` accept `Default`/`Always`/`Never`.
 */
export type ScrollOrientation = 'Vertical' | 'Horizontal' | 'Both' | 'Neither'
export type ScrollBarVisibility = 'Default' | 'Always' | 'Never'

export interface ScrollViewProps extends ViewProps {
  Orientation?: ScrollOrientation
  Content?: React.ReactNode
  HorizontalScrollBarVisibility?: ScrollBarVisibility
  VerticalScrollBarVisibility?: ScrollBarVisibility
  onScroll?: UIEventHandler<HTMLDivElement>
}

function overflow(enabled: boolean, visibility?: ScrollBarVisibility): CSSProperties['overflowX'] {
  if (!enabled) return 'hidden'
  if (visibility === 'Never') return 'scroll'
  return 'auto'
}

const ScrollView = forwardRef<HTMLDivElement, ScrollViewProps>(function ScrollView(props, ref) {
  const {
    Orientation: orientation = 'Vertical',
    Content,
    HorizontalScrollBarVisibility,
    VerticalScrollBarVisibility,
    onScroll,
    className,
    children,
    ...view
  } = props

  const horizontal = orientation === 'Horizontal' || orientation === 'Both'
  const vertical = orientation === 'Vertical' || orientation === 'Both'

  const style: CSSProperties = {
    overflowX: overflow(horizontal, HorizontalScrollBarVisibility),
    overflowY: overflow(vertical, VerticalScrollBarVisibility),
    ...(VerticalScrollBarVisibility === 'Never' || HorizontalScrollBarVisibility === 'Never'
      ? { scrollbarWidth: 'none' }
      : null),
    ...viewStyle(view as ViewProps),
  }

  return (
    <div
      className={cx('fluid-scrollview', className)}
      style={style}
      onScroll={onScroll}
      onClick={view.onClick}
      ref={ref}
      {...interactionAttrs(view)}
      {...xNameAttr(view)}
    >
      {Content ?? children}
    </div>
  )
})

export default ScrollView
