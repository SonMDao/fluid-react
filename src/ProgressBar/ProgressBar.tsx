import type { CSSProperties } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A horizontal fill bar showing progress toward completion.
 *
 * | native | here |
 * | --- | --- |
 * | `Progress` (0..1) | `Progress` |
 * | `ProgressColor` | `ProgressColor` |
 */
export interface ProgressBarProps extends ViewProps {
  Progress?: number
  ProgressColor?: string
}

export default function ProgressBar(props: ProgressBarProps) {
  const { Progress = 0, ProgressColor, className, ...view } = props
  const clamped = Math.min(1, Math.max(0, Progress))

  const style: CSSProperties = {
    ...(ProgressColor ? ({ ['--fluid-progress-color']: ProgressColor } as CSSProperties) : null),
    ...viewStyle(view as ViewProps),
  }

  return (
    <div
      className={cx('fluid-progressbar', className)}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={1}
      {...xNameAttr(view)}
    >
      <span className="fluid-progressbar-fill" style={{ width: `${clamped * 100}%` }} />
    </div>
  )
}
