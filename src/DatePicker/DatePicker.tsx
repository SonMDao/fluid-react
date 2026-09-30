import type { CSSProperties } from 'react'
import { cx, size, viewStyle, xNameAttr, type ViewProps } from '../Shared/fluid-shared'
import './style.css'

/**
 * Selects a calendar date.
 *
 * | native | here |
 * | --- | --- |
 * | `Date` | `Date` (`Date` object or `YYYY-MM-DD` string) |
 * | `MinimumDate` / `MaximumDate` | `MinimumDate` / `MaximumDate` |
 * | `Format` | `Format` — informational only; the browser owns date presentation |
 * | `DateSelected` | `onDateSelected(date)` |
 * | `TextColor` / `FontSize` | same |
 */
export interface DatePickerProps extends ViewProps {
  Date?: Date | string
  MinimumDate?: Date | string
  MaximumDate?: Date | string
  Format?: string
  onDateSelected?: (date: Date) => void
  TextColor?: string
  FontSize?: number | string
}

function iso(value: Date | string | undefined): string | undefined {
  if (value == null) return undefined
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return typeof value === 'string' ? value : undefined
  return date.toISOString().slice(0, 10)
}

export default function DatePicker(props: DatePickerProps) {
  const { Date: date, MinimumDate, MaximumDate, onDateSelected, TextColor, FontSize, IsEnabled = true, className, ...view } =
    props

  const style: CSSProperties = { color: TextColor, fontSize: size(FontSize), ...viewStyle(view as ViewProps) }

  return (
    <input
      className={cx('fluid-datepicker', className)}
      style={style}
      type="date"
      value={iso(date) ?? ''}
      min={iso(MinimumDate)}
      max={iso(MaximumDate)}
      disabled={!IsEnabled}
      onChange={(event) => {
        if (event.target.value) onDateSelected?.(new Date(event.target.value))
      }}
      {...xNameAttr(view)}
    />
  )
}
