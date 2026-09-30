import { useRef, useState, type ReactNode } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Wraps content to reveal swipe-triggered action buttons.
 *
 * | native | here |
 * | --- | --- |
 * | `LeftItems` / `RightItems` (`SwipeItems` of `SwipeItem`) | `LeftItems` / `RightItems` — `{ Text, IconImageSource, BackgroundColor, Command }[]` |
 * | `Content` | `Content` or `children` |
 * | `SwipeStarted` / `SwipeEnded` | `onOpen(side)` / `onClose` |
 * | `Threshold` | `Threshold` (px of drag needed to latch open) |
 */
export interface SwipeItem {
  Text?: string
  IconImageSource?: string
  BackgroundColor?: string
  TextColor?: string
  Command?: () => void
}

export interface SwipeViewProps extends ViewProps {
  LeftItems?: SwipeItem[]
  RightItems?: SwipeItem[]
  Content?: ReactNode
  Threshold?: number
  onOpen?: (side: 'left' | 'right') => void
  onClose?: () => void
}

const ACTION_WIDTH = 72

export default function SwipeView(props: SwipeViewProps) {
  const { LeftItems = [], RightItems = [], Threshold = 40, onOpen, onClose, className, children, Content, ...view } =
    props

  const startX = useRef<number | null>(null)
  const [offset, setOffset] = useState(0)

  const leftWidth = LeftItems.length * ACTION_WIDTH
  const rightWidth = RightItems.length * ACTION_WIDTH

  const onTouchStart = (event: React.TouchEvent) => {
    startX.current = event.touches[0].clientX - offset
  }
  const onTouchMove = (event: React.TouchEvent) => {
    if (startX.current == null) return
    const next = event.touches[0].clientX - startX.current
    setOffset(Math.max(-rightWidth, Math.min(leftWidth, next)))
  }
  const onTouchEnd = () => {
    startX.current = null
    if (offset > Threshold && leftWidth) {
      setOffset(leftWidth)
      onOpen?.('left')
    } else if (offset < -Threshold && rightWidth) {
      setOffset(-rightWidth)
      onOpen?.('right')
    } else {
      setOffset(0)
      onClose?.()
    }
  }

  const renderActions = (items: SwipeItem[], side: 'left' | 'right') => (
    <div className={cx('fluid-swipeview-actions', `fluid-swipeview-actions-${side}`)}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className="fluid-swipeview-action"
          style={{ background: item.BackgroundColor, color: item.TextColor, width: ACTION_WIDTH }}
          onClick={() => {
            item.Command?.()
            setOffset(0)
            onClose?.()
          }}
        >
          {item.IconImageSource ? <img src={item.IconImageSource} alt={item.Text ?? ''} /> : item.Text}
        </button>
      ))}
    </div>
  )

  return (
    <div className={cx('fluid-swipeview', className)} style={viewStyle(view as ViewProps)} {...xNameAttr(view)}>
      {LeftItems.length > 0 && renderActions(LeftItems, 'left')}
      {RightItems.length > 0 && renderActions(RightItems, 'right')}
      <div
        className="fluid-swipeview-content"
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {Content ?? children}
      </div>
    </div>
  )
}
