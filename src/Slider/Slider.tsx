import type { CSSProperties } from 'react'
import { cx, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * A drag handle for picking a value in a numeric range.
 *
 * | native | here |
 * | --- | --- |
 * | `Value` | `Value` |
 * | `Minimum` / `Maximum` | `Minimum` / `Maximum` |
 * | `ValueChanged` | `onValueChanged(value)` |
 * | `MinimumTrackColor` | `MinimumTrackColor` |
 * | `MaximumTrackColor` | `MaximumTrackColor` |
 * | `ThumbColor` | `ThumbColor` |
 */
export interface SliderProps extends ViewProps {
  Value?: number
  Minimum?: number
  Maximum?: number
  onValueChanged?: (value: number) => void
  MinimumTrackColor?: string
  MaximumTrackColor?: string
  ThumbColor?: string
  Step?: number
}

export default function Slider(props: SliderProps) {
  const {
    Value = 0,
    Minimum = 0,
    Maximum = 1,
    onValueChanged,
    MinimumTrackColor,
    MaximumTrackColor,
    ThumbColor,
    Step,
    IsEnabled = true,
    className,
    ...view
  } = props

  const pct = Maximum > Minimum ? ((Value - Minimum) / (Maximum - Minimum)) * 100 : 0
  const min = MinimumTrackColor ?? 'var(--accent-blue, #2563eb)'
  const max = MaximumTrackColor ?? '#d9d9d9'

  const style: CSSProperties = {
    background: `linear-gradient(to right, ${min} 0%, ${min} ${pct}%, ${max} ${pct}%, ${max} 100%)`,
    ...(ThumbColor ? ({ ['--fluid-slider-thumb']: ThumbColor } as CSSProperties) : null),
    ...viewStyle(view as ViewProps),
  }

  return (
    <input
      type="range"
      className={cx('fluid-slider', className)}
      style={style}
      min={Minimum}
      max={Maximum}
      step={Step ?? 'any'}
      value={Value}
      disabled={!IsEnabled}
      onChange={(event) => onValueChanged?.(Number(event.target.value))}
      {...xNameAttr(view)}
    />
  )
}
