import type { CSSProperties } from 'react'
import { cx, size, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Selects a time of day.
 *
 * | native | here |
 * | --- | --- |
 * | `Time` (`TimeSpan`) | `Time` — an `"HH:mm"` string |
 * | `Format` | `Format` — informational only |
 * | `PropertyChanged` on `Time` | `onTimeSelected("HH:mm")` |
 * | `TextColor` / `FontSize` | same |
 */
export interface TimePickerProps extends ViewProps {
  Time?: string
  Format?: string
  onTimeSelected?: (time: string) => void
  TextColor?: string
  FontSize?: number | string
}

export default function TimePicker(props: TimePickerProps) {
  const { Time, onTimeSelected, TextColor, FontSize, IsEnabled = true, className, ...view } = props

  const style: CSSProperties = { color: TextColor, fontSize: size(FontSize), ...viewStyle(view as ViewProps) }

  return (
    <input
      className={cx('fluid-timepicker', className)}
      style={style}
      type="time"
      value={Time ?? ''}
      disabled={!IsEnabled}
      onChange={(event) => onTimeSelected?.(event.target.value)}
      {...xNameAttr(view)}
    />
  )
}
