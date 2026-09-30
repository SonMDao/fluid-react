import type { CSSProperties } from 'react'
import { cx, interactionAttrs, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A spinning "loading" indicator.
 *
 * | native | here |
 * | --- | --- |
 * | `IsRunning` | `IsRunning` (when `false` nothing renders, like native) |
 * | `Color` | `Color` |
 * | `WidthRequest` / `HeightRequest` | size the spinner (default 28) |
 */
export interface ActivityIndicatorProps extends ViewProps {
  IsRunning?: boolean
  Color?: string
}

export default function ActivityIndicator(props: ActivityIndicatorProps) {
  const { IsRunning = true, Color, className, ...view } = props
  if (!IsRunning) return null

  const style: CSSProperties = {
    borderTopColor: Color ?? 'var(--primary-action-bg, #111)',
    ...viewStyle(view as ViewProps),
  }

  return (
    <span
      className={cx('fluid-activityindicator', className)}
      style={style}
      {...interactionAttrs(view)}
      role="status"
      aria-label="Loading"
      {...xNameAttr(view)}
    />
  )
}
