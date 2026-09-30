import { useRef, useState, type ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Wraps scrollable content to add pull-to-refresh.
 *
 * | native | here |
 * | --- | --- |
 * | `IsRefreshing` | `IsRefreshing` (controlled — show the spinner while a refresh runs) |
 * | `Command` | `Command` (invoked when the user pulls past the threshold) |
 * | `Content` | `Content` or `children` |
 * | `RefreshColor` | `RefreshColor` |
 */
export interface RefreshViewProps extends ViewProps {
  IsRefreshing?: boolean
  Command?: () => void
  RefreshColor?: string
  Content?: ReactNode
  PullThreshold?: number
}

export default function RefreshView(props: RefreshViewProps) {
  const {
    IsRefreshing = false,
    Command,
    RefreshColor,
    PullThreshold = 64,
    className,
    children,
    Content,
    ...view
  } = props

  const startY = useRef<number | null>(null)
  const [pull, setPull] = useState(0)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const onTouchStart = (event: React.TouchEvent) => {
    if ((scrollerRef.current?.scrollTop ?? 0) <= 0) startY.current = event.touches[0].clientY
  }
  const onTouchMove = (event: React.TouchEvent) => {
    if (startY.current == null) return
    const delta = event.touches[0].clientY - startY.current
    if (delta > 0) setPull(Math.min(PullThreshold * 1.5, delta))
  }
  const onTouchEnd = () => {
    if (pull >= PullThreshold && !IsRefreshing) Command?.()
    startY.current = null
    setPull(0)
  }

  const spinning = IsRefreshing || pull >= PullThreshold

  return (
    <div className={cx('fluid-refreshview', className)} style={viewStyle(view as ViewProps)} {...xNameAttr(view)}>
      <div
        className="fluid-refreshview-indicator"
        style={{ height: IsRefreshing ? PullThreshold : pull, color: RefreshColor }}
      >
        <span className={cx('fluid-refreshview-spinner', spinning && 'fluid-refreshview-spinner-active')} />
      </div>
      <div
        ref={scrollerRef}
        className="fluid-refreshview-content"
        style={{ transform: `translateY(${IsRefreshing ? PullThreshold : pull}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {Content ?? children}
      </div>
    </div>
  )
}
