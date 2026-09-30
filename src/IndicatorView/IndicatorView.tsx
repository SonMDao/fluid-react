import type { CSSProperties } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * The dot/position indicator paired with a `CarouselView`.
 *
 * | native | here |
 * | --- | --- |
 * | `Count` | `Count` |
 * | `Position` | `Position` |
 * | `IndicatorColor` | `IndicatorColor` |
 * | `SelectedIndicatorColor` | `SelectedIndicatorColor` |
 * | `IndicatorSize` | `IndicatorSize` |
 * | `IndicatorsShape` (`Circle`/`Square`) | `IndicatorsShape` |
 * | `HideSingle` | `HideSingle` (default `true`) |
 * | tap a dot | `onPositionChanged(index)` |
 */
export interface IndicatorViewProps extends ViewProps {
  Count: number
  Position?: number
  IndicatorColor?: string
  SelectedIndicatorColor?: string
  IndicatorSize?: number
  IndicatorsShape?: 'Circle' | 'Square'
  HideSingle?: boolean
  onPositionChanged?: (index: number) => void
}

export default function IndicatorView(props: IndicatorViewProps) {
  const {
    Count,
    Position = 0,
    IndicatorColor = 'rgba(0,0,0,0.2)',
    SelectedIndicatorColor = 'var(--accent-blue, #2563eb)',
    IndicatorSize = 8,
    IndicatorsShape = 'Circle',
    HideSingle = true,
    onPositionChanged,
    className,
    ...view
  } = props

  if (Count <= 1 && HideSingle) return null

  return (
    <div className={cx('fluid-indicatorview', className)} style={viewStyle(view as ViewProps)} {...xNameAttr(view)}>
      {Array.from({ length: Count }, (_, index) => {
        const style: CSSProperties = {
          width: IndicatorSize,
          height: IndicatorSize,
          borderRadius: IndicatorsShape === 'Square' ? 2 : '50%',
          background: index === Position ? SelectedIndicatorColor : IndicatorColor,
        }
        return (
          <button
            key={index}
            type="button"
            className="fluid-indicatorview-dot"
            style={style}
            aria-label={`Go to ${index + 1}`}
            aria-current={index === Position}
            onClick={() => onPositionChanged?.(index)}
          />
        )
      })}
    </div>
  )
}
